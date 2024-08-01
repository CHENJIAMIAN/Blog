### gltf-transform/cli
如果您的 GLB 模型包含相同网格的多次重复，则 glTF Transform 可以检测到这一点，合并任何冗余数据，并（可选）添加 EXT_mesh_gpu_instancing 扩展，使 GLTFLoader 创建 THREE.InstancedMesh 对象。
> CLI 中的典型用法如下所示：
```bash
npm install --global @gltf-transform/cli # install
gltf-transform --help # help

# 利用所有可用的方法优化模型
gltf-transform optimize out.glb out_optimize.glb
```

```bash
# 步骤 1: 简化网格，减少顶点数目  
gltf-transform simplify in.glb out_simplified.glb  
	--ratio 0 --error 1
	--ratio 0  # 设置目标简化比例为 0，意味着尽可能多地减少顶点数量，达到最大简化效果  
	--error 1  # 设置误差限制为 1，允许误差达到 100%，不再控制视觉质量与原模型的差异

# 步骤 2: 去除未引用的属性  
gltf-transform prune out_simplified.glb out_pruned.glb  

# 步骤 3: 合并相似物体，减少绘制调用  
gltf-transform join out_pruned.glb out_joined.glb  

# 步骤 4: 使用 Draco 压缩几何体  
gltf-transform draco out_joined.glb out_draco.glb  

# 步骤 5: 量化几何体，进一步减少内存消耗  
gltf-transform quantize out_draco.glb out_quantized.glb  

# 步骤 6: 优化材质，将材质从镜面/光泽转换为金属/粗糙  
gltf-transform metalrough out_quantized.glb out_metalrough.glb  

# 步骤 7: 压缩纹理，调整纹理大小  
gltf-transform resize out_metalrough.glb out_resized.glb  --power-of-two nearest 
	--power-of-two #将纹理调整为最接近的2的幂

# 步骤 8: 创建GPU实例，减少内存使用  
gltf-transform instance out_resized.glb out_instanced.glb  

# 步骤 9: 使用Gzip压缩模型，减少文件大小  
gltf-transform gzip out_instanced.glb


```
- [cli.ts - donmccurdy/glTF-Transform - GitHub1s](https://github1s.com/donmccurdy/glTF-Transform/blob/HEAD/packages/cli/src/cli.ts#L338)
- [palette | glTF Transform](https://gltf-transform.dev/modules/functions/functions/palette)
- 分割glb文件:  [Divide glTF Document](https://gist.github.com/donmccurdy/c718bc71163dcd20f8080e9f0d22c3fe) Divide glTF 失败, 转出来顶点混乱

```markdown
#### 1. 命令概述
- 使用命令格式：`cli.js help <command>` 来获取特定命令的帮助。

#### 2. INSPECT（检查和验证）
- **inspect**: 检查模型的内容。
- **validate**: 根据 glTF 规范验证模型。

#### 3. PACKAGE（模型处理）
- **copy**: 复制模型，进行最小更改。
- **optimize**: 利用所有可用的方法优化模型。
- **merge**: 将两个或多个模型合并为一个。
- **partition**: 将二进制数据分离为单独的 .bin 文件。
- **dedup**: 去除访问器和纹理的重复项。
- **prune**: 移除文件中未引用的属性。
- **gzip**: 使用无损 gzip 压缩模型。
- **xmp**: 添加或修改 XMP 元数据。

#### 4. SCENE（场景操作）
- **center**: 将场景中心放在原点或其上下方。
- **instance**: 从共享网格引用创建 GPU 实例。
- **flatten**: 扁平化场景图。
- **join**: 合并网格并减少绘制调用。

#### 5. GEOMETRY（几何体处理）
- **draco**: 使用 Draco 压缩几何体。
- **meshopt**: 使用 Meshopt 压缩几何体和动画。
- **quantize**: 减少几何体精度和内存，进行量化处理。
- **dequantize**: 反量化几何体。
- **weld**: 合并等效顶点以优化几何体。
- **unweld**: 解索引几何体，断开任何共享顶点。
- **tangents**: 生成 MikkTSpace 顶点切线。
- **reorder**: 优化顶点数据，提高参考局部性。
	`--target`:
		- `"size"`: 优化传输大小（推荐用于 Web 应用）。
		- `"performance"`: 优化 GPU 渲染性能。
- **simplify**: 简化网格，减少顶点数量。

gltf-transform draco in.glb out_draco.glb  # 1. Draco 压缩几何体
gltf-transform meshopt in.glb out_meshopt.glb  # 2. Meshopt 压缩几何体和动画
gltf-transform quantize in.glb out_quantize.glb  # 3. 量化处理（减少几何体精度和内存）
gltf-transform dequantize in.glb out_dequantize.glb  # 4. 反量化几何体
gltf-transform weld in.glb out_weld.glb  # 5. 合并等效顶点以优化几何体
gltf-transform unweld in.glb out_unweld.glb  # 6. 解索引几何体，断开任何共享顶点
gltf-transform tangents in.glb out_tangents.glb  # 7. 在使用法线贴图时，若需确保渲染的一致性和视觉质量，尤其在不同软件之间转换模型时，应使用 `gltf-transform tangents` 生成 MikkTSpace 顶点切线。
gltf-transform reorder in.glb out_reorder.glb  --target performance # 8. 优化顶点数据的引用局部性是指重新排列顶点数据的顺序(程序访问数据时倾向于访问相邻的、最近使用的数据)
gltf-transform simplify in.glb out_simplify.glb --percent 50  # 9. 简化网格，减少顶点数量

#### 6. MATERIAL（材质处理）
- **metalrough**: 将材质从镜面/光泽转为金属/粗糙。
- **palette**: 创建调色板纹理并合并材质。
- **unlit**: 将金属/粗糙材质转换为无光照材质。

#### 7. TEXTURE（纹理处理）
- **resize**: 调整 PNG 或 JPEG 纹理的大小。
- **etc1s**: KTX + Basis ETC1S 纹理压缩。
- **uastc**: KTX + Basis UASTC 纹理压缩。
- **ktxfix**: 修复 KTX 纹理元数据中的常见问题。
- **avif**: AVIF 纹理压缩。
- **webp**: WebP 纹理压缩。
- **png**: PNG 纹理压缩。
- **jpeg**: JPEG 纹理压缩。

#### 8. ANIMATION（动画处理）
- **resample**: 对动画进行重新采样，无损去重关键帧。
- **sequence**: 以翻页序列形式动画化节点可见性。
- **sparse**: 减少零填充数组的存储空间。

### 总结
该命令集提供多种工具用于优化、处理和验证3D模型，包括场景、几何体、材质、纹理和动画方面的操作，适合于3D内容创作者和开发者提高工作效率与模型质量。
```
### PBR
> 它基于物理原理模拟光线的行为，以更加真实地渲染场景

通常情况下，PBR可以分为两种主要类型：
1. **新**: 金属度（Metallic）PBR：这种类型的PBR基于金属度属性来描述材质的特性。金属度材质通常具有金属质感，如钢铁、铜等。金属度PBR使用金属度（Metallic）和粗糙度（Roughness）两个参数来描述材质的外观。金属度为0表示非金属材质，金属度为1表示完全金属的材质。
2. **gltf2.0废弃**: 非金属度（Specular/Glossiness）PBR：这种类型的PBR使用非金属度（Specular）和光泽度（Glossiness）来描述材质的特性。非金属度材质通常具有非金属的外观，如木材、塑料等。非金属度PBR使用非金属度和光泽度两个参数来定义材质的外观，其中非金属度表示材质的镜面反射率，光泽度表示材质的平滑程度。
### 研究一下 glb,为什么会和展示的不一样
- 现在平台的three版本是r129最新是r159(2023年12月15日)
- **win10的3D查看器导出的glb的****KHR_materials_pbrSpecularGlossiness**是最新的three废弃掉的.
	- r146还支持的, r147就没了
	- [GLTFLoader、GLTFExporter：通过 donmccurdy 删除 KHR_materials_pbrSpecularGlossiness · Pull 请求 #24950 · mrdoob/ Three.js](https://github.com/mrdoob/three.js/pull/24950)
		- 作者推荐适配的方法:
			1. 在线gltf.report 查看器,会自动转为2.0规范: [glTF Report --- GLTF报告](https://gltf.report/)
			2. 用gltf-transform
	- 在最新的three.js版本中，GLTFLoader废弃了对`KHR_materials_pbrSpecularGlossiness`的支持，因为这个扩展已经不再是GLTF 2.0的一部分了。`KHR_materials_pbrSpecularGlossiness`是在GLTF 2.0规范发布之前开发的一个扩展，它添加了一些额外的参数，例如镜面反射和粗糙度，以支持基于镜面反射和粗糙度的PBR材质模型。
	- 然而，后来GLTF 2.0规范添加了对基于金属度的PBR材质模型的支持，这个模型更为通用，使得`KHR_materials_pbrSpecularGlossiness`变得不再必要。因此，最新的three.js版本不再支持这个扩展，而是使用GLTF 2.0规范中的基于金属度的PBR材质模型来处理GLTF文件中的材质。这样可以使得three.js的GLTFLoader与GLTF 2.0规范更加兼容，并且简化了代码实现。
- Win10的3D查看器的光: 一个正面光(偏上,偏右), 一个后面光(偏上,偏左), 一个纯正面光, 环境光40
- 不同的gltf版本, 不兼容, 导出的glb版本会在查看器查看, 查看时要确保查看器支持的glb版本跟该文件glb版本一致, 此外还有很多扩展, 要确保glb中的扩展(如果有)有被查看器实现
- 用3dsmax2023版导出可用新增的 `glTF材质`
- 用于 Babylon.js 导出的模型[可使用 3ds Max 标准材质或物理材质](http://www.tuguan.net/doc/scene-editor/createmodel/software/)

### gltf文件组成
- scene = nodes + extras 场景包含节点信息和自定义扩展数据。
- node = mesh + transform 节点是一个对象实例, 包括网格引用和变换矩阵。 
- mesh = primitives + weights + extras 网格是一个图形片段, 包含几何体原始形状和皮肤权重等信息。
- primitive = attributes + indices + material 几何体原始形状由顶点属性、索引和材质组成。
	- attribute 属性:顶点的特征,像位置、法线、UV等。
	- indices 索引:定义三角形面片的顶点索引列表。
- material = textures + parameters 材质包含纹理和参数(颜色、金属度等)。
- texture = source + sampler 纹理包含图像源和采样器设置。
	- sampler 采样器:读取纹理像素的设置,如过滤方式。
- animation = samplers + channels 动画包含采样器和通道信息。
	- samplers 采样器:保存关键帧中的数据值和时间信息。
	- channels 通道:指示要运行动画的对象及其属性。
- asset = metadata 资产包含元数据如版本、生成工具等。
### fbx转glb fbx转gltf
1. win10的3D查看器
2. FBX2glTF-windows-x64.exe https://github.com/facebookincubator/FBX2glTF
3. 3dsmax2023可直接导出
4. 3dsmax装插件
	1. 装babylon的插件
	2. Cesium ion插件
5. 在线转换
6. blender导入导出
