## 过滤列表数据

```python
def filterMethod(value):
	if value==0:
		return False
	else:
		return True

returnValue=filter(filterMethod, [1,2,0,3,4])		 #list(返回值)就为去0后的列表
print(list(returnValue))
#输出:[1, 2, 3, 4]
```

简化过滤列表数据		列表推导式（直接在列表里筛选）

```python
a=[1,2,3,4]
b=[i*i for i in a if i>1]  	#列表推导式（直接在列表里筛选）
#b=[1,4,9,16]
#各项再被for遍历被if判断，取出了大于1的
print(b)
#结果为:[4,9,16]
```

简化过滤字典数据

字典推导式（直接在字典里筛选）

```python
a={1:'a',   2:'b',    3:'c',    4:'d'}
b=[key 	for key,value in a.items() if key>1]			
#b={value:key	 for key,value in a.items()}可得到反转的字典
print(b)
#结果为:[2,3,4]
```

### 函数式编程(代替if else for等), 函数式编程的一个特点就是，允许把函数本身作为参数传入另一个函数，还允许返回一个函数

```python
#reduce用于连续运算,计算过程为(((1+2)+3)+4)+5
import functools
def add(x, y) :            # 两数相加
     return x + y 
print(functools.reduce(add, [1,2,3,4,5]))   # 计算列表和：1+2+3+4+5	15
print(functools.reduce(lambda x, y: x+y, [1,2,3,4,5]))  # 使用 lambda 匿名函数
```

枚举(不可变,不重复)

```python
from enum import Enum, unique
@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1 
    # Mon = 0 报错!
```

## Json

```python
import json
print(json.loads('{"age": 20, "score": 88, "name": "Bob"}'))
print(json.dumps(dict(name='Bob', age=20, score=88)))

#output:
#{'age': 20, 'name': 'Bob', 'score': 88}
#{"age": 20, "name": "Bob", "score": 88}
```



