
### WebGL 的知识体系
1. **基础知识**：包括 WebGL 的工作原理，如何在 HTML5 `<canvas>` 上创建 WebGL 渲染上下文，以及如何使用 WebGL API。
2. **图形渲染管线**：理解 WebGL 的图形渲染管线，包括顶点着色器和片段着色器，以及它们如何处理和渲染 3D 几何体。
3. **3D 数学**：包括向量、矩阵和四元数等概念，以及它们在 3D 变换、光照计算和动画中的应用。
4. **纹理和材质**：理解纹理坐标、纹理过滤、纹理映射等概念，以及如何使用纹理创建各种材质效果。
5. **光照和阴影**：理解基础的光照模型，如 Phong 和 Blinn-Phong，以及如何实现阴影映射。
6. **性能优化**：理解如何优化 WebGL 应用的性能，包括网格优化、纹理优化、批量渲染、LOD 等技术。
7. **高级技术**：包括后处理效果、粒子系统、地形渲染、环境映射、纹理贴图、实时反射和折射等。

1. **如何在 Three.js 中实现阴影效果？**  (光照和阴影)
   这个问题可以引导你深入了解光照模型、阴影映射技术如深度映射（Shadow Mapping）或百分比更近过滤（Percentage-Closer Filtering）等。
2. **如何在 Three.js 中实现后处理效果，如模糊、泛光等？**  (高级技术（后处理效果）
   这个问题会引导你研究帧缓冲对象（Frame Buffer Objects）、全屏四边形渲染和着色器编程。
3. **如何在 Three.js 中实现物体的 LOD（Level Of Detail）？**  性能优化（LOD）
   这个问题将引导你深入了解多级别细节模型的概念和实现，以及如何根据相机距离动态选择不同的模型。
4. **如何在 Three.js 中实现粒子系统？**  高级技术（粒子系统）
   这个问题将引导你研究粒子系统的基本原理，如何使用顶点着色器来动画化大量粒子，以及如何使用纹理来给粒子着色。
5. **如何在 Three.js 中实现天空盒（Skybox）？**  高级技术（环境映射）
   这个问题将引导你研究立方体贴图和环境映射的概念和实现。
6. **如何在 Three.js 中实现地形加载和渲染？**  高级技术（地形渲染）
   这个问题将引导你研究地形数据的来源，例如 DEM（数字高程模型），如何使用这些数据生成高度图，以及如何使用自定义着色器实现地形渲染。
7. **如何在 Three.js 中实现镜面反射效果？**  高级技术（实时反射和折射）
   这个问题将引导你研究立方体贴图实现环境反射，或者使用渲染到纹理（Render to Texture）实现动态反射。

### THREE加载GLB多大多少帧量化
标准:600 个网格和 1,000,000 个顶点。 在我们的 2018 Macbook Pro 上的 Google Chrome 中，它始终以 45+ FPS 的速度运行

### src/objects/Line 和 examples/jsm/lines/Line2
1. `src/objects/Line` 是 Three.js 的核心模块，默认提供的基本线段渲染功能。它是最常用的 `Line` 实现。
	  - 使用传统的 WebGL 渲染管线实现。
	  - 线段是由一个 `BufferGeometry` 和一个 `LineBasicMaterial` 或 `LineDashedMaterial` 来绘制的。
2. `examples/jsm/lines/Line2` 是 Three.js 的扩展模块，用于增强线段渲染功能，解决某些核心模块中的功能限制。它依赖于 `examples/jsm/lines/LineSegments2`、`LineGeometry` 和 `LineMaterial`。
- **实现方式：**
  - 使用自定义的顶点和片段着色器，通过扩展来实现更精细的控制。
  - 支持宽线，线宽可超过 1 像素。
  - 支持抗锯齿和其他高级效果。

| 特性                 | `src/objects/Line`                  | `examples/jsm/lines/Line2`        |
|----------------------|-------------------------------------|-----------------------------------|
| **线宽**            | 固定（最多 1 个像素，受限于 WebGL） | 可配置宽线，支持任意宽度         |
| **抗锯齿**          | 不支持                              | 支持                              |
| **实现复杂度**      | 简单                               | 复杂                              |
| **性能**            | 性能更高，适合几何较少的场景         | 性能稍低，适合复杂场景            |
| **适用场景**        | 简单线框模型                        | 高质量线条、路径可视化            |
| **加载方式**        | 核心库，直接使用                    | 拓展模块，需要加载 `examples`    |
### InterleavedBuffer

1. `InterleavedBuffer` 是一种高效的顶点数据存储方式，将多个顶点属性交错存储在单个缓冲区中。
2. 它在底层对应 WebGL 的缓冲区 (`ARRAY_BUFFER`) 和 `vertexAttribPointer` API，通过设定步长和偏移量来读取不同属性的数据。
3. `InterleavedBuffer` 提高了渲染性能，减少了内存开销和 GPU 访问数据的延迟，适合处理复杂的几何图形。

### 纹理坐标通道 和 纹理类型
光照贴图、细节纹理、环境贴图、法线贴图等这些不同类型的纹理，*各自* 都 **可以** 使用最多 4 个纹理坐标通道 (`uv`, `uv1`, `uv2`, `uv3`)。

1. **纹理与坐标通道的分离：**
*   纹理 本身是存储像素数据的图像，可以是颜色、光照、高度等。
*   纹理坐标 通道是用来定义如何将这些纹理数据映射到 3D 模型表面的方法。
*   纹理和纹理坐标通道 是**相对独立**的概念。

2. **three.js 的实现**
* 在 three.js 中，你可以通过设置 `THREE.MeshBasicMaterial`, `THREE.MeshLambertMaterial`, `THREE.MeshPhongMaterial` 等材质的 `map` (基础颜色纹理), `lightMap` (光照贴图)， `bumpMap` (高度贴图), `normalMap` (法线贴图), `envMap` (环境贴图) 等属性来绑定不同的纹理。
*   每个纹理，你可以通过 `texture.channel` 属性来设置对应的纹理坐标通道。
*   如果你不设置 channel, 那么默认会使用 `uv` 通道。
*   在 fragment shader 中，你也可以通过 `vUv` , `vUv1`, `vUv2`, `vUv3` 来读取对应的纹理坐标。

**示例说明：**
假设你有一个模型，你需要：
*   **基础颜色:** 你会使用 `uv` 坐标和基础颜色纹理
*   **光照贴图:** 你会使用 `uv1` 坐标和光照贴图
*   **细节纹理:** 你可能会使用 `uv2` 坐标和细节纹理
*   **法线贴图:** 你可能会使用和基础颜色纹理一样的`uv`坐标和法线贴图。

### PMREMGenerator
> 预过滤的、多级纹理映射的环境贴图（Prefiltered, Mipmapped Radiance Environment Map, PMREM）
```js
1.  **`pmremGenerator.fromScene(scene)`** (外部调用)
	*   `_setSize(256)`
	*   `_allocateTargets()`
	   *    `_createRenderTarget()`
	   *    `_dispose()`
	   *     `_createRenderTarget()`
	   *    `_createPlanes( _lodMax )`
	   *     `_getBlurShader()`
	*   `_sceneToCubeUV(scene, near, far, cubeUVRenderTarget)`
		*   （在循环中，对每个立方体面进行渲染）：
		   *     `renderer.setRenderTarget(cubeUVRenderTarget)`
			*   `renderer.render(backgroundBox, cubeCamera)`
		   *     `renderer.render(scene, cubeCamera)`
	*   `_blur(cubeUVRenderTarget, 0, 0, sigma)` （如果 sigma > 0）
		*   `_halfBlur(cubeUVRenderTarget, pingPongRenderTarget, lodIn, lodOut, sigma, 'latitudinal', poleAxis)`
			*   `renderer.setRenderTarget(pingPongRenderTarget)`
		   *  `renderer.render(blurMesh, _flatCamera)`
		*   `_halfBlur(pingPongRenderTarget, cubeUVRenderTarget, lodOut, lodOut, sigma, 'longitudinal', poleAxis)`
			 *    `renderer.setRenderTarget(cubeUVRenderTarget)`
			 * `renderer.render(blurMesh, _flatCamera)`
	*   `_applyPMREM(cubeUVRenderTarget)`
		*   （在循环中，对每个 LOD 层级进行模糊处理）
			*   `_blur(cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis)`
				 *    `_halfBlur(...)`
				 *    `_halfBlur(...)`
	*   `_cleanup(cubeUVRenderTarget)`
            *  `renderer.setRenderTarget( _oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel )`
```
