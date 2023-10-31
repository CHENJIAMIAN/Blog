#### [https://juejin.cn/post/7290157103674032182](https://juejin.cn/post/7290157103674032182) 从中可以学习到什么有用的知识点或技巧?
1. 使用Shader实现渐变背景色：文章介绍了如何使用Shader编写渐变色背景的代码，并使用smoothstep函数和UV坐标来实现渐变效果。
2. 利用遮罩纹理创建背景云效果：文章演示了如何使用遮罩纹理和Shader来创建背景云层，并通过采样遮罩纹理的透明度数据来定义颜色和透明度。
3. 实例化网格和渲染优化：文章介绍了如何使用实例化网格（THREE.InstancedMesh）来同时创建大量的网格，并通过同步位置数据来优化渲染性能。
4. 使用噪声生成雾效：文章展示了如何使用噪声函数在Shader中生成雾气的效果，通过调整参数和噪声函数可以实现不同的雾气效果。
5. 后期处理和滤镜效果：文章提到了使用postprocessing库中的辉光滤镜和色调映射滤镜来增强渲染效果。
6. 修改材质的Shader：文章介绍了如何使用three.js的onBeforeCompile方法来修改材质的Shader，以实现自定义的光照效果。
7. [alphardex/kokomi.js: A growing three.js helper library.](https://github.com/alphardex/kokomi.js#shadertoy-integration) 特效很多
	1. 参考了[pmndrs/drei：🥉 react-three-fiber的有用助手](https://github.com/pmndrs/drei)  实现了很多特效, 如[Shaders / MeshReflectorMaterial - Docs ⋅ Storybook](https://drei.pmnd.rs/?path=/docs/shaders-meshreflectormaterial--docs)
8. 