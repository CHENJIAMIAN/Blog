import{_ as s,o as n,c as a,O as l}from"./chunks/framework.4afe7240.js";const p="/assets/5A3DEFF25BB94F43A80349A46285698C.386e2888.jpeg",o="/assets/D8E27A47DAF344E3BCA78A16F2C579A1.21746524.png",C="/assets/38CD1BF370924F3995B9464FBF5C44AA.7e20c9ee.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"2 O/0 算法们.md","filePath":"2 O/0 算法们.md"}'),e={name:"2 O/0 算法们.md"},c=l(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">慕课网上的课程《玩儿转算法面试》</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 时间复杂度</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 时间复杂度基础</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 时间复杂度的通用代码</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 时间复杂度实验</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 递归时间复杂度</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 摊销时间</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 摊销时间 </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 使用数组</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 二分查找</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 二分查找二</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 移动零点</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 移动零点 II</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 排序颜色</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 二和二</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 最小大小子数组和</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">08</span><span style="color:#A6ACCD;"> 不重复字符的最长子串</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 使用哈希表</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 两个数组的交集</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 两个数组的交集 II</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 更多关于设置和地图</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 二和</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 4Sum II</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 回旋镖数量</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 包含副本 II</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">08</span><span style="color:#A6ACCD;"> 包含副本 III</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 关于链表</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 反向链表</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 测试你的链表</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 删除链表元素</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 成对交换节点</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 删除链表中的节点</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 从列表末尾删除第 N 个节点</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 堆栈和队列</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 有效括号</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 递归和堆栈</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 递归算法的非递归实现</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 二叉树级顺序遍历</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 完美的正方形</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 优先队列</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> Top K 频繁元素</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选 </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 经典非递归前序遍历</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选02经典非递归中序遍历</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选03经典非递归后序遍历</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选 </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 二叉树莫里斯遍历</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选05字梯</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 二叉树和递归</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 二叉树的最大深度</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 反转二叉树</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 路径总和</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 二叉树路径</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 路径总和 III</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 二叉搜索树的最低共同祖先</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">08</span><span style="color:#A6ACCD;"> 递归和回溯</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 电话号码的字母组合</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 排列</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 组合</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> 组合优化</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> 词搜索</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 岛屿数量</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">08</span><span style="color:#A6ACCD;"> N皇后区</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">09</span><span style="color:#A6ACCD;"> 动态规划</span><span style="color:#676E95;font-style:italic;">//递归有重叠子问题就可以用 可以用记忆化搜索(自上而下)的, 就可以用动态规划(自下而上)</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 斐波那契</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 爬楼梯</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">03</span><span style="color:#A6ACCD;"> 整数中断</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;"> 房子强盗</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">05</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> 背包</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">06</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> 背包优化</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">07</span><span style="color:#A6ACCD;"> 分区相等子集和</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">08</span><span style="color:#A6ACCD;"> 最长递增子序列</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">09</span><span style="color:#A6ACCD;"> 最长公共子序列</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选 </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 更多关于斐波那契</span></span>
<span class="line"><span style="color:#A6ACCD;">         可选 </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 更多关于 LIS</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> 贪心算法</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F78C6C;">01</span><span style="color:#A6ACCD;"> 分配 Cookie</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F78C6C;">02</span><span style="color:#A6ACCD;"> 非重叠区间    </span></span>
<span class="line"><span style="color:#A6ACCD;">          </span></span>
<span class="line"><span style="color:#A6ACCD;">第一章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">线性表基础</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、链表（List）及经典问题</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、线程池与任务队列（Task</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Queue）</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、递归与栈（Stack）：解决表达式求值</span></span>
<span class="line"><span style="color:#A6ACCD;">第二章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">树结构基础</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、二叉树（Binary</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Tree）与经典问题</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、堆（Heap）与优先队列</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、并查集（Union</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">find）及经典问题</span></span>
<span class="line"><span style="color:#A6ACCD;">第三章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">排序算法</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、快速排序（Quick</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Sort）及优化</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、归并排序（Merge</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Sort）：从二路到多路</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、算法杂谈系列（Algorithm）：有趣的排序思想</span></span>
<span class="line"><span style="color:#A6ACCD;">第四章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">查找与搜索</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、二分算法（Binary</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Search）：致敬经典，超越经典</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、哈希表（Hash</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Table）与布隆过滤器（Bloom</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Filter）</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、深搜（DFS）与广搜（BFS）：初识问题状态空间</span></span>
<span class="line"><span style="color:#A6ACCD;">第五章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">单调栈与单调队列</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、单调队列（Monotone</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Queue）及经典问题</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、单调栈（Monotone</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Stack）及经典问题</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、专项面试题解析</span></span>
<span class="line"><span style="color:#A6ACCD;">第六章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">手撕平衡二叉树排序树</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、手撕 AVL 树</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、手撕红黑树（上）</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">插入调整</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、手撕红黑树（下）</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">删除调整</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">第七章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">从递推算法到动态规划</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、递推算法及解题套路</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、动态规划算法</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、动态规划算法优化</span></span>
<span class="line"><span style="color:#A6ACCD;">第八章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">字符串匹配问题</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、经典匹配算法：KMP、Sunday 与 Shift</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">[And</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Or] 算法</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、字典树（Trie）与双数组字典树（Double</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Trie）</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、哈弗曼编码（Halfman</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Coding）与二叉字典树</span></span>
<span class="line"><span style="color:#A6ACCD;">第九章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">算法杂谈系列月</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、从前缀和到树状数组（Binary</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Indexed</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Tree）</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、一个公式引发的算法学习惨案</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、有趣的莫比乌斯反演（Möbius Inversion）</span></span>
<span class="line"><span style="color:#A6ACCD;">第十章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">金融系统中的 RSA 算法</span></span>
<span class="line"><span style="color:#A6ACCD;">    第十一章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">傅立叶变换与信息隐写术</span></span>
<span class="line"><span style="color:#A6ACCD;">    第十二章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">状态机模型与语言解释器</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">《前端算法精进之路》</span></span>
<span class="line"><span style="color:#A6ACCD;">第一章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">线性表基础</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、LRU缓存算法</span><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;">Vue源码中的链表</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、React Fiber解构拆解</span><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;">React源码中的链表</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、event</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">loop</span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">浏览器中的微任务和宏任务队列</span></span>
<span class="line"><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">、JSX是如何工作的</span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">React生态源码中的栈</span></span>
<span class="line"><span style="color:#A6ACCD;">第二章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">树结构基础</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、戏说虚拟dom</span><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;">树形结构</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、现代浏览器是如何渲染页面的</span><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;">树形结构解析</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、React源码任务优先级调度（优先级队列）</span></span>
<span class="line"><span style="color:#A6ACCD;">第三章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">排序算法</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、常见排序算法js版</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、Javascript自带的sort是怎么实现排序的</span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">V8引擎中的排序算法</span></span>
<span class="line"><span style="color:#A6ACCD;">第四章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">查找与搜索</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、ES6里的Map原理 （哈希表）</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、布隆过滤器思想在前端的应用</span><span style="color:#676E95;font-style:italic;">//用来告诉你 “某样东西一定不存在或者可能存在”</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、趣谈搜索算法</span></span>
<span class="line"><span style="color:#A6ACCD;">第五章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">算法思想</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、何为贪心算法</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、二分算法的实战</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、Vue3源码中的贪心和二分</span></span>
<span class="line"><span style="color:#A6ACCD;">第六章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">平衡树</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、号称前端面试天花板的红黑树</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、JS手撕红黑树</span></span>
<span class="line"><span style="color:#A6ACCD;">第七章</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">动态规划</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、何为动态规划</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、动态规划套路详解</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、团灭常见leetcode动态规划题</span></span>
<span class="line"><span style="color:#A6ACCD;">第八章</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、虚拟dom算法深究</span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">最长递增子序列</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、从最短编辑路径看前端性能优化</span></span>
<span class="line"><span style="color:#A6ACCD;">第九章</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、前端算法杂谈</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、从算法角度看待前端发展历程</span></span>
<span class="line"><span style="color:#A6ACCD;">第十章</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、前端加密算法</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、前端常见加密算法实战</span></span>
<span class="line"><span style="color:#A6ACCD;">第十一章</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、截图信息隐写术</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、编译原理初识</span></span>
<span class="line"><span style="color:#A6ACCD;">第十二章</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、前端状态机</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、vue和React源码中的编译原理</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、javascript解释器</span></span></code></pre></div><p><img src="`+p+`" alt=""></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">线性表</span></span>
<span class="line"><span style="color:#A6ACCD;">    适合读取</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">不适合增删</span></span>
<span class="line"><span style="color:#A6ACCD;">链表</span></span>
<span class="line"><span style="color:#A6ACCD;">    删除技巧</span><span style="color:#676E95;font-style:italic;">//设置虚拟头节点</span></span>
<span class="line"><span style="color:#A6ACCD;">    相反</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">判断有环</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">两个指针</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">A一直一步一步的走</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> B每次从头走到A</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 看看AB次数是否一致</span></span>
<span class="line"><span style="color:#A6ACCD;">        2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">快慢指针不相遇</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">确定边界最重要</span></span>
<span class="line"><span style="color:#A6ACCD;">滑动窗口最大值问题</span><span style="color:#89DDFF;">?</span></span>
<span class="line"><span style="color:#A6ACCD;">回溯法</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">一条路走到黑</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 碰壁了再回来重置条件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">平衡二叉树删除</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 找到右子节点的最小值</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">替换要删除的</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、排序</span></span>
<span class="line"><span style="color:#A6ACCD;">    非重点：</span></span>
<span class="line"><span style="color:#A6ACCD;">        归并排序</span><span style="color:#676E95;font-style:italic;">//  2个一组，排完组内，再合并排序</span></span>
<span class="line"><span style="color:#A6ACCD;">        堆排序  </span><span style="color:#676E95;font-style:italic;">//变成一个堆，从下往上让子向根(父)对比，让堆顶最大(大顶堆)，再递归其他，得到大到小的序列</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">稳  </span><span style="color:#FFCB6B;">定</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> 插入排序、合并排序、冒泡排序等</span></span>
<span class="line"><span style="color:#FFCB6B;">不稳定</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> 堆排序、快速排序等</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//不稳定排序的主要缺点是，多重排序时可能会产生问题。eg:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//假设有一个姓和名的列表，按照“先姓，后名”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">//如果排序算法是稳定的，这样也可以达到“先姓，后名”的排序效果。如果是不稳定的，就不行。</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、堆栈、队列、链表</span></span>
<span class="line"><span style="color:#A6ACCD;">    堆栈一定要准备JS的top、push、shift、unshift这四个api，本身就帮我们实现了堆栈和队列。</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    链表和数组区别 </span><span style="color:#676E95;font-style:italic;">//内存不连续,改快读慢,长度动态</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、递归 </span><span style="color:#676E95;font-style:italic;">//特征:要返回,也叫回溯, 真正的回溯是有手动恢复状态的</span></span>
<span class="line"><span style="color:#A6ACCD;">    递归是一定不能偷懒的。算法比较难的时候，一般要用到递归。</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">尾递归</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">函数调用出现在调用者函数的尾部</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 因为是尾部</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 所以根本没有必要去保存任何中间局部变量</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 节省内存</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">、波兰式和逆波兰式</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">总结：</span></span>
<span class="line"><span style="color:#A6ACCD;">    比如阿里，如果基础题答的很好，但是算法不会，那可能通不过。</span></span>
<span class="line"><span style="color:#A6ACCD;">    还有金融类的，必考算法。比如阿里云，里面的业务就是算法的，所以肯定考算法。</span></span></code></pre></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">取模</span><span style="color:#A6ACCD;">(mod)</span><span style="color:#89DDFF;">==</span><span style="color:#82AAFF;">求余</span><span style="color:#A6ACCD;">(rem)</span></span></code></pre></div><p><img src="`+o+'" alt=""></p><p><img src="'+C+'" alt=""></p>',8),t=[c];function A(r,y,D,i,F,d){return n(),a("div",null,t)}const m=s(e,[["render",A]]);export{u as __pageData,m as default};
