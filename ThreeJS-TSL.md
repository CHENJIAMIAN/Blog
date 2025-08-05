


Node Material 和 TSL 在中有着密切的关系：

## 核心关系

**NodeMaterial 是基于 TSL 构建的材质系统**。NodeMaterial 作为所有基于节点的材质的基类，广泛使用了 TSL (Three.js Shading Language) 提供的类型和功能。 [1](#0-0) 

## 技术实现

1. **类型系统集成**：NodeMaterial 直接导入并使用 TSL 的基础类型，如 `float`、`vec3`、`vec4`、`bool` 等，这些是构建节点材质的基础构建块。 [1](#0-0) 

2. **材质属性访问**：MaterialNode 类负责创建 TSL 对象来访问材质属性，它使用 TSL 的类型系统来确保类型安全。 [2](#0-1) 

3. **预定义 TSL 对象**：MaterialNode 使用 `nodeImmutable` 函数创建了大量预定义的 TSL 对象，如 `materialColor`、`materialOpacity`、`materialNormal` 等，这些对象可以直接在 NodeMaterial 中使用。 [3](#0-2) 

## TSL 的作用

TSL 是一个完整的着色器语言抽象层，提供了数百个函数和类型，涵盖了从基础数学运算到复杂材质属性的所有功能。 [4](#0-3) 

## 使用模式

在 NodeMaterial 中，开发者可以：
- 使用 TSL 提供的材质访问器来获取当前材质的属性
- 通过节点组合来构建复杂的材质效果
- 利用 TSL 的类型安全特性避免着色器编译错误

## Notes

NodeMaterial 和 TSL 的关系可以理解为：TSL 提供了着色器编程的"语言"和"词汇"，而 NodeMaterial 则是使用这套语言来构建材质的"框架"。这种设计使得 Three.js 的新一代材质系统既保持了灵活性，又提供了类型安全和易用性。

1. **TSL的优势**：
   - TSL的节点本质上是函数，可以被使用、组合和链接以生成最终着色器。
   - TSL自动处理适应不同API的适配，无论是WebGL的GLSL还是WebGPU的WGSL。

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