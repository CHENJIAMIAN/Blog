## 3DTiles
```js
3DTiles 1.0 规范允许异构数据共存于一个数据集上。3D 瓦片只是空间划分的单元，并不是该块三维空域内的具体三维物体。这些三维物体被称作“瓦片内容”。
    简单地理解为带有 LOD 的 glTF
    //http://mars3d.cn/dev/guide/map/tileset.html#_3-2-lod%E6%A0%91%E7%BB%93%E6%9E%84
    1.0 允许存在 7 种瓦片内容，它们的文件后缀名是：          
        B3DM代表“Batched 3D Model”，它是一种基于glTF格式的3D数据模型。它可以包含多个独立的3D模型，并将它们合并成一个单独的文件，从而提高了加载和渲染速度。
	        //B3DM通常用于存储建筑物、道路、桥梁等人工结构的3D模型。
	        //B3DM(批量3D模型) = featureTable记录渲染相关的数据 + batchTable记录属性数据 + glb            
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

## tileset.json里的BoundingVolume下的region

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
### 源码体现

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
