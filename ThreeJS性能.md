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
---
中文](https://discoverthreejs.com/zh/tips-and-tricks/)

发现 three.js 现在是开源的！

# three.js技巧和技巧的大列表！

大家好！在写书的过程中，我收集了一大堆的技巧、窍门、注意事项和陷阱。这个页面包含了我目前找到的所有内容。

这里的所有提示并非都经过实验证实，尤其是性能方面的提示。  
  
有太多的变量涉及其中，盲目遵循一个列表是不可取的，所以一定要彻底测试你的应用程序，并看看哪些对你有效。这些只是建议，而不是规则（大多数情况下）。  
  
话虽如此，该页面将提供各种规模应用程序的许多有用提示。

如果你有任何要补充的或者发现任何错误，请告诉我，我会更新页面。

这里的大部分信息不仅适用于three.js，甚至适用于任何实时图形应用程序或框架。

 快乐编码！

## 初学者友好的提示，或者帮助！为什么我什么都看不到？#

你已经按照一些基础教程进行了操作，一切都很顺利。现在你正在创建自己的应用程序，并且按照教程的要求进行了所有设置。但是你就是看不到任何东西！到底怎么回事？

以下是一些你可以做的事情来帮助找出问题。

### 检查浏览器控制台以查看错误信息。

但你已经做过了，对吗？

### 将背景颜色设置为除黑色之外的其他颜色 #

盯着一块黑色的画布？如果你只能看到黑色，很难判断是否发生了什么。尝试将背景颜色设置为红色：

```js
import { Color } from "./vendor/three/build/three.module.js";

scene.background = new Color("red");
```

Copy

如果你得到了一块红色的画布，那么至少你的 `renderer.render` 调用是有效的，然后你可以继续找出其他的问题所在。

### 确保你的场景中有一盏灯，并且它照亮了你的物体。

就像在现实世界中一样，大多数在three.js中的材质需要光才能被看到。

### 4. 用 `MeshBasicMaterial` #覆盖场景中的所有材料

一个不需要光线才能可见的材料是 `MeshBasicMaterial` 。如果你在让物体显示出来方面遇到困难，你可以暂时用 `MeshBasicMaterial` 覆盖场景中的所有材料。如果在这样做时物体突然出现，那么你的问题就是缺乏光线。

```js
import { MeshBasicMaterial } from "./vendor/three/build/three.module.js";

scene.overrideMaterial = new MeshBasicMaterial({ color: "green" });
```

Copy

### 您的物体是否在相机的视锥体内？

如果您的物体不在视锥体内，它将被裁剪。尝试将远裁剪平面设置得非常大：

```js
camera.far = 100000;
camera.updateProjectionMatrix();
```

Copy

记住这只是用于测试！相机的视锥体以米为单位测量，为了获得最佳性能，您应该尽量将其缩小。  
  
一旦您的场景设置好并正常运行，尽量减小视景体的大小。

### 你的相机在物体内部吗？

默认情况下，所有东西都会在点 (0,0,0) ，也就是原点处创建。确保将相机后移，以便能够看到你的场景！

```js
camera.position.z = 10;
```

Copy

### 7. 仔细考虑你场景的规模。

尝试将场景可视化，并记住在three.js中，一个单位代表一米。所有的元素是否以合理的逻辑方式组合在一起？  
  
或许你什么都看不见，因为你刚刚加载的物体只有0.00001米宽。等等，屏幕中间那个小黑点是什么？

##  常规提示 #

1. JavaScript中的对象创建是昂贵的，所以不要在循环中创建对象。相反，创建一个单一的对象，比如一个Vector3，并使用 `vector.set()` 或类似的方法在循环中重复使用它。
2. 同样适用于你的渲染循环。为了确保你的应用以每秒六十帧的流畅度运行，尽量在渲染循环中做尽可能少的工作。不要在每一帧都创建新的对象。
3. 始终使用 `BufferGeometry` 而不是 `Geometry` ，它更快。
4. 对于预先构建的对象也是一样，始终使用缓冲几何版本（ `BoxBufferGeometry` 而不是 `BoxGeometry` ）。
5. 始终尝试重复使用物体，如物体、材料、纹理等（尽管更新某些内容可能比创建新内容慢，参见下面的纹理提示）。

## 以国际单位制工作 #

three.js在所有地方都使用国际单位制。如果您也使用国际单位制，您会发现事情会更加顺利。如果由于某种原因您使用不同的单位，比如英寸（令人不安），请确保您有充分的理由这样做。

###  国际单位制 #

- 距离以米为单位测量（1个three.js单位=1米）。
- 时间以秒为单位衡量。
- 光线以国际单位制的照度（cd）、流明（lm）和勒克斯（lx）进行测量（只要你至少打开 `renderer.physicallyCorrectLights` ）。

如果你正在创造真正史诗般的规模的东西（如太空模拟等），要么使用一个缩放因子，要么切换到使用对数深度缓冲。

##  准确的颜色 #

为了（几乎）准确的颜色，请使用以下渲染器设置：

```js
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
```

Copy

对于颜色，请执行以下操作：

```js
const color = new Color(0x800080);
color.convertSRGBToLinear();
```

Copy

或者，在更常见的情况下，使用材料中的颜色：

```js
const material = new MeshBasicMaterial({ color: 0x800080 });
material.color.convertSRGBToLinear();
```

Copy

最后，为了在纹理中获得（几乎）正确的颜色，您只需要设置颜色、环境和自发光贴图的纹理编码

```js
import { sRGBEncoding } from "./vendor/three/build/three.module.js";

const colorMap = new TextureLoader().load("colorMap.jpg");
colorMap.encoding = sRGBEncoding;
```

Copy

所有其他纹理类型应保持在线性颜色空间中。这是默认设置，所以除了颜色、环境和自发光贴图之外，您不需要更改其他任何纹理的编码。

请注意，我在这里说的是“几乎正确”，因为目前three.js的颜色管理并不完全正确。  
  
希望很快能修复，但在此期间，颜色的任何不准确之处都会非常微小，除非你在进行科学或医学渲染，否则很少有人会注意到。

## JavaScript[#](https://discoverthreejs.com/tips-and-tricks/#javascript)

### 不要假设你知道什么会更快

Web浏览器使用的JavaScript引擎经常变化，并在幕后对您的代码进行了大量优化。不要相信您对什么会更快的直觉，始终进行测试。  
  
不要听从几年前的文章，告诉你要避免某些方法，比如 `array.map` 或 `array.forEach` 。自己测试一下，或者找到最近几个月有适当测试的文章。

### 使用样式指南和代码检查工具

个人而言，我使用Eslint、Prettier和Airbnb风格指南的组合。在VSCode中，我花了大约30分钟使用这个教程（第2部分）进行设置，现在我再也不必浪费时间来格式化、检查代码质量，或者纠结于某个特定语法是否合适了。

许多使用three.js的人更喜欢Mr.doob的Code Style™而不是Airbnb，所以如果你喜欢使用它，只需将eslint-config-airbnb插件替换为eslint-config-mdcs。

## 模型、网格和其他可见物品

1. 避免使用常见的基于文本的3D数据格式，如Wavefront OBJ或COLLADA，用于资产交付。相反，使用针对Web进行优化的格式，如glTF。
2. 使用Draco网格压缩与glTF。有时，这可以将glTF文件压缩至原始大小的不到10％！
3. 另外，还有一个新的工具叫做gltfpack，在某些情况下可能比Draco产生更好的结果。
4. 如果您需要使大量的对象可见或不可见（或者将它们添加/移除到您的场景中），请考虑使用图层以获得最佳性能。
5. 物体在完全相同的位置会引起闪烁（Z-fighting）。  
      
    尝试将事物偏移一个很小的量，比如0.001，使它们看起来处于相同的位置，同时保持你的GPU的良好状态。
6. 保持场景围绕原点居中，以减少在大坐标下的浮点误差。
7. 永远不要移动你的 `Scene` 。它在 (0,0,0) 处创建，这是其中所有对象的默认参考框架。

##  相机 #

1. 尽量将你的视锥体缩小，以获得更好的性能。  
      
    在开发过程中使用大的截锥体是可以的，但是一旦你开始为部署调优你的应用程序时，尽量将截锥体缩小，以获得几个关键的帧率。
2. 不要将物体放在远裁剪平面上（尤其是如果你的远裁剪平面非常大），因为这可能会导致闪烁。

##  渲染器 #

1. 除非你需要，否则不要启用 `preserveDrawingBuffer` 。
2. 除非需要，否则禁用alpha缓冲区。
3. 除非需要，否则不要启用模板缓冲区。
4. 除非你需要它（但你可能确实需要它），否则禁用深度缓冲区。
5. 在创建渲染器时使用 `powerPreference: "high-performance"` 。这可能会促使用户的系统选择高性能的GPU，在多GPU系统中。
6. 仅在相机位置变化超过epsilon或发生动画时进行渲染。
7. 如果您的场景是静态的并且使用 `OrbitControls` ，您可以监听控件的 `change` 事件。这样，只有在相机移动时才会渲染场景。

```js
OrbitControls.addEventListener("change", () => renderer.render(scene, camera));
```

Copy

你不会从后两个中获得更高的帧率，但你会得到更少的风扇启动和移动设备上更少的电池耗电。

注意：我在网上看到一些地方建议禁用抗锯齿并应用后处理的抗锯齿效果。在我的测试中，这是不正确的。  
  
在现代硬件上，即使在低功耗移动设备上，内置的多重采样抗锯齿（MSAA）似乎非常廉价，而后处理的快速近似抗锯齿（FXAA）或子像素抗锯齿（SMAA）通道在我测试的每个场景中都会导致相当大的帧率下降，并且质量也比不上MSAA。

##  灯光 #

1. 直接光（ `SpotLight` ， `PointLight` ， `RectAreaLight` 和 `DirectionalLight` ）速度较慢。在您的场景中尽量少使用直接光。
2. 避免在场景中添加和移除灯光，因为这会导致 `WebGLRenderer` 重新编译所有着色器程序（它会缓存程序，所以后续操作会比第一次更快）。相反，使用 `light.visible = false` 或 `light.intensiy = 0` 。
3. 打开 `renderer.physicallyCorrectLights` 以使用国际单位进行准确照明。

##  阴影 #

1. 如果你的场景是静态的，只有在有变化时才更新阴影贴图，而不是每一帧都更新。
2. 使用 `CameraHelper` 来可视化阴影相机的视锥体。
3. 尽量使阴影锥体尺寸最小化。
4. 尽可能将阴影纹理降低分辨率。
5. 请记住，点光源阴影比其他阴影类型更昂贵，因为它们必须渲染六次（每个方向一次），而 `DirectionalLight` 和 `SpotLight` 阴影只需渲染一次。
6. 谈到 `PointLight` 阴影，注意到 `CameraHelper` 只能可视化点光源阴影中的六个方向之一。它仍然有用，但你需要想象其他五个方向。

##  材料 #

1. `MeshLambertMaterial` 对于光亮材料无效，但对于像布料这样的哑光材料，它会给出与 `MeshPhongMaterial` 非常相似的结果，而且速度更快。
2. 如果您正在使用形态目标，请确保在您的材质中设置 `morphTargets = true` ，否则它们将无法工作！
3. 同样适用于形态法线。
4. 如果您正在使用SkinnedMesh进行骨骼动画，请确保 `material.skinning = true` .
5. 使用morph targets、morph normals或蒙皮时，不能共享材质。您需要为每个蒙皮或变形的网格创建一个独特的材质（ `material.clone()` 在这里是您的朋友）。

##  定制材料 #

1. 只有在制服发生变化时才更新，而不是每一帧都更新。

##  几何学 #

1. 避免使用 `LineLoop` ，因为它必须通过行条带来模拟。

##  纹理 #

1. 所有的纹理都需要是2的幂大小： 1,2,4,8,16,…,512,2048,… .
2. 不要改变纹理的尺寸。相反，创建新的纹理，这样更快。
3. 尽量使用最小的纹理尺寸（你能使用256x256的平铺纹理吗？也许会让你惊讶！）。
4. 非2的幂次方（NPOT）纹理需要线性或最近过滤，并且使用边界夹取或边缘夹取包装。不支持多级纹理过滤和重复包装。  
      
    但是说真的，就是不要使用非2的幂次方纹理。
5. 所有尺寸相同的纹理在内存中的大小相同，所以JPG可能比PNG文件大小更小，但在GPU上占用的内存量相同。

##  抗锯齿 #

1. 抗锯齿的最糟糕情况是由许多细长直线构成的几何体，彼此平行。想象金属百叶窗或格子围栏。如果可能的话，请不要在场景中包含这样的几何体。如果没有选择，考虑用纹理替换格子，可能会得到更好的效果。

##  后期处理 #

1. 内置的抗锯齿在后期处理中不起作用（至少在WebGL 1中）。您需要手动进行处理，使用FXAA或SMAA（可能更快，更好）。
2. 由于您没有使用内置的AA功能，请确保将其禁用！
3. three.js有很多后期处理着色器，这太棒了！但请记住，每个通道都需要渲染整个场景。  
      
    一旦测试完成，请考虑是否可以将您的通行证合并为一个单一的自定义通行证。这样做需要更多的工作，但可以显著提高性能。

##  处理事物 #

从你的场景中移除某物？

首先，考虑不要这样做，特别是如果你之后会再次添加它。你可以使用 `object.visible = false` （也适用于灯光）或 `material.opacity = 0` 来暂时隐藏对象。你可以设置 `light.intensity = 0` 来禁用灯光而不会导致着色器重新编译。

如果您确实需要永久删除场景中的物体，请先阅读本文：如何处理物体。

## 更新您场景中的对象？#

阅读这篇文章：如何更新事物。

##  表现 #

1. 为静态或很少移动的物体设置 `object.matrixAutoUpdate = false` ，并在它们的位置/旋转/四元数/缩放更新时手动调用 `object.updateMatrix()` 。
2. 透明物体速度较慢。在场景中尽量少使用透明物体。
3. 如果可能的话，请使用 `alphatest` 而不是标准透明度，这样会更快。
4. 测试应用程序性能时，首先需要检查它是CPU限制还是GPU限制。使用 `scene.overrideMaterial` 替换所有材料（参见入门提示和页面开头）。如果性能提高了，那么你的应用程序是GPU限制。如果性能没有提高，你的应用程序是CPU限制。
5. 在一台快速的机器上进行性能测试时，您可能会获得最大帧率60FPS。使用 `open -a "Google Chrome" --args --disable-gpu-vsync` 运行Chrome以获得无限帧率。
6. 现代移动设备的像素比率很高，高达5 - 考虑在这些设备上将最大像素比率限制在2或3。  
      
    以稍微模糊场景为代价，您将获得显著的性能提升。
7. 烘焙光照和阴影贴图以减少场景中的灯光数量。
8. 请注意场景中绘制调用的数量。一个好的经验法则是绘制调用越少，性能越好。
9. 远处的物体不需要与镜头附近的物体一样的细节水平。有许多技巧可以通过降低远处物体的质量来提高性能。考虑使用LOD（细节级别）对象。  
      
    你也可以只在远处的物体上每2或3帧更新位置/动画，或者用广告牌替换它们 - 即物体的绘画。

##  高级提示 #

1. 不要使用 `TriangleFanDrawMode` ，它很慢。
2. 当你有数百或数千个相似的几何体时，请使用几何实例化。
3. 在动画顶点或粒子时，尤其是在GPU上进行动画处理（参考THREE.Bas的一种方法）。

## 阅读这些页面！#

Unity和Unreal的文档中也有很多关于性能建议的页面，其中大部分对于three.js同样适用。也请阅读这些建议。

- [优化图形性能（Unity）](https://docs.unity3d.com/Manual/OptimizingGraphicsPerformance.html)
- [艺术家和设计师的表现指南（虚幻引擎）](https://docs.unrealengine.com/en-us/Engine/Performance/Guidelines)

WebGL Insights收集了很多来自整本书的技巧。它更加技术性，但也值得阅读，特别是如果你正在编写自己的着色器的话。

-  [WebGL洞察技巧](http://webglinsights.github.io/tips.html)

##  参考文献 #

- [@jackrugile 和 @mrdoob 在 Twitter 上](https://mobile.twitter.com/jackrugile/status/966440290885156864)
- [A-Painter性能优化](https://blog.mozvr.com/a-painter-performance-optimizations)

[](https://discoverthreejs.com/book/appendix/threejs-versions/ "Dealing with Different three.js Versions")[](https://discoverthreejs.com/book/ "Table of Contents")

## [Table of Contents](https://discoverthreejs.com/book/)

Also available in: [中文](https://discoverthreejs.com/zh/tips-and-tricks/)

- 0:[Welcome to Discover three.js!](https://discoverthreejs.com/book/introduction/ "Welcome to Discover three.js!")
- 0.1:[How to Use This Book](https://discoverthreejs.com/book/introduction/about-the-book/ "How to Use This Book")
- 0.2:[What Do You Need to Run a three.js App?](https://discoverthreejs.com/book/introduction/prerequisites/ "What Do You Need to Run a three.js App?")
- 0.3:[Welcome to the Community: three.js Around the Web](https://discoverthreejs.com/book/introduction/get-help/ "Welcome to the Community: three.js Around the Web")
- 0.4:[three.js on GitHub - Where the Magic Happens](https://discoverthreejs.com/book/introduction/github-repo/ "three.js on GitHub - Where the Magic Happens")
- 0.5:[How to Include three.js in Your Projects](https://discoverthreejs.com/book/introduction/get-threejs/ "How to Include three.js in Your Projects")
- 0.7:[Using three.js with React, Vue.js, Angular, Svelte, TypeScript...](https://discoverthreejs.com/book/introduction/threejs-with-frameworks/ "Using three.js with React, Vue.js, Angular, Svelte, TypeScript...")
- 1:[Getting Started: Here's Where the Real Fun Begins!](https://discoverthreejs.com/book/first-steps/ "Getting Started: Here's Where the Real Fun Begins!")
- 1.1:[The Structure of a three.js App](https://discoverthreejs.com/book/first-steps/app-structure/ "The Structure of a three.js App")
- 1.2:[Your First three.js Scene: Hello, Cube!](https://discoverthreejs.com/book/first-steps/first-scene/ "Your First three.js Scene: Hello, Cube!")
- 1.3:[Introducing the World App](https://discoverthreejs.com/book/first-steps/world-app/ "Introducing the World App")
- 1.4:[Physically Based Rendering and Lighting](https://discoverthreejs.com/book/first-steps/physically-based-rendering/ "Physically Based Rendering and Lighting")
- 1.5:[Transformations and Coordinate Systems](https://discoverthreejs.com/book/first-steps/transformations/ "Transformations and Coordinate Systems")
- 1.6:[Making Our Scenes Responsive (and also Dealing with Jaggies)](https://discoverthreejs.com/book/first-steps/responsive-design/ "Making Our Scenes Responsive (and also Dealing with Jaggies)")
- 1.7:[The Animation Loop](https://discoverthreejs.com/book/first-steps/animation-loop/ "The Animation Loop")
- 1.8:[A Brief Introduction to Texture Mapping](https://discoverthreejs.com/book/first-steps/textures-intro/ "A Brief Introduction to Texture Mapping")
- 1.9:[Extend three.js With a Camera Controls Plugin](https://discoverthreejs.com/book/first-steps/camera-controls/ "Extend three.js With a Camera Controls Plugin")
- 1.10:[Ambient Lighting: Illumination from Every Direction](https://discoverthreejs.com/book/first-steps/ambient-lighting/ "Ambient Lighting: Illumination from Every Direction")
- 1.11:[Organizing Your Scenes](https://discoverthreejs.com/book/first-steps/organizing-with-group/ "Organizing Your Scenes")
- 1.12:[The Built-In Geometries](https://discoverthreejs.com/book/first-steps/built-in-geometries/ "The Built-In Geometries")
- 1.13:[Load 3D Models in glTF Format](https://discoverthreejs.com/book/first-steps/load-models/ "Load 3D Models in glTF Format")
- 1.14:[The three.js Animation System](https://discoverthreejs.com/book/first-steps/animation-system/ "The three.js Animation System")
- A:[Appendices](https://discoverthreejs.com/book/appendix/ "Appendices")
- A.1:[HTML and CSS Used in This Book](https://discoverthreejs.com/book/appendix/html-and-css-reference/ "HTML and CSS Used in This Book")
- A.2:[JavaScript Reference](https://discoverthreejs.com/book/appendix/javascript-reference/ "JavaScript Reference")
- A.3:[The Document Object Model and DOM API](https://discoverthreejs.com/book/appendix/dom-api-reference/ "The Document Object Model and DOM API")
- A.4:[JavaScript Modules](https://discoverthreejs.com/book/appendix/javascript-modules/ "JavaScript Modules")
- A.5:[Asynchronous JavaScript](https://discoverthreejs.com/book/appendix/asynchronous-javascript/ "Asynchronous JavaScript")
- B.1:[Dealing with Different three.js Versions](https://discoverthreejs.com/book/appendix/threejs-versions/ "Dealing with Different three.js Versions")
- B.2:[The Big List of three.js Tips and Tricks!](https://discoverthreejs.com/tips-and-tricks/#the-big-list-of-threejs-tips-and-tricks "The Big List of three.js Tips and Tricks!")
    - [Beginner Friendly Tips, or Help! Why Can’t I See Anything?](https://discoverthreejs.com/tips-and-tricks/#basic)
    - [1. Check the browser console for error messages](https://discoverthreejs.com/tips-and-tricks/#error-message-check)
    - [2. Set the background color to something other than black](https://discoverthreejs.com/tips-and-tricks/#background-color-check)
    - [3. Make sure you have a light in your scene and that it’s illuminating your objects](https://discoverthreejs.com/tips-and-tricks/#light-check)
    - [4. Overide all materials in the scene with a MeshBasicMaterial](https://discoverthreejs.com/tips-and-tricks/#material-check)
    - [5. Is your object within the camera’s viewing frustum?](https://discoverthreejs.com/tips-and-tricks/#frustum-check)
    - [6. Is your camera inside the object?](https://discoverthreejs.com/tips-and-tricks/#camera-check)
    - [7. Think carefully about the scale of your scene](https://discoverthreejs.com/tips-and-tricks/#scale-check)
    - [General Tips](https://discoverthreejs.com/tips-and-tricks/#general-tips)
    - [Work in SI Units](https://discoverthreejs.com/tips-and-tricks/#work-in-si-units)
    - [SI Units](https://discoverthreejs.com/tips-and-tricks/#si-units)
    - [Accurate Colors](https://discoverthreejs.com/tips-and-tricks/#accurate-colors)
    - [JavaScript](https://discoverthreejs.com/tips-and-tricks/#javascript)
    - [Don’t assume you know what will be faster](https://discoverthreejs.com/tips-and-tricks/#dont-assume-you-know-what-will-be-faster)
    - [Use a style guide and linter](https://discoverthreejs.com/tips-and-tricks/#use-a-style-guide-and-linter)
    - [Models, Meshes and Other Visible Thing](https://discoverthreejs.com/tips-and-tricks/#models-meshes-and-other-visible-thing)
    - [Camera](https://discoverthreejs.com/tips-and-tricks/#camera)
    - [Renderer](https://discoverthreejs.com/tips-and-tricks/#renderer)
    - [Lights](https://discoverthreejs.com/tips-and-tricks/#lights)
    - [Shadows](https://discoverthreejs.com/tips-and-tricks/#shadows)
    - [Materials](https://discoverthreejs.com/tips-and-tricks/#materials)
    - [Custom Materials](https://discoverthreejs.com/tips-and-tricks/#custom-materials)
    - [Geometry](https://discoverthreejs.com/tips-and-tricks/#geometry)
    - [Textures](https://discoverthreejs.com/tips-and-tricks/#textures)
    - [Antialiasing](https://discoverthreejs.com/tips-and-tricks/#antialiasing)
    - [Post-Processing](https://discoverthreejs.com/tips-and-tricks/#post-processing)
    - [Disposing of Things](https://discoverthreejs.com/tips-and-tricks/#disposing-of-things)
    - [Updating Objects in Your Scene?](https://discoverthreejs.com/tips-and-tricks/#updating-objects-in-your-scene)
    - [Performance](https://discoverthreejs.com/tips-and-tricks/#performance)
    - [Advanced Tips](https://discoverthreejs.com/tips-and-tricks/#advanced-tips)
    - [Read These Pages Too!](https://discoverthreejs.com/tips-and-tricks/#read-these-pages-too)
    - [References](https://discoverthreejs.com/tips-and-tricks/#references)
- :

## [![Discover three.js logo](https://discoverthreejs.com/images/logo/banner_trans_512.png)](https://discoverthreejs.com/)

- [Table Of Contents](https://discoverthreejs.com/book/)
- [中文](https://discoverthreejs.com/zh/tips-and-tricks/)