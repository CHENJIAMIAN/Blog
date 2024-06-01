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

const subTree = vm.$.subTree;//（VNode 树）
function findComponentByName(node, name) {
  if (node.type.name === name) {
	return node;
  }
  if (node.component && node.component.subTree) {
	return findComponentByName(node.component.subTree, name);
  }
  if (Array.isArray(node.children)) {
	for (const child of node.children) {
	  const found = findComponentByName(child, name);
	  if (found) {
		return found;
	  }
	}
  }
  return null;
}

const parentInstanceNode = findComponentByName(subTree, 'ParentComponent');
const childInstanceNode = findComponentByName(parentInstanceNode, 'ChildComponent');
const parentComponentProxy = parentInstanceNode.component.proxy;
const childComponentProxy = childInstanceNode.component.proxy;

console.log('ParentComponent proxy:', parentComponentProxy);
console.log('ChildComponent proxy:', childComponentProxy);
```
