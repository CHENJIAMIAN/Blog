### 优锘是怎么实现three跟cesium的融合的
```JavaScript
Map引用了TileEarth，它的customSetup是
	TileEarth是作为Control被App.prototype._tick回调其onUpdate函数
	
uearth.CMap的TileEarth是其核心
抛弃了new Cesium.Viewer/new Cesium.Scene/ new Cesium.Globe那一套Cesium原生的构建地球的方法,自己利用Cesium的API重写了一套

TileEarth用了Cesium.FrameState 的在update循环中更新
	利用new Cesium.Globe做的事情来新建地球:
		this._surface =  new Cesium.QuadtreePrimitive({ tileProvider: new Cesium.GlobeSurfaceTileProvider({  
		那么是哪里引用了dom呢,没有看到用了Cesium.Context对象,所以是用了Three.js的webgl
			调用了cesium的update，但是主要操作frameState对象，没有调用到gl绘制
				Globe.prototype.render = function(frameState) {
					surface.render(frameState);
						QuadtreePrimitive.prototype.render.beginFrame
						QuadtreePrimitive.prototype.render = function(frameState) {
							GlobeSurfaceTileProvider.prototype.beginUpdate                            
							GlobeSurfaceTileProvider.prototype.endUpdate = function(frameState) {
								addDrawCommandsForTile(this, tilesToRender[tileIndex], frameState);
									command.shaderProgram = tileProvider._surfaceShaderSet.getShaderProgram(surfaceShaderSetOptions);
									这些webgl的东西是没有在cesium的dom创建的，而是同一用three.js的
							QuadtreePrimitive.prototype.render.endFrame
			cesium中Renderer/Context获取了webgl对象.getContext
				Scene获取了canvas这个dom
					是CesiumWidget根据传入的容器domid创建的
		那么在哪里被Three.js的webgl渲染呢?
			什么代替了Cesium.Scene?
				它没有像Cesium.Scene一样去执行command进而执行gl的draw函数，而是TileEarth.update()代替了Scene.render()
					this.draw(tiles)拿tileProvider._tilesToRenderByTextureCount去用three.js的THREE.Mesh(geometry, tileMaterial)去渲染地球
						何时渲染gl调用？
							mesh添加到地球根节点LUtil.cacheShow(nodeId, tileMaterialId, this.rootNode)
							地球根节点被添加到了CMAP.getCurrentMap().node
							最后scene.add(xxx);进了THREE的场景
						tile.data.terrainData._mesh构造geometry
						tile.data.imagery构造tileMaterial
	用了Cesium.GlobeFS/Cesium.GlobeSurfaceShaderSet/Cesium.GlobeSurfaceTileProvider/
		Cesium.GroundAtmosphere/Cesium.GlobeVS/Cesium.ImageryLayerCollection/Cesium.JulianDate/
		Cesium.PerspectiveOffCenterFrustum
	
Tile3dLayer
	用了Cesium.Batched3DModel3DTileContent和Cesium.Cesium3DTileset和Cesium.Instanced3DModel3DTileContent
	和Cesium.ModelInstanceCollection
	和Cesium.Composite3DTileContent来重写加载3dtiles的逻辑
TileFeatureLayer用了Cesium.Cesium3DTileset
TerrainLayer用了Cesium.CesiumTerrainProvider和Cesium.EllipsoidTerrainProvider
SunLight用了Cesium.Clock和Cesium.Simon1994PlanetaryPositions和Cesium.JulianDate
EarthInstance/AtmospereInstance用了Cesium.EllipsoidGeometry 
```

#### 基于cesium1.52用到了THING t3djs

```JavaScript
Core/CesiumTerrainProvider的parseMetadataFailure方法用到了THING.App.current.trigger
Scene/Model的destroy用到了t3djs.buffer.nodeBuffer和THING.App.current.picker.removePickingMaterial
uearth.min.<function>.define("Scene/Imagery") callback.i.releaseReference
uearth.min.<function>.define("Scene/ImageryLayer") callback.C._createTexture用到到t3djs.buffer.textureBuffer
uearth.min.<function>.define("Scene/TileReplacementQueue") callback.e.trimTiles
	用到了CMAP.getCurrentMap()._earthInstance.tileEarth.quadTileMatrial和类似Scene/Model
uearth.min.<function>.define("DataSources/GeoJsonDataSource") callback.createPoint用到了CMAP.Util.convertLonlatToWorld    
uearth.min.<function>.define("Scene/UrlTemplateImageryProvider") callback.o.reinitialize.then() callback
	用了Cesium.BaiduMercatorTilingScheme和Cesium.GBTilingScheme
```

#### 基于cesium1.52用到了THREE

```JavaScript
uearth.min.<function>.define("Scene/ImageryLayer") callback.C._createTexture
```

#### - GitHub有没有相关的库
  - 基本都是根据[CesiumGS/cesium-threejs-experiment](https://github.com/CesiumGS/cesium-threejs-experiment)改造而来, 文章[将 Cesium 与 Three.js 集成 – Cesium](https://cesium.com/blog/2017/10/23/integrating-cesium-with-threejs/),演示[CesiumJS+ThreeJS](https://cesiumgs.github.io/cesium-threejs-experiment/public/index.html),新版本依赖演示[syzdev/Cesium-Three: 🔧 最新的基于Cesium 1.95与Three 143的整合示例](https://github.com/syzdev/Cesium-Three)
  - [iTowns](https://github.com/iTowns)/**[itowns](https://github.com/iTowns/itowns)****基于 Three.js 的框架，用于可视化 3D 地理空间数据**
  - 在`Cesium`中实现类似`Three.js`的Mesh和Material的一套接口和渲染机制，支持部分`Three.js`对象[MikesWei/CesiumMeshVisualizer：Cesium+Three.js。](https://github.com/MikesWei/CesiumMeshVisualizer)
#### - 不考虑Cesium，Three.js能加载地图吗？
  - [Cesium和Three.js结合的5个方案 - 知乎](https://zhuanlan.zhihu.com/p/441682100) 三维网格3D
  - Three.js能加载3DTiles吗？
    - [NASA-AMMOS](https://github.com/NASA-AMMOS)/**[3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS)**threejs 的基于瓦片的地理世界地图可视化库**[tentone.github.io/geo-three/docs/](https://tentone.github.io/geo-three/docs/)**

### 基于3D组态测试BIM功能的可行性

1. ifc（<40MB)
    1. 原生支持
    2. 边界：40M 10s 加载完成
2. ifc转3DTiles(>=40MB)
    1. 研究第三方3DTiles扩展库

### BIM输出 （已用FME转成了3DTiles）

- 1.72GB的BIM -> 3d -> 压缩3d
- 107M的rvt -》 ifc是213M ，revit导出ifc要30分钟打开后出现材质丢失问题
- 107M的rvt -》 fbx是49.4M ，revit导出fbx要30小时（中途无响应磁盘不动但突然生成了）,打开没问题
- 2018转2021要1个小时占用20G内存
- revit自带整个导出不可行，G级别的会无响应卡死
- revit删除无关后再分块导出，在3d软件合并
- Revit2Gltf插件导出
  - AddinManager插件
    - AddInManager.dll
    - Autodesk.AddInManager.addin
  - Revit2Gltf.dll文件
- glTF Exporter add-in for Autodesk Revit 为了Paid add-in to export glTF from Autodesk Revit 2019 or later
- 3DMax打开rvt文件，用插件Babylon.js - Export scene to babylon or gITF format w20220601.2导
  - 开源的dynamo图形编程导出属性数据
  - 导出插件利用导出接口可以减少模型的精细程度
  
### 全局效果模板的实现
> 可参考babylon定义的xxx.babylon场景文件
- **场景配置.json**如下:
	- `code` 和 `templateId`：是地图的唯一标识符和模板ID。
	- `map`：包含了地形数据和地图的参考位置。
	- `baseMap`：定义了底图的样式，包括URL，最大级别，和图像源等。
	- `tileLayerStyle`：定义了瓦片图层的样式，包括灰度滤镜，颜色校正，亮度，对比度等。
	- `light`：定义了地图的光照设置，包括环境光，主光源，次光源等。
	- `postEffect`：定义了地图的后期处理效果，包括颜色校正，边缘模糊，色差，环境光遮蔽等。
	- `background`：定义了地图的背景图片。
	- `mapStyle`：定义了地图的风格，包括雾效果，大气效果等。
	- `overlay`：定义了地图的覆盖层，包括云层，渐变颜色覆盖等。
	- `postEffectId`，`lightId`，`scanId`，`skyBoxId`：定义了地图使用的后期处理，光照，扫描，天空盒的ID。
**分类1:** 
- 场景, 地形, 地图, 灯光, 后处理
**分类2**
1. 光源(颜色/强度/旋转)
	1. 基础光源
		1. 环境光
		2. 半球光
	2. 其他光源
		1. 主光源1
		2. 第二平行光
		3. 第三平行光
2. 后期
	1. 全局泛光
	2. 颜色调整
		2. 曝光
		3. 亮度
		4. 对比度
		5. 饱和度
		6. 伽马矫正
	3. 镜头颜色
	4. 镜头模糊
	5. 噪点
	6. 红蓝分离
	7. SSR
3. 背景
	1. 背景类型
		1. 颜色
		2. 背景图
		3. 天空盒
	2. 背景样式
7. 环境
	1. 雾效设置
		1. 雾效浓度
		2. 设置颜色
		3. 设置浓度
	2. 晨昏效果
		1. 效果类型
	3. 大气
	4. 云层效果
8. 扫光
	1. 圆扩散
	2. 旋转
9. 粒子
	1. 地球粒子
	2. 粒子