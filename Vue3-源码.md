import.meta.hot = __vite__createHotContext("/src/components/layout/index.vue");
1. accept: accept(deps, callback) { if (typeof deps === 'function' || !deps) { // self-accept: hot.accept(() => {…}
2. acceptExports: acceptExports(_, callback) { acceptDeps([ownerPath], ([mod]) => {…}
3. data: （…）
4. decline: ƒ decline()
5. dispose: ƒ dispose(cb)
6. invalidate: ƒ invalidate(message)
7. on: on(event, cb) { const addToMap = (map) => {…}
8. prune: ƒ prune(cb)
9. send: ƒ send(event, data)
10. get data: ƒ data()


const app = createApp(RootComponent);
	`app._context.components`
const vm = app.mount('#app');
	`vm.$`
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
