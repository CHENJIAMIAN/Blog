### 模块联邦    
> webpack作者(非模块联邦作者)亲自讲解 [幻灯片/内容/ModuleFederationWebpack5.md at master · sokra/slides](https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md)
#### MSFU(阿里Umi团队如何利用模块联邦)
通过模块联邦技术实现了源码和依赖编译的解耦分离,并充分利用了Webpack和Esbuild的高效能力,最大限度地并行和高效地构建了项目
**核心思想**
- 分而治之,将应用源码和依赖代码编译过程解耦和并行化。

**核心原理**
1. 正确识别和隔离应用源码与依赖之间的关系。
2. 使用Module Federation技术,将依赖打包成独立的remote包,实现源码和依赖构建的解耦。
3. 提供两种构建策略实现构建过程的并行化:
	- normal策略:编译时同步收集依赖,但构建过程串行。
	- eager策略:通过扫描方式快速异步获取整体依赖,实现源码和依赖构建能完全并行。
4. 利用Webpack或Esbuild的高效构建能力,专注打包优化依赖部分。
5. 自动处理常见依赖问题,如版本兼容、多实例问题等,避免手动配置。
6. 支持配置排除特定包,解决依赖循环带来的问题。
所以MFSU快的底层原因在于,。
#### garfishjs(字节头条号出品,官方库[module-federation/module-federation-examples](https://github.com/module-federation/module-federation-examples)推荐)
1. 字节跳动Web基础设施团队[web-infra-dev](https://github.com/web-infra-dev)/garfishjs 2.2k类似阿里的umijs/qiankun 14.8k
2. [ScriptedAlchemy (Zack Jackson)](https://github.com/ScriptedAlchemy)是基础设施架构师@**字节跳动**。**联邦作者
	- [模块联邦的原始合并提案 · Issue #10352 · webpack/webpack](https://github.com/webpack/webpack/issues/10352) ScriptedAlchemy-2020年2月7日创建(讲了预期/好处/实现)
	- sokra作为Webpack的创始人,在功能设计和实现方面提供了很多指导和建议。ScriptedAlchemy则在编码和测试方面起到很大作用。
1. 字节跳动的**Modern.js** 对标 案例的 Umi, **Modern.js 和 Umi 的主要区别在于构建优化方式不同**。
	1. Umi 1.7k 采用了 **MFSU** 技术来提升构建速度
	2. Modern.js 3.8k 则使用 **Rspack** 来提升 5 ~ 10 倍构建速度
#### 源码
```javascript
1.在入口文件搜索"webpack/sharing/consume/default/"即可看到共享的东西
2.在localhost:3002/remoteEntry.js 的"getSingletonVersion"打断点可以看到共享的react-dom库来自主APP的main.js, 是main.js之前存在__webpack_require__.S[scopeName]的
3.有shared就有__webpack_require__.S,没有就没有  

new ModuleFederationPlugin({
	  name: 'app2',
	  filename: 'remoteEntry.js',
	  library: { type: 'var', name: 'app2222' }, //源码在lib/ExternalModule.js
		  `type`属性它决定了库中的内容应该如何被暴露。有多种类型的库可以选择，包括`var`、`this`、`commonjs`、`commonjs2`、`amd`、`umd`、`window`等。`name`属性指定了暴露库内容的全局变量的名称
		  var 声明, Webpack会创建一个名为`app2`的变量，这个变量是在当前的作用域下，通常是`window`（如果在浏览器环境中）或者`global`（如果在Node.js环境中）。这样，你可以通过`app2`访问到库中的内容。
		  window 声明, Webpack会在全局`window`对象上创建一个名为`app2`的属性。这样，你可以通过`window.app2`访问到库中的内容。这种方式主要用于浏览器环境。
	  runtime:false,在ContainerPlugin的配置中指定了一个runtime
		1. 当`runtime`的值为一个字符串，例如 `'my-runtime-name'`，Webpack 将为这个特定的 entry 创建一个新的运行时。这样做的好处是可以更好地控制各个入口点的缓存。例如，你可能只想在某个入口点的代码发生改变时，才更新这个入口点的缓存。如果所有的入口点都共享一个运行时，那么只要任何一个入口点的代码发生改变，所有的入口点的缓存都需要更新。
		2. 当`runtime`的值为`false`，Webpack 不会为这个入口点创建新的运行时。这意味着这个入口点的运行时会与其他入口点共享。这样做的话，如果任何一个入口点的代码发生改变，那么所有的入口点的缓存都需要更新。
	  exposes: {  './Widget': './src/Widget'},
	  shared: { //在shared里声明的了,才会使用主APP共享的库,没声明就用自己的(到时会是两个不同的实例)
		'react-dom': {
		  requiredVersion: require('./package.json').dependencies['react-dom'],
		  singleton: true, //不允许主APP的react版本是'16.14.0'而子APP是'16.12.0'
	  },
	  remotes: {
          在我用的时候别名是什么: '远程的library的name变量名@http://localhost:9000/remoteEntry.js',
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
```
![](https://raw.githubusercontent.com/sokra/slides/master/content/ModuleFederationWebpack5/11.png)
![](https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5/28.png?raw=true)
#### 疑问
1. A应用引用了B应用, A应用设置了shared: { react: { singleton: true }, 'react-dom': { singleton: true } },  B应用也设置了shared: { react: { singleton: true }, 'react-dom': { singleton: true } }, 优先用哪个?
	- 用了B应用的
2. 模块联邦的循环引用循环引用会发生什么?
	- 直接爆栈卡死
3. 依赖的应用没有启动会发生什么?
	- 网络报错: http://localhost:3002/remoteEntry.js `ERR_CONNECTION_REFUSED`
	- 控制台报错: `Uncaught ScriptExternalLoadError: Loading script failed.`
##### 管理和解决 `singleton` 模块的版本冲突, `requiredVersion`的判断方式
> 当在 `ModuleFederationPlugin` 配置中设置 `singleton: true` 选项时，webpack 会尝试解决版本冲突，确保在所有使用该模块的应用中，只有一个版本被使用。

| 场景 | 解决方式 |
| :--- | :--- |
| 所有 `requiredVersion` 满足共享模块版本 | 选择满足所有要求的最高版本 |
| `requiredVersion` 存在冲突 | 引发警告 `Unsatisfied version 18.2.0 from @dynamic-remotes/app1 of shared singleton module react (required ^16.13.0)`|
| 应用未指定 `requiredVersion`，其他已指定 | 选择满足所有已指定 `requiredVersion` 的最高版本 |
| 所有应用都未指定 `requiredVersion` | 选择所有可能版本中的最高版本 |
> 在实际应用中，由于版本冲突可能导致运行时错误，通常建议确保所有的应用都使用相同的 `React` 版本，或者至少确保所有 `singleton` 的应用都使用相同的 `React` 版本。这是一个最佳实践，可以避免由于版本差异导致的潜在问题。
#### 踩坑
1. vue-cli如何实现模块联邦, 才不会报错 `ScriptExternalLoadError: Loading script failed.`
```js
  optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',//关键是异步化两个vuecli配置的默认的chunk
            reuseExistingChunk: true
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',//关键是异步化两个vuecli配置的默认的chunk
            reuseExistingChunk: true
          }
        }
      }
    },
```
### 动态配置代理(不用重启项目)
```js
node_modules/.pnpm/http-proxy-middleware@2.0.6_bwlemkrjb22k3yqlwsvvolpocy/node_modules/http-proxy-middleware/dist/http-proxy-middleware.js
	初始化:this.proxy = httpProxy.createProxyServer({}); //形成闭包了, 没办法改了
	运行时: this.shouldProxy(this.config.context, req)	        

可以考虑自定义http-proxy-middleware, 而不是用webpack-dev-server默认的
```
###  项目运行不起来, 报错`Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'call')    at __webpack_require__`
1. webpack版本问题? 不是
2. 配置问题?
	1. 作为被引用的那个的optimization: { splitChunks: false } 才行, 分割了就不行
	2. `.browserslistrc`支持太老版本的浏览器造成的,删掉就可以了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, 
		- `webpack/lib/Compilation.js`的`chunkGraphEntries`的`AllReferencedChunks`没有需要`ensureChunkHandlers: "__webpack_require__.f"`的, 造成`ContainerReferencePlugin.js`的`compilation.addRuntimeModule(chunk, new RemoteRuntimeModule();`没有运行到, 打包出来的模块缺失
			- 可能因为`add(RuntimeGlobals.ensureChunkHandlers`没有执行? 
				- `const hasAsyncChunks = chunk.hasAsyncChunks();`是`false`造成的? 
					- 是没有`addRuntimeModule.(RuntimeGlobals.ensureChunk)即'__webpack_require__.e'`造成的
						- `RuntimeTemplate.js`的`blockPromise`方法没有执行
							- `ImportDependency`才会用`RuntimeTemplate`
								- `ImportDependency`的`constructor`
									- `JavascriptParser.js`的`walkImportExpression`
									- `NormalModule.js`的`build`的`_doBuild() callback`的`const source = this._source.source();`
- **根源在于`const source = this._source.source();`也即项目编译后的源码中有没有`import(` 语句, 不能是`require(`语句而没有`import(`语句** 
#### 造成
1. 单单`babel.config.js`里的`presets: ['@vue/cli-plugin-babel/preset']`也会造成
#### 解决方案
1. 删掉`.babelrc`
2. 删掉`.browserslistrc`
3. 删掉`babel.config.js`
4. .env的VUE_CLI_BABEL_TRANSPILE_MODULES设未true
	1. 通过`VUE_CLI_BABEL_TRANSPILE_MODULES`这个环境变量来区分是否使用`babel-plugin-dynamic-import-node`为 `TRUE` 时引入 [源码](https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/babel-preset-app/index.js) 
5. [vue-cli/packages/@vue/babel-preset-app 位于 dev · vuejs/vue-cli](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)
	- Browserslist 将使用来自以下来源之一的浏览器和 Node.js 版本查询：
		1. 当前或父目录中的.browserslistrc配置文件。
		2. 当前目录或父目录中的package.json文件中的browserslist键。
		3. browserslist当前或父目录中的配置文件。
		4. BROWSESLIST环境变量。
		5. 如果上述方法没有产生有效的结果，Browserslist 将使用默认值： `> 0.5%, last 2 versions, Firefox ESR, not dead`
6. [SaltyFish6952/vue-cli-plugin-mfsu: Vue-CLI support mfsu](https://github.com/SaltyFish6952/vue-cli-plugin-mfsu)
```js
(browserslist\node.js:324) findConfig 
(browserslist\node.js:237) loadConfig 
	(@babel\helper-compilation-targets\lib\index.js:191) getTargets 
		{  android: "4.2.0",  chrome: "49.0.0",  edge: "103.0.0",  firefox: "52.0.0", ios: "9.3.0",  opera: "73.0.0",  safari: "13.1.0",  samsung: "7.2.0",} 
		//@babel/helper-compilation-targets/lib/index.js根据`.browserslistrc的> 0.04% \n not dead`生成的, 
		(@babel\core\lib\config\resolve-targets.js:65) resolveTargets		
		(@babel\core\lib\config\partial.js:112) loadPrivatePartialConfig 
		(@babel\core\lib\config\partial.js:149)
			(gensync\index.js:251) evaluateSync 
			(gensync\index.js:89) sync 
				(@vue\cli-plugin-babel\index.js:31) module.exports 
					(@vue\cli-service\lib\Service.js:82)
					(@vue\cli-service\lib\Service.js:80) loadedCallback 
					(@vue\cli-service\lib\Service.js:97) init 
					(@vue\cli-service\lib\Service.js:247) run 
					(@vue\cli-service\bin\vue-cli-service.js:37)
						npm run serve
```

```js
processRuntimeRequirements:
(webpack\lib\Compilation.js:3503) processRuntimeRequirements 
(webpack\lib\Compilation.js:3322) _codeGenerationModule 
(webpack\lib\Compilation.js:3209) runIteration 
(webpack\lib\Compilation.js:3284) _runCodeGenerationJobs 
(webpack\lib\Compilation.js:3191) codeGeneration 
(webpack\lib\Compilation.js:2959) seal 
(webpack\lib\Compilation.js:2714) finish 
(webpack\lib\Compilation.js:1498) onTransitiveTasksFinished 
(webpack\lib\Compilation.js:1334) buildModule 
(webpack\lib\Compilation.js:1920) _handleModuleBuildAndDependencies 
(webpack\lib\Compilation.js:1410) processModuleDependencies 
(webpack\lib\Compilation.js:1352) _buildModule 
(webpack\lib\Compilation.js:1260) addModule 
(webpack\lib\Compilation.js:1973) _factorizeModule 
(webpack\lib\Compilation.js:1764) handleModuleCreation 
(webpack\lib\Compilation.js:2074) addModuleTree 
(webpack\lib\Compilation.js:2181) _addEntryItem 
(webpack\lib\Compilation.js:2112) addEntry 

blockPromise:
(\lib\RuntimeTemplate.js:939) blockPromise 
(\lib\RuntimeTemplate.js:574) moduleNamespacePromise 
(\lib\dependencies\ImportDependency.js:87) apply  //ImportDependency才会用RuntimeTemplate
(\lib\javascript\JavascriptGenerator.js:206) sourceDependency 
(\lib\javascript\JavascriptGenerator.js:154) sourceBlock 
(\lib\javascript\JavascriptGenerator.js:134) sourceModule //module.presentationalDependencies 里没有 ImportDependency.js
	`.browserslistrc`支持太老版本的浏览器时
		1. presentationalDependencies的类型有: CachedConstDependency,ConstDependency,HarmonyCompatibilityDependency,HarmonyExportHeaderDependency,RequireHeaderDependency
		2. {module?.blocks[0]?.dependencies}: 存在一个ImportDependency,其他全是undefined
		3. ImportParserPlugin.js的parser.hooks.importCall.tap("ImportParserPlugin", expr => {} 不会进入
		4. JavascriptParser.js的walkImportExpression不会进入
		5. 形成的源码为:			
			var _interopRequireWildcard = require("D:/Desktop/模块联邦拆分测试/纯TB/node_modules/.pnpm/@babel+runtime@7.19.0/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.array.iterator.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.promise.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.object.assign.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.promise.finally.js");//`babel.config.js`的`@vue/babel-preset-app/index.js`注入了这4个东西
			require("core-js/modules/es.object.to-string.js");
			Promise.resolve().then(function () {
			  return _interopRequireWildcard(require('./bootstrap'));
			});
	`.browserslistrc`不支持太老版本的浏览器时: 
		1. presentationalDependencies的类型有: CachedConstDependency,ConstDependency,HarmonyCompatibilityDependency,HarmonyExportHeaderDependency,RequireHeaderDependency,
		2. {module?.blocks[0]?.dependencies}: 全是undefined
		3. ImportParserPlugin.js的parser.hooks.importCall.tap("ImportParserPlugin", expr => {} 会进入
		4. JavascriptParser.js的walkImportExpression会进入
		5. 形成的源码为:
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.array.iterator.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.promise.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.object.assign.js");
			require("D:\Desktop\模块联邦拆分测试\纯TB\node_modules\.pnpm\core-js@3.7.0\node_modules\core-js\modules\es.promise.finally.js");//`babel.config.js`的`@vue/babel-preset-app/index.js`注入了这4个东西
			require("core-js/modules/es.object.to-string.js");
			require("core-js/modules/es.string.iterator.js");
			require("core-js/modules/web.dom-collections.iterator.js");
			import('./bootstrap');
	
		
(\lib\javascript\JavascriptGenerator.js:98) generate 
(\lib\NormalModule.js:1205) codeGeneration 
(\lib\Compilation.js:3329) <anonymous> 

walkImportExpression:
(lib\javascript\JavascriptParser.js:2805) walkImportExpression 
(lib\javascript\JavascriptParser.js:2392) walkExpression 
(lib\javascript\JavascriptParser.js:1673) walkExpressionStatement 
(lib\javascript\JavascriptParser.js:1600) walkStatement 
(lib\javascript\JavascriptParser.js:1492) walkStatements 
(lib\javascript\JavascriptParser.js:3472) parse 
(lib\NormalModule.js:803) processResult 
babel-loader\lib\index.js: 59 loader.call
```

### babel多个配置文件是怎么合并的
```js
node_modules/.pnpm/@babel+core@7.19.3/node_modules/@babel/core/lib/config/config-chain.js
	buildRootChain
		findRootConfig //configFile即babel.config.js
		findRelativeConfig //.babelrc
```
#### babelrc和babel.config用了哪个? 
- 先babel.config后babelrc, 然后将两者的配置合并, 如target.plugins.push(...source.plugins);, 即后读的合并到先读的,再进行去重
### 为什么加tb端 import 'babel-polyfill' 会造成依赖找不到 
- 加import 'babel-polyfill' 报错
	- 由platform/store的找不到   "./node_modules/.pnpm/@babel+runtime@7.19.0/node_modules/@babel/runtime/helpers/interopRequireDefault.js", 的报错导入造成
		- 少了31个node_modules/@babel/runtime/helpers/xxx
		-     "./src/bootstrap.js",隔着因为import 'babel-polyfill' 而新增的331个依赖就到"webpack/sharing/consume/default/vue/vue"
		- "webpack/sharing/consume/default/vue/vue"是哪行代码加的?????????
- 不加import 'babel-polyfill' 正常
	-     "./src/bootstrap.js",隔4000多个依赖后才到"webpack/sharing/consume/default/vue/vue"
#### 解决
##### 1. 两边都给vue加上**eager**就好了, 在源码中,eager为true就会与共享范围内的同种库做对比, 都为true会公用一个该库
```js
eager为true时, 主chunk即app.xxx.js多了vue模块:
	"./node_modules/.pnpm/vue@2.6.12/node_modules/vue/dist/vue.esm.js": 
	 即不从远程加载了,直接本地打包进去
否则会拿远端的chunk-vendors.xxx.js加载里面的vue :__webpack_require__(/*! vue */"./node_modules/.pnpm/vue@2.6.12/node_modules/vue/dist/vue.esm.js");
```
#####  2.跟`package.json`的name有关, name改为不同的话, `eager` 不加也可以.
```js
window下有变量 webpackChunkvue_platform111_2_0_0 存着chunk, 如果同名会相互覆盖

/* webpack/runtime/jsonp chunk loading */
(typeof self !== 'undefined' ? self : this)["webpackHotUpdatevue_platform111_2_0_0"] = function(chunkId, moreModules, runtime) {
var chunkLoadingGlobal = (typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] = (typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] || [];
//
((typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] = (typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] || []).push([["chunk-vendors"], {
    "./node_modules/.pnpm/vue@2.6.12/node_modules/vue/dist/vue.esm.js": 
((typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] = (typeof self !== 'undefined' ? self : this)["webpackChunkvue_platform111_2_0_0"] || []).push([["src_bootstrap_js"], {
    "./src/bootstrap.js":


