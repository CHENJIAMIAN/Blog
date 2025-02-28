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


---
### Scheduler

调度器主要负责管理和执行 Vue 中的各种任务（jobs），比如组件更新、watch 回调等。它通过一个队列来组织这些任务，确保它们按照正确的顺序执行。
#### 任务标志位（SchedulerJobFlags）

```typescript
export enum SchedulerJobFlags {
  QUEUED = 1 << 0,     // 1 标记任务是否已经在队列中，防止重复添加
  PRE = 1 << 1,        // 2 标记为预处理任务，优先执行
  ALLOW_RECURSE = 1 << 2,  // 4 允许任务递归触发自己（主要用于组件更新和 watch 回调）
  DISPOSED = 1 << 3,    // 8 标记任务已经被废弃，不需要执行
}
```
#### flushJobs
```typescript
1. **准备阶段**：
   - 初始化递归检测工具
   - 设置开发环境下的检查函数

2. **执行阶段**：
   - 遍历任务队列
   - 执行每个有效的任务
   - 管理任务的排队标记
   - 处理错误情况

3. **清理阶段**：
   - 清理所有任务的排队标记
   - 重置队列状态
   - 执行后置回调
   - 处理可能新增的任务
function flushJobs(seen?: CountMap) {
  // 开发环境下初始化 seen Map，用于检测递归更新
  if (__DEV__) {
    seen = seen || new Map()
  }

  // 由于 Rollup 的 tree-shaking 特性在 try-catch 中不够优化
  // 所以需要在外部定义检查函数
  const check = __DEV__
    ? (job: SchedulerJob) => checkRecursiveUpdates(seen!, job)
    : NOOP

  try {
    // 遍历任务队列
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]
      // 检查任务是否存在且未被废弃
      if (job && !(job.flags! & SchedulerJobFlags.DISPOSED)) {
        // 开发环境下检查是否存在递归更新
        if (__DEV__ && check(job)) {
          continue
        }
        // 如果允许递归，清除排队标记
        if (job.flags! & SchedulerJobFlags.ALLOW_RECURSE) {
          job.flags! &= ~SchedulerJobFlags.QUEUED
        }
        // 执行任务，并进行错误处理
        callWithErrorHandling(
          job,
          job.i,
          job.i ? ErrorCodes.COMPONENT_UPDATE : ErrorCodes.SCHEDULER,
        )
        // 如果不允许递归，清除排队标记
        if (!(job.flags! & SchedulerJobFlags.ALLOW_RECURSE)) {
          job.flags! &= ~SchedulerJobFlags.QUEUED
        }
      }
    }
  } finally {
    // 即使发生错误，也要清理所有任务的排队标记
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]
      if (job) {
        job.flags! &= ~SchedulerJobFlags.QUEUED
      }
    }

    // 重置队列状态
    flushIndex = -1
    queue.length = 0

    // 执行后置回调
    flushPostFlushCbs(seen)

    // 清空当前刷新 Promise
    currentFlushPromise = null
    
    // 如果队列中还有新任务，继续刷新
    // 这种情况可能发生在执行任务时又产生了新的任务
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen)
    }
  }
}
```
#### flushPostFlushCbs
```typescript
这个函数主要负责处理后置回调任务（post flush callbacks），典型的使用场景包括：
1. DOM 更新后需要执行的操作
2. watch 回调
3. 组件生命周期钩子等

整个处理流程是：
1. 对任务去重和排序
2. 处理可能的嵌套调用情况
3. 按顺序执行每个回调
4. 维护执行状态和标记
5. 完成后清理状态
export function flushPostFlushCbs(seen?: CountMap): void {
  // 如果有待处理的后置回调任务
  if (pendingPostFlushCbs.length) {
    // 1. 对任务进行去重和排序
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b),
    )
    // 清空待处理队列
    pendingPostFlushCbs.length = 0

    // 如果已经有活跃的后置回调队列在执行
    // 说明发生了嵌套调用，直接把任务追加到活跃队列末尾
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped)
      return
    }

    // 将去重后的任务设置为当前活跃队列
    activePostFlushCbs = deduped
    // 开发环境下初始化计数 Map（用于检测递归更新）
    if (__DEV__) {
      seen = seen || new Map()
    }

    // 遍历执行所有后置回调
    for (
      postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    ) {
      const cb = activePostFlushCbs[postFlushIndex]
      // 开发环境下检查是否存在递归更新
      if (__DEV__ && checkRecursiveUpdates(seen!, cb)) {
        continue
      }
      // 如果允许递归，清除排队标记
      if (cb.flags! & SchedulerJobFlags.ALLOW_RECURSE) {
        cb.flags! &= ~SchedulerJobFlags.QUEUED
      }
      // 如果回调没有被废弃，则执行它
      if (!(cb.flags! & SchedulerJobFlags.DISPOSED)) cb()
      // 清除排队标记
      cb.flags! &= ~SchedulerJobFlags.QUEUED
    }

    // 执行完毕，重置状态
    activePostFlushCbs = null
    postFlushIndex = 0
  }
}
```
### `render` 函数
`baseCreateRenderer` 函数中的 `render` 函数是 Vue 3 的渲染核心，负责将虚拟 DOM (vnode) 渲染到真实 DOM。以下是其主要执行流程和分支的详细分析：
#### `1. 入口判断`
```typescript
const render: RootRenderFunction = (vnode, container, namespace) => {
  if (vnode == null) {
    // 卸载逻辑
    if (container._vnode) {
      unmount(container._vnode, null, null, true);
    }
  } else {
    // 挂载或更新逻辑
    patch(container._vnode || null, vnode, container, null, null, null, namespace);
  }
  container._vnode = vnode;
  // 刷新副作用队列
  flushPreFlushCbs();
  flushPostFlushCbs();
};
```
##### `分支 1：卸载场景`
- `条件`：`vnode` 为 `null`。
- `行为`：
  - 若容器已有旧 vnode (`container._vnode`)，调用 `unmount` 卸载旧节点。
  - `unmount` 会递归卸载子节点、触发生命周期钩子（如 `onVnodeUnmounted`）、处理指令卸载逻辑。
##### `分支 2：挂载/更新场景`
- `条件`：`vnode` 非 `null`。
- `行为`：
  - 调用 `patch` 函数，传入旧 vnode (`container._vnode` 或 `null`) 和新 vnode。
  - `patch` 是核心的 Diff 算法入口，根据节点类型选择不同的处理逻辑。
#### `2. Patch 流程`
`patch` 函数根据新旧 vnode 的类型和属性，决定如何更新 DOM：
```typescript
const patch: PatchFn = (n1, n2, container, anchor, ...) => {
  if (n1 === n2) return; // 无变化
  if (n1 && !isSameVNodeType(n1, n2)) {
    // 类型不同，卸载旧节点
    unmount(n1, ...);
    n1 = null; // 标记为挂载
  }
  // 根据新节点类型处理
  switch (n2.type) {
    case Text: processText(...);
    case Comment: processCommentNode(...);
    case Static: mountStaticNode(...);
    case Fragment: processFragment(...);
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) processElement(...);
      else if (shapeFlag & ShapeFlags.COMPONENT) processComponent(...);
      else if (Teleport) Teleport.process(...);
      else if (Suspense) Suspense.process(...);
  }
};
```
##### `子流程 1：处理元素节点 (`processElement`)`
- `挂载`：调用 `mountElement`，创建 DOM 元素，处理 props、children、指令等。
- `更新`：调用 `patchElement`，对比新旧 props 和 children，更新 DOM。
##### `子流程 2：处理组件 (`processComponent`)`
- **挂载**：调用 `mountComponent`，创建组件实例，执行 setup 函数，触发 `onMounted` 钩子。
	- setupRenderEffect
		- componentUpdateFn
- `更新`：调用 `updateComponent`，判断是否需要更新，触发组件的重新渲染。
##### `子流程 3：处理 Fragment (`processFragment`)`
- 处理多个根节点，仅更新子节点，不创建父容器。
##### `子流程 4：处理文本/注释节点`
- 直接创建或更新文本/注释内容。
#### `3. 子节点 Diff 策略`
在 `patchChildren` 中，根据子节点类型选择最优 Diff 算法：
##### `策略 1：带 Key 的子节点 (`patchKeyedChildren`)`
- `双端对比`：从两端向中间遍历，跳过相同节点。
- `最长递增子序列`：对剩余节点生成最长递增子序列，最小化移动操作。
- `复杂度`：O(n) 时间复杂度。
##### `策略 2：无 Key 的子节点 (`patchUnkeyedChildren`)`
- `简单替换`：按顺序逐个对比子节点，多余节点删除或新增。
- `复杂度`：O(n) 但可能产生更多 DOM 操作。
#### `4. 生命周期与副作用`
- `挂载阶段`：触发 `onVnodeMounted`、组件的 `mounted` 钩子。
- `更新阶段`：触发 `onVnodeUpdated`、组件的 `updated` 钩子。
- `卸载阶段`：触发 `onVnodeUnmounted`、组件的 `unmounted` 钩子。
- `异步副作用`：通过 `queuePostRenderEffect` 延迟执行，确保在 DOM 更新后触发。
#### `5. 特殊组件处理`
 `Teleport`
- `行为`：将子节点渲染到目标 DOM，跨容器移动时通过 `move` 函数处理。
 `Suspense`
- `行为`：处理异步依赖，显示 fallback 内容，直到异步组件解析完成。
 `KeepAlive`
- `行为`：缓存组件实例，通过 `deactivate` 和 `activate` 控制组件休眠/激活。
#### `6. 性能优化`
- `静态节点提升`：标记静态节点 (`Static`)**在编译时标记**，避免重复渲染。
- `Block Tree`：通过 `dynamicChildren` 跟踪动态子节点 **在哪里标记?**，减少 Diff 范围。
- `Patch Flags`：标记节点变化类型（如 `CLASS`、`STYLE`）**在编译时标记**，跳过未变更的 props 检查。
#### `7. 错误处理与边界`
- `HMR`：开发环境下，热更新时跳过优化路径，确保正确替换组件。
- `DevTools`：集成开发工具钩子，支持组件树调试。
- `警告提示`：在开发模式下检测重复 Key、无效 Prop 等常见错误。
#### `总结`
`render` 函数通过灵活的 `patch` 流程和子节点 Diff 策略，高效处理各种渲染场景。结合 Vue 3 的响应式系统，确保 DOM 更新最小化，同时处理组件生命周期、指令、异步组件等复杂逻辑，是 Vue 渲染机制的核心。