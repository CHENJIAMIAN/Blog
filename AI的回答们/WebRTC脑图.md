---
title: WebRTC脑图
created: 2025-07-08
source: Cherry Studio
tags: 
---
### 🤖 Assistant


好的，没问题！将我们学习到的 WebRTC 知识整理成一个 Markdown 结构的脑图，这样可以让你更直观地看到知识点之间的联系。

```markdown
- WebRTC (Web Real-Time Communication)
    - 核心目标：在浏览器中实现点对点 (P2P) 实时通信 (音视频、数据)
    - 第一性原理：如何让浏览器像打电话一样实时交流？
        - 找到对方 & 协商内容
        - 建立直接通道
        - 数据实时传输
        - 克服网络障碍 (NAT 穿透)
        - 安全

    - **1. 信令 (Signaling)**
        - 作用：建立、维护、终止通信会话
        - 职责：交换通信所需的元数据（非媒体数据本身）
        - 关键元数据：SDP (会话描述协议)
        - **非 WebRTC 标准的一部分**：开发者自行选择信令方式（如 WebSocket, HTTP）
        - **安全：建议使用加密通道 (WSS, HTTPS)**

    - **2. SDP (Session Description Protocol)**
        - 作用：描述通信会话的属性（像通信的“菜单”）
        - 内容：
            - 媒体类型 (音视频, 数据流)
            - 编码格式 (Opus, VP8, H.264)
            - 传输协议 (RTP/RTCP)
            - 本地网络信息（供 ICE 使用）
        - 协商流程：
            - Offer (提议): 一方发起，描述自己期望的会话参数
            - Answer (应答): 另一方响应，根据自身能力和 Offer 创建

    - **3. NAT 穿透 (Network Address Translation Traversal)**
        - 问题根源：设备常位于 NAT 后，外部网络无法直接连接
        - 解决方案框架：ICE (Interactive Connectivity Establishment)
            - **STUN (Session Traversal Utilities for NAT)**
                - 作用：发现公共 IP 地址和端口
                - 局限性：无法穿透所有 NAT 类型 (如 Symmetric NAT)
            - **TURN (Traversal Using Relays around NAT)**
                - 作用：充当中继服务器，转发媒体数据（当 P2P 失败时）
                - 优点：几乎适用于所有网络环境
                - 缺点：增加服务器成本、延迟和带宽消耗
            - **ICE 的工作方式：**
                - 收集所有可能的连接地址 (候选地址)
                - 通过信令交换候选地址
                - 尝试最优路径（P2P -> STUN -> TURN）
                - 建立连接

    - **4. 核心 API**
        - **`navigator.mediaDevices.getUserMedia()`**
            - 作用：访问本地媒体设备（麦克风、摄像头）
            - 返回：一个 `MediaStream` 对象（包含媒体轨道 Track）
            - 安全：强制用户授权（安全上下文要求）
        - **`RTCPeerConnection`**
            - 作用：建立和管理 P2P 连接，传输媒体和数据
            - 核心功能：
                - 管理媒体流 (`addTrack`)
                - 实现 ICE 流程
                - 使用 RTP/RTCP 进行媒体传输
                - 使用 DTLS-SRTP 进行加密
                - 支持 DataChannel (传输任意数据)
            - 事件监听：`onicecandidate`, `ontrack`, `oniceconnectionstatechange`, `onconnectionstatechange`

    - **5. WebRTC 架构模式 (多方通信)**
        - **Mesh (网状网络)**
            - 特点：所有人直接与所有人 P2P 连接
            - 优点：纯 P2P，低延迟，无需媒体服务器
            - 缺点：客户端负担大 (O(N^2) 连接和带宽)，扩展性差
            - 适用：小型群组 (3-4 人)
        - **SFU (Selective Forwarding Unit)**
            - 特点：客户端连接到 SFU 服务器，SFU 选择性转发媒体流
            - 优点：客户端负担轻，扩展性比 Mesh 好
            - 缺点：需要媒体服务器，延迟稍高，非纯 P2P
            - 适用：大多数多人会议场景 (推荐模式)
        - **MCU (Multipoint Control Unit)**
            - 特点：SFU 的加强版，服务器混合并重新编码所有媒体流
            - 优点：客户端负担最小，适合低性能设备
            - 缺点：服务器成本极高 (CPU)，灵活性差，可能质量损失，延迟高

    - **6. 安全机制**
        - **`getUserMedia` 隐私保护：** 强制用户授权，仅限安全上下文 (HTTPS)
        - **传输安全：**
            - **DTLS (Datagram TLS)：** 在 UDP 上提供加密、密钥协商、身份验证
            - **SRTP (Secure RTP)：** 对媒体数据本身进行加密、完整性校验和防重放保护
            - 关系：DTLS 建立安全隧道并协商密钥，SRTP 使用密钥加密媒体数据
        - **信令安全：** 推荐使用 WSS (Secure WebSocket) 或 HTTPS
        - **混合内容阻止：** 阻止不安全的 HTTP 页面使用 WebRTC 功能

    - **7. 端到端工作流程与实践**
        - **流程总结：** 获取媒体 -> 创建 PeerConnection -> 添加轨道 -> 协商 SDP (Offer/Answer) -> 交换 ICE 候选地址 -> 建立连接 -> 传输媒体/数据
        - **常见挑战与解决方案：**
            - **NAT 穿透失败：** 检查 TURN 服务器、网络环境，使用可靠的 ICE 实现
            - **低媒体质量：** 带宽不足、网络抖动、CPU 过载；检查 RTCP 反馈，自适应编码，选择合适的编解码器，使用 SFU/MCU
            - **信令服务器问题：** 部署高可用信令服务器，使用心跳和重试机制

    - **构建基础应用要素：**
        - **前端：** HTML (`<video>`), CSS, JavaScript (WebRTC API)
        - **信令服务器：** WebSocket (最常用)
        - **部署：** 安全上下文 (HTTPS 或 localhost)
```


