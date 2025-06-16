1. WebAssembly是一种二进制指令集格式。
3. 开发人员可以从各种高级编程语言编译生成WebAssembly。
4. WebAssembly文件具有.wasm的文件扩展名。
5. 浏览器可以加载和执行Wasm文件, 内置的WebAssembly引擎解析和执行Wasm指令集。
6. wat(人类可读)<->wasm 可互转
## asm.js
1. asm.js 是js 的一个极其有限的子集，该子集仅提供严格类型的整数、浮点数、算术、函数调用和堆访问。
2. WebAssembly 深受 asm.js规范的启发。它工作方式与asm.js一样，但具有独立和标准化的指令集以及更广泛的浏览器支持。
3. 当使用 Emscripten 工具链时，LLVM编译器（Low Level Virtual Machine）将C/C++代码转换为asm.js的JavaScript代码。
4. 然后，使用工具链中的`asm2wasm`工具将asm.js转换为WebAssembly模块。
5. 此外，Emscripten还提供了将OpenGL代码转换为WebGL的功能，使得在Web浏览器中以高性能运行OpenGL应用程序成为可能。

### 目录
#### 1. WebAssembly基础介绍  
1.1 定义和作用 
1.2 与JavaScript的关系  
1.3 优势和适用场景
    
#### 2. WebAssembly模块的加载和使用  
2.1 使用WebAssembly JavaScript API加载模块  
2.2 创建WebAssembly.Instance实例  
2.3 WebAssembly.Module和WebAssembly.Instance的区别和用途  
2.4 Result对象的处理和使用  
2.5 WebAssembly.validate函数的作用和用途
    
#### 3. JavaScript和WebAssembly的函数交互
3.1 导出函数供JavaScript调用  
	1. 实例化 `WebAssembly.instantiateStreaming()`方法可直接从网络流中异步加载和实例化WebAssembly模块，适用于较大模块且提供更快的加载性能。
			- 返回`result.instance`和`result.module`
				- WebAssembly.Instance.exports{方法1/方法2
				- WebAssembly.Module.exports{方法1/方法2
	2. 编译`WebAssembly.compileStreaming()`方法用于异步编译WebAssembly模块，但不进行实例化，适用于需要在编译和实例化之间执行其他操作的场景, **如多个实例在多个web worker**
			- 返回module, 用WebAssembly.Instance(module)获得实例
				1. `WebAssembly.instantiate()`适用于异步加载和实例化WebAssembly模块的情况，更适合于在模块加载过程中执行其他操作，如对导入对象进行自定义处理。返回`result.instance`和`result.module`
				2. `WebAssembly.Instance`适用于在模块已经加载完毕
3.2 导入JavaScript函数供WebAssembly调用  
	- WebAssembly.instantiateStreaming(fetch('multiply.wasm'), importObject/*给wasm的js对象*/)
3.3 使用WebAssembly.Table实现函数指针的功能
	- 类似数组
	- 用于将多个 JavaScript 和 WebAssembly 模块绑定在一起。它允许模块之间共享并调用函数，通过将函数引用存储在类似表格的数据结构中

#### 4. JavaScript和WebAssembly的变量和内存操作  
4.1 全局变量的定义和使用  
	- 用作跨语言边界传递数据的机制
4.2 WebAssembly内存的概念和使用方式  
	- 共享内存
	- initial一个数字64kb
4.3 在多线程环境中使用WebAssembly.Memory
	- SharedArrayBuffer允许多个Web Worker共享同一块内存
    
#### 5. 异常处理和调试  
1. **CompileError**：在编译阶段，如果WebAssembly模块的代码存在错误，将抛出此异常。通常表示语法错误或模块结构问题。
2. **TypeError**：在验证阶段，如果WebAssembly模块不符合类型要求，将抛出此异常。通常发生在函数签名不匹配或无效的内存访问等类型不匹配的情况。
3. **LinkError**：在链接阶段，如果将WebAssembly模块与其依赖项连接时出现问题，将抛出此异常。如果缺少必需的函数或导入项不兼容，就可能发生这种情况。
4. **RuntimeError**：当WebAssembly模块在执行过程中发生异常时，将抛出此异常。可能是由于除以零、越界内存访问或其他运行时错误引起的异常。
为了改善WebAssembly中异常的透明度，引入了两个额外的实体：
1. **WebAssembly.Exception**：这是表示异常的WebAssembly值。它允许在WebAssembly模块内部捕获和传播异常。
2. **WebAssembly.Tag**：这是一个WebAssembly结构，将特定的异常类型与一段代码关联起来。它提供了一种结构化的方式来处理异常，并在WebAssembly中实现更明确的异常处理。

#### 6. 不同的WebAssembly运行时环境  
6.1 在Node.js中使用WebAssembly  
6.2 使用WebAssembly System Interface (WASI)  
	- 提供一些给wasm操作文件/网络/操作系统API的**JS对象**
6.3 使用Wasmtime运行WebAssembly模块
    
#### 7. 常用的工具和语言  
7.1 工具介绍  
7.2 使用C++和Emscripten进行开发  
7.3 使用Rust编写WebAssembly模块  
7.4 使用Blazor开发WebAssembly应用程序
- 由Microsoft开发的Web框架
- Blazor利用WebAssembly在浏览器中直接运行C#代码，可以在不需要JavaScript的情况下使用C#进行全栈Web开发
### 