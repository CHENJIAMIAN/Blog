```javascript
umi //企业级react应用框架,类似Next.js
    //dva作为umi插件, 底层引入了redux-sagas做异步流程控制，内置了 react-router('dva/router')  
    启动过程
           umi dev -> bin/umi.js -> lib/cli -> forkedDev.ts -> Service继承自CoreService，是对CoreService二次封装。它的核心代码在ServiceWithBuiltIn.ts文件中
           -> 进程启动需要两步：1、实例化Service，2、调用Service的run方法 -> runCommand -> api.registerCommand({  name: 'dev'...}) -> 
             // 调用实例化后的 bundler 的 setupDevServerOpts 方法，这个方法做了如下几件事：   
                 // 1. 调用webpack方法，获取webpack的编译器实例 compiler   
                 // 2. 编译器实例 compiler 通过 webpack-dev-middleware 封装器，将webpack处理过的文件封装成 server 能接收的格式   
                 // 3. 通过调用 sockjs 的 sockWrite 方法，实现热更新   
                 // 4. 处理服务类 Server 实例化时需要的 onListening 和 onConnection 函数
           //umi内置的核心插件都通过插件集@umijs/preset-built-in注入
    模板html//\@umijs\core\lib\Html\Html.js
            //\@umijs\server\lib\Server\Server.js -> proxyMiddleware
            ///@umijs/preset-built-in/lib/plugins/commands/dev/createRouteMiddleware.js-> sendHtml
            //getGetContent-> let html = render(tpl, context, { ...filename: 'document.ejs' });
            
enquire.js //是一个轻量级的纯JavaScript库，用于响应CSS媒体查询。

SSR获取window:  if (typeof window !== 'undefined') {window}

SLOT插槽:
    this.props.children//默认slot是组件包含的内容


合成事件//统一委托到根元素
    onClick={  (e) => this.deleteRow(id, e)   }

受不受react控制
    /受控组件/, // state是组件的唯一数据源, 即表单值是由 React 组件监听onChange来存到state的
    非受控组件 //用ref控制,可以减少代码量时, 直接ref.current.value获取表单值

Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。
Fragments 组件:用来包裹多个组件,封装成一个,方便引用

```
### 组件 hook
```js
组件
    类组件
    函数组件//颗粒度更小,逻辑复用
            useEffect(() => {
                //相当于componentDidMount、componentDidUpdate
                const timer = setInterval(() => {
                  setDate(new Date());
                }, 1000);
                return () => clearInterval(timer);//相当于componentWillUnmount
            }, []/*依赖项们, 空的话useEffect只执行一次*/);
                //每个async函数都会默认返回一个隐式的promise。但是，useEffect不应该返回任何内容,所以useEffect(async () => …) 是不允许的
            
setState({k:v}) ,/在 setTimeout 和 native事件 中使用是同步的, 其他地方使用如合成事件中 是异步的,更新会合并/
setState(preState=>{return obj},回调) //非合并非批量更新

纯组件//无shouldComponentUpdate,内部自动shouldComponentUpdate, "浅比较"只比较了对象第一层
    /性能优化/
    
hook  //Hook 不能在 class 组件中使用
    useState
      //定义一个叫count的state变量，初始化为0
      const [count, setCount] = useState(0);
    useEffect//相当于componentDidMount、componentDidUpdate
        /在组件渲染到屏幕后延迟执行,用来完成副作用操作/
        //渲染时的数据获取、订阅或者手动修改过 DOM。这些操作称为“副作用”/“作用”
    useLayoutEffect,/跟useEffect的区别是它不延迟执行,在DOM变更后同步调用/
    
    缓存参数:value = useMemo(回调,[依赖项])//只有依赖项改变时才执行,防止其他无关变量变动时, 它也跟着傻傻重算
         React.memo(组件,可选比较函数)//跟useMemo一样可以用来对函数式组件进行性能优化, 即使没有比较参数那也是"浅比较"
            
    缓存函数:func = useCallback(比如包一个onChange监听器函数,[依赖项])
        //配合纯组件(例如shouldComponentUpdate使用引用相等性去避免非必要渲染)
        //隔壁组件或组件内部的某个属性改变造成重新渲染时,函数也会重新初始化,那函数引用就变了,又造成重新渲染,如此形成死循环, 如果把方法包起来作为prop再传给子组件, 就能避免子组件动不动就重新渲染
    
    use自定义//只能在最外层使用,只有函数式组件可用? 对比普通函数可以引起重新渲染
    
    useContext
        声明
            const ThemeContext = React.createContext({ foreground: "#000000",    background: "#eeeeee"  })
        用法1
            <ThemeContext.Provider value={themes.dark}>
              <Toolbar />
            </ThemeContext.Provider>
        用法2
            const theme = useContext(ThemeContext);
        
```
### 跨组件通信
```js
高阶组件HOC//传入组件, 返回组件的函数
    装饰器写法
    /不要在render里使用HOC,性能差/
    
- React Context 更适合于管理简单的数据，例如应用程序主题、用户认证信息等。expand_more
- Redux 更适合于管理复杂的数据，例如购物车中的商品、表单数据等。

跨组件通信传值context//穿透进去
    父创建:
        //用const context = React.createContext(); 
        //用<context.Provider>包起来 
    子获取值的方式:
        1.Class.contextType 会被重新赋值为由React.createContext()创建的对象去赋值给this.context
        2.Context.Consumer包裹
                  <UserConsumer>
                    {userContext => <Child {...userContext} />}
                  </UserConsumer>
        3.const store = useContext(context)
    

ref
    //   formRef = React.createRef();
    //   ref={this.formRef}
    const formRef = useRef(null);   
    
    React.clone(老元素,新属性对象,新儿子)

    React.useImperativeHandle(ref, () => formInstance);//在使用 ref 时自定义暴露给父组件的实例值
    const Form = React.forwardRef(_Form);//转发ref到函数组件(本来不支持的),而非实例值,实例值要用useImperativeHandle

createPortal(jsx,要附加的节点)//插入dom到指定节点下
```
### 性能
```js
fiber//小任务们
    大组件树解析阻塞->拆分任务->requestIdleCallback里根据优先级执行->更流畅
    fiber
        child 第一个子fiber
        sibling 第一个子fiber的其他兄弟
        return 父fiber
        
性能 //减少计算,减少渲染
    shouldComponentUpdate
    PureComponent//对 props 和 state 进行浅比较
    useMemo
    不要使用内联属性/函数   
    
无状态组件
    export default (props)=><div>{props.name}</div>
```

### 样板
```javascript
import * as React from 'react';
import classNames from 'classnames';

className=classNames(
    {
      class2: false,
      class1: true,
    },
  )
  
function 组件({children}) {}
```

### 生命周期(重点)
#### 生命周期函数的最佳实践
1. **尽量避免在 Render Phase 生命周期函数中进行副作用操作**：
   - **不要在 `render`, `constructor`, `getDerivedStateFromProps`, `shouldComponentUpdate` 中执行副作用**。这些函数可能会在调和过程（包括调和的多次尝试）中被多次调用。
2. **把副作用操作放到 Commit Phase 生命周期函数中**：
   - 使用 `componentDidMount` 和 `componentDidUpdate` 来执行副作用，例如数据获取、DOM 操作等。这样可以确保这些副作用只在 DOM 确定更新后运行。
3. **特别注意 `shouldComponentUpdate`**：
   - `shouldComponentUpdate` 用于性能优化，返回 `false` 可以阻止不必要的渲染。它不会阻止子组件的生命周期调用，所以要谨慎使用。
4. **使用 `getSnapshotBeforeUpdate` 处理 DOM 读取**（仅用于类组件）：
   - 如果需要在 DOM 更新前进行读取操作，可以使用 `getSnapshotBeforeUpdate`，它是在 DOM 更新前的最后一次机会进行读取操作。
```javascript
UNSAFE_开头表示v17可能会废弃它,以为fiber可以中断,造成willXXX可能被执行多次

挂载 //当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
        static defaultProps={msg:'1'};
            //这一般用于 props 未赋值，但又不能为 null的情况
        static contextTypes = ThemeContext;//注入this.context
            //声明有const ThemeContext = React.createContext({ foreground: "#000000",    background: "#eeeeee"  })
           //之后即可通过 const {foreground.background} = this.context;获取
        static propTypes={msg:PropTypes.string /*或PropTypes.string.isRequired*/};
            //先import PropTypes from 'prop-types';
            
        
        constructor()//初始化state | 方法绑定
            /因为Reconciliation(diff)阶段是可以被打断的，所以Reconciliation(diff)阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起Bug。/
            /所以对于Reconciliation(diff)阶段调用的几个函数，除了shouldComponentUpdate以外，其他都应该避免去使用/
            (V17)static getDerivedStateFromProps(props,state) 在新版本用来替代UNSAFE_componentWillReceiveProps,让组件在 props 变化时更新 state
        
        UNSAFE_componentWillMount()   //UNSAFE_开头表示v17可能会废弃它,可以用命令自动加
            
        render() ,/唯一必须实现!!/
        componentDidMount()  //在这使用setState //所以在最好在这Ajax,因为获得数据后可以setState
        //错误处理 
                //static getDerivedStateFromError()
                //componentDidCatch()
            
更新 //当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
        UNSAFE_componentWillReceiveProps(nextProps)//在这使用setState //UNSAFE_开头表示v17可能会废弃它
            
            (V17)static getDerivedStateFromProps(props, state) 在新版本用来替代UNSAFE_componentWillReceiveProps,让组件在 props 变化时更新 state
                return stateObj || null//它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
        
        shouldComponentUpdate(nextProps,nextState)  return bool
        /用来性能优化/
        
        UNSAFE_componentWillUpdate() //UNSAFE_开头表示v17可能会废弃它
            
        render() ,/唯一必须实现!!/
        
        (V17)getSnapshotBeforeUpdate(preProps,preState) 在新版本用来替代UNSAFE_componentWillUpdate
            return stateObj || null //返回作为参数给componentDidUpdate
        
        componentDidUpdate(preProps,preState,/snapshot/)
        
卸载  //当组件从 DOM 中移除时会调用如下方法：
        componentWillUnmount() 
```

在 React v16 之后，props 改变后会触发以下两个生命周期：
- **getDerivedStateFromProps**
- **shouldComponentUpdate**
一般来说，可以在 getDerivedStateFromProps 中根据新的 props 更新 state，并在 shouldComponentUpdate 中根据 state 的变化决定是否要更新组件。
**以下是一个示例：**
```js
class MyComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // 根据新的 props 更新 state
    if (nextProps.count !== prevState.count) {
      return {
        count: nextProps.count,
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 根据 state 的变化决定是否要更新组件
    return nextState.count !== this.state.count;
  }

  render() {
    // 渲染组件
    return (
      <div>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}
```

### 原生redux
```javascript
原生redux://Redux是JavaScript应用程序的可预测状态容器
    import { createStore } from "redux";
    
    //Reducer: 定义state初始化和修改规则,reducer是一个纯函数
    function counterReducer(state = 0, action) {//dispatch(action) 跳到这里来
          const { type, payload } = action;
          2.switch (action.type) {
            case "ADD":      return state + 1;
            case "MINUS":    return state - 1;
            default:         return 3.state;
          }
              //不可变的set方法仅设置立即属性，即对象的直接子代。 setIn让您设置数据中任何深度节点的值。 
              //set仅采用属性名称。 setIn使用键/索引数组来深入嵌套的元素
    }
    
    const store = createStore(counterReducer,可选applyMiddleware(中间件thunk,中间件logger));
    export default store;
    
    //类的使用:
        import store from "../store/";
        export default class ReduxPage extends Component {
          componentDidMount() {
             4.store.subscribe(() => this.forceUpdate() });
          }
          render() {
            return (
              <div>
                <p>{store.getState()}</p>
                <button onClick={() => 1.store.dispatch({ type: "ADD",payload:'内容' })}>add</button>
              </div>
            );
          }
        }
    //函数式组件的使用:
          const [state, dispatch] = useReducer(counterReducer, "0", 这里可以处理一下初始值"0");

```
### react-redux
```js
react-redux: //使用 React Redux，你的组件永远不会直接访问store
    //把Provider放在根组件外层，使子组件能获得store
    import { Provider } from "react-redux";
        <Provider store={store}>
            <App />
        </Provider>
    //用法1:高阶组件
        import { connect } from "react-redux";    
        class ReactReduxPage extends Component { ////还有写法2, 装饰器写法@connect
                render() {
                  const { num, dispatch, add } = this.props;
                  console.log("props", this.props);
                  return (       
                      <p>{num}</p>
                      <button onClick={add}>add</button>
                  );
                }
        }
        export default connect(   //connect返回一个高阶组件函数, 加强了组件 
          state => ({ ...state }),    //mapStateToProps 把state映射到props      
          (dispatch) => { return {    increment: () => dispatch({ type: 'INCREMENT' }),  dispatch    }} //mapDispatchToProps
          //mergeProps?: (stateProps, dispatchProps, ownProps) => Object //return value as this.props
        )(ReactReduxPage)
  //用法2: hook
        const count = useSelector(({count}) => count);
        const dispatch = useDispatch();
        
中间件saga //中间件thunk更容易形成嵌套地狱
    管理副作用//让有顺序要求的异步操作按顺序执行
        call和fork
            // call 是阻塞型调用 generator在调用结束之前不执行其他事情
            // fork是非阻塞型调用 任务在后台启动 调用者可以继续自己的流程，不用等待fork任务结束
        put/*dispatch派发*/ 
        take和takeEvery一次和持续监听
    路由守卫

中间件redux-observable//类似saga,但它是链式操作
```


### react-router
```javascript
import  { BrowserRouter as Router, HashRouter , Link, NavLink ,MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, 
useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router'; //v5

withRouter(组件)// withRouter注入 history, location, match等到props

提供了两种不同的路由：
    BrowserRouter
    HashRouter
    
<Router>
  <Link to="/">首页</Link>
  <Link to="/user">用户中心</Link>

  <Switch>//独占路由,匹配到了后面就都不管了
    <Route path="/a/:b?"/> //可匹配 /a  /a/xxx 
    <Route path="/" 
      // component={HomePage}  //会注入 history, location, match到组件的props
      // children={() => <div>children</div>}
      render={() => <div>render</div>}
    />
    <Route exact  path="/user" component={UserPage} />//exact精确匹配它一个, 不加的话, /user/a也会匹配到它
    <Route path="/product/:id" render={() => <Product />} />//动态路由,match.params.id
    <Route path="/(about|who)/" component={Dashboard} />//匹配多条路径
    <Route component={EmptyPage} /> //无论怎么样都会匹配
  </Switch>
</Router>

Route渲染优先级: /children > component > render/ 
        //children,是path匹不匹配都会渲染的
        //内联函数不要用component, component会调用React.createElement,如果用匿名函数的话每次生成的组件type不一样,会重复卸载挂载,性能不好
```

### Next
```javascript
Next.js:
    执行 next 时,读取next.config.js的堆栈:
        '<root>\\next.config.js',
        '<root>\\node_modules\\next\\dist\\next-server\\server\\config.js',
        '<root>\\node_modules\\next\\dist\\next-server\\server\\next-server.js',
        '<root>\\node_modules\\next\\dist\\server\\next.js',
        '<root>\\node_modules\\next\\dist\\server\\lib\\start-server.js',
        '<root>\\node_modules\\next\\dist\\cli\\next-dev.js',
        '<root>\\node_modules\\next\\dist\\bin\\next'
 
    服务端堆栈:
        Home//被在打包在0.js 里      //\.next/server/0.js  该文件包含了Nav0.jsx,Content3.jsx  ,antMotionStyle.less,utils.js等等bundle                                              
            processChild                               
            resolve                                    
            render                                     
            read                                       
            renderToString                                 //node_modules/react-dom/cjs/react-dom-server\.node\.development.js                                                                                                                   
                render                                    
                renderPage                                 //node_modules/next/dist/next-server/server/render.js                                                                                                                                                                           
                getInitialProps                                      //\.next/server/static/development/pages/_document.js                                                          
                loadGetInitialProps                        //node_modules/next/dist/next-server/lib/utils.js                                                         
                renderToHTML                               //node_modules/next/dist/next-server/server/render.js                                                                                                                                                                                 

   前端堆栈:
        performSyncWorkOnRoot(循环)
             //第1次是进construct, 过程:
                 //workLoopSync->performUnitOfWork->beginWork$1->updateClassComponent->constructClassInstance->Home.jsx的constructor
             //第2次是进:render, 反过程:
                 //render->finishClassComponent->updateClassComponent->beginWork->beginWork$1->performUnitOfWork->workLoopSync
             //第3次是进componentDidMount, 反过程:
                 //componentDidMount->commitLifeCycles->commitLayoutEffects->callCallback->invokeGuardedCallbackDev
                 //->invokeGuardedCallback->commitRootImpl->unstable_runWithPriority->runWithPriority$1->commitRoot->finishSyncRender
        scheduleUpdateOnFiber	                 
        updateContainer     	                 
        unbatchedUpdates	                         
        legacyRenderSubtreeIntoContainer	         
        hydrate	                                 //react-dom.development.js:24823
            renderReactElement	                
            doRender	                        
            render	                                  //webpack:///./node_modules/next/dist/client/index.js
            requestAnimationFrame (async)		          
            displayContent      	                  //webpack:///./node_modules/next/dist/client/dev/fouc.js
            Promise.then (async)		          //webpack:///./node_modules/next/dist/client/next-dev.js
                __webpack_require__                       
                checkDeferredModules	                   
                webpackJsonpCallback	          //webpack:///webpack/bootstrap:32 
                    http://localhost:3000/_next/static/runtime/main.js?ts=1585882815943         
                
                
'pages/XXX.js'下的3个获取数据的方法的区别:
                            服务端      客户端                 执行时间
        1.getInitialProps     true        true     在渲染页面之前就会运行（服务器端）执行, 而当使用Next/Link或Next/Router切换页面时，在（客户端）执行  
          /9.3版本后被以下2个替代了且只能选1个来用!!/
            1.1getStaticProps      true        false      在build时(客户端一请求,服务端就build)就搞数据来渲染页面
            1.2getServerSideProps  true        false      在每次请求时,都用getServerSideProps返回的数据来渲染页面
        2.getStaticPaths      true        false      仅在建造时（fallback = true）//用于在使用动态路由时生成静态文件
```


### React源码
- https://p1.music.126.net/VU37zHp-6hAUfNaZbu3HRw==/109951165071751567.jpg类图
- https://juejin.cn/post/7202085514400038969#heading-23【动图+大白话🍓解析React源码】Render阶段中Fiber树的初始化与对比更新～
```javascript
jsx → React.createElement() → fiber → DOM

Fiber//即虚拟dom, 用于描述ReactElement对象在内存中的状态
    fiber1是当前的旧的
    fiber2是正在构造的新的

wip //work in progress fiber
nextUnitOfWork //将要更新的下一个fiber

reconciliation协调(也就是diff)
    //算法复杂度O(n) //每个节点都只走一遍
    render 阶段：这个阶段是可中断的，会找出所有节点的变更, 调用组件的 render 方法，`生成新的虚拟 DOM`
	    中断: 在 React 18 中引入的并发模式下，React 可能会暂停和恢复这段工作 
	   - `constructor`
	   - `static getDerivedStateFromProps`
	   - `render`
	   - `shouldComponentUpdate`
    commit 阶段：这个阶段是不可中断的，会执行所有的变更, `更新真实DOM `
	   - `componentDidMount`
	   - `componentDidUpdate`
	   - `componentWillUnmount`

render时
    createRootFiber
    scheduleUpdateOnFiber(rootFilber)
        requestIdleCallback(workLoop)//React自己实现了替代requestIdleCallback的scheduler
            //workLoop 一直取performUnitOfWork 返回的 next.sibling 或 next.return.sibling,  直到拿不到就跳出循环
            performUnitOfWork(render阶段) ||  commitRoot(commit阶段);
                updateHostComponent || updateFunctionComponent
                    reconcileChildren //diff child
```
