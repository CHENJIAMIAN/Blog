## 飞书
openclaw官方的飞书插件就是: @m1heng-clawd/feishu

OpenClaw 支持多种对话方式，主要分为三大类：

## 1. 界面方式

- **Web Control UI (GUI)** - 浏览器控制界面，访问 `http://127.0.0.1:18789/` index.md:121-124
- **TUI (Terminal UI)** - 终端界面，通过 `openclaw tui` 命令启动 tui.md:20-23

## 2. 聊天渠道

OpenClaw 支持连接到多种聊天应用 index.md:14-37 ：

### 内置渠道

- WhatsApp
- Telegram
- Discord
- IRC
- Slack
- Feishu (飞书)
- Google Chat
- Signal
- BlueBubbles (iMessage推荐)
- iMessage (旧版)
- Zalo
- Zalo Personal
- WebChat

### 需要插件的渠道

- Mattermost
- Microsoft Teams
- Synology Chat
- LINE
- Nextcloud Talk
- Matrix
- Nostr
- Tlon
- Twitch

## 3. CLI 命令行

- 通过 `openclaw message` 命令直接发送消息 message.md:9-13

## Notes

- 飞书(Feishu)需要单独安装插件：`openclaw plugins install @openclaw/feishu` feishu.md:17-21
- 所有渠道可以同时运行，OpenClaw 会根据聊天来源自动路由 index.md:41-42
- 最快的设置方式通常是 Telegram（只需机器人令牌），而 WhatsApp 需要 QR 配对 index.md:42-43

---
你可以在聊天会话中向 OpenClaw 发送以下斜杠命令：

## 核心命令

- `/help` - 显示帮助信息 tui.md:84-88
- `/status` - 显示会话状态（模型、令牌、成本等） README.md:272-276
- `/commands` - 列出所有斜杠命令 status.test.ts:614-626
- `/skill <name>` - 运行指定技能 status.test.ts:621-622
- `/agent <id>` 或 `/agents` - 选择代理 tui.md:88-89
- `/session <key>` 或 `/sessions` - 切换会话 tui.md:89-90

## 会话控制命令

- `/think <level>` - 设置思考级别（off|minimal|low|medium|high|xhigh） README.md:275-279
- `/verbose on|off` - 切换详细模式 README.md:276-280
- `/reasoning on|off|stream` - 推理模式控制 tui.md:94-98
- `/usage off|tokens|full|cost` - 使用量页脚设置 commands-registry.data.ts:472-488
- `/elevated on|off|ask|full` - 提升权限模式（别名：`/elev`） tui.md:98-99
- `/activation mention|always` - 群组激活模式（仅群组） README.md:279-283
- `/deliver on|off` - 控制是否投递回复 tui.md:100-101
- `/queue` - 队列模式控制 slash-commands.md:16-18

## 会话生命周期命令

- `/new` 或 `/reset` - 重置会话 README.md:273-278
- `/abort` - 中止当前运行 tui.md:104-106
- `/compact` - 压缩会话上下文 README.md:274-278
- `/stop` - 停止当前运行 commands-registry.data.ts:489-495
- `/settings` - 打开设置面板 tui.md:106-107
- `/exit` - 退出 TUI tui.md:107-108

## 模型选择命令

- `/model` - 显示模型选择器 tui.md:90-91
- `/model list` - 列出可用模型 slash-commands.md:159-162
- `/model <#>` - 从列表中选择模型 slash-commands.md:170-174
- `/model <provider/model>` - 直接指定模型 slash-commands.md:170-174
- `/model status` - 显示模型状态详情 slash-commands.md:170-174

## 上下文相关命令

- `/context` - 显示上下文概览 context.md:31-34
- `/context list` - 显示注入的文件列表 context.md:31-34
- `/context detail` - 显示详细的上下文分解 context.md:31-34

## 所有者专用命令

- `/config` - 配置管理（需要 `commands.config: true`） slash-commands.md:194-198
- `/debug` - 运行时配置覆盖（需要 `commands.debug: true`） slash-commands.md:175-179
- `/restart` - 重启网关（群组中仅所有者） README.md:278-283

## 内联快捷命令（仅授权发送者）

这些命令可以在普通消息中内联使用： slash-commands.md:25-27

- `/help`
- `/commands`
- `/status`
- `/whoami`（别名：`/id`）

## 插件和技能命令

插件可以注册额外的斜杠命令 plugin.md:592-608 ，技能也可以作为命令运行 status.test.ts:628-642 。

## 注意事项

1. 大多数命令必须作为**独立消息**发送（消息仅包含 `/...`） slash-commands.md:11-12
2. 指令类命令（如 `/think`、`/verbose`）在独立消息中会持久化会话设置，在普通消息中仅作为单次提示 slash-commands.md:16-21
3. 某些命令需要特定权限（如 `/config`、`/debug` 需要所有者权限） slash-commands.md:175-179
4. 群组中的某些命令仅所有者可用（如 `/restart`） README.md:278-283

## Notes

- 斜杠命令由 Gateway 处理，在模型看到消息之前被拦截 context.md:132-143
- 不同平台（Discord、Telegram、Slack）可能支持原生命令注册 slash-commands.md:52-58
- Bash 命令使用 `! <cmd>` 格式（`/bash <cmd>` 是别名） slash-commands.md:12-13

---
在OpenClaw系统中，LLM提供商和Agent是**使用与被使用**的关系：Agent作为AI代理实例，通过配置选择并使用LLM提供商提供的模型来执行任务。 index.md:11-13

## 核心关系

### 1. **Agent选择LLM提供商的模型**

每个Agent通过配置指定要使用的模型，格式为`provider/model`：

```
{    agents: {      defaults: {         model: { primary: "anthropic/claude-opus-4-6" }       }    }  }
```

models.md:28-32

### 2. **独立的认证和配置**

每个Agent有独立的认证存储，位于`~/.openclaw/agents/<agentId>/agent/auth-profiles.json`，认证信息不会在Agent间共享。 multi-agent-sandbox-tools.md:32-39

### 3. **多Agent支持不同提供商**

系统支持运行多个Agent，每个可以使用不同的LLM提供商：

```
{    agents: {      list: [        { id: "chat", model: "anthropic/claude-sonnet-4-5" },        { id: "opus", model: "anthropic/claude-opus-4-5" }      ]    }  }
```

multi-agent.md:210-231

## 技术实现

### 模型解析流程

当Agent执行任务时，`resolveModel`函数解析模型引用，从提供商配置中获取模型详情。 models-config.providers.ts:812-823

### 提供商配置

LLM提供商在`models.providers`中配置，包含API端点、认证方式和模型目录。 model-providers.md:266-298

## Notes

- LLM提供商提供AI模型服务（如Anthropic、OpenAI、Ollama等）
- Agent是具有独立工作区、配置和会话的AI代理实例
- 一个Agent同一时间只能使用一个模型，但可以配置fallback模型
- 支持本地提供商（如Ollama、vLLM）和云端提供商

## 重新进行OAuth登录
```
openclaw onboard --auth-choice openai-codex
```
## 检查认证状态
```
openclaw models status
```

---
以下是针对 **OpenClaw** 项目中关于 **浏览器启动时机** 和 **默认启动参数** 的完整总结：

---

## 🧭 浏览器启动时机

OpenClaw 的浏览器在以下几种情况下会被启动：

| 触发方式 | 描述 | 相关代码/文档 |
|--------|------|-------------|
| 1. CLI 命令启动 | 执行 `openclaw browser start` 时，向 `/start` 发送 POST 请求，触发浏览器启动 | `browser-cli-manage.ts`, `basic.ts` |
| 2. Agent 使用 browser 工具 | 当 Agent 调用 `open`, `snapshot` 等 browser 工具操作时，会自动调用 `ensureBrowserAvailable()` 检查并启动浏览器（除非是 `attachOnly` 模式） | `server-context.ts` |
| 3. 不同 profile 模式的行为 | - `openclaw` profile：启动独立管理的 Chrome 实例（隔离用户数据）<br>- `chrome` profile：通过扩展中继控制现有浏览器标签页，**不启动新浏览器** | `browser.md` |
| 4. 启动前检查条件 | - `browser.enabled === true`（默认为 true）<br>- 非 `attachOnly` 模式<br>- 远程 CDP 可达（如配置了远程调试） | `server-context.ts`, `browser.md` |

> 🔴 特殊阻断条件：
> - 如果端口被占用且非 OpenClaw 占用 → 报错提示使用 `reset-profile` 清理。
> - 如果 `attachOnly=true` 且未连接到目标 → 报错，不会启动浏览器。

---

### ⚙️ 默认启动参数

#### 一、固定 Chrome 启动参数（硬编码）

由 `launchOpenClawChrome()` 函数设置，包括：

```bash
--remote-debugging-port=${cdpPort}
--user-data-dir=${userDataDir}
--no-first-run
--no-default-browser-check
--disable-sync
--disable-background-networking
--disable-component-update
--disable-features=Translate,MediaRouter
--disable-session-crashed-bubble
--hide-crash-restore-bubble
--password-store=basic
--disable-blink-features=AutomationControlled
about:blank
```

> ✅ 防检测特性：`--disable-blink-features=AutomationControlled` 可避免网页识别为自动化工具。

#### 二、条件性参数（根据配置或平台添加）

| 条件 | 添加参数 |
|------|--------|
| `headless: true` | `--headless=new` `--disable-gpu` |
| `noSandbox: true` | `--no-sandbox` `--disable-setuid-sandbox` |
| Linux 平台 | `--disable-dev-shm-usage` |
| 用户自定义 | 通过 `extraArgs` 添加额外参数，如 `--window-size=1920,1080` |

#### 三、可配置选项（默认值）

| 配置项 | 默认值 | 说明 |
|-------|-------|------|
| `enabled` | `true` | 是否启用浏览器控制功能 |
| `evaluateEnabled` | `true` | 是否允许执行任意 JS（如 `evaluate` 操作） |
| `defaultProfile` | `"chrome"` | 默认使用的 profile 名称 |
| `headless` | `false` | 是否以无头模式运行 |
| `noSandbox` | `false` | 是否禁用沙箱（容器环境常设为 `true`） |
| `attachOnly` | `false` | 是否仅附加现有浏览器，不启动新实例 |
| `color` | `"#FF4500"`（橙色） | 显示主题色 |
| `remoteCdpTimeoutMs` | `1500` ms | 远程 CDP HTTP 检测超时时间 |
| `remoteCdpHandshakeTimeoutMs` | `max(timeout * 2, 2000)` | WebSocket 握手超时时间 |

#### 四、端口分配规则

| 服务 | 默认端口 | 说明 |
|------|--------|------|
| Gateway | `18789` | 主服务端口 |
| Browser Control Service | `18791` | `gateway.port + 2` |
| Chrome Extension Relay | `18792` | `gateway.port + 3` |
| openclaw profile CDP 端口 | `18800` 起 | 每个 profile 独立分配（18800–18899） |

> 💡 用户可通过 `gateway.port` 或 `OPENCLAW_GATEWAY_PORT` 调整基础端口，衍生端口自动偏移保持“家族”关系。

---

### 📁 配置示例

```json5
{
  browser: {
    enabled: true,
    headless: false,
    noSandbox: false,
    attachOnly: false,
    defaultProfile: "openclaw",
    color: "#FF4500",
    executablePath: "/usr/bin/google-chrome",
    extraArgs: ["--window-size=1920,1080"],
    profiles: {
      openclaw: { cdpPort: 18800 },
      work: { cdpPort: 18801 },
      remote: { cdpUrl: "http://10.0.0.42:9222" }
    }
  }
}
```

---

### ❗ 注意事项与最佳实践

- 在 **Linux 容器** 中运行时，建议设置：
  ```json
  {
    "headless": true,
    "noSandbox": true
  }
  ```
- 若使用 `attachOnly: true`，需确保浏览器已运行且扩展正确附着。
- 端口冲突时，使用 `openclaw action=reset-profile profile=<name>` 强制释放。
- 使用 `extraArgs` 可实现更高级配置：UA 伪装、分辨率设置、隐身模式等。
---

```bash 带headless
/opt/google/chrome/chrome --remote-debugging-port=18800 --user-data-dir=/root/.openclaw/browser/openclaw/user-data --no-first-run --no-default-browser-check --disable-sync --disable-background-networking --disable-component-update --disable-features=Translate,MediaRouter --disable-session-crashed-bubble --hide-crash-restore-bubble --password-store=basic --disable-gpu --no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-blink-features=AutomationControlled --noerrdialogs --start-maximized about:blank
```

```bash 不带headless
/opt/google/chrome/chrome --remote-debugging-port=18800 --user-data-dir=/root/.openclaw/browser/openclaw/user-data --no-first-run --no-default-browser-check --disable-sync --disable-background-networking --disable-component-update --disable-features=Translate,MediaRouter --disable-session-crashed-bubble --hide-crash-restore-bubble --password-store=basic--disable-gpu --no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-blink-features=AutomationControlled--noerrdialogs --start-maximized about:blank

```

```bash
 # 结束占用 18800 的进程（先正常杀，再强制杀）
  kill $(ss -ltnp '( sport = :18800 )' | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' | sort -u) 2>/dev/null || true
  sleep 1
  kill -9 $(ss -ltnp '( sport = :18800 )' | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' | sort -u) 2>/dev/null || true

  # 检查是否已释放
  ss -ltnp '( sport = :18800 )'
```
# 直接查看浏览器界面

## 方法一：使用 OpenClaw 托管的浏览器

启动一个可见的 OpenClaw 托管浏览器实例 browser.md:34-44 ：

```bash
# 启动 openclaw 配置文件的浏览器  
openclaw browser --browser-profile openclaw start    # 打开网页  
openclaw browser --browser-profile openclaw open https://example.com
```

这将打开一个独立的 Chrome 窗口，带有橙色主题标识，与你的日常浏览器完全隔离 browser.md:18-32 。

## 方法二：通过 Chrome 扩展控制现有浏览器

如果你想在现有的 Chrome 浏览器中查看操作 chrome-extension.md:10-25 ：

1. **安装扩展**：

```
openclaw browser extension install
```

2. **在 Chrome 中加载扩展**：
    - 打开 `chrome://extensions`
    - 启用"开发者模式"
    - 点击"加载已解压的扩展程序"
    - 选择 `openclaw browser extension path` 显示的目录
3. **使用扩展**：
    - 打开你想控制的标签页
    - 点击扩展图标（徽章显示 `ON` 表示已附加）
    - 通过 CLI 控制：

```
openclaw browser --browser-profile chrome tabs
```

## 配置可见性

确保浏览器不是 headless 模式（默认为 `false`） faq.md:1471-1490 ：

```
{    browser: { headless: false },    agents: {      defaults: {        sandbox: { browser: { headless: false } },      },    },  }
```

## 实时查看操作

当智能体执行浏览器操作时，你可以：

1. **直接观察**浏览器窗口中的点击、输入和导航
2. **使用高亮功能**查看目标元素：

```
openclaw browser highlight <ref>
```

3. **查看实时截图**：

```
openclaw browser screenshot
```

## Notes

- OpenClaw 托管的浏览器使用独立的用户数据目录，不会影响你的个人浏览器配置 browser.md:285-290
- 本地浏览器控制服务绑定到 loopback 地址，默认端口从 18800 开始分配 browser.md:82-94
- 如果使用远程 Gateway，需要在有浏览器的机器上运行节点主机来代理浏览器操作 browser.md:128-133

Wiki pages you might want to explore:

- [Getting Started (openclaw/openclaw)](https://deepwiki.com/openclaw/openclaw/1.1-getting-started)