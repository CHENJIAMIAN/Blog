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
    - **renderer/core/** (核心功能，例如 DOM 操作，事件处理等)
    - **renderer/modules/** (额外模块，如 WebRTC, WebXR 等)
    - **renderer/platform/** (底层平台抽象，如文件系统、内存、线程等)
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
- **services/network**：网络服务层，通过 Mojo IPC 进行跨进程通信。
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
