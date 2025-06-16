> 最初于 2013 年由两名微软员工开发.

1. v1.12    2014 开始完全使用 TypeScript 开发`Babylon\Particles\babylon.particle.js`
2. v2.2.0   2015 重构了目录结构`src\Particles\particle.ts`
3. v2.5.0   2016 完全删除了.js文件只剩下.ts文件(之前是共存)
4. v5.0.0   2022 重构了目录结构`packages\dev\core\src\Particles\particle.ts`


```js
engineFactory.ts
	Engine(webgl的引擎)
		thinEngine.ts 用了WebGL2RenderingContext
	WebGPUEngine
```

### 获取某公司温度场体积云的shader代码
1. 参考[Particle Demo | Babylon.js Playground --- 粒子演示 | Babylon.js 游乐场](https://www.babylonjs-playground.com/#WBQ8EM)
2. 注入`<script src="https://greggman.github.io/webgl-helpers/webgl-log-shaders.js"></script>`
3. 打印出相关的着色器代码(此时已经是条件编译后的, 去掉了源码中很多没用到的条件编译代码)
4. 进一步用GPT去掉没用到的代码
5. GPT转three.js的写法
### `particles.vertex.fx`如何被使用?
#### 编译
1. 引入
	1. import "../Shaders/particles.fragment";
	2. import "../Shaders/particles.vertex";
2. 编译
	1. packages/dev/buildTools/src/buildShaders.ts
##### 编译举例
fx文件
```c
// myShader.fx
void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 红色
}
```
执行编译
```javascript
// 假设 buildShader 函数和相关的工具函数已经定义好了
buildShader("/path/to/myShader.fx");
```
变成
```javascript
// myShader.ts
import { ShaderStore } from "path/to/shaderStore";

const name = "myShader";
const shader = `void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 红色
}`;

// Sideeffect
ShaderStore.ShadersStore[name] = shader;

/** @internal */
export const myShader = { name, shader };
```
#### 使用
```ts
packages.dev.core.src.Particles.particleSystem.ParticleSystem._getWrapper
	drawWrapper.setEffect(
		this._engine.createEffect("particles", attributesNamesOrOptions, effectCreationOption, samplers, join), 
		join
	);
	
packages.dev.core.src.Engines.thinEngine.ThinEngine.createEffect
	const effect = new Effect(

packages.dev.core.src.Materials.effect.Effect.constructor
packages.dev.core.src.Materials.effect.Effect._processShaderCode
packages.dev.core.src.Materials.effect.Effect._loadShader
	const shaderStore = EngineShaderStore.GetShadersStore(this._shaderLanguage);
```


### [优化您的场景 | Babylon.js 文档](https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene)
1. **提高渲染效率：**
   - 使用TransformNode替代AbstractMesh或空meshes：减少相机需要检测的对象数量来提升性能。
   - 减少Shaders开销：对于静态材质，你可以通过冻结和解冻材质来控制shader的更新。
   - 减少World Matrices计算：你可以冻结mesh的world matrix来提高性能。
   - 冻结活动meshes：冻结活动meshes可以减少CPU用于确定活动meshes的时间。
   - 减少draw calls：尽可能使用instances，他们只需一次draw call即可。
	   - 包括减少多边形数量、使用实例化来减少绘制调用次数，并合并材质以减少Babylon在每次渲染中需要处理的对象数量(因为gltf一个材质会被拆分为一个单独的对象)。
   - 使用深度预通道：对于复杂场景，使用深度预通道可能很有用。
   - 使用未索引的meshes：当顶点重用率低并且顶点结构相当简单时（像仅有位置和法线），你可能希望展开你的顶点并停止使用索引。
   - 使用Animation Ratio：Babylon.js根据当前帧率处理速度。
   - VR/XR场景的Multiview：当使用Babylon.js与WebVR或WebXR一起使用时，启用Multiview是快速提高渲染速度的方法。
2. **降低CPU和GPU负担：**
   - 不更新边界信息：你可以关闭边界信息同步来加速world matrix的计算。
   - 不在pointer移动时挑选场景：设置scene.skipPointerMovePicking = true可以避免这个过程。
   - 减少对gl.clear()的调用：如果你的场景始终100%被不透明的几何体填充，你可以禁用默认的场景清除行为。
   - 阻止dirty mechanism：默认情况下，场景会在你改变可能影响他们的属性时保持所有材质的更新。
   - 大量meshes的场景的优化选项：如果你的场景中有大量的meshes，你可能需要减少添加/删除这些meshes到/从场景所花费的时间。
3. **改善渲染策略：**
   - 改变Mesh Culling Strategy：Culling是选择是否传递一个mesh到GPU进行渲染的过程。
   - 性能优先模式：从Babylon.js 5.22开始，你现在可以改变场景将如何处理性能，关于向后兼容性和易用性。
4. **处理特殊情况：**
   - 处理WebGL context lost事件：从版本3.1开始，Babylon.js可以处理WebGL context lost事件。
   - 使用EngineInstrumentation和SceneInstrumentation进行性能分析：当你想优化一个场景时，仪表是一个关键工具。

### 性能优化的本质
1. **优化几何体**：尽量减少渲染的顶点和三角形数量。使用更简单的网格表示复杂的几何体，或者只渲染视野中的物体（即视锥体剔除，frustum culling）。
2. **批量渲染**：尽量减少 draw call 的数量。例如，可以将许多小的几何体合并到一个大的几何体中，然后一次性渲染，这通常被称为批量渲染或批处理。
3. **优化纹理**：使用合适大小的纹理，避免过大的纹理消耗过多的内存和带宽。使用压缩纹理格式可以减少 GPU 的内存使用。
4. **使用等级细节 (LOD) 技术**：LOD 是一种常见的优化技术，通过根据物体距离观察者的远近，选择不同精度（细节）的模型或纹理进行渲染。物体离观察者越远，使用的模型和纹理就越简单。这能大大减少渲染远处物体所需要的计算量。
5. **避免不必要的状态改变**：频繁地改变 WebGL 的状态（如切换着色器或纹理）会导致性能下降。应尽量将相同状态的渲染操作分组在一起。
6. **使用合适的着色器**：复杂的着色器会增加 GPU 的负担。如果可能，应尽量使用简单的着色器，或者根据物体的视觉重要性选择不同的着色器。

### 固体粒子 和 标准粒子系统
#### 标准粒子系统（Standard Particle System）
- **主要用途：** 用于创建如烟、火、雾等效果。这些粒子通常是小的、简单的几何体（如平面或点），可以表示为纹理。
- **性能：** 标准粒子系统可以处理成千上万的粒子，因为每个粒子的计算成本相对较低。
- **自定义程度：** 提供了丰富的API来自定义粒子的生命周期、速度、颜色、大小等属性。
- **渲染效率：** 粒子通常不会进行复杂的计算或碰撞检测，因此可以快速渲染。

#### 固体粒子系统（Solid Particle System, SPS）
- **主要用途：** 用于创建和管理复杂的3D对象的集合，如一群鸟、鱼群或任何需要个别控制每个实体的场景。
- **性能：** 由于需要更复杂的计算（如每个粒子的3D变换），处理的粒子数量可能会少于标准粒子系统。
- **自定义程度：** SPS允许对每个粒子进行个别的几何变换（位置、旋转、缩放），并且粒子可以是任何3D对象，提供了更高的自定义能力。
- **渲染效率：** 每个粒子都是一个完整的3D对象，可能会进行碰撞检测或其他复杂的计算，因此对性能的要求更高。

### MirrorTexture
>  extends RenderTargetTexture
```js
this._groundMirror.mirrorPlane
this._groundMirror.anisotropicFilteringLevel
this._groundMirror.wrapU
this._groundMirror.wrapV
this._groundMirror.clearColor
this._groundMirror.adaptiveBlurKernel
```
### reflectionTexture
> packages.dev.core.src.Materials.standardMaterial.StandardMaterial.reflectionTexture
```js
reflectionTexture可设置为MirrorTexture
```
### packages\dev\core\src\Materials\standardMaterial
```js
                if (this._reflectionTexture && StandardMaterial.ReflectionTextureEnabled) {
                    if (this._reflectionTexture.isCube) {
                        effect.setTexture("reflectionCubeSampler", this._reflectionTexture);
                    } else {
                        effect.setTexture("reflection2DSampler", this._reflectionTexture);
                    }
                }
```
### packages\dev\core\src\Shaders\default.fragment
```js
**1. 条件判断：**

   - 首先代码判断是否启用反射效果，通过 `#ifdef REFLECTION` 宏控制。

**2. 反射方向向量计算：**

   -  `vec3 vReflectionUVW = computeReflectionCoords(vec4(vPositionW, 1.0), normalW);` 这一行代码用于计算反射方向向量。
     - `computeReflectionCoords` 函数是一个自定义函数，用于根据世界空间位置 `vPositionW` 和法线向量 `normalW` 计算反射方向向量。
     - 函数具体实现取决于反射贴图类型，但通常会利用法线向量和视线向量计算反射方向向量。
   -  `#ifdef REFLECTIONMAP_OPPOSITEZ` 条件判断用于处理 Z 轴方向相反的反射贴图，将反射方向向量的 Z 分量取反。

**3. 反射颜色采样：**

   -  `reflectionColor = textureCube(reflectionCubeSampler, vReflectionUVW);` 这一行代码使用 `textureCube` 函数从立方体贴图 `reflectionCubeSampler` 中采样反射颜色。
   -  `#ifdef REFLECTIONMAP_3D`  判断是否使用立方体贴图，如果使用则使用 `textureCube` 函数采样。否则用`reflection2DSampler`
   -  `#ifdef ROUGHNESS` 判断是否使用粗糙度，如果使用则使用 `textureCube` 函数的 `bias` 参数，根据粗糙度进行采样偏移。
   -  `#else`  块用于处理非立方体贴图的情况，代码中没有展示具体实现，但通常会使用 `texture2D` 函数从 2D 贴图中采样。

**4. 反射颜色修正：**

   -  `#ifdef RGBDREFLECTION` 判断是否使用 RGBD 格式的反射贴图，如果使用则需要将采样的颜色从 RGBD 格式转换为 RGB 格式。
   -  `#ifdef IS_REFLECTION_LINEAR` 判断是否使用线性空间的反射贴图，如果使用则需要将采样的颜色从线性空间转换为伽马空间。
   -  `reflectionColor.rgb *= vReflectionInfos.x;`  使用 `vReflectionInfos.x` 参数缩放反射颜色，可以用来调整反射强度的。

**5. 反射菲涅尔计算：**

   -  `#ifdef REFLECTIONFRESNEL`  判断是否使用菲涅尔反射效果，如果使用则使用 `computeFresnelTerm` 函数计算菲涅尔反射系数。
     - `computeFresnelTerm` 函数根据视线方向 `viewDirectionW`、法线向量 `normalW` 和两个菲涅尔参数 `reflectionRightColor.a`、`reflectionLeftColor.a` 计算菲涅尔反射系数。
   -  根据计算的菲涅尔反射系数，使用 `reflectionLeftColor` 和 `reflectionRightColor` 混合得到最终的反射颜色。

**6. 合并反射颜色：**

   -  最终的反射颜色会被合并到最终输出颜色中，并根据 `#ifdef EMISSIVEASILLUMINATION` 条件判断决定合并方式。

**总的来说，代码中 Reflection 部分实现了一个简单的反射效果，可以根据反射贴图类型和菲涅尔参数实现不同效果。**

**代码中 Reflection 部分的一些特点:**

- 支持立方体贴图和 2D 贴图。
- 支持粗糙度参数，可以模拟不同材质的反射效果。
- 支持菲涅尔反射，可以模拟反射强度的变化。
- 反射颜色的混合方式可以根据场景需求进行调整。
```
