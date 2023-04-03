

```javascript
跨域:
    只要是跨域请求 1Ajax | 2DOM | 3存储
    (协议、域名、端口不一致都是跨域行为)，浏览器一律不准.
目的:
    是为了保证用户信息的安全，防止恶意的网站窃取数据。
没有会怎样:
   恶意的网站直接套用iframe打开的真实的站点,在用户输入用户名和密码之后，如果没有同源策略限制DOM操作，那么恶意的网站就可以通过代码获取用户信息
    
为什么不让我跨域ajax
    因为不能保证请求是用户发出的, 假如支付宝的转账操作是一个post请求，大概是https://alipay.com/api/withdraw/?to_user=kindJeff&amout=1000
   我写了一段ajax的post请求代码，请求连接是上面的url。然后我把这段代码嵌入我的网站a.com, 刚好浏览器还有alipay.com域名的cookie的cookie
   我让你访问a.com，打开页面，于是在你不知情的情况下发出了post请求，你的钱就被转到我的账号里了
```



```javascript
跨域通信的 5种 方式：
    1、JSONP
    2、WebSocket
    3、CORS
    4、Hash//Hash的改变，页面不会刷新。这就是用 Hash 做跨域通信的基本原理。window.onhashchange=获取数据
    5、postMessage
        window1.postMessage('data', 'http://B.com');
        window2.onmessage=()=>{}
            或 new MessageChannel().onmessage=()=>{}


CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）,用来解决跨域问题.
    整个CORS通信过程，都是浏览器自动完成，实现CORS通信的关键是服务器实现了CORS接口。
    
    简单请求//动词为get/post/head，
            //没有⾃定义请求头，或是表单/文本
            //Content-Type是application/x-wwwform-urlencoded，multipart/form-data或text/plain之⼀
        客户端:
                Origin: http://api.bob.com //关键字段在这, 声明请求来自哪个源（协议 + 域名 + 端口）,问服务器同不同意
        服务器: 
                Access-Control-Allow-Origin: http://api.bob.com
                    //浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，
                    //从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
                Access-Control-Allow-Credentials: true
                    //浏览器对跨域请求一版不会发送cookie, 改配置表示是否允许发送Cookie, xhr.withCredentials = true;
                    //同时:Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名
                Access-Control-Expose-Headers: FooBar     //本来只能拿六个字段 这么设置可以多拿       
                    //该字段可选。CORS请求时，XMLHttpRequest.getResponseHeader()方法只能拿到6个基本字段：
                    //Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
                    //上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。            
                //Content-Type: text/html; charset=utf-8
            
    非简单请求 // 1.PUT 2.DELETE 3.json/xml 删改|结构数据
        1.预检请求:
           客户端: //预检请求服务器询问能不能接受方法/头字段
                OPTIONS /cors HTTP/1.1  ,/OPTIONS，表示这个请求是用来询问的/
                Origin: http://api.bob.com //关键字段
                Access-Control-Request-Method: PUT //必须
                Access-Control-Request-Headers: X-Custom-Header//该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段  
           服务器:
                Access-Control-Max-Age: 表示可以缓存,/防止多次预检/
                预检通过:   服务器收到"预检"请求以后
                预检不通过: 如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，
                           因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
                    //HTTP/1.1 200 OK
                    //Date: Mon, 01 Dec 2008 01:15:39 GMT
                    //Server: Apache/2.0.61 (Unix)
                    Access-Control-Allow-Origin: http://api.bob.com //关键字段
                    Access-Control-Allow-Methods: GET, POST, PUT
                    Access-Control-Allow-Headers: X-Custom-Header
        2.一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。


    与JSONP的比较
        1.JSONP只支持GET请求
        2.JSONP支持老浏览器，以及可以向不支持CORS的网站请求数据。  
    
    
Jsonp(JSON with Padding) :使用<script>元素作为Ajax传输的技术,解决跨域问题    
    原理: 拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>
    缺点：JSONP只能发起GET请求
    
    /服务器根据客户端callback,返回该方法的参数和调用的json字符串/
    客户端（从跨域的服务器获取json数据）
            //声明
                <script type="text/javascript">
                    var getJSONP = function(json){alert(json.data);    ////data={data:'123'},弹出 '123'
                </script>
            //调用
                <script type="text/javascript" src="http://remoteserver.com/Myservelt? callback=getJSONP"></script>  
        
    跨域的服务器
            //Myservelt 获取到传入的callback为getJSONP,于是返回"getJSONP({data:'123'});" 该字符串作为js代码被客户端解析
                <script type="text/javascript" src="http://remoteserver.com/Myservelt? callback=getJSONP"></script> 
                //变成
                //<script type="text/javascript">getJSONP({data:'123'})</script> /*于是getJSONP被调用，而且传进去的参数是服务器发来的*/    
```

