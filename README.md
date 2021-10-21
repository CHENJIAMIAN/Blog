

<p align='center'>
    <img src="https://badgen.net/badge/labels/12"/>
    <img src="https://badgen.net/github/issues/CHENJIAMIAN/Blog"/>
    <img src="https://badgen.net/badge/last-commit/2021-10-21 03:54:48"/>
    <img src="https://badgen.net/github/forks/CHENJIAMIAN/Blog"/>
    <img src="https://badgen.net/github/stars/CHENJIAMIAN/Blog"/>
    <img src="https://badgen.net/github/watchers/CHENJIAMIAN/Blog"/>
    <img src="https://badgen.net/github/release/CHENJIAMIAN/Blog"/>
</p>

<p align='center'>
    <a href="https://github.com/CHENJIAMIAN/visitor-count-badge">
        <img src="https://visitor-badge.glitch.me/badge?page_id=CHENJIAMIAN.Blog"/>
    </a>
</p>


## 置顶 :thumbsup: 
## 最新 :new: 

#### [test](https://github.com/CHENJIAMIAN/Blog/issues/9) <sup>1 :speech_balloon:</sup> 	 2021-10-21 03:47:46

:label: : 

个人博客, 请**不要**提issue, 谢谢!
====================
This repository is for personal blogging, please **DO NOT** submit issue, thanks!


[更多>>>](https://github.com/CHENJIAMIAN/Blog/issues/9)

---


#### [【地图】OpenLayers](https://github.com/CHENJIAMIAN/Blog/issues/8) <sup>0 :speech_balloon:</sup> 	 2020-03-14 07:18:07

:label: : 

``` js
OpenLayers
背景全是白色的，改成png即可，jpg不可以透明(jpg与jpeg只是叫法习惯不同)

如果一个源（基于ol/source/TileImage或者ol/source/Image）具有与当前投影不同ol/View的投影，则重新投影会在直接在浏览器中发生

默认情况下，WMS切片在180°子午线上重复使用。通过将wrapX选项设置为，可以禁用此行为false。//禁用显示左右拖动无限循环

ol / source / Tile			//抽象基类
    ol/source/UrlTile		//提供瓦片的源的基类，通过http划分为瓦片网格
        ol / source / TileImage		//提供图像的源的基类划分为平铺网格
            ol / source / XYZ 		//具有设置XYZ格式的URL的切片数据的图层源，在URL占位符中定义坐标,遵循的Google网格，其中x0和y0位于左上角
                ol / source / OSM		//OpenStreetMap磁贴服务器的图层源。
“天地图“  是国家基础地理信息中心建设的
OSM是一款由网络大众共同打造的免费开源、可编辑的地图服务
空间参照系 Spatial reference system (SRS)

EPSG:4326（WGS 84）                         #单位：经纬度    #EPSG代表欧洲石油调查组，该组织参与测量和应用大地测量//WGS 1984=EPSG:4326
EPSG:3857 默认（Web Spherical Mercator投影)  #单位：米   平面坐标放大6倍 

ol.proj.fromLonLat([x,y])                      //转换成平面坐标
ol.proj.transform( [12570113.410758357, 3237285.1611840134],'EPSG:3857' ,'EPSG:4326');//转换成经纬度坐标
(new ol.format.GeoJSON()).readFeatures(src)    //从geoJson读要素
var vectorSource = new VectorSource({ features: (new GeoJSON()).readFeature(randomPointsGSON) });
或者: new ol.source.GeoJSON({projection:'EPSG:3857',   url:'data/geojson/countries.geojson' }),  
(new WKT()).readFeature(wkt);//从wkt读要素 
(new WKT()).writeFeature (wkt);//从wkt写要素 
feature.setId("cd6b7ccb-c6e2-49cc-a087-aabf00f0d84c")
getSource().getFeatureById("cd6b7ccb-c6e2-49cc-a087-aabf00f0d84c")
map.getOverlayById
feature.setStyle
getSource().clear()//清空图层
如何区分捕捉到的是节点还是线 ?
    根据map.forEachFeatureAtPixel=>feature.getGeometry().getClosestPoint(coord)获得最近的点=>再根据以下计算误差, *米之内可以认为是节点
    Math.abs(-5000000)-Math.abs(-4863270.2540311385)
    feature.getGeometry().getType() === 'Circle'  'LinearRing' 'LineString''MultiLineString' 'MultiPoint' 'MultiPolygon'  'Point''Polygon'
    feature.getGeometry().getCoordinates()
evt.feature.getGeometry().flatCoordinates;//数组
draw.removeLastPoint();
//获取面中心点坐标
 geom.getInteriorPoint().getCoordinates().slice(0, 2);
map.getLayers().getArray()[1].getSource().addFeatures();//添加要素
map.getLayers().getArray()[2].getSource().getFeatures()[0].getGeometry().getFirstCoordinate();//获得坐标，getFeatures()返回的要素是没有顺序的！！
map.getView().setCenter([12937339.829847215, 4841994.897941555])//跳转视图到坐标
modifyInteraction()                            //获得modifiedFeatures
map.getLayers()===map.getLayerGroup().getLayers() //返回true
map.updateSize()                            //更新,刷新  openlayer地图宽度高度变形，运行一下 map.update();就可以了  

map.on('postcompose',animation);//postcompose事件第一次触发是在地图初始化时，后续的触发都由animation方法中的map.render()来完成。
map.render();//在事件的回调函数中去触发postcompose事件，而我们只要改变地图上的某个feature或者layer或者其他任何东西，就会触发重新渲染，
            //因此在'postcompose'改变feature就是一个无线循环,可以用来做动画

//输出所有图层
map.getLayers().forEach(function(group){
        if(!(group instanceof ol.layer.Vector))
            group.getLayers().forEach(function(lay){console.log(lay);})
    })
    

map.setView(new View({        center: [-5639523.95, -3501274.52],        zoom: 10    }));//跳转视图
    extent: {//初始化范围
        xmin: 113.356899,
        ymin: 22.977328,
        xmax: 113.370758,
        ymax: 22.985924
    },
    zoom: 15,
    minZoom: 3,
    maxZoom: 20,
    //中心点
    center: [113.36799, 22.98255],
    rotation: 0


//map加载控件
  controls: ol.control.defaults().extend([           
                new ol.control.OverviewMap({
                    //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
                    className: 'ol-overviewmap ol-custom-overviewmap',
                    //鹰眼中加载同坐标系下不同数据源的图层
                    layers: [TiandiMap_vec],
                    //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
                    collapseLabel: '\u00BB',
                    //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
                    label: '\u00AB',
                    //初始为展开显示方式
                    collapsed: false
                })
            ])   


//加载图层列表数据
        /**
        * 加载图层列表数据
        * @param {ol.Map} map 地图对象
        * @param {string} id 图层列表容器ID
        */
        function loadLayersControl(map, id) {
            //图层目录容器
            var treeContent = document.getElementById(id);
            //获取地图中所有图层
            var layers = map.getLayers();
            for (var i = 0; i < layers.getLength() ; i++) {
                //获取每个图层的名称、是否可见属性
                layer[i] = layers.item(i);
                layerName[i] = layer[i].get('name');
                layerVisibility[i] = layer[i].getVisible();

                //新增li元素，用来承载图层项
                var elementLi = document.createElement('li');
                // 添加子节点
                treeContent.appendChild(elementLi);
                //创建复选框元素
                var elementInput = document.createElement('input');
                elementInput.type = "checkbox";
                elementInput.name = "layers";
                elementLi.appendChild(elementInput);
                //创建label元素
                var elementLable = document.createElement('label');
                elementLable.className = "layer";
                //设置图层名称
                setInnerText(elementLable, layerName[i]);
                elementLi.appendChild(elementLable);

                //设置图层默认显示状态
                if (layerVisibility[i]) {
                    elementInput.checked = true;
                }
                //为checkbox添加变更事件
                addChangeEvent(elementInput, layer[i]);
            }
        }




[更多>>>](https://github.com/CHENJIAMIAN/Blog/issues/8)

---


#### [1 Vue 源码](https://github.com/CHENJIAMIAN/Blog/issues/7) <sup>0 :speech_balloon:</sup> 	 2020-03-12 08:37:00

:label: : 

``` js

vue用es5写不用es6写,因为es5很容易在原型上挂载方法,更容易分散在各个文件去挂载,更方便维护




初始化方法们:
initMixin(Vue);//Vue.prototype
    _init: ƒ (options)
stateMixin(Vue

[更多>>>](https://github.com/CHENJIAMIAN/Blog/issues/7)

---


#### [1 Vue](https://github.com/CHENJIAMIAN/Blog/issues/6) <sup>0 :speech_balloon:</sup> 	 2020-03-12 08:35:34

:label: : 

``` js

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
Nuxt.js 是一个搭建Vue项目工程模板的框架,有ssr
UAT //User Acceptance Testing 用户验收测试, 也称为Beta测试


服务端渲染 SSR：
    1.更好的 SEO 
    2.首屏加载更快 
    3.更多的服务器负载
    4.只支持 beforCreate 和 created    




[更多>>>](https://github.com/CHENJIAMIAN/Blog/issues/6)

---


#### [【CSS】](https://github.com/CHENJIAMIAN/Blog/issues/5) <sup>0 :speech_balloon:</sup> 	 2020-03-12 08:25:06

:label: : 

``` js

<link href="../../ol.css" rel="stylesheet" type="text/css" />

属性
浏览器自带的body的margin值不为0；
 rel 属性是必须的，规定当前文档与被链接文档/资源之间的关系
font-size: 2e

[更多>>>](https://github.com/CHENJIAMIAN/Blog/issues/5)

---


## 分类  :card_file_box: 

<details open="open">
    <summary>
        <img src="" title="词云, 点击展开详细分类" alt="词云， 点击展开详细分类">
        <p align="center">:cloud: 词云 :cloud: <sub>点击词云展开详细分类:point_down: </sub></p>
    </summary>


<details>
<summary>:+1:置顶	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>:framed_picture:封面	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>bug	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>documentation	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>duplicate	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>enhancement	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>good first issue	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>help wanted	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>invalid	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>question	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>wontfix	<sup>0:newspaper:</sup></summary>



</details>

<details>
<summary>开源	<sup>0:newspaper:</sup></summary>



</details>


</details>    
