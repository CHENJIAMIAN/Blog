## 1. tif和terrain格式介绍

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_1-2-tif%E6%A0%BC%E5%BC%8F%E4%BB%8B%E7%BB%8D)1.2 tif格式介绍

TIF文件为栅格图像文件，后缀为tif或tiff，是ogc规范的一种，全称GeoTiff。通常不能在资源管理器中查看tif栅格影像数据的坐标系信息，需要用GIS软件查看，因为它的坐标系信息写在数据文件内部。

tif可以有8位，24位等深度，一般真彩色是24位，而地形数据只有一个高度值，采用8位。目前很多卫星影像数据、地形数据的存储格式都是tif。

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_1-2-terrain%E6%A0%BC%E5%BC%8F%E4%BB%8B%E7%BB%8D)1.2 terrain格式介绍

可以参考 [官方资料(opens new window)](https://github.com/CesiumGS/quantized-mesh)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_1-3-dem%E6%95%B0%E6%8D%AE%E6%9D%A5%E6%BA%90)1.3 DEM数据来源

目前很多网站可以下载公开的90米或30米精度的tif格式DEM地形数据，比如：
- [地理空间数据云官网](http://www.gscloud.cn/) **最常用**
-   [http://srtm.csi.cgiar.org/SELECTION/inputCoord.asp (opens new window)](http://srtm.csi.cgiar.org/SELECTION/inputCoord.asp)等网站下载。

也可以通过一些爬虫工具，如[水经微图 (opens new window)](http://www.rivermap.cn/down.html)、[太乐地图 (opens new window)](http://www.arctiler.com/index.html)等下载谷歌地球的高精度DEM地形数据。

## [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7)3. 处理工具

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-1-cesium-terrain-builder-%E5%BC%80%E6%BA%90%E5%B7%A5%E5%85%B7-ctb)3.1 Cesium Terrain Builder 开源工具（CTB）

来源：Github开源

说明：按开源仓库教程操作，通过命令行的方式进行数据转换。

[CTB地形处理工具(opens new window)](https://github.com/geo-data/cesium-terrain-builder/)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-2-terr2cesiumapp%E5%B7%A5%E5%85%B7)3.2 terr2cesiumApp工具

来源：QQ群703622028 风的心愿 提供
说明：按下载的文件内说明进行操作。
[下载地址(opens new window)](http://data.mars3d.cn/tool/terr2cesiumApp.zip)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-3-cesiumlab%E5%B7%A5%E5%85%B7-%E5%9C%B0%E5%BD%A2%E5%88%87%E7%89%87-%E6%A8%A1%E5%9D%97)3.3 Cesiumlab工具“地形切片”模块

来源：北京西部世界公司
说明：从官网下载工具后，按工具说明注册帐号登录后即可使用，是图形化界面操作，操作比较简便。
[官方下载地址 (opens new window)](http://www.cesiumlab.com/)[官方操作说明(opens new window)](http://www.cesiumlab.com/doc/CesiumLab/index.html#/dataprocess/terrain.md

> 3.4 GDAL地形处理工具

### 3.5 自己写爬虫下载，不用tif转terrain的过程，直接获取到官方的.terrain
> 1. [devtool.app.js - up209d/ResourcesSaverExt - GitHub1s](https://github1s.com/up209d/ResourcesSaverExt/blob/HEAD/unpacked2x/legacy/0.1.9/devtool.app.js) 
> 	1. 直接浏览想要的区域，用ResourcesSaver插件保存到本地 
> 	2. 如果要自定义插件为专门保存.terrian的工具则需要掌握chrome插件开发，至少要花2天时间研究
> 2. [tile.go - atlasdatatech/tiler - GitHub1s](https://github1s.com/atlasdatatech/tiler/blob/HEAD/tile.go)
> 	1. 还没研究，是go写的爬取xyz瓦片的，可考虑改造成爬取xyz地形

## [#](http://mars3d.cn/dev/guide/data/terrain.html#_4-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%AF%B4%E6%98%8E)4. 常见问题说明

我们先说一下地形栅格数据的几个关键参数： 强烈建议处理之前，先用arcmap打开，确保以下参数正常。

下面操作需要安装 [ArcGIS for Desktop (opens new window)](https://www.esri.com/en-us/arcgis/products/arcgis-desktop/overview)软件，可以自行百度后下载。

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_1-%E7%A9%BA%E9%97%B4%E5%8F%82%E8%80%83-spatial-reference)1，空间参考（spatial reference）

spatial reference 定义了 栅格数据的坐标空间，下图为正常参数，如果arcmap 这里显示undefined，那表示空间参考未知，必然无法正常处理。 栅格的空间参考信息。如果tif中不含空间参考，但是空间参考数据处理人员又明确知道，那么可以在处理工具中指定。反过来说如果不确定，那就不要乱尝试，只会浪费处理时间。

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_2-%E6%97%A0%E6%95%B0%E6%8D%AE%E5%80%BC-nodata)2，无数据值（nodata）

nodata定义了删格中的无效数据数据值，也就是说如果栅格里某个像素的值 = nodata，意味着该像素没有数据。 对于nodata的处理，处理工具把该位置使用高程0填充。

但是原始数据中这个值很乱，完全是用户设置的，栅格里可能没有这个nodata信息，也可能为任意值。一般用户会设置一个超大的负数值，比如 -10000  ，-99999等。这里强烈建议，不要设置数据极值，例如-1.797693e+308 ，这种极值会导致中间计算出现非数字，导致地形处理异常。

如果原始栅格中没有nodata值，只有一种情况处理地形高程会正常（数据的空间参考是wgs84，地形数据边界为矩形）。

除此之外都必须知道nodata值对应的具体数值，还是必须通过arcmap打开tif，使用indentify工具，点击我们明确知道是无数据区域，那么获得他的值。

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-%E5%9C%B0%E7%90%86%E8%8C%83%E5%9B%B4-extent)3，地理范围（extent)

栅格数据实际上是一张图片，必须要一个转换，把像素坐标转到地理坐标，这就是extent，在gdal里是geotransform。

正常这里应该显示的地理坐标，如果你发现这个extent的四个值里有0，那么基本意味着，你的tif的地理范围信息缺失。 tif 一般把这个信息存储在文件内，还有另一种方式存储为 同名的tfw 文件。所以我们处理或者拷贝数据的时候，如果有tfw，请一并拷贝。

### [#](http://mars3d.cn/dev/guide/data/terrain.html#%E5%88%86%E6%9E%90%E5%A4%84%E7%90%86%E5%9C%B0%E5%BD%A2%E7%9A%84%E5%BC%82%E5%B8%B8%E6%83%85%E5%86%B5%E5%8E%9F%E5%9B%A0)分析处理地形的异常情况原因

确保上面三个关键参数正确，我们再分析处理地形的异常情况原因：

1.  瞬间结束：空间参考缺失  或者  地理范围缺失
2.  处理完成之后半边黑球：nodata 过大
3.  地形高程异常：nodata 缺失或者不正确
4.  位置不正确或伴随高程不正常：一般是空间参考不正确

根据异常原因，请在arcmap使用相关工具处理你的栅格数据。

## [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-%E5%A4%84%E7%90%86%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B%E5%AE%8C%E6%95%B4%E7%A4%BA%E4%BE%8B)3. 处理操作流程完整示例

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-1-%E4%B8%8B%E8%BD%BDtif%E5%9C%B0%E5%BD%A2%E6%96%87%E4%BB%B6)3.1 下载tif地形文件

若已拥有tif文件直接进行下一步操作，下面我们通过水经微图软件下载为例讲解;

如下图操作，进行下载导出；

![image](http://mars3d.cn/dev/img/guide/data-terrain-01.jpg)

导出结果如下：

![image](http://mars3d.cn/dev/img/guide/data-terrain-02.jpg)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_3-2-%E8%BD%AC%E6%8D%A2%E4%B8%BAterrain%E6%96%87%E4%BB%B6)3.2 转换为.terrain散列文件

下面我们以Cesiumlab工具“地形切片”模块为例，进行转换

-   选择地形切片模块；
-   添加文件，可以添加多个，勾选自己所需要导出的文件；
-   选择散列文件，导出terrain格式；
-   选择导出的路径

![image](http://mars3d.cn/dev/img/guide/data-terrain-03.jpg)

转换成功后的地形文件如下：

![image](http://mars3d.cn/dev/img/guide/data-terrain-04.jpg)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_4-3-%E5%8F%91%E5%B8%83%E4%B8%89%E7%BB%B4%E6%95%B0%E6%8D%AE%E4%B8%BAhttp%E6%9C%8D%E5%8A%A1)4.3 发布三维数据为HTTP服务

因为terrain数据一般都很大，建议发布为独立服务。

可以参考教程[发布三维数据服务](http://mars3d.cn/dev/guide/data/server.html)

### [#](http://mars3d.cn/dev/guide/data/terrain.html#_4-4-%E5%9C%A8%E5%B9%B3%E5%8F%B0%E4%B8%AD%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9E%8B)4.4 在平台中加载模型

可以在[地形加载示例 (opens new window)](http://mars3d.cn/editor-vue.html?id=map/terrain/terrainProvider)更换对应url后进行验证，查看是否可以成功加载

```js
var viewer = new Cesium.Viewer('cesiumContainer');

var terrainProvider = new Cesium.CesiumTerrainProvider({
  url : 'path_to_terrain_data_directory',
  requestWaterMask : true,
  requestVertexNormals : true,
  requestSlopeRamp : true,
  maximumLevel: 7
});

viewer.terrainProvider = terrainProvider;
```
## [#](http://mars3d.cn/dev/guide/data/terrain.html#_4-%E5%85%B6%E4%BB%96%E4%BC%98%E7%A7%80%E6%95%99%E7%A8%8B)4. 其他优秀教程

-   [孙霸天 - 使用NGINX发布DEM切片](https://jackie-sun.blog.csdn.net/article/details/123638081)