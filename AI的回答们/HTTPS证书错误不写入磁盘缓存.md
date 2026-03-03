## 🤖 Gemini 3 Flash Preview | Gemini

你观察到的“HTTPS 不安全时不命磁盘缓存”并不是 HTTP 协议（如 RFC 9111）定义的强制规则，而是一项由**主流浏览器厂商共同遵守的安全性架构策略（Security Policy）**。

其规定和详细解释主要源于以下三个地方：

### 1\. Chromium 核心设计文档与 Bug 会话 (Chrome/Edge)

在 Chromium 项目（Chrome 和 Edge 的核心）中，这个行为被定义为一种 **“中间人攻击（MITM）防御机制”**。

-   **官方原话（出自 Chromium 工程师）**： 在 Chromium 的 Issue 40666473 (原 110649) 中明确提到：
    

> *"We don't want to cache resources with certificate errors because it violates reasonable expectations... bypassing the certificate warning compromises every connection to that site until the disk cache is flushed."* （我们不想缓存带证书错误的资源，因为这违反了安全预期……绕过证书警告会危害到后续对该站点的每一次连接，直到磁盘缓存被手动清除为止。）

-   **规定逻辑**：如果浏览器允许将“证书错误”连接下的资源存入磁盘，攻击者就可以通过中间人攻击（如在公共 Wi-Fi 劫持 HTTPS）注入恶意的 JS 模块，并将其**持久化**在用户的硬盘里。即便你以后换到了安全的网络，浏览器仍可能由于缓存命中而继续加载之前被植入的恶意代码。
    

### 2\. W3C 的 Fetch 标准 (Fetch Standard)

Fetch 标准定义了浏览器如何获取网络资源，它直接规定了“证书错误”时产生的 Response 类型：

-   **网络错误 (Network Error)**：Fetch 标准（第 4.1 节）规定，如果 TLS 握手失败（证书无效），请求必须返回一个 `network error`。
    
-   **异常处理**：当你点击浏览器警告页面的“继续前往”时，浏览器实际上是在**协议层外**开了一个特例。为了最小化这个特例带来的危害，浏览器会将该 session 产生的资源标记为 **“不可信任（Unauthenticated）”**，在内部处理逻辑中，此类资源禁止写入外部存储（non-volatile storage），即磁盘缓存。
    

### 3\. Google Chrome 的安全策略公告 (Chromium Security Policy)

Google Chrome 的安全团队在关于 **“Deprecating Powerful Features on Insecure Origins”**（废弃不安全源的强大功能）的白皮书中，指出：

-   **原则**：对于不安全/未认证的连接（包括 HTTP 和无效的 HTTPS），浏览器应当限制其持久化存储（Persistent Storage）的能力。
    
-   **磁盘缓存行为**：Chrome 的网络栈（Network Stack）在检测到 SSL 指纹无效时，会劫持缓存过滤器（Cache Filter），强制将 Cache 级别提升至内存级别或标记为 `no-store` 的等效行为，防止泄露或毒化本地存储。
    

### 总结：规章在哪里？

如果你想查看具体的“条文”代码或文档，可以参考以下路径：

1.  **代码实现**：在 Chromium 源码中搜索 `net::ERR_CERT_COMMON_NAME_INVALID` 或类似的证书错误码处理逻辑。在 `HttpCacheTransaction` 的处理流程中，会检查 SSL info。如果 `ssl_info.has_cert_error()` 为真，则通常不会调用 `WriteResponseInfoToEntry`。
    
2.  **Firefox 配置**：在 Firefox 中，虽然可以手动通过 `about:config` 里的 `browser.cache.disk_cache_ssl` 开启/关闭 HTTPS 磁盘缓存，但对于“验证失败”的 HTTPS，内核硬编码了防御逻辑以防止缓存投毒。
    
3.  **工程师讨论组**：Chrome Security 讨论组 [^1]经常会讨论这类行为，结论是：**为了防止恶意脚本在用户设备上“长期驻留”，不安全的连接绝不进入磁盘。**
    

这也就是为什么当你开发时使用自签名证书，如果没把证书安装到系统受信任列表，每次重启浏览器都会发现所有的 JS/CSS 都要重新下载的原因。 [^1]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbrcPKFZi7EJA6m6k9DnL-XYTPc-XKvp_qQGXQdDtSnAGSlmuABI1v14R9fVCe81OAdOGTm2m0YCYzcrwBVvtPZ1IyJ0YThaBJ_U8bv6IOzIsGtxq1cNscH-q7CwbPjEubROr_fViPu2uEO0fUIUxS5O0dfGvrZyg=)<br><br>

[http\_cache\_transaction.cc - Chromium 代码搜索 --- http\_cache\_transaction.cc - Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:net/http/http_cache_transaction.cc?q=http_cache_transaction&ss=chromium)

在 Chromium 源码中，这个逻辑位于 `net/http/http_cache_transaction.cc` 文件里的 `WriteResponseInfoToEntry` 方法中。

具体的行号会随着版本更新略有变动，但在当前的 Chromium `main` 分支（2024-2025年版本）中，该逻辑大约位于 **第 3500 到 3600 行** 之间。

### 核心代码片段

你可以搜索以下注释和代码块：

```cpp
// 在 HttpCache::Transaction::WriteResponseInfoToEntry 方法内部

// ... (省略前面的逻辑)

// Do not cache content with cert errors. This is to prevent not reporting net
// errors when loading a resource from the cache. When we load a page over
// HTTPS with a cert error we show an SSL blocking page. If the user clicks
// proceed we reload the resource ignoring the errors. The loaded resource is
// then cached. If that resource is subsequently loaded from the cache, no
// net error is reported (even though the cert status contains the actual
// errors) and no SSL blocking page is shown. An alternative would be to
// reverse-map the cert status to a net error and replay the net error.
if (IsCertStatusError(response.ssl_info.cert_status)) {
  DoneWritingToEntry(false);
  return OK;
}
```

### 详细解释：

1.  **方法名**：`WriteResponseInfoToEntry`。该方法负责将从网络获取的 HTTP 响应头（headers）和元数据（metadata）写入浏览器缓存。
    
2.  **触发条件**：`IsCertStatusError(response.ssl_info.cert_status)`。
    
    -   即使你点击了“继续前往（Proceed）”，TLS 握手的 `cert_status` 仍然标记了错误（如 `CERT_STATUS_DATE_INVALID` 或 `CERT_STATUS_AUTHORITY_INVALID`）。
        
    -   一旦检测到这些错误位被置位，浏览器就会进入这个 `if` 分支。
        
3.  **行为**：
    
    -   `DoneWritingToEntry(false)`：这个函数调用告诉缓存系统，不要完成这次写入过程，该条目会被视为“无效”或“截断（truncated）”。
        
    -   由于写入过程被提前终止且没有标记为“同步到磁盘”，这些数据将**无法进入 Disk Cache**，仅可能在当前会话的内存中短暂存在。
        

### 为什么这样做？（源码注释中的理由）

正如代码注释中所说：

-   **防止掩盖错误**：如果允许缓存，下一次从缓存加载该资源时，由于不需要经过真实的 TLS 握手，浏览器将无法感知到原本存在的证书错误。
    
-   **安全风险**：如果用户不再看到 SSL 警告页（因为资源是从缓存加载的），他们会误以为连接是安全的，这给了中间人攻击（MITM）可乘之机。
    

**在线源码查看地址（实时更新）：** Chromium Source Explorer - http\_cache\_transaction.cc [1](https://source.chromium.org/chromium/chromium/src/+/main:net/http/http_cache_transaction.cc;l=3576?q=IsCertStatusError\(response.ssl_info.cert_status\))*(注意：链接末尾的* `l=3576` *是当前的近似行号，你可以直接在页面内搜索* `IsCertStatusError` *找到最新位置。)*