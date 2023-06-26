### ChatGPT Sidebar历史记录存在哪 ?
1. 断网还能查询到, 必然在本地, 元素ID:`chat-history-panel`
2. 从`C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\Local Extension Settings\difoiogjjojoaoomphldepapgpbgkhkb`下的`*.ldb`文件找到蛛丝马迹
3. 格式化`C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\Extensions\difoiogjjojoaoomphldepapgpbgkhkb\2.6.1_0\content-all.js`
4. shan'chu
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
```

