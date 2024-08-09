### 1. 基础知识
**HTML5 Canvas** 是一个用于在网页上绘制图形的 HTML 元素。通过 JavaScript API，开发者可以在这个画布上绘制各种形状、文本和图像，并进行动画处理。
#### 1.1 `canvas` 元素
要使用 Canvas，你需要在 HTML 中添加一个 `<canvas>` 元素。基本的 HTML 结构如下：
```html
<canvas id="myCanvas" width="500" height="500"></canvas>
```
- `width` 和 `height` 属性定义了画布的大小。
- `id` 用于在 JavaScript 中引用这个画布。
#### 1.2 获取上下文（Context）
Canvas 上的绘制操作是在上下文中进行的。获取 2D 渲染上下文的代码如下：
```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```
上下文 `ctx` 提供了绘制形状、文本和图像的各种方法。
### 2. 常用的 Canvas API
#### 2.1 绘制形状
- **矩形**：
  ```javascript
  ctx.fillRect(x, y, width, height); // 填充矩形
  ctx.strokeRect(x, y, width, height); // 描边矩形
  ```
- **圆形和弧线**：
  ```javascript
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fill(); // 填充
  ctx.stroke(); // 描边
  ```
- **路径**：
  ```javascript
  ctx.beginPath();
  ctx.moveTo(x, y); // 移动到起始点
  ctx.lineTo(x1, y1); // 画线到目标点
  ctx.closePath(); // 闭合路径
  ctx.fill(); // 填充
  ctx.stroke(); // 描边
  ```
#### 2.2 颜色和样式
- **填充样式**：
  ```javascript
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // 设置填充颜色
  ```
- **描边样式**：
  ```javascript
  ctx.strokeStyle = 'blue'; // 设置描边颜色
  ctx.lineWidth = 5; // 设置描边宽度
  ```
#### 2.3 渐变
- **线性渐变**：
  ```javascript
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ```
- **径向渐变**：
  ```javascript
  const radialGradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  radialGradient.addColorStop(0, 'rgba(0, 255, 255, 0.5)');
  radialGradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
  ctx.fillStyle = radialGradient;
  ```
### 3. 动画
#### 3.1 使用 `requestAnimationFrame`
动画通过重复绘制来实现。最常用的方法是使用 `requestAnimationFrame`，可以获得较流畅的动画效果：
```javascript
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
  // 在这里绘制图形...
  requestAnimationFrame(draw); // 请求下一帧
}
draw(); // 开始动画
```
### 4. 实现波浪动画
结合上述知识，您可以实现波浪动画。在代码中，我们：
1. **定义波浪的参数**：高度、周期、速度。
2. **使用三角函数**（如 `Math.sin`）生成音波效果。
3. **绘制路径**，并填充颜色。
4. **每帧更新图形**，实现动画效果。
### 学习资料与资源
- **MDN Web Docs**: [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- **W3Schools**: 提供 HTML5 Canvas 的基础教程和示例。
---
### 开始和结束标志
### 1. 路径绘制
| 操作                           | 开始                      | 结束                      |
|--------------------------------|---------------------------|---------------------------|
| **绘制路径**                  | `ctx.beginPath()`         | `ctx.closePath()` (可选) 或 `ctx.fill()` / `ctx.stroke()` |
| **绘制线段**                  | `ctx.beginPath()`         | `ctx.stroke()`            |
| **绘制直线**                  | `ctx.beginPath()`         | `ctx.stroke()`            |
| **绘制多边形**                | `ctx.beginPath()`         | `ctx.closePath()` + `ctx.fill()` / `ctx.stroke()` |
| **绘制弧**                    | `ctx.beginPath()`         | `ctx.stroke()` / `ctx.fill()` |
### 2. 矩形绘制
| 操作                          | 开始                      | 结束                      |
|-------------------------------|---------------------------|---------------------------|
| **填充矩形** `fillRect`       | `ctx.fillStyle = color;`  | `ctx.fillRect(x, y, width, height);` |
| **描边矩形** `strokeRect`     | `ctx.strokeStyle = color;` | `ctx.strokeRect(x, y, width, height);` |
### 3. 填充和描边样式
| 操作                           | 开始                      | 结束                      |
|--------------------------------|---------------------------|---------------------------|
| **设置填充颜色**              | `ctx.fillStyle = color;`  | 使用 `ctx.fill()`         |
| **设置描边颜色**              | `ctx.strokeStyle = color;` | 使用 `ctx.stroke()`       |
| **设置线宽**                  | `ctx.lineWidth = value;`   | —                         |
| **设置渐变**                  | `ctx.createLinearGradient()` 或 `ctx.createRadialGradient()` | 使用对应的 `fillStyle`  |
### 4. 图像操作
| 操作                           | 开始                       | 结束                      |
|--------------------------------|-----------------------------|---------------------------|
| **绘制图像**                  | `ctx.drawImage(image, x, y)` | —                        |
| **保存和恢复状态**            | `ctx.save()`                | `ctx.restore()`           |
### 5. 变换相关
| 操作                 | 开始                    | 结束              |
| ------------------ | --------------------- | --------------- |
| **设置变换（旋转、缩放、移动）** | `ctx.save()`          | `ctx.restore()` |
| **旋转**             | `ctx.rotate(angle)`   | —               |
| **缩放**             | `ctx.scale(x, y)`     | —               |
| **平移**             | `ctx.translate(x, y)` | —               |
### 6. 渐变和样式设置
| 操作         | 开始                           | 结束                 |
| ---------- | ---------------------------- | ------------------ |
| **创建线性渐变** | `ctx.createLinearGradient()` | 使用 `ctx.fillStyle` |
| **创建径向渐变** | `ctx.createRadialGradient()` | 使用 `ctx.fillStyle` |
### 7. 文字绘制
| 操作                           | 开始                      | 结束                      |
|--------------------------------|---------------------------|---------------------------|
| **设置字体**                  | `ctx.font = "font-size font-family";` | -                   |
| **设置文本对齐**              | `ctx.textAlign = "align";` | -                        |
| **绘制文本**                  | `ctx.fillText(text, x, y)` | —                       |
| **描边文本**                  | `ctx.strokeText(text, x, y)` | —                      |
### 8. 弹性图形绘制
| 操作                          | 开始                      | 结束                      |
|-------------------------------|---------------------------|---------------------------|
| **绘制曲线**                  | `ctx.beginPath()`         | `ctx.stroke()`            |
| **绘制二次贝塞尔曲线**        | `ctx.beginPath()`         | `ctx.stroke()`            |
| **绘制三次贝塞尔曲线**        | `ctx.beginPath()`         | `ctx.stroke()`            |
### 9. 清空和重置
| 操作                          | 开始                      | 结束                      |
|-------------------------------|---------------------------|---------------------------|
| **清空画布**                  | -                         | `ctx.clearRect(0, 0, canvas.width, canvas.height);` |
ctx.transform(scaleX, skewX, skewY, scaleY, translateX, translateY);  
ctx.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);  
ctx.scale(sx, sy);

---
### 渐变
`CanvasRenderingContext2D` 是 HTML5 Canvas API 的一个接口，它提供了一系列方法来在画布上绘制图形、文本和图像。在 `CanvasRenderingContext2D` 中，渐变是一种重要的填充样式，可以用于绘制丰富的视觉效果。以下是对 `CanvasRenderingContext2D` 中渐变的系统性介绍：
### 1. 渐变的类型
在 `CanvasRenderingContext2D` 中，主要有两种类型的渐变：
- **线性渐变（Linear Gradient）**：
  - 颜色平滑过渡沿一条直线。
  - 通过 `createLinearGradient(x0, y0, x1, y1)` 方法创建。
- **径向渐变（Radial Gradient）**：
  - 颜色从中心向外扩展，形成一个圆形渐变。
  - 通过 `createRadialGradient(x0, y0, r0, x1, y1, r1)` 方法创建。
### 2. 创建渐变
#### 创建线性渐变
```javascript
// 创建一个线性渐变对象
const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
// 添加颜色停止
gradient.addColorStop(0, 'red');    // 渐变开始的位置颜色
gradient.addColorStop(1, 'blue');   // 渐变结束的位置颜色
// 使用渐变填充形状
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100); // 绘制填充矩形
```
#### 创建径向渐变
```javascript
// 创建一个径向渐变对象
const radialGradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
// 添加颜色停止
radialGradient.addColorStop(0, 'yellow');  // 中心点颜色
radialGradient.addColorStop(1, 'black');    // 外边缘颜色
// 使用渐变填充形状
ctx.fillStyle = radialGradient;
ctx.arc(150, 150, 100, 0, Math.PI * 2);  // 绘制圆
ctx.fill();
```
### 3. 添加颜色停止
- 每个渐变可以包含多个颜色停止，通过 `addColorStop(position, color)` 方法添加。 
- `position` 的值从 0 到 1，其中 0 表示渐变的起始位置，1 表示结束位置。
- 示例：
```javascript
gradient.addColorStop(0, 'rgba(255, 0, 0, 1)'); // 红色
gradient.addColorStop(0.5, 'rgba(0, 255, 0, 1)'); // 绿色
gradient.addColorStop(1, 'rgba(0, 0, 255, 1)'); // 蓝色
```
