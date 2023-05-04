# Cesium 1.97 发布

CesiumJS 1.97 现已可用。CesiumJS 已经切换到一个新的架构来加载 glTF 模型和 tilesets 以启用： 
-   用户定义的 GLSL 着色器通过[`CustomShader`](https://github.com/CesiumGS/cesium/blob/main/Documentation/CustomShaderGuide/README.md)

找到[vue-vite-cesium-demo/](https://lihanqiang.github.io/vue-vite-cesium-demo/) 可用，包含
1. 经度、纬度、高度/距离/面积
2. 生成大量节点/视场分析/扩散培/加载 Tileset/高危报警/动态连线/对空雷达/动态河流/白模建筑/显示卫星/可视域分析/加载 Geojson/加载地形/地面雷达/菲涅尔区/河流淹没/追踪扫描Echarts结合
3. 天气/雨天/雪天/雾天
4. 飞行模拟/直飞/绕飞/环飞/
5. 飞机探测(视频推流)

[earthsdk digitalCity](http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./earth-digitalCity.html#:~:text=%20v_elevationPos.z%20-%20_baseHeight%3B%20) 包含多个特效案例vue-vite-cesium-demo的Tileset特效根源于它，作者是[在cesiumlab工作的唐晓飞vtxf (Tang Xiaofei)](https://github.com/vtxf) 

[mars3d-vue-example/map.js at d141900bea02b8daa2e2834b347067f73967ce48 · marsgis/mars3d-vue-example](https://github.com/marsgis/mars3d-vue-example/blob/d141900bea02b8daa2e2834b347067f73967ce48/src/example/layer-tileset/style/customShader/map.js#L24) 这里也有几个shader可以参考

[基础实例|xt3d](http://211.149.185.229:8080/basiccategorylist) 有管线流动的效果，但官网限制了无法直接请求静态资源 和 打开开发者工具就会崩溃（原理没时间去研究）
```js
  但是可以通过这样在代码编辑器去下载资源
  http://211.149.185.229:8080/BasicExampleEditor?path=PolylineObject-PolylineSprite
      const url = `/data.xt3d.cn/assets/images/polylinematerial/spriteline2.png`;
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const downloadBlob = (blob, fileName) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "download";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Release the object URL
          };
          const filename = url.split("/").at(-1);
          // Example usage
          downloadBlob(blob, filename);

          //alert(base64data)
        })
        .catch((error) => console.error(error));
```
