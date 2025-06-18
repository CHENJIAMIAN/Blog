### 从 GLB 文件到 WebGL 底层
```ts
#### 1.获取数据
- `用户发起加载请求:`  你的 JavaScript 代码调用 `THREE.GLTFLoader().load(url, onLoad, onProgress, onError)`，其中 `url` 指向 GLB 文件的网络地址或本地路径。

- ``GLTFLoader` 的处理:`
    - `XMLHttpRequest 或 Fetch API:` `GLTFLoader` 内部使用浏览器的 `XMLHttpRequest` 对象 (或更现代的 `fetch` API) 发起一个 HTTP GET 请求，目标是 GLB 文件的 URL。
    - `接收二进制数据:` 浏览器接收到服务器返回的二进制数据流，这正是 GLB 文件的内容。
    - `ArrayBuffer:`  接收到的二进制数据被存储在一个 `ArrayBuffer` 对象中。`ArrayBuffer` 是 JavaScript 中表示原始二进制数据的对象。

#### 2. 解析 GLB 文件结构 

GLB 文件是一种二进制形式的 glTF (GL Transmission Format) 模型格式。它包含一个头部和多个块 (chunks)。

- `GLB 头部 (GLB Header):`
    - `magic (4 bytes):`  固定为 `glTF` (ASCII 码)。用于标识文件类型。
    - `version (4 bytes):`  glTF 规范的版本号 (通常为 2)。
    - `length (4 bytes):`  整个 GLB 文件的总长度 (包括头部)。

- `块 (Chunks):`
    - `chunkLength (4 bytes):`  当前块的长度 (不包括 `chunkLength` 和 `chunkType` 本身)。
    - `chunkType (4 bytes):`  块的类型，可以是 `JSON` (ASCII 码) 或 `BIN` (ASCII 码)。
    - `chunkData (chunkLength bytes):`  块的实际数据。
        - `JSON Chunk:` 包含 glTF 模型的元数据，描述了场景、节点、网格、材质、动画等信息。这是一个 JSON 格式的文本字符串。
        - `BIN Chunk:` 包含二进制数据，如顶点位置、法线、纹理坐标、骨骼权重等。

- ``GLTFLoader` 的解析过程:`
    - `读取头部:` `GLTFLoader` 首先读取 `ArrayBuffer` 的前 12 个字节，解析出 magic、version 和 length。
    - `遍历块:`  根据 length，`GLTFLoader` 迭代读取后续的块。
    - `解析 JSON 块:`
        - 使用 `TextDecoder` 将 JSON 块的二进制数据解码为 UTF-8 字符串。
        - 使用 `JSON.parse()` 将 JSON 字符串解析成 JavaScript 对象。这个对象包含了 glTF 模型的完整描述。
    - `解析 BIN 块:`
        - BIN 块的数据通常直接以 `ArrayBuffer` 的 `slice()` 形式保存，用于后续访问几何数据、纹理数据等。

#### 3.  解释 glTF 数据并创建 three.js 对象

解析出的 glTF JSON 数据描述了模型的所有组成部分及其关系。`GLTFLoader` 会遍历这个 JSON 结构，并根据描述创建相应的 three.js 对象。

- `场景 (Scene):`
    - glTF 中的 `scenes` 数组定义了模型的场景结构。
    - `GLTFLoader` 创建 `THREE.Scene` 对象，并将 glTF 中指定的节点添加到场景中。

- `节点 (Nodes):`
    - glTF 中的 `nodes` 数组定义了场景中的变换实体，可以是模型、相机、灯光等。
    - `GLTFLoader` 为每个节点创建 `THREE.Object3D` (或其子类，如 `THREE.Mesh`、`THREE.Camera`、`THREE.Light`) 对象。
    - `变换 (Transformations):` 解析节点的 `translation`、`rotation`、`scale` 属性，并设置 three.js 对象的 `position`、`quaternion`、`scale` 属性。
    - `父子关系:`  根据节点的 `children` 属性，构建 three.js 对象的父子关系，形成场景图。

- `网格 (Meshes):`
    - glTF 中的 `meshes` 数组定义了模型的几何形状。
    - `GLTFLoader` 为每个网格创建 `THREE.Mesh` 对象。
    - `几何体 (Geometry):`
        - 引用 glTF 中的 `accessors` 和 `bufferViews` 来访问 BIN 块中的顶点位置、法线、纹理坐标等数据。
        - 创建 `THREE.BufferGeometry` 对象。
        - 使用 `geometry.setAttribute()` 方法，将顶点位置、法线、纹理坐标等数据创建为 `THREE.BufferAttribute` 对象，并上传到 `BufferGeometry` 中。这些 `BufferAttribute` 对象内部会创建 WebGL 的 Buffer 对象 (稍后详细说明)。
        - 如果有索引 (indices)，则创建 `THREE.BufferAttribute` 用于索引数据，并使用 `geometry.setIndex()` 设置。
    - `材质 (Material):`
        - 引用 glTF 中的 `materials` 定义。
        - 根据材质的 `pbrMetallicRoughness`、`normalTexture`、`baseColorTexture` 等属性，创建相应的 three.js 材质 (`THREE.MeshStandardMaterial` 或其他材质)。
        - `纹理 (Textures):`
            - 引用 glTF 中的 `textures` 和 `images` 定义。
            - 加载纹理图像数据 (通常也是 BIN 块中的一部分，或者单独的文件)。
            - 创建 `THREE.Texture` 对象。
            - 如果是嵌入的图像数据，使用 `ImageBitmapLoader` 或 `Image()` 对象加载。
            - 配置纹理的 `wrapS`、`wrapT`、`magFilter`、`minFilter` 等属性。
            - 将 `THREE.Texture` 对象赋值给材质的相应属性 (如 `map`、`normalMap`)。

- `相机 (Cameras):`
    - glTF 中的 `cameras` 数组定义了场景中的相机。
    - `GLTFLoader` 创建 `THREE.PerspectiveCamera` 或 `THREE.OrthographicCamera` 对象，并根据 glTF 的参数设置相机的属性 (如 `fov`、`aspect`、`near`、`far`)。

- `灯光 (Lights):`
    - glTF 中的扩展 (如 `KHR_lights_punctual`) 可以定义灯光。
    - `GLTFLoader` 创建 `THREE.DirectionalLight`、`THREE.PointLight`、`THREE.SpotLight` 等对象，并设置灯光的颜色、强度等属性.

- `蒙皮和骨骼动画 (Skins and Animations):`
    - glTF 支持蒙皮网格和骨骼动画。
    - `蒙皮 (Skins):`
        - `GLTFLoader` 解析 `skins` 定义，创建 `THREE.Skeleton` 对象。
        - 将 glTF 中定义的关节 (joints) 对应的 three.js 对象添加到 `Skeleton` 中。
        - 解析蒙皮的 `inverseBindMatrices`，用于计算顶点在绑定姿势下的世界坐标。
        - 将 `THREE.SkinnedMesh` 对象与 `THREE.Skeleton` 关联。
        - 解析顶点权重 (weights) 和关节索引 (joints)，并将其添加到 `BufferGeometry` 中。
    - `动画 (Animations):`
        - `GLTFLoader` 解析 `animations` 定义，创建 `THREE.AnimationClip` 对象。
        - 每个 `AnimationClip` 包含多个 `THREE.KeyframeTrack` 对象，每个 `KeyframeTrack` 对应一个可动画的属性 (如节点的 position、rotation 或蒙皮的骨骼变换)。
        - 创建 `THREE.AnimationMixer` 对象，用于播放动画。
        - 将 `AnimationClip` 添加到 `AnimationMixer` 中。

#### 4. 构建场景图

在创建了各种 three.js 对象之后，`GLTFLoader` 会根据 glTF 数据中定义的父子关系，将这些对象组织成一个场景图。场景图是一个树形结构，描述了场景中对象之间的层次关系。

- `添加到场景:`  最终，加载完成的模型 (通常是一个 `THREE.Group` 或 `THREE.Scene` 对象) 通过 `onLoad` 回调函数返回给你的代码。

#### 5. 渲染准备

在你的代码中，你需要进行渲染的准备工作：

- `创建渲染器 (Renderer):`  创建 `THREE.WebGLRenderer` 对象，这是 three.js 中负责将场景渲染到屏幕上的核心组件。
- `设置渲染器尺寸:`  设置渲染器的尺寸，通常与浏览器窗口大小一致。
- `将渲染器添加到 DOM:`  将渲染器的 `domElement` (一个 `<canvas>` 元素) 添加到 HTML 文档中。
- `创建相机 (Camera):`  如果 GLB 文件中没有定义相机，你需要手动创建一个 `THREE.PerspectiveCamera` 或 `THREE.OrthographicCamera` 并设置其位置和朝向。
- `创建灯光 (Lights):`  根据场景需要，创建 `THREE.AmbientLight`、`THREE.DirectionalLight`、`THREE.PointLight` 等，并添加到场景中。

#### 6.  渲染循环

渲染是一个持续的过程，需要在一个循环中不断更新场景并重新绘制。

- ``requestAnimationFrame`:` 使用 `requestAnimationFrame` 函数来创建一个平滑且高效的渲染循环。
- `更新 (Update):` 在每个渲染帧中，你可能需要更新场景中的某些元素，例如：
    - `动画更新:`  如果加载了动画，使用 `animationMixer.update(deltaTime)` 来更新动画的状态。
    - `用户交互:`  根据用户的输入 (鼠标、键盘) 更新相机的位置、模型的旋转等。
- `渲染 (Render):` 调用渲染器的 `render(scene, camera)` 方法。这是将 three.js 的场景数据转换为 WebGL 指令的关键步骤。

#### 7. three.js 到 WebGL 底层

当 `renderer.render(scene, camera)` 被调用时，three.js 会执行以下步骤，最终转化为 WebGL 的底层操作：

- `场景图遍历:`  遍历场景图中的所有可见对象 (meshes, lines, points 等)。
- `几何数据准备:`
    - 对于每个 `THREE.Mesh` 对象，three.js 会访问其 `geometry` 属性 (一个 `THREE.BufferGeometry` 对象)。
    - `BufferGeometry` 内部存储了顶点位置、法线、纹理坐标、索引等数据，这些数据存储在 `THREE.BufferAttribute` 对象中。
    - `WebGL Buffers:`  每个 `BufferAttribute` 内部都关联着一个 WebGL Buffer 对象 (`gl.createBuffer()`)。这些 Buffer 对象存储在 GPU 的内存中。
    - `数据上传:` 在加载模型或更新几何体时，three.js 会使用 WebGL 的 `gl.bindBuffer()` 和 `gl.bufferData()` 方法将 JavaScript 中的 `ArrayBufferView` (例如 `Float32Array`、`Uint16Array`) 数据上传到对应的 WebGL Buffer 对象中。

- `材质处理:`
    - 对于每个 `THREE.Mesh` 对象，three.js 会访问其 `material` 属性。
    - `着色器 (Shaders):`  每个 three.js 材质 (例如 `MeshStandardMaterial`) 都关联着一个或多个 WebGL 程序 (shaders)。WebGL 程序由顶点着色器 (Vertex Shader) 和片元着色器 (Fragment Shader) 组成，用 GLSL (OpenGL Shading Language) 编写。
    - `内置着色器或自定义着色器:` three.js 提供了许多内置的着色器，也可以使用 `ShaderMaterial` 或通过修改内置材质的 `onBeforeCompile` 钩子来自定义着色器。
    - `Uniforms:`  材质的属性 (如颜色、粗糙度、金属度、纹理) 会被传递给着色器作为 uniform 变量。three.js 会使用 `gl.uniformXXX()` 方法将这些值传递给 GPU。
    - `Attributes:`  几何体的顶点属性 (位置、法线、纹理坐标等) 会被传递给顶点着色器作为 attribute 变量。three.js 会使用 `gl.vertexAttribPointer()` 方法配置如何从 WebGL Buffer 中读取这些数据。

- `纹理处理:`
    - 如果材质使用了纹理，three.js 会：
        - `创建 WebGL 纹理对象:` 使用 `gl.createTexture()` 创建 WebGL 纹理对象。
        - `绑定纹理:` 使用 `gl.bindTexture()` 绑定纹理对象。
        - `上传纹理数据:`  使用 `gl.texImage2D()` 方法将 `ImageBitmap` 或 `ImageData` 对象中的像素数据上传到 GPU 的纹理对象中。
        - `设置纹理参数:` 使用 `gl.texParameteri()` 设置纹理的过滤模式 (filtering)、环绕模式 (wrapping) 等。
        - `激活纹理单元:` 使用 `gl.activeTexture()` 激活一个纹理单元 (例如 `gl.TEXTURE0`)。
        - `绑定纹理到纹理单元:` 将 WebGL 纹理对象绑定到激活的纹理单元。
        - `设置 uniform 采样器:` 将纹理单元的索引传递给片元着色器的采样器 uniform 变量。

- `渲染状态设置:`
    - three.js 会根据材质和场景的设置，配置 WebGL 的渲染状态，例如：
        - `深度测试:` 使用 `gl.enable(gl.DEPTH_TEST)` 或 `gl.disable(gl.DEPTH_TEST)` 控制是否进行深度测试。
        - `混合 (Blending):`  如果材质需要透明效果，使用 `gl.enable(gl.BLEND)` 并设置混合函数 (`gl.blendFunc()`).
        - `背面剔除 (Culling):` 使用 `gl.enable(gl.CULL_FACE)` 和 `gl.cullFace()` 控制是否渲染物体的背面。

- `绘制调用 (Draw Calls):`
    - 对于每个需要渲染的几何体，three.js 会执行一次或多次绘制调用：
        - `无索引绘制:` 如果几何体没有索引，使用 `gl.drawArrays(mode, first, count)`，其中 `mode` 指定绘制图元的类型 (如 `gl.TRIANGLES`)，`first` 是起始顶点索引，`count` 是顶点数量。
        - `索引绘制:` 如果几何体有索引，使用 `gl.drawElements(mode, count, type, offset)`，其中 `type` 指定索引数据的类型 (如 `gl.UNSIGNED_SHORT`)。

- `着色器执行:`  当执行绘制调用时，GPU 会：
    - `顶点着色器:`  对每个顶点执行顶点着色器程序。顶点着色器接收顶点属性作为输入，并计算顶点的最终位置 (通常是裁剪空间坐标)。
    - `图元装配 (Primitive Assembly):` 根据绘制模式 (如三角形) 将顶点连接成图元。
    - `光栅化 (Rasterization):` 将图元转换为屏幕上的像素片段 (fragments)。
    - `片元着色器:` 对每个像素片段执行片元着色器程序。片元着色器接收插值后的顶点属性和 uniform 变量作为输入，并计算像素片段的最终颜色。
    - `深度测试和混合:`  根据设置的渲染状态，进行深度测试和混合操作。

- `渲染结果:`  最终，GPU 将渲染好的像素输出到渲染器的 `<canvas>` 元素上，呈现在用户的屏幕上。
```
