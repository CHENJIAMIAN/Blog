### 源码结构概览：文件目录
Vue 源码模块化程度高，每个模块都有特定的功能。熟悉源码的目录结构是读懂代码的第一步：
- **packages/vue**：Vue 入口，导出核心 API。
- **packages/reactivity**：响应式系统相关代码，实现响应式对象、`ref`、`computed` 等。
- **packages/runtime-core**：Vue 的核心运行时，负责组件渲染、虚拟 DOM、diff 算法等。
- **packages/runtime-dom**：与 DOM 相关的运行时处理，比如事件绑定和 DOM 操作。
- **packages/compiler-core**：Vue 编译器核心，处理模板的解析、优化和生成代码。
- **packages/compiler-dom**：处理 DOM 相关模板的编译。
- **packages/shared**：公共工具函数和类型定义。
---
为了能逐步掌握 Vue 的核心思想，推荐以下阅读顺序：
#### 1. 从入口文件开始  
在 `packages/vue/src/index.ts` 中，你可以找到 Vue 的核心 API 的导出，如 `createApp`、`ref`、`reactive` 等。了解这些 API 如何导入和组装是理解整体结构的关键。
#### 2. 响应式系统 (Reactivity)  
- 文件路径：`packages/reactivity`  
- 核心文件：`reactive.ts`、`effect.ts`、`ref.ts`  
- **重点关注**：
  - `reactive` 和 `ref` 的实现
  - `effect` 如何实现依赖追踪
  - `computed` 如何通过 `effect` 实现懒计算
#### 3. 运行时核心 (Runtime Core)  
- 文件路径：`packages/runtime-core`  
- 核心文件：`renderer.ts`、`component.ts`  
- **重点关注**：
  - `renderer` 如何通过虚拟 DOM 实现渲染
  - `setup` 函数如何运行以及如何与模板绑定
  - 组件更新的 diff 算法的实现
#### 4. 模板编译器 (Compiler)  
- 文件路径：`packages/compiler-core`  
- 核心文件：`parse.ts`、`transform.ts`、`codegen.ts`  
- **重点关注**：
  - 模板字符串是如何解析成 AST 的
  - 编译器如何对模板进行优化
  - 如何将 AST 转换成渲染函数
#### 5. 运行时 DOM (Runtime DOM)  
- 文件路径：`packages/runtime-dom`  
- 核心文件：`patchProp.ts`  
- **重点关注**：
  - 如何绑定事件和操作 DOM
  - 如何处理平台相关的差异
### vm在控制台打印是看不到属性的, 但是proxy的get函数自动取一些属性, 可以取到什么属性呢?
```js
var publicPropertiesMap = (
  extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => true ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => true ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => true ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => true ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
  })
);

const app = createApp(RootComponent);
	`app._context.components`
const vm = app.mount('#app');
	`vm.$`
```
### 打印子组件
```js
const subTree = vm.$.subTree;//（VNode 树）

component 属性
	用于获取子组件实例, 存储在父组件的 `subTree` 结构中
subTree 属性
	一个 VNode, 包含了该组件的所有子节点（包括元素和组件）

打印子组件vm.$.subTree.children.default()[0].children.default()[0].children.default()
```
