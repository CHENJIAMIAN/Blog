## 资源
[gw3_construkted/construkted.js at master · stefanciorici/gw3_construkted · GitHub](https://github.com/stefanciorici/gw3_construkted/blob/master/wp-content/themes/gowatch-child/js/construkted.js)泄露了官方的测量/距离/面积/模型位置编辑器插件
[edd6b-Construkted/CesiumIonSDKPlugin.js at ba5418eaa26710e0b63440167c177a5014e046e5 · Construkted-Reality/edd6b-Construkted --- edd6b-Construkted/CesiumIonSDKPlugin.js 位于 ba5418eaa26710e0b63440167c177a5014e046e5 · Construkted-Reality/edd6b-Construkted](https://github.com/Construkted-Reality/edd6b-Construkted/tree/ba5418eaa26710e0b63440167c177a5014e046e5)具体分支
[Construkted-Reality/3DT-Local-viewer: Local viewer for 3D Tiles --- Construkted-Reality/3DT-Local-viewer：3D Tiles 的本地查看器](https://github.com/Construkted-Reality/3DT-Local-viewer)2023年4月6日尝试了，不可用
[Construkted-Reality/3DTG：将 3d 模型转换为 3d tiles](https://github.com/Construkted-Reality/3DTG)目前该工具只接受带纹理的 OBJ 文件
[My Assets | Cesium ion --- 我的资产 |铯离子](https://ion.cesium.com/assets/)可以在线免费转3DTiles再下载下来

```javascript
Cesium.Resource.fetchJson(url)
原生支持加载glb/gltf //用viewer.entities.add即可
经纬度转相机参数{postition世界坐标，orientation相机朝向}//官网《3D Models.html》有提到

Scene//是一个Cesium应用程序的根对象，它包含用于场景渲染和交互的所有元素。它是一个虚拟的3D环境，包括地球表面、天空、相机、光源等。
    View//是Scene的一部分，表示场景中的一个视图，通常是一个图像帧或视频帧。它定义了一个矩形区域，指定场景中需要渲染的部分。
        View.prototype.createPotentiallyVisibleSet用于生成可能可见的命令frustumCommands/对象集合frustumCommands.commands。被Scene.executeCommandsInViewport调用
        函数首先获取相机的视点和方向，然后根据命令所在的 pass 类型将其添加到对应的命令数组中（computeList 或 overlayList），
        如果是普通渲染命令，函数会计算它与相机视锥体的交并得出它的可见性和深度信息，并将其添加到对应的块（bin）中。
        同时，函数还更新了 shadowNear 和 shadowFar 变量来记录所有能接收阴影且离相机最近的物体的近平面距离和远平面距离。
        最后，函数划分了相机视锥体的多个子锥体生成一组 frustumCommandsList 数组来存储所有在不同锥体内的可见命令，以及一个 frustumSplits 数组来存储每个子锥体的近平面或远平面位置。
总体而言，这个方法的作用是生成当前视野中需要绘制的物体集合，以便优化渲染性能并提高可视效果。
    Globe//是Scene的一部分，表示在场景中渲染地球的部分。它包括地球的几何形状、地形、图像纹理和其他相关属性，使得场景中的地球可以进行交互和探索。
```
## 执行流程 与 对象

```javascript
多源//来源于遥感影像、摄像头、问卷调查、手机信令、GPS追踪等
异构//结构化数据, 非结构化数据, 时空数据

如何压平:
    在压平区域的多边形正上方模拟一个相机，离屏渲染多边形区域的深度图，并将深度图传入模型（或者3DTile）的顶点着色器中，在顶点着色器中将模型顶点转换到模拟的相机空间下，
    然后转换到投影空间，投影空间下的坐标在【0~1】的范围内，并在多边形的区域内，使用多边形的高度，不在范围内不用处理
        模型的update更新循环方法，会一直调用updateModel方法
        u_isFlatten是关键 
             Model.prototype.update调用了Source/Scene/processPbrMaterials.js的processPbrMaterials方法，进而遍历调用了generateTechnique生成着色器代码在返回的techniqueId对象里
             //processPbrMaterials：https://github.com/CesiumGS/cesium/blob/1.96/Source/Scene/processPbrMaterials.js#L448-L465 新版cesium已经废弃了它//详见https://cesium.com/blog/2022/10/05/tour-of-the-new-gltf-architecture-in-cesiumjs/
    
DrawCommand.prototype.execute被谁调用，完整的调用链是什么样的：
    简述: 由Scene更新时遍历绘制命令触发gl的draw函数
    主更新循环体 → Scene.render → Scene.executeCommand → 遍历了frustumCommands.commands[Pass_default.GLOBE]  → DrawCommand.execute → Context.draw → Context.continueDraw → gl绘制调用drawElements

CEO解释如何渲染一帧//https://cesium.com/blog/2015/05/14/graphics-tech-in-cesium/  https://cesium.com/blog/2015/05/26/graphics-tech-in-cesium-stack/
CesiumJS 2022^ 源码解读[7] - 3DTiles 的请求、加载处理流程解析 _ https://www.cnblogs.com/onsummer/p/16432909.html    


初始化主更新循环 //https://cdn.jsdelivr.net/npm/cesium@1.99.0/Build/CesiumUnminified/Cesium.js
    startRenderLoop (Cesium.js:212021)  在此requestAnimationFrame(   render(frameTime){主更新循环体}  ) 
    set (Cesium.js:212336)
    CesiumWidget (Cesium.js:212236)
    Viewer (Cesium.js:215480)
    
在主更新循环中调用3dtile的更新方法
    updateTiles (Cesium.js:107633)分支
    requestTiles (Cesium.js:107407)分支
    update(tileset, frameState, passStatistics, passOptions)  (Cesium.js:107784)
    Cesium3DTileset.updateForPass (Cesium.js:107829)
    Cesium3DTileset.update (Cesium.js:107800)
    PrimitiveCollection.update (Cesium.js:122827)
    Scene的updateAndRenderPrimitives (Cesium.js:200225)  || Scene的executeCommand (Cesium.js:199593)分支
    executeCommandsInViewport (Cesium.js:200077)
        //MapGIS洪水淹没分析的原理
        FloodAnalysis.update (FloodAnalysis.js?7cc9:510)
        VisualAnalysisManager.update (VisualAnalysisManager.js?3a15:131)
        updateAnalysis (Scene.js?5811:2857)
        executeCommandsInViewport (Scene.js?5811:2889)
    Scene4.updateAndExecuteCommands (Cesium.js:199895)/*用于更新场景中的命令（比如绘制几何体、更新相机等）并执行这些命令*/ resolveFramebuffers/*同级下一行代码，用于将场景渲染的结果输出到屏幕上*/
    render(scene) (Cesium.js:200533)
    tryAndCatchError (Cesium.js:200547)
    Scene4.prototype.render(Cesium.js:200599)
    CesiumWidget.render (Cesium.js:212473)
    起点：render(frameTime) (Cesium.js:212033)
    分支们：
        Scene的executeCommand (Cesium.js:199593)分支
            Context.continueDraw (Cesium.js:32629)  ||  Context的beginDraw分支  ,/context._gl.drawElements 和 context._gl.drawArrays在此执行/
            Context.draw (Cesium.js:32685)
            DrawCommand.execute (Cesium.js:18200)
                DrawCommand，是 Cesium 封装 WebGL 的一个优秀设计，它把绘图数据（VertexArray）和绘图行为（ShaderProgram）作为一个对象，待时机合适，也就是 Scene 执行 executeCommand 函数时，帧状态对象上所有的指令对象就会使用 WebGL 函数执行，要什么就 bind 什么，做到了在绘图时的用法一致，上层应用接口只需生成指令对象。
                    VertexArray//Cesium 把 WebGL 的顶点缓冲和索引缓冲包装成了 Buffer，然后为了方便，将这些顶点相关的缓冲绑定在了一个对象里，叫做 VertexArray，内部会启用 WebGL 的 VAO 功能。
                    ShaderProgram//着色器代码由 ShaderSource 管理，ShaderProgram 则管理起多个着色器源码，也就是着色器本身。使用 ShaderCache 作为着色器程序的缓存容器。
            Scene的executeCommand (Cesium.js:199593) //遍历了frustumCommands.commands[Pass_default.GLOBE]
                Context的beginDraw分支                                        
                    createAndLinkProgram (ShaderProgram.js:213) 在gl.linkProgram(program)打断点可以看到fsSource/vsSource即WebGL的shader代码，                    
                    reinitialize (ShaderProgram.js:470)
                    initialize (ShaderProgram.js:463)
                    ShaderProgram._bind (ShaderProgram.js:542) 在ShaderProgram.prototype._bind打条件断点this._fragmentShaderText.includes('特殊标识')可以找到CustomShader在合成后的shader代码
                    beginDraw (Context.js:1291)

        requestTiles (Cesium.js:107407)分支
            ForEach.topLevel (Cesium.js:65203)
            ForEach.material (Cesium.js:65319)
            addDefaults (Cesium.js:65581)
            （匿名） (Cesium.js:68270)
            Promise.then（异步）
            processGltfJson (Cesium.js:68269)
            processGltfTypedArray (Cesium.js:68284)
            GltfJsonLoader.load (Cesium.js:68172)
            ResourceCache.load (Cesium.js:69956)
            ResourceCache.loadGltfJson (Cesium.js:70067)
            GltfLoader.load (Cesium.js:74203)
            B3dmLoader.load (Cesium.js:76938)
            initialize19 (Cesium.js:88021)
            Model (Cesium.js:87953)
            Model.fromB3dm (Cesium.js:89114)
            Model3DTileContent.fromB3dm (Cesium.js:89456)
            b3dm (Cesium.js:99387)
            makeContent (Cesium.js:104921)
            （匿名） (Cesium.js:104859)
            Promise.then（异步）
            requestSingleContent (Cesium.js:104854)
            Cesium3DTile.requestContent (Cesium.js:104758)
            Cesium3DTile_default.requestContent (Cesium.js:182512)
            requestContent (Cesium.js:107323)
            requestTiles (Cesium.js:107407)
            
        updateTiles (Cesium.js:107633)分支
            Model3DTileContent.update (Cesium.js:89408)
            updateContent (Cesium.js:105303)
            Cesium3DTile.update (Cesium.js:105320)
            updateTiles (Cesium.js:107633)
            
CustomShader渲染堆栈：
    CustomShaderPipelineStage.process (CustomShaderPipelineStage.js:74)
    ModelSceneGraph.buildDrawCommands (ModelSceneGraph.js:527)
    buildDrawCommands (Model.js:1967)
    Model.update (Model.js:1796)
    Model3DTileContent.update (Model3DTileContent.js:246)
    Cesium3DTile.process (Cesium3DTile.js:1965)
    processTiles (Cesium3DTileset.js:2500)
    Cesium3DTileset.prePassesUpdate (Cesium3DTileset.js:2352)
    PrimitiveCollection.prePassesUpdate (PrimitiveCollection.js:392)
    prePassesUpdate (Scene.js:3648)
    tryAndCatchError (Scene.js:3745)
    Scene4.render (Scene.js:3814)
    CesiumWidget.render (CesiumWidget.js:802)
    render (CesiumWidget.js:41)
         
【Cesium 历史博客】Cesium 中的图形技术：渲染体系结构  https://www.cnblogs.com/onsummer/p/14022405.html   
czm_xxx//如 czm_getWgs84EllipsoidEC() ，如czm_viewRotation，Cesium 提供了一个庞大的 GLSL 函数库，包括函数、结构体、常量。如果你的代码需要用到自定义 glsl 代码，你完全可以不声明、不加入 #include 预编译指令，可以直接使用它们。


// 模型分析（裁剪、压平、淹没） 基础类
//原理：利用绘制的点数组，先计算其外包矩形，然后根据点创建一个polygonGeometry，然后利用此geometry创建指令，绘制出polygon纹理，
//源码里会根据此纹理判断模型顶点是否在polygon纹理中，如果在就进行后续操作

//多处压平思考：创建多个polygon纹理有点不大合理，一张FBO里多个polygon纹理，可能会导致压平闪烁（因为到着色器里，增大了顶点和polygon纹理的比对误差）
//多处压平思路之一张FBO里多个polygon纹理：就是想办法在我创建的FBO帧缓存里绘制多少polygon纹理，创建polygon数组，每次绘制都是往这里添加polygon，
//遍历polygon，依次创建指令绘制到fbo里

//建筑物混合遮挡 // 1.楼块不能遮挡道路、水系、绿地和标注等地图元素；// 2.楼快之间，需要实现不透明的实际遮挡效果。
//原理：自己创建FBO，把收集到的所有瓦片绘制指令，都绘制到这个FBO里，开启深度检测，然后再贴屏

//场景雾效果
//原理：根据深度图的深度值，对片元进行不同程度的模糊

// 雪覆盖 效果 
//原理：法线越垂直与地面越白 

//后处理实现倒影
//原理：利用空间镜面反射技术，计算倒影射线的UV进行采样

//视频融合（投射3D，贴物体表面）
//原理：在可视域的基础上，着色器里传入纹理，再计算UV进行贴图

//视频融合（投射2D平面）
//原理：根据相机位置，方向等参数，在相机前面生成一个平面，然后贴视频纹理



BaiduMercatorTilingScheme: 该对象定义了一个使用百度墨卡托投影的切片方案。
Batched3DModel3DTileContent: 该类表示一个可以用于渲染大批量三维模型的瓦片内容。
BoundingSphere 是一个用于表示包围球的类，可以用它来描述一个物体(几何体)的边界。
CallbackProperty 是cesium中的一个属性，当属性被访问时，会执行指定的函数从而得到新值，常用于动态渲染场景。 1536
Cartesian2 是由两个实数表示的二维笛卡尔坐标空间中的点。比如在屏幕上，鼠标点击事件的位置就可以使用Cartesian2 来进行确定。
Cartesian3 是由三个实数表示的三维笛卡尔坐标系中的点。常常被用于描述具有位置信息的对象，例如地图上的标记点。
Cartographic: 该类表示地球上的一个经纬度位置。
Cesium3DTileset: 该类表示一个包含3D瓦片集合的场景，可以用于高性能的3D可视化。
CesiumMath是 Cesium 中的一个数学工具库，提供了循环函数、随机数生成等一些与数学计算相关的API。
CesiumTerrainProvider: 该类提供了一个获取Cesium自己的地形数据的接口。
checkHalfAxes: 该函数可以检查给定的值是否为HalfAxis对象。
Clock: 该类表示一个时钟，可以用于控制时间相关功能。
Composite3DTileContent: 该类表示一个复合的3D瓦片内容，可以由多个子瓦片组成。
ComputeCommand 表示对 GPU 计算渲染器的命令（使用老式 GPGPU,即在NVIDIA CUDA和OpenCL之前的一种GPGPU编程方式，早期使用GPU进行通用计算时，通常需要借助可编程图形渲染管线（例如OpenGL或Direct3D）以及专门的API和库来实现。这种方法存在诸多限制和难点，相比于现代的CUDA和OpenCL编程方式已经不太常用。）
defaultValue 用于判断某个值是不是 undefined 或null。若是，则返回defaultValue中的默认值，否则返回该值本身。
defined: 该函数可以检查给定的值是否已被定义。
destroyObject 可以销毁一个物体（对象），并将其置为无效状态，在内存回收方面会很有帮助。
Ellipsoid: 该类表示一个椭球体，用于处理地球几何学计算。
EllipsoidGeometry: 该类表示一个椭球体的几何形状。
EllipsoidTerrainProvider: 该类提供了一个获取Cesium默认椭球体地形数据的接口。
Entity: 该类表示一个可视化实体，如点、线和面等等。
EntityCollection: 该类表示多个实体的集合。
FrameState: 该类表示当前场景的状态和参数。
GBTilingScheme: 该对象定义了一个使用国测局投影的切片方案。
GeographicProjection: 该类表示一个基于经纬度坐标系的投影方式。
GeographicTilingScheme: 该对象定义了一个使用经纬度投影的切片方案。
GeoJsonDataSource: 该类表示从GeoJSON格式数据创建的数据源。
getHeadingPitchRoll 是Cesium中的一个方法，可以用于计算相机的朝向角度x，俯仰角度y和平行旋转角度z。
getWidgetOrigin 返回一个屏幕上的原点（左上角），一般用来修正页面偏移。
GlobeFS: 该对象包含了Globe着色器程序的代码。
GlobeSurfaceShaderSet: 该类管理了表达地球表面材质的所有着色器。
GlobeSurfaceTileProvider: 该类表示一个提供地球表面图块数据的提供者。
GlobeVS：定义所有 3D 地球场景（又名“球体”）上的“顶点着色器”，这些着色器负责管理非常大的几何对象，例如地形和 3D 模型。
GroundAtmosphere: 该类管理和呈现地球大气层。
HeadingPitchRoll 是由三个实数分别表示方向角、俯仰角、旋转角的类。
ImageryLayerCollection: 该类表示多个图像图层的集合。
Instanced3DModel3DTileContent: 该类表示一个可重用的3D模型实例。
JulianDate: 该类表示一个儒略日日期。
kdbush: 该类提供了一种使用kd树进行快速空间搜索的方法。
knockout 用于一个变量跟另一个变量联动，是 JavaScript 的 MVVM 框架，也是Cesium中关键的一部分，是cesium总体架构中，MVC 模式实现MVVM的另一种表现方式。提供相关的工具函数，常常作为依赖注入框架使用。
Math: 该对象包含了常用的数学函数和常量。
Matrix3是 Cesium 中的一个矩阵类，用于计算三维点之间的各种运算。
Matrix4类表示四乘四矩阵，用于对三维坐标系中的向量和旋转矩阵进行操作运算。
ModelInstanceCollection: 该类表示多个3D模型实例的集合。
PerspectiveOffCenterFrustum: 该类表示一个透视投影视锥体。
QuadtreePrimitive: 该类表示一个波段化的网格，并将其存储在四叉树用于高效的提取和渲染。
Quaternion 是由四个实数表示的 xywz四元素 对象，它们广泛应用于旋转问题，特别是在3D游戏引擎领域中被广泛使用。
Rectangle: 该类表示地球上的一个矩形区域。
RequestScheduler: 该类管理异步请求和处理它们的顺序。
Resource：一个工具类，用于从异步 URL 加载并使用 HTTP 访问各种类型资源。
RotationEditor 是Cesium中的一个编辑器，主要用于控制场景中的物体/相机对象的旋转。
ScaleEditor 是一个CESIUM编辑器，用于缩放 场景物体。
SceneMode：定义 3D 场景的模式，可以是 3D、2D 或 单独的 Columbus 视图。
SceneTransforms 是cesium中的一个位于场景中的任意点位置。可以将任意三维坐标
ShaderSource: 定义导入外部光源的光来计算阴影，并将其添加到当前材质的蒙版中的片段着色器。
Simon1994PlanetaryPositions: 根据 Simon J. Kring 提供方法计算太阳系行星的位置。
TerrainQuantization: 用于划分地面高程数据以便更有效地处理和传输。BITS12 属性代表使用 12 位无符号整数量化高度值时的位数。这可以用来确定地形的精度等级，也可以用来计算每个节点所需的字节数
Transforms：旋转、平移和尺度转换功能使用户在转换不同坐标系统和参考框架时轻松操作数据。
Transforms.computeIcrfToFixedMatrix 是一个转换矩阵计算函数，用于计算从平均值为零，单位比例的坐标系（也称惯性坐标系，即国际天文学联合会参考系）到固定参考系（如地心连续参考系或某些基准系）的四维变换矩阵。
Transforms.computeTemeToPseudoFixedMatrix是一个函数，用于计算由True Equator Mean Equinox (TEME)参考系转换到Pseudo-Fixed参考系的4x4变换矩阵。TEME是基于地球的特定时刻而定义的参考系。它的轴和赤道面与平均恒星时定义有关。Pseudo-Fixed参考系是在地球自转平衡的理想参考系，其中地球的自转速率是常量，该速率等于观测到的太阳周围平均旋转速率。 这个函数返回一个视图矩阵，允许将从TEME参考系下的位置和方向转换到Pseudo-Fixed参考系下的位置和方向。
TranslationEditor 是 cesium 中提供的位移编辑器，常用于控制场景中物体的位置。能够相对地图自由的移动三维模型（Transforms）和倾斜摄影结果（QuadtreeTile）。
turfEx是 cesium中的一个拓展库，封装了大量GIS分析和处理函数，可以有效地减少开发者书写GIS分析和处理代码的时间。
VertexFormat：定义属性化对象的顶点集合格式。 例如，颜色、纹理坐标或法线。 它还包含其他有用的参数，例如顶点大小以及定制顶点格式的创建方法。
WebMercatorProjection：一个处理与 Web Mercator 投影相关的数学类。
WebMercatorTilingScheme: 以经典的WebMercator投影方式对图层进行瓦片化,构建瓦片树网格结构
when：一个实用工具，对带有错误处理的 promise 进行分装， 允许等待所有 promise 完成以及在适当的时间捕获潜在的失败。
```

## 类图

```javascript
Viewer
    CesiumWidget//不包含任何UI组件的viewer，纯地球和星空
        //Viewer.scene === Viewer.cesiumWidget.scene
        Scene//用来操作一切
            Camera
                Cartesian3
                Matrix4
                Catographic
            skyBox星空|skyAtmosphere大气|sun太阳
            Globe //地球
                terrainProvider//TerrainProvider
                imageryLayers//ImageryLayerCollection
                    ImageryLayer
                    ImageryProvider
                        xxxImageryProvider
                Ellipsoid//平面的地形
                Color
            ScreenSpaceCameraController  
                enableRotate|enableTranslate|enableZoom等
            primitives //它的removeAll()会把Cesium自己添加的东西也移除掉,慎用!
                Cesium.Cesium3DTileset
                    classificationType //将这个3dtile变成ClassificationPrimitive
                PrimitiveCollection 
                ClassificationPrimitive//一个不可见封闭的体,被它罩住的,就要用它的颜色附着
                Primitive
                    Appearance
                        XXXAppearance
                            material
                            renderState
                    GeometryInstance
                        XXXGeometry
                            geometry
                            modelMatrix
                Model     
                BillboardCollection //面朝屏幕的图片, 广告牌
                LabelCollection//面朝屏幕的文字
            grounPrimitives//贴地的
                GroundPolylinePrimitive  
    Clock
    ScreenSpaceEventHandler
    dataSourceDisplay
        dataSources
        defaultDataSource(CustomDataSource)
            entities
    其他一大堆UI组件
            
 挂在Viewer上，实际并不在viewer上       
    dataSources//是dataSourceDisplay的属性的快捷方式
        //Viewer.dataSources === Viewer.dataSourceDisplay.dataSources
        DataSourceCollection 
            GeoJsonDataSource
    entites//是defaultDataSource的属性的快捷方式，primitive的简化版.底层用的还是primitive
        //Viewer.entities === Viewer.dataSourceDisplay.defaultDataSource.entities
        Entity 
            XXXGriaphics(可修改样式)
    Scene
```
## 3DTiles
```js
3DTiles 1.0 规范允许异构数据共存于一个数据集上。3D 瓦片只是空间划分的单元，并不是该块三维空域内的具体三维物体。这些三维物体被称作“瓦片内容”。
    简单地理解为带有 LOD 的 glTF
    //http://mars3d.cn/dev/guide/map/tileset.html#_3-2-lod%E6%A0%91%E7%BB%93%E6%9E%84
    1.0 允许存在 7 种瓦片内容，它们的文件后缀名是：
        b3dm，异构 3D 模型。例如带纹理的地形和表面，3D 建筑外部和内部，大型模型//批次三维模型，内置一个 glTF 模型文件，应尽可能在数据生产时优化此 glTF 的绘制批次   //B3DM(批量3D模型) = featureTable记录渲染相关的数据 + batchTable记录属性数据 + glb            
            glb  // glTF binary 化,glTF //（TF传输格式）是一种使用 JSON标准的 3D场景和模型的文件格式
        i3dm，3D 模型实例。例如树木，风车，螺栓//实例三维模型，允许内嵌在 i3dm 文件内的 glTF 模型在 WebGL 种绘制多实例
        pnts，点云
        cmpt，复合格式，即前三者的混合体，合并细碎瓦片内容文件成一个，减少网络请求
        vctr，矢量瓦片，未正式发布，本篇不讨论
        json，这种叫做扩展数据集（ExternalTileset），即允许瓦片空域内再嵌套一个子 3DTiles
        空瓦片，即瓦片无内容
    而 1.0 的扩展项，也就是下一代标准增加了一种瓦片格式：
        glb//gltf，也就是直接将 glTF 模型文件作为瓦片内容文件
        
    cesium可以读取tileset中的{"geometricError":180.82317494275}用来干什么
	    一般单位是米（m），每个子tile孙子tile都有这个值，越精细的值越小，孙子的这个值比它爹小
        tileset 中的几何误差信息，如果几何误差较低，Cesium 可能加载更多的瓦片，以获得更高精度的图形。
        如果几何误差较高，Cesium 可能加载更少的瓦片，以提高性能,确定瓦片的加载方式
        //在webgl层级决定三角形剖分的程度
        
	整体代表什么，每个数各代表什么
		"boundingVolume": {
			-   "box"：表示边界体积为一个长方体，其位置和大小由"box"属性指定；
			-   "region"：表示边界体积为一个地理区域，由"region"属性指定；
			-   "sphere"：表示边界体积为一个球体，由"sphere"属性指定；
			-   "tileset"：表示边界体积为整个数据集，由"tileset"属性指定。
			"box": [
				50.0694580078125,75.6625518798828,34.4871654510498,
				421.810821533203,0,0,
				0,393.366622924805,0,
				0,0,52.166711807251
			]
			//或`region`属性的值为`[-1.3197209591796106, 0.6988424218, -1.3196390408203893, 0.6989055782, 0, 88]`，
				//表示该模型所在的区域位于经度-1.31972到-1.31964之间、纬度0.69884到0.69891之间，高度范围为0到88米。
		},这个包围盒是通过一个长方体盒子（box）来表示的，包含了以下12个数值：		
	-   前三个数（50.0694580078125，75.6625518798828，34.4871654510498）表示盒子的中心点在三维坐标系中的位置（x、y、z轴坐标）。
	-   接下来三个数（421.810821533203，0，0）表示盒子在x轴上的长度、y轴和z轴上的长度。
	-   再接下来三个数（0，393.366622924805，0）表示盒子在y轴上的长度、x轴和z轴上的长度。
	-   最后三个数（0，0，52.166711807251）表示盒子在z轴上的长度、x轴和y轴上的长度。

3DTILES的root的"transform": [
			-1.1348381601623395,			-0.2899580508025771,			-0.414291999686242,			0,//x、y、z三个轴向上的缩放比例
			-0.13570189487791788,			-0.33968642889259656,			0.6094602447327197,			0,//x、y、z三个轴向旋转的角度(弧度or度)
			-0.7711452290402661,			1.8167044083464686,			0.8408488797207132,			0,//x、y、z平移
			-2293908.7750967207,			5404110.700716343,			2484510.344405871,			1//3D Tiles数据集在全局坐标系中的位置
		]对于使用3D Tiles的应用程序来说，root transform的作用是将3D Tiles数据的本地坐标系映射到应用程序的全局坐标系，以便正确地显示和处理3D模型和场景。
		

```


## 实践
```javascript
概念
    Cesium ion是一个提供瓦片图和3D地理空间数据的平台
    使用geojson加载线数据在30万左右，矢量建筑面8万左右尚可
    OSGB//Open Scene Gragh Binary 是模型的二进制表示，所有纹理都包含在一个独立文件中。 OpenSceneGraph 是一个开源的高性能 3D 图形工具包 

    Matrix4//4x4转换矩阵，用于转换图块的根图块
    Ellipsoid//由方程在笛卡尔坐标系中定义的二次曲面//椭球体    
    I3S//(索引3D场景)Esri针对3D场景提出的一种数据格式，ArcGIS的场景服务都默认采用这种数据格式
    报错：
        //我发现原因是KHR_technique_webgl扩展新版Cesium已经不支持的缘故，需要升级一下gltf数据，使用KHR_techniques_webgl扩展即可(注意多了一个s)
        //Cesium在使用这个扩展时，gltf2.0也在逐步进化，居然连KHR_technique_webgl这个扩展的名字都改了，technique后面加了一个s。。所以现在的扩展名叫KHR_techniques_webgl

        
ECEF (Earth-Centered, Earth-Fixed)是一种表示地球中物体位置的坐标系，它是以地球的中心为原点并固定在地球上的坐标系。在ECEF坐标系中，三维坐标（x, y, z）表示物体与地球中心的距离。

坐标: //详见 https://github.com/Fang-Lansheng/Cesium
    pick：屏幕坐标 
        new Cesium.Cartesian2(x, y)     // 表示一个二维笛卡尔坐标系，也就是直角坐标系（屏幕坐标系）
    Cartesian3 //世界坐标（三维坐标） 3D笛卡尔点对象 //米单位;原点是地球几何中心； +x是中央经线，-x是180度经线
        new Cesium.Cartesian3(x, y, z)  // 表示一个三维笛卡尔坐标系，也是直角坐标系（就是真实世界的坐标系）
        //二维屏幕坐标系到三维坐标系的转换
            const pick = new Cesium.Cartesian2(window.innerWidth, window,innerHeight);	// 屏幕坐标
            const cartesian= scene.globe.pick(viewer.camera.getPickRay(pick), scene) // 世界坐标
    Cartographic(longitude, latitude/*弧度*/, height) //地理坐标（弧度）
    point：经纬度坐标
    
const transform =Cesium.Transforms.eastNorthUpToFixedFrame(点)//支持通过传入一个中心点，然后获取到中心点的正东正北，和地表法线的方向,返回以该点为中心的参考系
camera.lookAtTransform(transform,/*相机相对点的位置*/new Cesium.Cartesian3(0, 0, 120000.0));//整个sence以点为中心,而不是地心
camera.position//相对于transform的位置
camera.positionWC//相对于地心的位置,取位置转经纬度要取这个!!!!!!!!!!1111

实体模型分2种：
       Primitive API针对图形开发人员的低级应用程序(定制化高,更偏底层)
       Entity API针对数据驱动的可视化的高级应用程序(定制化低)
           

  
   
Cesium.Ion.defaultAccessToken = 'your_access_token';
const viewer = new Cesium.Viewer('cesiumContainer',{
    //viewer用于构建应用程序的基本小部件。它将所有标准Cesium小部件组合到一个可重用的程序包中
      animation: true,              // 是否显示动画小部件（左下角仪表盘）
      baseLayerPicker: true,        // 是否显示图层选择器
      fullscreenButton: true,       // 是否显示全屏按钮
      geocoder: true,               // 是否显示 geocoder 小部件（右上角查询按钮）
      vrButton: false,              // 是否显示 VR 按钮
      homeButton: true,             // 是否显示 Home 按钮
      infoBox: true,                // 是否显示信息框
      sceneModePicker: true,        // 是否显示 3D/2D 选择器
      selectionIndicator: false,    // 是否显示指示器组件
      timeline: false,              // 是否显示时间轴
      navigationHelpButton: false,  // 是否显示右上角的帮助按钮
      scene3DOnly: false,           // 如果设置为 true，则所有几何图形以 3D 模式绘制以节约GPU资源
      shadows : true,               // 是否显示阴影
      shouldAnimate : true,         // 是否显示动画
      imageryProvider: new Cesium.BingMapsImageryProvider({
							   url: 'https://dev.virtualearth.net',
							   key: 'YourBingMapKey',
							   mapStyle: Cesium.BingMapsStyle.AERIAL
						   }),//亦可viewer.imageryLayers.addImageryProvider
								var imageryViewModels = Cesium.createDefaultImageryProviderViewModels();//选择不同的地图图层
								viewer.imageryLayers.addImageryProvider(imageryViewModels[0].createProvider());
      // 加载地形系统
      terrainProvider : Cesium.createWorldTerrain({
								requestWaterMask : true,        // 动态水纹
								requestVertexNormals: true      // 光效
							  })
});


viewer.cesiumWidget.creditContainer.style.display = "none";//隐藏版权信息
viewer.entities.add  //点、标记、标签、线、模型、形状和物体\
viewer.trackedEntity = entity; // 镜头追踪，将镜头固定在对象上
viewer.scene.globe.enableLighting=true; // 阳光照射区域不高亮
viewer.scene.debugShowFramesPerSecond = true;  // 显示帧率
viewer.scene.globe.depthTestAgainstTerrain = true; // 控制视角不转到地下（确保在地形后面的物体被正确地遮挡，只有最前端的对象可见）


// 初始化相机参数
const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -90, 0);
const homeCameraView = {
	destination: new Cesium.Cartesian3.fromDegrees(114.29045969, 30.56173526, 40000),
	orientation: {
		//Heading //想象再飞机头,左右方向的改变
		//Pitch //飞机头俯仰角度的改变
		//Roll //飞机身向左右翻滚
		//Range //距中心的距离，以米为单位。
		//HeadingPitchRange【目标物与相机之间的距离和角度】指的是目标物距离相机的距离、相机的垂直角度和水平角度
		//HeadingPitchRoll【相机的旋转角度】指的是相机在水平、垂直和平面的旋转角度。
		heading: initialOrientation.heading //不知道设多少可以从控制台的camera.heading获取！！
		pitch: initialOrientation.pitch,
		roll: initialOrientation.roll
	}
};
viewer.scene.camera.setView(homeCameraView) // 设置初始视野视角
//也可以重写 homeButton
viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e)=>{e.cancel = true;viewer.camera.flyTo(homeCameraView)});
//viewer.zoomTo(tileset);//定位过去

// 创建一个 scene 实例 Scene是用来管理三维场景的各种对象实体的核心类.
const scene = viewer.scene;
// 创建一个 ellipsoid 实例
const ellipsoid = scene.globe.ellipsoid;
// 创建一个 clock 实例
const clock = viewer.clock;
// 创建一个 canvas 实例
const canvas = viewer.canvas
// 创建一个 camera 实例
const camera = viewer.scene.camera;
// 创建一个 entities 实例
const entities = viewer.entities;


获取视图中心的经纬度：
	var center = viewer.camera.positionCartographic;
	var longitude = Cesium.Math.toDegrees(center.longitude);
	var latitude = Cesium.Math.toDegrees(center.latitude);
	var height = center .height;
	[longitude,latitude,height]


3DTiles:
    tileset.boundingSphere
    //取得图层的坐标范围 tileset.boundingSphere.center为{ x: -181.90666255179437, y: -172.06516955205194, z: 1679.9689450075364 }
    viewer.scene.primitives.add(tileset);//添加到球体上  //primitives：图元 


弧度转经纬度
      var longitude = Cesium.Math.toDegrees(cartographic.longitude);
	  var latitude = Cesium.Math.toDegrees(cartographic.latitude);
      var height = cartographic.height;
      [longitude,latitude,height] 
      
笛卡尔3坐标转成经纬度
    const cartographic=viewer.scene.globe.ellipsoi.cartesianToCartographic(笛卡尔3坐标);
    //或者const cartographic=Cartographic.fromCartesian(tileset.boundingSphere.center)
    const lat=CesiumMath.toDegrees(cartographic.latitude);
    const lng=CesiumMath.toDegrees(cartographic.longitude);
    const alt=cartographic.height;

完美修正拟合tileset的高度到地面上
      const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center);//获得原始中心
      const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,0.0);
      const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,-cartographic.height );//减去高度      
      const translation = Cesium.Cartesian3.subtract(offset,surface,new Cesium.Cartesian3());//计算偏移
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      
提升tiles加载性能速度:
    1.开启 gzip压缩,传输的数据能节省小一半
    2.换转换工具,减少单个tile的大小, 减少索引Tile的个数(即增加.json文件个数)
    3.几个影响加载效率的关键参数：
        1.maximumScreenSpaceError//数据的清晰度,越大越粗糙,这个参数默认是16，只要是lab输出的数据，我们已经考虑这个默认值了，所以一般情况下，不需要修改        
        2.skipLevelOfDetail //对于网络条件好，并且数据总量较小的情况下，可以设置false，提升数据显示质量        
        3.preferLeaves //配合skipLevelOfDetail=true来设置preferLeaves=true。这样我们就能最快的看见符合当前视觉精度的块，对于提升大数据以及网络环境不好的前提下有一点点改善意义。        
        4.maximumMemoryUsage//这个值应该处于最差视角下资源占用 和 显存最大量之间            
    4:
        viewer.resolutionScale = 小于1 //降低画布分辨率
    5:
        viewer.scene.requestRenderMode = true;//启用requestRenderMode可减少Cesium渲染新帧的总时间并减少Cesium在应用程序中的总体CPU使用率。
        viewer.scene.maximumRenderTimeChange=Infinity //没用到时间相关的动画的话,就这样设置
        开启后有些情况需要调用强制重新渲染: scene.requestRender();
        
Cesium.CallbackProperty //用回调函数传入time,用于处理随时间变化的属性,如随时间改变,位置属性改变
```

## 矩阵

```js
Cesium.Matrix4.multiplyByMatrix3(m, rotation, m);替代了Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromRotationTranslation(rotation), m);

```

## 概念

```js
与ClampToGround不同，clampToHeight属性允许您将对象放置在地球表面之上或之下的指定高度
	//clampToHeight属性通常用于放置对象，例如气球、无人机或飞行器等，这些对象需要在指定的高度上悬停或飞行
```

