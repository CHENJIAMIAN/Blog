### ChatGPT Sidebar历史记录存在哪 ?
1. 断网还能查询到, 必然在本地, 元素ID:`chat-history-panel`
2. 从`C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\Local Extension Settings\difoiogjjojoaoomphldepapgpbgkhkb`下的`*.ldb`文件找到蛛丝马迹
3. 格式化`C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\Extensions\difoiogjjojoaoomphldepapgpbgkhkb\2.6.1_0\content-all.js`
4. 删除`manifest.json`下的`key`绕过数字签名验证, 重启浏览器调试插件
5. 追踪堆栈找到`s.sort`处, 在附近找到原理
#### 获取所有历史记录
- 选择上下文`Sider: ChatGPT 侧边栏,GPT-4, 联网`, 执行以下
```JS
const conversations = await chrome.storage.local.get({ "chat:conversations": [] });
const messagesObj = {};
for (const conversation of conversations['chat:conversations']) {
    const conversationId = conversation.id;
    const messages = await chrome.storage.local.get({ [`chat:messages:${conversationId}`]: {} });
    messagesObj[conversationId] = messages[`chat:messages:${conversationId}`];
}
console.log(messagesObj);

或者一句获取所有!

chrome.storage.local.get(null, function (data) { console.info (data) });
```
#### 学习到
1. `chrome.storage`只有在插件的上下文下才看得到
2. [chrome 扩展程序的“chrome.storage.local”数据保存在哪里？ - 堆栈溢出](https://stackoverflow.com/questions/17774857/where-is-chrome-extensions-chrome-storage-local-data-saved)

