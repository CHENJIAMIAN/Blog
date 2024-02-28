#### [https://juejin.cn/post/7290157103674032182](https://juejin.cn/post/7290157103674032182) 从中可以学习到什么有用的知识点或技巧?
1. 使用Shader实现渐变背景色：文章介绍了如何使用Shader编写渐变色背景的代码，并使用smoothstep函数和UV坐标来实现渐变效果。
2. 利用遮罩纹理创建背景云效果：文章演示了如何使用遮罩纹理和Shader来创建背景云层，并通过采样遮罩纹理的透明度数据来定义颜色和透明度。
3. 实例化网格和渲染优化：文章介绍了如何使用实例化网格（THREE.InstancedMesh）来同时创建大量的网格，并通过同步位置数据来优化渲染性能。
4. 使用噪声生成雾效：文章展示了如何使用噪声函数在Shader中生成雾气的效果，通过调整参数和噪声函数可以实现不同的雾气效果。
5. 后期处理和滤镜效果：文章提到了使用postprocessing库中的辉光滤镜和色调映射滤镜来增强渲染效果。
6. 修改材质的Shader：文章介绍了如何使用three.js的onBeforeCompile方法来修改材质的Shader，以实现自定义的光照效果。
7. [alphardex/kokomi.js: A growing three.js helper library.](https://github.com/alphardex/kokomi.js#shadertoy-integration) 特效很多
	1. 参考了[pmndrs/drei：🥉 react-three-fiber的有用助手](https://github.com/pmndrs/drei)  实现了很多特效, 如[Shaders / MeshReflectorMaterial - Docs ⋅ Storybook](https://drei.pmnd.rs/?path=/docs/shaders-meshreflectormaterial--docs)
		1. 官网 [kokomi-js.vercel.app/lp/](https://kokomi-js.vercel.app/lp/)
		2. 代码 [guohong365/kokomi-playground](https://github1s.com/guohong365/kokomi-playground/blob/HEAD/entries/portfolioPC/frag.glsl#:~:text=portfolioP%20) 100多个shader
		3. 示例 [kokomi.js examples --- kokomi.js ](https://kokomi-playground.vercel.app/entries/#niceTunnel)
		4. https://kokomi-playground.vercel.app/entries/
		- 
		6. https://kokomi-js.vercel.app/examples/#stage
			`assetManager 资产管理器 | base 根据 | cameraControls 相机控制 | caustics 焦散 | center 中心 | component 成分 | contactShadows 联系阴影 | customEffect 自定义效果 | customMesh 自定义网格 | customPoints 自定义积分 | environment 环境 | firstPersonCamera 第一人称相机 | float 漂浮 | gallery 画廊 | glassMaterial 玻璃材质 | GPUComputer GPU计算机 | html | hyperbolicHelicoid 双曲螺旋线 | imagePanorama 图像全景 | infiniteGallery 无限图库 | joystick 操纵杆 | meshReflectorMaterial 网状反光材料 | meshTransmissionMaterial | 网状传输材料 | moji 莫吉 | orthographicCamera 正交相机 | persistenceEffect 持久效应 | raycastSelector 光线投射选择器 | rayMarchingQuad 射线行进四边形 | renderQuad 渲染四边形 | renderTexture 渲染纹理 | screenCamera 屏幕摄像头 | screenQuad 四屏 | shadertoy 沙德玩具 | sparkles 闪闪发光 | sphube 斯普贝 | stage 阶段 | text3D 文本3D | textMesh 文本网格 | thirdPersonCamera 第三人称相机`
		1. https://kokomi-components.vercel.app/#checkerboardText
		2. 
	1. [fragment.glsl - alphardex/threejs-playground - GitHub1s](https://github1s.com/alphardex/threejs-playground/blob/HEAD/src/shaders/noiseWave/fragment.glsl)
	2. https://shadertoy-playground.vercel.app/entries/#burning-flame
		`entries 条目 | burning-flame 燃烧的火焰 | circle-wave 圆波 | cloud 云 | cloudy-sky 多云的天空 | diamond 钻石 | domain-warping 域扭曲 | glass-effect 玻璃效果 | gyroid-ball 陀螺球 | hologram 全息图 | naked-eye 肉眼 | rainbow-ring 彩虹环 | raymarching-intro raymarching 介绍 | refraction 折射 | shader-art-intro 着色器艺术介绍 | the-drive-home 开车回家 |`

1. [stemkoski.github.com/Three.js/js/ParticleEngineExamples.js 大学教授有很多特效](https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/js/ParticleEngineExamples.js)

### 开源的three.js组态编辑器
1. [vis-three/vis-three: A web 3D development framework for assembled based on three.js](https://github.com/vis-three/vis-three) vis-three: 策略设计模式的封装
2. [zhangbo126/Three3d-view：🔥 🎉基于Three3d开发的3D模型可视化编辑系统。 js包含模型加载、模型外部导入、模型背景图、全景图、模型动画、模型光照、模型定位、辅助线、模型发光、模型拖拽、模型拆解、](https://github.com/zhangbo126/Three3d-view)