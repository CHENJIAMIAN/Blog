是的，`tauri-cli` 就在这个仓库里。整个仓库是一个 monorepo，分为 `crates/`（Rust）和 `packages/`（JS/TS）两大部分。

---

## `crates/` — Rust 包

| crate                    | 发布到 crates.io | 作用                                                                          |                     |
| ------------------------ | ------------- | --------------------------------------------------------------------------- | ------------------- |
| `tauri`                  | ✅             | 核心主 crate，整合运行时、宏、API，读取 `tauri.conf.json` 完成配置，管理脚本注入和自动更新                 |                     |
| `tauri-build`            | ✅             | 应用的 `build.rs` 调用，在编译期为 cargo 配置特殊特性                                        |                     |
| `tauri-codegen`          | ✅             | 编译期嵌入/压缩静态资源（含图标），解析 `tauri.conf.json` 生成 Config 结构体                        |                     |
| `tauri-macros`           | ✅             | 提供 `#[tauri::command]`、`generate_handler!` 等过程宏，依赖 `tauri-codegen`          |                     |
| `tauri-runtime`          | ✅             | tauri 与底层 WebView 库之间的抽象胶水层                                                 |                     |
| `tauri-runtime-wry`      | ✅             | 基于 WRY 的 `tauri-runtime` 实现，处理打印、显示器检测等系统级交互                                |                     |
| `tauri-utils`            | ✅             | 公共工具库：解析配置、检测平台三元组、注入 CSP、管理资源                                              |                     |
| `tauri-bundler`          | ✅             | 打包库，将编译好的二进制打包成各平台安装包（.dmg/.msi/.deb 等），可独立于 Tauri 使用                       |                     |
| `tauri-cli`              | ✅             | **CLI 主体**，Rust 可执行文件，提供 `dev`/`build`/`info` 等所有命令，运行于 macOS/Windows/Linux |                     |
| `tauri-plugin`           | ✅             | 插件开发辅助库，提供插件的构建脚本和运行时定义                                                     |                     |
| `tauri-driver`           | ✅             | 跨平台 WebDriver 服务器，用于对 Tauri 应用做端到端自动化测试（pre-alpha）                          |                     |
| `tauri-macos-sign`       | ✅             | macOS/iOS 代码签名工具库（codesign）                                                 |                     |
| `tauri-schema-generator` | ❌ 不发布         | 内部工具，生成 `tauri.conf.json` 的 JSON Schema 文件                                  |                     |
| `tauri-schema-worker`    | ❌ 不发布         | Cloudflare Worker（WASM），为官网提供 schema 服务                                     | [1](#1-0) [2](#1-1) |

---

## `packages/` — JS/TS 包

| 包 | 发布到 npm | 作用 |
|---|---|---|
| `packages/api` | ✅ `@tauri-apps/api` | TypeScript 库，提供 CJS/ESM/纯 TS 三种格式，前端通过它调用 Rust 后端（底层是 WebView 消息传递） |
| `packages/cli` | ✅ `@tauri-apps/cli` | 用 [napi-rs](https://github.com/napi-rs/napi-rs) 将 `tauri-cli` Rust 二进制封装成各平台 npm 包，让开发者可以用 `npx tauri` 调用 | [3](#1-2) 


---

## 前后端代码的目录工程结构

标准 Tauri 应用的目录结构如下（由 `tauri init` 生成）：

```
my-app/                         ← 项目根目录（前端工程根）
├── src/                        ← 前端源码（任意框架）
│   ├── main.ts
│   └── App.vue / App.tsx / ...
├── dist/                       ← 前端构建产物（frontendDist 指向这里）
├── package.json
├── vite.config.ts / ...
│
└── src-tauri/                  ← Rust 后端工程根
    ├── src/
    │   └── main.rs             ← Rust 入口，Builder::default()...run()
    ├── Cargo.toml
    ├── build.rs                ← 调用 tauri_build::build()
    ├── tauri.conf.json         ← Tauri 核心配置
    ├── capabilities/           ← ACL 权限声明（v2 新增）
    │   └── default.json
    └── icons/                  ← 应用图标（各平台格式）
```

`tauri.conf.json` 是连接前后端的关键配置文件，模板如下： [8](#3-7) 

关键字段说明：

| 字段 | 作用 |
|---|---|
| `build.frontendDist` | 生产构建时，前端静态文件目录（相对于 `src-tauri/`），会被嵌入 Rust 二进制 |
| `build.devUrl` | 开发时前端 dev server 的 URL（如 `http://localhost:5173`） |
| `build.beforeDevCommand` | `tauri dev` 前自动执行的命令（如 `pnpm dev`，启动前端 dev server） |
| `build.beforeBuildCommand` | `tauri build` 前自动执行的命令（如 `pnpm build`，构建前端静态文件） |

`tauri-cli` 通过查找 `package.json` 来定位前端目录，查找 `tauri.conf.json` 来定位 Rust 后端目录： [9](#3-8) 

也支持通过环境变量 `TAURI_FRONTEND_PATH` 和 `TAURI_APP_PATH` 自定义两个目录的位置，适合前端和 `src-tauri` 不是父子关系的项目结构。

---
## 问题一：`ipc://localhost/<cmd>` 是什么技术

这**不是真正的 HTTP 服务器**，而是 WebView 提供的**自定义 URI scheme（自定义协议）**机制。

各平台底层 API 不同，但原理一样——向 WebView 注册一个自定义 scheme，WebView 内部发出该 scheme 的请求时，不走网络，而是直接回调 Rust 侧注册的处理函数：

| 平台 | 底层 API |
|---|---|
| macOS / iOS | [`setURLSchemeHandler`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)（WKWebView） |
| Windows | [`AddWebResourceRequestedFilter`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.addwebresourcerequestedfilter)（WebView2） |
| Linux | [`webkit-web-context-register-uri-scheme`](https://webkitgtk.org/reference/webkit2gtk/stable/WebKitWebContext.html#webkit-web-context-register-uri-scheme)（WebKitGTK） | [1](#4-0) 

Tauri 在 `prepare_pending_webview()` 中注册了两个内置 scheme：`tauri://`（加载静态资源）和 `ipc://`（IPC 通信）： [2](#4-1) 

注意 URL 格式因平台而异：
- macOS / iOS / Linux：`ipc://localhost/<cmd>`
- Windows / Android：`http://ipc.localhost/<cmd>`（这两个平台不支持自定义 scheme 的 `fetch`，改用 subdomain 形式绕过） [3](#4-2) 

---

## 问题二：Tauri 有没有魔改系统自带的 WebView

**没有**。Tauri 通过 [WRY](https://github.com/tauri-apps/wry)（Tauri 团队自己写的跨平台 WebView 抽象库）调用系统 WebView 的**官方公开 API**，不 fork、不 patch、不修改 WebView 引擎本身。

README 的描述：

> Tauri 使用了 WRY，这是一个提供系统级 Webview 统一接口的库，它在 macOS 和 iOS 上利用 WKWebView，在 Windows 上利用 WebView2，在 Linux 上利用 WebKitGTK，在 Android 上则利用 Android 系统自带的 WebView。 [4](#4-3) 

WRY 做的事情是：把各平台 WebView 的 API 差异封装成统一接口，`tauri-runtime-wry` 再把 WRY 接口适配成 `tauri-runtime` 的抽象 trait。整个链路是纯调用，没有修改 WebView 引擎。

---

## 问题三：系统 WebView 是作为 DLL 被引入的吗

不完全是，各平台机制不同：

**Windows（WebView2）**：通过 **COM 接口**调用，不是直接链接 DLL。`webview2-com` crate 提供 COM 绑定，运行时通过 COM 与系统中已安装的 WebView2 运行时（随 Edge 一起安装的 `WebView2Loader.dll`）通信。Tauri 二进制里没有 WebView2 引擎代码。 [5](#4-4) 
>意思是：
1. **Tauri 不会在打包时带上 WebView2 的引擎代码**
2. 运行时，程序通过 COM 接口向操作系统"问"：**"你有没有装 WebView2？有的话给我一个对象"**
3. 如果用户电脑装了 Edge（自带 WebView2），COM 就能找到 `WebView2Loader.dll` 并返回可用的对象
4. Tauri 只是认识 COM 的**"通用插头"**（`IUnknown`、`ICoreWebView2Environment` 等接口），并不认识具体的 DLL 文件
5. 
**macOS / iOS（WKWebView）**：通过 **Objective-C 运行时**调用，`objc2` + `objc2-web-kit` crate 提供绑定，`WebKit.framework` 是系统框架，动态链接，不打包进 Tauri 二进制。 [6](#4-5) 

**Linux（WebKitGTK）**：通过 **FFI** 动态链接系统安装的 `libwebkit2gtk-4.1.so`，`webkit2gtk` crate 提供 Rust 绑定。 [7](#4-6) 

**Android**：通过 **JNI** 调用 Android System WebView（Java 层），`jni` crate 提供绑定。 [8](#4-7) 

总结：Tauri 最终产出的二进制**不包含任何 WebView 引擎代码**，运行时通过各平台的原生机制（COM / ObjC runtime / FFI / JNI）调用系统已有的 WebView 组件，这也是 Tauri 应用体积极小的根本原因。

---
## 宏

|**宏 (Macro)**|**方法 (Method)**|
|---|---|---|
|**符号**|`name!()`|`.name()`|
|**执行时机**|编译时 (compile time)|运行时 (runtime)|
|**操作对象**|代码本身（生成新代码）|数据（处理值）|
|**参数数量**|可以任意|固定|
|**运行后**|宏消失，只剩生成的代码|方法一直在|
|**常见例子**|`vec!`, `println!`, `format!`|`.to_string()`, `.push()`, `.len()`|

