### Watcher 的分类:
1. 渲染 Watcher (Render Watcher):
   每个组件都有一个对应的渲染 Watcher,它的作用是观察组件的依赖数据,当数据变化时,触发组件的重新渲染.

2. 计算属性 Watcher (Computed Watcher):
   每个计算属性都对应一个 Watcher,它的作用是观察计算属性的依赖数据,当数据变化时,触发计算属性的重新计算,并缓存结果.

3. 侦听器 Watcher (Watch Watcher):
   每个 watch 选项都对应一个 Watcher,它的作用是观察特定的数据,当数据变化时,触发相应的回调函数.

### Watcher 的主要属性和方法:
- vm: 当前组件的实例.
- expression: 被观察的表达式.
- cb: 数据变化时触发的回调函数.
- value: Watcher 当前的值.
- dirty: 标识 Watcher 是否需要重新求值.
- deps: Watcher 依赖的所有 Dep 实例.
- newDeps: 新一轮依赖收集后 Watcher 依赖的 Dep 实例.
- get(): 求值,即执行 getter 函数,并重新收集依赖.
- addDep(dep): 添加一个依赖(Dep 实例).
- update(): 当数据变化时,调度者会调用这个方法,从而触发 Watcher 的更新.
- run(): 实际执行更新的方法,会调用 getAndInvoke 方法.
- evaluate(): 对 Watcher 求值,并缓存结果.
- depend(): 依赖收集,将 Watcher 添加到其依赖的所有 Dep 实例的 subs 数组中.

同时,Watcher 也是任务调度器的重要组成部分
,每个 Watcher 实例都可以被推入队列,从而实现异步更新.
```javascript
调试vue3:"dev":"nodescripts/dev.js--sourcemap"
```



```javascript
加载渲染过程
    父beforeCreate->父created->父beforeMount->  
            子beforeCreate->子created->子beforeMount->子mounted    
    ->父mounted
更新过程
    父beforeUpdate->    
            子beforeUpdate->子updated    
    ->父updated
销毁过程
    父beforeDestroy->    
            子beforeDestroy->子destroyed    
    ->父destroyed
```



```javascript
/vue用es5写不用es6写,因为es5很容易在原型上挂载方法,更容易分散在各个文件去挂载,更方便维护/

初始化方法们,方便后续调用:
initMixin(Vue);//Vue.prototype
    _init: ƒ (options)
stateMixin(Vue);//Vue.prototype
    $delete: ƒ del(target, key)
    $set: ƒ (target, key, val)
    $watch: ƒ ( expOrFn, cb, options )
    $data: (...)
    $props: (...)
eventsMixin(Vue);//Vue.prototype
    $emit: ƒ (event)
        //当执行 vm.$emit(event) 的时候，根据事件名 event 找到所有的回调函数 let cbs = vm._events[event]，然后遍历执行所有的回调函数。
    $off: ƒ (event, fn)
    $on: ƒ (event, fn) 
        //把所有的事件用 vm._events 存储起来，
        //当执行 vm.$on(event,fn) 的时候，按事件的名称 event 把回调函数 fn 存储起来 vm._events[event].push(fn)。
        
    $once: ƒ (event, fn)
lifecycleMixin(Vue);//Vue.prototype
    $delete: ƒ del(target, key)
    $destroy: ƒ ()
    $forceUpdate: ƒ ()
    _update: ƒ (vnode, hydrating)
renderMixin(Vue);//Vue.prototype   
    installRenderHelpers(Vue.prototype)//将这些渲染方法以缩写名称的方式加入到Vue的原型中
            _b: ƒ bindObjectProps( data, tag, value, asProp, isSync )
            _d: ƒ bindDynamicKeys(baseObj, values)
            _e: ƒ createEmptyVNode(text) //this._e() 生成一个注释节点
            _f: ƒ resolveFilter(id)
            _g: ƒ bindObjectListeners(data, value)
            _i: ƒ looseIndexOf(arr, val)
            _k: ƒ checkKeyCodes( eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName )
            _l: ƒ renderList( val, render )
            _m: ƒ renderStatic( index, isInFor )
            _n: ƒ toNumber(val)
            _o: ƒ markOnce( tree, index, key )
            _p: ƒ prependModifier(value, symbol)
            _q: ƒ looseEqual(a, b)
            _s: ƒ toString(val)
            _t: ƒ renderSlot( name, fallback, props, bindObject )
            _u: ƒ resolveScopedSlots( fns, // see flow/vnode res, // the following are added in 2.6 hasDynamicKeys, contentHashKey )
            _v: ƒ createTextVNode(val)
     $nextTick: ƒ (fn)
    _render: ƒ ()
initGlobalAPI(Vue);//给Vue的实例对象添加属性 Vue全局API  
    //初始话完成后console.dir(Vue), 将函数以普通对象的形式输出到控制台里,Vue多出以下方法:
    ƒ Vue(options)
        cid: 0
        component: ƒ ( id, definition )
        delete: ƒ del(target, key)
        directive: ƒ ( id, definition )
        extend: ƒ (extendOptions)
        filter: ƒ ( id, definition )
        mixin: ƒ (mixin)
        nextTick: ƒ nextTick(cb, ctx)   //Vue.nextTick
        observable: ƒ (obj)
        options: {components: {…}, directives: {…}, filters: {…}, _base: ƒ}
        set: ƒ (target, key, val)
        use: ƒ (plugin)
        util: {warn: ƒ, extend: ƒ, mergeOptions: ƒ, defineReactive: ƒ/*定义了响应式getter/setters*/}
Vue.prototype$isServer
Vue.prototype$ssrContext
Vue.prototypeFunctionalRenderContext
'初始化完成'


我们new Vue()时:    
    ƒ Vue (options) {
      if ( true &&!(this instanceof Vue)) {warn('Vue is a constructor and should be called with the `new` keyword');}
      this._init(options);
    }
this._init(options):
    整合父子组间的options() //vm.$options = mergeOptions(..)
    initLifecycle(vm);//添加一些下面会用到的变量
    initEvents(vm);//-->updateComponentListeners-->updateListeners(add,remove)
        //为Vue的实例方法添加了几个属性值$slots，最后定义了 $attrs 和 $listeners 的监听方法。
        //自定义事件和原生 DOM 事件处理的差异就在事件add,remove的实现上
    //add 
    initRender(vm);//ractive化了?
    callHook(vm, 'beforeCreate');//里面进行vuexInit(this.$store=的赋值操作)
    initInjections(vm); // resolve injections before data/props
    initState(vm);//初始化状态InitState调用顺序：    
        initProps()
            defineReactive ()
            proxy ()
        initData()
            proxy ()
            observe()
                Observer():new //附加到每个被观察对象的Observer类。 一旦附加，Observer用defineProperty将目标对象的属性键转换为收集依赖项和派发更新的 getter/setter。
                    defineReactive()
                        dep():new
                        Object.defineProperty(obj, key, { get:dep.depend(), set:dep.notify()})
/computed如何实现/
    先获得deps,在让deps下的watcher,关注它
        
        props -> methods -> data -> computed ->  watch 
        
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');
    
/模板编译 template->render函数/
    (重点)
    //先调用compiler 版本的 $mount 处理<template>
        //编译入口: compileToFunctions-->createCompiler-->createCompilerCreator(编译模板 template，编译配置 options ,Vue 实例 vm)
        //编译过程：
            解析:const ast = parse(template.trim(), options)//解析模板字符串生成 AST,转换bind等attrs       
            优化:optimize(ast, options)//优化语法树   
            生成:const code = generate(ast, options)//生成代码
                                genElement->genData->处理v-model等
        /重要转换/
            v-for比v-if优先(放同一个标签时), 不让每次都判断很傻
            v-if //添加标记, 生成vdom时忽略它  //会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染； 
            v-show //只是修改style的display  //会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；
            v-html //先所有子节点，再设置 innerHTML 为v-html的值
            
    dep代表一个响应式值,可以在多个地方显示或用到即多个wathcer
    wathcer是视图,它想要自己的变量有变化时被通知, dep会通知它的
    observer维护defineProperty, 并通过set依赖收集来的dep去通知有订阅它的watcher
    //再调用原型上的$mount方法(递归子组件)
    vm.$mount(vm.$options.el)
    {
         mountComponent()
         {
            /双向绑定 1 Component 对应 1 render Watcher/
            //2.Observer会用defineProperty对data (包括computed wathcer) 进行转换, 添加 getter 和 setter 属性
            //3.render 时, data 的getter被调用(依赖收集)(收集wathcer), getter 中通过 dep.depend(dep.target.addDep)即wathcer.addDep(传入dep实例本身), 绑定了dep和watcher    
            //4.修改数据时, data 的setter被调用(派发更新), setter时消息传递员会notify所有的subs 即Watcher即对应依赖于此 data 的组件去刷新

            消息传递员(Dep) ,与data中所有属性一一对应, /读者Watcher订阅了它,成为subs/
                依赖收集的过程:    //html模板里的一个表达式对应一个watcher
                    1.存Watcher//new Watcher时, 先会把Dep.target设为当前这个wathcer(后面被用来给wathcer添加subs)
                    2.绑定Watcher到消息传递员
                        //也就是watcher订阅了dep,成为dep的subs: Watcher.addDep --> Dep(dep.addSub(this) --> this.subs.push(sub)添加了订阅者) 
                派发更新的过程:
                    修改数据对象,触发setter时消息传递员会notify所有的subs即Watcher即对应组件去刷新 
                    
                    根部的createComponent(installComponentHooks)是属于render函数的, 即在.vue被转换成render函数时调用,⽬的是尝试创建⼦组件返回vnode
                    
            1. callHook(vm, 'beforeMount'); -> 
            2. new Watcher  //构造函数里执行了其里的get里的pushTarget里将Dep.target设为当前watcher
                            ( // Watcher有5个构造参数 
                             vm,   
                             updateComponent=() => { //watcher.get的回调
                                     /vdom渲染, _update ⽅法的作⽤是把 VNode 渲染成真实的 DOM/
                                      vm._update(vm._render(), ...) //createComponent后返回的是组件vnode ，它也⼀样⾛到 vm._update ⽅法，进⽽执⾏了 子组件的patch 函数
                                      //先vm._render 的作用，返回vdom(vnode)
                                          //仅创建时调用 ,创建vdom
                                           1 $createElement(/*context: Component,*/ tag, data,children)                                                                                                                                
                                      //后vm._update 方法，根据虚拟Dom 去创建或更新真实Dom
                                          //创建和更新时都]调用
                                           2 patch()// : 将差异应用到真实DOM树 显示上从{{value}} 变为 实际值6
                                              //patch = createPatchFunction(){
                                              //                   updateDOMListeners  //注册元素的事件: 事件在编译阶段就搞到vnode.data.on里面了，updateDOMListeners在vnode.data.on里面取事件去添加事件监听
                                                                 return patch(1createElm(2createComponent(3调用了installComponentHooks里的init钩子
                                                                                     (4child=createComponentInstanceForVnode(5执行Vue构造器)5、执行child.$mount)4 )3 )2
                                                                                、registerRef()
                                                                                、patchVnode()//diff算法,更新时才被调用对比新旧两个虚拟树的区别，收集差异  
                                                                                )1                 
                                              //                             }
                                              //1createElm的作⽤是通过虚拟节点创建真实的 DOM 并插⼊到它的⽗节点中。2createComponent返回是普通元素还是是普通vnode,是vnode执行钩子递归遍历子组件并且插入到dom
                                                          
                                               
                                                     }, 
                             noop, 
                             {before: function before (){
                                                         if (vm._isMounted && !vm._isDestroyed)  callHook(vm, 'beforeUpdate')
                                                         //定义'beforeUpdate',并没有调用,所以第一次实例化组件不会被调用}}, 
                             true /* isRenderWatcher */
                             )                                                  
            3. callHook(vm, 'mounted');  
         }    
    }                      
```





```javascript
new Vue时不会执行,但更新渲染时会执行: 
    wathcer.update(){callHook(vm, 'updated')}    
1. 'beforeUpdate'和 'updated'在第一次实例化时都不会被调用,他们都由事件触发
2. 'beforeUpdate'和 'updated'之间还有 'activated'/*keep-alive 组件激活时调用*/ 'deactivated'

/派发更新, vue从data改变到页面渲染的过程/
 1--> vueValue.setter 
     --> dep.notify() //触发setter时dep会notify所有的subs(wathcer)
 2--> wathcer.update(){
             if(computed)
             else
             3--> queueWatcher(this){
                         has[id] = true;//用于判断重复watcher的数量
                         queue.push(watcher)
                         //用nextTick排队, 下一个的事件循环“tick” ,在下一个事件循环执行watcher,更新ui
                         nextTick(【flushSchedulerQueue方法】){                                                         
                                         callbacks.push(【flushSchedulerQueue方法】) //callbacks推入一个个【flushSchedulerQueue方法】, 去被flushCallbacks拿出来执行                                                         
                                         //没有pending的话: 
                                         timerFunc(){
                                                //timerFunc的最常用的一种实现:
                                                Promise.resolve().then(flushCallbacks(){    
                                                                             //遍历callbacks，执行所有callback即【flushSchedulerQueue方法】                                                                             
                                                                               执行 【flushSchedulerQueue方法】() {
                                                                                         /对频繁重复的事件进行合并或去重,并运行watcher/ 
                                                                                         watcher = queue[index]
                                                                                         watcher.before();///调用到一开始定义的'beforeUpdate'
                                                                                         has[id] = null;//用于判断重复watcher的数量
                                                                                         watcher.run(){
                                                                                             watcher.get(){ updateComponent();//具体流程看上面  }
                                                                                         }
                                                                                        // has[id] != null的话, 增加重复的watcher的数量标记,超过限定值可能是在watch里修改了了它自己,自己又触发了更新自己,就要报错
                                                                                 }
                                                                                 callHook(vm, 'updated')}  //先调用'activated'/'deactivated'
                                                                             }
                                                                        );
```



```javascript
new Vue({render: (h, context) => h(App),}).$mount('#app')

h('span', {
        staticClass: 'jb-breadcrumb-back',
        on: {click: () => {this.$emit('on-last');},},
        props: this.$attrs,
        attrs: {'tippy-tips': '返回上一级',},
        style: {cursor: 'pointer',},
}, ['..内容', h(/*可以是另一个h函数*/)]);

computed //本质是lazy watcher
    //1一次 定义,调用new Vue时
        vm.$createElement (vue.runtime.esm.js?2b0e:3515)
        createElement (vue.runtime.esm.js?2b0e:3374)
        _createElement (vue.runtime.esm.js?2b0e:3455)
        createComponent (vue.runtime.esm.js?2b0e:3203)
        Vue.extend (vue.runtime.esm.js?2b0e:5186)
        initComputed$1 (vue.runtime.esm.js?2b0e:5227)
        defineComputed (vue.runtime.esm.js?2b0e:4823)
        createComputedGetter (vue.runtime.esm.js?2b0e:4847)//lazy为true,决定初始化时先不求值(在渲染时求值), 初始化dirty也被设true(用来作为只执行一次的flag,缓存computed结果用)
            Object.defineProperty(target, key, computedGetter);
    //1一次 定义,_调用App.vue时,isComponent: true
        initState (vue.runtime.esm.js?2b0e:4659)
        initComputed (vue.runtime.esm.js?2b0e:4790) 
        Watcher (vue.runtime.esm.js?2b0e:4457) //定义了wathcer.getter是computed定义的回调函数, new Watcher(vm, expOrFn = ƒ bbb(), cb = ƒ noop, options:{lazy: true});
    //2多次 渲染时求值,依赖收集
        render (App.vue?7c02:6)
        代理的get (vue.runtime.esm.js?2b0e:2081)
        computedGetter (vue.runtime.esm.js?2b0e:4851)//computedGetter里执行评估
        evaluate (vue.runtime.esm.js?2b0e:4597)//computedGetter里dirty为true时会执行watcher.evaluate(),evaluate中执行了get,然后dirty被设false,如此只执行了一次计算值,之后从缓存里拿
        get (vue.runtime.esm.js?2b0e:4511) //调用了wathcer.getter即computed定义的回调函数
     //3多次 defineProperty的setter,派发更新
        reactiveSetter (vue.runtime.esm.js?2b0e:1055)
        notify (vue.runtime.esm.js?2b0e:730)
        update (vue.runtime.esm.js?2b0e:4560)
        queueWatcher (vue.runtime.esm.js?2b0e:4418)
        nextTick (vue.runtime.esm.js?2b0e:1999)
        timerFunc (vue.runtime.esm.js?2b0e:1942)
        Promise.then (async)
        flushCallbacks (vue.runtime.esm.js?2b0e:1915)
        (anonymous) (vue.runtime.esm.js?2b0e:1989)
        flushSchedulerQueue (vue.runtime.esm.js?2b0e:)
        run (vue.runtime.esm.js?2b0e:4570)
        get (vue.runtime.esm.js?2b0e:4495)
            //watcher.getter是updateComponent 
            updateComponent (vue.runtime.esm.js?2b0e:4081)
            Vue._render (vue.runtime.esm.js?2b0e:3569)
            //触发2渲染时求值
            render (App.vue?7c02:6)
            代理的get (vue.runtime.esm.js?2b0e:2081)
            computedGetter (vue.runtime.esm.js?2b0e:4851)
            evaluate (vue.runtime.esm.js?2b0e:4597)
            get (vue.runtime.esm.js?2b0e:4511)


watcher//本质是user watcher
    //1定义,_调用App.vue时,isComponent: true
        initState (vue.runtime.esm.js?2b0e:4661)
        initWatch (vue.runtime.esm.js?2b0e:4903)
        createWatcher (vue.runtime.esm.js?2b0e:4921)
        Vue.$watch (vue.runtime.esm.js?2b0e:4961)
        Watcher (vue.runtime.esm.js?2b0e:4457) //定义了wathcer.cb是watch定义的回调函数, new Watcher(vm, expOrFn:"aaa", cb: ƒ aaa(), options:{user: true});
    //2defineProperty的setter,派发更新
        reactiveSetter (vue.runtime.esm.js?2b0e:1055) 
        notify (vue.runtime.esm.js?2b0e:730)
        update (vue.runtime.esm.js?2b0e:4560)
        queueWatcher (vue.runtime.esm.js?2b0e:4418)
        nextTick (vue.runtime.esm.js?2b0e:1999)
        timerFunc (vue.runtime.esm.js?2b0e:1942)
        Promise.then (async)
        flushCallbacks (vue.runtime.esm.js?2b0e:1915)
        (anonymous) (vue.runtime.esm.js?2b0e:1989)
        flushSchedulerQueue (vue.runtime.esm.js?2b0e)
        run (vue.runtime.esm.js?2b0e:4570)
            get (vue.runtime.esm.js?2b0e:4511)//watcher.getter = parsePath(expOrFn);是访问xxx.xx的每一个值的方法
            if (this.user) invokeWithErrorHandling(watcher.cb, this.vm, [value, oldValue], this.vm, info);////调用了wathcer.cb即watch定义的回调函数
```



```javascript
Diff算法//假设是最常见的收尾插入或排序

为什么要diff?
    一个组件对应一个watcher,无法知道确切变化,所以需要diff算法找出变化
特点    
    /深度优先,同层比较/
patch (vue.runtime.esm.js?2b0e:6526) 重点
    被递归的patchVnode (vue.runtime.esm.js?2b0e:6363)//diff算法所在
    // 1获取两个节点的孩子节点数组
    // 2无脑属性更新 vue3的主要优化在这
        prepatch (vue.runtime.esm.js?2b0e:3144)//有钩子的话执行prepatch钩子,这钩子占位符vnode才有
            updateChildComponent (vue.runtime.esm.js?2b0e:4172)   
   // 3内部比较,新节点没文本，有孩子     
        updateChildren (vue.runtime.esm.js?2b0e:6260),/对子元素同样递归patchVnode/
            新旧vnode首尾4个游标:
                // 游标调整(4个重点)
                // 1.两个开头比较
                // 2.两个结尾
                // 3.旧开头和新结尾
                // 4.旧结尾和新开头
                // 头尾比较没有找到相同的, 则从新的开头拿一个，然后去老数组中一个一个查找
                    // 在老中没找到，就创建
                    createElm (vue.runtime.esm.js?2b0e:5999)//情况1  
                    // 在老中找到了, 先patch, 再移动到队首                
                // 新的多孩子, 就批量新增
                // 老的多孩子，批量删除
    // 4文本节点更新
    
//文本和children是互斥的,如果有文本说明是文本节点,一定没孩子
不用key的话,会判断为sameVnode,会增加没必要的更新
```

