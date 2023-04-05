

```python
WhiteNoise 通过几行配置，提供自己的静态文件,自动解析路径
    {% load static %}
    <img src="{% static "images/hi.jpg" %}" alt="Hi!" /> #而不是<img src="/static/images/hi.jpg" alt="Hi!" />   
```



```javascript
pyqigs
    //首先
    from qgis import *
    
    //添加图层
        QgsProject.instance().addMapLayer(l)
        
    //l是指定投影后的图层
    l=processing.run("native:assignprojection", {'INPUT':'D:/Desktop/中山项目数据/三乡测绘-实测总图mygeodata 转为shp了/---line_2000_空间校正.shp','CRS':QgsCoordinateReferenceSystem('EPSG:4490'),'OUTPUT':'TEMPORARY_OUTPUT'})
    QgsProject.instance().addMapLayer(l['OUTPUT'])
    
    my_dialog = processing.createAlgorithmDialog("native:buffer", {
                  'INPUT': '/data/lines.shp',
                  'DISTANCE': 100.0,
                  'SEGMENTS': 10,
                  'DISSOLVE': True,
                  'END_CAP_STYLE': 0,
                  'JOIN_STYLE': 0,
                  'MITER_LIMIT': 10,
                  'OUTPUT': '/data/buffers.shp'})
```

1. 解决Python中字符串和数字拼接报错的方法

```python
print('A'+str(123))

print(None is '')                    #False
print( len(F()) is F().__len__() )   #Ture
#若还定义了__bool__方法则len方法不被执行

```

1. 用字典代替switch语句

```python
def func0():
  return 'i am func0';
def func1():
  return 'i am func1';
def func2():
  return 'i am func2';
def noInDict():
  return 'i am noInDict';

print({0:func0,  1:func1,   2:func2}.get(111,noInDict) ())
#output: i am noInDict    
```



1. 显示语句的执行时间：timeit 语句

```python
import timeit
print(timeit.timeit(str(123)))
#output: 0.019927684166420125
```

1. 提高元组的可读性（用namedtuple来代替元组）

```python
from collections import namedtuple
Student =namedtuple('Student',['name','age','sex','email'])		# namedtuple('名称', [属性list]):#
print(Student(name='Jim',age=18,sex='male',email='jim@163.com').email)
#ouput: jim@163.com
```

1. 统计序列元素出现次数

```python
from collections import Counter
print(Counter(['a','b','b','c','c','c','d','d','d','d']).most_common(2))					
#统计出现频次最高的前2个元素
#output: [('d', 4), ('c', 3)]
```



```python
#from __future__ 为了在老版本的Python中兼顾新特性的一种方法
#python 2.7中：>>>23/6　　>>>3  from __future__ import division 之后：  
from __future__ import division 
print(23/6)
#输出:3.8333333333333335


print(dict.fromkeys(('Google', 'Runoob', 'Taobao'),'111'))
#output: {'Taobao': '111', 'Google': '111', 'Runoob': '111'}

#is:比较是否相等(相同对象)
print('1' is 1)
#output: False

# x>y ? x:y	在python里写为:
print((11 if 1<2 else 22))
#output: 11

#'a'的内存地址：			
print(id('a'))	
#输出 2384907633416

#a的十六进制内存地址:	
print(hex(id('a')))	
#输出'0x22b47928308'

#2的5次方: 
print(2**5)
#输出32

#不能用a++ ,a--等，只能用+=
a=1
a+=1
print(a)
#输出 2

#查看ASCII码:			
print(ord('a')) 		
#输出 97
```

