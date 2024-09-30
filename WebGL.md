[OpenGL ES 2.0.25 (November 2, 2010)](https://registry.khronos.org/OpenGL/specs/es/2.0/es_full_spec_2.0.pdf#nameddest=section-3.5.2)
	1. [WebGL Specification](https://registry.khronos.org/webgl/specs/latest/1.0/)
	2. [WebGL 2.0 规范](https://registry.khronos.org/webgl/specs/latest/2.0/)
[学习了fem-d/webGL: for webGL learning](https://github.com/fem-d/webGL)
```javascript
离线/实时渲染 //29fps/30fps
,/打断点在gl.drawArrays打,它通常是绘制前的最后一步/
    在绘制之前，需要使用 gl.drawXXX 系列函数来指定要绘制的图形和绘制的方式，例如 gl.drawArrays 和 gl.drawElements。这些函数通常是绘制前的最后一个方法，因为它们会实际执行绘制操作。
```

#### 四元数 Quaternions
1. p' = qpq⁻¹
2. 旋转后的向量p' = 旋转四元数q * 原始向量p * 旋转四元数q的逆
	1. q = w + v
		1.  旋转四元数q 表示一个绕着**单位向量 u** 旋转 θ 角度的旋转 = 实部w + 虚部v
	2. 原始向量p：要进行旋转的三维向量
	3. q⁻¹是 q 的逆四元数 = w - v
3. 推导结论公式: **p' = 2vp + p**
	1. 旋转后的向量 p' = 2 * 虚部v * 原始向量p + 原始向量p
- 四元数是一种数学工具，用于表示和计算3D旋转。与旋转矩阵相比，四元数具有一些优点，例如避免万向节锁（Gimbal Lock）问题和更高的计算效率。
- 四元数可以表示为一个四元组（w, x, y, z），其中w是实部，(x, y, z)是虚部。它们可以用来表示旋转轴和旋转角度。
- 在3D旋转中，可以使用四元数进行插值（如球面插值）和组合（如连续旋转的叠加）操作。
##### 示例：
假设我们要将向量 p = (1, 0, 0) 绕着 z 轴旋转 90 度。
- 旋转轴单位向量 u = (0, 0, 1)
- 旋转角度 θ = 90 度，则 θ/2 = 45 度
**计算旋转四元数**
```js
w = cos(θ/2) = cos(45°) = √2/2 //为什么是 θ/2？ 这涉及到四元数的一个特性："双倍覆盖"（double cover）。简而言之，正负两个四元数（实部相反）表示着三维空间中同一个的旋转。在进行 q * p * q⁻¹这样的乘积时，θ 实际上被用到了两次，所以需要在构造四元数 q 的时候就使用 θ/2 。
v = u * sin(θ/2) = (0, 0, 1) * sin(45°) = (√2/2, √2/2, 0)

q = w + v
所以，旋转四元数 q 为：
q = √2/2 + (√2/2, √2/2, 0)

**计算旋转后的向量**
p' = qpq⁻¹
= (√2/2 + (√2/2, √2/2, 0))   (0, 1, 0, 0)   (√2/2 - (√2/2, √2/2, 0))⁻¹
= (0, √2/2, -√2/2, 0)
```
因此，p 绕着 z 轴旋转 90 度后的向量为：
```js
p' = (0, √2/2, -√2/2, 0)
```
**总结：**
通过旋转四元数 q = √2/2 + (√2/2, √2/2, 0)，我们可以将向量 p = (1, 0, 0) 绕着 z 轴旋转 90 度，得到旋转后的向量 p' = (0, √2/2, -√2/2, 0)。
### 渲染管线(重点)
![learnwebgl brown37 net_the_big_picture_3d_rendering html)|925](https://github.com/user-attachments/assets/78d55f98-78bb-43c7-863b-cebea5874b62)


**顶点着色器是有多少顶点，运行了多少次，而片元着色器则是，生成多少片元（像素），运行多少次**
```javascript
三维图形渲染管线（Graphics pipeline）就是将三维场景转化为一幅二维图像的过程。 常说有4个阶段（实际不止）:    
    1.应用阶段（Application stage）就是写代码定义阶段 //负责将摄像机位置、光照和模型的图元信息输出到几何阶段。渲染管线的状态（如深度测试状态、模板测试状态等）会被设置
    2.几何阶段（Geometry stage）可以写着色器代码
        1顶点着色器阶段（The Vertex Stage）：处理每个顶点的数据。包括模型视点变换、顶点着色、投影、裁剪、屏幕映射等。 
            1模型视点变换（将摄像机放置于坐标原点）
            2顶点着色（确定模型上顶点处材质的光照效果）
            3投影（三维转二维，包括正交投影和透视投影）
            4裁剪和屏幕映射（将坐标映射到对应的屏幕坐标系上）
        2曲面细分阶段（Tessellation Stage）//(可选)：将图元分割成若干较小的三角形，以更好地描述曲面形状。        
        3几何着色器阶段（Geometry Shader）//(可选)，用来生成新的图形。例如，可以生成多个三角形组成的三角网格，或者生成一个平面来遮盖阴影。
        4变换反馈阶段（Transform Feedback）//(可选)，用来捕获顶点着色器处理后的数据，并存储到缓冲区中。       
    3.栅格化阶段（Rasterizer stage）指将经过投影变换后的图元转换为像素的过程
    4.片段处理阶段（Fragment stage）对每一个像素执行片段着色器,  利用片段着色器对像素进行光照、材质(如反光度)贴图、纹理(图片)贴图等处理，输出到帧缓冲区中
        1深度测试和模板测试阶段（Depth and Stencil Test stage）：在这个阶段，系统根据当前像素的深度值和模板值来决定是否绘制当前像素。是否应该与之前的片段进行混合。
        2α混合/透明度混合阶段（Blend stage）：在这个阶段，系统根据当前像素的颜色和已经绘制到帧缓冲区中的像素的颜色进行混合，并将结果输出到帧缓冲区中。这个阶段可以用来实现不同类型的转换效果，比如视差映射，阴影，模糊等。
        3绘制阶段（Draw stage）：在这个阶段，系统根据当前的状态和参数，使用已经绑定的帧缓冲区和渲染缓冲区，绘制出最终的图形。这个阶段可以用来实现不同类型的图形渲染，比如点、线、三角形等。
    //
    5.Output 阶段（The Output Stage）将帧缓存的图像输出到屏幕或者保存成图片文件
//Compute 阶段（The Compute Stage）是图形渲染管线的一部分，但并不是属于传统的三维图形渲染管线的一部分。它可以在任意时刻被调用，用于执行大量并行计算任务。Compute 阶段允许在渲染时间之外使用 GPU 进行计算。
渲染管线是指渲染一个 3D 场景的流程。在渲染管线中，顶点着色器会被用来处理顶点的数据，片段着色器会用来处理像素的颜色和其他属性。在这个过程中，3D 图形会被转换成二维像素，并被渲染到屏幕上。
    渲染管线包括以下几个步骤：
        几何处理：将 3D 图形转换成适合屏幕显示的 2D 图形。
        顶点着色：为顶点添加颜色和其他属性。
        光栅化：将几何图形转换成像素。
        片段着色：为像素添加颜色和其他属性。
        合成：将像素添加到帧缓冲区，完成最终图像的渲染。//framebuffer是WebGL渲染的终点。当你看屏幕时，其他就是在看framebuffer中的内容。
```
### 介绍
```javascript
WebGL 2.0是基于OpenGL ES 3.0的Web图形渲染API，用于在Web浏览器中进行高性能图形渲染。WebGL 2.0包含了大部分OpenGL ES 3.0的功能，并添加了一些WebGL特定的功能和改进，以便更好地适应Web平台。WebGL 2.0支持更高的渲染质量、更快的性能和更广泛的硬件支持，同时还支持一些新的渲染技术，如几何着色器、实例化渲染和可编程渲染管线。由于其高性能和跨平台特性，WebGL 2.0已成为Web游戏和应用程序开发的重要工具。因此，可以说WebGL 2.0是建立在OpenGL ES 3.0之上的Web图形渲染API。
2007年，Vladimir Vukicevic， 一个塞尔维亚裔美国软件工程师开始编写一个名为Canvas 3D的OpenGL原型，以适用于即将到来的canvas元素上。2011年3月，他的工作指引着Kronos Group（一个OpenGL背后的非盈利组织）创建了WebGL：一个允许浏览器使用GPU的规范。
不同于OpenGL:
    WebGL并没有提供单独操作单个点进行渲染的API
webgl的核心:
    WebGL 可以有多个着色器程序（Program）
    类C语言GLSL编写//着色语言编写着色器
        顶点着色器 //顶点坐标信息 和 颜色值 被GPU的可编程顶点处理器(Programmable Vertex Processor)处理
            转换为缩放坐标系,保存到gl_Position中 //gl_PointSize是缩放距离的直径
            vec4(0.1, 0.0,0.0,1.0) //x,y,z,w是 4 个分量,其中 xyz分别表示点在三维空间中的坐标，w 分量通常是 1。在 WebGL 中，因为矩阵变换中用到了四维矩阵，所以在 3D 空间中每个点都有四维坐标
        片段着色器 //绘制像素颜色          被GPU的可编程片元处理器(Programmable Fragment Processor)处理
            保存到gl_FragColor中
        //两个着色器 link（链接）到一个 program（着色程序）
       调用 gl.drawArrays 或 gl.drawElements 运行一个着色方法对，通知GPU执行着色器代码 
           gl.drawArrays可操作帧缓冲区，可调用多次，复用之前的结果//执行gl.drawArrays(gl.TRIANGLES,0,36);语句的时候，渲染管线会生成立方体图像的像素值，像素值存储在帧缓冲区的颜色缓冲区中，你可以把帧缓冲区当成一个RGB像素值仓库， 每执行一次gl.drawArrays(gl.TRIANGLES,0,36);生成一组RGB值，这些数据会被送进帧缓冲去中，默认不会覆盖前面的RGB数据
           gl.drawArrays可以多次调用，绘制部分顶点，这也就是说不透明的物体和半透明或透明的可以分开绘制
    最小示例:https://github1s.com/HDongjian/visualization-games/blob/HEAD/02-WebGL/1-2-%E7%9D%80%E8%89%B2%E5%99%A8%E7%BB%98%E5%88%B6%E5%9B%BE%E5%BD%A2.html#L19-L61
    多点绘制
        attribute vec4 a_变量名;//attribute是传入的只读变量
        uniform mat4 u_变量名;//uniform是传入的可变量
        in 和 out 关键字用于在着色器之间传递数据,/在 GLSL 1.30 及更高版本中，varying 关键字已被废弃，取而代之的是 in 和 out 关键字/
        构建一个缓冲区来存传入的值
          
    一个片元可能包含的信息有：
        颜色信息：每个片元都有一个颜色值，这个颜色值可以由顶点着色器或片段着色器计算得出。
        纹理信息：如果在 3D 图形的渲染过程中使用了纹理贴图，那么每个片元都会对应一个纹理坐标，这个纹理坐标可以由顶点着色器计算得出。
        深度信息：每个片元都有一个深度值，这个深度值可以由顶点着色器计算得出。深度值用于深度测试，即在渲染过程中判断这个片元是否应该被渲染出来，如果这个片元的深度值小于深度缓存中相应位置的深度值，则这个片元会被渲染出来。
    一个顶点可以包含的信息有：
        位置信息，例如三维坐标（x、y、z）。
        法向量信息，例如表示顶点表面的法向量。
        纹理坐标信息，例如用于在纹理贴图上映射顶点的纹理坐标。
        其他信息，例如用于骨骼动画的骨骼权重信息。
    在WebGL中，主要的测试有:
        裁剪测试（Scissor Test）: 用于裁剪像素，只保留在裁剪矩形内的像素。
        深度测试（Depth Test）: 用于测试当前像素的深度值与帧缓冲区中的像素的深度值的大小关系，如果当前像素的深度值较小，则通过测试，否则不通过。
        透明度测试（Alpha Test）: 用于测试当前像素的透明度（Alpha 值）是否达到了指定阈值，如果达到了则通过测试，否则不通过。
        模板测试（Stencil Test）: 用于测试当前像素的模板值（Stencil 值）与帧缓冲区中的像素的模板值的大小关系，如果满足指定条件则通过测试，否则不通过。
 
缓冲区
    //最常见对象的三种数据类型,共9种
        gl.STATIC_DRAW：数据不会或几乎不会改变。缓存区的数据存储在GPU显存中，可以加快渲染速度。
        gl.DYNAMIC_DRAW：数据会被改变很多。缓存区的数据存储在GPU显存中，但是会慢一点。
        gl.STREAM_DRAW：数据每次绘制时都会改变,每次使用时重新分配内存。缓存区的数据会被保存在 CPU 内存中，因此不能加速渲染。  
    //有缓冲区可以让你把数据存储在GPU的内存中，而无缓冲区则是在 CPU 的内存中
    //在渲染前预先上传到缓冲区中，然后在渲染时从缓冲区中读取  
    1顶点缓冲区（Vertex buffer）：保存顶点数据，如顶点坐标、顶点颜色等
    2索引缓冲区（Index buffer）：保存顶点索引，用于描述图形的顶点的顺序
    3帧缓冲区（Frame buffer）：保存渲染结果，包括颜色缓冲区、深度缓冲区、模板缓冲区等。          
        //用于执行许多图形学任务，例如深度测试、阴影计算和其他特效
        //帧缓冲区的内容可以被用来作为渲染结果呈现在屏幕上          
        常见的帧缓冲区颜色附件有：
            1. 颜色缓冲区（Color buffer）
	            保存渲染结果的颜色,如'颜色纹理(或称普通纹理,普通是相对深度而言)','图像纹理'    
            2. 模板缓冲区（Stencil buffer）
	            保存渲染结果的模板信息，用于模板测试用于控制哪些像素会被绘制到帧缓冲区中。它通过使用一个模板缓冲区来实现。
	            在模板测试中，如果像素的模板值（在模板缓冲区中的值）与设定的模板测试条件匹配，则像素会被绘制。否则，像素将被丢弃
            3. 深度缓冲区（Depth buffer）
                对数深度缓冲区
	                - 设置logarithmicDepthBuffer为true
                    - 对数深度映射利用了对数函数的特点，它在数值上可以更有效地表示近处的深度变化，而在远处则变化得更慢，这样可以在深度缓冲区中更均匀地分配精度。
                线性深度缓冲区
    //
    VAO (Vertex Array Object)：    VAO 表示一个顶点数组对象，它储存了顶点属性数组的配置信息。使用 VAO 可以很方便地管理大量的顶点数据。const vao = gl.createVertexArray();gl.bindVertexArray(vao);
    VBO (Vertex Buffer Object)：    VBO 表示一个顶点缓冲对象，它用于存储顶点数据的缓冲区。VBO 可以让你将顶点数据储存在显卡的内存中，这样就可以在渲染时直接从显卡内存中读取数据，而不必从 CPU 内存中拷贝数据。const vbo = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    FBO (Framebuffer Object)：    FBO 表示一个帧缓冲对象，它可以用于渲染到纹理。FBO 是一种常用的技术，可以用于实现多种效果，如屏幕后处理效果、渲染到纹理、多视口渲染等。const fbo = gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    PBO (Pixel Buffer Object)：    PBO 表示一个像素缓冲对象，它可以用于异步地读取像素数据。PBO 可以让你将像素数据从 GPU 拷贝到 CPU，而不必等待渲染完成。这对于实时视频处理、图像处理等应用非常有用。const pbo = gl.createBuffer();gl.bindBuffer(gl.PIXEL_PACK_BUFFER, pbo);
offscreen离屏渲染//效率比较低，因为它需要额外的内存和带宽，将图形渲染到内存中的帧缓冲区，而不是直接渲染到屏幕上，
    用于选中物体//将每个物体都渲染成不同的颜色，并且将场景渲染到offscreen framebuffer中。接着，当用户点击屏幕时，我们使用offscreen framebuffer中的数据获取点击坐标对应的颜色
    //可以用于实现复杂的渲染效果，如阴影贴图、混合图像、视差贴图等
    //常用于解决图形较复杂时，屏幕绘制帧率下降的问题。 
    例如//在游戏中，当场景中的物体数量较多时，可以使用离屏渲染来提升渲染效率。通常，我们会将场景先渲染到纹理中，然后将纹理绑定到一个平面上，最后将平面绘制到屏幕上。这样做的好处是，渲染复杂的场景时只需要绘制一个平面，而不是绘制所有的物体，这样就可以大大提升渲染效率。
UV//坐标用来表示纹理图片上的哪些像素要被渲染到3D模型的顶点上，从而让3D模型上的顶点获得纹理。uv坐标0-1代表在像素坐标的相对位置
    左上 → 右下 //0,0 → 1,1 中心是[0.5, 0.5]
    /OpenGL使用S和T表示，DirectX使用U和V。因此你可能会发现有人使用“UVs”来代表texture coordinates，使用“UV Mapping”来表示三维重建（unwrapping）。/
    为了使纹理在mipmap中被使用,纹理的宽高必须是2的幂次,否则在NEAREST和LINEAR过滤器中可以不用
        
存在形式
    uniform 全局变量
    varying 仅用来从 顶点着色器 -> 片断着色器 中传输变量, WebGL会将同名的可变量传输,要在片段着色器中使用顶点着色器中的信息，就必须要把这些信息从顶点着色器中传递给片段着色器。在顶点着色器中，使用varying关键字声明变量，然后在片段着色器中使用相同的变量名来获取传递过来的信息。
    //mipmap 为了加快渲染速度和减少图像锯齿，贴图被处理成由一系列被预先计算和优化过的图片组成的文件,在远处看时使用较低分辨率的纹理,这样的贴图被称为MIP map
类型
    sampler2D //texture的类型一般是它
    为什么shader uniforms被叫做samplers而不是textures？
        一个texture仅仅是存储在GPU中的图片数据，
        而sampler包含所有的纹理信息，如过滤和包裹。
方法    
    颜色 = texture2D(texture,vUv) //从纹理中提取颜色信息, 颜色是一个vec4变量
    vec4(1) 等同于 vec4(1, 1, 1, 1)
normalize:
    标准化向量可以使得向量的长度一致，方便进行比较和计算,那么这个向量的长度会影响运算结果。'如果向量没有被单位化，这通常不是我们想要的，因为我们通常更关心向量的方向而不是其长度'
    在许多计算机图形学的应用中，如计算光照、变换矩阵等，都需要对向量进行单位化，即将向量的长度调整为1，从而得到一个只包含方向信息的向量。
径向点光源 //指光线从一个点向外辐射，且在所有方向上都具有相同的光强的光源。这种光源通常被用于照亮球形或圆柱形物体，因为它们可以提供均匀的照明效果。在三维计算机图形学中，径向点光源也常用于计算阴影和光照效果。
openlayer缩放原理, 改变u_resolution //u_resolution 是画布尺寸，即代表画布宽高
    uniform float u_zoom; // 一个浮点数，表示由滚轮改变的值,从 html ui 传递的缩放值
    uniform vec2 u_mousePos; //鼠标的X和Y坐标
Transform Feedback是WebGL的一个功能，它允许我们在渲染过程中捕捉顶点着色器输出的结果，对其进行处理和修改，然后将结果传递回GPU进行绘制或存储。
    Transform Feedback可以帮助我们实现一些高级渲染技术，如粒子系统、布料模拟等，通过捕捉每个顶点的运动轨迹，我们可以更加精确地模拟物理效果。
```
### 矩阵
```javascript
矩阵运算
    在WebGL中矩阵操作的顺序和它们作用于vertices的顺序相反，矩阵相乘的顺序很重要TR != RT
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, position);
        mat4.rotateX(mvMatrix, rotation[0]*Math.PI/180);
        mat4.rotateY(mvMatrix, rotation[1]*Math.PI/180);
        mat4.rotateZ(mvMatrix, rotation[2]*Math.PI/180);
        的逆矩阵是
         mat4.identity(mvMatrix);
        mat4.rotateX(mvMatrix, rotation[0]*Math.PI/180);
        mat4.rotateY(mvMatrix, rotation[1]*Math.PI/180);
        mat4.rotateZ(mvMatrix, rotation[2]*Math.PI/180);
        mat4.translate(mvMatrix, position);
模型矩阵///描述三维物体的变换，包括平移、旋转、缩放等
模型逆矩阵//将世界坐标转换回物体坐标, 他使得我们可以计算变换的“反向”或相反变换功能,所以，如果向量v用矩阵M来进行变换，接着用M的逆矩阵进行变换，将会得到原来的向量
```
### MVP矩阵运算
```js
MVP矩阵是一种常用的图形变换方式，用于将 3D 模型变换到 2D 视口中。它通常由三个矩阵组成，分别是模型矩阵（Model）、观察矩阵（View）、投影矩阵（Projection）。
    1.模型矩阵//用于将模型变换到世界坐标系中。描述模型的变换的，比如旋转、缩放、平移。
    2.观察矩阵//用于将世界坐标系变换到观察坐标系中，即从观察者的角度观察模型。描述相机的变换的，比如位置、朝向。
	    **我们把世界坐标系的原点移动到相机身上，然后，让这个坐标系的z轴朝着摄像机的方向不就行了吗？**
		**相当于，把虚拟3D世界的所有物体再次旋转、移动一次，保证摄像机在零点并朝向z轴就行了。**
        camera matrix实际上它只是MVMatrix的逆矩阵
            tracking 旋转相机
            orbiting 旋转世界
    3.投影矩阵//用于将观察坐标系变换到裁剪坐标系中，即将 3D 坐标转换为 2D 坐标。描述投影方式的，比如透视投影、正交投影。
            Perspective 透视投影   //是近大远小       
            orthogonal  正交投影
    
   mat4 modelMatrix = ...; // 创建模型矩阵
   mat4 viewMatrix = ...; // 创建视图矩阵
   mat4 projectionMatrix = ...; // 创建投影矩阵    
   mat4 mvpMatrix = projectionMatrix * viewMatrix * modelMatrix; // 计算MVP矩阵
```
#### 解释一下mvp矩阵，以让小学生也能听懂的举例
MVP矩阵是3D图形学中的一个重要概念，代表Model-View-Projection的缩写，它是一个4x4的矩阵，由三个矩阵相乘得到：Model矩阵、View矩阵和Projection矩阵。

*   Model矩阵代表物体的本地坐标系，它将物体从其本地坐标系变换到世界坐标系中。它可以用来缩放、旋转或平移物体。
*   View矩阵代表相机的位置和方向，它将物体从世界坐标系变换到相机坐标系中，它决定了我们如何观察场景。
*   Projection矩阵代表投影方式，它将物体从相机坐标系变换到裁剪坐标系中，它决定了场景如何投影到屏幕上。

例如，我们可以想象一个人在一个房间里看着一只狗。这里的狗是我们的模型，人的眼睛是相机，房间是世界。在这种情况下，Model矩阵用于变换狗的大小和位置，View矩阵用于确定人的位置和朝向，Projection矩阵用于确定人的视野范围。

最后，MVP矩阵将这三个变换合并在一起，得到了物体从本地坐标系到屏幕坐标系的变换。在渲染管线的过程中，MVP矩阵将被应用于每个顶点，将其从物体本地坐标系变换到屏幕坐标系，从而呈现出3D图形。
##### 用伪代码举个实例
以下是一个使用 MVP 矩阵进行坐标变换的简单伪代码示例：

```javascript
// 定义模型坐标系中的三角形顶点坐标
const triangle = [  { x: 0.0, y: 1.0, z: 0.0 },  { x: -1.0, y: -1.0, z: 0.0 },  { x: 1.0, y: -1.0, z: 0.0 }];

// 定义模型矩阵，将三角形绕 z 轴旋转 45 度
const modelMatrix = rotateZ(45.0);

// 定义视图矩阵，将相机位置设置为 (0, 0, 3)，指向原点
const viewMatrix = lookAt([0, 0, 3], [0, 0, 0], [0, 1, 0]);

// 定义投影矩阵，使用透视投影方式
const projectionMatrix = perspective(45, canvas.width / canvas.height, 0.1, 100.0);

// 计算 MVP 矩阵，将三个矩阵相乘
const mvpMatrix = multiplyMatrices(projectionMatrix, multiplyMatrices(viewMatrix, modelMatrix));

// 将三角形顶点坐标从模型坐标系变换到裁剪空间坐标系
const transformedTriangle = triangle.map(vertex => {
  const transformedVertex = transformVector(mvpMatrix, [vertex.x, vertex.y, vertex.z, 1.0]);
  const w = transformedVertex[3];
  return { x: transformedVertex[0] / w, y: transformedVertex[1] / w, z: transformedVertex[2] / w };
});

// 渲染三角形
renderTriangle(transformedTriangle);

```

在这个示例中，我们使用三个矩阵来定义 MVP 矩阵：模型矩阵、视图矩阵和投影矩阵。模型矩阵定义了模型坐标系到世界坐标系的变换，视图矩阵定义了世界坐标系到相机坐标系的变换，投影矩阵定义了相机坐标系到裁剪空间坐标系的变换。将这三个矩阵相乘，就得到了 MVP 矩阵，可以用它将模型坐标系中的顶点坐标变换到裁剪空间坐标系中。
### 方法大全
```javascript
gl.activeTexture(gl.TEXTURE0);//激活纹理单元0，因为WebGL支持多个纹理单元
	可以在一个场景中使用多个纹理对象,一次draw中操作多纹理，这也被叫做多纹理渲染（multitexturing）
gl.bindTexture(gl.TEXTURE_2D, myTexture);//绑定myTexture纹理对象到2D纹理目标（gl.TEXTURE_2D），将myTexture纹理对象赋值给目标，以便后面可以对这个纹理对象进行操作。
	myTexture = gl.createTexture();
    myTexture.image = new Image();
gl.attachShader(program, shader)//将着色器对象附加到程序对象上。
gl.bindBufferBase(target, index, buffer)//将缓存区绑定到绑定点。绘制立方体时使用UBO中保存的矩阵变量。这样就可以避免在每一帧都将矩阵变量从JavaScript代码传递到着色器中    
    第二个参数 index 可以取的值取决于缓冲区的类型，例如：
        对于顶点缓冲区，绑定点的值只能是 0。如gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, buffer);
        对于索引缓冲区，绑定点的值只能是 0。
        对于常量缓冲区，绑定点的值可以是 0 到 gl.MAX_UNIFORM_BUFFER_BINDINGS - 1 之间的整数（包括端点值）。
            在 WebGL1 中这个值是 36，在 WebGL2 中这个值是 36-1000 之间的整数。
    实现高效地将一组常量数据传递到着色器中，并且在着色器中使用这些常量数据来完成渲染操作. 这种方式对于在渲染过程中需要使用大量常量数据的情况是非常有效的, 比如说在做3D渲染的时候, 我们需要高效地传递观察矩阵和投影矩阵等常量数据, 并且在着色器中使用这些常量数据来计算像素颜色.
        在顶点着色器读取常量缓冲区,：
            //接收传入在绑定点0的常量
            layout(std140, binding = 0) uniform Matrices {//内存布局是遵循std140规则的, 这个std140布局规则指定了各种类型的内存对齐方式, 并且这个布局规则在不同平台和不同硬件上都是相同的.
              mat4 model;
              mat4 view;
              mat4 projection;
            } matrices;//定义了一个名为Matrices的UBO，其中包含三个mat4类型的变量，分别为model、view和projection。这些变量可以在着色器中直接使用。
            //使用常量对象
            in vec3 position;
            void main() {
              gl_Position = matrices.projection * matrices.view * matrices.model * vec4(position, 1.0);
            }
        其中, binding=1 是绑定点的值
gl.bindFramebuffer(target, framebuffer)//将帧缓存区对象绑定到目标上。
    //为了创建一个framebuffer，我们至少需要用于保存颜色和深度信息
    //使用一个纹理来存储颜色
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    //使用renderbuffer来存储深度信息
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
        var renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(target, renderbuffer)//将渲染缓存区绑定到目标上。        
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);//设置渲染缓冲区的存储。

gl.bindVertexArray(array)//绑定顶点数组对象。
多个物体重叠创建透明物体需要：开启α混合并选择混合函数,/从后往前的渲染物体/
gl.blendEquation(gl.FUNC_SUBTRACT) //让中间的加号变减号, Color output = S * blendFunc设置的因子1 - D * blendFunc设置的因子2，它使得后绘制的像素颜色值减去先绘制的像素颜色值，然后再与混合颜色相混合。

,/最终颜色=(源颜色×源因子)+(目标颜色×目标因子)/
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);//	最终颜色=(源颜色×源Alpha)+(目标颜色×1)
	

//决定RGB通道和α通道如何混合
gl.blendFuncSeparate(
    gl.SRC_ALPHA,             // srcRGB: 使用 Alpha 通道作为颜色的混合因子
    gl.ONE_MINUS_SRC_ALPHA,   // dstRGB: 使用 1 减去 Alpha 通道作为颜色的混合因子
    gl.ONE,                   // srcAlpha: 使用 1 作为 Alpha 的混合因子
    gl.ZERO                   // dstAlpha: 使用 0 作为 Alpha 的混合因子
);
	//最终RGB=(源颜色RGB×源Alpha)+(目标颜色RGB×(1−源Alpha))
	//最终Alpha=(源Alpha×1)+(目标Alpha×0)
	
gl.blitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter)//将帧缓存区的一部分拷贝到另一个帧缓存区的一部分。

gl.bufferData(target, sizeOrData, usage)//创建并初始化缓存区对象的数据存储。
- **缓冲类型**
    - 顶点缓冲
    - 索引缓冲
    - 其他缓冲类型
- **缓冲使用方式**
    - `GL_STATIC_DRAW`
    - `GL_DYNAMIC_DRAW`
    - `GL_STREAM_DRAW`
gl.bufferSubData(target, offset, data)//更新缓存区对象的数据存储。

gl.checkFramebufferStatus(target)//检查帧缓存区是否完整。
gl.clear(gl.COLOR_BUFFER_BIT)//清除颜色、深度和模板缓存。告诉gl.clear要清成什么色
    gl.clearColor(red, green, blue, alpha)//设置用于清除颜色缓冲区的颜色, 是告诉gl.clear要清成什么色
    gl.clearDepth//设置深度缓冲区的清除值
    gl.clearStencil//设置模板缓冲区的清除值
gl.clearBufferfv(buffer, drawbuffer, values)//将单个浮点型值写入指定的缓存区。
gl.clearBufferuiv(buffer, drawbuffer, values)//将单个无符号整数值写入指定的缓存区。

gl.compileShader//将 GLSL 着色器编译为可执行的着色器
gl.copyBufferSubData//将源缓冲区的数据复制到目标缓冲区的指定位置
gl.createBuffer//创建一个缓冲区对象
gl.createFramebuffer//创建一个帧缓冲区对象
gl.createProgram//创建一个着色器程序对象
gl.createShader//创建一个着色器对象
gl.createTexture//创建一个纹理对象
gl.createVertexArray//创建一个顶点数组对象

单个物体创建透明物体//如果显示背景，把前景挖掉；如果显示前景，把背景挖掉。如果都有，那么全都渲染了。
gl.cullFace//设置剔除面的方向,要先gl.enable(gl.FACE_CULLING);
	// 启用面剔除
	gl.enable(gl.CULL_FACE);
	
	// 设置剔除的面
	gl.cullFace(gl.BACK); // 剔除背面
	// 或者
	gl.cullFace(gl.FRONT); // 剔除前面
	// 或者
	gl.cullFace(gl.FRONT_AND_BACK); // 剔除前面和背面

	### 面的定义
		在 WebGL 中，面是通过其顶点的顺序定义的。默认情况下，顺时针（CW）顺序的顶点定义为前面，而逆时针（CCW）顺序的顶点定义为背面。
		gl.frontFace(gl.CCW); // 设置逆时针为前面
		gl.frontFace(gl.CW); // 设置顺时针为前面

	- 在某些情况下，剔除背面可能会导致物体的一部分不可见，特别是在复杂的几何体或'透明物体'的情况下。

gl.deleteBuffer//删除 WebGL 缓存区对象。
gl.deleteFramebuffer//删除由 gl.createFramebuffer 创建的帧缓冲区对象。
gl.deleteRenderbuffer//删除由 gl.createRenderbuffer 创建的渲染缓冲区对象。
gl.deleteShader//删除由 gl.createShader 创建的着色器对象。
gl.deleteTexture//删除由 gl.createTexture 创建的纹理对象。
gl.deleteVertexArray//删除由 gl.createVertexArray 创建的顶点数组对象。



gl.disable//关闭指定的功能。
//不是绘制的最后一个方法。在WebGL中，绘制的最后一个方法通常是gl.drawArrays或gl.drawElements
gl.drawBuffers//指定要写入渲染缓冲区的 帧缓冲的颜色附件(颜色缓冲区)。这个函数需要使用多输出帧缓冲，如果你使用的是单输出帧缓冲，则不能使用这个函数。
/最终步骤，在绘制之前，需要使用 gl.drawXXX 系列函数来指定要绘制的图形和绘制的方式，通知GPU执行着色器代码:/
//drawArrays和drawElements只能使用被激活的数组们（enabled arrays）。
    gl.drawArrays//按照vertex data buffers按顺序创建对象。
    gl.drawElements//使用IBO来处理vertex data buffers并创建对象,
	gl.drawElements(gl.TRIANGLES, 要绘制的顶点数, gl.UNSIGNED_SHORT, 0);
		//gl.drawElements(mode, count, type, offset); 
	     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);//drawElements从这个buffer拿顶点索引
        //例如，给VBO顶点数组们分组编号为点1234，IBO声明以点3点1点4组成一个三角形 。 eg：Vertex array=[`0,0,  10,10,  20,0,  30,10]; Index array = [3,1,4,..其他三角形]
        //如果在创建图形时有大量重复的点，使用drawArrays是不明智的。重复的vertex信息会引发重复的vertex shader调用从而导致性能下降。
        //不同mode的演示：https://codepen.io/571574085/pen/wvxNvvq
            gl.POINTS: 画单独的点。
		线
            gl.LINE_STRIP: 多段线
            gl.LINE_LOOP: 闭环
            gl.LINES: 一条
		三角形
            gl.TRIANGLE_STRIP 邻接三角形
            gl.TRIANGLE_FAN 扇形
            gl.TRIANGLES 独立三角形
    gl.drawElementsInstanced//方法与gl.drawElements()方法相似，但是它会多次执行渲染操作, 绘制多个实例，每个实例都是由索引缓冲区描述的。
gl.enable//启用或禁用 WebGL 渲染状态功能。
gl.enableVertexAttribArray//启用或禁用着色器属性数组。这样做的原因是，使用顶点属性数组可能会消耗大量的 CPU 资源，如果不使用它们，可以减少不必要的开销。
gl.framebufferRenderbuffer//将渲染缓冲区绑定到帧缓冲区的指定目标。
gl.framebufferTexture2D//将纹理绑定到帧缓冲区的指定目标。
gl.generateMipmap(gl.TEXTURE_2D);//自动为每个纹理创建mipmapgenerateMipmap必须在texImage2D之后使用，并且会自动创建完整的mipmap链
gl.getAttribLocation//返回给定着色器程序中指定的属性的位置。
gl.getBufferSubData//将缓冲区的一部分拷贝到由给定的偏移量和长度指定的数组中。
gl.getExtension//返回指定扩展的 WebGLRenderingContext 对象。
gl.getParameter//获取当前 WebGL 状态的值。
gl.getProgramInfoLog//这个函数用于获取着色器程序的错误信息或警告信息。
gl.getProgramParameter//这个函数用于获取指定的着色器程序的一些参数。
gl.getShaderInfoLog//这个函数用于获取编译着色器时的错误信息或警告信息。
gl.getShaderParameter//获取着色器的参数。
gl.getUniformBlockIndex//获取统一块的索引。
gl.getUniformLocation//获取统一变量的位置。
gl.isFramebuffer//判断对象是否是帧缓冲区。
gl.linkProgram//链接着色器程序。
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//设置为1翻转图片，如果设置为0不翻转图片。默认翻转
gl.polygonOffset//设置多边形偏移。
	gl.enable(gl.POLYGON_OFFSET_FILL);
	const material = new THREE.MeshBasicMaterial({
	    polygonOffset: true,
	    polygonOffsetFactor: 1, // 偏移因子
	    polygonOffsetUnits: 1   // 偏移单位
	});
gl.readBuffer//设置读入缓冲区。
gl.readPixels//读取像素。
gl.shaderSource//设置着色器源代码。




gl.texImage2D(gl.TEXTURE_2D, 1, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mipmapImage);//定义纹理图像
//如果你想手动提供mipmaps，你需要在调用texImage2D时主动传入一个非0的参数作为函数的第二个参数。
    立体地图创建方式和纹理一样，唯一不同的就是纹理对象：
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, positiveXImage);
            TEXTURE_CUBE_MAP
            TEXTURE_CUBE_MAP_POSITIVE_X
            TEXTURE_CUBE_MAP_NEGATIVE_X
            TEXTURE_CUBE_MAP_POSITIVE_Y
            TEXTURE_CUBE_MAP_NEGATIVE_Y
            TEXTURE_CUBE_MAP_POSITIVE_Z
            TEXTURE_CUBE_MAP_NEGATIVE_Z
gl.texSubImage2D;// texImage2D() 函数会创建一个新的纹理或者完全替换现有纹理的图像数据，而 texSubImage2D() 函数则可以对纹理中的某一个 2D 图像级别子图的某一个矩形区域进行更新，比如可以实现动态更新纹理的效果。因此，在一些需要动态更新的 Web3D 应用中，texSubImage2D() 函数可以发挥出很大的作用。
gl.compressedTexImage2D;// 用于在2D纹理图像中压缩像素数据
gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, 512, 512, 0);// 将当前绑定的帧缓冲区中的一部分像素数据复制到纹理对象中，纹理对象类型为2D，纹理对象的内部格式为RGBA格式，复制的像素区域起始坐标为(0, 0)，大小为512*512。
gl.copyTexSubImage2D;// 将部分现有纹理图像复制到另一个矩形中
gl.hint(gl.GENERATE_MIPMAP_HINT, 提示级别);//提示webgl优化性能
	// 定义可用的提示类型，来告诉WebGL实现如何处理特定的渲染操作
	`gl.GENERATE_MIPMAP_HINT` 表示我们想要设置的是 mipmap 层次结构的提示级别
	提示级别可以设置为以下值之一：
		- gl.FASTEST：表示可以忽略质量进行最快的处理
		- gl.NICEST：表示需要最好的质量，可能速度较慢
		- gl.DONT_CARE：表示对速度和质量没有特殊要求，WebGL 应该自己决定
gl.texStorage2D//分配二维纹理的存储。
gl.uniformBlockBinding//绑定统一块到一个绑定点。
gl.useProgram//使用 WebGL 程序对象。
gl.viewport//设置视口。定义了绘制在 canvas 上的图像的区域
gl.drawingBufferHeight;// 屏幕的高度，也即可视区域的高度（以像素计）
gl.drawingBufferWidth;// 屏幕的宽度，也即可视区域的宽度（以像素计）
```
### 设置参数
```javascript
gl.bindBuffer 是 WebGL 中的一个方法，用于将缓冲区绑定到 WebGL 的指定目标上。
    //gl.bindBuffer 方法通常在绘制图形前调用，以在 WebGL 中使用缓冲区数据。绑定缓冲区后，可以使用其他 WebGL 方法来配置缓冲区的数据，例如 gl.bufferData 和 gl.bufferSubData。
    //它有两个参数：
    target: 缓冲区的目标。可以是以下值之一：
        gl.ARRAY_BUFFER: 表示顶点属性数据的缓冲区。
        gl.ELEMENT_ARRAY_BUFFER: 表示索引数据的缓冲区。
        //gl.COPY_READ_BUFFER: 可读取的缓冲区副本。
        //gl.COPY_WRITE_BUFFER: 可写入的缓冲区副本。
        //gl.PIXEL_PACK_BUFFER: 用于从纹理图像中获取像素数据的缓冲区。
        //gl.PIXEL_UNPACK_BUFFER: 用于向纹理图像中存储像素数据的缓冲区。
        //gl.TRANSFORM_FEEDBACK_BUFFER: 用于转换反馈的缓冲区。
        //gl.UNIFORM_BUFFER: 用于存储 uniform 变量的缓冲区。
    buffer: 要绑定的缓冲区对象。
设置变量
    gl.uniform1f：设置单个浮点型uniform变量。
    uniform4f: 将4个浮点数值分别赋值给uniform变量
    gl.uniform1i(Program.uSampler, 0) 设置单个整型uniform变量。
    uniform1ui：设置单个无符号整型uniform变量。
    uniform1uiv：设置单个无符号整型uniform变量的值（使用数组）。
    uniform3fv：设置3维浮点型uniform变量的值（使用数组）。
    gl.niform4fv：设置4维浮点型uniform变量的值（使用数组）。
将矩阵变量传给着色器
    gl.uniformMatrix3fv 用于将一个3x3矩阵数组 传递给shader program。
    gl.uniformMatrix4fv 用于将一个4x4矩阵数组 传递给shader program。
    gl.uniformMatrix4f  用于将一个4x4矩阵值   传递给shader program。
将向量变量传给着色器
    gl.uniform3fv(location是向量变量在着色器中的位置，v是一个包含向量数据的数组)
设置顶点//配置在绘制函数gl.drawArrays()时候，如何提取数据
    vertexAttribIPointer 函数用于设置'整数型'的顶点属性。它接受以下参数：
        index：着色器程序中的 attribute 变量的位置,通过 gl.getAttribLocation(shaderProgram, "aVertexPosition")获得
        size：每个顶点属性的分量数，必须为 1、2、3 或 4。
        type：数据类型，可以是 gl.BYTE、gl.UNSIGNED_BYTE、gl.SHORT、gl.UNSIGNED_SHORT 或 gl.INT。
        normalized：布尔值，指定当被访问时，固定点数据值是否应当被归一化。            
            //例如，假设您有一个顶点属性，它的值范围为 [0,255]，并且 normalizeFlag 设置为 true。当 WebGL 渲染这个顶点时，它会将属性值除以 255，将它转换为 [0,1] 范围内的浮点数。
        stride：指定连续顶点属性间的偏移量。
        offset：顶点属性数组中的偏移量。
    vertexAttribPointer 函数用于设置'浮点型'的顶点属性。它接受以下参数：//告诉WebGL如何解析 顶点属性数据 (从gl.bindBuffer绑的缓冲区来)
        type：数据类型，可以是 gl.FLOAT 或 gl.HALF_FLOAT。
```
### 渲染多个实例
```js
// 创建 WebGL 上下文和着色器程序等
// 创建顶点缓冲区（顶点数据）
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW);
// 创建实例缓冲区（实例数据）
const instanceBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
gl.bufferData(gl.ARRAY_BUFFER, instancesData, gl.STATIC_DRAW);
// 设置顶点属性指针
const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
// 设置实例属性指针
const instanceAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_instanceData');
gl.enableVertexAttribArray(instanceAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
gl.vertexAttribPointer(instanceAttributeLocation, 4, gl.FLOAT, false, 0, 0);
gl.vertexAttribDivisor(instanceAttributeLocation, 1); // 设置实例化属性的更新频率,设置顶点属性的递增因子
	//它接受两个参数：第一个参数是顶点属性的索引，第二个参数是递增因子。
	//例如，如果你有一个顶点属性数组，包含了 3 个元素（例如，一个位置和两个纹理坐标）
    //并且你将顶点属性的递增因子设置为 3，那么在渲染下一个实例时，顶点属性数组将会跳过 3 个元素，
    //以便让下一个实例使用。
// 绘制调用
gl.drawArraysInstanced(gl.TRIANGLES, 0, numVertices, numInstances);
//启用了多路绘制（使用 gl.drawElementsInstanced 和 gl.drawArraysInstanced 函数）
  
```
### 纹理
gl.texParameteri   //设置纹理参数。
#### 包裹模式
1. CLAMP_TO_EDGE表示超出纹理范围的部分会被截断并用纹理边界上的颜色进行填充。
2. REPEAT表示纹理会以平铺的方式重复出现。
3. MIRRORED_REPEAT表示纹理会镜像重复出现
```js
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Wrap S和Wrap T是两个纹理坐标轴，分别对应x方向和y方向
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);    
```
#### 纹理过滤器(图片采样方式)
用于控制纹理在渲染过程中的采样方式
###### MIN Filter
缩小物体到很小时,纹理缩小的方式
	1. Nearest：使用最近的纹理像素作为采样点。这是最简单和最快速的方式，但可能会导致图片过于锐利或出现锯齿。
	2. Linear：使用相邻的纹理像素的加权平均值作为采样点。这可以产生更平滑的结果，但可能会产生模糊或失真。
	3. Mipmap(一种技术)：使用预先生成的纹理金字塔(一种数据组织形式)来进行采样，以提供不同层次的细节级别。这可以提供更加逼真的结果。
```js
NEAREST_MIPMAP_NEAREST(最快但质量最低)//这种过滤方式会选取最接近屏幕上纹理的mipmap，并且使用NEAREST来实现。
LINEAR__MIPMAP_NEAREST//这种过滤方式会选取最接近屏幕上纹理的mipmap，并且使用LINEAR来实现。
NEAREST_MIPMAP_LINEAR//这种过滤方式会选取两个最接近的mipmap，并且使用NEAREST来实现，最后的颜色会是两种样本的平均值。
LINEAR_MIPMAP_LINEARS(最慢但质量最高,8成选它)//这种过滤方式会选取两个最接近的mipmap，并且使用LINEAR来实现，最后的颜色会是两种样本的平均值。这也叫做三线性过滤(trilinear filtering)。
```
###### MAG Filter
放大物体到很大时,纹理拉伸采样方法
```js
//Nearest或Linear
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
```
### 阴影映射
1. 阴影映射是一种常用的实现阴影效果的技术。它使用两个主要组件：光源的投影和深度贴图。
2. 在阴影映射中，首先需要从光源的透视角度创建一个深度贴图（也称为阴影贴图）。深度贴图记录了从光源视角下每个像素的深度值。
3. 在渲染阴影时，首先将场景从摄像机的视角渲染到帧缓冲区，同时使用光源的透视矩阵将场景渲染到深度贴图中。
4. 然后，使用深度贴图对每个像素进行采样，并与当前像素的深度值进行比较。如果当前像素的深度值大于深度贴图中对应位置的深度值，那么当前像素就位于阴影中。
5. 根据阴影的存在与否，可以调整像素的颜色或透明度，从而实现基础的阴影效果。
### 根据program获取shader源码
gl.getShaderSource(gl.getAttachedShaders(program)[0])
gl.getShaderSource(gl.getAttachedShaders(program)[1])
### 如何绑定多个bufferData
在将模型数据上传到缓冲区对象时，您有两种选择。
- 为每种数据创建一个独立的缓冲区对象，正如之前的课程中所示。每个顶点着色器属性变量都与一个唯一的缓冲区对象相连接。
	- 你已经看过几个关于第一个选项的例子。对于只有少数模型的简单场景，这种方法是足够的。
- 为模型的所有数据创建一个统一的缓冲区对象，并将数据交错存储。
	- 当你想创建包含数百个模型的复杂场景时，交错数据是更有效的选择。
```javascript
// 创建顶点缓冲区对象
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 创建颜色缓冲区对象
var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

//在绘制图形时，需要分别绑定各自的缓冲区对象并设置到指定的 attribute 变量上：
// 设置顶点坐标数据
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.enableVertexAttribArray(vertexLoc);
gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, 0, 0);
// 设置颜色数据
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
// 绘制图形
gl.drawArrays(gl.TRIANGLES, 0, numVertices);
其中 `vertexLoc` 和 `colorLoc` 分别是顶点和颜色 attribute 变量的位置（通常使用 `gl.getAttribLocation()` 函数来获取），`numVertices` 表示顶点数。
```

### 周期变化
- "mod"运算符用于计算除法的余数，并将结果限制在一个固定的范围内。它可以实现将数值限制在一个周期内，例如将计数器限制在特定范围内循环计数。
	- "mod"运算符主要用于计算和控制数值的周期性行为
- sin函数是一种三角函数，它在数学上用于描述周期性的振荡或波动。sin函数的输出在-1到1之间变化，并且具有连续的周期性。sin函数的周期是2π（或360度），当输入的角度增加或减少2π时，sin函数的值将重复。
	- sin函数则用于描述和模拟周期性的连续变化，例如音频波形、动画效果等。
	- y = Math.sin(x * 频率 + 相位) * 振幅
### 噪音
- y = noise2D(  x * 频率,  z * 频率) * 按幅度;
#### 非此即彼
- step相当于高级的 `value>0 ? 0 : 1`

clamp将一个值限制在指定的范围内 
clamp(要限制的值，最小值, 最大值)
`mix(10.0, 20.0, 0.5)`，函数将返回 15.0，因为 15.0 是 10.0 和 20.0 的中间值
#### [线性插值](https://mattdesl.svbtle.com/linear-interpolation)
- lerp或mix
### MRT多重渲染目标
"MRT" 在计算机图形学和WebGL中代表"Multiple Render Targets"，即多重渲染目标。这是一项技术，允许在一个渲染过程中将图像渲染到多个不同的目标，而不仅仅是主颜色缓冲区。
1. MRT常用于延迟渲染、透明物体排序、单通道拾取等图形渲染技术[1]。
2. 在WebGL中，你可以使用MRT来从着色器一次性绘制到多个缓冲区，这对于一些延迟渲染技术非常有用[4]。
3. MRT还可以用于实现一些特效，如后期处理效果[3]。
4. 在WebGL 2.0中，MRT的支持更强大，允许更多灵活性的渲染[5]。
### Transform Feedback
Transform Feedback（变换反馈）是OpenGL和WebGL中的一个重要功能，用于捕获由顶点处理步骤生成的图元，并记录来自这些图元的数据。以下是关于Transform Feedback的一些关键信息：
定义：Transform Feedback允许在渲染管线的顶点处理阶段中捕获数据，并将其保存在缓冲区中，而不是传递给下一个阶段，如片段着色器。
1. 应用：它在各种图形和计算任务中都有用，例如粒子系统、物理模拟、GPU粒子排序等。
2. WebGL：在WebGL中，Transform Feedback是WebGL 2 API的一部分，用于实现变换反馈功能，可以在浏览器中进行高性能的图形计算。
3. Geometry Shader：通常，Transform Feedback与几何着色器一起使用，以捕获几何着色器生成的顶点数据。
4. 缓冲区：Transform Feedback的结果可以保存在缓冲区中，以供后续使用或传输到CPU端进行处理。
5. 资源链接：你可以参考OpenGL Wiki的文章[1]和MDN的WebGLTransformFeedback文档[3]，以获取更多详细信息和示例代码。
6. 使用场景：尽管Transform Feedback功能强大，但需要谨慎使用，因为在某些情况下可能会导致性能问题。确保只在需要捕获和处理顶点数据时使用它。

### G缓冲区与延迟渲染
延迟渲染（Deferred Rendering）是一种计算机图形学中的渲染技术，它将渲染过程分为两个阶段：

1. **几何处理阶段（G-Buffer Pass）**：
   在这个阶段，场景中的几何信息（如顶点位置、法线、颜色、材质属性等）被渲染到一组纹理中，统称为G缓冲区（Geometry Buffer）。这个过程不涉及光照计算。G缓冲区通常包括以下类型的纹理：
   - **位置纹理**：存储每个像素的世界空间位置。
   - **法线纹理**：存储每个像素的法线向量。
   - **颜色纹理**：存储每个像素的漫反射颜色。
   - **镜面纹理**：存储每个像素的镜面反射强度和光泽度。
   - **深度纹理**：存储每个像素的深度信息。
   - **其他属性纹理**：如粗糙度、金属度等。

2. **光照计算阶段（Lighting Pass）**：
   在这个阶段，使用G缓冲区中的数据对场景进行光照计算。这个过程是在屏幕空间进行的，意味着它是基于像素的。对于场景中的每个光源，着色器读取G缓冲区的纹理，计算该光源对屏幕上每个像素的影响。由于所有必要的数据都已经在G缓冲区中，因此可以非常高效地对多个光源进行计算。

延迟渲染的主要优点是它能够处理大量的动态光源而不会显著降低性能，因为光照计算是独立于场景中物体数量的。这使得延迟渲染非常适合复杂场景和动态光照效果，如游戏和实时渲染应用。

然而，延迟渲染也有一些缺点和限制：

- **内存占用**：G缓冲区需要额外的纹理来存储数据，这会占用更多的显存。
- **透明度处理**：延迟渲染不擅长处理透明物体，因为透明物体的光照通常需要知道背后物体的信息，而这在延迟渲染的第一阶段是不可用的。
- **抗锯齿**：由于延迟渲染在屏幕空间进行，传统的多重采样抗锯齿（MSAA）不容易直接应用。

尽管有这些限制，延迟渲染因其在处理复杂光照场景时的高效性而被广泛使用。随着图形硬件的发展，这些限制也在逐渐被新技术和方法所克服。

在 WebGL 和 OpenGL 中，`SRGB8_ALPHA8` 和 `RGBA8` 是指纹理数据的内部格式（Internal Format），它们定义了纹理像素的存储方式和颜色编码。
### 纹理格式
WebGL 提供了多种纹理格式，这些格式允许在不同的情况下以不同的方式处理和存储纹理数据。以下是 WebGL 1.0 和 WebGL 2.0 中的一些常见纹理格式。请注意，WebGL 2.0 作为一个更现代的 API，提供了更多的格式和选项。
#### WebGL 1.0 纹理格式
1. **`GL_ALPHA`**: 只包含 alpha 通道。
2. **`GL_RGB`**: 红色、绿色和蓝色通道。
3. **`GL_RGBA`**: 红色、绿色、蓝色和 alpha 通道。
4. **`GL_LUMINANCE`**: 亮度通道。
5. **`GL_LUMINANCE_ALPHA`**: 亮度和 alpha 通道。

这些格式通常与以下类型结合使用：

- `GL_UNSIGNED_BYTE`
- `GL_UNSIGNED_SHORT_5_6_5` (仅适用于 `GL_RGB`)
- `GL_UNSIGNED_SHORT_4_4_4_4` (仅适用于 `GL_RGBA`)
- `GL_UNSIGNED_SHORT_5_5_5_1` (仅适用于 `GL_RGBA`)

#### WebGL 2.0 扩展纹理格式
WebGL 2.0 引入了更多纹理格式，提供了更广泛的选项，包括更高精度和更专业的格式。

1. **`GL_R8`**, **`GL_RG8`**, **`GL_RGB8`**, **`GL_RGBA8`**
2. **`GL_R16F`**, **`GL_RG16F`**, **`GL_RGB16F`**, **`GL_RGBA16F`**
3. **`GL_R32F`**, **`GL_RG32F`**, **`GL_RGB32F`**, **`GL_RGBA32F`**
4. **`GL_R8I`**, **`GL_RG8I`**, **`GL_RGB8I`**, **`GL_RGBA8I`**
5. **`GL_R8UI`**, **`GL_RG8UI`**, **`GL_RGB8UI`**, **`GL_RGBA8UI`**
6. **`GL_R16I`**, **`GL_RG16I`**, **`GL_RGB16I`**, **`GL_RGBA16I`**
7. **`GL_R16UI`**, **`GL_RG16UI`**, **`GL_RGB16UI`**, **`GL_RGBA16UI`**
8. **`GL_R32I`**, **`GL_RG32I`**, **`GL_RGB32I`**, **`GL_RGBA32I`**
9. **`GL_R32UI`**, **`GL_RG32UI`**, **`GL_RGB32UI`**, **`GL_RGBA32UI`**
10. **`GL_RGB10_A2`**, **`GL_RGB10_A2UI`**
11. **`GL_SRGB8`**, **`GL_SRGB8_ALPHA8`**
12. **`GL_DEPTH_COMPONENT16`**, **`GL_DEPTH_COMPONENT24`**, **`GL_DEPTH_COMPONENT32F`**
13. **`GL_DEPTH24_STENCIL8`**, **`GL_DEPTH32F_STENCIL8`**

这些格式在 WebGL 2.0 中增加了对更高位深、浮点纹理和其他专业功能的支持。它们可以用来更精确地控制纹理数据的表示，满足高级图形渲染需求，如 HDR 渲染、物理基础渲染等。

#### 注意事项
- 不是所有的格式都会在所有的设备或浏览器中得到支持。需要根据目标平台的能力来选择合适的格式。
- 在选择纹理格式时，除了考虑格式本身，还需要考虑纹理类型（如 2D 纹理、立方体贴图等）、纹理参数（如过滤方式、纹理包裹模式）和用途（颜色数据、数据贴图、深度贴图等）。

这些纹理格式的选择依赖于具体的应用场景和性能需求。在实际的 WebGL 开发中，通常需要在图像质量、内存占用和渲染性能之间进行权衡。
#### SRGB8_ALPHA8和RGBA8分别是什么啊?
##### SRGB8_ALPHA8
- **内部格式**: `GL_SRGB8_ALPHA8`
- **描述**: 这个格式用于表示 sRGB 颜色空间中的纹理，同时包含 alpha 通道（透明度）。sRGB 是一种标准的颜色空间，它通过伽马校正来更好地适应人眼对亮度的感知。使用 `SRGB8_ALPHA8` 格式的纹理在上传到 GPU 时会进行伽马校正，使得颜色值在 sRGB 空间中是线性的。
- **组件**:
  - **R, G, B**: 伽马校正后的颜色值（在 sRGB 空间）。
  - **A**: Alpha（透明度）通道，没有经过伽马校正。
##### RGBA8
- **内部格式**: `GL_RGBA8`
- **描述**: 这个格式用于表示线性颜色空间中的纹理，同时包含 alpha 通道。在 `RGBA8` 格式的纹理中，R（红色）、G（绿色）、B（蓝色）和 A（Alpha）通道的值是直接映射的，没有经过伽马校正。这意味着颜色值直接对应于光的强度，是线性的。
- **组件**:
  - **R, G, B**: 直接映射的颜色值，在线性颜色空间中。
  - **A**: Alpha（透明度）通道。
##### 区别
- **颜色空间**: 最主要的区别在于颜色空间。`SRGB8_ALPHA8` 是为 sRGB 颜色空间设计的，而 `RGBA8` 是线性颜色空间的表示。
- **用途**:
  - **`SRGB8_ALPHA8`**: 通常用于存储已经预计算好的颜色（如纹理贴图），这些颜色在显示时不需要额外的颜色空间转换。
  - **`RGBA8`**: 通常用于需要精确颜色计算的场景，如在渲染管线中进行光照计算和其他颜色混合操作。
- **性能和兼容性**: 在某些平台上，使用 sRGB 纹理可能会影响性能。同时，并非所有的 WebGL 实现都支持 sRGB 纹理。
在选择这两种格式时，你需要考虑你的应用场景和对颜色精度的需求。在进行物理基础的渲染（PBR）或需要进行复杂的光照和着色处理时，使用 `RGBA8` 格式的线性空间是更好的选择。而对于大多数普通的纹理贴图，尤其是那些直接用于显示的图像，使用 `SRGB8_ALPHA8` 格式是更加合适的。
#### 那我如何确定用哪个来渲染这个glb模型更合适?
确定用哪个纹理格式来渲染一个 `.glb` 模型时，主要取决于模型的用途和纹理的特性。以下是一些决策标准：
##### 1. 纹理的内容和用途
- **sRGB（`SRGB8_ALPHA8`）**：如果纹理包含颜色数据，如漫反射贴图（diffuse maps）或颜色贴图（color maps），并且这些贴图将直接用于渲染（即在屏幕上显示的颜色），那么它们应该被视为 sRGB 纹理。大多数颜色贴图和漫反射贴图都应该被解释为 sRGB，因为它们通常是为了在标准的 sRGB 显示器上正确显示而设计的。

- **线性（`RGBA8`）**：如果纹理包含非颜色数据，如法线贴图（normal maps）、高光贴图（specular maps）、位移贴图（displacement maps）等，或者需要进行复杂的着色计算，比如物理基础渲染（PBR）中的各种贴图，则应该使用线性格式。这些贴图通常不直接表示颜色，而是用于计算光照和阴影。
##### 2. 图片文件格式
- **JPEG**：通常应该被当作 sRGB，因为 JPEG 格式通常用于存储颜色数据，且默认情况下是在 sRGB 颜色空间中。
- **PNG**：可能是 sRGB 或线性。如果 PNG 用于存储颜色数据（如漫反射贴图），它应该是 sRGB。如果用于存储数据贴图（如法线贴图），它可能是线性的。
##### 3. 模型渲染的目的
- **真实感渲染**：如果目标是高度真实感的渲染（如使用 PBR 材质），那么需要正确处理 sRGB 和线性贴图。颜色贴图应该被解释为 sRGB，而数据贴图（如反照率、粗糙度、金属度贴图）应该是线性的。
- **基本或非真实感渲染**：对于简单的或非真实感的渲染，可能不需要严格区分 sRGB 和线性纹理。在这种情况下，可以根据纹理的外观和需要达到的效果来做出选择。
#### 实际操作
在实际操作中，最好的方法是实验和视觉检查。你可以尝试以不同的格式渲染纹理，并查看哪种方法提供了最满意的结果。通常，正确处理 sRGB 和线性纹理会提供更真实和准确的视觉效果，尤其是在涉及复杂光照和材质的场景中。在 Three.js 等高级框架中，很多这样的细节处理可能已经被抽象化，使得决策过程更加简单。

### mask
在 WebGL 中，"mask" 通常指的是在渲染过程中用于限制或控制某些数据写入的标志。
以下是 WebGL 中常见的几种 mask：
#### 1.**深度 Mask（Depth Mask）**:
   - 控制是否允许向深度缓冲区写入数据。
   - 使用 `gl.depthMask(true/false)` 来启用或禁用深度写入。
```JS
gl.depthFunc//设置深度缓冲区测试的函数。改变默认的深度测试规则,gl.LESS会作为默认值
gl.depthMask//设置深度缓冲区写入开关。
```

`gl.depthMask` 和 `gl.enable(gl.DEPTH_TEST)`通常会被结合使用来处理复杂的渲染场景，尤其是涉及到透明度和物体遮挡的情况。如:
1. **渲染不透明物体**:
   - 通常，在渲染不透明物体时，会开启深度测试 (`gl.enable(gl.DEPTH_TEST)`) 并允许深度写入 (`gl.depthMask(true)`)。
   - 这确保了正确的物体遮挡（近的物体遮挡远的物体）并且更新了深度缓冲区，以便后续渲染的物体可以正确地进行深度测试。
2. **渲染透明物体**:
   - 在绘制透明物体时，情况会更复杂。因为透明物体需要考虑与其他物体的深度关系，同时它们本身又不应完全遮挡背后的物体。
   - 一种常见的方法是先渲染所有不透明的物体，然后在渲染透明物体时，保持深度测试开启 (`gl.enable(gl.DEPTH_TEST)`)，但禁用深度写入 (`gl.depthMask(false)`)。
   - 这样，透明物体在渲染时会考虑已经渲染的不透明物体的深度信息，但它们自己不会更新深度缓冲区，因此不会阻止后面的物体（包括其他透明物体）在同一位置被渲染。
3. **特殊效果**:
   - 在一些特殊效果，如绘制天空盒或后处理效果时，可能会完全禁用深度测试 (`gl.disable(gl.DEPTH_TEST)`) 并禁用深度写入 (`gl.depthMask(false)`)。
   - 这样可以确保这些效果不会被场景中的其他物体遮挡，也不会影响深度缓冲区，从而不会影响后续的渲染操作。
4. **先绘制深度**:
   - 在一些高级技术中，例如延迟渲染或阴影映射，可能会首先只渲染物体的深度信息（不渲染颜色），此时会开启深度测试和深度写入。
   - 然后在后续的渲染步骤中使用这个深度信息进行更复杂的渲染计算。
#### 2.**颜色 Mask（Color Mask）**:
 - 控制是否允许向颜色缓冲区的特定通道（红、绿、蓝、alpha）写入数据。
- 使用 `gl.colorMask(red, green, blue, alpha)` 来指定每个颜色通道是否应该被写入，其中 `red`、`green`、`blue` 和 `alpha` 参数都是布尔值。
```JS
gl.coorMask//设置哪些颜色通道被写入到颜色缓冲区中,要在绘制模型时忽略模型的颜色。
使用 gl.colorMask(false, false, false, false) 告诉 WebGL 渲染器不写入颜色缓冲区中的任何颜色成分。
```
#### 3.**模板 Mask（Stencil Mask）**:
   - 控制模板缓冲区中的位模式，以便控制哪些位可以被写入。
   - 使用 `gl.stencilMask(mask)` 来设置模板写入的位掩码。
```JS
gl.stencilFunc//设置模板测试函数。
gl.stencilMask//设置模板写入掩码。
gl.stencilOp//设置模板操作。
```
