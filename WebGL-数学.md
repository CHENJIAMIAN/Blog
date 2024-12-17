### fbm (分形布朗运动)
> FBM（Fractal Brownian Motion，分形布朗运动）实际上通常是由其他基础噪声（如 Perlin 噪声或 Simplex 噪声）组合而成的一种噪声生成技术
如云层、岩石、木纹
如山脉、丘陵
如水流、波浪、烟雾
![download](https://github.com/user-attachments/assets/6d0085de-6e70-4da3-b67b-d49eb459712a)
#### 乘以fbm前
![image](https://github.com/user-attachments/assets/16ba709f-fe3b-4010-add7-29c68db8e04f)
#### 乘以fbm后
![image](https://github.com/user-attachments/assets/fdfc64d2-37ed-4aa8-8380-a8990176dbec)
### 着色器中常用的五个函数
1. `noise/texture`: 用于生成随机噪声或查找纹理，以产生细节、图案或模拟自然现象。如 `fbm`
	1. `Perlin Noise（柏林噪声）`：
	    - 描述：一种渐进且平滑的噪声函数，适用于生成自然现象的纹理，如山脉、云彩等。Perlin噪声具有较好的视觉质量和连续性，如: 程序生成内容。
	2. `Simplex Noise（简单噪声）`：
	    - 描述：由Ken Perlin发明，是一种比传统Perlin噪声更高效且在维度扩展时表现更好的噪声函数。Simplex噪声在生成复杂形状和纹理时通常产生更自然的效果，尤其是在高维空间中。
	3. `White Noise（白噪声）`：
	    - 描述：一种非常基础的噪声类型，包含在所有频率上均匀分布的随机值。这种噪声通如: 添加随机性，创建粗糙表面或偶然事件的模拟。
3. `mix/mixColors`: 在两个值或颜色之间进行线性插值，如: 渐变、过渡或合成效果。
4. `dot`: 计算两个向量的点积，如: 计算光照、角度和纹理坐标的相似度。
5. `normalize`: 将一个向量标准化为单位向量，用于方向和光照计算，确保数值稳定性。
6. `clamp`: 限制值在特定范围内（例如0到1），用于确保颜色和亮度值不超过有效范围。

```c
pow() （求x的y次幂）
y = mod(x,0.5); // 返回 x 对 0.5 取模的值
//y = fract(x); // 仅仅返回数的小数部分
//y = ceil(x);  // 向正无穷取整
//y = floor(x); // 向负无穷取整
//y = sign(x);  // 提取 x 的正负号
//y = abs(x);   // 返回 x 的绝对值
//y = clamp(x,0.0,1.0); // 把 x 的值限制在 0.0 到 1.0
//y = min(0.0,x);   // 返回 x 和 0.0 中的较小值
//y = max(0.0,x);   // 返回 x 和 0.0 中的较大值  
```

### `uv.xyx` 的意思是构造一个新的 `vec3` 向量

### 风场化函数 makeColor
```c 
#define FBM_ITERS 9// 分形布朗运动迭代次数

// 逻辑斯谛函数
vec2 logistic(vec2 v) {
    return vec2(16.0 / (1.0 + 10.0 * exp(-0.75 * v.x)),
                1.0 / (1.0 + 10.0 * exp(-1.95 * v.y)));
}

// 高斯函数
vec3 gaussian(float x) {
    vec3 disp = x - vec3(0.3, 0.6, 0.9);
    return exp(-16.0 * disp * disp - 4.0);
}

// 哈希函数
float hash13(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// 3D 噪声函数
float noise3(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(mix(hash13(p + vec3(0,0,0)), 
                       hash13(p + vec3(1,0,0)), f.x),
                   mix(hash13(p + vec3(0,1,0)), 
                       hash13(p + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash13(p + vec3(0,0,1)), 
                       hash13(p + vec3(1,0,1)), f.x),
                   mix(hash13(p + vec3(0,1,1)), 
                       hash13(p + vec3(1,1,1)), f.x), f.y), f.z);
}

// 分形布朗运动 (FBM) 函数
float fbm(vec3 pos) {
    float result = 0.0;
    float amplitude = 1.0;
    for(int i = 0; i < FBM_ITERS; i++) {
        result += noise3(amplitude * pos) / amplitude;
        amplitude *= 2.15926535;
    }
    return result;
}

// 生成颜色的主要函数
vec3 makeColor(vec3 p) {
    float noiseValue = 100.0 * fbm(5.*p);
    return noiseValue * vec3(.5,.5,.5) * gaussian((p.x+p.y+p.z)/3.);
}

 
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 将像素坐标归一化到 [-1, 1] 范围
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // 创建一个随时间变化的 3D 点
    vec3 p = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    
    // 使用 makeColor 函数生成颜色
    vec3 col = makeColor(p);
    
    // 输出颜色
    fragColor = vec4(col, 1.0);
}


```
### 绘制高斯函数
![image](https://github.com/user-attachments/assets/61d6eaff-221b-4b2c-b87d-e1dbc0b5fbbd)
1. 红色 (R) 曲线：对应 `x - 0.3`  
2. 绿色 (G) 曲线：对应 `x - 0.6`  
3. 蓝色 (B) 曲线：对应 `x - 0.9`  
```c
vec3 gaussian(float x) {
    vec3 disp = x - vec3(0.3, 0.6, 0.9);
    return exp(-16.0 * disp * disp - 4.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 将坐标原点移到画布中心，并调整比例
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // 调整 x 的范围，例如 -1 到 1
    float x = uv.x * 2.0;
    
    // 计算高斯函数值
    vec3 color = gaussian(x + 0.5); // 加0.5是为了将函数向左平移，使其更好地居中
    
    // 增加 y 轴的缩放因子
    float yScale = 11.5; // 你可以调整这个值来改变曲线的高度
    
    // 绘制函数图像
    float thickness = 0.003;
    vec3 graphColor = vec3(0.1, 0.1, 0.1);  // 深灰色背景
    
    if (abs(uv.y - color.r * yScale) < thickness) graphColor.r = 1.0;
    if (abs(uv.y - color.g * yScale) < thickness) graphColor.g = 1.0;
    if (abs(uv.y - color.b * yScale) < thickness) graphColor.b = 1.0;
    
    // 绘制坐标轴
    if (abs(uv.x) < thickness || abs(uv.y) < thickness) {
        graphColor = vec3(0.5);  // 灰色坐标轴
    }
    
    // 输出颜色
    fragColor = vec4(graphColor, 1.0);
}

```
### 绘制逻辑斯谛函数 (输出值在 (0, 1) 之间)
![download](https://github.com/user-attachments/assets/ff51e1fd-659a-4582-9ab8-6fe1911bc6ec)
```c
vec2 logistic(vec2 v) {
    return vec2(16.0 / (1.0 + 10.0 * exp(-0.75 * v.x)),
                1.0 / (1.0 + 10.0 * exp(-1.95 * v.y)));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 将坐标原点移到画布中心，并调整比例
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // 调整 x 的范围，例如 -10 到 10
    float x = uv.x * 20.0;
    
    // 计算 logistic 函数值
    vec2 output1 = logistic(vec2(x, 0.0));
    vec2 output2 = logistic(vec2(0.0, x));
    
    // 绘制函数图像
    float thickness = 0.003;
    vec3 graphColor = vec3(0.1);  // 深灰色背景
    
    // 红色曲线表示 x 对第一个输出的影响
    if (abs(uv.y - output1.x / 16.0) < thickness) graphColor.r = 1.0;
    
    // 绿色曲线表示 y 对第二个输出的影响
    if (abs(uv.y - output2.y) < thickness) graphColor.g = 1.0;
    
    // 绘制坐标轴
    if (abs(uv.x) < thickness || abs(uv.y) < thickness) {
        graphColor = vec3(0.5);  // 灰色坐标轴
    }
    
    // 输出颜色
    fragColor = vec4(graphColor, 1.0);
}

```
### 微分 就是切线
### 导数 就是瞬时斜率
#### “偏导数”中的“偏”字是指导数计算时只对函数的一个变量进行求导，而保持其他变量不变
1. `多变量函数`：
   - 在多变量函数中，函数的输出值依赖于多个输入变量。例如，\( f(x, y) \) 是一个以 \( x \) 和 \( y \) 为变量的函数。
2. `偏导数定义`：
   - 计算偏导数时，我们关注的是函数相对于某一个变量的变化。例如，\( f \) 对 \( x \) 的偏导数记作 \( \frac{\partial f}{\partial x} \)。
   - 在计算 \( \frac{\partial f}{\partial x} \) 时，我们将 \( y \) 看作常数，不考虑其变化影響，从而只研究 \( x \) 变化对函数 \( f \) 的影响。
3. `为什么是“偏”`：
   - “偏”字强调了求导过程的局部性：在偏导数的计算中，实际上只关注函数对一个特定变量的“偏向”变化，而忽略了其他变量的影响。

---
### 常用函数作用 
1. `abs()` -> 对称图形, 如: 绘制圆环
2. `sign` -> 突变的, 有明显分界线的 如: 画圆
3. `mod()` 用来求余数函数, 循环渐变, 如: 配合`smoothstep`绘制格网
4. `ceil() floor()` 向上/下取整, 如: 格子
5. `fract` 取小数，因为它在创建重复的模式、波浪、动画等。如: `fract(uv.x)` 会创建一个水平重复的渐变。 `fract(iTime)` 会创建一个在 0 到 1 之间循环的时间值用来创建动画效果。
6. `min` 裁剪, 取交集
7. `max` 取并集, 混合
8. `clamp(x,min,max)` 将数值限制在特定的最小值和最大值之间，防止超出范围导致错误或不希望的结果
9. `mix(color1, color2, blendFactor)`
10. `smoothstep(edge0, edge1, x)` 在边缘处变化是缓慢上升或者缓慢下降, 如: 画圆环
11. `step()` 在边缘处变化是骤增或骤降的
### 三角函数
1. `radians()`：将角度值转换为弧度值，如: 需要弧度值作为参数的三角函数计算，比如旋转变换。
2. `degrees()`：将弧度值转换为角度值，如: 将弧度值结果转换为更直观的角度值。
3. `sin()`：返回一个角度的正弦值，其值在 -1 到 1 之间，如: 创建波浪或周期性动画。
	1. `A*sin(w*x+m)`A改变的是sin函数的值域范围，w改变的是sin函数的周期，m改变边的sin函数的位移范围
4. `cos()`：返回一个角度的余弦值，其值在 -1 到 1 之间，如: 创建波浪、运动轨迹和周期性动画，与 sin() 相似但相位不同。
	1. **画圆**: `vec2(cos(iTime), sin(iTime))`
5. `tan()`：返回一个角度的正切值，值域是负无穷到正无穷，通如: 处理角度和斜率相关的计算，比如绘制特定形状。
	1. `f(x)=Atan(ωx+φ)` 周期是T=π/|ω| ,  (以 x 轴为基线)拉伸到原来的A倍, 沿X轴方向平移φ个单位
6. `asin()`：返回一个值的反正弦值（弧度值），定义域为 [-1, 1]，值域为 [-π/2, π/2]，如: 计算给定正弦值的角度。
	1.  asin(sin(x)) 可以让sin的角**变尖, 折角**
7. `acos()`：返回一个值的反余弦值（弧度值），定义域为 [-1, 1]，值域为 [0, π]，如: 计算给定余弦值的角度。
8. `atan(y/x)` (单参数版本): 返回一个值的反正切值（弧度值），值域为 (-π/2, π/2)，如: 获取指定比值的角度。
	1. 绘制风车 `sin(atan(normalizedCoord.y, normalizedCoord.x) * 5.)`  5个叶片
9. `atan(y, x)` (双参数版本): 避免因除以零导致的问题,，更精确地处理各个象限的角度。 返回 `y / x` 的反正切值（弧度值），并利用 `x` 和 `y` 的符号来判断象限，值域为 (-π, π]，如:  计算该二维向量与 x 轴正方向之间的夹角
### 几何函数
1.   `length()`:  计算向量的长度，常用于计算点到中心的距离或形状的半径。  
2.   `distance()`:  计算两个点之间的距离，常用于判断两个物体之间的距离或创建距离场效果。  
3.   `dot()`:  计算两个向量的点积，常用于计算光照强度或判断两个向量的夹角关系。  
4.   `cross()`:  计算两个向量的叉积，常用于计算法向量或创建旋转效果。  
5.   `normalize()`:  将向量归一化为单位向量，常用于确保向量方向正确且长度为1，用于光照计算或方向控制。  
6.   `asin()`:  计算反正弦值，常用于将sin值转换为角度。  
7.   `reflect()`:  计算反射向量，常用于模拟镜面反射效果。  
8.   `refract()`:  计算折射向量，常用于模拟光线穿过不同介质时的折射效果。
### 指数函数
1.   `pow(x, y)`：计算 x 的 y 次幂，常用于创建指数变化的效果，如光晕、强度衰减、颜色混合等，可以创造出非线性的视觉效果。
	1. pow(f, 小数 ) 用于**只取函数f在x轴上面的部分**
2.   `exp(x)`：计算 e 的 x 次幂，常用于模拟自然界中的指数增长或衰减现象，例如光晕、模糊、阴影等效果。
3.   `exp2(x)`：计算 2 的 x 次幂，功能与 exp 类似，但以 2 为底，常用于一些需要以 2 为基数的计算。
4.   `log(x)`：计算 x 的自然对数（以 e 为底的对数），常用于执行指数运算的逆运算，或进行对数尺度的调整，比如衰减，平滑。
5.   `log2(x)`：计算 x 的以 2 为底的对数，常用于与 exp2 相关的计算，或对以 2 为底的数据进行处理。
6.   `somooth(d1, d2, k)`：结合 `exp` 和 `log`，用于创建平滑过渡的效果，通常用于距离场或其他需要平滑融合的场景，函数内的 `exp` 用于距离衰减，`log` 用于整体平滑。
### 矢量相关函数
1.   `all(bvec x)`:  检查一个布尔向量的所有分量是否都为真，常用于判断一组条件是否全部满足。  
	1. `all(lessThan(distances/*vec3的*/, vec3(0.01)))`
2.   `equal(vec x, vec y)` 或 `equal(ivec x, ivec y)`: 对两个向量的每个分量进行相等性比较，返回一个布尔向量，用于判断两个向量对应分量是否相等。  
3.   `any(bvec x)`: 检查一个布尔向量中是否有任何分量为真，用于判断一组条件中是否至少有一个满足。  
4.   `lessThan(vec x, vec y)` 或 `lessThan(ivec x, ivec y)`: 对两个向量的每个分量进行小于比较，返回一个布尔向量，用于判断第一个向量的每个分量是否小于第二个向量的对应分量。
### 矩阵变换函数
1.   `matrixCompMult(mat x, mat y)`: 对两个矩阵进行逐元素相乘，用于实现非线性矩阵变换或混合效果。  
2.   `rotate2d(float _angle)`: 创建一个 2x2 旋转矩阵，用于将二维坐标围绕原点旋转指定角度。  
3.   `box(in vec2 _st, in vec2 _size)`:  在指定位置和大小绘制一个矩形区域，常用于创建 UI 元素或形状。  
4.   `cross(in vec2 _st, float _size)`:  通过组合两个矩形（一个横向一个纵向）绘制一个十字形状，可用于创建简单的几何图案。  
5.   `recur(vec2 fragCoord)`:  使用循环和旋转、缩放等变换，递归地生成复杂的图形，形成类似分形的效果。
### 随机数
```js
- **`float random(float x)`**: 这个一维随机函数通过对 `x` 的正弦值进行缩放和取小数部分，生成一个伪随机的浮点数值，可用于创建一维的随机效果。
	float random (vec2 uv)
	{
	    return fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453123);
	}

- **`float random(vec2 uv)` (二维，不含时间):** 这个二维随机函数通过对二维坐标 `uv` 进行点积运算，然后对结果进行正弦缩放和取小数部分，生成一个伪随机的浮点数值，可以用于纹理上的随机图案生成。
	float random (vec2 uv)
	{
	    return fract(sin(dot(uv.xy, vec2(12.9898,78.233)+time)) * 43758.5453123);
	}
```
### 噪声
*   **随机数（`random()`）：** 追求的是**完全不可预测性**。
*   **噪声（`noise()`）：**  追求的是**有规律的随机性**。
	*   相同参数的情况下, 每次调用都会返回相同的值，这就是噪声的规律性。
	* 正态分布（或者说类正态分布）意味着中间的值出现可能性更高
#### Perlin 噪声算法
1.  **网格划分：** 将空间（1D、2D 或 3D）划分成一个个网格。
2.  **随机梯度：**  在每个网格的顶点上，生成一个随机的梯度向量（你可以把它想象成一个箭头，指向一个随机的方向）。
3.  **插值：** 对于任意一个坐标，找到它周围网格的顶点，并计算该坐标到各个顶点的距离。然后，根据这些距离和顶点的梯度向量，计算出一个平滑过渡的值。

- 这个过程就像你在山地地图上，根据周边的山顶高度以及山坡坡度，来推算当前位置的高度一样。

*   **水面波纹：** 利用 `noise()` 控制 UV 坐标的偏移，模拟水波的起伏。
*   **闪电效果：** 用 `fbm()`（多个频率的噪声叠加）生成闪电的形状和亮度的不规则变化。
*   **三维云雾：** 通过使用`snoise`来生成三维的噪声，然后生成云雾的纹理

#### FBM (Fractal Brownian Motion) (分形布朗运动)
1. 一种**将多个不同频率的噪声叠加起来**的技术。它模拟了自然界中的分形结构，能够产生更丰富、更复杂的效果。
2. 想象一下，如果你只用一个频率的噪声，你只能得到一些简单的起伏。但是，如果你把多个不同频率、不同幅度的噪声叠加在一起，就像是大小不一的山脉叠加在一起，就能形成更真实、更细节的地形。
3. `float res= a * noise(b * x); `这个公式中，`a` 控制振幅，`b` 控制频率。通过调整这两个参数，你可以改变噪声的形态。
### 复数
是具有特殊运算规则的二维对象