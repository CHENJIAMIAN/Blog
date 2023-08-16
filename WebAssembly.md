1. WebAssembly是一种二进制指令集格式。
3. 开发人员可以从各种高级编程语言编译生成WebAssembly。
4. WebAssembly文件具有.wasm的文件扩展名。
5. 浏览器可以加载和执行Wasm文件。
6. 内置的WebAssembly引擎解析和执行Wasm指令集。
7. 使用WebAssembly，开发人员可以使用高性能的编程语言编写Web应用程序。

## asm.js
1. asm.js 是js 的一个极其有限的子集，该子集仅提供严格类型的整数、浮点数、算术、函数调用和堆访问。
2. WebAssembly 深受 asm.js规范的启发。它工作方式与asm.js一样，但具有独立和标准化的指令集以及更广泛的浏览器支持。
3. 当使用 Emscripten 工具链时，LLVM编译器将C/C++代码转换为asm.js的JavaScript代码。
4. 然后，使用工具链中的`asm2wasm`工具将asm.js转换为WebAssembly模块。
5. 此外，Emscripten还提供了将OpenGL代码转换为WebGL的功能，使得在Web浏览器中以高性能运行OpenGL应用程序成为可能。

## 非Web端 的 图形API

| 维度       | Direct3D 12 | Metal       | Vulkan      |
|------------|-------------|-------------|-------------|
| 创建组织   | Microsoft   | Apple       | Khronos Group |
| 平台支持   | Windows, PlayStation | Mac, iPhone | 多平台支持，包括Windows、Mac、Linux和Android等 |
| 开发语言   | C++         | Objective-C, Swift | C, C++      |
| 设备支持   | 大部分主流显卡和游戏主机 | Apple设备    | 多种硬件和操作系统支持 |
| 特性       | 强调低级硬件访问和控制 | 针对苹果生态系统的优化 | 强调跨平台和可移植性 |
| 性能       | 高性能和低延迟    | 优化的性能和能耗  | 高性能和可扩展性    |
| 开发工具   | Microsoft Visual Studio | Apple Xcode | 多种开发工具和SDK支持 |
| 生态系统     | 丰富的游戏开发和工具支持 | 针对苹果生态系统的集成 | 多个平台的广泛应用和支持 |

1. wat(人类可读)<->wasm 可互转
2. 运行时	
	1. node.js  
	2. WASMTIME (使用WASI访问文件和网络 )
3. 实例化 `WebAssembly.instantiateStreaming()`方法可直接从网络流中异步加载和实例化WebAssembly模块，适用于较大模块且提供更快的加载性能。
			- 返回`result.instance`和`result.module`
				- WebAssembly.Instance.exports{方法1/方法2
				- WebAssembly.Module.exports{方法1/方法2
1. 编译`WebAssembly.compileStreaming()`方法用于异步编译WebAssembly模块，但不进行实例化，适用于需要在编译和实例化之间执行其他操作的场景, **如多个实例在多个web worker**
			- 返回module, 用WebAssembly.Instance(module)获得实例
				1. `WebAssembly.instantiate()`适用于异步加载和实例化WebAssembly模块的情况，更适合于在模块加载过程中执行其他操作，如对导入对象进行自定义处理。返回`result.instance`和`result.module`
				2. `WebAssembly.Instance`适用于在模块已经加载完毕
2. 验证(实例化 或 编译 的时候自动验证了)


1. WebAssembly基础介绍  
    1.1 定义和作用 
    1.2 与JavaScript的关系  
    1.3 优势和适用场景
    
2. WebAssembly模块的加载和使用  
    2.1 使用WebAssembly JavaScript API加载模块  
    2.2 创建WebAssembly.Instance实例  
    2.3 WebAssembly.Module和WebAssembly.Instance的区别和用途  
    2.4 Result对象的处理和使用  
    2.5 WebAssembly.validate函数的作用和用途
    
3. JavaScript和WebAssembly的函数交互  
    3.1 导出函数供JavaScript调用  
    3.2 导入JavaScript函数供WebAssembly调用  
    3.3 使用WebAssembly.Table实现函数指针的功能
	    
    
4. JavaScript和WebAssembly的变量和内存操作  
    4.1 全局变量的定义和使用  
    4.2 WebAssembly内存的概念和使用方式  
    4.3 在多线程环境中使用WebAssembly.Memory
    
5. 异常处理和调试  
    5.1 处理WebAssembly实例化错误  
    5.2 运行时错误的处理方法  
    5.3 调试WebAssembly应用程序中的错误和问题
    
6. 不同的WebAssembly运行时环境  
    6.1 在Node.js中使用WebAssembly  
    6.2 使用WebAssembly System Interface (WASI)  
    6.3 使用Wasmtime运行WebAssembly模块
    
7. 常用的工具和语言  
    7.1 工具介绍  
    7.2 使用C++和Emscripten进行开发  
    7.3 使用Rust编写WebAssembly模块  
    7.4 使用Blazor开发WebAssembly应用程序