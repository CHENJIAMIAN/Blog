 Paul Henschel ( [@0xca0a )，他是](https://twitter.com/0xca0a?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)[react-three-fiber](https://github.com/pmndrs/react-three-fiber)的主要维护者
## 类图![AECA9D1EA33647C99D4A25A725166B5B](https://github.com/CHENJIAMIAN/Blog/assets/20126997/277600f2-03f5-495c-bec6-7dc3213bcb42)

## three.js
```js
Three.js中级封装做3D, 万物皆三角形
    //Babylon.js高级封装做游戏
    相机,场景,网格都是THREE.Object3D的实例,有位置,有大小
    坐标系: 世界空间和局部空间
    
最小例子：https://github1s.com/johnson2heng/GitChat-Three.js/blob/master/01%E7%AC%AC%E4%B8%80%E8%8A%82%20helloWorld/index.html#L50

WebGLRenderer 中的 WebGL 1 支持现已弃用，并将在 r163 中删除。只支持webgl2了
```
## 调试
```js
调试
    "three": "^0.115.0"//该版本支持vscode快速跳转定义, 最新版不支持..,换版本可能有兼容问题!!
    显示帧数
        import Stats from 'three/examples/jsm/libs/stats.module';
        stats = new Stats();
        document.body.appendChild(stats.dom);
        
    辅助对象 Helper
        1、ArrowHelper 箭头辅助对象        2、AxesHelper 轴坐标系辅助对象(常用,看原点在哪里)
        3、BoxHelper 包围盒辅助对象        4、Box3Helper 模拟3维包围盒辅助对象
        5、CameraHelper 相机视锥体辅助对象( camera : Camera被模拟的相机 )        
        6、DirectionalLightHelper 平行光的辅助对象
        7、GridHelper 坐标网格辅助对象        8、PolarGridHelper 极坐标格辅助对象
        9、HemisphereLightHelper 半球形光源网格辅助对象        10、PlaneHelper 平面辅助对象
        11、PointLightHelper 点光源菱形网格辅助对象        12、SpotLightHelper 聚光灯锥形辅助对象
        13、RectAreaLightHelper 矩形光辅助对象        14、Skeleton<x>helper 骨骼辅助对象
        15、VertexNormalsHelper 顶点的法线辅助对象        16、VertexTangentsHelper 顶点切向量辅助对象  
```
## 渲染器
```js
渲染器
    const renderer = new THREE.WebGLRenderer(); 
    //如何用到glsl们?     WebGLRenderer-> initGLContext-> new WebGLPrograms -> ShaderChunk ->./ShaderLib/**.glsl.js
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    动画循环调用renderer.render(scene, camera);
```
### 色调映射 renderer.toneMapping = THREE.ACESFilmicToneMapping;
1. 一种在渲染过程中将高动态范围（High Dynamic Range, HDR）图像转换为低动态范围（Low Dynamic Range, LDR）图像的技术。
2. 在计算机图形学中，颜色通常以线性空间进行处理，以准确地表示光照和颜色的叠加、混合和计算。然而，显示设备（例如计算机显示器）通常使用伽马矫正（Gamma Correction）来将线性空间的颜色值转换为非线性空间，以适应人眼对亮度的感知特性。
	1. 人眼对亮度的感知也是非线性的，较低亮度的变化更为敏感，而较高亮度的变化则相对不太敏感。
	2. **伽马校正**的目的是将图像的亮度值进行**非线性变换**，以使其在显示设备上呈现出线性感知。
3. 高动态范围图像捕捉到了现实世界中广泛的亮度和颜色细节，但直接在标准显示设备上显示会导致过曝（Overexposure）或细节丢失。
4. 算法
	1. **LinearToneMapping**：线性色调映射保持颜色的原始比例，不进行任何调整。这种映射适合那些已经预调整好颜色的模型，或者在你希望保持最原始颜色时使用。
	2. **ReinhardToneMapping**：Reinhard色调映射是一种比较自然的映射方式，它能较好地平衡高光和暗部细节。适用于大多数场景，特别是那些需要较为真实感的场景。
	3. **Uncharted2ToneMapping**：这种映射模仿了游戏《神秘海域2》中的色调映射算法。它提供了一种动态范围广泛且对比度高的效果，适合需要强烈视觉冲击的场景。
	4. **CineonToneMapping**：这种映射模拟电影胶片的色彩，适合想要电影感或者复古感的场景。
	5. **ACESFilmicToneMapping**：模拟了ACES工作流中使用的色调映射。它能提供富有电影感的色彩和对比度，适合追求电影级视觉效果的场景。

## 曲线
```js
曲线
    THREE.LineCurve3() - 表示由两个3D点定义的线段。在路径动画（如先前示例中看到的盘旋）和粒子系统中常常使用。
    THREE.QuadraticBezierCurve3() - 也称为单曲线轨迹，它由三个3D点（首位点以及一个控制点）构成，平滑地将起始点移动到结束点。 它们可以用于多用场景中，例如在动画时平滑地过渡模型位置。
    THREE.CubicBezierCurve3() - 类似与二次贝塞尔曲线，只是由四个点来定义。相比之下它们更加复杂，但也更加灵活，在创建更流畅的曲线上表现出色。比如让相机跟踪模型运动的时候，就可以使用CubicBezierCurve3来实现更自然的效果。
    THREE.SplineCurve3() - 充当平滑路径的功能。它们由任意数量的点构成，三维空间中的坐标点可以随时间变化。常常用于建立弯曲的道路或特定动画中的精灵。
    THREE.EllipseCurve() - 椭圆曲线由中心点、半径、起始角度和弧长角度定义。 它们比其他路径类型更受限制，但如果需要按预期方式围绕中心点旋转/移动物体，则非常有用。
    THREE.ArcCurve() - 圆弧曲线表示圆形线段。其由圆心、半径、起始角度和弧度价值组成。这些曲线可以用于创建自定义3D几何体或建筑物，其中一个或多个曲线合并成一个形状。
    THREE.CatmullRomCurve3() - 经典样条曲线类型。可以连接任意数量的点，产生平滑、流畅的路径。它们经常用于动画和交互式可视化中。经常用来定义相机运动路径或者某些特效涉及到物体移动的路径
 ```
## 相机/控制器
```  js 
相机/控制器
    target/lookAt/上下左右近远/updateProjectionMatrix()更新相机/fov垂直视野角度/aspect宽高比
        camera.target = mesh.position;    //或者 camera.lookAt(mesh.position);
    不断地盯住/跟踪一个目标
        const targetPosition = new THREE.Vector3();
        获取变动目标方法1: targetMesh.getWorldPosition(targetPosition);//存位置进去targetPosition
        获取变动目标方法2: Curve.getPointAt(0-1的数,targetPosition) //返回曲线上相对于曲线总长度的位置，就好像它是一条延伸成直线的线, 存位置进去targetPosition
        turretPivot.lookAt(targetPosition);//盯住targetPosition    
    PerspectiveCamera透视//模拟人眼,近大远小
    OrthographicCamera正交//类似某一方向来个截图
    相机插件//https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
        OrbitControls 轨道控制器,让相机可以放近放远, 可以360°绕着物体看, 方便调试'没有它鼠标操作什么反应都没有'
		   `controls.enableDamping = true;`启用阻尼效果
        DeviceOrientationControls 陀螺仪相机控制器，实现移动端陀螺仪控制相机。
        DragControls 控制鼠标拖拽移动物体的功能。
        EditorControls 实现相机的旋转，缩放，平移功能，相对于OrbitControls的功能差不少，不建议使用
        FirstPersonControls 第一视角相机控制器
        FlyControls 飞行相机控制器        
        OrthographicTrackballControls 正交轨迹球控制器 正交相机使用的轨迹球控制器
        TrackballControls 轨迹球控制器 透视相机使用的轨迹球控制器
        PointerLockControls 鼠标锁定相机控制器
        TransformControls 控制模型位置，缩放，旋转的控制器
        VRControls 实现VR双屏相机控制器 
```

## Layer/scene/Object
```js
Layer
    配合camera.layers.set(0);分组渲染(一组用composer渲染,一组正常渲染)或分组隐藏, '默认的图层都是0和相机对象一样，都会被渲染到画布上，如果把其中一个网格模型的图层值设置为非0，比如3，因为和相机对象的图层0不一样，就不会被渲染出来。'
    layers.set() //删除图层对象已有的所有对应关系，增加与参数指定的图层的对应关系。.set()方法的参数可以理解为二进制中右侧1向左平移的位数，得到的值赋值给图层对象的.mask属性
        //比如设置.set(0)，.mask属性值是1，设置.set(1)，.mask属性值是2，设置.set(2)，.mask属性值是3，设置.set(2)，.mask属性值是4，设置.set(4)，.mask属性值是8
    layers.enable(layer : Integer) //增加图层对象与参数指定图层的对应关系。 layer - 一个 0 - 31 的整数。Layers 对象为 Object3D 分配 1个到 32 个图层,默认的，所有 Object3D 对象都存储在第 0 个图层上

增加图层对象与参数指定图层的对应关系。
网格(Mesh)代表物体的位置和方向
    position/scale/rotation
    
查找某个具体的模型
    1.物体.name = "眼睛"
    2.1.scene.getObjectByName ( "左腿" );
    2.2.scene.traverse(function(obj) {  if (obj.type === "Group") console.log(obj.name); 
    
```
## 材质
```js
材质(Material):
    color/map纹理/depthTest'被挡住还能看到'/normalMap法线贴图是一种模拟凹凸处光照效果的技术.是凸凹贴图的一种实现
    MeshBasicMaterial不会受到光的影响//由于MeshBasicMaterial不使用光照，如果物体显示不出来,材质设为它能显示,那物体就是出现在材质或光照了
    MeshPhongMaterial会受灯光影响的高光材质,油漆面，瓷瓦等光滑物体
        MeshToonMaterial是MeshPhongMaterial卡通着色的扩展
    MeshNormalMaterial法向材质,这种材质会根据面的方向不同自动改变颜色,不会受到光的影响
    MeshLambertMaterial 兰伯特材质，不会出现高光, 粗糙的材质的物体，比如木头或者石头
    MeshDepthMaterial材质的物体，其外观不是由光照或某个材质属性决定的，二十有物体到摄像机的距离决定的。可以将这种材质与其他材质结合使用，从而很容易地创建出逐渐消失的效果
    Points //默认不受光照影响
    RawShaderMaterial与ShaderMaterial类似，不同之处在于内置的uniforms和attributes的定义不会自动添加到GLSL shader代码中
    //注意使用物理材质的时候，一般需要设置环境贴图.envMap
    MeshStandardMaterial一种基于物理的标准材质,提供了比MeshLambertMaterial或MeshPhongMaterial更精确和逼真的结果，代价是计算成本更高
        MeshPhysicalMaterial是MeshStandardMaterial的扩展，MeshPhysicalMaterial可以更好地控制反射率
    MeshMatcapMaterial不对灯光作出反应,灯光和阴影是通过MatCap和Map贴上去的
    线条 //在上一节我们讲几何体时，没有讲解如何画直线，是由于直线需要单独的材质进行实现
        LineBasicMaterial({color:0x00ff00})//线条材质
        LineDashedMaterial({color:0xff0000})//虚线 ,需要重新计算位置才能显示出虚线line.computeLineDistances()
    

基本属性和方法
    needsUpdate//如果修改了Material内的内容，需要将此属性设置为true，然后Three.js会在下一帧里面将修改内容同步到WebGL的显存内
    map//此属性可以配置当前材质的纹理贴图，是一个THREE.Texture对象, material.map = texture
    纹理的重复方式:
        var texture = new THREE.TextureLoader().load( "textures/water.jpg" );
        texture.wrapS = THREE.RepeatWrapping; //设置水平方向无限循环
        texture.wrapT = THREE.RepeatWrapping; //设置垂直方向无限循环
        texture.repeat.set( 4, 4 ); //水平方向和垂直方向都重复四次
        //UV坐标将被用于纹理映射
    颜色:   
        var color = new THREE.Color(1, 0, 0 );//"rgb(255, 0, 0)" 0xff0000 "#ff0000"  "rgb(100%, 0%, 0%)"       'skyblue'    "hsl(0, 100%, 50%)"    
```
## scene的背景/.hdr文件
```js
.hdr文件
    HDRI文件是一种文件，*.hdr或*.tif格式,记录了图片环境中的照明信息，因此我们可以使用这种图象来“照亮”场景
        可以用作scene的背景,
        scene.background = new RGBELoader()
	        .setPath( 'textures/' )
	        .load( 'royal_esplanade_1k.hdr', ()=>{
				        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;/*全景反射映射*/
				}); 
```
## 精灵Sprite/粒子points
```
精灵Sprite //类似cesium的广告牌
粒子points //和精灵的效果是一样的，粒子的作用就是为解决很多精灵而出现的，我们可以使用粒子去模型数量很多的效果，比如下雨，下雪等
```
## BufferGeometry(高性能)和Geometry(低性能)
```js
BufferGeometry(高性能)和Geometry(低性能)可通过自己的fromXX方法互转//BufferGeometry存储的都是一些原始的数据，性能比Geometry的性能高，很适合存储一些放入场景内不需要再额外操作的模型
    BoxBufferGeometry 正方体
    CylinderBufferGeometry 圆柱
    SphereBufferGeometry 球
    
    ConeGeometry 圆锥
    PlaneGeometry 平面
    TorusGeometry 圆环
    TorusKnotGeometry 圆环结几何
    ExtrudeGeometry拉伸成型, 利用圆形配合直线轨迹线生成圆柱体,配合曲线轨迹生成弯曲的水管等
Geometry和BufferGeomety内置了一些常用的方法:
    center()// 此方法为居中方法，可以根据边界框居中几何图形
    computeBoundingBox() // 此方法可以可以计算几何的边界框，方法调用后，会更新Geometry.boundingBox属性，我们可以通过Geometry.boundingBox属性获取到一个包围几何体的立方体的每个轴向的最大值和最小值
    dispose()// 将几何体从内存中删除，这个方法必须记得使用。如果频繁的删除模型，一定要记得将几何体从内存中删除掉。
```
## 光源/阴影
```js
光源
    intensity/color/position/target朝向位置/shadow/castShadow是否接收投影
    DirectionalLight=> 阳光
        new THREE.DirectionalLight( 0xffffff, 0.5 ); //=> 阳光
        .shadow.camera.上下左右近远 //限制阴影范围, 提高性能
        .shadow.mapSize.height//阴影密度
    PointLight=> 灯泡
    RectAreaLight=> 条形照明或明亮的窗户
    SpotLight=> 聚光灯
    
    AmbientLight环境光从各个方向向每个对象添加恒定数量的光。
        new THREE.AmbientLight( 0x404040 ); // 创建一个灰色的环境光 
    HemisphereLight天空颜色和地面颜色之间的渐变 ，可用于模拟许多常见的照明场景。//环境光会影响场景中的所有对象。因此，无需为场景添加多个环境光

    阴影
        1.renderer.shadowMap.enabled = true; '默认情况下，阴影是禁用的'
        2.产生阴影的物体.castShadow = true;
        3.接收阴影的物体物体.recieveShadow=true; //接收阴影 8:47-12:47
```
## 动画
``` js
动画
    function animate() {
        requestAnimationFrame(animate); //循环调用函数
        //改变物体位置
        renderer.render( scene, camera ); //渲染界面
    }
    animate();
    变型动画 //修改模型顶点的位置  morph targets的中文翻译是"形变目标"或"融合形态"。
            //在使用morph targets时，我们可以通过将基础网格和目标网格进行插值来得到一个中间状态的几何体。通过不断改变插值系数，我们可以平滑地将基础网格变形为任何一个目标网格，从而实现形变动画。
            geometry.morphTargets[0] = {name:'t1',vertices:动画目标geometry.vertices}
            geometry.computedMorphNormals();//通知开启动画
            mesh = new THREE.Mesh(geometry,material)
            mesh.morphTargetsInfluences[0] = 0-1之间的数//1则已经变化成了 目标动画目标geometry 了
    骨骼动画    
    
通过导入模型显示动画 //https://github.com/johnson2heng/GitChat-Three.js
    模型动画组成:
        KeyframeTrack是基类，每种数据类型都有一个子类：
            NumberKeyframeTrack某秒数值如透明度/VectorKeyframeTrack某秒位置/QuaternionKeyframeTrack/BooleanKeyframeTrack/StringKeyframeTrack
        动画片段（AnimationClips）        
            //在我们成功导入模型以后，如果模型拥有相关的动画属性，会在返回的模型数据中产生一个名为animations的数组，数组的每一个子项都是一个AnimationClips对象
            eg:第一个AnimationClips对象有可能保存的是人物走动的动画，第二个AnimationClips对象用于跳跃，第三个用于攻击动画等等。
            对象内部四个属性: 
                name当前的动画的一个名称 / uuid一个不会重复的uuid / duration当前动画一个循环所需要的时间 / tracks轨迹当前动画每一次切换动作所需要的数据
                
        动画混合器（Animation Mixer）//播放权力在动画混合器的手中。还可以同时控制几个动画，混合它们或者合并它们。        
        动画播放器（Animation Actions）//动画播放器，暂停或者停止，加快或减慢, 是否使用淡入淡出效果。        
        
        动画对象组（Animation Object Groups）
            如果你希望一组模型对象共享当前的动画，我们可以使用动画对象组来实现
    导入方法:
        变形动画
            //并将材质的morphTargets设置为ture，可以使用变形动画
            mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({morphTargets: true}));  
            //然后我们创建了一个针对于该模型的混合器        
            mixer = new THREE.AnimationMixer(mesh);
            //接着使用变形目标数据创建一个动画片段
            const clip = THREE.AnimationClip.CreateFromMorphTargetSequence('gallop', geometry.morphTargets, 30); 
            const clip = new AnimationClip('slowmove', length=-1自动计算tracks长度, [new VectorKeyframeTrack('.position', times, values)]);
            //使用混合器和动画片段创建一个动画播放器来播放：
            const action = mixer.clipAction(clip); //创建动画播放器,   循环mixer.update(delta)
            action.setDuration(1); //设置当前动画一秒为一个周期
            action.play(); //设置当前动画播放
        骨骼动画
            mixer = new THREE.AnimationMixer(obj); //通过当前模型创建混合器
            action = mixer.clipAction(gltf.animations[0]); //通过动画数据创建播放器
            action.play();//直接调用播放器的播放事件让动画播放：
            //最后，我们还是需要在循环渲染中更新混合器，并将每一帧渲染的间隔时间传入        
        function render() {
            control.update();
            var time = clock.getDelta();
            if (mixer) {mixer.update(time);}////由于模型导入是异步的，所以我们再模型没有加载完之前是获取不到混合器的
            renderer.render(scene, camera);
        }
```

## 选中物体
在计算机图形学中，通过 GPU 选择物体是一种常见的技术，通常用于处理用户与 3D 场景中的物体进行交互的情况，例如点击或拖动物体。以下是一种常用的方法——颜色编码（Color Picking）方法。
#### 颜色编码（Color Picking）性能高,但无法处理透明物体
颜色编码是一种使用 GPU 来选择物体的常用技术。基本步骤如下：
1. **渲染阶段**：首先，你需要为场景中的每个物体分配一个唯一的颜色。然后，在渲染阶段，你将这些颜色（而不是物体的实际颜色）渲染到一个隐藏的帧缓冲区（不显示给用户）。
2. **选择阶段**：当用户点击屏幕时，你可以检查隐藏的帧缓冲区在点击位置的颜色。然后，你就可以通过这个颜色找回之前分配给物体的唯一颜色，从而确定用户点击的是哪个物体。
这种方法的优点是实现简单，执行速度快。但是，**它的缺点是不能处理透明物体**，因为颜色混合会破坏唯一颜色的特性。
#### 射线追踪（Ray Tracing）性能低
另一种常见的方法是射线追踪。这种方法不依赖于颜色编码，而是通过几何计算来确定用户点击的物体。步骤如下：
1. **射线投射**：首先，你需要从相机位置，通过用户点击的屏幕位置，向场景中投射一条射线。
2. **射线检测**：然后，你需要检查这条射线是否与场景中的任何物体相交。可以使用各种方法来进行检测，例如，对于简单的形状（例如球或方块），可以使用解析方法。对于更复杂的形状，可能需要使用更复杂的算法，例如包围盒或 BVH 树。
3. **选择物体**：如果射线与多个物体相交，通常选择最近的物体作为用户点击的物体。
射线追踪方法的优点是可以处理透明物体，而且不受颜色编码方法的颜色数量限制。但是，如果场景中的**物体数量或复杂度很高，射线追踪可能会比颜色编码更消耗计算资源。**

## 场景交互
```js
场景交互
    new Raycaster( origin, direction, near, far );//光线投射主要用于物体选择、碰撞检测以及图像成像等方面
        origin - 光线投射的原点矢量。
        direction - 光线投射的方向矢量，应该是被归一化的。
        near - 投射近点，用来限定返回比near要远的结果。near不能为负数。缺省为0。
        far - 投射远点，用来限定返回比far要近的结果。far不能比near要小。缺省为无穷大。
        .set（origin，direction）
        .setFromCamera ( coords, camera )//使用当前相机 和 界面的2d坐标 设置射线的位置和方向
        .intersectObject ( object, recursive, optionalTarget)//[ { distance, point, face, faceIndex相交的面的索引, indices组成相交面的顶点索引, object }, ... ]
        .intersectObjects ( array, recursive, optionalTarget)
        
实现一个模型的点击事件
    //首先，我们通过点击事件回调的event获取到点击的位置：
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        默认没有经过矩阵转换过的显示区域的宽和高分别是2，即中心点也是webgl场景的坐标原点，左上角的坐标是(-1.0, 1.0, 0.0)， 右下角的坐标轴是(1.0, -1.0, 0.0)。
    //点击点的位置 -> 没有矩阵转换过的平面坐标 -> 场景内的原始坐标
        如果webgl的渲染区域不是占满窗口状态，我们还需要获取到显示区域距离窗口左上角的偏移量，再计算位置：    
            //通过dom的getBoundingClientRect方法获得当前显示区域距离左上角的偏移量
            var left = renderer.domElement.getBoundingClientRect().left;
            var top = renderer.domElement.getBoundingClientRect().top; 
            //根据浏览器的设备类型来获取到当前点击的位置
            var clientX = dop.browserRedirect() === "pc" ? event.clientX - left : event.touches[0].clientX - left;
            var clientY = dop.browserRedirect() === "pc" ? event.clientY - top : event.touches[0].clientY - top;    
            //计算出场景内的原始坐标
            mouse.x = (clientX / renderer.domElement.offsetWidth) * 2 - 1;
            mouse.y = -(clientY / renderer.domElement.offsetHeight) * 2 + 1;    
    //获取到坐标以后，我们需要使用射线的setFromCamera()方法配合场景坐标和相机更新射线的位置：
    raycaster.setFromCamera( mouse, camera );//coords,camera     
    var intersects = raycaster.intersectObjects( scene.children );//if(intersects.length > 0)    
    // 这里在提醒一句，很多小伙伴有时候发现点击了以后射线无法获取到相交的物体，那是因为为了节约性能，我们需要设置第二个参数为true，让Three.js遍历模型所有的子类去判断是否相交。    
```
## 实现一个简单的框选案例
```js
实现一个简单的框选案例
    //在鼠标按下时，记录鼠标按下时的场景坐标：
        //获取到显示区域距离窗口左上角的偏移量
        domClient.x = renderer.domElement.getBoundingClientRect().left;
        domClient.y = renderer.domElement.getBoundingClientRect().top;
        //计算出当前鼠标距离显示区域左上角的距离
        down.x = e.clientX - domClient.x;
        down.y = e.clientY - domClient.y;
    
    //使用之前学习到的box对象方法来计算出模型的包围盒中心位置，这样对多个复杂模型比较管用：    
        for (let i = 0; i < group.children.length; i++) {
            let box = new THREE.Box3();
            box.expandByObject(group.children[i]);  
                  
            //获取到平面的坐标
            let vec3 = new THREE.Vector3();
            box.getCenter(vec3);
            let vec = vec3.project(camera);
                    
            modelsList.push({
                    component: group.children[i],
                    position: {x: vec.x * half.width + half.width,   y: -vec.y * half.height + half.height},
                    normalMaterial: group.children[i].material})
        } 
        //如果简单的几何体的话，可以直接使用mesh的位置来计算。通过相机将世界坐标的位置转换为平面坐标，并将模型放到一个数组内以便后期使用 

    document.addEventListener("mousemove", movefun, false);//鼠标移动事件是为了判断每个模型是否处于框内
    document.addEventListener("mouseup", upfun, false);//鼠标抬起事件将绑定的事件清除
    //在鼠标移动事件中，我们计算出当前四个边的位置，并且循环判断哪些模型的位置处于框内，处于框内的模型的材质将被修改为框选材质：
        for (let i = 0; i < modelsList.length; i++) {
            let position = modelsList[i].position;
            //判断当前位置是否处于框内
            if (position.x > min.x && position.x < max.x && position.y > min.y && position.y < max.y) { modelsList[i].component.material = material; }
            else{ modelsList[i].component.material = modelsList[i].normalMaterial;}
        }    
    //在最后的鼠标抬起事件内，将框选框隐藏，并将所有材质修改为默认材质：
        function upfun(e) {    
            //清除事件
            document.body.removeChild(div);
            document.removeEventListener("mousemove", movefun, false);
            document.removeEventListener("mouseup", upfun, false);    
            //将所有的模型修改为当前默认的材质
            for (let i = 0; i < modelsList.length; i++) {modelsList[i].component.material = modelsList[i].normalMaterial;}
        }
```
## EffectComposer
```js
EffectComposer（效果合成器）post-processing//应用一个或多个图形效果，例如景深、发光、胶片微粒或是各种类型的抗锯齿
    //https://r105.threejsfundamentals.org/threejs/lessons/resources/images/threejs-postprocessing.svg
    EffectComposer(renderer).addPass( 
                            RenderPass(scene,camera) 
                           ).render()
                           //bloomComposer用于生成辉光材质，finalComposer用于渲染整个场景
                           //为了区分辉光对象和非辉光对象，我们需要改变其图层编号。将需要变为辉光的对象的图层编号设为1，其余默认为0
                           //最后，我们把不需要辉光的部分转为黑色材质，使其辉光效果失效
                           //设置一个还原材质的方法，将转为黑色材质的物体进行还原
                           //在render方法中先转换材质，生成辉光效果，然后还原材质，最后渲染整个场景，从而实现部分辉光的效果
        renderToScreen//是否将当前的内容渲染到画布上。通常来说你需要在你最后添加的pass设置这一项为true，true結果將會輸出到屏幕上
    Z-buffer的值越大，物体距离就越远
    renderer.clearDepth()//Depth Buffer深度缓存, 物体之间总会存在前后的遮挡关系, Z-buffer的值越大，物体距离就越远
    ShaderPass( CopyShader ) //CopyShader是为了能将结果输出，普通的通道一般都是不能输出的，要靠CopyShader进行输出
        //postprocessing pipeline在 2 个屏幕外缓冲区之间来回渲染。最后一遍完成后，需要将结果复制到实际屏幕上。这就是 CopyShader 所做的。
        //可以想象，您可以构建您的通道，以便最终通道直接渲染到可见屏幕，但在实践中，这会引入一些复杂性。
    THREE.RenderPass根据scene和camera渲染出一个场景，和普通的webGLRenderer一样,简单说就是RenderPass用来生成第一张原始图，用来传给后面通道使用，所以一般RenderPass会作为第一个通道
    THREE.BloomPass增强场景中的亮度, /必须renderer.autoClear = false;才能生效!!!/
    THREE.OutlinePass其可为边缘添加发光效果, 
        //menGroup.layers.enable(1)无效, menMesh.layers.enable(1)才有效,因为raycaster 只与具有几何形状的东西相交
    THREE.UnrealBloomPass通道可以在场景的物体中产生泛光/辉光效果
    
    THREE.FilmPass使用扫描线和失真来模拟电视屏幕效果
    THREE.GlitchPass随机的在屏幕上显示电脉冲
    THREE.MaskPass添加掩码，后续通道只会影响掩码区域，取消掩码需要加入THREE.ClearMaskPass通道
        //this.renderer.autoClear = false; // 要使用高级效果组合器MaskPass，必须设置为false
    THREE.TexturePass保存当前通道的输出，作为后续使用
    THREE.ShaderPass自定义的通道，一般在构造函数中指定相关的参数即可    
        THREE.FXAAShader:添加抗锯齿的效果
    THREE.AdaptiveToneMappingPass:自适应色调映射
    
由模型生成模型边缘线框
    遍历模型的子obj们 ,用一个group存生成的LineSegments们
    const edges = new THREE.EdgesGeometry(obj.geometry);
    const lineBasematerial = new THREE.LineBasicMaterial({ color: new THREE.Color(0.1, 0.3, 1), side: THREE.FrontSide, linecap: 'round', linejoin: 'round', });
    const line = new THREE.LineSegments(edges, lineBasematerial);

WebGLRenderTarget 渲染目标: 是一种存在帧缓冲区中的纹理(计算结果)
```

## 坐标图
![969AD33FBF214276B7C464AE4082C7FF](https://github.com/CHENJIAMIAN/Blog/assets/20126997/5eee1112-3520-4497-a284-ec5a87e584c5)
## 模型加载(重点)
```js
问题: 导入到场景内的模型无法查看，而且也没有报错?
        尝试放大一千倍或者缩小一千倍来查看效果, 将模型居中到相机照射的焦点位置查看
        
1.GLTFLoader(官方推荐)//const loadedData = await loader.loadAsync('path/to/yourModel.glb');
        //由于glTF专注于传输，因此它的传输和解析的速度都很快。glTF模型功能包括：网格，材质，纹理，蒙皮，骨骼，变形动画，骨骼动画，灯光以及相机。
        在传输到前端的过程中，通常可能传输gltf文件、附属的.bin文件（存储二进制数据）、图片纹理文件（.jpg或.png格式）等
        glTF 导出格式有两种后缀格式可供选择：'.gltf' 和 '.glb'    
            '.bin' 文件，以二进制流的方式存储顶点坐标、顶点法线坐标和贴图纹理坐标、贴图信息等模型基本数据信息；        
            '.gltf' 文件，本质是 json 文件，记录对bin文件中模型顶点基本数据的索引、材质索引等信息，方便编辑，可读性较好；  
                glTF-Embedded是一种使用JSON格式存储模型数据的glTF版本，其中模型中的所有数据都是直接嵌入文件中的。
            //               
            '.glb'  文件格式只导出一个 .glb 文件，将所有数据都输出为二进制流，通常来说会更小一点，若不关心模型内的具体数据可直接选择此类型。
                glTF-Binary是另一种glTF版本，其使用二进制文件存储模型数据，
    //Draco 是 Google 推出的一个用于 3D 模型压缩和解压缩的工具库    
    
    //如果当前的首选不是glTF格式，那么推荐Three.js定期维护并且流行的格式FBX，OBJ或者COLLADA格式，Three.js也有自己独有的JSON格式
2.'.json' new ObjectLoader().parse(obj) //加载.json格式, 3d对象.toJSON()转成JSON
3.'.obj'  OBJ格式模型导入      
	OBJ文件的导出通常会和MTL格式一同导出，MTL作为OBJ文件的附属文件，却有着OBJ文件需要贴图材质        
4.FBX模型导入        
5.(.dae)COLLADA模型导入  
```

## canvas
```javascript
canvas
    canvas.toDataURL('image/png',1)//转图片
    contextType
        "2d", 建立一个 CanvasRenderingContext2D 二维渲染上下文。
        "webgl" (或"experimental-webgl") 这将创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本 1(OpenGL ES 2.0) 的浏览器上可用。
        "webgl2" (或 "experimental-webgl2") 这将创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0) 的浏览器上可用。Experimental
        "bitmaprenderer" 这将创建一个只提供将 canvas 内容替换为指定ImageBitmap功能 的ImageBitmapRenderingContext  。
```
## SVG之ViewBox
```javascript
d3.js中级封装//Data Driven Document 数据驱动文档
    类似echart高级封装,2D的数据可视化
    <g>//分组元素 ，是 SVG 画布中的元素，意思是 group。此元素是将其他元素进行组合的容器
    - 矩形 <rect>    - 圆形 <circle>    - 椭圆 <ellipse>    - 线 <line>    - 折线 <polyline>    - 多边形 <polygon>    - 路径 <path>
        下面的命令可用于路径数据：
        - M = moveto        - L = lineto        - H = horizontal lineto        - V = vertical lineto        - C = curveto
        - S = smooth curveto        - Q = quadratic Bézier curve        - T = smooth quadratic Bézier curveto
        - A = elliptical Arc        - Z = closepath
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <path d="M150 0 L75 200 L225 200 Z" />
        </svg>
//比例尺(键值映射器)
var linear = d3.scaleLinear().domain([0, max]).range([0, 300]);
```

## 高级的Three.js
```javascript
src\renderers\WebGLRenderer.js
    src\renderers\webgl\WebGLBackground.js //同目录下一大堆
        src\renderers\shaders\ShaderLib.js
            src\renderers\shaders\ShaderChunk.js //索引了src\renderers\shaders\ShaderChunk目录下的好多
                //有的用到了src\renderers\shaders\ShaderLib下的好多
```

## PostEffect
1. MSAA：多重采样抗锯齿，用于平滑图像边缘并减少锯齿。基于硬件，对性能的影响相对较小。THREE.WebGLRenderer({ antialias: true, });
2. FXAA：快速近似抗锯齿，用于平滑图像边缘并减少锯齿。对性能的影响较小，但可能会导致一些细节的模糊或失真。
3.  SMAA (Subpixel Morphological Anti-Aliasing): 亚像素形态抗锯齿，通过组合多种算法来减少锯齿效果。它使用子像素分析和形态滤波等技术来识别和模糊锯齿边缘。SMAA相对于FXAA提供了更高的图像质量，但对性能的要求也更高。
4. Color Correction：色彩校正，用于调整图像颜色、亮度和对比度等属性。
5. Bloom：泛光效果，用于模拟明亮物体周围的光晕效果。
7. SSAO：屏幕空间环境光遮蔽，用于模拟物体之间的阴影和光线反射效果。
	1. 与光线追踪相比区别是一次渲染和多次渲染
8. SSR：屏幕空间反射，用于模拟模拟镜面反射效果的反射效果。
	- **使用镜面纹理**：
	    - 优点：在平面上呈现完美的反射。
	    - 缺点：仅限于一个反射方向，并且复杂性根据场景的几何形状而增加。
	- **SSR后处理的使用**：
	    - 优点：使所有方向上的所有反射成为可能，并且复杂性仅取决于屏幕分辨率（就像所有后处理一样）。
	    - 缺点：仅限于相机看到的内容。
9. DOF：景深效果，用于模拟镜头聚焦和模糊效果。
10. ChromaticAberration：色差，用于模拟镜头成像时不同颜色光线的折射效果。
11. Vignetting：暗角效果，用于在图像边缘添加暗影效果。
12. BlurEdge：边缘模糊，用于模拟镜头成像时边缘模糊效果。
13. Film：胶片效果，用于模拟老式胶片的颜色和质感。
14. Glow：发光效果，用于模拟物体周围的光晕效果。
15. Lensflare：镜头光晕，用于模拟镜头成像时光晕效果。

## 贴图
1. 贴图（Texture）：是将图像贴在3D模型表面的一种技术，可以为模型添加颜色、纹理、图案等效果。
2. 自发光贴图（Emissive Map）：是一种特殊的贴图，可以模拟物体自身发光的效果，常用于制作发光字、灯光等。
3. 透明贴图（Alpha Map）：是一种用于模拟物体透明效果的贴图，通常使用黑白图像表示透明度。
4. 凹凸贴图（Bump Map）：是一种用于模拟物体表面凹凸不平的贴图，可以增加模型的真实感。
5. 法线贴图（Normal Map）：是一种用于模拟物体表面凹凸不平的贴图，与凹凸贴图相比，法线贴图可以更加精细地模拟物体表面的细节。
6. 置换贴图（Displacement Map）：是一种用于模拟物体表面凹凸不平的贴图，与凹凸贴图和法线贴图不同的是，置换贴图可以改变模型的几何形状。
7. 粗糙贴图（Roughness Map）：是一种用于控制物体表面粗糙度的贴图，可以影响模型表面的反射和折射效果。
8. 金属贴图（Metalness Map）：是一种用于控制物体表面金属程度的贴图，可以影响模型表面的反射和折射效果。
9. 环境贴图（Environment Map）：是一种用于模拟物体周围环境的贴图，可以为模型添加反射和折射效果。
10. 光照贴图（Light Map）：是一种用于模拟物体表面光照效果的贴图，可以为模型添加阴影和明暗效果。
11. 环境光遮蔽贴图（Ambient Occlusion Map）：是一种用于模拟物体表面遮蔽效果的贴图，可以为模型添加阴影和明暗效果。
## 原理
1. 灯光颜色的作用原理是灯光颜色和物体颜色去乘积
2. threejs如何判断一个面是正明还是反面? 规定: 看过去的三角形的顶点顺序是逆时针为正面
3. 更改position有时并不会生效, 因为用的可能是matrixworld去设置位置, 所以要先obj.updateMatrix() 再 obj.updateMatrixworld()
4. threejs认识鼠标位置的方式是: 以画布中心点为圆心的单位坐标系
5. group.add的物体位置是相对父级而言的, 而group.attach的物体的位置相对于原点
6. opacity的本质是改    vec4 diffuseColor = vec4( diffuse, opacity );
7. layers.mask 的作用
	1. 例如 mask = 11 （表现为二进制共32位`0000 0000 0000 0000 0000 0000 0000 1011`) 一位代表一个图层
	2. lastLayer.mask >> 某位 !== 0 可以判断某位被使用(即某层被使用)
## 渲染原理
```js
WebGLRenderer.render (three.module.js:29847)  
	projectObject
	renderTransmissionPass
		renderObjects (three.module.js:30180)  
			renderObject (three.module.js:30211)  
				WebGLRenderer.renderBufferDirect (three.module.js:29336)
	renderScene (three.module.js:30031)  
		renderObjects (three.module.js:30180)  
			renderObject (three.module.js:30211)  
				WebGLRenderer.renderBufferDirect (three.module.js:29336)

### `this.renderBufferDirect`
- 功能是将给定的几何体、材质和对象渲染到场景中。
- 负责处理渲染的各种细节，包括设置着色器程序、处理材质、计算绘制范围、选择渲染模式和执行渲染等。
- 
1. **处理场景参数**：
   if ( scene === null ) scene = _emptyScene;
   - 如果传入的 `scene` 参数为 `null`，则使用一个空场景 `_emptyScene`。
2. **确定面朝向**：
   const frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );
   - 计算对象的面朝向，判断其是否为顺时针（CW）方向。
3. **设置着色器程序**：
   const program = setProgram( camera, scene, geometry, material, object );//在此通过gl.shaderSource得到glsl源码
   - 根据相机、场景、几何体、材质和对象设置当前的着色器程序。
4. **设置材质状态**：
   state.setMaterial( material, frontFaceCW );
   - 更新渲染状态以使用指定的材质。
5. **处理索引和绘制范围**：
   let index = geometry.index;
   let rangeFactor = 1;

   if ( material.wireframe === true ) {
       index = geometries.getWireframeAttribute( geometry );
       if ( index === undefined ) return;
       rangeFactor = 2;
   }
   - 根据材质的类型（如线框模式）处理几何体的索引和绘制范围。
6. **计算绘制起始和结束范围**：
   let drawStart = drawRange.start * rangeFactor;
   let drawEnd = ( drawRange.start + drawRange.count ) * rangeFactor;

   // 进一步调整 drawStart 和 drawEnd
   - 计算实际的绘制起始和结束位置，确保它们在有效范围内。
7. **设置绑定状态**：
   bindingStates.setup( object, material, program, geometry, index );
   - 设置与对象、材质和程序相关的绑定状态。
8. **选择渲染器**：
   let renderer = bufferRenderer;

   if ( index !== null ) {
       attribute = attributes.get( index );
       renderer = indexedBufferRenderer;
       renderer.setIndex( attribute );
   }
   - 根据几何体是否有索引来选择合适的渲染器。
9. **设置绘制模式**：
   if ( object.isMesh ) {
       renderer.setMode( material.wireframe === true ? _gl.LINES : _gl.TRIANGLES );
   } else if ( object.isLine ) {
       // 处理线的模式
   } else if ( object.isPoints ) {
       renderer.setMode( _gl.POINTS );
   } else if ( object.isSprite ) {
       renderer.setMode( _gl.TRIANGLES );
   }
   - 根据对象的类型（网格、线、点或精灵）设置渲染模式。
10. **执行渲染**：
    if ( object.isBatchedMesh ) {
        // 处理批量渲染
    } else if ( object.isInstancedMesh ) {
        // 处理实例化渲染
    } else if ( geometry.isInstancedBufferGeometry ) {
        // 处理实例化缓冲几何体
    } else {
        renderer.render( drawStart, drawCount );
    }
    - 根据对象的类型执行相应的渲染操作，包括批量渲染、实例化渲染或普通渲染。
    ```

## 踩坑
1. `THREE.NumberKeyframeTrack( '.material.map.offeset.x',`是不支持的, 只支持两级的属性, 如 `THREE.NumberKeyframeTrack( '.material.opacity`
2. 加载的glb看起来很暗?
	1. 是的，你的理解是正确的。在 `physicallyCorrectLights` 设置为 `false` （默认设置）时，Three.js 会使用一个简化的光照模型。在这个模型中，平行光源（`THREE.DirectionalLight`）的光线强度不会随着距离的增加而衰减。无论光源离物体有多远，光的强度和颜色都保持不变。但是，如果你把 `physicallyCorrectLights` 设为 `true`，Three.js 将使用一个物理光照模型。在这个模型中，光的强度会随着距离的平方增加而减小，这更符合现实世界的光线传播规则。然而，对于平行光源，由于它们模拟的是实际上相当远的光源（例如太阳），因此即使在物理正确的模式下，光强也不会随距离而衰减，因为其光线被视为平行且不衰减。
3. 都已经obj.material.color.clone()了, 为什么颜色还是变得跟原来不一样了?
	1. 在 Three.js 中，多个 Mesh 对象可以共享相同的材质。在这种情况下，如果你改变其中一个 Mesh 对象的材质颜色，那么所有使用这个材质的 Mesh 对象的颜色都将改变，因为它们实际上是引用的同一个 Material 对象。
4. 在同一平面z-fight怎么解决
	1. 在Three.js中，当使用`polygonOffset`, `polygonOffsetFactor`, 和 `polygonOffsetUnits`属性时，底层实际上调用了WebGL的相关API来实现多边形偏移功能。这些API包括：
		1. **`glEnable(GL_POLYGON_OFFSET_FILL)`**: 启用多边形偏移填充。在Three.js中，当你将`polygonOffset`设置为`true`时，这个WebGL状态被启用。这告诉WebGL在进行深度测试之前对多边形的深度值进行偏移。
		2. **`glPolygonOffset(factor, units)`**: 设置多边形偏移的具体参数。在Three.js中，`polygonOffsetFactor`和`polygonOffsetUnits`属性分别对应于这个WebGL函数的`factor`和`units`参数。这个函数决定了深度值的偏移量，其中：
			- `factor`（对应于`polygonOffsetFactor`）：影响深度偏移量与面相对于摄像机视线的角度的关系。
			- `units`（对应于`polygonOffsetUnits`）：向最终的深度值添加一个固定的偏移量。
	2. 简而言之, 设置越小, 越会被优先显示
1. 更改directionalLight.shadow.mapSize是实时生效的吗
	- // 设置新的阴影分辨率 
	  directionalLight.shadow.mapSize.width = 1024; // 新的宽度 
	  directionalLight.shadow.mapSize.height = 1024; // 新的高度 
	  // **强制更新阴影贴图** 
	  directionalLight.shadow.map = null;
1. 机柜一团黑, 加了很多光了也有某些角度是一团黑的
	1. 改色调映射的曝光强度就可以了 toneMappingExposure **但是所有材质的颜色会`*toneMappingExposure的值`如果是线性色调映射的话***
2. 为什么在 `opacity` 为 0 且 `transparent` 为 `false` 的情况下，物体仍然显示出混合背景色的效果?
	1. GPT: 根据最终着色器代码, 即使 `opacity` 为 0，`outgoingLight` 中的任何非零颜色值都可能导致最终的片段颜色不是完全透明的。这可能是物体显示混合背景色的原因，尤其是当存在环境光或其他光源效果时。
	2. 实践是canvas.**getContext("webgl", { alpha: true })** 配置 WebGL 上下文的特性导致的
	3. 另一个根源是机柜网孔贴图网孔的边缘毛刺是透明的, 经测试,只要是贴图的png图片中透明的部分都会与背景混色
3. `OrbitControls` 边缩放边旋转
	1. 新一个 `OrbitControls` 时, 没有调用旧的 `OrbitControls`的 `dispose`方法, 造成监听的方法没有销毁掉, 导致重复执行监听方法
4. 添加带6个材质插槽的立方体
```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x3ec1d3, name: '右' }),  // 右侧
    new THREE.MeshBasicMaterial({ color: 0xf6f7d7, name: '左' }),  // 左侧
    new THREE.MeshBasicMaterial({ color: 0x355c7d, name: '上' }),  // 上面
    new THREE.MeshBasicMaterial({ color: 0x6c5b7b, name: '下' }),  // 下面
    new THREE.MeshBasicMaterial({ color: 0xff165d, name: '前' }),  // 前面
    new THREE.MeshBasicMaterial({ color: 0xff9a00, name: '后' })   // 后面
];

const cube = new THREE.Mesh(geometry, materials);
editor.addObject(cube);
```
1. transmissive 物体的透明度问题
	1. doubleside会有影响
	2. 都是transmissive才会一起比较
2. alphaHash解决透明度问题rr
