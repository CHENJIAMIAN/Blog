### Blender
[blender基础教程- 第四集【星巴克杯子建模+渲染初体验】_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Ar4y1K7RQ/?p=4&spm_id_from=pageDriver)
![键盘快捷键](https://2821714.s21i.faiusr.com/4/2/ABUIABAEGAAgqYP_hwYovOO4-AQwyR84lAo.png.webp)
### F3 快速搜索命令
1. 顶部tab页是预置好的布局集合
2. 快速收藏夹 (Q 菜单)
- 
**2. 掌握基本的导航操作：**

*   **小键盘 . (句号):** 将视图聚焦到选中的物体
	1. 选择物体
	2. 确保鼠标焦点在场景里
	3. 按小键盘的.即可
*   **小键盘 1, 3, 7:** 分别切换到前视图、右视图、顶视图
*   **小键盘 5:** 切换透视视图和正交视图
-   **小键盘 0:**  摄像机视角

**3. 了解 Blender 中的基本操作模式：**

*   **对象模式 (Object Mode):** 用于选择、移动、旋转、缩放整个物体。
*   **编辑模式 (Edit Mode):** 用于编辑物体的几何形状，例如顶点、边、面。
*   **雕刻模式 (Sculpt Mode):** 用于雕刻模型。

**4. 创建你的第一个简单模型：**

1.  **启动 Blender:** 你会看到一个默认的立方体。
2.  **进入编辑模式:** 选中立方体，按 `Tab` 键或从顶部菜单栏中选择 `编辑模式`。
3.  **尝试挤出面:**
    *   选中顶部的面（按 `3` 或点击工具栏中的 `面选择` 按钮），你会看到一个橙色的面被高亮。
    *   按 `E` 键进行挤出，然后移动鼠标来调整挤出的高度。
    *   点击鼠标左键确认挤出。
4.  **回到对象模式:** 按 `Tab` 键或从顶部菜单栏中选择 `对象模式`。
5.  **移动模型:** 选择模型，按 `G` 键，然后移动鼠标来移动模型。点击鼠标左键确认位置。
6.  **旋转模型:** 选择模型，按 `R` 键，然后移动鼠标来旋转模型。点击鼠标左键确认旋转。
7.  **缩放模型:** 选择模型，按 `S` 键，然后移动鼠标来缩放模型。点击鼠标左键确认缩放。
8. **添加其他基本形体:** 尝试按 `Shift + A` 添加一个球体（`网格` > `球体`）或其他基本形体。

**5. 尝试渲染你的模型：**

1.  **添加灯光:** 按 `Shift + A`，选择 `灯光` > `点` 或者其他类型的灯光。
2.  **调整灯光位置:** 选中灯光，按 `G` 键来移动。
3.  **添加相机:** 按 `Shift + A`，选择 `相机`。
4.  **调整相机位置:** 选中相机，按 `G` 键移动。你可以按 `小键盘 0` 切换到相机视图，并按 `G` 键和鼠标来调整相机的取景。
5.  **渲染:** 按 `F12` 键进行渲染。你可以在顶部菜单栏的 `渲染` 菜单中调整渲染设置。


### 有的时候导入模型太小看不见。
1. 先按 **N调整相机远点** 为很大
2. 那么就按 **A全选**, 然后放大20_30次 按 **N侧边条** 调出模型矩阵 按 **S缩放**
3. 调整相机范围: **N-视图-结束点**

### 快捷菜单
- 【Shift+A】 键 添加模型菜单

### 查看模式
- 【~】键 视图切换//俯视图,左视图
- 【Alt+Z】 切换透视模式
- Z 着色模式
	- 线框\ 实体\ 材质预览\ 渲染模式(可改变世界环境.hdr文件模拟环境光照用于渲染出图)
### 编辑模式
- 【Tab】:  切换对象模式和编辑模式
- 【Ctrl+TAB】 其他模式如权重模式等
### 物体模式
- A 全选
- B 框选
- / 孤立显示(2025年1月8日 4.2版本试了无效)

### 编辑模式
- 123 对应 点线面
- 添加物体
- 顶点-挤出顶点
	- 做树枝:线->蒙皮->缩小蒙皮->添加修改器->蒙皮->缩小蒙皮直到树枝形状出来->修改视图层级变光滑
- 顶点倒角: 切掉切平角
- L 选择相连的元素/模型
- CTRL+R 插入循环边 S缩小,可以把柱体的腰勒小
- SHIFT+ALT+左键 选中循环边
- CTRL+B 添加倒角
- 右键
	- 平滑着色
- E 挤出
- F 连线成面
- I 内插面
- J 连点成线

### 选中后
- G 移动 可选+XYZ键 可选+输入数值 '就算是在UI改xyz值也是可以多选的!'
- R 旋转
- S 缩放
- X 删除物体 
- 【Shift+D】 键 平移复制模型 
- 【Alt+D】 键 平移复制实例模型

### 鼠标
- 【shift+鼠标中键】视图平移
- 【CTRL+鼠标中键】视图缩放
- 【alt+鼠标中键】锁定视图

### 调整相机视角
	坐标系旁边 切换相机视角图标 点击切换 侧边条选(N键) 视图-视图锁定-✔锁定摄像机到视图方位 鼠标中间平移 缩放调整 到合适视图, 在取消✔即可

### 可选性
- 在视图列表禁用某种物体的可选性: 
- 大纲属性-视图层-筛选(图标下拉)-激活箭头图标(是否可选)

### 修改器
- 就是批量工具,裁剪工具等
- 实体化 
	- 给面增加厚度
	- 点小箭头-应用-永久生效

### UV编辑(在顶部)生成UV图
- //从细节的模型生成UV图, 给粗糙的模型用, 可以达到相近的显示效果, 从而减少渲染面数提高性能
- 编辑模式
	- 左上角双箭头激活[UV选区同步]
	- A全选
		- 面模式-右键-UV展开面-智能UV投射 //自动生成uv
		- UV-孤岛比例平均化|拼排孤岛 //uv排布好看点
- 新建纯色图像
#### ID贴图
- 同级概念: 法线贴图等
- **标识和区分模型的不同区域**，从而简化材质分配、纹理绘制、渲染控制和后期处理等工作流程
- 一个模型 生成 一张 **一个区域一个纯色** 的贴图
- 一个纯色对应一个ID
- 一个ID可以赋予一种材质
### Shading(在顶部)贴图
- 【Ctrl+TAB】切换到纹理模式
- 着色编辑器
	- 新建
	- SHIFT+A 添加-纹理-图像纹理
- 右下角-第一个设置-笔刷设置-纹理 
	- 纹理来源: 右下角-纹理属性(最后一个设置)--新建纹理
- 右下角-渲染属性-胶片-透明
	- 使背景透明
- 在Layout(在顶部)预览

### 批量
#### 同时修改多个物体数据
- 选中需要同时修改的物体, 修改需要修改的数值, **生效瞬间按住Alt即可**

### 给立方体贴图成机柜
1.  **选中立方体:** 在 Blender 中选中你想要贴图的立方体。
2.  **进入材质标签:** 在右侧的属性面板中，点击 "材质属性" 图标 (一个红色的小球)。
3.  **新建材质:** 点击 "新建" 按钮创建一个新的材质。
4.  **切换到着色器编辑器:** 点击顶部菜单栏的 "着色器" 标签，进入着色器编辑器。
5. ---
6.  **添加图像纹理节点:** 按下 `Shift + A`，选择 "纹理" -> "图像纹理"。
7.  **打开贴图:** 在 "图像纹理" 节点中，点击 "打开" 按钮，选择你准备好的漫反射贴图。
8.  **连接节点:** 将 "图像纹理" 节点的 "颜色" 输出口连接到 "BSDF" (通常为 Principled BSDF) 节点的 "颜色" 输入口。
9. 调整 UV 贴图:
	1.  **进入编辑模式:** 在 3D 视口中，按下 `Tab` 键进入编辑模式。
	2.  **选中所有面:** 按下 `A` 键选中立方体的所有面。
	3.  **展开 UV:**
		* **简单展开:** 如果你的机柜贴图是一个简单的正面图，可以使用 `U` 键，选择 "展开" (Unwrap) 或者 "从视图投影"。
		* **精细展开:** 如果需要更精细的控制，可以使用  `U` 键， 选择 "智能 UV 展开"。你也可以手动标记缝合线，然后 "展开"。
	4. **调整UV布局:** 进入UV编辑器窗口(点击左上角的图标，选择UV编辑器)。你会看到立方体的UV展开图，在UV编辑器中，可以使用 `G`(移动), `S`(缩放), `R`(旋转) 等快捷键，来调整UV坐标。
	5.  **缩放和移动 UV:**  在 UV 编辑器中，你可以使用 `G` (移动)、`S` (缩放) 和 `R` (旋转) 等快捷键调整 UV 坐标，直到贴图正确地显示在立方体上。 
	6.  **重复贴图:** 如果你需要将贴图重复平铺在立方体上，可以在 UV 编辑器中选中 UV 坐标，然后使用 `S` 缩放 UV，使其超出UV边界。
