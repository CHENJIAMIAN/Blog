import{_ as s,o as n,c as a,O as l}from"./chunks/framework.4afe7240.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"1 杂/【数据库】【MySQL】.md","filePath":"1 杂/【数据库】【MySQL】.md"}'),p={name:"1 杂/【数据库】【MySQL】.md"},o=l(`<div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mysql </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">u </span><span style="color:#F78C6C;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">p </span><span style="color:#676E95;font-style:italic;">--user=userauth  #登录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">mysql </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">u </span><span style="color:#F78C6C;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">p</span></span>
<span class="line"><span style="color:#F78C6C;">root</span><span style="color:#A6ACCD;">@localhost: RhtpXh,)</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">5B4</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、显示数据库列表。 </span></span>
<span class="line"><span style="color:#A6ACCD;">show databases; </span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、显示库中的数据表： </span></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#A6ACCD;"> mysql;</span></span>
<span class="line"><span style="color:#A6ACCD;">show tables; </span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">、显示数据表的结构： </span></span>
<span class="line"><span style="color:#A6ACCD;">describe 表名; </span></span>
<span class="line"><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">、建库： </span></span>
<span class="line"><span style="color:#F78C6C;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">database</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">库名</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">、建表： </span></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#A6ACCD;"> 库名； </span></span>
<span class="line"><span style="color:#F78C6C;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">table</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">表名</span><span style="color:#A6ACCD;"> (字段设定列表)； </span></span>
<span class="line"><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">、删库和删表: </span></span>
<span class="line"><span style="color:#F78C6C;">drop</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">database</span><span style="color:#A6ACCD;"> 库名; </span></span>
<span class="line"><span style="color:#F78C6C;">drop</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">table</span><span style="color:#A6ACCD;"> 表名； </span></span>
<span class="line"><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">、将表中记录清空： </span></span>
<span class="line"><span style="color:#F78C6C;">delete</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> 表名; </span></span>
<span class="line"><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">、显示表中的记录： </span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> 表名</span></span>
<span class="line"><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">.变量</span></span>
<span class="line"><span style="color:#F78C6C;">set</span><span style="color:#A6ACCD;"> @varA </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> @varA;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">注意语句的结尾有个 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#F78C6C;">DROP</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">DATABASE</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">IF</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">EXISTS</span><span style="color:#A6ACCD;"> sampledb;</span></span>
<span class="line"><span style="color:#F78C6C;">CREATE</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">DATABASE</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sampledb</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">DEFAULT</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">CHARACTER</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">SET</span><span style="color:#A6ACCD;"> utf8;</span></span>
<span class="line"><span style="color:#F78C6C;">USE</span><span style="color:#A6ACCD;"> sampledb;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">ENGINE</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">InnoDB;</span><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;">该类型表支持事务,默认是MyISAM引擎</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">source C:\\sqlfile.sql </span><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;">运行脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">RAND</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">*</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">//-</span><span style="color:#A6ACCD;">1到0的随机数,原理:原区间（</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">，</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">）减1变成（</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">,</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">floor</span><span style="color:#A6ACCD;">()取整</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">UPDATE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">gis_geo_server_layer</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">SET</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">server_id</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">154</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">UPDATE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">表</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">SET</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">人数</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">人数</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">单位号</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;">更新,人数</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">原来的人数</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F78C6C;">UPDATE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">表</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">SET</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">人数</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;">  表1JOIN 表2 </span><span style="color:#F78C6C;">ON</span><span style="color:#A6ACCD;"> 表1.ID</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">表2.ID </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">单号</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> 列	</span><span style="color:#F78C6C;">HAVING</span><span style="color:#A6ACCD;"> 聚集函数</span><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;">连接其他表更新,根据列分组</span></span>
<span class="line"><span style="color:#A6ACCD;">HAVING可以使用聚集函数,WHERE不可用      </span></span>
<span class="line"><span style="color:#F78C6C;">DELETE</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">表</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> 用户号</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> 性别</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">ANY(	)  性别是...  </span></span>
<span class="line"><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> 名字 </span><span style="color:#F78C6C;">LIKE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">通配符</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">           </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">让MySQL自增长字段号从不连续变成连续的:删掉列,重新建列(不推荐,多表容易不同步)</span></span>
<span class="line"><span style="color:#F78C6C;">ALTER</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">TABLE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">DROP</span><span style="color:#A6ACCD;"> 求职者编号;</span></span>
<span class="line"><span style="color:#F78C6C;">ALTER</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">TABLE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> 求职者编号 </span><span style="color:#C792EA;">INT</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">NOT NULL</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">PRIMARY KEY</span><span style="color:#A6ACCD;"> AUTO_INCREMENT </span><span style="color:#F78C6C;">FIRST</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">解决多表自增id不连续,不同步:插入时用户号当前最大值</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">(推荐)</span></span>
<span class="line"><span style="color:#F78C6C;">INSERT INTO</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">普通用户表</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">(用户号,用户名,密码) </span><span style="color:#F78C6C;">VALUES</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">aaa</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MAX</span><span style="color:#A6ACCD;">(用户号)</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">AS</span><span style="color:#A6ACCD;"> aaa </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">普通用户表</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">)b)</span></span>
<span class="line"><span style="color:#A6ACCD;">,</span><span style="color:#F78C6C;">333</span><span style="color:#A6ACCD;">,</span><span style="color:#F78C6C;">333</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">解决了[Err] </span><span style="color:#F78C6C;">1093</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> You can</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">t specify target table </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">普通用户表</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> for update in FROM clause</span></span>
<span class="line"><span style="color:#C3E88D;">总结:取消自增,改为用int或BigInt，每次获取到最大，然后+1，对应字段的值。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">谁是多方谁就放一个外键:	外键作用就是必须我有你才能有，我没有的你不能有</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">使用varchar，代替char，这是因为varchar会动态分配长度</span></span>
<span class="line"><span style="color:#C3E88D;">char指定为20，即时你存储字符“1”，它依然是20的长度</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">外键类型</span></span>
<span class="line"><span style="color:#C3E88D;"> No action方式如果子表中有匹配的记录,则不允许对父表对应候选键进行update/delete操作</span></span>
<span class="line"><span style="color:#C3E88D;"> Restrict方式同no action, 都是立即检查外键约束</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">与一方同步用级联:一对多,多方多个外键;		外键的模式设为级联,就可与一方同步</span></span>
<span class="line"><span style="color:#C3E88D;">只能是删除,更新同步,插入无法同步 	也就是我删你也删,我更新你也更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">性别男女的约束</span></span>
<span class="line"><span style="color:#C3E88D;">ALTER TABLE \`用户表\`  DROP 性别;//删掉</span></span>
<span class="line"><span style="color:#C3E88D;">ALTER TABLE \`用户表\` ADD 性别 enum(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">男</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">女</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">) not NULL;//重建,枚举类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">两个字段(外键)联合约束: 索引类型选用 唯一索引unique</span></span>
<span class="line"><span style="color:#C3E88D;">ALTER TABLE \`表名\` ADD unique(用户号,职业号) 给一个表建唯一约束    </span></span>
<span class="line"><span style="color:#C3E88D;">    用户号 职业号</span></span>
<span class="line"><span style="color:#C3E88D;">       1 2</span></span>
<span class="line"><span style="color:#C3E88D;">       1 2</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">触发器:在此表[更新]之前(Before) ,运行定义的IF语句</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">注意： mysql不支持check约束，但可以使用check约束，而没有任何效果</span></span>
<span class="line"><span style="color:#C3E88D;">解决方案:用Before触发器,在更新前用if检查,不符合条件就设回原值 </span></span>
<span class="line"><span style="color:#C3E88D;">CREATE TRIGGER TEST BEFORE INSERT ON TB1</span></span>
<span class="line"><span style="color:#C3E88D;">FOR EACH NOW</span></span>
<span class="line"><span style="color:#C3E88D;">BEGIN</span></span>
<span class="line"><span style="color:#C3E88D;">    IF TB2.A &lt; 0 THEN</span></span>
<span class="line"><span style="color:#C3E88D;">        SET TB2.A=0;</span></span>
<span class="line"><span style="color:#C3E88D;">    END IF;</span></span>
<span class="line"><span style="color:#C3E88D;">END</span></span></code></pre></div>`,1),e=[o];function C(c,t,r,y,D,A){return n(),a("div",null,e)}const E=s(p,[["render",C]]);export{i as __pageData,E as default};
