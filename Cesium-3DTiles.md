> Cesium从版本 v1.35(2017-07-05) 就已经开始提供对 3D Tiles 1.0 草案的支持，并持续保持对最新3D Tiles 规格的支持更新

## 3DTiles下载器爬虫
1. [WangMingHua111/3dtilesdownloader: 3dtiles 网络文件下载器](https://github.com/WangMingHua111/3dtilesdownloader) 上次更新2021 年 8 月 ，npm cli包，试了，下载的是cesiumlab的clt，自动解包是空文件夹，无效❌
2. [IKangXu/3dtilesdownloader: 下载在线3dtiles数据，可自指定多线程数，可分段下载，可指定位置下载。](https://github.com/IKangXu/3dtilesdownloader) 上次更新2022 年 10 月，py3写的，可下载external tilesets（我称之为层级tilesets）
> 3D Tiles 支持多个其他 JSON 文件的 JSON 索引。这是通过使用external tilesets外部瓦片集实现的，外部瓦片集是使用 URL 或相对路径引用其他瓦片集的 JSON 文件。 通过这种方式，单个顶级 tileset JSON 文件可以引用和索引多个其他 tilesets，从而实现大型 3D 数据集的高效组织和管理。每个引用的图块集都可以包含自己的图块集、属性和元数据，并且可以独立于其他图块加载和显示。
3. [CHENJIAMIAN/xt3d-local-debug: xt3d.js本地调试](https://github.com/CHENJIAMIAN/xt3d-local-debug) 里包含了2023年5月5日最新可用的几个下载器，是我整理归纳的

### 处理与转换
> [三维模型：人工建模模型转为3DTiles格式 | Mars3D开发教程](http://mars3d.cn/dev/guide/data/tileset.html#_1-%E4%BA%BA%E5%B7%A5%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%9E%8B%E4%BB%8B%E7%BB%8D)
#### 1. Github 开源的小工具
##### 3dtiles压缩/组合/合并/升级/封包, glb/gltf/b3dm/i3dm互转
1. https://github.com/CesiumGS/3d-tiles-tools 
	- npx 3d-tiles-tools b3dmToGlb -i ./specs/data/batchedWithBatchTableBinary.b3dm -o ./output/extracted.glb
		- 2023年7月5日测试出现'v_texCoord_0' : undeclared identifier的错误
##### gltf/glb互转 1.0/2.0互转
1. https://github.com/CesiumGS/gltf-pipeline 
##### obj转3dtile
https://github.com/PrincessGod/objTo3d-tiles 最后一次更新是19年,2023年7月5日测试有效
1. 好像不能切成多个b3dm
##### osgb转3dtiles
1. [fanvanzh/3dtiles: The fastest tools for 3dtiles convert in the world!](https://github.com/fanvanzh/3dtiles#%E7%AE%80%E4%BB%8B) 2023年5月刚更新
	1. 要编译出来, 需要安装rust环境(前提是安装vs studio的c++环境)
	2. 看了源码,只能把OSGB转为3dtiles(readme说可以转fbx,骗人的,issue里作者说一直没开发它)
2. [Construkted-Reality/3DTG：将 3d 模型转换为 3d tiles](https://github.com/Construkted-Reality/3DTG)目前该工具只接受带纹理的 OBJ 文件
#### 2. Cesium 官方推出的 Cesium Ion 在线平台（对国内企业来说有点鸡肋）
- 最简单的办法: [My Assets | Cesium ion --- 我的资产 |铯离子](https://ion.cesium.com/assets/)可以在线免费转3DTiles再下载下来
- 装个**[cesium-ion-3ds-max-plugin](https://github.com/CesiumGS/cesium-ion-3ds-max-plugin)** , 在3dmax里点击上传,在下载下来
	- 铯离子需要将所有 Autodesk 材质烘焙为纹理。如果在铯离子上材质未正确渲染，您需要在导出之前将材质烘焙到 3ds Max 中的纹理。
	- **有个致命的问题: 无法单体选择( cesiumlab转的可以拿到zi单体的id(随机)和name(对象名称) )**
#### 3. 一些商家推出的工具集（如 cesiumlab）


## 3DTiles
```js
3DTiles 1.0 规范允许异构数据共存于一个数据集上。3D 瓦片只是空间划分的单元，并不是该块三维空域内的具体三维物体。这些三维物体被称作“瓦片内容”。
    简单地理解为带有 LOD 的 glTF
    //http://mars3d.cn/dev/guide/map/tileset.html#_3-2-lod%E6%A0%91%E7%BB%93%E6%9E%84
    1.0 允许存在 7 种瓦片内容，它们的文件后缀名是：          
        B3DM代表“Batched 3D Model”，它是一种基于glTF格式的3D数据模型。它可以包含多个独立的3D模型，并将它们合并成一个单独的文件，从而提高了加载和渲染速度。
	        //B3DM通常用于存储建筑物、道路、桥梁等人工结构的3D模型。
	        //B3DM(批量3D模型) = featureTable 记录渲染相关的数据 + batchTable记录属性数据 + glb     
				featureTable，记录的是整个瓦片渲染相关的数据，而不是渲染所需的数据。
					渲染相关，即有多少个模型，坐标是相对的话相对于哪个中心，如果是点云的话颜色信息是什么以及坐标如何等；
					渲染所需，例如顶点信息、法线贴图材质信息均有glb部分完成。
				batchTable
					# 记录属性数据
					在一个瓦片中，一个三维**要素**（GIS中的通常叫法）
						= 一个**模型**（图形学、工业建模叫法） = 一个**BATCH**（3dtiles叫法）
	        glb  // glTF binary 化,glTF //（TF传输格式）是一种使用 JSON标准的 3D场景和模型的文件格式
		I3DM代表“Instanced 3D Model”，它也是基于glTF格式的3D数据模型，但它包含了多个实例化的3D模型，每个实例都有自己的变换矩阵和材质属性。
			//因此，I3DM通常用于存储大规模场景中的重复对象，如树木、草丛、石头等自然元素。
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
        
3DTILES的root的"transform": [
			-1.1348381601623395,			-0.2899580508025771,			-0.414291999686242,			0,//x、y、z三个轴向上的缩放比例
			-0.13570189487791788,			-0.33968642889259656,			0.6094602447327197,			0,//x、y、z三个轴向旋转的角度(弧度or度)
			-0.7711452290402661,			1.8167044083464686,			0.8408488797207132,			0,//x、y、z平移
			-2293908.7750967207,			5404110.700716343,			2484510.344405871,			1//3D Tiles数据集在全局坐标系中的位置
		]对于使用3D Tiles的应用程序来说，root transform的作用是将3D Tiles数据的本地坐标系映射到应用程序的全局坐标系，以便正确地显示和处理3D模型和场景。
		
```

## 源码结构 1.104版本

```js
Cesium3DTileset.js //定义了3D Tiles集合对象，它是一个包含多个3D Tiles图块的容器。集合对象可以加载和渲染大量的3D Tiles数据，并提供一组方法用于控制3D场景中的3D Tiles实体。
	Cesium3DTile.js//Cesium3DTile.js是Cesium 3D Tiles库的主要文件，它定义了一组类和函数，用于加载、渲染和操作3D Tiles数据。
	Cesium3DTileBatchTable.js //定义了批量表对象，这是一种存储与3D Tiles实体相关的元数据的机制。批量表可以存储任何类型的数据，例如颜色、材质、名称等。批量表适用于大量实体共享相同属性的场景。
	Cesium3DTileColorBlendMode.js //定义了一组颜色混合模式，用于控制在渲染3D Tiles时如何混合不同实体的颜色。例如，可以使用混合模式将半透明的实体与其他实体混合，以创建透明效果。
	Cesium3DTileContent.js //定义了3D Tiles内容对象，该对象包含了一个或多个3D Tiles图块的几何数据和元数据。内容对象可以包含多个3D Tiles特征，每个特征都是一个实体或对象，具有自己的位置、几何形状和属性。
	Cesium3DTileContentFactory.js //是一个工厂类，用于创建3D Tiles内容对象。它接受3D Tiles图块数据和元数据，并根据其内容类型返回适当的内容对象。
	Cesium3DTileContentState.js //定义了一组状态，用于跟踪3D Tiles内容对象的加载和渲染状态。这些状态包括未加载、正在加载、已加载、正在渲染和已渲染。
	Cesium3DTileContentType.js //定义了一组3D Tiles内容类型，例如点、线和面。这些类型用于确定要在3D场景中呈现哪些几何形状。
	Cesium3DTileFeature.js //定义了3D Tiles特征对象，该对象表示3D Tiles实体的一个实例。特征对象包含实体的位置、几何形状和属性数据。
	Cesium3DTileFeatureTable.js //定义了特征表对象，它是一种存储3D Tiles特征属性数据的机制。特征表可以存储任何类型的数据，例如颜色、材质、名称等。
	Cesium3DTileOptimizationHint.js //定义了一组优化提示，用于在3D Tiles加载和渲染过程中优化性能。例如，可以使用优化提示告诉引擎何时缩小图块的数量，以改善性能。
	Cesium3DTileOptimizations.js //定义了一组优化选项，用于控制在3D Tiles加载和渲染过程中应用哪些优化。例如，可以使用优化选项来关闭半透明实体渲染、开启LOD（级别细节）渲染等。
	Cesium3DTilePass.js //定义了一组通道，用于控制在3D Tiles加载和渲染过程中应该如何处理不同类型的实体。例如，可以使用通道将透明实体与不透明实体分开渲染，以避免混合问题。
	Cesium3DTilePassState.js //定义了一组通道状态，用于跟踪3D Tiles加载和渲染过程中通道的状态。这些状态包括通道是否启用、通道的深度测试和混合模式等。
	Cesium3DTilePointFeature.js //定义了一组点特征对象，该对象表示3D Tiles中的点实体。点特征对象包含实体的位置、大小、颜色和属性数据。
	Cesium3DTileRefine.js //定义了一组细化选项，用于控制在3D Tiles加载和渲染过程中如何细化图块。细化选项可以控制在哪个级别上细化、是否细化到最细级别等。
	Cesium3DTileStyle.js //定义了一种样式语言，用于在3DTiles中定义实体的样式和外观。样式可以控制实体的颜色、大小、材质、可见性等属性。
	Cesium3DTileStyleEngine.js //是一个样式引擎，用于解析和应用3D Tiles样式语言。它接受一个样式字符串，并将其转换为实体的属性和样式。	
	Cesium3DTilesetBaseTraversal.js //定义了一组遍历算法，用于遍历3D Tiles图块的层次结构。遍历算法可以优化3D Tiles数据的加载和渲染，以提高性能和效率。
	Cesium3DTilesetCache.js //定义了一个缓存对象，用于存储3D Tiles图块的数据和元数据。缓存对象可以提高3D Tiles数据的加载速度和性能。
	Cesium3DTilesetHeatmap.js //定义了一种热力图算法，用于在3D Tiles中可视化数据。热力图可以将数据表示为不同颜色的热点，以帮助用户更直观地理解数据。
	Cesium3DTilesetMetadata.js //定义了一组元数据对象，用于存储3D Tiles实体的附加信息。元数据可以存储任何类型的数据，例如时间戳、描述、标签等。
	Cesium3DTilesetMostDetailedTraversal.js //加载与相机平截头体相交的所有叶子的遍历。用于在 pickFromRayMostDetailed 调用期间确定光线瓦片集的交点。
	Cesium3DTilesetSkipTraversal.js //定义了一种跳过遍历算法，用于在3D Tiles中跳过不需要加载和渲染的图块。这种遍历算法可以提高3D场景的加载速度和性能。
	Cesium3DTilesetStatistics.js //定义了一组统计信息，用于跟踪3D Tiles数据的加载和渲染。统计信息可以提供有关3D场景性能和效率的有用信息。
	Cesium3DTilesetTraversal.js //定义了一组遍历算法，用于遍历3D Tiles图块的层次结构。遍历算法可以优化3D Tiles数据的加载和渲染，以提高性能和效率。
	Cesium3DTilesVoxelProvider.js //从 3D Tiles tileset 中获取体素数据
	
依赖关系	
	Cesium3DTileset.js
	    Cesium3DTile.js
	       Cesium3DTileContentFactory.js
	       Cesium3DTileContentState.js
	       Cesium3DTileContentType.js
	       Cesium3DTileOptimizationHint.js
	       Cesium3DTilePass.js
	       Cesium3DTileRefine.js
	    Cesium3DTileColorBlendMode.js
	    Cesium3DTileContentState.js
	    Cesium3DTilesetMetadata.js
	    Cesium3DTileOptimizations.js
	       Cesium3DTileOptimizationHint.js
	    Cesium3DTilePass.js
	    Cesium3DTileRefine.js
	    Cesium3DTilesetCache.js
	    Cesium3DTilesetHeatmap.js
	    Cesium3DTilesetStatistics.js
	    Cesium3DTileStyleEngine.js
	    Cesium3DTilesetMostDetailedTraversal.js
	       Cesium3DTileRefine.js
	       Cesium3DTilesetTraversal.js
	          Cesium3DTileOptimizationHint.js
	          Cesium3DTileRefine.js
	    Cesium3DTilesetBaseTraversal.js
	       Cesium3DTileRefine.js
	       Cesium3DTilesetTraversal.js
	          Cesium3DTileOptimizationHint.js
	          Cesium3DTileRefine.js
	    Cesium3DTilesetSkipTraversal.js
	       Cesium3DTileRefine.js
	       Cesium3DTilesetTraversal.js
	          Cesium3DTileOptimizationHint.js
	          Cesium3DTileRefine.js
```

## tileset.json文件

```js
1. asset：表示数据集相关信息，例如版本、作者、生成工具等。
2. geometricError：表示瓦片精度，即瓦片相对于父瓦片的误差范围。
3. root：表示整个数据集根瓦片的位置和属性，例如瓦片边界、坐标系等。
4. properties：表示数据集中可能包含的自定义属性。
5. extensions：表示3D Tiles规范中使用的扩展，例如Batch Table和Feature Table等。
6. extras：表示额外的元数据，通常用于应用程序特定的元数据。

Tileset JSON文件还可以包含其他属性，例如LOD细节级别、子瓦片的链接关系等。
Tileset JSON文件仅作为数据集的描述文件，不包括实际的3D模型数据。每个瓦片的实际数据存储在不同的glTF文件中。
```

### 说说root

```js
在3D Tiles数据集中，root表示整个数据集的根瓦片。Tileset JSON文件中的root属性包含了描述根瓦片的信息，如下所示：
"root": {
    "boundingVolume": {...},
    "geometricError": 200.0,
    "refine": "ADD",
    "content": {		
	    "uri":'gltf等模型的地址',
		"boundingVolume": {
			//"box"：表示边界体积为一个长方体，其位置和大小由"box"属性指定；
			//"region"：表示边界体积为一个地理区域，由"region"属性指定；
			//"sphere"：表示边界体积为一个球体，由"sphere"属性指定；
			//"tileset"：表示边界体积为整个数据集，由"tileset"属性指定。
			"box": [
				50.0694580078125,75.6625518798828,34.4871654510498,整体代表什么，每个数各代表什么
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
    }
    children: 类root
}

其中：
1. boundingVolume：描述根瓦片的边界体积，可以是一个包围盒或者球体。
2. geometricError：描述根瓦片相对于父瓦片的误差范围，通常为最大误差距离的一半。
3. refine：描述根瓦片进一步细分的方式，可以是"ADD"或者"REPLACE"。"ADD"表示在当前精度级别上添加更多子瓦片，"REPLACE"表示用更高精度的瓦片替换当前瓦片。
4. content：描述根瓦片实际包含的数据。通常指向包含根瓦片数据的glTF文件或多个glTF文件的文件夹路径。

通过解析root属性来获得3D Tiles数据集的基本信息和结构。
```

### root.BoundingVolume.region

```js
1. 最小经度（单位：弧度）
2. 最小纬度（单位：弧度）
3. 最小高度（单位：米）
4. 最大经度（单位：弧度）
5. 最大纬度（单位：弧度）
6. 最大高度（单位：米）

前三个数字表示长方体的左下角坐标，后三个数字表示长方体的右上角坐标。
如果某个瓦片的边界体积完全包含在这个长方体边界体积内，那么该瓦片就需要加载和渲染。

需要注意的是，`region` 属性中的经纬度坐标是以弧度为单位的，而高度是以米为单位的。如果你需要使用度数表示经纬度坐标，可以将其乘以 `Math.PI / 180` 进行转换。同样的，如果你需要使用英尺表示高度，可以将其乘以 `3.28084` 进行转换。
```

## 源码
```js
Cesium3DTile.js
	createBoundingVolume
	createRegion
		可选createBoxFromTransformedRegion
例如：
	Cesium3DTileset (Cesium3DTileset.js:1035)
	Promise.then（异步）
	Cesium3DTileset.loadTileset (Cesium3DTileset.js:2234)
	makeTile (Cesium3DTileset.js:2289)
	Cesium3DTile (Cesium3DTile.js:110)
	Cesium3DTile.createBoundingVolume (Cesium3DTile.js:1781)
		三个分支:
		createBox | createRegion | createSphere 
		对应:
		TileOrientedBoundingBox | TileBoundingRegion | TileBoundingSphere

Cesium3DTileset.js在构造函数阶段会保存原始的、未转换的边界体积位置，以便我们可以应用运行时的瓦片变换和模型矩阵
	const boundingVolume = that._root.createBoundingVolume(tilesetJson.root.boundingVolume , Matrix4.IDENTITY);

打断点看createBoundingVolume的结果

B3dmLoader
	B3dmLoader.prototype.load 
		batchTableJson定义了一个b3dm文件里面多个gltf模型各自的属性
```

### CustomShader渲染堆栈
```js
CustomShader渲染堆栈：
    CustomShaderPipelineStage.process (CustomShaderPipelineStage.js:74) || PrimitiveRenderResources
    ModelSceneGraph.buildDrawCommands (ModelSceneGraph.js:527)
    buildDrawCommands (Model.js:1967)
    Model.update (Model.js:1796) | 'processLoader分支'
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
```
### b3dm处理

```js
'processLoader分支'
	B3dmLoader的createStructuralMetadata ,/此处可获取gltf的components.structuralMetadata.propertyTables[0]._jsonMetadataTable._properties模型的属性
	GltfLoader.parse
	GltfLoader.loadResources
    GltfLoader.process
    B3dmLoader.process (B3dmLoader.js:294)
    Model的processLoader
    Model.update (Model.js:1821)
    Model3DTileContent.update
```

### 在主更新循环中调用3dtile的更新方法
```js
在主更新循环中调用3dtile的更新方法
    'updateTiles (Cesium.js:107633)分支'
    'requestTiles (Cesium.js:107407)分支'
    update(tileset, frameState, passStatistics, passOptions)  (Cesium.js:107784)
    Cesium3DTileset.updateForPass (Cesium.js:107829)
    Cesium3DTileset.update (Cesium.js:107800)
    PrimitiveCollection.update (Cesium.js:122827)
    Scene的updateAndRenderPrimitives   || 'Scene的executeCommand分支'
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
```
### 'Scene的executeCommand分支'
```js
    分支们：
        'Scene的executeCommand分支'
            Context.continueDraw (Cesium.js:32629)  ||  'Context的beginDraw分支'
            Context.draw (Cesium.js:32685)
            DrawCommand.execute (Cesium.js:18200)
                DrawCommand，是 Cesium 封装 WebGL 的一个优秀设计，它把绘图数据（VertexArray）和绘图行为（ShaderProgram）作为一个对象，待时机合适，也就是 Scene 执行 executeCommand 函数时，帧状态对象上所有的指令对象就会使用 WebGL 函数执行，要什么就 bind 什么，做到了在绘图时的用法一致，上层应用接口只需生成指令对象。
                    VertexArray//Cesium 把 WebGL 的顶点缓冲和索引缓冲包装成了 Buffer，然后为了方便，将这些顶点相关的缓冲绑定在了一个对象里，叫做 VertexArray，内部会启用 WebGL 的 VAO 功能。
                    ShaderProgram//着色器代码由 ShaderSource 管理，ShaderProgram 则管理起多个着色器源码，也就是着色器本身。使用 ShaderCache 作为着色器程序的缓存容器。
            Scene的executeCommand (Cesium.js:199593) //遍历了frustumCommands.commands[Pass_default.GLOBE]
                'Context的beginDraw分支'/context._gl.drawElements和context._gl.drawArrays在此执行/                                        
                    createAndLinkProgram (ShaderProgram.js:213) 在gl.linkProgram(program)打断点可以看到fsSource/vsSource即WebGL的shader代码，                    
                    reinitialize (ShaderProgram.js:470)
                    initialize (ShaderProgram.js:463)
                    ShaderProgram._bind (ShaderProgram.js:542) 在ShaderProgram.prototype._bind打条件断点this._fragmentShaderText.includes('特殊标识')可以找到CustomShader在合成后的shader代码
                    beginDraw (Context.js:1291)
```
### 'requestTiles (Cesium.js:107407)分支'
```js
        'requestTiles (Cesium.js:107407)分支'
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
	            本质是modelMatrix 决定了位置而 ModelSceneGraph.buildDrawCommands 用 ModelDrawCommand 决定了 modelMatrix 取决于: 
		            1.this.runtimePrimitive.boundingSphere//取决于GLTF中定义的scene.nodes[i].primitives[j].attributes[k].min|max的xyz坐标  
					2.this._modelMatrix//取决与我们代码传入的modelMatrix  
					3.this._boundingVolume //同this.runtimePrimitive.boundingSphere, 但还判断是场景是2D模式还是3D模式
	            //是 model._boundingSphere
	            //是 model._sceneGraph.boundingSphere.center 
	            //是 ModelSceneGraph.js 的 ModelSceneGraph.buildDrawCommands的model 的 
		            //this._boundingSphere = BoundingSphere.fromCornerPoints(primitiveRenderResources.positionMin 和 positionMax)
	            //是 PrimitiveRenderResources 的 runtimePrimitive.primitive.attributes[0]是:
						{
						    "name": "POSITION",
						    "semantic": "POSITION",
						    "componentDatatype": 5126,
						    "type": "VEC3",
						    "normalized": false,
						    "count": 240,
						    //位置就藏在这里!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						     "min": {"x": 1214922.0063094844,"y": -4736399.2068924345,"z": 4081525.4477709476},
                                "max": {"x": 1215121.59033861,"y": -4736238.163863403,"z": 4081670.8300574976},
						    "constant": {"x": 0,"y": 0,"z": 0},
						    "buffer": {
						        "_id": "a3ded257-2908-4de7-9476-4baa2a022801",
						        "_gl": {},
						        "_webgl2": true,
						        "_bufferTarget": 34962,
						        "_sizeInBytes": 2880,
						        "_usage": 35044,
						        "_buffer": {},
						        "vertexArrayDestroyable": false
						    },
						    "byteOffset": 0,
						    "byteStride": 12
						}
				//primitive是ModelSceneGraph.traverseAndCreateSceneGraph把ModelSceneGraph._components.scene.nodes[i].rootNode.primitives[j]传给new ModelRuntimePrimitive再推进runtimePrimitive数组的
				//primitive.attributes 本质是GltfLoader.js构造的node,见[[Cesium-GLTF#components]]
            Model3DTileContent.fromB3dm (Cesium.js:89456) //modelMatrix: tile.computedTransform, //modelMatrix其实是tile的computedTransform
            b3dm (Cesium.js:99387)
            makeContent (Cesium.js:104921)
            （匿名） (Cesium.js:104859)
            Promise.then（异步）
            requestSingleContent (Cesium.js:104854)
            Cesium3DTile.requestContent (Cesium.js:104758)
            Cesium3DTile_default.requestContent (Cesium.js:182512)
            requestContent (Cesium.js:107323)
            requestTiles (Cesium.js:107407)
            
        'updateTiles (Cesium.js:107633)分支'
            Model3DTileContent.update (Cesium.js:89408)
            updateContent (Cesium.js:105303)
            Cesium3DTile.update (Cesium.js:105320)
            updateTiles (Cesium.js:107633)
```
### 怎么读取b3dm的纹理下载下来?
#### 从代码读取? 没走通
```js
tileset.root.content.batchTable._features[0].content._model._defaultTexture

tileset.root.content.batchTable._features[0].content._model._sceneGraph.components
	.scene.nodes[0].primitives[0].material.metallicRoughness.baseColorTexture.texture
```
#### 从b3dm提取gltf提取纹理图片
1. [CHENJIAMIAN/ExtractorGlbFromB3DM: 提取b3dm中的glb文件, 以便获取里面的模型/材质图片等](https://github.com/CHENJIAMIAN/ExtractorGlbFromB3DM/tree/master)
2. [免费的 GLB 资产提取器](https://products.aspose.app/3d/zh-cn/extractor/glb)

### 是怎么构造请求b3dm的url?
```js
Cesium3DTile.constructor
	baseResource.getDerivedResource 即 Resource.prototype.getDerivedResource
```


## BoundingVolume下的region举例
下面是一个 `BoundingVolume` 中 `region` 属性的示例：
```
"boundingVolume": {
    "region": [
        -1.7453292519943295,
        0.6632251157578453,
        0,
        -1.7452406437283515,
        0.6633137240238233,
        500
    ]
},
```

在这个示例中，`region` 属性表示一个长方体边界体积的范围信息，其包含了 6 个数字。前三个数字 `-1.7453292519943295, 0.6632251157578453, 0` 表示长方体的左下角坐标，其中 `-1.7453292519943295` 表示最小经度，`0.6632251157578453` 表示最小纬度，`0` 表示最小高度。后三个数字 `-1.7452406437283515, 0.6633137240238233, 500` 表示长方体的右上角坐标，其中 `-1.7452406437283515` 表示最大经度，`0.6633137240238233` 表示最大纬度，`500` 表示最大高度。

这个示例中的 `BoundingVolume` 表示一个位于地球表面某个区域的长方体边界体积，其最小经度为 `-99.99999999999996` 度，最小纬度为 `19.999999999999975` 度，最小高度为 `0` 米，最大经度为 `-99.99999999999994` 度，最大纬度为 `20.000000000000007` 度，最大高度为 `500` 米。如果某个瓦片的边界体积完全包含在这个长方体边界体积内，那么该瓦片就需要加载和渲染。
## 实践
```js
3DTiles:
    tileset.boundingSphere
    //取得图层的坐标范围 tileset.boundingSphere.center为{ x: -181.90666255179437, y: -172.06516955205194, z: 1679.9689450075364 }
    viewer.scene.primitives.add(tileset);//添加到球体上  //primitives：图元 

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
```

### tileset.root.content是Empty3DTileContent 是怎么回事
在Cesium中，`Empty3DTileContent` 是一个特殊的类，用于表示一个没有内容的 3D 瓦片。如果 `tileset.root.content` 是 `Empty3DTileContent`，则这意味着根瓦片不包含任何几何和纹理数据。这通常发生在以下两种情况下：

1. 当您创建一个新的空 `Cesium3DTileset` 时，其根瓦片会自动设置为空。
2. 在加载一个包含根瓦片的 Cesium3DTiles 数据集时，如果根瓦片没有包含实际的几何和纹理数据，则它将被解析为 `Empty3DTileContent`。试试从`tileset.root.children[0].content`拿

需要注意的是，即使根瓦片没有几何和纹理数据，仍然可以使用CesiumJS API对其进行操作和渲染。例如，在根瓦片上设置样式、添加事件处理程序或调整光照设置等。此外，根瓦片可能包含有关数据集的元数据，如边界框信息、时间戳、投影信息等。
## b3dm的文件结构
b3dm文件（Batched 3D Model）是一种基于glTF格式的3D模型数据格式，主要用于地理信息系统（GIS）中的三维建模、可视化和分析。其文件结构包括以下几个主要部分：
```
1. glTF头部信息：包括文件大小、版本号、模型名称、场景等元数据。
2. 二进制数据：包括模型的顶点坐标、法线、纹理坐标等信息，使用二进制格式进行存储。
3. 特性表数据（Batch Table）：可选的元数据表格，用于存储模型的自定义属性信息。
4. 特性实例数据（Batch Table Instance）：可选的实例表格，用于存储每个实例的自定义属性信息。
5. 批处理数据（Batch）：存储三角形网格和所需的材质、纹理等信息，以及对应的特性表和特性实例表索引。
```

### b3dm文件结构中，material存在哪里
在b3dm文件结构中，材质（Material）信息存储在Batch中。Batch是一个表示渲染批次的数据块，可以包含一个或多个三角形网格，以及对应的材质信息和特性表数据。每个Batch数据块的结构如下所示：

```
{
    "primitive":<number>,
    "centroid":<array>,
    "batchLength":<number>,
    "batchTableJSON":<object>,
    "batchTableBinary":<arrayBuffer>,
    "gltfFormat":<number>,
    "attributeName":<string>,
    "attributes":<arrayBuffer>
}
```

其中，Batch中的"attributes"字段包含了模型的顶点坐标、法线、纹理坐标等信息，同时也包含了材质信息。材质信息可以在Batch中通过以下字段进行定义：

- "material"：用于指定Batch的材质，在glTF中对应于material数组中的索引。例如，可以使用以下指令来与Batch关联材质：

  ```
  "material":0
  ```

- "attributes"：用于指定Batch的渲染属性，例如它的纹理坐标。其中，纹理坐标通常存储在gltf中的二进制buffer中，并使用实际坐标值和对应的偏移量进行索引。例如：

  ```
  "attributes":{
      "TEXCOORD_0": {
          "bufferView": 1,
          "componentType": 5126,
          "count": 7392,
          "type": "VEC2",
          "byteOffset": 0
      }
  }
  ```

通过Batch的材质和渲染属性信息，b3dm文件格式可以支持多种不同的纹理、材质和渲染效果。

## BIM转3DTiles
### 前置知识
1. [Revit Geolocation](https://community.safe.com/s/article/revit-geolocation-tutorial)
2. [帮助 | 关于定位 | Autodesk](https://help.autodesk.com/view/RVT/2018/CHS/?guid=GUID-9DD9DCDB-F80F-4FCE-BA87-FE49B66936CF)
3. [终于搞清了Revit的5个定位点都是啥？怎么用？怎么对齐？ – BIMBOX](https://bimbox.top/9372.html)
4. 在Autodesk Revit软件中，您可以设置地理位置。Revit软件将此信息用于各种照明和建模过程。**但地理位置信息不足以定义准确的地理空间位置**, 测量点模型附近的真实世界位置, 它对应的测量坐标系才是GIS 坐标[帮助 | 关于坐标系 | Autodesk](https://help.autodesk.com/view/RVT/2024/CHS/?guid=GUID-E67ED082-2556-475B-84A7-4605329F612F)
### 工具
#### FME(有破解版)
##### 理论
[Autodesk Revit Reader 参数](https://docs.safe.com/fme/2022.0/html/FME_Desktop_Documentation/FME_ReadersWriters/revitnative/revitnative_reader.htm)
参数: 要读取的 Revit 坐标系 
	1. 选项目(默认)： 读取器将读取由 Revit 文件的项目基点定义的坐标系中的数据和单位
	2. 选地理参考:FME 将在数据集的文件夹中搜索与您的数据集同名但具有投影文件 ( .prj ) 扩展名的文件。如果找不到具有该名称的文件，它将在数据集文件夹中查找文件esri_cad.prj 。
		1. 如果这些文件中的任何一个存在，FME 将使用其中包含的坐标系信息对 Revit 文件进行地理定位。
		2. 如果找到.prj文件，FME 还将在数据集的文件夹中搜索与您的数据集同名但具有世界文件扩展名（.wld或.wld3）的文件。如果找不到具有该名称的文件，它将在数据集文件夹中查找文件esri_cad.wld / esri_cad.wld3。如果这些文件中的任何一个存在，FME 将使用文件中的信息将数据集中要素的坐标转换为新的地理空间坐标。[CAD 和 BIM 数据的地理空间位置—ArcGIS Pro | 文档](https://pro.arcgis.com/en/pro-app/latest/help/data/revit/geospatial-position-of-cad-and-bim-data.htm)
			1. 如果未找到.wld/.wld3文件，则转换将继续使用在.prj文件中找到的地理配准信息，同时读取由 Revit 文件的测量点定义的坐标系中的坐标。读者还将使用该文件定义的项目单元。
		3. 如果 FME 没有找到 Esri .prj文件，它将在 Revit 数据集中的活动站点上查找地理参考坐标系信息。为了正确地对数据集进行地理配准，Revit 文件需要链接到 Autodesk Revit 中的 DWG 坐标系。如果 FME 在 Revit 数据集中找到地理配准数据，它将生成一个本地 AZMED 投影坐标系来对数据集进行地理配准。读者还将在 SurveyPoint 要素上设置 Revit 文件中找到的坐标系名称以及测量点的经纬度。
	4. 如果找不到文件，那么将使用在数据集中找到的坐标信息，而不执行任何额外的转换。
##### 实践
1. 调整rvt的测量点
2. fme设置reader读取坐标为XY-M
#### BimAngle(1个月试用,主revit插件+周边小工具)
[《毕安格 Engine 输出 3D Tiles 教程》之地理配准篇 - (1)概述](https://mp.weixin.qq.com/s?__biz=MzI0NDkxOTMxOA==&mid=2247483951&idx=1&sn=0e679458b5e8fe120f34919bd1886420&chksm=e9573f56de20b640f936bc2a2eeb5a3e13f8aed9837e8e285c4a2deb874153f027d321ca087f&scene=178&cur_album_id=2209537110058106884#rd)
1. 从 2019 开始原软件名称 《BimAngle Forge Engine》更名为《BimAngle Engine》； 
2. 2019 年 3 月新增 Express 系列，主要是屏蔽了对 Forge 格式的支持

## 在线 3DTiles 数据
#### Mars3D的所有3DTiles
```js
//BIM
"http://data.mars3d.cn/3dtiles/bim-daxue/tileset.json",   //大学教学楼  
"http://data.mars3d.cn/3dtiles/bim-ditiezhan/tileset.json",   //轻轨地铁站  
"http://data.mars3d.cn/3dtiles/bim-qiaoliang/tileset.json",   //桥梁  
//粗模
"http://data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",   //合肥市建筑物  
"http://data.mars3d.cn/3dtiles/jzw-hefei2/tileset.json",   //合肥市建筑物  
"http://data.mars3d.cn/3dtiles/jzw-shanghai/tileset.json",   //上海市建筑物  
//精细模型
"http://data.mars3d.cn/3dtiles/max-daqiao/tileset.json",   // 大桥
"http://data.mars3d.cn/3dtiles/max-fcfh/tileset.json",   //居民楼(分层分户)  
"http://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",   //水利闸门  
"http://data.mars3d.cn/3dtiles/max-piping/tileset.json",   //地下管网  
"http://data.mars3d.cn/3dtiles/max-shihua/tileset.json",   //石化工厂精细模型   
"http://data.mars3d.cn/3dtiles/max-ytlhz/tileset.json",   //油田联合站精细模型 
//点云
"http://data.mars3d.cn/3dtiles/pnts-ganta/tileset.json",   //高压线塔杆点云  
//倾斜摄影
"http://data.mars3d.cn/3dtiles/qx-dyt/tileset.json",   //大雁塔倾斜摄影  
"http://data.mars3d.cn/3dtiles/qx-hfdxy/tileset.json",   //合肥大学科技园倾斜摄影  
"http://data.mars3d.cn/3dtiles/qx-shequ/tileset.json",   //县城社区倾斜摄影  
"http://data.mars3d.cn/3dtiles/qx-simiao/tileset.json",   //文庙倾斜摄影  
"http://data.mars3d.cn/3dtiles/qx-teh/tileset.json",   //合肥天鹅湖  
"http://data.mars3d.cn/3dtiles/qx-xuexiao-dth/tileset.json",   //学校-单体classifytileset
"http://data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",   //校园  
```
