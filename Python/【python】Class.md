## 定义与调用

```python
class C():
  a='a'
  def F(self):	#self是必须的！！！！！！！self相当于其他语言的this,改为this也是可以的
    print('i am F',self.a)
#调用
C().F()             #输出i am F a
#给类添加变量
C.newValue='value'
```

## 构造函数		私有方法

```python
def __init__(self):		#构造函数
def __privateMethod():	#私有方法
```

继承

```python
class C(parentClass):
super(C,c[C的实例]).parentMethod(args)	#调用父类的方法
```

类变量 	实例变量	

```python
class C():
	classValue = '类变量'
    #构造函数
	def __init__(self,num):
		self.classValue='实例变量'+str(num)
		print(C.classValue)                     		#'类变量'	
		print(self.classValue) 					#'实例变量777'
		
		self.__class__.classValue='修改后的类变量'	        # self.__class__相当于C
		print(C.classValue)	                		#'修改后的类变量'
C('777')
```

类方法(静态方法)

```python
class C():
	@classmethod
	def Myclassmethod(self):	
		print('静态方法')
C.Myclassmethod()
```

## 函数调用		lambda

```python
class C():  	   
	def F_withSelf(self,num1,num2):
	   return (num1+num2)	   
	#等同于
	
	lambdaF=lambda x,y:x+y		
	#等同于 
	def F_noSelf(num1,num2):
	   return (num1+num2)
	   
	#等同于
	@staticmethod
	def staticF(num1,num2):
	   return (num1+num2)
   
	
print(C.staticF(1,2),C().staticF(1,2),C.F_noSelf(1,2),C.lambdaF(1,2))	
#print(C().F_noSelf(1,2))#出错
#因为C().F_noSelf(1,2)是语法糖，解释器把它翻译为 C.F_noSelf(C(),1,2)
#于是就出错了"F_noSelf() takes 2 positional arguments but 3 were given"
#换成C.F_noSelf(1,2)就不会出错
print(C().F_withSelf(1,2))	#静态方法
```



---

# 类

```python
class C():	
	def F_noSelf(arg):#不能被实例调用,只能被自己调用
		return arg	
	print(F_noSelf(1))	
	
	def F_withSelf(Self,arg):#可以被实例调用,也可以被自己调用
		return arg	
	print(F_withSelf('argToSelf',1))

print(C.F_noSelf(1))
print(C().F_withSelf(1))
```



---

## 要使函数的局部变量信息在第n次调用依然可以保存下来

- 闭包写法

- 闭包=内层函数+外层函数里的公共变量(参数)

- #作用:保存函数的状态信息，使函数的局部变量信息在第n次调用依然可以保存下来

```python
class C():
	def F(base):
		def sum(num):
			nonlocal base	#声明为非局部变量,相当与全局变量
			new=base+num
			base=new
			return new	#返回f+sum
		return sum

	sum=F(10)
	print(sum(10))
	print(sum(10))
	print(sum(10))
#输出
#20
#30
#40
```

- 非闭包写法

- #相比于闭包写法的缺点,base可以被其他函数修改

```python
class C():
	global base
	base=0	#相比于闭包写法的缺点,base可以被其他函数修改
	def sum(num):
		global base		#声明为全局变量
		new=base+num
		base=new
		return new		#返回f+sub_f
	base=10
	print(sum(10))
	print(sum(10))
	print(sum(10))
#输出
#20
#30
#40
```



---

## 装饰器(相当于AOP,也是闭包)

```python
class C():
	def InjectContent(f):
		print('在被注入函数被执行 前 插入的内容')
		f()
		print('在被注入函数被执行 后 插入的内容')

	@InjectContent
	def fun_ToBe_Injected():
		print('被注入的函数')

	fun_ToBe_Injected
#输出
#在被注入函数被执行 前 插入的内容
#被注入的函数
#在被注入函数被执行 后 插入的内容
```



---

## 多返回值的函数定义与获取

```python
class C():	
	def F(arg1,arg2):
		return arg1,arg2	#返回的其实是个元组	

	return1,return2=F('1','2');
	print(F('1','2')[0],F('1','2')[1])
	print(return1,return2)
 #输出
  #1 2
 #1 2
```



---

