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