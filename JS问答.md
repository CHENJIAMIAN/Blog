## 浏览器上的window对象上key为0，或1，或2的对象是怎么来的

在浏览器中，窗口对象（window对象）的属性可以是任何有效的JavaScript标识符，包括数字。

如果在浏览器中打开一个新的窗口并访问它的window对象，你可能会注意到一些属性名为数字，例如window[0]，window[1]和window[2]。这些属性通常表示窗口中打开的文档，比如通过window.open()方法打开的新文档。

具体来说，当在窗口中打开一个新的文档时，浏览器会将其保存在窗口对象的frames数组中，并将其分配一个数字索引。因此，window[0]表示窗口中第一个打开的文档，window[1]表示第二个打开的文档，以此类推。这些属性通常用于访问窗口中打开的其他文档的window对象。

需要注意的是，虽然在某些情况下可以使用数字作为属性名来访问窗口对象的属性，但这种做法并不是标准的JavaScript语法，不应该在生产环境中使用。正确的做法是使用正常的JavaScript属性访问语法，例如window.frames[0]来访问窗口中的文档。

## AMD打包（bundle)后解析：
``` js
/*
这是一个使用立即执行函数表达式（Immediately Invoked Function Expression, IIFE）来定义模块的常见方式，用于将一个模块的代码封装在一个私有作用域中，并将其暴露为一个公共的接口。
这个例子中，函数接受两个参数，第一个参数是一个对象，用于暴露模块的公共接口，第二个参数是一个回调函数，用于定义模块的实现代码。具体来说，它做了以下几件事情：
检测当前代码运行环境，如果运行环境是CommonJS（例如Node.js）或者ES6模块，就将模块的接口对象作为参数传递给回调函数并执行，从而在该环境中导出模块接口；否则，继续执行下一步。
检测当前代码是否在AMD环境下（例如RequireJS），如果是，则使用AMD规范导出模块接口；否则，继续执行下一步。
如果当前代码在浏览器环境下，将模块接口对象作为全局变量的一个属性，并将其导出为全局变量。
*/
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).THRxxxxEE = {})
}(this, (function(THRxxxxEE) {
    THRxxxxEE.AAA=111; //通常会在回调函数中定义许多私有变量和方法，并将需要暴露的方法和属性添加到模块接口对象中，以实现模块的功能。
}
))
// true
window.THRxxxxEE
// {AAA: 111}
```
