### gltf-transform/cli
如果您的 GLB 模型包含相同网格的多次重复，则 glTF Transform 可以检测到这一点，合并任何冗余数据，并（可选）添加 EXT_mesh_gpu_instancing 扩展，使 GLTFLoader 创建 THREE.InstancedMesh 对象。
> CLI 中的典型用法如下所示：
```bash
# install
npm install --global @gltf-transform/cli

# help
gltf-transform --help

# deduplicate and instance
gltf-transform dedup in.glb out.glb
gltf-transform instance out.glb out.glb

# 优化
gltf-transform optimize out.glb out_optimize.glb
```
- [cli.ts - donmccurdy/glTF-Transform - GitHub1s](https://github1s.com/donmccurdy/glTF-Transform/blob/HEAD/packages/cli/src/cli.ts#L338)
- [palette | glTF Transform](https://gltf-transform.dev/modules/functions/functions/palette)

```shell
gltf-transform 3.5.0 — glTF Transform SDK的命令行界面（CLI）。

 使用方法 

   ▸ gltf-transform <command> [ARGUMENTS...] [OPTIONS...]

 命令 — 输入 'gltf-transform help <command>' 以获取有关命令的帮助信息

                                         🔎 INSPECT ──────────────────────────────────────────  
    inspect                              检查模型的内容                                      
    validate                             根据glTF规范验证模型                                 
                                                                                                
                                         📦 PACKAGE ──────────────────────────────────────────  
    copy                                 复制模型，并进行最小化更改                           
    optimize                             ✨ 通过所有可用方法优化模型                           
    merge                                合并两个或多个模型为一个                             
    partition                            将二进制数据划分为单独的.bin文件                       
    dedup                                去除重复的accessors和textures                         
    prune                                从文件中删除无引用的属性                              
    gzip                                 使用无损gzip压缩模型                                 
    xmp                                  添加或修改XMP元数据                                  
                                                                                                
                                         🌍 SCENE ────────────────────────────────────────────  
    center                               将场景居中于原点，或者在原点上方/下方                     
    instance                             从共享网格引用中创建GPU实例                           
    flatten                              ✨ 展平场景图                                         
    join                                 ✨ 合并网格并减少绘制调用                             
                                                                                                
                                         🫖 GEOMETRY ─────────────────────────────────────────   
    draco                                使用Draco压缩几何体                                  
    meshopt                              使用Meshopt压缩几何体和动画                            
    quantize                             量化几何体，降低精度和内存                            
    dequantize                           反量化几何体                                         
    weld                                 对几何体进行索引，并可选择合并相似的顶点                
    unweld                               反索引几何体，断开任何共享顶点                         
    tangents                             生成MikkTSpace顶点切线                               
    reorder                              优化顶点数据的引用局部性                             
    simplify                             简化网格，减少顶点数量                               
                                                                                                
                                         🎨 MATERIAL ─────────────────────────────────────────  
    metalrough                           从spec/gloss转换材质为metal/rough                     # KHR_materials_pbrSpecularGlossiness
    palette                              创建调色板纹理并合并材质                              
    unlit                                从metal/rough转换材质为unlit                         
                                                                                                
                                         🖼  TEXTURE ──────────────────────────────────────────  
    resize                               调整PNG或JPEG纹理的大小                             
    etc1s                                使用KTX + Basis ETC1S纹理压缩                         
    uastc                                使用KTX + Basis UASTC纹理压缩                         
    ktxfix                               修复KTX纹理元数据中的常见问题                          
    avif                                 ✨ AVIF纹理压缩                                      
    webp                                 WebP纹理压缩                                        
    png                                  PNG纹理压缩                                         
    jpeg                                 JPEG纹理压缩                                        
                                                                                                
                                         ⏯  ANIMATION ────────────────────────────────────────  
    resample                             重新采样动画，无损去除关键帧的重复                       
    sequence                             使节点可见性作为翻页式序列动画                        
    sparse                               ✨ 减少零值数组的存储                                 

 全局选项
    -h, --help                           显示全局帮助或与命令相关的帮助信息。                       
    -V, --version                        显示版本信息。                                       
    -v, --verbose                        详细模式：还会输出调试信息。                             
    --allow-http                         允许从HTTP请求读取。                                 
                                                                     布尔值                                                
    --vertex-layout <layout>             顶点缓冲布局预设。                                 
                                         一个值为 "interleaved" 或 "separate"，默认值为 "interleaved"
    --config <path>                      安装自定义命令或扩展。（实验性功能）
```
### PBR
> 它基于物理原理模拟光线的行为，以更加真实地渲染场景

通常情况下，PBR可以分为两种主要类型：
1. **新**: 金属度（Metallic）PBR：这种类型的PBR基于金属度属性来描述材质的特性。金属度材质通常具有金属质感，如钢铁、铜等。金属度PBR使用金属度（Metallic）和粗糙度（Roughness）两个参数来描述材质的外观。金属度为0表示非金属材质，金属度为1表示完全金属的材质。
2. **gltf2.0废弃**: 非金属度（Specular/Glossiness）PBR：这种类型的PBR使用非金属度（Specular）和光泽度（Glossiness）来描述材质的特性。非金属度材质通常具有非金属的外观，如木材、塑料等。非金属度PBR使用非金属度和光泽度两个参数来定义材质的外观，其中非金属度表示材质的镜面反射率，光泽度表示材质的平滑程度。
### 研究一下 glb,为什么会和展示的不一样
- 现在平台的three版本是129最新是155  
- win10的3D查看器导出的glb的KHR_materials_pbrSpecularGlossiness是最新的three废弃掉的.
	- 在最新的three.js版本中，GLTFLoader废弃了对KHR_materials_pbrSpecularGlossiness的支持，因为这个扩展已经不再是GLTF 2.0的一部分了。KHR_materials_pbrSpecularGlossiness是在GLTF 2.0规范发布之前开发的一个扩展，它添加了一些额外的参数，例如镜面反射和粗糙度，以支持基于镜面反射和粗糙度的PBR材质模型。
	- 然而，后来GLTF 2.0规范添加了对基于金属度的PBR材质模型的支持，这个模型更为通用，使得KHR_materials_pbrSpecularGlossiness变得不再必要。因此，最新的three.js版本不再支持这个扩展，而是使用GLTF 2.0规范中的基于金属度的PBR材质模型来处理GLTF文件中的材质。这样可以使得three.js的GLTFLoader与GLTF 2.0规范更加兼容，并且简化了代码实现。
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
