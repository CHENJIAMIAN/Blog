### 分形布朗运动 fbm
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
1. **noise/texture**: 用于生成随机噪声或查找纹理，以产生细节、图案或模拟自然现象。如 **fbm**
	1. **Perlin Noise（柏林噪声）**：
	    - 描述：一种渐进且平滑的噪声函数，适用于生成自然现象的纹理，如山脉、云彩等。Perlin噪声具有较好的视觉质量和连续性，常用于程序生成内容。
	2. **Simplex Noise（简单噪声）**：
	    - 描述：由Ken Perlin发明，是一种比传统Perlin噪声更高效且在维度扩展时表现更好的噪声函数。Simplex噪声在生成复杂形状和纹理时通常产生更自然的效果，尤其是在高维空间中。
	3. **White Noise（白噪声）**：
	    - 描述：一种非常基础的噪声类型，包含在所有频率上均匀分布的随机值。这种噪声通常用于添加随机性，创建粗糙表面或偶然事件的模拟。
3. **mix/mixColors**: 在两个值或颜色之间进行线性插值，常用于渐变、过渡或合成效果。
4. **dot**: 计算两个向量的点积，常用于计算光照、角度和纹理坐标的相似度。
5. **normalize**: 将一个向量标准化为单位向量，用于方向和光照计算，确保数值稳定性。
6. **clamp**: 限制值在特定范围内（例如0到1），用于确保颜色和亮度值不超过有效范围。

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
1. **多变量函数**：
   - 在多变量函数中，函数的输出值依赖于多个输入变量。例如，\( f(x, y) \) 是一个以 \( x \) 和 \( y \) 为变量的函数。
2. **偏导数定义**：
   - 计算偏导数时，我们关注的是函数相对于某一个变量的变化。例如，\( f \) 对 \( x \) 的偏导数记作 \( \frac{\partial f}{\partial x} \)。
   - 在计算 \( \frac{\partial f}{\partial x} \) 时，我们将 \( y \) 看作常数，不考虑其变化影響，从而只研究 \( x \) 变化对函数 \( f \) 的影响。
3. **为什么是“偏”**：
   - “偏”字强调了求导过程的局部性：在偏导数的计算中，实际上只关注函数对一个特定变量的“偏向”变化，而忽略了其他变量的影响。

### 常用函数作用 
1. `abs()` -> 对称图形, 如: 绘制圆环
2. `sign` -> 突变的, 有明显分界线的 如: 画圆
3. `mod()` 用来求余数函数, 循环渐变, 如: 配合`smoothstep`绘制格网
4. `ceil() floor()` 向上/下取整, 如: 格子
5. `fract` 取小数，因为它在创建重复的模式、波浪、动画等。如: `fract(uv.x)` 会创建一个水平重复的渐变。 `fract(iTime)` 会创建一个在 0 到 1 之间循环的时间值用来创建动画效果。
6. `min` 裁剪, 取交集
7. `max` 取并集