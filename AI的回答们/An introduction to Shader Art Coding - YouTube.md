---

## title: An introduction to Shader Art Coding - YouTube created: 2025-08-29 source: Cherry Studio tags:

## 🤖 qwen-3-235b-a22b-instruct-2507 | 0304357c-30a5-4067-b405-a9f9f7a4157e

## 一、引言：数字艺术与着色器（Shaders）的魅力

1.  **数字艺术的震撼力**
    

-   欣赏数字艺术时，常会好奇其背后的创作方式。
    
-   数字艺术不仅限于传统绘图软件，也可以完全通过“代码”实现。
    

2.  **着色器（Shader）的地位**
    

-   着色器是数字时代的“画笔”，能将空白屏幕实时转化为惊艳动画。
    
-   被广泛应用于：
    
-   视频游戏中的视觉特效
    
-   电影中的高端渲染
    
-   创意编程（Creative Coding）
    

3.  **着色器艺术的核心特点**
    

-   仅使用代码进行2D/3D图像和动画渲染。
    
-   唯一限制是创作者的想象力。
    
-   结合**数学函数 + 算法**操控像素，形成视觉效果。
    
-   本质是**艺术与科学的融合**：创造力与精确性并存。
    

---

## 二、什么是着色器（What are Shaders?）

1.  **基本定义**
    

-   着色器是运行在\*\*显卡（GPU）\*\*上的小程序。
    
-   任务：为屏幕上每个像素计算最终颜色。
    

2.  **工作原理**
    

-   输入：当前像素的位置坐标（如 `fragCoord`）。
    
-   输出：该像素的颜色值（如 `fragColor`）。
    
-   使用语言：**OpenGL Shading Language (GLSL)**。
    

3.  **GLSL 中的颜色表示**
    

-   颜色以四维向量（vec4）表示：`[R, G, B, A]`
    
-   R/G/B：红绿蓝通道，取值范围 \[0, 1\]（归一化）
    
-   A：Alpha 透明度通道
    

4.  **并行计算能力**
    

-   每个像素独立执行着色器程序。
    
-   GPU 可同时处理数百万像素，实现实时渲染。
    

5.  **应用维度**
    

-   强项不仅是3D场景，也擅长2D图形和动画。
    
-   2D着色器性能要求较低，适合入门和实验。
    
-   高级开发者甚至可在着色器中实现**4D渲染**。
    

6.  **学习体验与分享动机**
    

-   作者接触着色器约一年，持续创作有趣且富有探索性的动画。
    
-   乐于学习新技术，并创作对应Shader。
    
-   分享目的：推广Shader艺术，回应观众对教程的需求。
    

---

## 三、开发平台介绍：Shadertoy

1.  **平台优势**
    

-   网址：[shadertoy.com](https://www.shadertoy.com)
    
-   在线编写、即时预览、一键分享。
    
-   汇聚大量创意着色器作品，是学习与灵感宝库。
    

2.  **新手起点**
    

-   创建新项目时自动生成一个基础模板。
    
-   可从零开始构建自己的着色器。
    

3.  **建议前置知识**
    

-   推荐具备基础编程理解。
    
-   即使无代码经验，视频中也会详细讲解每一步（含数学原理）。
    
-   所有可视化演示也由代码生成，体现“以代码作画”的理念。
    

---

## 四、基础结构：mainImage 函数与输入输出参数

1.  **主函数原型**
    

```glsl
   void mainImage(out vec4 fragColor, in vec2 fragCoord)
```

-   `fragCoord`：输入参数，当前像素的屏幕坐标（x, y），单位为像素。
    
-   `fragColor`：输出参数，返回该像素的颜色（R, G, B, A）。
    

2.  **数据类型说明**
    
    -   `vec2`：二维向量，如 `fragCoord`。
        
    -   `vec4`：四维向量，用于颜色（RGB + Alpha）。
        
3.  **颜色赋值语法**
    
    -   使用 `vec4()` 构造颜色：
        
        ```glsl
        fragColor = vec4(0.0, 0.0, 0.0, 1.0); // 黑色
        fragColor = vec4(1.0, 1.0, 1.0, 1.0); // 白色
        ```
        
    -   注意：Shadertoy 中 Alpha 无效，通常设为 1。
        
4.  **归一化色彩空间**
    
    -   所有通道值范围 \[0, 1\]，超过部分会被裁剪显示为白色。
        
5.  **常量色板效果**
    
    -   将相同颜色赋给所有像素 → 整屏统一色。
        
    -   如全黑、全白或任意组合（如红色 `vec4(1,0,0,1)`）。
        

---

## 五、工具推荐：ShaderToy Unofficial Plugin

-   浏览器插件（Chrome 扩展）
    
-   功能亮点：
    
    -   内嵌颜色选择器，可快速将颜色转换为 GLSL 向量格式。
        
    -   提升编码效率，便于调试与调色。
        

---

## 六、核心坐标处理：从 fragCoord 到 UV 坐标

### 1\. fragCoord 的局限性

-   坐标范围依赖于画布分辨率（如 1600×900，则 x∈\[0,1600\], y∈\[0,900\]）。
    
-   直接使用不便于跨设备或可伸缩设计。
    

### 2\. 目标：标准化 UV 坐标

-   将坐标映射到标准化空间，使其独立于分辨率。
    
-   理想空间为 **裁剪空间（clip space）**，范围 \[-1, 1\]。
    
-   中心点对齐 (0, 0)，四周为 ±1。
    

### 3\. 步骤详解

#### （1）归一化到 \[0, 1\] 区间

-   利用全局常量 `iResolution`：vec3 类型，表示当前画布尺寸 `[width, height, depth]`
    
-   分离宽高使用 `.xy` 操作（称为 swizzling）
    

```glsl
vec2 uv = fragCoord / iResolution.xy;
```

> 示例：在 1600×900 画布中，右下角变为 (1,1)，左上角 (0,0)

#### （2）Swizzling（分量重组技巧）

-   GLSL 特殊语法，用于快速提取或重组向量分量。
    
-   示例：
    
    -   `iResolution.xy` → 取前两个分量组成 vec2
        
    -   `iResolution.zy` → 取 z 和 y，顺序反转
        
-   向量运算自动组件对应操作（逐元素运算）：
    
    ```glsl
    vec2 a = vec2(2,4);
    vec2 b = vec2(1,2);
    a / b; // 结果为 (2/1, 4/2) = (2,2)
    ```
    

#### （3）平移到 \[-0.5, 0.5\] 并缩放至 \[-1, 1\]

-   当前 `uv` 范围是 \[0,1\]，中心点位于 (0.5, 0.5)
    
-   需要将其转为中心在原点 (0,0)
    

```glsl
uv = (uv - 0.5) * 2.0;
```

等价于：

```glsl
uv = uv * 2.0 - 1.0;
```

---

## 七、视觉调试：利用颜色通道可视化 UV

### 1\. 显示 U（X）坐标 → 红色渐变

```glsl
fragColor = vec4(uv.x, 0.0, 0.0, 1.0);
```

-   从左到右，红色由暗变亮，验证 x 方向单调递增。
    

### 2\. 显示 V（Y）坐标 → 绿色渐变

```glsl
fragColor = vec4(0.0, uv.y, 0.0, 1.0);
```

-   从下到上，绿色逐渐增强。
    

### 3\. 同时显示 UV → RGB 混合

```glsl
fragColor = vec4(uv, 0.0, 1.0);
```

-   因为 `uv` 是 vec2，在 vec4 构造中自动补为 (uv.x, uv.y, 0.0, 1.0)
    
-   左下：黑（0,0）；右上：黄（1,1）；中间区域表现为红绿混合的暖色调。
    

---

## 八、修正宽高比失真（Aspect Ratio Fix）

### 问题发现

-   若画布非正方形（如 16:9），直接使用 UV 会导致圆形变成椭圆。
    
-   原因：x,y 坐标缩放比例不同，空间畸变。
    

### 解决方案

-   缩放 x 分量，使其适应实际宽高比（width / height）
    

```glsl
float aspect = iResolution.x / iResolution.y;
uv.x *= aspect;
```

### 综合变换（一行代码实现）

```glsl
vec2 uv = (fragCoord / iResolution.xy - 0.5) * 2.0;
uv.x *= iResolution.x / iResolution.y;
```

可进一步简化为：

```glsl
vec2 uv = (-1.0 + 2.0 * fragCoord.xy / iResolution.xy) * vec2(iResolution.x / iResolution.y, 1.0);
```

---

## 九、距离函数入门：length() 与 SDF（有符号距离场）

### 1\. length() 函数

-   计算向量长度（欧几里得距离）：
    
    ```glsl
    float d = length(uv); // 距离原点 (0,0)
    ```
    
-   显示该值：形成从中心向外扩散的圆形灰度渐变。
    

### 2\. 构建圆形 SDF（Signed Distance Function）

-   公式：`d = length(uv) - radius`
    
-   示例中 radius = 0.5 → `d = length(uv) - 0.5`
    

#### SDF 的三大区域含义：

| 区域  | 距离值 | 说明  |
| --- | --- | --- |
| 圆外  | \> 0 | 正值，表示距离边界多远 |
| 圆上  | \= 0 | 正好在轮廓线上 |
| 圆内  | < 0 | 负值，表示在形状内部深度 |

> 因此：`length(uv) - 0.5` 是**半径为 0.5 的圆的 SDF**

### 3\. 视觉验证

-   显示 `d` 值：中间黑色（负数），边缘白色（正数）
    
-   注意：GLSL 中负色值被截断为 0，所以圆内全黑。
    

### 4\. 使用 abs() 可视化绝对距离

```glsl
d = abs(length(uv) - 0.5);
```

-   显示围绕圆边界的双侧增长距离。
    
-   效果：明亮圆环，两侧亮度增加。
    

---

## 十、颜色控制函数：step() 与 smoothstep()

### 1\. step(threshold, value)

-   阶梯函数，生成二值输出：
    
    ```glsl
    result = (value < threshold) ? 0.0 : 1.0;
    ```
    
-   应用于 SDF：
    
    ```glsl
    float ring = step(0.1, d); // d > 0.1 → 白；否则黑
    ```
    
-   结果：清晰的环形轮廓。
    

### 2\. smoothstep(edge0, edge1, value)

-   平滑插值版本的 step 函数。
    
-   行为：
    
    -   value ≤ edge0 → 输出 0
        
    -   value ≥ edge1 → 输出 1
        
    -   中间区间 → 平滑 Hermite 插值（S形曲线）
        
-   优势：可控制过渡带宽和柔和度
    
-   应用示例：
    
    ```glsl
    float edge = smoothstep(0.0, 0.1, d);
    ```
    

---

## 十一、动态动画引入：sin() 函数与 iTime 变量

### 1\. 利用 sin() 实现周期性变化

```glsl
d = sin(d * 8.0); // 拉伸空间频率
d /= 8.0; // 缩放颜色强度，避免溢出
```

-   sin() 输出 \[-1,1\]，可用于生成振荡环纹。
    

### 2\. 引入时间变量 iTime

-   全局变量：`iTime`，表示自动画开始以来经过的秒数（float）
    
-   动态偏移距离输入：
    
    ```glsl
    d = sin(d * 8.0 + iTime);
    ```
    
-   效果：同心圆环持续向中心收缩（类似涟漪动画）
    

> 原理：时间推动相位偏移，视觉表现为运动波前。

---

## 十二、风格化视觉：反函数（1/x）与发光效果

### 1\. 使用 `1.0 / d` 实现“霓虹光晕”

-   反比例函数特性：
    
    -   输入越小（接近零）→ 输出极大
        
    -   输入越大 → 输出趋近零
        
-   适合强调靠近轮廓的区域，形成中心发光效果
    

### 2\. 问题：值域超出 \[0,1\]，全屏变白

-   原因：`d` 在 \[0,1\] 区间，`1/d` 会 → ∞（尤其在 d≈0 处）
    
-   解决方法：**缩放输入**，避免趋近零
    

```glsl
d = abs(sin(d * 8.0 + iTime)); // 确保正数
float glow = 0.03 / d; // 缩放因子控制亮度
```

-   或者调整：
    
    ```glsl
    float glow = 0.01 / (d + 0.01); // 加偏移防除零
    ```
    

### 3\. 结果

-   圆环处最亮，向外迅速衰减 → 模拟自发光材料或霓虹灯效果
    

---

## 十三、着色技巧：引入动态调色板（Palette Function）

### 1\. 手动调色

```glsl
vec3 color = vec3(0.6, 0.2, 1.0); // 自定义紫色
fragColor = vec4(color * glow, 1.0);
```

-   glow 控制明暗，color 控制色调
    
-   注意：可设 >1.0 的分量值提升亮度（HDR 风格）
    

### 2\. 使用 trigonometric palette（三角函数调色板）

-   典型公式来源：参考网站 [Inigo Quilez 的文章](https://www.iquilezles.org/www/articles/palettes/palettes.htm)
    
-   函数原型（内置）：
    
    ```glsl
    vec3 palette(float t) {
        vec3 a = vec3(0.5); // 参数a
        vec3 b = vec3(0.5);
        vec3 c = vec3(1.0);
        vec3 d = vec3(0.0, 0.33, 0.67);
        return a + b * cos(6.28318 * (c * t + d));
    }
    ```
    
    -   `t`：输入时间或距离参数
        
    -   `a,b,c,d`：四组 vec3 控制颜色：
        
        -   a：基色
            
        -   b：振幅（色彩强度）
            
        -   c：频率（色彩变化速度）
            
        -   d：相位（起始偏移）
            

### 3\. 工具支持

-   网站：[https://grabcad.com](https://grabcad.com/) 或 Palette 生成器
    
-   提供图形界面自定义调色板，导出参数用于代码
    

### 4\. 动态色彩

-   将 `iTime` 加入 palette 输入：
    
    ```glsl
    vec3 color = palette(length(uv0) + iTime * 0.5);
    ```
    
-   效果：颜色随时间流动变化，增强视觉层次感
    

---

## 十四、空间重复：fract() 函数的应用

### 1\. fract(x) 的作用

-   返回数字的小数部分：`fract(3.14) = 0.14`
    
-   输出始终 ∈ \[0, 1)
    

### 2\. 创建重复纹理

```glsl
uv = fract(uv * 2.0); // 将空间复制为4份
```

-   原 \[0,1\] 变成两段 \[0,1\] → 实现平铺
    
-   配合前面的 UV 转换需注意坐标空间归一化丢失问题
    

### 3\. 修复重复后坐标偏移

-   重复后的 uv ∈ \[0,1\]，不再是 \[-1,1\] 的剪裁空间
    
-   修正：
    
    ```glsl
    uv = fract(uv * 2.0 + 0.5) - 0.5; // 先平移，再取小数，再居中
    ```
    
    或更完整：
    
    ```glsl
    uv = (fract(uv * 2.0 + 0.5) - 0.5) * 2.0;
    ```
    

### 4\. 简化为一行

```glsl
uv = fract(uv * 2.0 + 0.5) * 2.0 - 1.0;
```

---

## 十五、保留原始坐标用于调色

### 1\. 引入 uv0 存储初始 UV

```glsl
vec2 uv0 = uv; // 在空间重复前保存原坐标
```

### 2\. 调色使用全局距离

```glsl
vec3 color = palette(length(uv0) + iTime);
```

-   避免调色随局部重复变化，保持整体一致性。
    

---

## 十六、构建复杂图案：循环迭代（For Loop）

### 1\. 引入 finalColor 累积输出

```glsl
vec3 finalColor = vec3(0.0);
finalColor += color * glow;
fragColor = vec4(finalColor, 1.0);
```

### 2\. 将着色逻辑放入 for 循环

```glsl
for (int i = 0; i < 3; i++) {
 // 重复执行空间变换和着色
}
```

### 3\. 效果分析

-   每次迭代：
    
    -   对空间进行 fract 缩放重复
        
    -   添加一层颜色与发光
        
-   累积叠加 → 形成**自相似结构**，呈现**分形（Fractal）视觉**
    

### 4\. 引入索引变量 I（浮点版）

```glsl
#define I float(i)
```

-   在循环中加入随层变化的控制量（如频率、相位）
    

---

## 十七、打破对称性与增强变化

### 1\. 修改 fract 缩放因子

-   原：`uv *= 2.0` → 完美对称平铺
    
-   改：`uv *= 1.95` 或 `2.1`
    
    -   打破重复匹配，增加错位感
        
    -   提升艺术张力
        

### 2\. 使用 exp() 函数调节局部距离

```glsl
d *= exp(-length(uv0) * 2.0);
```

-   `exp(-x)` 特性：x=0 时为1，随x增大指数衰减
    
-   作用：**越远离中心，局部圆环越密集或越弱**
    
-   替代 `1/x`，避免无穷大，更平滑可控
    

---

## 十八、颜色迭代差异化

-   在每次循环中，向 palette 输入添加 `I * timeFactor`
    

```glsl
vec3 color = palette(length(uv0) + iTime + I * 0.2);
```

-   每一层颜色略有偏移 → 增强层次感与动态变化
    

---

## 十九、最终优化：对比度提升（pow() 函数）

### 1\. 使用 pow(x, exponent)

-   当 x ∈ \[0,1\]，exponent >1 时：
    
    -   强化暗部（更黑）
        
    -   抑制亮部增长
        
    -   提高整体对比
        

### 2\. 推荐值

-   `pow(glow, 1.2)` 到 `1.5` 足以增强视觉冲击
    
-   避免使用 `pow(glow, 2)`，可能导致过曝或断裂
    

### 3\. 应用位置

```glsl
glow = pow(glow, 1.3);
fragColor = vec4(finalColor * glow, 1.0);
```

---

## 二十、总结：创作哲学与未来展望

1.  **无限可能性**
    

-   GLSL 提供丰富的内置函数（sin, cos, exp, pow, fract, length, step...）
    
-   可组合出无穷无尽的视觉样式。
    

2.  **创作建议**
    

-   鼓励实验与迭代：修改参数、函数、叠加方式。
    
-   从简单开始：先理解每个函数的行为。
    

3.  **艺术与技术结合**
    

-   优秀的 Shader 艺术 ≠ 复杂代码。
    
-   而是在**理解数学规律的基础上，赋予情感与美感**。
    

4.  **收尾智慧**
    

-   有时“停止”比“继续”更重要。
    
-   欣赏成果，反思过程，为下一次创作留白。
    

---

## 二十一、附加资源（作者提及）

1.  **SDF 合集参考**
    

-   网站：[https://www.iquilezles.org](https://www.iquilezles.org)
    
-   文章：[2D Distance Functions](https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm)
    

2.  **调色板生成器工具**
    

-   基于 Inigo Quilez 的 palette 函数
    
-   图形化调节参数并生成代码
    

3.  **GraphToy**
    

-   网站：[https://www.shadertoy.com/view/XdSGDh](https://www.shadertoy.com/view/XdSGDh)
    
-   专用于可视化 GLSL 函数图像（如 sin, exp, smoothstep）
    

4.  **浏览器插件**
    

-   ShaderToy Unofficial Plugin（Chrome 扩展）
    
-   支持颜色拾取、代码片段管理等
    

---

## 二十二、关键技术与函数总结表

| 函数/变量 | 用途说明 |
| --- | --- |
| `fragCoord` | 当前像素坐标（像素单位） |
| `iResolution` | 画布分辨率（vec3） |
| `vec2`, `vec3`, `vec4` | GLSL 向量类型 |
| `swizzling` (.xy, .rg, .zy) | 快速构造新向量 |
| `length(v)` | 向量模长，用于距离计算 |
| `step(a,b)` | 二值化阈值判断 |
| `smoothstep(a,b,x)` | 平滑过渡函数 |
| `sin(x)`, `cos(x)` | 周期振荡，创造波纹 |
| `iTime` | 内建时间变量（秒） |
| `fract(x)` | 取小数部分，实现重复 |
| `abs(x)` | 取绝对值，消除符号 |
| `exp(-x)` | 指数衰减，平滑控制亮度分布 |
| `pow(x, e)` | 调整对比度（e>1 加强暗部） |
| `for` 循环 | 实现多层次叠加与分形效果 |

---

## 二十三、代码演化路径回顾（从黑屏到分形动画）

1.  初始化 → 全黑屏
    
2.  UV 坐标构建 → 渐变可视化
    
3.  居中 + 修正宽高比
    
4.  length(uv) → 圆形距离场
    
5.  sin() → 波纹动态
    
6.  1/x 或 exp → 发光效果
    
7.  fract() → 空间平铺
    
8.  palette() → 动态色彩
    
9.  for 循环 + 层叠 → 分形结构
    
10.  pow() → 对比度增强 → 完成