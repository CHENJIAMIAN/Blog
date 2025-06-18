### 来源于Cesium 1.97 发布

CesiumJS 1.97 现已可用。CesiumJS 已经切换到一个新的Model架构来加载 glTF 模型和 tilesets 以启用：
> [CesiumJS 更新日志 1.96 与 1.97 - 新构建工具 esbuild 体验及 Model API 更替完成 - 岭南灯火 - 博客园](https://www.cnblogs.com/onsummer/p/16560461.html)
- 用户定义的 GLSL 着色器通过[`CustomShader`](https://github.com/CesiumGS/cesium/blob/main/Documentation/CustomShaderGuide/README.md)
- **glTF 1.0 版本的支持已移除**，请尽快转换你的数据到 glTF 2.0 版本；
- **glTF 的一项扩展 KHR_techniques_webgl 已移除**，如果你有自定义着色需求，请使用 CustomShader API
- `ModelInstanceCollection`这个私有类使用的 CPU 端实例化技术已移除；(最后一版: [cesium/ModelInstanceCollection.js at 1.96 · CesiumGS/cesium · GitHub](https://github.com/CesiumGS/cesium/blob/1.96/Source/Scene/ModelInstanceCollection.js))
	- [mars3d/ModelCombine](http://mars3d.cn/api/ModelCombine.html#:~:text=%E5%AE%9E%E4%BE%8B%20)依赖于它
	- 1.96还可选的:
```js
//Source\Scene\Cesium3DTileContentFactory.js
if (tileset.enableModelExperimental) {
	  return ModelExperimental3DTileContent.fromI3dm(tileset,tile,resource,arrayBuffer,byteOffset);
}
return new Instanced3DModel3DTileContent(tileset,tile,resource,arrayBuffer,byteOffset);
```

### 可借鉴的源码
#### 找到[vue-vite-cesium-demo/](https://lihanqiang.github.io/vue-vite-cesium-demo/) 可用，包含
	1. 经度、纬度、高度/距离/面积
	2. 生成大量节点/视场分析/扩散培/加载 Tileset/高危报警/动态连线/对空雷达/动态河流/白模建筑/显示卫星/可视域分析/加载 Geojson/加载地形/地面雷达/菲涅尔区/河流淹没/追踪扫描Echarts结合
	3. 天气/雨天/雪天/雾天
	4. 飞行模拟/直飞/绕飞/环飞/
	5. 飞机探测(视频推流)
### 业界
1. [earthsdk digitalCity](http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./earth-digitalCity.html#:~:text=%20v_elevationPos.z%20-%20_baseHeight%3B%20) 176个示例, 包含多个特效案例vue-vite-cesium-demo的Tileset特效根源于它，作者是[在cesiumlab工作的唐晓飞vtxf (Tang Xiaofei)](https://github.com/vtxf) 
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

### 特效参考地址
1. [mars3d-vue-example/map.js at 20011b390505b80445a0ce553745210613311fd1 · marsgis/mars3d-vue-example](https://github.com/marsgis/mars3d-vue-example/blob/20011b390505b80445a0ce553745210613311fd1/src/example/layer-tileset/style/customShader/map.js#L24)
2. [功能示例(Vue版) | Mars3D三维可视化平台 | 火星科技](http://mars3d.cn/editor-vue.html?id=layer-tileset/type/jzw)
	- 动态渐变+动态光环的特效
	- 夜景贴图的特效
	- 色彩动态变化的特效
3. 夜景贴图:http://mars3d.cn/editor-es5.html?id=layer-tileset/style/customShader 
	- 源码: https://github.com/marsgis/mars3d-es5-example/blob/master/example/layer-tileset/style/customShader/map.js
4. [mars3d-vue-example/src/example/graphic/primitive/model/map.js](https://github.com/marsgis/mars3d-link-supermap/blob/master/mars3d-vue-example/src/example/graphic/primitive/model/map.js)
5. 纹理坐标移动成动画
6. 官方的彩色点云波示例

### 管线流动
1. [graphic/primitive/polylineVolume | 火星科技](http://mars3d.cn/editor-vue.html?id=graphic/primitive/polylineVolume)
2. [graphic/primitive/polyline | 火星科技](http://mars3d.cn/editor-vue.html?id=graphic/primitive/polyline)

### 物体边缘高亮闪烁(GPT-4写的)
```js
const customShader = new Cesium.CustomShader({
  uniforms: {
    u_time: {
      value: 0, // 初始时间值
      type: Cesium.UniformType.FLOAT
    }
  },
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        // 法线边缘检测，通过增加梯度计算的尺度来增加轮廓线的粗细
        float edge = length(cross(dFdx(fsInput.attributes.normalEC * 2.0), dFdy(fsInput.attributes.normalEC * 2.0)));

        // 闪烁效果
        float time = mod(u_time, 6.28318); // 2 * PI，保持时间在一个循环内
        float intensity = abs(sin(time)); // 正弦函数闪烁

        // 当检测到边缘时，调整材质颜色来高亮显示
        if (edge > 0.0001) { // 边缘检测阈值，减小这个值可以使轮廓线更粗
            material.emissive = vec3(1.0, 0.5, 0.0) * intensity; // 以橙色高亮边缘
        }
    }
  `,
});

// 更新shader时间
viewer.scene.postUpdate.addEventListener(() => {
  customShader.setUniform('u_time', (Date.now() % 10000) / 1000.0); // 更新时间，取模以防数值过大
});
```

### 官方案例
```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  orderIndependentTranslucency: false,
});

viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
  "2021-11-09T20:27:37.016064475348684937Z"
);

// 模型定位=================================================

const position = Cesium.Cartesian3.fromDegrees(
  -123.0744619,
  44.0503706,
  0
);
const hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
  "north",
  "west"
);

// 自定义着色器定义==========================================
// 拖动鼠标将放大/缩小模型。
const expandModelShader = new Cesium.CustomShader({
  uniforms: {
    // 从最新拖动中心到鼠标的向量
    u_drag: {
      type: Cesium.UniformType.VEC2,
      value: new Cesium.Cartesian2(0.0, 0.0),
    },
  },
  vertexShaderText: `
    // 如果鼠标向右拖动，模型就会变大
// 如果鼠标向左拖动，模型会缩小
    void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput)
    {
        vsOutput.positionMC += 0.01 * u_drag.x * vsInput.attributes.normalMC;
    }
    `,
});

const textureUniformShader = new Cesium.CustomShader({
  uniforms: {
    // 动画经过的时间（以秒为单位）
    u_time: {
      type: Cesium.UniformType.FLOAT,
      value: 0,
    },
    // 用户定义的纹理
    u_stripes: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: new Cesium.TextureUniform({
        url: "../SampleData/cesium_stripes.png",
      }),
    },
  },
  // 将纹理应用到模型，但随着时间的推移稍微移动纹理坐标，以便它具有动画效果。
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec2 texCoord = fsInput.attributes.texCoord_0 + 0.1 * vec2(u_time, 0.0);
        material.diffuse = texture(u_stripes, texCoord).rgb;
    }
    `,
});

// 制作一个棋盘纹理，其 alpha 值随着
// 对角线数
function makeCheckerboardTexture(textureSize) {
  const checkerboard = new Uint8Array(4 * textureSize * textureSize);

  const maxDiagonal = 2 * (textureSize - 1);
  for (let i = 0; i < textureSize; i++) {
    for (let j = 0; j < textureSize; j++) {
      const index = i * textureSize + j;
      // 检查对角线数字的奇偶性会给出棋盘图案。
      const diagonal = i + j;
      if (diagonal % 2 === 0) {
        // 将正方形设置为红色。我们只需要设置红色通道即可！
        checkerboard[4 * index] = 255;
      }
      // 否则我们会将方块设置为黑色。但数组已经
// 初始化为 0，所以这里不需要任何东西。
// 对于 alpha 通道，将对角线数字映射到 [0, 255]
      checkerboard[4 * index + 3] = (255 * diagonal) / maxDiagonal;
    }
  }
  return new Cesium.TextureUniform({
    typedArray: checkerboard,
    width: textureSize,
    height: textureSize,
    // 不要插值，我们想要清晰的棋盘边缘
    minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
    magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST,
  });
}
const checkerboardTexture = makeCheckerboardTexture(8);

// 使用棋盘红色通道作为遮罩
const checkerboardMaskShader = new Cesium.CustomShader({
  uniforms: {
    u_checkerboard: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: checkerboardTexture,
    },
  },
  fragmentShaderText: `  
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec2 texCoord = fsInput.attributes.texCoord_0;
        vec4 checkerboard = texture(u_checkerboard, texCoord);
        material.diffuse = mix(material.diffuse, vec3(0.0), checkerboard.r);
    }
    `,
});

// 颜色像棋盘，但透明度随对角线变化
const checkerboardAlphaShader = new Cesium.CustomShader({
  uniforms: {
    u_checkerboard: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: checkerboardTexture,
    },
  },
  // 该模型通常呈现不透明，因此材质.alpha 将被忽略。
// 此设置强制着色器在半透明通道中渲染。
  translucencyMode: Cesium.CustomShaderTranslucencyMode.TRANSLUCENT,
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec2 texCoord = fsInput.attributes.texCoord_0;
        vec4 checkerboard = texture(u_checkerboard, texCoord);
        material.diffuse = checkerboard.rgb;
        material.alpha = checkerboard.a;
    }
    `,
});

// 使用棋盘在模型上打孔
const checkerboardHolesShader = new Cesium.CustomShader({
  uniforms: {
    u_checkerboard: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: checkerboardTexture,
    },
  },
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        vec2 texCoord = fsInput.attributes.texCoord_0;
        vec4 checkerboard = texture(u_checkerboard, texCoord);
        if (checkerboard.r > 0.0) {
            discard;
        }
    }
    `,
});

// 此示例旨在演示用于定向纹理的约定。 +x 是在右边，+y 是从**下到上**。
// 这是为了与 WebGL 约定保持一致。
//
// 此示例还演示了如何使用不同的像素格式，在本例中为 RGB。
function makeGradientTexture() {
  const size = 256;
  const typedArray = new Uint8Array(3 * size * size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      // 红色沿 +x 方向（向右）增加
      typedArray[3 * index + 0] = j;
      // 绿色沿 +y 方向增加（从下到上）
      typedArray[3 * index + 1] = i;
      // 蓝色为 0，因此被省略。
    }
  }

  return new Cesium.TextureUniform({
    typedArray: typedArray,
    width: size,
    height: size,
    pixelFormat: Cesium.PixelFormat.RGB,
  });
}
const gradientTexture = makeGradientTexture();

// 沿着 UV 坐标为纹理着色。
const gradientShader = new Cesium.CustomShader({
  uniforms: {
    u_gradient: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: gradientTexture,
    },
  },
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        material.diffuse = texture(u_gradient, fsInput.attributes.texCoord_0).rgb;
    }
    `,
});

// 拖动鼠标会修改PBR值
const modifyPbrShader = new Cesium.CustomShader({
  uniforms: {
    // 从最新拖动中心到鼠标的向量
    u_drag: {
      type: Cesium.UniformType.VEC2,
      value: new Cesium.Cartesian2(0.0, 0.0),
    },
  },
  fragmentShaderText: `
    // 单击并拖动以改变 PBR 值
    void fragmentMain(FragmentInput vsInput, inout czm_modelMaterial material)
    {
        float dragDistance = length(u_drag);
        float variation = smoothstep(0.0, 300.0, dragDistance);
    // 变化为镜面高光添加了金色色调
        material.specular = mix(material.specular, vec3(0.8, 0.5, 0.1), variation);
    // 变化使材料更有光泽
        material.roughness = clamp(1.0 - variation, 0.01, 1.0);
    // 变化将一些红色混合到漫反射颜色中
        material.diffuse += vec3(0.5, 0.0, 0.0) * variation;
    }
    `,
});

const pointCloudWaveShader = new Cesium.CustomShader({
  uniforms: {
    // 动画经过的时间（以秒为单位）
    u_time: {
      type: Cesium.UniformType.FLOAT,
      value: 0,
    },
  },
  vertexShaderText: `
    void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput)
    {
    // 该模型的 x 和 y 坐标在 [0, 1] 范围内，可以方便地兼作 UV 坐标。
        vec2 uv = vsInput.attributes.positionMC.xy;
    // 使点云在空间和时间上变化的复杂波浪中波动。幅度基于点云的原始形状（已经是波状表面）。波是相对于模型中心计算的，因此转换为 [0, 1] -> [-1, 1] -> [0, 1]
        float amplitude = 2.0 * vsInput.attributes.positionMC.z - 1.0;
        float wave = amplitude * sin(2.0 * czm_pi * uv.x - 2.0 * u_time) * sin(u_time);
        vsOutput.positionMC.z = 0.5 + 0.5 * wave;
    // 通过改变点的大小使点脉动
        vsOutput.pointSize = 10.0 + 5.0 * sin(u_time);
    }
    `,
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
    // 将点设为圆形而不是方形
        float distance = length(gl_PointCoord - 0.5);
        if (distance > 0.5) {
            discard;
        }
    // 制作一个正弦曲线调色板，该调色板沿波浪的总体方向移动，但速度不同。
// 系数是任意选择的
        vec2 uv = fsInput.attributes.positionMC.xy;
        material.diffuse = 0.2 * fsInput.attributes.color_0.rgb;
        material.diffuse += vec3(0.2, 0.3, 0.4) + vec3(0.2, 0.3, 0.4) * sin(2.0 * czm_pi * vec3(3.0, 2.0, 1.0) * uv.x - 3.0 * u_time);
    }
    `,
});

// 演示=================================================== =============

const models = {
  balloon: "../SampleData/models/CesiumBalloon/CesiumBalloon.glb",
  drone: "../SampleData/models/CesiumDrone/CesiumDrone.glb",
  pawns: "../SampleData/models/CesiumDrone/Pawns.glb",
  milkTruck:
    "../SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
  groundVehicle:
    "../SampleData/models/GroundVehicle/GroundVehicle.glb",
  pointCloudWave:
    "../SampleData/models/PointCloudWave/PointCloudWave.glb",
};

let needsDrag = false;
const demos = [
  {
    text: "Custom Texture",
    onselect: function () {
      selectModel(models.groundVehicle, textureUniformShader);
      needsDrag = false;
    },
  },
  {
    text: "Procedural Texture",
    onselect: function () {
      selectModel(models.balloon, checkerboardMaskShader);
      needsDrag = false;
    },
  },
  {
    text: "Translucent materials",
    onselect: function () {
      selectModel(models.balloon, checkerboardAlphaShader);
      needsDrag = false;
    },
  },
  {
    text: "Use Texture as Mask",
    onselect: function () {
      selectModel(models.balloon, checkerboardHolesShader);
      needsDrag = false;
    },
  },
  {
    text: "Procedural Gradient Texture",
    onselect: function () {
      selectModel(models.balloon, gradientShader);
      needsDrag = false;
    },
  },
  {
    text: "Modify PBR values via Mouse Drag",
    onselect: function () {
      selectModel(models.groundVehicle, modifyPbrShader);
      needsDrag = true;
    },
  },
  {
    text: "Expand Model via Mouse Drag",
    onselect: function () {
      selectModel(models.milkTruck, expandModelShader);
      needsDrag = true;
    },
  },
  {
    text: "Animated Point Cloud",
    onselect: function () {
      selectModel(models.pointCloudWave, pointCloudWaveShader);
      needsDrag = false;
    },
  },
];

async function selectModel(url, customShader) {
  viewer.scene.primitives.removeAll();
  try {
    const model = viewer.scene.primitives.add(
      await Cesium.Model.fromGltfAsync({
        url: url,
        customShader: customShader,
        modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpr,
          Cesium.Ellipsoid.WGS84,
          fixedFrameTransform
        ),
      })
    );

    const removeListener = model.readyEvent.addEventListener(() => {
      viewer.camera.flyToBoundingSphere(model.boundingSphere, {
        duration: 0.0,
      });

      removeListener();
    });
  } catch (error) {
    console.log(`Error loading model: ${error}`);
  }
}
Sandcastle.addToolbarMenu(demos);

// 事件处理程序================================================== =====

const startTime = performance.now();
viewer.scene.postUpdate.addEventListener(function () {
  const elapsedTimeSeconds = (performance.now() - startTime) / 1000;
  textureUniformShader.setUniform("u_time", elapsedTimeSeconds);
  pointCloudWaveShader.setUniform("u_time", elapsedTimeSeconds);
});

let dragActive = false;
const dragCenter = new Cesium.Cartesian2();

viewer.screenSpaceEventHandler.setInputAction(function (movement) {
  if (!needsDrag) {
    return;
  }

  const pickedFeature = viewer.scene.pick(movement.position);
  if (!Cesium.defined(pickedFeature)) {
    return;
  }

  viewer.scene.screenSpaceCameraController.enableInputs = false;

  // 设置新的拖动中心
  dragActive = true;
  movement.position.clone(dragCenter);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

const scratchDrag = new Cesium.Cartesian2();
viewer.screenSpaceEventHandler.setInputAction(function (movement) {
  if (!needsDrag) {
    return;
  }

  if (dragActive) {
    // 获取鼠标相对于屏幕中心的位置
    const drag = Cesium.Cartesian3.subtract(
      movement.endPosition,
      dragCenter,
      scratchDrag
    );

    // 更新制服
    expandModelShader.setUniform("u_drag", drag);
    modifyPbrShader.setUniform("u_drag", drag);
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

viewer.screenSpaceEventHandler.setInputAction(function (movement) {
  if (!needsDrag) {
    return;
  }

  viewer.scene.screenSpaceCameraController.enableInputs = true;

  dragActive = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);


```
