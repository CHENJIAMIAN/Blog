

```javascript
使用Node.js V16+版本的话，启用ES6 import的支持很简单，正如上面错误中的提示那样，只需要在package.json里添加下面第二行："type" : "module",
不用再加–experimental-modules参数来启用了, /从错误信息来看，在不做代码改动的情况下，我们是没法再用require的,  改成.cjs才可以, "type" : "module"适合比较新的项目/
v16.x/package.json 
    "main"指定 CommonJS 入口点 //这使得 Node.js 能够运行 CommonJS 入口点，
    "module"指定 ES 模块入口点 //而构建工具（如webpack）使用 ES 模块入口点
    /Node.js 忽略顶级"module"字段。/

better-npm-run -> 被cross-env替代

node使用使用 babel-node CLI命令，来运行含有 import/export 语法的 js 代码,它不用单独安装，而是随babel-cli一起安装 
    Babel 6 中的babel-node命令是babel-cli包的一部分。
    Babel 7 中，这个命令已经被拆分成它自己的@babel/node包    
```

## 概念

```javascript
OpenAPI规范（以前称为Swagger规范）    
    v2叫做：Swaggerv2
    v3叫做：OpenAPIv3
API规范可以用YAML或JSON编写，
    云上(swaggerhub)可以直接把编写的文件编译成可访问的API
        //还可以导出js客户端sdk，它用superagent（类似axios）封装好了所有的请求，直接可用，就不用自己写前端了。eg: returnData=apiInstance.getUsers(opts, callback);
    本地也可以用swagger-routes-express库直接把编写的文件编译成可访问的API


FAT //工厂验收测试
UAT //User Acceptance Testing 用户验收测试, Beta测试
Browserslist  //是一个前端项目配置工具，功能是在前端工具之间共享目标环境的浏览器信息。
    //被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。
Jest //单元测试, 开箱即用，无需配置
    //默认测 tests/unit或__tests__目录下 , 的 js|jsx|ts|tsx文件
    //调试方法: node --inspect-brk ./node_modules/@vue/cli-service/bin/vue-cli-service.js test:unit --runInBand
Mocha //单元测试, (配合 mocha-webpack) /vue-cli-service test:unit/通过 mocha-webpack + chai 运行单元测试
    //默认测 tests/unit目录下,  的 ts|js文件
    //注意，测试是在Node.js内运行的，并使用JSDOM模拟了浏览器环境。    
Cypress //来E2E测试（模拟用户的操作去测试） //vue-cli-service test:e2e使用运行e2e测试cypress run

Mock//模拟后台接口 vue.config.js的devServer.before:require('./mock/mock-server.js') -> mock/index.js -> mock/目录下的各种模拟

vue-cli-service lint //没有装eslint则默认使用tslint//if (!api.hasPlugin('eslint'))  require('./lib/tslint')
    vue add @vue/typescript//则默认TSLint
    vue add @vue/eslint//则是用的eslint

EditorConfig //可以帮助开发者在不同的编辑器和IDE 之间定义和维护一致的代码风格
Plop//根据模板生成文件,就不用自己新建了,npm run new-> "new": "plop" -> ./plopfile.js -> ./plop-templates/模板文件目录
Backbone//一种流行的JavaScript库，使通过提供模型，集合和视图来构建Web应用程序的结构。Aurelia是类似库

JSON Web令牌（JWT）//eg:用'0e4253ef-5e4f-4d62-8eeb-c80e36a68c8a'给A用户生成eyJhbGciOiJIUzI1Ni...U0NzcwOTg2NX0.ciS4MqQxxx8eCf2zX

SOLID原则
    1.单一责任//对象做一件事，做好,就行了        
    2.开闭原则//一旦为一个类设计了一个接口，则该接口随时间的变化应该通过继承而不是直接修改该接口来实现
    3.里氏替换原则//使用泛型时谨记,举个不满足的加深理解：基类—人，有个方法—生娃。子类有超人，机器人，蜘蛛人。
                 //看似都具有人的基本特征，但是其中机器人让他生娃，是无法做到的，所以不满足里氏替换
    4.接口隔离//接口做一件事，做好,就行了        
    5.依赖倒置//我们应该依靠在抽象（或接口）上，而不是在具体对象的实例上
```
## VsCode调试配置：launch.json
```javascript
"env": {
        "DEBUG": "users:*", //node环境变量
        "PORT": "3333",
        "SEQUE1LIZE_CONNECT": "sequelize-sqlite.yaml",
    },
"runtimeArgs": ["--experimental-modules"],//node的运行参数 
"args": [ "serve" ]//js的运行参数     
```
## 命令
```javascript
node-gyp//使用C或C ++编译器编译以构建相应的  .node 文件（该.node扩展名用于二进制本机代码模块）。
    //libxslt 和  libxmljs 模块是同名C / C ++库的包装
node --v8-options //Node.js是在V8之上构建的；它有自己的options，主要集中在字节码编译或垃圾回收和堆算法的细节上。
util.promisify //我们可以转换任何面向回调的函数，使其返回Promise
process.argv[2] //控制台输入的第二个参数
.mjs //扩展名为Node.js的ES6模块//node --experimental-modules simpledemo.mjs 
EventEmitter //自带的,默认require('events')作为它
    //订阅emitter.on("event1",function(message){ console.log(message);})
    //发布emitter.emit("event1","I'm message");    

cross-env库 //在Windows cmd.exe命令行中设置环境变量
Internet邮件扩展:MIME//MIME类型:multipart/form-data
--max_old_space_size 5000 //解决服务进程内存不足的问题
nodemon index.js //调试必备,支持热更新
```
## 变量
```javascript
全局对象module://这些对象在所有模块中均可用。以下变量似乎是全局变量，但不是全局变量。它们仅存在于模块范围内，请参阅 模块系统文档：
    __dirname//包含当前正在执行的文件的目录的绝对路径
        console.log(__dirname);// Prints: /Users/mjr
        console.log(path.dirname(__filename));// Prints: /Users/mjr
    __filename
        console.log(__filename);// Prints: /Users/mjr/example.js
        console.log(__dirname);// Prints: /Users/mjr
    exports//module.exports也可以通过exports模块全局访问
    module//module实际上不是全局的，而是每个模块的局部
        module.exports.hello = true; // Exported from require of module
   require()//用于导入模块JSON，和本地文件,会把代码写的路径转为运行时的路径如:require("static/assets/img/admin.png")
   


process    
    process.env//所有环境变量
    process.cwd() 方法返回Node.js 进程的当前工作目录
    
全局对象global//类似于客户端 JavaScript 运行环境中的 window。

全局函数
    setInterval(callback, millisecond)
    clearInterval(timer)
    setTimeout(callback, millisecond)
    clearTimeout(timer)

Node 调试
    最方便也是最简单的调试：console.log()
    Node 原生的调试//网址：https://nodejs.org/api/debugger.html    
    第三方模块提供的调试工具
        $ npm install node-inspector –g   //方式一
        $ npm install devtool -g          //方式二
    开发工具的调试 Visual Studio Code

模块化结构
    1.Node 实现 CommonJS 规范，所以可以使用模块化的方式组织代码结构。    Node 采用的模块化结构是按照 CommonJS 规范。    
        //模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件。
        exports = function //❌ 把exports等同module.exports给覆盖掉了
        module.exports = function //✔
        CommonJS模块加载ES6模块 2种方法：
            1.1.动态导入 import() 异步加载
            1.2.@std/esm 提供了一项require() 异步加载
    2.Node.js 10对ES2015模块支持。可通过设置命令行标志来使用
        import'./foo?search';//为了安全，Node.js接收且仅接受file:URL, 所以[ :，?，#，% ]都是有效的
        --harmony-import-meta 启用 import.meta.url 代替 CommonJS 规范的 __dirname
            const __dirname = path.dirname(new URL(import.meta.url/*file:///../app.mjs*/).pathname);

常用内置模块    
    child_process：新建子进程。
        
    util：提供一系列实用小工具。
        util.inspect //功能是一种以易于阅读的方式呈现对象的有用方法
    http：提供 HTTP 服务器功能。
        const server = http.createServer();
        //处理请求
        server.on('request', (req, res) => {//req, res都是一个流
                    var requrl = url.parse(req.url, true);
                    if (requrl.pathname === '/') {
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.end(html);//返回内容
                    }
            })
        server.listen(8124);
        //发送请求
        var req = http.request({headerObj}, 
                                res => {res.on('data', chunk => { console.log(`打印响应内容 BODY: ${chunk}`);});
                              });
            req.end();
    url：用于解析 URL。
    querystring：解析 URL 中的查询字符串。
    crypto：提供加密和解密功能。

文件系统操作相关模块
    fs：基础的文件操作 API //fs-extra更改为返回Promise而不是回调函数
        fs.readdirSync
        fs.statSync(loc).isDirectory() | isFile()
        dirList = fs.readdirSync(target)
        fs.unlink 删除文件
        fs-extra（第三方）：https://www.npmjs.com/package/fs-extra
        用流复制文件:
            const img2 = fs.createWriteStream('./img2.png')//只是声明
            const img1 = fs.createReadStream('./img1.png').pipe(ws)//复制到声明
    Buffer：//一个用于处理二进制数据的缓冲区对象
    path//：提供和路径相关的操作 API
        path.join('/foo', 'bar', 'baz/asdf','quux');//    '\\foo\\bar\\baz\\asdf\\quux'
        path.join('/foo', 'bar', 'baz/asdf', 'quux', '..','..');//    '\\foo\\bar\\baz' ..表示上一级目录 两次..就是上上一级
        path.resolve() //将返回当前工作目录的绝对路径
        path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');//'C:\\Users\\123\\wwwroot\\static_files\\gif\\image.gif'
        
    readline：用于读取大文本文件，一行一行读

    
技巧:
    const req = require.context(路径,is递归,后缀匹配规则)
    req.keys()//返回路径下所有文件名
```
## express服务器库：  
```javascript
用户控制 1个express服务器
页面内容 1个express服务器:
var app = express(); 
    模板：
        路径映射:
        <script src="/assets/vendor/jquery/jquery.min.js"></script> //   /assets/vendor/jquery 映射到 node_modules/jquery
        app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery'))); 
    中间件(拦截处理):
        app.use(/*[可选匹配url]:'/user/profile/:id'*/,function(req, res, next) {
            req, res //<==> Node.js HTTP的request(WritableStream)和response(EventEmitter)            
                :id //值将落入req.params.id
                res.send({  n: req.params.n,     result: val   }); //返回JSON
            next是回调函数，next(new Error('Not found'));则传给带有err参数的中间件, 否则调用next(data)传数据给下一个中间件
            /如果既不调用next也不res.send调用，则请求永远不会得到响应/
         });  
        app.get  匹配GET方法
        app.post 匹配POST方法
        var router = express.Router(); //router等同app
            router.get('/', function(req, res, next) { })//但它的'/'如果放在user.js就相当于'/users'
        //错误处理:  
            app.use(function(err, req, res, next) { //带有err参数的中间件
              res.status(err.status || 500); 
              res.render('error'/*模板名，对应error.hbs*/, {message: err.message, error: {}}/*模板body里可取到的值*/); 
            });   
        passport(国外的验证登录中间件)
        Socket.IO(实时):   
            服务器:
                const io = socketio(server); 
                io.use(passportSocketIo.authorize({ 
                //事件通过路由变动知道实时信息改变后,让Socket.IO通知所有浏览器
                io.of('/home')/*限制作用范围*/.emit('notetitles', { notelist });  
            浏览器网页:
                 var socket = io('/home'); 
                 socket.on('notetitles', function(data) { var notelist = data.notelist;}); 
    数据库:
        普通:
            LevelUP//这是Google开发的LevelDB引擎的Node.js版, 不支持从多个实例同时访问数据库!!
            SQLite3//的主要优点是它不需要服务器；它是一个独立的，无需设置的SQL数据库。
                创建: $ sqlite3 dataBase1.sqlite3 --init beExecute.sql //执行sql文件beExecute.sql创建表到dataBase1数据库
                使用: db = new sqlite3.Database(dataBase1.sqlite3, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,err => { });
                执行: db.run(sql,替换值,err=>{}})
                      db.get(sql, [替换值], (err,row) => {})
                      db.all  函数检索结果集的所有行
            
        对象关系映射（ORM）(需要先安装数据库): //DB沦为数据服务
            Mongoose: 是MongoDB（http://mongoosejs.com/）上流行的ORM  
                 Schema === (模型/表结构/数据结构)
                 Collection类型 === 整个表
                     Model === 整个表的一部分 //哪一部分? 由Schema约束
                 Document类型 === 一行/一条数据 
                     new Model === 表中的具体一行
                 Field === 列 //Embedded Documents === 表连接

                 
                 populate() 可以连表查询，即在另外的集合中引用其文档。可以自动替换 document 中的指定字段，替换内容从其他 collection 中获取。
                     通过virtual查询出来的数据，如果不对结果进行操作，那么返回到前端的数据就是"_doc", 但是如果要对查询的结果进行操作，此时操作的数据不是"_doc"， 
                     而是整个对象, 因此需要过滤一次(const docs = results.map(x => x._doc))
                 aggregate聚合管道可以对集合中的文档进行变换和组合,如多表关联查询、数据的统计
                 Getters与 Setters 修饰符,通过 set 修饰符在增加数据的时候对数据进行格式化
                 
                 mongoose.Schema({   name: { type: String, trim: true }, 
                                     age: Number, 
                                     status: {   type: Number, default: 1                 
                                                 unique: true //唯一索引 index: true//普通索引
                                                 min: [6, 'Too few eggs'],//max: 12 , required: [true, 'Why no bacon?'], enum: ['Coffee', 'Tea'],
                                                 required: function() { return this.status > 3; },
                                                 validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); }, // 自定义的验证器，如果通过验证返回 true，没有通过则返回 false 
                                                 message: '{VALUE} is not a valid phone number!' },
                                             }
                                  })
                                 
            Sequelize:
                创建:new Sequelize(params.dbname, params.username, params.password
                            , jsyaml.safeLoad(await fs.readFile('config_file.yaml', 'utf8'), 'utf8').params)
                    .define('Note', { notekey: { type: Sequelize.STRING,primaryKey: true, unique: true},title: Sequelize.STRING,body: Sequelize.TEXT}); 
                    .find({ where: { notekey: key } }).notekey 
                         或  .findAll({ attributes: ['notekey']}).map(note => note.notekey)
                         或  .create({username: username})
                    .close();
                配置:config_file.yaml:
                        dbname: notes 
                        username: .. user name 
                        password: .. password 
                        params: 
                            host: localhost 
                            port: 3306 
                            dialect: mysql  #电脑上安装了mysql //也可以是SQLite3
     身份验证:  
         express-session中间件
         使用Restify，实现REST接口 
                  
     部署:
         linux方式：
             PM2：代替node //它针对Node.js流程进行了优化。它捆绑流程管理并监视到一个应用程序   
                 pm2 start configfile.json //来启动服务
         docker方式（更简单）：
             容器间通信：通过docker网桥
             云托管:
     安全:
         certbot: //容器的目的是管理“让我们加密SSL”证书
         Helmet: //用于设置各种安全性 标头
         express-force-ssl: //http重定向到https
         csurf //解决跨站请求伪造
         sql-injection
     测试：
         Puppeteer //前端无头浏览器UI测试
         Mocha单元测试框架和Chai断言库              
```

## koa, web框架
//Koa 是一个非常优秀的框架，然而对于企业级应用来说，它还比较基础。
```javascript
//Koa 的中间件和 Express 不同，Koa 选择了洋葱圈模型,所有的请求经过一个中间件的时候都会执行两次
//对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑
//和 Express 只有 Request 和 Response 两个对象不同，Koa 增加了一个 Context 的对象
    const Koa = require('koa');
    const app = new Koa();
    
    const main = ctx => {
      ctx.response.body = 'Hello World'; //上下文，包括HTTP请求和HTTP回复
    };
    
    app.use(main);
    app.listen(3000);  
    
```

## egg.js
```javascript
egg.js
    Express 适合个人项目,但框架本身缺少约定，标准的 MVC 模型会有各种千奇百怪的写法。
    Egg     适合团队项目,按照约定进行开发，奉行『约定优于配置』，团队协作成本低
        //Egg 继承于 Koa
        
worker agent 进程 //worker是进程1,2,3,4是集群 agent是特殊用来处理整个集群的公共功能如记录日志
```

## 多线程
```javascript
    var numCPUs = os.cpus().length;
    var cluster = require('cluster');
    cluster.on('exit', (worker, code, signal) => {
        console.log('工作进程 %d 关闭 (%s). 重启中...',  worker.process.pid, signal || code);
    });
//  worker = cluster.fork() //根据numCPUs去fork多个线程
```


## PNPM
```JS
pnpm i --shamefully-hoist 出现奇怪的问题时执行它, //创建一个平面node_modules结构，类似于npm or yarn。 警告：这是非常不鼓励的。
```

## NPM
```javascript
使用淘宝镜像:
    1.目录下放.npmrc文件,每次npm命令会自动读取它的配置//可设置淘宝镜像等
        // registry=https://registry.npmmirror.com
    w
    2.持久使用：            
            npm config set registry https://registry.npmmirror.com
            npm config set registry https://registry.npmjs.org//恢复默认
            
/不要使用cnpm，因为cnpm，是不支持依赖版本锁定的/
    cnpm i xxx@xxx不会更新到package-lock.json中去。
    cnpm i不受package-lock.json影响，只会根据package.json进行下载

当我们使用最新的Node运行‘npm instal --save xxx'，的时候，他会优先考虑使用插入符号（^）而不是波浪符号（~）了
    https://docs.npmjs.com/cli/v7/using-npm/config#save-prefix 有说到
    版本号详解(^和~区别)
    ^限制第一位3.3.4 // >=3.3.4 <4.0.0
    ~限制第二位1.15.2 // >=1.15.2 <1.16.0     


nvm		node version manager 用来管理node版本,切换node版本 ,nvm install v12.14.1  nvm use v12.14.1


npm config ls 	#查看默认全局路径等

npm i 前删除package-locked.json可以避免npm i后还找不到库的错误

npm cache clean -f //npm清理缓存  清的是 ~/.npm/_cacache 文件夹中的数据

npm config list -l //列出详细配置     

node(主要读取main入口) 和 npm 都使用这个文件
    
dependencies字段，devDependencies字段
    devDependencies是仅在开发期间需要的模块，而dependencies是在运行时也需要的模块
    如果我们只是单纯的做项目，那么我们可简单地认为生产环境和开发环境做为一种友善的提示，实质没有什么区别；
    /但是，如果在发布npm包的时候，两种环境安装方式是有很大区别的！！！/
        'npm i 包名',只有dependencies下会被安装
        平时项目'npm i',则都会被安装
    {
      "devDependencies": {
        "karma-browserify": "~5.0.1"
      }
    }
    "vue3": "npm:vue@3", //别名

peerDependencies
    有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖A模块和B模块的1.0版，而A模块本身又依赖B模块的2.0版。
    大多数情况下，这不构成问题，B模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。
    最典型的场景就是插件，比如A模块是B模块的插件。用户安装的B模块是1.0版本，但是A插件只能和2.0版本的B模块一起使用。这时，用户要是将1.0版本的B的实例传给A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果A和B一起安装，那么B必须是2.0模块。
    peerDependencies字段，就是用来供插件指定其所需要的主工具的版本。
    {
      "name": "chai-as-promised",
      "peerDependencies": {
        "chai": "1.x"
      }
    }
    上面代码指定，安装chai-as-promised模块时，主程序chai必须一起安装，而且chai的版本必须是1.x。如果你的项目指定的依赖是chai的2.0版本，就会报错。
    注意，从npm 3.0版开始，peerDependencies不再会默认安装了。
```
