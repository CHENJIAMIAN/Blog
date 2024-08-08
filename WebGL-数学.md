### fbm
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
