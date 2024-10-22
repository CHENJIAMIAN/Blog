##### 踩坑
1. 另一个窗口改localStorage才会触发这个窗口的`storage`事件,自己是触发不了自己的
2. 
```javascript
<script>         //html等它下载和执行完再加载
<script async src=''>   //同加载 同执行 (执行script.js时，html解析暂停,且第二个脚本文件可能会在第一个脚本文件之前执行)
<script defer>   //同加载 后执行
    CSS不会阻塞DOM解析, 但会阻塞DOM渲染, JS等它们搞完再运行(会被阻塞)

3种 执行上下文(栈):
    全局//一直在栈最底下
    函数//每次调用函数都会创建一个新的执行上下文(插入栈),运行完(移除栈)
    eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。

10n //可以用在一个整数字面量后面加 n 的方式定义一个 BigInt
1E3 = 10的三次方=1000 //幂次    e
var n = 0755; // 493  //八进制   0  开头
0XA      // 10        //十六进制 0x 开头
2e-7.toFixed(20)   //"0.00000020000000000000" e-7表示:小数点向前移动7位
0.2e-7.toFixed(20) //"0.00000002000000000000"
0.2e7.toFixed(20) //"2000000.00000000000000000000" e7表示:小数点向后移动7位
2e7.toFixed(20)   //"20000000.00000000000000000000" 

ES6的 9个
    1.(b='1')=>{let、const、块级作用域} //箭头函数没有1.new 2.arguments 3.yield
    2. class A extends B{ super(); super.F()} 
    3. [...Obj] const {A,B,C}=result;//扩展运算符spread | 解构
    4. 简写{a}
    5. `Hi ${val}!` |  直读2|8进制的字面量
    6. Symbol()声明唯一字符串; 新增 WeakSet (/只能是对象/) 和 WeakMap(/key只能是对象,是弱引用.null除外/); 
    //(原来的Map存储的 键数组| 值数组 会一直引用着每个键和值,导致不能回收)   
        Symbol.for("bar") === Symbol.for("bar"); // true, for用来复用Symbol (全局Symbol)
        Symbol("bar") === Symbol("bar"); // false
    7. iterator迭代器是一个实现next的方法：
                可迭代对象:  //实现[可迭代协议],即内部有[Symbol.iterator]迭代器的实现方法 ,可用for...of
                            //[Symbol.iterator]加中括号是因为它是对象,不加会被以为是标识符
                    var iterators= [1,2,3][Symbol.iterator]();   
	                    //数组内部实现了 *[Symbol.iterator]() {yield x;}。该迭代器可以被 for...of 循环使用。
                         iterators.next(); //{value: 1, done: false}
				     被 Array.from 转换为数组。
                迭代器方法: //实现[迭代器协议], 即内部实现了next方法,返回{value, done}, 如上面的iterators                     
                     
    8. generator生成器函数(加了*号的函数)： `Generator比aysnc/awati好在: 可以暂停和恢复执行`
                function * GeneratorsFunc() {//next() 传参是对(yield表达式整体)的传参，否则yield类似于return //生成器既是迭代器，也是可迭代对象
                  let first = yield 1;//next()返回1, 但first接受next是4
                  let second = yield first + 2;    //因为first接受next是4,即next(4), 所以先执行let first=4;再执行first + 2；返回6
                  //如果有return;之后的不会再执行了
                  yield second + 3;                //next(5) 先执行let second=5;再执行second+ 3；返回8  
                  let 返回值 = yield; //(yield表达式整体)本身没有返回值(所谓返回值其实是由next的传入值)                
                }
                let iterator = createIterator();   //产生iterator //通过next(throw new Errow('error')) 往里抛错
                console.log(iterator.next());      // "{ value: 1, done: false }"          IteratorResult
                console.log(iterator.next(4));     // "{ value: 6, done: false }"
                console.log(iterator.next(5));     // "{ value: 8, done: false }"
                console.log(iterator.next());      // "{ value: undefined, done: true }"  
    9. Promises //Promise 也是基于Promises/A+ 规范而来 
    
/如果dom元素的id名称不和js内置属性或全局变量重名的话，该名称自动成为window对象的属性/

event.target//返回触发事件的元素
event.currentTarget//返回绑定事件的元素

事件委托:
    在父节点统一监听子节点的事件(原理是利用事件冒泡,即子节点的事件会冒泡给父节点去再执行一遍),利用事件回调中判断target.nodeName去分目标处理

阻止 stopImmediatePropagation() 和 stopPropagation()的区别在哪儿呢？
　　后者只会阻止冒泡或者是捕获,而不会阻止该元素的其他事件发生

//不懂就看看:https://zh.javascript.info/bubbling-and-capturing
DOM事件流机制: 
    DOM0级事件:element.onclick()     
    DOM2/3级事件:
        element.addEventListener('事件名', (e)=>{},   是否捕获=false), /参数3是否捕获不写的话,默认是false,是冒泡,子的事件会冒泡给父/
            /浏览器先捕获后冒泡, 说的是如果同时绑定了参数3为true和参数3为false的, 第三个参数为true会先执行/
            第3个参数作用: 规定是在捕获阶段执行,还是在冒泡阶段执行,默认是在冒泡阶段去执行
            假设父子都绑定了click事件:
                捕获:就是捕获它儿子的click,就算是点它的儿子,那也是先执行它的click,再执行儿子的,/也就是第3个参数只作用于儿子/
                对于父绑定了click, 子没有绑定click的,那第三个参数没意义的,因为它就是控制父子监听函数执行循序的
        element.addEventListener('事件名', (e)=>{} ,  {passive:true}) //passive执行默认操作
            /passive: 合成线程会等事件handler看有没有preventDefault, passive:true表示没有,快滚去继续合成新的帧/
    

绑定多个处理函数的执行顺序:
    1.单层级元素:先声明先执行,因为就它自己,没有捕获或冒泡之说
    2.多层级元素,父元素的一个is捕获=true,一个is捕获=false,声明为捕获阶段的先发生,因为先捕获后冒泡
    3.处理或目标阶段, 子元素上被绑定了两个处理函数，一个is捕获=true,一个is捕获=false,参数无效!谁先声明先执行 

严格模式('use strict')
    1.不可增:创设eval作用域/非函数代码块里声明函数
    2.不可删:变量\对象
    3.不可改:只读属性\没有getter的属性\扩展禁止扩展的对象\eval和arguments不能被重新赋值
    4.不可用:未声明就使用\转义字符\使用前缀0表示八进制数\arguments不再追踪参数的变化\禁止this关键字指向全局对象
            \fn.caller顾名思义\arguments.callee指向其函数自身\with语句 \增加了保留字protected、static和interface
    5.不重复:函数参数名\属性名


  
0.1 + 0.2; // = 0.30000000000000004
/JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此.由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。/

18.5%7; // 余数= 4.5

//有三个特殊的非实数值:
    Infinity; //例如1/0的结果
    -Infinity; //例如-1/0的结果
    NaN; //例如0/0的结果,代表'Not a Number'
        typeof NaN === "number"//true
        /NaN 是 JavaScript 之中唯一不等于自身的值!/ ,NaN === NaN //false 

按位运算:
    1 << 2; // = 4
异或符号
    5^2; // 7
    // 5: 00000000000000000000000000000101
    // 2: 00000000000000000000000000000010
    // -----------------------------------
    // 7: 00000000000000000000000000000111

Object.is() 类似 ===     //不同在于: 1. === 将数字值 -0 和 +0 视为相等  2. === 时 Number.NaN 不等于 NaN。

function.length //属性: 返回第一个非可空参数前面的所有参数的数量 如(a,b,c,d=2,e,f) 的length是3

false,null,undefined,NaN,0和""是false; 其他一切都是true    //注意0是false,"0"是true

var a = b = 3;    //等同于    b = 3;    var a = b;
a.x=b=3;          //等同于    a.x=undefined;   b=3; a.x=b;


    
/单个\被当成转义字符，是底层的实现，无法进行查找和替换/
    '123253\2345' //输出:"1232535"
    
    '123253\\2345'//输出"123253\2345"
    '123253\\2345'.replace('\\','1324')//输出"123253 1324 2345"
    

Proxy
      //它的递归是惰性的
      const newObj = new Proxy({}, {   //Proxy 对象用于在如属性查找，赋值，枚举，函数调用时先做一层处理再返回 
        set(target, key, value，receiver) {
            Reflect.get(obj, "x"); // 配合Proxy使用
          if (key === "xxx") { word.innerHTML = value; }
        },});
      newObj.text = 'yyy';//触发setter

Object.defineProperties(obj, { key1:{ set(){},get(){} } })
Object.defineProperty(obj, key, {  get() {},set(){}  })      //也可以做到,默认不可遍历,但可以用getOwnPropertyNames获得

get 对比 defineProperty的区别: 
    /当使用 get 关键字时，属性将被定义在实例的原型上，当使用defineProperty()时，属性将被定义在实例自身上。/
    所以 Object.getOwnPropertyDescriptor(viewer, 'camera')//返回undefined 获取不到
    试试:Object.getOwnPropertyDescriptor(Object.getPrototypeOf(viewer), 'camera')//打印值描述符对象
void <expression> //计算表达式无论计算结果如何都返回undefined 

sourceMappingURL: (.map后缀的文件) 一个存储源代码与编译代码对应位置映射的信息文件：
   // SourceMap 帮助我们在控制台中转换成源码，从而进行 debug
     a.代码压缩混淆后        b. 利用 sass 、typeScript 等其他语言编译成 css 或 JS 后        c. 利用 webpack 等打包工具进行多文件合并后
    Devtools-Sources里的webpack-internal: 和 webpack: 是怎么来的?
        webpack-internal:////是由localhost下的js中末尾的"sourceURL=webpack-internal:///..." 定义的
        webpack:////是由webpack-internal里的js 末尾的"sourceMappingURL"里定义的
        
Data URLs，即前缀为 data: 协议的URL，其允许内容创建者向文档中嵌入小文件。
    //data:[<mediatype>][;base64],<data>
   例如: 
   data:application/json;charset=utf-8;base64,xxxxx //json
   data:image/png;base64,xxxxxx //图片
   background-image: url(data:image/png;base64,xxx);
   
跳转
    window.location.replace("http://www.jb51.net");//不可回退
    window.location.href = "http://www.jb51.net";//可回退

Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写
与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存
    File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
        FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。
```
![C6F35968C7E046ED80E7324398E64BD6](https://github.com/CHENJIAMIAN/Blog/assets/20126997/3a47433d-0a89-4294-8f2f-7f6642d21b8b)



## 事件\异步:
> JS是一门单线程语言，当线程中没有任何同步代码的前提下才会执行异步代码
```javascript
Event Loop事件循环(重要): //用于等待和发送消息和事件的运行机制
    1.'同步任务'
    2.'异步任务'  -> 从'EventTable' 将函数移入主线程的'任务队列'中执行
        事件队列(重要):
            先'微任务'：new Promise()|  2021/03/11 12:18 (监视DOM改动) | process.nextTick(Node)/*微任务中优先*/
                //栈空后:
            UI渲染 //夹在中间执行!!! 
                   //为什么时间切片需要用宏任务，而不是微任务,为了不阻塞渲染嘛
                   //浏览器渲染有个渲染时机的问题，也就是只有必要的时候才进行渲染, 如果没有界面的改变，就不会渲染/
                  //但每次渲染之前都会调用requestAnimationFrame
            后'宏任务'/*MacroTask*/：IO、setTimeout、setInterval、requestAnimation(浏览器) |setImmediate(Node) | MessageChannel的postMessage | /*window.postMessage的回调函数*/
                //1次只取1个出来执行；
        

setTimeout(fn,0)的含义: //只要主线程没事了就立即执行它
    注意!//setTimeout用Int32(最大值是2^31-1)一旦超过了最大值，
        //其效果就跟延时值为0的情况一样，也就是马上执行。
	为了节省资源,如果你设置的超时小于 4，嵌套层数超过 5 的话，这个超时会被强制调整为 4 https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#:~:text=than%204%2C%20then-,set%20timeout%20to%204,-.
for(var i = 1; i <= 3; i++) {
                setTimeout(function() {
                    console.log(i)
                }, 0)
            }
    //4，4, 4 上面这个代码块会打印三个 `4` 出来，而我们预想的结果是打印 1 2 3 
    //之所以会这样，是因为 setTimeout 中的 i 是对外层 i 的引用。当 setTimeout 的代码被解释的时候，运行时只是记录了 i 的引用，而不是值。
    //而当 setTimeout 被触发时，三个 setTimeout 中的 i 同时被取值，由于它们都指向了外层的同一个 i，而那个 i 的值在迭代完成时为 4，所以打印了三次 `4`。
    //var 改成 let，又打印出了1 2 3，为什么呢
    /let变量绑定在该块，不再受外部的影响/, 所以setTimeout里的绑定了值，不再受影响
```

## Promises 异步函数调用
**Promise A+ 速记公式**：状态只变一次，`then` 方法异步执行，成功/失败回调存储等待，链式调用返回新 Promise。
> 异步的发展过程：Callbacks>> Promises>> async/await(ES8)(本质是 Generator 的语法糖)
```javascript
所有的 then() 函数总是会被异步调用, 即使是一个已经变成 resolve 状态的 Promise

2种状态：
    pending（进行中）、fulfilled（已成功）和rejected（已失败）
3种可能：
    resolve()    从pending变为fulfilled
    reject()     从pending变为rejected
        只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
        如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
     
then(执行成功,执行失败)
then(执行成功).catch(执行失败)

.all([promise1, promise2]) //所有都resolved才算resolved，有1个reject就算reject
.race([promise1, promise2]) //找最快的,有1个被resolved或rejected，执行回调  //大家公用一个resolved,rejected
.finally() //肯定要执行的回调，无论promise结果是fulfilled或者是rejected
这避免了同样的语句需要在then()和catch()中各写一次的情况。

Promise.resolve()//返回状态为resolved的promise,直接进入then
    比如 Promise.resolve(42); 可以认为是以下代码的语法糖。
        new Promise(function(resolve){
            resolve(42);
        });

new Promise(function(v1, v2) {//Promise的构造函数的的参数是一个回调函数，这个函数被回调时传入resolve和reject
      if (true){
        v1('success');//回调得到执行才进入then
      } else {
        v2('failure');//回调得到执行才进入then
      }
}).then(function(value) {//resolved状态的回调函数
              // success
            confirm(value)
            return Promise.reject({err1:'err1 happend'}) //如何中止promise? reject Promise即可中止下一个then,直接进入catch
        }, 
        function(error) {//rejected状态的回调函数
              // failure
            confirm(error)        
}).catch(ex => {console.log('ex: ', ex);});

//链式调用例子:
doSomething()
.then(result => doSomethingElse(value)) //result => doSomethingElse(value) 是 result => {return doSomethingElse(value)} 的简写。
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);//.catch 是 .then 第二个参数的简便写法, 是 then(null, failureCallback)的缩略形式

//等同于

/await会阻塞,因此效率更高, 因为它不用像then去记录的上下文信息去用于执行到then时还能有上下文/
/await后面立即执行，下面的语句则放进微任务/
async function foo() {//有多个then时使用,看起来更清晰
  try {
    let result = await doSomething();
    //ECMAScript 2017(es8)标准的 async/await 语法糖, await 操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。   
    let newResult = await doSomethingElse(result);
    let finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
//类似于
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}


为什么说Async本质是 Generator 的语法糖： 
    function* twofiles() {
        yield fs.readFile('hello.txt', 'utf8'),
        yield fs.readFile('goodbye.txt', 'utf8')
    };
    等价于
    async function twofiles() {
        await fs.readFile('hello.txt', 'utf8'),
        await fs.readFile('goodbye.txt', 'utf8')
    }
```


## DOM增删改查
```javascript
//增
dom1.appendChild(dom11)//到后面
insertBefore(dom11,dom1)//到前面
//删
parent.removeChild(parent.children[0]);
//改
p.innerHTML='<span style="color:red">RED</span>';
p.innerText = '2234';
//查
document.getElementById("tt").checked  //CheckBox是否被选中:  
document.querySelector('#q1');// 通过querySelector获取ID为q1的节点：
document.querySelectorAll('div.highlighted > p');// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
dom.style.color = '#ff0000';
```


## 模块
```javascript
//-> 无模块化<script src="jquery.js"/>  
1-> CommonJS规范   
    1、导⼊：require('路径')
    2、导出：module.exports和exports    
    /module.exports的exports必须是带"s"的!!!!/  
2.1-> AMD异步模块定义 //依赖前置
    1、导⼊：require(['模块名称'], function ('模块变量引⽤'){// 代码});//require(数组,回调)
    2、导出：define(function (){return '值');//AMD把整个模块包裹在define函数中  
    //浏览器需要RequireJS库(AMD的实现)来支持AMD
2.2-> CMD(优化AMD)  
    1、导⼊：define(function(require, exports, module) {});
    2、导出：define(function (){return '值');
    //SeaJS是CMD的实现
3-> UMD：通用模块定义 (兼容AMD和CommonJS)
4-> ES6模块化    export default 是静态引入

//ES6前用闭包实现模块化:
var module1 = (function () {　var _count = 0;　var m1 = function () {};　var m2 = function () {};　
                              return {　　m1 : m1,　　m2 : m2　};})();  //调用module1.m1,module1.m2
                              
es6支持:	require / export / import
node支持:	require /module.exports 等价 exports
        export、import//在一个文件或模块中可以有多个
        export default//在一个文件或模块中仅有一个
            //本质上，a.js文件的export default输出一个叫做default的变量，然后系统允许你为它取任意名字。所以可以为import的模块起任何变量名，且不需要用大括号包含
                import any from "./a.js"
                import any12 from "./a.js" 
```


## IIFE立即执行函数
```javascript
//"立即执行匿名" functions",它可以防止临时变量泄漏到全局变量中范围.
(function (){    var temporary = 5; window.permanent = 10;
    //我们可以通过分配"全局对象"来访问全局范围    //在Web浏览器中始终是`window`.全局对象可能有一个    //在非浏览器环境中使用不同的名称,例如Node.js.    
})();
temporary; // 引发 ReferenceError
permanent; // = 10

function () {}; 		         //属于函数表达式，funcion名.name='' 或 'anonymous'
var fnName=function(){}();	                  //函数表达式，可以在后面加括号，并立即执行函数的代码
function fnName(){} ();		          //不会报错，但是javascript引擎只解析函数声明，忽略后面的括号，函数声明不会被调用
function(){}()			          //javascript引擎将开头的function关键字当做函数声明，报错：要求需要一个函数名,
( function(){}() );		                  //把它放括号里, 表示 函数立即调用表达式
//在Javascript里，圆括号不能包含声明，所以如果声明被圆括号包括，那它就会被解析为表达式，从而被逐行解析
(function(){}) 	();	              	 //（）告诉javascript引擎这是一个函数表达式，不是函数声明，可以立即解析函数里的代码
 (function(参数){}) 	(参数内容);
    eg: (function(后面括号里的对象){console.log(后面括号里的对象.内容)})({'内容':'//后面括号里的对象的内容//'}) 
    //输出: "//后面括号里的对象的内容//"
```

## 3种方法确定值类型
```javascript
typeof
    typeof new Date//    "object"
    typeof  Date//    "function"
instanceof
    Date instanceof Function//    true
    new Date instanceof Function//    Date函数返回一个对象,false
Object.prototype.toString方法 
    toString.call(new Date); // [object Date]
```

## prototype（可以被继承的东西）
```javascript
//原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享
Object.prototype //prototype 原型属性使您有能力向对象添加可以被继承的属性和方法
//prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数
//constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的
Object.assign(S.prototype, M2.prototype);// S的继承链上加入 M2 Object.assign(target, ...sources)

Object.prototye==null 		//true 原型的终点的null
o.b=2				//如果原型上也有一个'b'属性,它不会被访问到.这种情况称为"属性遮蔽
o.__proto__.b=3			//上一级原型的b
o.c=4 				//如果该对象没有,那js会一直摸下去上一级原型直到原型的终点null


绕来绕去的原型:
    1. ƒ () { [native code] } 
        Function.prototype
        Function.__proto__
        Object.__proto__        
        // ƒ () { [native code] } 将其存储为temp
    2. {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}    
        Object.prototype
        temp.__proto__

    3.null
        Object.prototype.__proto__
```


```javascript
//继承:
var p1= {name:1}	
var p = Object.create(p1);	//返回继承p1的空对象{}, 它的原型 p.__proto__ 是p1 //true
var p = Object.create(Object.prototype); 等同于 {} 等同于 new Object() //p是一个继承自 o 的空对象, p.__proto__ === o//true
```

## this
```javascript
规则：不论它们出现在哪里，它们总是将 global 对象作为其函数体中 this 关键字的默认值。
    //this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象
    //如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例

5种 this 分类: //默显隐new箭头
    1.默认绑定(2345没法解释的,如自执行,闭包) window
    2.隐式绑定(谁调用谁是this)
        obj.foo();         是通过obj找到foo，所以就是在obj环境执行。
        var foo = obj.foo; 变量foo就直接指向函数本身，所以foo()就变成在全局环境执行(称绑定丢失)
        回调函数如setTimeout也是在全局环境执行(称绑定丢失)
    3.显式绑定(call apply)      
        硬绑定(解决绑定丢失): //bind(绑定后无法修改!) //绑定到undefined默认指向Window，严格模式下才是 undefined
        软绑定(绑定后可改): //通过修改bind方法的实现, 判断this为全局对象(即绑定丢失)的话就就改为要绑定的, 否则不变
    4.new(绑定到实例上)      
        function create() {//new的实现
        	// 创建一个空的对象
            var obj = new Object(),
        	// 获得构造函数，arguments中去除第一个参数
            Con = [].shift.call(arguments); //create(Person, ...)   ,参数中第一个就是构造函数
        	// 链接到原型，obj 可以访问到构造函数原型中的属性
            obj.__proto__ = Con.prototype;
        	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
            var ret = Con.apply(obj, arguments);
        	// 优先返回构造函数返回的对象
            return ret instanceof Object ? ret : obj;//new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
        };    
        var person = new Person(...)       // 使用内置函数new     
        var person = create(Person, ...)   // 使用手写的new，即create
    5.箭头函数
        箭头函数不绑定this，箭头函数中的this相当于普通变量。
        正常在自己的[[scope]]找到this, 它没有自己的[[scope]](作用域), 一级一级往上级的[[scope]]找 
        /箭头函数this 是最近能找到的this/ 
        {  a:1,/*对象没有this*/, fun1:function(){/*函数才有this*/}}
        箭头函数的绑定直接无法被修改,'无法通过apply bind等修改的!!!!'(但是可修改它爸啊)
            var age = 18;
            const Person = {
                age: 20,  
                run() {   return function() {     debugger;  console.log(this.age);  } },
                sleep() { return ()=>{debugger; console.log(this.age);};  }
            }
            Person.run()();
            Person.sleep()();


//call、apply、bind这三个方法来切换/固定this的指向:
        var func = function(s){
            return this.myString + s;
        };
    1.func.call(this,"参数1","参数2"...); 
        //call 方法还能让一个不拥有某个方法的对象，去借用其他对象的方法来调用
        const obj = {}
        [].push.call(obj, 1)//obj是没有push方法的, obj借用数组的push方法!!!! obj.push(1)
        
    2.func.apply(this,["参数1","参数2"..]); //apply支持多个参数(区别), 第二个参数传入的是数组!!!!!!!
        //apply 方法也可以让一个不拥有某个方法的对象，去借用其他对象的方法来调用
        const obj = {}
        [].push.apply(obj, [1,2])//obj是没有push方法的, obj借用数组的push方法!!!! obj.push(1,2)
        
    3.var funcWithThis = func.bind(this);//返回绑定this的函数 , 可以返回固定某些指定的参数的函数(柯里化)
        //`bind`也可用于部分应用(curry)柯里化函数, 生成另一个固定了一个参数该函数.
        var product = function(a,b){return a * b; };
        var doubler = product.bind(this,2);
        doubler(9)//18
        

怎么理解 const toStr = Function.prototype.call.bind(Object.prototype.toString); ？
    toStr("")'[object String]'
    toStr("123324")'[object String]'
    toStr(4123)'[object Number]'
    借用Function的call来调用toString， 也就是toString.call()
    简化为: const toStr =call.bind(toString)
    toStr(123) 等同于 toString.call(123) 等同于 toString(123)
```

## 垃圾回收(标记:从root可达)
```javascript
//之前是[引用计数]
//现在主流浏览器的垃圾回收算法是[标记清除],从Root（全局对象）开始寻找这个对象的引用是否可达，如window.foo.scope, 如果引用链断裂，那么这个对象就会回收。
```


## for...of(遍历实现Iterator接口的可枚举对象的值)
> 取代for...in(遍历属性名)
```javascript
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

'for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键'
for (let i in iterable) {//打印索引, /中括号可解构键名/
    console.log('->', i); //  0, 1, 2, "foo", "arrCustom", "objCustom" 原型链上所有属性
    if (iterable.hasOwnProperty(i)) {//仅自身的属性
        console.log(i); //  0, 1, 2, "foo" 
    }
}

for (let i of iterable) {//打印内容
  console.log(i); //  3, 5, 7
}
/for..in 和 object.keys 的区别是for..in会获取原型链上的属性/
for (let key of iterable.keys()) {//通过获取index,打印内容
  console.log(iterable[key]); //  3, 5, 7
}
```

## var let const
```javascript
函数提升优先级>变量提升, 同名会覆盖掉
var		无论声明在何处，都会被视为声明在函数的最顶部, 这就是函数变量提升(提性能|高容错)
            //与全局作用域一样，函数作用域内部也会产生“变量提升”现象，提升到函数体的头部            
            {var y =2;} 相当于var y; {y =2;},这时在块外打印y自然为undefined
            
let		作用于当前代码块【块级作用域】
    //使用 var 关键字重新声明变量可能会带来问题。在块中重新声明变量也会重新声明块外的变量：
    //let 关键字就可以解决这个问题，因为它只在 let 命令所在的代码块 {} 内有效。
    var a='a'
    {let a=1}        //a:"a"
    {var a=1}        //a: 1

const 	常量是【块级作用域】，很像使用 let 语句定义的变量。
           常量的值不能通过重新赋值来改变，并且不能重新声明。.必须初始化
```

## null 和 undefined区别

```javascript
undefined 表示尚未初始化的变量的值(转为数值时为0；)，
null表示故意不存在对象(转为数值时为NaN)
typeof undefined; // => 'undefined'
typeof null;      // => 'object'
```



## 数组
```javascript
Array.from([1, 2, 3], x => 2*x) //[2, 4, 6]

Array.of //方法用于将一组值，转换为数组。

       
var myArray0 = [32,false,"js",12,56,90,50,60];
myArray0.join(";")//用分号打印数组的所有元素 ="32; false; js; 12; 56; 90"    

myArray0.slice(1,4); // (index>=1)且(index<4)的被截取[false, "js", 12], 原数组不会改变        
myArray0.splice(2,4, "hi", "wr", "ld"); //(index>=2)删除4个, 并插入"hi","wr"和"ld", 返回[32, false, "hi", "wr", "ld", 50, 60]  
    

排序
    var numbers = [4, 2, 5, 1, 3]; 
    numbers.sort((a, b) => a - b); 
    console.log(numbers);
        Array.sort(compareFunction)
        如果 compareFunction(a, b) < 0 ，a排前面
    如果 compareFunction(a, b) = 0 ，位置不变
    
复制 
    1 const a2 = a1.concat(); //concat不影响原数组
    2 const a2 = [...a1]; 或 const [...a2] = a1;
    
合并
    arr1.concat(arr2); 或 [...arr1, ...arr2]; 
    
数组复制换位// 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4) //// [4, 2, 3, 4, 5]
    
【对象数组】去重    
    var arrayToClearRepeat=[{key:value,..},{key:value,..}.......];
    var hash = {};
    arrayToClearRepeat.reduce(
            (accumulator, currentValue, currentIndex, array) => {//reduce()类似 map() ,但它是累加的
                if (!hash[currentValue.key]) {
                  hash[currentValue.key] = true
                  accumulator.push(currentValue)
                }
                return accumulator
            },  
    初始accumulator值)//如果没有初始值,若不传则默认数组的第一个值


every() //是否每个都是

创建空数组:
    Array.from({length:12})
      
删除
    let index=arr.findIndex(item => item.id === 8);
    index!==-1 && arr.splice(index, 1)
    
筛选：
    1 筛选符合条件的所有:
        arr.filter((e)=>{return e.properties.CID===1})
    2 筛选符合条件的第一个:
        [1, 4, -5, 10].find((n) => n < 0)// -5

改:
    arr.map(callback(currentValue, index, array), this)
```
### Symbol
```js
toStringTag
	class MyExample {
	  get [Symbol.toStringTag]() {
	    return 'MyExample';
	  }
	}
	
	const example = new MyExample();
	console.log(example.toString()); // 输出: "[object MyExample]"
	

私有数据
	const privateData = Symbol('private');
	
	const obj = {
	  [privateData]: "这是私有数据"
	};
	
	console.log(obj[privateData]); // 输出: "这是私有数据"


asyncIterator
	const asyncIterable = {
	  async *[Symbol.asyncIterator]() {
	    yield 1;
	    yield 2;
	    yield 3;
	  }
	};
	
	(async () => {
	  for await (const value of asyncIterable) {
	    console.log(value); // 输出: 1, 2, 3
	  }
	})();


species//用于创建衍生对象时确定构造函数
	class MyArray extends Array {
	  static get [Symbol.species]() { return Array; }
	}
	
	const a = new MyArray(1, 2, 3);
	const mapped = a.map(x => x * x);
	
	console.log(mapped instanceof MyArray); // false
	console.log(mapped instanceof Array); // true
	

toPrimitive//自定义对象的原始值转换逻辑。当对象需要被转换为原始类型（如字符串、数字或布尔值）时，如果对象有这个属性方法，则会调用它
	const obj = {
	  [Symbol.toPrimitive](hint) {
	    if (hint === 'number') {
	      return 42;
	    }
	    if (hint === 'string') {
	      return "hello";
	    }
	    return true;
	  }
	};
	
	console.log(+obj);  // 输出: 42
	console.log(`${obj}`);  // 输出: "hello"
	console.log(obj > 20);  // 输出: true
```
## 奇淫技巧

```js
const func = ()=>{ console.log(1)}
debug(func)//注入断点
func()//触发断点

monitor(func)//当函数被调用时打印提醒

monitorEvents(window, "resize");//注入打印e事件语句

查询对象的所有实例!!!!
queryObjects(Function)
	temp1.filter(item => { return item[Symbol.toStringTag] === 'GeneratorFunction' }); 
	temp1.filter(item => { return item[Symbol.toStringTag] === 'AsyncFunction' });

queryObjects(Object) 
	temp1.filter(a=>a.__esModule)
	---
	//筛选出非Cesium对象
	keyskeys = keys(Cesium);
	temp1.filter(i=>!keyskeys.includes(i.constructor.name));
```
#### 获取打印整个对象,不管它多大(解除循环引用限制)
```js
const cache = new Set();

function safeStringify(key, value) {
  if (typeof value === "object" && value !== null) {
    if (cache.has(value)) {
      // 移除循环引用
      return;
    }
    cache.add(value);

    if (
      key === "_typedArray" ||
      key === "_shaders" ||
      key === "_vertexShaderSource" ||
      key === "sources" ||
      key === "keyword" ||
      key === "_vertexShaderText" ||
      key === "_fragmentShaderText" ||
      key === "_shadersByTexturesFlags" ||
      key === "vertices" ||
      key === "_html" ||
      key === "_owner" ||
      key === "_us" ||
      key === "primitive" ||
      key === "primitives"
    ) {
      return; // remove unwanted keys
    }

    return value;
  }
}
try {
  JSON.stringify(temp1.scene.root, safeStringify);
} catch (e) {
  // 如果JSON.stringify失败了，这里捕获异常
  debugger;
}

```
