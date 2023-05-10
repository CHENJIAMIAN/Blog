## 3DTiles下载器爬虫
1. [WangMingHua111/3dtilesdownloader: 3dtiles 网络文件下载器](https://github.com/WangMingHua111/3dtilesdownloader) 上次更新2021 年 8 月 ，npm cli包，试了，下载的是cesiumlab的clt，自动解包是空文件夹，无效❌
2. [IKangXu/3dtilesdownloader: 下载在线3dtiles数据，可自指定多线程数，可分段下载，可指定位置下载。](https://github.com/IKangXu/3dtilesdownloader) 上次更新2022 年 10 月，py3写的，可下载external tilesets（我称之为层级tilesets）
> 3D Tiles 支持多个其他 JSON 文件的 JSON 索引。这是通过使用external tilesets外部瓦片集实现的，外部瓦片集是使用 URL 或相对路径引用其他瓦片集的 JSON 文件。 通过这种方式，单个顶级 tileset JSON 文件可以引用和索引多个其他 tilesets，从而实现大型 3D 数据集的高效组织和管理。每个引用的图块集都可以包含自己的图块集、属性和元数据，并且可以独立于其他图块加载和显示。
3. [CHENJIAMIAN/xt3d-local-debug: xt3d.js本地调试](https://github.com/CHENJIAMIAN/xt3d-local-debug) 里包含了2023年5月5日最新可用的几个下载器，是我整理归纳的

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
`tileset.json` 文件是 Cesium 3D Tiles 规范中定义的一个描述 3D Tiles 数据集的 JSON 文件，其中包含了一些元数据信息，例如每个瓦片的边界信息、模型的属性信息等。在 `tileset.json` 文件中，`BoundingVolume` 属性描述了整个 3D Tiles 数据集的边界体积信息，而 `region` 属性则是 `BoundingVolume` 的一个子属性，用于描述该边界体积的范围信息。

`region` 属性是一个包含 6 个数字的数组，表示边界体积的范围信息。这些数字按照以下顺序排列：

1. 最小经度（单位：弧度）
2. 最小纬度（单位：弧度）
3. 最小高度（单位：米）
4. 最大经度（单位：弧度）
5. 最大纬度（单位：弧度）
6. 最大高度（单位：米）

这些数字定义了一个包围整个 3D Tiles 数据集的长方体边界体积。其中，前三个数字表示长方体的左下角坐标，后三个数字表示长方体的右上角坐标。如果某个瓦片的边界体积完全包含在这个长方体边界体积内，那么该瓦片就需要加载和渲染。

需要注意的是，`region` 属性中的经纬度坐标是以弧度为单位的，而高度是以米为单位的。如果你需要使用度数表示经纬度坐标，可以将其乘以 `Math.PI / 180` 进行转换。同样的，如果你需要使用英尺表示高度，可以将其乘以 `3.28084` 进行转换。
```

#### 源码体现
```js
Cesium3DTile.js
	createBoundingVolume
	createRegion
		可选createBoxFromTransformedRegion
例如：
	createRegion (Cesium3DTile.js:1708)
	Cesium3DTile.createBoundingVolume (Cesium3DTile.js:1781)
	Cesium3DTile (Cesium3DTile.js:110)
	makeTile (Cesium3DTileset.js:2289)
	Cesium3DTileset.loadTileset (Cesium3DTileset.js:2234)
	Promise.then（异步）
	Cesium3DTileset (Cesium3DTileset.js:1035)
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
### ccesium的Cesium3DTile 的children跟content的区别
在Cesium3DTiles中，一个瓦片（tile）可以有两种类型的子元素： `children` 和 `content`。

`children` 表示当前瓦片的子瓦片，也就是细节更高的子区域。这些子瓦片通常具有比当前瓦片更高的三角形数量和更多的细节。通过使用 `children`，可以构建一棵树形结构的瓦片，用于渲染复杂的三维场景，并且可以按需加载每个瓦片以提高性能。

另一方面，`content` 表示当前瓦片的实际几何和纹理数据。在大多数情况下，这些数据被压缩为二进制格式，并存储在磁盘上或通过网络传输。在渲染时，应用程序会将 `content` 中的数据解码，并使用它来绘制 3D 模型。

因此，`children` 和 `content`都是Cesium3DTiles的关键概念，用于组织和呈现三维地球表面的数据。
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

# 3D-Tiles-NEXT参考卡
> [3d-tiles/README.md at main · CesiumGS/3d-tiles · GitHub](https://github.com/CesiumGS/3d-tiles/blob/main/next/README.md)![ght|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683680925000b2k1mi.jpg)

![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683681222000h7dyy2.jpg)
![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683681336000mqey2y.jpg)
![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683681343000kap9u7.jpg)
![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683681353000qy4g56.jpg)
![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683681359000ao2f4t.jpg)
# 3D-Tiles参考卡
[3d-tiles/3d-tiles-reference-card.pdf at main · CesiumGS/3d-tiles · GitHub](https://github.com/CesiumGS/3d-tiles/blob/main/3d-tiles-reference-card.pdf)
![gh|800](https://raw.githubusercontent.com/CHENJIAMIAN/Blog/master/image/1683683639000a8y1gc.jpg)
![微信图片_20230510095646](https://github.com/CHENJIAMIAN/Blog/assets/20126997/1626bce1-88d1-4a25-8303-dc057998b1e2)
![微信图片_202305100956461|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/571b0ec2-0632-4341-91b3-cf6252d46794)
![微信图片_202305100956462|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/79f1f78d-f2b9-4e2c-9221-d1496a0e97be)
![微信图片_202305100956463|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/24fba5db-eb56-48ba-b9e8-d749a8433fe8)
![微信图片_202305100956464|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/fcf31d2c-7b02-4ee0-9a53-53f80cb97695)
![微信图片_202305100956465|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/4ab3b724-ad67-4d59-8204-5f536df47a00)
![微信图片_202305100956466|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/f7085bf9-0370-4a90-9b5f-c7d8880ac964)
![微信图片_202305100956467|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/590bf33b-94d9-4490-a2f5-4719e8fc4b2a)
![微信图片_202305100956468|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/f868991e-cf41-4d0e-a7e6-f7bbd5232fd2)
![微信图片_202305100956469|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/f80f642b-b293-481c-9458-13b60381822b)
![微信图片_2023051009564610|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/b46f9fbd-3a2f-4452-9b50-e89180730eef)
![微信图片_2023051009564611|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/5c2ab9a0-755b-4d94-9bc2-2c5bb6196d79)
![微信图片_2023051009564612|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/7de780f0-1900-40b6-99e8-fea470f8d017)
![微信图片_2023051009564613|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/05db0b2f-c875-48a5-8829-ccf983ffd5c5)
![微信图片_2023051009564614|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/d5d87b2e-cc03-4c5e-aa27-0af1a40d14d5)
![微信图片_2023051009564615|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/f4dbf831-903e-439b-bb0f-bd965b8f60ba)
![微信图片_2023051009564616|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/d2707cc0-bc1e-4505-8578-9f8601f5bfde)
![微信图片_2023051009564617|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/54671db3-ea6c-42b8-ba21-14a4f3331e6a)
![微信图片_2023051009564618|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/4295e36c-0e7d-4614-8e71-1e28725acc6f)
![微信图片_2023051009564619|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/3e8fdf3d-648e-49d9-a4cb-db4ba3f5c16f)
![微信图片_2023051009564620|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/f45edf3f-5a37-459d-b412-b637297b5ca3)
![微信图片_2023051009564621|800](https://github.com/CHENJIAMIAN/Blog/assets/20126997/344aca8e-df13-46e5-a03d-dcea87f370d2)
![微信图片_2023051009564622](https://github.com/CHENJIAMIAN/Blog/assets/20126997/c1f9ab65-aff3-4406-81bf-3c40969a03f3)
