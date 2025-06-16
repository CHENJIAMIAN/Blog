
|        | CUDA                         | OpenCL               | OpenGL                                 | DirectX                                    |
| ------ | ---------------------------- | -------------------- | -------------------------------------- | ------------------------------------------ |
| 目的     | 用于通用计算，特别针对 NVIDIA GPU       | 用于通用计算，跨平台支持多种设备     | 用于图形渲染和处理                              | 用于游戏和多媒体开发，提供整套解决方案                        |
| 平台支持   | NVIDIA GPU                   | 跨平台，支持多种设备（CPU、GPU等） | 跨平台，适用于多种操作系统和硬件平台                     | 主要针对 Windows 操作系统                          |
| 编程模型   | 类似 C/C++，提供专门的编程语言和库         | 类似 C/C++，提供专门的编程语言和库 | 基于状态机，使用 OpenGL Shading Language（GLSL） | 基于状态机，使用 High-Level Shading Language（HLSL） |
| 功能     | 针对 NVIDIA GPU 进行高性能计算        | 跨平台通用计算，支持多种设备       | 图形渲染和处理                                | 游戏开发，提供图形、音频、输入、网络等功能                      |
| 开发者方便性 | 针对 NVIDIA GPU 进行优化，提供更高级别的抽象 | 跨平台，支持多种设备，较高级别的抽象   | 相对较低，需要编写较多的底层代码                       | 相对较高，提供更全面的解决方案和简化的开发接口                    |

以上表格对比了CUDA、OpenCL、OpenGL和DirectX的主要特点。CUDA和OpenCL主要用于通用计算，但CUDA专注于 NVIDIA GPU，而OpenCL是跨平台的。OpenGL和DirectX主要用于图形渲染和游戏开发，其中OpenGL跨平台而DirectX主要面向Windows操作系统。它们在编程模型、功能和开发者方便性方面也存在一些差异。

通过OpenCL和OpenGL的集成，可以实现以下高的性能和效果 工作流程：
1. 使用OpenCL进行并行计算任务，例如图像处理、物理模拟等。在这个过程中，计算任务会在GPU上执行。
2. 计算完成后，可以将计算结果从GPU内存中读取出来。
3. 将计算结果传递给OpenGL，使用OpenGL的绘制函数将结果渲染到屏幕上。可以将计算结果作为纹理或顶点数据传递给OpenGL进行渲染。
## 非Web端 的 图形API
| 维度   | Direct3D 12             | Metal              | Vulkan                             |
| ---- | ----------------------- | ------------------ | ---------------------------------- |
| 创建组织 | Microsoft               | Apple              | Khronos Group                      |
| 平台支持 | Windows, PlayStation    | Mac, iPhone        | 多平台支持，包括Windows、Mac、Linux和Android等 |
| 开发语言 | C++                     | Objective-C, Swift | C, C++                             |
| 设备支持 | 大部分主流显卡和游戏主机            | Apple设备            | 多种硬件和操作系统支持                        |
| 特性   | 强调低级硬件访问和控制             | 针对苹果生态系统的优化        | 强调跨平台和可移植性                         |
| 性能   | 高性能和低延迟                 | 优化的性能和能耗           | 高性能和可扩展性                           |
| 开发工具 | Microsoft Visual Studio | Apple Xcode        | 多种开发工具和SDK支持                       |
| 生态系统 | 丰富的游戏开发和工具支持            | 针对苹果生态系统的集成        | 多个平台的广泛应用和支持                       |
|      |                         |                    |                                    |
### 概念
workgroup 相当于 分布式计算
[Orillusion/orillusion - GitHub1s](https://github1s.com/Orillusion/orillusion)
```js 
//根据orillusion得出常用API:
device.createBindGroup
device.createBindGroupLayout
device.createBuffer
device.createCommandEncoder
device.createComputePipeline
device.createPipelineLayout
device.createRenderBundleEncoder
device.createRenderPipeline
device.createSampler
device.createShaderModule
device.createTexture
device.importExternalTexture
device.queue.copyExternalImageToTexture
device.queue.submit
device.queue.writeBuffer

commandEncoder
	computePass
		computePipeline
			shaderModule
			pipelineLayout
				bindGroupLayout
		bindGroup
			buffer
	renderPass
		renderPipeline
			shaderModule
			pipelineLayout
				bindGroupLayout
		bindGroup
			buffer
		
		textureView
		
		renderBundle

	copyExternalImageToTexture//将外部图像复制到纹理
		importExternalTexture
			canvas元素
	
renderBundleEncoder//用于预先录制一系列渲染命令，可以重复使用
```
### 最小案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGPU Example</title>
</head>
<body>
    <canvas id="gpuCanvas" width="640" height="480"></canvas>
    <script>
        // 获取 canvas 和 WebGPU 上下文
        const canvas = document.getElementById("gpuCanvas");
        const context = canvas.getContext("webgpu");

        const startWebGPU = async () => {
            // 检测并请求适配器
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                console.error("Failed to get GPU adapter.");
                return;
            }

            // 获取设备
            const device = await adapter.requestDevice();

            // 配置画布格式和大小
            const format = "bgra8unorm";
            context.configure({
                device: device,
                format: format
            });

            // 编写渲染管线和着色器
            const shaderCode = `
                @stage(vertex)
                fn vs_main(@builtin(vertex_index) vertexIndex : u32) -> @builtin(position) vec4<f32> {
                    var pos = array<vec2<f32>, 3>(
                        vec2<f32>(0.0, 0.5),
                        vec2<f32>(-0.5, -0.5),
                        vec2<f32>(0.5, -0.5));
                    return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                }

                @stage(fragment)
                fn fs_main() -> @location(0) vec4<f32> {
                    return vec4<f32>(1.0, 0.0, 0.0, 1.0);
                }
            `;

            // 创建着色器模块
            const shaderModule = device.createShaderModule({ code: shaderCode });

            // 创建渲染管线
            const pipeline = device.createRenderPipeline({
                vertex: {
                    module: shaderModule,
                    entryPoint: 'vs_main'
                },
                fragment: {
                    module: shaderModule,
                    entryPoint: 'fs_main',
                    targets: [{
                        format: format
                    }]
                },
                primitive: {
                    topology: 'triangle-list'
                }
            });

            // 创建命令编码器
            const commandEncoder = device.createCommandEncoder();
            const textureView = context.getCurrentTexture().createView();
            const renderPassDescriptor = {
                colorAttachments: [{
                    view: textureView,
                    loadOp: 'clear',
                    clearValue: {r: 0.0, g: 0.0, b: 0.0, a: 1.0},
                    storeOp: 'store'
                }]
            };

            // 设置渲染通道
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.draw(3, 1, 0, 0);
            passEncoder.end();

            // 提交指令
            device.queue.submit([commandEncoder.finish()]);
        };

        startWebGPU();
    </script>
</body>
</html>
// device.createShaderModule(shaderCode)着色器 -> device.createRenderPipeline(vertex,fragment,primitive)管道 ->  device.createCommandEncoder编码器 -> 编码器开始渲染通道 -> device.queue.submit(编码器)
```
## WebGPUBackend 代码分析
```js
这段代码定义了 `WebGPUBackend` 类，它是 Three.js 渲染器的一个后端，用于使用 WebGPU 进行渲染。下面我们来逐段分析其功能：

**1. 构造函数**

*   设置 `isWebGPUBackend` 属性为 `true`，表明这是一个 WebGPU 后端。
*   处理一些参数的默认值，例如 `alpha`、`antialias` 和 `sampleCount`。
*   初始化一些内部变量，例如 `device`、`context`、`colorBuffer` 等。
*   创建一些工具类实例，例如 `WebGPUUtils`、`WebGPUAttributeUtils` 等。

**2. 初始化**

*   调用父类的 `init` 方法进行初始化。
*   根据参数创建或获取 WebGPU 设备和上下文。
*   配置上下文，设置格式、用途和 alpha 模式。
*   更新画布大小。

**3. 渲染流程**

*   `beginRender`：开始渲染过程，创建命令编码器和渲染通道，设置渲染目标、清除值、视口、裁剪区域等。
*   `finishRender`：结束渲染过程，结束渲染通道，提交命令编码器，并处理遮挡查询和时间戳查询。
*   `draw`：绘制渲染对象，设置管线、绑定组、顶点缓冲区、索引缓冲区等，并执行绘制命令。

**4. 其他功能**

*   `clear`：清除颜色、深度和模板缓冲区。
*   `createSampler`、`destroySampler`：创建和销毁采样器。
*   `createTexture`、`updateTexture`、`destroyTexture`：创建、更新和销毁纹理。
*   `createProgram`、`destroyProgram`：创建和销毁着色器程序。
*   `createRenderPipeline`、`createComputePipeline`：创建渲染管线和计算管线。
*   `createBindings`、`updateBindings`、`updateBinding`：创建、更新和修改绑定组。
*   `createAttribute`、`updateAttribute`、`destroyAttribute`：创建、更新和销毁属性缓冲区。
*   `updateSize`：更新画布大小。
*   `getMaxAnisotropy`：获取最大各向异性过滤级别。
*   `hasFeature`：检查设备是否支持某个特性。
*   `copyTextureToTexture`：将一个纹理复制到另一个纹理。
*   `copyFramebufferToTexture`：将帧缓冲区复制到纹理。

**5. 工具类**

*   `WebGPUUtils`：提供一些 WebGPU 相关的实用函数。
*   `WebGPUAttributeUtils`：提供属性缓冲区相关的实用函数。
*   `WebGPUBindingUtils`：提供绑定组相关的实用函数。
*   `WebGPUPipelineUtils`：提供管线相关的实用函数。
*   `WebGPUTextureUtils`：提供纹理相关的实用函数。
```
### WGSL

```c
// 声明常量  
const PI: f32 = 3.14159;  

// 函数声明  
fn add(a: f32, b: f32) -> f32 {  
    return a + b; // 返回两个浮点数的和  
}  

// 结构体声明  
struct VertexInput {  
    // 顶点位置  
    @location(0) position: vec3<f32>,   
    // 顶点颜色  
    @location(1) color: vec4<f32>,  
};  

// 结构体声明，用作片段着色器的输出  
struct FragmentOutput {  
    // 输出颜色值  
    @location(0) outColor: vec4<f32>,  
};  

// 顶点着色器示例  
@vertex  
fn vs_main(input: VertexInput) -> @builtin(position) vec4<f32> {  
    // 变换顶点位置  
    let transformed_position = vec4<f32>(input.position, 1.0);  
    return transformed_position; // 返回变换后的顶点位置  
}  

// 片段着色器示例  
@fragment  
fn fs_main(input: VertexInput) -> FragmentOutput {  
    var output: FragmentOutput;  
    // 为输出颜色赋值  
    output.outColor = input.color; // 使用输入颜色作为输出颜色  
    return output; // 返回片段输出  
}  

// 计算法线  
fn compute_normal(normal: vec3<f32>, light_dir: vec3<f32>) -> f32 {  
    return max(dot(normal, light_dir), 0.0); // 计算光照强度  
}  

// 主函数示例 (伪)  
fn main() {  
    // 模拟应用程序逻辑  
    let x = add(1.0, 2.0); // 调用加法函数  
    let normal = vec3<f32>(0.0, 0.0, 1.0); // 定义法线向量  
    let light_dir = vec3<f32>(1.0, -1.0, 0.0); // 定义光照方向  
    let intensity = compute_normal(normal, light_dir); // 计算光照强度  
}
```
