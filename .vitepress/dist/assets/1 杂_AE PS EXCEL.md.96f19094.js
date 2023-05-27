import{_ as s,o as n,c as a,O as l}from"./chunks/framework.4afe7240.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"1 杂/AE PS EXCEL.md","filePath":"1 杂/AE PS EXCEL.md"}'),p={name:"1 杂/AE PS EXCEL.md"},o=l(`<blockquote><p>PS</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">J复制</span></span>
<span class="line"><span style="color:#A6ACCD;">S</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">I反选</span></span>
<span class="line"><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">2高光</span></span>
<span class="line"><span style="color:#FFCB6B;">Z</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">缩放</span></span>
<span class="line"><span style="color:#FFCB6B;">H</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">抓手</span></span>
<span class="line"><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">D取消选取</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">纯色抠图</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">选择</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">色彩范围</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">抠图</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#82AAFF;">Q蒙板模式</span><span style="color:#A6ACCD;">(使前景为黑色</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">灰色的话是半透明)</span></span>
<span class="line"><span style="color:#A6ACCD;">B画笔</span></span>
<span class="line"><span style="color:#A6ACCD;">E橡皮擦</span></span>
<span class="line"><span style="color:#A6ACCD;">Q退出快速蒙板</span></span>
<span class="line"><span style="color:#A6ACCD;">M调整边缘</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">一般保存到图层蒙板</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">蒙板</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">黑不见</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">白见</span></span>
<span class="line"><span style="color:#FFCB6B;">上色</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">用油桶漆</span></span>
<span class="line"><span style="color:#FFCB6B;">alpha通道</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">用于储存选取</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">色阶</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">高光和阴影</span></span>
<span class="line"><span style="color:#FFCB6B;">色彩平衡</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">冷暖色</span></span>
<span class="line"><span style="color:#FFCB6B;">匹配颜色</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">使两图的色调一致无违和感</span></span></code></pre></div><hr><blockquote><p>EXCEL</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">随机数</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">1到1	</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">RANDBETWEEN</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">100</span></span>
<span class="line"><span style="color:#A6ACCD;">分级分段</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">LOOKUP</span><span style="color:#A6ACCD;">(C2</span><span style="color:#89DDFF;">,{</span><span style="color:#A6ACCD;">-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">-</span><span style="color:#F78C6C;">0.6</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">-</span><span style="color:#F78C6C;">0.2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0.2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0.6</span><span style="color:#89DDFF;">},{</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">生成固定和为100的3个随机数</span></span>
<span class="line"><span style="color:#A6ACCD;">开启选项</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">公式</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">迭代，迭代次数设到1000才准，迭代误差设为0</span></span>
<span class="line"><span style="color:#A6ACCD;">第1个数 </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">RANDBETWEEN</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">99</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">第2个数和第3个数</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">IF</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">SUM</span><span style="color:#A6ACCD;">(第1个数:第3个数)</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">第2个数或第3个数</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;">RANDBETWEEN</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">99</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">加粗 Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">B </span></span>
<span class="line"><span style="color:#A6ACCD;">增加缩进量 Alt</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">Shift</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">Right </span></span>
<span class="line"><span style="color:#A6ACCD;">左对齐 Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">L </span></span>
<span class="line"><span style="color:#A6ACCD;">增大字号 Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">Shift</span><span style="color:#89DDFF;">+&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Excel</span></span>
<span class="line"><span style="color:#A6ACCD;">Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">1单元格式</span></span>
<span class="line"><span style="color:#A6ACCD;">Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">Shift</span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;">增加一行</span></span>
<span class="line"><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">G定位</span></span>
<span class="line"><span style="color:#FFCB6B;">设置新输入的为红色</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">C</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">F定位空值</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">为空的单元设置</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">条件格式</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">新建规则</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">第二个</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">删除空行</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">选中第一列，定位空值，那空行就都被选中那，右键某个空行都空白处，删除，弹出提示框，选整行即可</span></span></code></pre></div><hr><blockquote><p>AE</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">CTRL</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">D复制</span></span>
<span class="line"><span style="color:#A6ACCD;">[:左对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">]:右对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">S大小</span></span>
<span class="line"><span style="color:#A6ACCD;">R旋转</span></span>
<span class="line"><span style="color:#A6ACCD;">P位置</span></span>
<span class="line"><span style="color:#A6ACCD;">SHIFT</span><span style="color:#89DDFF;">+</span><span style="color:#FFCB6B;">鼠标</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">调整对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">ALT</span><span style="color:#89DDFF;">+</span><span style="color:#FFCB6B;">鼠标</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">平均拉伸关键帧</span></span>
<span class="line"><span style="color:#A6ACCD;">ALT</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">]:删除线的右边</span></span></code></pre></div>`,8),e=[o];function c(t,C,r,D,A,y){return n(),a("div",null,e)}const B=s(p,[["render",c]]);export{i as __pageData,B as default};
