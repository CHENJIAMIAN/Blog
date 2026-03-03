从 React 17 到 React 18，React 的变化不仅仅是新增特性，更深层次的是 **架构和渲染机制** 的重大升级，尤其是引入了“**并发渲染（Concurrent Rendering）**”这一核心理念。

下面我将从 **表面特性 → 原理 → 更底层原理 → 最底层原理** 四个层次，层层深入，剖析 React 从 17 到 18 的本质变化。

---

## 一、表面差异：React 17 vs React 18（你看到的“变化”）

| 功能/特性 | React 17 | React 18 |
| --- | --- | --- |
| 渲染模式 | 同步渲染（阻塞） | 支持并发渲染（Concurrent Rendering） |
| `createRoot` API | ❌ 不支持 | ✅ 支持（取代 `ReactDOM.render`） |
| 自动批处理（Automatic Batching） | 仅在 React 事件中批量 | ✅ 所有异步操作（如 `setTimeout`、Promise）也批量 |
| 新 Hook | 无 `useId`, `useSyncExternalStore`, `useTransition`, `useDeferredValue` | ✅ 新增多个 Hook |
| 服务端流式渲染（SSR） | 普通 SSR | 支持 **Streaming SSR + Suspense** |
| 渲染优先级 | 无显式优先级控制 | 支持任务优先级调度 |
| `Suspense` | 仅用于组件懒加载 | 可用于数据获取、内容加载等 |

---

## 二、原理层：React 18 做了什么革新？

### 核心：**并发渲染（Concurrent Rendering）**

React 18 最大的变化是引入了一个**可中断、可暂停、可恢复的渲染机制**，它不再“一口气完成渲染”，而是：

> “把渲染拆成小块，在浏览器空闲时执行，必要时可中断、可降级、可优先处理更高优先级任务。”

这使得 React 能更好地响应用户交互，提升应用流畅性。

### 关键机制：

#### 1\. **Fiber 架构的深化**

-   React 16 已经引入 Fiber（可中断的虚拟 DOM 树节点）
    
-   React 18 充分利用 Fiber 实现 **并发模式**（Concurrent Mode）
    
-   每个更新都有一个“优先级”，React 调度器（Scheduler）决定执行顺序
    

#### 2\. **任务调度（Scheduler Integration）**

-   React 18 更紧密地集成了 `scheduler` 包
    
-   使用 `scheduler.unstable_runWithPriority` 等 API 控制任务优先级
    
-   利用 `MessageChannel` 或 `requestIdleCallback` 判断浏览器空闲时间
    

#### 3\. **自动批处理（Automatic Batching）增强**

```js
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18：这两个更新会 batch 在一起（一次重渲染）
}, 1000);
```

-   以前（React 17）：timeout 中的多次更新不会自动批处理 → 两次渲染
    
-   React 18：自动批处理扩展到所有异步场景
    

**为什么能这么做？** 因为并发渲染允许 React 延迟提交（commit），积累多个更新再一起应用。

#### 4\. **支持过渡（Transitions）**

```js
import { startTransition } from 'react';

startTransition(() => {
  setSomeSlowState(data);
});
```

-   `startTransition` 将更新标记为“非紧急”
    
-   React 会优先处理用户输入等紧急更新，延迟渲染过渡内容
    
-   配合 `useTransition` 可显示 pending 状态
    

---

## 三、更底层原理：React 内部是如何实现这些的？

### 1\. **Fiber 树结构（可中断的虚拟 DOM）**

Fiber 是 React 的“工作单元”，每个 Fiber 节点代表一个组件实例或 DOM 节点。<br>它包含：

-   `return`：父节点
    
-   `child` / `sibling`：子节点和兄弟节点
    
-   `pendingProps` / `memoizedState`：状态
    
-   `flags`：副作用标记（增删改）
    
-   `lanes`：优先级（18 的核心机制）
    

Fiber 树可以：

-   **暂停** 渲染（放弃 CPU 控制权）
    
-   **恢复** 渲染（从断点继续）
    
-   **丢弃** 低优先级任务（如用户快速输入时）
    

### 2\. **Lanes（优先级通道）机制**

-   每个更新被分配一个或多个 “Lane”（优先级通道）
    
-   高优先级 Lane（如用户输入）会抢占低优先级（如数据加载）
    
-   系统支持 31 个 Lane，形成位掩码（bitmask）
    
-   调度器根据 Lane 决定是否跳过、合并、打断当前任务
    

> 例如：用户点击按钮（高优先级）会打断一个正在渲染的 `useDeferredValue`（低优先级）。

### 3\. **双缓存 Fiber 树（Double Buffering）**

React 维护两棵 Fiber 树：

-   **Current Tree**：当前屏幕上渲染的树
    
-   **WorkInProgress Tree**：正在构建的“未来”树
    

只有当 WorkInProgress 完全构建并提交后，React 才将它切换为 Current Tree，触发 DOM 更新。

在并发模式下，WorkInProgress 构建可以**被中断、丢弃、重新开始**。

### 4\. **渲染阶段可中断（Reconciler 可中断）**

旧版 React：`render` 阶段是同步的，一旦开始不能中断，卡住整个 UI。<br>React 18：在 `render` 阶段使用循环 + `yield` 机制（基于浏览器事件循环）：

```js
while (workInProgress !== null && !shouldYield()) {
  performUnitOfWork(workInProgress);
}
```

-   `shouldYield()` 判断是否该让出 CPU（基于调度器）
    
-   浏览器空闲时继续执行
    
-   用户交互触发高优先级任务时，中断当前渲染
    

---

## 四、最底层原理：从 JavaScript 到浏览器的协作机制

### 1\. **JavaScript 单线程与事件循环（Event Loop）**

-   JS 是单线程的，一次只能做一件事
    
-   浏览器每帧（~16.6ms）需要完成：输入事件 → JS → 样式 → 布局 → 绘制
    
-   长任务会阻塞主线程 → 卡顿、掉帧
    

React 18 的并发机制本质是：

> “把长任务拆成多个微任务，利用事件循环空闲时间执行，避免阻塞渲染”

### 2\. **利用 Scheduler 进行时间切片（Time Slicing）**

React 自研 `scheduler` 包，使用以下方式调度任务：

-   `MessageChannel`：高精度通信，比 `setTimeout(0)` 更快更准
    
-   `requestIdleCallback`：请求在浏览器空闲时执行任务（但兼容性差）
    
-   Scheduler 自己实现了一个 polyfill 版的“空闲调度”
    

```js
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = function () {
  // 执行一个工作单元
  performWorkUntilDeadline();
};

function scheduleTask(task) {
  port.postMessage(null); // 触发消息，异步执行
}
```

这就是 React 能实现“时间切片”的底层机制。

### 3\. **微任务 vs 宏任务 与 任务优先级**

React 18 将任务分为：

| 优先级 | 使用机制 |
| --- | --- |
| 紧急更新（如点击） | 同步或微任务（如 `queueMicrotask`） |
| 过渡更新（Transition） | 低优先级宏任务（scheduler） |
| 延迟更新（Deferred） | 更低优先级 |

通过控制任务进入事件循环的时机，实现“优先响应用户”。

---

## 总结：从表层到最底层的原理链条

| 层级  | 原理  |
| --- | --- |
| **表层** | React 18 支持并发渲染、自动批处理、Transitions、Suspense for Data |
| **原理** | 引入优先级调度、可中断渲染、双缓存 Fiber、自动批处理扩展 |
| **更底层** | 基于 Fiber 架构 + Lanes 优先级 + WorkInProgress + Scheduler 调度 |
| **最底层** | 利用 JavaScript 事件循环 + MessageChannel + 时间切片，实现非阻塞渲染 |

---

## 一句话总结

> React 18 的本质，是**把渲染从“同步阻塞”变成“异步可中断”**，通过 **Fiber 架构 + Lanes 优先级 + Scheduler 调度 + 浏览器空闲时间利用**，实现高性能、响应式的 UI 渲染。

这不仅仅是 API 的升级，而是 React 从“库”走向“运行时”（Runtime）的关键进化。