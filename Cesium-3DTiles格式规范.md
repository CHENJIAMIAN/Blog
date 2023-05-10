[3d-tiles/specification at main · CesiumGS/3d-tiles · GitHub](https://github.com/CesiumGS/3d-tiles/tree/main/specification)

**1.0 版**，2018 年 6 月 6 日
本文档描述了 3D Tiles 的规范，这是一种用于流式传输大量异构 3D 地理空间数据集的开放标准。

## 介绍

3D Tiles 专为流式传输和渲染大量 3D 地理空间内容而设计，例如摄影测量、3D 建筑、BIM/CAD、实例化Feature和点云。它定义了一个分层数据结构和一组提供可渲染内容的tile格式。3D Tiles 没有为内容的可视化定义明确的规则；客户端可以根据自身需求对3Dtile数据进行可视化呈现。

在3D Tiles中，一个*tileset*是一组按空间数据结构**树**组织的**tile**。一个 tileset 由至少一个包含 tileset 元数据和 tile 对象树的 tileset JSON 文件描述，每个对象都可以引用以下格式之一的可渲染内容：

| 格式                                                                                                                        | 用途                                    |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------ |
| [批量 3D 模型 ( b3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md)    | 异构 3D 模型。例如带纹理的地形和表面、3D 建筑外部和内部、大型模型。 |
| [实例化 3D 模型 ( i3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.md) | 3D 模型实例。例如树木、风车、螺栓。                   |
| [点云 ( pnts )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/PointCloud/README.md)              | 大量的点。                                 |
| [复合 ( cmpt )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.md)               | 将不同格式的tile连接成一个tile。                      |

tile的*内容*（tile格式的单个实例）是一个二进制 blob，具有特定于格式的组件，包括[Feature Table](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/FeatureTable/README.md)和[Batch Table](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/BatchTable/README.md)。

内容引用一组*features*，例如表示建筑物或树木的 3D 模型，或点云中的点。每个feature的位置和外观属性都存储在tile的Feature Table中，其他特定于应用程序的属性存储在Batch Table中。客户端可以选择在运行时选择feature并检索它们的属性以进行可视化或分析。

Batched 3D Model 和 Instanced 3D Model 格式建立在[glTF](https://github.com/KhronosGroup/glTF)之上，glTF 是一种为高效传输 3D 内容而设计的开放规范。这些格式的tile内容在二进制主体中嵌入了一个 glTF 资产，其中包含模型几何和纹理信息。点云格式不嵌入 glTF。

切片以树的形式组织，该树结合了层次细节级别 (HLOD) 的概念，以优化空间数据的渲染。每个tile都有一个*boundingVolume*，一个定义完全包围其内容的空间范围的对象。树具有[空间连贯性](https://github.com/CesiumGS/3d-tiles/tree/main/specification#bounding-volume-spatial-coherence)；子tile的内容完全在父tile的boundingVolume内。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tree.png)

Tileset可以使用类似于栅格和矢量tile方案（如 Web 地图tile服务 (WMTS) 或 XYZ 方案）的 2D 空间tile方案，这些tile在多个细节级别（或缩放级别）提供预定义tile。然而，由于 tileset 的内容通常是不均匀的，或者可能不容易仅在二维中组织，树可以是任何具有空间一致性[的空间数据结构](https://github.com/CesiumGS/3d-tiles/tree/main/specification#spatial-data-structures)，包括 kd 树、四叉树、八叉树和网格。

可选择将[3D Tiles Style](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Styling)或*style*应用于 tileset。样式定义了要执行的表达式，这些表达式修改了每个feature的显示方式。

## 文件扩展名和媒体类型

3D Tiles 使用以下文件扩展名和媒体类型。

*   Tileset 文件使用.json扩展名和application/json媒体类型。
*   tile内容文件使用特定于其[tile格式规范](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-format-specifications)的文件类型和媒体类型。
*   Tileset 样式文件使用.json扩展名和application/json媒体类型。

显式文件扩展名是可选的。有效的实现可能会忽略它并通过其标头中的魔术字段来识别内容的格式。
> 魔术字段（Magic number）是一种特殊的字节序列，通常出现在文件的开头或结尾，用于识别该文件的格式或类型。这些字节序列可以被用来唯一地标识一个文件的类型，无论它是否有扩展名，从而避免了使用扩展名时可能存在的不确定性和问题。例如，对于JPEG图像文件，其魔术字段为0xFFD8FFE0，在读取文件时可以检查这个字段来确认该文件的格式是JPEG。

## JSON编码

3D Tiles 对 JSON 格式和编码有以下限制。

1.  JSON 必须使用不带 BOM 的 UTF-8 编码。
2.  本规范中定义的所有字符串（属性名称、枚举）仅使用 ASCII 字符集，并且必须以纯文本形式编写。
3.  JSON 对象中的名称（键）必须是唯一的，即不允许重复的键。
region
## URIs

3D Tiles 使用 URI 来引用tile内容。这些 URI 可能指向[相对外部引用 (RFC3986)](https://tools.ietf.org/html/rfc3986#section-4.2)或者是在 JSON 中嵌入资源的数据 URI。嵌入式资源使用[“数据”URL 方案 (RFC2397)](https://tools.ietf.org/html/rfc2397)。

当 URI 是相对的时，它的基础总是相对于引用的 tileset JSON 文件。

客户端实现需要支持相关的外部引用和嵌入式资源。可选地，客户端实现可以支持其他方案（例如http\://）。所有 URI 都必须有效且可解析。

## 单位

所有直线距离的单位都是米。

所有角度都以弧度为单位。

## 坐标参考系统 (CRS)

3D Tiles 使用右手笛卡尔坐标系；也就是说，*x*和*y*的叉积产生*z*。3D Tiles 将*z*轴定义为局部笛卡尔坐标系。tileset 的全球坐标系通常位于[WGS 84](http://earth-info.nga.mil/GandG/publications/tr8350.2/wgs84fin.pdf)地球中心、地球固定 (ECEF) 参考系 ( [EPSG 4978](http://spatialreference.org/ref/epsg/4978/) ) 中，但它不一定是，例如，发电厂可以在其当地完全定义用于没有地理空间上下文的建模工具的坐标系。

可以应用额外的[tile变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-transforms)以将tile的局部坐标系变换到父tile的坐标系。

区域boundingVolumes使用地理坐标系（纬度、经度、高度）指定边界，特别是[EPSG ](https://github.com/CesiumGS/3d-tiles/tree/main/specification#region)[4979](http://spatialreference.org/ref/epsg/4979/)。

## 概念

### Tiles

tile包含用于确定是否呈现tile的元数据、对可呈现内容的引用以及任何子tile的数组。

#### geometricError

*tile被构造成包含层次细节级别*(HLOD) 的树，因此在运行时，客户端实现将需要确定tile是否足够详细以进行渲染，以及tile的内容是否应由更高分辨率的子tile连续细化。实现将考虑最大允许*屏幕空间误差*(SSE)，该误差以像素为单位。

tile的geometricError定义了该tile的选择指标。它的值是一个非负数，用于指定tile对其源几何体的简化表示的误差（以米为单位）。作为源几何体的最简化版本的根tile将具有最大的geometricError。然后每个连续级别的子级将具有比其父级更低的geometricError，叶tile具有或接近 0 的geometricError。

在客户端实现中，geometricError与其他屏幕空间指标（例如，从tile到相机的距离、屏幕尺寸和分辨率）一起使用，以计算在呈现该tile而其子项未呈现时引入的 SSE。如果引入的 SSE 超过允许的最大值，则细化tile并考虑渲染其子项。

geometricError是根据点密度、以米为单位的tile大小或该Tileset特定的其他因素等指标制定的。通常，较高的geometricError意味着将更积极地细化tile，并且将更快地加载和渲染子tile。

#### 细化(refinement)

`refinement` 决定了较低的分辨率父层在选择较高的分辨率儿童渲染时呈现的过程。允许的细化类型是替换 ( "REPLACE" ) 和添加 ( "ADD" )。如果tile具有替换细化，则子tile会代替父tile进行渲染，即不再渲染父tile。如果tile具有附加细化，则除了父tile之外还会渲染子tile。

一个 tileset 可以只使用替换细化，只使用加法细化，或者加法和替换细化的任意组合。

Tileset的根tile需要细化类型；它对于所有其他tile都是可选的。省略时，tile会继承其父项的细化类型。

##### 替换

如果一个tile使用替换细化，那么在细化时它会渲染它的孩子来代替它自己。

| 父tile                                                                                                                                                                                  | 细化                                                                                                                                                                                   |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/replacement_1.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/replacement_1.jpg) | [![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/replacement_2.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/replacement_2.jpg) |

##### 添加

如果一个tile使用加法细化，那么在细化时它会同时渲染它自己和它的孩子。

| 父tile                                                                                                                                                                            | 细化                                                                                                                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/additive_1.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/additive_1.jpg) | [![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/additive_2.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/additive_2.jpg) |

#### boundingVolumes

boundingVolumes定义了包含tile或tile内容的空间范围。为了支持各种数据集的紧密拟合体积，例如规则划分的地形、未与纬度或经度线对齐的城市或任意点云，boundingVolume类型包括定向包围盒、包围球和地理区域由最小和最大纬度、经度和高度定义。

| 边界框                                                                                                                                                                                       | 包围球                                                                                                                                                                                             | 边界区域                                                                                                                                                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![边界框](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingBox.jpg "边界框")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingBox.jpg) | [![包围球](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingSphere.jpg "包围球")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingSphere.jpg) | [![边界区域](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingRegion.jpg "边界区域")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingRegion.jpg) |

##### region

boundingVolume.region属性是一个包含六个数字的数组，用于定义具有纬度、经度和高度坐标的边界地理区域，顺序为`[west, south, east, north, minimum height, maximum height]`。[纬度和经度在EPSG 4979](http://spatialreference.org/ref/epsg/4979/)中定义的 WGS 84 基准中，以弧度为单位。[高度以高于（或低于） WGS 84 椭球体的](http://earth-info.nga.mil/GandG/publications/tr8350.2/wgs84fin.pdf)米为单位。

[![边界区域](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingRegion.jpg "边界区域")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingRegion.jpg)
```js
    "boundingVolume": {
      "region": [
        -1.3197004795898053,
        0.6988582109,
        -1.3196595204101946,
        0.6988897891,
        0,
        20
      ]
    }
```
##### box

boundingVolume.box属性是一个包含 12 个数字的数组，用于在右手 3 轴 (x, y, z) 笛卡尔坐标系中定义定向边界框，其中 z轴向*上*。前三个元素定义框中心的 x、y 和 z 值。接下来的三个元素（索引为 3、4 和 5）定义了*x*轴方向和半长。接下来的三个元素（索引 6、7 和 8）定义了*y*轴方向和半长。最后三个元素（索引 9、10 和 11）定义了*z*轴方向和半长。

[![边界框](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingBox.jpg "边界框")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingBox.jpg)
```js
    "boundingVolume": {
      "box": [
        0,   0,   10,
        100, 0,   0,
        0,   100, 0,
        0,   0,   10
      ]
    }
```
##### sphere

boundingVolume.sphere属性是一个包含四个数字的数组，用于定义边界球体。前三个元素定义右手 3 轴 (x, y, z) 笛卡尔坐标系中球体中心的 x、y 和 z 值，其中 z 轴向*上*。最后一个元素（索引为 3）定义了以米为单位的半径。

[![包围球](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingSphere.jpg "包围球")](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingSphere.jpg)
```js
    "boundingVolume": {
      "sphere": [
        0,
        0,
        10,
        141.4214
      ]
    }
```
#### 查看器请求量(viewerRequestVolume)

tile 的viewerRequestVolume可用于组合异构数据集，并可与[外部 tilesets](https://github.com/CesiumGS/3d-tiles/tree/main/specification#external-tilesets)组合。

以下示例 在b3dmtile中有一个建筑物，在pntstile中建筑物内有一个点云。点云tile的boundingVolume是一个半径为1.25的球体。对于viewerRequestVolume，它还有一个半径为15的更大球体。由于geometricError为零，因此当查看器位于由viewerRequestVolume定义的大球体内部时，点云tile的内容始终呈现（并最初请求） 。
```js
    {
      "children": [
	      {
	        "transform": [
	          4.843178171884396,   1.2424271388626869, 0,                  0,
	          -0.7993325488216595,  3.1159251367235608, 3.8278032889280675, 0,
	          0.9511533376784163, -3.7077466670407433, 3.2168186118075526, 0,
	          1215001.7612985559, -4736269.697480114,  4081650.708604793,  1
	        ],
	        "boundingVolume": {
	          "box": [
	            0,     0,    6.701,
	            3.738, 0,    0,
	            0,     3.72, 0,
	            0,     0,    13.402
	          ]
	        },
	        "geometricError": 32,
	        "content": {
	          "uri": "building.b3dm"
	        }
	      }, 
	      
	      {
	        "transform": [
	          0.968635634376879,    0.24848542777253732, 0,                  0,
	          -0.15986650990768783,  0.6231850279035362,  0.7655606573007809, 0,
	          0.19023066741520941, -0.7415493329385225,  0.6433637229384295, 0,
	          1215002.0371330238,  -4736270.772726648,   4081651.6414821907, 1
	        ],
	        "viewerRequestVolume": {
	          "sphere": [0, 0, 0, 15]
	        },
	        "boundingVolume": {
	          "sphere": [0, 0, 0, 1.25]
	        },
	        "geometricError": 0,
	        "content": {
	          "uri": "points.pnts"
	        }
	      }
      ]
    }
```
有关请求量的更多信息，请参阅[示例 tileset](https://github.com/CesiumGS/3d-tiles-samples/tree/main/tilesets/TilesetWithRequestVolume)和[演示视频](https://www.youtube.com/watch?v=PgX756Yzjf4)。

#### transforms

##### tile变换

为了支持局部坐标系——例如，城市Tileset中的建筑Tileset可以在它自己的坐标系中定义，而建筑物内部的点云Tileset也可以在它自己的坐标系中定义——每个tile都有一个可选的转换属性。

transform属性是一个 4x4 仿射变换矩阵，以列优先顺序存储，从tile的局部坐标系转换到父tile的坐标系——或者在根tile的情况下是tile集的坐标系。

变换属性适用于

*   tile内容
    *   每个feature的位置。
    *   每个feature的法线都应该由左上角的 3x3 逆转置矩阵进行变换，以便[在使用 scale 时](http://www.realtimerendering.com/resources/RTNews/html/rtnews1a.html#art4)考虑正确的矢量变换。
    *   content.boundingVolume，除非已`content.boundingVolume.region`定义，否则在 EPSG:4979 坐标中明确显示。
*   tile.boundingVolume，定义时除外`tile.boundingVolume.region`，它在 EPSG:4979 坐标中明确显示。
*   tile.viewerRequestVolume，定义时除外`tile.viewerRequestVolume.region`，它在 EPSG:4979 坐标中明确表示。

transform属性通过矩阵中的最大缩放因子缩放geometricError 。

当未定义transform时，它默认为单位矩阵：

    [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
    ]

从每个 tile 的局部坐标系到 tileset 的全局坐标系的转换是通过对 tileset 自上而下的遍历以及通过将子变换与其父变换后乘以像计算机图形中的传统场景图或节点层次结构来计算的。

##### glTF 变换

[批处理 3D 模型](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md)和[实例化 3D 模型](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.md)tile嵌入了 glTF，它定义了自己的节点层次结构并使用*y*向上坐标系。任何特定于tile格式的转换和tile.transform属性都会在解析这些转换后应用。

###### glTF 节点层次结构

首先，根据[glTF 规范](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#transformations)应用 glTF 节点层次结构转换。

###### *y向上*转换为*z向上*

接下来，为了与3D Tiles 的*z -up 坐标系保持一致，glTF 必须在运行时从y-up转换为z-up*。这是通过将模型绕*x*轴旋转 π/2 弧度来完成的。等效地，应用以下矩阵变换（此处显示为行优先）：

    [
    1.0, 0.0,  0.0, 0.0,
    0.0, 0.0, -1.0, 0.0,
    0.0, 1.0,  0.0, 0.0,
    0.0, 0.0,  0.0, 1.0
    ]

更广泛地说，转换的顺序是：

1.  [glTF 节点层次结构转换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#gltf-node-hierarchy)
2.  [glTF ](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)*[y](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)*[-up 到](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)*[z](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)*[-up 变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)
3.  任何tile格式特定的转换。

    *   [批处理的 3D 模型](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md)Feature Table可以定义用于平移模型顶点的RTC\_CENTER 。
    *   [实例化 3D 模型](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.md)Feature Table定义每个实例的位置、法线和比例。这些用于创建应用于每个实例的每个实例 4x4 仿射变换矩阵。
4.  [tile变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-transforms)

> \*\*实施注意事项：\*\*当处理本质上是*z*向上的源数据时，例如 WGS 84 坐标中的数据或本地*z*向上坐标系统中的数据，常见的工作流程是：
>
> *   网格数据（包括位置和法线）不会被修改——它们保持*z*向上。
> *   根节点矩阵指定列主要*z*到*y*向上变换。这会将源数据转换为glTF 所需的*y向上坐标系。*
> *   在运行时，glTF使用上面的矩阵从*y向上*转换回*z向上*。实际上，转换抵消了。
>
> 示例 glTF 根节点：
>
>     "nodes": [
>      {
>        "matrix": [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1],
>        "mesh": 0,
>        "name": "rootNode"
>      }
>     ]

##### 例子

对于tile集的计算变换（上面代码中的transformToRoot ）的示例，请考虑：

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tileTransform.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tileTransform.png)

每个tile的计算变换是：

*   至：\[T0]
*   T1：\[T0]\[T1]
*   T2：\[T0]\[T2]
*   T3：\[T0]\[T1]\[T3]
*   T4：\[T0]\[T1]\[T4]

tile 内容中的位置和法线也可能在 tile变换*之前*应用特定于 tile的变换（之前表示仿射变换的后乘）。一些例子是：

*   b3dm和i3dm tiles 嵌入了 glTF，它定义了自己的节点层次结构和坐标系。tile.transform在这些转换解决后应用。请参阅[glTF 转换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#gltf-transforms)。
*   i3dm的Feature Table定义了每个实例的位置、法线和比例。这些用于创建每个实例的 4x4 仿射变换矩阵，这些矩阵在tile.transform之前应用于每个实例。
*   压缩属性，例如i3dm和pnts的Feature Table中的POSITION\_QUANTIZED以及pnts中的NORMAL\_OCT16P应该在任何其他转换之前解压缩。

因此，上述示例的完整计算转换为：

*   至：\[T0]
*   T1：\[T0]\[T1]
*   T2 :`[T0][T2][pnts 特定的转换，包括 RTC_CENTER（如果已定义）]`
*   T3 :`[T0][T1][T3][b3dm 特定的变换，包括 RTC_CENTER（如果已定义）、坐标系变换和 glTF 节点层次结构]`
*   T4 :`[T0][T1][T4][i3dm 特定的变换，包括每个实例变换、坐标系变换和 glTF 节点层次结构]`

##### 实现示例

*本部分是非规范的*

下面的 JavaScript 代码展示了如何使用 Cesium 的[Matrix4](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Matrix4.js)和[Matrix3](https://github.com/CesiumGS/cesium/blob/main/Source/Core/Matrix3.js)类型来计算它。
```js
    function computeTransforms(tileset) {
        var t = tileset.root;
        var transformToRoot = defined(t.transform) ? Matrix4.fromArray(t.transform) : Matrix4.IDENTITY;

        computeTransform(t, transformToRoot);
    }

    function computeTransform(tile, transformToRoot) {
        // Apply 4x4 transformToRoot to this tile's positions and bounding volumes

        var inverseTransform = Matrix4.inverse(transformToRoot, new Matrix4());
        var normalTransform = Matrix4.getRotation(inverseTransform, new Matrix3());
        normalTransform = Matrix3.transpose(normalTransform, normalTransform);
        // Apply 3x3 normalTransform to this tile's normals

        var children = tile.children;
        var length = children.length;
        for (var i = 0; i < length; ++i) {
            var child = children[i];
            var childToRoot = defined(child.transform) ? Matrix4.fromArray(child.transform) : Matrix4.clone(Matrix4.IDENTITY);
            childToRoot = Matrix4.multiplyTransformation(transformToRoot, childToRoot, childToRoot);
            computeTransform(child, childToRoot);
        }
    }
```
#### tile JSON

tile JSON 对象包含以下属性。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tile.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tile.png)

以下示例显示了一个非叶子tile。
```js
    {
      "boundingVolume": {
        "region": [
          -1.2419052957251926,
          0.7395016240301894,
          -1.2415404171917719,
          0.7396563300150859,
          0,
          20.4
        ]
      },
      "geometricError": 43.88464075650763,
      "refine" : "ADD",
      "content": {
        "boundingVolume": {
          "region": [
            -1.2418882438584018,
            0.7395016240301894,
            -1.2415422846940714,
            0.7396461198389616,
            0,
            19.4
          ]
        },
        "uri": "2/0/0.b3dm"
      },
      "children": [...]
    }
```
boundingVolume定义包围tile的体积，并用于确定在运行时渲染哪些tile。上面的示例使用了区域体积，但也可以使用其他[boundingVolumes](https://github.com/CesiumGS/3d-tiles/tree/main/specification#bounding-volumes)，例如box或sphere 。

geometricError属性是一个非负数，用于定义错误，以米为单位，如果渲染此tile而其子项未呈现则引入。在运行时，geometricError用于计算*屏幕空间误差*(SSE)，该误差以像素为单位。SSE 确定tile对于当前视图是否足够详细，或者是否应考虑其子项，请参阅[几何错误](https://github.com/CesiumGS/3d-tiles/tree/main/specification#geometric-error)。

可选的viewerRequestVolume属性（上面未显示）使用与boundingVolume相同的模式定义了一个体积，在请求tile内容之前以及根据geometricError优化tile之前，查看器必须在其中。请参阅[查看器请求量(viewerRequestVolume)](https://github.com/CesiumGS/3d-tiles/tree/main/specification#viewer-request-volume)部分。

refine属性是一个字符串，对于替换优化是“REPLACE”，对于添加优化是“ADD” ，请参阅[Refinement](https://github.com/CesiumGS/3d-tiles/tree/main/specification#refinement)。Tileset的根tile需要它；它对于所有其他tile都是可选的。一个 tileset 可以使用添加和替换细化的任意组合。当省略refine属性时，它是从父tile继承的。

content属性是一个对象，其中包含有关 tile 的可渲染内容的元数据 。content.uri是一个 uri，它指向 tile 的二进制内容（参见[Tile 格式规范](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-format-specifications)），或者另一个 tileset JSON 来创建一个 tileset 的 tileset（参见[External tilesets](https://github.com/CesiumGS/3d-tiles/tree/main/specification#external-tilesets)）。

content.uri不需要文件扩展名。内容的[tile 格式可以通过其标头中的](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-format-specifications)魔术字段来标识，或者如果内容是 JSON，则作为外部 tileset。

content.boundingVolume属性定义了一个类似于顶级boundingVolume属性的可选[boundingVolumes](https://github.com/CesiumGS/3d-tiles/tree/main/specification#bounding-volumes)。但与顶级boundingVolume属性不同的是，content.boundingVolume是一个紧密配合的boundingVolumes，仅包含tile的内容。 boundingVolume提供空间连贯性，而content.boundingVolume支持紧密的视锥体剔除，排除渲染不在潜在视图体积内的任何内容。未定义时，tile的boundingVolumes仍用于剔除（请参阅[网格](https://github.com/CesiumGS/3d-tiles/tree/main/specification#grids)）。

下面的屏幕截图显示了金丝雀码头根tile的boundingVolumes。 boundingVolume以红色显示，包围了 tileset 的整个区域；content.boundingVolume以蓝色显示，仅包含根tile中的四个feature（模型）。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/contentsBox.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/contentsBox.png)

可选的transform属性（上面未显示）定义了一个 4x4 仿射变换矩阵，该矩阵变换 tile 的content、boundingVolume和viewerRequestVolume ，如[Tile 变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-transforms)部分所述。

children属性是一组定义子tile的对象。每个子tile的内容都完全包含在其父tile的boundingVolume中，并且通常小于其父tile的geometricError的geometricError。对于叶tile，此数组的长度为零，并且可能未定义子级。请参阅下面的[Tileset JSON](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tileset-json)部分。

有关tile JSON 架构参考，请参阅[属性参考。](https://github.com/CesiumGS/3d-tiles/tree/main/specification#property-reference)[完整的 JSON 模式可以在tile.schema.json](https://github.com/CesiumGS/3d-tiles/blob/main/specification/schema/tile.schema.json)中找到。

### Tileset JSON

3D Tiles 使用一个主要的 tileset JSON 文件作为入口点来定义一个 tileset。入口和外部 tileset JSON 文件都不需要遵循特定的命名约定。

这是用于金丝雀码头的 tileset JSON 的子集（另请参阅完整文件[tileset.json](https://github.com/CesiumGS/3d-tiles/blob/main/examples/tileset.json)）：
```js
    {
      "asset" : {
        "version": "1.0",
        "tilesetVersion": "e575c6f1-a45b-420a-b172-6449fa6e0a59",
      },
      "properties": {
        "Height": {
          "minimum": 1,
          "maximum": 241.6
        }
      },
      "geometricError": 494.50961650991815,
      "root": {
        "boundingVolume": {
          "region": [
            -0.0005682966577418737,
            0.8987233516605286,
            0.00011646582098558159,
            0.8990603398325034,
            0,
            241.6
          ]
        },
        "geometricError": 268.37878244706053,
        "refine": "ADD",
        "content": {
          "uri": "0/0/0.b3dm",
          "boundingVolume": {
            "region": [
              -0.0004001690908972599,
              0.8988700116775743,
              0.00010096729722787196,
              0.8989625664878067,
              0,
              241.6
            ]
          }
        },
        "children": [..]
      }
    }
```

tileset JSON 有四个顶级属性：asset、properties、geometricError和root。

asset是一个对象，包含关于整个 tileset 的元数据。asset.version属性是一个字符串，它定义了 3D Tiles 版本，它指定了 tileset 的 JSON 模式和基本的 tile 格式集。tilesetVersion属性是一个可选字符串，它定义了特定于应用程序的 tileset 版本，例如，用于更新现有 tileset 的时间。

> **实现注意事项**：tilesetVersion可以在请求内容时用作查询参数，以避免使用缓存中的过时内容。

properties是一个对象，包含 tileset 中每个feature属性的对象。这个 tileset JSON 片段是针对 3D 建筑的，所以每个 tile 都有建筑模型，每个建筑模型都有一个Height属性（参见[Batch Table](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/BatchTable/README.md)）。properties中每个对象的名称与每个feature属性的名称相匹配，它的值定义了它的最小和最大数值，这对于例如为样式创建颜色渐变很有用。

geometricError是一个非负数，它定义了错误，以米为单位，确定是否渲染了 tileset。在运行时，geometricError用于计算*屏幕空间误差*(SSE)，该误差以像素为单位。如果 SSE 未超过所需的最小值，则不应渲染tile集，并且不应考虑渲染其tile，请参阅[几何错误](https://github.com/CesiumGS/3d-tiles/tree/main/specification#geometric-error)。

root是一个对象，它使用[上一节](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tiles)中描述的tile JSON 定义根tile。 root.geometricError与 tileset 的顶级geometricError不同。tileset 的geometricError在运行时用于确定 tileset 的根 tile 渲染的 SSE；root.geometricError在运行时用于确定渲染根tile子项的 SSE。

#### External tilesets

要创建树中树，tile 的content.uri可以指向外部 tileset（另一个 tileset JSON 文件的 uri）。例如，这可以将每个城市存储在一个 tileset 中，然后拥有一个全局 tilesets 的 tilesets。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tilesets.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tilesets.png)

当tile指向外部Tileset时，tile：

*   不能有任何孩子；tile.children必须是未定义的或空数组。
*   不能用于创建循环，例如，通过指向包含该tile的同一个tile集文件或通过指向另一个tile集文件然后指向包含该tile的初始文件。
*   将由 tile 的transform和 root tile 的transform进行转换。例如，在以下引用外部tile集的tile集中，T3的计算变换为\[T0]\[T1]\[T2]\[T3]。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tileTransformExternalTileset.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tileTransformExternalTileset.png)

如果外部 tileset 定义了asset.tilesetVersion，这将覆盖父 tileset 的值。如果外部Tileset未定义asset.tilesetVersion，则该值继承自父Tileset（如果已定义）。

#### BoundingVolumes空间相干性

如上所述，树具有空间连贯性；每个tile都有一个完全包围其内容的boundingVolumes，子tile的内容完全在父tile的boundingVolumes内。这并不意味着孩子的boundingVolumes完全在其父boundingVolumes内。例如：

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/parentBoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/parentBoundingSphere.jpg)\
地形tile的边界球体。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/childBoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/childBoundingSphere.jpg)\
四个子tile的边界球体。子级的内容完全在父级的boundingVolume内，但子级的boundingVolume不在，因为它们没有紧密贴合。

#### 空间数据结构

3D Tiles 结合了分层细节层次 (HLOD) 的概念，以优化空间数据的渲染。一个 tileset 由一棵树组成，由根定义，递归地，它的子tile可以由不同类型的空间数据结构组织。

运行时引擎是通用的，将渲染由 tileset 定义的任何树。可以使用切片格式和细化方法的任意组合，从而能够灵活地支持异构数据集，请参阅[细化](https://github.com/CesiumGS/3d-tiles/tree/main/specification#refinement)。

Tileset可以使用类似于栅格和矢量tile方案（如 Web 地图tile服务 (WMTS) 或 XYZ 方案）的 2D 空间tile方案，这些tile在多个细节级别（或缩放级别）提供预定义tile。然而，由于 tileset 的内容通常是不均匀的，或者可能不容易仅在二维中组织，因此其他空间数据结构可能更优化。

下面简要描述了 3D Tiles 如何表示各种空间数据结构。

##### 四叉树

当每个tile有四个均匀细分的孩子（例如，使用中心纬度和经度）时，将创建一个四叉树，类似于典型的 2D 地理空间tile方案。可以省略空的子tile。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree.png)\
经典的四叉树细分。

3D Tiles 启用四叉树变体，例如不均匀细分和紧boundingVolumes（与边界相反，例如，父tile的全部 25%，这对于稀疏数据集来说是一种浪费）。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree-tight.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree-tight.png)\
每个孩子周围都有紧密的boundingVolumes的四叉树。

例如，这是 Canary Wharf 的根tile及其子tile。请注意左下角，boundingVolumes不包括左侧没有建筑物出现的水域：

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/nonUniformQuadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/nonUniformQuadtree.png)

3D Tiles 还支持其他四叉树变体，例如[松散四叉树](http://www.tulrich.com/geekstuff/partitioning.html)，其中子tile重叠但空间连贯性仍然保留，即父tile完全包围其所有子tile。此方法可用于避免跨tile拆分要素（例如 3D 模型）。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree-overlap.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree-overlap.png)\
具有不均匀和重叠tile的四叉树。

下面，绿色建筑物在左孩子中，紫色建筑物在右孩子中。请注意，tile重叠，因此中间的两座绿色和一座紫色建筑没有分开。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/looseQuadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/looseQuadtree.png)

##### Kd树

当每个tile有两个子tile时，会创建一个 kd 树，两个子tile由平行于*x*、*y*或*z*轴（或纬度、经度、高度）的*分割平面*隔开。分裂轴通常随着树的级别增加而循环旋转，并且可以使用中值分裂、表面积启发式或其他方法来选择分裂平面。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/kdtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/kdtree.png)\
示例 kd 树。注意非均匀细分。

请注意，kd 树不像典型的 2D 地理空间切片方案那样具有均匀的细分，因此可以为稀疏和非均匀分布的数据集创建更平衡的树。

3D Tiles 支持 kd 树的变体，例如[多路 kd 树](http://www.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Goswami:2013\:EMF%27)，其中在树的每个叶子处，沿轴有多个拆分。不是每个tile有两个孩子，而是有n 个孩子。

##### 八叉树

八叉树通过使用三个正交的分裂平面将一个tile细分为八个孩子来扩展四叉树。与四叉树一样，3D Tiles 允许对八叉树进行变体，例如非均匀细分、紧boundingVolumes和重叠子项。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/octree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/octree.png)\
传统的八叉树细分。

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/pointcloud-octree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/pointcloud-octree.png)\
使用加法细化对点云进行非均匀八叉树细分。哥伦比亚大学机器人实验室 Peter Allen 教授绘制的[法国查佩斯圣玛丽教堂](http://robotics.cs.columbia.edu/\~atroccol/ijcv/chappes.html)的点云。由 Alejandro Troccoli 和 Matei Ciocarlie 扫描。

##### 网格

3D Tiles 通过支持任意数量的子tile来实现统一、非统一和重叠的网格。例如，这是剑桥非均匀重叠网格的自上而下视图：

[![](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/grid.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/grid.png)

3D tile利用空tile：那些具有boundingVolumes但没有内容的tile。由于不需要定义tile的内容属性，因此可以使用空的非叶tile来加速具有分层剔除的非均匀网格。这实质上创建了一个没有层次细节层次 (HLOD) 的四叉树或八叉树。

### 指定extensions和特定于应用程序的extras

3D Tiles 定义了extensions以允许基本规范具有新功能的可扩展性，以及允许特定于应用程序的元数据的extras。

#### extensions

extensions允许使用新功能扩展基本规范。可选的extensions字典属性可以添加到任何 3D Tiles JSON 对象，其中包含extensions和extensions特定对象。以下示例显示了一个tile对象，该对象具有一个假设的vendor extension，该extension指定了一个单独的碰撞体积。
```js
    {
      "transform": [
         4.843178171884396,   1.2424271388626869, 0,                  0,
        -0.7993325488216595,  3.1159251367235608, 3.8278032889280675, 0,
         0.9511533376784163, -3.7077466670407433, 3.2168186118075526, 0,
         1215001.7612985559, -4736269.697480114,  4081650.708604793,  1
      ],
      "boundingVolume": {
        "box": [
          0,     0,    6.701,
          3.738, 0,    0,
          0,     3.72, 0,
          0,     0,    13.402
        ]
      },
      "geometricError": 32,
      "content": {
        "uri": "building.b3dm"
      },
      "extensions": {
        "VENDOR_collision_volume": {
          "box": [
            0,     0,    6.8,
            3.8,   0,    0,
            0,     3.8,  0,
            0,     0,    13.5
          ]
        }
      }
    }
```
tileset 或任何后代外部 tilesets 中使用的所有扩展必须在顶级extensionsUsed数组属性中的条目 tileset JSON 中列出，例如，
```js
    {
        "extensionsUsed": [
            "VENDOR_collision_volume"
        ]
    }
```
加载和渲染 tileset 或任何后代外部 tilesets 所需的所有扩展也必须在顶级extensionsRequired数组属性中的条目 tileset JSON 中列出，这样extensionsRequired是extensionsUsed的子集。extensionsRequired中的所有值也必须存在于extensionsUsed中。

#### extras

extras属性允许将特定于应用程序的元数据添加到任何 3D Tiles JSON 对象。以下示例显示了一个具有附加应用程序特定名称属性的tile对象。
```js
    {
      "transform": [
         4.843178171884396,   1.2424271388626869, 0,                  0,
        -0.7993325488216595,  3.1159251367235608, 3.8278032889280675, 0,
         0.9511533376784163, -3.7077466670407433, 3.2168186118075526, 0,
         1215001.7612985559, -4736269.697480114,  4081650.708604793,  1
      ],
      "boundingVolume": {
        "box": [
          0,     0,    6.701,
          3.738, 0,    0,
          0,     3.72, 0,
          0,     0,    13.402
        ]
      },
      "geometricError": 32,
      "content": {
        "uri": "building.b3dm"
      },
      "extras": {
        "name": "Empire State Building"
      }
    }
```
有关 tileset JSON 架构参考，请参阅[属性参考。](https://github.com/CesiumGS/3d-tiles/tree/main/specification#property-reference)[完整的 JSON 模式可以在tileset.schema.json](https://github.com/CesiumGS/3d-tiles/blob/main/specification/schema/tileset.schema.json)中找到。

## tile格式规范

每个tile的content.uri属性可以是包含用于呈现tile 3D 内容的信息的二进制 blob 的 uri。内容是下表所列格式之一的实例。

| 格式                                                                                                                        | 用途                                    |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------ |
| [批量 3D 模型 ( b3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md)    | 异构 3D 模型。例如带纹理的地形和表面、3D 建筑外部和内部、大型模型。 |
| [实例化 3D 模型 ( i3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.md) | 3D 模型实例。例如树木、风车、螺栓。                   |
| [点云 ( pnts )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/PointCloud/README.md)              | 大量的点。                                 |
| [复合 ( cmpt )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.md)               | 将不同格式的tile连接成一个tile。                      |

Tileset可以包含tile格式的任意组合。[3D Tiles 还可以使用Composite](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.md) tile在同一个 tile 中支持不同的格式。

## 声明式样式规范

3D Tiles 包括使用 JSON 定义的简明声明式样式和用一小部分 JavaScript 编写的表达式，以增强样式。

样式使用基于feature属性的表达式定义feature的显示方式，例如显示和颜色（RGB 和半透明）。

以下示例将高度高于 90 的要素着色为红色，将其他要素着色为白色。
```js
    {
        "color" : "(${Height} > 90) ? color('red') : color('white')"
    }
```
有关完整的详细信息，请参阅[声明式样式](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Styling)规范。

***

## 属性参考

### Tileset

一个 3D Tiles Tileset。

**Properties**

|                  | 类型          | 描述                                                                  | 必需的 |
| :--------------- | :---------- | :------------------------------------------------------------------ | :-- |
| **asset**           | 对象          | 关于整个 tileset 的元数据。                                                  | ✅是的 |
| **properties**           | 任何          | 关于每个feature属性的元数据的字典对象。                                                  | 不   |
| **geometricError**         | 数字          | 如果未渲染此 tileset，则会引入以米为单位的错误。在运行时，geometricError用于计算屏幕空间误差 (SSE)，即以像素为单位测量的误差。 | ✅是的 |
| **root**            | 对象          | 3D Tiles Tileset中的tile。                                                   | ✅是的 |
| **extensionsUsed**         | 字符串 \[1-\*] | 此 tileset 中某处使用的 3D Tiles 扩展的名称。                                    | 不   |
| **extensionsRequired** | 字符串 \[1-\*] | 正确加载此 tileset 所需的 3D Tiles 扩展的名称。                                   | 不   |
| **extensions**          | 对象          | 具有extensions特定对象的字典对象。                                                      | 不   |
| **extras**         | 任何          | 特定于应用程序的数据。                                                         | 不   |

#### Tileset.asset ✅

关于整个 tileset 的元数据。

*   **类型**：对象
*   **必须**：是

#### Tileset.properties

关于每个feature属性的元数据的字典对象。

*   **类型**：任何
*   **必须**：否
*   **每个属性的类型**：对象

#### Tileset.geometricError✅

如果未渲染此 tileset，则会引入以米为单位的错误。在运行时，geometricError用于计算屏幕空间误差 (SSE)，即以像素为单位测量的误差。

*   **类型**：数字
*   **必须**：是
*   **最小值**：>= 0

#### Tileset.root✅

3D Tiles Tileset中的tile。

*   **类型**：对象
*   **必须**：是

#### Tileset.extensionsUsed

此 tileset 中某处使用的 3D Tiles 扩展的名称。

*   **类型**：字符串 \[1-\*]

    *   数组中的每个元素都必须是唯一的。
*   **必须**：否

#### Tileset.extensionsRequired

正确加载此 tileset 所需的 3D Tiles 扩展的名称。

*   **类型**：字符串 \[1-\*]

    *   数组中的每个元素都必须是唯一的。
*   **必须**：否

#### Tileset.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### Tileset.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否

***

### asset

关于整个 tileset 的元数据。

**Properties**

|               | 类型 | 描述                                                  | 必需的 |
| :------------ | :- | :-------------------------------------------------- | :-- |
| **version**        | 字符串 | 3D tile版本。该版本定义了 tileset JSON 的 JSON 模式和基本的 tile 格式集。 | ✅是的 |
| **tilesetVersion** | 字符串 | 此 tileset 的特定应用程序版本，例如，用于更新现有 tileset 时。            | 不   |
| **extensions**       | 对象 | 具有extensions特定对象的字典对象。                                      | 不   |
| **extras**      | 任何 | 特定于应用程序的数据。                                         | 不   |

#### asset.version✅

3D tile版本。该版本定义了 tileset JSON 的 JSON 模式和基本的 tile 格式集。

*   **类型**：字符串
*   **必须**：是

#### asset.tilesetVersion

此 tileset 的特定应用程序版本，例如，用于更新现有 tileset 时。

*   **类型**：字符串
*   **必须**：否

#### asset.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### asset.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否

***

### boundingVolumes

包围tile或其内容的boundingVolumes。必须至少指定一个boundingVolumes属性。这可能是box、region或sphere属性。extensions可以定义额外的boundingVolume类型。如果指定了多个boundingVolumes，客户可以根据用例和性能要求选择最合适的选项。

**Properties**
|          | 类型       | 描述                                                                                                                                            | 必需的 |
| :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-- |
| **box**   | number\[12] | 定义定向边界框的 12 个数字的数组。前三个元素定义框中心的 x、y 和 z 值。接下来的三个元素（索引为 3、4 和 5）定义了 x 轴方向和半长。接下来的三个元素（索引 6、7 和 8）定义了 y 轴方向和半长。最后三个元素（索引 9、10 和 11）定义了 z 轴方向和半长。 | 不   |
| **region**   | number \[6]  | 定义 EPSG:4979 中边界地理区域的六个数字的数组，坐标顺序为 \[west, south, east, north, minimum height, maximum height]。经度和纬度以弧度为单位，高度以高于（或低于）WGS84 椭球的米为单位。           | 不   |
| **sphere**   | number \[4]  | 定义边界球体的四个数字的数组。前三个元素定义球体中心的 x、y 和 z 值。最后一个元素（索引为 3）定义了以米为单位的半径。                                                                               | 不   |
| **extensions**  | 对象       | 具有extensions特定对象的字典对象。                                                                                                                                | 不   |
| **extras** | 任何       | 特定于应用程序的数据。                                                                                                                                   | 不   |

#### BoundingVolume.box

定义定向边界框的 12 个数字的数组。前三个元素定义框中心的 x、y 和 z 值。接下来的三个元素（索引为 3、4 和 5）定义了 x 轴方向和半长。接下来的三个元素（索引 6、7 和 8）定义了 y 轴方向和半长。最后三个元素（索引 9、10 和 11）定义了 z 轴方向和半长。

*   **类型**：数字 \[12]
*   **必须**：否

#### BoundingVolume.region

定义 EPSG:4979 中边界地理区域的六个数字的数组，坐标顺序为 \[west, south, east, north, minimum height, maximum height]。经度和纬度以弧度为单位，高度以高于（或低于）WGS84 椭球的米为单位。

*   **类型**：数字 \[6]
*   **必须**：否

#### BoundingVolume.sphere

定义边界球体的四个数字的数组。前三个元素定义球体中心的 x、y 和 z 值。最后一个元素（索引为 3）定义了以米为单位的半径。

*   **类型**：数字 \[4]
*   **必须**：否

#### BoundingVolume.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### BoundingVolume.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否

***

### Extension

具有extensions特定对象的字典对象。

允许附加属性。

*   **每个属性的类型**：对象

***

### extras

特定于应用程序的数据。

*   **JSON 架构**：[extras.schema.json](https://github.com/CesiumGS/3d-tiles/blob/main/specification/schema/extras.schema.json)

***

### Properties

关于每个feature属性的元数据的字典对象。

**Properties**

|          | 类型 | 描述                | 必需的 |
| :------- | :- | :---------------- | :-- |
| **maximum** | 数字 | Tileset中所有要素的此属性的最大值。 | ✅是的 |
| **minimum** | 数字 | Tileset中所有要素的此属性的最小值。 | ✅是的 |
| **extensions**  | 对象 | 具有extensions特定对象的字典对象。    | 不   |
| **extras** | 任何 | 特定于应用程序的数据。       | 不   |

#### Properties.maximum✅

Tileset中所有要素的此属性的最大值。

*   **类型**：数字
*   **必须**：是

#### Properties.minimum✅

Tileset中所有要素的此属性的最小值。

*   **类型**：数字
*   **必须**：是

#### Properties.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### Properties.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否

***

### Tile

3D Tiles Tileset中的 Tile。

**Properties**

|                         | 类型       | 描述                                                                                                                                                                                                                                  | 必需的                                      |
| :---------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| **boundingVolumes**                | 对象       | 包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。                                                                                                                                                                                 | ✅是的                                      |
| **viewerRequestVolume** | 对象       | 包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。                                                                                                                                                                                 | 不                                        |
| **geometricError**                | 数字       | 如果渲染此tile而其子项未呈现，则会引入以米为单位的错误。在运行时，geometricError用于计算屏幕空间误差 (SSE)，即以像素为单位测量的误差。                                                                                                                                                                 | ✅是的                                      |
| **refine**                  | 字符串       | 指定在遍历 tileset 进行渲染时是否使用附加或替换细化。这个属性对于 tileset 的根 tile 是必需的；它对于所有其他tile都是可选的。默认是从父 tile 继承。                                                                                                                                            | 不                                        |
| **transforms**                  | number \[16] | 一个浮点 4x4 仿射变换矩阵，以列优先顺序存储，将tile的内容（即其feature以及 content.boundingVolume、boundingVolume 和 viewerRequestVolume）从tile的本地坐标系转换到父tile的坐标系，或者，在根tile的情况下，从tile的局部坐标系到Tileset的坐标系。当体积是在 EPSG:4979 坐标中定义的区域时，变换不适用于任何体积属性。transform通过矩阵中的最大缩放因子缩放geometricError 。 | 否，默认：`[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]` |
| **content**                  | 对象       | 有关tile内容的元数据和指向内容的链接。                                                                                                                                                                                                                 | 不                                        |
| **children**                 | array\[]    | 定义子tile的对象数组。每个子tile内容都被其父tile的boundingVolumes完全包围，并且通常具有小于其父tile的geometricError的geometricError。对于叶tile，此数组的长度为零，并且可能未定义子级。                                                                                                                                                  | 不                                        |
| **extensions**                 | 对象       | 具有extensions特定对象的字典对象。                                                                                                                                                                                                                      | 不                                        |
| **extras**                | 任何       | 特定于应用程序的数据。                                                                                                                                                                                                                         | 不                                        |

#### Tile.boundingVolume✅

包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。

*   **类型**：对象
*   **必须**：是

#### Tile.viewerRequestVolume

包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。

*   **类型**：对象
*   **必须**：否

#### Tile.geometricError✅

如果渲染此tile而其子项未呈现，则会引入以米为单位的错误。在运行时，geometricError用于计算屏幕空间误差 (SSE)，即以像素为单位测量的误差。

*   **类型**：数字
*   **必须**：是
*   **最小值**：>= 0

#### Tile.refine

指定在遍历 tileset 进行渲染时是否使用附加或替换细化。这个属性对于 tileset 的根 tile 是必需的；它对于所有其他tile都是可选的。默认是从父 tile 继承。

*   **类型**：字符串
*   **必须**：否
*   **允许值**：

    *   “添加”
    *   “代替”

#### Tile.transform

一个浮点 4x4 仿射变换矩阵，以列优先顺序存储，将tile的内容（即其feature以及 content.boundingVolume、boundingVolume 和 viewerRequestVolume）从tile的本地坐标系转换到父tile的坐标系，或者，在根tile的情况下，从tile的局部坐标系到Tileset的坐标系。当体积是在 EPSG:4979 坐标中定义的区域时，变换不适用于任何体积属性。transform通过矩阵中的最大缩放因子缩放geometricError 。

*   **类型**：数字 \[16]
*   **必需**：否，默认：`[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]`

#### [Tile.content](http://tile.content/)

有关tile内容的元数据和指向内容的链接。当省略时，tile仅用于剔除。

*   **类型**：对象
*   **必须**：否

#### [Tile.children](http://tile.children/)

定义子tile的对象数组。每个子tile内容都被其父tile的boundingVolumes完全包围，并且通常具有小于其父tile的geometricError的geometricError。对于叶tile，此数组的长度为零，并且可能未定义子级。

*   **类型**：数组\[]

    *   数组中的每个元素都必须是唯一的。
*   **必须**：否

#### Tile.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### Tile.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否

***

### content

有关tile内容的元数据和指向内容的链接。

**Properties**
|          | 类型 | 描述                                                  | 必需的 |
| :------- | :- | :-------------------------------------------------- | :-- |
| **boundingVolumes** | 对象 | 包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。 | 不   |
| **uri**   | 字符串 | 指向tile内容的 uri。当 uri 是相对的时，它是相对于引用的 tileset JSON 文件的。  | ✅是的 |
| **extensions**  | 对象 | 具有extensions特定对象的字典对象。                                      | 不   |
| **extras** | 任何 | 特定于应用程序的数据。                                         | 不   |

#### Content.boundingVolume

包围tile或其内容的boundingVolumes。至少需要一个boundingVolumes属性。boundingVolumes包括box、region或sphere。

*   **类型**：对象
*   **必须**：否

#### Content.uri✅

指向tile内容的 uri。当 uri 是相对的时，它是相对于引用的 tileset JSON 文件的。

*   **类型**：字符串
*   **必须**：是

#### Content.extensions

具有extensions特定对象的字典对象。

*   **类型**：对象
*   **必须**：否
*   **每个属性的类型**：扩展

#### Content.extras

特定于应用程序的数据。

*   **类型**：任何
*   **必须**：否
