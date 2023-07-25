## 基于3D组态测试GIS功能的可行性

- 优锘是怎么实现three跟cesium的融合的

    ```JavaScript
    Map引用了TileEarth，它的customSetup是
        TileEarth是作为Control被App.prototype._tick回调其onUpdate函数
        
    uearth.CMap的TileEarth是其核心
    抛弃了new Cesium.Viewer/new Cesium.Scene/ new Cesium.Globe那一套Cesium原生的构建地球的方法,自己利用Cesium的API重写了一套
    
    TileEarth用了Cesium.FrameState的在update循环中更新
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

  - 基于cesium1.52用到了THING t3djs

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

  - 基于cesium1.52用到了THREE

    ```JavaScript
    uearth.min.<function>.define("Scene/ImageryLayer") callback.C._createTexture
    ```

- GitHub有没有相关的库
  - 基本都是根据[CesiumGS/cesium-threejs-experiment](https://github.com/CesiumGS/cesium-threejs-experiment)改造而来, 文章[将 Cesium 与 Three.js 集成 – Cesium](https://cesium.com/blog/2017/10/23/integrating-cesium-with-threejs/),演示[CesiumJS+ThreeJS](https://cesiumgs.github.io/cesium-threejs-experiment/public/index.html),新版本依赖演示[syzdev/Cesium-Three: 🔧 最新的基于Cesium 1.95与Three 143的整合示例](https://github.com/syzdev/Cesium-Three)
  - [iTowns](https://github.com/iTowns)/**[itowns](https://github.com/iTowns/itowns)****基于 Three.js 的框架，用于可视化 3D 地理空间数据**
  - 在`Cesium`中实现类似`Three.js`的Mesh和Material的一套接口和渲染机制，支持部分`Three.js`对象[MikesWei/CesiumMeshVisualizer：Cesium+Three.js。](https://github.com/MikesWei/CesiumMeshVisualizer)
- 不考虑Cesium，Three.js能加载地图吗？
  - [Cesium和Three.js结合的5个方案 - 知乎](https://zhuanlan.zhihu.com/p/441682100) 三维网格3D
  - Three.js能加载3DTiles吗？
    - [NASA-AMMOS](https://github.com/NASA-AMMOS)/**[3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS)**threejs 的基于瓦片的地理世界地图可视化库**[tentone.github.io/geo-three/docs/](https://tentone.github.io/geo-three/docs/)**

## 基于3D组态测试BIM功能的可行性

1. ifc（<40MB)
    1. 原生支持
    2. 边界：40M 10s 加载完成
2. ifc转3DTiles(>=40MB)
    1. 研究第三方3DTiles扩展库

## BIM输出 （已用FME转成了3DTiles）

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
### 调用过程
```js
    Thing.customSetup (thing-1.2.7.1.min.js:formatted:66090)
    Thing._setup (thing-1.2.7.1.min.js:formatted:65967) 
    或
    Map地图._setup (thing-1.2.7.1.min.js:formatted:65967)
    Map的父类BaseObject.loadFromURL (thing-1.2.7.1.min.js:formatted:65929)
    Map的父类BaseObject.setupFromURL (thing-1.2.7.1.min.js:formatted:65938)
Thing.setup (thing-1.2.7.1.min.js:formatted:65980)  根据传入的options里有没有url进行条件分支
App.objectManager._createObject (thing-1.2.7.1.min.js:formatted:91931)
App.objectManager.create (thing-1.2.7.1.min.js:formatted:91943)
App.create (thing-1.2.7.1.min.js:formatted:104240)
App.init (thing-1.2.7.1.min.js:formatted:104025)
e (thing-1.2.7.1.min.js:formatted:103765)
（匿名） (d5712b8fda2c91bdb4cf3cce:formatted:185)
```

### 获取https://thingmap.thingjs.com/theme全国任意地方的geojson
```js
过滤请求: -/appmaptile -r.png
过滤日志: -url:https://city.thingjs.com/js/chunk-libs.c79cf7ef.js

_createLayerMesh(t, e, n, a) {
	console.time("开始创建" + a);
	var i = this;
	console.time("解析数据");
	let o = this._parseData(t, e);
	console.timeEnd("解析数据");


获取建筑物: 
	在y.dataSource = b 处打日志断点  y.name,b
	geoBuilding_
	d["a"].createLayer(y)
	y.dataSource = b, //就是geojson
		此处闭包(n)的变量y //包含geojson所属图层的说明
	https://city.thingjs.com/ra/file/fetch/cache/layer/923BA52EE6E238918A3969077A1D0B9B26AC0E2DC63C4D34 可能是
		Building 拉伸高度的面
		Roadlmportant	RoadMain	RoadSub	RoadNorm	Railway	Water	Greenland
	https://city.thingjs.com/ra/file/fetch/earthEffectData/2021/11/file_20211103102102409_198585.geojson.cbencrypt 加密的geojson国家省区划等请求

wasm文件关系
	主线程:
	lib/wasmNew/thing.wasm.js操作了
	lib/wasmNew/thing.wasm.wasm //创建了4个worker ,并requestAnimationFrame在需要时postMessage给了workder线程
	很多个workder线程:
		lib/wasmNew/thing.wasm.worker.js操作了
		lib/wasmNew/thing.wasm.worker.wasm

wasm如何初始化
	html
	thing.wasm.loader.umd.min.js插入了"/static/lib/wasmNew/thing.wasm.js"
		//cd = Ve.toText("166,149,61,44,125,106,57,87,196,244,63,177,50")也就是"thing.wasm.js"
	
	thing.wasm.js:TWASMModule //onmessage接收请求
	thing.wasm.loader.umd.min.js:TWASMModule().then
	thing.min-V1.4.23.js:wasmLoader.init

Wasm鉴权
	在app.e6a7a813.js去THING.Utils.login({
				method: "GET",
				url: "".concat(i["a"].BaseUrl, "city/WasmAuth"),
				wasmRootPath: "/static/lib/wasmNew"
			}).then((function() {e({isUseBundle: !0})}

如何把复杂任务提交给wasm,处理完如何交回去
					 _App.prototype.setupComplete
					 initPluginAndSetAuth
					 new WebAssemblyEngine
					 _WebAssemblyEngine.prototype._loadFromByteCode
					 WebAssembly.instantiate
					 _this._instance //await WebAssembly.compile(byteCode);获取到了内嵌在thing.js里的wasm byteCode提供的方法们memory,memset,memcpy,memmove,memcmp,isPrime,toUpper,toLower,stringEquals,stringLength,searchStringL2R,searchStringR2L,startWiths,copyString,mixString,getFileName,allocString,appendString,subString,consoleNumber,consoleBuffer,consoleLog,runScript,jsmn_parse,jsmn_init,parseJSONString,findJSONToken,freeJSONToken,gcd,ExtEuclid,rsa_modExp,rsaGenKeys,rsaGetEncryptSize,initGlobal,initKeys,freeGlobal,setRandomSeeds,__random,randomUint,requestFileSize,onRecvFileSize,getEncodingStringSize,getEncodingStringData,encodeString,getDecodingStringSize,decodeString,encodeStringWithKeys,decodeStringWithKeys,getAttributes,getID,getPluginsNumber,getPluginVersion,getPluginName,getPluginDesc,setAttributes,getRandomValue,eval
					chunk-libs.c79cf7ef.js的c.prototype.request
```
