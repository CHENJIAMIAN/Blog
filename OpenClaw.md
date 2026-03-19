## 飞书插件
openclaw官方的飞书插件就是: @m1heng-clawd/feishu

## 对话方式

### 1. 界面方式

- **Web Control UI (GUI)** - 浏览器控制界面，访问 `http://127.0.0.1:18789/` index.md:121-124
- **TUI (Terminal UI)** - 终端界面，通过 `openclaw tui` 命令启动 tui.md:20-23

### 2. 聊天渠道

OpenClaw 支持连接到多种聊天应用 index.md:14-37 ：

### 3. CLI 命令行

- 通过 `openclaw message` 命令直接发送消息 message.md:9-13

---
## 聊天会话中的斜杠命令

### 核心命令

- `/help` - 显示帮助信息 tui.md:84-88
- `/status` - 显示会话状态（模型、令牌、成本等） README.md:272-276
- `/commands` - 列出所有斜杠命令 status.test.ts:614-626
- `/skill <name>` - 运行指定技能 status.test.ts:621-622
- `/agent <id>` 或 `/agents` - 选择代理 tui.md:88-89
- `/session <key>` 或 `/sessions` - 切换会话 tui.md:89-90

### 会话控制命令

- `/think <level>` - 设置思考级别（off|minimal|low|medium|high|xhigh） README.md:275-279
- `/verbose on|off` - 切换详细模式 README.md:276-280
- `/reasoning on|off|stream` - 推理模式控制 tui.md:94-98
- `/usage off|tokens|full|cost` - 使用量页脚设置 commands-registry.data.ts:472-488
- `/elevated on|off|ask|full` - 提升权限模式（别名：`/elev`） tui.md:98-99
- `/activation mention|always` - 群组激活模式（仅群组） README.md:279-283
- `/deliver on|off` - 控制是否投递回复 tui.md:100-101
- `/queue` - 队列模式控制 slash-commands.md:16-18

### 会话生命周期命令

- `/new` 或 `/reset` - 重置会话 README.md:273-278
- `/abort` - 中止当前运行 tui.md:104-106
- `/compact` - 压缩会话上下文 README.md:274-278
- `/stop` - 停止当前运行 commands-registry.data.ts:489-495
- `/settings` - 打开设置面板 tui.md:106-107
- `/exit` - 退出 TUI tui.md:107-108

### 模型选择命令

- `/model` - 显示模型选择器 tui.md:90-91
- `/model list` - 列出可用模型 slash-commands.md:159-162
- `/model <#>` - 从列表中选择模型 slash-commands.md:170-174
- `/model <provider/model>` - 直接指定模型 slash-commands.md:170-174
- `/model status` - 显示模型状态详情 slash-commands.md:170-174

### 上下文相关命令

- `/context` - 显示上下文概览 context.md:31-34
- `/context list` - 显示注入的文件列表 context.md:31-34
- `/context detail` - 显示详细的上下文分解 context.md:31-34

### 所有者专用命令

- `/config` - 配置管理（需要 `commands.config: true`） slash-commands.md:194-198
- `/debug` - 运行时配置覆盖（需要 `commands.debug: true`） slash-commands.md:175-179
- `/restart` - 重启网关（群组中仅所有者） README.md:278-283

### 内联快捷命令（仅授权发送者）

这些命令可以在普通消息中内联使用： slash-commands.md:25-27

- `/help`
- `/commands`
- `/status`
- `/whoami`（别名：`/id`）

### 插件和技能命令

插件可以注册额外的斜杠命令 plugin.md:592-608 ，技能也可以作为命令运行 status.test.ts:628-642 。

### 注意事项

1. 大多数命令必须作为**独立消息**发送（消息仅包含 `/...`） slash-commands.md:11-12
2. 指令类命令（如 `/think`、`/verbose`）在独立消息中会持久化会话设置，在普通消息中仅作为单次提示 slash-commands.md:16-21
3. 某些命令需要特定权限（如 `/config`、`/debug` 需要所有者权限） slash-commands.md:175-179
4. 群组中的某些命令仅所有者可用（如 `/restart`） README.md:278-283

### Notes

- 斜杠命令由 Gateway 处理，在模型看到消息之前被拦截 context.md:132-143
- 不同平台（Discord、Telegram、Slack）可能支持原生命令注册 slash-commands.md:52-58
- Bash 命令使用 `! <cmd>` 格式（`/bash <cmd>` 是别名） slash-commands.md:12-13

---
## LLM提供商和Agent是**使用与被使用**的关系
> Agent作为AI代理实例，通过配置选择并使用LLM提供商提供的模型来执行任务。 index.md:11-13

### 核心关系

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

### 技术实现

### 模型解析流程

当Agent执行任务时，`resolveModel`函数解析模型引用，从提供商配置中获取模型详情。 models-config.providers.ts:812-823

### 提供商配置

LLM提供商在`models.providers`中配置，包含API端点、认证方式和模型目录。 model-providers.md:266-298

### Notes

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
## 浏览器启动时机

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
## superpowers安装过程就两步：

  1. git clone https://github.com/obra/superpowers.git C:\Users\Administrator\.codex\superpowers
  2. 创建目录联接（Windows junction）：
     C:\Users\Administrator\.agents\skills\superpowers -> C:\Users\Administrator\.codex\superpowers\skills

  原理是：

  - Codex 会扫描固定的技能发现目录：~/.agents/skills（Windows 即 C:\Users\Administrator\.agents\skills）。
  - 每个子目录都被当作一个“技能包来源”。
  - superpowers 仓库里真正的技能在 skills/ 下，所以用联接把它“挂载”到扫描目录里。
  - 这样不用复制文件，仓库更新（git pull）后技能会立刻同步到 Codex 可见路径。
  - 需要重启 Codex，是因为技能列表通常在启动时加载一次。
---
## linux显示界面
 - X11：老一代 Linux 图形系统协议（X Window System）。负责“应用和显示服务器怎么通信画界面”。历史久、兼容广。
  - Wayland：新一代图形协议，目标是更简单、更低延迟、更安全。很多现代桌面环境默认走它。
  - XDG：不是单一图形协议，而是一套桌面标准（freedesktop 规范）。定义目录、会话运行时路径、桌面集成规则等。XDG_RUNTIME_DIR 就
    是其中一部分。

  关系可以理解为：

  - X11/Wayland：图形显示“通信协议”
  - XDG：桌面环境“通用规范/约定”
---
# 多智能体团队配置与协作

## 核心配置

多智能体团队通过在 `openclaw.json` 中定义多个智能体和绑定规则来实现 multi-agent.md:10-20 。

```
{    agents: {      list: [        { id: "coordinator", workspace: "~/.openclaw/workspace-coord" },        { id: "worker1", workspace: "~/.openclaw/workspace-worker1" },        { id: "worker2", workspace: "~/.openclaw/workspace-worker2" },      ],    },    bindings: [      { agentId: "coordinator", match: { channel: "slack", teamId: "T123" } },      { agentId: "worker1", match: { channel: "slack", peer: { kind: "channel", id: "C456" } } },      { agentId: "worker2", match: { channel: "slack", peer: { kind: "channel", id: "C789" } } },    ],  }
```

## 智能体间协作

### 1. 启用智能体间消息传递

在配置中启用 `agentToAgent` 工具 multi-agent.md:354-360 ：

```
{    tools: {      agentToAgent: {        enabled: true,        allow: ["coordinator", "worker1", "worker2"],      },    },  }
```

### 2. 协作模式

- **协调者模式**：一个主智能体分配任务给工作智能体
- **广播模式**：多个智能体同时处理同一消息 channel-routing.md:75-91
- **子智能体模式**：智能体可以动态创建子智能体处理特定任务 faq.md:1856-1866

### 3. 使用 CLI 管理智能体

```
# 添加新智能体  openclaw agents add worker1 --workspace ~/.openclaw/workspace-worker1    # 列出所有智能体和绑定  openclaw agents list --bindings    # 设置智能体身份  openclaw agents set-identity --agent coordinator --name "团队协调器"
```

agents.md:26-31

## 高级配置

### 每智能体沙箱和工具权限

每个智能体可以有独立的安全配置 multi-agent-sandbox-tools.md:18-29 ：

```
{    agents: {      list: [        {          id: "coordinator",          sandbox: { mode: "off" },  // 完全权限        },        {          id: "worker1",          sandbox: { mode: "all", scope: "agent" },  // 沙箱隔离          tools: {            allow: ["read", "exec"],            deny: ["write", "browser"],          },        },      ],    },  }
```

### 认证隔离

每个智能体有独立的认证配置文件 multi-agent.md:20-28 ：

- 路径：`~/.openclaw/agents/<agentId>/agent/auth-profiles.json`
- 认证不会自动共享，需要手动复制

## 注意事项

1. **资源消耗**：多智能体会增加 token 消耗和磁盘使用 faq.md:2013-2019
2. **会话隔离**：每个智能体有独立的会话存储
3. **路由优先级**：绑定规则按确定性顺序匹配，最具体的优先 multi-agent.md:172-180
---
# Workspace 与多智能体的关系

在多智能体架构中，**workspace 是每个智能体的独立工作目录**，存储智能体的"大脑"和记忆 multi-agent.md:14-18 。

## 核心关系

### 1. 每个智能体拥有独立 workspace

```
{    agents: {      list: [        { id: "coordinator", workspace: "~/.openclaw/workspace-coord" },        { id: "worker1", workspace: "~/.openclaw/workspace-worker1" },        { id: "worker2", workspace: "~/.openclaw/workspace-worker2" },      ],    },  }
```

每个 workspace 包含智能体的：

- `AGENTS.md` - 操作指令
- `SOUL.md` - 人设和边界
- `USER.md` - 用户档案
- `memory/` - 记忆文件
- `skills/` - 技能目录 agent-workspace.md:66-84

### 2. Workspace 与其他目录的区别

|目录|用途|范围|
|---|---|---|
|**Workspace**|智能体工作文件和记忆|每智能体独立|
|**agentDir**|认证配置和模型注册|每智能体独立|
|**sessions**|聊天历史和路由状态|每智能体独立|
|**~/.openclaw/**|全局配置和凭证|全局共享 multi-agent.md:40-47|

### 3. Workspace 的隔离特性

- **默认 cwd**：工具的相对路径在此解析 agent-workspace.md:17-22
- **非硬性沙箱**：绝对路径仍可访问其他位置，除非启用沙箱 multi-agent.md:35-38
- **记忆隔离**：每个智能体的记忆和人格完全独立

### 4. 路径解析规则

workspace 路径按优先级解析 agent-scope.ts:255-271 ：

1. `agents.list[].workspace`（显式配置）
2. `agents.defaults.workspace`（默认值）
3. `~/.openclaw/workspace-<agentId>`（回退方案）

## 实际影响

1. **数据隔离**：每个智能体的"记忆"和"人格"完全独立
2. **配置灵活性**：可以为不同智能体设置不同的工具和技能
3. **备份策略**：只需备份 workspace 目录即可保存智能体"大脑" faq.md:1382-1392
---
# models.json
`root/.openclaw/agents/main/agent/models.json` 是 OpenClaw 的模型注册表文件，用于存储自定义模型提供商的配置信息。 models-config.ts:203-244
!!! **该文件不应手动编辑，应通过配置 `openclaw.json` 中的 `models.providers` 来管理**
## 主要用途

这个文件存储了以下内容：

- **自定义提供商配置**：包括 baseUrl、apiKey、API 类型（如 openai-completions、anthropic-messages 等）
- **模型目录**：每个提供商支持的模型列表，包含模型 ID、名称、上下文窗口、最大 token 数等信息
- **认证信息**：API 密钥或认证配置 configuration-reference.md:1976-2002

## 文件管理

该文件由 `ensureOpenClawModelsJson` 函数自动管理 models-config.ts:203-244 ：

- 当你在 `openclaw.json` 中配置 `models.providers` 时，系统会自动生成或更新此文件
- 支持两种模式：`merge`（合并模式，默认）和 `replace`（替换模式）
- 在合并模式下，已存在的 `apiKey` 和 `baseUrl` 会优先保留 models.md:207-217

## 位置结构

文件路径遵循以下模式：

```
~/.openclaw/agents/<agentId>/agent/models.json  
```

其中 `main` 是默认的 agent ID。多代理环境下，每个代理都有自己的 `models.json` 文件 faq.md:2387-2391 。

## 配置示例

文件内容格式如下：

```
{    "providers": {      "custom-proxy": {        "baseUrl": "http://localhost:4000/v1",        "apiKey": "LITELLM_KEY",        "api": "openai-completions",        "models": [          {            "id": "llama-3.1-8b",            "name": "Llama 3.1 8B",            "contextWindow": 128000,            "maxTokens": 32000          }        ]      }    }  }
```

这个文件是 OpenClaw 模型系统的核心组件，让系统能够与各种 LLM 提供商进行通信。

## Notes

- 该文件不应手动编辑，应通过配置 `openclaw.json` 中的 `models.providers` 来管理
- 文件权限设置为 600，确保 API 密钥等敏感信息的安全
- 如果没有配置任何自定义提供商，此文件可能不存在

Wiki pages you might want to explore:

- [Configuration System (openclaw/openclaw)](https://deepwiki.com/openclaw/openclaw/2.3-configuration-system)
---
# `~/.openclaw` 完整目录结构

## 核心配置和状态文件

|路径|用途|
|---|---|
|`openclaw.json`|主配置文件（JSON5 格式） faq.md:1340-1342|
|`secrets.json`|可选的文件支持的密钥存储 faq.md:1345|
|`credentials/oauth.json`|旧版 OAuth 导入（首次使用时复制到认证配置文件） faq.md:1343|

## 认证和凭证目录

|路径|用途|
|---|---|
|`credentials/`|存储各渠道的认证状态 faq.md:1347|
|`credentials/whatsapp/<accountId>/creds.json`|WhatsApp 凭证 setup.md:129|
|`credentials/<channel>-allowFrom.json`|默认账户的配对白名单 setup.md:134|
|`credentials/<channel>-<accountId>-allowFrom.json`|非默认账户的配对白名单 setup.md:134-135|

## 代理相关目录

|路径|用途|
|---|---|
|`agents/`|每个代理的状态目录 faq.md:1348|
|`agents/<agentId>/agent/`|代理目录（auth-profiles.json、auth.json） faq.md:1348|
|`agents/<agentId>/agent/auth-profiles.json`|认证配置文件（OAuth、API 密钥） faq.md:1344|
|`agents/<agentId>/agent/auth.json`|旧版兼容文件（静态 api_key 条目会被清理） faq.md:1346|
|`agents/<agentId>/sessions/`|对话历史和状态 faq.md:1349|
|`agents/<agentId>/sessions/sessions.json`|会话元数据 faq.md:1350|
|`agents/<agentId>/sessions/<sessionId>.jsonl`|会话记录文件 session-management-compaction.md:60-62|

## 工作区和技能目录

|路径|用途|
|---|---|
|`workspace/`|默认代理工作区 faq.md:1354|
|`skills/`|托管的技能（共享技能） agent-workspace.md:133|

## 扩展和插件目录

|路径|用途|
|---|---|
|`extensions/`|已安装的插件（包括它们的 node_modules/） index.md:837|
|`sandboxes/`|工具沙箱工作区 index.md:838|

## 日志和临时文件

|路径|用途|
|---|---|
|`logs/`|日志文件目录 setup.md:123|
|`logs/commands.log`|命令事件审计日志 README.md:41|
|`.backup/`|配置备份（.json.bak 文件） faq.md:1354|

## QMD 内存系统相关

|路径|用途|
|---|---|
|`agents/<agentId>/qmd/`|QMD 配置和数据目录 memory.md:183-184|
|`agents/<agentId>/qmd/xdg-config/`|QMD XDG 配置目录 memory.md:183|
|`agents/<agentId>/qmd/xdg-cache/`|QMD XDG 缓存目录 memory.md:184|
|`agents/<agentId>/qmd/sessions/`|QMD 会话集合目录 memory.md:224-225|

## 工具相关目录

|路径|用途|
|---|---|
|`tools/signal-cli/<version>/`|Signal CLI 工具存储 wizard-cli-reference.md:284|

## 环境变量覆盖

可以通过以下环境变量自定义路径：

- `OPENCLAW_STATE_DIR` - 更改整个状态目录位置 OpenClawPaths.swift:18
- `OPENCLAW_CONFIG_PATH` - 自定义配置文件路径 OpenClawPaths.swift:17

## Notes

- 旧版单代理路径：`~/.openclaw/agent/*`（由 `openclaw doctor` 迁移） faq.md:1352
- 使用 `--profile <name>` 会创建 `~/.openclaw-<profile>/` 目录实现多实例隔离 faq.md:37
- 所有 `~/.openclaw/` 下的文件都可能包含敏感信息，应保持严格权限（目录 700，文件 600） index.md:842

- ---
# Workspace 文件完整列表

OpenClaw workspace 目录包含以下所有文件：

### 核心引导文件（每次会话加载）

- `AGENTS.md` - 智能体操作指令和记忆 agent-workspace.md:68-71
- `SOUL.md` - 人设、语气和边界 agent-workspace.md:73-75
- `TOOLS.md` - 本地工具和惯例说明 agent-workspace.md:85-87
- `IDENTITY.md` - 智能体名称、风格和表情符号 agent-workspace.md:81-83
- `USER.md` - 用户档案和偏好称呼 agent-workspace.md:77-79
- `HEARTBEAT.md` - 可选的心跳运行检查清单 agent-workspace.md:89-90
- `BOOTSTRAP.md` - 一次性首次运行仪式（完成后删除） agent-workspace.md:91-94

### 记忆系统文件

- `memory/YYYY-MM-DD.md` - 每日记忆日志（每天一个文件） agent-workspace.md:96-98
- `MEMORY.md` 或 `memory.md` - 精选的长期记忆 agent-workspace.md:100-102

### 可选目录和文件

- `skills/` - 工作区特定的 Skills（覆盖托管 Skills） agent-workspace.md:106-108
- `canvas/` - Canvas UI 文件（如 `canvas/index.html`） agent-workspace.md:110-111
- `BOOT.md` - Gateway 重启时执行的启动检查清单 agent-workspace.md:87-89

### 系统文件（通常隐藏）

- `.openclaw/workspace-state.json` - 工作区状态文件 workspace.ts:34-35
- `.git/` - Git 仓库目录（如果使用 Git 备份） doctor-state-integrity.ts:813-814

## 文件加载机制

### 引导文件注入规则

OpenClaw 在每次会话开始时注入这些文件到模型上下文中 context.md:105-113 ：

- 大文件会被截断（默认每个文件最多 20,000 字符） context.md:115
- 总注入上限为 150,000 字符 context.md:115
- 缺失文件会注入"文件缺失"标记 agent.md:44

### 记忆文件加载策略

- 主会话加载：今天 + 昨天的 daily memory + `MEMORY.md` AGENTS.md:20-23
- **共享会话（群聊）：仅加载今天 + 昨天的 daily memory（不加载 `MEMORY.md`） AGENTS.md:38-40**

## 默认位置和配置

- 默认位置：`~/.openclaw/workspace` agent-workspace.md:26
- 配置方式：通过 `agents.defaults.workspace` 设置 agent-workspace.md:31-36
- Profile 支持：使用 `OPENCLAW_PROFILE` 时变为 `~/.openclaw/workspace-<profile>` agent-workspace.md:27-28

## 文件缓存机制

系统使用基于文件身份（inode/dev/size/mtime）的缓存机制避免重复读取 workspace.ts:52-54 ，最大文件大小限制为 2MB workspace.ts:40 。

## Notes

- 工作区是智能体的唯一工作目录（cwd），但不是硬沙箱 agent-workspace.md:17-18
- 建议将工作区设为私有 Git 仓库进行备份 agent-workspace.md:140-141
- `~/.openclaw/` 目录包含配置、凭证和会话，不应提交到工作区仓库 agent-workspace.md:130-133
- 可通过 `skipBootstrap: true` 禁用引导文件创建 agent-workspace.md:47-49

---
