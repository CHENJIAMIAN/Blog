## pmndrs/uikit
> 使用@react- Three/Fiber和Yoga为Three.js构建高性能 3D 用户界面，支持嵌套滚动、按钮、输入、下拉菜单、选项卡、复选框等
```js
`所有组件都会被放到root.tsx下`
`所有组件都基于container这种基本元件组成`

root.tsx
	useCreateGetInstancedPanelGroup
		const material = createPanelMaterial(materialClass, { type: 'instanced' })
			createPanelMaterial
				parameters.uniforms.data = 
		instanced-panel-group.ts
				constructor(private readonly material: Material,... ) 
				update -> resize -> this.mesh.material = this.material

root.tsx
	button.tsx
		container.tsx
			packages/uikit/src/panel/react.tsx 的
			<InteractionGroup
				<group `<group />` 是 `@react-three/fiber` 提供的组件，用于创建 Three.js 的 `Group` 对象
					<primitive 通过 useInteractionPanel 得来
```

		
### 从 https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel  看看panel是怎么实现的?
Panel 的实现主要依赖于几个核心文件，它们定义了面板的材质、行为和交互逻辑。以下是从这些文件中提取的关键信息：
#### [instanced-panel.ts](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/instanced-panel.ts)
这个文件定义了 `InstancedPanel` 类，用于创建实例化的面板。它包含了面板的属性，如边框半径、背景透明度、背景颜色、边框颜色等，并提供了设置这些属性的方法。此外，它还负责处理面板的显示和隐藏逻辑。
#### [instanced-panel-group.ts](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/instanced-panel-group.ts)
`InstancedPanelGroup` 类管理一组 `InstancedPanel` 实例。它负责创建和管理面板实例的生命周期，包括插入、删除和更新面板实例。这个类使用了 `InstancedBufferAttribute` 来高效地批量处理实例数据。
#### [instanced-panel-mesh.ts](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/instanced-panel-mesh.ts)
定义了 `InstancedPanelMesh` 类，它继承自 Three.js 的 `Mesh` 类。这个类为实例化的面板创建了一个网格，允许它们被渲染到场景中。它还定义了自定义的深度和距离材质，用于实现特殊的渲染效果。
#### [panel-material.ts](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/panel-material.ts)
在这个文件中，定义了面板的材质设置，包括 `PanelMaterial` 和 `MaterialSetter` 类。这些类负责根据面板的属性（如颜色、透明度等）动态地调整材质参数。
以下是 `uniforms.data` 中每个浮点数的用途：
- `data[0]`: 边框尺寸的 x 分量
- `data[1]`: 边框尺寸的 y 分量
- `data[2]`: 边框尺寸的 z 分量
- `data[3]`: 边框尺寸的 w 分量
- `data[4]`: 边框圆角半径的 x 分量
- `data[5]`: 边框圆角半径的 y 分量
- `data[6]`: 边框圆角半径的 z 分量
- `data[7]`: 边框圆角半径的 w 分量
- `data[8]`: 边框颜色的 x 分量
- `data[9]`: 边框颜色的 y 分量
- `data[10]`: 边框颜色的 z 分量
- `data[11]`: 边框弯曲度
- `data[12]`: 边框不透明度
- `data[13]`: 背景颜色的 x 分量
- `data[14]`: 背景颜色的 y 分量
- `data[15]`: 背景颜色的 z 分量
#### [react.tsx](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/react.tsx)
提供了 React 组件和钩子（Hooks），以便在 React 应用中更方便地使用面板功能。这包括创建和管理面板实例，以及处理用户交互事件。
#### [utils.ts](https://github.com/pmndrs/uikit/blob/main/packages/uikit/src/panel/utils.ts)
包含一些工具函数和类型定义，用于辅助面板的创建和管理。例如，`createPanelGeometry` 函数用于创建面板的几何形状。