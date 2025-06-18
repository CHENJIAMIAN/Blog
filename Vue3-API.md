*   `VueElement`: 这是 Vue 3.5 中引入的一个重要概念，它允许你将 Vue 组件定义为标准的 Web Components（自定义元素）。这意味着你可以像使用普通 HTML 标签一样使用你的 Vue 组件，甚至在非 Vue 项目中使用它们。
### 创建和管理 Vue 应用
*   `createApp`:  这是创建 Vue 应用实例的入口。你可以把它想象成 Vue 世界的“启动按钮”。
    ```typescript
    import { createApp } from 'vue';
    import App from './App.vue';
    const app = createApp(App);
    app.mount('#app'); // 将应用挂载到 HTML 中的 <div id="app"></div>
    ```
*   `createSSRApp`: 用于创建服务器端渲染 (SSR) 的 Vue 应用实例。SSR 可以提高首屏加载速度和 SEO 效果。
*   `createRenderer`:  这是一个底层 API，用于创建自定义渲染器。通常情况下你不需要直接使用它，除非你要构建一个针对特定平台（如 Canvas、终端等）的 Vue 渲染器。
*    `createHydrationRenderer`: 创建一个 hydration 渲染器, 主要用于服务器端渲染 (SSR)
### 虚拟 DOM 操作 (VNode)
*   `createVNode` (别名 `createElementVNode`):  这是创建 VNode 的核心函数。VNode 是 Vue 对真实 DOM 的一个轻量级描述。
    ```typescript
    import { createVNode, h } from 'vue';
    // 使用 h 函数（更简洁的写法）
    const vnode1 = h('div', { class: 'container' }, 'Hello');
    // 使用 createVNode
    const vnode2 = createVNode('div', { class: 'container' }, 'Hello');
    ```

```ts
*   `createBlock`: 用于创建块级 VNode。块可以优化更新性能，尤其是在列表中。
*   `createElementBlock`: 创建一个元素块 VNode
*   `createCommentVNode`: 创建注释 VNode。
*   `createTextVNode`: 创建文本 VNode。
*   `createStaticVNode`: 创建静态 VNode。静态 VNode 的内容不会改变，Vue 会对其进行优化。
*   `cloneVNode`: 克隆一个已有的 VNode。
*   `normalizeClass`: 规范化 class 属性，可以将字符串、数组、对象等形式的 class 统一处理。
*   `normalizeStyle`: 规范化 style 属性，处理内联样式的不同写法。
*   `normalizeProps`: 规范化 props, 处理props的不同写法
*   `transformVNodeArgs`: 转换 VNode 参数
*   `openBlock`: 开始记录一个动态块
*   `setBlockTracking`: 设置动态块追踪
*   `toDisplayString`: 将值转换为字符串以显示在模板中, 会处理null, undefined等情况
*   `renderList`: 这是一个内部帮助函数, 用于循环渲染
```
*   `withDirectives`: 给 VNode 添加自定义指令.
```vue
	<script>
		import {h, withDirectives, vShow} from 'vue'
		export default {
			render(){
				return withDirectives(h('div'),[[vShow, this.ok]])
			}
		}
	</script>
```
### 组件相关
*   `defineComponent`:  这是定义 Vue 组件的主要方式，它提供了类型推断和更好的 IDE 支持。
    ```typescript
    import { defineComponent } from 'vue';
    export default defineComponent({
      name: 'MyComponent',
      props: {
        message: String,
      },
      setup(props) {
        // 组件的逻辑
        return {
          // ...
        };
      },
    });
    ```
*   `defineAsyncComponent`: 定义异步组件。异步组件会在需要时才被加载，这可以优化初始加载时间。
    ```typescript
    import { defineAsyncComponent } from 'vue';
    const AsyncComponent = defineAsyncComponent(() =>
      import('./AsyncComponent.vue')
    );
    ```
* `resolveComponent`:  在模板中动态解析组件。
* `resolveDirective`: 动态解析指令。
*  `resolveDynamicComponent`: 解析动态组件
*  `resolveFilter`: 解析过滤器（Vue 3 中已移除过滤器，但为了兼容性保留）
*  `withCtx`: 内部使用的, 用来绑定渲染函数的作用域
### 响应式系统 (Reactivity)
```ts
*   `ref`:  创建一个响应式引用。它通常用于包装基本类型数据（如数字、字符串、布尔值）。
*   `computed`:  创建一个计算属性。计算属性的值会根据其依赖的响应式数据自动更新。
*   `reactive`:  创建一个响应式对象。对象的所有属性（包括嵌套属性）都是响应式的。
*   `readonly`:  创建一个只读的响应式对象或引用。
*   `shallowRef`:  创建一个浅层 ref。只有 `.value` 的变化是响应式的，内部属性的变化不会触发更新。
*   `shallowReactive`: 创建一个浅层响应式对象。只有对象的第一层属性是响应式的。
*   `shallowReadonly`:  创建一个浅层只读的响应式对象。
*   `isRef`:  检查一个值是否是 ref 对象。
*   `isReactive`:  检查一个对象是否是 reactive 对象。
*   `isReadonly`: 检查一个对象是否是只读的。
*   `isShallow`: 检查一个对象是否是 shallow 创建的
*   `isProxy`: 检查一个对象是否是由 `reactive` 或 `readonly` 创建的代理。
*   `unref`:  如果参数是 ref，则返回内部值，否则返回参数本身。
*   `toRef`:  将响应式对象的一个属性转换为 ref。
*   `toRefs`:  将响应式对象转换为一个普通对象，其中每个属性都是对应的 ref。
*   `toValue`: 将 ref 或 getter 转换为值
*   `proxyRefs`:  对包含 ref 的对象进行浅层解包，使得访问属性时不需要 `.value`。
*   `markRaw`:  标记一个对象，使其永远不会成为响应式对象。
*   `triggerRef`: 手动触发与 shallowRef 关联的副作用
*   `customRef`:  创建一个自定义的 ref，可以完全控制其依赖收集和触发更新的行为。
```
*   `effect`: 运行一个副作用函数, 并在其使用的响应式数据变化时重新运行
    ```ts
    import { ref, effect } from 'vue'
    const count = ref(0)
    effect(()=>{
        console.log(count.value)
    })
    count.value++ // 打印 1
    ```

```ts
*  `EffectScope`: 这是一个底层 API, 用于管理和停止响应式副作用 (如 `effect`, `computed`)
*  `effectScope`: 创建一个 effect 作用域, 可以捕获其中创建的响应式 effect
*  `getCurrentScope`: 获取当前的 effect 作用域
*  `onScopeDispose`: 在当前 effect 作用域停止时注册一个回调
*  `stop`: 停止响应式 effect
*  `ReactiveEffect`: 响应式Effect类
*  `TrackOpTypes`: track 操作类型
*  `TriggerOpTypes`:  trigger 操作类型
*  `getCurrentWatcher`: 获得当前 watcher
```

#### 生命周期钩子

```ts
*   `onMounted`:  组件挂载到 DOM 后调用。
*   `onUpdated`:  组件更新后调用。
*   `onUnmounted`:  组件卸载前调用。
*   `onBeforeMount`:  组件挂载前调用。
*   `onBeforeUpdate`:  组件更新前调用。
*   `onBeforeUnmount`: 组件卸载前调用。
```

*   `onErrorCaptured`:  捕获子组件树中的错误。
*   `onRenderTracked`:  调试钩子，当响应式依赖被组件的渲染函数追踪时调用。
*   `onRenderTriggered`: 调试钩子，当响应式依赖触发组件重新渲染时调用。

```ts
*   `onActivated`:  被 `<keep-alive>` 缓存的组件激活时调用。
*   `onDeactivated`:  被 `<keep-alive>` 缓存的组件停用时调用。
```

*   `onServerPrefetch`:  在服务器端渲染期间，组件被渲染前调用。
*  `onWatcherCleanup`: 注册一个清理函数, 在 watcher 停止时调用
### 依赖注入 (Provide/Inject)
*   `provide`:  在祖先组件中提供数据。
*   `inject`:  在后代组件中注入数据。
*   `hasInjectionContext`: 判断是否有注入上下文
### 内置组件
1.   `Fragment`:  允许你在不添加额外 DOM 节点的情况下，将多个元素组合在一起。
2.   `KeepAlive`:  缓存组件实例，避免重复渲染。常用于标签页、列表等场景。
3.   `Suspense`:  处理异步组件的加载状态，显示 loading 或 fallback 内容。
4.   `Teleport`:  将组件的内容渲染到 DOM 树的其他位置，常用于创建模态框、弹出层等。
5.   `Transition`:  为组件的进入和离开添加动画效果。
6.   `TransitionGroup`:  为列表的进入和离开添加动画效果。
7.   `BaseTransition`: 基础 transition 组件
8.   `BaseTransitionPropsValidators`: 基础 transition 组件的 props 验证器
9. `getTransitionRawChildren`: 得到 transition 组件的原始子元素
10.  `resolveTransitionHooks`: 解析 transition 钩子函数
11.  `setTransitionHooks`: 设置 transition 钩子函数
12.  `useTransitionState`: 使用 transition 状态
### 自定义指令
*   `vModelCheckbox`, `vModelRadio`, `vModelText`, `vModelSelect`, `vModelDynamic`:  这些是内置的 `v-model` 指令的不同变体，用于处理不同的表单元素。
*   `vShow`:  根据条件控制元素的显示/隐藏（通过 CSS 的 `display` 属性）。
    ```vue
    <!-- 使用自定义指令 -->
    <div v-my-directive="someValue"></div>
    ```
### 工具函数和辅助方法
*   `h`:  这是 `createVNode` 的一个别名，通常用于编写渲染函数 (render function)。
*   `withKeys`:  为键盘事件添加按键修饰符。
    ```vue
    <input @keyup="onKeyup">
    <script>
    import { withKeys } from 'vue'
    export default {
      setup() {
        const onKeyup = withKeys((event) => {
          // 只有在按下 Enter 键时才会触发
        }, ['enter'])
        return {
          onKeyup
        }
      }
    }
    </script>
    ```
*   `withModifiers`:  为事件添加修饰符（如 `.prevent`, `.stop`）。
    ```vue
    <button @click="onClick">Click me</button>
    <script>
    import { withModifiers } from 'vue'
    export default {
      setup() {
        const onClick = withModifiers(() => {
          // 阻止默认行为和事件冒泡
        }, ['prevent', 'stop'])
        return {
          onClick
        }
      }
    }
    </script>
    ```

```js
*  `withMemo`: 内部使用的, 用于缓存 VNode
* `camelize`:  将连字符分隔的字符串转换为驼峰式。
*   `capitalize`:  将字符串的首字母大写。
*   `toHandlerKey`:  将事件名转换为事件处理函数名（例如，`click` 转换为 `onClick`）。
*  `toHandlers`: 将事件对象转换为事件处理函数对象
*   `mergeProps`:  合并多个 props 对象。
*  `mergeDefaults`: 合并默认值
*   `mergeModels`:  合并 model
*  `createSlots`: 创建插槽
*  `renderSlot`: 渲染插槽内容
*  `setDevtoolsHook`: 设置 Devtools 钩子
*   `devtools`: Devtools 相关 API
*  `guardReactiveProps`: 保护响应式 props
*  `initCustomFormatter`: 初始化自定义格式化器
*  `initDirectivesForSSR`: 为 SSR 初始化指令
*  `nextTick`:  在下次 DOM 更新循环之后执行回调。
*  `queuePostFlushCb`:  将回调函数添加到 post-flush 队列中。
*  `warn`:  发出警告信息。
*  `callWithAsyncErrorHandling`: 调用函数并处理异步错误
*  `callWithErrorHandling`: 调用函数并处理错误
*  `ErrorCodes`: 错误代码
*  `ErrorTypeStrings`: 错误类型字符串
*  `DeprecationTypes`:  弃用类型
*  `assertNumber`: 断言是否为数字
*  `ssrContextKey`:  SSR 上下文的 key
*  `ssrUtils`:  SSR 工具函数
*  `useHost`: 使用 host 元素
*  `useId`: 使用唯一的 ID
*  `useAttrs`: 使用 attrs
*  `useCssModule`:  使用 CSS 模块。
*  `useCssVars`:  使用 CSS 变量。
*  `useModel`: 使用 v-model
*  `useSSRContext`:  使用 SSR 上下文。
*  `useShadowRoot`:  使用 Shadow Root。
*  `useSlots`:  使用插槽。
*  `useTemplateRef`:  使用模板引用。
*  `compatUtils`: 兼容性工具函数
*  `createPropsRestProxy`: 创建 props 的剩余代理
*  `defineEmits`:  定义 emits
*  `defineExpose`:  定义 expose
*  `defineModel`: 定义模型, 用于自定义组件的双向绑定
*  `defineOptions`: 定义选项
*  `defineProps`: 定义 props
*  `defineSlots`: 定义插槽
*  `pushScopeId`:  添加作用域 ID。
*  `popScopeId`: 移除作用域 ID。
*  `withScopeId`:  为 CSS 添加作用域 ID。
*  `compile`:  将模板编译为渲染函数, 运行时编译
*  `registerRuntimeCompiler`: 注册运行时编译器
*  `isRuntimeOnly`: 判断是否是仅运行时版本
*  `hydrate`:  在 SSR 期间，将服务器渲染的 HTML 与客户端的 Vue 应用进行“激活”（hydrate）。
*  `hydrateOnIdle`: 在空闲时进行 hydrate
*  `hydrateOnInteraction`: 在交互时进行 hydrate
*  `hydrateOnMediaQuery`: 在媒体查询匹配时进行 hydrate
*  `hydrateOnVisible`: 在元素可见时进行 hydrate
*  `defineCustomElement`: 定义自定义元素（Web Component）。
*  `defineSSRCustomElement`: 定义服务器端渲染的自定义元素。
*  `isMemoSame`: 比较 memo 是否相同
*  `withAsyncContext`: 包装异步上下文
```
