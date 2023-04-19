## 资源
[gw3_construkted/construkted.js at master · stefanciorici/gw3_construkted · GitHub](https://github.com/stefanciorici/gw3_construkted/blob/master/wp-content/themes/gowatch-child/js/construkted.js)泄露了官方的测量/距离/面积/模型位置编辑器插件
[Construkted-Reality/edd6b-Construkted](https://github.com/Construkted-Reality/edd6b-Construkted/tree/ba5418eaa26710e0b63440167c177a5014e046e5)具体分支
[master](https://github1s.com/Construkted-Reality/edd6b-Construkted/blob/master/edd-cesiumjs-customize/includes/js/CesiumIonSDKPlugin.js)
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
[cesium.jpg (3561×3574)](http://mars3d.cn/dev/img/jiagou/cesium.jpg)
```javascript
通用类/空间计算
	Cartesian3
	Catographic
	Matrix3(3x3矩阵，旋转变换)
	Quaternion(围绕某个向量旋转一定角度的变换)
	Matrix4(4x4矩阵，旋转加平移变换)
	Transforms(包含将位置转换为各种参考系的功能)
Viewer
	其他一大堆UI组件
		Animation
		BaseLayerPicker
		Cesium3DTilesInspector
		CesiumInspector
		CesiumWidget
		FullscreenButton
		Geocoder
		HomeButton
		InfoBox
		NavigationHelpButton
		ProjectionPicker
		SceneModePicker
		SelectionIndicator
		Timeline
		VRButton
    CesiumWidget//不包含任何UI组件的viewer，纯地球和星空
        //Viewer.scene === Viewer.cesiumWidget.scene
        Scene//用来操作一切
			Event 事件
		        pick/drillpick
				preUpdate
				postUpdate
				preRender
				postRender
            Camera
	            position(位置)
				heading(方位角)/绕z轴旋转
				pitch(俯仰角)/绕y轴旋转
				roll(翻滚角)/绕x轴旋转
            环境对象
	            skyAtmosphere(大气圈)
				skyBox(天空盒)
				sun(太阳)
				moon(月亮)
				flog(雾化)
				ParticleSystem(粒子系统)
            Globe //地球
				terrainProvider 地形
	                ArcGISTiledElevationTerrainProvider
					CesiumTerrainProvider
					EllipsoidTerrainProvider
					GoogleEarthEnterpriseTerrainProvider
					VRTheWorldTerrainProvider
                imageryLayers:ImageryLayerCollection影像
                    ImageryLayer
                    ImageryProvider
                        xxxImageryProvider
	                    ArcGisMapServerImageryProvider
						BingMapsImageryProvider
						GoogleEarthEnterpriselmageryProvider
						GridImageryProvider(开发调试)
						IonImageryProvider
						MapboxImageryProvider
						MapboxStylelmageryProvider
						OpenStreetMapImageryProvider
						SingleTilelmageryProvider
						TileCoordinatesImageryProvider(开发调试)
						TileMapServicelmageryProvider
						UrITemplateImageryProvider
						WebMapServicelmageryProvider
						WebMapTileServicelmageryProvider
                Ellipsoid//平面的地形
                Color
            ScreenSpaceCameraController  
                enableRotate|enableTranslate|enableZoom等
            primitives:PrimitiveCollection //它的removeAll()会把Cesium自己添加的东西也移除掉,慎用!
	            Visualizer //对象（呈现 3D 几何图形的实例）转换为 `Primitive` 并呈现在场景中
			        GeometryVisualizer：用于 `GeometryInstance` 
                Primitive
	                modelMatrix
                    Appearance
                        XXXAppearance
                            material   MaterialProperty
	                            ColorMaterialProperty颜色材质
								ImageMaterialProperty贴图材质
								CheckerboardMaterialProperty棋盘纹理
								StripeMaterialProperty条纹纹理
								GridMaterialProperty网格
								PolylineGlowMaterialProperty发光材质
								PolylineOutlineMaterialProperty外轮廓材质
								PolylineArrowMaterialProperty带有箭头的线
                            renderState
						EllipsoidSurfaceAppearance
						MaterialAppearance
						PerInstanceColorAppearance
						PolylineColorAppearance
						PolylineMaterialAppearance
                    GeometryInstance
                        XXXGeometry
                            geometry
                            modelMatrix
						BoxGeometry/BoxOutlineGeometry(立方体)
						CircleGeometry/CircleOutlineGeometry(圆形或者拉伸的圆形)
						CoplanarPolygonGeometry/CoplanarPolygonOutlineGeometry(任意面组成的多边形)
						CorridorGeometry/CorridorOutlineGeometry(走廊)
						CylinderGeometryy/CylinderOutlineGeometry(圆柱、圆锥或者载断的圆锥)
						EllipseGeometry/EllipseOutlineGeometry(椭圆或者拉伸的椭圆)
						EllipsoidGeometry/EllipsoidOutlineGeometry(球)
						FrustumGeometry/FrustumOutlineGeometry(视体)
						PlaneGeometry/PlaneOutlineGeometry(原点为中心的平面的几何形状)
						PolygonGeometry/PolygonOutlineGeometry(多边形，可以具有空洞或者拉伸一定的的高度)
						PolylineGeometry/SimplePolylineGeometry(多段线，可以具有一定的宽度)
						PolylineVolumeGeometry/PolylineVolumeOutlineGeometry(多段线柱体)
						RectangleGeometry/RectangleOutlineGeometry(矩形或者拉伸的矩形)
						SphereGeometry/SphereOutlineGeometry(球体)
						WallGeometry/WallOutlineGeometry()
                BillboardCollection //面朝屏幕的图片, 广告牌
                LabelCollection//面朝屏幕的文字
                GroundPolylinePrimitive
					GeometryInstance
						GroundPolylineGeometry
					Appearance
				GroundPrimitive
					GeometryInstance
					Appearance
				Cesium3DTileset
                    classificationType //将这个3dtile变成ClassificationPrimitive
				ClassificationPrimitive//一个不可见封闭的体,被它罩住的,就要用它的颜色附着
					GeometryInstance
					Appearance
				PointPrimitiveCollection
				PolylineCollection
				Model
				ParticleSystem
            grounPrimitives//贴地的
                GroundPolylinePrimitive  
    Clock
    ScreenSpaceEventHandler
    dataSourceDisplay
        dataSources
        defaultDataSource(CustomDataSource)
            entities
    dataSources:DataSourceCollectior//是dataSourceDisplay的属性的快捷方式
        DataSourceCollection 
            GeoJsonDataSource
            CustomDataSource
			CzmIDataSource
			KmIDataSource
    entities:EntityCollection//是defaultDataSource的属性的快捷方式，primitive的简化版.底层用的还是primitive
        //Viewer.entities === Viewer.dataSourceDisplay.defaultDataSource.entities
        Entity 
            XXXGriaphics(可修改样式)
			availability:TimeIntervalCollection
			BillboardGraphics(广告牌
			BoxGraphics(盒子)
			CorridorGraphics(走廊)
			CylinderGraphics(圆柱、圆锥或者截断的圆锥)
			EllipseGraphics(圆或者拉伸的椭圆)
			EllipsoidGraphics(椭圆)
			LabelGraphics(标签)
			ModelGraphics(模型)
			Cesium3DTilesetGraphics(三维瓦片
			PathGraphics(路径)
			PlaneGraphics(平面)
			PointGraphics(点)
			PolygonGraphics(多边形)
			PolylineGraphics(多线段)
			PolylineVolumeGraphics(多段线柱体)
			RectangleGraphics(矩形)
			WallGraphics(墙)


PolygonGraphics和PolygonGeometry的区别
	- PolygonGraphics用于创建多边形或多边形网格效果的可视化对象，主要应用于地图呈现和展示等场景
		- PolygonGeometry用于储存和编辑多边形的坐标和相关信息，主要用于几何计算和数据处理的场景。
	- PolygonGraphics可以通过Cesium API提供的多种属性来调整和修改多边形对象的外观效果，如边框、填充颜色、透明度、轮廓线等
		- PolygonGeometry则需要手动设置每个点的坐标、索引等信息。
	- PolygonGraphics支持一些交互事件，如鼠标点击、悬浮等，可以在用户与界面进行交互时进行响应
		- PolygonGeometry不支持这些事件，只是简单的几何体。
	- PolygonGraphics更加适用于可视化的场景
		- PolygonGeometry则更适合于几何计算和数据处理的场景。
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

viewer
	canvas
	scene
		globe
			ellipsoid
		camera
	entities
	clock


Radian、Degree和Cartesian3数据类型的示例值：
	- Radian类型：
	  - π：Cesium.Math.PI
	  - π/2：Cesium.Math.PI_OVER_TWO
	  - 2π：Cesium.Math.TWO_PI
	  
	- Degree类型：
	  - 90度：Cesium.Math.toRadians(90)
	  - 45度：Cesium.Math.toRadians(45)
	  - 180度：Cesium.Math.toRadians(180)
	  
	- Cartesian3类型：
	  - (1, 0, 0)：new Cesium.Cartesian3(1, 0, 0)
	  - (0, 1, 0)：new Cesium.Cartesian3(0, 1, 0)
	  - (0, 0, 1)：new Cesium.Cartesian3(0, 0, 1)
  
	其中，Radian类型表示弧度值，Degree类型表示角度值，Cartesian3类型表示三维笛卡尔坐标系中的点。

获取当前视图中心的经纬度：
	var center = viewer.camera.positionCartographic;
	var longitude = Cesium.Math.toDegrees(center.longitude);
	var latitude = Cesium.Math.toDegrees(center.latitude);
	var height = center .height;
	[longitude,latitude,height]



笛卡尔3转弧度 //Cesium.Cartographic.fromCartesian(center)
	var center = tileset.boundingSphere.center;
	var cartographic = Cesium.Cartographic.fromCartesian(center);
	var longitude = Cesium.Math.toDegrees(cartographic.longitude);
	var latitude = Cesium.Math.toDegrees(cartographic.latitude);
	var height = cartographic.height;
	[longitude,latitude,height]

弧度(小数形式的经纬度)转经纬度
      var longitude = Cesium.Math.toDegrees(cartographic.longitude);
	  var latitude = Cesium.Math.toDegrees(cartographic.latitude);
      var height = cartographic.height;
      [longitude,latitude,height] 
      
笛卡尔3坐标转成经纬度
	// 将笛卡尔坐标系转换为地理坐标系
	const cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(笛卡尔3);	
	// 获取经度和纬度
	const longitude = Cesium.Math.toDegrees(cartographic.longitude);
	const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height=cartographic.height;
     [longitude,latitude,height] 

完美修正拟合tileset的高度到地面上
      const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center);//获得原始中心
      const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,0.0);
      const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude,cartographic.latitude,-cartographic.height );//减去高度      
      const translation = Cesium.Cartesian3.subtract(offset,surface,new Cesium.Cartesian3());//计算偏移
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      
根据geojson生成城市粗模(多边形+拉伸高度即可)
	看https://sandcastle.cesium.com/gallery/GeoJSON%20and%20TopoJSON.html
		  const promise = Cesium.GeoJsonDataSource.load("XXX./geojson");
          promise.then(function (dataSource) {
              viewer.dataSources.add(dataSource);
              
              const entities = dataSource.entities.values;
              for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];                
                entity.polygon.extrudedHeight = entity.properties.geojson属性里的高度;
              }
            })
	设置颜色
	dataSource.entities.values.filter(i=>i.id.includes('200_')).forEach(i=>{
	    //dataSource.entities.remove(i)
	    i.polygon.material = Cesium.Color.RED.withAlpha(0.5);
	})
   
Cesium.CallbackProperty //用回调函数传入time,用于处理随时间变化的属性,如随时间改变,位置属性改变
```

## 向量

```js
一个平面可以由两个非平行的向量确定，而这两个向量的叉积即为法线向量

根据向量投影的定义，对于一个向量v和一个单位向量u，v在u方向上的投影向量proj_vu可以通过以下公式计算：
proj_vu = dot(v, u) * u
其中dot(v, u)是v和u的点积，表示v在u方向上的投影长度，u是一个单位向量，表示u的长度为1，方向与投影方向相同。
在这个例子中，杯子的移动向量为向右的单位向量(1,0,0)，桌面法线向量为向上的单位向量(0,1,0)。根据上述公式，投影向量proj_right_up可以计算为：
proj_right_up = dot((1,0,0), (0,1,0)) * (0,1,0) = 0 * (0,1,0) = (0,0,0)

	我不懂向量运算, dot((1,0,0), (0,1,0)) * (0,1,0) 的具体计算过程是?
		首先，dot((1,0,0), (0,1,0))表示向量(1,0,0)和向量(0,1,0)的点积，也称为内积。点积的计算公式是将两个向量对应位置的数值相乘，然后将乘积相加，即：		
		dot((1,0,0), (0,1,0)) = 1*0 + 0*1 + 0*0 = 0		
		所以，dot((1,0,0), (0,1,0))的结果为0。		
		接下来，我们将0乘以(0,1,0)。这个操作实际上是将向量(0,1,0)的每个分量都乘以0，得到的结果向量仍然是(0,1,0)本身。因此，		
		dot((1,0,0), (0,1,0)) * (0,1,0) = 0 * (0,1,0) = (0,0,0)		
		所以，这个计算的结果是(0,0,0)。		
		总结一下，这个计算的过程是：将向量(1,0,0)和向量(0,1,0)做点积，得到0，然后将0乘以向量(0,1,0)，得到的结果是(0,0,0)。
```


## 矩阵
![[Pasted image 20230411101658.png]]

```js
T如何移动一个点，举例矩阵相乘的详细步骤
	假设有一个点P(x, y, z)，现在想要将该点沿着X轴平移2个单位，沿着Y轴平移3个单位，沿着Z轴平移4个单位。可以使用变换矩阵来实现这个操作。变换矩阵可以表示为：	
	T = [1 0 0 2]
	    [0 1 0 3]
	    [0 0 1 4]
	    [0 0 0 1]	
	其中，第一列表示X轴的变换，第二列表示Y轴的变换，第三列表示Z轴的变换，最后一列表示平移向量。	
	现在，需要将点P应用该变换矩阵，以实现平移操作。可以按照以下步骤进行矩阵相乘：	
	1.  将点P表示为一个4维向量，即增加一个齐次坐标分量w=1：	
	P' = [x]
	     [y]
	     [z]
	     [1]	
	
	2.  将变换矩阵T表示为一个4x4的矩阵：		
	T = [1 0 0 2]
	    [0 1 0 3]
	    [0 0 1 4]
	    [0 0 0 1]	
	
	3.  将点P'和变换矩阵T相乘，得到一个新的4维向量P''：		
	P'' = T * P' = [1 0 0 2]   [x]
	               [0 1 0 3] * [y]
	               [0 0 1 4]   [z]
	               [0 0 0 1]   [1]	
	
	4.  对于新的4维向量P''，将其前三个分量（x, y, z）除以最后一个分量（w=1），即可得到平移后的新点坐标：		
	x' = P''[0] / P''[3] = x + 2
	y' = P''[1] / P''[3] = y + 3
	z' = P''[2] / P''[3] = z + 4		
	综上，通过矩阵相乘的方式，可以将点P沿着X轴平移2个单位，沿着Y轴平移3个单位，沿着Z轴平移4个单位。
	这种方法非常高效，可以同时对多个点进行平移操作，而且可以方便地组合不同的变换操作。


Cesium.Matrix4要注意阅读顺序的问题
	//不符合直觉的写法
		const v = [
		        1, 2, 3, 4, 
		        5,6,7,8, 
		        9,10,11,12,
		        13,14,15,16
		        ];
		
		const m = Cesium.Matrix4.fromArray(v);
		console.log(m.toString())
			//(1, 5, 9, 13)
			//(2, 6, 10, 14)
			//(3, 7, 11, 15)
			//(4, 8, 12, 16)
	//符合直觉的写法
		const v = [
		        1, 2, 3, 4, 
		        5,6,7,8, 
		        9,10,11,12,
		        13,14,15,16
		        ];
		const m = Cesium.Matrix4.fromRowMajorArray(v);//fromColumnMajorArray
		console.log(m.toString())
			//(1, 2, 3, 4)
			//(5, 6, 7, 8)
			//(9, 10, 11, 12)
			//(13, 14, 15, 16)
			

缩放模板，将z轴值放大1.00002，相当于向上移动了
const v = [
	1.0000, 0.0, 0.0, 1.0, 
	0.0, 1.0000, 0.0, 1.0, 
	0.0, 0.0, 1.00002, 1.0, 
	0.0, 0.0, 0.0, 1.0];
  const m = Cesium.Matrix4.fromArray(v);
  tileset.modelMatrix = m

cesium的tileset的modelMatix为,描述做了什么样的变化, 每行每列各有什么作用?
	(0, 0, 1, 6378137)//因为1在第三个,所以作用于z轴,将模型的z轴（垂直于模型表面的轴）沿着地球的表面朝向正上方，即垂直于地球表面，同时将模型的原点移动到地球表面上，距离地心的距离为6378137米（地球半径）。
	(1, 0, 0, 0)//将模型的x轴（水平于模型表面的轴）指向地球上的经度为0度的位置，即 Greenwich 本初子午线。
	(0, 1, 0, 0)//将模型的y轴（与x、z轴垂直的轴）指向地球上的纬度为0度的位置，即赤道。
	(0, 0, 0, 1)//不进行任何透视变换，即模型在投影到地球表面时大小不会发生变化。
	
	这个矩阵如何作用于点(2,3,4),描述一下结果和计算过程?		
		首先，将点(2, 3, 4)表示为一个列向量：		
		| 2 |
		| 3 |
		| 4 |
		| 1 |	
		接下来，将该向量与模型矩阵相乘，即：		
		| 0 0 1 6378137  |   | 2 |
		| 1 0 0 0        | x | 3 |
		| 0 1 0 0        |   | 4 |
		| 0 0 0 1        |   | 1 |	
		
		按照矩阵乘法的规则，可以将该计算分解为以下四个部分：		
		1. 第一列乘以向量的第一个元素：(0, 0, 1, 6378137) * 2 = (0, 0, 2, 12756274)。		
		2. 第二列乘以向量的第二个元素：(1, 0, 0, 0) * 3 = (3, 0, 0, 0)。		
		3. 第三列乘以向量的第三个元素：(0, 1, 0, 0) * 4 = (0, 4, 0, 0)。		
		4. 最后一列乘以向量的第四个元素：(0, 0, 0, 1) * 1 = (0, 0, 0, 1)。		
		将上述四个部分相加，得到最终的结果向量：		
		
		| 0 0 2 12756274 |
		| 3 0 0 0         |
		| 0 4 0 0         |
		| 0 0 0 1         |		
		
		因此，点(2, 3, 4)在该模型矩阵的作用下被转换为点(2, 3, 6.2756274e+06)，位于地球表面上的一个点。

Cesium.Matrix4.multiplyByMatrix3(m, rotation, m);替代了Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromRotationTranslation(rotation), m);
```
![[Pasted image 20230409173031.png]]图片

```js
Cesium.Transforms.eastNorthUpToFixedFrame //是回退变换, 在地球上，每个点都有一个本地坐标系，它是以该点为原点，以地球表面的法线方向为z轴建立的一个坐标系。然而，当我们需要在计算机中对地球上的点进行处理时，通常需要将这些点转换为一个固定的坐标系，方便进行计算和可视化。
	,/eastNorthUp 坐标系主要用于处理经纬度和高度等地理信息数据/
	东北天坐标系（East-North-Up，ENU）是绿色的那个,是局部坐标系,# 垂直于当前地表的垂直坐标系
	固定坐标系（Fixed Frame）是蓝色的那个,是全局坐标系

```

## 概念

```js
与ClampToGround不同，clampToHeight属性允许您将对象放置在地球表面之上或之下的指定高度
	//clampToHeight属性通常用于放置对象，例如气球、无人机或飞行器等，这些对象需要在指定的高度上悬停或飞行
```

## 相机

```js
鼠标选转的其实是整个场景或者宇宙, 而不是相机,如果将相机viewer.camera.lookRight(10)偏移开,在再怎么旋转也看不到地球

const transform =Cesium.Transforms.eastNorthUpToFixedFrame(点)//根据传入的点坐标生成以该点为中心，x轴指向正东、y轴指向正北、z轴指向地表法线方向的右手笛卡尔坐标系
camera.lookAtTransform(transform,/*相机相对点的位置*/new Cesium.Cartesian3(0, 0, 120000.0));//让相机以该点为中心,而不是地心
camera.position//相对于transform的位置

在 Cesium 中，`camera.*WC` 表示相机的属性在世界坐标系中的值。具体来说，`camera` 是 `Viewer` 对象中的一个属性，用于表示当前的相机状态。`camera.*WC` 中的 `*` 可以是以下几个属性：
- `positionWC`：相机在世界坐标系中的位置，即相机在地球表面上的位置。相对于地心的位置,取位置转经纬度要取这个!!!!!!!!!!
- `directionWC`：相机在世界坐标系中的方向向量，即相机从当前位置朝向的方向。
- `upWC`：相机在世界坐标系中的上向量，即相机坐标系的 y 轴方向在世界坐标系中的方向。
- `rightWC`：相机在世界坐标系中的右向量，即相机坐标系的 x 轴方向在世界坐标系中的方向。
```
![[Pasted image 20230411105231.png]]
 
```js
Ion使用Durandal开发: https://ion.cesium.com/main.js
	是一个基于 Knockout.js 和 RequireJS 的前端 MVVM 框架,用来开发SPA。
	Durandal 的核心思想是模块化和组件化，它通过模块化的方式管理应用程序的各个部分，并且提供了一个强大的组件系统，可以让开发者轻松地构建可重用的 UI 组件。
	durandal/activator	
		Durandal 提供了一个名为 Activator 的工具，它用于管理 ViewModel 的生命周期。
		Activator 可以帮助开发者创建和销毁 ViewModel 实例，并且提供了一组方法，用于激活和停用 ViewModel 实例。	
		Activator 的主要作用是实现 ViewModel 的惰性加载和缓存，它可以在需要时动态地创建 ViewModel 实例，在不需要时销毁实例，并且可以缓存已经创建的实例，以提高性能和减少资源消耗。
		Activator 还提供了一些事件和钩子函数，可以让开发者在 ViewModel 的生命周期中执行一些自定义逻辑。
		例如：
			var MyViewModel = function() {
			  this.displayName = 'Hello, Durandal!';
			};		
			var activator = new DurandalActivator();
			var viewModel = activator.create(MyViewModel);
			
			// 激活 ViewModel
			activator.activate(viewModel);		
			// 停用 ViewModel
			activator.deactivate(viewModel);
	路由匹配
		https://ion.cesium.com/tilesetLocationEditor/1626609
		到了tilesetLocationEditor, 到了TilesetTransformEditor, define("Views/TilesetTransformEditor/TilesetTransformEditor 48250
		调用了它的activate方法//`activate`函数是Durandal中一个最常用的生命周期钩子函数，它会在路由激活时执行			
			const v = new D({ 48440 TransformEditor		
	
https://ion.cesium.com/ThirdParty/@cesiumgs/cesium-analytics/Cesium.js
	function Ja(e) { 182222 TransformEditorViewModel
	jA.prototype.handleLeftDown 182153 TranslationEditor

	
const transformEditor = new TransformEditor/TransformEditorViewModel/TranslationEditor({
      container: viewer.container,
      scene: viewer.scene,
      transform: tileset.modelMatrix,
      boundingSphere: tileset.boundingSphere,
      originOffset: tileset.boundingSphere.center // 可选, 是控件的原点偏移量cartesian值,
	      //TranslationEditor.prototype.update时
});
// 根据transform, 如果在地球球心即0,0,0 则将其移动到地球表面,也就是移动一个地球半径即z轴+6378137米

TranslationEditor.prototype.handleLeftDown获得offset
TranslationEditor.prototype.handleMouseMove改变transform为moveVector-offset

//更新控件位置, 基于transform和设置的控件偏移originOffset
TranslationEditor.prototype.update
```
