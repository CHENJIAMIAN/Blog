 `result` 参数和临时变量# [Coding Guide ](https://github.com/CesiumGS/cesium/blob/main/Documentation/Contributors/CodingGuide/README.md)

CesiumJS 是世界上最大的 JavaScript 代码库之一。从一开始，我们就一直保持着代码质量的高标准，这使得代码库对于新老贡献者来说都更容易使用。我们希望您发现代码库干净且一致。

除了描述典型的编码约定外，本指南还涵盖了设计、可维护性和性能方面的最佳实践。它是许多开发人员经过多年的生产开发、研究和实验后积累的建议。

本指南适用于 CesiumJS 和用 JavaScript 编写的 Cesium 生态系统的所有部分。

🎨: 调色板图标表示设计提示。

🏠: 房子图标表示可维护性提示。当然，整个指南都是关于编写可维护代码的。

🚤: 快艇表示性能提示。

在某种程度上，本指南可以概括为_使新代码与现有代码相似_。

## 命名 

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

下面介绍了更多命名约定及其设计模式，例如，[`options`参数](#options-parameters)、[`result`参数和临时变量](#result-parameters-and-scratch -variables) 和 [`from`构造函数](#from-constructors)。

## 格式化

- 我们使用 [prettier](https://prettier.io/) 在提交时自动重新格式化所有 JS 代码，因此所有工作都已为您完成。提交时代码会自动重新格式化。
- 对于 HTML 代码，保持现有样式。使用双引号。
- 文本文件，以换行符结尾以最小化差异中的噪音。

## Linting

对于语法和样式指南，我们使用 ESLint 推荐的设置（规则列表可以在[此处](http://eslint.org/docs/rules/) 找到）作为基础，并通过共享的附加规则对其进行扩展配置节点模块，[eslint-config-cesium](https://www.npmjs.com/package/eslint-config-cesium)。该包作为 Cesium 存储库的一部分进行维护，并在整个 Cesium 生态系统中使用。有关已启用规则的列表，请查看 [index.js](https://github.com/CesiumGS/cesium/blob/main/Tools/eslint-config-cesium/index.js)、[browser.js ](https://github.com/CesiumGS/eslint-config-cesium/blob/main/browser.js) 和 [node.js](https://github.com/CesiumGS/eslint-config-cesium/blob/main/node.js)

**一般规则：** 

- [block-scoped-var](http://eslint.org/docs/rules/block-scoped-var)
- [no-alert](http://eslint.org/docs/rules/no-alert) 
- [无浮动小数](http://eslint.org/docs/rules/no-floating-decimal) 
- [no-implicit-globals](http://eslint.org/docs/rules/no-implicit-globals) 
- [no-loop-func](http://eslint.org/docs/rules/no-loop-func) 
- [no-use-before-define](http://eslint.org/docs/rules/no-use-before-define) 以防止在定义变量和函数之前使用它们。
- [no-else-return](http://eslint.org/docs/rules/no-else-return) 
- [no-undef-init](http://eslint.org/docs/rules/no-undef-init) 
- [无序列](http://eslint.org/docs/rules/no-sequences) 
- [no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions)
- [无尾随空格](http://eslint.org/docs/rules/no-trailing-spaces) 
- [no-lonely-if](http://eslint.org/docs/rules/no-lonely-if) 
- [quotes](http://eslint.org/docs/rules/quotes) 强制使用单引号
- [no-sequences](http://eslint.org/docs/rules/no-sequences) 
- [no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions) 

**Node特定规则：** 

- [global-require](http://eslint.org/docs/rules/global-require) 
- [no-buffer-constructor](http://eslint.org/docs/rules/no-buffer-constructor) 
- [no-new-require](http://eslint.org/docs/rules/no-new-require) 

**[使用内联注释禁用规则](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments )**

- 当为一行禁用 linting 时，使用 `//eslint-disable-next-line`: 

```js 
function exit(warningMessage) { 
  //eslint-disable-next-line no-alert 
  window.alert("Cannot exit : " + warningMessage); 
``` 

- 当禁用代码块的 linting 时，将 `eslint-disable` 注释放在新行上并尽可能靠近相关代码：``` 
``` js 
/*eslint-disable no-empty*/ 
try { 
  lineNumber = parseInt(stack.substring(lineStart + 1, lineEnd1), 10); 
} catch (ex) {} 
/*eslint-enable no-empty*/ 
``` 

## 单位

- Cesium 使用 SI 单位：
  - 米表示距离
  - 弧度表示角度
  - 持续时间的秒数
- 如果一个函数的参数有一个非标准单位，比如度，把单位放在函数名里，例如，

``` javascript 
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

```  javascript 
"use strict";
``` 

- 🚤: 为避免类型强制转换（隐式类型转换），使用 `===` 和 `!==` 测试相等性，例如，

```javascript 
const i = 1; 

if (i === 1) { 
  // ... 
} 

if (i !== 1) { 
  // ... 
} 
``` 

为了帮助人类读者，对于打算作为浮点数值的整数，请在其末尾添加`.0`

```javascript 
const f = 1; 
//例如，除非 f 是整数，否则最好写成
const f = 1.0; 
``` 

- 在第一次使用的地方声明变量。例如，

```javascript 
let i;
let m;
const models = [
  /* ... */
];
const length = models.length;
for (i = 0; i < length; ++i) {
  m = models[i];
  // Use m
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
let i= 0.0; 
``` 

- 当值未更新时，首选 `const` 变量。这确保了不变性。

- 🚤: 避免冗余的嵌套属性访问。如：

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
  return leftRadius === rightRadius;
}
```

最好写成

```javascript 
function radiiEquals(left, right) { 
  return left.radius === right.radius; 
} 
``` 

- 使用 `undefined` 而不是 `null`。
- 使用`Cesium.defined` 测试一个变量是否被定义，例如，

```javascript 
const v = undefined; 
if (defined(v)) { 
  // False
} 

const u = {}; 
if (defined(u)) { 
  // True 
} 
``` 

- 使用 `Object.freeze` 函数创建枚举，例如，

```javascript 
const ModelAnimationState = {
	STOPPED : 0,
	ANIMATING : 1
};

return Object.freeze(ModelAnimationState);
``` 

- 对不明显的代码使用描述性注释，例如，

```javascript 
byteOffset += sizeOfUint32; // 将 4 添加到 byteOffset 
```

最好写成

```javascript 
byteOffset += sizeOfUint32; // 跳过长度字段
``` 

- 在代码合并到 main 之前需要删除或解决 `TODO` 注释。使用`// PERFORMANCE_IDEA : `注释标记可能优化的点，以便以后在性能分析时使用，但要谨慎使用。
- 在合并到 main 之前删除注释掉的代码。
- 现代语言功能可能会提供方便的快捷方式和更简洁的语法，但在使用它们时应考虑到它们对性能的影响，尤其是在每帧调用的代码中。

## 函数

- 🎨: 函数应该是**内聚的**；他们应该只做一项任务。
- 函数中的语句应该处于相似的抽象级别。如果一个代码块比其余的语句低得多，那么移至辅助函数是一个很好的选择，例如，

```javascript 
Cesium3DTileset.prototype.update = function (frameState) {
  const tiles = this._processingQueue;
  const length = tiles.length;

  for (let i = length - 1; i >= 0; --i) {
    tiles[i].process(this, frameState);
  }

  selectTiles(this, frameState);
  updateTiles(this, frameState);
};
```

最好写成

```javascript 
Cesium3DTileset.prototype.update = function (frameState) {
  processTiles(this, frameState);
  selectTiles(this, frameState);
  updateTiles(this, frameState);
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
```

- 🚤: 较小的函数更有可能被 JavaScript 引擎优化。对于可能成为热点的代码，请考虑这一点。

### `options` 参数

🎨: 许多 Cesium 函数采用 `options` 参数来支持可选参数、自动生成代码文档和向前兼容性。例如，考虑：

```javascript 
const sphere = new SphereGeometry(10.0, 32, 16, VertexFormat.POSITION_ONLY); 
```

不清楚数值代表什么，调用者需要知道参数的顺序。如果这需要一个`options`参数，它看起来像这样：

```javascript 
const sphere = new SphereGeometry({ 
  radius: 10.0, 
  stackPartitions: 32, 
  slicePartitions: 16,
  vertexFormat: VertexFormat.POSITION_ONLY, 
}); 
``` 

- 🚤: 使用 `{ /* ... */ }` 创建一个对象字面量，这是一种内存分配，比较慢。所以如果函数可能被频繁调用，请避免设计使用`options`参数的函数；否则，调用者将不得不使用临时变量（参见 [ `result` 参数和临时变量](# `result` 参数和临时变量)）来提高性能。除了数学类的构造函数外，其他的类构造函数都可以使用`options`参数。Cesium 避免了在被频繁调用的类使用`options`去构造对象。例如，

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

```javascript 
Cartesian3.fromRadians = function (longitude, latitude, height) { 
  height = defaultValue(height, 0.0); 
  // ... 
}; 
``` 

- 🚤: 不要使用 `defaultValue` ，如果它会导致不必要的函数调用或内存分配，例如，

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

### 抛出异常

[使用Cesium的Check](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Check.js)类在用户出现编码错误时抛出``DeveloperError``。最常见的错误是参数丢失、类型错误 或 类型错误且超出范围 或 超出范围。

- 例如，要检查参数是否已定义并且是一个对象：

```javascript 
Cartesian3.maximumComponent = function (cartesian) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("cartesian", cartesian);
  //>>includeEnd('debug');

  return Math.max(cartesian.x, cartesian.y, cartesian.z);
};
``` 

- 对于更复杂的参数检查，手动检查参数然后抛出 `DeveloperError`。示例：

```javascript 
Cartesian3.unpackArray = function (array, result) { 
  //>>includeStart('debug', pragmas.debug); 
  Check.defined("array", array); 
  Check.typeOf.number.greaterThanOrEquals("array.length", array.length, 3); 
  if (array.length % 3 !== 0) { 
    throw new DeveloperError("数组长度必须是 3 的倍数。"); 
  } 
  //>>includeEnd('debug'); 

  // ... 
}; 
```

- 要检查`DeveloperError`，请将代码包围在`includeStart`/`includeEnd`注释中，如上所示，以便开发人员可以在发布版本之前进行错误检查和优化。不要在 `includeStart`/`includeEnd` 中包含其他的副作用，例如，

```javascript 
Cartesian3.maximumComponent = function (cartesian) { 
  //>>includeStart('debug', pragmas.debug); 
  const c = cartesian；
  Check.typeOf.object("cartesian", cartesian); 
  //>>includeEnd('调试'); 

  // 在调试中工作。发布失败，因为 c 被优化了！
  return Math.max(cx, cy, cz); 
}; 
```

- 当运行时出现错误时，会使用Cesium的`RuntimeError`进行抛出。与`DeveloperError`不同，`RuntimeError`不会在发布版本中被优化掉，因为这些错误可能会导致程序的崩溃或者其他严重问题，需要在运行时进行检查和处理。
```javascript 
if (typeof WebGLRenderingContext === "undefined") { 
  throw new RuntimeError("浏览器不支持 WebGL。"); 
} 
``` 

🎨 异常是特殊情况。尽量避免抛出异常，例如，如果一条多段线只提供一个位置，而不是两个或更多，那么只是不渲染它而不是抛出异常。

### `result` 参数和`Scratch`临时变量

	🚤: 在 JavaScript 中，用户定义的类（如`Cartesian3`）是引用类型，并且因此分配在堆上。频繁分配这些类型会导致严重的性能问题，因为它会产生 GC 压力，从而导致垃圾收集器运行更长时间和更频繁。

Cesium 使用必需的`result`参数来避免隐式内存分配。例如，

```javascript 
const sum = Cartesian3.add(v0, v1); //会为返回的sum隐含分配一个新的Cartesian3对象。
```

相反，如果`Cartesian3.add` 需要一个`result` 参数，

```javascript 
const result = new Cartesian3(); 
const sum = Cartesian3.add(v0, v1, result); // Result 和 sum 引用同一个对象
```
就会使得内存分配对调用者显式，这使得调用者可以在文件范围的临时变量中重复使用结果对象：

```javascript 
const scratchDistance = new Cartesian3(); //在被频繁调用的函数之外声明会被重复使用的临时变量，而不是在函数里

Cartesian3.distance = function (left, right) { 
  Cartesian3.subtract(left, right, scratchDistance); 
  return Cartesian3.magnitude(scratchDistance); 
}; 
```
这样的代码不够简洁，但是性能提升通常非常明显。

如下所述，`add`构造函数还使用可选的`result`参数。
但由于result参数并非始终必需或返回，不要严格依赖传递的result参数被修改。例如：
```js
Cartesian3.add(v0, v1, result);
Cartesian3.add(result, v2, result);
```

因此，最好的方式是在每一次方法调用的时候都显式地对result进行赋值，而不是依赖于方法中隐含的运算:

```js 
result = Cartesian3.add(v0, v1, result);
result = Cartesian3.add(result, v2, result);
``` 

## 类

- 🎨: 类应该是**内聚的**。一个类应该代表一个抽象。
- 🎨: 类应该**松耦合**。两个类不应该纠缠在一起并依赖彼此的实现细节；他们应该通过定义明确的接口进行通信。

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

- 🚤: 在构造函数中为类的所有属性成员分配初始值。这允许 JavaScript 引擎使用隐藏类并避免进入字典模式。如果没有合适的初始值，请将属性的值设为 undefined。不要向对象添加属性，例如，

```javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
p.w = 4.0; // 将 w 属性添加到 p，减慢属性访问，因为对象进入字典模式
```

- 🚤: 出于同样的原因，不要更改属性的类型，例如，将字符串分配给数字，例如

```javascript 
const p = new Cartesian3(1.0, 2.0, 3.0); 
p.x = "铯"; // 将 x 更改为字符串，减慢属性访问速度
``` 

- 在构造函数中，将属性视为一次写入；不要写信给他们或多次阅读它们。如果需要读取它们，请创建一个局部变量 代替。例如：
  ```javascript 
  this._x = 2; 
  this._xSquared = this._x * this._x; 
  ```

  更好的做法
```js
const x = 2;
this._x = x;
this._xSquared = x * x;
```
> 这个建议的原理是优化 JavaScript 引擎的内存管理和执行。当你在一个构造函数中写入属性时，JavaScript 引擎会动态地创建一个新的对象并为其分配内存，这个对象最终会成为构造函数创建的实例对象。当一个属性被写入值时，JavaScript 引擎不仅需要分配内存，还需要为每个实例对象保存这个属性值。如果在构造函数中重复读取该属性的值，当一个属性被读取时，JavaScript 引擎需要从内存中获取这个属性的值并将其加载到寄存器中。如果重复地访问同一个属性，每次引擎都需要不断地重新查找这个属性的内存地址并重新加载该值到寄存器中。这样的操作会涉及到大量的内存寻址和数据加载，导致性能下降。因此，如果一个属性需要被多次使用，为了避免这种性能损失，最好将其存储在一个本地变量中，而不是多次读取同一个属性的值。
> 
> JavaScript 引擎在处理对象时，应该使用类似于 C++ 编译器的静态类型或隐藏的类来提高性能。当定义一个新的对象时，JavaScript 引擎会查看它的结构并创建一个隐藏类。这个隐藏类会记录对象的形状，包括对象的属性和方法。当属性被添加到对象上时，引擎会检查该属性是否已经存在于隐藏类中。如果属性不存在，则隐藏类会动态地更新和扩展以包括新的属性。
> JavaScript 引擎会根据隐藏类的结构优化代码。通过隐藏类，引擎可以轻松地为对象的属性分配内存，并且在访问时可以快速定位属性的内存地址。这种优化技术避免了使用字典模式，即每个对象都有自己的属性集。属性集这种方式需要使用哈希表，每次访问对象属性时需要在哈希表中进行查找，导致较慢的访问速度。
> 因此，在引擎预先生成隐藏类的基础上，将同样类型的属性打包在隐藏类中，每个属性都可以直接映射到内存地址，避免了字典模式的使用，从而实现了更快速的访问速度。
> 
> 更底层的原理是，JavaScript 引擎的内存分配和访问方式是基于预测的。它会在运行时推断代码的数据类型并将其优化为快速指针操作。但是，如果在构造函数中混用属性访问和赋值，就会导致该对象进入字典模式，具体来说，当对象上的属性被访问时，JavaScript 引擎需要通过哈希表来查找该属性，这会造成一定的性能损失。而当对象上的属性被修改时，对象的内部结构会变化，这会导致 JavaScript 引擎重新生成隐藏类，从而导致性能下降。不过，值得注意的是，虽然混用属性访问和赋值会对性能造成影响，但这并不意味着 JavaScript 引擎完全放弃了对对象的优化。事实上，JavaScript 引擎会尽可能地通过隐藏类来优化对象的访问和执行。当对象进入字典模式时，JavaScript 引擎会退化为更老的内存管理和执行模式，但仍然会尽力优化其他对象不进入字典模式的成本。

因此，虽然混用属性访问和赋值会对对象的性能造成损失，但 JavaScript 引擎仍然会尝试进行隐藏类优化，以提高对象的访问和执行效率。

不过，值得注意的是，虽然混用属性访问和赋值会对性能造成影响，但这并不意味着 JavaScript 引擎完全放弃了对对象的优化。事实上，JavaScript 引擎会尽可能地通过隐藏类来优化对象的访问和执行。当对象进入字典模式时，JavaScript 引擎会退化为更老的内存管理和执行模式，但仍然会尽力优化其他对象不进入字典模式的成本。

因此，虽然混用属性访问和赋值会对对象的性能造成损失，但 JavaScript 引擎仍然会尝试进行隐藏类优化，以提高对象的访问和执行效率。

### `from` 构造函数

🎨: 构造函数应该将类的基本组件作为参数。例如，`Cartesian3`采用`x`、`y`和`z`。

从其他参数构造对象通常很方便。**由于 JavaScript 没有函数重载**，Cesium 使用
以 `from` 为前缀的静态函数以这种方式构造对象。例如：
> 由于 JavaScript 没有函数重载，函数名相同的函数在同一作用域下只能定义一次。但是有时候需要不同的构造函数能够接收不同的参数。因此，Cesium 使用静态函数和 from 前缀来表示不同类型的构造函数，并使用函数的参数来表示不同的组件。这样，即使函数名相同，也能通过参数类型和数量的不同来区分不同的构造函数。这样也为JS 增加了一部分的函数重载功能。

```javascript 
const p = Cartesian3.fromRadians(-2.007, 0.645); // 使用经度和纬度构造 Cartesian3 对象
```

这些是使用可选的 `result` 参数实现的，它允许调用者传入临时变量：

```javascript 
Cartesian3.fromRadians = function (longitude, latitude, height,result） {
  // 使用经度、纬度、高度计算 x、y、z 

  if (!defined(result)) { 
    result = new Cartesian3(); 
  }

  result.x = x; 
  result.y = y; 
  result.z = z; 
  return result；
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

🎨: 诸如`Cartesian3`、`Quaternion`、`Matrix4` 和`JulianDate` 之类的基础数学类很少使用原型函数。例如，`Cartesian3` 没有像这样的原型 `add` 函数：

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

这些原型函数通常委托给非原型（静态）版本（原型版本的好处是可以多态使用），例如，

```javascript 
Cartesian3.equals = function (left, right) {
  return (
    left === right ||
    (defined(left) &&
      defined(right) &&
      left.x === right.x &&
      left.y === right.y &&
      left.z === right.z)
  );
};

Cartesian3.prototype.equals = function (right) {
  return Cartesian3.equals(this, right);
};
```


### 静态常量

要创建与类相关的静态常量，请使用 `Object.freeze`：

```javascript 
Cartesian3.ZERO = Object.freeze(new Cartesian3(0.0, 0.0, 0.0)); 
``` 

### 私有函数

与私有属性一样，私有函数以 _ 开头。实际上，这些很少使用。相反，为了更好的封装，通常会使用一个文件范围的函数，并将 this 作为第一个参数传递进去。例如，

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


//最好写成


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

### 属性的Getter/Setters

无需额外处理即可读取或写入的公共属性可以简单地在构造函数中赋值，例如，
```javascript 
function Model(options) { 
  this.show = defaultValue(options.show, true); 
}
```

可以使用 `Object.defineProperties` 函数使用**私有属性**和 getter 创建只读属性，例如，
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
Setters 还可以在分配给私有属性之前执行计算，设置标志以延迟计算，或两者兼而有之，例如：
```javascript
Object.defineProperties(UniformState.prototype, {
  viewport: {
    get: function () {
      return this._viewport;
    },
    set: function (viewport) {
      if (!BoundingRectangle.equals(viewport, this._viewport)) {
        BoundingRectangle.clone(viewport, this._viewport);

        const v = this._viewport;
        const vc = this._viewportCartesian4;
        vc.x = v.x;
        vc.y = v.y;
        vc.z = v.width;
        vc.w = v.height;

        this._viewportDirty = true;
      }
    },
  },
});
```

- 🚤: 调用 getter/setter 函数比直接访问属性要慢，因此类内部的函数可以在适当的时候直接使用私有属性。

### 私有阴影属性

> 当我们需要频繁地获取和设置对象属性时，使用getter/setter函数可能会导致代码性能下降，因为getter/setter函数需要动态地执行一些代码才能完成属性的获取和设置，并且每次调用都需要执行这些代码。此时，直接暴露属性可能会更有效率。但是，如果我们直接暴露对象的引用类型属性，其他代码可能会直接修改这些值，将其篡改，从而破坏了对象的内部状态。为了避免这种情况，我们可以通过将公共属性和私有阴影属性结合起来的方式，实现对属性的更好保护和控制。我们可以暴露公共属性用于读取和写入，同时在内部使用私有阴影属性保存属性值，在必要的时候判断私有阴影属性值是否发生改变，避免其他代码直接篡改属性值造成损害。这种方式可以在提高代码安全性和可维护性的前提下，减少性能开销。

例如：
```javascript 
function Model(options) { 
  this.modelMatrix = Matrix4.clone( 
    defaultValue(options.modelMatrix, Matrix4.IDENTITY) 
  ); 
  this._modelMatrix = Matrix4.clone(this.modelMatrix); //克隆以切断引用
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
```

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

## 设计

- 🏠: 只有当它可能对最终用户有用时，才将类或函数作为 Cesium API 的一部分；避免将实现细节作为公共 API 的一部分。当某些东西是公开的时，它会使 Cesium API 变得更大，更难学习，以后更难更改，并且需要更多的文档工作。
- 🎨: 将新类和函数放在 Cesium 堆栈（目录）的右侧部分。从下往上：
  - `Source/Core` - 数字运算。纯数学，例如 [`Cartesian3`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Cartesian3.js)。纯几何体，例如 [`CylinderGeometry`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/CylinderGeometry.js)。基本算法，例如 [`mergeSort`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/mergeSort.js)。请求辅助函数，例如 [`loadArrayBuffer`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/loadArrayBuffer.js)。
  - `Source/Renderer` - WebGL 抽象，例如 [`ShaderProgram`](https://github.com/CesiumGS/cesium/blob/main/Source/Renderer/ShaderProgram.js) 和特定于 WebGL 的实用程序，例如 [` ShaderCache`](https://github.com/CesiumGS/cesium/blob/main/Source/Renderer/ShaderCache.js)。此目录中的标识符不是公共 Cesium API 的一部分。
  - `Source/Scene` - 图形引擎，包括 [Model](https://github.com/CesiumGS/cesium/blob/main/Source/Scene/Model.js) 等primitive。此目录中的代码通常依赖于 `Renderer`。
  - `Source/DataSources` - 实体API，例如[`Entity`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/Entity.js)，以及数据源，例如[` CzmlDataSource`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/CzmlDataSource.js)。
  - `Source/Widgets` - 主要的 Cesium [`Viewer`](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/Viewer/Viewer.js) 等小部件。

文件属于哪个目录通常很明显。如果不是，则通常在 `Core` 和另一个目录之间做出决定。如果它是纯数字运算或预计对 Cesium 通常有用的实用程序，请将文件放在 Core 中，例如 [`Matrix4`](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Matrix4.js) 属于 `Core`，因为 Cesium 堆栈的许多部分都使用 4x4 矩阵；另一方面，[`BoundingSphereState`](https://github.com/CesiumGS/cesium/blob/main/Source/DataSources/BoundingSphereState.js) 在 `DataSources` 中，因为它特定于数据源。
![CesiumJS Design](https://raw.fastgit.org/CesiumGS/cesium/main/Documentation/Contributors/CodingGuide/1.jpg)
![CesiumJS Design](https://raw.fastgit.org/CHENJIAMIAN/Blog/master/images/Pasted%20image%2020230426101106.png)
模块（文件）应该只引用堆栈中同一级别或较低级别的模块。例如，`Scene` 中的模块可以使用`Scene`、`Renderer` 和`Core` 中的模块，但不能使用`DataSources` 或`Widgets` 中的模块。

- 需要显式删除 WebGL 资源，以便包含它们的类（以及包含这些类的类等）具有 `destroy` 和 `isDestroyed` 函数，例如，
```javascript 
const primitive = new Primitive(/* ... */);
expect(content.isDestroyed()).toEqual(false);
primitive.destroy();
expect(content.isDestroyed()).toEqual(true);
``` 

`destroy` 函数是用 Cesium 的 `destroyObject` 函数实现的，例如，

```javascript 
SkyBox.prototype.destroy = function () {
  this._vertexArray = this._vertexArray && this._vertexArray.destroy();
  return destroyObject(this);
};
``` 

- 仅`销毁`您创建的对象；赋予类的外部对象应该由它们的所有者而不是类来销毁。

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
- 创建一个[问题]（https://github.com/CesiumGS/cesium/issues）以使用适当的`在[版本]中删除`标签删除 API。
- 删除 API 后，在 [`CHANGES.md`](https://github.com/CesiumGS/cesium/blob/main/CHANGES.md) 的`Breaking Changes` 部分添加对它的提及。

## 第三方库

🏠: Cesium 很少使用第三方库。如果你想添加一个新的，请在[Cesium社区论坛](https://community.cesium.com/)上发帖([示例讨论](https://community.cesium.com/t/我们喜欢使用第三方库/745))。该库应该

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

Cesium 还使用 [Knockout-ES5](http://blog.stevensanderson.com/2013/05/20/knockout-es5-a-plugin-to-simplify-your-syntax/) 插件来简化 knockout 语法。这让我们可以像使用其他变量一样使用 knockout observables。调用 `knockout.track` 来创建可观察对象。这是来自 [BaseLayerPickerViewModel](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/BaseLayerPicker/BaseLayerPickerViewModel.js#L73) 的示例，它为`tooltip`、`showInstructions`和` _touch` 属性。

```javascript 
knockout.track(this, ["tooltip", "showInstructions", "_touch"]); 
``` 

### Knockout订阅

只有当您无法完成您需要使用标准绑定执行的操作时，才使用Knockout订阅。对于 [example](https://github.com/CesiumGS/cesium/blob/main/Source/Widgets/Viewer/Viewer.js#L588)，`Viewer` 订阅了 `FullscreenButtonViewModel.isFullscreenEnabled` 因为它需要改变该值更改时时间轴小部件的宽度。这不能通过绑定来完成，因为来自`FullscreenButtonViewModel`的值正在影响不包含在该小部件中的值。

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
- 顶点着色器的文件有一个`VS`后缀；片段着色器有一个 FS 后缀。例如：`BillboardCollectionVS.glsl` 和 `BillboardCollectionFS.glsl`。
- 通常，函数和变量等标识符使用 `camelCase`。
- Cesium 内置标识符以 `czm_` 开头，例如 [`czm_material`](https://github.com/CesiumGS/cesium/blob/main/Source/Shaders/Builtin/Structs/material.glsl)。文件具有相同的名称，但不带 `czm_` 前缀，例如 `material.glsl`。
- 在对立方体贴图进行采样时使用 `czm_textureCube` 而不是 `texture`。
这是为了保持
与WebGL 1 的向后兼容性 
- 制服以 `u_` 开头，例如，
``` javascript 
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
attribute vec3 position3DHigh;
attribute vec3 position3DLow;
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
    vec3 direction;
};
``` 

### 性能

- 🚤: 尽可能不频繁地计算昂贵的值，例如，更喜欢在 JavaScript 中计算一个值并以统一的方式传递它，而不是冗余地计算每个顶点的相同值。同样，更喜欢计算每个顶点的值并传递一个变量，而不是尽可能计算每个片段。
- 🚤: 谨慎使用 `discard`，因为它会禁用 early-z GPU 优化。

## 资源

请参阅 Cesium 贡献者 Matthew Amato 和 Kevin Ring 在 _WebGL Insights_ 中 [认真对待 JavaScript](http://webglinsights.github.io/downloads/WebGL-Insights-Chapter-4.pdf) 的第 4.1 至 4.3 节，以更深入地了解模块和性能。

观看 Lilli Thompson 的[从控制台到 Chrome](https://www.youtube.com/watch?v=XAqIpGU8ZZk)，了解更深入的性能介绍。