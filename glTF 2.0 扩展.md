如果您的 GLB 模型包含相同网格的多次重复，则 glTF Transform 可以检测到这一点，合并任何冗余数据，并（可选）添加 EXT_mesh_gpu_instancing 扩展，使 GLTFLoader 创建 THREE.InstancedMesh对象。CLI 中的典型用法如下所示：

```bash
# install
npm install --global @gltf-transform/cli

# help
gltf-transform --help

# deduplicate and instance
gltf-transform dedup in.glb out.glb
gltf-transform instance out.glb out.glb
```

或者也有一个 Node.js 或 Web 友好的脚本 API 可以实现此目的。

不过，如果您只有一个 GLB，其中包含您想要在整个场景中重复的事物的一个示例，那么这可能超出了 glTF-Transform 的能力范围。R3F 对此很有用，对于普通的 Three.js，您必须稍微解构场景，而且我不知道这方面的通用示例。
[cli.ts - donmccurdy/glTF-Transform - GitHub1s](https://github1s.com/donmccurdy/glTF-Transform/blob/HEAD/packages/cli/src/cli.ts#L338)
[palette | glTF Transform](https://gltf-transform.dev/modules/functions/functions/palette)