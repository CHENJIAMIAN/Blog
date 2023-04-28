# Cesium 1.97 发布

CesiumJS 1.97 现已可用。CesiumJS 已经切换到一个新的架构来加载 glTF 模型和 tilesets 以启用： 
-   用户定义的 GLSL 着色器通过[`CustomShader`](https://github.com/CesiumGS/cesium/blob/main/Documentation/CustomShaderGuide/README.md)

找到[vue-vite-cesium-demo/](https://lihanqiang.github.io/vue-vite-cesium-demo/) 可用，包含
1. 经度、纬度、高度/距离/面积
2. 生成大量节点/视场分析/扩散培/加载 Tileset/高危报警/动态连线/对空雷达/动态河流/白模建筑/显示卫星/可视域分析/加载 Geojson/加载地形/地面雷达/菲涅尔区/河流淹没/追踪扫描Echarts结合
3. 天气/雨天/雪天/雾天
4. 飞行模拟/直飞/绕飞/环飞/
5. 飞机探测(视频推流)

[earthsdk digitalCity](http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./earth-digitalCity.html#:~:text=%20v_elevationPos.z%20-%20_baseHeight%3B%20) 包含多个特效案例vue-vite-cesium-demo的Tileset特效根源于它