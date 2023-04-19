

```javascript
mapbox-gl 库是开源的，可以免费使用。但是，要从 Mapbox 的数据服务加载地图样式和图块，您需要在他们的网站上注册以检索地图组件所需的访问令牌，该令牌将用于识别您并开始提供地图图块。
    //该服务将是免费的，直到超过一定的流量水平。
```
## OpenLayers
https://pic4.zhimg.com/v2-360cd3f0710e145c6bb4bbd7973aa3a7_r.jpg (类图)

```javascript
背景全是白色的，改成png即可，jpg不可以透明(jpg与jpeg只是叫法习惯不同)

如果一个源（基于ol/source/TileImage或者ol/source/Image）具有与当前投影不同ol/View的投影，则重新投影会在直接在浏览器中发生

默认情况下，WMS切片在180°子午线上重复使用。通过将wrapX选项设置为，可以禁用此行为false。//禁用显示左右拖动无限循环


“天地图“  是国家基础地理信息中心建设的
OSM是一款由网络大众共同打造的免费开源、可编辑的地图服务
空间参照系 Spatial reference system (SRS)
CityGML 标准为虚拟 3D 城市模型的表示、存储和交换定义了概念模型和交换格式。


EPSG:4326（WGS 84）                         #单位：经纬度    #EPSG代表欧洲石油调查组，该组织参与测量和应用大地测量//WGS 1984=EPSG:4326
    CRS84等效于EPSG:4326//经纬度相反?
    OGC CRS URN
        eg:urn：ogc：def：crs：OGC：1.3：CRS84
        // urn是标识符，ogc是组织，def是另一个静态交易，crs是类型（坐标参考系统），
        //OGC是权限，1.3是版本，CRS84是投影
    OpenGIS(Open Geodata Interoperation Specification) 开放的地理数据互操作规范, 由OGC提出     
    OGC//(Open Geospatial Consortium)开放地理空间信息联盟 
EPSG:3857（WGS 84投影版）  默认米为单位（Web Spherical Mercator投影)  #单位：米   平面坐标放大6倍  ,/geoserver的900913等同它/
    等效于EPSG:900913

Resolution//每个像素代表的实际距离 
    //map.getView().setResolution(10) 一个像素就是10米
    
OWS //开放式Web服务 ，包括WFS、WMS 和 WCS

Overlay的options:
    stopEvent: false
    // 是否要阻止事件冒泡到地圖視口(map viewport)。
    // 如果設定為ture，那麼疊置層被放在裝載控制元件的那個div容器中（該div容器css類名為ol-overlaycontainer-stopevent）
        //控件默认放这里
    // 如果設定為false，那麼疊置層被放在css類名為ol-overlaycontainer的div容器下，由className屬性（預設為'ol-overlay-container ol-selectable'）指定類名的div容器中
            
为什么WFS的图层会缺失不完整?
    因为默认只显示50条记录,去掉maxFeatures=50即可//http://222.35.95.66:9999/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:railway_double&maxFeatures=50&outputFormat=application%2Fjson

Turf的使用的默认坐标系是'EPSG:4326'

天地图电子地图：//t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}
天地图电子地图注记：//t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}
天地图影像：//t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}
天地图影像注记：//t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}
天地图地形：//t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}
天地图地形注记：//t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}
new TileLayer({
      title: "天地图卫星影像",
      source: new XYZ({
        url: `http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tk}`
      })
    });
    

                            
Source
    ol/source/Tile		//抽象基类
        ol/source/TileDebug //借助这个类，我们可以清晰的看到每一个瓦片的坐标
        ol/source/TileUTFGrid
        ol/source/UrlTile		//提供瓦片的源的基类，通过http划分为瓦片网格
            ol/source/TileImage	//提供图像的源的基类划分为平铺网格
                ol/source/XYZ 		//具有设置XYZ格式的URL的切片数据的图层源，在URL占位符中定义坐标,遵循的Google网格，其中x0和y0位于左上角
                    ol/source/OSM	//OpenStreetMap磁贴服务器的图层源。 
                ol/source/WMTS|TileWMS|TileJSON|BingMaps
            ol/source/VectorTile(没有子类) ,/可以getFeatures/
    Image
    Vector
        Cluster
Layer
    BaseTileLayer
    BaseImageLayer
    BaseVectorLayer
        VectorImageLayer //跟VectorLayer无缝切换,它比VectorLayer快多了!!!
        VectorLayer
        VectorTileLayer//这个也很快配合geoserver的.pbf格式的TMS服务,官网很多案例
    WebGLPointsLayer
    
// 原理: 点击放大或缩小时,怎么跑到底层canvas操作的?   2022年5月16日18点19分
//https://github1s.com/openlayers/openlayers/blob/main/src/ol/renderer/canvas/TileLayer.js#L581 调用了this.context.drawImage方法
TileLayer.drawTileImage(TileLayer.js) //操作了canvas的drawImage，画每个瓦片上去
renderFrame (TileLayer.js:519)
render (Layer.js:275)
renderFrame (Composite.js:123)
renderFrame_ (Map.js:1549)
animationDelay_ (Map.js:1403)
requestAnimationFrame（异步）
    render (Map.js:1436)
    handleViewPropertyChanged_ (Map.js:1333)
    dispatchEvent (Target.js:114)
    changed (Observable.js:70)
    setHint (View.js:1652)
    animateInternal (View.js:692)
    animate (View.js:601)
    zoomByDelta(Interaction.js:162)
    handleWheelZoom_ (MouseWheelZoom.js:274)
    setTimeout（异步）
        handleEvent (MouseWheelZoom.js:247)
        handleMapBrowserEvent (Map.js:1148)
       handleBrowserEvent (Map.js:1097)

OpenLayers提供了两个类
    ol.Map类使用canvas进行图像渲染
        根据extent计算瓦片范围
        获取可视范围内的瓦片范围，并循环加载、渲染瓦片
    ol.WebGLMap类使用webgl进行图像渲染
```

```javascript
dataProjectio指geojson文件中的坐标的EPSG
featureProjection是视图/地图的EPSG
所以尽量记住这条规则：featureProjection和ol.View投影声明应该是相等的

ol.proj.fromLonLat([x,y])                      //转换成平面坐标
ol.proj.transform( [12570113.410758357, 3237285.1611840134],'EPSG:3857' ,'EPSG:4326');//转换成经纬度坐标
const fea=(new ol.format.GeoJSON()).readFeatures(src)    //从geoJson读要素
    var vectorSource = new VectorSource({ features: (new GeoJSON()).readFeatures(randomPointsGSON) });
                或者:   new VectorSource({url: 'data/geojson/polygon-samples.geojson',format: new GeoJSON()})//要解决跨域
(new WKT()).readFeature(wkt);//从wkt读要素 
(new WKT()).writeFeature (wkt);//从wkt写要素 
feature.setId("cd6b7ccb-c6e2-49cc-a087-aabf00f0d84c")
getSource().getFeatureById("cd6b7ccb-c6e2-49cc-a087-aabf00f0d84c")
map.getOverlayById
feature.setStyle
fea.getGeometry().getExtent()
getSource().getExtent()
getSource().getClosestFeatureToCoordinate()
getSource().clear()//清空图层
fea.getGeometry().getClosestPoint(coordinate);
feature.getProperties()
color: 'rgba(255, 0, 0, 0.3)'
点样式:new Style({ image: new CircleStyle({radius: 5,fill: new Fill({ color: 'red' }),  stroke: new Stroke({color: [255, 0, 0], width: 2})})})
        //new ol.style.Style({ image: new ol.style.Circle({radius: 7,  fill: new ol.style.Fill({ color: 'black' }),  stroke: new ol.style.Stroke({color: [255, 0, 0], width: 2})})})
线样式:new ol.style.Style({stroke: new ol.style.Stroke({ width: 4,  color: "#119aff" })})
    fea.setStyle(new ol.style.Style({stroke: new ol.style.Stroke({ width: 4,  color: "#119aff" })}))
面样式: new ol.style.Style({stroke: new ol.style.Stroke({width: 4,color: "blue"}),fill: new ol.style.Fill({color: "green"}), 
                                text: new Text({ font: "16px Verdana",  text: 'sadsflj', fill: new Fill({color: "white", }),})})
        new Style({stroke: new Stroke({width: 4,color: "blue"}),fill: new Fill({color: "green"})})
//修复锚点位置    
this.bufferStyle = new Style({
  image: new Icon({
    src: require("@/static/assets/img/bufferFlag.png"),  
    //经过测试必须要这写，才不会放大缩小相对位置发生变化
    anchor: [0.5, 1],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",   
  }),
});
        
source.getFeatures()[0].getGeometry().flatCoordinates

var point = new Feature({            geometry: new Point(coord) //纬度 经度          });

画圆:
    new ol.geom.Circle([114.298353,30.623705],13);'错误'
          const coordm = fromLonLat(coord);//转成投影坐标系
          const circlem = new Circle(coordm, radius);
          const circle = circlem.transform("EPSG:3857", "EPSG:4326"); //再转回去 
          const circlefea = new Feature(circle);'正确'
    


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
view.fit(feature.getGeometry())

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
```
## WFS
```javascript
wfs 根据几何查询的示例:
http://10.168.1.243:8080/geoserver/jr_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=jr_test:hengli_xz_fw&outputFormat=application/json&srsName=EPSG:3857&bbox=113.94845297994834, 23.023148474534974,113.94845350846369, 23.023149003050317,EPSG:4326
    service: WFS
    version: 1.0.0
    request: GetFeature //操作
    typeName: jr_test:hengli_xz_fw //图层名
    outputFormat: application/json //返回的格式
    srsName: EPSG:3857 //查询完返回的数据坐标用米的(3857)
    bbox: 113.94845297994834, 23.023148474534974,114.94845297994834, 23.023148474534974,EPSG:4326  //查询改外包矩形范围的内的要素，该外包矩形的坐标写的经纬度的(4326)
        /bbox=x,y,x,y/ ,//查询点的话,直接重复就行
```

> WFS 更新时发送到服务器的信息:

```xml
<Transaction xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
    <Update typeName="feature:safeArea" xmlns:feature="myWorkSpaceURI">
        <Property>
            <Name>the_geom</Name>
            <Value><MultiPolygon  xmlns="http://www.opengis.net/gml"><polygonMember><Polygon><exterior><LinearRing>
                    <posList srsDimension="2">   39.85748291  116.21374512   39.85241699  116.20648193     39.85662842 116.20367432   39.86169434 116.21112061  39.85748291  116.21374512</posList>					//纬度 经度 纬度 经度
                </LinearRing></exterior></Polygon></polygonMember></MultiPolygon></Value>
        </Property>
        <Property>
            <Name>Id</Name>
            <Value>0</Value>
        </Property>
        <Filter xmlns="http://www.opengis.net/ogc">
            <FeatureId fid="safeArea.3"/>
        </Filter>
    </Update>
</Transaction>
```
## Geoserver 

```javascript
配置样式方法1: 在uDig中生成sld样式文件(本质是xml) .在Geoserver中导入使用
配置样式方法2: 装CSS插件,用CSS 样式:
    /* polygon */
        * {
            stroke: #000000;
            stroke-width: 0.5;
            fill: #fff;
            [PERSONS >= 2000000] [PERSONS < 4000000] {   fill: #FF4D4D;  /* fill-opacity: 0.5;*/      /*label: [name];*/      /*font-fill: black;*/ };
            [OBJECTID=224] {                fill-opacity: 0;            }
          }
        
    /* point */
        * {
            mark: symbol(circle);
            mark-size: 6px;
            :mark {fill: #13B5C7;}
          }
        
    /*line */
        * {stroke: #FAE18B;}
        
        

WFS规范:就是请求url的规范:http://example.com/geoserver/wfs?参数串

GWC//GeoWebCache

服务类型
    SOAP :XML形式
    REST :JSON形式
    
    KML// Keyhole公司的Markup Language，用来表达地理标记，用于在（如Google Earth）中显示地理数据
    NAS erver(网络分析)
    WFS Server（要素）
    WCS Server（Coverage ）
    GML:地理标记语言
    TMS:瓦片地图服务 //是WMTS标准的基础
        建议:,/.pbf的TMS,官网就用这个比较多,性能最高,前提是要安装Vector Tiles扩展/
      const url = `${geoserver}/gwc/service/tms/1.0.0/${namespace}:${layername}@EPSG:900913@png/{z}/{x}/{-y}.png`;
      tileurlfunction.js 的 createFromTemplate 正则替换了{x}{y}等
    WMTS:网页地图瓦片服务
        URL有两种:
            REST
                http://10.168.1.243:8080/geoserver/gwc/service/wmts?REQUEST=GetCapabilities 可获得 
                <ResourceURL format="application/json" resourceType="FeatureInfo" 
                    template="http://10.168.1.243:8080/geoserver/gwc/service/wmts/rest/jr_test:hengli_xz_fw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/json"/>
                //I J 表示图块内部的单元格索引 范围[0-256]
                构造可得: `http://10.168.1.243:8080/geoserver/gwc/service/wmts/rest/jr_test:hengli_xz_fw//EPSG:900913/EPSG:900913:7/155/104/0/0?format=application/json`
            URL Params
    WMS-C//WMS Tile Caching 已被TMS和WMTS取代
    
切片(生成图块)的两种方式:
    普通地图查看期间
        在这种情况下，仅当通过地图浏览时，才对切片进行缓存。第一次请求地图视图时，其速度将与标准GeoServer WMS请求大致相同。由于已经生成了这些图块，因此第二次及其后的地图查看将大大加快。
            //不需要预处理，并且仅缓存已请求的数据，因此也可能节省磁盘空间。此方法的缺点是地图查看只会间歇性地加速，从而降低了用户体验的质量。
    播种 seed 
        播种是从GeoWebCache内部生成并缓存地图图块的过程。预先处理后，用户体验将大大增强，因为用户无需等待瓷砖生成。该过程的缺点是播种可能是非常耗时和磁盘消耗的过程。
    /在实践中，通常使用两种方法的组合，播种某些缩放级别（或缩放级别的某些区域），而观看次数较少的图块则保留不缓存。/
    
Gridsets配置后在Seed时就可以选择Grid Set
    
geoserver瓦片插值方式：
    邻近采用渲染速度很快，但可能会从锐利的边缘细节中像素化
    双线性比较好，双线性插值大约是最近邻插值的五倍
    双三次的话更好，但耗时会比较大一些
    
geoserver服务器间同步
    官方插件利用ActiveMQ来同步
        Broker，消息代理，表示消息队列服务器实体，接受客户端连接，提供消息通信的核心服务。在activemq中，相当于一个Activemq实例
        Embedded Broker 是在应用程序中以编码的方式启动broker
        使用JMX监控broker ,JMX是Java Management Extensions，它是一个Java平台的管理和监控接口
        ActiveMQ目前支持的transport有：VM Transport、TCP Transport等            
            VM Transport 如果希望在同一个JVM内访问这个broker，那么可以使用VM Transport，URI是：vm://brokerName
                第一个创建VM连接的客户会启动一个embed VM broker，接下来所有使用相同的broker name的VM连接都会使用这个broker。
                当这个broker上所有的连接都关闭的时候，这个broker也会自动关闭。
            TCP transport 允许客户端通过TCP socket连接到远程的broker。
        很明显，如果我们想对GeoServer的多个实例进行集群，则必须以某种方式共享同一数据目录，以确保所有实例都是相同的。
            这可以通过使多个实例共享geoserver_data变量的相同位置或在较低级别起作用并使用文件系统复制来使不同位置保持同步来实现。
            
让geoserver严格检查WFS请求格式以快速检查WFS XML的格式错误
    用户经常会报告手工WFS请求无法正常工作的问题。
    在大多数情况下，请求的格式不正确，但是GeoServer不会抱怨，只是忽略格式不正确的部分（此行为是默认设置，可使较旧的WFS客户端与GeoServer正常工作）。
    如果您希望GeoServer验证大多数WFS XML请求，则可以将其发布到以下URL：
    http://host:port/geoserver/ows?strict=true
    
项目管理 
人/地块/合同/档案的管理
意愿征集->确权->拆卸->回迁

	云费用 2020.7.25-2021年11月10日 花了4.21w

47.106.10.251
    prod.titanforce.cn
        18088  映射内网 88
        prod02_nginx_1 172.16.0.196 //prod02_xxx_2均已废弃
            vi /usr/apps/nginx/conf/nginx.conf
                80 /usr/apps/frontend/dist
                8788 /usr/apps/backend2/frontend/dist
                88 /usr/apps/frontend/dist
                    对应后端端口8901, 连接数据库 prod02_mysql_1 的 hyh2(不是hyh)
                8088 /usr/apps/mobile/dist
                8798 /usr/apps/backend2/frontend/dist
        18080 正式
120.79.39.244
    demo.titanforce.cn
        80 与生产
    test02.titanforce.cn
        8099 测试

vpn开了没用: 把clash的系统代理先关了就行

geoserver 账户admin 密码geoserver
    测试机10.168.1.217:
        postgis/postgreSQL安装在测试机上(win10): 10.168.1.217,5432 database:NEWWORLD schema:public user:postgres password:postgres 
        测试机上的虚拟机:
            243:appication-gis-1  gis服务器：10.168.1.243 账号：jr 密码：titanforce 账号root密码: rootqaz123
                装了geoserver:admin,jr$m.ap18
            113:appication-node-1 发布测试机 
                nginx： vi /usr/local/nginx/conf/nginx.conf
                oracle：root/admin
            110:测试centos安装postgis
            208：/gis 文件服务器 连接端口11122 /usr/local/nginx/data
    阿里云测试
        192.168.0.27 //放nginx移动端测试流水线 /api是127.0.0.1:8900
        //192.168.0.38  负载均衡?
            /usr/apps/nginx/nginx.conf
        //192.168.0.12 mysql user:root pswd:admin
        192.168.0.32 文件服务器 user:gis  pswd:gis123!   //  /usr/gis3d放3d模型 
                                cd /usr/apps/nginx
                                sudo ./sbin/nginx
                /usr/apps/nginx/nginx.conf
                /usr/apps/nginx/conf/nginx.conf
        192.168.0.26 user:gis  pswd:gis123! /usr/gis3d 启动方法同阿里正式
            geoserver 8080  //记得放开权限允许修改数据
        192.168.0.30   user:gis  pswd:gis123!
            postgis testdb1
            
        test02_fastdfs_1    192.168.0.32 //sudo scp -r /usr/gis3d gis@192.168.0.14:/usr
        test02_postgreSQL_1 192.168.0.30
        test02_geoserver_1  192.168.0.26 //sudo scp -r /usr/share/geoserver  gis@192.168.0.15:/usr/share
    阿里云预生产
        192.168.0.39 demo_geo//端口同生产,只是三个东西装在一台机器里
        192.168.0.38:8088 //公网是18081 放nginx移动端预生产流水线,8700放web端好像      http://127.0.0.1:8900;  
            /etc/nginx/nginx.conf
    阿里云生产
        18088是集团的正式,还有应该yjl的正式是18080
        172.16.0.202 geoserver //记得放开权限允许修改数据 开放8080端口 影像tiff图层要复制过去重新发布
            自身//安装了字体
                sudo yum install java-11-openjdk -y
                sudo yum install -y unzip zip
                按步骤来即可:https://docs.geoserver.org/latest/en/user/installation/linux.html
                //web.xml里设置 GEOSERVER_DATA_DIR为/usr/data/data_dir
                /usr/share目录下
                    sudo unzip -n geoserver-***-bin.zip -d geoserver
                    cd /usr/share/geoserver/bin/
                    sudo nohup ./startup.sh &再按确定确定
                    //sudo nohup /usr/share/geoserver/bin/startup.sh &
            cluster同步
                1.搭建cluster的方法按这个来 https://blog.csdn.net/a571574085/article/details/114262496
                /usr/share/apache-tomcat-9.0.41/webapps/activemqBroker-2.16-SNAPSHOT/WEB-INF/classes/standalone-broker.properties
                2.数据文件夹的同步按这个来 https://www.jianshu.com/p/fc2f3ec661c0
                 /usr/data/data_dir/data/jrnet/inotifyrsync.sh & 开启自动同步脚步
        172.16.0.191 postgis //开放5432端口 QGIS连接，直接从一个机子拉到另一个机子上再在geoserver发布即可 (同个内网的机子直接拷贝整个geoserver目录即可！)
            sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
            sudo yum install -y postgresql11-server 
            sudo /usr/pgsql-11/bin/postgresql-11-setup initdb 
            sudo systemctl enable postgresql-11 
            sudo systemctl start postgresql-11
            sudo yum install postgis25_11
                //报错missing requires of libmysqlclient.so.18()(64bit)的话
                //sudo yum install -y https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-libs-compat-5.7.25-1.el7.x86_64.rpm
            //或 sudo rpm -qi postgis25_11
            sudo -u postgres -i
            createdb testdb -O postgres
            psql -d testdb
            其他按步骤来即可:https://blog.csdn.net/a571574085/article/details/107939103
            CREATE EXTENSION postgis;
        172.16.0.195 gis3d //开放80端口
            /usr/gis3d/hengli 数据放这里 /dev/vda1        40G   15G   23G  40% /
            sudo yum -y install nginx # 安装 nginx
            sudo vim  /etc/nginx/nginx.conf
                      root /usr/gis3d; # 存放文件的目录 //转移到/usr/data了!!!
                      location / { 
                        autoindex on; # 索引 
                        autoindex_exact_size on; # 显示文件大小 
                        autoindex_localtime on; # 显示文件时间 
                      }
              sudo nginx  -s reload
              http://172.16.0.187/hengli/tileset.json
        集群备份                                  
        prod02_gis3d_2		172.16.0.210    80 //195迁移到210：sudo scp -r /usr/data gis@172.16.0.210:/usr
        prod02_postgreSQL_2	172.16.0.208    5432
        prod02_geoserver_2	172.16.0.206	8080 //202迁移到206： sudo scp -r /usr/share/geoserver  gis@172.16.0.206:/usr/share

            变更图层后最小化迁移目录参考(要检查一下有没有因为权限问题没用复制成功的！确保都覆盖过去了)
                206:
                    sudo rm -rf /usr/data/data_dir/workspaces/jrtest
                    sudo rm -rf /usr/data/data_dir/gwc-layers
                202:
                    sudo scp -r /usr/data/data_dir/workspaces/jrtest  gis@172.16.0.206:/usr/data/data_dir/workspaces
                    sudo scp -r /usr/data/data_dir/gwc-layers  gis@172.16.0.206:/usr/data/data_dir
```
## PostGIS 

```javascript
PostGIS将对地理对象的支持添加到PostgreSQL对象关系数据库中，就像ESRI的SDE或Oracle的Spatial扩展一样

Application Stack Builder安装完postgis_2_3_pg95 , 还要在SQL Shell执行以下的sql语句：才能生效
        -- Enable PostGIS (includes raster)
        CREATE EXTENSION postgis;
        -- Enable Topology
        CREATE EXTENSION postgis_topology;
        -- fuzzy matching needed for Tiger
        CREATE EXTENSION fuzzystrmatch;
        -- Enable US Tiger Geocoder
        CREATE EXTENSION postgis_tiger_geocoder;
        
用 PostGIS Shapfile Import/Export Manager导入图层'路径不能有中文',否则导入失败!
```
## GeoJSON

```JSON
{
    "type": "FeatureCollection",
    "features": [
        {//要素1
            "type": "Feature",
            "geometry": {
	            //要素1的图形
                "type": "MultiPolygon",
                "coordinates": []
				}
		}
	]
}
```

### 给出含一个有两个环的多边形和一个三角形的基于GeoJSON规范的MultiPolygon的例子，要添加逐行注释

```JSON
{
  "type": "MultiPolygon", // GeoJSON对象类型为MultiPolygon
  "coordinates": [ // coordinates用于定义多边形的坐标
    [ // 第一个Polygon，一个有两个环的多边形
      [ // 第一个环
        [-122.801742, 45.48565], // 坐标为[-122.801742, 45.48565]
        [-122.801742, 45.60491], // 坐标为[-122.801742, 45.60491]
        [-122.584762, 45.60491], // 坐标为[-122.584762, 45.60491]
        [-122.584762, 45.48565], // 坐标为[-122.584762, 45.48565]
        [-122.801742, 45.48565]  // 第一个坐标被重复，以闭合环
      ],
      [ // 第二个环
        [-122.76696, 45.52304],  // 坐标为[-122.76696, 45.52304]
        [-122.76696, 45.5825],   // 坐标为[-122.76696, 45.5825]
        [-122.68127, 45.5825],   // 坐标为[-122.68127, 45.5825]
        [-122.68127, 45.52304],  // 坐标为[-122.68127, 45.52304]
        [-122.76696, 45.52304]   // 第一个坐标被重复，以闭合环
      ]
    ],
    [ // 第二个Polygon，一个三角形
      [
        [-122.639961, 45.543541],  // 坐标为[-122.639961, 45.543541]
        [-122.639976, 45.533529],  // 坐标为[-122.639976, 45.533529]
        [-122.611206, 45.526554],  // 坐标为[-122.611206, 45.526554]
        [-122.639961, 45.543541]   // 第一个坐标被重复，以闭合环
      ]
    ]
  ]
}
```
