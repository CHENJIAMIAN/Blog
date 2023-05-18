## cesium的primitive的性能比entiy高很多吗？如果是，那是为什么

Cesium中的primitive和entity是用于构建三维场景的基本元素。在Cesium中，primitives通常指的是简单几何形状，而entities通常指的是更复杂的对象，如模型、点云数据等。

就性能方面而言，primitives通常比entities更加轻量级和高效。这是因为primitives通常只包含定义一个基本几何形状所需的最小信息，如位置、大小和颜色等。相比之下，entities则可能包含更多的信息，如层次结构、动画、属性等。在处理大量数据时，使用primitives可以提高渲染性能和响应速度。

此外，Cesium在渲染场景时采用了一些优化技术，如视锥剔除（frustum culling）和LOD（Level of Detail），这些技术可以进一步提高primitives的性能。视锥剔除可以排除不在当前视图范围内的物体，从而减少不必要的计算。而LOD技术可以根据物体与观察者的距离和大小自适应地选择合适的细节层次，以达到更好的性能和视觉效果。

总的来说，尽管primitives和entities在Cesium中都有其各自的作用和特点，但由于primitives通常更加轻量级和高效，所以在处理大量数据时，使用primitives可以提高渲染性能和响应速度。

## 能被cesium加载terrain数据长什么样子,  文件结构是什么样的

Quantized Mesh的文件格式是二进制格式，通常使用扩展名为".terrain"或".mesh"。这种格式使用了量化技术，将地形数据压缩并存储为二进制格式，从而减小了数据文件的大小。
Quantized Mesh文件包含了地形数据的三角形网格、高度信息、纹理信息、法线信息等。
同时，Quantized Mesh还支持多级细节，可以根据观察者的位置和距离动态加载不同级别的细节，以提高渲染效率。
由于Quantized Mesh的文件格式是二进制格式，因此需要特定的软件或库来读取和处理这种格式的文件。

Quantized Mesh文件结构包括以下几部分：
1. Header：包含文件版本、最小和最大高度、节点数等信息。
2. Indices：索引数组，用于描述三角形网格的拓扑结构。
3. Positions：顶点位置数组。
4. Normals：顶点法线数组。
5. Texture Coordinates：顶点纹理坐标数组。
6. Octants和Water Mask：用于描述地形切片和水域覆盖。

```js
 .terrian文件是二进制+末尾json
	末尾json包含：
		available: (10) [
							[
								{
									endX: 3
									endY: 1
									startX: 2
									startY: 0
								}
							],
							 Array(1), Array(1), Array(1), Array(5), Array(5), 
							 Array(5), Array(5), Array(84), Array(84)
						 ]
		geometricerror: 78822.47759060614
		surfacearea: 256716195410744.53
		available数组表示该地形数据分为10个等级，每个等级包含的瓦片数量分别是1，1，1，1，5，5，5，5，84，84。这个数组描述了地形数据在空间中组成的树状结构，以便在不同细节级别上进行渲染。
		“geometricerror”属性表示该数据的几何误差，即表示每个瓦片在地球表面的最大距离偏差，单位为米。这个属性越小，数据越精细。
		surfacearea属性表示该数据所覆盖的地表面积，单位为平方米。
```


加载完成后，Cesium会自动根据Quantized Mesh数据生成地形模型，并进行光照和阴影的计算，实现高度感和细节效果。

## 源码Tools/jsdoc/cesium_template/publish.js被谁调用？

```js
-> npm run build-docs 
-> gulp buildDocs
-> gulpfile.js的buildDocs方法
-> npx jsdoc --configure Tools/jsdoc/conf. json --pedantic ${generatePrivateDocumentation}
-> node_modules/jsdoc/cli.js 
	-> cli.generateDocs 
		-> template = require(`${env.opts.template}/publish`);
```

## 3DTiles模型的如何处理成box类型而不是region类型

在3DTiles模型中，模型数据通常被分割成许多"瓦片"，每个瓦片都包含一定范围内的模型数据。这些瓦片的范围可以以不同的方式表示，例如"box"类型和"region"类型。默认情况下，3DTiles的瓦片范围都是以"region"类型表示的，而不是"box"类型。

要将3DTiles模型中的瓦片范围从"region"类型转换为"box"类型，需要进行以下步骤：

1. 提取模型数据中的经纬度坐标信息。
2. 在地球上通过这些经纬度坐标信息绘制一个矩形，确定模型在地球表面上的范围。
3. 将该矩形范围转换为一个"box"类型表示，包含该矩形的最小包围盒。
4. 将计算出的"box"类型范围信息写入3DTiles模型瓦片的metadata信息中，以供渲染引擎使用。

具体实现方式可以根据模型数据的不同而有所不同。以下是一个可能的实现示例：

```javascript
// 提取瓦片数据中的经纬度信息
var region = tile.content.boundingVolume.region;  // 获取region类型表示的范围信息
var minLon = Cesium.Math.toDegrees(region[0]);
var minLat = Cesium.Math.toDegrees(region[1]);
var maxLon = Cesium.Math.toDegrees(region[2]);
var maxLat = Cesium.Math.toDegrees(region[3]);

// 计算并转换为box类型范围信息
var rectangle = Cesium.Rectangle.fromDegrees(minLon, minLat, maxLon, maxLat);  // 创建矩形范围
var boundingBox = Cesium.AxisAlignedBoundingBox.fromRectangle(rectangle);    // 转换为最小包围盒
var box = [boundingBox.minimum.x, boundingBox.minimum.y, boundingBox.minimum.z, boundingBox.maximum.x, boundingBox.maximum.y, boundingBox.maximum.z];

// 将范围信息写入metadata中
tile.content.metadata = {
  "box": box
};
```

上述代码中，我们首先从瓦片数据中提取经纬度坐标信息，然后通过这些信息创建一个矩形范围，最后将矩形范围转换为最小包围盒，即"box"类型表示的范围信息。最后，将这个信息写入3DTiles模型瓦片的metadata中，以供渲染引擎使用。

## 百度地图破解获取3D建筑物
[解析百度地图api 返回数据_新版百度地图建筑数据含高度解析_weixin_39747807的博客-CSDN博客](https://blog.csdn.net/weixin_39747807/article/details/110460861)
```js
负载均衡:
	webmap0.bdimg.com === webmap1.bdimg.com ==== map.baidu.com 

///我们还可以直接从worker返回消息处入手（拦截，伪造https证书替换js），将解析后的顶点缓冲和索引进行解析，直接获得建筑的平面数据和高度。把这些数据保存下来，并通过后期的处理，即可以获得比较完整的百度地图建筑轮廓数据。

_updateFrame分支2: webgl draw矢量瓦片到画布
	fo.drawElements(fo.TRIANGLES, fm.element1.length, fo.UNSIGNED_SHORT, 0)
    i (VM1410:formatted:1337)  
    （匿名） (VM1410:formatted:1513) | 'e7(i, fm, e, fl, fk) 是drawTileBase3D绘制块block的gl draw函数'
	    //e7大概call了32次drawElements 3D建筑物就显示出来了
    drawTileLayer (VM1410:formatted:4371)
    'drawBase构建了 building3d 数据' | 'drawTileBase3D' | 'draw3D -> drawBuildings -> drawBuildingsTile打断点' (VM1410:formatted:4237)
    draw (VM1410:formatted:3150) //fj.renderData.base3d有东西时drawTileBase3D
	    如    
			[
				    {
			        "type": "line",
			        "textureSize": [16,16],
			        "texture": "MapRes/renxinghengdao16.png",
			        "lineWidth": 8,
			        "data": ["vertex": {},"index": {}],
			        "has3D": true,
			        "has2D": false,
			        "zoomWithMap": true
			    },
			    {
			        "type": "block",
			        "data": {"vertex": {},"index": {}},
			        "has3D": true,
			        "has2D": false
			    }
			]
_updateFrame分支1:接收矢量瓦片数据
	{
	    "action": "loadTileData",
	    //maponline0 - maponline3负载均衡
	    "url": "https://maponline0.bdimg.com/pvd/?qt=vtile&param=编码后参数",
	    //initmap_4213f59.js:formatted的12833行getTilesUrl方法的u变量就是编码前的参数, 如'x=24767&y=5001&z=19&styles=pl&textimg=1&v=088&udt=20230516&json=0'
	    "tileInfo": {"col": 47,        "row": 10,        "zoom": 9,        "useZoom": 9,        "tileTypeName": "na",        "loopOffsetX": 0,        
				    "tileSize": 512,        "baseTileSize": 512,        "mercatorSize": 262144    },
	    "tileKey": "B_NORMAL_MAP_default_47_10_9_9"
	}
    self.onmessage (worker_wasm_ncq5j1.js:formatted:1118)
    - Worker.postMessage（异步）
    loadTileData (initmap_4213f59.js:formatted:2:15008)
    loadVectorTileData (initmap_4213f59.js:formatted:2:13026)
    loadVectorLayerData (initmap_4213f59.js:formatted:2:12969)
    loadLayerData (initmap_4213f59.js:formatted:2:12862)
    - setTimeout（异步）
    loadLayersData (initmap_4213f59.js:formatted:2:15106)
    on("update",（匿名）) (initmap_4213f59.js:formatted:2:15031)
    x.BaseClass.fire.x.BaseClass.dispatchEvent (initmap_4213f59.js:formatted:2:1856)
- 请求渲染
_updateFrame (VM1410:1)
eval (VM1410:1)
- requestAnimationFrame（异步）
startRenderThread (VM1410:1)
fk.on("zoom_changed" ,fm) (VM1410:1)
-
x.BaseClass.fire.x.BaseClass.dispatchEvent (initmap_4213f59.js:formatted:2:1856)
_setValue (initmap_4213f59.js:formatted:2:10807)
render (initmap_4213f59.js:formatted:2:10783)
l._loop (initmap_4213f59.js:formatted:2:4355)
（匿名） (initmap_4213f59.js:formatted:2:4332)
requestAnimationFrame（异步）
l._doStart (initmap_4213f59.js:formatted:2:4331)
l (initmap_4213f59.js:formatted:2:145)
_startInfiniteZoomAnimation (initmap_4213f59.js:formatted:2:10776)
zoomTo (initmap_4213f59.js:formatted:2:10486)
setZoom (initmap_4213f59.js:formatted:2:3937)
- 事件相关
ey._onWheelMouse (VM1411:1)
ey.wheel (VM1411:1)
i.addEventListener("deepzoommousewheel",eval) (VM1411:1)
x.BaseClass.fire.x.BaseClass.dispatchEvent (initmap_4213f59.js:formatted:2:1856)
eY._deepZoomWheel (VM1411:1)
i (VM1411:1)

https://maponline2.bdimg.com/tile/?qt=vtile&x=3158&y=1180&z=14&styles=pl&udt=20200928&scaler=1&showtext=1
https://maponline2.bdimg.com/pvd/?qt=vtile&param=xxx
```
#### 绘制block的shader:
> shader定义在mapgl的js(即VM1410,是_jsload函数插入的<script)
```js
precision highp float; // 设定精度为highp

attribute vec4 a_pos; // 定义顶点位置的attribute变量
attribute vec4 a_normal; // 定义顶点法线的attribute变量
attribute vec4 a_color; // 定义颜色的attribute变量

uniform mat4 u_proj_matrix; // 投影矩阵
uniform mat4 u_mv_matrix; // 变换矩阵
uniform mat4 u_normal_matrix; // 法线变换矩阵
uniform vec3 u_side_light_dir; // 侧面光源方向的uniform变量
uniform bool u_is_normal; // 判断是否使用法线贴图的uniform变量

varying vec4 _; // 传递到片元着色器中的颜色和透明度的变量
varying float a; // 传递到片元着色器中的偏移量变量

const vec3 b = vec3(0.06, 0.06, 0.06); // 光照常量项
vec3 c = vec3(0.1, 0.1, 0.1); // 光照环境项

void main() {
    vec4 d = u_proj_matrix * u_mv_matrix * a_pos; // 计算投影后的坐标
    gl_Position = d; // 将投影后的坐标赋值给内建变量gl_Position
    a = -1. / 500. - a_pos.z / 100.; // 计算偏移量
    gl_Position.z = gl_Position.z + a; // 将偏移量加到z坐标上，使得离视点越近的物体显示在更前面

    if(!u_is_normal) { // 如果不使用法线贴图，则将光照环境项设置为0.2
        c = vec3(0.2, 0.2, 0.2);
    }

    if(u_is_normal && a_normal == vec4(0., 0., 1., 1.)) { // 如果使用法线贴图且面朝向相同，则将传递到片元着色器中的颜色和透明度赋值为a_color
        _ = a_color;
    } else { // 否则，计算光照信息
        vec3 e = a_color.rgb; // 获取顶点颜色
        vec3 f = normalize(vec3(u_normal_matrix * a_normal)); // 获取法线方向，并标准化
        vec4 g = u_mv_matrix * vec4(0, 1, 0, 0); // 获取上方向，并进行矩阵变换
        vec3 h = normalize(g.xyz); // 标准化后的上方向
        float i = max(0., dot(f, -h)); // 进行点积运算，并取最大值
        vec4 j = u_mv_matrix * vec4(u_side_light_dir, 0); // 确定侧面光源方向，并进行矩阵变换
        vec3 k = normalize(j.xyz); // 标准化后的侧面光源方向
        float l = max(0., dot(f, -k)); // 进行点积运算，并取最大值

        if(a_pos.z < 2.) { // 如果z坐标小于2，则计算一个额外的衰减因子m，并将其应用于光照强度中
            float m = (2. - a_pos.z) / 5.;
            l = l - m;
        }

        _ = vec4(e + e * c * l + e * b * i, a_color.a); // 根据各项因素，计算出传递到片元着色器中的颜色和透明度
    }
}

precision highp float;

varying vec4 _;
varying float a;
float b = 4000.0;
float c = 500.0;
void main() {
    //定义浮点数类型的变量 "d" 并赋值为 gl_FragCoord.z / gl_FragCoord.w - a
    float d = (gl_FragCoord.z / gl_FragCoord.w - a);
    //定义浮点数类型的变量 "e" 并赋值为 _.a
    float e = _.a;
    //如果 d 大于 b 减去 c
    if(d > b - c) {
        //重新给 e 赋值为 e 乘以 (b-d) 除以 c
        e = e * (b - d) / c;
        //如果 e 小于等于 0，则不绘制该像素
        if(e <= 0.) {
            discard;
        }
    }
    //设置像素颜色为 vec4(_.rgb, e)
    gl_FragColor = vec4(_.rgb, e);
}
```
