

```javascript
【PWA】:使用指定技术(Service Workers最关键,Notification)来开发的接近原声的web应用
    判定:离线，可安装，有通知, 可以发送到桌面
```



```javascript
直接写原生的sw.js，比较繁琐和复杂, 使用google团队推出的workbox更方便
```



```javascript
Service Workers(做离线缓存) 

通常遵循以下基本步骤来使用 service workers：

1.注册离线资源:    
    if ('serviceWorker' in navigator) {  
      navigator.serviceWorker.register('/sw.js', { scope: '/' }) //开始执行sw.js里的代码
      .then(function(reg) { //reg是ServiceWorkerRegistration的实例
                            console.log('Registration succeeded. Scope is ' + reg.scope);
                            if (reg.installing) {console.log('Service worker installing');} //第一次访问网页,被调用
                           else if (reg.active) {console.log('Service worker active');} //再次访问网页时被调用
                      
                        /*reg.pushManager.getSubscription().then(async function(subscription) { 也可以再这里搞通知  });*/
                      
                          })  
      .catch(function(error) {console.log('Registration failed with ' + error);});
    }

1.1.离线资源的定义(包含被用来注册的声明周期方法):
    /sw.js文件内容:/
        //sw.js被注册到浏览器(在Dev Tools - Application - Service Workers 可以看到)
        //this.self === self; //返回true
        //this instanceof ServiceWorkerGlobalScope === true; //返回true
        
    //1.第一次访问网页(对于未安装的新ServiceWorker浏览器将会触发 install 事件):
        this.addEventListener('install', function(event) { 
          event.waitUntil(//传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
            caches.open('cache1').then(function(cache) {//Cache 接口(CacheStorage)像 workers 一样，是暴露在 window 作用域下的
              return cache.addAll([//添加要离线的资源的 requset url
                '/',     '/index.html',      '/style.css',      '/app.js',    '/gallery/snowTroopers.jpg'
              ]);//cache.addAll返回的是请求url后的 response的对象, 所以caches变成了一个存满响应对象的数组[response1,response2,...]
            })
          );
        });    
        
    //2.再次访问网页时, 被[浏览器]调用(任何 serviceworker 控制的资源被请求到时，都会触发 fetch 事件):
        self.addEventListener('fetch', function(event) {//event是FetchEvent的实例
            //在获取在线资源时先判断缓存里有没有
          event.respondWith(caches.match(event.request).then(function(response) {
              //如果请求的在线资源,在缓存里有, 就直接返回
            if (response !== undefined) {   return response;  } 
            else {//如果请求的资源,在cache.addAll里没有定义, 就在线获取
              return fetch(event.request).then(function (response) {                      
                        let responseClone = response.clone();            
                        caches.open('cache1').then(function (cache) {
                              cache.put(event.request, responseClone);//请求和响应流只能被读取一次!! 克隆的response会存到离线的cache中
                        });
                    return response;//请求和响应流只能被读取一次!! 原始的response会返回给浏览器
              }).catch(function () {return caches.match('/sw-test/gallery/myLittleVader.jpg'); });//网络不可用或没匹配的资源时的默认返回
            }
          }));
        });
        
3.直接请求注册的资源,就会从离线那里取了
```



```javascript
被注册的js文件中, 它的生命周期分为这么 5 个:
    安装( install)//：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。
            event.waitUntil()//：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
            self.skipWaiting()//：self 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态。
    安装后( installed )//：Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。
    激活中( activating )//：在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。
             event.waitUntil()//：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
            self.clients.claim()//：在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。
    激活后( activated )//：在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。
    
    //废弃了( redundant )：这个状态表示一个 Service Worker 的生命周期结束。原因可能为这几种：        
            安装中 (installing) 失败
            激活中 (activating) 失败
```

