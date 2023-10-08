```python
'官方宣布，2020 年开始停止 Python 2 的更新'

框架 安装 使用		#pip install / pip uninstall / pip list
运行python程序		#python hello.py 可选参数

python -m venv .venv #设置用venv库生成虚拟环境,目录为.venv
.venv/Scripts/Activate #进入虚拟环境的命令行
pip3 install -r requirements.txt -i https://pypi.douban.com/simple/ #指定豆瓣源安装依赖,遇到一两个库安装不上就先注释掉,等会单独安装


filename.py(模块)							#里面有类有方法
__init__.py								#在所在 	包(文件夹) 被导入时被自动执行
    __init__.py中的	__all__=['a模块']		#只有	 包(文件夹)下的 ['a模块'] 能够被引用
缩进:		是Python语法的一部分
空行：		表示一段新的代码的开始，空行并不是Python语法的一部分。
用True	不用true，用False	不用false

__内置__ 
    __str__:
        当使用print输出对象的时候，只要自己定义了__str__(self)方法，那么就会打印从在这个方法中return的字符串，当做这个对象的描写
__私有


python最具特色的就是使用缩进来表示代码块，不需要使用大括号({})。
    缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。实例如下：

        def 函数():
            if True:
            	print ("True")
            else:
            	print ("False")
如何正确理解：
    test.py中：	if __name__ == '__main__' ：	代码块
        test 被调用 (import test.py）		（__name__ == 'test')		代码块不被运行
        test 自调用 (直接运行test.py）		（__name__ == '__main__')	代码块将被运行
1/2=0.5 
    1//2=0		#  //是整除的意思
0b10等于2		#0b二进制（0o八进制，0x十六进制）



字典 { key : value }				#{'1':'i am 1'}['1'] 		#'i am 1'
列表[] (放什么都可以)			#[{'1':'i am 1'},1][0]		#{'1': 'i am 1'}
元组() (与列表类似)				#区别：元组(tuple)的项一旦定义不可改变，避免被修改
     eg:  ({'1':'i am 1'},1)[0]=1		#TypeError: 'tuple' object does not support item assignment
集合{}（无序，不重复）

    差集 {1,2,3} - {2}				#{1, 3}
    交集 {1,2,3} & {2}			#{2}
    并集 {1,2,3} | {2,3,4}			#{1, 2, 3, 4}
    
def fun(x,y) 	#可以这样调用fun(y=3,x=2)
from . import 		#一个点代表上一层文件夹

#1   if 语句
if ( a and b ):             #not( a and b )
    statement_block_1
elif ( a or b ):
    statement_block_2
else:
    statement_block_3

#2   Python3同一行显示多条语句: 
import sys; x = 'runoob'; sys.stdout.write(x + '\n') #用分号分割

#3  Python3 注释: 
"""
多行注释2
"""

#4  遍历for
for x in range(0,10,2)	#遍历0 2 4 6 8;range(开始，结束，间隔）
for x in range(10,0,-2)	#遍历10 8 6 4 2
a=[1,2,3,4,5,6,7,8] b=[0,len(a):2] 
print(b)                    #结果为1 3 5 7

#5   多行语句
total = item_one + \
        item_two + \
        item_three
      
#6  字符串用' ' 或" "			
'a'*3='aaa'
'abc'[-1]='c'	#[ ]可截取字符串， [-1]表示倒数第一位字符
’abcd'[1:3]='bcd'
print(r'\t')	#用r''表示''内部的字符串默认不转义,相当于C#的@“”
len('看看我的长度'); #6

pass #是空语句，是为了保持程序结构的完整性
```



---

