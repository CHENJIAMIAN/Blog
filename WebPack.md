### 模块联邦    
```javascript
1.在入口文件搜索"webpack/sharing/consume/default/"即可看到共享的东西
2.在localhost:3002/remoteEntry.js 的"getSingletonVersion"打断点可以看到共享的react-dom库来自主APP的main.js, 是main.js之前存在__webpack_require__.S[scopeName]的
3.有shared就有__webpack_require__.S,没有就没有  

new ModuleFederationPlugin({
	  name: 'app2',
	  filename: 'remoteEntry.js',
	  exposes: {  './Widget': './src/Widget'},
	  shared: { //在shared里声明的了,才会使用主APP共享的库,没声明就用自己的(到时会是两个不同的实例)
		'react-dom': {
		  requiredVersion: require('./package.json').dependencies['react-dom'],
		  singleton: true, //不允许主APP的react版本是'16.14.0'而子APP是'16.12.0'
		},
	  },
})
    
模块读取方式优先级：
    两个字段可以定义包的入口点：“main”和“exports”//" exports"提供了"main"的现代替代方案， 
    /“exports”字段优先于 “main”/
      "exports": {
        "node": {//"node" - 匹配任何 Node.js 环境。可以是 CommonJS 或 ES 模块文件。
          "module": "./index.js",
          "require": "./index.cjs" 
        },
      }
    对于 Node.js，我们总是使用 CommonJs 版本并使用 ESM 包装器在 ESM 中公开命名导出

A应用引用了B应用, A应用设置了shared: { react: { singleton: true }, 'react-dom': { singleton: true } },  B应用也设置了shared: { react: { singleton: true }, 'react-dom': { singleton: true } }, 优先用哪个?
	用了B应用的.

```
### 性能
```javascript
性能(重点):  
    调试:  
        loader 用include缩小范围
        resolve.modules 指定当前目录下的node_modules,让webpack不要去上级目录找了
        resolve.extensions 省略后缀会增加webpack查询时间
    打包:
        css压缩,去冗余
        js去冗余TreeShaking：optimization.usedExports=true //通过 package.json 的 "sideEffects" 标记不treeShaking的非js后缀文件
        
    加thread-loader
    webpack 3 加入dll
    webpack 4 再使用 dll 收益并不大，HardSourceWebpackPlugin比它更优秀
    webpack 5 HardSourceWebpackPlugin已经默认加进去了    
```
### 热更新原理
```js
websocket->reloadApp->$emit('webpackHotUpdate')
->module.hot.check(true).then(function (updatedModules) {})
->hotCheck(先插入script,再调用插入的script更新了modules中对应的模块, 再调用一下该模块)
	从 现有的 cache 中 找到当前的 chunkId 对应的旧的数据信息，进行更新并执行当前最新的 chunk 代码，以便于更新 cache，
	接着执行对应的 hot.accept 代码来实现 render 操作
```

### 概念
```javascript
“类单页应用”, 如果系统过大，导致首屏加载缓慢，可以将系统拆分, 实现方式主要有两种：
	1.iframe嵌入  2.微前端合并类单页应用；

1.一切皆模块： 正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require(‘myJSfile.js’)亦可以require(‘myCSSfile.css’)。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。
2.按需加载： 传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。
3.文件管理：每个文件都是一个资源，可以用require/import导入js，每个入口文件会把自己所依赖(即require)的资源全部打包在一起，一个资源多次引用的话，只会打包一份，对于多个入口的情况，其实就是分别独立的执行单个入口情况，每个入口文件不相干(可用CommonsChunkPlugin优化)
4.打包原理：把所有依赖打包成一个bundle.js文件，通过代码分割成单元片段并按需加载。

"dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
"build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
    --progress  打印出编译进度的百分比值
    --hide-modules 隐藏关于模块的信息
    --open      自动打开浏览器
    --inline      模式下我们访问的URL不用发生变化
    --hot       指令启用热模块替换
    --config    指定配置文件//默认 webpack.config.js

__resourceQuery (webpack特有)
    导入路径传参, 当前模块的资源查询(resource query) 。如果进行了如下的 reqiure 调用，那么查询字符串(query string)在file.js 中可访问。
    require('file.js?test');
    file.js可以获取到
        __resourceQuery === '?test';

babel-eslint -> @babel/eslint-parser
```
### 输出文件
```javascript
vendor文件
    //webpack 中通常用vendor来命名我们项目中的第三方依赖库的一个合集,默认为整个node_modules文件夹打包而成

重点:
0.module(webpack里一切文件万物皆模块)
1.chunk(代码片段)
        eval('放一个chunk可以是编译后的.css或.js或.vue等') //多个模块会被合并成一个chunk
        1、你的项目入口（entry）//根据入口文件生成的chunk(js文件)
        2、通过import(/* webpackChunkName: "可以注明生成的名称" */) 方法动态引入的代码 //动态加载得文件webpack会将其拆分为一个chunk(js文件)
        3、通过splitChunks拆分出来的代码    //(js文件), splitChunks就算你什么配置都不做它也是生效的，源于webpack有一个默认配置
            //webpack将根据以下条件自动分割块：
                1可以共享新块，或者模块来自node_modules文件夹
                2新的块将大于30kb（在min + gz之前）
                3按需加载块时并行请求的最大数量将小于或等于5
                4初始页面加载时并行请求的最大数量将小于或等于3 // 当试图满足最后两个条件时，最好使用较大的块。 
2.bundle(.js文件)dist目录下webpack处理过的文件, 一般和 【chunk组】 是一对一的关系
     eg:main.js, main.js.map是一个名为main的chunk组, 两个bundle
    
  
(重点)
[hash:长度] 所有文件哈希值相同
[chunkhash] 根据入口生成哈希      
[contenthash] 内容改变才改变
     
  
构建完成dist目录下:
    以0-10+数字开头的 js 文件(如12.a4966396.js)，就是import()每个路由对应的组件构建出来的 bundle。
    只有用户访问对应的路由时，才会加载相应的 bundle，提高页面加载效率
```
### webpack.config.js
```javascript
//dev模式输出在内存中,看不到文件的   prod模式输出在目录中,可以看到文件
    sideEffects:false //开启treeshaking
    mode    可能的值有：none, development 或 production（默认）也可传参:--mode=production，我们可以判断该值来做不同的处理
            //development会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
                //启用 NamedChunksPlugin 和 NamedModulesPlugin。
            //production会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。
                //启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
    devtool 此选项控制是否生成，以及如何生成 source map//开发常用:'cheap-module-eval-source-map'
    devServer//尽管webpack提供了命令webpack --watch来动态监听文件的改变并实时打包，但文件多了打包速度会很慢，不能做到hot replace
            //npm install webpack-dev-server
            webpack-dev-server主要是启动了一个使用express的Http服务器。它的作用主要是用来服务资源文件（默认在当前目录下，可通过content-base指定）。
                此外这个Http服务器和client使用了websocket通讯协议，
            //原始文件作出改动后，会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，而是保存在内存中!!!!!!!!!        
                注意:webpack配置中的devSever配置项只对在命令行模式有效。
                注意:命令行模式下,webpack.config.js中一定要配置output.publicPath来指定编译后的包(bundle)的访问位置.
            {
                hotOnly:true //关闭浏览器自动刷新,js文件中配合module.hot判断去手动触发更新
            }
    entry   想让源文件加入到构建流程中去被 Webpack 控制, 一个入口生成一个chunk(js文件)
            [entryChunkName: string]//eg:[ app:'./src/app.js',    adminApp:'./src/adminApp.js']
                //entryChunkName会替换掉占位符[name]!
    output  自定义输出文件的位置和名称
            占位符,被对应的loader对应的插件解析
            chunkFilename:为异步加载的Chunk命名
            publicPath:浏览器打开的路径\相对路径
               [ name ] – 返回文件名称。
               [ ext ] – 返回扩展名。它适用于大多数可用的字段。ExtractTextPlugin是一个明显的例外。
               [ hash ] – 返回构建Hash。如果构建任何部分发生更改，则也会发生更改。
               [chunkhash:8] – 返回条目块特定的hash(8位)。为了使只有被修改了的文件的文件名hash值修改，您需要使用“ chunkhash”
    resolve resolve.alias//resolve是文件路径查找过程, alias用于import时简写模块的绝对路径 
            resolve.extensions//能够使用户在import时路径不带扩展名也可以识别
            
    module  想自定义解析和转换文件的策略//几个module形成一个chunk
            //loader 处理非JavaScript 和 JSON格式的资源，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中
            
    rules: [{    /loader转换各种格式的文件/
            test: /\.(css|less)$/,    //条件匹配,$表示以什么结尾,如果匹配就用 use 指定的 loader 处理该文件
            use: ["style-loader", "css-loader?参数1&参数2=值2", "less-loader"] // use里面先执行less-loader！！！！！！//可以分别给 Loader 传入参数
            
            'url-loader',//解析图片音视频字体等,包含所有file-loader的功能  options: {limit:2048/*小于则转base64*/}
            'css-loader'//处理.css, @import and url(), 只负责编译, 要配合'style-loader'插入到dom
                //原理:先转ast,再将a.css、b.css和c.css的样式内容以字符串的形式拼接在一起
            'style-loader',//通过注入<style>标记将CSS添加到DOM     
            loader: 'style-loader!css-loader'//感叹号!用来连接不同的loader， 而且执行顺序是从右到左webpack5已废弃
            }]                
    plugins:[   /增强和优化打包的过程/
                HtmlWebpackPlugin//简单创建HTML文件并自动注入打包后的资源,用于服务器访问             
                //webpack3 HappyPack//采用多进程去打包构建
                thread-loader（官方推出）//除了使用 Happypack 外，我们也可以使用 thread-loader
                    //把 thread-loader 放置在其它 loader 之前，那么放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行,thread-loader 配置更简单,推荐
                UglifyJsPlugin//ParallelUglifyPlugin 代替更快
                MiniCssExtractPlugin//可将多个css合并成一个
                热替换插件                
                //webpack3 DllPlugin和DllRefrencePlugin//配合使用，可以缩减50%～70%的构建时间
                    //DllPlugin //在webpack.dll.config.js(先运行)生成vendor.js  和 地图（manifest.json）
                    //DllReferencePlugin //在webpack.base.conf.js(后运行) 根据地图（manifest.json）来在vendor.js 找到需要的dll
            ]
    optimization:{    /从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，不过所有的优化还是可以手动配置和重写。/
                        webpack将根据以下条件自动拆分代码块：
                            会被共享的代码块(chunk-common)或者 node_mudules 文件夹中的代码块(chunk-vendors)
                            gz压缩前体积大于30KB的代码块
                            按需加载代码块时的并行请求数量不超过5个//maxAsyncRequests: 5,//按需加载最大并行请求数量(default=5)
                            加载初始页面时的并行请求数量不超过3个//maxInitialRequests: 3,//一个入口的最大并行请求数量(default=3)
                        splitChunks:{// 将多个入口重复加载的公共资源提取出来,避免重复的依赖                        
                              chunks: 'all' // chunks的含义是拆分模块的范围,也就是要生成多少个文件, //'all'是最简单配置,表示打包node_modules到vendors.js                                  
                              //默认是async表示只从异步加载得模块动态加载import()里面进行拆分; initial表示只从入口模块进行拆分
                              cacheGroups //它的一个属性对应的是一个chunk(js文件), 属性名对应的是: chunk(js文件)文件名
                              {
                                   vendors: {
                                      name: 'chunk-vendors',
                                      test: /[\\/]node_modules[\\/]/,
                                      chunks: 'all',   //表示同时对静态加载(initial)和动态加载(async)起作用    
                                      priority: 5,   reuseExistingChunk: true,  enforce: true,
                                    }
                              }
                            },
                        runtimeChunk: { //作用是将包含chunks映射关系的list单独从app.js里提取出来，因为每一个chunk的id基本都是基于内容hash出来的，
                                        //所以你每次改动都会影响它，如果不把它提取出来的话，等于app.js每次都会改变，缓存就失效了
                                name: 'manifest'
                         }   
                         //重点
                        usedExports:true,// Tree Shaking 的配置,配合在package.json添加"sideEffects": [  "./src/file1.js",  "./src/file2.js" ],告诉哪些不要shaking掉了  
                 }  
                 
    externals: {jquery: 'jQuery'} //不用打包它,我自己用<script>引入就好
```
### 编写loader(重点)
```javascript
导出一个函数, 入参是源码,返回是处理后的源码
//用npx webpack来打印输出,调试
```
### 编写一个plugin(重点)
```javascript
 class txtwebpackPlugin {
      //如何钩入hooks
      apply(compiler) {
          //异步钩子emit输出 asset 到 output 目录之前执行
        compiler.hooks.emit.tapAsync("txtwebpackPlugin", (compilation, cb) => {
              compilation.assets["test.txt"] = {
                    source: function () {          return "hello webpack第四节课";        },
                    size: function () {          return 1024;        },
              };
              cb();
        });
      }
}

module.exports = txtwebpackPlugin;
```
### 编写一个webpack(重点说原理)
```javascript
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
module.exports = class webpack {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }
  run() {
      //1 递归处理所有依赖
    const info = this.parse(this.entry);    
    console.log(info);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }
    // 修改数据结构 数组转对象
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    console.log(obj);
    // 2 代码生成，文件生成
    this.file(obj);
  }
  parse(entryFile) {
    // 如何读取模块的内容
    const content = fs.readFileSync(entryFile, "utf-8");
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        path.dirname(entryFile); //./src/index.js
        const newPathName =
          "./" + path.join(path.dirname(entryFile), node.source.value);
        dependencies[node.source.value] = newPathName;
      },
    });
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return {
      entryFile,
      dependencies,
      code,
    };
  }
  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    // 生成 bundle代码, 补齐require,exports函数
    const bundle = 
    
    `(function(modules){
        function require(module){
            //根据相对路径获取绝对路径
            function newRequire(relativePath){
              return require(modules[module].dependencies[relativePath])
            }    
            var exports = {};//做一个假的给eval用
            (function(require,exports,code){
                eval(code)
            })(newRequire,exports,modules[module].code)
            return exports;
        }
        require('${this.entry}')
    })(${newCode})`;
    
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
```

### 单包加载原理
```javascript
原理: //webpack提供浏览器1方法
     webpackJsonp 在分包时才会用到//打包后的chunk文件结构就是一个webpackJsonp方法, 每个chunk都是执行这个函数后的返回结果
     __webpack_require__() //递归地收集执行所有依赖
     
bundle.js 打包后的例子:
//函数
    (function (modules) {         
        // 安装 webpackJsonp for chunk loading
        var parentJsonpFunction = window['webpackJsonp'];
        window['webpackJsonp'] = function webpackJsonpCallback(chunkIds,moreModules,executeModules) {}        
        // 安装过的模块的缓存
        var installedModules = {};
        // 模块导入方法
        function __webpack_require__(moduleId) {
            // 安装过的模块，直接取缓存
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            // 没有安装过的话，那就需要执行模块加载
            var module = (installedModules[moduleId] = {i: moduleId,l: false,exports: {},});
            // 上面说的加载，其实就是执行模块，把模块的导出挂载到exports对象上；
            modules[moduleId].call(
                module.exports,
                module,
                module.exports,
                __webpack_require__
            );
            // 标识模块已加载过
            module.l = true;
            // Return the exports of the module
            return module.exports;
        }
        /这个文件只包含入口块/
        // 附加块的块加载函数是:
        __webpack_require__.e = function requireEnsure(chunkId){}
        // 暴露入口输入模块；
        __webpack_require__.m = modules;
        // 暴露已经加载过的模块；
        __webpack_require__.c = installedModules;
        // 模块导出定义方法
        // eg: export const hello = 'Hello world';
        // 得到： exprots.hello = 'Hello world';
        __webpack_require__.d = function (exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter,
                });
            }
        };   
        //getDefaultExport 函数用于兼容非和谐模块
        __webpack_require__.n 
        // Object.prototype.hasOwnProperty.call
        __webpack_require__.o
        // __webpack_public_path__
        __webpack_require__.p = '';
        // 关于异步加载的错误函数
        __webpack_require__.oe
        // 从入口文件开始启动,返回导出
        return __webpack_require__((__webpack_require__.s = './src/entry.js'));
    })
//入参方式一, 同步
    ({
        //id0
        './webpack/src/entry.js':function(module, exports, __webpack_require__) {
            __webpack_require__(1);     //require资源文件id
            __webpack_require__(2);
        //如图，entry.js是入口文件，调用了util1.js和util2.js，而util1.js又调用了util2.js。
         },
        //id1
        './webpack/src/utils/util1.js':function(module, exports, __webpack_require__) {
        //util1.js文件
            __webpack_require__(2);
            var util1=1;
            exports.util1=util1;
        
        },
        //id2
        './webpack/src/utils/util2.js':function(module, exports) {
            //util2.js文件
            var util2=1;
            exports.util2=util2;}
    });
//入参方式二 异步
    ([
    (function(module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1)).then(foo => {
            console.log(foo());
        })
        __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 2)).then(bar => {
            console.log(bar());
        })
    })
    ]);


bundle.js是以模块 id 为记号，通过函数把各个文件依赖封装达到分割效果，
如上代码 id 为 0 表示 entry 模块需要的依赖， 1 表示 util1模块需要的依赖
require资源文件 id 表示该文件需要加载的各个模块，
如上代码
_webpack_require__(1) 表示 util1.js 模块，
__webpack_require__(2) 表示 util2.js 模块
exports.util1=util1 模块化的体现，输出该模块
```

### 分包加载原理
```javascript
1.先通过__webpack_require__.e加载
2.再通过webpackJsonp异步加载回调，把模块内容以promise的方式暴露给调用方，从而实现了对code splitting的支持

// 先执行mainifest.js
/* 
在mainifest.js中
    劫持了webpackJsonp的push方法,拦截了push操作后，其实就做了三件事：    
        1.将数组第二个变量 moreModules 加入到index.js 立即执行函数的输入变量modules中；
        2.将这个chunk的加载状态置成已完成；
        3.checkDeferredModules看这个依赖加载后是否有模块在等这个依赖执行； 
*/

// 后执行main.js中执行了webpackJsonp的push方法
(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
    // 数组第一个元素数组，是这个文件包含的chunk name
    ['async'],
    // 第二个元素对象，其实就和第一节简单文件打包的输入一样，是模块名和包装后的模块代码
    {
        './node_modules/js-cookie/src/js.cookie.js': function (
            module,
            exports,
            __webpack_require__
        ) {},
        './node_modules/moment/moment.js': function (
            module,
            exports,
            __webpack_require__
        ) {},
    },
]);
```


## 原理流程
```javascript
compliler = Webpack(config)

1.创建 Compiler 和 Compilation(初步编译的结果?) 实例
2.先解析项目依赖的所有 modules，再根据 modules 生成 chunks。
    module 解析，包含了三个主要步骤：创建实例、loaders应用, 依赖收集。
    chunks 生成，主要步骤是找到 chunk 所需要包含的 modules。
3.根据 chunks 生成最终文件。主要有三个步骤：模板 hash 更新，模板渲染 chunk，生成文件

Compilation 实例会调⽤ createHash ⽅法来⽣成这次构建的 hash。
在 webpack 的配置中，我们可以在 output . filename 中配置 [ hash ] 占位符，最终就会替换成这个 hash
```
