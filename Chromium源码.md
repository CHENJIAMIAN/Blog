git clone --depth 1 https://chromium.googlesource.com/chromium/src.git 2024年6月17日

1898个`README.md`
1. - `cc/`目录包含用于渲染器和浏览器的合成器（compositor）。

- **src/**：源码的顶层目录，包含所有主要的浏览器代码。
	- **build/**：与构建系统相关的脚本和配置文件。这部分包括构建工具、编译器设置以及构建过程中的依赖管理。
	- **components/**：共享组件和模块，这些组件可在不同的部分间复用。
	- **chrome/**：浏览器的主要代码，包括用户界面（UI）、浏览器特定功能和服务。
	- **content/**：内容层的代码，处理网页内容的渲染和执行，包括Blink渲染引擎。
		- 应仅包含实现 Web 平台所需的代码,  它不包括 Chrome 功能，例如扩展程序/自动填充/拼写等
	- **third_party/**：第三方库和依赖项，例如V8 JavaScript引擎和其他外部组件。
	- **net/**：网络相关的代码，负责处理HTTP、FTP等协议。
	- **ui/**：UI相关的代码，包括窗口管理，主题，图标等。
	- **tools/**：各种开发和调试工具。
	

### Blink - 渲染引擎
- **src/third_party/blink/**
    - **renderer/core/** 与HTML、CSS和其他基本DOM部分紧密耦合的特性应放在core
    - **renderer/modules/** - 概念上依赖于“核心”特性的特性应放在modules，如 WebRTC, WebXR 等
    - **renderer/platform/** 核心”依赖的特性应放在platform, 如文件系统、内存、线程等
	    - **scheduler/** 实现了Blink发布任务的任务调度器
    - **renderer/modules/**
	    - **webgl/** 包含WebGL和WebGL2渲染上下文
	    - **webgpu/** WebGPU API 是 Web 上 WebGL 和 WebGL 2 图形 API 的后继者。它将提供现代功能，如“GPU 计算”，以及对 GPU 硬件的低开销访问和更好、更可预测的性能。WebGPU 正在由“Web 上的 GPU” W3C 社区小组开发。
#### 被哪些组件引用
1. **content/目录**
    - **src/content/browser/**: 管理浏览器进程，调度来自不同 Tab 页面的请求，并维护与渲染进程的通信。
    - **src/content/renderer/**: 管理渲染进程的代码，这部分直接引用 Blink 来处理页面内容的渲染。
2. **components/目录**
    - **src/components/**: 存放 Chromium 项目中的可复用组件。部分组件可能会与 Blink 进行交互，例如表单控制组件，媒体相关组件等。

当然，了解更多关键模块及其在Chromium源码仓库中的位置可以帮助你更全面地理解整个架构。下面列出几个关键模块，并详细讲解它们在源码仓库中的目录、主要功能和相互关系。

### 1. V8 引擎
V8 是 Chromium 的 JavaScript 引擎。它负责编译和执行 JavaScript 代码，并提供高效的垃圾回收和内存管理。
- **src/v8/**
#### 依赖和引用
- **content/renderer**：渲染进程会直接调用 V8 来执行网页中的 JavaScript 代码。
- **bindings**：与 Blink 交互，解析和执行 页面脚本。
### 2. 网络栈（Net Stack）
网络栈负责处理所有的网络通信，包括 HTTP/HTTPS 请求、WebSockets、FTP 等。
- **src/net/**
#### 依赖和引用
- **content/browser**：浏览器进程中的网络请求都会通过这个模块处理。
- **services/network**：网络服务层，通过 **Mojo** IPC 进行跨进程通信。
### 3. 插件系统（Pepper Plugin API, PPAPI）
PPAPI 提供了与操作系统无关的插件接口，可用来开发浏览器插件，像 Flash 曾经使用这种接口。
- **src/ppapi/**
#### 依赖和引用
- **content/plugin**：渲染和管理插件内容。
- **content/browser/plugin_service**：负责插件的生命周期管理，以及与插件进程的通信。
### 4. 界面与用户体验（UI Components）
UI 组件目录负责浏览器的界面元素，如窗口管理、控件、对话框等。
- **src/ui/**
#### 依赖和引用
- **chrome/browser/ui**：浏览器界面的实现。
- **content/**：相关界面元素和内容渲染交互。
### 5. 持久化存储（Persistent Storage）
持久化存储模块管理浏览器的各类数据存储，如 IndexedDB, Local Storage, Cookies 等。
- **src/storage/**
#### 依赖和引用
- **content/browser**：管理和调度存储请求。
- **third_party/blink/renderer**：解析和执行涉及存储的 JavaScript API。
### 6. GPU 进程和渲染（GPU Process and Rendering）
GPU 模块负责管理和调度图形处理任务，并提供硬件加速功能。
- **src/gpu/**
#### 依赖和引用
- **content/gpu**：GPU 进程的管理。
- **third_party/blink/renderer/platform/graphics**：使用 GPU 进行页面渲染。

## WebGL
- **ANGLE**（Almost Native Graphics Layer Engine）是Chromium中WebGL实现的核心部分。
	- ANGLE的代码位于`third_party/angle`目录中。
	- 用于在多个平台上实现 OpenGL ES（Open Graphics Library for Embedded Systems）的接口, 从而支持WebGL
	- 它允许在不支持 OpenGL ES 3.0 的硬件上运行 WebGL 2.0, 如通过 Direct3D 提供 WebGL 2 的某些功能
	- 支持多个后端(底层图形 API)，用于将 OpenGL ES API 转换为其他底层图形 API。
		1. Direct3D 后端
			- **Direct3D 9**：主要用于旧版本的 Windows 系统。
			- **Direct3D 11**：目前最常用的后端，适用于大多数 Windows 平台。
		2. Vulkan 后端
			- **Vulkan**：跨平台的低级别图形 API，适用于高性能和多线程图形渲染。Vulkan 后端使得 ANGLE 可以在支持 Vulkan 的操作系统上运行。
		3. Metal 后端
			- **Metal**：Apple 提供的图形 API，适用于 macOS 和 iOS 平台。通过 Metal 后端，ANGLE 可以在 Apple 设备上实现高效的图形渲染。
		4. OpenGL 后端
			- **OpenGL**：用于一些特殊情况，但不是主要的后端。
		5. SwiftShader 后端
			- **SwiftShader**：纯软件实现的图形渲染器，当没有硬件加速时，通过这个后端提供图形渲染。
		6. Null 后端
			- **Null**：一种调试模式，不执行实际渲染，用于测试和调试。

- **SwiftShader** 是一个高性能的 CPU 上的图形渲染器, 它允许在没有图形硬件的环境下运行图形密集型应用程序
	- **如果 Chrome 检测到系统上缺乏现代 GPU，它将自动使用 ANGLE 的 SwiftShader 后端**
		1. 作为 OpenGL ES 驱动程序，SwANGLE（ANGLE + SwiftShader Vulkan）
		- **--use-gl=angle --use-angle=swiftshader**
		2. 作为 WebGL 的后备，SwANGLE（ANGLE + SwiftShader Vulkan）
		- **--use-gl=angle --use-angle=swiftshader-webgl**
		3. 作为 Vulkan 驱动程序（需要[enable_swiftshader_vulkan](https://source.chromium.org/chromium/chromium/src/+/main:gpu/vulkan/features.gni;l=16)功能）
		- **--use-vulkan=swiftshader**
 
- 指定 Chrome 使用特定的图形 API 来渲染图形内容
	- `--use-gl=desktop`：使用桌面 OpenGL 模式。
	- `--use-gl=osmesa`：使用 OSMesa（一个用于 OpenGL 的 Mesa 渲染库）。
	- `--use-gl=angle`：使用 ANGLE（让 OpenGL ES 代码能够在桌面和移动平台上运行的一个抽象层）。
- 指定 Chrome 使用 ANGLE 作为其图形渲染层
	- `--use-angle=d3d`：使用 Direct3D 作为 ANGLE 的后端（通常在 Windows 上使用）。
	- `--use-angle=vulkan`：使用 Vulkan 作为 ANGLE 的后端（如果你的系统和 Chrome 支持 Vulcan）。
	- `--use-angle=gl`：使用 OpenGL。