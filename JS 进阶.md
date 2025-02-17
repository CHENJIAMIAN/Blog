### 有趣难题
```js
☢
    function Foo(){
     getName=function(){alert (1);}
    return this;
    }
    Foo.getName=function(){alert (2);}
    Foo.prototype.getName=function(){alert (3);}
    var getName=function(){alert (4);}
    function getName(){alert (5);}
    
    new Foo.getName();         //new (Foo.getName());
    new Foo().getName();       //(new Foo()).getName();
    new new Foo().getName();   //new  ( (new Foo()).getName ) ();
          
★
    var b = 10;
    (function b(){
        b = 20; //本句无效! ,因为b是自执行,其实已经声明const b=function(){}, b不能再重新赋值了,
        console.log(b); //打印出函数b
    })(); 
```

### 重排重绘
```javascript
重排: //尺寸的变化时
    1、添加或删除可见的DOM元素   2、元素位置改变 3、元素尺寸改变（盒子模型）  4、内容改变   5、最初的页面渲染    6、浏览器窗口尺寸的改变
    /读取宽高、样式、交叉时/
重绘: //样式变化
    /规避方法/
        1批量修改
        2离线操作DOM树(操作documentFragment,最后再把它添加到文档中)(display: none，操作结束后再把它显示出来)//DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题
        3对具有复杂动画的元素使用绝对定位
```

### requestIdleCallback
```js
requestIdleCallback() 
    //空闲时运行:解决因为一些不重要的异步任务（如统计上报）导致用户感觉到卡顿
    /与setTimeout的区别: 用的是帧16.6ms里的空闲时间/
    requestIdleCallback(myNonEssentialWork,  { timeout: 1000});//第一次调用
        //timeout: 1000 表示至少每秒运行一次, 因为requestIdleCallback利用的是帧16.6ms里的空闲时间, 但不一定有空闲
    function myNonEssentialWork(deadline) {
        // 当回调函数是由于timeout才得以执行的话，deadline.didTimeout为true
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
            //doWorkIfNeeded();
            tasks.shift();//移除本次执行过的任务
        }
        if (tasks.length > 0) {
            requestIdleCallback(myNonEssentialWork);//第二次及之后调用
        }
    }
```

### 概念
```javascript
[[]][0]++;//0  
        //[0] 的访问返回的是对"[[]]"的 第0个内存位置的引用，而非位于该位置的值"[]"本身，属于Reference类型
        //++ 会将 第0个内存位置的引用 强制转化为一个基本类型的数字（先转成 "" 再转成 值0 ，++ 操作会将该 值0 加 1 
        //控制台为什么打印出0？ 因为++返回的是“初始值”，而不是经过更新后的值，这是规定，所以 0 被返回给控制台，而 1 通过引用（Reference）放到了数组里
[]++;//ReferenceError 
    //x++ 中，几乎等同于 x = x + 1  , 只有 Reference类型的变量可以作为合法的赋值对象,所以=左侧必须为Reference类型，[]不属于Reference类型，所以报错
    
为什么JavaScript 中最大的安全整数 (2^53 - 1)
    64位 = 1位符号 + 11位指数 + 53位有效数字

即时编译JIT: 编译器第一次执行字节码时，发现有段代码被重复执行多次，就将它编译为机器码保存起来，当再次执行这段代码时，只需要执行编译后的机器码

语法错误——SyntaxError
运行时错误——ReferenceError

暂时性死区: 在代码块内, 在let声明语句之前, 去使用声明的变量, 会报错
    var a = 100;
    if (1) {
      a = 10;
      let a = 1;// 控制台Error:a is not defined
      //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，而这时，还未到声明时候，所以控制台Error:a is not defined
    }

    
控制台技巧:
    $_//：返回上一个被执行过的值
        
//在变量值前使用+的本意是将变量转换为数字    
二进制：  只用0和1两个数字，前缀为0b，十进制13可表示为0b1101
八进制：  只用0到7八个数字，前缀为0o、0，十进制13可表示为0o15、015
十六进制：只用0到9的十个数字，和a到f六个字母，前缀为0x，十进制13可表示为0xd

Array.prototype.sort(),默认根据字符串的Unicode编码进行排序，具体算法取决于实现的浏览器，在v8引擎中，若数组长度小于10则使用从插入排序，大于10使用的是快排。

//多维数组直接展平(降维)的实现
[1, [2,3], [4]].flat(1)//[1, 2, 3, 4] 参数为展平的维度,可为Infinity不管几维数组都直接展平一维
<==>
var flat =arr => arr.reduce((acc, b) => acc.concat(Array.isArray(b) ? flatten(b) : b), []);

Array.prototype.length//    length还有一个重要的特性，那就是允许你修改它的值，若修改值小于数组本身的最大索引，则会对数组进行部分截取,会影响其他引用此数组的值!!!
Object.prototype.toString.call//toString则会返回[object type], Object.prototype.toString.call([]) => "[object Array]" ， 利用这个特性，可以较为精确的实现类型判断。       
Object.create(null)//    用于创建无“副作用”的对象，也就是说，它创建的是一个空对象，不包含原型链与其他属性。
    

范畴是值跟函数的容器
函子是一种范畴,但并留下一个可以将值搞到另一个容器上去的map函数来操作这个函数
    var Container = function (x) {
      debugger
      this.__value = x;
    };
    Container.of = (x) => new Container(x);
    Container.prototype.map = function (f) {
      return Container.of(f(this.__value));
    };
    Container.of(3)
      .map((x) => x + 1)
      .map((x) => 'Result is ' + x);
高阶函数: '输入函数'或'输出函数'的函数

柯里化: 先处理其他参数，再它返回一个去处理剩下的第一个参数的函数//把多参数参数转化成单参数函数
    如何实现: //用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，就开始执行函数
        // 柯里化之前
            function add(x, y) {
                return x + y;
            }
            add(1, 2) // 3
        // 柯里化之后
            function addX(y) {
                return function (x) {
                    return x + y;
                };
            }
            addX(2)(1) // 3
    用来:1.延迟计算(传参,再传参,再传参,最后再执行)//bind的实现也是同样的原理，reduce
         2.动态创建函数()//eg判断浏览器类型，判断完后返回对应的函数，这样就不用每次都判断了
         3.复用参数()//eg固定住Object.prototype.toString为toStr方法, 让以后调用直接用tStr方法即可,而不用Object.prototype.toString.call(obj)这么长.


移动端电脑端事件对应
    @mousedown="startDrag" @touchstart="startDrag"
    @mousemove="onDrag" @touchmove="onDrag"
    @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag"
        e = e.changedTouches ? e.changedTouches[0] : e;//兼容地获得事件
        e.pageX;
        e.pageY;
        
encodeURIComponent('列头柜%#-1-9-1')   //"%E5%88%97%E5%A4%B4%E6%9F%9C    %25%23  -1-9-1"
encodeURI('列头柜%#-1-9-1')            //"%E5%88%97%E5%A4%B4%E6%9F%9C    %25#    -1-9-1"
```


### bind | 深拷贝 | new | instanceof
```javascript
实现bind方法(用apply)
    Function.prototype.mybind = function (context) {
      let t = this
      let args = [...arguments].slice(1)
      return function F() {        //通过new F()去使用的话, this就是F的实例对象
        return (this instanceof F) ? new t(...args, ...arguments) : t.apply(context, args.concat(...arguments))
      }
    }
    
实现call() | 实现apply(): //利用f1.f2()的this是f1
    Function.prototype.call2 = function (c) {
          c= c ? Object(c) : window; //f1.call2(null|123);可以传入原始类型
          
          let fn = Symbol()
          c[fn] = this;//不用context.fn = this;,因为假如context本身就有fn函数的话就被你覆盖掉了
        
          let result = c[fn](...[...arguments].slice(1).flat(Infinity));//call/apply通用          
        
          delete c.fn//搞完记得删掉
          return result;
     }   
     //test    
        var abc='windowabc'
        var a={abc:'abc'}
        function b(a1,a2,a3){
        console.log(this.abc)
        console.log(a1,a2,a3)
        }
        b.call2(a,1,2,3)
        b.call2(a,[1,2,3])
        
        
        


    
实现() new(/重点/):  
    function myNew(fn, ...args) {
        let instance = Object.create(fn.prototype); //搞到对象的原型 (把fn.prototype作为{}的__prototype__)  等同  instance.__prototype__ = new fn(); 
        let res = fn.apply(instance, args);//this绑定，顺便 执行构造函数搞到对象的属性   //super() 相当于它
        return typeof res === 'object' ? res: instance;//如果构造函数有返回的{对象}则优先返回,  否则返回实例
    }
    
实现数组乱序():
    function shuffle(arr) {//将数组从后向前遍历，然后将当前元素与随机位置的元素进行交换
        let m = arr.length;
        while (m > 1){
            let index = Math.floor(Math.random() * m--);
            [arr[m] , arr[index]] = [arr[index] , arr[m]]
        }
        return arr;
    }

深拷贝:    
    实现5个类型的深拷贝(): 
        1.普通的
            JSON.parse(JSON.stringify(Obj))//性能低, 无法处理:闭环的引用 | undefined | symbol | 正则 | 函数| Date不正确 |
        2.可以拷贝属性是[数组]的
        3.可以拷贝属性是[它自己]的 (循环引用)//如果当前需要拷贝的值已存在于栈中，说明有环，直接返回即可
        4.可以拷贝属性名是[Symbol]的
        5.不会递归爆栈的
浅拷贝: //这样通过JSON解析的方式其实性能并不高，若对象可通过浅拷贝复制请一定使用浅拷贝的方式，不管你使用
    {...obj}//效果完全等同
    Object.assign({}, obj)//第一层算深拷贝,但是第二层(对象里的对象的属性),是浅拷贝,可能被联动修改!
        实现: 
            if (typeof Object.assign2 != 'function') {
              Object.defineProperty(Object, "assign2", {
                value: function (target) {
            1      'use strict';// JS对于writable: fasle的属性值的修改静默失败  (让Object('abc')[0]='d'本来是静默失败,现在会报错)
                  
            2      if (target == null) { // 如果是undefined | null 就报错
                    throw new TypeError('Cannot convert undefined or null to object');
                  }     
                     
            3      var to = Object(target);//让true 10等变得可枚举   
                               
            4      for (var index = 1; index < arguments.length; index++) {//第2个参数开始都是要赋给第1个参数的
                    var nextSource = arguments[index];//遍历要合并进去的对象
                    if (nextSource != null) {
                      for (var nextKey in nextSource) {//遍历对象里的子子孙孙
            4.1            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {//只要对象里的子,不要孙(浅拷贝)
                              to[nextKey] = nextSource[nextKey];
                        }
                      }
                    }
                  }
                  
                  return to;
                },
                writable: true,//属性可读可配置 
                //enumerable: false //不可以用 for...in 
                configurable: true //则该属性能被删除
              });
            }
        

实现(instanceof):
    function instanceOf(left, right) {//对象沿着原型链找，看能不能摸到构造函数的原型
      let o = left.__proto__
      let F = right.prototype
      while (true) {
        if (o === null)   return false    
        if (o === F)      return true    
        o = o.__proto__
      }
    }


更好地获取__proto__ : 
    Object.getPrototypeOf({}) === Reflect.getPrototypeOf({})//true
    Object.setPrototypeOf() === Reflect.setPrototypeOf()
    
ES6实现私有变量:
    const Example = (function() {
        var _private = Symbol('private');   //闭包Symbol变量 
        class Example {
            constructor() {this[_private] = 'private';}
            getName() {return this[_private];}
        }    
        return Example;
    })();
    var ex = new Example();
    console.log(ex.getName()); // private
    console.log(ex.name); // undefined
```

### 节流防抖
```javascript
节流throttle()： //无论触发了多少次,间隔内都只执行一次(忽略掉每隔一段时间内的多次触发) 每次点都要等flag变true
	区别防抖：
    用于:DOM 元素的拖拽功能实现 射击游戏 
    实现方式1：用时间戳new Date()
    实现方式2：用setTimeout
    //最简单:
        let bool=true;
        btn.onclick = ()=>{
            if(bool){
                /*做一些开心的事情*/  
                bool=false;  
                setTimeout(()=>{bool=true},3000)
            }
        }
    //封装:
       时间戳版(第一次肯定执行):
            const throttle = function (func,wait = 50) {
                let preTime = 0;
                return function (...args) {
                    let now = Date.now();
                    if(now - preTime >= wait){//第一次是now-0肯定>=wait,肯定执行
                        func.apply(this,args);
                        preTime = now;
                    }
                }
            };
        定时器版(最后一次肯定执行):
            const throttle = function (func,wait = 50) {
                let timer = null;
                return function (...args) {
                    if(!timer){//第一次进来, 第二次间隔太小的话timer还是数字不为null,就进不来,等到执行了才进来
                        timer = setTimeout(()=>timer = null,wait);
                        return func.apply(this,args);
                    }
                }
            };

防抖debounce()：//无论触发了多少次，都只执行间隔第一/最后一次(多次执行变为第一/最后一次执行),
    /区别防抖:它理论上一直动一直不执行/
    //延迟执行,太快自动清掉上一次,让上次来不及执行就被清除掉了
    用于:resize/scroll 触发事件 文本输入的验证
    实现方式1：用setTimeout
        function debounce(fn, interval = 2000) {
            let timeout = null;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, arguments);
                }, interval);
            };
        }
```

### 页面从输入 URL到页面加载显示完成
```javascript
一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么 重点

0. 缓存
1. DNS 查询
1.1 DNS 缓存//ISP、局域网、操作系统、浏览器等都会有相应的DNS缓存机制。
1.2 减少页面的唯一域名//因为每次 DNS 查询就是查找唯一域名的过程，那么域名越少，DNS 查询就越少，应该尽量将资源放在同一域名。当然这样做又有其他问题，下文详解。
2. TCP 连接//TCP 连接复用（TCP Connection Reuse），在 HTTP 请求头中的 Connection 上加 keep-alive；HTTP/2.0 多路复用等。
3. HTTP 请求及响应
3.1 避免不必要的重定向//最浪费的重定向经常发生、而且很容易被忽略：URL 末尾应该添加/但未添加。比如，访问http://astrology.yahoo.com/astrology将被301重定向到 http://astrology.yahoo.com/astrology/（注意末尾的 /）。如果使用 Apache，可以通过Alias或mod_rewrite或DirectorySlash解决这个问题。
3.2 Cookie//3.2.1减少 Cookie 大小, 每次请求都会带上对应的 Cookie，减少 Cookie 大小可以降低其对响应速度的影响：注意设置 Cookie 的 domain 级别，如无必要，不要影响到 sub-domain；设置合适的过期时间。
3.2.2 静态资源放无 Cookie 服务器上//静态资源一般无需使用 Cookie，可以把它们放在使用二级域名或者专门域名的无 Cookie 服务器上，降低 Cookie 传送的造成的流量浪费，提高响应速度。
3.3 添加 Expires 或 Cache-Control 响应头//HTTP/1.1 增加的 Cache-Control，它比 Expires 等好在其设定时间是相对的，避免了用户本地设置时间落后所造成的无法良好缓存的问题等。
        强缓存:
            Cache-Control(HTTP1.1)：有很多属性，不同的属性代表的意义也不同：
	            private：客户端可以缓存
	            public：客户端和代理服务器都可以缓存
	            max-age=t：缓存内容将在t秒后失效
	            /no-cache：用之前问服务器一下,配合 ETag 使用/
	            no-store：所有内容都不会缓存
3.4 配置 Etag//通过如 MD5 等加密算法，设置缓存体的 Etag 配合 3.3 的缓存时间使用，这样 Cache-Control 就可以设置较长时间（max-age 设置个十年半载 ），只要浏览器缓存中资源与源服务器中的资源 Etag 不一致，说明内容更新了，此时再下载新资源；Etag 匹配成功则直接响应 304，不用重复下载了用户自然感觉很快。
        协商缓存:
            Etag：服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）
3.5 使用 Gzip//Gzip 压缩通常可以减少 70% 的响应大小 Accept-Encoding: gzip, deflate ,服务器通过Content-Encoding: gzip响应头来通知客户端。
        Webpack开启
        Nginx开启
3.6 延迟加载（懒加载）//减少初始渲染的DOM元素数量，提高速度。等首屏加载完成或者用户操作时，再去渲染剩余的页面内容。
        使用link标签的rel属性设置   prefetch（这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低，prefetch通常用于加速下一次导航）
3.7 预加载//预先加载利用浏览器空闲时间请求将来要使用的资源，以便用户访问下一页面时更快地响应。
        preload（preload将会把资源得下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度）
4. 浏览器解析渲染页面
        服务端渲染SSR
4.1 写对文档类型声明 <!DOCTYPE html>//防止“怪异模式(兼容模式)”的渲染模式。不写或写错文档类型声明，会浪费浏览器渲染页面的时间或引起错误排版。
4.2 CSS 放在 <head> 中//把样式表放在 <head> 中可以让页面渐进渲染，尽早呈现视觉反馈，给用户加载速度很快的感觉。
4.2 把脚本放在页面底部//防阻塞 ,一些特殊场景无法将脚本放到页面底部的，可以考虑<script>的以下属性：defer 属性；HTML5 新增的async属性。
4.3 使用外部 JavaScript 和 CSS//外部文件可以被浏览器缓存重用
4.4 合并和压缩 JS/CSS 等文件//通过该方法减少页面所需资源，减少请求数量，加快响应时间。现在 webpack 打包工具都已经默认实现了。
4.5 减少 DOM 操作和使用高效的事件处理//缓存已经访问过的元素；使用 DocumentFragment 暂存 DOM，整理好以后再插入 DOM 树；操作 className，而不是多次读写 style；
    //避免使用 JavaScript 修复布局；
    //尽早处理事件，在 DOMContentLoaded 即可进行，无需等待样式表、图像和子框架的完全加载触发load 以后。
4.6 图片优化//如何将图片变得又小又好看是一个工程师实力的体现，这里不过多赘述，大家可以查看我后文提供的资源。
4.7 使用 CND//内容分发网络，利用最靠近每位用户的服务器传递给用户。CDN 没有 Cookie，使用 CDN 可以减少 Cookie；CND 会自动合并脚本文件等，减少请求数量；当然，使用 CND 同时也增加了一个域名，增大了同时请求数量。
```


### 7种原始类型
```javascript
7种原始类型//(也就是不用寻址直接能用的)(占有固定大小的空间)有6种:
        Boolean.
        String.
        Number.
        /BigInt/
        Undefined.
        Null.
        Symbol
引用值(值的大小不固定)
   //栈中读取内存地址， 然后再通过地址找到堆中的值

var a = { name: '前端开发' }; var b = a;  a = null;// 这时b的值是多少? 
    //a = null其实仅仅只是做了一个释放引用的操作，让 a 原本对应的值失去引用，脱离执行环境，这个值会在下一次垃圾收集器执行操作时被找到并释放。

var a = {n: 1}; var b = a;    a.x = a = {n: 2};
    //这时a,b的值是多少? 
    //.的优先级高于=，所以先执行a.x， a.x位置先被设undefined在栈里,b原来引用的该位置的{n:1}就变成{n:1,x:undefined}, 
    //a变为引用{n:2}, a.x这个位置也就是b还在引用的哪个位置, 也由undefined变成引用{n:2}, 
```



```javascript
console.log(fun)
console.log(person)
var person = "Eric";
console.log(person)
function fun() {
    console.log(person)
    var person = "Tom";
    console.log(person)
}
fun()
console.log(person)
```


### 闭包
> 定义在外函数内部的内函数,且内函数引用了外函数的变量
```javascript
用处 //在函数外部访问函数内部变量:它可以访问它外部的变量，而外部环境不能访问它内部的变量，可以读取 外函数 的内部变量（并且这些变量的值始终保持在内存中）
1.私有化变量
2.模拟块级作用域 //函数内部属性[[scope]]代表的是作用域
    外函数=function(){//闭包
        var 外函数的内部变量;//外部访问不到我,嘿嘿
        内函数=function(){外函数的内部变量=修改值};//外部可以访问我,用我来修改闭包里的变量;
        return 内函数;
    }
(特点是外函数执行完后还可以用内函数改变它内部的变量),那为什么外函数的上下文被销毁后内函数还能访问外函数的变量?
    /外函数的上下文被销毁,但外函数变量依然或在内存中, 通过 内函数内部属性[[scope]]指向内存中的外函数变量/
```


### --i | i-- | 隐式转换
```javascript
--i | i-- 的不同:
function a1() {    var i = 5;    while (i)           console.log(i--)} //5，4，3，2，1   //i进来的值为5，4，3，2，1  //i--打印完再减
function a2() {    var i = 5;    while (i)           console.log(--i)} //4，3，2，1，0   //i进来的值为5，4，3，2，1 //--i减完再打印

function a3() {    var i = 5;    while (--i)         console.log(i)}  //4，3，2，1     //--i减完再进入循环  //i进来的值为4，3，2，1
function a4() {    var i = 5;    while (i--)         console.log(i)}  //4，3，2，1，0  //i--进入循环再减   //i进来的值为5，4，3，2，1


如果while是嵌套的,while(条件) 你在下次使用的时候条件要复原吧(所以,while不要嵌套!!!)
对于二维数组,while里面每次只移动一个位置,不要同时x++|x--|y++|y--(不然很乱)
递归的话要注意结束条件

为什么不要用while(i)遍历数组!!!:
var array=[1,2,3,4,5]
function a1() {    var i = 5;    while (i)           console.log(array[i--])} //undefined，5，4，3，2 
function a2() {    var i = 5;    while (i)           console.log(array[--i])} //5，4，3，2，1   //完美，但是还是老老实实用>  <  =作为while的条件吧
function a3() {    var i = 5;    while (--i)         console.log(array[i])}  //5，4，3，2   
function a4() {    var i = 5;    while (i--)         console.log(array[i])}  //5，4，3，2，1，undefined 

隐式转换
    数学运算符中的类型转换
        //1.减、乘、除转数字
        2.加法有特殊性(还可以用来拼接字符串) //字符串 > 数字 > 引用类型
            0、有String优先转String
            1、无String有数字优先转数字，ToNumber()
                    null->0
                    undefined->NaN
            2、对象的话将值转为原始值，ToPrimitive()          
    逻辑语句中的类型转换 ==   //NaN > 数字 > 字符串 > Boolean > 引用类型
          1.NaN == NaN // false
          2.Boolean/String优先转数字
          3.只有null == undefined是true //null、undefined和其他任何结果的比较值都为false
          4.原始类型与引用类型比较 
                2、对象的话将值转为原始值，ToPrimitive() //ToPrimitive([])是""
                    例如:
                        eg: []==![]
                        =>  []== false
                        =>  ""== 0
                        =>  0 == 0    
                        eg: {}+[]  //0, 把{}当作区块语句相当于+[]    
          5.引用类型与引用类型比较,直接比较地址
    ToPrimitive()
        是原始值则返回
        是对象:
            => valueOf()是原始值则返回
                null->'null'
                []->''
                true->'true'
            => toString()是原始则返回 
            //[1,2,3,4]转为"1,2,3,4"，相当于调用数组的join()
            //因为toString方法默认调用join方法
```



### 技巧
```javascript
typeof []; //"object" //[]、{} 都是引用数据类型 Object

三大家族 offset(元素位置相对于其offsetParent元素)  /  scroll  /  client 的区别：    
    宽高
        offsetWidth：实际 包含边框   的宽高
        scrollWidth: 实际 不包含边框 的宽高
        clientWidth: scrollWidth减掉overflow部分
    滚动的Left/Top:
        scrollLeft：x滚动条滚动的距离
    
屏幕宽度:
    滚动条
        window.innerWidth
    不含滚动条
       document.documentElement  .clientWidth // 可见区域宽度 (建议用这个)   //返回 <html> 元素，且它一定是该文档的根元素
       document.body             .clientWidth //BODY对象宽度                //返回 <body> 元素


box1.style.cssText = "width: 300px;height: 300px;background-color: green;";//通过cssText一次性设置行内样式
window.getComputedStyle("要获取样式的元素", "伪元素");//获取当前样式

换行:
    文字:
        word-break: break-all;//适合整个段落,  任何两个字符之间插入分词符  
        overflow-wrap//适合中间某行突兀溢出的
    空格:
        white-space：空白处如何换行
不换行: //overflow为hidden时
        text-overflow: ellipsis; //溢出的文字增加点点点
        
文字截断省略号:
    overflow: hidden;width: 50px;
        单行:text-overflow: ellipsis;   white-space: nowrap;
        多行:display: -webkit-box;     -webkit-box-orient: vertical;    -webkit-line-clamp: 3;
        兼容:p:after{content:'...'}


```

### babel
```javascript
babel 7 
    重大变化是把所有 babel-* 重命名为 @babel/*
    从 Babel 7 开始，Babel 团队切换到了作用域包，所以你现在必须@babel/core使用babel-core.
    {
      "presets": [
    -   "env" //babel6 ,env 等价于 latest，也等价于 es2015 + es2016 + es2017 三个相加(不包含 stage-x 中的插件)
    +   "@babel/preset-env"//babel7
      ]
    }

核心包
    @babel/core
    @babel/parser
    @babel/traverse
    @babel/generator
    
    @babel/core是 Babel 编译器本身；它公开了babel.transform方法，其中transformedCode = transform(src).code.
        编译器可以分为 3 个部分：
            解析器：@babel/parser
            转换器[s]：所有插件/预设
                这些都用于@babel/traverse遍历 AST
            生成器：@babel/generator
        流程是这样的：
            输入字符串 ->@babel/parser解析器 -> AST-> 转换器 [s] -> AST-> @babel/generator-> 输出字符串

其他
    @babel/cli是运行@babel/core并帮助输出到目录、文件、标准输出等的 CLI 工具（也包括@babel/nodecli）。查看文档。
    @babel/types用于验证、构建和更改 AST 节点。
    @babel/runtime与 polyfill 类似，不同之处在于它不修改全局范围并且将与@babel/plugin-transform-runtime（通常在库/插件代码中）一起使用。查看文档。
        //babel-polyfill直接增加了全局对象实现太粗暴,所以库推荐使用@babel/runtime
    @babel/register是一种通过绑定到 Node.js 来自动使用 Babel 动态编译文件的方法require。查看文档。
    @babel/template是一个帮助函数，允许从代码的字符串表示中构造 AST 节点；这消除了@babel/types用于构建 AST 节点的乏味。
    @babel/helpers是一些 Babel 插件中使用的一组预制@babel/template函数。
    @babel/code-frame是一个独立的包，用于生成打印源代码并指向错误位置的错误。
    
    core-js 是JavaScript标准库的polyfill
    
预设
    @babel/preset-env  根据您支持的环境自动确定您需要的插件和 polyfill
    
    在 Babel 6 之后，删除了默认转换；如果你没有指定任何插件/预设，Babel 只会返回原始源代码。
    Babel 中使用的转换器是转换特定事物的独立代码段。例如：es2015-arrow-functions转换专门将箭头函数更改为常规函数。
    预设只是一组插件，可以更轻松地运行一组转换，而无需手动指定每个转换。
    
    执行顺序
        Plugin 从前到后执行,在Preset之前运行
        Preset 从后向前执行
    
    
    
插件//插件是 Babel 的核心，也是它工作的原因。
    转换插件
        插件有很多种：将 ES6/ES2015 转换为 ES5、转换为 ES3、缩小、JSX、流、实验特性等等。
    语法插件
        @babel/plugin-syntax-xxx 这些只是使转换插件能够解析某些功能（转换插件已经包含语法插件，因此您不需要两者）
        
帮手
    @babel/helper-x 这些主要用于各种插件的内部使用

webpack //npm install --save-dev babel-loader @babel/core #就完事了其他都是@babel/core的依赖
//最简单例子(不使用任何插件):
    const parser = require('@babel/parser');
    const traverse = require('@babel/traverse').default
    import { transform } from "@babel/core";
    const generate = require('@babel/generator').default
    //1.解析
    const ast = parser.parse('const a = 1');
    //2.转换
    traverse(ast, {
        VariableDeclaration(path, state) {
          path.node.kind = 'var'
        }
    });
    //3.生成
    const transformedCode = generate(ast).code// 将处理好的 AST 放入 generate
    console.log(transformedCode)
```
![C50988529CA845269C8031A05A3C15FC](https://github.com/CHENJIAMIAN/Blog/assets/20126997/3d5a5709-9aa0-4589-a531-273225bfed03)


### CSRF
```javascript
安全:
    跨站攻击: //Cross-site /重点/
        请求伪造:CSRF(request forgery) 利用登录态信息
            //网站A登录了,浏览器存在网站A的cookie, 网站B(或邮件)里有个链接访问了网站A的AddNum接口, 浏览器会自动带网站A的cookie给服务器,所以服务器正常返回
                //注意: cookie保证了用户可以处于登录状态，但网站B其实拿不到 cookie ,所以 只能增改删,无法获取服务器数据(因为浏览器的同源策略)  //防御：
            1.token//(除cookie外另加一个专门反csrf的验证token, 每个请求体都要带该token)
            2.Referer和Origin头(https不发送!),限制只能从A站访问A站,不能从B站访问A站
            3.最有效是人机验证码
            4.利用 SameSite（三种模式：Strict、Lax、None） 让浏览器禁止第三方站点发起请求携带关键 Cookie
        脚本攻击:XSS(Scripting)//输入框注入        //1.反射型(提交原样返回) | 2.存储型(显示评论时)                   
            //XSS：是向网站 A 注入 JS代码，然后执行 JS 里的代码，篡改网站A的内容。//防御：    
            1.校验表单,转义掉//Content-Type: application/json(JSONP解决XSS)
            2.HttpOnly 防止注入js读取Cookie
            3.CSP让本站运行不了别的站的内容
    中间人攻击:
        //夹在C/S之间
        //防御: HTTPS的话要:校验域名\证书
    防止网页被其他网页iframe嵌套：
        X-Frame-Options:SAMEORIGIN //表示该页面可以在相同域名页面的 frame 中展示
```

### Base64规则
```javascript
Base64:
    eg:字母M -> 6个6个地取ASCII编码的2进制 /*如M的ASCCI是77即01001101,前6位010011即(19)*/  ->  (19)对应64个[可打印字符]里的T
    /图片被编码之后，生成的字符串编码大小一般而言都会比原文件稍大一些,  Man->TWFu(文本变多了)/
    用处:HTML内嵌Base64编码图片(减少不必要请求)
```
![46D1BE3DFB7C4959A81DDC3740279548](https://github.com/CHENJIAMIAN/Blog/assets/20126997/46654690-4d7d-41e7-bb14-f6b79c8a4d3a)


### 浏览器原理
```js
渲染进程 
    1个 主线程    
    1个 合成线程 和 光栅线程
    n个 工作线程(worker等)

标签模板字符串:  
    let a = 5, b = 10;
    function tag(s, v1, v2) {/*用来过滤字符串等*/}
    tag`Hello ${ a + b } world ${ a * b}`  
    等同于  
    tag(['Hello ', ' world ', ''],  a + b , a * b);  
```


### 编写JS引擎友好的代码
**保持稳定，避免动态，作用域尽量小。**
