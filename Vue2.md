

```javascript
1.SSG 静态生成(80%使用): //(Static Site Generate) //如:HTML在build时生成, 用户请求前的服务器渲染
2.SSR 服务端渲染(20%使用): //首屏渲染+客户端交互激活, 用户请求后的服务器渲染
    //HTML在request时生成
    1.更好的 SEO 
    2.首屏加载更快 
    3.更多的服务器负载
    4.只支持 beforCreate 和 created
```

### VueCli
```javascript
vue inspect > outputwebpackconfig.js 

vue-cli-service serve   是怎么运行typescript去把.ts转为.js的 ?
    node_modules/.bin/vue-cli-service //传进参数serve
    node_modules/@vue/cli-service/bin/vue-cli-service.js //传进参数serve
    node_modules/@vue/cli-service/lib/Service.js //调用vue.config.js, 再利用正则从devDependencies依赖里加载vue的插件,包括"@vue/cli-plugin-typescript"
    node_modules/@vue/cli-service/lib/commands/serve.js //这里会根据加载的插件来生成和执行webpack的配置,因为"@vue/cli-plugin-typescript",ts-loader被组织进去了
    
为什么当我打开localhost:8080可以打开首页。当我打开localhost:8080/xxxxxx的时候还是可以打开首页?
    因为vue-cli-service serve就是起了一个WebpackDevServer实例
    它的devServer: {historyApiFallback: {rewrites: genHistoryApiFallbackRewrites(options.publicPath, options.pages)}}  
    这样配置开启了:任意的 404 响应都可能需要被替代为 index.html 


vue-cli-service build 出错: Path variable [contenthash:8] not implemented in this context : static/js/[name].[contenthash:8].js
    node_modules/@vue/cli-service/lib/config/app.js 里找到static/js/[name].[contenthash:8].js的定义 ,发现:
    "static/js/[name].js" //dev,可以运行
    "static/js/[name].[contenthash:8].js" //prod,运行出错
    估计是因为mini-css-extract-plugin不支持contenthash
    
vue-cli-service build 后, 部署静态资源dist文件夹后,访问的页面是空白的?
    原模板有没有同样的问题? 有，说明配置本身存在问题
    存在什么问题？ 只要--mode development就可以，为prod就不可以
    NODE_ENV|BABEL_ENV=development估计对vue-cli不影响，所以应该是影响了vue.config.js 
    注释掉vue.config.js 所有NODE_ENV部分，有内容，但存在错误   
    最终找到原因：  optimization: {   splitChunks: {   cacheGroups: {
                                    demo: { name: 'chunk-demo',
                                            test: /[\\/]src[\\/]/, //不可以,demo.html和index.html都不可以
                                            test: /[\\/]src[\\/]pages[\\/]/, //不可以,demo.html和index.html都不可以
                                            test: /[\\/]src[\\/]pages[\\/]demo[\\/]/,//demo.html不可以访问,index.html可以
                                            //暂未发现造成问题的正则的规律
    所以最终原因是,配置了splitChunks,造成相关资源被splitChunks抽走了, 所以/dist/js/index.73eb22e6.js缺了被抽走的部分
```
#### vue-cli用tailwindcss不生效?(耗时半天)
1. npx tailwindcss init -p #自动生成postcss.config.js和tailwind.config.js
2. vue-cli配置文件不用改,会自动读取postcss.config.js
3. tailwind.config.js里content路径匹配要包含*.vue格式的文件
4. //以上三点齐全,还不生效,考虑是webpack5持久化缓存的问题 ? 因为有时不进postcss.config.js和tailwind.config.js的断点
5. 终极解决: npm uninstall tailwindcss postcss autoprefixer 然后 vue add tailwind 
### Vue
**当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上**
```javascript
: //相当于v-bind:href='js代码/变量' eg：  :href='js代码/变量'
    v-bind="{ id: someProp, 'other-attr': otherProp }" //绑定一个对象, 该对象的属性都作为绑定属性 /内外引号不能都是双引号或都是单引号/    
@ //相当于 v-on:    eg:	@click='vue方法'	用于绑定事件到vue


v-model自动添加:value和@input, 会被转换成 @input="message=$event.target.value" :value="message"
    //@change="处理方法(arguments,'其他参数')"

sync自动添加@update:visible
父组件:  :visibleXXX.sync="ishow"      //让ishow的值可以由子组件的$emit('update:visibleXXX')控制
    //等价于:visible="ishow"  @update:visible= 接收子组件的$emit('update:visible')改变ishow"
    //子组件:  this.$emit('update:visible', false);   


条件渲染(满足条件才渲染):		v-if='vue数据 > 0' 		v-else-if='' 		v-else=''
列表渲染(遍历输出来渲染):
    v-for="(i, index) in [1,2,3,4]" //v-for 还支持一个可选的第二个参数，即当前项的索引
    v-for="(value, name, index) in object"

样式:
    :class="{class3:条件}" 或 "['class1','class2']" 或  "[editing? 'class4':'class5']" 或 "[{ active: isActive }]"  //满足条件时才启用
    :style ="{ color: activeColor}" 或 "[{ color: activeColor}, { color: activeColor2}]" 或 "{ 'opacity': !editableCheckNum ? 0.5 : 1 }"

vm.$on('myEvent',args=>{})//接收处理事件
vm.$emit('myEvent',args)//触发事件

@click.native/添加原生事件(给浏览器的事件，回调的函数的参数是浏览器事件)
@click.stop阻止冒泡/@click.prevent阻止默认行为/@click.self 只有当事件在该元素本身（而不是子元素）触发时，才会触发回调。
@keyup.113 //F2键盘码为113

Object.assign(this.$data, this.$options.data())  //data重置，恢复默认值
this.$forceUpdate() //强制重新渲染，在组件内部中进行强制刷新

<Child  @hook:mounted="ParentdoSomething"/> //监听子组件的mounted事件

{{ "wocao" | guolvqi}} //guolvqi称为过滤器函数,用于格式化"wocao"

v-html: //字符串按html解析
    rawHtml='<span style="color: red">内容</span>'
    <p>{{ rawHtml }}</p>     //输出: <span style="color: red">内容</span>
    <p v-html="rawHtml"></p> //输出:  内容

v-show v-if 无效 ?
    //console.log(typeof this.val)可以看到控制台中一直输出的都是string
    
v-if //销毁重建,可以用来刷新整个子组件
v-show //隐藏
    1.v-for 遍历必须为 item 添加 key//key尽量加上，不然item的key都是undefined会，因为key相同所以被复用，状态就乱了
        存在增删改(排序),用index作为key就可能出渲染问题,key被胡乱判断相当旧vdom被胡乱复用
    2.v-for 遍历避免同时使用 v-if //因为 v-for 比 v-if 具有更高的优先级, 所以不管v-if是什么都会被遍历一遍,效率低
    /不用变化的数据,用 Object.freeze 冻住,防修改，不让vue劫持它,以提高效率/
   
        
this.$refs['name'].$el //取得元素dom
     //refs是作为渲染结果被创建的，如果想要真正地在DOM加载完成后拿到数据，就需要调用VUE的全局api ： 
         this.$nextTick(() => {/下次 DOM 更新循环之后执行,用来获取更改/}) 
    子组件：<input type="text" id="input1" ref="input1">
    父组件：this.$refs.input1//<input type="text" id="input1"> ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上
    //updated阶段则是完成了数据更新到DOM的阶段(对加载回来的数据进行处理)
    //此时，ref、数据等等全部都挂载到DOM结构上去，在update阶段使用this.$refs.xxx，就100%能找到该DOM节点。

/由于 JavaScript 的限制,Vue 不能检测到以下变动/, ： 
    对象:
        ' _ 或 $ 开头的属性不会被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。'
        //Vue 无法检测属性的添加或移除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的
        +1个属性: Vue.set(vm.对象, 'b', 2) // this.$set
        /watch时 , deep要为true!!/
        /更改对象数组中某一个对象的属性  Vue.set(this.对象数组[index], '属性名',属性值)/
        +n个属性: this.对象 = Object.assign({}, this.对象, {新增属性们})
    数组
        1.vm.arr[index] = newValue
                vm.$set(vm.arr, index, newValue)// vm.$set，Vue.set的一个别名            
                vm.arr.splice(index, 1, newValue)// Array.prototype.splice
        2.vm.arr.length = newLength
                vm.arr.splice(newLength)// Array.prototype.splice
                
<keep-alive  include='a,b,c' | exclude > //使被包含的组件保留状态，避免重新渲染,对应两个钩子函数 activated 和 deactivated

new Vue({
          el: '#app',
          router,
          store,  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件,子组件能通过 this.$store 访问到
          render: h => h(App)
          //render: h => h(App) 是下面内容的缩写：
                      //render: function (createElement) {  return createElement(App); /*返回VNode*/}
})

//vue的属性
    components: {'my-component': () => import('./my-async-component')/*异步组件*/}
    data     存放'vue数据
             data 为什么必须是函数?    防止两个实例组件修改同一份.prototype.data的内容
    methods  存放'vue方法
    mounted  vue挂载完成时执行
    watch    获取变量变化的前后值, 常用来(监听页面路由) 
            '$route': 'fetchData' //最简单写法
             b: function (val, oldVal) { //只有值发生改变才会执行 },
             c: {
                  handler: function (val, oldVal) { /* ... */ },
                  deep: true,//该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
                          '注意:在变更(不是替换)对象或数组时,旧值将与新值相同,因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。'                  
                  immediate: true// 如果组件是v-if控制,v-if为true时并不会进入watch回调, 而immediate: true可以立即触发回调,即初始化赋值时就捕获到
                },
                //对于只观察一下的也可以这样定义
                let unwatchFn = this.$watch('count', function(){ console.log('count 新值：'+newVal) }, {immediate: true}) 
                //{string | Function} source, {Function | Object} callback, {Object} [options]
                unwatchFn()
    computed  有缓存性,定义在它里面就不用再data里定义了,作用:,当且仅当计算属性依赖的 data 改变时才会自动计算,并可在调用变量前,用函数处理变量的值     
                //计算属性默认会帮我定义好 getter，并未定义 setter    
               get(){return this.nameFromStore},
               set(newVal){return newVal} 
                                                                
<style scoped> //scoped 只作用于当前组件中的元素
    scoped css 没有生效 ? 
        原因: 使用 scoped 后，父组件的样式将不会渗透到子组件中
        解决:  /deep/ input {}
    vue-loader支持'>>> 和 /deep/', 
        Sass 之类的预处理器可能无法正确解析 '>>>', 可以用 '/deep/ 和 ::v-deep空格'  ,/换句话说::v-deep只在scoped时有效/
            <style scoped> .a >>> .b { /* ... */ } </style> 将被编译成：.a[data-v-f3f3eg9] .b { /* ... */ }
    vue2.7开始,用vue-loader15.10.0,改为  :deep() .

//*.vue (单文件组件) 
    vue-loader将.vue文件自动预编译成js 


//注册或获取全局过滤器。    
    Vue.filter('my-filter', function (value) {      // 返回处理后的值    })    // 注册
    var myFilter = Vue.filter('my-filter')    //返回已注册的过滤器
    
//注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
    用select-tree(必须带一个-),不用SelectTree//防止将来新html规范出了个SelectTree标签,防止肯定不会出一个加-符号的新标签
    /使用Vue.extend方法定义组件，使用 Vue.component方法注册组件/
    const 组件构造函数 = Vue.extend(vue文件);
    Vue.component('my-component', Vue.extend({ /* 传入一个扩展过的构造器 */ }))
    Vue.component('my-component', { /*传入一个选项对象 (自动调用 Vue.extend)*/ })
    //Vue.component('MyComponentName', { })// (首字母大写命名) 定义一个组件时，<my-component-name> 和 <MyComponentName> 都是可接受的
    var MyComponent = Vue.component('my-component')  // 获取注册的组件 (始终返回构造器)
    
<component v-bind:is="currentTabComponent"></component> //使用 is attribute 来切换不同的组件
    eg:currentTabComponent='admin-dashboard'的话,就加载 AdminDashboard.vue
    
<slot> //元素 —是 Web Components 技术套件的一部分，是Web组件内的一个占位符，是对组件的扩展，通过slot插槽向组件内部指定位置传递内容，通过slot可以父子传参；
    this.$scopedSlots.header//不用<slot>标签的,直接代码渲染
    2.6新语法 #header //相当于 v-slot:header= 可以被重写为 #header= //是slot + slot-scope的简写
    
    /一个不带 name 的 <slot> 出口会带有隐含的名字“default”/
    普通slot(父中替换子的占位符)：
        	<div id="app"> （作为父) 			
                <div slot="uioiu">这是页脚</div>  //替换掉slot uioiu
        	</div>
            
        	<template id="child"> 插槽 （作为子）
                <slot name="uioiu"></slot>
        	</template> 
    作用域插槽scopedSlot()//作用: 数据来自子组件的slot占位符
        //slot-scope是传过来的属性
        /用slot-scope属性来访问子组件的属性 slot-scope="{子组件的属性们}"/
        //定义:
        <todo-list>
                           <slot name="SLOT" 变量1="1" 变量2="2" 变量3="3" :变量4="给子组件"> 
                              '后备默认内容template为空时才会被渲染' {{给子组件/*打印 卧槽*/}}
                           </slot> /1/
        </todo-list>
        
        //使用1 (用不到slot的数据)
        <todo-list 给子组件="卧槽">
            <template slot="SLOT"></template>
        </todo-list>
        
        //使用2 (用到slot的数据)
        <todo-list 给子组件="卧槽">
              <template slot="SLOT" slot-scope="{ 变量1,变量2,变量3}" 或 slot-scope="变量1,变量2,变量3">  
                  //等价于v2.6新语法  <template v-slot:SLOT="{ 变量1,变量2,变量3}">
                           <h1>{{ 变量1}}</h1>  /*会替换掉*/ /1/
              </template>
        </todo-list>



//函数式组件   无状态data/无声明周期/无this，渲染开销低!
    Vue.component('my-component', {
      functional: true,   
      props: {    hasFence: { type: [Boolean,String,Number], default: false ,required:true} }, // Props 是可选的, 通过 Prop 向子组件传递数据
      // 为了弥补缺少的实例 // 提供第二个参数作为上下文
      render: function (createElement, context) {        // ...      }    })           

父子通信:(重点)
        0、provide/inject(跨多多代)  
                甲组件提供： provide() { return { 变量名: 变量} }  
                乙组件： inject:{  变量别名: {from: ' 变量名',default: () => 1}  }, //即可通过this.变量别名 获得变量, 如果没有人provide,则this.变量别名 为默认值1
			'当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上'
           v-bind="$attrs"：穿透所有属性(data里的数据)给子子孙孙 //祖孙传参 $attrs 
           v-on="$listeners"穿透所有方法给子子孙孙 //祖孙传事件 $listeners
        1、props | $emit/$on
        2、this.$children/$parent
        3、ref
        4、vuex        
```

### 自定义指令directive eg:注册一个全局自定义指令 `v-focus`

```javascript
全局注册:
    Vue.directive('focus', {     
      inserted: function (el) { // 当被绑定的元素插入到 DOM 中时……        
        el.focus()// 聚焦元素
      }
    })
    
局部注册:
    directives: {
      focus: { //  <input v-focus> 指令的定义      
        inserted: function (el, binding) { 
          el.focus()
          binding.value//调用指令时传入的值(可选)
        }
      }
    }            
```

### VueX: 用于状态管理, 引用它的vue组件都可以用它的方法和数据   
```javascript
用: this.$store.state.对象   
 
用commit还是直接修改this.$store.state.val ?
    //使用commit提交到mutation修改state的优点： vuex能够记录每一次state的变化记录，保存状态快照，实现时间漫游/回滚之类的操作。
    //所以没以上需求的话直接修改this.$store.state.对象, 即可
 
Vue.use(Vuex)
    /use实际执行的是Vuex.install()/
    在 install 方法中用了Vue.mixin({ beforeCreate: function () { vuexInit} }),    这样每次beforeCreate时都会初始化this.$store.state.对象/
    
export default new Vuex.Store({ //重点 5个说出来
          1 state:      {count: 0},                                           //存属性,通过store.state.count访问     
             /在这定义了变量才是响应式的!  用this.$store.state                            .对象=XX; 不是响应式的!!,可以用strit:true触发报错/
             
          2 actions:    {action1({ commit },args) {commit('increment')  }}  //存方法,在mutation变动前做处理          
                store.dispatch('module1/action1',args)  //触发状态变更        
             
          3 mutations:  {increment (state) {state.count++}      }}    //存方法,mutations(变异，变动)          
                store.commit('increment') //触发状态变更                 
                           

                     
          4 modules,    //子store模块
          5 getters:    {  sidebar: state => state.app.sidebar } //相当于store 的computed, getter 接受 state 作为其第一个参数                         
})                    


简写:
    import { mapState } from 'vuex'
    //由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
        export default {
            ...mapActions(['user/login']) //调用this['user/login'](args).then
            computed: {
                ...mapState({ //传入对象 //返回{}用...解构出来
                      measuring:state=>state.map.measuring,  //获取子模块的
                      count: state => state.count,
                      countAlias: 'count' // 传字符串参数 'count' 等同于 `state => state.count` 必须是挂在state下!!!!!
                })
                //或者
                ...mapGetters(['sidebar','avatar'])
            }
        }
        //被转化成:
        export default {
            computed: { 
                  count(){
                      state => state.count
                  },
                  countAlias(){
                      return this.$store.state.count
                  } 
                  //或者
                  sidebar(){
                      return this.$store.getters.sidebar
                  },
                  avatar(){
                      return this.$store.getters.count
                  }
            }
        }
```

### Vue-Router:用于地址路由,作用不仅切组件,还有[回退]
```javascript
每个组件在执⾏ beforeCreated 钩⼦函数的时候，都会执⾏ router.init ⽅法

router.addRoutes(routes: Array<RouteConfig>)//动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组


当点击切换路由时：  
    全局:beforeEach/afterEach
    组件内:beforeRouterEnter进入时/Update复用时/Leave离开时
    独享:beforeEnter
        
            -->在失活的'组件里'调用beforeRouteLeave
    -->全局beforeEach
            -->当路由更新时在重用的'组件里'调用 beforeRouteUpdate 守卫 (2.2+)
              -->在'路由配置里'调用路由独享的守卫beforeEnter
            -->在被激活的'组件里'调用 [传给 next 的回调函数] beforeRouteEnter中传的
    -->全局beforeResolve(功能跟beforeEach一样,只是在前两个守卫之后)(2.5+)
    -->全局afterEach(不会接受 next 函数也不会改变导航本身,基本没卵用)
    -->//组件更新beforeCreate-->created-->beforeMount-->mounted
            -->挂载完调用 [传给 next 的回调函数] beforeRouteEnter中传的
                
children:{path=''} //children的component会默认被渲染到它爸的component的<router-view>上
 
    
跳转:  //this.$router.push(route, () => {}, onError)//(location, onComplete?, onAbort?)
    this.$router.push({ path: 'register', query: { plan: 'private' }}) ///register?plan=private
    this.$router.push({ name: 'user', params: { userId }}) // -> /user/123   this.$route.params.id  '/user/:id'
    this.$router.go(-1)
    


vue-router 3 种路由模式：
    1 hash(在url中永远带着#号)支持所有浏览器//http://www.abc.com/#/hello，hash 的值为 #/hello 
        //vue-router中默认使用的是hash模式,特点是url中带有#号,#代表网页中的一个位置, 在浏览器发起HTTP请求时，会过滤掉URL中的#符号以及其后的内容，当服务端返回内容后，浏览器再根据#符号后的标识符将页面滚动至特定的位置。
        //window是可以监听到哈希值的变化的（onhashchage事件）,监听到后进行按需加载
    2 history 依赖 HTML5 History API、
    3 abstract支持所有 JavaScript 运行环境


this.$router //路由器
this.$route //访问当前路由 eg: this.$route.params.username

路由拦截:
    router.beforeEach((to:Route, from:Route, next:Function) => { //主要用来通过跳转或取消的方式守卫导航 。
        next: //一定要调用该方法来 resolve 这个钩子。确保要调用 next 方法，否则钩子就不会被 resolved。执行效果依赖 next 方法的调用参数。
            next()//继续
            next(false)//中断导航            
            next({ path: '/' })//跳转 next('/')                 
            next(Error 实例)//被传递给 router.onError() 回调            
```


![F1B2E79267AC44809D3915D034775E6F](https://github.com/CHENJIAMIAN/Blog/assets/20126997/92a4eb3b-5a55-40d6-b36f-777bbe82f2cb)

### vue-cli 执行流程：
```javascript
//简单vue调用顺序:  (index.html-> main.js → app.vue → components → router → 切换到某组件) 

vue inspect > output.json //查看整个项目的webpack配置
vue inspect --rules //查看webpack的rules 
    vue inspect --rules svg //查看webpack的rules下的svg配置规则

//复杂vue调用顺序(以vue-element-admin项目为例)
→package.json
    →scripts："dev": "vue-cli-service serve",//启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)。
    →npm run dev  //会自动新建一个 Shell，将该目录的子目录append到PATH变量，在这个 Shell 里面执行指定的脚本命令。执行结束后，再恢复原样。
        →node_modules/.bin/vue-cli-service.cmd
        →node_modules\@vue\cli-service\bin\vue-cli-service.js//加载了 './config/'下的配置
                1→node_modules\@vue\cli-service\lib\config\app.js
                   //定义了 const htmlPath = api.resolve('public/index.html')  
                2→node_modules\@vue\cli-service\lib\config\base.js
                        //定义了入口为 .entry('app').add('./src/main.js')//如果没有配置的话
                    →main.js → app.vue         
                3→vue.config.js //是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
            
.env //文件          //在所有的环境中被载入
.env.local          //在所有的环境中被载入，但会被 git 忽略
.env.dev            //只在dev 模式中被载入
.env.prod           //vue-cli-service build --mode prod ,只在prod 模式中被载入
.env.[mode].local   //只在指定的模式中被载入，但会被 git 忽略
    //VUE_APP_XXX = XX 约定可用于客户端, 其他不可以
```
