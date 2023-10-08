```sql
mysql -u root -p --user=userauth  #登录

mysql -u root -p
root@localhost: RhtpXh,)-5B4
 
1、显示数据库列表。 
show databases; 
2、显示库中的数据表： 
use mysql;
show tables; 
3、显示数据表的结构： 
describe 表名; 
4、建库： 
create database 库名; 
5、建表： 
use 库名； 
create table 表名 (字段设定列表)； 
6、删库和删表: 
drop database 库名; 
drop table 表名； 
7、将表中记录清空： 
delete from 表名; 
8、显示表中的记录： 
select * from 表名
9.变量
set @varA = 3;
select @varA;

注意语句的结尾有个 ";" 
DROP DATABASE IF EXISTS sampledb;
CREATE DATABASE sampledb DEFAULT CHARACTER SET utf8;
USE sampledb;

ENGINE=InnoDB;//该类型表支持事务,默认是MyISAM引擎

source C:\sqlfile.sql //运行脚本

SELECT RAND()*2-1	//-1到0的随机数,原理:原区间（0，1）减1变成（-1,1)
floor()取整

UPDATE `gis_geo_server_layer` SET `server_id`=13 WHERE `id`=154;
UPDATE `表` SET `人数`=`人数`+1 WHERE `单位号`=5	//更新,人数=原来的人数+1
UPDATE `表` SET `人数`=1 FROM  表1JOIN 表2 ON 表1.ID=表2.ID WHERE `单号`=5   GROUP BY 列	HAVING 聚集函数//连接其他表更新,根据列分组
HAVING可以使用聚集函数,WHERE不可用      
DELETE FROM `表` WHERE 用户号=1
WHERE 性别=ANY(	)  性别是...  
WHERE 名字 LIKE '通配符'           

让MySQL自增长字段号从不连续变成连续的:删掉列,重新建列(不推荐,多表容易不同步)
ALTER TABLE `user` DROP 求职者编号;
ALTER TABLE `user` ADD 求职者编号 INT NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST;

解决多表自增id不连续,不同步:插入时用户号当前最大值+1(推荐)
INSERT INTO `普通用户表`(用户号,用户名,密码) VALUES(
(SELECT `aaa` FROM(SELECT MAX(用户号)+1 AS aaa FROM `普通用户表`)b)
,333,333);
解决了[Err] 1093 - You can't specify target table '普通用户表' for update in FROM clause
总结:取消自增,改为用int或BigInt，每次获取到最大，然后+1，对应字段的值。

谁是多方谁就放一个外键:	外键作用就是必须我有你才能有，我没有的你不能有

使用varchar，代替char，这是因为varchar会动态分配长度
char指定为20，即时你存储字符“1”，它依然是20的长度

外键类型
 No action方式如果子表中有匹配的记录,则不允许对父表对应候选键进行update/delete操作
 Restrict方式同no action, 都是立即检查外键约束




与一方同步用级联:一对多,多方多个外键;		外键的模式设为级联,就可与一方同步
只能是删除,更新同步,插入无法同步 	也就是我删你也删,我更新你也更新

性别男女的约束
ALTER TABLE `用户表`  DROP 性别;//删掉
ALTER TABLE `用户表` ADD 性别 enum('男','女') not NULL;//重建,枚举类型

两个字段(外键)联合约束: 索引类型选用 唯一索引unique
ALTER TABLE `表名` ADD unique(用户号,职业号) 给一个表建唯一约束    
    用户号 职业号
       1 2
       1 2


触发器:在此表[更新]之前(Before) ,运行定义的IF语句


注意： mysql不支持check约束，但可以使用check约束，而没有任何效果
解决方案:用Before触发器,在更新前用if检查,不符合条件就设回原值 
CREATE TRIGGER TEST BEFORE INSERT ON TB1
FOR EACH NOW
BEGIN
    IF TB2.A < 0 THEN
        SET TB2.A=0;
    END IF;
END
```



