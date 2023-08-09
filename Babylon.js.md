### [优化您的场景 | Babylon.js 文档](https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene)
1. **提高渲染效率：**
   - 使用TransformNode替代AbstractMesh或空meshes：减少相机需要检测的对象数量来提升性能。
   - 减少Shaders开销：对于静态材质，你可以通过冻结和解冻材质来控制shader的更新。
   - 减少World Matrices计算：你可以冻结mesh的world matrix来提高性能。
   - 冻结活动meshes：冻结活动meshes可以减少CPU用于确定活动meshes的时间。
   - 减少draw calls：尽可能使用instances，他们只需一次draw call即可。
	   - 包括减少多边形数量、使用实例化来减少绘制调用次数，并合并材质以减少Babylon在每次渲染中需要处理的对象数量(因为gltf一个材质会被拆分为一个单独的对象)。
   - 使用深度预通道：对于复杂场景，使用深度预通道可能很有用。
   - 使用未索引的meshes：当顶点重用率低并且顶点结构相当简单时（像仅有位置和法线），你可能希望展开你的顶点并停止使用索引。
   - 使用Animation Ratio：Babylon.js根据当前帧率处理速度。
   - VR/XR场景的Multiview：当使用Babylon.js与WebVR或WebXR一起使用时，启用Multiview是快速提高渲染速度的方法。
2. **降低CPU和GPU负担：**
   - 不更新边界信息：你可以关闭边界信息同步来加速world matrix的计算。
   - 不在pointer移动时挑选场景：设置scene.skipPointerMovePicking = true可以避免这个过程。
   - 减少对gl.clear()的调用：如果你的场景始终100%被不透明的几何体填充，你可以禁用默认的场景清除行为。
   - 阻止dirty mechanism：默认情况下，场景会在你改变可能影响他们的属性时保持所有材质的更新。
   - 大量meshes的场景的优化选项：如果你的场景中有大量的meshes，你可能需要减少添加/删除这些meshes到/从场景所花费的时间。
3. **改善渲染策略：**
   - 改变Mesh Culling Strategy：Culling是选择是否传递一个mesh到GPU进行渲染的过程。
   - 性能优先模式：从Babylon.js 5.22开始，你现在可以改变场景将如何处理性能，关于向后兼容性和易用性。
4. **处理特殊情况：**
   - 处理WebGL context lost事件：从版本3.1开始，Babylon.js可以处理WebGL context lost事件。
   - 使用EngineInstrumentation和SceneInstrumentation进行性能分析：当你想优化一个场景时，仪表是一个关键工具。