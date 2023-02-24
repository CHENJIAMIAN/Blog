## _regeneratorRuntime
`_regeneratorRuntime` 是一个运行时库（Runtime Library），它是为了支持 JavaScript 中的 Generator 和 Async/Await 而产生的。在旧版的浏览器或者 Node.js 环境下，这些语法无法被原生支持，需要使用这个运行时库来进行转译和支持。

在代码中， `_regeneratorRuntime` 实际上是一个全局变量，用于存放该运行时库的实现代码，因此在使用 Generator 和 Async/Await 时，会通过调用这个全局变量来执行相关代码。

在一些项目中，如果需要使用 Generator 或 Async/Await，可以通过引入相关的 Polyfill 或 Babel 插件来进行转译和支持，这样就不需要手动引入 `_regeneratorRuntime` 了。

## _regeneratorRuntime用法举例
下面是一个使用 `_regeneratorRuntime` 的示例：

```javascript
// 引入 runtime 库
var _regeneratorRuntime = require("babel-runtime/regenerator").default;

// 使用 async/await 函数
async function myAsyncFunction() {
  try {
    var result1 = await somePromise();
    var result2 = await anotherPromise(result1);
    return result2;
  } catch (error) {
    console.log(error);
  }
}

// 将 async 函数转换成普通函数
var myAsyncFunctionGen = _regeneratorRuntime.mark(function _callee() {
  var result1, result2, error;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return somePromise();

        case 3:
          result1 = _context.sent;
          _context.next = 6;
          return anotherPromise(result1);

        case 6:
          result2 = _context.sent;
          return _context.abrupt("return", result2);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          error = _context.t0;
          console.log(error);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 10]]);
});

// 执行普通函数
var myAsyncFunctionGenResult = myAsyncFunctionGen();
myAsyncFunctionGenResult.next().value.then(function (result1) {
  myAsyncFunctionGenResult.next(result1).value.then(function (result2) {
    console.log(result2);
  });
});

```

在上面的示例中，我们定义了一个 async 函数 `myAsyncFunction`，它使用了两个 `await` 关键字来等待两个 Promise 的返回值。然后，我们使用 `_regeneratorRuntime` 来将这个 async 函数转换成了普通的 generator 函数 `myAsyncFunctionGen`。

在转换后的代码中，我们可以看到，在 generator 函数中使用了 `_context.next` 和 `_context.sent` 来模拟 async/await 语法。然后，我们使用 `myAsyncFunctionGen()` 来执行这个普通函数，并使用 `myAsyncFunctionGenResult.next().value` 来获取它的第一个 yield 值，即 `somePromise()` 函数的返回值。接着，我们再调用 `myAsyncFunctionGenResult.next(result1).value` 来获取下一个 yield 值，即 `anotherPromise(result1)` 函数的返回值，并打印出来。

这样，我们就成功地使用 `_regeneratorRuntime` 来将 async/await 函数转换成了普通函数，从而在旧版的浏览器或者 Node.js 环境下也能够支持这些语法了。

## 浏览器上的window对象上key为0，或1，或2的对象是怎么来的

在浏览器中，窗口对象（window对象）的属性可以是任何有效的JavaScript标识符，包括数字。

如果在浏览器中打开一个新的窗口并访问它的window对象，你可能会注意到一些属性名为数字，例如window[0]，window[1]和window[2]。这些属性通常表示窗口中打开的文档，比如通过window.open()方法打开的新文档。

具体来说，当在窗口中打开一个新的文档时，浏览器会将其保存在窗口对象的frames数组中，并将其分配一个数字索引。因此，window[0]表示窗口中第一个打开的文档，window[1]表示第二个打开的文档，以此类推。这些属性通常用于访问窗口中打开的其他文档的window对象。

需要注意的是，虽然在某些情况下可以使用数字作为属性名来访问窗口对象的属性，但这种做法并不是标准的JavaScript语法，不应该在生产环境中使用。正确的做法是使用正常的JavaScript属性访问语法，例如window.frames[0]来访问窗口中的文档。

## UMD打包（bundle)后解析：
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

## UMD打包（bundle)后解析2：

``` js
function(e) {
    "function" == typeof define && define.amd ? define([], (function() {
        return TWEEN
    }
    )) : "undefined" != typeof module && "object" == typeof exports ? module.exports = TWEEN : void 0 !== e && (e.TWEEN = TWEEN)
}(this)

/*
这段代码是一个自执行函数，用于将 TWEEN 对象导出为一个模块。它使用了 UMD（Universal Module Definition）规范，该规范允许将模块同时用于浏览器和 Node.js 等环境。

在这个例子中，代码首先检查是否存在 define 函数，如果存在，则将 TWEEN 对象作为一个 AMD 模块导出，该模块不依赖其他模块。如果不存在 define 函数，则继续检查是否存在 module 和 exports 对象，如果存在，则将 TWEEN 对象作为一个 CommonJS 模块导出。最后，如果 define 函数和 module 和 exports 对象都不存在，则将 TWEEN 对象暴露到全局作用域中，使其可以在浏览器中使用。

需要注意的是，这段代码的目的是将 TWEEN 对象导出为一个模块，以便其他模块或应用程序可以使用它。导出模块的方式可以有多种，UMD 只是其中一种。
*/
```
