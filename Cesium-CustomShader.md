# Cesium 1.97 发布

CesiumJS 1.97 现已可用。CesiumJS 已经切换到一个新的Model架构来加载 glTF 模型和 tilesets 以启用：
> [CesiumJS 更新日志 1.96 与 1.97 - 新构建工具 esbuild 体验及 Model API 更替完成 - 岭南灯火 - 博客园](https://www.cnblogs.com/onsummer/p/16560461.html)
- 用户定义的 GLSL 着色器通过[`CustomShader`](https://github.com/CesiumGS/cesium/blob/main/Documentation/CustomShaderGuide/README.md)
- **glTF 1.0 版本的支持已移除**，请尽快转换你的数据到 glTF 2.0 版本；
- **glTF 的一项扩展 KHR_techniques_webgl 已移除**，如果你有自定义着色需求，请使用 CustomShader API
- `ModelInstanceCollection`这个私有类使用的 CPU 端实例化技术已移除；(最后一版: [cesium/ModelInstanceCollection.js at 1.96 · CesiumGS/cesium · GitHub](https://github.com/CesiumGS/cesium/blob/1.96/Source/Scene/ModelInstanceCollection.js))
	- [mars3d/ModelCombine](http://mars3d.cn/api/ModelCombine.html#:~:text=%E5%AE%9E%E4%BE%8B%20)依赖于它

找到[vue-vite-cesium-demo/](https://lihanqiang.github.io/vue-vite-cesium-demo/) 可用，包含
	1. 经度、纬度、高度/距离/面积
	2. 生成大量节点/视场分析/扩散培/加载 Tileset/高危报警/动态连线/对空雷达/动态河流/白模建筑/显示卫星/可视域分析/加载 Geojson/加载地形/地面雷达/菲涅尔区/河流淹没/追踪扫描Echarts结合
	3. 天气/雨天/雪天/雾天
	4. 飞行模拟/直飞/绕飞/环飞/
	5. 飞机探测(视频推流)

1. [earthsdk digitalCity](http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./earth-digitalCity.html#:~:text=%20v_elevationPos.z%20-%20_baseHeight%3B%20) 包含多个特效案例vue-vite-cesium-demo的Tileset特效根源于它，作者是[在cesiumlab工作的唐晓飞vtxf (Tang Xiaofei)](https://github.com/vtxf) 
2. [FreeXGIS online](http://www.freexgis.com/online/#/)
3. [mars3d-vue-example/map.js at d141900bea02b8daa2e2834b347067f73967ce48 · marsgis/mars3d-vue-example](https://github.com/marsgis/mars3d-vue-example/blob/d141900bea02b8daa2e2834b347067f73967ce48/src/example/layer-tileset/style/customShader/map.js#L24) 这里也有几个shader可以参考
4. [223个基础实例|xt3d](http://211.149.185.229:8080/basiccategorylist)  这里也有大量shader可参考,有管线流动的效果，应该是目前除[425个功能示例(Vue版) - Mars3D三维可视化平台 | 火星科技](http://mars3d.cn/example.html)cesium应用案例最全的库了**但官网限制了无法直接请求静态资源 和 打开开发者工具就会崩溃**
	 - 打开开发者工具就会崩溃的原理：[有个网站我点击F12后，浏览器就变得异常卡顿 | Laravel | Laravel China 社区](https://learnku.com/laravel/t/54919)
		 - manifest.7969719400cd8dd16534.js的blast等方法
		 - [JS反调试技术随笔记录_chouyidang1008的博客-CSDN博客](https://blog.csdn.net/chouyidang1008/article/details/100946392)
		 - 破解方法：
			 1. 打开新标签页 - 源代码 - 事件监听器断点 - 脚本 - 脚本的第一个语句
			 2. 输入`http://211.149.185.229:8080/BasicExampleEditor?path=PolylineObject-PolylineSprite`回车
			 3. 在`manifest.7969719400cd8dd16534.js`的 `var im = new Image();` 行打断点，当执行到该行时，控制台运行代码
			 4. blast = ()=>{};detectIE=()=>{};resize=()=>{};
			 5. 再放行即可
	- 核心库用[JavaScript Obfuscator Tool --- JavaScript 混淆器工具](https://obfuscator.io/)混淆过
		- 破解方法：
			1. 利用正则 + vscode的多游标 匹配 构造[获值函数1, 获值函数2...]数组 + 在devtools执行，右键执行结果复制对象，得到[值1, 值2]
			2. 利用vscode的batch rename插件批量重命名
			3. 利用正则批量把xxx.['值1']替换为xxx.值1（注意排除排除@单引号双引号 `\['([^"'@]+)'\]`）
			4. [davidaq/deuglifyjs: Reverse uglified Javascript code](https://github.com/davidaq/deuglifyjs) 一个用于反转uglify的 JS 文件的实用程序，不仅仅是格式化空格，还试图使代码更具可读性。
```js
  但是可以通过这样在代码编辑器去下载资源
  http://211.149.185.229:8080/BasicExampleEditor?path=PolylineObject-PolylineSprite
      const url = `/data.xt3d.cn/assets/images/polylinematerial/spriteline2.png`;//blast = ()=>{};detectIE=()=>{};resize=()=>{};
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

[mars3d-vue-example/map.js at 20011b390505b80445a0ce553745210613311fd1 · marsgis/mars3d-vue-example](https://github.com/marsgis/mars3d-vue-example/blob/20011b390505b80445a0ce553745210613311fd1/src/example/layer-tileset/style/customShader/map.js#L24)
[功能示例(Vue版) | Mars3D三维可视化平台 | 火星科技](http://mars3d.cn/editor-vue.html?id=layer-tileset/type/jzw)
	1. 动态渐变+动态光环的特效
	2. 夜景贴图的特效
	3. 色彩动态变化的特效
	4. http://mars3d.cn/editor-es5.html?id=layer-tileset/style/customShader
		- 夜景贴图: https://github.com/marsgis/mars3d-es5-example/blob/master/example/layer-tileset/style/customShader/map.js
[mars3d-link-supermap/map.js at master · marsgis/mars3d-link-supermap · GitHub --- mars3d-link-supermap/map.js at master · marsgis/mars3d-link-supermap · GitHub](https://github.com/marsgis/mars3d-link-supermap/blob/master/mars3d-vue-example/src/example/graphic/primitive/model/map.js)
	1. 纹理坐标移动成动画
	2. 官方的彩色点云波示例
### 管线流动
1. [graphic/primitive/polylineVolume | 火星科技](http://mars3d.cn/editor-vue.html?id=graphic/primitive/polylineVolume)
2. [graphic/primitive/polyline | 火星科技](http://mars3d.cn/editor-vue.html?id=graphic/primitive/polyline)