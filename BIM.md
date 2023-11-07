## 概念
 1. 族文件`.rfa` 文件类似`.glb`都是模型文件, 但专注于详细的建筑信息
 2. 族可包含族可包含族可无限套娃
```js
CAD//像SU、MS、ArchiCAD、Inventor、Allplan、 VevtorWorks、Civil 3D等软件
    BIM//将以前的CAD图纸转化为立体模型，真到每个窗户都是真实具体尺寸的。具有小场景精细化的业务
        Revit主要用于进行建筑信息建模
```

## Revit
```javascript
Revit2018比较好  
    协作式软件
        分4个专业的人使用：土建，机电
    两种UI
        编辑项目 的revit
        编辑族 的revit
            可编辑族在哪个视图才显示等
            配置族有哪些参数等
            点击-载入到项目中//前提先打开一个项目
    概念  
        项目//就是文件格式.rvt
            族1
                结构柱:柱1: 450x450 对应:族类别、族1、族类型
            族2...        //族样板
                图元//所有模型
                    参数
                        实例参数//在属性界面显示
                        类型参数
                    项目参数//属于项目，管理-项目参数，项目内共享的参数
                    全局参数//属于族
        项目样板//设定好的文件格式.rvt 不同样板载入的族不同,所以有的样板有的族不可以,要插入-载入族
    族
        体量//就是房子外表，墙/屋顶/楼板/地表
    界面
        当前可以干什么在下方状态栏有提示
        画布上四个方向四个 立面符号 可以判断样板类型
        项目浏览器-视图-结构平面
            生成1个结构平面：点击视图-平面视图-结构平面-选中要生成的结构平面视图
        项目浏览器-明细表//统计表，右键明细表可新建，例如建筑设计中的建筑材料清单、构件数量明细表、工序节点安排表等；机械工程中的零部件清单、材料表、工具用品表等
    操作
        常点：顶部的房子切换到三维，还可关闭其他非激活窗口
        鼠标hover在物体上按tab切换该位置可能选中的物体
        shift+右键 旋转 三维视图 中间移动
        ctrl和shift配合多选/减选
        拉框方向不同可以多选/减选
        画完按esc或点❌完成
    土木概念c
        标高//相对于基准面如地基的高度，是每层楼高
        立面是楼-结构平面是层
        结构基础//打桩和基座等
            独立基础//混凝土浇筑的一根柱子或一堵墙的底部等
    技巧
        查看有用到的图层（或者叫族？） 协作-碰撞检查
    BIM
        总装模型//里面，Assembly Model包含了所有建筑构件的三维模型、构件间的分类、构件属性以及相关的工程信息和数据
            链接了很多其他revit模型文件：
                总图模型//外表，整个变电站的总体设计和布局
                预制舱//通常用于安装电力设备、控制设备、监控系统、通讯设备等
```
## Revit实践
#### 缩放到看不到图形了
在罗盘那里点,缩放匹配


## IFC
```javascript
版本    
    IFC1.0: 该版本是IFC的初始版本，由建筑工业联盟（BuildingSMART）发布，是建筑信息模型（BIM）中常用的数据交换格式。1994
    IFC1.5 : 该版本是在IFC1.0的基础上升级而来的。1996
    IFC2x: 该版本是一个重大版本升级，其中包含了IFC2x1 1998 和IFC2x2 2001 两个版本，它比 IFC1.x 版本更加完整和稳定，并增加了对建筑元素和构件的支持。
        //FC2.0并不是一个正式发布的版本，而是IFC的一个误称, 2版本命名规则之所以跟其他版本不一样，主要原因是因为在IFC 2版本之前，IFC标准还没有被正式采纳和发布，而是处于试验阶段。当时，IFC标准还没有被正式命名，因此2版本命名规则与其他版本不同。
    IFC2x 代表着IFC标准已经正式采纳和发布。 其中包含了IFC2x1 和 IFC2x2 两个版本.
    随着 IFC 标准的逐渐完善和普及，IFC 版本的命名规则也逐渐统一，更符合了软件行业的命名习惯。
    IFC2x3 : 该版本是在IFC2x2的基础上升级而来的，主要目的是改进了数据模型和细节处理，同时增加了一些新的实体和属性。2005
    IFC4: 该版本是最新版本，包含IFC4.1 2016和IFC4.2 2018两个版本,相比之前的版本，增加了对新建筑材料、绿色建筑、能源管理等的支持，同时改进了数据模型和细节处理。2013
        //IFC4.x是当前最常用的版本, 使用率比较高。在美欧等发达地区 IFC4.x的使用率非常高，而在其他国家可能IFC2x3 的使用率更高

Clm（CesiumLab Model 简称 clm）格式是 CesiumLab 自定义的 BIM 数据中间格式，基 于 sqlite 文件数据库，单文件涵盖了可视化需要的所有 BIM 数据信息，包括属性、几何 体、构件、纹理、结构等等。 总共包括下述 6 个表。
    详见：https://m.cesiumlab.com/CesiumLab%E5%9C%B0%E7%90%86%E4%BF%A1%E6%81%AF%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E5%B9%B3%E5%8F%B0%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf
    
正向设计//是从建筑设计过程的开始就使用 BIM 技术进行设计的方式
反向设计//则是从建筑建成后的状态开始设计的方式


CityGML是一种开放式的数据交换格式，用于描述城市环境中的三维几何图形和相关信息。
CityGML的LOD级别有四个：
        LOD0：代表基本的概念模型，包含建筑物的外形信息。
        LOD1：代表建筑物的详细外观信息，包括门窗、墙体等。
        LOD2：代表建筑物内外详细的结构信息，包括墙体厚度、楼梯等。
        LOD3：代表建筑物内部详细的装饰和设备信息，包括门窗、灯具、管道等。
        
IFC (Industry Foundation Classes) 是一种开放式的数据模型，用于描述建筑、工程和基础设施等领域的信息。
    //在最新版本的 Autodesk Revit 中，IFC 导出功能是内置的，无需安装任何插件即可使用。
    //常用的BIM软件（Revit、Bentley、CATIA、MagiCAD、BIM 5D、鲁班等）都支持将各自的数据格式转换为IFC标准模型
    
expressID
    在IFC文件中，每个实体都有一个唯一的标识符，称为“ExpressID”（也称为“GlobalID”）。这是一个整数，用于标识IFC模型中的每个实体。
    ExpressID是在IFC文件中定义的，它不仅用于标识每个实体，还可以用于实体之间的关联。例如，如果一个实体引用另一个实体，它可以使用其ExpressID来标识所引用的实体。
    要查看IFC实体的ExpressID，您可以打开IFC文件并查找实体定义。在定义中，您将找到一个称为“#”的标识符，后跟实体的ExpressID。例如，以下是一个IFC墙体实体的定义，其中ExpressID为102：
    less
    #102 = IFCWALLSTANDARDCASE('1RHtAPdHVHf8lyv5KW5mCX', #45, 'Basic Wall:Generic - 200mm:Generic', 'Basic Wall:Generic - 200mm:Generic', $, #114, #121, .STANDARD., 0., $, $, .ELEMENT., ( #271 ), $, $);
    在上面的示例中，“#102”是ExpressID，它标识了IFCWALLSTANDARDCASE实体。您可以在IFC文件中搜索“#102”，以找到引用此实体的其他实体。

ifc如何通过坐标转换和模型重构，生成有地理参考意义的 CityGML 模型：
    首先，需要确保 IFC 模型包含有关地理位置信息的坐标系统。这可以通过在 IFC 模型中包含地理坐标系统信息来实现。
    然后，使用特定的软件工具（例如 FME、CityGML Extractor 等）进行坐标转换，将 IFC 模型中的坐标转换为地理坐标（例如 WGS 84）。
    接下来，使用特定的软件工具（例如 CityGML Extractor、3DCityDB Importer/Exporter 等）对 IFC 模型进行模型重构，将其转换为 CityGML 模型。在这一过程中，需要确保将 IFC 模型中的几何信息、属性信息等转换为 CityGML 模型中的相应信息。
    最后，需要使用特定的软件工具（例如 FME、3DCityDB Importer/Exporter 等）将生成的 CityGML 模型导入到地理信息系统
        
IfcProject：表示项目整体信息
IfcSite：表示建筑物所在的场地信息
IfcBuilding：表示建筑物本身的信息
IfcBuildingStorey：表示建筑物的楼层信息
    IfcSlab 代表楼面的构造元素，例如地板、天花板等
    IfcSpace 代表这些楼层之间的空间，模拟建筑物内部的房间和公共区域，并在其上添加详细的空间信息，例如面积、高度、功能等

//
IfcTypeObject用来定义一组相关的IfcSpace对象，并为它们分配特定的属性集
    Property Set Definition（属性集定义）可以定义一个属性集，以存储有关空间的信息，包括面积、高度和功能等。然后，您可以将该属性集与相应的IfcSpace元素关联
    IfcSpace 
    
实践：
    导入的IFC的3d视图是空白的//revit的阶段化过滤器选无，不然被过滤掉了
    
大斜板    
    ifc//0TdQ3qJgP7IRf$P59Iqauf
    obj/gbl/fbx
        IfcConvert//生成的构建id是"product-1d9da0f4-4ea6-4749-ba7f-645252d24e29-body "
        IfcConvert --use-element-names //生成的构建id是"基本墙:CL_W1:493612"
        IfcConvert --use-element-guids //生成的构建id是"0TdQ3qJgP7IRf$P59Iqauf"
    getOidByGuid
    再用http://localhost:8082/json
    和http://localhost:8082/download?token=&topicId= 拿1个_rIsDefinedBy和3个_rHasProperties递归去获取属性信息
        //IsDefinedBy，房间有一些属性，这些属性是该房间的一部分
        //HasProperties，有HasProperties属性，则说明它有属性信息可以进行查询
```

## FME
```JS
FME（Feature Manipulation Engine）实践
    输入输入一般分为 几何和属性 两种数据
        获取几何数据//使用 GeometryPartExtractor，并将查询设置为 geometry name = Body
    FME Geometry Name是FME中的一个属性。它描述了几何体的类型，例如点，线，面，体等
        Point：表示单个点的几何体        Line：表示由两个或更多点组成的线的几何体        Polyline：表示由多个线段组成的多段线的几何体
        Area：表示由一个或多个点组成的面的几何体        Body：表示由多个面组成的三维几何体        Solid：表示由一个完整的三维几何体
        
//https://community.safe.com/s/question/0D54Q000080hObVSAU/ifcspace-to-3d-geometry-in-postgis
IFC 读取器的 IfcSpace 输出是一个复杂的聚合几何体，其中包括主体(body)的实体几何体，以及包含属性集信息的 Null 几何体。
    要将 IFC 功能转换为适用于 PostGIS（或任何其他 GIS）的功能，请使用以下三个转换器：
        GeometryPropertyExtractor：这会将 Property Set 特征提升为特征属性(feature attributes)。将 Prefix Extracted Trait with Geometry Name(使用几何名称为提取的特征添加前缀) 设置为“Yes”，以便在属性上保留属性集名称。
        GeometryPartExtractor：这将提取空间的主体(body)几何形状，丢弃属性集。单击 Geometry XQuery 的... 按钮并添加测试 This Part - Geometry Name = Body。结果将是具有所有属性的挤压实体几何体。
            //处理完少了一列ifc_type
        GeometryCoercer：可能不需要，但这会将实体转换为曲面几何。将输出几何类型设置为 fme_composite_surface。
我附上了一个工作区，说明了这些转换器的使用：extractspacebody.fmw
或者，您可以使用 Revit 阅读器读取 IFC 文件，为 Revit 数据视图选择建筑空间。IFC 和 Revit 阅读器可以读取 RVZ 和 IFC 文件——不同之处在于 Revit 阅读器有数据视图来预处理数据以进行简化。Revit 阅读器还将显示它从属性集中提取的属性。
XQuery:
    for $geom in //geometry
    where $geom/@fme_geometry_name = 'Body'
    return number($geom/@fme_id)
    这是一个用 XQuery 语法编写的查询。它似乎正在选择 XML 文档中元素的“fme_id”属性，标签名称为“geometry”，属性“fme_geometry_name”等于“Body”。“number()”函数将“fme_id”属性的结果转换为数值。
    该查询使用“for”循环遍历 XML 文档中与“//geometry”XPath 表达式匹配的所有元素。“where”子句将元素过滤为仅那些“fme_geometry_name”属性值为“Body”的元素。“return”子句指定应该从查询中返回什么，在这种情况下，是“fme_id”属性的数值。
```



