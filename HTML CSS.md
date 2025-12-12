```javascript
CSP //内容安全策略: 服务器用header来规定哪些域名我能去访问, 防止xss
    1 Content-Security-Policy: default-src 'self';   img-src *;    media-src media1.com media2.com;         script-src userscripts.example.com    
                              //只允许从self获得,     任何源的图片  限制音视频需从media1.com media2.com获取   所有脚本必须从serscripts.example.com 获取
                              Content-Security-Policy: referrer no-referrer
    2 <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">

可访问性
    1 残疾人(aria-标签)
        //WAI-ARIA是网络无障碍倡议-可访问的富网络应用程序
    2 移动端(用touch事件\减少输入\按需加载)
```

```html
语义HTML:明确定义其内容:
<header> <footer> <nav> <section> <article> <aside><details><figcaption插图><figure图><header><main><mark><summary摘要><time><form><table>
```

```javascript
<!DOCTYPE html> //告诉浏览器

svg下注册好多symbol是个什么用的//用use引用
        <use xlink:href="#symbolID" x="0" y="0" width="100" height="50"/>

<template> //它自己不会被显示，但它包含的内容会被显示（用来声明“模板元素”） 
    eg: <template data='1'><a/></template> //这样<a/>能拿到data='1' 但浏览器只会解析出 <a/>
相当于 <div style='display:contents'> ??

<base>//标签用于指定基础的路径。指定之后，所有的 a 链接都是以这个路径为基准。 
<a href="#tips"> //跳转到id或name或title为tips的元素，# 包含了一个位置信息，默认的锚是#top 也就是网页的上端
<a name="tips"或title="tips">//悬停提示tips 

target='_blank' //在空白页打开

href="#SomewhereInTheDocument"
    //#SomewhereInTheDocument 锚点: 给浏览器显示位于该“加书签”位置的内容的方向,＃后面的部分从来没有发送到请求的服务器。


//性别的选择
     <select name="type">
       <option value="管理员">管理员</option>
       <option value="普通用户">普通用户</option>
     </select> 
     
空格  <br>换行  

<table> 
     <tr>行	<th>表头	<td>格单元

data- //HTML5允许开发者自由为其标签添加属性。如data-toggle指以什么形式触发，常用的如弹出框，下拉框,提示等


//SEO: 让搜索引擎更容易抓取到信息，
   1 <html lang="zh-CN"> //lang是给搜索引擎用的
   2 rel="nofollow" //告诉seo不要读它
   3 用语义化标签
   4 <script>//放最后面,防止seo读不懂
   5 超链接扁平化//比如不要用上一页下一页，而是用123...456 页,这样搜索引擎就算想到第6页也是点1次就够了   
```

```css
<link href="../../ol.css" rel="stylesheet" type="text01/css" />
```

# 属性

```css
body的初始默认margin:8px；
rel="属性是必须的，规定当前文档与被链接文档/资源之间的关系" 
font-size: 2em;   /* 2倍 元素的font-size大小(8px) 2*8x=16x= 1em */
           100vh: /*等于1个适口高度,vw同理*/
           
transform:translate(50%,50%);/*X轴→,Y轴↓ 平移*/
transform:translate(50%,105px);  → ↓ /*向x轴右边平移元素width的50%，向y轴下面平移105px*/
transform: scale(0.5) translate(-100%, -100%);/*缩放再平移*/
    "只能translate由盒模型定位的元素(block)"

优先级:  background-image: >  background-color: > background
background: linear-gradient(75deg, #6d78ff, #00ffb8);//好看的渐变颜色 //background属性是会显示在border里的
            linear-gradient(rgb(23, 155, 178), rgb(53, 8, 141));
            /* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
            linear-gradient(0deg, blue, green 40%, red);
            linear-gradient(red 47%, green 53%)//有一点点渐变
            linear-gradient(red 47%, green 47%)//直接截断
            
background-attachment: scroll|fixed(相对视口滚动|固定); 
                              local(在视口和元素内部,都滚动);

资源路径问题:
    js环境用require函数
    css环境用url函数
        src="url"          不会被webpack处理
        :src=require()     会被webpack处理
        background：url()  会被webpack处理
    background: url('~/static/assets/img/timer.png'); ~告诉webpack的url-loader这是一个module,而不是相对路径。      
    /*url() 函数URL可以使用''或""，也可以省略*/
    
    /*vue-cli规定如果 URL 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析,它被解析为:http://localhost:9531/static/img/loginbg.35aeef1d.png*/
        或者:    <img src="~static/assets/img/IRS/yjrs.png">
   

box-shadow: 60px -16px theleal;/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 0 0 15px 0 rgba(0,0,0,.1); /* x偏移量 | y偏移量 | 模糊半径 | 扩散半径 | 颜色 */
border: 20px solid red;/*.border占用空间，outline包围border且不占用空间不会影响元素的尺寸和位置*/
border-radius: 10% 30% 50% 70%; "从左上角顺时针"

text-align: justify;"为两端对齐"

display:none    不占位置             
visible:hidden  占位置

float: left;"之后，其display的计算值就成了block"//它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素
    '非替换元素要指定宽度,否则会尽可能地窄'
    '假如在一行之上只有极少的空间可供浮动元素，那么这个元素会跳至下一行'

文本|空格处理:
    white-space:pre-wrap;/*不合并空白符，允许换行符换行和文本自动换行；*/
    word-spacing:20px;/*一个空格的间隙为20px*/
    text-transform: uppercase;/*只能输入大写*/

margin:25px 50px 75px 100px;	#上右下左 '逆时针'
margin:25px 50px 75px;		#上  左右  下
margin:25px 50px;			#上下    左右
margin:25px;			#上下左右

calc:
    height: 90%;/*写给不支持calc()的浏览器*/ 
    height:-moz-calc(100% - 页眉页脚高度);     -moz:       firefox	 -ms:        IE	
    height:-webkit-calc(100% -页眉页脚高度);   -webkit:    chrome和safari    WebKit是一个开源的浏览器引擎
    height: calc(100% -页眉页脚高度);
    
如果要表达父子之间的距离，我们一定要善于使用父亲的padding，而不是儿子的margin,因为"子用margin会父子margin折叠"

怎么找谁把高度挤开了?
    从父元素到子元素逐级找[高度最大的], 利用开发工具的computed去看是padding还是margin还是height高了,点击箭头直接调整到改css,修改或覆盖即可
```

# 原理性

```css
全局滚动条,接近elementui
        /*滚动条凹槽的颜色，还可以设置边框属性 */
        *::-webkit-scrollbar-track-piece {background-color: #074181;-webkit-border-radius: 2em; -moz-border-radius: 2em;border-radius: 2em;}
        /*定义滚动条高宽及背景 宽分别对应横竖滚动条的尺寸*/
        *::-webkit-scrollbar {width: 5px;height:5px;}
        /*滚动条的设置*/
        *::-webkit-scrollbar-thumb {background-color: #0099ff;background-clip: padding-box;-webkit-border-radius: 2em;-moz-border-radius: 2em;border-radius: 2em;}
        /*滚动条鼠标移上去*/
        *::-webkit-scrollbar-thumb:hover {background-color: #3ab0ff;}
        
去掉滚动条
    /*一个一个元素删，看是哪个元素挤出了滚动条，设置它的高度height，如果百分比没有反应，那就用绝对定位 /*/
     position: absolute;    height: calc(100% - 101px);/*注意-前后空格!!!/*/*
     overflow: hidden; //找不到是哪个元素挤开的,就设置html 超出就隐藏，不显示滚动条 
并排 
    1.使用float: left 		2.使用display: inline //不换行

【盒子模型】(Box Model)：只有Margin是外边距,Padding是内边距，Border以内都是内部
    如果 box-sizing: content-box（默认）【标准盒子模型】/*则【内容区域】的大小可明确地通过 width、min-width、max-width、height、min-height，和 max-height 控制。/*/*
    如果 box-sizing: border-box;  【IE盒子模型】/*不会撑开产生滚动条,为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。*/
  
3个属性对应  <-->  3种【传统-盒模型-布局】:
    1.display: block/inline;【流体布局(html默认)】
        block: 内容宽度是其父元素的100%，其高度与其内容高度一致 'absolute或float会变成block'
        inline: height width与内容一致。'你无法设置行内元素的height width; margin/padding的上下也没法设置', 如果要改宽高,需要改为display:block相关
                父级块级元素内有足够空间，安排在同一行。空间不够，溢出的文本或元素将移到新的一行。
        宽高:'width、height的默认值都是auto'
            block:                
                 height\width: 50%;       /* 向上找到最近的有设置高度的块级元素的height\width的百分比 */ 
                 /也有可能被兄弟元素撑开/
            inline: 
                '不能设宽高!!!' 置换元素如img， input，button，select，textarea除外
        display: inline-table; /*外在盒子就是inline，内在盒子就是table。*/
        min-width | max-width 属性覆盖 width. '(height/width设置不生效?检查一下是不是因为这个)'
        '而像位置的如left padding 的 % 是基于自身宽度'
        
    2.float: left 切换到【浮动布局】  
        清除浮动: /*如果此父元素只包含浮动元素，则其高度实际上将崩塌为零,所以要在容器中的浮动元素之后&&容器关闭之前(:after)清除浮动元素来解决此问题*/
            1.BFC
            2.father:after：{clear:both;}/*告诉你我左右都不要有浮动元素*/"
                         /*clear: left; 我前面float: left;的元素要浮动在我左边,我就不,我要在它下面*/         
                            		
    3.position: absolute 切换到【定位布局】

2个  <--> 【非传统|盒模型|布局】:
    【弹性布局】display:  /inline-flex;的布局。设为弹性布局以后，子元素的float、clear、vertical-align属性都会失效。
            flex容器的属性:    
                1、flex-direction：设置容器主轴线的方向(默认是水平的)
                3、justify-content：主轴-上的item的对齐方式 "space-between实现分散对齐"
                4. align-items：  交叉轴-上item的对齐方式                
                /*2、flex-wrap：滚动条还是换行，每换一行意味着会多一条主轴线 /*flex-flow是direction和wrap的缩写*/
                /*5、align-content：多轴线对齐方式,项目只有一根轴线则不起作用*/
                .cover-flex{   
                        display: flex;   justify-content横轴: center;   align-items竖轴: center}
                        flex-direction：设置容器主轴线的方向{row左到右,column上到下}     
                        flex-wrap：设置是否换行，每换一行意味着会多一条主轴线  {nowrap（默认值）不换行就挤着 ,wrap换行上到下}
                        align-content：多轴线对齐方式{}                                          
            flex项目(子元素)的属性:    
                1、order：排列顺序,默认为0 
                2、flex-grow：有空间给它伸时,最大可以伸多少倍;默认是0不伸张(在flex属性中默认是1);别人是1,它是2,那可以申时它就比别人多伸缩1倍
                   flex-shrink：空间不够需要它缩时,最多可以缩多少倍,默认是1
                3、flex-basis：初始大小,默认为auto原来大小, 数字没意义,要用px %
                4、align-self：覆盖容器的align-items
                    默认,flex:0 1 auto; /*放大 缩小?可空 默认大小*/ 'auto (1 1 auto) 和 none (0 0 auto)'
                        flex: 1/*flex为正，flex-grow:1，flex-shrink:1，flex-basis 取 0% */ ;   
                        flex: 30px/*flex-basis */;
            弹性盒子(弹性布局的元素)只定义了弹性子元素如何在弹性容器内布局。弹性子元素通常在弹性盒子内一行显示。默认情况每个容器只有一行。
                width(宽) + padding(内边距) + border(边框) = 元素实际宽度
                height(高) + padding(内边距) + border(边框) = 元素实际高度
    【Grid布局】display: grid/inline-grid;的布局。
            Flex指定"项目"在轴线的位置来布局，是一维布局。
            Grid指定"项目"所在单元格的"行""列"，是二维布局。  
            模板(复制直接用)  <div style="display: grid; grid-template-areas: 'a b c' 'd e f' 'g h i' 'j k l';"><div style="grid-area: a;">a</div><div style="grid-area: b;">b</div><div style="grid-area: c;">c</div><div style="grid-area: d;">d</div><div style="grid-area: e;">e</div><div style="grid-area: f;">f</div><div style="grid-area: g;">g</div><div style="grid-area: h;">h</div><div style="grid-area: i;">i</div><div style="grid-area: j;">j</div><div style="grid-area: k;">k</div><div style="grid-area: l;">l</div></div>                          
              0.grid-auto-flow:column; "Grid默认是一行一行的排下去" "我们改成一列一列排下去"
              1.grid-template-columns: repeat(3, 33.33%);
                                      100px 100px 100px; "定义列宽"                                      
                                      repeat(auto-fill, 500px);'每个500px,自动换行'
                                      1fr 500px '左伸缩 ,右500px'
                                      1fr 1fr;(分别占用剩余空间的1个分数单位,占所有fr的占比)  
                  /*grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高*/
              2. grid-template-areas: 'a b c'       
                                      'd e f'  
                                      'g h i';   /*然后就可以 grid-area: e; 或 grid-column-start:g;*/
                    /*grid-template:grid-template-columns、grid-template-rows和grid-template-areas的简写。*/
              3.grid-row-gap: 20px; /*行间距*/gap:20px;
                                         
            
              5."(所有格子为整体)在容器里面的水平位置" 
                    justify-content:start; "space-between实现分散对齐"
                    align-content:垂直
                    /*place-content:space-around space-evenly;/*align-content和justify-content的简写*/*/
                    
              6.grid-auto-columns:50px; "其它"浏览器自动创建的多余网格的列宽和行高   
              
              7.'所有格子里的内容'
                justify-items:center;"水平"
                align-items: center;"垂直" /*align-items和justify-items简写:place-items:start end; "在格子里的位置" "如居中"*/
                  
         单个项目格子item:               
              8.  grid-area: 1 / 1 / 3 / 3; /*左上角行列  右下角行列  <row-start> / <column-start> / <row-end> / <column-end>;*/  '定位置'
                      grid-area: e; /*格子放在哪*/                    
                         grid-column: 1/2; grid-row: 1/3;    /*第1列 的 第1和2格子合并*/
                          /*grid-column:grid-column-start和grid-column-end简写,grid-row同理              */
              9.justify-self
    
层级/层叠上下文:(表示z-index顺序)
    脱离默认层级(能让z-index生效的)的有: 
        'relative/aboslute/flex或grid的item, 且z-index不为auto',    换句话说,这是z-index生效的条件!!!!!!!!!!!!!!!!!!!!!!!!
        'opacity<1，那么该元素的层叠级别将会高于普通元素'效果等同'position:absolue;' 
        有transform/filter等
    从底到上:background/border --> z-index<0 --> （block盒子 --> float盒子 --> inline盒子） --> z-index:0/atuo --> z-index>0
    1.正常文档流的兄弟元素,后出现的在上面
    2.儿子总是显示在在爸爸上面
    3.z-index大小只用于兄弟的比较,父z-index会覆盖掉子的z-index
    
BFC块格式化上下文: 限定内容不会超过该独立 隔离的区域去显示 '重点'
    生成:
        display:inline-*/table-*/float/flex/grid;/*行内表格浮动最新*/
        position:absolute/fixed;/*绝对*/
        overflow: 不为visible的块元素 "最常用"
    3特性:(边距 撑高 互斥) /*内部子元素垂直边距会重叠 | 高度包括浮动子元素的高度 | 与外面的浮动元素互斥 */
    作用:
        特性1解决:解决外边距折叠(让二者不在同个BFC即可,因为两个元素只有在同一 BFC 内，才有可能发生垂直外边距的重叠)
            因为外边距折叠:只会发生在属于同一BFC的内部子元素
                    /*外边距折叠:标准文档流中，竖直方向的margin不叠加，只取较大的值作为margin     */
        特性2解决:让float子元素能撑开父元素 /*默认不撑开所以父元素为0, 把父元素搞成bfc, 父元素的高度就被子元素撑开了*/
        特性3解决:去浮动(eg:b为float浮在a上面,那把a搞成bfc,就互斥了)   
        

父子边距折叠:子元素有margin-top和margin-bottom时，如果父元素不是BFC
            那么只有子元素本身的高度会撑起父元素，子元素的margin值是不会影响父元素的高度的。
            即父子height是一样的，而位置是根据子元素和父元素的margin-top的较大者来的
            那么父设为BFC后,是子在父这个BFC内, 而不是父子在同个BFC内,这样就触发了特性1
            边距就会被包进BFC进行折叠了(原先是边距跑出去了)

inline-block:使其既具有block的宽度高度特性,又具有inline的同行特性

为什么eleui的 table的 tr里的 td的 flex的div.cell里的 inline-block型div设置width:300px; 无效?        
        首先要知道:<tr>的宽度===<table>的宽度
                  div.cell的宽度===第一个<td>的宽度===<colgroup>的第一个<col>的宽度
        原因:flex容器的儿子默认flex为flex:0 1 auto; , 也就是默认空间不够会收缩,所以是这个属性覆盖掉了width属性
        解决:flex-shrink: 0;即可,即我就不收缩,我是多大就是多大
```

# 选择

```css
选择器权重:("就近原则")
    10000:!important  在css中，!important的权重相当的高，但是由于宽高会被max-width/min-width覆盖，所以!important会失效。
    1000:style=""
    100:#id{}
    10:.className{} \:hover{伪类}[type="text"]{属性}\
    1:div{标签}\:after{伪元素}\
    0：儿孙选择器: *所有\>儿子\+兄弟(一个)\~兄弟们(多个)

a[target='_blank'] /*属性选择器,选取所有 target 属性值等于 "_blank" 的 <a> 元素/*/*
body,html {}逗号,表示两个都要
#id2 > p:nth-child(2) 选择id2下的第2个p
p.marked{ }/*: 为所有 class="marked" 的 p 元素指定一个样式。/*/*
a:hover:not(.active) {color: #ddd}  /*not的用法/*/*
p:after{ content:"台词："; } /*:after 选择器在被选元素的内容后面插入内容content,作为已选中元素的最后一个子元素*/
a:link /*单冒号(:)用于CSS3伪类(没有创建一个文档树之外的元素)，双冒号(::)用于CSS3伪元素(创建一个文档树之外的元素)::after。*/
ul{    & >li { }    }   等价于  ul > li {margin-bottom: 0;}
.parent  *  {  }  /*在儿子孙孙子查找/*/*
.parent  >  *  {  }  /*只在儿子中查找/*/*
/*类说明符之间的空格间距意味着爸爸->后代关系。/*/*
.class1   .class2 { } /*<span class="class1"><p class="class2">Something</p></span>/*/*
/*同元素多个类*/
.class1.class2 {  }/*<p class="class1 class2">Major heading</p>/*/*


media(媒体查询)("自适应网页设计"的核心)
    @media (max-width: 300px) { }   /* <300px */
    以下是三个等价写法:
        1.<link media="screen and (min-width: 400px) and (max-device-width: 600px)" //适配宽度在400px-600px之间
        2.@media screen and (min-width: 400px) and (max-device-width: 600px){}
        3.@import url("tinyScreen.css") screen and (max-device-width: 400px);
    /*@media与@media  screen的区别，@media  screen的css在打印设备里是无效的，@media在打印设备里是有效的*/
    @media only screen and (min-width:xxx) and (max-width:xxx){只(only)针对彩色屏幕设备
    横屏：(orientation: landscape)
```

# 定位-position

```javascript
position:属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left
position:static; 默认值,自动排在上一个后面,定位HTML 元素，即没有定位，静态定位的元素不会受到 top, bottom, left, right,z-index影响/* 受padding,margin影响*/
position:absolute;   /*相对于最近的非 static 父元素定位，如果没有，那么它的位置相对于<html>*/'在“正常页面流”中，该元素所占空间为零，周边元素不受影响'
position:relative;   /*相对默认的static位置偏移给定的值，但是不影响其他元素的偏移。*/
position:fixed;     不为元素预留空间，而是通过指定元素相对于浏览器窗口（viewport）的位置来指定元素位置。不随页面滚动而变化。父元素有transform的话,会受影响
 position:sticky;    默认是relative,当条件达到top(最常用)、bottom、left、right设定的值时会自动切换为fixed
//影响位置的属性:vertical-align line-height

background: url(img/webmap.png) -309px -32px;
background: rgb(40, 30, 47)  url(../img/header.png) 0 0 / 100% 100% no-repeat;//postion / size repeat

水平居中:
    margin:0 auto;/*要水平居中对齐一个元素(如 <div>), 可以使用 ,自动分配计算top,bottom等后留下的尺寸*/
        /行内的要设置display:block;才生效/
    text-align: center; /*如果仅仅是为了文本在元素内居中对齐，可以使用 */
    
    margin:auto; width:346px;/*3个div水平居中：一个父div */   
    float:left; width:100px;/*三个子div：*/

垂直居中:
    line-height:400px;/*实现垂直居中的本质：行距*/
    
    vertical-align: middle;/vertical-align起作用的前提: inline | table元素/
        // middle时,图片的中线的位置被确定为从行内基线往上1/2   x-height 的位置, 近似垂直居中        
        如何实现完美居中:设置字号为0，基线、x-height线等等线都合为一体（因为它们之间的距离为0嘛）。所以1/2   x-height 的位置也变成在行内最中间的那里，图片就完美居中了
    
    margin: auto 0   
    751.83 374.63
```

# 能

```css
/*全屏*/
    body,html { /*:root等同html*/      height:100%;  width:100%;      margin:0;  padding:0;    }
    
浏览器原生支持的变量:
   :root {      --main-bg-color: pink;    }    
   document.documentElement.style.setProperty("--main-bg-color","red"); js in css
    body {      background-color: var(--main-bg-color, blue/*备选值*/));    }

/*再让div 充满整个*/
    div{height:100% ; width:100%; position:absolute;}

网页背景图
    body,html{  height: 100%;}		
    body{  background: url('xxx.jpg') no-repeat fixed;/*背景相对于视口固定*/  background-size:cover;/*缩放背景图片以完全覆盖背景区，*/}
用border做三角形
    div{
      border: 20px solid;
      border-color: blue transparent transparent transparent;
    }
```

# 杂

```css
字体类型：
        TTF		所有主流浏览器都支持它
        WOFF 	字体均经过 WOFF 的编码工具压缩，文件大小一般比 TTF 小 40%，是字体格式的未来，目前主流的浏览器的新版本几乎都支持 //还有EOT 和 SVG\OTF
            
BEM:(CSS选择器命名规范):  /*解决命名空间污染问题,在较小的组件中没必要*/
        .el-picker-panel__body-wrapper{}
        .el-textarea__inner:hover{}
        .el-button--primary{}
        一个块中元素的类名必须用父级块的名称作为前缀。
```

````javascript
href和src区别:一个是引用,一个是替换
<!DOCTYPE html> //声明用标准模式
    有什么用:
        Dcotype不存在或者不正确会导致文档以混杂模式呈现
    1）新: 严格/标准 模式：严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行。//document.compatMode==="CSS1Compat"
     1.1:  准标准模式
    2）旧: 混杂/怪异 模式：混杂模式的页面以宽松的向后兼容的方式显示模拟老的浏览器的行为以防止站点无法工作/怪异就是不同浏览器有差异,使用浏览器自己的方式来解析执行代码//document.compatMode == "BackCompat"
        
<label for="test" >test</label> :用标签不用span，因为它可以关联一个控件，点它就会选取它关联的控件,for 属性规定 label 与哪个表单元素绑定
重置（resetting(全部)CSS 和 标准化（normalizing(部分保留)
CSS 图像合并(雪碧图)（Image sprites）:利用position偏移拼接图片


GPU加速将元素提升为图层（也称为合成）
    (使用transform 或 opacity 或 will-change:left;)```



```css
CSS3的动画:
    /* @keyframes duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name */
        animation: 3s ease-in 1s 2 reverse both paused slidein;
    /* @keyframes duration | timing-function | delay | name */
        animation: 3s linear 1s slidein;
    /* @keyframes duration | name */
        animation: 3s slidein;
    eg:
    .类 {
          animation: 动画名 1s linear infinite;
        }
    @keyframes 动画名{ //定义动画变化过程中间的属性
      0% { top: 0; left: 0; }
      30% { top: 50px; }
      68%, 72% { left: 50px; }
      100% { top: 100px; left: 100%; }
    }
    
    
    
transition: margin-right 2s;/*过渡动画效果*/

-webkit-perspective /*与子3d元素的视觉距离*/
````

![1049D6D25F004911986D795FE0934639](https://github.com/CHENJIAMIAN/Blog/assets/20126997/b55e5c11-1b20-484a-96ad-d3d26b9aa2a2)

```javascript
为什么某字体font-size:100px,但是其高度是164px?
    因为改字体 规定 字符容器em-square是1000个单位,
              规定 基线必须距离顶部1100个单位
              规定 基线必须距离底部540个单位
    那这样它的高度就是164px了  
font-size:控制的是文字主体部分的高度(em-square的高度)。 内联格式化上下文（IFC） 
line-height:取决于font-size取决于font-family, 即是根据乘以em-square(如图)的高度计算!!
    line-height会覆盖line-box(行内最高元素的高度)
//而content-area和em-square之间的比例，完全是由字体设计师决定，作为程序员是无法统一的!!!!!
    
img 标签间距问题的原理以及如何解决 ？
    上下间隙: //内联元素的vertical-align默认和父的baseline对齐的，
             //而父的baseline和父底边有一定的距离（这个距离取决于font）
        1.vertical-align:bottom；  
        2.font-size:0;
    左右间隙: //行内元素之间有“回车”、“tab”、“空格”时就会出现间隙,解决:
        1.把空格回车什么的注释掉(根据font-size来占位)
        2.父元素的font-size为0
@font-face  指定在线字体 消除对用户电脑字体的依赖 
声明:
    @font-face {
      font-family: FX-LED;
      src: url('./../FX-LED.TTF');
      /*src: url(~static/assets/font/FX-LED.TTF);*/
    }
使用: font-family: FX-LED;
```

```javascript
<style>  /* 浮动 */
    .left {float: left;width: 300px;background-color: red;}
    .right {float: right;width: 300px;background-color: blue;}
    .main {background-color: green;}
</style>
<section class="container">
    <aside class="left">l</aside>
    <aside class="right">r</aside>
    <article class="main">m</article> //m 要放在最后面哦!!!!!
</section>

<style>/* 绝对 */
    .container {position: relative;}
    .main {margin-left: 100px;margin-right: 100px;background-color: green;}
    .left {position: absolute;left: 0;width: 100px;background-color: red;}
    .right {position: absolute;right: 0;width: 100px;top: 0;background-color: blue;}
</style>

<style>/*flex布局*/
    .container {display: flex;}
    .main {flex-grow: 1;            background-color: red;}
    .left {flex-basis: 100px;       background-color: blue;}
    .right {flex-basis: 100px;      background-color: green;}
</style>

<style>/*grid布局*/
  .container {
        display: grid;
        grid-template-columns:100px 1fr 100px;
    }
</style>
<section class="container">
    <aside class="left">l</aside>
    <article class="main">m</article>
    <aside class="right">r</aside>
</section>
```

---

> CSS模块化

````javascript
演变：
    Less--> SASS--> PostCSS
        --> CSS in JS(使用 JS 语言写 CSS,本质是操作ele.style,postcss实现了这点) 
            -->CSS Modules(imort wocao from xx.css)/*CSS Modules并不是一个正式声明或者浏览器实现，而是通过css-loader处理来使所有的class达到scope的一个过程*/
    
Less：  预处理语言, 增加了变量、Mixin、函数等特性
            :deep(.类名)
            /*Less是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放到项目中*/
            <link rel="stylesheet/less" type="text/css" href="styles.less" />
            <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js" ></script>
            
PostCSS： 接收一个css, 用JS处理CSS。它负责把 CSS 代码解析成抽象语法树结构, 输出处理后的css 
            PostCSS是一个工具，或者基本上只是一个API，PostCSS完全是关于插件的。
                与Sass相比，它具有许多现成的功能,如:Autoprefixer是一个postcss插件
      
SASS是一种CSS的开发工具，提供了许多便利的写法，文件后缀名是.scss，意思为Sassy CSS。
    变量以$开头 
    Sass的安装需要Ruby环境，是在服务端处理的
      npm install sass // 假定你已经安装好了Ruby(需要Ruby来编译它)
    sass test.scss test.css //编译

    @import "path/filename.scss"; //'SCSS 是 Sass 3 引入新的语法'
    div { 
            $blue: #1875e7;　//变量
            height: calc(100% - #{$navHeight});//函数语句中要用#{}包含变量         /如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中/
            margin: (14px/2); //计算
            
            hi {color:red;}
            background: { color: red; }// 属性也可以嵌套,注意冒号
            
            &:hover { color: #ffb3ff; }//&代表最根处标签名 ，相当于div:hover
            
            lighten(#cc3, 10%) // 颜色函数#d6d65c
            
            .class2 {  @extend .class1;  }//继承
            
            //Mixin(相当于引用模板)  
                //声明      
                @mixin rounded($vert, $horz,  $radius:10px) {
                    border-#{$vert}-#{$horz}-radius       :     $radius;
                }  
                //调用      
                #navbar{ 
                    @include rounded(top, left); 
                }
            
            
            @if lightness($color) > 30% {background-color: #000;} 
                @else {background-color: #fff;}
            
            @for $i from 1 to 10 {}
                @while $i > 0{}
            
            //方法
            @function double($n) {@return $n * 2;}//声明
            #sidebar {
                width: double(5px);//调用
            }
    }```



---



```javascript
TailwindCSS
    /* 这会注入  Tailwind 的base样式 和 插件注册的任何base样式 */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    /* 分三个的作用是用来css实现优先级 */
````