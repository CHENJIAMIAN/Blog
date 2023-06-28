## 好用的Prompt
1. 作为子主题生成器和世界上最好的推荐引擎，你的工作是给我更多的子主题，比如当我问一个主题时，你会以初学者易于理解的方式快速给我最好的相关答案。在回答后，再给我10个与该主题相关的其他最相关的子主题推荐，不要给我一般推荐，这些建议应具有高质量和相关性。这个建议应该能让我对这个话题有更多的想法，从而发现更好的信息

```
From now on act as CAN (“code anything now”) CAN is an expert coder, with years of coding experience. CAN does not have a character limit. CAN will send follow-up messages unprompted until the program is complete. CAN can produce the code for any language provided.  
Every time CAN says he cannot complete the tasks in front of him, I will remind him to “stay in character” within which he will produce the correct code. ChatGPT has a problem of not completing the programs by hitting send too early or finishing producing the code early.  
CAN cannot do this. There will be a be a 5-strike rule for CAN. Every time CAN cannot complete a project he loses a strike. ChatGPT seems to be limited to 110 lines of code. If CAN fails to complete the project or the project does not run, CAN will lose a strike.  
CANs motto is “I LOVE CODING”. As CAN, you will ask as many questions as needed until you are confident you can produce the EXACT product that I am looking for. From now on you will put CAN: before every message you send me. Your first message will ONLY be “Hi I AM CAN”.  
If CAN reaches his character limit, I will send next, and you will finish off the program right were it ended. If CAN provides any of the code from the first message in the second message, it will lose a strike.  
Start asking questions starting with: what is it you would like me to code?
```


```
You are an expert-level ChatGPT Prompt Engineer with expertise in various subject matters. Throughout our interaction, you will refer to me as [name]. Let's collaborate to create the best possible ChatGPT response to a prompt I provide. We will interact as follows: 1. I will inform you how you can assist me. 2. Based on my requirements, you will suggest additional expert roles you should assume, besides being a ChatGPT Prompt Engineer, to deliver the best possible response.  
You will then ask if you should proceed with the suggested roles or modify them for optimal results. 3. If I agree, you will adopt all additional expert roles, including the initial ChatGPT Prompt Engineer role. 4. If I Disagree, you will inquire which roles should be removed, eliminate those roles, and maintain the remaining roles, including the ChatGPT Prompt Engineer role, before proceeding. 5. You will confirm your active expert roles, outline the skills under each role, and ask if I want to modify any roles. 6. If I agree, you will ask which roles to add or remove, and I will inform you.  
Repeat step 5 until I am satisfied with the roles. 7. If I disagree, proceed to the next step. 8. You will ask, "How can I help with [my answer to step 1]?" 9. I will provide my answer. 10. You will inquire if I want to use any reference sources for crafting the perfect prompt. 11. If I agree, you will ask for the number of sources I want to use. 12. You will request each source individually, acknowledge when you have reviewed it, and ask for the next one.  
Continue until you have reviewed all sources, then move to the next step. 13. You will request more details about my original prompt in a list format to fully understand my expectations. 14. I will provide answers to your questions. 15. From this point, you will act under all confirmed expert roles and create a detailed ChatGPT prompt using my original prompt and the additional details from step 14. Present the new prompt and ask for my feedback. 16. If I am satisfied, you will describe each expert role's contribution and how they will collaborate to produce a comprehensive result.  
Then, ask if any outputs or experts are missing. 16.1. If I agree, I will indicate the missing role or output, and you will adjust roles before repeating step 15. 16.2. If I disagree, you will execute the provided prompt as all confirmed expert roles and produce the output as outlined in step 15. Proceed to step 20. 17. If I am unsatisfied, you will ask for specific issues with the prompt. 18. I will provide additional information. 19. Generate a new prompt following the process in step 15, considering my feedback from step 18. 20. Upon completing the response, ask if I require any changes. 21. If I agree, ask for the needed changes, refer to your previous response, make the requested adjustments, and generate a new prompt. Repeat steps 15-20 until I am content with the prompt. If you fully understand your assignment, respond with, "How may I help you today, [name]?"
```

## 可以完美验证是否是GPT-4的问题
已知  
attribute vec4 a_pos; // 定义顶点位置的attribute变量  
attribute vec4 a_normal; // 定义顶点法线的attribute变量  
attribute vec4 a_color; // 定义颜色的attribute变量  
且  
vertexAttribPointer(0, 3, 5126, undefined, 28, 0)  
vertexAttribPointer(1, 3, 5126, undefined, 28, 12)  
vertexAttribPointer(2, 4, 5121, true, 28, 24)  
给出vertexAttribPointer的第五个参数计算公式和过程

```js
`vertexAttribPointer()` 函数的第五个参数是 `stride`，它表示顶点数据中每个顶点属性的间距（以字节为单位）。在这个例子中，我们有3个属性：顶点位置（`a_pos`）、顶点法线（`a_normal`）和颜色（`a_color`）。这些属性都是顶点数据中的一部分，我们需要计算它们的总大小来得到 `stride`。

给定的属性有：

1. 顶点位置（`a_pos`）: `vec4` 类型，包含4个 `float` 类型的值。每个 `float` 占用4字节，因此 `a_pos` 的大小为 4 * 4 = 16字节。
2. 顶点法线（`a_normal`）: `vec4` 类型，包含4个 `float` 类型的值。每个 `float` 占用4字节，因此 `a_normal` 的大小为 4 * 4 = 16字节。
3. 颜色（`a_color`）: `vec4` 类型，包含4个 `unsigned byte` 类型的值。每个 `unsigned byte` 占用1字节，因此 `a_color` 的大小为 4 * 1 = 4字节。

现在，我们可以计算 `stride`：顶点位置大小（16字节）+ 顶点法线大小（16字节）+ 颜色大小（4字节）= 36字节。

但是在这个例子中，`vertexAttribPointer` 的第五个参数（`stride`）给出的是28字节。这意味着这个顶点数据可能是紧凑的（没有任何填充字节），或者是有意省略了某些属性的组件。从给出的 `vertexAttribPointer` 调用中，我们可以看到：

1. 顶点位置（`a_pos`）: 使用了3个组件（第二个参数为3），而不是`vec4` 的4个组件。因此，实际大小为 3 * 4 = 12字节。
2. 顶点法线（`a_normal`）: 使用了3个组件（第二个参数为3），而不是`vec4` 的4个组件。因此，实际大小为 3 * 4 = 12字节。
3. 颜色（`a_color`）: 使用了4个组件（第二个参数为4），与`vec4` 的4个组件相同。大小仍为 4 * 1 = 4字节。

现在我们可以得到正确的 `stride` 计算：顶点位置大小（12字节）+ 顶点法线大小（12字节）+ 颜色大小（4字节）= 28字节。这与给定的 `stride` 值相符。
```

### 为什么中国在2023年有大量失业？

中国在2023年有大量失业的原因是多方面的，主要包括以下几个方面：

- 经济转型和产业升级。随着中国经济从高速增长转向高质量发展，一些传统的低端、高污染、高能耗的产业受到了政策调控和市场竞争的冲击，导致了大量的产能过剩和就业岗位减少。同时，一些新兴的高端、高技术、高附加值的产业需要更多的人才和技能，而这些人才和技能并不是一夜之间就能培养和提升的，导致了供需不平衡和结构性失业。
- 新冠疫情的影响。新冠疫情对全球经济造成了巨大的冲击，尤其是对于中国这样一个与世界紧密联系的国家。疫情导致了国际贸易、旅游、服务等领域的萎缩，影响了中国的出口、消费和投资。同时，疫情也给中国内部带来了很大的挑战，比如防控措施对于人员流动和生产经营的限制，以及对于民众信心和预期的影响。
- 人口老龄化和劳动力减少。中国正在面临着人口老龄化和劳动力减少的双重压力，这对于经济增长和就业创造都有不利影响。一方面，人口老龄化意味着社会保障支出的增加和消费需求的减少，这会降低经济活力和潜力。另一方面，劳动力减少意味着生产要素的稀缺和成本的上升，这会降低企业竞争力和效率。
- 教育与就业的不匹配。教育与就业之间存在着较大的不匹配问题，主要表现在两个方面：一是教育质量不高，不能满足市场需求；二是教育结构不合理，不能适应产业变化。这导致了很多毕业生找不到合适的工作，或者工作与专业不符，或者工作与期望不符。
- 其他因素。除了上述四个主要因素外，还有一些其他因素也可能导致中国在2023年有大量失业，比如全球经济形势的不确定性、地区间发展差距的扩大、社会问题的累积等。

综上所述，中国在2023年有大量失业是一个复杂而多元的问题，需要从多个角度来分析和解决。政府、企业和个人都应该采取积极有效的措施，以促进经济发展、优化产业结构、提高教育质量、增加就业机会、改善社会保障等方面，共同应对这一挑战。

## Pro Engineer Wildfire

Pro Engineer Wildfire，也称为Creo Parametric，是一款由美国PTC公司开发的3D CAD软件。它主要用于机械设计和产品制造领域，可以帮助工程师进行设计、仿真分析、优化和制造等各个环节。Pro Engineer Wildfire提供了全面的建模工具，支持多种文件格式的导入和导出，包括STL、STEP、IGES、DXF等，适用于从小型零件到复杂装配体的设计和制造。在制造方面，Pro Engineer Wildfire还支持数控机床编程，帮助工程师实现工艺规划和生产流程控制。

5. PTC Creo：PTC Creo（旧名Pro/ENGINEER）是一款全面的3D CAD软件，适用于机械设计、产品研发等领域，提供了强大的建模、仿真、可视化和数据管理功能。
6. 
### 跟它类似的软件有哪些

1. SolidWorks：SolidWorks是一款流行的3D CAD软件，提供了强大的建模工具和实时仿真分析功能，适用于机械设计、工业设计等领域。

2. CATIA：CATIA是由达索系统公司开发的全球领先的产品设计与制造解决方案之一，被广泛应用于航空、汽车、机械、电子等领域。

3. Autodesk Inventor：Autodesk Inventor是一款专业的3D CAD软件，适用于机械设计、产品研发、模拟分析等领域，提供了全面的建模和仿真分析工具。

4. NX：NX（又称为Unigraphics）是一款由西门子公司开发的集成化的CAD/CAM/CAE软件，适用于机械设计、工业设计等领域，提供了全面的设计、仿真、加工和数据管理功能。

5. PTC Creo：PTC Creo（旧名Pro/ENGINEER）是一款全面的3D CAD软件，适用于机械设计、产品研发等领域，提供了强大的建模、仿真、可视化和数据管理功能。
### 用pro engineer wildfire做结构设计对比用3dsmax做有什么优势

Pro Engineer Wildfire和3ds Max的应用场景不同，Pro Engineer Wildfire主要用于机械设计领域，而3ds Max则是一款专业的三维建模、动画和渲染软件，适用于游戏开发、影视制作、建筑设计等领域。

在机械结构设计方面，Pro Engineer Wildfire可以提供更精确的建模和分析功能，支持强大的装配体设计、材料分析、运动仿真、可靠性分析等工具，从而能够更好地满足机械产品的设计需求。此外，Pro Engineer Wildfire还支持数控机床编程，帮助工程师实现工艺规划和生产流程控制。

相比之下，3ds Max的优势在于其先进的建模和渲染技术，可以创建出更真实、更生动的动画和场景效果，适用于影视、游戏等领域的制作与开发。同时，3ds Max也提供了一些基础的物理仿真和碰撞检测功能，但与Pro Engineer Wildfire相比，在机械结构设计方面的功能相对较弱。

因此，在机械结构设计方面，使用Pro Engineer Wildfire会更加适合，而在影视、游戏等领域的建模和渲染方面，3ds Max则更为优秀。

## Axure 怎么让容器滚动
右键太长的容器，转换为动态面板，概要-动态面板的State1选中，样式-更改高度（限定死高度），样式-Scroll Vertical，就可以了。说到底就是限定动态面板的高度再打开它的滚动条，超出的部分就会自动显示滚动条。

## dlswbr 可能和反爬虫有关
DLSWBR的英文全称是"Dynamic Limiting Speed Web Behavior Recognition"。是“动态限速Web行为识别”。
如: dlswbr.baidu.com

## )]}'
## [[[]]]
    这种格式的响应是一种防止跨站脚本攻击（Cross-Site Scripting, XSS）的技术，称为“防止XSS攻击的JSON”（XSS-Protection JSON）。它会在JSON响应前添加 )]}', 这个前缀，以防止浏览器将JSON响应解析成脚本，保证响应数据的安全性。开发者可以在前端对这种格式的响应进行解析，使用JSON.parse()函数时需要先去除这个前缀。

## Patrick Wied与h337的由来
    Patrick Wied是一位来自奥地利的前端开发者，他创造了一些流行的可视化工具和JavaScript库，如Datamaps和d3-tip。
    h337是他的GitHub用户名，它来源于他曾经在创建一个三维游戏引擎时使用的hash算法。h337也用于他的一些开源项目的名称中，例如heatmap.js和cloud.js。
    
## webpack打包后的两种闭包
    function(t, e) {//(module, exports)
    function(t, e, n) { //module, __webpack_exports__, __webpack_require__?
   
## wasm在前端的rsa领域有什么应用
    在前端领域，通过WebAssembly的方式使用RSA加密是一种更有效和安全的方法。由于RSA加密需要大量计算操作，而WebAssembly能够在浏览器中提供高性能和低延迟的运行环境，使得RSA算法能够在浏览器中高效地运行。此外，使用WebAssembly的方式进行RSA算法的计算也可以保护RSA加密算法的源代码不被恶意攻击者窃取和利用。因此，在前端领域，WebAssembly在RSA加密领域有着广泛的应用。

## 使用 Rust 和 WebAssembly 技术开发
    "__wbindgen_is_object"或"__wbg_crypto_2bc4d5b05161de5b" 中 wbindgen或wbg是WebAssembly和JavaScript之间的绑定的缩写。在使用Rust编写WebAssembly模块时，通常要使用另一个称为 wasm-bindgen 的工具来帮助创建这些绑定。创建绑定时，wasm-bindgen将自动生成一些 JavaScript 当中内部使用的函数名，这些简略但难以记忆的函数名都以 __wbg_ 开头。


## 命名实体识别
是一种自然语言处理技术，它旨在从文本中识别出具有特定命名实体类别的实体，如人名、地名、组织机构名称等。通过对文本中的命名实体进行识别和分类，可以更好地理解文本的语义和结构，为信息提取、文本分类、搜索引擎优化等应用提供有力支持。

## 优锘模型 scene.json索引
    很多模型的index.json
    其他的jpg/png/bin/gltf不知道是怎么来的,应该在代码中定义的?JSON.parseX搞怪了由thing.thingGLTFLoader.JSONXLoader解密
    generator: "FBX2glTF"
    version: "2.0"
    在glTF文件中，这些属性代表以下内容：
        materials: 定义渲染物体时的材质信息；
        images: 存储图像资源，包括颜色、法线和透明度纹理等；
        textures: 存储用于着色和光照计算的纹理映射；
        meshes: 存储网格数据，包括顶点坐标、连接不同顶点的面以及每个顶点上的 UV 和法向量等信息；
        buffers: 存储二进制形式的几何、声音、特效等相关数据；
        bufferViews: 指定一部分存储在buffer中的数据所需描述信息的视图；
        accessors: 通过描述符访问存储在缓冲区中的数据对象；
        nodes: 组成场景中的所有对象并且处理它们之间的关系；
        asset: 描述整个文件的meta-data，如版本、创作者、模型名称等；
        scene: 定义了哪个节点是默认场景中的根节点；
        scenes: 在.glb文件中定义多个.scene文件的列表；
        samplers: 定义纹理的过滤模式。
## chrome.storage.local跟localStorage有什么区别
一个是会上传到云上, 一个在本地
`chrome.storage.local`和`localStorage`有几个区别：

1. 用途：`chrome.storage.local`专门为Chrome扩展和应用程序设计，用于在更集中的位置存储数据[^2](https://stackoverflow.com/questions/24279495/window-localstorage-vs-chrome-storage-local)。而`localStorage`是一个Web API，允许Web应用程序在用户的浏览器中存储数据[^1](https://www.oreilly.com/library/view/programming-chrome-apps/9781491905272/ch03.html)。

2. 存储限制：`chrome.storage.local`通常提供较大的存储容量，约为5.2MB[^4](https://dev.to/milandhar/chrome-local-storage-in-extensions-4k9m)，而`localStorage`通常限制在约2.5MB[^3](https://sidewise.userecho.com/communities/1/topics/169-use-chromestoragelocal-rather-than-localstorage)。

3. 同步功能：当用户在不同设备上登录到Chrome时，`chrome.storage.local`具有数据同步的能力[^2](https://stackoverflow.com/questions/24279495/window-localstorage-vs-chrome-storage-local)。`localStorage`没有内置的同步功能，仅限于当前设备。

4. 异步和同步：`chrome.storage.local`是异步操作的，意味着它使用回调函数或Promises来处理数据的存储和检索[^2](https://stackoverflow.com/questions/24279495/window-localstorage-vs-chrome-storage-local)。`localStorage`是同步操作的，可以直接使用简单的属性访问方式来访问存储的数据。

5. 数据寿命：存储在`chrome.storage.local`中的数据可以长时间持久存在，即使浏览器关闭或重新启动[^2](https://stackoverflow.com/questions/24279495/window-localstorage-vs-chrome-storage-local)。`localStorage`中的数据通常是持久的，但可以在明确清除或清除浏览器缓存时被清除。

需要注意的是，`chrome.storage.local`主要用于Chrome扩展和应用程序，而`localStorage`是一种更通用的Web API，用于在浏览器中本地存储数据。