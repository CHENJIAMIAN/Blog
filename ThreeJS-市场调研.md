### 致敬
- http://paas.mms3d.cn/doc/ 
	- `场景内置API | 模型控制 | 光源调节 | 环境改变 | 后期设置 | 工具调用 | 动画编辑 | 场景编辑 | 设备管理 | 载入IoT设备模型 | 载入IoT设备图标 | 载入IoT动态文字图标 | IoT设备筛选 | 运动物体绑定IoT设备图标 | 人员及车辆的实时定位 | 人员及车辆的实时定位(判断高层) | 物料加工曲线路径 | 更换海报图或视频 | GIS坐标体系转换 | 批量物料传输路径分段 | Iot动态设备控制 | IoT设备拓扑连线 | 实时跟踪运动物体 | 镜头控制 | 镜头聚焦 | 目标聚焦 | 镜头自动巡检 | 第1人称&第3人称角度转换 | 镜头位置瞬时位移 | 碰撞检测 | 小地图实时导航 | 虚拟化身人物键盘操控 | 虚拟化身人物鼠标操控 | 第一人称鼠标操控行走 | 指南针 | 信息控制 | 三维坐标映射二维坐标 | CSS二维窗口渲染 | CSS三维窗口渲染 | HTML转图片渲染 | 插入开场视频动画 | 三维立体文字信息 | 视觉效果 | 发辉光 | 变颜色 | 风险颜色等级设定 | 沟边 | 沟边风格设置 | 目标模型虚化 | 创建模型线框风格 | 渐变：隐藏显现、生长模型 | 擦除式生长 | 楼层拆分、模型拆分 | 地面镜面反射 | 动态天空 | 动态光环特效 | 爆炸光动效 | 动态残影 | 实景渲染反射图 | 模型爆炸拆分 | 绘制标尺 | 屏幕快照 | 立体柱状图 | 天气变化 | 白天夜晚转换 | 多个场景json文件切换 | 降雪天气 | 雾霾天气 | 降雨天气 | 触发事件 | 子网格监听 | 鼠标移入移出 | 鼠标单击双击 | 镜头位置监听 | AI及算法 | 虚拟电子围栏 | 多点距离测量 | 正射面积测量 | 模型的新增删除（内存管理） | 密度分布图 | 色温热力图 | 树木LOD多细节层次显示 | LOD多细节多材质层次显示 | 立体热力图 | 编辑生成管道 | LOD简化模型 | 小物体层级控制 | 粒子系统 | 粒子转移 | 破碎爆炸 | 粒子物料传输带 | 动画 | 批量载入特效动画 | 模型动画控制 | 流光溢彩线 | 数字流 | 飞光渐变线 | 目标射线 | 攻击弧线 | 应急路线 | 模型运动路径动画 | 序列帧 | 围栏周界动态区域 | 实时动态轨迹线 | 灾害模拟-火势蔓延 | 动态流动图 | 视频材质 | 海水材质 | 水流材质 |`
### 国外
- [spline](https://app.spline.design/file/f0552ab4-b0eb-4723-8287-ed833ca1507f)
	- __THREE__: "149" + `React v17.0.2`
	- [创建导航网格 | Babylon.js 文档](https://doc.babylonjs.com/features/featuresDeepDive/crowdNavigation/createNavMesh)
	- [dimforge/rapier：专注于性能的 2D 和 3D 物理引擎。](https://github.com/dimforge/rapier)
	- [rhino3dm - npm](https://www.npmjs.com/package/rhino3dm)使用Rhino 3D模型和几何数据。通过wasm实现了与Rhino 3D文件格式的交互。
	- `process.wasm`涵盖了一些三维建模和几何计算的功能，例如顶点、面、边的操作，拓扑数据的获取和释放，网格数据的获取和释放，UV生成，顶点和元素的删除和修改，缓存操作，变换操作，法线和位置的获取，射线碰撞，BVH（包围盒层次结构）的构建和使用等
	- [goldfire/howler.js：现代网络的 Javascript 音频库。](https://github.com/goldfire/howler.js)
	- [sindresorhus/screenfull：JavaScript 全屏 API 跨浏览器使用的简单包装器](https://github.com/sindresorhus/screenfull)
	- 如何免费导出: 覆写文件, 注释掉 `if (C) { d(!0), p("goSuper");`块

### 厂商对比
1. 智汇云舟(基于websocket/webrtc推视频,不是基于webgl/技术独特,但风格过时了)
2. 51WORLD(UE的视频推流(跟UE官方关系好), 类似智汇云舟, 但效果很好) 
3. UINO优诺(webgl大师)
4. 数字冰雹(类似优锘) 
	1. avw.scene.core.min.js或TGApp.js基于THREE, 没看到用Cesium
	2. 加密了glb,
	3. gejson加密成.tgsc格式(打message断点即可拿到,拿到的是顶点和法线等,不是经纬度)
6. /RAYKITE 光启元/飞渡科技/光辉城市/DataMesh/山海鲸可视化/EasyV
7. [腾讯云图数据可视化 三维模型-操作指南（数据可视化大屏）-文档中心-腾讯云](https://cloud.tencent.com/document/product/665/72209)
8. 帆软(**Calder.js**)
```js
用了**Babylon.js** 
自定义了多个 **ShaderMaterial**:  noise\ShockWave\ColorSky\line\CylinderData\LineData\PointDataSpot\PointDataPolyhedron\EffectFence\EffectCircle
自定义了多个 **Effect**, ShadersStore.[dynamic2D\effectGround\glowMapMerge2\customHighlight\customStencil\TileGroun\customFilter\ShockWave\ColorSky\CloudColor\Tonemap\colorify\CylinderData\LineData\PointDataSpot\PointDataPolyhedron\EffectFence\EffectCircle]
自定义了多个 **PostProcess**: dualBlur
scene.style.[glowLayer\groundReflection\meteor\shockWaveLayer\snow]
	`_glowLayer` -> `DualBlurGlowLayer`-> `_dualBlurPostProcessesChain` -> `dualBlur.fragment.fx` -> `Kino/Bloom v2 - Bloom filter for Unity`
extend扩展3个 **CustomMaterial**
	`this.Vertex_Definitions\this.Vertex_MainEnd\this.Fragment_Definitions\this.Fragment_Before_FragColor`
自定义 Babylon.js 中的材质插件（**MaterialPlugin**）
	CUSTOM_OVERLAY\CUSTOM_SHADER_INPUTS\dissolvable\wireframe_crease_vertexdata\wireframe_texture\WireframeSkinMaterialPlugin
```


|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|厂商|优诺ThingJS|迅维|飞渡|广联达|图扑|光启元|
|产品|l 低代码数字孪生开发平台<br><br>l 森BIM插件 For Revit|Soon Builder自主研发的国产轻量化空间建模工具<br><br>Soon SDK基于WebGL技术的三维可视化引擎库，使用JavaScript语言开发|太极开发者平台|BIMFACE轻量化引擎|HT for Web<br><br>HT for Web GIS|RayData Web|
|特色|ThingJS是Three.js的上层封装，uearth是Cesium的上层封装，低代码、配套3D开发工具和3D模型库|独有的轻量化算法引擎，生成的三维场景BIM模型体量仅为传统BIM模型的十分之一|WebRTC进行像素流的数据传输，每一帧都是后端进行渲染和绘制，然后通过视频流的方式传输到前端,效果极好|只需上传原始文件，就能在云端自动发起转换|源码自研，BIM的IFC 文件解码成 HT 可以显示渲染的私有格式|基于UnityWebGL，<br><br>无SDK纯在线制作，采用了设计师熟悉的图层式创作方式，将编辑区分为系统UI层和3D场景层|
|费用|￥120,800元|需官网咨询商务|需官网咨询商务|公有云500 元/年<br><br>图纸10元/个<br><br>模型20元/个|需官网咨询商务|公有云部署23904元/年<br><br>私有云部署需官网咨询商务|
|技术偏向|3D/GIS|BIM|3D/GIS|BIM/GIS|3D/GIS|3D|

```
在《数字孪生城市技术应用典型实践案例汇编（2022 年）》统计出来的公司
奥格科技股份有限公司
奥格科技股份有限公司
北京博能科技股份有限公司
北京飞渡科技股份有限公司
	北京数字冰雹信息技术有限公司
	北京数字冰雹信息技术有限公司
北京天成易合科技有限公司
	北京五一视界数字孪生科技股份有限公司
	北京五一视界数字孪生科技股份有限公司
	北京五一视界数字孪生科技股份有限公司
北京相数科技有限公司
	北京优锘科技有限公司
	北京优锘科技有限公司
	北京优锘科技有限公司
北京云庐科技有限公司
北京云庐科技有限公司
北京云庐科技有限公司
	北京智汇云舟科技有限公司
	北京智汇云舟科技有限公司
	北京智汇云舟科技有限公司
	北京智汇云舟科技有限公司
北京卓视智通科技有限责任公司
乘木科技（珠海）有限公司
丰图科技（深圳）有限公司
广东元能星泰孪生科技创新有限公司
广域铭岛数字科技有限公司
广州运维数字科技有限公司
杭州易知微科技有限公司
华晨宝马汽车有限公司
昆明埃舍尔科技有限公司
昆明埃舍尔科技有限公司
山东浪潮新基建科技有限公司
山东浪潮新基建科技有限公司
苏州工业园区测绘地理信息有限公司
苏州工业园区测绘地理信息有限公司
智城数创（西安）科技有限公司
智城数创（西安）科技有限公司
```
### 优锘技术栈
森城市:
iview+vue

### 图扑在线案例集合
1. http://www.hightopo.com/demo/3DRoom1 3D机房模型
2. http://www.hightopo.com/demo/3DRoom2 3D机房模型
3. http://www.hightopo.com/demo/3DRoom3 3D机房模型
4. http://www.hightopo.com/demo/3DRoom5 3D机房模型
5. http://www.hightopo.com/demo/3DRoom6 3D机房动环监控系统
6. http://www.hightopo.com/demo/3DRoom7 3D机房实景建模
7. https://www.hightopo.com/demo/3DRoom8 3D机房模型
8. https://www.hightopo.com/demo/3DRoom9 宁夏调控改成自动化系统评估
9. https://www.hightopo.com/demo/3DShelve
10. http://www.hightopo.com/demo/3DShelve2 智慧仓储-货架
11. http://www.hightopo.com/demo/agricultural-products-scheduling 智慧农贸
12. http://www.hightopo.com/demo/airport-building 智慧机场-安全态势
13. http://www.hightopo.com/demo/airport-t3 北京首都机场-T3-航站楼消防监控系统
14. http://www.hightopo.com/demo/alarm-manage 2D报警管理平台
15. http://www.hightopo.com/demo/alarm-manage/photovoltaic.html 23D光伏大数据分析
16. http://www.hightopo.com/demo/annexMonitor 供水系统三维组态
17. http://www.hightopo.com/demo/astar/astar.html Astar自动寻路
18. http://www.hightopo.com/demo/bigscreen-newenergy 智慧能源管理平台
19. http://www.hightopo.com/demo/bloodMap 工业大数据治理2D数据血缘关系拓扑图
20. http://www.hightopo.com/demo/build-frame 楼宇智控
21. http://www.hightopo.com/demo/BulletTrainStation 智慧交通-动车站监控系统
22. http://www.hightopo.com/demo/CableDuctBank/index.html?showMap=false 3D城市地下综合管廊管理系统
23. http://www.hightopo.com/demo/Camera 数据中心-摄像头
24. http://www.hightopo.com/demo/CarExhibitionHall 汽车展馆
25. http://www.hightopo.com/demo/cement-factory-system 水泥厂数据大屏
26. http://www.hightopo.com/demo/CementFactory 水泥工厂三维组态
27. http://www.hightopo.com/demo/cloud-monitor 新风系统三维组态
28. http://www.hightopo.com/demo/cloud-monitor/demo1.html 3D裙房自控
29. http://www.hightopo.com/demo/cloud-monitor/demo2.html 3D空调机组
30. http://www.hightopo.com/demo/cloud-monitor/demo4.html 海绵城市
31. http://www.hightopo.com/demo/cockpit 三维驾驶舱
32. http://www.hightopo.com/demo/ComprehensiveDemo 3D/VR虚拟智慧城市
33. http://www.hightopo.com/demo/cooling 2.5D活塞式冷水机组
34. http://www.hightopo.com/demo/coronavirusGlobal 全球疫情可视化
35. http://www.hightopo.com/demo/coronavirusPC 疫情可视化地
36. http://www.hightopo.com/demo/demo-efficient-idc 数据中心-国风节能案例
37. http://www.hightopo.com/demo/demo-showroom-material 图扑云展厅
38. https://hightopo.com/demo/demo-showroom/ 图扑展厅
39. http://www.hightopo.com/demo/demo-tank 数字孪生-坦克
40. http://www.hightopo.com/demo/drainage 排水泵站
41. http://www.hightopo.com/demo/drilling-platform 3D海上钻井平台
42. http://www.hightopo.com/demo/electric-bling 电力接线组态图
43. http://www.hightopo.com/demo/electrical-cabinets 3D高压开关柜-配电柜
44. http://www.hightopo.com/demo/elementTable 三维元素周期表
45. http://www.hightopo.com/demo/Elevator 电梯
46. http://www.hightopo.com/demo/EmergencyPlan 应急预案
47. http://www.hightopo.com/demo/estate 智慧物业管理系统
48. http://www.hightopo.com/demo/ExhibitionHall 3D手机营业厅-智慧展馆
49. http://www.hightopo.com/demo/fan3d-magic 数字孪生-风力发电机
50. http://www.hightopo.com/demo/FanDevice 3D风电场运维系统
51. http://www.hightopo.com/demo/fault-detection 三维拓扑图
52. http://www.hightopo.com/demo/FaultDetection 故障检测平台
53. http://www.hightopo.com/demo/firecontrol 消防控制系统
54. http://www.hightopo.com/demo/flight-monitor 数字孪生-民航飞机
55. http://www.hightopo.com/demo/gas-pipeline 2D燃气管道监控系统-燃气管道组态图
56. http://www.hightopo.com/demo/heat-station/blue 2D换热站监控系统-换热系统组态（蓝）
57. http://www.hightopo.com/demo/heatmap-airflow 气流组织仿真与智能运维
58. http://www.hightopo.com/demo/ht-excavator 3D挖掘机
59. http://www.hightopo.com/demo/ht-gas-station 智慧加油站
60. http://www.hightopo.com/demo/ht-ironworks 炼铁高炉2.0
61. http://www.hightopo.com/demo/ht-smart-building 轻量化-BIM-模型的-3D-智慧园区楼宇可视化-线框风格
62. http://www.hightopo.com/demo/ht-structure3d 3D架构展示
63. http://www.hightopo.com/demo/ht-subway 智慧地铁站-厦门地铁
64. http://www.hightopo.com/demo/HTBridge 3D道桥隧可视化
65. http://www.hightopo.com/demo/HTPumpStation 水泵站模型
66. http://www.hightopo.com/demo/human-info 人员信息
67. http://www.hightopo.com/demo/human-info/command.html 3D信息看板控制台
68. http://www.hightopo.com/demo/IBMS-demo 智能楼宇-冷热源集成系统
69. http://www.hightopo.com/demo/IBMS-WFC 智能大厦管理系统
70. http://www.hightopo.com/demo/indoor-position 智慧钢厂-室内定位
71. http://www.hightopo.com/demo/intelligence-park-demo 智慧城市-园区管控
72. http://www.hightopo.com/demo/intelligent-city/entry/dest 3D城市建筑群
73. http://www.hightopo.com/demo/intelligent-control 园区综合管控
74. http://www.hightopo.com/demo/intelligent-idc 3D机房可视化-智慧楼宇-数据中心
75. http://www.hightopo.com/demo/intelligent-plant 3D智慧棉花工厂纺织机械工厂生成流水线
76. http://www.hightopo.com/demo/intelligent-transformer 数字孪生-变压器
77. http://www.hightopo.com/demo/large-screen 智慧照明整体解决方案大屏
78. http://www.hightopo.com/demo/large-screen-layout 光伏发电站
79. http://www.hightopo.com/demo/large-screen-puddling 3D高炉炼铁工业流程
80. http://www.hightopo.com/demo/lightenergy 光能发电站三维组态
81. http://www.hightopo.com/demo/machine-animation 生产线仿真
82. http://www.hightopo.com/demo/metering-station 油田计量站3D可视化监控系统
83. http://www.hightopo.com/demo/metrostation 智慧地铁站-简易风
84. http://www.hightopo.com/demo/natural-gas-flow_dl 智慧能源-燃气供应
85. http://www.hightopo.com/demo/nuclear-power 数字孪生-核电工艺
86. http://www.hightopo.com/demo/ParkingLot 停车场智能充电桩监控系统
87. http://www.hightopo.com/demo/paster-production-line SMT贴片加工工厂
88. http://www.hightopo.com/demo/PID-feed-system PID-进料系统
89. http://www.hightopo.com/demo/pivas 智慧医疗物流系统
90. http://www.hightopo.com/demo/power-plant 变电站模型
91. http://www.hightopo.com/demo/powerCiity 能源城市
92. http://www.hightopo.com/demo/ProductionControl 23D管道生产管控仿真培训系统
93. http://www.hightopo.com/demo/productLining 空调流水线3D可视化生产监控系统
94. http://www.hightopo.com/demo/productLiningNew 生产线
95. http://www.hightopo.com/demo/pump-room 2D水泵房监控系统
96. http://www.hightopo.com/demo/pump-station 智慧水务
97. http://www.hightopo.com/demo/pump-station-3d-2 智慧水务-泵站
98. http://www.hightopo.com/demo/pv 光伏逆变器和汇流箱新能源监控系统
99. http://www.hightopo.com/demo/rackHeatmap 3D机房热力图
100. http://www.hightopo.com/demo/railway-station 智慧车站-高铁站
101. http://www.hightopo.com/demo/rubik-cube 三维魔方游戏
102. http://www.hightopo.com/demo/situation-planet 网络安全竞赛
103. http://www.hightopo.com/demo/smart-building-mb 智慧楼宇-线框移动端版
104. http://www.hightopo.com/demo/smart-building-pc 智慧楼宇-线框PC端版
105. http://www.hightopo.com/demo/smart-classroom 智慧校园-智慧教室
106. http://www.hightopo.com/demo/smart-mine 智慧矿山
107. http://www.hightopo.com/demo/smart-tower 智慧路灯可视化
108. http://www.hightopo.com/demo/snake_20151106/GreedySnake.html 贪吃蛇游戏
109. http://www.hightopo.com/demo/stadium 数字孪生-体育馆
110. http://www.hightopo.com/demo/szwater-affaias 水泵站
111. http://www.hightopo.com/demo/telemetering 3D空间技术卫星监测可视化
112. http://www.hightopo.com/demo/transfer-station 3D转油站管网设备监控系统
113. http://www.hightopo.com/demo/TransformerRoom 变电室
114. http://www.hightopo.com/demo/TransportCenter 智慧车站-长途汽车站-3D客运枢纽中心
115. http://www.hightopo.com/demo/tunnel-system 隧道可视化
116. http://www.hightopo.com/demo/tunnel2 隧道可视化
117. http://www.hightopo.com/demo/vr-training VR-设备拆解仿真培训
118. http://www.hightopo.com/demo/warehouse 3D仓储货架管理系统
119. http://www.hightopo.com/demo/warehouseshelves 仓储货架
120. http://www.hightopo.com/demo/water-sand-board 智慧水务
121. http://www.hightopo.com/demo/wind-system 2.5D新风监控系统
122. http://www.hightopo.com/demo/Xiamen-Twin-Towers 智慧楼宇-厦门双子塔
123. http://www.hightopo.com/demo/yx-dlqyz 电力牵引站
124. http://www.hightopo.com/demo/zutaituomin 石油组态2D
125. https://www.hightopo.com/demo/heat-station/blue/ 换热站远程监控系统
126. https://www.hightopo.com/demo/Simple3DEditor/index.html 组态编辑器

### 数维图
https://www.sovitjs.com/
基于three.js+indexdb+three.js的scene去Json化(自封.svt格式)+objectloader