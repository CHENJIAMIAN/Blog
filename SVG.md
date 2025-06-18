### PATH
在 SVG (Scalable Vector Graphics) 中，`path` 元素是一个非常强大和灵活的方式来定义图形的轮廓。它允许您创建复杂的形状和线条，这些形状和线条可以是直线、曲线、弧形等。`path` 元素使用一种特殊的语法来定义这些形状，称为 "路径数据"（`d` 属性）。

路径数据 (`d` 属性) 是一系列的命令和参数，命令表示要绘制的线条类型，如直线、曲线等，而参数则定义这些线条的具体位置和形状。常见的路径命令包括：

- `M` (moveto): 移动到一个新位置，不绘制线条。
- `L` (lineto): 从当前位置绘制一条直线到新位置。
- `H` (horizontal lineto) 和 `V` (vertical lineto): 分别绘制水平和垂直线。
- `C` (cubic Bézier curve): 绘制三次贝塞尔曲线。
- `Q` (quadratic Bézier curve): 绘制二次贝塞尔曲线。
- `A` (elliptical Arc): 绘制椭圆弧线。
- `Z` (closepath): 关闭当前的路径，将当前点与起始点连接。

例如，`M 10 10 L 20 20` 表示从点 (10,10) 移动到点 (20,20) 并在这两点之间绘制一条直线。

`path` 元素的灵活性在于它能够通过这些命令组合出几乎任何形状。因此，它在 SVG 图形中扮演了非常重要的角色，尤其是在需要绘制复杂形状时。
### marker marker-end
在 SVG (Scalable Vector Graphics) 中，`marker-end` 属性用于定义一个标记（marker）的外观，这个标记会被放置在一个线条或路径的末端。这个属性通常与 `<path>`, `<line>`, `<polyline>`, 和 `<polygon>` 元素一起使用。

标记（marker）本质上是一个小型的SVG图形，比如箭头或圆点，可以自定义形状。`marker-end` 属性指定的标记会被自动定位到对应元素的末端。这在绘制如箭头指示的图形时特别有用，可以清晰地标示方向或流程。

使用 `marker-end` 时，您通常会首先定义一个 `<marker>` 元素，该元素内部包含您想要作为标记的SVG图形。然后，在使用 `marker-end` 的元素上引用这个 `<marker>` 元素的 ID。例如：

```xml
<svg>
  <defs>
    <marker id="arrow" ...>
      <!-- 在这里定义箭头形状 -->
    </marker>
  </defs>
  <path d="..." marker-end="url(#arrow)" />
</svg>
```

在这个例子中，`<defs>` 元素内定义了一个 `id` 为 `"arrow"` 的 `<marker>` 元素，而 `<path>` 元素通过 `marker-end="url(#arrow)"` 引用了这个标记。这样，路径的末端就会显示出箭头形状。