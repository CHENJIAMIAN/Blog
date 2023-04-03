```typescript
Django是一个开放源代码的Web应用框架，由Python写成。采用了MTV的框架模式()模型M，模板T和视图V), Flask功能没Django多，但是够用了
    开始一个项目:
    python manage.py makemigrations #在Application的models.py中建立数据库模型
    python manage.py migrat e#Django默认表创建
    python manage.py runserver dev.paas.bk-uat.bkty.xyz:8000 #启动服务
    

//不断地监听文件的变化
watched_files (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:267)
snapshot_files (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:363)
tick (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:347)
run_loop (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:307)
run (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:301)
start_django (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:583)
run_with_reloader (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\utils\autoreload.py:598)
run (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\commands\runserver.py:102)
handle (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\commands\runserver.py:95)
execute (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\base.py:364)
execute (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\commands\runserver.py:60)
run_from_argv (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\base.py:323)
execute (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\__init__.py:375)
execute_from_command_line (d:\Desktop\cloud-cmp-backend\.venv\Lib\site-packages\django\core\management\__init__.py:381)
<module> (d:\Desktop\cloud-cmp-backend\manage.py:10)
vscode安装python扩展,按F5选Django调试
d: 
    && cd d:\Desktop\cloud-cmp-backend 
        && cmd /C "d:\Desktop\cloud-cmp-backend\.venv\Scripts\python.exe 
            c:\Users\cjm\.vscode\extensions\ms-python.python-2022.4.1\pythonFiles\lib\python\debugpy\launcher 9235 
                -- D:\Desktop\cloud-cmp-backend\manage.py runserver "
```

```javascript
一个最小的 Flask 应用:
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def hello_world():
        return 'Hello World!'
    
    if __name__ == '__main__':
        app.run()
```



---

```python
pip install flask
app指的是Flask对象

pip install virtualenv			 #虚拟环境，用法：创建，激活，关闭
apt-get install supervisor 		#进程管理工具，用法：添加程序，用supervisorctl进行控制
Fabric:		通过SSH将应用部署到GitHub，并通知服务器电脑去拉取，用于快速部署
python hello.py runserver --host 127.0.0.1 #运行flask服务器
CGI(Common Gateway Interface)：让浏览器把.py解析成网页（WSGI类似.ws是webserver）
flask-rest：from flask.ext.restful import reqparse, Resource
```

```python
RESTful-API:
    GET (SELECT)
    POST (CREATE)   //但是在HTTP规范中POST是非等幂的,多次调用会产生不同的结果,比如:创建一个用户,由于网络原因或是其他原因多创建了几次,那么将会有多个用户被创建
    PUT (UPDATE)	#更新post的东西,要传所有键,传缺了会丢失属性的
    PATCH (UPDATE局部)	#只需传要改变的属性, 并且返回改变后的属性 PATCH一般是用来局部更新资源的,假设我们有一个UserInfo，里面有userId， userName， userGender等10个字段。可你的编辑功能因为需求，在某个特别的页面里只能修改userName，这时候的更新怎么做
    DELETE
```

```python
pip install flask-script			#用一行命令来执行一个类中的方法
pip install pymongo==2.8 		#Mongo-ORM flask-mongoengin
pip install mysql-python		#数据库MySQL
pip install flask-sqlalchemy		#MySQL-ORM flask-sqlalchemy
flask-wtf 					#表单验证
```



---

```javascript
#获取页面表单内容
from flask import  request
request.form.get('username')		#request.form['username']
```

```javascript
#图片链接
from flask import url_for
<img src="{{url_for('static',filename='add.png')}}">			 //static目录下的add.png图片
```



```javascript
#404页面
@app.errorhandler(404)def not_found(e):
        return render_template("404.html")
```



```javascript
#错误提示
from flask import  flash, abort
flash("嘎嘎嘎")		#<h2>{{ get_flashed_messages()  [0]  }}</h2>	<!--打印：嘎嘎嘎-->
```



```javascript
#模板渲染
from flask import  render_template
def query_user(user_id):
    return render_template("user_id.html",user=User(1, 'jikexueyuan'))
```



---

## 模板继承

```html
#base.html
<body>
<div>Header 极客学院</div>
{% block content %}
{% endblock %}
<div>Footer 极客学院</div>
</body>
```

<!--继承base.html作为模板--!>

```javascript
{% extends "base.html" %} 
{% block content %}
    <h2>这是第一页</h2>
{% endblock %}
```



---

## flask-blueprint 模块化

```python
#user.py
from flask import Blueprint
user=Blueprint('user',__name__)                 #导出
@user.route('/<int:userid>')	
def showUser(userid)
	return 'hello,'+userid
```



```python
#main.py
from user import *                              #使用
app.register_blueprint(user,url_prefix='/user')	#这样访问/user/gagaga就打印出了hello,gagaga
```

