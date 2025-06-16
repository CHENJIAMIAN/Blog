### 💡 **记住三条黄金法则**
1. **主进程** = 大管家
    - 只管开窗口、关窗口、和系统打交道（比如文件操作）。
    - ❌ 不碰 UI，不碰插件逻辑。
2. **渲染进程** = 前台
    - 只负责显示界面（HTML/CSS/JS）。
    - ❌ 不能直接读文件，必须通过主进程。
3. **扩展宿主** = 外包团队
    - 所有插件都在这里运行，和主进程/UI 完全隔离。
    - 💡 插件想弹个通知？得先写申请（调用 `vscode` API）。

---

### 🌟 语法高亮核心流程（三步走）
```mermaid1
sequenceDiagram
    participant 用户
    participant 编辑器(standaloneCodeEditor.ts)
    participant 分词器(monarchLexer.ts)
    participant 主题服务(standaloneTheme.ts)

    用户->>编辑器: 输入代码
    编辑器->>分词器: tokenize(line, state)
    分词器->>monarchCompile.ts: 调用编译后的规则
    分词器->>主题服务: 获取颜色映射
    主题服务-->>编辑器: 返回带颜色的Token
    编辑器->>用户: 渲染高亮效果
```

---

### 🔑 五个关键文件作用
| 文件路径 | 核心职责 | 重要程度 |
|----------|----------|----------|
| `standaloneCodeEditor.ts` | 编辑器入口，协调模型/视图 | ★★★★★ |
| `monarchLexer.ts` | 执行分词（词法分析） | ★★★★ |
| `monarchCompile.ts` | 将 Monarch 规则编译成状态机 | ★★★ |
| `standaloneTheme.ts` | 管理颜色主题映射 | ★★★★ |
| `modesRegistry.ts` | 注册语言和分词器 | ★★★ |

---

### 💡 三个黄金调试技巧
1. **查看实时 Token**  
   在开发者工具输入：
   ```js
   monaco.editor.getModels()[0].getLanguageId()
   // 输出当前模型的语言ID
   ```

2. **修改 Monarch 规则**  
   在 `monarchTypes.ts` 中修改语言定义，立即生效：
   ```typescript
   // 示例：修改JS关键字颜色
   keywords: ['function', 'if', 'return', '你的新关键字']
   ```

3. **追踪分词过程**  
   在 `monarchLexer.ts` 的 `_tokenize` 方法打断点，观察每行代码如何被转换为 Token。

---

### 🚀 极简版实现原理
```typescript
// 伪代码展示核心逻辑
class 编辑器 {
  constructor() {
    this.分词器 = new Monarch分词器();
    this.主题服务 = new 主题服务();
  }

  渲染() {
    const tokens = this.分词器.分词(代码文本);
    const 带颜色的tokens = tokens.map(token => {
      return {
        ...token,
        color: this.主题服务.获取颜色(token.type)
      };
    });
    渲染到屏幕(带颜色的tokens);
  }
}
```

---

### ❓ 常见问题速查
**Q1 如何添加新语言？**  
→ 调用 `monaco.languages.register({ id: 'yourLang' })`  
→ 在 `modesRegistry.ts` 中能看到注册逻辑

**Q2 高亮卡顿怎么办？**  
→ 检查 `monarchCompile.ts` 中的规则是否太复杂  
→ 使用 `EncodedTokens`（二进制格式）提升性能

**Q3 颜色不生效？**  
→ 在 `standaloneTheme.ts` 中检查 `tokenColorMap` 映射

---

### 🛠️ 快速实践建议
1. 在 Chrome 控制台尝试：  
   ```js
   // 获取当前编辑器的所有Token
   monaco.editor.getEditors()[0]._modelData.viewModel.tokenization.getTokens(0)
   ```

2. 修改一个现成的高亮规则（如把 JavaScript 的 `function` 改成紫色）：
   ```typescript
   // 在 monarchTypes.ts 中找到 javascript 定义
   { type: 'keyword', fontStyle: 'italic' } // 添加字体样式
   ```


---
VS Code（Visual Studio Code）的架构设计非常精巧，结合了 **Electron** 的跨平台能力和 **Web 技术** 的高效开发体验。以下是其核心架构的详细解析，帮助你从宏观到微观理解它的设计思想。

---

## **1. 整体架构分层**
VS Code 的架构可以划分为 **三层**：
1. **主进程（Main Process）** - Electron 的主线程，负责窗口管理、生命周期、系统交互。
2. **渲染进程（Renderer Process）** - 每个窗口是一个独立的 Chromium 渲染进程，运行 Web 技术（HTML/CSS/JS）。
3. **扩展宿主（Extension Host）** - 独立的 Node.js 进程，运行扩展逻辑，与主进程和渲染进程隔离。

```
Electron Main Process
│
├── Window 1 (Renderer Process) → Workbench UI
│   └── Extension Host (Node.js Process)
│
├── Window 2 (Renderer Process) → Workbench UI
│   └── Extension Host (Node.js Process)
│
...
```

---

## **2. 核心模块解析**
### **(1) 主进程（Main Process）**
- **职责**：
  - 管理窗口（创建、销毁、布局）。
  - 处理系统事件（文件拖拽、菜单栏、更新检查）。
  - 运行 CLI 命令（如 `code --help`）。
- **关键代码**：
  - `src/main.ts` - 主入口。
  - `src/vs/code/electron-main/app.ts` - 应用生命周期管理。

### **(2) 渲染进程（Workbench）**
- **职责**：
  - 提供用户界面（编辑器、侧边栏、状态栏）。
  - 处理用户输入（快捷键、鼠标事件）。
  - 与扩展宿主通信（调用扩展 API）。
- **关键代码**：
  - `src/vs/workbench/workbench.ts` - 工作台入口。
  - `src/vs/editor` - 编辑器核心（Monaco Editor）。

### **(3) 扩展宿主（Extension Host）**
- **职责**：
  - 运行扩展代码（JavaScript/TypeScript）。
  - 提供扩展 API（`vscode` 命名空间）。
  - 与渲染进程通信（RPC 机制）。
- **关键代码**：
  - `src/vs/workbench/api/node/extHostExtensionService.ts` - 扩展管理。
  - `src/vs/workbench/api/common/extHost.api.impl.ts` - 扩展 API 实现。

---

## **3. 进程间通信（IPC）**
VS Code 使用 **多种通信机制** 协调不同进程：
| 通信场景 | 技术 |
|----------|------|
| **主进程 ↔ 渲染进程** | Electron 的 `ipcMain` / `ipcRenderer` |
| **渲染进程 ↔ 扩展宿主** | JSON-RPC over WebSocket 或 Pipe（Windows） |
| **扩展 ↔ 扩展宿主** | `vscode` API（封装了 RPC 调用） |

---

## **4. 关键设计模式**
### **(1) 依赖注入（Dependency Injection）**
- VS Code 大量使用 **依赖注入（DI）** 来管理服务。
- 核心类：`src/vs/platform/instantiation/common/instantiation.ts`。
- 示例：
  ```ts
  import { ILogService } from 'vs/platform/log/common/log';
  
  class MyClass {
    constructor(@ILogService private logService: ILogService) {
      this.logService.info('Hello!');
    }
  }
  ```

### **(2) 事件驱动（Event-Driven）**
- 几乎所有功能都基于 **事件机制**（如文件保存、编辑器内容变化）。
- 核心类：`src/vs/base/common/event.ts`。

### **(3) 分层架构（Common / Browser / Node / Electron）**
- `common` - 平台无关代码（如工具函数）。
- `browser` - 纯前端代码（DOM 操作）。
- `node` - Node.js 后端代码（文件 IO）。
- `electron-*` - Electron 特定实现（如窗口管理）。

---

## **5. 扩展系统架构**
扩展是 VS Code 的核心能力，其运行机制如下：
1. **扩展进程隔离**：每个扩展运行在独立的 JavaScript 上下文中（避免崩溃影响主进程）。
2. **API 沙盒化**：扩展只能通过 `vscode` 命名空间访问受限 API。
3. **激活机制**：扩展按需激活（如用户打开 `.py` 文件时激活 Python 扩展）。

```
Renderer Process (UI)
│
└── Extension Host (Node.js)
    ├── Extension 1 (Python)
    ├── Extension 2 (ESLint)
    └── Extension 3 (Git)
```

---

## **6. 如何调试 VS Code 源码**
### **(1) 使用 VS Code 调试 VS Code**
1. 克隆仓库：
   ```bash
   git clone https://github.com/microsoft/vscode.git
   cd vscode
   yarn
   ```
2. 按 `F5` 启动调试（自动加载 `.vscode/launch.json`）。

### **(2) 关键断点位置**
- **主进程**：`src/main.ts`。
- **渲染进程**：`src/vs/workbench/workbench.ts`。
- **扩展宿主**：`src/vs/workbench/api/node/extHostExtensionService.ts`。

---

## **7. 学习资源**
1. [官方架构文档](https://code.visualstudio.com/api/get-started/architecture)
2. [扩展 API 文档](https://code.visualstudio.com/api)
3. [深入 VS Code 架构（YouTube）](https://www.youtube.com/watch?v=0fJQOQQQ0QY)

---

## **总结**
- VS Code 是 **多进程架构**（主进程 + 渲染进程 + 扩展宿主）。
- **核心模块**：编辑器（Monaco）、工作台（Workbench）、扩展系统。
- **通信机制**：Electron IPC、JSON-RPC。
- **设计模式**：依赖注入、事件驱动、分层架构。

如果想深入研究某个模块（如编辑器或扩展系统），可以进一步探讨！