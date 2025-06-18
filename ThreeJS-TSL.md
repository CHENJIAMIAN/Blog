1. **Three.js Shading Language (TSL)的介绍**：
   - Three.js宣布引入了一种新的着色语言，能够生成GLSL和WGSL代码。
2. **背景**：
   - 3D图形在Web上正经历一场革命，从WebGL过渡到更强大的WebGPU。
   - WebGPU利用最新的GPU技术，提供更好的性能。
3. **着色语言的转变**：
   - WebGL使用GLSL编写着色器，而WebGPU需要使用WGSL。
   - 两种语言相似，静态类型，与C语言紧密相关，专注于3D图形的复杂向量计算。
4. **Three.js的更新**：
   - 为了适应WebGPU，Three.js和其他3D图形库正在更新，包括引入新功能。
   - 更新需要重写Three.js材料中的许多现有着色器。
5. **Three.js Shading Language (TSL)的特点**：
   - TSL采用了基于节点的方法，类似于Unreal Engine的Blueprints、Blender和Unity的Shader Graph。
   - 这种方法通过将着色器分解为一系列节点来促进着色器开发，每个节点应用特定效果，可以组合生成最终着色器。
6. **TSL的优势**：
   - TSL的节点本质上是函数，可以被使用、组合和链接以生成最终着色器。
   - TSL自动处理适应不同API的适配，无论是WebGL的GLSL还是WebGPU的WGSL。
7. **实际影响**：
   - 传统自定义着色器涉及繁琐的字符串操作方法，而新系统更加灵活，保持了代码的可读性和可维护性。
   - TSL为3D Web开发开辟了新的可能性，承诺提供更可回收和可管理的代码。
8. **作者的行动计划**：
   - 作者计划进行直播，共同探索这种新方法。
   - 文档目前较少，基于初步规范和用户在X上分享的一些例子。
9. **未来展望**：
   - Three.js的未来看起来非常有希望，新的着色语言系统不仅将改善我们使用Three.js的工作，而且任何需要着色代码的应用程序都可能使用这个新系统。]
---
### Three.js Shading Language (TSL) 笔记
#### 1. 引言与目的
- **Why TSL?**
  - TSL旨在简化着色器的创建过程，使开发者即使没有从头开始编写GLSL代码的经验，也能创建所需的图形效果。
  - TSL的目标是创建一个易于使用的着色器创建环境，同时保持渲染器的通用性，并通过模块化和树摇算法优化性能。
#### 2. 示例
- **细节贴图（Detail Map）**
  - 通过UV缩放和基础纹理的乘法，为游戏内物体表面增加微小细节，如裂缝或凸起。
#### 3. TSL的新旧对比
- **Old Method**
  - 使用`.onBeforeCompile()`方法手动修改GLSL着色器代码，随着代码修改的增加，复杂性迅速上升。
- **New Method**
  - TSL通过节点系统简化了代码编写，无需关心组件创建的顺序，节点系统会自动声明和包含一次。
#### 4. 架构
- **构建过程**
  - 基于三个支柱：设置（setup）、分析（analyze）和生成（generate）。
  - 节点可以有多个输入但总是单个输出，通过分析节点来生成代码片段。
#### 5. 常量与显式转换
- 支持创建常量和显式类型转换，如`float()`, `int()`, `bool()`等。
#### 6. 统一变量（Uniform）
- 用于更新颜色、光照或变换等变量值，无需重新创建着色器程序。
#### 7. 操作符
- 提供了基本的数学操作符，如加（add）、减（sub）、乘（mul）、除（div）等。
#### 8. 函数
- 支持使用传统的JS函数或`tslFn()`接口，后者提供了一个可控环境，允许使用堆栈进行条件赋值。
#### 9. 条件语句
- TSL中的条件语句使用`If`, `elseif`, `else`构建，支持在`tslFn()`中使用。
#### 10. 三元运算符
- 与if-else不同，三元运算符返回一个值，并且可以在`tslFn()`外部使用。
#### 11. 数学函数
- 提供了一系列数学函数，如`abs()`, `acos()`, `all()`, `any()`等。
#### 12. 方法链
- 方法链仅包括操作符、转换器、数学和一些核心函数。
#### 13. 纹理（Texture）
- 提供了从纹理中检索像素值的函数，如`texture()`, `cubeTexture()`等。
#### 14. 属性（Attributes）
- 用于获取几何属性，如`uv()`, `vertexColor()`, `positionGeometry()`等。
#### 15. 位置（Position）
- 描述了与位置相关的属性和变量，如`positionLocal`, `positionWorld`等。
#### 16. 法线（Normal）
- 描述了与法线相关的属性和变量，如`normalLocal`, `normalView`等。
#### 17. 切线与副法线（Tangent & Bitangent）
- 提供了切线和副法线的属性和变量，如`tangentLocal`, `bitangentLocal`等。
#### 18. 相机（Camera）
- 提供了相机相关的属性和变量，如`cameraPosition`, `cameraViewMatrix`等。
#### 19. 模型（Model）
- 描述了模型相关的属性和变量，如`modelPosition`, `modelWorldMatrix`等。
#### 20. 视口（Viewport）
- 提供了视口相关的属性和函数，如`viewportTopLeft`, `viewportResolution`等。
#### 21. 混合模式（Blend Mode）
- 提供了不同的混合模式函数，如`burn()`, `dodge()`, `overlay()`等。
#### 22. 反射（Reflect）
- 提供了计算反射方向的函数，如`reflectView()`, `reflectVector()`等。
#### 23. UV工具（UV Utils）
- 提供了UV相关的工具函数，如`matcapUV()`, `rotateUV()`等。
#### 24. 插值（Interpolation）
- 提供了值的插值函数，如`remap()`, `remapClamp()`等。
#### 25. 随机数（Random）
- 提供了生成随机数的函数，如`hash()`, `range()`等。
#### 26. 振荡器（Oscillator）
- 提供了生成不同波形振荡的函数，如`oscSine()`, `oscSquare()`等。
#### 27. 打包（Packing）
- 提供了方向向量与颜色之间的转换函数，如`directionToColor()`, `colorToDirection()`等。
#### 28. 函数
- 描述了如何使用`.toVar()`和`.varying()`函数来优化计算和创建变量。
#### 29. 从GLSL属性过渡到TSL
- 提供了从GLSL到TSL的属性过渡指南，如`position`到`positionGeometry`等。
#### 30. 附加资源
- 提供了Three.js Shading Language的附加资源链接，如使用SketchUp模型等。