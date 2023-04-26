# Coding Guide 

CesiumJS 是世界上最大的 JavaScript 代码库之一。从一开始，我们就一直保持着代码质量的高标准，这使得代码库对于新老贡献者来说都更容易使用。我们希望您发现代码库干净且一致。

除了描述典型的编码约定外，本指南还涵盖了设计、可维护性和性能方面的最佳实践。它是许多开发人员经过多年的生产开发、研究和实验后积累的建议。

本指南适用于 CesiumJS 和用 JavaScript 编写的 Cesium 生态系统的所有部分。

:art: 调色板图标表示设计提示。

:house: 房子图标表示可维护性提示。当然，整个指南都是关于编写可维护代码的。

:speedboat: 快艇表示性能提示。

在某种程度上，本指南可以概括为_使新代码与现有代码相似_。

- [编码指南](#coding-guide) 
  - [命名](#naming) 
  - [格式化](#formatting) 
  - [Linting](#linting) 
  - [单位](#units) 
  - [基本代码构造]( #basic-code-construction) 
  - [函数](#functions) 
    - [`options` 参数](#options-parameters) 
    - [默认参数值](#default-parameter-values) 
    - [抛出异常](#throwing -例外）
    - [`result` 参数和临时变量](#result-parameters-and-scratch-variables) 
  - [类](#classes) 
    - [构造函数](#constructor-functions) 
    - [`from` 构造函数](# from-constructors) 
    - [`to` 函数](#to-functions) 
    - [对基础类谨慎使用原型函数](#use-prototype-functions-for-fundamental-classes-sparingly) 
    - [静态常量](# static-constants) 
    - [Private Functions](#private-functions) 
    - [Property Getter/Setters](#property-gettersetters) 
    - [Shadowed Property](#shadowed-property) 
    - [将构造函数放在文件](#put-the-constructor-function-at-the-top-of-the-file)
  - [设计](#design) 
    - [弃用和重大更改](#deprecation-and-breaking-changes) 
  - [第三方库](#third-party-libraries) 
  - [小部件](#widgets) 
    - [ Knockout 订阅](#knockout-subscriptions) 
  - [GLSL](#glsl) 
    - [命名](#naming-1) 
    - [格式](#formatting-1) 
    - [性能](#performance) 
  - [资源]( #resources) 

## Naming 

- 目录名称为 `PascalCase`，例如 `Source/Scene`。
- 构造函数是`PascalCase`，例如`Cartesian3`。
- 函数是 `camelCase`，例如，`defaultValue()`、`Cartesian3.equalsEpsilon()`。
- 文件以 `.js` 结尾并与 JavaScript 标识符同名，例如，`Cartesian3.js` 和 `defaultValue.js`。
- 变量，包括类属性，是 `camelCase`，例如，

```javascript 
this.minimumPixelSize = 1.0; // 类属性

const bufferViews = gltf.bufferViews; // 局部变量
``` 

- 私有（按照惯例）成员以下划线开头，例如，

```javascript 
this._canvas = canvas; 
``` 

- 常量为带下划线的大写字母，例如，

```javascript 
Cartesian3.UNIT_X = Object.freeze(new Cartesian3(1.0, 0.0, 0.0)); 
```

- 避免在公共标识符中使用缩写，除非全名过于繁琐并且具有广泛接受的缩写，例如，

```javascript 
Cartesian3.maximumComponent(); // 不是 Cartesian3.maxComponent() 

Ellipsoid.WGS84; // 不是 Ellipsoid.WORLD_GEODETIC_SYSTEM_1984 
``` 

- 首选局部变量的简短描述性名称，例如，如果一个函数只有一个长度变量，

```javascript 
const primitivesLength = primitives.length; 
```

最好写成

```javascript 
const length = primitives.length; 
``` 

- 在闭包中访问外部作用域的 `this` 时，将变量命名为 `that`，例如，

```javascript 
const that = this;
this._showTouch = createCommand(function () { 
  that._touch = true; 
}); 
```

下面介绍了更多命名约定及其设计模式，例如，[`options` 参数](#options-parameters)、[`result` 参数和临时变量](#result-parameters-and-scratch -variables) 和 [`from` 构造函数](#from-constructors)。

## 格式化

- 我们使用 [prettier](https://prettier.io/) 在提交时自动重新格式化所有 JS 代码，因此所有工作都已为您完成。提交时代码会自动重新格式化。
- 对于 HTML 代码，保持现有样式。使用双引号。
- 文本文件，以换行符结尾以最小化差异中的噪音。

## 林林

对于语法和样式指南，我们使用 ESLint 推荐的设置（规则列表可以在[此处](http://eslint.org/docs/rules/) 找到）作为基础，并通过共享的附加规则对其进行扩展配置节点模块，[eslint-config-cesium](https://www.npmjs.com/package/eslint-config-cesium)。该包作为 Cesium 存储库的一部分进行维护，并在整个 Cesium 生态系统中使用。有关已启用规则的列表，请查看 [index.js](https://github.com/CesiumGS/cesium/blob/main/Tools/eslint-config-cesium/index.js)、[browser.js ](https://github.com/CesiumGS/eslint-config-cesium/blob/main/browser.js) 和 [node.js](https://github.com/CesiumGS/eslint-config-cesium/ blob/main/node.js）。

**一般规则：** 

- [block-scoped-var](http://eslint.org/docs/rules/block-scoped-var)
- [无警报](http://eslint.org/docs/rules/no-alert) 
- [无浮动小数](http://eslint.org/docs/rules/no-floating-decimal) 
- [no-implicit-globals](http://eslint.org/docs/rules/no-implicit-globals) 
- [no-loop-func](http://eslint.org/docs/rules/no- loop-func) 
- [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define) 以防止在定义变量和函数之前使用它们。
- [no-else-return](http://eslint.org/docs/rules/no-else-return) 
- [no-undef-init](http://eslint.org/docs/rules/no- undef-init) 
- [无序列](http://eslint.org/docs/rules/no-sequences) 
- [无未使用的表达式](http://eslint.org/docs/rules/no-未使用的表达式）
- [无尾随空格](http://eslint.org/docs/rules/no-trailing-spaces) 
- [no-lonely-if](http://eslint.org/docs/rules/no- lonely-if) 
- [quotes](http://eslint.org/docs/rules/quotes) 强制使用单引号
- [no-sequences](http://eslint.org/docs/rules/no- sequences) 
- [no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions) 

**节点特定规则：** 

- [global-require](http://eslint .org/docs/rules/global-require) 
- [no-buffer-constructor](http://eslint.org/docs/rules/no-buffer-constructor) 
- [no-new-require](http:/ /eslint.org/docs/rules/no-new-require) 

**[使用内联注释禁用规则](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments )**

- 当为一行禁用 linting 时，使用 `//eslint-disable-next-line`: 

```js 
function exit(warningMessage) { 
  //eslint-disable-next-line no-alert 
  window.alert("Cannot exit : " + 警告消息); 
` 
`` 

- 当禁用代码块的 linting 时，将 `eslint-disable` 注释放在新行上并尽可能靠近相关代码：``` 

js 
/*eslint-disable no-empty*/ 
try { 
  lineNumber = parseInt(stack.substring(lineStart + 1, lineEnd1), 10); 
} catch (ex) {} 
/*eslint-enable no-empty*/ 
``` 

## 单位

- Cesium 使用 SI 单位：
  - 米表示距离，
  - 弧度表示角度，以及
  - 持续时间的秒数。
- 如果一个函数的参数有一个非标准单位，比如度，把单位放在函数名里，例如，``` 

javascript 
Cartesian3.fromDegrees = function ( 
  longitude, 
  latitude, 
  height, 
  ellipsoid, 
  result 
) { 
  / * ... * / 
}; 
``` 

## 基本代码构造

- Cesium 使用 JavaScript 的 [严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) 所以每个模块（文件）包含

`` `javascript 
“使用严格”；

``` 

- :speedboat: 为避免类型强制转换（隐式类型转换），使用 `===` 和 `!==` 测试相等性，例如，

```javascript 
const i = 1; 

if (i === 1) { 
  // ... 
} 

if (i !== 1) { 
  // ... 
} 
``` 

- 为了帮助人类阅读，将 `.0` 附加到旨在是浮点值，例如，除非 f 是整数，否则

javascript 
const f = 1; 
```

最好写成

```javascript 
const f = 1.0; 
``` 

- 在第一次使用的地方声明变量。例如，

```javascript 
let i; 
让米; 
const 模型 = [ 
  /* ... */ 
]; 
const length = models.length; 
对于 (i = 0; i < length; ++i) { 
  m = models[i];
  // 使用 m 
} 
```

最好写成

```javascript 
const models = [ 
  /* ... */ 
]; 
const length = models.length; 
for (let i = 0; i < length; ++i) { 
  const m = models[i]; 
  // 使用 m 
} 
``` 

- `let` 和 `const` 变量具有块级作用域。不要依赖变量提升，即在变量声明之前使用它，例如，

```javascript 
console.log(i); // 我在这里是未定义的。永远不要在变量声明之前使用它。
让我= 0.0; 
``` 

- 当值未更新时，首选 `const` 变量。这确保了不变性。

- :speedboat: 避免冗余的嵌套属性访问。这个

```javascript 
scene.environmentState.isSkyAtmosphereVisible = true; 
scene.environmentState.isSunVisible = true; 
scene.environmentState.isMoonVisible = false; 
```

最好写成

```javascript 
const environmentState = scene.environmentState; 
environmentState.isSkyAtmosphereVisible = true; 
environmentState.isSunVisible = true; 
environmentState.isMoonVisible = false; 
``` 

- 不要创建只使用一次的局部变量，除非它显着提高可读性，例如，

```javascript 
function radiiEquals(left, right) { 
  const leftRadius = left.radius;
  const rightRadius = right.radius; 
  返回左半径 === 右半径；
} 
```

最好写成

```javascript 
function radiiEquals(left, right) { 
  return left.radius === right.radius; 
} 
``` 

- 使用 `undefined` 而不是 `null`。
- 测试变量是否使用 Cesium 的 `defined` 函数定义，例如，

```javascript 
const v = undefined; 
if (defined(v)) { 
  // 假
} 

const u = {}; 
if (defined(u)) { 
  // True 
} 
``` 

- 使用 `Object.freeze` 函数创建枚举，例如，

```javascript 

    const ModelAnimationState = {
        停止：0，
        动画：1 
    }；

    返回 Object.freeze(ModelAnimationState); 
}); 
``` 

- 对不明显的代码使用描述性注释，例如，

```javascript 
byteOffset += sizeOfUint32; // 将 4 添加到 byteOffset 
```

最好写成

```javascript 
byteOffset += sizeOfUint32; // 跳过长度字段
``` 

- 在代码合并到 main 之前需要删除或解决 `TODO` 注释。谨慎使用“PERFORMANCE_IDEA”，稍后在分析时会派上用场。
- 在合并到 main 之前删除注释掉的代码。
- 现代语言功能可能会提供方便的快捷方式和更简洁的语法，但在使用它们时应考虑到它们对性能的影响，尤其是在每帧调用的代码中。

## 函数

- :art: 函数应该是**内聚的**；他们应该只做一项任务。
- 函数中的语句应该处于相似的抽象级别。如果一个代码块比其余的语句低得多，那么移至辅助函数是一个很好的选择，例如，

```javascript 
Cesium3DTileset.prototype.update = function (frameState) { 
  const tiles = this._processingQueue ; 
  const length = tiles.length; 

  for (let i = length - 1; i >= 0; --i) { 
    tiles[i].process(this, frameState); 
  }

  选择瓷砖（这个，框架状态）；
  updateTiles（这个，frameState）；
}; 
```

最好写成

```javascript 
Cesium3DTileset.prototype.update = function (frameState) { 
  processTiles(this, frameState); 
  选择瓷砖（这个，框架状态）；
  updateTiles（这个，frameState）；
}; 

function processTiles(tileset, frameState) { 
  const tiles = tileset._processingQueue; 
  const length = tiles.length; 

  for (let i = length - 1; i >= 0; --i) { 
    tiles[i].process(tileset, frameState); 
  } 
} 
``` 

- 不要在函数末尾使用不必要的 `else` 块，例如，

```javascript
function getTransform(node) { 
  if (defined(node.matrix)) { 
    return Matrix4.fromArray(node.matrix); 
  } else { 
    return Matrix4.fromTranslationQuaternionRotationScale( 
      node.translation, 
      node.rotation, 
      node.scale 
    ); 
  } 
} 
```

最好写成

```javascript 
function getTransform(node) { 
  if (defined(node.matrix)) { 
    return Matrix4.fromArray(node.matrix); 
  } 

  return Matrix4.fromTranslationQuaternionRotationScale( 
    node.translation, 
    node.rotation, 
    node.scale 
  ); 
` 
``

- :speedboat: 较小的函数更有可能被 JavaScript 引擎优化。对于可能成为热点的代码，请考虑这一点。

### `options` 参数

:art: 许多 Cesium 函数采用 `options` 参数来支持可选参数、自文档代码和向前兼容性。例如，考虑：

```javascript 
const sphere = new SphereGeometry(10.0, 32, 16, VertexFormat.POSITION_ONLY); 
```

不清楚数值代表什么，调用者需要知道参数的顺序。如果这需要一个“选项”参数，它看起来像这样：

```javascript 
const sphere = new SphereGeometry({ 
  radius: 10.0, 
  stackPartitions: 32, 
  slicePartitions: 16,
  vertexFormat: VertexFormat.POSITION_ONLY, 
}); 
``` 

- :speedboat: 使用 `{ /* ... */ }` 创建一个对象字面量，这是一个内存分配。如果函数可能成为热点，请避免设计使用“选项”参数的函数；否则，调用者将不得不使用临时变量（参见 [下文](#result-parameters-and-scratch-variables)）来提高性能。非数学类的构造函数是“选项”参数的良好候选者，因为 Cesium 避免在热点中构造对象。例如，

```javascript 
const p = new Cartesian3({ 
  x: 1.0, 
  y: 2.0, 
  z: 3.0, 
}); 
```

对于 `Cartesian3` 构造函数来说是一个糟糕的设计，因为它的性能不如

```javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
``` 

### 默认参数值

如果函数参数或类属性存在_合理_默认值，则不需要用户提供它。使用 Cesium 的 defaultValue 来分配一个默认值。例如，在 Cartesian3.fromRadians 中，height 默认为零：

javascript 
Cartesian3.fromRadians = function (longitude, latitude, height) { 
  height = defaultValue(height, 0.0); 
  // ... 
}; 
``` 

- :speedboat: 不要使用 `defaultValue` 如果它会导致不必要的函数调用或内存分配，例如，

```javascript 
this._mapProjection = defaultValue( 
  options.mapProjection, 
  new GeographicProjection() 
); 
```

最好写成

```javascript 
this._mapProjection = defined(options.mapProjection) 
  ？options.mapProjection 
  : new GeographicProjection(); 
``` 

- 如果 `options` 参数是可选的，请使用 `defaultValue.EMPTY_OBJECT`，例如

```javascript 
function DebugModelMatrixPrimitive(options) { 
  options = defaultValue(options, defaultValue.EMPTY_OBJECT); 
  this.length = defaultValue(options.length, 10000000.0); 
  this.width = defaultValue(options.width, 2.0); 
  // ... 
} 
```

一些常见的合理默认值是

- `height`: `0.0` 
- `ellipsoid`: `Ellipsoid.WGS84` 
- `show`: `true` 

### Throwing Exceptions 

Use the functions of Cesium's [Check](https://github .com/CesiumGS/cesium/blob/main/Source/Core/Check.js) 类在用户出现编码错误时抛出“DeveloperError”。最常见的错误是参数丢失、类型错误或超出错误类型的范围或超出范围。

- 例如，要检查参数是否已定义并且是一个对象：

```javascript 
Cartesian3.maximumComponent = function (cartesian) { 
  //>>includeStart('debug', pragmas.debug); 
  Check.typeOf.object("笛卡尔", 笛卡尔); 
  //>>includeEnd('

  返回 Math.max(cartesian.x, cartesian.y, cartesian.z); 
}; 
``` 

- 对于更复杂的参数检查，手动检查参数然后抛出 `DeveloperError`。示例：

```javascript 
Cartesian3.unpackArray = function (array, result) { 
  //>>includeStart('debug', pragmas.debug); 
  Check.defined("数组", 数组); 
  Check.typeOf.number.greaterThanOrEquals("array.length", array.length, 3); 
  if (array.length % 3 !== 0) { 
    throw new DeveloperError("数组长度必须是 3 的倍数。"); 
  } 
  //>>includeEnd('调试'); 

  // ... 
}; 
```

- 要检查“DeveloperError”，请将代码包围在“includeStart”/“includeEnd”注释中，如上所示，以便开发人员错误检查可以在发布版本之外进行优化。不要在 `includeStart`/`includeEnd` 中包含所需的副作用，例如，

```javascript 
Cartesian3.maximumComponent = function (cartesian) { 
  //>>includeStart('debug', pragmas.debug); 
  常量 c = 笛卡尔；
  Check.typeOf.object("笛卡尔", 笛卡尔); 
  //>>includeEnd('调试'); 

  // 在调试中工作。发布失败，因为 c 被优化了！
  返回 Math.max(cx, cy, cz); 
}; 
```

- 抛出 Cesium 的 `RuntimeError` 错误，直到运行时才知道。与开发人员错误不同，运行时错误检查并未针对发布版本进行优化。

```javascript 
if (typeof WebGLRenderingContext === "undefined") { 
  throw new RuntimeError("浏览器不支持 WebGL。"); 
} 
``` 

-：艺术：例外是例外。避免抛出异常，例如，如果一条多段线只提供一个位置，而不是两个或更多，而不是抛出异常只是不渲染它。

### `result` 参数和临时变量

:speedboat: 在 JavaScript 中，用户定义的类（如“Cartesian3”）是引用类型，因此分配在堆上。频繁分配这些类型会导致严重的性能问题，因为它会产生 GC 压力，从而导致垃圾收集器运行更长时间和更频繁。

Cesium 使用必需的“结果”参数来避免隐式内存分配。例如，

```javascript 
const sum = Cartesian3.add(v0, v1); 
```

必须为返回的总和隐式分配一个新的 `Cartesian3` 对象。相反，`Cartesian3.add` 需要一个`result` 参数：

```javascript 
const result = new Cartesian3(); 
const sum = Cartesian3.add(v0, v1, result); // Result 和 sum 引用同一个对象
```

这使得分配对调用者是显式的，这允许调用者，例如，在文件范围的临时变量中重用结果对象：

```javascript 
const scratchDistance = new Cartesian3(); 

Cartesian3.distance = function (left, right) { 
  Cartesian3.subtract(left, right, scratchDistance); 
  返回 Cartesian3.magnitude(scratchDistance); 
}; 
```

代码不是那么干净，但性能改进通常是显着的。

如下所述，“from”构造函数还使用可选的“result”参数。

由于并不总是需要或返回结果参数，因此不要严格依赖您传入的结果参数进行修改。例如：

```js
Cartesian3.add(v0, v1, 结果); 
Cartesian3.add（结果，v2，结果）；
```

最好写成

```js 
result = Cartesian3.add(v0, v1, result); 
结果 = Cartesian3.add（结果，v2，结果）；
``` 

## 类

- :art: 类应该是**内聚的**。一个类应该代表一个抽象。
- :art: 类应该**松耦合**。两个类不应该纠缠在一起并依赖彼此的实现细节；他们应该通过定义明确的接口进行通信。

### 构造函数

- 通过创建构造函数来创建类：

```javascript 
function Cartesian3(x, y, z) { 
  this.x = defaultValue(x, 0.0);
  this.y = defaultValue(y, 0.0); 
  this.z = defaultValue(z, 0.0); 
} 
``` 

- 通过使用 `new` 调用构造函数来创建类（_object_）的实例：

```javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
``` 

- :speedboat: 在构造函数中分配给一个类的所有属性成员。这允许 JavaScript 引擎使用隐藏类并避免进入字典模式。如果初始值没有意义，则分配“undefined”。不要向对象添加属性，例如，

```javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
pw = 4.0; // 将 w 属性添加到 p，减慢属性访问，因为对象进入字典模式
```

- :speedboat: 出于同样的原因，不要更改属性的类型，例如，将字符串分配给数字，例如，`` 

`javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
px = "铯"; // 将 x 更改为字符串，减慢属性访问速度
``` 

- 在构造函数中，将属性视为一次写入；不要写信给他们或多次阅读它们。如果需要读取它们，请创建一个局部变量。例如：

  代替

  ```javascript 
  this._x = 2; 
  this._xSquared = this._x * this._x; 
  ```

  更喜欢

  ```javascript 
  const x = 2; 
  这个._x = x; 
  这个._xSquared = x * x; 
  ``` 

### `from` 构造函数

:art: 构造函数应该将类的基本组件作为参数。例如，“Cartesian3”采用“x”、“y”和“z”。

从其他参数构造对象通常很方便。由于 JavaScript 没有函数重载，Cesium 使用
以 `from` 为前缀的静态函数以这种方式构造对象。例如：

```javascript 
const p = Cartesian3.fromRadians(-2.007, 0.645); // 使用经度和纬度构造 Cartesian3 对象
```

这些是使用可选的 `result` 参数实现的，它允许调用者传入临时变量：

```javascript 
Cartesian3.fromRadians = function (longitude, latitude, height,结果） {
  // 使用经度、纬度、高度计算 x、y、z 

  if (!defined(result)) { 
    result = new Cartesian3(); 
  }

  结果.x = x; 
  结果.y = y; 
  结果.z = z; 
  返回结果；
}; 
```

由于调用 `from` 构造函数不需要现有对象，因此该函数被分配给 `Cartesian3.fromRadians`，而不是 `Cartesian3.prototype.fromRadians`。

### `to` 函数

以 `to` 开头的函数返回一种新类型的对象，例如

```javascript 
Cartesian3.prototype.toString = function () { 
  return "(${this.x}, ${this .y}, ${this.z})"; 
}; 
```

### 对基础类谨慎使用原型函数

:art: 诸如`Cartesian3`、`Quaternion`、`Matrix4` 和`JulianDate` 之类的基础数学类很少使用原型函数。例如，`Cartesian3` 没有像这样的原型 `add` 函数：

```javascript 
const v2 = v0.add(v1, result); 
```

相反，它被写成

```javascript 
const v2 = Cartesian3.add(v0, v1, result); 
```

唯一的例外是

- `clone` 
- `equals` 
- `equalsEpsilon` 
- `toString`

这些原型函数通常委托给非原型（静态）版本，例如，

```javascript 
Cartesian3.equals = function (左右） {
  返回（
    左===右|| 
    （定义（左）&&
      定义（右）&& 
      left.x === right.x && 
      left.y === right.y && 
      left.z === right.z）
  ); 
}; 

Cartesian3.prototype.equals = function (right) { 
  return Cartesian3.equals(this, right); } 
}; 
```

原型版本的好处是可以多态使用。

### 静态常量

要创建与类相关的静态常量，请使用 `Object.freeze`：

```javascript 
Cartesian3.ZERO = Object.freeze(new Cartesian3(0.0, 0.0, 0.0)); 
``` 

### 私有函数

与私有属性一样，私有函数以 _ 开头。实际上，这些很少使用。相反，为了更好的封装，使用了一个将“this”作为第一个参数的文件范围函数。例如，

```javascript 
Cesium3DTileset.prototype.update = function(frameState) { 
    this._processTiles(frameState); 
    // ... 
}; 

Cesium3DTileset.prototype._processTiles(tileset, frameState) { 
    const tiles = this._processingQueue; 
    const length = tiles.length; 

    for (let i = length - 1; i >= 0; --i) { 
        tiles[i].process(tileset, frameState); 
    } 
} 
```

最好写成

```javascript
Cesium3DTileset.prototype.update = function (frameState) { 
  processTiles(this, frameState); 
  // ... 
}; 

function processTiles(tileset, frameState) { 
  const tiles = tileset._processingQueue; 
  const length = tiles.length; 

  for (let i = length - 1; i >= 0; --i) { 
    tiles[i].process(tileset, frameState); 
  } 
} 
``` 

### Property Getter/Setters

无需额外处理即可读取或写入的公共属性可以简单地在构造函数中赋值，例如，

```javascript 
function Model(options) { 
  this.show = defaultValue( options.show, true); 
` 
``

可以使用 `Object.defineProperties` 函数使用私有属性和 getter 创建只读属性，例如，

```javascript 
function Cesium3DTileset(options) { 
  this._url = options.url; 
} 

Object.defineProperties(Cesium3DTileset.prototype, { 
  url: { 
    get: function () { 
      return this._url; 
    }, 
  }, 
}); 
``` 

Getters 可以执行任何需要的计算来返回属性，但性能期望是它们执行得很快。

设置器还可以在分配给私有属性之前执行计算，设置标志以延迟计算，或两者兼而有之，例如：

```javascript
Object.defineProperties(UniformState.prototype, { 
  viewport: { 
    get: function () { 
      return this._viewport; 
    }, 
    set: function (viewport) { 
      if (!BoundingRectangle.equals(viewport, this._viewport)) { 
        BoundingRectangle.clone （视口，this._viewport）；

        const v = this._viewport；
        const vc = this._viewportCartesian4；
        vc.x = vx；
        vc.y = vy；
        vc.z = v.width；
        vc.w = v.height；

        this._viewportDirty = true; 
      } 
    }, 
  }, 
}); 
```

- :speedboat: 调用 getter/setter 函数比直接访问属性要慢，因此类内部的函数可以在适当的时候直接使用私有属性。

### Shadowed Property

当 getter/setter 函数的开销过高或需要引用类型语义时，例如，将属性作为 `result` 参数传递以便修改其属性的能力，请考虑将公共属性与私有阴影属性，例如，

```javascript 
function Model(options) { 
  this.modelMatrix = Matrix4.clone( 
    defaultValue(options.modelMatrix, Matrix4.IDENTITY) 
  ); 
  this._modelMatrix = Matrix4.clone(this.modelMatrix); 
} 

Model.prototype.update = function (frameState) {
  if (!Matrix4.equals(this._modelMatrix, this.modelMatrix)) { 
    // clone() 是深拷贝。不是 this._modelMatrix = this._modelMatrix 
    Matrix4.clone(this.modelMatrix, this._modelMatrix); 

    // 执行模型矩阵变化时需要发生的缓慢操作
  } 
}; 
``` 

### 将构造函数放在文件顶部

即使需要辅助函数依赖**提升**，构造函数放在文件顶部也很方便，例如，` Cesium3DTileset.js`, 

```javascript 
function loadTileset(tileset, tilesJson, done) { 
  // ... 
} 

function Cesium3DTileset(options) { 
  // ...
  loadTileset(this, options.url, function (data) { 
    // ... 
  }); 
` 
``

最好写成

```javascript 
function Cesium3DTileset(options) { 
  // ... 
  loadTileset(this, options.url, function (data) { 
    // ... 
  }); 
} 

function loadTileset(tileset, tilesJson, done) { 
  // ... 
} 
```

即使它依赖于将 `loadTileset` 函数隐式提升到文件顶部。

＃＃ 设计

- :house: 只有当它可能对最终用户有用时，才将类或函数作为 Cesium API 的一部分；避免将实现细节作为公共 API 的一部分。当某些东西是公开的时，它会使 Cesium API 变得更大，更难学习，以后更难更改，并且需要更多的文档工作。
- :art: 将新类和函数放在 Cesium 堆栈（目录）的右侧部分。从下往上：
  - `Source/Core` - 数字运算。纯数学，例如 [`Cartesian3`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Cartesian3.js)。纯几何体，例如 [`CylinderGeometry`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/CylinderGeometry.js)。基本算法，例如 [`mergeSort`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/mergeSort.js)。请求辅助函数，例如 [`loadArrayBuffer`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/loadArrayBuffer.js)。
  - `Source/Renderer` - WebGL 抽象，例如 [`ShaderProgram`](https://github.com/CesiumGS/cesium/blob/main/Source/Renderer/ShaderProgram.js) 和特定于 WebGL 的实用程序，例如 [` ShaderCache`](https://github.com/CesiumGS/cesium/blob/main/Source/Renderer/ShaderCache.js)。此目录中的标识符不是公共 Cesium API 的一部分。
  - `Source/Scene` - 图形引擎，包括 [Model](https://github.com/CesiumGS/cesium/blob/main/Source/Scene/Model.js) 等原语。此目录中的代码通常依赖于 `Renderer`。
  - `Source/DataSources` - 实体API，例如[`Entity`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/Entity.js)，以及数据源，例如[` CzmlDataSource`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/CzmlDataSource.js)。
  - `Source/Widgets` - 主要的 Cesium [`Viewer`](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/Viewer/Viewer.js) 等小部件。

文件属于哪个目录通常很明显。如果不是，则通常在 `Core` 和另一个目录之间做出决定。如果它是纯数字运算或预计对 Cesium 通常有用的实用程序，请将文件放在 Core 中，例如 [`Matrix4`](https://github.com/CesiumGS/cesium/blob/main/ Source/Core/Matrix4.js) 属于 `Core`，因为 Cesium 堆栈的许多部分都使用 4x4 矩阵；另一方面，[`BoundingSphereState`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/BoundingSphereState.js) 在 `DataSources` 中，因为它特定于数据源。

![CesiumJS设计](1.jpg)

模块（文件）应该只引用堆栈中同一级别或较低级别的模块。例如，`Scene` 中的模块可以使用`Scene`、`Renderer` 和`Core` 中的模块，但不能使用`DataSources` 或`Widgets` 中的模块。

- 需要显式删除 WebGL 资源，以便包含它们的类（以及包含这些类的类等）具有 `destroy` 和 `isDestroyed` 函数，例如，```javascript const primitive 

= 
new Primitive(/* . .. */); 
期望（内容。isDestroyed（））。toEqual（假）；
原始的.destroy(); 
期望（内容。isDestroyed（））。toEqual（真）；
``` 

`destroy` 函数是用 Cesium 的 `destroyObject` 函数实现的，例如，

```javascript 
SkyBox.prototype.destroy = function () {
  this._vertexArray = this._vertexArray && this._vertexArray.destroy(); 
  返回销毁对象（这个）；
}; 
``` 

- 仅“销毁”您创建的对象；赋予类的外部对象应该由它们的所有者而不是类来销毁。

### 弃用和重大更改

从发布到发布，我们努力保持公共 Cesium API 稳定，同时保持移动性以快速开发并使 API 朝着正确的方向发展。因此，我们谨慎地弃用然后删除或替换部分公共 API。

`@private` API 被认为是 Cesium 的实现细节，可以在不弃用的情况下立即被破坏。

`@experimental` API 在未来的 Cesium 版本中可能会发生重大变化，但不会弃用。它允许新的实验性功能，例如实施草稿格式。

公共标识符（类、函数、属性）在被删除之前应该被弃用。为此：

- 决定应删除已弃用 API 的未来版本。这是视具体情况而定，具体取决于它对用户和 Cesium 开发的影响有多严重。大多数弃用的 API 将在 1-3 个版本中删除。如果需要，可以在拉取请求中对此进行讨论。
- 使用 [`deprecationWarning`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/deprecationWarning.js) 警告用户 API 已弃用以及他们可以采取哪些主动更改，例如，

```javascript
function Foo() { 
  deprecationWarning( 
    "Foo", 
    "Foo 在 CesiumJS 1.01 中已弃用。它将在 1.03 中删除。请改用 newFoo。" 
  ); 
  // ... 
} 
``` 

- 添加 [`@deprecated`](http://usejsdoc.org/tags-deprecated.html) 文档标签。
- 除了专门测试已弃用 API 的单元测试外，删除 Cesium 中所有已弃用 API 的使用。
- 在 [`CHANGES.md`](https://github.com/CesiumGS/cesium/blob/main/CHANGES.md) 的`Deprecated` 部分提及弃用。包括它将被删除的 Cesium 版本。
- 创建一个[问题]（https://github.com/CesiumGS/cesium/issues）以使用适当的“在[版本]中删除”标签删除 API。
- 删除 API 后，在 [`CHANGES.md`](https://github.com/CesiumGS/cesium/blob/main/CHANGES.md) 的`Breaking Changes` 部分添加对它的提及。

## 第三方库

:house: Cesium 很少使用第三方库。如果你想添加一个新的，请在[Cesium社区论坛](https://community.cesium.com/)上发帖([示例讨论](https://community.cesium.com/t/我们喜欢使用第三方库/745))。该库应该

- 具有兼容的许可证，例如 MIT、BSD 或 Apache 2.0。
- 提供 Cesium 真正需要且团队没有时间和/或专业知识来开发的功能。
- 轻量级、经过测试、维护并合理广泛使用。
- 不污染全局命名空间。
- 提供足够的价值来证明添加需要维护集成的第三方库是合理的，并且在一些用户评估它时有可能略微计较 Cesium（通常，第三方越少越好）。

添加或更新第三方库时：

- 确保 [LICENSE.md](../../../LICENSE.md) 更新为库的名称和完整的版权声明。
- 如果一个库作为 CesiumJS 版本的一部分发布，它应该包含在生成的 [`ThirdParty.json`](../../../ThirdParty.json) 中。
  1. 使用包 name 更新 [`ThirdParty.extra.json`](../../../ThirdParty.extra.json)。如果它是 [`package.json`](../../../package.json) 中包含的 npm 模块，请使用确切的包名称。
  2. 如果库_不是_包含在 `package.json` 中的 npm 模块，请提供 `license`、`version` 和 `url` 字段。否则，可以使用 `package.json` 检测到此信息。
  3. 如果许可证有特殊情况，例如从多个可用许可证列表中选择使用单个许可证，则提供 `license` 字段将覆盖使用 `package.json` 检测到的信息。在解释异常的情况下，还应提供 `notes` 字段。
  4. 运行 `npm run build-third-party` 并提交生成的 `ThirdParty.json` 

## Widgets

Cesium 包含一些在查看器中使用的标准小部件，包括动画和时间轴控件、基础层选择器和地理编码器。这些小部件都是使用 [Knockout](http://knockoutjs.com/)) 构建的，用于自动刷新 UI。Knockout 使用模型视图视图模型 (MVVM) 设计模式。您可以在[了解 MVVM - JavaScript 开发人员指南](https://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/)中了解有关此设计模式的更多信息，

以了解如何使用Knockout 库，请参阅其主页的[入门](http://knockoutjs.com/) 部分。他们还有一个很棒的 [交互式教程](http://learn.knockoutjs.com/)，其中包含分步说明。

Cesium 还使用 [Knockout-ES5](http://blog.stevensanderson.com/2013/05/20/knockout-es5-a-plugin-to-simplify-your-syntax/) 插件来简化 knockout 语法。这让我们可以像使用其他变量一样使用 knockout observables。调用 `knockout.track` 来创建可观察对象。这是来自 [BaseLayerPickerViewModel](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/BaseLayerPicker/BaseLayerPickerViewModel.js#L73) 的示例，它为“tooltip”、“showInstructions”和“ _touch` 属性。

```javascript 
knockout.track(this, ["tooltip", "showInstructions", "_touch"]); 
``` 

### 淘汰订阅

只有当您无法完成您需要使用标准绑定执行的操作时，才使用淘汰订阅。对于 [example](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/Viewer/Viewer.js#L588)，`Viewer` 订阅了 `FullscreenButtonViewModel.isFullscreenEnabled` 因为它需要改变该值更改时时间轴小部件的宽度。这不能通过绑定来完成，因为来自“FullscreenButtonViewModel”的值正在影响不包含在该小部件中的值。

Cesium 包含一个 [`subscribeAndEvaluate`](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/subscribeAndEvaluate.js) 辅助函数，用于订阅 knockout observable。

使用订阅时，请务必在视图模型不再使用时[处理订阅](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/Viewer/Viewer.js#L1413)它。否则，监听器将在可观察对象的生命周期内继续收到通知。

```javascript 
fullscreenSubscription = subscribeAndEvaluate(fullscreenButton.viewModel, 'isFullscreenEnabled', function(isFullscreenEnabled) { ... }); 
// ...然后稍后... 
fullscreenSubscription.dispose(); 
``` 

## GLSL 

### 命名

- GLSL 文件以 `.glsl` 结尾，位于 [Shaders](https://github.com/CesiumGS/cesium/tree/main/Source/Shaders) 目录中。
- 顶点着色器的文件有一个“VS”后缀；片段着色器有一个 FS 后缀。例如：`BillboardCollectionVS.glsl` 和 `BillboardCollectionFS.glsl`。
- 通常，函数和变量等标识符使用 `camelCase`。
- Cesium 内置标识符以 `czm_` 开头，例如 [`czm_material`](https://github.com/CesiumGS/cesium/blob/main/Source/Shaders/Builtin/Structs/material.glsl)。文件具有相同的名称，但不带 `czm_` 前缀，例如 `material.glsl`。
- 在对立方体贴图进行采样时使用 `czm_textureCube` 而不是 `texture`。
这是为了保持
与WebGL 1 的向后兼容性

。
``` 
- 制服以 `u_` 开头，例如，


```javascript 
uniform sampler2D u_atlas; 
``` 

- `EC` 后缀表示点或向量在眼睛坐标中，例如，

```glsl 
varying vec3 v_positionEC；
// ... 
v_positionEC = (czm_modelViewRelativeToEye * p).xyz; 
``` 

- 当使用 [GPU RTE](https://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm) 时，`High` 和 `Low` 后缀分别定义高位和低位，例如，

```glsl
属性 vec3 position3DHigh；
属性 vec3 position3DLow；
``` 

- 2D 纹理坐标是 `s` 和 `t`，而不是 `u` 和 `v`，例如，

```glsl 
attribute vec2 st; 
``` 

### 格式化

- 使用与 JavaScript 相同的格式，除了将 `{` 换行，例如，

```glsl 
struct czm_ray 
{ 
    vec3 origin; 
    vec3方向；
}; 
``` 

### 性能

- :speedboat: 尽可能不频繁地计算昂贵的值，例如，更喜欢在 JavaScript 中计算一个值并以统一的方式传递它，而不是冗余地计算每个顶点的相同值。同样，更喜欢计算每个顶点的值并传递一个变量，而不是尽可能计算每个片段。
- :speedboat: 谨慎使用 `discard`，因为它会禁用 early-z GPU 优化。

＃＃ 资源

请参阅 Cesium 贡献者 Matthew Amato 和 Kevin Ring 在 _WebGL Insights_ 中 [认真对待 JavaScript](http://webglinsights.github.io/downloads/WebGL-Insights-Chapter-4.pdf) 的第 4.1 至 4.3 节，以更深入地了解模块和性能。

观看 Lilli Thompson 的[从控制台到 Chrome](https://www.youtube.com/watch?v=XAqIpGU8ZZk)，了解更深入的性能介绍。