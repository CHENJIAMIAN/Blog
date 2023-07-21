- [3D Tiles 1.0](https://github.com/CesiumGS/3d-tiles/tree/1.0)：[3D Tiles 规范 1.0](http://docs.opengeospatial.org/cs/18-053r2/18-053r2.html)已提交给开放地理空间联盟 (OGC)，并被批准为 OGC 社区标准_(2018-12-14)_
- [3D Tiles 1.1](https://github.com/CesiumGS/3d-tiles)
  - 补充：
    - 支持可与tileset、tile、tile内容和tile内容组关联的结构化元数据
    - 直接支持 glTF 资源作为tile内容
    - 支持多个tile内容
    - 支持隐式切片方案
  - 弃用：
    - 原始tile格式（b3dm、i3dm、pnts 和 cmpt）已弃用，转而使用 glTF 内容
    - tileset.properties已弃用，有利于更通用的元数据支持
- [有关 3D Tiles 1.0 和 3D Tiles 1.1 之间变化的更多详细信息可以在CHANGES.md](https://github.com/CesiumGS/3d-tiles/blob/main/CHANGES.md)中找到。

[超详细的OGC 网页书: 3D Tiles Specification](https://portal.ogc.org/files/102132) 提交日期： 2022-08-18 **非标准,审议中,此文件可能会发生更改**

## 介绍

3D Tiles 专为流式传输和渲染大量 3D 地理空间内容而设计，例如摄影测量、3D 建筑、BIM/CAD、实例化要素和点云。它定义了分层数据结构和一组提供可渲染内容的tile格式。3D Tiles 没有定义内容可视化的明确规则；客户可以根据自己认为合适的方式可视化 3D Tiles 数据。

在 3D Tiles 中，_tileset_是以空间数据结构（_树）组织的一__组图_块。tileset由至少一个包含tileset元数据和tile对象树的tileset JSON 文件来描述，其中每个tile对象都可以引用可渲染内容。

[glTF 2.0](https://github.com/KhronosGroup/glTF)是 3D tile的主要tile格式。glTF 是一个开放规范，专为高效传输和加载 3D 内容而设计。glTF 资源包括单个tile的几何和纹理信息，并且可以扩展为包括元数据、模型实例化和压缩。glTF 可用于多种 3D 内容，包括：

- 异构 3D 模型。例如，带纹理的地形和表面、3D 建筑外部和内部、大型模型

- 3D 模型实例。例如树、风车、螺栓

- 海量点云

有关更多详细信息，请参阅[glTF tile格式。](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/glTF/README.adoc#tileformats-gltf-gltf)

tile还可以引用下面列出的旧版 3D tile 1.0 格式。这些格式在 3D Tiles 1.1 中已弃用，并且可能会在 3D Tiles 的未来版本中删除。

表 1. 旧版切片格式和常见用途

|旧格式|用途|
|---|---|
|[批量 3D 模型 ( b3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.adoc#tileformats-batched3dmodel-batched-3d-model)|异构 3D 模型|
|[实例 3D 模型 ( i3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.adoc#tileformats-instanced3dmodel-instanced-3d-model)|3D模型实例|
|[点云 ( pnts )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/PointCloud/README.adoc#tileformats-pointcloud-point-cloud)|海量点数|
|[复合材料（cmpt）](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.adoc#tileformats-composite-composite)|将不同格式的tile连接成一个tile|

磁贴的_内容_是磁贴格式的单个实例。一个tile可以有多个内容。

内容引用一组_特征_，例如表示建筑物或树木的 3D 模型，或点云中的点。每个功能都具有位置和外观属性以及其他特定于应用程序的属性。客户端可以选择在运行时选择特征并检索其属性以进行可视化或分析。

切片以树的形式组织，其中结合了层次细节级别 (HLOD) 的概念，以实现空间数据的最佳渲染。每个tile都有一个_包围体_，一个定义完全包围其内容的空间范围的对象。树具有[空间连贯性](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-bounding-volume-spatial-coherence)；子tile的内容完全位于父tile的边界体积内。

[![树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tree.png)

图 1. 瓦片树

tileset可以使用类似于光栅和矢量tile方案（如Web地图tile服务（WMTS）或XYZ方案）的2D空间tile方案，其以多个细节级别（或缩放级别）提供预定义tile。然而，由于tileset的内容通常是不均匀的或者可能不容易仅在二维中组织，因此树可以是具有空间一致性的任何[空间数据结构](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-spatial-data-structures)，包括kd树、四叉树、八叉树和网格。[隐式tile](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-implicit-tiling)定义了四叉树和八叉树的简洁表示。

可以在tileset中以多个粒度提供特定于应用程序的元_数据。_元数据可以与诸如tileset、tile、内容或特征之类的高级实体相关联，或者与单独的顶点和纹素相关联。元数据符合[3D 元数据规范](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/README.adoc#metadata-3d-metadata-specification)描述的明确定义的类型系统，可以使用特定于应用程序或特定领域的语义进行扩展。

可以选择将[3D Tiles Style](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Styling/README.adoc#styling-styling)或_style_应用于tileset。样式定义要评估的表达式，这些表达式修改每个功能的显示方式。

## [文件扩展名和媒体类型](https://github.com/CesiumGS/3d-tiles/tree/main/specification#file-extensions-and-media-types)

3D Tiles 使用以下文件扩展名和媒体类型。

- Tileset 文件应使用.json扩展名和[application/json](https://www.iana.org/assignments/media-types/application/json)媒体类型。

- tile内容文件应使用特定于其[tile格式规范](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-format-specifications)的文件扩展名和媒体类型。

- 元数据架构文件应使用.json扩展名和[application/json](https://www.iana.org/assignments/media-types/application/json)媒体类型。

- Tileset 样式文件应使用.json扩展名和[application/json](https://www.iana.org/assignments/media-types/application/json)媒体类型。

- JSON 子树文件应使用.json扩展名和[application/json](https://www.iana.org/assignments/media-types/application/json)媒体类型。

- 二进制子树文件应使用.subtree扩展名和[application/octet-stream](https://www.iana.org/assignments/media-types/application/octet-stream)媒体类型。

- 表示二进制缓冲区的文件应使用.bin扩展名和[application/octet-stream](https://www.iana.org/assignments/media-types/application/octet-stream)媒体类型。

显式文件扩展名是可选的。有效的实现可能会忽略它并通过其标头中的魔术字段来识别内容的格式。

## [JSON编码](https://github.com/CesiumGS/3d-tiles/tree/main/specification#json-encoding)

3D Tiles 对 JSON 格式和编码有以下限制。

1. JSON 应使用无 BOM 的 UTF-8 编码。

2. 本规范中定义的所有字符串（属性名称、枚举）仅使用 ASCII 字符集，并且应以纯文本形式编写，不进行 JSON 转义。

3. _在 JSON 中显示为属性值的_非 ASCII 字符可能会被转义。

4. JSON 对象中的名称（键）应该是唯一的，即不允许有重复的键。

5. 某些属性在架构中定义为整数。这些值可以存储为小数部分为零的小数或使用指数表示法，如[RFC 8259 第 6 节](https://www.rfc-editor.org/rfc/rfc8259.html#section-6)中所定义。

## [URI](https://github.com/CesiumGS/3d-tiles/tree/main/specification#uris)

3D Tiles 使用 URI 来引用tile内容。这些 URI 可能指向[相对外部引用 (RFC3986)](https://tools.ietf.org/html/rfc3986#section-4.2)，或者是在 JSON 中嵌入资源的数据 URI。嵌入式资源使用[“数据”URL 方案 (RFC2397)](https://tools.ietf.org/html/rfc2397)。

当 URI 是相对的时，其基础始终相对于引用的tileset JSON 文件。

客户端实现需要支持相关的外部引用和嵌入资源。或者，客户端实现可以支持其他方案（例如http://）。所有 URI 均应有效且可解析。

## [单位](https://github.com/CesiumGS/3d-tiles/tree/main/specification#units)

所有直线距离的单位都是米。

所有角度均以弧度为单位。

## [坐标参考系（CRS）](https://github.com/CesiumGS/3d-tiles/tree/main/specification#coordinate-reference-system-crs)

3D Tiles 使用右手笛卡尔坐标系；也就是说，_x_和_y_的叉积产生_z_。3D Tiles 将_z_轴定义为局部笛卡尔坐标系。tileset的全局坐标系通常位于[WGS 84](https://epsg.org/ellipsoid_7030/WGS-84.html)地心固定 (ECEF) 参考系 ( [EPSG 4978](https://epsg.org/crs_4978/WGS-84.html) ) 中，但不一定如此，例如，发电厂可以在其本地完全定义。与没有地理空间上下文的建模工具一起使用的坐标系。

tileset的CRS可以被明确地定义为[tileset元数据](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-metadata)的一部分。[tileset的元数据可以包含具有TILESET_CRS_GEOCENTRIC语义的](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/Semantics/README.adoc#metadata-semantics-tileset-semantics)属性，该属性是表示 EPSG 大地测量参数数据集标识符的字符串。

可以应用附加的[tile变换来将tile的本地坐标系变换到父tile的坐标系。](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-transforms)

区域边界体积使用地理坐标系（纬度、经度、高度）指定边界[。](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-region)具体来说，[EPSG 4979](https://epsg.org/crs_4979/WGS-84.html)，但纬度和经度以_弧度_而不是_度数_给出。假设参考椭球与tileset的参考椭球相同。

## [概念](https://github.com/CesiumGS/3d-tiles/tree/main/specification#concepts)

### [tiles](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tiles)

tile由用于确定是否渲染tile的元数据、对可渲染内容的引用以及任何子tile的数组组成。

#### [tile内容](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-content)

tile可以与可渲染内容相关联。一个tile可以有一个tile.content对象，也可以有多个内容对象，存储在tile.contents数组中。后者允许灵活的tileset结构：例如，单个tile可以包含相同几何数据的多个表示。

每个内容对象的 content.uri引用tile格式[规范](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-format-specifications)中定义的tile格式之一的tile内容，或另一个tileset JSON 以创建tileset的tileset（请参阅[外部tileset](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-external-tilesets)）。  
每个内容对象的 content.uri 引用tile格式规范中定义的tile格式之一的tile内容，或另一个tileset JSON 以创建tileset的tileset（请参阅外部tileset）。

content.group属性将内容分配给一个组。可以将不同tile的内容或单个tile的内容分配到组以便对内容进行分类。[此外，每个组都可以与元数据](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-metadata)关联。

每个内容可以与包围体相关联。虽然tile.boundingVolume是包围tile的_所有_内容的包围体，但每个单独的content.boundingVolume是仅包围各自内容的紧密配合的包围体。[有关tile和内容包围体的作用的更多详细信息在包围体](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-bounding-volumes)部分中给出。

#### [几何误差](https://github.com/CesiumGS/3d-tiles/tree/main/specification#geometric-error)

_tile被构造成包含分层细节级别_(HLOD)的树，以便在运行时客户端实现需要确定tile是否足够详细以进行渲染，以及tile的内容是否应由更高分辨率的子tile连续细化。实现将考虑最大允许的_屏幕空间误差_（SSE），即以像素为单位测量的误差。

tile的几何误差定义了该tile的选择度量。它的值是一个非负数，指定tile的源几何图形的简化表示的误差（以米为单位）。一般来说，根瓦片将具有最大的几何误差，并且子级的每个连续级别将具有比其父级更小的几何误差，叶瓦片的几何误差为或接近于0。

在客户端实现中，几何误差与其他屏幕空间指标（例如从tile到相机的距离、屏幕尺寸和分辨率）一起使用，以计算在渲染该tile而其子tile未渲染时引入的 SSE。如果引入的 SSE 超过允许的最大值，则该tile将被细化并考虑其子级进行渲染。

几何误差是基于点密度、网格或纹理抽取等度量或特定于该tileset的其他因素来制定的。一般来说，较高的几何误差意味着tile将被更积极地细化，并且子tile将被更快地加载和渲染。

#### [细化](https://github.com/CesiumGS/3d-tiles/tree/main/specification#refinement)

细化确定当选择渲染较高分辨率的子tile时，较低分辨率的父tile的渲染过程。允许的细化类型是替换（“REPLACE”）和添加（“ADD”）。如果tile具有替换细化，则子tile将代替父tile进行渲染，即不再渲染父tile。如果tile具有附加细化，则除了父tile之外还会渲染子tile。

tileset可以仅使用替换细化、仅使用附加细化或附加细化和替换细化的任意组合。

tileset的根tile需要细化类型；对于所有其他tile来说，它是可选的。省略时，tile将继承其父级的细化类型。

##### [替代](https://github.com/CesiumGS/3d-tiles/tree/main/specification#replacement)

如果tile使用替换细化，则细化时它会渲染其子级来代替其自身。

表 2. 一个tile和一个使用替换精化的精化tile

|父tile|精制|
|---|---|
|[![更换1](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/replacement_1.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/replacement_1.jpg)|[![替换2](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/replacement_2.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/replacement_2.jpg)|

##### [添加](https://github.com/CesiumGS/3d-tiles/tree/main/specification#additive)

如果tile使用附加细化，则细化时它会同时渲染自身及其子级。

表 3. 一个tile和一个使用加法精化的精化tile

|父tile|精制|
|---|---|
|[![添加剂1](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/additive_1.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/additive_1.jpg)|[![添加剂2](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/additive_2.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/additive_2.jpg)|

#### [包围体](https://github.com/CesiumGS/3d-tiles/tree/main/specification#bounding-volumes)

包围体定义包围tile或tile内容的空间范围。为了支持各种数据集的紧密拟合体积，例如规则划分的地形、不与纬度或经度线对齐的城市或任意点云，边界体积类型包括定向边界框、边界球和地理区域由最小和最大纬度、经度和高度定义。

表 4. 切片的不同包围体类型

|边界框|边界球|边界区域|
|---|---|---|
|[![边界框](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingBox.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingBox.jpg)|[![边界球体](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingSphere.jpg)|[![边界区域](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingRegion.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingRegion.jpg)|

##### [区域](https://github.com/CesiumGS/3d-tiles/tree/main/specification#region)

boundingVolume.region属性是一个由六个数字组成的数组，它们定义了边界地理区域，其纬度、经度和高度坐标的顺序为`[west, south, east, north, minimum height, maximum height]`。纬度和经度位于[EPSG 4979](https://epsg.org/crs_4979/WGS-84.html)中定义的 WGS 84 基准中，并以弧度为单位。[高度以WGS 84 椭球](https://epsg.org/ellipsoid_7030/WGS-84.html)上方（或下方）米为单位。

|   |   |
|---|---|
|笔记|信息丰富<br><br>_纬度和经度值以弧度_给出，这与 EPSG 4979 的定义不同，后者以_度_为单位给出。选择使用弧度是因为内部计算通常以弧度进行 - 例如，将制图转换为笛卡尔坐标时。|

[![边界区域](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingRegion.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingRegion.jpg)

图 2. 边界区域

```json
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

##### [盒子](https://github.com/CesiumGS/3d-tiles/tree/main/specification#box)

boundingVolume.box属性是一个由 12 个数字组成的数组，用于定义右手 3 轴 (x, y, z) 笛卡尔坐标系中的定向边界框，其中 z轴向_上_。前三个元素定义框中心的 x、y 和 z 值。接下来的三个元素（索引为 3、4 和 5）定义_x_轴方向和半长。接下来的三个元素（索引 6、7 和 8）定义_y_轴方向和半长。最后三个元素（索引 9、10 和 11）定义_z_轴方向和半长。

|   |   |
|---|---|
|笔记|信息丰富<br><br>3D Tiles 中用于定向边界框的表示形式是通用且紧凑的：除了中心位置之外，数组还包含 3x3 矩阵的元素。该矩阵的列是变换下单位向量的图像，因此唯一且紧凑地定义了边界框的缩放和方向。|

[![边界框](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingBox.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingBox.jpg)

图 3. 边界框

```json
"boundingVolume": {
  "box": [
    0,   0,   10,
    100, 0,   0,
    0,   100, 0,
    0,   0,   10
  ]
}
```

##### [球体](https://github.com/CesiumGS/3d-tiles/tree/main/specification#sphere)

boundingVolume.sphere属性是一个由四个数字组成的数组，用于定义边界球体。前三个元素定义右手 3 轴 (x, y, z) 笛卡尔坐标系中球体中心的 x、y 和 z 值，其中 z 轴向_上_。最后一个元素（索引为 3）定义半径（以米为单位）。

[![包围球](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/BoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/BoundingSphere.jpg)

图 4. 边界球

```json
"boundingVolume": {
  "sphere": [
    0,
    0,
    10,
    141.4214
  ]
}
```

##### [内容边界体积](https://github.com/CesiumGS/3d-tiles/tree/main/specification#content-bounding-volume)

可以通过tile.boundingVolume属性为每个tile指定边界体积。此外，还可以单独指定每个[tile内容](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-content)的边界体积。content.boundingVolume可能是更紧密拟合的边界体积。这可以实现严格的视锥体剔除，排除渲染不在潜在视图体积中的任何内容。当未定义时，tile的边界体积仍用于剔除（请参阅[网格](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-grids)）。

下面的屏幕截图显示了金丝雀码头根tile的包围体。tile.boundingVolume以红色显示，包围了tileset的整个区域；content.boundingVolume以蓝色显示，仅包含根tile中的四个功能（模型）。

[![内容框](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/contentsBox.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/contentsBox.png)

图 5. 切片集根切片的边界体积。[从Cyber​​City3D](http://www.cybercity3d.com/)构建数据。[来自Bing 地图](https://www.microsoft.com/maps/)的图像数据[](https://www.microsoft.com/maps/)

##### [扩展](https://github.com/CesiumGS/3d-tiles/tree/main/specification#extensions)

通过扩展支持其他包围体类型。

- [3DTILES_bounding_volume_S2](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_bounding_volume_S2)

#### [viewer请求量](https://github.com/CesiumGS/3d-tiles/tree/main/specification#viewer-request-volume)

tile的viewerRequestVolume可用于组合异构数据集，并且可以与[外部tileset](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-external-tilesets)组合。

以下示例有建筑物内的点云。点云tile的boundingVolume是一个半径为1.25的球体。它还为viewerRequestVolume提供了一个半径为15的更大球体。由于GeometricError为零，因此当查看器位于viewerRequestVolume定义的大球体内部时，始终会渲染（并最初请求）点云tile的内容。

```json
{
  "children": [{
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
      "uri": "building.glb"
    }
  }, {
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
      "uri": "points.glb"
    }
  }]
}
```

有关请求量的更多信息，请参阅[示例tileset](https://github.com/CesiumGS/3d-tiles-samples/tree/main/1.0/TilesetWithRequestVolume)。

#### [变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#transforms)

##### [tile变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-transforms)

为了支持局部坐标系 - 例如，城市瓦片集中的建筑物瓦片集可以在其自己的坐标系中定义，并且建筑物内的点云瓦片集也可以在其自己的坐标系中定义 - 每个tile都有可选的变换属性。

Transform属性是一个 4x4 仿射变换矩阵，以列优先顺序存储，从tile的本地坐标系转换到父tile的坐标系，或者在根tile的情况下转换为tileset的坐标系。

|   |   |
|---|---|
|笔记|信息丰富<br><br>变换矩阵以列主序存储遵循图形编程 API（如 OpenGL）中常见的约定，这意味着变换数组中的元素直接对应于这些系统中 4x4 矩阵的条目。|

变换属性适用于

- tile内容

  - 每个功能的位置。

  - 每个特征的法线应通过变换的逆转置的左上角 3x3 矩阵进行变换，以[在使用比例时](http://www.realtimerendering.com/resources/RTNews/html/rtnews1a.html#art4)考虑正确的矢量变换。

  - content.boundingVolume，除非`content.boundingVolume.region`定义，它明确在 EPSG:4979 坐标中。

- tile.boundingVolume，除非`tile.boundingVolume.region`定义，它明确地在 EPSG:4979 坐标中。

- tile.viewerRequestVolume，除非`tile.viewerRequestVolume.region`定义，它明确在 EPSG:4979 坐标中。

变换属性通过矩阵中的最大缩放因子来缩放几何误差。

当没有定义transform时，它默认为单位矩阵：

```json
[
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
]
```

从每个tile的局部坐标系到tileset的全局坐标系的变换是通过tileset自上而下的遍历以及通过将子级变换与其父级变换后乘来计算的，就像计算机图形学中的传统场景图或节点层次结构一样。

##### [变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#gltf-transforms)glTF

glTF 定义了自己的节点层次结构并使用_y_向上坐标系。解析这些转换后，将应用特定于tile格式的任何转换和tile.transform属性。

###### [节点层次结构](https://github.com/CesiumGS/3d-tiles/tree/main/specification#gltf-node-hierarchy)glTF

首先，根据 glTF[规范](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#transformations)应用 glTF 节点层次结构变换。

###### [向上](https://github.com/CesiumGS/3d-tiles/tree/main/specification#y-up-to-z-up)_y_向上到_z_

接下来，为了与3D Tiles 的_z向上坐标系保持一致，glTF 应在运行时从__y_向上转换为_z_向上。这是通过将模型绕_x_轴旋转 π/2 弧度来完成的。同样，应用以下矩阵变换（此处显示为行优先）：

```json
[
  1.0, 0.0,  0.0, 0.0,
  0.0, 0.0, -1.0, 0.0,
  0.0, 1.0,  0.0, 0.0,
  0.0, 0.0,  0.0, 1.0
]
```

更广泛地说，转换的顺序是：

1. [glTF 节点层次结构转换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-gltf-node-hierarchy)

2. [glTF _y_向上到_z_向上变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-y-up-to-z-up)

3. [tile变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-transforms)

|   |   |
|---|---|
|笔记|信息丰富<br><br>当使用本质上_z_向上的源数据（例如 WGS 84 坐标或本地_z_向上坐标系中的数据）时，常见的工作流程是：<br><br>- 网格数据（包括位置和法线）不会被修改 - 它们保持_z_向上。<br>    <br>- 根节点矩阵指定列主_z_向上到_y_向上变换。这将根据 glTF 的要求将源数据转换为_y向上坐标系。_<br>    <br>- 在运行时，glTF使用上面的矩阵从_y_向上转换回_z向上。_实际上，变换抵消了。<br>    <br><br>glTF 根节点示例：<br><br>
```json
"nodes": [
 {
   "matrix": [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1],
   "mesh": 0,
   "name": "rootNode"
 }
]
```


##### [例子](https://github.com/CesiumGS/3d-tiles/tree/main/specification#example)

对于tileset的计算变换（上面代码中的transformToRoot ）的示例，请考虑：

[![tile变换](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tileTransform.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tileTransform.png)

图 6. 包含 glTF 内容的tile示例tileset的结构

每个tile的计算变换为：

- 至：[T0]

- T1：[T0][T1]

- T2：[T0][T2]

- T3：[T0][T1][T3]

- T4：[T0][T1][T4]

考虑到[glTF _y_向上到_z_向上变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-y-up-to-z-up)和[glTF 变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-gltf-transforms)，完整计算的变换为

- 至：[T0]

- T1：[T0][T1]

- T2：`[T0][T2][glTF y-up to z-up][glTF transform]`

- T3：`[T0][T1][T3][glTF y-up to z-up][glTF transform]`

- T4：`[T0][T1][T4][glTF y-up to z-up][glTF transform]`

##### [实施示例](https://github.com/CesiumGS/3d-tiles/tree/main/specification#implementation-example)

_本节内容丰富_

以下 JavaScript 代码展示了如何使用 Cesium 的[Matrix4](https://github.com/CesiumGS/cesium/blob/main/packages/engine/Source/Core/Matrix4.js)和[Matrix3](https://github.com/CesiumGS/cesium/blob/main/packages/engine/Source/Core/Matrix3.js)类型来计算此值。

```js
function computeTransforms(tileset) {
  const root = tileset.root;
  const transformToRoot = defined(root.transform) ? Matrix4.fromArray(root.transform) : Matrix4.IDENTITY;

  computeTransform(root, transformToRoot);
}

function computeTransform(tile, transformToRoot) {
  // Apply 4x4 transformToRoot to this tile's positions and bounding volumes

  let normalTransform = Matrix4.getRotation(transformToRoot, new Matrix4());
  normalTransform = Matrix3.inverseTranspose(normalTransform, normalTransform);
  // Apply 3x3 normalTransform to this tile's normals

  const children = tile.children;
  if (defined(children)) {
    const length = children.length;
    for (let i = 0; i < length; ++i) {
      const child = children[i];
      let childToRoot = defined(child.transform) ? Matrix4.fromArray(child.transform) : Matrix4.clone(Matrix4.IDENTITY);
      childToRoot = Matrix4.multiplyTransformation(transformToRoot, childToRoot, childToRoot);
      computeTransform(child, childToRoot);
    }
  }
}
```

#### [tileJSON](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-json)

磁贴 JSON 对象包含以下属性。

[![瓦](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tile.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tile.png)

图 7.tile JSON 对象的元素

以下示例显示了一个非叶子tile。

```json
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
    "uri": "2/0/0.glb"
  },
  "children": [...]
}
```

boundingVolume定义包围tile的体积，并用于确定在运行时渲染哪些tile。上面的示例使用区域体积，但也可以使用其他[边界体积](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-bounding-volumes)，例如盒子或球体。

GeometricError属性是一个非负数，它定义了此tile被渲染而其子tile未渲染时引入的误差（以米为单位）。在运行时，几何误差用于计算_屏幕空间误差_（SSE），即以像素为单位测量的误差。SSE 确定tile对于当前视图是否足够详细，或者是否应考虑其子tile，请参阅[几何误差](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-geometric-error)。

可选的viewerRequestVolume属性（上面未显示）定义一个体积，使用与boundingVolume相同的模式，在请求tile的内容之前以及在基于geometricError细化tile之前，查看器应位于该体积内。请参阅[“查看者请求量”](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-viewer-request-volume)部分。

细化属性是一个字符串，可以是“REPLACE”（用于替换细化）或“ADD”（用于附加细化），请参阅[Refinement](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-refinement)。它是tileset的根tile所必需的；对于所有其他tile来说，它是可选的。tileset可以使用附加和替换细化的任意组合。当省略fine属性时，它会从父tile继承。[](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-refinement)

content属性是一个描述[tile内容的](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-content)对象。content.uri不需要文件扩展名。内容的[tile格式可以通过其标头中的](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-format-specifications)magic字段来识别，或者如果内容是 JSON，则可以识别为外部tileset。

content.boundingVolume属性定义了一个可选的[边界体积](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-bounding-volumes)，类似于顶级的tile.boundingVolume属性。但与顶级boundingVolume属性不同，content.boundingVolume是一个紧密贴合的边界体积，仅包含tile的内容。[](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-bounding-volumes)

还可以为一个tile定义多个内容：contents属性（上面未显示）是一个包含一个或多个内容的数组。内容和内容是相互排斥的。当tile具有单一内容时，它应该使用与仅支持 3D Tiles 1.0 的引擎向后兼容的内容。多个内容允许对tile内容进行不同的表示 - 例如，一种作为三角形网格，另一种作为点云：

[![多内容几何](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/multiple-contents-geometry.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/multiple-contents-geometry.png)

图 8. 定义多个内容的tile示例

还可以使用content.group属性将内容分组：

```json
{
  "root": {
    "refine": "ADD",
    "geometricError": 0.0,
    "boundingVolume": {
      "region": [-1.707, 0.543, -1.706, 0.544, 203.895, 253.113]
    },
    "contents": [
      {
        "uri": "buildings.glb",
        "group": 0
      },
      {
        "uri": "trees.glb",
        "group": 1
      },
      {
        "uri": "cars.glb",
        "group": 2
      }
    ]
  }
}
```

这些组可以与组元数据关联： content.group属性的值是在tileset的顶级数组中定义的组数组的索引。该数组的每个元素都是一个元数据实体，如[元数据](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-metadata)部分中所定义。这允许应用程序根据内容所属的组执行样式或过滤：

[![过滤组](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/filtering-groups.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/filtering-groups.jpg)

图 9. 基于内容组的呈现选项图示

可选的Transform属性（上面未显示）定义了一个 4x4 仿射变换矩阵，用于变换tile的content、boundingVolume和viewerRequestVolume ，如[tile变换](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tile-transforms)部分中所述。

可选的implicitTiling属性（上面未显示）定义了tile的细分方式以及内容资源的定位位置。请参阅[隐式tile](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-implicit-tiling)。

Children属性是定义子tile的对象数组。每个子tile的内容完全被其父tile的boundingVolume包围，并且通常几何误差小于其父tile的几何误差。对于叶tile，该数组的长度为零，并且可能未定义子项。请参阅下面的[Tileset JSON](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tileset-json)部分。

[完整的 JSON 模式可以在tile.schema.json](https://github.com/CesiumGS/3d-tiles/tree/main/specification/schema/tile.schema.json)中找到 。

### [tilesetJSON](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tileset-json)

3D Tiles 使用一个主tileset JSON 文件作为定义tileset的入口点。条目和外部tileset JSON 文件不需要遵循特定的命名约定。

以下是用于金丝雀码头的tileset JSON 的子集：

```json
{
  "asset" : {
    "version": "1.1",
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
      "uri": "0/0/0.glb",
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
    "children": [...]
  }
}
```

tileset JSON 有四个顶级属性：asset、properties、GeometricError和root。

asset是一个包含整个tileset元数据的对象。asset.version属性是一个定义 3D Tiles 版本的字符串，它指定tileset的 JSON 架构和tile格式的基本集。tilesetVersion属性是一个可选字符串，它定义了tileset 的应用程序特定版本，例如，当更新现有tileset 时。

|   |   |
|---|---|
|笔记|信息丰富<br><br>在请求内容时， tilesetVersion可以用作查询参数，以避免使用缓存中的过时内容。|

properties是一个对象，其中包含tileset中每个要素属性的对象。此tileset JSON 片段适用于 3D 建筑物，因此每个tile都有建筑模型，并且每个建筑模型都有一个Height属性（请参阅[批处理表](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/BatchTable/README.adoc#tileformats-batchtable-batch-table)）。属性中每个对象的名称与每个功能属性的名称相匹配，其值定义其最小和最大数值，这对于创建样式的色带等很有用。

GeometricError是一个非负数，定义误差（以米为单位），该误差决定是否渲染tileset。在运行时，几何误差用于计算_屏幕空间误差_（SSE），即以像素为单位测量的误差。如果 SSE 未超过所需的最小值，则不应渲染tileset，并且不应考虑渲染其任何tile，请参阅[几何错误](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-geometric-error)。

root是一个使用[上一节](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-tiles)中描述的瓦片 JSON 定义根瓦片的对象。root.geometricError与tileset的顶级GeometricError不同。在运行时使用tileset的geometricError来确定tileset的根tile渲染的SSE；root.geometricError在运行时用于确定渲染根tile子级的 SSE。

#### [外部tileset](https://github.com/CesiumGS/3d-tiles/tree/main/specification#external-tilesets)

要创建树中的树，tile的content.uri可以指向外部tileset（另一个tileset JSON 文件的 uri）。例如，这使得可以将每个城市存储在tileset中，然后拥有tileset的全局tileset。

[![tilesets](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tilesets.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tilesets.png)

图 10. 引用其他tileset的tileset

当tile指向外部tileset时，该tile：

- 不能有任何孩子；tile.children应被省略

- 不能用于创建循环，例如，通过指向包含该tile的同一tileset文件或通过指向另一个tileset文件（然后指向包含该tile的初始文件）。

- 将通过tile的变换和根tile的变换进行变换。例如，在以下引用外部tileset的tileset中，计算出的T3变换为[T0][T1][T2][T3]。

[![tileTransformExternalTileset](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/tileTransformExternalTileset.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/tileTransformExternalTileset.png)

图 11. 引用另一个tileset的tileset的变换链

如果外部tileset定义asset.tilesetVersion，则会覆盖父tileset中的值。如果外部tileset未定义asset.tilesetVersion，则该值将从父tileset（如果已定义）继承。

#### [包围体空间相干性](https://github.com/CesiumGS/3d-tiles/tree/main/specification#bounding-volume-spatial-coherence)

如上所述，树具有空间相干性；每个tile都有一个完全包围其内容的包围体，并且子tile的内容完全位于父tile的包围体内部。这并不意味着子项的包围盒完全位于其父项的包围盒内。例如：

[![父边界球体](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/parentBoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/parentBoundingSphere.jpg)

图 12. 地形tile的边界球。

[![子边界球体](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/childBoundingSphere.jpg)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/childBoundingSphere.jpg)

图 13. 四个子tile的边界球。子级的内容完全位于父级的包围盒内，但子级的包围盒则不然，因为它们没有紧密配合。

#### [空间数据结构](https://github.com/CesiumGS/3d-tiles/tree/main/specification#spatial-data-structures)

3D Tiles 结合了层次细节层次 (HLOD) 的概念，以实现空间数据的最佳渲染。tileset由一棵树组成，该树由根及其子tile递归定义，可以通过不同类型的空间数据结构进行组织。

运行时引擎是通用的，将渲染由tileset定义的任何树。可以使用切片格式和细化方法的任意组合，从而能够灵活地支持异构数据集，请参阅[细化](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-refinement)。

tileset可以使用类似于光栅和矢量tile方案（如Web地图tile服务（WMTS）或XYZ方案）的2D空间tile方案，其以多个细节级别（或缩放级别）提供预定义tile。然而，由于tileset的内容通常是不均匀的或者可能不容易仅在二维中组织，所以其他空间数据结构可能更优化。

下面简要描述了 3D Tiles 如何表示各种空间数据结构。

##### [四叉树](https://github.com/CesiumGS/3d-tiles/tree/main/specification#quadtrees)

当每个tile具有四个均匀细分的子代（例如，使用中心纬度和经度）时，创建四叉树，类似于典型的2D地理空间tile方案。空的子tile可以省略。

[![四叉树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree.png)

图 14. 经典四叉树细分

3D Tiles 支持四叉树变化，例如非均匀细分和紧密边界体积（与边界相反，例如，父tile的完整 25%，这对于稀疏数据集来说是浪费）。

[![四叉树紧](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree-tight.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree-tight.png)

图 15. 每个子项周围都有紧密包围体的四叉树

例如，这是 Canary Wharf 的根tile及其子tile。请注意左下角，其中边界体积不包括左侧不会出现建筑物的水：

[![非均匀四叉树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/nonUniformQuadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/nonUniformQuadtree.png)

[图 16. 从Cyber​​City3D](http://www.cybercity3d.com/)构建数据。[来自Bing 地图](https://www.microsoft.com/maps/)的图像数据[](https://www.microsoft.com/maps/)

3D Tiles 还支持其他四叉树变体，例如[松散四叉树](http://www.tulrich.com/geekstuff/partitioning.html)，其中子tile重叠，但仍保留空间连贯性，即父tile完全包围其所有子tile。此方法可用于避免在tile之间分割特征（例如 3D 模型）。

[![四叉树重叠](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/quadtree-overlap.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/quadtree-overlap.png)

图 17. 具有不均匀和重叠tile的四叉树

下面，绿色建筑物位于左孩子中，紫色建筑物位于右孩子中。请注意，tile重叠，因此中心的两座绿色和一座紫色建筑物不会分开。

[![松散四叉树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/looseQuadtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/looseQuadtree.png)

[图 18. 从Cyber​​City3D](http://www.cybercity3d.com/)构建数据。[来自Bing 地图](https://www.microsoft.com/maps/)的图像数据[](https://www.microsoft.com/maps/)

##### [Kd树](https://github.com/CesiumGS/3d-tiles/tree/main/specification#k-d-trees)

当每个tile有两个被平行于 _x_、_y_或_z_轴（或纬度、经度、高度）的 _分割_ 平面分隔开的子元素时，就会创建 kd 树。随着级别沿树向下增加，分割轴通常会循环旋转，并且可以使用中值分割、表面积启发法或其他方法来选择分割平面。

[![kd树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/kdtree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/kdtree.png)

图 19.kd 树示例。注意不均匀细分

请注意，kd 树不像典型的 2D 地理空间切片方案那样具有统一的细分，因此可以为稀疏和非均匀分布的数据集创建更平衡的树。

3D Tiles 支持 kd 树的变化，例如[多路 kd 树](http://www.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Goswami:2013:EMF%27)，其中树的每个叶子沿轴有多个分割。每个tile不是有两个孩子，而是有n 个孩子。

##### [八叉树](https://github.com/CesiumGS/3d-tiles/tree/main/specification#octrees)

八叉树通过使用三个正交分割平面将tile细分为八个子级来扩展四叉树。与四叉树一样，3D Tiles 允许八叉树的变化，例如非均匀细分、紧密边界体积和重叠子项。

[![八叉树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/octree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/octree.png)

图 20. 传统八叉树细分

[![点云八叉树](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/pointcloud-octree.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/pointcloud-octree.png)

图 21. 使用加性细化对点云进行非均匀八叉树细分。[法国查普斯圣玛丽教堂](http://robotics.cs.columbia.edu/~atroccol/ijcv/chappes.html)的点云，由哥伦比亚大学机器人实验室的 Peter Allen 教授绘制。由 Alejandro Troccoli 和 Matei Ciocarlie 扫描。

##### [网格](https://github.com/CesiumGS/3d-tiles/tree/main/specification#grids)

3D Tiles 通过支持任意数量的子tile来实现均匀、非均匀和重叠的网格。例如，这是剑桥非均匀重叠网格的自上而下视图：

[![网格](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/grid.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/grid.png)

[图 22. 从Cyber​​City3D](http://www.cybercity3d.com/)构建数据。[来自Bing 地图](https://www.microsoft.com/maps/)的图像数据[](https://www.microsoft.com/maps/)

3D Tiles利用空tile：那些具有边界体积但没有内容的tile。由于不需要定义tile的内容属性，因此可以使用空的非叶tile通过分层剔除来加速非均匀网格。这本质上创建了一个没有详细层次结构 (HLOD) 的四叉树或八叉树。

#### [隐式tile](https://github.com/CesiumGS/3d-tiles/tree/main/specification#implicit-tiling)

包围体层次结构可以明确定义_（_ 如前所示），这支持多种空间数据结构。某些常见的数据结构（例如四叉树和八叉树）可以_隐式_定义，而无需为每个tile提供包围体。这种规则模式允许根据tile坐标随机访问tile，从而实现加速空间查询、新的遍历算法以及tile内容的高效更新等用例。

[![隐式tile小](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/implicit-tiling-small.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/implicit-tiling-small.png)

图 23. 具有tile坐标的四叉树

为了支持稀疏数据集，可用性数据确定存在哪些切片。为了支持海量数据集，可用性被划分为固定大小的子树。子树可以存储可用tile和内容的元数据。

可以将隐式Tiling对象添加到tileset JSON中的任何tile中。该对象定义了tile如何细分以及在哪里定位内容资源。它可以添加到多个tile中以创建更复杂的细分方案。

以下示例显示了在根tile上定义的四叉树，其中模板 URI 指向内容和子树文件。

```json
{
  "root": {
    "boundingVolume": {
      "region": [-1.318, 0.697, -1.319, 0.698, 0, 20]
    },
    "refine": "REPLACE",
    "geometricError": 5000,
    "content": {
      "uri": "content/{level}/{x}/{y}.glb"
    },
    "implicitTiling": {
      "subdivisionScheme": "QUADTREE",
      "availableLevels": 21,
      "subtreeLevels": 7,
      "subtrees": {
        "uri": "subtrees/{level}/{x}/{y}.json"
      }
    }
  }
}
```

有关隐式tile对象结构和子树文件格式的更多详细信息，请参阅[隐式tile。](https://github.com/CesiumGS/3d-tiles/blob/main/specification/ImplicitTiling/README.adoc#implicittiling-implicit-tiling)

### [元数据](https://github.com/CesiumGS/3d-tiles/tree/main/specification#metadata)

可以在tileset中以多个粒度提供特定于应用程序的元数据。元数据可以与诸如tileset、tile、内容或特征之类的高级实体相关联，或者与单独的顶点和纹素相关联。元数据符合[3D 元数据规范](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/README.adoc#metadata-3d-metadata-specification)描述的明确定义的类型系统，可以使用特定于应用程序或特定领域的语义进行扩展。

元数据为该格式提供了额外的用例和功能：

- **检查：** 在用户界面 (UI) 中显示tileset的应用程序可能允许用户单击或悬停在特定tile或tile内容上，从而显示有关 UI 中所选实体的信息元数据。

- **集合：** tile内容组可用于定义集合（类似于地图图层），以便每个集合可以显示、隐藏或在视觉上设置样式，并在多个tile之间同步效果。

- **结构化数据：** 元数据支持嵌入式和外部引用模式，以便tileset作者可以为公共领域（例如，AEC 或科学数据集）或完全定制的特定于应用程序的数据（例如，特定视频游戏）定义新的数据模型。

- **优化：** 每个内容的元数据可能包括具有与性能相关的语义的属性，使引擎能够显着优化遍历和流算法。

元数据可以与各种粒度级别的tileset元素相关联：

- **tileset** -tileset作为一个整体可以与全局元数据相关联。常见示例可能包括收集年份、作者详细信息或tileset内容的其他一般上下文。

- **tile** - tile可以单独与更具体的元数据相关联。这可能是上次更新tile时的时间戳或tile的最大高度，或用于优化遍历算法的空间提示。

- **组** - 磁贴内容可以组织成组。每个组定义表示一个元数据实体，可以通过指定此列表中的索引作为内容的组属性来将其分配给tile内容。这对于将内容集合作为图层进行处理非常有用，例如管理可见性或视觉样式。

- **内容** - tile内容可以单独与更具体的元数据相关联，例如属性字符串列表。

- **具有功能元数据的功能** glTF 2.0 资产可以作为tile内容包含在内。EXT_structural_metadata扩展允许将元数据[与](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_structural_metadata)顶点或纹素相关联。

下图显示了这些实体之间的关系，以及可能与这些实体关联的元数据示例：

[![元数据粒度](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/3d-tiles-metadata-granularities.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/3d-tiles-metadata-granularities.png)

图 24. 应用元数据的不同粒度级别的图示

尽管它们是独立定义的，但 3D Tiles 和 glTF EXT_structural_metadata扩展中的元数据结构都符合[3D 元数据规范](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/README.adoc#metadata-3d-metadata-specification)，并建立在[3D 元数据规范的参考实现](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/ReferenceImplementation/README.adoc#metadata-referenceimplementation-3d-metadata-reference-implementation)之上。这里使用的概念和术语指的是 3D 元数据规范，它应被视为定义和要求的规范性参考。本文档在适当的情况下提供了术语的内联定义。

#### [元数据架构](https://github.com/CesiumGS/3d-tiles/tree/main/specification#metadata-schema)

元数据模式定义元数据的结构。它包含元数据类的定义，这些类是元数据实例的模板，并定义每个元数据实例具有的属性集。[根据元数据模式参考实现，元数据](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Metadata/ReferenceImplementation/Schema/README.adoc#metadata-referenceimplementation-schema-schema-implementation)模式以 JSON 表示形式存储在tileset中。此参考实现包括元数据模式的 JSON 模式的定义。

模式可以通过schema属性嵌入到tileset中，或者通过schemaUri属性从外部引用。多个tileset和 glTF 内容可以引用相同的模式以避免重复。[在外部tileset](https://github.com/CesiumGS/3d-tiles/tree/main/specification#core-external-tilesets)模式中定义的任何类也应在顶级tileset模式中定义。

|   |   |
|---|---|
|笔记|例子<br><br>具有具有三个属性“高度”、“所有者”和“buildingType”的建筑类的架构。“buildingType”属性引用buildingType枚举作为其数据类型，也在模式中定义。后面的示例展示了实体如何声明其类并为其属性提供值。<br><br>
```json
{
  "schema": {
    "classes": {
      "building": {
        "properties": {
          "height": {
            "type": "SCALAR",
            "componentType": "FLOAT32"
          },
          "owners": {
            "type": "STRING",
            "array": true,
            "description": "Names of owners."
          },
          "buildingType": {
            "type": "ENUM",
            "enumType": "buildingType"
          }
        }
      }
    },
    "enums": {
      "buildingType": {
        "values": [
          {"value": 0, "name": "Residential"},
          {"value": 1, "name": "Commercial"},
          {"value": 2, "name": "Other"}
        ]
      }
    }
  }
}
```


|   |   |
|---|---|
|笔记|例子<br><br>由 URI 引用的外部架构。<br><br>
```json
{
  "schemaUri": "https://example.com/metadata/buildings/1.0/schema.json"
}
```


#### [分配元数据](https://github.com/CesiumGS/3d-tiles/tree/main/specification#assigning-metadata)

虽然模式中的类定义了数据类型和属性的含义，但在元数据被分配（即类被“实例化”）为 3D Tiles 层次结构中的特定元数据实体之前，属性不会呈现特定值。

出现在tileset中的元数据实体的通用结构在 中定义 [`metadataEntity.schema.json`](https://github.com/CesiumGS/3d-tiles/tree/main/specification/schema/metadataEntity.schema.json)。每个元数据实体都包含它作为实例的类的名称，以及与该类的属性相对应的属性值字典。分配的每个属性值应由具有相同属性 ID 的类属性定义，且值与类属性的数据类型匹配。实体可以仅为其类的属性的子集提供值，但标记为required: true 的类属性不应被省略。

|   |   |
|---|---|
|笔记|例子<br><br>前面介绍的构建类的元数据实体。这样的实体可以通过将其存储为各自的元数据属性来分配给tileset、tile或tile内容。<br><br>
```json
  "metadata": {
    "class": "building",
    "properties": {
      "height": 16.8,
      "owners": [ "John Doe", "Jane Doe" ],
      "buildingType": "Residential"
    }
  }
```
|

大多数属性值在实体内编码为 JSON。一个值得注意的例外是分配给隐式tile和内容的元数据，以更紧凑的二进制形式存储。请参阅[隐式tile](https://github.com/CesiumGS/3d-tiles/blob/main/specification/ImplicitTiling/README.adoc#implicittiling-implicit-tiling)。

#### [元数据统计](https://github.com/CesiumGS/3d-tiles/tree/main/specification#metadata-statistics)

统计信息提供有关属性值分布的聚合信息，对tileset中元数据类的所有实例进行汇总。例如，统计数据可能包括数字属性的最小/最大值，或特定枚举值的出现次数。

这些汇总统计数据允许应用程序分析或显示元数据，例如使用[声明性样式语言](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Styling/README.adoc#styling-styling)，而无需首先处理完整的数据集来识别色带和直方图的界限。统计信息是按类提供的，因此应用程序可以根据整个tileset提供样式或上下文，同时只需要下载和处理其tile的子集。

[![元数据粒度](https://github.com/CesiumGS/3d-tiles/raw/main/specification/figures/3d-tiles-metadata-statistics.png)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/figures/3d-tiles-metadata-statistics.png)

图 25. 说明如何使用元数据统计数据来呈现分析

统计信息存储在tileset的顶级统计对象中。该统计对象的结构在 [statistics.schema.json](https://github.com/CesiumGS/3d-tiles/tree/main/specification/schema/Statistics/statistics.schema.json)中定义。为每个元数据类定义统计信息，包括以下元素：

- count是tileset中出现的类实体的数量

- 属性包含有关tileset中出现的类的属性的摘要统计信息

属性可能包括以下内置统计信息：

表 5. 元数据统计信息

|姓名|描述|类型|
|---|---|---|
|分钟|最低财产价值|标量、向量、矩阵|
|最大限度|最大财产价值|…​|
|意思是|属性值的算术平均值|…​|
|中位数|财产价值的中位数|…​|
|标准差|属性值的标准差|…​|
|方差|属性值的方差|…​|
|和|属性值的总和|…​|
|事件|值出现的频率|对象，其中键是属性值（对于枚举，是枚举名称），值是该属性值出现的次数|

Tileset 作者可以定义自己的附加统计信息，例如下面示例中的_mode 。特定于应用程序的统计信息应使用下划线前缀 (_* ) 和小驼峰命名法以保持一致性并避免与将来的内置统计信息发生冲突。

|   |   |
|---|---|
|笔记|例子<br><br>“建筑”类的定义，具有三个属性。摘要统计数据提供了数字“高度”属性的最小值、最大值和（特定于应用程序的）“_mode”。枚举“buildingType”属性通过不同枚举值出现的次数进行汇总。<br><br>
```json
{
  "schema": {
    "classes": {
      "building": {
        "properties": {
          "height": {
            "type": "SCALAR",
            "componentType": "FLOAT32"
          },
          "owners": {
            "type": "STRING",
            "array": true
          },
          "buildingType": {
            "type": "ENUM",
            "enumType": "buildingType"
          }
        }
      }
    },
    "enums": {
      "buildingType": {
        "valueType": "UINT16",
        "values": [
          {"name": "Residential", "value": 0},
          {"name": "Commercial", "value": 1},
          {"name": "Hospital", "value": 2},
          {"name": "Other", "value": 3}
        ]
      }
    }
  },
  "statistics": {
    "classes": {
      "building": {
        "count": 100000,
        "properties": {
          "height": {
            "min": 3.9,
            "max": 341.7,
            "_mode": 5.0
          },
          "buildingType": {
            "occurrences": {
              "Residential": 50000,
              "Commercial": 40950,
              "Hospital": 50
            }
          }
        }
      }
    }
  }
}
```|

### [指定扩展和特定于应用程序的附加功能](https://github.com/CesiumGS/3d-tiles/tree/main/specification#specifying-extensions-and-application-specific-extras)

3D Tiles 定义了扩展，以允许基本规范具有新功能的可扩展性。

#### [扩展](https://github.com/CesiumGS/3d-tiles/tree/main/specification#extensions-1)

扩展允许使用新功能扩展基本规范。可选的扩展字典属性可以添加到任何 3D Tiles JSON 对象中，其中包含扩展的名称和扩展特定的对象。以下示例显示了一个具有假设供应商扩展的tile对象，该扩展指定了单独的碰撞体积。

```json
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
    "uri": "building.glb"
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

在tileset或任何后代外部tilesets中使用的所有扩展应在顶级extensionsUsed数组属性的条目tileset JSON中列出，例如，

```json
{
  "extensionsUsed": [
    "VENDOR_collision_volume"
  ]
}
```

加载和渲染tileset或任何后代外部tileset所需的所有扩展也应在顶级extensionsRequired数组属性的条目tileset JSON中列出，这样extensionsRequired是extensionsUsed的子集。ExtensionsRequired中的所有值也应存在于extensionsUsed中。

#### [附加功能](https://github.com/CesiumGS/3d-tiles/tree/main/specification#extras)

extras属性允许将应用程序特定的元数据添加到任何 3D Tiles JSON 对象中。以下示例显示了具有附加应用程序特定名称属性的tile对象。

```json
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
    "uri": "building.glb"
  },
  "extras": {
    "name": "Empire State Building"
  }
}
```

[完整的 JSON 架构可以在tileset.schema.json](https://github.com/CesiumGS/3d-tiles/tree/main/specification/schema/tileset.schema.json)中找到 。

## [tile格式规格](https://github.com/CesiumGS/3d-tiles/tree/main/specification#tile-format-specifications)

每个tile的content.uri属性是包含用于渲染tile 3D 内容的信息的文件的 uri。内容是下面列出的格式之一的实例。

[glTF 2.0](https://github.com/KhronosGroup/glTF)是 3D tile的主要tile格式。glTF 是一个开放规范，专为高效传输和加载 3D 内容而设计。glTF 资源包括单个tile的几何和纹理信息，并且可以扩展为包括元数据、模型实例化和压缩。glTF 可用于多种 3D 内容，包括：

- 异构 3D 模型。例如，带纹理的地形和表面、3D 建筑外部和内部、大型模型
- 3D 模型实例。例如树、风车、螺栓
- 海量点云

有关更多详细信息，请参阅[glTF tile格式。](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/glTF/README.adoc#tileformats-gltf-gltf)

tile还可以引用下面列出的旧版 3D tile 1.0 格式。这些格式在 3D Tiles 1.1 中已弃用，并且可能会在 3D Tiles 的未来版本中删除。

表 6. 旧版切片格式和常见用途

|旧格式|用途|
|---|---|
|[批量 3D 模型 ( b3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.adoc#tileformats-batched3dmodel-batched-3d-model)|异构 3D 模型|
|[实例 3D 模型 ( i3dm )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.adoc#tileformats-instanced3dmodel-instanced-3d-model)|3D模型实例|
|[点云 ( pnts )](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/PointCloud/README.adoc#tileformats-pointcloud-point-cloud)|海量点数|
|[复合材料（cmpt）](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.adoc#tileformats-composite-composite)|将不同格式的tile连接成一个tile|

## [声明式样式规范](https://github.com/CesiumGS/3d-tiles/tree/main/specification#declarative-styling-specification)

3D Tiles 包括使用 JSON 定义的简洁声明式样式以及以 JavaScript 增强样式子集编写的表达式。

样式使用基于要素属性的表达式定义要素的显示方式，例如显示和颜色（RGB 和半透明度）。

以下示例将高度高于 90 的要素着色为红色，将其他要素着色为白色。

```json
{
  "color" : "(${Height} > 90) ? color('red') : color('white')"
}
```

有关完整的详细信息，请参阅[声明式样式](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Styling/README.adoc#styling-styling)规范。
