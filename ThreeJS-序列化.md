
```js
toJSON(meta) 函数:
    判断是否是根对象:
        if  meta 是未定义或者是字符串类型, 则认为是根对象

    if 是根对象:
        初始化 meta 对象，用于收集 geometries, materials, textures, images, shapes, skeletons, animations, nodes

        设置输出的 metadata:
            版本: 4.5
            类型: 'Object'
            生成器: 'Object3D.toJSON'

    初始化对象数据:
        包括 uuid, type, name, castShadow, receiveShadow, visible, frustumCulled, renderOrder, userData
        设置 layers, matrix, up, matrixAutoUpdate

    if 对象是 InstancedMesh:
        设置 type, count, instanceMatrix
        if  instanceColor 存在, 则也设置 instanceColor

    定义一个内部函数 serialize，用于序列化元素并将其加入到对应的 library 中，返回元素的 uuid

    if 对象是 Scene:
        处理 background 和 environment 属性

    if 对象是 Mesh, Line 或 Points:
        序列化 geometry, 处理 geometry 的 parameters 中的 shapes //如ExtrudeGeometry.js ShapeGeometry.js就有parameters.shapes

    if 对象是 SkinnedMesh:
        处理 bindMode, bindMatrix, skeleton

    if 对象有 material:
        序列化 material，支持 material 为数组的情况

    if 对象有子对象:
        递归地对每个子对象调用 toJSON

    if 对象有动画:
        序列化每个动画

    if 是根对象:
        从缓存中提取并清理 geometries, materials, textures, images, shapes, skeletons, animations, nodes 数据
        将它们添加到输出中

    返回输出对象，包括 object 和可能的其他数据 (如 geometries, materials 等)
```
