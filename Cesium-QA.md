## Cesium源码的一些疑问

```
packages/engine/Build/Specs/SpecList.js是干什么的?
	是packages/engine/Specs下所有测试用例的打包汇总
```

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

## 百度地图破解获取3D建筑物
[解析百度地图api 返回数据_新版百度地图建筑数据含高度解析_weixin_39747807的博客-CSDN博客](https://blog.csdn.net/weixin_39747807/article/details/110460861)
### 堆栈追踪
```js
负载均衡:
	webmap0.bdimg.com === webmap1.bdimg.com ==== map.baidu.com 

///我们还可以直接从worker返回消息处入手（拦截，伪造https证书替换js），将解析后的顶点缓冲和索引进行解析，直接获得建筑的平面数据和高度。把这些数据保存下来，并通过后期的处理，即可以获得比较完整的百度地图建筑轮廓数据。

_updateFrame分支2: webgl draw矢量瓦片到画布
	fo.drawElements(fo.TRIANGLES, fm.element1.length, fo.UNSIGNED_SHORT, 0)
    i (VM1410:formatted:1337)  
    （匿名） (VM1410:formatted:1513) | 'e7(i, fm, e, fl, fk) 是drawTileBase3D绘制块 block 的gldraw函数'
	    //e7大概call了32次drawElements 3D建筑物就显示出来了
    drawTileLayer (VM1410:formatted:4371)
    'drawBase构建了 building3d 数据' | 'drawTileBase3D' | 'draw3D -> drawBuildings -> drawBuildingsTile 打断点-> block 的gldraw函数' (VM1410:formatted:4237)
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

### 绘制block的shader(绘制3D建筑):
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
### 1. 获取shader的a_pos属性(vertexAttribPointer得到取值规则)
```js
只在绘制3D建筑即drawBuildingsTile时才进入断点:
	this.drawBuildingsTile(fj[0][fl], "building3d", false);
	this.drawBuildingsTile(fj[0][fl], "building3dMesh", false)//自动跳过百度大厦...
	在dy.prototype.setVertexAttribPointers打条件断点,即可命中调用`block 的gldraw函数`时的vertexAttribPointer得到取a_pos值方法:
		this.attributes.length ===3 && this.attributes.map(i=>i.name).toString() === 'a_pos,a_normal,a_color' && fl.name === 'a_pos'
		
	发现都是: 
		vertexAttribPointer(
			0/*着色器程序中的 attribute 变量的位置*/, 
			3/*size*/, 
			5126/*5126表示浮点数类型的数据*/, 
			undefined/*不进行归一化*/, 
			28/*每个顶点数据在数组中占用28个字节*/
				a_pos (xyz3个值)*(1float4字节) =  12字节
				a_normal (顶点法线的xyz3个分量)*(1float4字节)  =  12字节
				a_color (RGBA4个分量) * (1个unsigned byte 占用1字节) = 4字节
			0/*从缓冲区的第一个字节开始读取*/
		)
		//从gl.ARRAY_BUFFER缓冲区按参数指定的规则拿顶点的数据到a_pos
		 vertexAttribPointer(0, 3, 5126, undefined, 28, 0 )//
		 //从gl.ARRAY_BUFFER缓冲区按参数指定的拿顶点的数据到a_normal
		 vertexAttribPointer(1, 3, 5126, undefined, 28, 12)//
		 //从gl.ARRAY_BUFFER缓冲区按参数指定的拿顶点的数据到a_color
		 vertexAttribPointer(2, 4, 5121, true,      28, 24)//5121代表unsigned byte即0-255 true表示要归一化
		取值示例:
		三角形的第一个顶点位置为(0.0, 0.5, 0.0)，法线为(0.0, 0.0, 1.0)，颜色为(1.0, 0.0, 0.0, 1.0)
	
dy的this.attributes属性是:
[
{"name": "a_pos",        "components": 3,"offset": 0,        "type": "Float32"    },
{"name": "a_normal",        "components": 3,"offset": 12,        "type": "Float32"    },
{"name": "a_color",        "components": 4,"offset": 24,        "type": "Uint8",     "normalize": true    }
]
```
### 2. 解析shader的arrayBuffer的中根据drawElements定义的顺序的逐个解析顶点
#### block 的gldraw函数e7(i, fm, e, fl, fk)是谁调用
- `drawArea3DTile` 6次 
- `drawBuildingsTile` 60次 
- `drawTileBase3D` 5次
```js
e7(i, fm, e, fl, fk)
	e.vao1.bind(fn, fj, e.vertex, e.element1);即e2.prototype.bind的
		fk.bind(fo)即dy.prototype.bind可获取到数组//日志断点: 'fk.bind',fk?.arrayBuffer //fk.arrayBuffer就是数组
			i.bufferData(e, this.arrayBuffer, i.STATIC_DRAW);
		fk.setVertexAttribPointers(fo, e);//条件断点: fk.attributes.length ===3 && fk.attributes.map(i=>i.name).toString() === 'a_pos,a_normal,a_color'
	fn.drawElements(fn.TRIANGLES, e.element1.length, fn.UNSIGNED_SHORT, 0)//可获取到顶点元素的顺序
	'fm.renderData.building3d就是数组'
	fm.renderData.building3d.index.length === e.element1.length
	e.element1.arrayBuffer其实原来等于fm.renderData.building3d.index只是被置为null了

	e.vertex.arrayType.components === 7
	const groupArray = Array.from({length: Math.ceil(fm.renderData.building3d.vertex.length / 7)}, (_, i) =>
	  fm.renderData.building3d.vertex.slice(i * 7, i * 7 + 7)
	);//按components数拆,也就是分组
	fm.renderData.building3d.index数组里的值都是[0,groupArray.length-1]直接的数
	
```
### 3. 即可解析出数据
**太难了放弃了**, 走到获取到arrayBuffer了,也知道画顶点顺序了,也知道顶点的属性的解析规则了, 下一步就是根据这些去解析了,
而且解析出来的坐标也不知道怎么转为经纬度和高度

## 超图源码
SuperMap iClient3D for WebGL这样一款开发包是基于Cesium这样的开源的框架来构建的，而Cesium版本迭代更新的非常快，所以大家在做Web端的三维应用开发时，建议下载最新SuperMap iClient3D for WebGL包

对比:
- [SuperMap iClient3D for WebGL - 三维客户端开发平台 - SuperMap|超图软件](https://www.supermap.com/zh-cn/a/product/11i-iclient-webgl-2022.html)
	- 精简了Cesium包的图片/类/Widgets等资源, 增加更强的粒子系统等
- [SuperMap iClient3D for Cesium - 三维 GIS 应用程序 - SuperMap|超图软件](https://www.supermap.com/zh-cn/a/product/11i-iclient-cesium-2022.html)

[support.supermap.com.cn:8090/webgl/examples/webgl/editor.html#FlowingPipeLine](http://support.supermap.com.cn:8090/webgl/examples/webgl/editor.html#FlowingPipeLine)

1. F12搜索`clearMemoryImmediately`得到`debugger:///VM86`里源码(**是16进制混淆后的Cesium.js执行eval生成的**)
2. 格式化是个难题, devtool格式化没反应, oschina的js格式化网址格式化完正则格式化出语法错误了,用prettier的npx工具也不行,
	- [JS格式化_JS代码格式化-JSON在线工具 (json-online.com)](https://json-online.com/code/js1.html)可以
#### 流动管线效果实现
```js
line.textureUVSpeed = line.textureUVSpeed = new Cesium.Cartesian2(0, -2);
	执行源码:
	g.uTexUVOffset (Cesium.js:152356)
	Va._setUniforms (Cesium.js:120001)
	xg.draw (Cesium.js:195038)
	Na.execute (Cesium.js:118957)
	hg (Cesium.js:61416)
	K1 (Cesium.js:61648)
	Kw (Cesium.js:61977)
	pq (Cesium.js:61891)
	$Ra (Cesium.js:62377)
	Lw (Cesium.js:62403)
	uc.render (Cesium.js:224741)
	Qw.render (Cesium.js:260557)
```
 set NODE_OPTIONS="--max-old-space-size=8096"
 deuglify 2.js > 1.js
 1. 要求do和while之间用{}括起来
 2. 没有eval(..)语句