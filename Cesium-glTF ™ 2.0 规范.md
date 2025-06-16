# glTF ™ 2.0 规范

目录
- [1.前言](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#foreword)
- [2.简介](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction)
  - [2.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-general)
  - [2.2. 文档约定](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-conventions)
    - [2.2.1. 规范术语和参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-normative-terminology)
    - [2.2.2. 信息性语言](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-informative-language)
    - [2.2.3. 技术术语](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-technical-terminology)
    - [2.2.4. 规范性参考文献](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-normative-references)
      - [2.2.4.1. 外型规格](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#external-specifications)
      - [2.2.4.2. 媒体类型注册](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#media-type-registrations)
  - [2.3. 动机和设计目标（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#motivation)
  - [2.4. glTF 基础知识](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#gltf-basics)
  - [2.5. 版本控制](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#versioning)
  - [2.6. 文件扩展名和媒体类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#file-extensions-and-media-types)
  - [2.7. JSON编码](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#json-encoding)
  - [2.8. URIs](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#uris)
- [3.概念](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#concepts)
  - [3.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#concepts-general)
  - [3.2. 资产](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#asset)
  - [3.3. 索引和名称](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#indices-and-names)
  - [3.4. 坐标系和单位](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#coordinate-system-and-units)
  - [3.5. 场景](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#scenes)
    - [3.5.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#scenes-overview)
    - [3.5.2. 节点和层次结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#nodes-and-hierarchy)
    - [3.5.3. 转换](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#transformations)
  - [3.6. 二进制数据存储](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#binary-data-storage)
    - [3.6.1. 缓冲区和缓冲区视图](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#buffers-and-buffer-views)
      - [3.6.1.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#buffers-and-buffer-views-overview)
      - [3.6.1.2. GLB 存储缓冲区](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-stored-buffer)
    - [3.6.2. 配件](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#accessors)
      - [3.6.2.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#accessors-overview)
      - [3.6.2.2. 访问器数据类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#accessor-data-types)
      - [3.6.2.3. 稀疏访问器](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#sparse-accessors)
      - [3.6.2.4。数据对齐](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#data-alignment)
      - [3.6.2.5。访问器边界](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#accessors-bounds)
  - [3.7. 几何学](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#geometry)
    - [3.7.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#geometry-overview)
    - [3.7.2. 网格](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#meshes)
      - [3.7.2.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#meshes-overview)
      - [3.7.2.2. 变形目标](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#morph-targets)
    - [3.7.3. 皮肤](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#skins)
      - [3.7.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#skins-overview)
      - [3.7.3.2. 联合层次结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#joint-hierarchy)
      - [3.7.3.3. 蒙皮网格属性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#skinned-mesh-attributes)
    - [3.7.4. 实例化](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#instantiation)
  - [3.8. 纹理数据](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#texture-data)
    - [3.8.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#texture-data-overview)
    - [3.8.2. 纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#textures)
    - [3.8.3. 图片](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#images)
    - [3.8.4. 采样器](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#samplers)
      - [3.8.4.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#overview)
      - [3.8.4.2。过滤](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#filtering)
      - [3.8.4.3。包装](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#wrapping)
      - [3.8.4.4。例子](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#example)
      - [3.8.4.5。非二次方纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#non-power-of-two-textures)
  - [3.9. 材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#materials)
    - [3.9.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#materials-overview)
    - [3.9.2. 金属粗糙度材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#metallic-roughness-material)
    - [3.9.3. 额外的纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#additional-textures)
    - [3.9.4. 阿尔法覆盖率](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#alpha-coverage)
    - [3.9.5. 两面性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#double-sided)
    - [3.9.6. 默认材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#default-material)
    - [3.9.7. 点线材质](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#point-and-line-materials)
  - [3.10. 相机](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#cameras)
    - [3.10.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#cameras-overview)
    - [3.10.2. 查看矩阵](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#view-matrix)
    - [3.10.3. 投影矩阵](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#projection-matrices)
      - [3.10.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#projection-matrices-overview)
      - [3.10.3.2. 无限透视投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#infinite-perspective-projection)
      - [3.10.3.3. 有限透视投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#finite-perspective-projection)
      - [3.10.3.4。正投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#orthographic-projection)
  - [3.11. 动画](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#animations)
  - [3.12. 指定扩展名](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#specifying-extensions)
- [4. GLB文件格式规范](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)
  - [4.1. 一般（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification-general)
  - [4.2. 结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification-structure)
  - [4.3. 文件扩展名和媒体类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification-file-extension)
  - [4.4. 二进制 glTF 布局](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#binary-gltf-layout)
    - [4.4.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#binary-gltf-layout-overview)
    - [4.4.2. 标头](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#binary-header)
    - [4.4.3. 大块](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#chunks)
      - [4.4.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#chunks-overview)
      - [4.4.3.2. 结构化 JSON 内容](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#structured-json-content)
      - [4.4.3.3. 二进制缓冲区](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#binary-buffer)
- [5.属性参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#properties-reference)
- [6.致谢（信息性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#acknowledgments)
  - [6.1. 编辑部](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#editors)
  - [6.2. Khronos 3D 格式工作组和校友](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#working-group-and-alumni)
  - [6.3. 特别感谢](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#special-thanks)
- [附录 A：JSON 模式参考（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-a-json-schema-reference)
- [附录 B：BRDF 实现](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-b-brdf-implementation)
  - [B.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-b-brdf-implementation-general)
  - [B.2. 材料结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#material-structure)
    - [B.2.1. 金属](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#metals)
    - [B.2.2. 电介质](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#dielectrics)
    - [B.2.3. 微表面](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#microfacet-surfaces)
    - [B.2.4. 完整模型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#complete-model)
  - [B.3. 示例实施（信息性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#implementation)
    - [B.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#implementation-overview)
    - [B.3.2. 高光 BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#specular-brdf)
    - [B.3.3. 漫反射BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#diffuse-brdf)
    - [B.3.4. 菲涅耳](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#fresnel)
    - [B.3.5. 金属 BRDF 和电介质 BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#metal-brdf-and-dielectric-brdf)
    - [B.3.6. 讨论](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#discussion)
      - [B.3.6.1。掩蔽-阴影项和多重散射](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#masking-shadowing-term-and-multiple-scattering)
      - [B.3.6.2。Schlick 的菲涅耳近似](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#schlicks-fresnel-approximation)
      - [B.3.6.3. 耦合漫反射和镜面反射](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#coupling-diffuse-and-specular-reflection)
  - [B.4. 参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#references)
- [附录 C：动画采样器插值模式](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-c-interpolation)
  - [C.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#overview-1)
  - [C.2. 步进插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#step-interpolation)
  - [C.3. 线性插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#interpolation-lerp)
  - [C.4. 球面线性插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#interpolation-slerp)
  - [C.5. 三次样条插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#interpolation-cubic)

|   |   |
|---|---|
|笔记|笔记<br><br>Khronos 发布了 glTF 规范的 AsciiDoc 源代码，以在 CC-BY 4.0 下启用社区反馈和重新混合。规范的发布版本位于[glTF Registry](https://www.khronos.org/registry/glTF)中。|

## [1.前言](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#1-foreword)

版权所有 2013-2021 The Khronos Group Inc.

本规范受版权法保护并包含 Khronos 专有的材料。除非这些条款另有规定，否则未经 Khronos 明确的事先书面许可，不得以任何方式复制、再版、分发、传输、展示、广播或以其他方式利用它或任何组件。

本规范是根据 Khronos 知识产权政策创建的，该政策是 Khronos 集团成员协议的附件 A，可在 [https://www.khronos.org/files/member_agreement.pdf](https://www.khronos.org/files/member_agreement.pdf)获得。Khronos 授予有条件的版权许可，可以出于任何目的使用和复制未修改的规范，无需支付任何费用或版税，但根据这些条款未授予任何专利、商标或其他知识产权的许可。希望实施规范并使用与该实施相关的 Khronos 商标，并根据 Khronos 知识产权政策获得互惠专利许可保护的各方必须根据 Khronos 为本规范定义的流程成为采纳者；看[https://www.khronos.org/conformance/adopters/file-format-adopter-program](https://www.khronos.org/conformance/adopters/file-format-adopter-program)。

本规范的某些部分是非规范性的，因为被明确标识为纯信息性的，并且没有定义合规所需的要求，因此不在本规范的范围之内。

在本规范包括对外部文档的规范性引用的情况下，只有那些外部文档的具体标识的部分和功能在范围内。由非 Khronos 创建的外部文件定义的要求可能包含来自 Khronos 知识产权政策未涵盖的非 Khronos 成员的贡献。

Khronos 不作任何明示或暗示的关于本规范的陈述或保证，包括但不限于：适销性、特定用途的适用性、不侵犯任何知识产权、正确性、准确性、完整性、及时性、和可靠性。在任何情况下，Khronos 或其任何发起人、贡献者或成员，或他们各自的合作伙伴、管理人员、董事、雇员、代理人或代表均不对任何损害承担责任，无论是收入损失、损失损失的直接、间接、特殊或后果性损害由这些材料产生或与之相关的利润或其他。

Khronos® 和 Vulkan® 是注册商标，ANARI™、WebGL™、glTF™、NNEF™、OpenVX™、SPIR™、SPIR‑V™、SYCL™、OpenVG™ 和 3D Commerce™ 是 The Khronos Group Inc. 的商标。 OpenXR™ 是 The Khronos Group Inc. 拥有的商标，并在中国、欧盟、日本和英国注册为商标。OpenCL™ 是 Apple Inc. 的商标，OpenGL® 是注册商标，OpenGL ES™ 和 OpenGL SC™ 徽标是 Hewlett Packard Enterprise 的商标，经 Khronos 许可使用。ASTC 是 ARM Holdings PLC 的商标。所有其他产品名称、商标和/或公司名称仅用于识别并属于其各自所有者。

## [2.简介](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#2-introduction)

### [2.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#21-general)

本文档（以下称为“glTF 规范”或简称“规范”）描述了 glTF 文件格式。

glTF 是一种 API 中立的运行时资产交付格式。glTF 通过为 3D 内容的传输和加载提供高效、可扩展、可互操作的格式，弥合了 3D 内容创建工具与现代图形应用程序之间的差距。

### [2.2. 文档约定](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#22-document-conventions)

glTF 规范旨在供资产导出器或转换器（例如，数字内容创建工具）的实施者和寻求导入或加载 glTF 资产的应用程序开发人员使用，形成这些各方之间互操作性的基础。

规范文本可以针对任何一方；通常，可以从上下文中推断出预期的受众，尽管某些部分被定义为仅针对其中一方。

[规范术语](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#introduction-normative-terminology)定义的任何要求、禁令、建议或选项仅适用于该文本的读者。

#### [2.2.1. 规范术语和参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#221-normative-terminology-and-references)

本文档中的关键字**必须**、**不得**、**要求**、**应**、**不应**、**应该**、**不应该**、**推荐**、 **可以**和**可选**将按照[BCP 14](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#bcp14)中的描述进行解释。

为清楚起见，这些关键词在规范中突出显示。

如果规范使用本节中定义的任何规范性术语来整体或部分引用外部文件或它们的要求，则对外部文件的引用被认为是规范性的。

#### [2.2.2. 信息性语言](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#222-informative-language)

规范中的某些语言纯粹是信息性的，旨在为实施者或开发者提供背景或建议。

如果整个章节或部分仅包含信息性语言，则其标题后缀为“（信息性）”。如果未指定为信息性的，则本文档中的所有章节、部分和附录都是规范性的。

所有注释、实施注释和示例均仅供参考。

#### [2.2.3. 技术术语](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#223-technical-terminology)

glTF 规范使用**轴**、**矩阵**、**矢量等线性代数术语来识别**[国际电工词汇表](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#iev)中定义的某些数学结构及其行为。

glTF 规范使用常见的工程和图形术语，例如**image**、**buffer**、**texture**等来识别和描述某些_glTF_构造及其属性、状态和行为。本节定义了规范上下文中这些术语的基本含义。规范文本提供了更完整的术语定义，并详细阐述、扩展或阐明了这些定义。当本节中定义的术语在规范中以规范语言使用时，规范中的定义支配并取代这些术语在其他技术上下文（即规范之外）中可能具有的任何含义。

*存取器*
描述存储在二进制缓冲区中的数据元素的数量和格式的对象。
*动画片*
描述关键帧数据的对象，包括时间戳和受其影响的目标属性。
*背面*
见朝向。
*缓冲*
表示线性字节数组的外部或嵌入式资源。
*缓冲区视图*
表示特定缓冲区范围的对象，以及控制如何解释缓冲区内容的可选元数据。
*相机*
定义用于渲染场景的投影参数的对象。
*朝向*
根据顶点的方向（缠绕顺序）将三角形分类为正面或背面。
*正面*
见朝向。
*图像*
编码为标准化比特流的二维像素数组，例如[PNG](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#png)。
*索引几何*
使用单独的数据源（索引值）来组装图元拓扑的网格图元。
*线性混合蒙皮*
一种蒙皮方法，将每个顶点的变换矩阵计算为指定节点的变换矩阵的线性加权和。
*材料*
由网格图元表示的真实世界对象的视觉属性的参数化近似。
*网*
网格图元的集合。
*网格图元*
将索引或非索引几何体与材质绑定的对象。
*贴图*
一组图像表示在每个维度上连续减少 2 倍。
*变形目标*
定义为其顶点属性的一组差异值的网格图元的更改状态。
*节点*
定义层次结构关系及其内容的局部转换的对象。
*非索引几何*
使用顶点属性值的线性顺序来组装图元拓扑的网格图元。
*普通的*
定义垂直于表面的单位 XYZ 矢量。
*根节点*
不是任何其他节点的子节点的节点。
*采样器*
控制图像数据采样方式的对象。
*场景*
包含要呈现的根节点列表的对象。
*蒙皮*
为网格图元的每个顶点计算和应用单独变换的过程。
*切线*
定义曲面上的切线方向的单位 XYZ 向量。
*质地*
结合图像及其采样器的对象。
*拓扑类型*
控制顶点如何组装的状态，例如作为三角形列表、线带等。
*顶点属性*
与顶点关联的属性。
*缠绕顺序*
三角形内顶点定义的相对顺序
*包装*
基于归一化纹理坐标选择图像像素的过程。

#### [2.2.4. 规范性参考文献](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#224-normative-references)

本规范的规范性章节引用了下列文件：

##### [2.2.4.1. 外型规格](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#2241-external-specifications)

- Bradner, S.，*RFC 中用于指示要求级别的关键词*，BCP 14，RFC 2119，1997 年 3 月。Leiba, B.，*RFC 2119 关键词中大写与小写的歧义*，BCP 14，RFC 8174，2017 年 5 月。 [https://www.rfc-editor.org/info/bcp14](https://www.rfc-editor.org/info/bcp14)
- IEC 60050-102 *国际电工词汇 (IEV) - 第 102 部分：数学 - 一般概念和线性代数* [https://webstore.iec.ch/publication/160](https://webstore.iec.ch/publication/160)
    IEC 60050-103 *国际电工词汇 (IEV) - 第 103 部分：数学 - 函数* [https://webstore.iec.ch/publication/161](https://webstore.iec.ch/publication/161)

|   |   |
|---|---|
|笔记|笔记<br><br>这些标准的在线版本可在[https://www.electropedia.org/获得](https://www.electropedia.org/)|

- Unicode 联盟，*Unicode 标准* [https://www.unicode.org/versions/latest/](https://www.unicode.org/versions/latest/)
- Bray, T., Ed.，*JavaScript 对象表示法 (JSON) 数据交换格式*，STD 90，RFC 8259，DOI 10.17487/RFC8259，2017 年 12 月，https: [//www.rfc-editor.org/info/rfc8259](https://www.rfc-editor.org/info/rfc8259)
- ISO/IEC 60559 *浮点运算* [https://www.iso.org/standard/80985.html](https://www.iso.org/standard/80985.html)
- ISO/IEC 15948 *便携式网络图形 (PNG)：功能规范* [https://www.iso.org/standard/29581.html](https://www.iso.org/standard/29581.html)

|   |   |
|---|---|
|笔记|笔记<br><br>该标准的免费版本可从 W3C 获得：[https ://www.w3.org/TR/PNG/](https://www.w3.org/TR/PNG/)|

- ISO/IEC 10918-1 *连续色调静止图像的数字压缩和编码：要求和指南* [https://www.iso.org/standard/18902.html](https://www.iso.org/standard/18902.html)

|   |   |
|---|---|
|笔记|笔记<br><br>该标准的早期版本称为 ITU Recommendation T.81，可从 W3C 获得：[https://www.w3.org/Graphics/JPEG/itu-t81.pdf](https://www.w3.org/Graphics/JPEG/itu-t81.pdf)|

- ISO/IEC 10918-5 *连续色调静止图像的数字压缩和编码：JPEG 文件交换格式 (JFIF)* [https://www.iso.org/standard/54989.html](https://www.iso.org/standard/54989.html)

|   |   |
|---|---|
|笔记|笔记<br><br>W3C 提供了该标准的早期版本：[https ://www.w3.org/Graphics/JPEG/jfif3.pdf](https://www.w3.org/Graphics/JPEG/jfif3.pdf)|

- CIPA DC-008-Translation-2019 *用于数码相机的可交换图像文件格式* [https://www.cipa.jp/std/documents/download_e.html?DC-008-Translation-2019-E](https://www.cipa.jp/std/documents/download_e.html?DC-008-Translation-2019-E)
- Masinter, L.，*“数据”URL 方案*，RFC 2397，DOI 10.17487/RFC2397，1998 年 8 月，https: [//www.rfc-editor.org/info/rfc2397](https://www.rfc-editor.org/info/rfc2397)
- Berners-Lee, T.、Fielding, R. 和 L. Masinter，*统一资源标识符 (URI)：通用语法*，STD 66，RFC 3986，DOI 10.17487/RFC3986，2005 年 1 月，[https://www.rfc-editor .org/info/rfc3986](https://www.rfc-editor.org/info/rfc3986)
- Duerst, M. 和 M. Suignard，*国际化资源标识符 (IRI)*，RFC 3987，DOI 10.17487/RFC3987，2005 年 1 月，https: [//www.rfc-editor.org/info/rfc3987](https://www.rfc-editor.org/info/rfc3987)
- Fielding, R., Ed. 和 J. Reschke, Ed.，*超文本传输​​协议 (HTTP/1.1)：消息语法和路由*，RFC 7230，DOI 10.17487/RFC7230，2014 年 6 月，[https://www.rfc-editor .org/info/rfc7230](https://www.rfc-editor.org/info/rfc7230)
- IEC 61966-2-1 *默认 RGB 色彩空间 - sRGB* [https://webstore.iec.ch/publication/6169](https://webstore.iec.ch/publication/6169)

|   |   |
|---|---|
|笔记|笔记<br><br>sRGB 的编码特性可从 ICC 免费获得：[https ://www.color.org/chardata/rgb/srgb.xalter](https://www.color.org/chardata/rgb/srgb.xalter)|

- ITU-R BT.709-6 建议书_用于制作和国际节目交换的 HDTV 标准的参数值_ [https://www.itu.int/rec/R-REC-BT.709-6-201506-I](https://www.itu.int/rec/R-REC-BT.709-6-201506-I)
- *MikkTSpace* [https://github.com/mmikk/MikkTSpace](https://github.com/mmikk/MikkTSpace)
- 托马斯·波特和汤姆·达夫。1984._合成数字图像。_SIGGRAPH 计算机。图形。18, 3（1984 年 7 月），253–259。DOI：[https://doi.org/10.1145/964965.808606](https://doi.org/10.1145/964965.808606)

|   |   |
|---|---|
|笔记|笔记<br><br>Pixar 提供了本文的免费版本：[https ://graphics.pixar.com/library/Compositing/](https://graphics.pixar.com/library/Compositing/)|

##### [2.2.4.2. 媒体类型注册](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#2242-media-type-registrations)

- IANA。 *模型/gltf+json 媒体类型*。 [https://www.iana.org/assignments/media-types/model/gltf+json](https://www.iana.org/assignments/media-types/model/gltf+json)
- IANA。 *模型/gltf-二进制媒体类型*。 [https://www.iana.org/assignments/media-types/model/gltf-binary](https://www.iana.org/assignments/media-types/model/gltf-binary)
- IANA。 *应用程序/gltf-buffer 媒体类型*。 [https://www.iana.org/assignments/media-types/application/gltf-buffer](https://www.iana.org/assignments/media-types/application/gltf-buffer)
- IANA。 *应用程序/八位字节流媒体类型*。 [https://www.iana.org/assignments/media-types/application/octet-stream](https://www.iana.org/assignments/media-types/application/octet-stream)
- Freed, N. 和 N. Borenstein，*多用途互联网邮件扩展 (MIME) 第二部分：媒体类型*，RFC 2046，DOI 10.17487/RFC2046，1996 年 11 月，https: [//www.rfc-editor.org/info/rfc2046](https://www.rfc-editor.org/info/rfc2046)
- IANA。 *图片/png 媒体类型*。 [https://www.iana.org/assignments/media-types/image/png](https://www.iana.org/assignments/media-types/image/png)

### [2.3. 动机和设计目标（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#23-motivation-and-design-goals-informative)

glTF 是一种开放式可互操作的 3D 资产“传输”格式，它在运行时紧凑且高效地处理和渲染。glTF 2.0 被设计为与供应商和运行时无关，可用于各种本地和基于 Web 的引擎和应用程序，而不管底层平台和 3D 图形 API。

glTF 对运行时效率的关注是与典型的 3D“创作”格式不同的设计目标。创作格式通常更冗长，处理开销更高，以承载迭代设计完成后不再需要的创作数据。glTF 是对创作格式的补充，提供了一个通用的、可互操作的提炼目标，用于向广大最终用户发布 3D 资产。

glTF 的主要目标是可部署在广泛的设备和平台上，包括处理和内存资源有限的 Web 和移动设备。glTF 可以进化，以跟上随着时间的推移不断增长的计算能力。这有助于就可普遍使用的 3D 功能（包括基于物理的渲染）形成广泛的行业共识。

glTF 将易于解析的 JSON 场景描述与一个或多个表示几何、动画和其他丰富数据的二进制资源相结合。这些二进制资源通常可以直接加载到 GPU 缓冲区中，无需额外的解析或处理，将完整分层场景、节点、网格、相机、材质和动画的忠实保存与高效交付和快速加载相结合。

glTF 旨在实现以下目标：

- **紧凑的文件大小。** 纯文本 glTF JSON 文件描述紧凑且解析迅速。所有大数据，如几何、纹理和动画都存储在二进制文件中，这些文件比等效的文本表示小得多。
- **运行时独立性。** glTF 纯粹是一种资产格式，不要求任何运行时行为。这使得任何应用程序都可以出于任何目的使用它，包括使用任何渲染技术进行显示，直至并包括路径跟踪渲染器。
- **完整的 3D 场景表示。** 不限于单个对象，glTF 可以表示整个场景，包括节点、变换、变换层次结构、网格、材质、相机和动画。
- **可扩展性。** glTF 是完全可扩展的，支持添加通用和特定于供应商的扩展，包括几何和纹理压缩。可以考虑将广泛采用的扩展集成到 glTF 规范的未来版本中。

以下内容不在 glTF 2.0 的范围内：

- **glTF 不是流媒体格式。** glTF 中的二进制数据本质上是可流式传输的，缓冲区设计允许增量获取数据，但 glTF 2.0 中没有其他流式结构。
- **glTF 不是创作格式。** glTF 故意不保留 3D 创作信息，以保持运行时效率，但是 glTF 文件可能会被 3D 创作工具摄取以进行重新混合。
- **glTF 并不是为了人类可读的，** 尽管由于以 JSON 表示，它对开发人员友好。

### [2.4. glTF 基础知识](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#24-gltf-basics)

glTF 资产表示为：

- 一个 JSON 格式的文件 ( .gltf )，包含完整的场景描述：节点层次结构、材质、相机，以及网格、动画和其他构造的描述符信息。
- 包含几何、动画和其他基于缓冲区的数据的二进制文件 ( .bin )。
- 包含纹理图像的图像文件（.jpg、.png）。

二进制和图像资源也**可以使用**[数据 URI](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#data-uri)直接嵌入到 JSON 中，或者与 JSON 一起存储在[GLB](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)容器中。

有效的 glTF 资产**必须**指定其版本。

### [2.5. 版本控制](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#25-versioning)

对次要版本中的 glTF 规范所做的任何更新都**必须**向后和向前兼容。向后兼容性意味着任何支持加载 glTF 2.x 资产的客户端实现也将能够加载 glTF 2.0 资产。向前兼容性意味着仅支持 glTF 2.0 的客户端实现可以加载 glTF 2.x 资产，同时优雅地忽略它不理解的任何新功能。

次要版本更新**可以**引入新功能，但**不得**更改任何以前存在的行为。现有功能**可以**在次要版本更新中弃用，但**不得**删除。

主要版本更新**可能**与以前的版本不兼容。

### [2.6. 文件扩展名和媒体类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#26-file-extensions-and-media-types)

- [JSON](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#json) glTF 文件**应该**使用.gltf扩展名和[model/gltf+json](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#gltf-json)媒体类型。
- [存储在GLB](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)容器中的 glTF 文件**应该**使用.glb扩展名和[model/gltf-binary](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#gltf-binary)媒体类型。

- 表示二进制缓冲区的文件**应该**使用：
  - .bin文件扩展名，媒体类型为[application/octet-stream ；](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#octet-stream)
  - .bin、.glbin或.glbuf文件扩展名为[application/gltf-buffer](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#gltf-buffer)媒体类型。

- [PNG](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#png)图像**应该**使用.png文件扩展名和[image/png](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#image-png)媒体类型；
  - PNG 图像**不应**包含动画、非正方形像素比率或嵌入的 ICC 配置文件。此类功能（如果存在）**必须**被客户端实现忽略。
  
- [JPEG](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#jpeg)图像**应该**使用.jpeg或.jpg文件扩展名和[image/jpeg](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#image-jpeg)媒体类型
  - JPEG 图像**必须与**[JPEG 文件交换格式](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#jfif)兼容。
  - JPEG 图像**不应**包含嵌入式 ICC 配置文件。如果存在，嵌入式 ICC 配置文件**必须**被客户端实现忽略。
  - 客户端实现**可能会忽略**[可交换图像文件格式 (Exif)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#exif)块。

|   |   |
|---|---|
|笔记|实施说明<br><br>某些 Exif 块，例如“方向”，可能会严重影响资产的可移植性。|

### [2.7. JSON编码](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#27-json-encoding)

尽管 glTF 规范没有定义[JSON](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#json)格式的任何子集，但实现**应该**知道它可能影响资产互操作性的特殊属性。

1. glTF JSON 数据**应该**使用没有 BOM 的 UTF-8 编码编写。当 glTF 实现不控制字符串编码时，不应用此要求。glTF 实现**应该**遵守[RFC 8259](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#json)的第 8.1 节。关于处理 BOM 的存在。
2. 存储在 glTF JSON 中的 ASCII 字符**应该**在没有 JSON 转义的情况下写入。

|   |   |
|---|---|
|笔记|例子<br><br>“缓冲区”而不是`"\u0062\u0075\u0066\u0066\u0065\u0072"`.|

3. 存储在 glTF JSON 中的非 ASCII 字符**可能**会被转义。
例子: 这两个示例表示相同的 glTF JSON 数据。
```js
{
    "asset": {
        "version": "2.0"
    },
    "nodes": [
        {
            "name": "куб"
        },
        {
            "name": "立方體"
        }
    ]
}
```

```js
{
    "asset": {
        "version": "2.0"
    },
    "nodes": [
        {
            "name": "\u043a\u0443\u0431"
        },
        {
            "name": "\u7acb\u65b9\u9ad4"
        }
    ]
}
```

4. JSON 对象中的属性名称（键）**应该**是唯一的。glTF 客户端实现**应该**覆盖相同键的词法前面的值。
5. 某些 glTF 属性在架构中定义为整数。这些值**可以**存储为小数部分为零的小数或使用指数表示法。无论编码如何，此类属性**不得**包含任何非零小数值。

|   |   |
|---|---|
|笔记|例子<br><br>100、100.0和1e2表示相同的值。有关详细信息，请参阅[RFC 8259 的第 6 节。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#json)|

6. 非整数数字**应该**以在这些数字被读回时保留原始值的方式写入，即它们**不应该**被 JSON 序列化/反序列化往返更改。

|   |   |
|---|---|
|笔记|实施说明<br><br>这通常是通过通用 JSON 库使用的 Grisu2 等算法实现的。|

### [2.8. URIs](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#28-uris)

glTF 资产使用[URI](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#uri)或[IRI](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#iri)来引用缓冲区和图像资源。资产**可能**至少包含以下两种 URI 类型：

- 按照[RFC 2397的定义，将二进制资源嵌入到 glTF JSON 中的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#data-uri)**数据 URI**。数据 URI 的媒体类型字段**必须**与编码内容相匹配。

|   |   |
|---|---|
|笔记|实施说明<br><br>数据 URI 中使用的 Base64 编码将有效负载的字节长度增加了 33%。|

- **相对路径** —  [RFC 3986](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#uri)第 4.2 节或[RFC 3987](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#iri)第 2.2 节定义的path-noscheme或ipath-noscheme — 没有方案、权限或参数。[保留字符（由RFC 3986](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#uri)的第 2.2 节和[RFC 3987](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#iri)的第 2.2 节定义）**必须**采用百分比编码。

具有非 ASCII 字符的路径**可以**按原样编写，使用 JSON 字符串转义或使用百分比编码；所有这些选项都有效。例如，以下三个路径指向同一个资源：

```js
{
    "images": [
        {
            "uri": "grande_sphère.png"
        },
        {
            "uri": "grande_sph\u00E8re.png"
        },
        {
            "uri": "grande_sph%C3%A8re.png"
        }
    ]
}
```

客户端实现**可以**选择性地支持额外的 URI 组件。例如<http://或file://方案、权限、主机名、绝对路径以及查询或片段参数。包含这些附加> URI 组件的资产的可移植性较差。

|   |   |
|---|---|
|笔记|实施说明<br><br>这允许应用程序决定交付的最佳方法：如果不同的资产共享许多相同的几何图形、动画或纹理，则可能首选单独的文件以减少请求的数据总量。使用单独的文件，应用程序可以逐步加载数据并且不需要为不可见的模型部分加载数据。如果一个应用程序更关心单文件部署，嵌入数据可能是首选，即使它由于 base64 编码增加了整体大小并且不支持渐进式或按需加载。或者，资产可以使用 GLB 容器将 JSON 和二进制数据存储在一个文件中，无需 base64 编码。有关详细信息，请参阅[GLB 文件格式规范](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)。|

URI**应该**按照[RFC 3986](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#uri)的第 6.2.2 节、[RFC 3987](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#iri)的第 5.3.2 节和适用的模式规则（例如，[RFC 7230](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#http)的第 2.7.3 节用于 HTTP）在导出和/或导入时进行基于语法的规范化。

|   |   |
|---|---|
|笔记|实施说明<br><br>虽然该规范没有明确禁止非规范化 URI，但在某些平台上，它们的使用可能不受支持或导致不需要的副作用，例如安全警告或缓存未命中。|

## [3.概念](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3-concepts)

### [3.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#31-general)

下图显示了 glTF 资产中顶级数组之间的关系。请参阅[属性参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#properties-reference)。

[![对象](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/objects.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/objects.svg)

图 1. glTF 对象层次结构

### [3.2. 资产](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#32-asset)

每个 glTF 资产**必须**有一个资产属性。资产对象**必须**包含指定资产的目标 glTF 版本的版本属性。此外，可选的minVersion属性**可**用于指定加载资产所需的最低 glTF 版本支持。minVersion属性允许资产创建者指定客户端实现**必须**支持的最低版本以加载资产。[这与第 3.12 节](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#specifying-extensions)中描述的extensionsRequired概念非常相似，其中资产**不应该**如果客户端不支持指定的扩展，则加载。额外的元数据**可以**存储在可选属性中，例如generator或copyright。例如，

```js
{
    "asset": {
        "version": "2.0",
        "generator": "collada2gltf@f356b99aef8868f74877c7ca545f2cd206b9d3b7",
        "copyright": "2017 (c) Khronos Group"
    }
}
```

|   |   |
|---|---|
|笔记|实施说明<br><br>客户端实现应首先检查是否指定了minVersion属性，并确保可以支持主要版本和次要版本。如果未指定minVersion ，则客户端应检查版本属性并确保支持主要版本。加载[GLB 格式](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)的客户端还应检查JSON 块中的minVersion和版本属性，因为 GLB 标头中指定的版本仅指 GLB 容器版本。|

### [3.3. 索引和名称](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#33-indices-and-names)

glTF 资产的实体由它们在相应数组中的索引引用，例如，bufferView通过在缓冲区数组中指定缓冲区的索引来引用缓冲区。例如：

```js
{
    "buffers": [
        {
            "byteLength": 1024,
            "uri": "path-to.bin"
        }
    ],
    "bufferViews": [
        {
            "buffer": 0,
            "byteLength": 512,
            "byteOffset": 0
        }
    ]
}
```

在本例中，buffers和bufferViews数组各只有一个元素。bufferView 使用缓冲区的索引引用缓冲区："buffer": 0。

索引**必须**是非负整数。索引**必须**始终指向现有元素。

索引用于内部 glTF 引用，而可选_名称_用于特定于应用程序的用途，例如显示。为此，任何顶级 glTF 对象都**可以**具有名称字符串属性。不保证这些属性值是唯一的，因为它们旨在包含创作资产时创建的值。

对于属性名称，glTF 通常使用驼峰式大小写，例如 This。

### [3.4. 坐标系和单位](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#34-coordinate-system-and-units)

glTF 使用右手坐标系。glTF 定义 +Y 向上，+Z 向前，-X 向右；glTF 资产的正面朝向 +Z。

[![坐标系](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/coordinate-system.png)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/coordinate-system.png)

图 2. glTF 坐标系方向

所有直线距离的单位都是米。

所有角度都以弧度为单位。

正向旋转是逆时针方向。

红色、绿色和蓝色原色使用[ITU-R BT.709 推荐](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#bt709)色度坐标。

|   |   |
|---|---|
|笔记|实施说明<br><br>色度坐标定义了颜色模型的每个原色通道的解释。在典型显示器的上下文中，原色描述了红色、绿色和蓝色荧光粉或滤光片的颜色。除非明确使用宽色域输出，否则客户端实现通常不需要转换颜色。未来的规范版本或扩展可能允许其他颜色原色（例如 P3）。|

### [3.5. 场景](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#35-scenes)

#### [3.5.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#351-overview)

glTF 2.0 资产**可能**包含零个或多个_场景_，一组要渲染的视觉对象。场景在场景数组中定义。scene.nodes数组中列出的所有节点**必须**是根节点，即它们**不得**列在任何节点的node.children数组中。同一个根节点**可以**出现在多个场景中。

一个额外的根级属性，场景（注意单数），标识数组中的哪些场景**应该**在加载时显示。当场景未定义时，客户端实现**可能会**延迟渲染，直到请求特定场景。

不包含任何场景的 glTF 资产**应该**被视为单个实体（例如材质或网格）的库。

以下示例定义了一个 glTF 资产，该资产具有包含单个节点的单个场景。

```js
{
    "nodes": [
        {
            "name": "singleNode"
        }
    ],
    "scenes": [
        {
            "name": "singleScene",
            "nodes": [
                0
            ]
        }
    ],
    "scene": 0
}
```

#### [3.5.2. 节点和层次结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#352-nodes-and-hierarchy)

glTF 资产**可以**定义_节点_，即包含要渲染的场景的对象。

节点**可以**具有转换属性，如后所述。

节点以父子层次结构组织，非正式地称为_节点层次结构_。没有父节点的节点称为根节点_。_

节点层次结构**必须**是一组不相交的严格树。也就是说，节点层次结构**不得**包含循环，并且每个节点**必须**具有零个或一个父节点。

节点层次结构是使用节点的子属性定义的，如以下示例所示：

```js
{
    "nodes": [
        {
            "name": "Car",
            "children": [1, 2, 3, 4]
        },
        {
            "name": "wheel_1"
        },
        {
            "name": "wheel_2"
        },
        {
            "name": "wheel_3"
        },
        {
            "name": "wheel_4"
        }
    ]
}
```

名为Car 的节点有四个子节点。这些节点中的每一个又可以有自己的子节点，从而创建一个节点层次结构。

#### [3.5.3. 转换](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#353-transformations)

任何节点都**可以通过提供**矩阵属性或任何translation、rotation和scale 属性（也称为_TRS 属性_）来定义局部空间变换。translation和scale是局部坐标系中的 3D 矢量。rotation是局部坐标系中的单位四元数 XYZW，其中 W 是SCALAR。

定义矩阵时，它**必须**可分解为 TRS 属性。

|   |   |
|---|---|
|笔记|实施说明<br><br>变换矩阵不能倾斜或剪切。|

当一个节点是动画的目标时（由animation.channel.target引用），只有 TRS 属性**可以**存在；矩阵 **不得**存在。

要组成局部变换矩阵，**必须**将 TRS 属性转换为矩阵并按T *R* S顺序进行后乘；首先将比例应用于顶点，然后是旋转，然后是平移。

|   |   |
|---|---|
|笔记|实施说明<br><br>不可逆变换（例如，将一个轴缩放为零）可能会导致照明和/或可见性伪影。|

|   |   |
|---|---|
|笔记|实施说明<br><br>当所有三个轴上的比例均为零（通过节点变换或通过动画比例）时，实现可以自由优化节点网格以及节点的所有子网格的渲染。这提供了一种动画可见性的机制。蒙皮网格不得使用此优化，除非蒙皮中的所有关节同时缩放为零。|

节点的全局变换矩阵是其父节点的全局变换矩阵与其自身局部变换矩阵的乘积。当节点没有父节点时，其全局变换矩阵与其局部变换矩阵相同。

在下面的示例中，名为Box 的节点定义了非默认旋转和平移。

```js
{
    "nodes": [
        {
            "name": "Box",
            "rotation": [
                0,
                0,
                0,
                1
            ],
            "scale": [
                1,
                1,
                1
            ],
            "translation": [
                -17.7082,
                -11.4156,
                2.0922
            ]
        }
    ]
}
```

下一个示例使用matrix属性而不是使用单独的 TRS 值定义带有附加摄像头的节点的变换：

```js
{
    "nodes": [
        {
            "name": "node-camera",
            "camera": 1,
            "matrix": [
                -0.99975,
                -0.00679829,
                0.0213218,
                0,
                0.00167596,
                0.927325,
                0.374254,
                0,
                -0.0223165,
                0.374196,
                -0.927081,
                0,
                -0.0115543,
                0.194711,
                -0.478297,
                1
            ]
        }
    ]
}
```

### [3.6. 二进制数据存储](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#36-binary-data-storage)

#### [3.6.1. 缓冲区和缓冲区视图](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#361-buffers-and-buffer-views)

##### [3.6.1.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3611-overview)

缓冲区是存储为二进制 blob 的任意数据**。**缓冲区**可以**包含几何、动画、皮肤和图像的任意组合。

二进制 blob 允许高效地创建 GPU 缓冲区和纹理，因为它们不需要额外的解析，除了解压缩。

glTF 资产**可以**有任意数量的缓冲资源。缓冲区在资产的缓冲区数组中定义。

虽然缓冲区大小没有硬性上限，但 glTF 资产**不应**使用大于 2 53字节的缓冲区，因为某些 JSON 解析器可能无法正确解析其byteLength 。存储为[GLB二进制块的缓冲区具有 2](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification) 32 -1 字节的隐式限制。

本规范中定义的所有缓冲区数据（即几何属性、几何索引、稀疏访问器数据、动画输入和输出、反向绑定矩阵）**必须**使用小端字节序。

以下示例定义了一个缓冲区。byteLength属性指定缓冲区文件的大小。uri属性是缓冲区数据的 URI 。

```js
{
   "buffers": [
       {
           "byteLength": 102040,
           "uri": "duck.bin"
       }
   ]
}
```

引用资源的字节长度**必须**大于或等于buffer.byteLength属性。

缓冲区数据也**可以通过**data: URI 和 base64 编码嵌入到 glTF 文件中。当data: URI 用于缓冲区存储时，其媒体类型字段**必须**设置为application/octet-stream或application/gltf-buffer。

_缓冲区视图_表示缓冲区中的连续数据段，由 byteOffset属性指定的缓冲区中的字节偏移量和缓冲区视图的byteLength属性指定的总字节长度定义。

用于图像、顶点索引、顶点属性或逆绑定矩阵的缓冲区视图**必须**只包含一种数据，即同一个缓冲区视图**不得同时**用于顶点索引和顶点属性。

当顶点索引或属性访问器使用缓冲区视图时，它**应该**指定bufferView.target分别具有_元素数组缓冲区_或_数组缓冲区_的值。

|   |   |
|---|---|
|笔记|实施说明<br><br>这允许客户端实现尽早将每个缓冲区视图指定给适当的处理步骤，例如，具有顶点索引和属性的缓冲区视图将被复制到适当的 GPU 缓冲区，而具有图像数据的缓冲区视图将被传递到特定格式的图像解码器。|

bufferView.target值使用[属性参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#_bufferview_target)中定义的整数枚举。

下面的示例定义了两个缓冲区视图：第一个包含索引三角形集的索引，第二个包含三角形集的顶点数据。

```js
{
    "bufferViews": [
        {
            "buffer": 0,
            "byteLength": 25272,
            "byteOffset": 0,
            "target": 34963
        },
        {
            "buffer": 0,
            "byteLength": 76768,
            "byteOffset": 25272,
            "byteStride": 32,
            "target": 34962
        }
    ]
}
```

当缓冲区视图用于顶点属性数据时，它**可能**具有byteStride属性。此属性定义每个顶点之间的步幅（以字节为单位）。具有其他类型数据的缓冲区视图**不得**未定义byteStride（除非扩展明确启用了此类布局）。

缓冲区和缓冲区视图不包含类型信息。它们只是定义用于从文件中检索的原始数据。glTF 资产（网格、皮肤、动画）中的对象通过**访问器**访问缓冲区或缓冲区视图。

##### [3.6.1.2. GLB 存储缓冲区](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3612-glb-stored-buffer)

glTF 资产**可以**使用 GLB 文件容器将 glTF JSON 和一个 glTF 缓冲区打包到一个文件中。此类缓冲区的数据通过 GLB 存储的BIN块提供。

具有由 GLB 存储的BIN块提供的数据的缓冲区**必须是**缓冲区数组的第一个元素，并且它**必须**具有未定义的buffer.uri属性。当存在这样的缓冲区时，**必须**存在BIN块。

任何具有未定义的buffer.uri属性且不是缓冲区数组的第一个元素的 glTF 缓冲区都不会引用 GLB 存储的 BIN 块，并且此类缓冲区的行为未定义以适应未来的扩展和规范版本。

BIN块的字节长度最多**可以**比 JSON 定义的buffer.byteLength值大 3 个字节以满足 GLB 填充要求。

|   |   |
|---|---|
|笔记|实施说明<br><br>不要求块和缓冲区的长度严格相等稍微简化了 glTF 到 GLB 的转换：buffer.byteLength在应用 GLB 填充后不需要更新。|

在下面的示例中，第一个缓冲区对象引用 GLB 存储的数据，而第二个指向外部资源：

```js
{
    "buffers": [
        {
            "byteLength": 35884
        },
        {
            "byteLength": 504,
            "uri": "external.bin"
        }
  ]
}
```

[有关GLB 文件格式的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-file-format-specification)详细信息，请参阅GLB 文件格式规范。

#### [3.6.2. 配件](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#362-accessors)

##### [3.6.2.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3621-overview)

网格、皮肤和动画的所有二进制数据都存储在缓冲区中并通过访问器检索。

访问_器_定义了一种方法，用于从缓冲区视图中将数据检索为类型化数组。访问器指定组件类型（例如_float_）和数据类型（例如3D 向量的VEC3），当它们组合在一起时定义每个数据元素的完整数据类型。使用count属性指定元素的数量。元素可以是例如顶点索引、顶点属性、动画关键帧等。

byteOffset属性指定第一个数据元素在引用的缓冲区视图中的位置。如果访问器用于顶点属性（即，它被网格基元或其变形目标引用），则后续数据元素的位置由 bufferView.byteStride 属性控制。如果访问器用于任何其他类型的数据（顶点索引、动画关键帧等），其数据元素将被紧密打包。

所有访问器都存储在资产的访问器数组中。

以下示例显示了两个访问器，第一个是用于检索基元索引的SCALAR访问器，第二个是用于检索基元位置数据的 3 浮点分量向量访问器。

```js
{
    "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5123,
            "count": 12636,
            "max": [
                4212
            ],
            "min": [
                0
            ],
            "type": "SCALAR"
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5126,
            "count": 2399,
            "max": [
                0.961799,
                1.6397,
                0.539252
            ],
            "min": [
                -0.692985,
                0.0992937,
                -0.613282
            ],
            "type": "VEC3"
        }
    ]
}
```

##### [3.6.2.2. 访问器数据类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3622-accessor-data-types)

|组件类型|数据类型|签|位|
|---|---|---|---|
|5120|*有符号字节*|有符号，二进制补码|8个|
|5121|*无符号字节*|未签名|8个|
|5122|*签短*|有符号，二进制补码|16|
|5123|*无符号短*|未签名|16|
|5125|*无符号整数*|未签名|32|
|5126|*float*|签|32|

不支持带符号的 32 位整数组件。

浮点数据**必须**使用[IEEE-754](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#ieee-754)单精度格式。

**不得**存在NaN、+Infinity和-Infinity 的值。

|类型|组件数量|
|---|---|
|“SCALAR”|1个|
|“VEC2”|2个|
|“VEC3”|3个|
|“VEC4”|4个|
|“MAT2”|4个|
|“MAT3”|9|
|“MAT4”|16|

元素大小（以字节为单位）为 `(size in bytes of the 'componentType') * (number of components defined by 'type')`.

例如：
```js
{
    "accessors": [
        {
            "bufferView": 1,
            "byteOffset": 7032,
            "componentType": 5126,
            "count": 585,
            "type": "VEC3"
        }
    ]
}
```

在此访问器中，componentType为5126 ( *float* )，因此每个组件为四个字节。类型是" VEC3"，所以有三个组件。每个元素的大小为 12 个字节 ( 4 * 3 )。因此，访问器占用 7020 个字节（缓冲区视图的[7032 … 14051]包含范围）。

##### [3.6.2.3. 稀疏访问器](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3623-sparse-accessors)

在描述相对于参考数组的增量变化时，数组的稀疏编码通常比密集编码更节省内存。编码变形目标时经常出现这种情况（通常，描述变形目标中的几个置换顶点比传输所有变形目标顶点更有效）。

与标准访问器类似，稀疏访问器从存储在bufferView中的数据初始化类型元素数组。当accessor.bufferView未定义时，稀疏访问器被初始化为 size 字节的零数组`(size of the accessor element) * (accessor.count)`。

最重要的是，稀疏访问器包含一个稀疏JSON 对象，用于描述与其初始化值不同的元素。稀疏对象包含以下**必需**属性：

- count：置换元素的数量。这个数字**绝不能**大于基本访问器元素的数量。
- indices：描述要替换的值的索引的位置和组件类型的对象。索引**必须**形成一个严格递增的序列。索引**不得**大于或等于基本访问器元素的数量。
- values ：描述与从indices引用的索引相对应的置换元素位置的对象。

以下示例显示了一个稀疏访问器示例，其中包含 10 个与初始化数组不同的元素。

```js
{
    "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5123,
            "count": 12636,
            "type": "VEC3",
            "sparse": {
                "count": 10,
                "indices": {
                    "bufferView": 1,
                    "byteOffset": 0,
                    "componentType": 5123
                },
                "values": {
                    "bufferView": 2,
                    "byteOffset": 0
                }
            }
        }
    ]
}
```

##### [3.6.2.4。数据对齐](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3624-data-alignment)

访问器在bufferView中的偏移量（即accessor.byteOffset ）和访问器在缓冲区中的偏移量（即`accessor.byteOffset + bufferView.byteOffset`）**必须**是访问器组件类型大小的倍数。

当引用的bufferView的byteStride未定义时，这意味着访问器元素被紧密打包，即有效步幅等于元素的大小。定义byteStride时，它**​​必须**是访问器组件类型大小的倍数。

当两个或多个顶点属性访问器使用相同的bufferView时，**必须**定义其byteStride 。

每个访问器**必须**适合其bufferView，即

```js
accessor.byteOffset + EFFECTIVE_BYTE_STRIDE * (accessor.count - 1) + SIZE_OF_COMPONENT * NUMBER_OF_COMPONENTS
```

**必须**小于或等于bufferView.length。

出于性能和兼容性原因，顶点属性的每个元素**必须与**bufferView内的 4 字节边界对齐（即accessor.byteOffset和bufferView.byteStride **必须**是 4 的倍数）。

矩阵类型的访问器以列优先顺序存储数据；每列的开始**必须**与 4 字节边界对齐。具体来说，当ROWS * SIZE_OF_COMPONENT（其中ROWS是矩阵的行数）不是 4 的倍数时，**必须**在每一列的末尾插入`(ROWS * SIZE_OF_COMPONENT) % 4`填充字节。

只有以下三个访问器配置需要填充。

[![填充mat2 1byte](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/padding-mat2-1byte.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/padding-mat2-1byte.svg)

图 3. 矩阵 2x2，1 字节组件

[![填充 mat3 1byte](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/padding-mat3-1byte.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/padding-mat3-1byte.svg)

图 4. 矩阵 3x3，1 字节组件

[![填充 mat3 2byte](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/padding-mat3-2byte.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/padding-mat3-2byte.svg)

图 5. 矩阵 3x3，2 字节组件

对齐要求仅适用于每列的开头，因此如果没有更多数据，则**可以省略尾随字节。**

|   |   |
|---|---|
|笔记|实施说明<br><br>对齐要求允许客户端实现更有效地处理二进制缓冲区，因为创建对齐的数据视图通常不需要额外的复制。|

考虑以下示例：

```js
{
    "bufferViews": [
        {
            "buffer": 0,
            "byteLength": 17136,
            "byteOffset": 620
        }
    ],
    "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 4608,
            "componentType": 5123,
            "count": 42,
            "type": "VEC2"
        }
    ]
}
```

在此示例中，访问器描述了紧密压缩的双分量无符号短值。

底层缓冲区的相应段将从字节 5228 开始

```js
start = accessor.byteOffset + accessor.bufferView.byteOffset
```

并继续直到字节 5396 独占

```js
end = 2 * 2 * accessor.count + start
```

无需复制即可创建结果缓冲区范围的无符号短视图：从字节偏移量 5228 开始的 84 个SCALAR值。

当访问器值未紧密打包时（即，bufferView.byteStride大于元素的字节长度），对创建的数据视图的迭代将需要考虑交错的值（即，跳过它们）。

##### [3.6.2.5。访问器边界](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3625-accessors-bounds)

accessor.min和accessor.max属性是分别包含每个组件的最小值和最大值的数组。这些数组的长度**必须**等于访问器组件的数量。

存储在 glTF JSON 中的值**必须**匹配存储在缓冲区中的实际最小和最大二进制值。accessor.normalized标志对这些属性没有影响。

应用稀疏替换后，稀疏访问器的最小和最大属性分别对应于最小和最大组件值。

当既没有定义sparse也没有定义bufferView时，min和max属性**可以**有任何值。这适用于二进制数据由外部方式（例如，通过扩展）提供的用例。

对于浮点组件，JSON 存储的最小值和最大值表示单精度浮点数，在使用前**应**四舍五入为单精度以避免任何潜在的边界不匹配。

|   |   |
|---|---|
|笔记|ECMAScript 实施说明<br><br>Math.fround函数可以用来实现这一点。|

动画输入和顶点位置属性访问器**必须**定义accessor.min和accessor.max。对于所有其他访问器，这些属性是可选的。

### [3.7. 几何学](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#37-geometry)

#### [3.7.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#371-overview)

任何节点**都可以包含一个网格，在其**网格属性中定义。**可以**使用引用皮肤对象中提供的信息对网格进行蒙皮。网格**可以**有变形目标。

#### [3.7.2. 网格](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#372-meshes)

##### [3.7.2.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3721-overview)

网格被定义为_基元_数组。图元对应于 GPU 绘制调用所需的数据。图元指定一个或多个属性，对应于绘制调用中使用的顶点属性。索引基元还定义了一个索引属性。属性和索引被定义为对包含相应数据的访问器的引用。每个基元还**可以**指定对应于 GPU 拓扑类型（例如，三角形集）的材料和模式。

|   |   |
|---|---|
|笔记|实施说明<br><br>将一个网格拆分为多个**图元**对于限制每次绘制调用的索引数量或将不同材质分配给网格的不同部分很有用。|

如果未定义材料，则**必须**使用[默认材料。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#default-material)

以下示例定义了一个包含一个索引三角形基元的网格：

```js
{
    "meshes": [
        {
            "primitives": [
                {
                    "attributes": {
                        "NORMAL": 23,
                        "POSITION": 22,
                        "TANGENT": 24,
                        "TEXCOORD_0": 25
                    },
                    "indices": 21,
                    "material": 3,
                    "mode": 4
                }
            ]
        }
    ]
}
```

每个属性都定义为属性对象的属性。属性的名称对应于标识顶点属性的枚举值，例如POSITION。该属性的值是包含数据的访问器的索引。

该规范定义了以下属性语义：POSITION、NORMAL、TANGENT、TEXCOORD_n、COLOR_n、JOINTS_n和WEIGHTS_n。

特定于应用程序的属性语义**必须**以下划线开头，例如_TEMPERATURE。特定于应用程序的属性语义**不得**使用_unsigned int_组件类型。

每个属性语义属性的有效访问器类型和组件类型定义如下。

|姓名|存取器类型|组件类型|描述|
|---|---|---|---|
|POSITION|VEC3|*float*|无单位 XYZ 顶点位置|
|NORMAL|VEC3|*float*|归一化 XYZ 顶点法线|
|TANGENT|VEC4|*float*|XYZW顶点切线，其中XYZ部分归一化，W分量为符号值（-1或+1），表示切线基的旋向性|
|TEXCOORD_n |VEC2|*float* unsigned byte_normalized *unsigned short* normalized|ST纹理坐标|
|COLOR_n|VEC3 VEC4|*float* unsigned byte_normalized  *unsigned short* normalized|RGB 或 RGBA 顶点颜色线性乘数|
|JOINTS_n|VEC4|*无符号字节* *无符号短*|查看[蒙皮网格属性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#skinned-mesh-attributes)|
|WEIGHTS_n|VEC4|*float*<br>_unsigned byte_normalized  <br>*unsigned short* normalized|查看[蒙皮网格属性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#skinned-mesh-attributes)|

POSITION访问器**必须**定义其最小和最大属性。

每个TANGENT访问器元素的 W 组件**必须**设置为1.0或-1.0。

当COLOR_n属性使用“VEC3”类型的访问器时，**必须**假定其 alpha 组件的值为1.0。

每个COLOR_0访问器元素的所有组件**都必须**限制在[0.0, 1.0]范围内。

TEXCOORD_n、COLOR_n、JOINTS_n和WEIGHTS_n属性语义属性名称**必须**采用[semantic]_[set_index]形式，例如TEXCOORD_0、TEXCOORD_1、COLOR_0。索引属性语义的所有索引**必须**以 0 开头并且是连续的正整数：TEXCOORD_0、TEXCOORD_1等。索引**不得**使用前导零来填充位数（例如，不允许TEXCOORD_01 ）。

客户端实现**应该**支持至少两个纹理坐标集、一个顶点颜色和一个关节/权重集。

给定原语的所有属性访问器**必须**具有相同的计数。当未定义indices属性时，属性访问器的计数表示要渲染的顶点数；当定义了indices属性时，它指示索引访问器中索引值的上限（独占），即所有索引值**必须**小于属性访问器的计数。

indices访问器**不得**包含所用组件类型的最大可能值（即，无符号字节为 255，无符号短整型为 65535，无符号整数为 4294967295）。

|   |   |
|---|---|
|笔记|实施说明<br><br>最大值会在某些图形 API 中触发原语重启，并且需要客户端实现来重建索引缓冲区。|

当未定义indices属性时，要渲染的顶点索引的数量由属性访问器的计数定义（具有范围[0..count)中的隐含值）；当定义了indices属性时，要渲染的顶点索引的数量由indices引用的访问器的计数定义。在任何一种情况下，顶点索引的数量**必须**对所使用的拓扑类型有效：

- 对于_points_，它**必须**是非零的。
- 对于_line loops_和_line strips_，它**必须**是 2 或更大。
- 对于_三角带_和_三角扇_，它**必须**是 3 或更大。
- 对于_lines_，它**必须**能被 2 整除且非零。
- 对于_三角形_，它**必须**能被 3 整除且非零

拓扑类型定义如下。

- **积分**
    根据等式，每个顶点定义一个单点基元：
	    pi = { vi }

- **线条**
    根据等式，一个线基元由每个顶点和下一个顶点定义：
	    p i = {vi i , v i + 1 }

- **线循环**
    循环与线带相同，不同之处在于从最终指定顶点到第一个顶点添加了最后一段。

- **线条**
    根据以下等式，每对连续的顶点定义一个单线图元：
	    pi = {v 2i , v 2i+1 }

- **三角形**
    根据以下等式，每组连续的三个顶点定义一个三角形图元：
	    pi = {v 3i , v 3i+1 , v 3i+2 }

- **三角条**
    一个三角形基元由每个顶点和跟随它的两个顶点定义，根据等式：
	    p i = {vi i , v i+(1+i%2) , v i+(2-i%2) }

- **三角扇**
    根据以下等式，三角形基元围绕共享公共顶点定义：
	    p i = {v i+1 , v i+2 , v 0 }

网格几何**不应**包含退化线或三角形，即每个拓扑图元多次使用同一顶点的线或三角形。

当未指定位置时，客户端实现**应该**跳过图元的呈现，除非其位置由其他方式（例如，通过扩展）提供。这适用于索引和非索引几何。

当未指定切线时，客户端实现**应该使用默认的**[MikkTSpace](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#mikktspace)算法计算切线，并使用指定的顶点位置、法线和与法线纹理关联的纹理坐标。

当未指定法线时，客户端实现**必须**计算平面法线并且提供的切线（如果存在）**必须**被忽略。

同一个三角形的顶点**应该**有相同的tangent.w值。当同一三角形的顶点具有不同的tangent.w值时，其切线空间被认为是未定义的。

**必须**通过法线和切线 XYZ 向量的叉积并将其乘以切线的 W 分量来计算双切线向量：`bitangent = cross(normal.xyz, tangent.xyz) * tangent.w`。

扩展**可以**添加额外的属性名称、访问器类型和/或组件类型。

##### [3.7.2.2. 变形目标](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3722-morph-targets)

变形目标是通过扩展网格概念来定义的。

变形目标是可变形的网格，其中通过将原始属性添加到目标属性的加权和来获得基元的属性。

例如，索引**i**处基元的变形目标顶点POSITION以这种方式计算：

```js
primitives[i].attributes.POSITION +
  weights[0] * primitives[i].targets[0].POSITION +
  weights[1] * primitives[i].targets[1].POSITION +
  weights[2] * primitives[i].targets[2].POSITION + ...
```

变形目标通过Mesh基元中定义的targets属性指定。targets数组中的每个目标都是一个普通的 JSON 对象，将原始属性映射到包含变形目标位移数据（增量）的访问器。

对于每个变形目标属性，原始属性**必须**存在于网格图元中。

存在于基本网格图元中但未包含在给定变形目标中的属性**必须**保留其变形目标的原始值。

|   |   |
|---|---|
|笔记|实施说明<br><br>这允许跳过零填充访问器并暗示不同的变形目标可能包含不同的属性集。|

客户端实现**应该**至少支持三个属性 ——POSITION、NORMAL和TANGENT—— 用于变形。客户端实现**可以**选择性地支持变形的TEXCOORD_n和/或COLOR_n属性。

如果 morph 目标包含特定于应用程序的语义，则它们的名称**必须**像关联的属性语义一样以下划线（例如，_TEMPERATURE ）为前缀。

所有基元**必须**具有相同数量的相同顺序的变形目标。

每个变形属性语义属性的访问器类型和组件类型**必须**遵循下表。请注意，当以TANGENT数据为目标时，省略了用手习惯的 W 分量，因为用手习惯无法移位。

|姓名|存取器类型|组件类型|描述|
|---|---|---|---|
|POSITION|VEC3|*float*|XYZ 顶点位置位移|
|NORMAL|VEC3|*float*|XYZ 顶点法向位移|
|TANGENT|VEC3|*float*|XYZ 顶点切线位移|
|TEXCOORD_n|VEC2|*float*<br>signed byte normalized  <br>signed short_规范化  <br>unsigned byte_规范化  <br>unsigned short_规范化|ST 纹理坐标位移|
|COLOR_n|VEC3  <br>VEC4|*float*<br>signed byte normalized  <br>signed short_规范化  <br>unsigned byte_规范化  <br>unsigned short_规范化|RGB 或 RGBA 颜色增量|

POSITION访问器**必须**定义其最小和最大属性。

POSITION、NORMAL和TANGENT属性的位移**必须**在影响网格顶点的任何变换矩阵（例如蒙皮或节点变换）之前应用。

当基本网格图元未指定切线时，客户端实现**应该**使用默认的[MikkTSpace](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#mikktspace)算法为每个变形目标计算切线，并更新顶点位置、法线和与法线纹理关联的纹理坐标。

当基本网格图元未指定法线时，客户端实现**必须**为每个变形目标计算平面法线；**必须**忽略提供的切线及其位移（如果存在） 。

当COLOR_n增量使用“VEC3”类型的访问器时，**必须**假定它们的 alpha 组件的值为0.0。

应用颜色增量后，每个COLOR_0变形访问器元素的所有组件都**必须**限制在[0.0, 1.0]范围内。

所有变形目标访问器**必须**与原始基元的访问器具有相同的计数。

具有变形目标的网格还**可以**定义一个可选的mesh.weights属性，用于存储默认目标的权重。当node.weights未定义时，**必须**使用这些权重。当mesh.weights未定义时，默认目标的权重为零。

以下示例通过添加两个变形目标将上一示例中定义的网格扩展为可变形网格：

```js
{
    "primitives": [
        {
            "attributes": {
                "NORMAL": 23,
                "POSITION": 22,
                "TANGENT": 24,
                "TEXCOORD_0": 25
            },
            "indices": 21,
            "material": 3,
            "targets": [
                {
                    "NORMAL": 33,
                    "POSITION": 32,
                    "TANGENT": 34
                },
                {
                    "NORMAL": 43,
                    "POSITION": 42,
                    "TANGENT": 44
                }
            ]
        }
    ],
    "weights": [0, 0.5]
}
```

变形目标的数量不受限制。客户端实现**应该**支持至少八个变形属性。这意味着当每个变形目标具有一个属性时，它们**应该**支持八个变形目标，每个变形目标具有两个属性的四个变形目标，或者每个变形目标具有三个或四个属性的两个变形目标。

对于包含更多变形属性的资产，客户端实现**可以**选择仅使用具有最高权重的变形目标的八个属性。

|   |   |
|---|---|
|笔记|实施说明<br><br>大量的创作和客户端实现将名称与变形目标相关联。虽然 glTF 2.0 规范目前不提供指定名称的方法，但大多数工具都使用字符串数组mesh.extras.targetNames来实现此目的。targetNames数组和所有原始目标数组的长度必须相同。|

#### [3.7.3. 皮肤](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#373-skins)

##### [3.7.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3731-overview)

glTF 2.0 网格通过蒙皮对象、关节层次结构和指定的顶点属性支持线性混合蒙皮。

皮肤存储在资产的皮肤数组中。**每个皮肤都由一个REQUIRED** joints属性定义，该属性列出用作关节的节点的索引以构成皮肤，以及一个**可选的** inverseBindMatrices属性，该属性指向一个访问器，该访问器具有用于将蒙皮坐标带入与每个关节相同的空间的反向绑定矩阵数据.

关节的顺序由skin.joints数组定义，它**必须匹配**inverseBindMatrices访问器元素的顺序（当后者存在时）。skeleton属性（如果存在）指向作为关节层次结构的公共根的节点，或者指向公共根的直接或间接父节点。

|   |   |
|---|---|
|笔记|实施说明<br><br>尽管计算蒙皮变换不需要骨架属性，但它可用于为蒙皮几何体提供特定的“枢轴点”。|

inverseBindMatrices 引用的访问器**必须具有**“MAT4”类型的浮点组件。inverseBindMatrices 引用的访问器的元素数量**必须**大于或等于关节元素的数量。每个矩阵的第四行**必须**设置为[0.0, 0.0, 0.0, 1.0]。

|   |   |
|---|---|
|笔记|实施说明<br><br>定义如何摆出皮肤几何形状以与关节一起使用的矩阵（也称为“绑定形状矩阵”）应该预乘到网格数据或反向绑定矩阵。|

##### [3.7.3.2. 联合层次结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3732-joint-hierarchy)

用于控制蒙皮网格姿势的关节层次结构只是节点层次结构，每个节点都通过来自skin.joints数组的引用指定为_关节_。每个皮肤的关节**必须**有一个共同的父节点（直接或间接）称为_共同根_，它可能是也可能不是关节节点本身。当场景中的节点引用皮肤时，公共根**必须**属于同一场景。

|   |   |
|---|---|
|笔记|实施说明<br><br>节点对象不指定它是否是关节。客户端实现可能需要先遍历皮肤数组，标记每个关节节点。|

联合节点**可以**附加其他节点，甚至是带有网格的完整节点子图。

|   |   |
|---|---|
|笔记|实施说明<br><br>将整个几何体附加到关节节点而不对其进行蒙皮是很常见的（例如，将剑附加到手上）。请注意，节点变换是节点相对于关节的局部变换，就像变换部分中描述的 glTF 节点层次结构中的任何其他节点[一样](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#transformations)。|

仅将联合变换应用于蒙皮网格；**必须**忽略蒙皮网格节点的变换。

在下面的示例中，应用了node_0的平移和node_1的缩放，而忽略了node_3的平移和node_4的旋转。

```js
{
    "nodes": [
        {
            "name": "node_0",
            "children": [ 1 ],
            "translation": [ 0.0, 1.0, 0.0 ]
        },
        {
            "name": "node_1",
            "children": [ 2 ],
            "scale": [ 0.5, 0.5, 0.5 ]
        },
        {
            "name": "node_2"
        },
        {
            "name": "node_3",
            "children": [ 4 ],
            "translation": [ 1.0, 0.0, 0.0 ]
        },
        {
            "name": "node_4",
            "mesh": 0,
            "rotation": [ 0.0, 1.0, 0.0, 0.0 ],
            "skin": 0
        }
    ],
    "skins": [
        {
            "inverseBindMatrices": 0,
            "joints": [ 1, 2 ],
            "skeleton": 1
        }
    ]
}
```

##### [3.7.3.3. 蒙皮网格属性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3733-skinned-mesh-attributes)

蒙皮网格**必须**具有用于蒙皮计算的顶点属性。JOINTS_n属性数据包含影响顶点的相应 skin.joints 数组中的关节索引。WEIGHTS_n属性数据定义了表明关节影响顶点的强度的权重。

要应用蒙皮，需要为每个关节计算一个变换矩阵。然后，每个顶点的变换矩阵被计算为联合变换矩阵的加权线性和。**请注意，必须**在基节点变换之前应用每个关节的逆绑定矩阵（如果存在） 。

在以下示例中，网格基元定义了JOINTS_0和WEIGHTS_0顶点属性：

```js
{
    "meshes": [
        {
            "name": "skinned-mesh_1",
            "primitives": [
                {
                    "attributes": {
                        "JOINTS_0": 179,
                        "NORMAL": 165,
                        "POSITION": 163,
                        "TEXCOORD_0": 167,
                        "WEIGHTS_0": 176
                    },
                    "indices": 161,
                    "material": 1,
                    "mode": 4
                }
            ]
        }
    ]
}
```

影响一个顶点的关节数量限制为每组 4 个，因此引用的访问器**必须**具有VEC4类型和以下组件类型：

- **JOINTS_n**：*无符号字节_或_无符号短*
- **WEIGHTS_n** : *float* , or *normalized unsigned byte* , or *normalized unsigned short*

每个顶点的联合权重**不得**为负数。

对于给定的顶点，关节**不得**包含一个以上的非零权重。

当权重使用_float_组件类型存储时，对于给定的顶点，它们的线性和**应该**尽可能接近1.0 。

_当使用标准化无符号字节_或_标准化无符号短_组件类型存储权重时，它们在标准化之前的线性和**必须**分别为255或65535。如果没有这些要求，顶点会明显变形，因为权重误差会乘以关节位置。例如，重量总和中1/255的误差将导致关节位置出现不可接受的大差异。

|   |   |
|---|---|
|笔记|实施说明<br><br>官方验证工具中的阈值设置为每个顶点非零权重数的2e-7倍。|

|   |   |
|---|---|
|笔记|实施说明<br><br>由于允许的阈值远低于量化组件类型的最小可能步长，因此权重和应在量化后重新归一化。|

当任何顶点受到超过四个关节的影响时，额外的关节和权重信息将存储在后续集合中。例如，JOINTS_1和WEIGHTS_1（如果存在）将为最多 4 个影响顶点的附加关节引用访问器。对于给定的原语， JOINTS_n属性集的数量**必须**等于WEIGHTS_n属性集的数量。

客户端实现**可能**仅支持一组最多四个权重和关节，但是不支持文件中存在的所有权重和关节集可能会对资产的动画产生影响。

所有关节值**必须**在皮肤的关节范围内。未使用的关节值（即，权重为零的关节）**应该**设置为零。

#### [3.7.4. 实例化](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#374-instantiation)

网格由node.mesh属性实例化。许多节点可以使用相同的网格，这些节点可以有不同的变换。例如：

```js
{
    "nodes": [
        {
            "mesh": 11
        },
        {
            "mesh": 11,
            "translation": [
                -20,
                -1,
                0
            ]
        }
    ]
}
```

应用节点的全局变换后，网格顶点位置值为米。

当网格图元使用任何基于三角形的拓扑（即_triangles_、*triangle strip_或_triangle fan*）时，节点全局变换的行列式定义该图元的缠绕顺序。如果行列式为正值，则三角形面的缠绕顺序为逆时针方向；在相反的情况下，缠绕顺序是顺时针的。

|   |   |
|---|---|
|笔记|实施说明<br><br>将缠绕顺序切换为顺时针方向可通过负比例变换实现镜像几何。|

当实例化网格具有变形目标时，它**必须**使用由node.weights属性指定的变形权重。当后者未定义时，**必须**使用mesh.weights属性。当这两个字段都未定义时，网格将以非变形状态（即所有变形权重设置为零）实例化。

下面的示例实例化了一个具有非默认权重的变形目标。

```js
{
    "nodes": [
        {
            "mesh": 11,
            "weights": [0, 0.5]
        }
    ]
}
```

使用节点的网格和皮肤属性的组合在节点内实例化皮肤。皮肤实例的网格在网格属性中定义。皮肤属性包含皮肤实例的索引。

以下示例显示了蒙皮网格实例：蒙皮对象、具有蒙皮网格的节点和两个关节节点。

```js
{
    "skins": [
        {
            "inverseBindMatrices": 29,
            "joints": [1, 2]
        }
    ],
    "nodes": [
        {
            "name":"Skinned mesh node",
            "mesh": 0,
            "skin": 0
        },
        {
            "name":"Skeleton root joint",
            "children": [2],
            "rotation": [
                0,
                0,
                0.7071067811865475,
                0.7071067811865476
            ],
            "translation": [
                4.61599,
                -2.032e-06,
                -5.08e-08
            ]
        },
        {
            "name":"Head",
            "translation": [
                8.76635,
                0,
                0
            ]
        }
    ]
}
```

### [3.8. 纹理数据](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#38-texture-data)

#### [3.8.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#381-overview)

glTF 2.0 将纹理访问分为三种不同类型的对象：纹理、图像和采样器。

#### [3.8.2. 纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#382-textures)

纹理存储在资产的纹理数组中。纹理由图像索引定义，由source属性和采样器索引 ( sampler ) 表示。例如：

```js
{
    "textures": [
        {
            "sampler": 0,
            "source": 2
        }
    ]
}
```
glTF 2.0 仅支持静态 2D 纹理。

当texture.source未定义时，图像**应该**由扩展或特定于应用程序的方式提供，否则纹理对象是未定义的。

|   |   |
|---|---|
|笔记|实施说明<br><br>客户端实现可能会使用预定义的占位符图像或填充一些错误颜色（通常是洋红色）来渲染此类纹理。|

当texture.sampler未定义时，**必须**使用具有重复包装（在两个方向上）和自动过滤的采样器。

#### [3.8.3. 图片](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#383-images)

纹理引用的图像存储在资产的图像数组中。

每个图像包含一个

- 以一种受支持的图像格式指向外部文件的 URI（或 IRI），或
- 带有嵌入数据的数据 URI，或
- 对bufferView的引用；在这种情况下，**必须**定义mimeType 。

以下示例显示了一个指向外部 PNG 图像文件的图像和另一个引用具有 JPEG 数据的bufferView 的图像。

```js
{
    "images": [
        {
            "uri": "duckCM.png"
        },
        {
            "bufferView": 14,
            "mimeType": "image/jpeg"
        }
    ]
}
```

客户端实现**可能**需要手动确定某些图像的媒体类型。在这种情况下，**应该**使用下表来检查前几个字节的值。

|媒体类型|图案长度|模式字节|
|---|---|---|
|图片/png|8个|`0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A`|
|图片/jpeg|3个|0xFF 0xD8 0xFF|

当定义后者时，图像数据**必须**匹配image.mimeType属性。

纹理坐标原点 (0, 0) 对应于纹理图像的左上角。下图说明了这一点，其中显示了归一化纹理空间的所有四个角的相应坐标：

[![纹理坐标](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/texcoords.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/texcoords.svg)

图 6. 归一化纹理坐标

**必须**忽略来自 PNG 或 JPEG 图像的任何色彩空间信息（例如 ICC 配置文件、意图、伽马值等） 。有效传递函数（编码）由引用图像的 glTF 对象定义（在大多数情况下，它是材质使用的纹理）。

|   |   |
|---|---|
|笔记|网络实施说明<br><br>要在使用 WebGL API 时忽略嵌入的色彩空间信息，请将`UNPACK_COLORSPACE_CONVERSION_WEBGL`标志设置为NONE。<br><br>要在使用 ImageBitmap API 时忽略嵌入的色彩空间信息，请将colorSpaceConversion选项设置为none。|

#### [3.8.4. 采样器](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#384-samplers)

##### [3.8.4.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3841-overview)


采样器存储在资产的采样器数组中。每个采样器指定过滤和包装模式。

采样器属性使用[属性参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#reference-sampler)中定义的整数枚举。
> 在[README.md - KhronosGroup/glTF - GitHub1s](https://github1s.com/KhronosGroup/glTF/blob/HEAD/specification/1.0/README.md) 可以查到对应整数枚举

客户端实现**应该**遵循指定的过滤模式。当后者未定义时，客户端实现**可以**设置自己的默认纹理过滤设置。

客户端实现**必须**遵循指定的包装模式。

##### [3.8.4.2。过滤](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3842-filtering)

过滤模式控制纹理的放大和缩小。

放大模式包括：

- *最近的*。对于每个请求的纹素坐标，采样器选择具有最近坐标的纹素。这个过程有时被称为“最近邻”。
- *线性的*。对于每个请求的纹素坐标，采样器计算几个相邻纹素的加权和。这个过程有时被称为“双线性插值”。

缩小模式包括：

- *最近的*。对于每个请求的纹素坐标，采样器选择一个坐标与原始图像最近（曼哈顿距离）的纹素。这个过程有时被称为“最近邻”。
- *线性的*。对于每个请求的纹素坐标，采样器计算原始图像中几个相邻纹素的加权和。这个过程有时被称为“双线性插值”。
- *最近的 mipmap 最近的*。对于每个请求的纹素坐标，采样器首先选择原始图像的预缩小版本之一，然后选择与它最近（曼哈顿距离）坐标的纹素。
- *线性贴图最近*。对于每个请求的纹素坐标，采样器首先选择原始图像的预缩小版本之一，然后从中计算几个相邻纹素的加权和。
- *最近的 mipmap 线性*。对于每个请求的纹素坐标，采样器首先选择原始图像的两个预缩小版本，从每个图像中选择一个坐标最近（曼哈顿距离）的纹素，并在这两个中间结果之间执行最终的线性插值。
- *线性贴图线性*。对于每个请求的纹素坐标，采样器首先选择原始图像的两个预缩小版本，计算每个相邻纹素的加权和，并在这两个中间结果之间执行最终的线性插值。这个过程有时被称为“三线性插值”。

为了正确支持 mipmap 模式，客户端实现**应该**在运行时生成 mipmap。当无法生成运行时 mipmap 时，客户端实现**应该**覆盖缩小过滤模式，如下所示：

|Mipmap 缩小模式|回退模式|
|---|---|
|*最近的 mipmap-最近*  <br>*最近的 mipmap 线性*|*最近的*|
|*Linear-mipmap-最近的*  <br>*Linear-mipmap-linear*|*线性的*|

##### [3.8.4.3。包装](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3843-wrapping)

通过TEXCOORD_n属性值提供的每个顶点纹理坐标针对图像大小进行了标准化（不要与标准化访问器属性混淆，后者仅指数据编码）。即纹理坐标值(0.0, 0.0)指向第一个（左上）图像像素的开始，而纹理坐标值（1.0, 1.0）指向最后一个（右下）像素的结束) 图像像素。

采样器的环绕模式定义了如何独立处理两个方向的负值或大于或等于1.0 的纹理坐标。支持的模式包括：

- *重复*。仅使用纹理坐标的小数部分。

|   |   |
|---|---|
|笔记|例子<br><br>2.2映射到0.2；-0.4映射到0.6。|

- *镜像重复*。此模式的工作原理与_重复_相同，但当整数部分（向 −∞ 截断）为奇数时会翻转方向。

|   |   |
|---|---|
|笔记|例子<br><br>2.2映射到0.2；-0.4被视为0.4。|

- *夹到边缘*。具有图像外部值的纹理坐标被限制在边缘处最近的现有图像纹素。

##### [3.8.4.4。例子](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3844-example)

以下示例定义了一个具有_线性_放大过滤、*线性 mipmap 线性_缩小过滤和双向_重复环绕的采样器。*

```js
{
    "samplers": [
        {
            "magFilter": 9729,
            "minFilter": 9987,
            "wrapS": 10497,
            "wrapT": 10497
        }
    ]
}
```

##### [3.8.4.5。非二次方纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3845-non-power-of-two-textures)

当在对此类纹理尺寸的支持有限的平台上运行时，客户端实现**应该**调整非二次方纹理的大小（以便它们的水平和垂直大小是二次方）。

|   |   |
|---|---|
|笔记|实施说明<br><br>具体来说，如果采样器纹理引用：<br><br>- 具有等于_​​ repeat_或_镜像 repeat 的_环绕模式（wrapS或wrapT ） ，或者<br>    <br>- 有一个使用 mipmapping 的缩小过滤器 ( minFilter )。|

### [3.9. 材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#39-materials)

#### [3.9.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#391-overview)

glTF 使用一组通用参数定义材质，这些参数基于基于物理的渲染 (PBR) 中广泛使用的材质表示。具体来说，glTF 使用金属粗糙度材料模型。使用这种材料的声明性表示可以使 glTF 文件在不同平台上呈现一致。

[![材料](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/materials.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/materials.svg)

图 7. 基于物理的渲染示例

#### [3.9.2. 金属粗糙度材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#392-metallic-roughness-material)

所有与金属粗糙度材料模型相关的参数都在材料对象的pbrMetallicRoughness属性下定义。以下示例显示如何使用金属粗糙度参数定义类金材料：

```js
{
    "materials": [
        {
            "name": "gold",
            "pbrMetallicRoughness": {
                "baseColorFactor": [ 1.000, 0.766, 0.336, 1.0 ],
                "metallicFactor": 1.0,
                "roughnessFactor": 0.0
            }
        }
    ]
}
```

金属粗糙度材料模型由以下属性定义：

- *base color* - 材质的基色。
- *金属度*- 材料的金属度；值范围从0.0（非金属）到1.0（金属）；中间值的解释见[附录 B。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-b-brdf-implementation)
- *粗糙度*- 材料的粗糙度；值范围从0.0（平滑）到1.0（粗糙）。

基色根据_金属度值__有_两种不同的解释。当材料是金属时，基色是在法向入射 (F0) 时特定测量的反射率值。对于非金属，基色表示材料的反射漫反射颜色。在此模型中，无法为非金属指定 F0 值，并使用 4% (0.04) 的线性值。

每个属性的值**可以**使用因子和/或纹理（例如，baseColorTexture和baseColorFactor）来定义。如果未给出纹理，则**必须**假设此材质模型中的所有相应纹理组件的值为1.0。如果同时存在因子和纹理，则因子值充当相应纹理值的线性乘数。纹理绑定由_纹理_对象的索引和可选的纹理坐标索引定义。

以下示例显示了一种材质，该材质使用纹理作为其_基色_属性。

```js
{
    "materials": [
        {
            "pbrMetallicRoughness": {
                "baseColorTexture": {
                    "index": 0,
                    "texCoord": 1
                },
            }
        }
    ],
    "textures": [
        {
            "source": 0
        }
    ],
    "images": [
        {
            "uri": "base_color.png"
        }
    ]
}
```

基色_纹理_**必须包含使用**[sRGB 光电传输函数](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#srgb)编码的 8 位值，因此 RGB 值**必须**在用于任何计算之前解码为实际线性值。为了实现正确的过滤，传递函数**应该**在执行线性插值之前被解码。

_金属度_ 和 _粗糙度_ 属性的纹理打包在一个名为metallicRoughnessTexture的单一纹理中。它的 _绿色_ 通道包含粗糙度值，_蓝色_ 通道包含金属度值。此纹理**必须**使用线性传递函数进行编码，并且每个通道**可以**使用超过 8 位。

例如，假设从baseColorTexture中采样了8 位 RGBA 值[64, 124, 231, 255]，并假设baseColorFactor被指定为[0.2, 1.0, 0.7, 1.0]。然后，最终的_基色_值将是（在解码传递函数并乘以因子之后）

```js
[0.051 * 0.2, 0.202 * 1.0, 0.799 * 0.7, 1.0 * 1.0] = [0.0102, 0.202, 0.5593, 1.0]
```

除了材料属性之外，如果图元使用属性语义属性COLOR_0指定顶点颜色，则此值将作为_基础颜色_的附加线性乘数。

双向反射分布函数 (BRDF) 本身的实现**可能**因设备性能和资源限制而异。有关 BRDF 计算的更多详细信息，请参阅[附录 B。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-b-brdf-implementation)

#### [3.9.3. 额外的纹理](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#393-additional-textures)

材料定义还提供了额外的纹理，这些纹理也**可以**与金属粗糙度材料模型以及其他材料模型一起使用，这些材料模型可以通过 glTF 扩展提供。

支持以下附加纹理：

- **normal**：切线空间法线纹理。纹理将切线空间中法向量的 XYZ 分量编码为使用线性传递函数存储的 RGB 值。普通纹理**不应该**包含_alpha_通道，因为它无论如何都不会被使用。反量化后，纹素值**必须**映射如下：*红色*[0.0 .. 1.0] 到 X [-1 .. 1]，*绿色*[0.0 .. 1.0] 到 Y [-1 .. 1]，*蓝色*（0.5 .. 1.0] 映射到 Z (0 .. 1)。普通纹理**不应**包含小于或等于0.5的蓝色值。

|   |   |
|---|---|
|笔记|实施说明<br><br>此映射通常实现为sampledValue * 2.0 - 1.0。|

    法线纹理的纹理绑定**可以**另外包含一个SCALAR比例​​值，该值线性缩放法线向量的 X 和 Y 分量。

    法向量在用于光照方程之前**必须被归一化。**使用缩放时，向量归一化发生在缩放之后。

- **遮挡**：遮挡纹理；它表示从环境光源接收到较少间接照明的区域。直接照明不受影响。纹理的红色通道编码遮挡值，其中0.0表示完全遮挡区域（无间接照明），_1.0_ 表示未遮挡区域（完全间接照明）。其他纹理通道（如果存在）不影响遮挡。

    遮挡贴图的纹理绑定**可以**可选地包含用于减少遮挡效果的SCALAR强度值。如果存在，它会影响遮挡值 as `1.0 + strength * (occlusionTexture - 1.0)`。

- **emissive**：发射纹理和因子控制材料发出的光的颜色和强度。纹理**必须包含使用**[sRGB 光电传输函数](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#srgb)编码的 8 位值，因此 RGB 值**必须**在用于任何计算之前解码为实际线性值。为了实现正确的过滤，传递函数**应该**在执行线性插值之前被解码。

    对于需要物理光单位的实现，发光纹理和因子的乘积单位是坎德拉每平方米 ( **cd / m 2** )，有时称为_尼特_。

|   |   |
|---|---|
|笔记|实施说明<br><br>因为该值是按平方米指定的，所以它表示沿表面的任何给定点的亮度。然而，从物理光单位到渲染像素亮度的精确转换需要了解相机的曝光设置，除非 glTF 扩展另有定义，否则这些设置将作为实现细节保留。<br><br>许多渲染引擎通过假设1.0的发射因子导致完全曝光的像素来简化此计算。|

以下示例显示了使用pbrMetallicRoughness参数以及其他纹理定义的材质：

```js
{
    "materials": [
        {
            "name": "Material0",
            "pbrMetallicRoughness": {
                "baseColorFactor": [ 0.5, 0.5, 0.5, 1.0 ],
                "baseColorTexture": {
                    "index": 1,
                    "texCoord": 1
                },
                "metallicFactor": 1,
                "roughnessFactor": 1,
                "metallicRoughnessTexture": {
                    "index": 2,
                    "texCoord": 1
                }
            },
            "normalTexture": {
                "scale": 2,
                "index": 3,
                "texCoord": 1
            },
            "emissiveFactor": [ 0.2, 0.1, 0.0 ]
        }
    ]
}
```

如果客户端实现是资源绑定的并且不能支持定义的所有纹理，它**应该**按照以下优先顺序支持这些额外的纹理。资源绑定实现**应该**从底部到顶部放置纹理。

|质地|不支持功能时的渲染影响|
|---|---|
|普通的|几何图形看起来没有创作的那么详细。|
|遮挡|模型将在本应较暗的区域显得更亮。|
|发光的|带灯的模型不会点亮。例如，汽车模型的前灯将关闭而不是打开。|

#### [3.9.4. 阿尔法覆盖率](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#394-alpha-coverage)

alphaMode属性定义了如何解释 alpha 值。alpha 值取自金属粗糙度材料模型_基色的第四个分量。_

alphaMode可以是以下值之一：
- OPAQUE - 渲染输出完全不透明并且忽略任何 alpha 值。
- MASK - 根据 alpha 值和指定的_alpha 截止_值，渲染输出完全不透明或完全透明；边缘的确切外观**可能**会受到特定于实现的技术的影响，例如“Alpha-to-Coverage”。

|   |   |
|---|---|
|笔记|笔记<br><br>此模式用于模拟树叶或铁丝网等几何体。|

- 混合- 如[合成数字图像](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#compositing)中所述，使用“over”运算符将渲染输出与背景组合。

|   |   |
|---|---|
|笔记|笔记<br><br>该模式用于模拟纱布或动物毛皮等几何体。|

当alphaMode设置为MASK时，alphaCutoff属性指定截止阈值。如果 alpha 值大于或等于alphaCutoff值，则将其呈现为完全不透明，否则将呈现为完全透明。其他模式忽略alphaCutoff值。

|   |   |
|---|---|
|笔记|实时光栅器的实现说明<br><br>实时光栅化器通常使用深度缓冲区和网格排序来支持 alpha 模式。下面描述了这些类型的渲染器的预期行为。<br><br>- 不透明- 为每个像素写入深度值，正确输出不需要网格排序。<br>    <br>- MASK - 不为在 alpha 测试后丢弃的像素写入深度值。为所有其他像素写入深度值。正确输出不需要网格排序。<br>    <br>- 混合- 对此模式的支持各不相同。没有适用于所有情况的完美且快速的解决方案。客户端实现应尝试在尽可能多的情况下实现正确的混合输出。是否写入深度值或是否排序取决于实现。例如，实现可能会丢弃具有零或接近零 alpha 值的像素以避免排序问题。|

#### [3.9.5. 两面性](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#395-double-sided)

doubleSided属性指定材料是否是双面的。

当此值为 false 时，启用背面剔除，即仅渲染正面三角形。

当此值为真时，背面剔除被禁用，双面照明被启用。在评估光照方程之前，背面**必须**反转其法线。

#### [3.9.6. 默认材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#396-default-material)

当网格未指定材料时使用的默认材料被定义为未指定属性的材料。[材料](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#reference-material)的所有默认值均适用。

|   |   |
|---|---|
|笔记|实施说明<br><br>这种材料不发光，除非场景中存在一些照明，否则它将是黑色的。|

#### [3.9.7. 点线材质](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#397-point-and-line-materials)

本规范没有定义非三角形图元（例如_点_或_线_）的大小或样式，应用程序**可以**使用各种技术来适当地渲染这些图元。**但是，为了保持一致性，建议使用**以下约定：

- 点和线在视口空间中的宽度**应**为 1px。
- 具有NORMAL和TANGENT属性的点或线**应该**使用标准光照（包括法线纹理）进行渲染。
- 具有NORMAL但没有TANGENT属性的点或线**应该**使用标准照明渲染，但忽略材质上的任何法线纹理。
- 没有NORMAL属性的点或线**应该**在没有照明的情况下渲染，而是使用_基色_值（如上定义，当存在时乘以COLOR_0 ）和_发射_值的总和。

### [3.10. 相机](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#310-cameras)

#### [3.10.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3101-overview)

相机存储在资产的相机数组中。每个相机都定义了一个指定投影类型（透视或正交）的类型属性，以及定义细节的透视或正交属性。使用node.camera属性在节点内实例化相机。

相机对象定义了将场景坐标从视图空间转换到裁剪空间的投影矩阵。

包含相机实例的节点定义了将场景坐标从全局空间转换到视图空间的视图矩阵。

#### [3.10.2. 查看矩阵](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3102-view-matrix)

相机被定义为局部 +X 轴在右侧，“镜头”朝向局部 -Z 轴，相机顶部与局部 +Y 轴对齐。

视图矩阵源自包含相机的节点的全局变换，忽略了缩放。如果节点的全局变换是恒等的，则摄像机的位置在原点。

#### [3.10.3. 投影矩阵](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#3103-projection-matrices)

##### [3.10.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#31031-overview)

投影可以是透视投影或正交投影。

透视投影有两种子类型：有限和无限。当zfar属性未定义时，相机定义无限投影。否则，相机定义有限投影。

以下示例定义了两个透视相机，其中提供了 Y 视野、宽高比和剪裁信息的值。

```js
{
    "cameras": [
        {
            "name": "Finite perspective camera",
            "type": "perspective",
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.660593,
                "zfar": 100,
                "znear": 0.01
            }
        },
        {
            "name": "Infinite perspective camera",
            "type": "perspective",
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.660593,
                "znear": 0.01
            }
        }
    ]
}
```

客户端实现**应该**使用以下投影矩阵。

##### [3.10.3.2. 无限透视投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#31032-infinite-perspective-projection)

让
- a是视野的纵横比（宽度与高度），由`camera.perspective.aspectRatio`或视口的纵横比设置；
- y是以弧度为单位的垂直视野，由camera.perspective.yfov设置；
- n是到近裁剪平面的距离，由camera.perspective.znear设置。

然后，投影矩阵定义如下。

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[无限透视投影](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#infinite-perspective-projection)。|

\[\begin{bmatrix} 1 \over { a \times \tan(0.5 \times y) } & 0 & 0 & 0 \\ 0 & 1 \over { \tan(0.5 \times y) } & 0 & 0 \\ 0 & 0 & -1 & -2n \\ 0 & 0 & -1 & 0 \end{bmatrix}\]

当提供的相机的纵横比与视口的纵横比不匹配时，客户端实现**不应**裁剪或执行非均匀缩放（“拉伸”）以填充视口。

##### [3.10.3.3. 有限透视投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#31033-finite-perspective-projection)

让
- a是视野的纵横比（宽度与高度），由`camera.perspective.aspectRatio`或视口的纵横比设置；
- y是以弧度为单位的垂直视野，由camera.perspective.yfov设置；
- f是到远裁剪平面的距离，由camera.perspective.zfar设置；
- n是到近裁剪平面的距离，由camera.perspective.znear设置。

然后，投影矩阵定义如下。

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[有限透视投影](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#finite-perspective-projection)。|

\[\begin{bmatrix} 1 \over { a \times \tan(0.5 \times y) } & 0 & 0 & 0 \\ 0 & 1 \over { \tan(0.5 \times y) } & 0 & 0 \\ 0 & 0 & { f + n } \over { n - f } & { 2 fn } \over { n - f } \\ 0 & 0 & -1 & 0 \end{bmatrix}\]

当提供的相机的纵横比与视口的纵横比不匹配时，客户端实现**不应**裁剪或执行非均匀缩放（“拉伸”）以填充视口。

##### [3.10.3.4。正投影](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#31034-orthographic-projection)

让
- r是正交宽度的一半，由camera.orthographic.xmag设置；
- t是正交高度的一半，由camera.orthographic.ymag设置；
- f是到远裁剪平面的距离，由camera.orthographic.zfar设置；
- n是到近裁剪平面的距离，由camera.orthographic.znear设置。

然后，投影矩阵定义如下。

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[正交投影](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#orthographic-projection)。|

\[\begin{bmatrix} 1 \over r & 0 & 0 & 0 \\ 0 & 1 \over t & 0 & 0 \\ 0 & 0 & 2 \over { n - f } & { f + n } \在 { n - f } \\ 0 & 0 & 0 & 1 \end{bmatrix}\]

当r / t与视口的纵横比不匹配时，客户端实现**不应**裁剪或执行非均匀缩放（“拉伸”）以填充视口。

### [3.11. 动画](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#311-animations)

glTF 通过节点变换的关键帧动画支持关节动画和蒙皮动画。关键帧数据存储在缓冲区中，并使用访问器在动画中引用。

glTF 2.0 还以类似的方式支持实例化变形目标的动画。

|   |   |
|---|---|
|笔记|笔记<br><br>glTF 2.0 仅支持动画节点变换和变形目标权重。规范的扩展或未来版本可能支持动画任意属性，例如材质颜色和纹理变换矩阵。|

|   |   |
|---|---|
|笔记|笔记<br><br>glTF 2.0 仅定义动画关键帧的存储，因此本规范未定义任何运行时行为，例如：播放顺序、自动开始、循环、时间线映射等。加载 glTF 2.0 资产时，客户端实现可以选择一个动画条目并将其暂停在第一帧，自动播放，或者忽略所有动画，直到用户进一步请求。当播放的动画停止时，客户端实现可能会将场景重置为初始状态或将其冻结在当前帧。|

|   |   |
|---|---|
|笔记|实施说明<br><br>glTF 2.0 没有具体定义导入时动画的使用方式，但作为最佳实践，建议每个动画都作为一个动作自包含。例如，“行走”和“奔跑”动画可能都包含针对模型的各种骨骼的多个通道。客户端实现可以选择何时播放任何可用的动画。|

所有动画都存储在资产的动画数组中。动画被定义为一组通道（通道属性）和一组采样器，这些采样器指定具有关键帧数据和插值方法的访问器（采样器属性）。

以下示例显示了动画的预期用法。

```js
{
    "animations": [
        {
            "name": "Animate all properties of one node with different samplers",
            "channels": [
                {
                    "sampler": 0,
                    "target": {
                        "node": 1,
                        "path": "rotation"
                    }
                },
                {
                    "sampler": 1,
                    "target": {
                        "node": 1,
                        "path": "scale"
                    }
                },
                {
                    "sampler": 2,
                    "target": {
                        "node": 1,
                        "path": "translation"
                    }
                }
            ],
            "samplers": [
                {
                    "input": 4,
                    "interpolation": "LINEAR",
                    "output": 5
                },
                {
                    "input": 4,
                    "interpolation": "LINEAR",
                    "output": 6
                },
                {
                    "input": 4,
                    "interpolation": "LINEAR",
                    "output": 7
                }
            ]
        },
        {
            "name": "Animate two nodes with different samplers",
            "channels": [
                {
                    "sampler": 0,
                    "target": {
                        "node": 0,
                        "path": "rotation"
                    }
                },
                {
                    "sampler": 1,
                    "target": {
                        "node": 1,
                        "path": "rotation"
                    }
                }
            ],
            "samplers": [
                {
                    "input": 0,
                    "interpolation": "LINEAR",
                    "output": 1
                },
                {
                    "input": 2,
                    "interpolation": "LINEAR",
                    "output": 3
                }
            ]
        },
        {
            "name": "Animate two nodes with the same sampler",
            "channels": [
                {
                    "sampler": 0,
                    "target": {
                        "node": 0,
                        "path": "rotation"
                    }
                },
                {
                    "sampler": 0,
                    "target": {
                        "node": 1,
                        "path": "rotation"
                    }
                }
            ],
            "samplers": [
                {
                    "input": 0,
                    "interpolation": "LINEAR",
                    "output": 1
                }
            ]
        },
        {
            "name": "Animate a node rotation channel and the weights of a Morph Target it instantiates",
            "channels": [
                {
                    "sampler": 0,
                    "target": {
                        "node": 1,
                        "path": "rotation"
                    }
                },
                {
                    "sampler": 1,
                    "target": {
                        "node": 1,
                        "path": "weights"
                    }
                }
            ],
            "samplers": [
                {
                    "input": 4,
                    "interpolation": "LINEAR",
                    "output": 5
                },
                {
                    "input": 4,
                    "interpolation": "LINEAR",
                    "output": 6
                }
            ]
        }
    ]
}
```

_通道_ 将关键帧动画的输出值连接到层次结构中的特定节点。通道的采样器属性包含存在于包含动画的采样器数组中的采样器之一的索引。target属性是一个对象，它标识哪个节点使用其node属性进行动画处理，以及节点的哪个属性使用path进行动画处理。非动画属性**必须**在动画期间保持它们的值。

当节点未定义时，通道**应该**被忽略。有效路径名是"translation"、"rotation"、"scale"和"weights"。

不包含带有变形目标的网格的节点**不得使用**“权重”路径作为目标。

在一个动画中，每个目标（节点和路径的组合）**不得**使用多次。

|   |   |
|---|---|
|笔记|实施说明<br><br>当一个目标受到两个或多个重叠采样器的影响时，这可以防止潜在的歧义。|

每个动画的**采样器**都定义了输入/输出对：一组浮点SCALAR值，表示以秒为单位的线性时间；和一组表示动画属性的向量或SCALAR。所有值都存储在缓冲区中并通过访问器访问；请参阅下表了解输出访问器类型。使用插值属性中指定的插值方法执行键之间的插值。支持的插值值包括LINEAR、STEP和CUBICSPLINE。有关插值模式的更多信息，请参阅[附录 C。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-c-interpolation)

每个采样器的输入都相对于t = 0 ，定义为父动画条目的开始。在提供的输入范围之前和之后，输出**必须**被限制在输入范围的最近端。

|   |   |
|---|---|
|笔记|实施说明<br><br>例如，如果动画的最早采样器输入是t = 10，则客户端实现必须在t = 0时开始播放该动画通道，并将输出限制为第一个可用输出值。|

给定动画中的采样器**可能**有不同的输入。

|频道.路径|存取器类型|组件类型|描述|
|---|---|---|---|
|“翻译”|“VEC3”|*float*|XYZ 平移矢量|
|“回转”|“VEC4”|*float*  <br>*signed byte* normalized  <br>_unsigned byte_ 标准化  <br>_signed short_ 标准化  <br>_unsigned short_ 标准化|XYZW旋转四元数|
|“规模”|“VEC3”|*float*|XYZ 比例矢量|
|“权重”|“SCALAR”|*float*  <br>*signed byte* normalized  <br>_unsigned byte_ 标准化  <br>_signed short_ 标准化  <br>_unsigned short_ 标准化|变形目标的权重|

实现**必须**使用以下等式从归一化整数c解码实浮点值f，反之亦然：

|访问器.componentType|整数到浮点数|浮点数到整数|
|---|---|---|
|*有符号字节*|f = max(c / 127.0, -1.0)|c = 圆（f * 127.0）|
|*无符号字节*|f = c / 255.0|c = 圆（f * 255.0）|
|*签短*|`f = max(c / 32767.0, -1.0)`|c = 圆（f * 32767.0）|
|*无符号短*|f = c / 65535.0|c = 圆（f * 65535.0）|

动画采样器的输入访问器**必须**定义其最小和最大属性。

|   |   |
|---|---|
|笔记|实施说明<br><br>具有非线性时间输入的动画，例如 Autodesk 3ds Max 或 Maya 中的时间扭曲，不能直接用 glTF 动画表示。glTF 是一种运行时格式，非线性时间输入在运行时的计算成本很高。导出器实现应该将非线性时间动画采样到线性输入和输出中，以获得准确的表示。|

变形目标动画帧由长度等于动画变形目标中目标数的SCALAR序列定义。这些SCALAR序列**必须**作为输出访问器中的单个流端到端放置，其最终大小等于变形目标的数量乘以动画帧的数量。

变形目标动画本质上是稀疏的，考虑使用[稀疏访问器](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#sparse-accessors)来存储变形目标动画。当与CUBICSPLINE插值一起使用时，切线 (a k , b k ) 和值 (v k ) 在关键帧内分组：

a 1 ,a 2 ,… a n ,v 1 ,v 2 ,… v n ,b 1 ,b 2 ,… b n

有关插值模式的更多信息，请参阅[附录 C。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-c-interpolation)

蒙皮动画是通过为蒙皮的关节层次结构中的关节设置动画来实现的。

### [3.12. 指定扩展名](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#312-specifying-extensions)

glTF 定义了一种扩展机制，允许使用新功能扩展基本格式。任何 glTF 对象**都可以**有一个可选的扩展属性，如下例所示：

```js
{
    "material": [
        {
            "extensions": {
                "KHR_materials_sheen": {
                    "sheenColorFactor": [
                        1.0,
                        0.329,
                        0.1
                    ],
                    "sheenRoughnessFactor": 0.8
                }
            }
        }
    ]
}
```

glTF 资产中使用的所有扩展**必须**列在顶级extensionsUsed数组对象中，例如，

```js
{
    "extensionsUsed": [
        "KHR_materials_sheen",
        "VENDOR_physics"
    ]
}
```

加载和/或呈现资产所需的所有 glTF 扩展**必须**列在顶级extensionsRequired数组中，例如，

```js
{
    "extensionsRequired": [
        "KHR_texture_transform"
    ],
    "extensionsUsed": [
        "KHR_texture_transform"
    ]
}
```

extensionsRequired是extensionsUsed的子集。extensionsRequired 中的所有值也**必须**存在于extensionsUsed中。

## [4. GLB文件格式规范](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#4-glb-file-format-specification)

### [4.1. 一般（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#41-general-informative)

glTF 提供了两种可以一起使用的传递选项：

- glTF JSON 指向外部二进制数据（几何、关键帧、皮肤）和图像。
- glTF JSON 使用数据 URI 嵌入 base64 编码的二进制数据和内联图像。

因此，加载 glTF 文件通常需要单独的请求来获取所有二进制数据，或者由于 base64 编码而需要额外的空间。Base64 编码需要额外的处理来解码并增加文件大小（编码资源增加约 33%）。虽然传输层 gzip 减轻了文件大小的增加，但解压缩和解码仍然会显着增加加载时间。

为了避免这种文件大小和处理开销，引入了一种容器格式_Binary glTF ，它使 glTF 资产（包括 JSON、缓冲区和图像）能够存储在单个二进制 blob 中。_

二进制 glTF 资产仍然可以引用外部资源。例如，想要将图像保存为单独文件的应用程序可能会将场景所需的所有内容（图像除外）嵌入到二进制 glTF 中。

### [4.2. 结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#42-structure)

二进制 glTF（例如，可以是文件）具有以下结构：

- 一个 12 字节的前导码，称为_header_。
- 包含 JSON 内容和二进制数据的一个或多个_块。_

包含 JSON 的块**可以**像往常一样引用外部资源，也**可以引用**存储在其他_块中__的_资源。

### [4.3. 文件扩展名和媒体类型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#43-file-extension--media-type)

与 Binary glTF 一起使用的文件扩展名是.glb。

注册的媒体类型是model/gltf-binary。

### [4.4. 二进制 glTF 布局](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#44-binary-gltf-layout)

#### [4.4.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#441-overview)

二进制 glTF 是小端。下图显示了二进制 glTF 资产的示例。

[![glb2](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/glb2.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/glb2.svg)

图 8. 二进制 glTF 布局

以下部分更详细地描述了该结构。

#### [4.4.2. 标头](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#442-header)

12 字节的标头由三个 4 字节的条目组成：

uint32 magic
uint32 version
uint32 length

- magic **必须**等于0x46546C67。它是 ASCII 字符串glTF，可用于将数据识别为二进制 glTF。
- version指示二进制 glTF 容器格式的版本。本规范定义了版本 2。

    加载 GLB 格式的客户端实现还**必须**检查JSON 块中的[资产版本属性，因为 GLB 标头中指定的版本仅指 GLB 容器版本。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#asset)

- length是二进制 glTF 的总长度，包括_标头_和所有_块_，以字节为单位。

#### [4.4.3. 大块](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#443-chunks)

##### [4.4.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#4431-overview)

每个块具有以下结构：

uint32 chunkLength
uint32 chunkType
ubyte[] chunkData

- chunkLength是chunkData的长度，以字节为单位。
- chunkType指示块的类型。详情见[表 1](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#table-chunktypes)。
- chunkData是块的二进制负载。

每个块的开始和结束**必须**与 4 字节边界对齐。请参阅填充方案的块定义。块**必须完全按照**[表 1](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#table-chunktypes)中给出的顺序出现。

表 1. 块类型

| |块类型|ASCII码|描述|出现次数|
|---|---|---|---|---|
|1.|0x4E4F534A|JSON|结构化 JSON 内容|1个|
|2.|0x004E4942|垃圾桶|二进制缓冲区|0 或 1|

客户端实现**必须**忽略具有未知类型的块，以使 glTF 扩展能够引用前两个块之后具有新类型的其他块。

##### [4.4.3.2. 结构化 JSON 内容](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#4432-structured-json-content)

该块包含 glTF JSON，因为它将在 .gltf 文件中提供。

|   |   |
|---|---|
|笔记|ECMAScript 实施说明<br><br>在 JavaScript 实现中，可以使用TextDecoder API 从 ArrayBuffer 中提取 glTF 内容，然后像往常一样使用JSON.parse解析 JSON 。|

这个块**必须**是二进制 glTF 资产的第一个块。通过首先读取这个块，实现能够逐步从后续块中检索资源。这样，也可以只从二进制 glTF 资产中读取选定的资源子集。

此块**必须用尾随**空格字符 ( 0x20 )填充以满足对齐要求。

##### [4.4.3.3. 二进制缓冲区](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#4433-binary-buffer)

此块包含几何体、动画关键帧、皮肤和图像的二进制有效负载。有关从 JSON 引用此块的详细信息，请参阅[GLB 存储的缓冲区。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#glb-stored-buffer)

这个块**必须**是二进制 glTF 资产的第二个块。

此块**必须用尾随零 (** 0x00 )填充以满足对齐要求。

当二进制缓冲区为空或以其他方式存储时，**应该**省略此块。

## [5.属性参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#5-properties-reference)

|   |   |
|---|---|
|笔记|笔记<br><br>此部分是自动生成的，预览时将成为断开的链接。查看完整的[属性参考部分](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#properties-reference)。要提出更改建议，请打开合并请求以编辑[JSON 架构文件](https://github.com/KhronosGroup/glTF/tree/main/specification/2.0/schema)。|

[属性参考.adoc](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/PropertiesReference.adoc)

## [6.致谢（信息性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#6-acknowledgments-informative)

### [6.1. 编辑部](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#61-editors)

- Saurabh Bhatia，微软
- Patrick Cozzi，铯
- Alexey Knyazev，个人贡献者
- 托尼·帕里西，Unity

### [6.2. Khronos 3D 格式工作组和校友](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#62-khronos-3d-formats-working-group-and-alumni)

- 雷米阿诺，Vario
- 迈克·邦德，Adobe
- Leonard Daly，个人贡献者
- 埃米利亚诺·甘巴雷托，Adobe
- Tobias Häußler，达索系统
- 微软的 Gary Hsu
- Marco Hutter，个人贡献者
- Uli Klumpp，个人贡献者
- Max Limper, Fraunhofer IGD
- Ed Mackey，Analytical Graphics, Inc.
- 唐·麦柯迪，谷歌
- 斯科特·纳吉，微软
- 诺伯特·诺珀，UX3D
- Fabrice Robinet，个人贡献者（前任编辑和孵化器）
- Bastian Sdorra，达索系统
- NVIDIA 的尼尔·特雷维特
- 扬·保罗·范韦弗伦，Oculus
- 阿曼达·沃森，Oculus

### [6.3. 特别感谢](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#63-special-thanks)

- Sarah Chow，铯
- 汤姆·菲利，铯
- 达里尔高夫
- 埃里克·海恩斯，欧特克
- Yu Chen Hou, 个人贡献者
- Scott Hunter，Analytical Graphics, Inc.
- 布兰登·琼斯，谷歌
- Arseny Kapoulkine，个人贡献者
- Jon Leech，个人贡献者
- 肖恩·里利，铯
- 胡安·利尼茨基，戈多引擎
- Matthew McMullan，个人贡献者
- Mohamad Moneimne，宾夕法尼亚大学
- Kai Ninomiya，前身为 Cesium
- 塞德里克·品森，Sketchfab
- 杰夫·罗素，狨猴
- Miguel Sousa, Fraunhofer IGD
- Timo Sturm，弗劳恩霍夫 IGD
- Rob Taglang，铯
- Maik Thöner，弗劳恩霍夫 IGD
- Steven Vergenz，AltspaceVR
- Corentin Wallez，谷歌
- Alex Wood，分析图形公司

## [附录 A：JSON 模式参考（资料性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-a-json-schema-reference-informative)

|   |   |
|---|---|
|笔记|笔记<br><br>此部分是自动生成的，预览时将成为断开的链接。查看完整的[JSON 架构参考](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#appendix-a-json-schema-reference)。要提出更改建议，请打开合并请求以编辑[JSON 架构文件](https://github.com/KhronosGroup/glTF/tree/main/specification/2.0/schema)。|

[JsonSchemaReference.adoc](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/JsonSchemaReference.adoc)

## [附录 B：BRDF 实现](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-b-brdf-implementation)

### [B.1. 一般的](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b1-general)

本章介绍 glTF 2.0 金属粗糙度材料的双向反射分布函数 (BRDF)。BRDF 描述了基于物理的材料表面的反射特性。对于一对方向，BRDF 返回有多少来自入射方向的光在出射方向上从表面反射。

|   |   |
|---|---|
|笔记|笔记<br><br>参见[Pharr 等人。(2016)，第 5.6 章“表面反射”](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Pharr2016)，介绍了辐射测量和 BRDF。|

金属粗糙度材质的 BRDF 是金属 BRDF 和电介质 BRDF 的线性插值。BRDF 共享粗糙度和基色的参数。混合因子金属描述了材料的金属度。

```js
material = mix(dielectric_brdf, metal_brdf, metallic)
         = (1.0 - metallic) * dielectric_brdf + metallic * metal_brdf
```

|   |   |
|---|---|
|笔记|笔记<br><br>[这种基于金属和介电元件线性插值的材料模型由Burley (2012)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Burley2012)引入，并被许多渲染器采用，从而产生了支持它的广泛应用。<br><br>通常，材料是金属或电介质。为1.0或0.0的金属提供的纹理将金属与网格上的介电区域分开。有些情况下没有明确的分离。由于抗锯齿或 mip-mapping，纹素内可能存在一部分金属和一部分电介质。此外，由多个半透明层组成的材料可以表示为多个单层材料之间的混合（通过参数混合分层）。|

材料的逻辑结构如下所示，使用抽象符号将材料描述为有向无环图 (DAG)。顶点对应于材料模型的基本构建块：BRDF、混合运算符、输入参数和常量。接下来是一个信息丰富的示例实现，作为 BRDF 和混合运算符的一组方程和源代码。

### [B.2. 材料结构](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b2-material-structure)

#### [B.2.1. 金属](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b21-metals)

金属表面反射大部分光照，只有一小部分光被材料吸收。

|   |   |
|---|---|
|笔记|笔记<br><br>参见[Pharr 等人。(2016)，第 8.2 章“镜面反射和透射”](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Pharr2016)。|

这种效应由具有波长相关折射率和消光系数的菲涅尔项conductor_fresnel描述。为了简化参数化，金属粗糙度材料将这两个量组合成一个用户定义的颜色值baseColor，它定义了垂直入射时的反射颜色，也称为f0。掠入射时的反射颜色称为f90。设置为1.0是因为任何材质的掠角反射率都接近纯白色。导体菲涅耳项调制由粗糙度参数参数化的镜面反射 BRDF 的贡献。


```js
metal_brdf =
  conductor_fresnel(
    f0 = baseColor,
    bsdf = specular_brdf(
      α = roughness ^ 2))

```

#### [B.2.2. 电介质](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b22-dielectrics)

与金属不同，介电材料将大部分入射光传输到物体内部，菲涅耳项仅由折射率参数化。

|   |   |
|---|---|
|笔记|笔记<br><br>参见[Pharr 等人。(2016)，第 8.2 章“镜面反射和透射”](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Pharr2016)。|

这使得玻璃、油、水或空气等电介质变得透明。其他电介质，如大多数塑料材料，填充有吸收或散射大部分或全部透射光的颗粒，从而降低透明度并赋予表面彩色外观。

因此，介电材料被建模为镜面 BRDF 的菲涅耳加权组合，模拟表面反射，以及漫反射 BRDF，模拟光在物体内部被吸收和散射的透射部分。反射粗糙度由材料的平方粗糙度给出。漫反射 BRDF 的颜色来自baseColor。与传输相比，反射量取决于方向，因此由菲涅耳项决定。其折射率设置为1.5的固定值，这是对大多数不透明介电材料的良好折衷。


```js
dielectric_brdf =
  fresnel_mix(
    ior = 1.5,
    base = diffuse_brdf(
      color = baseColor),
    layer = specular_brdf(
      α = roughness ^ 2))
```


#### [B.2.3. 微表面](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b23-microfacet-surfaces)

金属 BRDF 和电介质 BRDF 基于微面模型。

|   |   |
|---|---|
|笔记|笔记<br><br>微面模型背后的理论是由[Torrance 和 Sparrow (1967)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#TorranceSparrow1967)、[Cook 和 Torrance (1982)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#CookTorrance1982)等人在早期著作中发展起来的。|

微面模型将表面上的微小面（微面）的方向描述为统计分布。该分布将小平面的方向确定为围绕表面法线方向的随机扰动。扰动强度取决于粗糙度参数，在0.0（光滑表面）和1.0（粗糙表面）之间变化。在过去的几十年中，已经提出了许多分布函数。

Trowbridge-Reitz / GGX 微面分布将微表面描述为由完美的镜面反射、无穷小扁椭圆体组成，其法线方向的半高是切平面半径的 α 倍。α = 1 给出球体，这导致在所有方向上均匀反射。这种反射行为对应于粗糙的表面。α = 0 给出完美的镜面。

|   |   |
|---|---|
|笔记|笔记<br><br>[Trowbridge 和 Reitz (1975)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#TrowbridgeReitz1975)首先描述了 Trowbridge-Reitz 分布。后来[沃尔特等人。(2007)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Walter2007)独立开发了相同的发行版并将其称为“GGX”。他们表明，由于尾部更强，它比[Cook 和 Torrance (1982)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#CookTorrance1982)使用的贝克曼分布更适合测量数据。|

映射 α =粗糙度2会导致粗糙度的感知线性变化。

|   |   |
|---|---|
|笔记|笔记<br><br>[此映射由Burley (2012)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Burley2012)建议。|

该分布仅描述微表面上每个法线的比例。它没有描述法线是如何组织的。为此，我们需要一个微表面轮廓。

|   |   |
|---|---|
|笔记|笔记<br><br>[Heitz (2014)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Heitz2014)详细介绍了分布和剖面之间的区别，此外，他还提供了对常见微面剖面的广泛研究。基于这项工作，我们建议使用 Smith 微表面轮廓（最初由[Smith (1967)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Smith1967)开发）及其相应的掩蔽-阴影函数。Heitz 将 Smith 剖面描述为最准确的随机高度场反射模型。它假设相邻点之间的高度和法线不相关，这意味着一组随机的微面而不是连续的表面。<br><br>微面模型通常不考虑多重散射。阴影项抑制第二次与微表面相交的光。[海茨等人。(2016)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Heitz2016)扩展了基于 Smith 的微面模型以包含多重散射分量，这显着提高了模型预测的准确性。我们建议尽可能合并多重散射，方法是使用 Heitz 引入的无偏随机评估，或稍后提出的一种近似值，例如 Kulla 和[Conty (2017)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#KullaConty2017)或[Turquin (2019)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Turquin2019)提出的。|

#### [B.2.4. 完整模型](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b24-complete-model)

下图总结了金属粗糙度材料中使用的 BRDF 和混合算子。

[![pbr](https://github.com/KhronosGroup/glTF/raw/main/specification/2.0/figures/pbr.svg)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/figures/pbr.svg)

图 9. BRDF 和混合算子

glTF 规范旨在允许应用程序根据他们的要求选择不同的照明实现。一些实现**可能**专注于光传输的准确模拟，而其他实现**可能**选择提供实时性能。因此，任何遵守混合 BRDF 规则的实现都符合 glTF 规范。

在物理上精确的光模拟中，BRDF**必须**遵循一些基本原则：BRDF**必须**是正的、倒数的和能量守恒的。这确保了模拟的视觉输出独立于底​​层渲染算法（如果它是无偏的）。

具有物理真实 BRDF 的无偏光模拟将成为实时渲染器中近似值的基本事实，这些近似值通常有偏差，但仍能提供视觉上令人愉悦的结果。

### [B.3. 示例实施（信息性）](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b3-sample-implementation-informative)

#### [B.3.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b31-overview)

通常，渲染器使用近似值来求解渲染方程，例如基于图像的照明的拆分求和近似值，或简化数学以节省指令并减少寄存器压力。但是，有很多方法可以实现良好的近似值，具体取决于平台。

[https://github.com/KhronosGroup/glTF-Sample-Viewer/](https://github.com/KhronosGroup/glTF-Sample-Viewer/)提供了示例实现，并提供了基于 glTF 材质参数的标准 BRDF 的 WebGL 2.0 实现示例。为了在实时应用程序中实现高性能，此实现使用了多个近似值并使用了打破能量守恒和互易性的非物理简化。

我们使用以下符号：

- **V**是从阴影位置到眼睛的归一化向量
- **L**是从着色位置到光线的归一化向量
- **N**是与上述值相同空间中的表面法线
- **H**是半向量，其中**H** = normalize( **L** + **V** )

#### [B.3.2. 高光 BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b32-specular-brdf)

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[镜面反射 BRDF 部分](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#specular-brdf)。|

镜面反射specular_brdf(α)是一个microfacet BRDF

```js
\[\text{MicrofacetBRDF} = \frac{GD}{4 \, \left|N \cdot L \right| \, \左| N \cdot V \右|}\]
```

使用 Trowbridge-Reitz/GGX 微表面分布

```js
\[D = \frac{\alpha^2 \, \chi^{+}(N \cdot H)}{\pi ((N \cdot H)^2 (\alpha^2 - 1) + 1)^ 2}\]
```

和史密斯联合掩蔽-阴影函数的可分离形式

```js
\[G = \frac{2 \, \left| N \cdot L \右| \, \chi^{+}(H \cdot L)}{\left| N \cdot L \右| + \sqrt{\alpha^2 + (1 - \alpha^2) (N \cdot L)^2}} \frac{2 \, \left| N \cdot V \右| \, \chi^{+}(H \cdot V)}{\left| N \cdot V \右| + \sqrt{\alpha^2 + (1 - \alpha^2) (N \cdot V)^2}}\]
```

其中 χ + ( **x** ) 表示 Heaviside 函数：如果**x** > 0 则为 1，如果**x** ⇐ 0 则为 0。有关公式的推导，请参见[Heitz (2014) 。](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Heitz2014)

介绍可见性功能

```js
\[V = \frac{G}{4 \, \left| N \cdot L \右| \, \左| N \cdot V \右|}\]
```

将原始微面 BRDF 简化为
```js
\[\text{MicrofacetBRDF} = VD\]
```
和
```js
\[V = \frac{\, \chi^{+}(H \cdot L)}{\left| N \cdot L\右| + \sqrt{\alpha^2 + (1 - \alpha^2) (N \cdot L)^2}} \frac{\, \chi^{+}(H \cdot V)}{\left| N \cdot V \右| + \sqrt{\alpha^2 + (1 - \alpha^2) (N \cdot V)^2}}\]
```

因此，我们有函数

```js
function specular_brdf(α) {
  return V * D
}
```

#### [B.3.3. 漫反射BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b33-diffuse-brdf)

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[漫反射 BRDF 部分](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#diffuse-brdf)。|

漫反射diffuse_brdf(color)是 Lambertian BRDF
```js
\[\text{LambertianBRDF} = \frac{1}{\pi}\]
```
与颜色相乘。
```js
function diffuse_brdf(color) {
  return (1/pi) * color
}
```

#### [B.3.4. 菲涅耳](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b34-fresnel)

|   |   |
|---|---|
|笔记|笔记<br><br>此部分包含可能无法在所有预览工具中正确显示的公式。查看完整的[菲涅耳部分](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#fresnel)。|

[Schlick (1994)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Schlick1994)开发了一种可用于导体和电介质的菲涅耳项的廉价近似值：
```js
\[F = f_0 + (1 - f_0) (1 - \left| V \cdot H \right| )^5\]
```

导体 Fresnel`conductor_fresnel(f0, bsdf)`将依赖于视图的色调应用于 BSDF：
```js
function conductor_fresnel(f0, bsdf) {
  return bsdf * (f0 + (1 - f0) * (1 - abs(VdotH))^5)
}
```

对于电介质 BRDF，漫反射组件基础和镜面反射组件层通过 组合在一起`fresnel_mix(ior, base, layer)`。f0颜色现在从折射率ior导出。
```js
function fresnel_mix(ior, base, layer) {
  f0 = ((1-ior)/(1+ior))^2
  fr = f0 + (1 - f0)*(1 - abs(VdotH))^5
  return mix(base, layer, fr)
}
```

#### [B.3.5. 金属 BRDF 和电介质 BRDF](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b35-metal-brdf-and-dielectric-brdf)

[现在我们已经实现了 glTF 金属粗糙度材料模型中使用的所有函数，我们可以根据“完整模型”](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#complete-model)部分中显示的图表连接函数。通过将混合函数（fresnel_mix、conductor_fresnel）替换为实现，我们得到以下金属和电介质成分的 BRDF：

```js
metal_brdf = specular_brdf(roughness^2) * (baseColor.rgb + (1 - baseColor.rgb) * (1 - abs(VdotH))^5)
dielectric_brdf = mix(diffuse_brdf(baseColor.rgb), specular_brdf(roughness^2), 0.04 + (1 - 0.04) * (1 - abs(VdotH))^5)
```

请注意，介电折射率ior = 1.5现在是f0 = 0.04。

金属和电介质按金属度混合：

```js
material = mix(dielectric_brdf, metal_brdf, metallic)
```

利用金属和电介质共享粗糙度以及使用 Schlick Fresnel 的事实，我们可以简化混合并得出材料的最终 BRDF：

```js
const black = 0

c_diff = lerp(baseColor.rgb, black, metallic)
f0 = lerp(0.04, baseColor.rgb, metallic)
α = roughness^2

F = f0 + (1 - f0) * (1 - abs(VdotH))^5

f_diffuse = (1 - F) * (1 / π) * c_diff
f_specular = F * D(α) * G(α) / (4 * abs(VdotN) * abs(LdotN))

material = f_diffuse + f_specular
```

#### [B.3.6. 讨论](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b36-discussion)

##### [B.3.6.1.掩蔽-阴影项和多重散射](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b361-masking-shadowing-term-and-multiple-scattering)

可以通过多种方式改进镜面反射模型。[Heitz (2014)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Heitz2014)指出，由于微表面的高度，掩蔽-阴影函数的更准确形式考虑了掩蔽和阴影之间的相关性。这种相关性在高度相关的掩蔽和阴影功能中得到了解释。通过对多次散射进行建模可以实现精度的另一个提高，请参阅[“微平面表面”](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#microfacet-surfaces)部分。

##### [B.3.6.2.Schlick 的菲涅耳近似](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b362-schlicks-fresnel-approximation)

尽管 Schlick 的菲涅耳对于范围广泛的金属和介电材料是一个很好的近似，但有几个理由对菲涅耳项使用更复杂的解决方案。

金属通常在掠射角附近表现出反射率“下降”，这在 Schlick Fresnel 中不存在。[Lazányi 和 Szirmay-Kalos (2005)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#LazanyiSzirmayKalos2005)用误差项扩展了 Schlick Fresnel 来解释它。[Hoffman (2019)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Hoffman2019)通过引入艺术家友好的f82颜色（大约 82° 角的颜色）改进了该术语的参数化。[Gulbrandsen (2014)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Gulbrandsen2014)还介绍了金属的附加颜色参数. Gulbrandson 将其称为“边缘色调”并在完整的菲涅尔方程中使用它而不是 Schlick 的近似值。尽管完整的菲涅尔方程应该给出更准确的结果，但 Hoffman 表明它在 RGB 渲染器的上下文中比 Schlick 的近似更差。由于我们以 RGB 渲染器为目标并且不为 glTF 中的金属提供额外的颜色参数，因此我们建议对金属使用原始的 Schlick Fresnel。

大多数电介质的折射率为 1.5。因此，介电菲涅耳项使用固定的f0 = 0.04. 对于范围 [1.2, 2.2] 内的折射率，Schlick Fresnel 可以很好地近似完整的 Fresnel 方程。材质超出此范围的主要原因是透明度和嵌套对象。如果一个透明物体与另一个透明物体重叠并且两者具有相同（或相似）的折射率，则边界处的结果比率为 1（或接近 1）。根据完整的菲涅尔方程，在这种情况下没有（或几乎没有）反射。从 Schlick Fresnel 近似计算的反射强度将太高。鼓励在嵌套电介质的情况下关心精度的实现对电介质使用完整的菲涅尔方程。对于金属，Schlick 的近似值仍然是一个不错的选择。

##### [B.3.6.3. 耦合漫反射和镜面反射](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b363-coupling-diffuse-and-specular-reflection)

虽然本节中提出的fresnel_mix中漫反射和镜面反射分量的耦合计算起来简单且成本低廉，但它不是很准确并且破坏了基于物理的 BRDF 必须满足的基本属性 - 能量守恒。能量守恒意味着 BRDF 反射的光不能多于接收到的光。已经提出了几个修复方案，每个修复方案在性能和质量方面都有自己的权衡。

[Burley (2012)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Burley2012)指出，在许多模型中发现的一个常见解决方案是通过使用视图和光方向而不是半矢量评估菲涅耳项两次来计算漫射菲涅耳因子：`(1-F(NdotL)) * (1-F(NdotV))`。虽然这是节能的，但他指出，这种加权会导致掠射角处明显变暗，这是他们在测量中无法观察到的效果。他们建议对漫反射 BRDF 进行一些更改，以使其更好地预测测量结果，但即使是固定版本在数学上仍然不守恒。

最近，[Jakob 等人。(2014)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#Jakob2014)开发了一个通用框架来计算层状材料的 BSDF，包括层内的多次散射。在更复杂的场景中，它还解决了耦合漫反射和镜面反射分量的特殊情况，但它对于纹理材质来说太重了，即使在离线渲染中也是如此。

[Kulla 和 Conty (2017)](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#KullaConty2017)找到了一种针对耦合漫反射和镜面反射分量的特殊情况量身定制的解决方案，该解决方案易于计算。它需要预先计算菲涅尔加权镜面反射 BRDF 的方向反照率并制成表格，但他们发现该函数很平滑，低分辨率 3D 纹理（16³ 像素）就足够了。他们耦合的漫反射-镜面反射模型不仅能量_守恒_，而且能量_保存_，这意味着如果镜面反射和漫反射分量都不吸收任何能量，所有能量都会被反射。

### [B.4. 参考](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#b4-references)

- [Burley, B. (2012)：迪士尼的基于物理的着色。](https://disneyanimation.com/publications/physically-based-shading-at-disney/)
- [Cook、RL 和 KE Torrance (1982)：计算机图形学的反射模型。ACM 图形交易 1 (1), 7-24。](https://graphics.pixar.com/library/ReflectanceModel/paper.pdf)
- [Gulbrandsen, O. (2014)：艺术家友好的金属菲涅耳](http://jcgt.org/published/0003/04/03/paper-lowres.pdf)
- [Heitz, E. (2014)：了解基于微面的 BRDF 中的掩蔽-阴影函数](http://jcgt.org/published/0003/02/03/paper.pdf)
- [Heitz, E.、J. Hanika、E. d'Eon 和 C. Dachsbacher (2016)：使用 Smith 模型的多重散射微面 BSDF](https://eheitzresearch.wordpress.com/240-2/)
- [Naty Hoffman (2019)：菲涅尔方程被认为是有害的](https://renderwonk.com/publications/mam2019/)
- [Jakob, W., E. d'Eon, O. Jakob, S. Marschner (2014)：渲染分层材质的综合框架](https://research.cs.cornell.edu/layered-sg14/)
- [Kulla, C. 和 A. Conty (2017)：重温 Imageworks 的基于物理的着色](https://blog.selfshadow.com/publications/s2017-shading-course/imageworks/s2017_pbs_imageworks_slides_v2.pdf)
- [Lazanyi, I. 和 L. Szirmay-Kalos (2005)：金属的菲涅耳项近似](http://wscg.zcu.cz/WSCG2005/Papers_2005/Short/H29-full.pdf)
- [Pharr, M.、W. Jakob 和 G. Humphreys (2016)：基于物理的渲染：从理论到实施，第 3 版。](https://www.pbr-book.org/)
- [Schlick, C. (1994)：用于基于物理的渲染的廉价 BRDF 模型。计算机图形学论坛 13, 233-246。](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.50.2297&rep=rep1&type=pdf)
- [Smith, B. (1967)：随机粗糙表面的几何阴影。IEEE 天线和传播汇刊 15 (5), 668-671。](https://ieeexplore.ieee.org/document/1138991)
- [Torrance, KE, EM Sparrow (1967)：粗糙表面的非镜面反射理论。美国光学学会杂志 57 (9), 1105-1114。](https://www.graphics.cornell.edu/~westin/pubs/TorranceSparrowJOSA1967.pdf)
- [Trowbridge, T. 和 KP Reitz (1975)：用于光线反射的粗糙表面的平均不规则表示。美国光学学会杂志 65 (5), 531-536。](https://www.osapublishing.org/josa/abstract.cfm?uri=josa-65-5-531)
- [Turquin E. (2019)：微面模型的实用多重散射补偿](https://blog.selfshadow.com/publications/turquin/ms_comp_final.pdf)
- [Walter, B.、S. Marschner、H. Li 和 K. Torrance (2007)：用于通过粗糙表面进行折射的微平面模型。](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html)

## [附录 C：动画采样器插值模式](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#appendix-c-animation-sampler-interpolation-modes)

### [C.1. 概述](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#c1-overview)

|   |   |
|---|---|
|笔记|笔记<br><br>本附录包含可能无法在所有预览工具中正确显示的公式。查看完整的[附录 C：动画采样器插值模式](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#appendix-c-interpolation)。|

动画采样器插值模式定义了如何为位于关键帧之间的时间戳计算动画属性的值。当动画数据中存在当前（请求的）时间戳时，其关联的属性值**必须**按原样使用，无需插值。

对于以下部分，让

- \$n\$为关键帧总数，\$n > 0\$；
- \$t_k\$ 是第 \$k\$ 个关键帧的时间戳，\$k \in [1,n]\$；
- \$v_k\$ 是第 \$k\$ 关键帧的动画属性值；
- \$t_c\$ 是当前（请求的）时间戳，\$t_k < t_c < t_{k+1}\$；
- \$t_d = t_{k + 1} - t_k\$ 是插值段的持续时间；
- \$t = (t_c - t_k) / t_d\$ 是分段归一化插值因子。

SCALAR向量乘法是每个向量分量。

### [C.2. 步进插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#c2-step-interpolation)

当动画采样器插值模式设置为STEP时使用此模式。

当前（请求的）时间戳 \$t_c\$ 的内插采样器值 \$v_t\$ 计算如下。

\[v_t = v_k\]

### [C.3. 线性插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#c3-linear-interpolation)

当动画采样器插值模式设置为LINEAR并且动画属性不是rotation时使用此模式。

当前（请求的）时间戳 \$t_c\$ 的内插采样器值 \$v_t\$ 计算如下。

\[v_t = (1 - t) *v_k + t* v_{k+1}\]

### [C.4. 球面线性插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#c4-spherical-linear-interpolation)

当动画采样器插值模式设置为LINEAR且动画属性为rotation时使用此模式，即动画属性的值是单位四元数。

让

- \$a = arccos(|v_k \cdot v_{k+1}|)\$为连续两个四元数点积的绝对值的反余弦；
- \(s = \frac{v_k \cdot v_{k+1}}{|v_k \cdot v_{k+1}|}\) 是两个连续四元数点积的符号。

时间戳 \$t_c\$ 处的内插采样器值 \$v_t\$ 计算如下。

\[v_t = \frac{sin(a(1 - t))}{sin(a)} *v_k + s* \frac{sin(at)}{sin(a)} * v_{k+1}\ ]

|   |   |
|---|---|
|笔记|实施说明<br><br>使用点积的绝对值计算 \$a\$ 并将 \$v_{k+1}\$ 乘以点积的符号确保球面插值遵循沿着由两个四元数定义的大圆的短路径。|

实现**可以**近似这些方程以达到特定于应用程序的精度和/或性能目标。

|   |   |
|---|---|
|笔记|实施说明<br><br>当 \$a\$ 接近于零时，球面线性插值变为规则线性插值。|

### [C.5. 三次样条插值](https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#c5-cubic-spline-interpolation)

当动画采样器插值模式设置为CUBICSPLINE时使用此模式。

使用三次样条插值的动画采样器**必须**至少有 2 个关键帧。

对于存储在动画采样器中的每个时间戳，存在三个关联的关键帧值：入切线、属性值和出切线。

让

- \$a_k\$、\$v_k\$ 和 \$b_k\$ 分别是第 \$k\$ 帧的入切线、属性值和出切线。

时间戳 \$t_c\$ 处的内插采样器值 \$v_t\$ 计算如下。

\[v_t = (2t^3 - 3t^2 + 1) *v_k + t_d(t^3 - 2t^2 + t)* b_k + (-2t^3 + 3t^2) _v_{k+1} + t_d(t^3 - t^2)*a*{k+1}\]

当动画采样器以节点的旋转属性为目标时，插值的四元数**必须**在将结果应用于节点的旋转之前进行归一化。

当写出旋转值时，导出器**应该**注意不要写出可能导致无效四元数的值，插值产生所有零值。

|   |   |
|---|---|
|笔记|实施说明<br><br>这可以通过确保所有关键帧的 \$v_k != -v_{k+1}\$ 来实现。|

第一个入切线 \$a_1\$ 和最后一个出切线 \$b_n\$**应该**为零，因为它们不用于样条计算
