### [Three.js 提示和技巧大清单！ | 发现三.js](https://discoverthreejs.com/tips-and-tricks/)
1. **初级技巧**：包括如何解决在设置场景后看不到任何东西的问题，例如检查浏览器控制台错误，设置背景颜色，确保场景中有光源，确保物体在相机的视域中，考虑场景的比例等。
2. **一般技巧**：包括在循环中不要创建对象，尽量复用 Vector3 等对象，总是使用 BufferGeometry 而不是 Geometry，总是试图重用对象，材质，纹理等。
3. **材料**：MeshLambertMaterial 更适合于布料等非光泽材料，与 MeshPhongMaterial 相比，性能更佳。
4. **相机**：为了提高性能，应尽可能降低视锥体的大小。尤其在开发阶段结束，准备发布应用时，应尽可能缩小视锥体的大小。
5. **渲染器**：在创建渲染器时，使用 powerPreference: "high-performance" 可以在多 GPU 系统中优先使用高性能 GPU。
6. **光源**：直接光源（SpotLight, PointLight, RectAreaLight, 和 DirectionalLight）运行较慢，应尽量减少场景中直接光源的使用。
7. **阴影**：如果场景是静态的，只有当有东西改变时才更新阴影图，而不是每一帧都更新。
8. **纹理**：所有的纹理需要是 2 的幂（POT）大小，例如：1,2,4,8,16,…,512,2048,…。
9. **性能**：对于静态或很少移动的对象，设置 object.matrixAutoUpdate = false， 并在其位置/旋转/四元数/缩放 更新时手动调用 object.updateMatrix()。
10. **高级技巧**：使用几何实例化处理数百或数千个相似的几何体，尤其是在 GPU 上进行动画处理时。
11. - **后处理**：内置的抗锯齿不能与后处理一起使用（至少在 WebGL 1 中）。你需要手动使用 FXAA 或 SMAA 来进行抗锯齿处理。
12. **清除物体**：如果你需要从场景中永久性地移除物体，需要读这篇文章：如何清除物体。
13. **更新场景中的物体**：如果你需要更新场景中的物体，可以阅读这篇文章：如何更新物体。
14. **性能测试**：测试应用的性能时，首先需要检查它是 CPU 受限，还是 GPU 受限。通过将所有材质替换为基础材质来进行测试。
### 性能
```js
material/geometry.dispose(); //删除材质/几何体

使用merge方法合并不需要单独操作的模型
	几何体mesh.updateMatrix(); //提取位置.position、缩放.scale和四元数.quaternion的属性值 转化为 变换矩阵设置本地矩阵属性.matrix        
	geometry.merge(何体mesh.geometry, 几何体mesh.matrix); //将几何体合并
	
在循环渲染中避免使用更新：
	//几何体：
	geometry.verticesNeedUpdate = true; //顶点发生了修改ht
	geometry.elementsNeedUpdate = true; //面发生了修改
	geometry.morphTargetsNeedUpdate = true; //变形目标发生了修改
	geometry.uvsNeedUpdate = true; //uv映射发生了修改
	geometry.normalsNeedUpdate = true; //法向发生了修改
	geometry.colorsNeedUpdate = true; //顶点颜色发生的修改
	//材质
	material.needsUpdate = true
	//纹理
	texture.needsUpdate = true;
```

### 优化大量对象
将大量盒子合并为一个几何体, 具体步骤如下：
1. 创建一个盒子几何体（BoxGeometry）作为每个数据点的基础几何体。
2. 使用辅助对象（Object3D）来定位和旋转盒子，以使其与数据点在球体上的位置对应。
3. 创建一个空数组，用于存储每个数据点的盒子几何体。
4. 遍历数据点，为每个数据点创建盒子几何体，并根据数据值设置盒子的颜色和尺寸。
5. 将每个盒子几何体添加到数组中。
6. 使用BufferGeometryUtils.mergeGeometries()方法将所有盒子几何体合并为一个几何体。
7. 创建一个网格（Mesh）对象，并将合并后的几何体和材质（MeshBasicMaterial）应用于网格。
8. 将网格添加到场景中进行渲染。
#### 在合并几何体时，还需要处理顶点属性（Attribute），例如颜色、法线、纹理坐标等。
以下是在合并几何体时处理顶点属性的一般步骤：
1. 在创建盒子几何体时，为每个顶点设置相应的属性值。例如，在上述示例中，我们想要为每个顶点设置颜色。
2. 创建一个新的属性数组，用于存储所有数据点的属性值。例如，颜色属性可以使用Float32Array或Uint8Array来存储颜色值。
3. 遍历数据点，将每个数据点的属性值添加到属性数组中。需要根据顶点的索引来确定每个数据点的属性值在属性数组中的位置。
4. 创建一个顶点属性（BufferAttribute）对象，并将属性数组作为参数传递给它。
5. 在合并几何体时，将顶点属性对象添加到合并后的几何体中。可以使用setAttribute()方法来设置合并后的几何体的顶点属性。
### 官网案例
1. 多个数据集(渲染19000个立方体)之间进行动画切换
	- 使用 MorphTargets（变形目标）来实现动画过渡
	- MorphTargets 是一种在几何体的每个顶点处都提供多个值，并通过线性插值（Linear Interpolation）在它们之间进行过渡的方法
2. OffscreenCanvas 允许 web worker 渲染到 canvas
3. OrbitControls 是一个用来控制 3D 场景视图的工具，它需要监听鼠标和键盘事件来调整场景中的相机位置。然而，由于 Web Worker 无法直接操作 DOM，OrbitControls 无法在 Web Worker 中正常工作。所以，让主线程监听 DOM 事件，转发给伪装成 HTMLElement的代理对象,  然后 Web Worker 从它拿事件，从而让 OrbitControls 能够在 Web Worker 中正常工作。
-