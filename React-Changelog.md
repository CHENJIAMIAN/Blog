```markdown
> [react/CHANGELOG.md 文件位于 main 分支，由 facebook/react 维护 --- react/CHANGELOG.md at main · facebook/react](https://github.com/facebook/react/blob/main/CHANGELOG.md#all-changes)
## [18.3.1 版本（发布于 2024 年 4 月 26 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1831-april-26-2024)

- 从 React 导出操作 f1338f

## [18.3.0 版本（发布于 2024 年 4 月 25 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1830-april-25-2024)

本次发布与 18.2 版本相同，但增加了对已弃用 API 及其他为适配 React 19 所需进行的更改的警告

阅读 React 19 升级指南，获取详细信息。

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react)

- 允许向 this.refs 写入以支持字符串引用的代码修改 909071
- 警告：在严格模式外使用已废弃的 findDOMNode 功能 c3b283
- 警告：弃用已过时的 test-utils 方法 d4ea75，请更新代码
- 警告：在严格模式 415ee0 之外使用已过时的旧版Context
- 警告：在严格模式外使用已废弃的字符串引用 #25383
- 警告：函数组件的 defaultProps 属性已弃用，请注意更新代码 #25699
- 提醒：传播密钥 #25697 时请注意
- 使用 test-utils 中的 act 时请发出警告

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom)

- 警告：已弃用 unmountComponentAtNode 8a015b，请更新代码
- 警告：弃用了 renderToStaticNodeStream `28874`，请更新代码

## [18.2.0 版本（发布于 2022 年 6 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1820-june-14-2022)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-1)

- 将组件栈作为第二个参数传递给 onRecoverableError 功能。 (@gnoff 在 #24591)
- 修复将数据填充到文档中，若数据不匹配则导致出现空白页的问题。（@gnoff 在 `#24523`）
- 使用 Suspense 修复假阳性水合错误。（@gnoff 在#24480 和@acdlite 在`#24532`）
- 修复 Safari 中添加 iframe 时被忽略的 setState 问题。（@gaearon 在`#24459`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server)

- 将服务器错误信息传递给客户端。（@salazarm 和 @gnoff 在 #24551 和 `#24591`）
- 允许在终止 HTML 流时提供原因说明。（@gnoff 在#24680 中）
- 在可能的情况下，尽量从 HTML 中移除多余的文本分隔符。（@gnoff 在`#24630`）
- 禁止在<title>元素内部使用复杂子元素，以符合浏览器限制。（@gnoff 在 `#24679`）</title>
- 通过显式将 highWaterMark 设置为 0，明确修复某些工作环境中的缓冲问题。（@jplhomer 在 `#24641`）

### [服务器组件（实验性质）](https://github.com/facebook/react/blob/main/CHANGELOG.md#server-components-experimental)

- 在服务器组件内部添加对 useId()函数的支持。（@gnoff 在 `#24172`）

## [18.1.0 版本（发布于 2022 年 4 月 26 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1810-april-26-2022)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-2)

- 修复在使用 UMD 包时关于 react-dom/client 的误报警告。（@alireza-molaee 在`#24274`）
- 将 suppressHydrationWarning 修复以在生产环境中也能工作。（@gaearon 在 `#24271`）
- 修复 Suspense 组件内部 componentWillUnmount 被触发两次的问题。（@acdlite 在 `#24308`）
- 修复一些被忽略的过渡更新问题。（@acdlite 在 `#24353`）
- 修复传递未缓存值时 useDeferredValue 导致的无限循环问题。（@acdlite 在 `#24247`）
- 修复显示 Suspense 回退功能的节流问题。（@sunderls 在 `#24253`）
- 修复渲染过程中 props 对象一致性问题的处理。（@Andarist 和 @acdlite 在 `#24421`）
- 修复 useEffect 中因缺少 setState 循环警告而引起的问题。（@gaearon 在 `#24298`）
- 修复一个虚假的初始化错误。（@gnoff 在 `#24404`）
- 在 useInsertionEffect 中调用 setState 时发出警告。（@gaearon 在 `#24295`）
- 确保在水合错误发生时，始终显示其具体原因。（@gaearon 在 `#24276`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-1)

- 修复对 bootstrapScriptContent 内容的转义问题。（@gnoff 在#24385 中）
- 显著提升 renderToPipeableStream . 的性能（gnoff 在 #24291 中）

### [ESLint 插件：React `Hook`](https://github.com/facebook/react/blob/main/CHANGELOG.md#eslint-plugin-react-hooks)

- 使用大量分支修复误报错误。（@scyron6 在 `#24287`）
- 当变量被重新赋值时，不要认为已知的依赖项是稳定的。（@afzalsayed96 在 `#24343`）

### [使用订阅](https://github.com/facebook/react/blob/main/CHANGELOG.md#use-subscription)

- 将实现替换为 use-sync-external-store shim。 （@gaearon 在#24289 中）

## [18.0.0 版本（发布于 2022 年 3 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1800-march-29-2022)

以下是一份所有新功能、API、弃用和重大变更的清单。请参阅 React 18 发布说明和升级指南以获取详细信息。

### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features)

#### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-1)

- useId 是一个用于在客户端和服务器端生成唯一 ID 的新功能，它能够避免数据同步问题
    主要适用于需要与无障碍 API 集成的组件库，并要求具有唯一 ID
    这解决了 React 17 及以下版本中已经存在的问题，但在 React 18 中尤为重要，因为新的流式服务器渲染器输出的 HTML 顺序被打乱，这一点更加关键。
- `startTransition` 和 `useTransition` 功能让您可以将某些状态更新标记为非紧急处理。默认情况下，其他状态更新会被视为紧急处理。  
    React 允许紧急状态更新（如更新文本输入）打断非紧急状态更新（如渲染搜索结果列表），使操作更高效。
- `useDeferredValue` 允许您延迟渲染树的非紧急部分。这与节流功能相似，但相比而言具有一些优势。  
    没有固定延迟时间，React 将在首次渲染显示在屏幕上后立即尝试进行延迟渲染。延迟渲染可被中断，不会影响用户操作。
- useSyncExternalStore 是一个新特性，它通过强制同步更新存储来支持外部存储的并发读取。这使得在实现对外部数据源的订阅时无需使用 useEffect，对于需要与 React 外部状态集成的库来说，这是一个推荐的做法。
- useInsertionEffect 是一个新`Hook`，它允许 CSS-in-JS 库解决渲染时注入样式的性能问题。除非你已经开发了自己的 CSS-in-JS 库，否则我们不太可能用到这个`Hook`。  
    此`Hook`将在 DOM 发生变更后执行，但在布局效果读取新布局之前。这样的表述更符合中文表达习惯。  
    这解决了 React 17 及以下版本中已经存在的问题，但在 React 18 中尤为重要。因为 React 在并发渲染时会将控制权交给浏览器，从而让浏览器有机会重新计算布局，这一点显得尤为重要。

#### [React DOM 客户端](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-client)

这些新的 API 现在从`react-dom/client`模块导出：

- 新方法用于创建渲染或卸载的根节点，请用它替代 ReactDOM.render。React 18 的新特性若不使用它将无法正常使用。
- 新方法用于激活服务器渲染的应用程序。请用它替代 ReactDOM.hydrate，并与新的 React DOM Server API 结合使用。React 18 的新特性没有它将无法正常使用。

两者都支持一个名为 onRecoverableError 的新选项，用于在 React 在渲染或挂载过程中从错误中恢复时进行通知。默认情况下，React 会使用 reportError 或者在旧浏览器中使用 console.error 进行错误报告。

#### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-2)

这些新的 API 现在从 react-dom/server 模块导出，完全支持在服务器端进行流式处理 Suspense 功能

- renderToPipeableStream：在 Node 环境中实现流式传输。
- renderToReadableStream：适用于现代边缘运行时环境，例如 Deno 和 Cloudflare Workers。该功能旨在提高现代边缘运行时环境（如 Deno 和 Cloudflare Workers）的可读性。

现有的 renderToString 方法依然可用，但已不推荐使用。

### [废弃功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#deprecations)

- react-dom: ReactDOM.render 已被弃用。使用它将触发警告，并使您的应用以 React 17 模式运行。
- ReactDOM.hydrate 已弃用，使用时会发出警告，并使您的应用以 React 17 模式运行。
- react-dom: @0 已被弃用。
- react-dom: @0 已被弃用。
- react-dom/server: `ReactDOMServer.renderToNodeStream` 已被弃用，请更新代码。

### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes)

##### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-2)

- 自动批处理：本版本引入了性能优化，改变了 React 处理更新的方式，使其能够自动进行更多批处理。有关在 React 18 中减少渲染次数的详细信息，请参阅“自动批处理”。在极少数需要关闭此功能的情况下，请将状态更新包裹在`flushSync`函数中。
- 严格模式：未来，React 将新增一项功能，允许组件在卸载后保持状态。为了适应这一变化，React 18 在开发模式下引入了针对严格模式的检查机制。  
    React 会自动卸载并重新挂载每个组件，每次组件首次挂载时，第二次挂载都会恢复之前的状态  
    如果这个改动导致您的应用出现问题，请先考虑在修复组件使其能够处理状态重新挂载之前，暂时关闭严格模式。
- React 在处理 Effect 函数时，确保了与用户输入事件（如点击或按键）的一致性，现在总是同步刷新，使更新更加流畅。  
    之前，其行为并不总是那么可预测或稳定。
- 严格的注水错误：现在将因缺少或多余的文本内容导致的注水不匹配视为错误，而不是警告
    React 将不再尝试通过在客户端插入或删除节点来“修补”单个节点以匹配服务器标记，而是退回到树中最接近的 边界进行客户端渲染。这样做可以确保水合树的一致性，并避免因水合不匹配而可能产生的隐私和安全问题。
- 焦虑树始终保持一致性：如果一个组件在完全加入到树中之前挂起，React 不会将其以不完整的形式添加到树中，也不会触发其效果。  
    因此，React 会完全丢弃新构建的树，等待异步操作完成后，再从头开始重新渲染。  
    React 会并发执行重试操作，不会影响浏览器运行。
- 当树重新挂起并回退到备用状态时，React 会先清理布局效果，然后在边界内的内容再次显示时重新创建它们。  
    这修复了一个问题，该问题在使用 Suspense 时导致组件库无法正确测量布局，现在已得到改进
- 新的 JS 环境要求：React 现在依赖于现代浏览器功能，包括 Promise、Symbol 和 Object.assign。这些功能是现代浏览器必备的，因此 React 需要运行在支持这些特性的浏览器上。  
    如果您的应用需要支持旧版浏览器和设备，比如不支持现代功能的 Internet Explorer，建议在打包时加入全局 polyfill。这样可以使您的应用兼容性更强。

#### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental)

- 移除不稳定的调度和跟踪 API

### [重大变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#notable-changes)

#### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-3)

- 组件现在能够渲染未定义值：React 不再在组件返回 undefined 时抛出异常。这使得组件允许的返回值与组件树中间允许的值保持一致，使代码更简洁。  
    我们建议使用代码检查工具来避免忘记在 JSX 之前添加返回语句等错误，这样可以使代码更加健壮。
- 在测试中，act 警告现在为可选：如果您正在运行端到端测试，则无需启用 act 警告。我们已引入可选机制，您只需在单元测试中启用它们即可，因为它们在那里既有用又有益。
- 关于在未卸载组件上调用 setState 没有警告：以前，React 在调用未卸载组件的 setState 时会发出内存泄漏警告。这个警告原本是为了处理订阅而设置的，但人们通常在状态设置没有问题的情况下遇到这个问题，而一些临时解决方案反而会使代码质量下降。我们已取消了这个警告。
- 没有抑制控制台日志：使用严格模式时，React 会两次渲染每个组件，以便您发现意外的副作用
    在 React 17 中，我们曾为了使日志更易读，抑制了两次渲染中的其中一次的 console logs。针对社区对此感到困惑的反馈，我们已取消该抑制措施。  
    如果您已安装 React DevTools，第二个日志的渲染将以灰色显示，并且默认情况下可以关闭显示这些渲染。
- 改进内存使用：React 在卸载时现在会清理更多内部字段，从而使得应用代码中可能存在的内存泄漏问题的影响变得不那么严重

#### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-3)

- 当服务器挂起时，将不再出错。它将输出最近的 边界对应的回退 HTML，随后在客户端重新渲染相同内容。建议您使用类似 renderToPipeableStream 或 renderToReadableStream 的流式 API 进行替换。
- 当服务器挂起时，将不再报错。它将输出最近的 边界对应的回退 HTML，并在客户端重新尝试渲染。

### [所有变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#all-changes)

#### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-4)

- 将 `useTransition` 和 `useDeferredValue` 添加到独立更新中，以便区分紧急更新与过渡效果。（由 @acdlite、@lunaruan、@rickhanlonii 和 @sebmarkbage 提出，编号 `10426`、`10715`、`15593`、`15272`、`15578`、`15769`、`17058`、`18796`、`19121`、`19703`、`19719`、`19724`、`20672`、`#20976`）
- 添加 useId 功能以生成唯一标识符。（由@acdlite、@lunaruan 和@sebmarkbage 发起，`17322`、`18576`、`22644`、`22672`、`#21260`）
- 添加功能 `Add useSyncExternalStore` 以帮助外部存储库与 React 集成。（由 @acdlite、@bvaughn 和 @drarmstr 提出，相关编号：#15022, #18000, #18771, #22211, #22292, #22239, #22347, `#23150`）
- 将 `startTransition` 添加为 `useTransition` 的一个版本，无需等待反馈确认。（由 @rickhanlonii 提交 `#19696`）
- 为 CSS-in-JS 库添加 useInsertionEffect 功能。（由 @rickhanlonii 提出 `21913`）
- 当内容重新出现时，重新挂载布局效果，制造悬念。（由 @acdlite、@bvaughn 和 @lunaruan 提出，`19322`、`19374`、`19523`、`20625`、`#21079`）
- 使 重新运行效果，以检查是否可以恢复状态。（由 @bvaughn 和 @lunaruan 提出 #19523 , `#21418`）
- 假设符号始终可用。（由 @sebmarkbage 提出 `#23348`）
- 移除 object-assign 补充库功能。（由 @sebmarkbage 提交 `#23351`）
- 移除不支持的 unstable_changedBits API。（由 @acdlite 提出 `20953`）
- 允许组件渲染未定义内容，使操作更灵活。（由 @rickhanlonii 提交 `#21869`）
- 同步处理由离散事件（如点击）引起的 Flush useEffect（由 @acdlite 提出 `#21150`）
- 悬念回退={undefined}现在与 null 表现一致，不会被忽略。（由@rickhanlonii 发起的 `#21854`）
- 考虑所有 `lazy()` 函数解析为相同的组件等效。 （由 @sebmarkbage 提出 `#20357`）
- 首次渲染时请勿修改控制台。（由 @lunaruan 提出 `#22308`）
- 优化内存使用。（由 bgirard 提交 `#21039`）
- 如果字符串强制转换引发错误（`Temporal.*`、Symbol 等）（#22064 by @justingrant）——使信息改进更佳
- 当 MessageChannel 可用时，请优先使用 setImmediate。
- 修复挂起树中Context无法传播的问题。（由 @gaearon 提交 `#23095`）
- 通过移除急切退出机制修复了 useReducer 对错误 props 的观察问题。（由@josephsavona 提交的`#22445`）
- 修复 Safari 中追加 iframe 时被忽略的 setState 问题。（由@gaearon 发起 `#23111`）
- 修复在树视图中渲染 ZonedDateTime 时的崩溃问题。（由 @dimaqq 提交 `#20617`）
- 修复测试中将文档设置为 null 时出现的崩溃问题。（由@SimenB 提交 `#22695`）
- 修复并发功能开启时未触发 onLoad 事件的 bug。（由@gnoff 发起 `#23316`）
- 修复选择器返回 NaN 时出现的警告问题。（由@hachibeeDI 发起 `#23333`）
- 修复生成的许可证头。（由 @vitaliemiron 提交 `#23004`）
- 请将 package.json 添加为入口之一。（由 @Jack 提交 `#22954`）
- 允许在 Suspense 边界外挂起。（由用户@acdlite 发起的议题`#23267`）
- 当加湿失败时，记录一个可恢复的错误。（由 @acdlite 提出 `#23319`）

#### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-3)

- 添加 createRoot 和 hydrateRoot 功能。 (#10239, #11225, #12117, #13732, #15502, #15532, #17035, #17165, #20669, #20748, #20888, #21072, #21417, #21652, #21687, #23207, #23385 由 @acdlite, @bvaughn, @gaearon, @lunaruan, @rickhanlonii, @trueadm 和 @sebmarkbage 实现)
- 添加选择性补水功能。（由 @acdlite、@gaearon、@salazarm 和 @sebmarkbage 提出，相关编号：`14717`、`14884`、`16725`、`16880`、`17004`、`22416`、`22629`、`22448`、`22856`、`#23176`）
- 将 aria-description 添加至已知 ARIA 属性列表中。（由 @mahyareb 提出，编号 `#22142`）
- 将“onResize”事件添加到视频元素中。（由 @rileyjshaw 提出，编号 `#21973`）
- 将 imageSizes 和 imageSrcSet 添加到已知属性中。（由 @eps1lon 提出，编号 `#22550`）
- 允许在提供值的情况下使用非字符串类型的 <option> 子项。（#21431 by @sebmarkbage）</option>
- 修复了未应用 aspectRatio 样式的问题。（由 @gaearon 提出 `#21100`）
- 警告：如果调用 `renderSubtreeIntoContainer` （由@acdlite 发起的`#23355`）

#### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-4)

- 添加新的流式渲染器功能。（由 @sebmarkbage 提出，涉及 `14144`、`20970`、`21056`、`21255`、`21200`、`21257`、`21276`、`22443`、`22450`、`23247`、`24025`、#24030 等问题）
- 修复 SSR 中处理多个请求时的问题Context提供者（由@frandiox 发起 `#23171`）
- 恢复客户端渲染以解决文本不匹配问题。（由 @acdlite 提出 `#23354`）
- 废弃 renderToNodeStream 功能。（由 @sebmarkbage 提出，`#23359`）
- 修复新服务器渲染器中出现的虚假错误日志问题。（由@eps1lon 发起 `#24043`）
- 修复新服务器渲染器中的 bug。（#22617 由@shuding 发起）
- 忽略服务器中自定义元素内部的函数和符号值。（由 @sebmarkbage 提出 `#21157`）

#### [React DOM 测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-test-utils)

- 在生产中使用操作时引发异常。（由 @acdlite 提交 `#21686`）
- 支持禁用不必要的操作警告 `global.IS_REACT_ACT_ENVIRONMENT` . （#22561 由 @acdlite 提出）
- 扩展行为警告，使其涵盖所有可能调度 React 工作的 API。（由@acdlite 发起的`#22607`）
- 执行批量更新操作。（由 @acdlite 提交 `21797` ）
- 移除悬空被动效果的警告。（由 @acdlite 提交 `#22609`）

#### [React 刷新](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-refresh)

- 跟踪 Fast Refresh 中延迟挂载的根节点。（@anc95 提交的 #22740 问题）
- 将“exports”字段添加至 package.json 文件中。（由@otakustay 发起 `#23087`）

#### [服务器组件（实验性质）](https://github.com/facebook/react/blob/main/CHANGELOG.md#server-components-experimental-1)

- 添加服务器Context支持功能。（由 @salazarm 提出 `#23244`）
- 添加懒加载支持功能。（由 @gnoff 提出 `#24068`）
- 更新 webpack 插件以适配 webpack 5 版本（由 @michenly 提交的 `#22739`）
- 修复 Node 加载器中的错误。（由用户 @btea 提交的 #22537 问题）
- 在边缘环境中，请使用 globalThis 替代 window。（由 @huozhi 提出 `#22777`）

#### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental-1)

- 移除不稳定的调度/跟踪 API（由 @bvaughn 提交的 `20037`，优化表述）

## [17.0.2 版本（发布于 2021 年 3 月 22 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1702-march-22-2021)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-4)

- 删除一个未使用的依赖项以解决 SharedArrayBuffer 跨源隔离警告。（由@koba04 和@bvaughn 在`20831`、#20832 和#20840 中提出）

## [17.0.1 版本（发布于 2020 年 10 月 22 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1701-october-22-2020)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-5)

- 修复 IE11 崩溃问题。（@gaearon 在 `#20071`）

## [17.0.0 版本（发布于 2020 年 10 月 20 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1700-october-20-2020)

今天，我们发布了 React 17！

**[了解 React 17 的相关信息，并在官方 React 博客上学习如何将其更新到最新版本](https://reactjs.org/blog/2020/10/20/react-v17.html)**

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-5)

- 为新 JSX 转换添加 react/jsx-runtime 和 react/jsx-dev-runtime。（@lunaruan 在#18299 中）
- 从原生错误帧构建组件堆栈。（@sebmarkbage 在 `#18561`）
- 允许在Context中指定显示名称，以提升堆栈功能。（@eps1lon 在 `#18224`）
- 防止 'use strict' 在 UMD 包中泄露，避免潜在问题。（@koba04 在 `#19614`）
- 请停止使用 fb.me 进行重定向。（@cylim 在`#19598`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-6)

- 将事件委托给根元素而非整个文档。（@trueadm 在 #18195 及其他用户）
- 在运行任何后续效果之前，请先清理所有效果。（@bvaughn 在 `#17947`）
- 异步执行 useEffect 清理函数。（@bvaughn 在 `#17925`）
- 使用浏览器 focusin 和 focusout 事件来实现 onFocus 和 onBlur 功能。（@trueadm 在#19186 中提出）
- 将所有捕获事件调整为使用浏览器的捕获阶段。（@trueadm 在 `#19221`）
- 不要模拟 onScroll 事件的冒泡（@gaearon 在 `#19464`）。
- 如果 forwardRef 或 memo 组件返回 undefined，则抛出异常。（@gaearon 在 `#19550`）
- 移除事件池化功能。（@trueadm 在 `#18969`）
- 停止暴露 React Native Web 不需要的内部功能。（@necolas 在#18483 中提到）
- 当根组件挂载时，请附加所有已知的事件监听器。（@gaearon 在 `#19659`）
- 禁用开发模式下双渲染的第二渲染通道的控制台。（@sebmarkbage 在 `#18547`）
- 废弃未文档化和具有误导性的 `ReactTestUtils.SimulateNative` API。（@gaearon 在 `#13407`）
- 提取并优化内部使用的私有字段名称重命名。（@gaearon 在 `#18377`）
- 不要在开发环境中调用用户计时 API。（@gaearon 在 `#18417`）
- 在严格模式下重复渲染时禁用控制台。（@sebmarkbage 在 `#18547`）
- 在严格模式下，即使没有使用 Hooks，双渲染的组件也会被处理。（@eps1lon 在 `#18430`）
- 允许在生命周期方法中使用 ReactDOM.flushSync（同时发出警告）。（@sebmarkbage 提出，`#18759`）
- 将代码属性添加到键盘事件对象中。（@bl00mber 在 `#18287`）
- 为视频元素添加 disableRemotePlayback 属性。（由 @tombrowndev 在 #18619 提出）
- 为输入元素添加 enterKeyHint 属性。（由 @eps1lon 提出，在 `#18634`）
- 当未向提供值时，发出警告提示。（@charlie1404 在 `#19054`）
- 当 memo 或 forwardRef 组件返回 undefined 时发出警告。（@bvaughn 在#19550 中）
- 优化无效更新提示信息。（@JoviDeCroock 在 `#18316`）
- 排除 forwardRef 和 memo 从堆栈帧中。（@sebmarkbage 在 `#18559`）
- 优化切换受控与不受控输入时显示的错误信息。（@vcarl 在 `#17070`）
- 保持 onTouchStart、onTouchMove 和 onWheel 的被动状态。（@gaearon 在#19654 中）
- 修复开发中在关闭的 iframe 内导致的 setState 卡顿问题。（@gaearon 在 `#19220`）
- 修复因 defaultProps 导致的懒组件渲染中断问题。（@jddxf 在 `#18539`）
- 修复当 dangerouslySetInnerHTML 属性为 . ( 在 ) 时出现的误报警告
- 修复具有非标准 require 实现的测试工具。（@just-boris 在 `#18632`）
- 修复在 #19561 中报告的 onBeforeInput 事件类型错误问题。（@eps1lon）
- 修复 Firefox 中 event.relatedTarget 被报告为未定义的问题。（@claytercek 在`#19607`）
- 修复 IE11 中的“未指定错误”问题。（@hemakshis 在`#19664`）
- 修复将渲染内容渲染到阴影根中的问题。（@Jack-Works 在 `#15894`）
- 修复 movementX/Y polyfill 与捕获事件兼容性问题（@gaearon 在 `#19672`）
- 使用委托处理 onSubmit 和 onReset 事件。（@gaearon 在 `#19333`）
- 提高内存使用效率。（@trueadm 在 `#18970`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-5)

- 使 useCallback 的行为与 useMemo 在服务器渲染器中保持一致。（@alexmckenley 在 `#18783`）
- 修复函数组件抛出异常时导致的状态泄漏问题。（@pmaccart 在 `#19212`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer)

- 改进 findByType 错误信息提示。（@henryqdineen 在#17439 中）

### [并发模式（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#concurrent-mode-experimental)

- 优化优先级批处理启发式算法。（@acdlite 在 `#18796`
- 在实验性 API 前加上“不稳定_”前缀。（@acdlite 在 `#18825`）
- 删除不稳定的不稳定离散更新以及括号内的点号。
- 移除 timeoutMs 参数。（@acdlite 在 `#19703`）
- 禁用预渲染功能，改用未来 API 实现。（@acdlite 在 `#18917`）
- 将不稳定期望加载时间添加至 CPU 密集型 Suspense 树中。
- 添加一个实验性的`Hook`功能。（由 @lunaruan 在 #17322 提出讨论）
- 添加一个实验性的不稳定启动转换 API。（位于）
- 在测试渲染器中使用 act 不再触发 Suspense 的回退功能。（@acdlite 在`#18596`）
- 使用全局渲染超时处理 CPU 挂起。（@sebmarkbage 在#19643 中）
- 在挂载前先清除现有的根内容。（@bvaughn 在 `#18730`）
- 修复与错误边界相关的 bug。（@acdlite 在 `#18265`）
- 修复导致挂起树中更新丢失的 bug。（@acdlite 在#18384 和#18457 提及）
- 修复因渲染阶段更新丢失导致的 bug。（@acdlite 在 `#18537`）
- 修复 SuspenseList 中的 bug。（由@sebmarkbage 在#18412 提出）
- 修复因 Suspense 回退过早显示而导致的 bug。（@acdlite 在#18411 中）
- 修复 SuspenseList 内部类组件的 bug，使其更加稳定。 (@sebmarkbage 在 #18448)
- 修复可能导致输入更新丢失的 bug。（@jddxf 在 #18515 和 @acdlite 在 `#18535`）
- 修复导致 Suspense 回退卡住的 bug。（由@acdlite 在#18663 中提出）
- 如果正在初始化，请不要切断 SuspenseList 的尾巴。（@sebmarkbage 在`#18854`）
- 修复在使用 `useMutableSource` 时可能出现的 bug，该 bug 可能发生在 `getSnapshot` 发生变化时。（@bvaughn 在 `#18297`）
- 修复 useMutableSource 中出现的撕裂问题漏洞。（@bvaughn 在 `#18912`）
- 警告：若在 render 外部且在提交前调用 setState，请检查。（@sebmarkbage 在 `#18838`）

## [16.14.0 版本（发布于 2020 年 10 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16140-october-14-2020)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-6)

- 添加对新 JSX 转换器的支持。（由 @lunaruan 在 #18299 提出）

## [16.13.1 版本（发布于 2020 年 3 月 19 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16131-march-19-2020)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-7)

- 修复在旧模式下 Suspense 中未触发清理函数的 bug。这仅影响使用旧模式下的 Suspense 进行数据获取的用户，该模式在技术上并不被支持。（@acdlite 在 `#18238`）
- 撤销在类渲染生命周期内（如 componentWillReceiveProps 等）发生的跨组件更新警告。（在）

## [16.13.0 版本（发布于 2020 年 2 月 26 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16130-february-26-2020)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-7)

- 警告：当字符串引用以不适合未来代码重构的方式使用时（@lunaruan 在 `#17864`）
- 废弃 React.createFactory()（@trueadm 提出，详见 `#17878`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-8)

- 警告：当样式变更可能导致意外碰撞时（@sophiebits 在 `14181`，`#18002`）
- 当函数组件在另一个组件渲染阶段更新时发出警告（@acdlite，`#17099`）
- 废弃不稳定创建门户功能（@trueadm 提出，`#17880`）
- 修复禁用按钮上触发的鼠标进入事件问题（@AlfredoGJ 在 `#17675`）
- 在严格模式下开发时，应两次调用 shouldComponentUpdate（@bvaughn 在 `#17942`）
- 将版本属性添加到 ReactDOM（@ealush 在#15780 议题中）
- 请勿调用 dangerouslySetInnerHTML（在）
- 在更多警告中展示组件堆栈（@gaearon 在 `17922`、`#17586`）

### [并发模式（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#concurrent-mode-experimental-1)

- 警告：ReactDOM.createRoot() 的潜在问题用法（@trueadm 在 `#17937` 中）
- 移除 ReactDOM.createRoot() 的回调参数，并添加了使用警告（@bvaughn 在 `#17916`）
- 不要将空闲/离屏工作与其他工作混为一谈（@sebmarkbage 在 `#17456`）
- 调整 SuspenseList 的 CPU 占用启发式算法（由@sebmarkbage 在#17455 中提出）
- 添加缺失的事件插件优先级（@trueadm 在 `#17914`）
- 修复仅在从输入事件内部过渡时 isPending 属性为 true 的问题（@acdlite 在`#17382`）
- 修复 React.memo 组件因更高优先级的更新中断而丢失更新的问题（@acdlite 在`#18091`）
- 当在错误优先级下挂起时不要发出警告（@gaearon 在 `#17971`）
- 修复与合并更新相关的错误（@acdlite 和 @sebmarkbage 在 `17560`、`17510`、`17483`、`#17480`）

## [16.12.0 版本（发布于 2019 年 11 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16120-november-14-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-9)

- 修复多根应用中因（useEffect）副作用未触发导致的 bug。（@acdlite 在 `#17347`）

### [React 是一种流行的前端开发框架](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-is)

- 修复将懒加载和记忆类型视为元素而非组件的问题（@bvaughn 在 `#17278`）

## [16.11.0 版本（发布于 2019 年 10 月 22 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16110-october-22-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-10)

- 修复嵌套 React 容器内鼠标进入事件处理程序重复触发的问题。@yuanoook 在 #16928
- 移除并禁用实验性的不稳定 API unstable_createSyncRoot。这些 API 在实验频道中可用，分别为 和 。

## [16.10.2 版本（发布于 2019 年 10 月 3 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16102-october-3-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-11)

- 通过恢复事件插件提取器中参数顺序修复 react-native-web 的回归问题（@necolas 在`#16978`）

## [16.10.1 版本（发布于 2019 年 9 月 28 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16101-september-28-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-12)

- 通过允许在挂载过程中静默处理 Suspense 不匹配，修复 Next.js 应用中的回归问题（@sebmarkbage 在 `#16943`）

## [16.10.0 版本（发布于 2019 年 9 月 27 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#16100-september-27-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-13)

- 修复`Hook`更新未进行缓存的问题。（@sebmarkbage 在 `#16359`）
- 优化确定数据同步时机启发式算法，确保更新过程中不会错误地进行数据同步。（@sebmarkbage 在 `#16739`）
- 在卸载过程中清除多余的纤维字段，以节省内存资源。（@trueadm 在 `#16807`）
- 修复 Firefox 中必填文本字段的问题。（@halvves 在`#16578`）
- 当可用时，请优先使用 Object.is 替代内联 polyfill。（@ku8ar 在 `#16212`）
- 修复在使用 Suspense 和错误处理混合时出现的 bug。（@acdlite 在#16801 中）

### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental-2)

- 通过将队列的内部数据结构改为最小二叉堆，从而提升队列性能。（@acdlite 在 `#16245`）
- 使用短间隔的 postMessage 循环代替尝试与 requestAnimationFrame 帧边界对齐（@acdlite 在 `#16214`）

### [使用订阅](https://github.com/facebook/react/blob/main/CHANGELOG.md#usesubscription)

- 避免突变发生时，前一个更新尚未完成就出现撕裂问题。（@bvaughn 在 `#16623`）

## [16.9.0 版本（发布于 2019 年 8 月 8 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1690-august-8-2019)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-8)

- 添加用于程序化收集性能数据的 API。 (由 @bvaughn 在 #15172 提出)
- 用括号（ ）替换不稳定的_ConcurrentMode

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-14)

- 废弃 UNSAFE_* 生命周期方法的旧名称。（@bvaughn 在 #15186 和 @threepointone 在 `#16103`）
- 废弃 javascript: URLs 作为常见的攻击面，这一说法由@sebmarkbage 在#15047 中提出。
- 废弃不常用的“模块模式”（工厂）组件。
- 在 . ( in ) 上添加禁用画中画功能的支持
- 支持为元素添加 onLoad 事件功能。（@cherniavskii 在#15614 中）
- 支持从 DevTools 编辑 useState 状态。（@bvaughn 在`#14906`）
- 添加从开发者工具中切换 Suspense 支持的功能。（@gaearon 在 `#15232`）
- 警告：当 useEffect 中调用 setState 时可能产生循环，请留意。（@gaearon 在 `#15180`）
- 修复内存泄漏问题。（@paulshen 在 `#16115`）
- 修复在包裹 组件的元素中 findDOMNode 导致的崩溃问题。（@acdlite 在 `#15312`）
- 解决因处理过晚导致的待处理效果问题。（@acdlite 在 `#15650`）
- 修复警告信息中参数顺序错误的问题。（@brickspert 在 `#15345`）
- 修复存在 !important 样式时隐藏 Suspense 回退节点的问题。（@acdlite 在 #15861 和 `#15882`）
- 稍微增强保湿效果。（@bmeurer 在 `#15998`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-6)

- 修复 camelCase 自定义 CSS 属性名称的错误输出。（@bedakb 在 `#16167`）

### [React 测试工具与测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-utilities-and-test-renderer)

- 为测试异步状态更新添加 act(async () => ...) 功能。 (@threepointone 在 #14853 中提出)
- 支持从不同渲染器中嵌套动作。（@threepointone 在 #16039 和 #16042 中提出）
- 在严格模式下警告：若效果在 act()调用之外被调度。（@threepointone 在 #15763 和 `#16041`）
- 警告：在使用错误的渲染器调用 act 时。（@threepointone 在 `#15756`）

### [ESLint 插件：React `Hook`](https://github.com/facebook/react/blob/main/CHANGELOG.md#eslint-plugin-react-hooks-1)

- 将顶层报告`Hook`调用视为违规。（来自 gaearon 在 `#16455`）

## [16.8.6 版本（发布于 2019 年 3 月 27 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1686-march-27-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-15)

- 修复 useReducer() 中使用错误的 bailout。（@acdlite 在 `#15124`）
- 修复 Safari 开发者工具中的 iframe 警告。（@renanvalentin 在`#15099`）
- 警告：若将 contextType 设置为 Context.Consumer 而非 Context。（@aweary 在#14831 中）
- 警告：若 contextType 设置为无效值，请检查。

## [16.8.5 版本（发布于 2019 年 3 月 22 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1685-march-22-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-16)

- 不要在具有 size 属性的 select 标签中将第一个选项设置为选中状态。（@kulek1 在 `#14242`）
- 改进 `useEffect(async () => ...)` 警告信息（@gaearon 在 `#15118`）
- 有时因 React 重复导致的错误信息需要改进。（@jaredpalmer 在 `#15139`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-7)

- 优化服务器端渲染时 useLayoutEffect 的警告信息提示（@gaearon 在 `#15158`）

### [React 浅渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-shallow-renderer)

- 修复浅渲染器中与 Hooks 配合使用的 setState 问题（@gaearon 在 `#15120`）
- 修复浅渲染器以支持 React.memo，使其更加完善。（@aweary 在#14816 中）
- 修复浅渲染器，使其支持在 forwardRef 内部使用 Hooks。（@eps1lon 在 `#15100`）

## [16.8.4 版本（发布于 2019 年 3 月 5 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1684-march-5-2019)

### [React DOM 和其他渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-and-other-renderers)

- 修复了一个 bug，当使用 useContext `Hook`的组件被 DevTools 检查时，会引发运行时错误。（@bvaughn 在 `#14940`）

## [16.8.3 版本（发布于 2019 年 2 月 21 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1683-february-21-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-17)

- 修复了在 UMD 构建中导致输入行为异常的 bug。（@gaearon 在 `#14914`）
- 修复因渲染阶段更新被丢弃而导致的 bug。（@gaearon 在 `#14852`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-8)

- 当流在未完成的情况下被销毁时，解除Context堆栈，以防止在后续渲染中出现错误值。（@overlookmotel 在 `#14706`）

### [ESLint 插件用于 React Hooks](https://github.com/facebook/react/blob/main/CHANGELOG.md#eslint-plugin-for-react-hooks)

- 添加一个新的推荐的全依赖规则。（@gaearon 在 `#14636`）

## [16.8.2 版本（发布于 2019 年 2 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1682-february-14-2019)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-18)

- 修复 useEffect 内 ReactDOM.render 被忽略的问题。（@gaearon 在 `#14799`）
- 修复卸载空端口时发生的崩溃问题。（@gaearon 在 `#14820`）
- 修复未指定依赖项时 useImperativeHandle 正确工作的功能。（@gaearon 在 `#14801`
- 修复跨域属性，使其在 SVG 图像元素中正常工作。（@aweary 在 `#14832`）
- 修复使用 Suspense 组件与 Hooks 时出现的误报警告。（@gaearon 在 `#14821`）

### [React 测试工具与 React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-utils-and-react-test-renderer)

- 将组件堆栈包含到 act()警告中。（@threepointone 在 `#14855`）

## [16.8.1 版本（发布于 2019 年 2 月 6 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1681-february-6-2019)

### [React DOM 与 React Test Renderer](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-and-react-test-renderer)

- 修复与旧版本 React 一起使用时出现的崩溃问题。（@bvaughn 在 `#14770`）

### [React 测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-utils)

- 修复 Node 环境中的崩溃问题。（@threepointone 在 `#14768`）

## [16.8.0 版本（发布于 2019 年 2 月 6 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1680-february-6-2019)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-9)

- 添加`Hook` —— 一种无需编写类即可使用状态和其他 React 特性的方法。（@acdlite 等人在 `#13968`）
- 改进 useReducer Hook 懒加载 API。（@acdlite 在#14723 中）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-19)

- 当 useState 和 useReducer `Hook`具有相同值时，退出渲染功能。（@acdlite 在 `#14569`）
- 使用 Object.is 算法来比较 useState 和 useReducer 的值。（@Jessidhia 在 `#14752`）
- 请勿将传递给 useEffect/useMemo/useCallback `Hook`的第一个参数进行比较。（@acdlite 在 `#14594`）
- 支持将同步的 thenables 传递给 React.lazy()。（@gaearon 在#14626 中） 
- 在严格模式下（仅开发环境）两次渲染使用 Hooks 的组件，以匹配类行为。（@gaearon 在 `#14654`）
- 提醒：开发中存在`Hook`顺序不匹配问题。（@threepointone 在 #14585 和 @acdlite 在 `#14591`）
- 清理函数必须返回 undefined 或函数。不允许返回 null 等其他值。@acdlite 在 #14119

### [React 测试渲染器和测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-and-test-utils)

- 在浅渲染器中支持`Hook`功能。（@trueadm 在 `#14567`）
- 修复 Shallow Renderer 中因存在 getDerivedStateFromProps 而出现的错误状态。（在）
- 添加 ReactTestRenderer.act() 和批量更新功能，使测试结果更贴近真实行为。（内）

### [ESLint 插件：React `Hook`](https://github.com/facebook/react/blob/main/CHANGELOG.md#eslint-plugin-react-hooks-2)

- 初始发布。（@calebmer 在 `#13968`）
- 修复遇到循环后的问题报告。（@calebmer 和 @Yurickh 在 `#14661`）
- 不要把投掷当作违规规则。（@sophiebits 在 `#14040`）

## [16.7.0 版本（发布于 2018 年 12 月 19 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1670-december-19-2018)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-20)

- 优化 React.lazy 在大量懒加载组件中的性能问题（@acdlite 在 `#14429`）
- 在卸载时清除字段，避免内存泄漏，使操作更安全。（@trueadm 在 `#14276`）
- 修复在使用 react-dom/server@16.6 和 react@<16.6 时混合使用导致的 SSR 和Context相关 bug。（@gaearon 在#14291 中）
- 修复在分析模式下的性能回归问题。（@bvaughn 在 `#14383`）

### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental-3)

- 将消息发送到 MessageChannel 而不是通过 window。（@acdlite 在`#14234`）
- 减少序列化开销。（由 @developit 提出，见 `#14249`）
- 修复测试环境中回退到 setTimeout 的问题（@bvaughn 在 `#14358`）
- 添加调试方法。（由 @mrkev 在 #14053 提出）

## [16.6.3 版本（发布于 2018 年 11 月 12 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1663-november-12-2018)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-21)

- 修复 Suspense 和懒加载模块中的 bug。（@acdlite 在`14133`、#14157 和#14164 任务中）
- 优化 React DevTools 中 React.memo 更新高亮显示的修复描述。（@bvaughn 在 `#14141`）
- 优化 Suspense 与 React Profiler 的交互问题（@bvaughn 在 `#14065`）
- 修复使用 Suspense 时出现的误报警告（@acdlite 在 `#14158`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-9)

- 修复 renderToNodeStream() 调用间Context状态共享错误问题。 (@sebmarkbage 在 #14182)
- 添加关于Context API 使用错误的警告。（@trueadm 在 `#14033`）

## [16.6.2 版本（发布于 2018 年 11 月 12 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1662-november-12-2018)

本次发布处于损坏状态，建议跳过。

## [16.6.1 版本（发布于 2018 年 11 月 6 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1661-november-6-2018)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-22)

- 当承诺解析时，不应每次都重新挂载回退（@acdlite 在 `#14083`）
- 修复了 Suspense 在所有内容加载完成后仍然显示回退内容的 bug。（@acdlite 在#14083 中提出）
- 修复 Suspense 在 IE11 加载完成时崩溃的问题。（@sophiebits 在 `#14126`）
- 修复懒组件生命周期方法中未解决的默认属性问题。（@gaearon 在 `#14112`）
- 修复在完整阶段从错误中恢复时出现的 bug。（@gaearon 在 `#14104`）

### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental-4)

- 将截止日期对象切换为 shouldYield API。（@acdlite 在 `#14025`）

## [16.6.0 版本（发布于 2018 年 10 月 23 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1660-october-23-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-10)

- 将 React.memo() 作为 PureComponent 的替代方案添加。（@acdlite 在 `#13748`）
- 为代码拆分组件添加 React.lazy()。（@acdlite 在 `#13885`）
- React.StrictMode 现在会提醒您注意遗留的Context API 问题。（@bvaughn 在 `#13760`）
- React.StrictMode 现在会提醒开发者关于 findDOMNode 的使用问题。（@sebmarkbage 在 `#13841`）
- 将其重命名为不稳定_ConcurrentMode。（位于）
- 将不稳定占位符更名为 Suspense，并将延迟时间参数 delayMs 改为最大持续时间参数 maxDuration。（@gaearon 在#13799 和@sebmarkbage 在`#13922`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-23)

- 将 contextType 添加为从类中订阅Context的更便捷方式。（@bvaughn 在 `#13728`）
- 为未来异步服务器端渲染器添加捕获错误的 getDerivedStateFromError 生命周期方法
- 当使用而非时发出警告。（@trueadm 在 `#13829`）
- 修复 iOS Safari 浏览器上的灰色覆盖层问题。（@philipp-spiess 在 `#13778`）
- 修复因在开发中覆盖 window.event 引起的 bug。（@sergei-startsev 在 `#13697`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-10)

- 支持 React.memo 功能。（@alexmckenley 在`#13855`）
- 添加对Context类型支持的功能。（@alexmckenley 和@sebmarkbage 在#13889 中）

### [调度器（实验版）](https://github.com/facebook/react/blob/main/CHANGELOG.md#scheduler-experimental-5)

- 将包重命名为 scheduler。（@gaearon 在#13683 中提出）
- 支持优先级、延续和包装回调功能。（@acdlite 在 #13720 和 `#13842`）
- 优化非 DOM 环境下的回退机制（@acdlite 在 `#13740`）
- 提前安排 requestAnimationFrame，这样做更合适。（@acdlite 在`#13785`）
- 修复 DOM 检测，使其检测更全面。（@trueadm 在#13731 中提出）
- 修复交互跟踪中的错误。（@bvaughn 在 `#13590`）
- 将 envify 转换添加到包中。（@mridgway 在#13766 中提出）

## [16.5.2 版本（发布于 2018 年 9 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1652-september-18-2018)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-24)

- 修复了近期出现的 `<iframe>` 回退问题（@JSteunou 在 `#13650`）`</iframe>`
- 修复 updateWrapper，确保数据未变更时 `<textarea> `不再重新渲染（@joelbarbosa 在 `#13643`）`</textarea>`

### [调度（实验性质）](https://github.com/facebook/react/blob/main/CHANGELOG.md#schedule-experimental)

- 将 "tracking" API 重命名为 "tracing" (@bvaughn 在 #13641) 
- 添加 UMD 生产与性能入口点（@bvaughn 在 `#13642`）
- 优化了调度方案，移除了一些 React 相关特性，并提升了在延迟更新超时时的性能表现（@acdlite 在 `#13582`）

## [16.5.1 版本（发布于 2018 年 9 月 13 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1651-september-13-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-11)

- 优化 React.forwardRef 接收意外数量参数时的警告信息（@andresroberto 在 `#13636`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-25)

- 修复 React Native Web 不稳定导出中使用的回归问题。（@aweary 在`#13598`）
- 修复组件定义名为 isReactComponent 的方法时出现的崩溃问题。（@gaearon 在 `#13608`）
- 修复 IE9 开发模式下打印警告时发生的崩溃问题。（@link-alex 在 `#13620`）
- 当运行 react-dom/profiling 与 schedule/tracking 时，提供更清晰的错误提示信息。（@bvaughn 在 `#13605`）
- 如果 ForwardRef 组件定义了 displayName 属性，请在警告信息中使用它。（@probablyup 在 `#13615`）

### [调度（实验性质）](https://github.com/facebook/react/blob/main/CHANGELOG.md#schedule-experimental-1)

- 在 `schedule/tracking-profiling` 处添加独立的性能分析入口点。（由@bvaughn 在#13605 中提出）

## [16.5.0 版本（发布于 2018 年 9 月 5 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1650-september-5-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-12)

- 如果 React.forwardRef 的渲染函数没有恰好接收两个参数，则添加警告（@bvaughn 在 `#13168`）
- 当错误地将元素传递给 createElement 时，优化错误提示信息（@DCtheTall 在 `#13131`）
- 不要在突变之后调用 profiler 的 onRender（@bvaughn 在`#13572`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-26)

- 添加对 React DevTools 性能分析器的支持（@bvaughn 在`#13058`）
- 为生产环境性能分析添加 react-dom/profiling 入口别名（@bvaughn 在 `#13570`）
- 为支持该事件的浏览器添加 onAuxClick 事件（@jquense 在 `#11571`）
- 将 movementX 和 movementY 字段添加到鼠标事件中（由 @jasonwilliams 在 #9018 提出）
- 将切向压力和扭转字段添加到指针事件中（@motiz88 在 `#13374`）
- 有限支持在事件选择处理中嵌套浏览Context（iframe）
- 支持将布尔值传递给可聚焦的 SVG 属性（@gaearon 在 `#13339`）
- 在客户端加载数据时忽略
- 修复 gridArea 被正确处理为无单位 CSS 属性的问题（@mgol 在 `#13550`）
- 修复在 IE11 上输入韩文时，compositionend 事件中数据错误的 bug（@crux153 在`#12563`）
- 修复在使用 <option> 标签动态子项时出现的崩溃问题（@Slowyn 在 `13261`，@gaearon 在 `#13465`）</option>
- 修复输入时复选属性未初始化设置的问题（@dilidili 在 `#13114`）
- 修复当 `dangerouslySetInnerHTML` 属性不是字符串时引发的水合问题（在...中）
- 修复关于缺失受控 onChange 在 falsy 值上触发警告的问题（@nicolevy 在 `#12628`）
- 修复提交和重置按钮显示空标签的问题（@ellsclytn 在 `#12780`）
- 修复拖拽后未触发的 onSelect 事件问题（@gaearon 在 `#13422`）
- 修复 iOS 上在门户内不工作的 onClick 事件问题（@aweary 在`#11927`）
- 解决数千个根节点重新渲染时出现的性能问题（@gaearon 在 `#13335`）
- 修复导致性能下降的问题，同时也解决了在某些情况下未触发 onChange 事件的问题（@gaearon 在 `#13423`）
- 更优雅地处理更多边缘情况下的错误（@gaearon 在 #13237 和 @acdlite 在 `#13269`）
- 不要在开发中使用代理处理合成事件（@gaearon 在 `#12171`）
- 提醒当布尔 DOM 属性的值为“false”或“true”时（@motiz88 在`#13372`）
- 当 this.state 初始化为 props 时发出警告（@veekas 在 `#11658`）
- 不要在 IE 中比较加湿风格的差异，因为噪声误报较多（@mgol 在`#13534`）
- 在组件堆栈中加入 StrictMode（@gaearon 在 `#13240`）
- 不要在 IE 中覆盖 window.event（@ConradIrwin 在`#11696`）
- 优化文件夹/index.js 命名约定的组件堆栈（@gaearon 在 `#12059`）
- 当使用未初始化状态的 getDerivedStateFromProps 时，改进警告信息的表述
- 改进关于无效文本区域使用的警告说明（@raunofreiberg 在 `#13361`）
- 更一致地处理无效符号和函数值问题（@raunofreiberg 在 #13362 和 #13389 中提出）
- 允许在不发出警告的情况下使用 Electron 标签（@philipp-spiess 在 `#13301`）
- 如果调用了 e.preventDefault()，则无需显示未捕获错误附加信息（@gaearon 在 `#13384`）
- 警告：渲染生成器（@gaearon 在 `#13312`）
- 从警告中移除对过时方法的无关建议（@zx6658 在 `#13169`）
- 建议使用 from() 替代 unstable_deferredUpdates，使其更稳定
- 修复更新耗时过长导致的异步模式不稳定问题，避免不必要的操作（@acdlite 在 `#13503`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-11)

- 当使用 dangerouslySetInnerHtml 在选中的元素（in）时，修复与 nullish 子元素相关的崩溃问题
- 修复因缺少 setTimeout 导致的崩溃问题（@dustinsoftware 在 `#13088`）

### [React 测试渲染器和测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-and-test-utils-1)

- 在浅渲染器中修复此功能组件，使其未定义（@koba04 在 `#13144`）
- 废弃特定的 Jest 辅助函数（ `ReactTestUtils.mockComponent()` 辅助函数）（@bvaughn 提出，见 `#13193`）
- 警告：在测试渲染器内使用 ReactDOM.createPortal（@bvaughn 在 `#12895`）
- 改进一个让人困惑的错误信息（@gaearon 在 `#13351`）

### [React 艺术设计](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-art)

- 添加对开发者工具的支持（@yunchancho 在`#13173`）

### [调度（实验性质）](https://github.com/facebook/react/blob/main/CHANGELOG.md#schedule-experimental-2)

- 新的浏览器环境协同工作调度包。它被 React 内部使用，但公共 API 尚未最终确定。（@flarnie 在 `#12624`）

## [16.4.2 版本（发布于 2018 年 8 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1642-august-1-2018)

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-12)

- 修复攻击者控制属性名称时的潜在 XSS 漏洞（CVE-2018-6341）。该修复已包含在最新版本中，也适用于之前的受影响版本：react-dom@16.0.1、react-dom@16.1.2、react-dom@16.2.1 和 react-dom@16.3.3。（由@gaearon 在#13302 提交）
    
- 修复服务器渲染器在调用 hasOwnProperty 属性时发生的崩溃问题。此修复功能仅适用于 react-dom@16.4.2 版本。（@gaearon 提出，详见 `#13303`）
    

## [16.4.1 版本（发布于 2018 年 6 月 13 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1641-june-13-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-13)

- 现在您可以为 React.ForwardRef 返回的组件分配 propType，操作起来更加方便。（@bvaughn 在 `#12911`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-27)

- 修复输入类型从其他类型更改为文本时出现的崩溃问题。（@spirosikmd 在 `#12135`）
- 修复 IE11 在恢复 SVG 元素焦点时发生的崩溃问题。（@ThaddeusJiang 在`#12996`）
- 修复某些情况下范围输入未更新问题的方法。（@Illu 在 `#12939`）
- 在 Firefox 中不必要地触发输入验证的问题已修复。 (@nhunzaker 在 #12925)
- 修复 IE9 中 onChange 事件中错误的 event.target 值。（@nhunzaker 在`#12976`）
- 修复从组件返回空 时出现的误报错误。（@philipp-spiess 在 `#12966`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-13)

- 修复由新Context API 提供的错误值。（@ericsoderberghp 在`12985`，@gaearon 在`#13019`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-1)

- 允许测试渲染器 API 中存在多个根子节点。（@gaearon 在 `#13017`）
- 修复浅渲染器中的 `getDerivedStateFromProps()` 问题，防止丢弃挂起状态（@fatfisz 在 `#13030`）

## [16.4.0 版本（发布于 2018 年 5 月 23 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1640-may-23-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-14)

- 添加一个用于测量性能的 React.unstable_Profiler 组件。（英文）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-28)

- 添加对指针事件规范的支持。（@philipp-spiess 在 `#12507`）
- 无论重渲染的原因是什么，都应正确调用 `getDerivedStateFromProps()` 。（@acdlite 在#12600 和#12802 中）
- 修复了在某些情况下阻止Context传播的 bug。 (@gaearon 在 #12708)
- 在更深的 setState()上使用 forwardRef()修复组件的重渲染。（@gaearon 在 `#12690`）
- 修复了某些属性因错误而被从自定义元素节点中移除的问题。（@airamrguez 在 `#12702`）
- 修复Context提供者，使其在存在旧版Context提供者的情况下不会因子Context提供者而退出。（@gaearon 在 `#12586`）
- 在Context提供者组件中指定 propTypes 的能力。（@nicolevy 在 `#12658`）
- 在 . ( in ) 中使用 react-lifecycles-compat 时修复一个误报警告
- 当 forwardRef() 渲染函数存在 propTypes 或 defaultProps 属性时，发出警告提示。（@bvaughn 在 `#12644`）
- 改进如何显示组件堆栈中的 forwardRef() 和Context消费者。（@sophiebits 在 `#12777`）
- 修改内部事件名称。这可能会破坏依赖 React 内部功能（以不支持的方式）的第三方包。（@philipp-spiess 在 `#12629`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-2)

- 修复 `getDerivedStateFromProps()` 支持，使其与新 React DOM 的行为相匹配。（@koba04 在#12676 中）
- 修复当父节点为片段或其他特殊节点时 testInstance.parent 导致的崩溃问题。（@gaearon 在 `#12813`）
- 前向引用组件现在可以通过测试渲染器的遍历方法进行发现。（@gaearon 在 `#12725`）
- 浅渲染器现在会忽略那些返回 null 或 undefined 的 setState()更新器，使其更新更加高效。（@koba04 在`#12756`）

### [React 艺术设计](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-art-1)

- 修复由 React DOM 管理的树提供的读取Context问题。（@acdlite 在 `#12779`）

### [React 调用返回功能（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-call-return-experimental)

- 这个实验因影响包大小和 API 不够完善而被删除。它很可能会以其他形式在未来重新出现。（@gaearon 在 `#12820`）

### [React reconciler（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-reconciler-experimental)

- 新的主机配置形状扁平，不使用嵌套对象（@gaearon 在 `#12792`）

## [16.3.3 版本（发布于 2018 年 8 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1633-august-1-2018)

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-14)

- 修复攻击者控制属性名称时的潜在 XSS 漏洞（CVE-2018-6341）。该修复已包含在最新版本中，也适用于之前的受影响版本：react-dom@16.0.1、react-dom@16.1.2、react-dom@16.2.1 和 react-dom@16.3.3。（由@gaearon 在#13302 提交）

## [16.3.2 版本（发布于 2018 年 4 月 16 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1632-april-16-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-15)

- 优化传递 null 或 undefined 给 React.cloneElement 时的错误信息提示。（@nicolevy 在`#12534`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-29)

- 修复开发过程中使用导致的 IE 浏览器崩溃问题。（@bvaughn 在 `#12546`）
- 修复新组件类型用户时间测量标签问题。（@bvaughn 在 `#12609`）
- 改进关于错误组件类型大小写的警告描述。（@nicolevy 在 `#12533`）
- 在开发模式下提升整体性能。（@gaearon 在 `#12537`）
- 提升实验性不稳定 API unstable_observedBits 的性能，并实现嵌套功能。（@gaearon 在 `#12543`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-3)

- 添加 UMD 构建功能。（@bvaughn 在`#12594`）

## [16.3.1 版本（发布于 2018 年 4 月 3 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1631-april-3-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-16)

- 修复在使用 Fragment 时在 IE11 中出现的误报警告。（@heikkilamarko 在 `#12504`）
- 在私有 API 前添加前缀。（@Andarist 在 `#12501`）
- 在构造函数中调用 setState()时的警告优化。（@gaearon 在 `#12532`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-30)

- 在某些情况下， `getDerivedStateFromProps()` 无法得到应用。（@acdlite 在 `#12528`）
- 修复开发模式下的性能退化问题。（@gaearon 在 `#12510`）
- 在开发模式下修复错误处理中的 bug。（@gaearon 和 @acdlite 在 `#12508`）
- 优化用户时间 API 消息，以便进行性能分析。（@flarnie 在 `#12384`）

### [创建订阅](https://github.com/facebook/react/blob/main/CHANGELOG.md#create-subscription)

- 将包版本与 React 版本同步。 （@bvaughn 在 `#12526`）
- 在 React 16.3+上添加一个依赖项。（由@NMinhNguyen 在#12496 提出）

## [16.3.0 版本（发布于 2018 年 3 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1630-march-29-2018)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-17)

- 添加一个官方支持的Context API。（@acdlite 在 `#11818`）
- 添加一个新的 React.createRef() API，作为回调引用的便捷替代方案。（@trueadm 在 `#12162`）
- 添加一个新的 React.forwardRef() API，允许组件将它们的引用传递给子组件。（@bvaughn 在 `#12346`）
- 修复在 IE11 中使用 React.Fragment 时出现的误报警告。（@XaveScor 在 `#11823`）
- 请替换为 React.unstable_AsyncMode. （在）
- 当在未卸载的组件上调用 setState() 时，优化错误信息表达。（@sophiebits 在 `#12347`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-31)

- 添加新的 `getDerivedStateFromProps()` 生命周期和 UNSAFE_ 别名，以支持旧的生命周期。（@bvaughn 在 `#12028`）
- 添加一个名为 getSnapshotBeforeUpdate() 的新生命周期方法。（在）
- 添加一个新的 包装器，以帮助应用为异步渲染做好准备。（@bvaughn 在 `#12083`）
- 在标签上添加 onLoad 和 onError 事件支持。（@roderickhsiao 在`#11825`）
- 在
- 修复 IE 和 Safari 浏览器中的 DOM 输入小问题。（@nhunzaker 在`#11534`）
- 在更多浏览器中正确检测 Ctrl + Enter 按键事件（@nstraub 在`#10514`）
- 修复因 SSR 标记不匹配导致的包含元素聚焦问题。（@koba04 在 `#11737`）
- 修复“值”和“defaultValue”，使其忽略 Symbol 类型的值。（@nhunzaker 在#11741 中）
- 修复移除属性后类组件引用未被清理的问题。（@bvaughn 在 `#12178`）
- 修复在将输入渲染到不同窗口时出现的 IE/Edge 问题。（@M-ZubairAhmed 在`#11870`）
- 如果组件在 jsdom 被销毁后运行，请抛出一个具有意义的错误信息。（@gaearon 在 `#11677`）
- 如果存在名为 opera 的全局变量且其值为空，程序不要崩溃。（@alisherdavronov 在 `#11854`）
- 请勿检查 Opera 的旧版本。（@skiritsis 在`#11921`）
- 关于 <option selected=""> 的重复警告信息去重（@watadarkstar 在 `#11821`）</option>
- 关于无效回调的重复警告信息去重。（@yenshih 在 `#11833`）
- 建议弃用，改用 ReactDOM.createPortal()（在）。
- 不要为Context类型生成用户计时条目。（@abhaynikam 在 `#12250`）
- 当Context消费者子项非函数时，优化错误提示信息。（@raunofreiberg 在 `#12267`）
- 优化添加引用到功能组件时的错误信息提示（@skiritsis 在 `#11782`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-15)

- 防止在尝试使用 SSR 渲染传送门时出现无限循环。（@gaearon 在 `#11709`）
- 警告：如果某个类未继承自 React.Component，请提醒。
- 解决不同组件的 this.state 混淆问题。（@sophiebits 在 `#12323`）
- 当组件类型未定义时（@HeroProtagonist 在 `#11966`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-4)

- 优化 toTree() 中片段处理的处理方式。（@maciej-ka 在 #12107 和 @gaearon 在 `#12154`）
- 浅渲染器应将未设置状态的组件的状态设置为 null。这样做可以避免不必要的错误和异常，使组件的行为更加稳定和可预测。（@jwbay 在#11965 中）
- 浅渲染器应按照 contextTypes 过滤旧版Context。（@koba04 在 `#11922`）
- 为测试异步渲染添加一个不稳定的 API。（@acdlite 在 `#12478`）

### [React 是一款（新）的库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-is-new)

- 新包的第一个版本，库可以使用它来检测不同的 React 节点类型。（由 @bvaughn 提出，见 `#12199`）
- 添加 `ReactIs.isValidElementType()` 以帮助高阶组件验证输入。（@jamesreggio 在 `#12483`）

### [React 生命周期兼容性（新）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-lifecycles-compat-new)

- 新包的第一版发布，助力图书馆开发者针对多个版本的 React 进行目标定位。（@bvaughn 在 `#12105`）

### [创建新订阅](https://github.com/facebook/react/blob/main/CHANGELOG.md#create-subscription-new)

- 新包的第一版发布，可安全订阅外部数据源进行异步渲染。（@bvaughn 在 `#12325`）

### [React reconciler（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-reconciler-experimental-1)

- 揭示 `react-reconciler/persistent` 以构建使用持久数据结构的渲染器。（@gaearon 在 `#12156`）
- 将主机Context传递给 finalizeInitialChildren() 方法。（入） 
- 请从主机配置中移除 useSyncScheduling。（@acdlite 在 `#11771`）

### [React 调用返回功能（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-call-return-experimental-1)

- 修复更新时出现的崩溃问题。（@rmhartog 在 `#11955`）

## [16.2.1 版本（发布于 2018 年 8 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1621-august-1-2018)

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-16)

- 修复攻击者控制属性名称时的潜在 XSS 漏洞（CVE-2018-6341）。该修复已包含在最新版本中，也适用于之前的受影响版本：react-dom@16.0.1、react-dom@16.1.2、react-dom@16.2.1 和 react-dom@16.3.3。（由@gaearon 在#13302 提交）

## [16.2.0 版本（发布于 2017 年 11 月 28 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1620-november-28-2017)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-18)

- 将片段作为命名导出添加到 React。（由@clemmy 在#10783 中提出）
- 在 React.Children 工具中支持实验性的调用/返回类型。（由@MatteoVH 在#11422 中提出）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-32)

- 修复在使用多个单选列表时单选按钮无法选中问题。（@landvibe 在 `#11227`）
- 修复在某些情况下单选按钮无法接收到 onChange 事件的 bug。（@jquense 在 `#11028`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-5)

- 修复从 componentWillMount 调用时 setState()回调过早触发的问题。（@accordeiro 在#11507 中）

### [React 协调器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-reconciler)

- 提供用于自定义渲染器的实用工具 `react-reconciler/reflection` 。（由 @rivenhk 在 #11683 提出）

### [内部更改](https://github.com/facebook/react/blob/main/CHANGELOG.md#internal-changes)

- 许多测试针对公共 API 进行了重写。感谢每一位的贡献者！

## [16.1.2 版本（发布于 2018 年 8 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1612-august-1-2018)

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-17)

- 修复攻击者控制属性名称时的潜在 XSS 漏洞（CVE-2018-6341）。该修复已包含在最新版本中，也适用于之前的受影响版本：react-dom@16.0.1、react-dom@16.1.2、react-dom@16.2.1 和 react-dom@16.3.3。（由@gaearon 在#13302 提交）

## [16.1.1 版本（发布于 2017 年 11 月 13 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1611-november-13-2017)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-19)

- 改进关于未定义组件类型的警告说明。（@selbekk 在 `#11505`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-33)

- 支持捕获属性的字符串值。（@maxschmeling 在 `#11424`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-18)

- 请不要冻结 ReactDOMServer 的公共 API。（@travi 在 `#11531`）
- 不要在服务器上发出 autoFocus={false}属性。（@gaearon 在 `#11543`）

### [React 协调器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-reconciler-1)

- 更新 hydration API，以实现更佳的 Flow 类型支持。 (@sebmarkbage 在 #11493)

## [16.1.0 版本（发布于 2017 年 11 月 9 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1610-november-9-2017)

### [停止发布 Bower 版本](https://github.com/facebook/react/blob/main/CHANGELOG.md#discontinuing-bower-releases)

从 16.1.0 版本开始，我们将停止在 Bower 上发布新版本。您可以继续使用 Bower 来使用旧版本，或者将 Bower 配置指向 unpkg 上托管的 React UMD 构建，这些构建会镜像 npm 发布并持续更新。

### [所有软件包](https://github.com/facebook/react/blob/main/CHANGELOG.md#all-packages)

- 修复 UMD 构建中意外添加的额外全局变量。（@gaearon 在 `#10935`）

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-20)

- 在 React.Children 工具中添加对门户支持的功能。（由@MatteoVH 在#11378 中提出）
- 当一个类拥有渲染方法但未继承已知基类时，发出警告提示。（@sw-yx 在 `#11168`）
- 改进从构造函数中意外返回对象的警告提示。（@deanbrophy 在`#11395`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-34)

- 允许将 "on" 用作 AMP 的自定义属性。（@nuc 在 `#11153`）
- 修复在错误元素上触发的鼠标进入和离开事件问题。（@gaearon 在#11164 中）
- 修复警告中显示 null 而不是组件堆栈的问题。（@gaearon 在 `#10915`）
- 修复开发模式下 IE11 崩溃问题。（由 @leidegre 提出，见 `#10921`）
- 修复 SVG 元素 tabIndex 属性未正确应用的问题。（@gaearon 在 `#11034`）
- 修复 IE 中 dangerouslySetInnerHTML 导致的 SVG 子元素清理问题（在）
- 修复由换行符规范化导致的文本误匹配警告问题。（@gaearon 在 `#11119`）
- 修复 form.reset()以尊重未受控<select>的 defaultValue，使其更符合预期。（@aweary 在`#11057`）</select>
- 修复 <textarea> 占位符在 IE11 中无法显示的问题。（@gaearon 在 `#11177`）</textarea>
- 修复渲染到阴影树中的崩溃问题。（@gaearon 在 `#11037`）
- 修复关于混合大小写 SVG 标签水合的误报警告。（@gaearon 在 `#11174`）
- 抑制对新出现的未知标签警告，针对 <dialog> 元素。（@gaearon 在 `#11035`）</dialog>
- 警告：当尝试定义不存在的 componentDidReceiveProps 方法时。（在）
- 警告：请勿对函数子类进行多次提醒。（@andreysaleba 在 `#11120`）
- 警告：请勿多次进行嵌套更新。（@anushreesubramani 在 `#11113`）
- 去除关于更新的其他重复警告。（@anushreesubramani 在 `#11216`）
- 将组件堆栈包含在关于 contentEditable 属性及其子元素的警告信息中。（@Ethan-Arrowood 在 `#11208`）
- 改进关于传递给事件处理器的布尔值警告的提示信息。（@NicBonetto 在 `#11308`）
- 优化多选框获取空值时警告信息的表述（@Hendeca 在 `#11141`）
- 将警告信息中的链接移动，避免发生重定向。（@marciovicente 在 `#11400`）
- 添加一种方法来关闭 React DevTools 的安装提示功能。（@gaearon 在 `#11448`）
- 删除未使用的代码。（@gaearon 在 `10802`、`#10803`）

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-19)

- 为有意造成客户端与服务器端文本不一致的情况，添加了新的 suppressHydrationWarning 属性。（在）
- 修复组件返回字符串时标记生成的问题（@gaearon 在 `#11109`）
- 修复传递无效样式值时出现的模糊错误信息。（@iamdustan 在 `#11173`）
- 将 autoFocus 属性加入 SSR 标记中。（@gaearon 在 `#11192`）
- 将组件堆栈包含到更多的警告提示中。（@gaearon 在 `#11284`）

### [React 测试渲染器和测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-and-test-utils-2)

- 在浅渲染器中修复 componentWillMount()中多次调用 setState()的问题。（@Hypnosphi 在 `#11167`）
- 修复浅渲染器，使其在 . ( 在 和 ) 后忽略 shouldComponentUpdate()
- 正确处理 forceUpdate() 和 React.PureComponent。（@koba04 在 `#11440`）
- 恢复生产模式运行支持。（@gaearon 在 `#11112`）
- 添加缺少的 package.json 依赖项。（@gaearon 在 `#11340`）

### [React 艺术设计](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-art-2)

- 添加缺少的 package.json 依赖项。（@gaearon 在 `#11341`）
- 揭示 react-art/Circle、react-art/Rectangle 和 react-art/Wedge。 (@gaearon 在 #11343)

### [React reconciler（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-reconciler-experimental-2)

- 新实验性包的第一个版本，用于创建自定义渲染器。（@iamdustan 在 `#10758`）
- 添加对 React DevTools 的支持。（@gaearon 在 `#11463`）

### [React 调用返回功能（实验性）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-call-return-experimental-2)

- 新实验性父-child 通信包的首个版本发布。（@gaearon 在 `#11364`）

## [16.0.1 版本（发布于 2018 年 8 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1601-august-1-2018)

### [React DOM 服务器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-server-20)

- 修复攻击者控制属性名称时的潜在 XSS 漏洞（CVE-2018-6341）。该修复已包含在最新版本中，也适用于之前的受影响版本：react-dom@16.0.1、react-dom@16.1.2、react-dom@16.2.1 和 react-dom@16.3.3。（由@gaearon 在#13302 提交）

## [16.0.0 版本（发布于 2017 年 9 月 26 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1600-september-26-2017)

### [新型 JavaScript 环境的要求](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-js-environment-requirements)

- React 16 依赖于 Map 和 Set 集合类型以及 requestAnimationFrame。如果你需要支持可能尚未原生支持这些功能的旧版浏览器和设备（例如 IE11 以下），建议添加一个 polyfill。

### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-1)

- 组件现在能够从渲染中返回数组和字符串了。（相关文档即将发布！）
- 通过引入“错误边界”机制，增强了错误处理能力。错误边界是一种 React 组件，能够捕获其子组件树中的任何 JavaScript 错误，记录错误信息，并显示一个回退的用户界面，而不是显示崩溃的组件树。
- 使用 ReactDOM.createPortal()将子树声明式渲染到另一个 DOM 节点的一级支持（相关文档即将发布！）
- 服务器端渲染的流式模式已启用，使用了 `ReactDOMServer.renderToNodeStream()` 和 `ReactDOMServer.renderToStaticNodeStream()` 。这一功能由@aickin 在`10425`、`10044`、`10039`、`10024`、#9264 等多个地方提出。
- React DOM 现在支持传递非标准属性。（@nhunzaker 在 `10385`、10564、#10495 等议题中提到）

### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-1)

- 调度方法和生命周期方法的行为发生了多项变更：
    - ReactDOM.render() 和 `ReactDOM.unstable_renderIntoContainer()` 若在生命周期方法内部被调用，则现在会返回 null。
        - 为了解决这个问题，您可以选择使用新的门户 API 或 refs。
    - 状态设置行为的小幅调整：
        - 调用 setState 为 null 将不再触发更新。这让你可以在更新函数中自行决定是否需要重新渲染。
        - 直接在渲染函数中调用 setState 会导致更新，之前并非如此。无论如何，都不应在渲染函数中调用 setState。
        - setState 回调（第二个参数）现在会在 componentDidMount 或 componentDidUpdate 后立即执行，而不是在所有组件渲染完成后执行。
    - 当替换为时，现在总是先于 A.componentWillUnmount 执行。之前，在某些情况下，A.componentWillUnmount 可能会先执行。
    - 之前，更改引用到组件时，总是会在调用该组件的渲染之前断开该引用。现在，我们将在更改应用到 DOM 之后才进行引用的更改。
    - 将内容重新渲染到被除 React 之外的其他东西修改过的容器中是不安全的。这之前在某些情况下可行，但从未得到官方支持。现在，我们会在这种情况下发出警告，以提醒用户。  
        您应该使用 `ReactDOM.unmountComponentAtNode` 清理组件树，以下是一个示例。
    - 组件更新生命周期不再接收 prevContext 参数。（@bvaughn 在 `#8631`）
    - 非唯一键可能导致子元素重复或被忽略。使用非唯一键一直不被支持，之前这会引发错误。现在，这种情况被视为硬错误。
    - 浅渲染器不再调用 componentDidUpdate()，因为 DOM 引用不可用，这使得它与 componentDidMount()（在旧版本中同样不会被调用）保持一致。
    - 浅渲染器不再实现不稳定的批量更新功能。
    - 现在回调函数后只需多一个参数。
- 单文件浏览器构建的名称和路径已调整，以突出显示开发版与产品版之间的区别。例如：
    - react/dist/react.js → `react/umd/react.development.js`
    - react/dist/react.min.js → `react/umd/react.production.min.js`
    -   `react-dom/dist/react-dom.js` 转换为 `react-dom/umd/react-dom.development.js`
    -   `react-dom/dist/react-dom.min.js` 转换为 `react-dom/umd/react-dom.production.min.js`

- 服务器渲染器已全新改写，并带来多项改进：
    - 服务器渲染不再使用标记验证，而是尽力附着到现有 DOM 结构上，并就存在的不一致性发出警告。  
        它不再使用注释来标记空组件，也不再在每个节点上使用 data-reactid 属性。
    - 现在为服务器渲染的容器补水功能已明确 API。若要恢复服务器渲染的 HTML，请使用 ReactDOM.hydrate 替代 ReactDOM.render。仅进行客户端渲染时，请继续使用 ReactDOM.render。
- 当将“未知”属性传递给 DOM 组件时，React 会将其有效值渲染到 DOM 中。详情请见相关文章。（@nhunzaker 在`10385`、10564、#10495 等）
- 渲染和生命周期方法中的错误现在默认会卸载组件树。为了防止这种情况发生，您需要在 UI 的相应位置添加错误边界

### [移除已废弃的功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#removed-deprecations)

- 现在已没有 react-with-addons.js 的构建版本了。所有兼容插件都已分别发布到 npm 上，如需，也提供了单文件浏览器版本。
- 在 15.x 版本中，核心包已移除引入的弃用功能。React.createClass 现在称为 create-react-class，React.PropTypes 称为 prop-types，React.DOM 称为 react-dom-factories，react-addons-test-utils 称为 react-dom/test-utils，浅渲染器称为 react-test-renderer/shallow。有关迁移代码和自动化代码重构的详细说明，请参考 15.5.0 和 15.6.0 版本的博客文章。

## [15.7.0 版本（发布于 2020 年 10 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1570-october-14-2020)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-21)

- 将新的 JSX 转换支持回滚至 15.x 版本。（@lunaruan 在#18299 和@gaearon 在`#20024`）

## [15.6.2 版本（发布于 2017 年 9 月 25 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1562-september-25-2017)

### [所有软件包](https://github.com/facebook/react/blob/main/CHANGELOG.md#all-packages-1)

- 从 BSD 专利许可切换至 MIT 许可

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-35)

- 修复修改 document.documentMode 时，导致其他浏览器触发 IE 检测并中断事件触发的 bug。（@aweary 在 `#10032`）
- CSS 列被视为无单位数值。（@aweary 在 `#10115`）
- 修复 QtWebKit 在代理中处理合成事件时的 bug。（@walrusfruitcake 在`#10115`）
- 阻止开发阶段事件处理器接收额外参数。（@aweary 在 `#10115`）
- 修复了单选按钮默认选中时不会触发 onChange 事件的 bug（@jquense 在#10156 中提出）
- 支持将 controlList 属性添加到允许的 DOM 属性中（@nhunzaker 在 `#9940`）
- 修复构造函数中创建带有引用（ref）的元素时未抛出错误的问题。（@iansu 在 `#10025`）

## [15.6.1 版本（发布于 2017 年 6 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1561-june-14-2017)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-36)

- 修复 iOS Safari 浏览器上的崩溃问题。（@jquense 在 `#9960`）
- 不要在自定义 CSS 属性值后添加 px。

## [15.6.0 版本（发布于 2017 年 6 月 13 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1560-june-13-2017)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-22)

- 将降级弃用警告改为使用 console.warn 而不是 console.error。（@flarnie 在 `#9753`）
- 为 React.createClass 添加弃用警告，并指引用户使用 create-react-class 替代。 (@flarnie 在 #9771)
- 添加弃用警告，并为 React.DOM 工厂助手创建独立模块。（@nhunzaker 在 `#8356`）
- 警告：React.createMixin 辅助函数已被弃用，该函数从未被使用过。（@aweary 在 `#8853`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-37)

- 在样式属性中添加对 CSS 变量的支持。（由 @aweary 在 #9302 提出）
- 添加对 CSS 网格样式属性的支持。（由 @ericsakmar 在 #9185 中提出）
- 修复类型转换时输入值被修改的 bug 问题。（@nhunzaker 在#9806 中提出）
- 修复某些输入的 onChange 事件无法正常触发的 bug。（@jquense 在#8575 中提到）
- 修复了在控制数字输入时错误地允许了小数点的 bug，使问题得到解决。（@nhunzaker 在#9584 中）
- 修复了性能条目被清除的 bug 问题。（@chrisui 在#9451 中）

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons)

- 修复依赖 React 的插件对 AMD 的支持问题。（@flarnie 在 `#9919`）
- 在 componentWillUnmount 中修复 isMounted() 返回 true 的问题（@mridgway 在 `#9638`）
- 修复 react-addons-update，使其不依赖于原生的 Object.assign。（@gaearon 在 `#9937`）
- 从 create-react-class 中移除损坏的 Google Closure Compiler 注释。（@gaearon 在 `#9933`）
- 从 react-linked-input 中移除不必要的依赖。（@gaearon 在 `#9766`）
- 请将 0#指向新包。（@gaearon 在`#9937`）

## [15.5.4 版本（发布于 2017 年 4 月 11 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1554-april-11-2017)

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons-1)

- 临界性修复：更新 prop-types 的版本，修复关键性错误。（@gaearon 在提交 545c87f 中）
- 修复 `react-addons-create-fragment` 包，添加 loose-envify 转换功能，以方便 Browserify 用户使用。（@mridgway 在 #9642 中提出）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-6)

- 通过暴露浅渲染器的 batchedUpdates 来修复与 Enzyme 的兼容性问题。（@gaearon 在 9382）

## [15.5.3 版本（发布于 2017 年 4 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1553-april-7-2017)

**注意：本版本存在重大问题，已被淘汰。请升级至 15.5.4 或更高版本。**

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons-2)

- 修复 `react-addons-create-fragment` 包，确保导出正确的内容。（@gaearon 在 `#9385`）
- 修复 create-react-class 包，使其包含 loose-envify 转换功能，方便 Browserify 用户使用。（@mridgway 在 `#9642`）

## [15.5.2 版本（发布于 2017 年 4 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1552-april-7-2017)

**注意：本版本存在重大问题，已被淘汰。请升级至 15.5.4 或更高版本。**

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons-3)

- 修复生产环境下的单文件构建，确保不包含开发代码。（@gaearon 在 `#9385`）
- 对生产环境中的单文件构建应用更有效的压缩优化。（@gaearon 在 `#9385`）
- 将包中缺失的依赖添加，并移除不必要的依赖。（@gaearon 在 `#9385`）

## [15.5.1 版本（发布于 2017 年 4 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1551-april-7-2017)

**注意：本版本存在重大问题，已被淘汰。请升级至 15.5.4 或更高版本。**

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-23)

- 修复因错误的 PropTypes 访问而产生的警告。（@acdlite 在 (ec97ebb)）

## [15.5.0 版本（发布于 2017 年 4 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1550-april-7-2017)

**注意：本版本存在重大问题，已被淘汰。请升级至 15.5.4 或更高版本。**

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-24)

- ~~为 React.createClass 添加了弃用警告，并指引用户使用 create-react-class 替代。 (@acdlite 在 `#d9a4fa4`)~~
- 为 React.PropTypes 添加了弃用警告，并指引用户使用 prop-types。感谢 @acdlite 在 `#043845c` 的贡献。
- 修复了在使用 ReactDOM 和 ReactDOMServer 一起时遇到的问题。（@wacii 在 `#9005`）
- 修复了 Closure Compiler 的问题，使其更加稳定。 (@anmonteiro 在 #8895)
- 另一个 Closure Compiler 的修复。（@Shastel 在 `#8882`）
- 将组件堆栈信息添加到无效元素类型警告中。（@n3tr 在 `#8495`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-38)

- 修复了在数字输入框中退格时出现的 Chrome 浏览器 bug，使操作更加流畅。（@nhunzaker 在`#7359`）
- 添加了 react-dom/test-utils 包，该包导出 React 测试工具。（@bvaughn）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-7)

- 修复了子组件未正确调用 componentWillUnmount 方法的问题。（@gre 在 `#8512`）
- 添加了 `react-test-renderer/shallow` 功能，用于导出浅渲染器。（@bvaughn）

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons-4)

- 最后一个插件版本；它们将不再得到积极维护。
- 移除 peerDependencies，以确保插件能够无限期地运行。（由 @acdlite 和 @bvaughn 在 8a06cd7 和 67a8db3 中完成）
- 更新后移除了对 React.createClass 和 React.PropTypes 的引用（@acdlite 在提交 12a96b9 中）
- react-addons-test-utils 已弃用，请使用 and 替代。（）

## [15.4.2 版本（发布于 2017 年 1 月 6 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1542-january-6-2017)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-25)

- 修复了 Brunch 打包器的问题。（@gaearon 在 `#8686`）
- 优化了无效元素类型的错误提示信息。（@sophiebits 在 `#8612`）
- 移除了关于当设置 this.state 时获取初始状态的警告。（@bvaughn 在 `#8594`）
- 移除了一些无效代码。（@diegomura 在 `8050`，@dfrownfelter 在 `#8597`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-39)

- 修复了未受控数字输入中小数点的问题。（@nhunzaker 在 `#7750`）
- 在 IE11 中固定 textarea 占位符的渲染。（@aweary 在`#8020`）
- 在 IE9 中绕过脚本引擎的 bug。（由@eoin 在#8018 提出）

### [React 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-addons-5)

- 在 RequireJS 和 SystemJS 环境中解决了固定构建问题。（@gaearon 在 `#8686`）
- 添加了遗漏的软件包依赖项。（@kweiberth 在 `#8467`）

## [15.4.1 版本（发布于 2016 年 11 月 22 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1541-november-22-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-26)

- 重新结构化变量赋值以规避 Rollup 的 bug（@gaearon 在#8384 中）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-40)

- 在禁用按钮元素上固定事件处理（@sophiebits 在 `#8387`）
- 修复浏览器构建与 AMD 环境兼容性问题（@zpao 在#8374 中）

## [15.4.0 版本（发布于 2016 年 11 月 16 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1540-november-16-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-27)

- React 包和浏览器构建不再“偷偷”包含 React DOM。（@sebmarkbage 在 #7164 和 `#7168`）
- 现在必需的 PropTypes 对于 null 和 undefined 会显示特定的错误信息（@chenglou 在 `#7291`）
- 通过冻结子节点而非复制，有效提升了开发性能。（@keyanzhang 在 `#7455`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-41)

- 修复了在使用 React DOM 和浅渲染器时偶尔出现的测试失败问题。（@goatslacker 在 `#8097`）
- 添加了对无效的 aria-属性的警告提示。（@jessebeach 在 `#7744`）
- 添加了对使用 autofocus 而非 autofocus 属性的警告提示。（@hkal 在#7694 中）
- 移除了关于 polyfilling String.prototype.split 的不必要警告，使描述更加简洁明了。（在）
- 清晰地说明了不要手动调用 PropTypes 的警告。（@jedwards1211 在 `#7777`）
- 不稳定的 batchedUpdates API 现在会将包装函数的返回值传递出去
- 修复了在 IE 8 中更新文本的 bug。（@mnpenner 在`#7832`）

### [React 性能](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf)

- 当 ReactPerf 启动后，您现在可以在 Chrome 时间轴中以图表的形式查看组件的相对耗时。（@gaearon 在 `#7549`）

### [React 测试工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-utils-1)

- 在 `<input disabled onClick={foo} />` 上调用 Simulate.click()后，foo 会被触发，之前并没有这种情况。（@nhunzaker 在#7642 中提到）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-8)

- 由于打包方式的变更，现在即使与 React DOM 在同一文件中导入也不会崩溃了。（@sebmarkbage 在 #7164 和 `#7168`）
- 现在支持使用 `{createNodeMock: element => mock}` 作为可选参数，这样您就可以在快照测试中模拟引用。（由 @Aweary 在 `7649`、#8261 中提出）

## [15.3.2 版本（发布于 2016 年 9 月 19 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1532-september-19-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-28)

- 从 React.createElement 和 React.cloneElement 中移除普通对象警告。（@spudly 在`#7724`） 

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-42)

- 将 playsInline 添加到支持的 HTML 属性中。（@reaperhulk 在 `#7519`）
- 添加至支持的 HTML 属性列表。（@kevinslin 在#7582 中）
- 优化 DOM 嵌套验证警告中的空格问题描述。（@sophiebits 在`#7515`）
- 避免在 IE10 中调用合成事件中的`preventDefault()`方法时出现“成员未找到”异常。（@g-palmer 在`#7411`）
- 修复 onSelect 实现中的内存泄漏问题。（@AgtLucas 在 `#7533`）
- 改进文档.documentMode 检查的鲁棒性，以更好地处理 Google Tag Manager。（@SchleyB 在 `#7594`）
- 添加更多到受控输入警告的案例。（@marcin-mazurek 在 `#7544`） 
- 处理弹出窗口阻止程序覆盖 document.createEvent 的情况（@Andarist 在 #7621 中提到）
- 修复与 Internet Explorer 中的 dangerouslySetInnerHTML 和 SVG 相关的问题。
- 改进在 Internet Explorer 上处理日语输入法的用户体验。（@msmania 在 `#7107`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-9)

- 支持错误边界功能。（@millermedeiros 提出，详见 `7558`、`7569`、`#7619`）
- 跳过“空引用”警告提示。（@Aweary 在 `#7658`）

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on)

- 确保在出现错误时停止生命周期计时器。（@gaearon 在 `#7548`）

## [15.3.1 版本（发布于 2016 年 8 月 19 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1531-august-19-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-29)

- 以多种方式提升开发构建的性能。（@gaearon 在 `7461`、`7463`、`7483`、`7488`、`7491`、`#7510`）
- 清理内部`Hook`，以提升开发构建的性能。（@gaearon 在 `7464`、`7472`、`7481`、`#7496`）
- 升级 fbjs 以获取@gaearon 为开发版本带来的另一个性能提升。（@zpao 在`#7532`）
- 提高 React 在 Node.js 中的启动速度。（@zertosh 在`#7493`）
- 改进 React.Children.only 的错误信息提示。（@sophiebits 在 `#7514`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-43)

- 避免在更改输入类型时触发浏览器的验证警告。（@nhunzaker 在 `#7333`）
- 避免在 IE10 中调用合成事件中的`stopPropagation()`方法时出现“成员未找到”异常。（@nhunzaker 在`#7343`）
- 修复导致移动浏览器中某些`<input></input>`元素无法更新的问题。（@keyanzhang 在 `#7397`）
- 修复服务器渲染过程中的内存泄漏问题。（@keyanzhang 在 `#7410`）
- 修复因更改最小值或最大值而导致的`<input></input>`控件值无法更新的问题。（@troydemonbreun 在`#7486`）
- 添加对新情况的新警告：尝试卸载由不同副本的 React 拥有的容器。（@ventuno 在 `#7456`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-10)

- 修复 ReactTestInstance::toJSON()处理空顶层组件的问题（@Morhaus 在#7523 中提出）

### [React Native 渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-native-renderer)

- 将跟踪的 touchCount 不变性转换为 console.error，以增强可靠性。（@yungsters 在`#7400`）

## [15.3.0 版本（发布于 2016 年 7 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1530-july-29-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-30)

- 添加 React.PureComponent 作为新的基类进行扩展，以替代 `react-addons-pure-render-mixin` 因为混入（mixins）现在无法与 ES2015 类一起使用。（@sophiebits 在 `#7195`）
- 修改 this.props.children 时，新增警告提示。（@jimfb 在 `#7001`）
- 修复了引用解析顺序的问题。（@gaearon 在 `#7101`）
- 当 mixin 未定义时发出警告。（@swaroopsm 在`#6158`）
- 将“意外批次号”的不变性降级为警告。（@sophiebits 在 `#7133`）
- 尽早验证 oneOf 和 oneOfType PropTypes 参数（@troydemonbreun 在 `#6316`）
- 警告直接调用 PropTypes（@Aweary 在`7132`，`#7194`）
- 优化使用 Maps 作为子元素时的警告提示（@keyanzhang 在 `#7260`）
- 将额外的类型信息添加到 PropTypes.element 警告中。（由@alexzherdev 在#7319 中提出）
- 改进无操作 setState 警告中的组件识别。（@keyanzhang 在 `#7326`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-44)

- 修复嵌套服务器渲染问题。（@Aweary 在 `#7033`）
- 将 xmlns 和 xmlnsXlink 添加到支持的 SVG 属性中。（@salzhrani 在 `#6471`）
- 将 referrerPolicy 添加到支持的 HTML 属性中。（由 @Aweary 在 #7274 提出）
- 修复因`<input></input>`初始值四舍五入而产生的问题。（@troydemonbreun 在 `#7251`）

### [React 测试渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-test-renderer-11)

- 包含更聚焦测试功能的初始公共版本。请使用 `npm install react-test-renderer` . （@sophiebits 在 #6944, #7258, @iamdustan 在 `#7362`）

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-1)

- 解决在遇到内部测量错误时导致警告过多的 bug。（@sassanh 在 `#7299`）

### [React 测试工具插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-testutils-add-on)

- 在通过 TestUtils.Simulate.*创建的事件上实现类型属性。（@yaycmyk 在 `#6154`）
- 修复使用 React 生产构建版本运行 TestUtils 时出现的崩溃问题。（@gaearon 在 `#7246`）

## [15.2.1 版本（发布于 2016 年 7 月 8 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1521-july-8-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-31)

- 修复关于缺少 React 元素的错误警告。（@gaearon 在 `#7193`）
- 更好地移除仅开发使用的代码，从而使得最终输出的生产包体积有所减小。（@gaearon 在 `7188`，`#7189`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-45)

- 将堆栈跟踪添加到空输入值警告中。（@jimfb 在 `#7040`）
- 修复 web 组件示例。（@jalexanderfox 在#7057 中）
- 修复 `unstable_renderSubtreeIntoContainer` ，确保在链接到状态时Context能够正确更新。（@gaearon 在 `#7125`）
- 改进空元素的不变表述（@starkch 在 `#7066`）
- 确保服务器渲染过程中事件处理器不会引发错误。（@rricard 在 `#7127`）
- 修复导致提交和重置按钮无值显示的回归问题，并移除浏览器默认文本。（@zpao 在 `#7197`）
- 修复因未提供而导致的输入元素添加空名称属性的问题，使问题回归得到解决。（@okonet 在 `#7199`）
- 修复嵌套服务器渲染问题。（@Aweary 在 `#7033`）

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-2)

- 在生命周期方法中确保 ReactPerf.start() 正常运行。（@gaearon 在 #7208 中提出。）

### [React CSSTransitionGroup 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-csstransitiongroup-add-on)

- 修复因问题导致出现的虚假未知属性警告。（@batusai513 在 `#7165`）

### [React Native 渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-native-renderer-1)

- 改进跨平台触摸事件处理中的错误处理。（@yungsters 在 `#7143`）

## [15.2.0 版本（发布于 2016 年 7 月 1 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1520-july-1-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-32)

- 将错误代码添加至生产环境的不变量中，并附上链接以便查看完整的错误信息。（@keyanzhang 在 `#6948`）
- 在 PropType 验证警告中加入组件堆栈信息，使警告内容更清晰。（@troydemonbreun 在`6398`，@sophiebits 在`#6771`）
- 在关键警告信息中添加组件堆栈信息。（@keyanzhang 在 `#6799`）
- 停止在组件挂载时验证属性，仅在元素创建时进行验证。（@keyanzhang 在 `#6824`）
- 新的不变量，在实例缺失的情况下提供可操作的错误。（@yungsters 在 `#6990`）
- 将 React.PropTypes.symbol 添加以支持 ES2015 Symbols 作为 props，以更好地支持新的特性。
- 修复开发中未定义的引用或键的不正确强制转换（@gaearon 在 `#6880`） 
- 修复将其他元素的属性传递给 cloneElement 时出现的误报问题（@ericmatthys 在 `#6268`）
- 警告：在函数组件上尝试定义 childContextTypes（@Aweary 在 `#6933`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-46)

- 在 DOM 元素上添加对未知属性的警告提示。（@jimfb 在`6800`，@gm758 在`#7152`）
- 正确移除自定义元素的属性。（@grassator 在 `#6748`）
- 修复属性名称正则表达式中的无效 Unicode 转义。（@nbjahan 在 `#6772`）
- 为元素添加加载处理功能。（由@roderickhsiao 在#6815 中提出）
- 将错误处理功能添加到 <source> 元素中。（@wadahiro 在 `#6941`）
- 在 DOM 中更准确地处理值和默认值。（@jimfb 在#6406 中）
- 修复在 Object.prototype 已变异的环境中的事件问题。（@Weizenlol 在 `#6886`）
- 修复 Firefox 中因 is="null"导致的 DOM 结束错误问题。（@darobin 在`#6896`）
- 使用 escape-html 提升文本转义性能，性能得到改善。（@aickin 在 `#6862`）
- 修复与 Internet Explorer 中的 dangerouslySetInnerHTML 和 SVG 相关的问题。
- 修复 <textarea> 占位符的问题。（@jimfb 在 `#7002`）</textarea>
- 修复对`<input></input>`的受控与不受控检测问题（@jimfb 在 `#7003`）
- 提升更新文本内容性能。（@trueadm 在 `#7005`）
- 确保受控的<select>组件在首次渲染和更新时表现一致。（@yiminghe 在 `#5362`）</select>

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-3)

- 添加 isRunning() API 功能。（由 @nfcampos 提出，在 `#6763`）
- 提升生命周期`Hook`触发时间的准确性。（@gaearon 在 `#6858`）
- 使用 ReactPerf 与 portal 组件时修复内部错误。（@gaearon 在 `#6860`）
- 修复性能回归问题。（@sophiebits 在 `#6770`）
- 在生产环境中添加警告：ReactPerf 功能未开启。（@sashashakun 在 `#6884`）

### [React CSSTransitionGroup 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-csstransitiongroup-add-on-1)

- 修复与空节点相关的定时问题。（@keyanzhang 在 `#6958`）

### [React Native 渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-native-renderer-2)

- React Native 模块的依赖项使用 CommonJS 的`requires`代替`providesModule`，这是由@davidaurelio 在#6715 中提出的。

## [15.1.0 版本（发布于 2016 年 5 月 20 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1510-may-20-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-33)

- 确保使用最新的 object-assign，它能够防止非规范兼容的本地 Object.assign，提供更好的保护。（@zpao 在 `#6681`）
- 添加一条新警告，指出传递给 createElement 的 props 对象必须是纯对象。这一要求由@richardscarrott 在#6134 议题中提出。
- 修复因批处理错误导致某些生命周期方法被多次错误调用的 bug。（@sophiebits 在 `#6650`）

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-47)

- 修复自定义元素支持中的回归问题。（@jscissr 在 `#6570`）
- 停止错误地警告使用 onScroll 事件处理器进行服务器端渲染。（@Aweary 在 `#6678`）
- 修复受控输入警告中的语法错误。（@jakeboone02 在 `#6657`）
- 修复了在 IE 中导致 节点无法读取 节点的错误。 (@syranide 在 #6691)
- 修复在使用实验性错误边界和服务器渲染时引发崩溃的问题。（@jimfb 在 `#6694`）
- 在控制输入警告中添加额外信息。（@borisyankov 在 `#6341`）

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-4)

- 完全重写，以更精确地收集数据并便于维护。（@gaearon 在 `6647`，`#6046`）

### [React Native 渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-native-renderer-3)

- 移除针对特定平台的分支的特殊情况。（@sebmarkbage 在 `#6660`）
- 移除合并工具的使用。（由 @sebmarkbage 提出，见 `#6634`）
- 将一些模块重命名，以更清晰地表明其用途（@javache 在 `#6643`）

## [15.0.2 版本（发布于 2016 年 4 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1502-april-29-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-34)

- 已从 npm 包中移除不必要的文件。（@gaearon 在 `#6388`）
- 确保组件卸载时，unmountComponentWillUnmount 只执行一次。（@jimfb 在#6613 中）

### [React 的 DOM 库](https://github.com/facebook/react/blob/main/CHANGELOG.md#reactdom)

- 修复了在 IE 中导致禁用按钮无法响应鼠标事件的 bug。（@nhunzaker 在#6215 中）
- 确保在 <optgroup> 内正确选中 <option> 选项。（@trevorsmith 在 `#6442`）</option></optgroup>
- 恢复支持将渲染内容输出到阴影根。（@Wildhoney 在 `#6462`）
- 确保在检测无效标记时能够捕捉到嵌套的 元素。（@keyanzhang 在 `#6469`）
- 当遇到多个具有相同键的元素时，优化警告提示信息。（@hkal 在 `#6500`）

### [React 测试工具插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-testutils-add-on-1)

- 确保功能组件没有拥有者。（@gaearon 在 `#6362`）
- 处理对 `scryRenderedDOMComponentsWithClass` 的无效参数（@ipeters90 在#6529 中）

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-5)

- 忽略批处理操作之外发生的 DOM 操作。（@gaearon 在 `#6516`）

### [React Native 渲染器](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-native-renderer-4)

- 这些文件现在被包含在 React 的 npm 包内，对 React 核心或 ReactDOM 没有影响。

## [15.0.1 版本（发布于 2016 年 4 月 8 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1501-april-8-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-35)

- 恢复 React.__spread API，以解决使用该未公开 API 编译的代码可能出现的错误。现在该 API 已正式宣布弃用。（@zpao 在 `#6444`）

### [React 的 DOM 库](https://github.com/facebook/react/blob/main/CHANGELOG.md#reactdom-1)

- 修复了在受控输入中导致光标位置丢失的问题。（@sophiebits 在 `#6449`）

## [15.0.0 版本（发布于 2016 年 4 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#1500-april-7-2016)

### [主要变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#major-changes)

- 初始渲染现在采用 document.createElement 替代直接生成 HTML。以前，我们会生成一大段 HTML 代码，然后进行设置。当时我们认为这种方法比使用 document.createElement 在我们支持的多数浏览器中更快。但随着浏览器技术的不断进步，这一观点已经不再适用。通过使用 document.createElement，我们可以让 React 的其他部分运行得更快。（在）
- **data-reactid is no longer on every node.**使用 document.createElement 后，我们可以在创建 DOM 节点时预先填充节点缓存，这样我们就可以跳过可能的查找（使用了属性）。根节点将具有属性，服务器生成的标记仍然包含点（.）和括号（）。
- 没有更多额外的 `。ReactDOM 现在将渲染带有分隔注释的纯文本节点。`  
    这使我们能够更新单个文本片段，无需创建额外的嵌套节点。如果您针对这些`元素应用 CSS，则需要相应调整。您始终可以在组件中显式渲染它们。（@mwiencek 在`#5753`）`
- 现在渲染 null 时使用注释节点，之前 null 会渲染到
- 功能组件现在可以返回 null 了。React 0.14 版本中，我们支持将无状态组件定义为函数，但仍然允许定义不继承自 React.Component 或使用 React.createClass()的类组件，因此我们无法准确判断组件是函数还是类，也不允许从这类组件中返回 null。这一限制在 React 15 版本中得到了解决，现在无论是类组件还是函数组件，都可以返回 null。（@jimfb 在`#5884`）
- 改进了 SVG 支持。现在所有 SVG 标签都得到了全面支持。（不常见的 SVG 标签未包含在 React.DOM 元素辅助器中，但 JSX 和 React.createElement 可以处理所有标签名。）所有浏览器支持的 SVG 属性也应得到支持。如发现我们遗漏了任何属性，请在此问题中告知我们。（@zpao 在`#6243`）

### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-2)

-  **没有更多多余的**
- React.cloneElement() 现在可以解析 defaultProps。我们修复了 React.cloneElement() 中的一个 bug，某些组件可能依赖于它。如果 cloneElement() 收到的某些属性未定义，以前它会返回一个这些属性值为未定义的元素。现在我们将其修改为与 createElement() 保持一致，即所有传递给 cloneElement() 的未定义属性都将映射到对应组件的 defaultProps 上。 (@truongduy134 在 #5997)
- `ReactPerf.getLastMeasurements()` 是不可见的。这次改动不会影响应用，但可能会影响到某些第三方工具。我们正在对 ReactPerf 进行重构，并计划在 15.x 版本周期内推出。内部性能测量格式可能会发生变化，因此，目前我们认为 `ReactPerf.getLastMeasurements()` 的返回值是一个不应依赖的不透明数据结构。（@gaearon 在 `#6286`）

#### [移除已弃用的功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#removed-deprecations-1)

这些弃用功能九个月前在 v0.14 版本中引入，并发出警告，现已删除：

- 已废弃的 API 已从顶层导出中移除：， ， ， ，和 unmountComponentAtNode。提醒一下，现在它们可在和上使用。（在）
- 已弃用的插件已被移除：批量更新和带有属性的克隆。（@jimfb 在 `5859`，@zpao 在 `#6016`）
- 已废弃的组件实例方法已被移除：setProps、replaceProps 和 getDOMNode。（@jimfb 在 `#5570`）。
- 已废弃的 CommonJS react/addons 入口点已被移除。请记住，您应该使用独立的 react-addons-*包。这仅适用于您使用 CommonJS 构建的情况。（@gaearon 在 `#6285`）
- 将子元素传递给如`<input></input>`等空元素的做法已被弃用，现在会引发错误。 （@jonhester 在 `#3372`）
- React 在 DOM 引用上的特定属性（例如 this.refs.div.props）已被弃用，现在已移除。（@jimfb 在#5495 中提到）

### [新增弃用功能，并附带警告提示](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-deprecations-introduced-with-a-warning)

这些更改将继续按之前的方式工作，直到 React 16 发布，以便您可以逐步升级您的代码。 这些更改将继续按之前的方式工作，直到 React 16 版本发布，您可以根据需要逐步更新您的代码，以避免一次性进行大量更改。

- LinkedStateMixin 和 valueLink 由于使用率极低现已弃用。如需使用，请使用实现相同功能的包装组件：react-linked-input。（@jimfb 在 `#6127`）
- React 未来版本会将`<input></input>`视为清除输入的请求。但 React 0.14 版本忽略了 value={null}。React 15 版本会在输入值为 null 时发出警告，并建议你明确意图。要解决这个警告，你可以明确传递空字符串来清除受控输入，或者传递 undefined 来使输入变为非受控状态。（@antoaravinth 在`#5048`）
- ReactPerf.printDOM() 已更名为 `ReactPerf.printOperations()` ， `ReactPerf.getMeasurementsSummaryMap()` 已更名为 ReactPerf.getWasted()。（由 @gaearon 在 #6287 提出）

### [新增实用警告](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-helpful-warnings)

- 如果您使用开发版本的压缩版本，React DOM 会友好地建议您使用更快的生产版本。（@sophiebits 在 `#5083`）
- 当将无单位的 CSS 值作为字符串指定时，未来版本将不会自动添加。此版本现在会发出警告（例如：将样式设置为 style={{width: '300'}}。无单位的值保持不变。（在）
- 合成事件现在会在设置和访问属性时发出警告，这些属性不会被适当清除，同时也会在事件返回池后访问时发出警告。（@kentcdodds 在 #5940 和 @koba04 在 `#5947`）
- 当尝试从 props 中读取 ref 和 key 属性时，元素现在会发出警告（@prometheansacrifice 在 `#5744`）
- React 在构造函数中调用 super() 时，如果传入不同的 props 对象，现在会发出警告。（@prometheansacrifice 在 `#5346`）
- React 现在会警告你，不要在 getChildContext() 中调用 setState()
- React DOM 现在会尝试提醒用户在 DOM 元素上输入了错误的处理函数名称，比如 onclick 应该是 onClick。（@ali 在 `#5361`）
- React DOM 现在会提醒开发者样式对象中存在 NaN 值。（@jontewks 在 `#5811`）
- React DOM 现在会提醒你，不要同时为 input 元素指定 value 和 defaultValue 属性。
- React DOM 现在会提醒用户，如果输入元素在受控和非受控状态之间切换。 (@TheBlasfem 在 #5864)
- React DOM 现在会提醒您，不要指定 onFocusIn 或 onFocusOut 事件处理器，因为它们在 React 中是多余的。（@jontewks 在 `#6296`）
- 当你将无效的回调函数作为 ReactDOM.render()、this.setState()或 this.forceUpdate()的最后一个参数传递时，React 会显示一个描述性的错误信息。（@conorhastings 在#5193 和@gaearon 在`#6310`）
- 扩展工具：TestUtils.Simulate() 现在如果在浅渲染中使用，会显示一条有用的提示信息。（@conorhastings 在 `#5358`）
- PropTypes: arrayOf() 和 objectOf() 提供了更清晰的错误信息，有助于识别无效参数。 (@chicoxyzzy 在 #5390)

### [显著的错误修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#notable-bug-fixes)

- 修复了多个小内存泄漏问题。 (@sophiebits 在 #4983 和 @victor-homyakov 在 #6309)
- 在 IE 10 和 IE 11 浏览器中，输入事件的处理更加稳定可靠；使用占位符后，不再出现误触发的事件。（@jquense 在`#4051`）
- 当Context发生变化时，生命周期方法现在被统一调用。（@milesj 在 `#5787`）
- React.cloneElement() 在 React.Children.map() 内部使用时不会给现有键名添加斜杠。（@ianobermiller 在 `#5892`）
- React DOM 现已支持 cite 和 profile HTML 属性。 (@AprilArcus 在 #6094 和 @saiichihashimoto 在 #6032)
- React DOM 现已支持 cssFloat、gridRow 和 gridColumn 这三个 CSS 属性。（@stevenvachon 在 #6133 和 @mnordick 在 `#4779`）
- React DOM 现已正确处理 borderImageOutset、borderImageWidth、borderImageSlice、floodOpacity、strokeDasharray 和 strokeMiterlimit 等无单位 CSS 属性。这些改进由 @rofrischmann 提出，相关讨论在 #6210 和 #6270 中。
- React DOM 现已支持 onAnimationStart、onAnimationEnd、onAnimationIteration、onTransitionEnd 和 onInvalid 事件。同时，object 元素也增加了 onLoad 事件的支持。（由 @tomduncalf 在 `5187`、@milesj 在 #6005 和 @ara4n 在 #5781 提出）
- React DOM 默认使用 DOM 属性而非属性，修复了一些边缘情况的问题。现在，当值为空（如 href={null}）时，会直接删除，不再尝试设置为浏览器默认值。（@syranide 在 `#1510`）
- React DOM 不会错误地将子组件强制转换为字符串，以适应 Web 组件。（@jimfb 在`#5093`）
- React DOM 现已正确规范化 SVG 的
- React DOM 在 <select> 组件未卸载且其 onChange 事件处理函数正在执行时不会引发错误。（@sambev 在 `#6028`）</select>
- React DOM 在 Windows 8 应用中不会抛出异常。（@Andrew8xx8 在#6063 中提到）
- React DOM 在异步卸载带有引用的子组件时不会抛出异常。（@yiminghe 在 `#6095`）
- React DOM 不再因滚动位置跟踪而强制进行同步布局，这一改动由@syranide 在#2271 中提出。
- Object.is 在多个地方用于比较值，有效减少了假阳性，尤其是在与 NaN 相关的情况下。特别是，这影响了 shallowCompare 插件。（@chicoxyzzy 在 `#6132`）
- ReactPerf 插件不再检测添加或删除事件监听器，因为它们并不直接操作 DOM，而是通过事件委托机制来实现。 (@antoaravinth 在 #5209)

### [其他改进](https://github.com/facebook/react/blob/main/CHANGELOG.md#other-improvements)

- React 现在不再使用 envify，而是使用 loose-envify，这样可以减少安装的间接依赖数量。（@qerub 在#6303 中提到）
- 浅渲染器现已公开 getMountedInstance()方法。（@glenjamin 在`#4918`）
- 浅渲染器现在从 `render()` 函数返回渲染后的输出。（@simonewebdesign 在 `#5411`）
- React 不再依赖 ES5 的 Object.create 和 Object.freeze 在旧环境中工作。但在这类环境中，它仍需使用 ES5 的 shim。（@dgreensp 在`#4959`）
- React DOM 现在支持以数字开头的数据-属性。这一功能由 @nLight 提出，详见 #5216。
- React DOM 为像 Draft.js 这样的组件添加了一个新的 `suppressContentEditableWarning` 属性，这些组件特意使用 React 来管理可编辑内容的子元素。（@mxstbr 在 #6112 中）
- React 在复杂规格上使用 createClass()的性能得到了提升。（@sophiebits 在 `#5550`）

## [0.14.10 版本（发布于 2020 年 10 月 14 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#01410-october-14-2020)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-36)

- 将新的 JSX 转换支持回滚至 0.14.x 版本。（@lunaruan 在#18299 和@gaearon 在`#20024`）

## [0.14.8 版本（发布于 2016 年 3 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0148-march-29-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-37)

- 服务器渲染时成功修复了内存泄漏问题

## [0.14.7 版本（发布于 2016 年 1 月 28 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0147-january-28-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-38)

- 修复了在使用 dangerouslySetInnerHTML 时标签的问题
- 固定合成事件系统中的内存泄漏问题

### [React 测试工具插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-testutils-add-on-2)

- 解决了在使用浅渲染时在 componentWillMount 中调用 setState 的 bug

## [0.14.6 版本（发布于 2016 年 1 月 6 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0146-january-6-2016)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-39)

- 更新 fbjs 依赖，以获取影响处理未定义文档的更改。改进：更新 fbjs 依赖项，以获取影响处理未定义文档的更改。

## [0.14.5 版本（发布于 2015 年 12 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0145-december-29-2015)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-40)

- 为更好地与 React Native 兼容进行的更多细微调整

## [0.14.4 版本（发布于 2015 年 12 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0144-december-29-2015)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-41)

- 为更好地与 React Native 兼容进行的微小内部调整

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-48)

- 自动大写和自动更正属性现在被设置为 DOM 属性，而不是属性，这样做是为了增强跨浏览器的兼容性
- 修复了控制 <select> 元素更新处理不当的问题</select>

### [React 性能插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-perf-add-on-6)

- 一些 DOM 操作名称已更新，使.printDOM()的输出

## [0.14.3 版本（发布于 2015 年 11 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0143-november-18-2015)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-49)

- 增强了对
- 添加了对<ol>元素反向属性的支持，增强了功能兼容性</ol>

### [React 测试工具插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-testutils-add-on-3)

- 修复了浅渲染和函数引用相关的 bug

### [React CSSTransitionGroup 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-csstransitiongroup-add-on-2)

- 修复了快速挂载和卸载时触发的错误，导致超时错误触发不正确

### [React 在 Bower 上的使用](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-on-bower)

- 已将 react-dom-server.js 添加至项目中，以便在浏览器端使用 renderToString 和 renderToStaticMarkup 函数

## [0.14.2 版本（发布于 2015 年 11 月 2 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0142-november-2-2015)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-50)

- 修复了某些版本 Internet Explorer 和 Edge 开发版本中阻止事件触发的 bug，使问题得到解决
- 修复了在旧版 Internet Explorer 中使用 es5-sham 导致的开发构建 bug 问题
- 添加了对完整性属性的支持
- 修复了因自定义元素中 children 属性被错误地强制转换为字符串而导致的 bug，这并非预期行为
- 将 react 从依赖项移动到 peerDependencies，以符合预期并与 react-addons-*包保持一致

## [0.14.1 版本（发布于 2015 年 10 月 28 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0141-october-28-2015)

### [React DOM](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom-51)

- 修复了在旧版浏览器中使用 React 开发模式时事件无法触发的 bug
- 修复了在 Closure Compiler 高级模式下无法使用 dangerouslySetInnerHTML 的 bug
- 添加了对 <track> 元素的 srcLang、默认和 kind 属性的支持
- 添加了对颜色属性的支持
- 确保在重新渲染时更新 DOM 节点上的旧版 props 访问

### [React 测试工具插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-testutils-add-on-4)

- 将 `scryRenderedDOMComponentsWithClass` 固定，以便与 SVG 兼容

### [React CSSTransitionGroup 插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-csstransitiongroup-add-on-3)

- 修复防止将 0 用作超时值的 bug

### [React 在 Bower 上的使用](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-on-bower-1)

- 将 react-dom.js 添加到主文件中，以增强与工具的兼容性

## [0.14.0 版本（发布于 2015 年 10 月 7 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0140-october-7-2015)

### [主要变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#major-changes-1)

- 将主 react 包拆分为 react 和 react-dom 两个包。这样可以为编写既适用于 React 网页版也适用于 React Native 的组件打下基础。  
    这意味着您需要同时包含这两个文件，并且一些函数已被从 React 迁移到 ReactDOM。
- 插件已被移至独立的包中（, , , , , , react-addons-test-utils, , react-addons-update, ）
- 无状态函数组件 - 之前 React 组件的创建主要依赖于 React.createClass 或 ES6 类。本次更新引入了一种新的语法，用户只需定义一个接受 props 参数的单状态无状态渲染函数，该函数返回一个 JSX 元素，这个函数即可作为组件使用。
- 将 DOM 组件作为 DOM 节点引用。之前，您只能通过调用 getDOMNode() 方法来获取底层 DOM 节点来使用 DOM 组件。从本版本开始，对 DOM 组件的引用就是实际的 DOM 节点。需要注意的是，对自定义组件的引用仍然保持不变；只有内置的 DOM 组件受到了这次改动的影响。

### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-3)

- 现在不再需要 `React.initializeTouchEvents` ，它已经被完全移除。触摸事件现在可以自动识别。
- 由于上述 DOM 节点引用的变化， `TestUtils.findAllInRenderedTree` 及相关助手现在只能接受自定义组件，而不能接受 DOM 组件。因此，它们不再能够处理 DOM 组件。
- 组件元素创建后，props 对象已被冻结，因此不再支持修改 props。通常情况下，应使用 React.cloneElement。这一改动使得组件更易于理解，并支持了上述提到的编译器优化。
- 原生对象不再支持作为 React 子元素；应使用数组代替。您可以使用 createFragment 辅助函数进行迁移，该函数现在返回一个数组。原生对象不再支持作为 React 子元素，请使用数组代替。您可以使用 createFragment 辅助函数进行迁移，该函数现在返回一个数组。
- 插件：已删除 classSet 类集，请使用 classnames 库替代。
- 网页组件（自定义元素）现在直接使用原生属性名，例如：用 class 代替 className

### [废弃功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#deprecations-1)

- this.getDOMNode() 已被弃用，现在可以用 `ReactDOM.findDOMNode(this)` 替代。需要注意的是，在一般情况下，由于现在对 DOM 组件的引用就是实际的 DOM 节点，所以 findDOMNode 已经不再需要了。
- setProps 和 replaceProps 已经被弃用。现在，您应该在顶层重新调用 ReactDOM.render 并传入新的 props。
- ES6 组件类现在必须继承 React.Component 以启用无状态函数组件。ES3 模块模式仍将有效。
- 在渲染之间重用和修改样式对象的做法已被弃用。这一变化反映了我们冻结属性对象的策略。
- 扩展插件：`cloneWithProps` 功能已废弃，请改用 `React.cloneElement`。与 `cloneWithProps` 不同，`cloneElement` 不会自动合并 `className` 和 `style` 属性；如有需要，您可以手动进行合并。
- 添加组件：为确保可靠性，CSSTransitionGroup 将不再监听过渡事件。您需要手动通过属性（如 `transitionEnterTimeout={500}` ）来指定过渡的持续时间。

### [重大改进](https://github.com/facebook/react/blob/main/CHANGELOG.md#notable-enhancements)

- 添加了 React.Children.toArray 方法，该方法可以将嵌套的子元素对象转换为扁平数组，并为每个子元素分配键。这个辅助函数让您在处理子元素集合时更加便捷，尤其是在需要重新排序或切片后再向下传递时。而且，现在还能返回普通数组。
- React 使用 console.error 替代 console.warn 来显示警告信息，这样浏览器就能在控制台中显示完整的堆栈跟踪，使调试更加方便。  
    当您使用未来版本中可能失效的模板或可能产生意外行为的代码时，我们的警告会提示您，因此我们把这些警告视为“必须修复”的错误。
- 之前，将不受信任的对象作为 React 子组件可能会导致跨站脚本（XSS）安全漏洞。应通过在应用层正确验证输入并避免在应用代码中传递不受信任的对象来避免这个问题。作为额外的安全措施，React 现在为支持 ES2015（ES6）Symbol 的浏览器中的元素添加了特定的标记，以确保 React 不会将不受信任的 JSON 视为有效元素。如果您认为这种额外的安全保护至关重要，您应该为旧版浏览器添加 Symbol polyfill，例如 Babel 提供的 polyfill。
- 当条件允许时，React DOM 现在生成的 XHTML 兼容标记
- React DOM 现已支持以下标准 HTML 属性：capture、challenge、inputMode、is、keyParams、keyType、minLength、summary、wrap。此外，还支持以下非标准属性：autoSave、results、security。
- React DOM 现已支持这些 SVG 属性，它们将被渲染为命名空间属性：xlinkActuate、xlinkArcrole、xlinkHref、xlinkRole、xlinkShow、xlinkTitle、xlinkType、xmlBase、xmlLang、xmlSpace。
- React DOM 现已支持 SVG 图像标签
- 在 React DOM 中，自定义元素（标签名中带连字符或带有 is="..." 属性的元素）支持任意属性。
- React DOM 现已支持音频和视频标签上的这些媒体事件：onAbort（中断）、onCanPlay（可以播放）、onCanPlayThrough（可以流畅播放）、onDurationChange（持续时间改变）、onEmptied（已清空）、onEncrypted（已加密）、onEnded（已结束）、onError（发生错误）、onLoadedData（已加载数据）、onLoadedMetadata（已加载元数据）、onLoadStart（开始加载）、onPause（暂停）、onPlay（播放）、onPlaying（正在播放）、onProgress（正在加载）、onRateChange（播放速率改变）、onSeeked（已查找）、onSeeking（正在查找）、onStalled（已停滞）、onSuspend（暂停）、onTimeUpdate（时间更新）、onVolumeChange（音量改变）、onWaiting（等待中）。
- 已进行多项小幅度性能优化，使体验更加流畅。
- 许多警告现在比以前提供了更多的Context信息。
- 已将“添加了一个浅比较插件作为 ES6 类中 PureRenderMixin 迁移路径”进行优化
- 添加组件：CSSTransitionGroup 现在支持使用自定义类名，不再需要在过渡名称后附加如 -enter-active 等后缀。

### [新增实用警告](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-helpful-warnings-1)

- React DOM 现在会警告您在无效嵌套 HTML 元素时，这有助于您在更新过程中避免出现意外错误。
- 现在将 document.body 直接作为容器传递给 ReactDOM.render 会发出警告，这样做可能会引起与修改 DOM 的浏览器扩展程序的问题。现在将 document.body 直接作为容器传递给 ReactDOM.render 会发出警告，因为这样做可能会与修改 DOM 的浏览器扩展程序发生冲突。
- 使用多个 React 实例同时运行不受支持，因此当检测到这种情况时，我们会发出警告，以帮助您避免遇到由此产生的问题。此警告旨在帮助您避免潜在的问题

### [显著的错误修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#notable-bug-fixes-1)

- 在移动浏览器中，尤其是 Mobile Safari 中，React DOM 对点击事件的处理更为稳定可靠。
- 在更多情况下，SVG 元素都使用了正确的命名空间进行创建
- React DOM 现已正确处理具有多个文本子节点的 <option> 元素，并在服务器端正确渲染带有选中选项的 <select> 元素。</select></option>
- 当两个独立的 React 副本向同一文档添加节点时（包括浏览器扩展使用 React 时），React DOM 会竭力避免在事件处理过程中引发异常
- 在 React DOM 中使用非小写 HTML 标签名（例如， `React.createElement('DIV')` ）已不再导致问题，但我们仍推荐使用小写，以保持与 JSX 标签名约定的一致性（小写名称代表内置组件，大写名称代表自定义组件）。
- React DOM 认识到这些 CSS 属性是无单位的，不会在它们的值后添加“px”：animationIterationCount，以及其他几个属性。
- 当使用测试工具时，现在模拟鼠标进入和鼠标离开功能已正常启用。
- ReactTransitionGroup 现已正确处理同时删除多个节点的情况

### [React 工具包 / Babel](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools--babel)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-4)

- The react-tools 包和 JSXTransformer.js 浏览器文件已停止维护。您仍可继续使用 0.13.3 版本，但我们不再提供支持，并建议您迁移到内置 React 和 JSX 支持的 Babel。

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-2)

- Babel 5.8.24 版本引入了新的转换功能，将 JSX 元素转换为对象字面量（例如：{type: 'div', props: ...}），而不是调用。此功能仅在生产环境中启用，因为它会关闭一些开发阶段的警告和检查。
- Babel 5.8.24 版本为 React 元素引入了常量提升功能：将元素创建提升到顶层，以减少对 React.createElement 的调用和相应的内存分配。更重要的是，它向 React 表明子树没有变化，因此 React 在 reconcile 过程中可以完全跳过该子树。  
    这仅在生产环境中启用，因为它会禁用一些开发警告和检查

## [0.13.3 版本（发布于 2015 年 5 月 8 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0133-may-8-2015)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-3)

- 为 SVG 添加了 clipPath 元素和属性
- 对纯 JS 类中已弃用方法的改进警告

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes)

- 危险地放宽了 dangerouslySetInnerHTML 限制，将不再抛出异常
- 修复了因使用非纯 getChildContext 导致的固定多余Context警告
- 确保 replaceState(obj)能够保留 obj 的原型

### [使用附加组件的 React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-add-ons)

### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-1)

- 测试工具：确保组件在定义了 contextTypes 属性后，浅渲染功能能够正常运作

## [0.13.2 版本（发布于 2015 年 4 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0132-april-18-2015)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-1)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-4)

- 将 strokeDashoffset、flexPositive、flexNegative 等属性添加到无单位 CSS 属性列表中
- 增强了对更多 DOM 属性的支持：
    - 用于<style>元素的局部作用域</style>
    - 高、低、最佳值 - 适用于 <meter> 元素</meter>
    - 不可选择 - 针对 IE 浏览器的特定属性，防止用户选择

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-2)

- 修复了在渲染 null 后重新渲染未正确传递Context的问题
- 修复了在渲染后使用 style={null}重新渲染导致样式未正确更新的问题
- 更新 uglify 依赖，防止 IE8 出现 bug
-  改进的警告

### [使用附加组件的 React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-add-ons-1)

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-3)

- 不变性助手：确保它支持使用 hasOwnProperty 作为对象属性键

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools)

- 优化新选项文档说明

## [0.13.1 版本（发布于 2015 年 3 月 16 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0131-march-16-2015)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-2)

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-4)

- 不要在渲染空<select>元素时抛出异常</select>
- 确保在从 null 过渡时更新样式能够正常工作

### [使用附加组件的 React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-add-ons-2)

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-5)

- TestUtils: 对于 ES6 类中的 getDOMNode 方法，不要发出警告
- 确保将完整的页面组件（如、、）视为 DOM 组件
- 停止对 DOM 组件进行重复计数

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-1)

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-6)

- 优化 --non-strict-es6module 选项的解析

## [0.13.0 版本（发布于 2015 年 3 月 10 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0130-march-10-2015)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-3)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-5)

- 已废弃的模式在 0.12 版本中发出警告，现在不再有效：最明显的是，未使用 JSX 或 React.createElement 调用组件类，以及用 JSX 或 createElement 调用非组件函数
- 在元素创建后修改属性已被弃用，将在开发模式下引发警告；React 的未来版本将基于属性不会被修改的假设进行性能优化
- 静态方法（在静态中定义的）不再自动与组件类绑定
- 引用解析顺序略有调整，使得组件在 componentDidMount 方法调用后立即可以访问其引用；这种变化只有在您的组件在 componentDidMount 中调用父组件的回调时才会被观察到，这是一种反模式，应予以避免
- 在生命周期方法中调用 setState 现在总是批量执行，因此是异步的。之前在组件首次挂载时，第一次调用 setState 是同步进行的，现在改为异步。
- 组件卸载后调用 setState 和 forceUpdate 现在会发出警告，而不是抛出异常，从而避免了与 Promise 发生潜在竞态条件的问题。
- 大多数内部属性访问已被完全移除，包括 this._pendingState 和 this._rootNodeID。

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-5)

- 支持使用 ES6 类构建 React 组件；详情请参考 v0.13.0 测试版 1 的说明。
- 添加了新的顶级 API，建议用其替代 component.getDOMNode()。基于 ES6 的组件基类将不再提供此功能。这一改动将使得未来实现某些模式变得更加简便。
- 添加了一个新的顶级 API `React.cloneElement(el, props)` ，用于复制 React 元素 – 更多详情请参阅 v0.13 RC2 的说明。
- 新的引用样式，允许使用回调代替名称： `<Photo ref={(c) => this._photo = c} />` 可以使用 this._photo 来引用组件（相对于使用 ref="photo"，这将返回 this.refs.photo），使引用更加灵活。
- this.setState() 现在可以接受一个函数作为第一个参数来进行事务性状态更新，比如 `this.setState((state, props) => ({count: state.count + 1}));` – 这表示您无需再使用 this._pendingState，该属性已被删除。
- 支持迭代器和 immutable-js 序列作为子元素。

#### [废弃功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#deprecations-2)

- ComponentClass.type 已被弃用，请直接使用 ComponentClass（通常作为 `element.type === ComponentClass` ）
- 在 createClass-based 组件上可用的某些方法已从 ES6 类中移除或不再推荐使用（getDOMNode、replaceState、isMounted、setProps、replaceProps）。

### [使用附加组件的 React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-add-ons-3)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-6)

- 为向整个子集添加键，添加了 `React.addons.createFragment` 。

#### [废弃功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#deprecations-3)

- React.addons.classSet 已弃用。您可以使用多个免费模块来替代这一功能，其中 classnames 是一个不错的选择。
- 可以将调用 `React.addons.cloneWithProps` 迁移到使用 React.cloneElement，如需手动合并样式和 className，请确保这样做。

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-2)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-6)

- 在转换 ES6 语法时，类方法默认不再可枚举，需要使用 Object.defineProperty 来处理。如果您需要兼容 IE8 等浏览器，可以使用--target es3 参数来模拟旧的行为，使其更符合预期。

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-7)

- --target 选项在 jsx 命令中可用，允许用户指定目标 ECMAScript 版本。
    -  es5 是默认版本。
    - es3 恢复了先前的默认行为。在此添加了一个额外的转换，以确保将保留字用作属性的安全性（例如，this.static 将变为 this['static']，以实现与 IE8 的兼容性）。
- 调用展开操作符的转换功能现已启用。

### [JSX 转换器](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsxtransformer)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-7)

- 变换函数的返回值现在已包含作为 JS 对象的 sourceMap，不再是 SourceMapGenerator 的实例。

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-8)

- 对某些 JSX 的解析方式进行了调整，特别是在元素内部使用 > 或 } 时。之前这些符号会被当作字符串处理，但现在会被当作解析错误处理。您可以使用 npm 上的 `jsx_orphaned_brackets_transformer` 包来查找并修复 JSX 代码中可能存在的问题

## [0.12.2 版本（发布于 2014 年 12 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0122-december-18-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-4)

- 增加了更多 HTML 属性的支持：表单动作、表单编码类型、表单方法、表单目标、边距高度、边距宽度
- 将 strokeOpacity 添加到无单位 CSS 属性列表中
- 移除尾部逗号，以便 npm 模块能在 IE8 中打包并使用
- 修复了传递未定义值给 React.createElement 时出现的错误 bug，现在会有更友好的警告提示

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-3)

- JSX 相关转换现在一律使用双引号来表示属性和 displayName

## [0.12.1 版本（发布于 2014 年 11 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0121-november-18-2014)

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-4)

- 类型转换更新为最新支持
- jstransform 版本更新，ES6 转换功能得到优化
- 明确移除 Esprima 依赖，转而使用 jstransform 导出的 Esprima 信息

## [0.12.0 版本（发布于 2014 年 10 月 28 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0120-october-28-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-5)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-9)

- 键和引用已从 props 对象中移除，现在可以直接在元素上访问
- React 现在采用 BSD 许可，同时附带专利授权
- 默认属性解析从挂载时间迁移至元素创建时间，从而使其成为静态属性
- React.__internals 已被移除——之前为了 DevTools 的使用而暴露，但现在 DevTools 不再需要访问它
- 组件函数不能再直接调用——必须先通过 React.createFactory 进行封装。使用 JSX 时，这一过程将自动完成。

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-8)

- 扩展运算符（...）被引入，用于弃用 this.transferPropsTo 方法
- 增加了更多 HTML 属性的支持：acceptCharset、classID、manifest

#### [废弃功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#deprecations-4)

- React 渲染组件 --> React 渲染
- `React.renderComponentToString` --> 使用 React.renderToString 渲染
-   `React.renderComponentToStaticMarkup` ——> `React.renderToStaticMarkup`
- React.isValidComponent --> React.isValidElement
- React.PropTypes.component --> React.PropTypes.element
- `React.PropTypes.renderable` --> React 的 PropTypes.node
- 已废弃的 React.isValidClass
- **DEPRECATED**  实例将属性传输到
- 从事件处理器返回 false 以阻止默认操作
- 已弃用的便捷构造函数用法，请改为使用 React.createFactory 函数包装
- 已弃用使用 key={null} 来分配隐式键

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-7)

- 更好地处理嵌套结果中的事件和更新，优化“分层”控制组件的值恢复功能
- 正确处理 event.getModifierState 应作为大小写敏感处理
- 优化事件.charCode 的规范化
- 当涉及自动绑定方法时，错误堆栈显示更清晰
- 当 DevTools 安装完成后，移除 DevTools 提示信息
- 正确检测浏览器间所需语言功能
- 对一些 HTML 属性提供固定支持：这一功能得到保障
    - 现在列表更新正确，现在列表更新正确
    - scrollLeft 和 scrollTop 已被移除，这些属性不应被指定
-  改进后的错误信息

### [使用 React 扩展](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-9)

- 添加到 API 中，以便在更新周期中挂钩

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-10)

- React.addons.update 使用 assign 替代 copyProperties，进行 hasOwnProperty 检查，因此原型上的属性更新将不再准确。

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-8)

- 修复了 CSS 动画的一些问题，使其更加流畅

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-1)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-11)

- 强制约定：小写标签名总是被视为 HTML 标签，大写标签名总是被视为组件
- JSX 不再将代码转换成简单的函数调用形式

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-10)

- '@jsx React.DOM 已不再需要'
- 介绍扩展运算符，使 props 的使用更加便捷

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-9)

- JSXTransformer：在使用 API 时（例如，react-rails）可选择启用源映射功能

## [0.11.2 版本（发布于 2014 年 9 月 16 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0112-september-16-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-6)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-11)

- 添加了对 `<dialog> `元素及其关联的 open 属性的支持`</dialog>`
- 添加了对 `<picture>` 元素及其相关媒体和尺寸属性的支持，增强了功能兼容性`</picture>`
- 为 React v0.12 做准备，新增了 React.createElement API
    - React.createDescriptor 已被弃用，具体原因见下文

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-2)

- <图片>现在被解析为 React 的 DOM 元素中的 picture

### [React 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-5)

- 更新 esprima 和 jstransform，修复正确性问题
- JSX 可执行文件新增了--strip-types 标志，可用于移除类似 TypeScript 的类型注解，使用起来更加方便直观
    - 此选项同样暴露给 `require('react-tools').transform` ，作为 stripTypes 参数

## [0.11.1 版本（发布于 2014 年 7 月 24 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0111-july-24-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-7)

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-10)

- 在非 DOM 环境中，componentWillMount 阶段可以调用 setState 方法
- 正确更名为 getModifierState
- getModifierState 正确返回布尔值
- getModifierState 现在正确地区分大小写
- 空文本节点在 IE8 innerHTML 修复中已移除，修复了某些情况下的重绘问题

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-3)

- 修复 JSXTransformer 中重复变量声明的问题，解决某些浏览器出现的错误

## [0.11.0 版本（发布于 2014 年 7 月 17 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0110-july-17-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-8)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-12)

- `getDefaultProps()` 函数现在在每次类调用时只执行一次，并且其结果在所有实例之间共享
- MyComponent() 现在返回描述符，不再是实例
- React.isValidComponent 和 React.PropTypes.component 验证的是组件，而非组件实例
- 自定义 propType 验证器应当返回错误对象而非直接记录日志，这样更符合错误处理规范

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-12)

-  渲染为空
- 键盘事件包含标准化的 e.key 和 e.getModifierState() 属性
- 新的标准化 onBeforeInput 事件
- React.Children.count 已被添加为计算子元素数量的辅助函数

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-11)

- 在更多情况下，重渲染操作被批量处理
- 事件：e.view 已正确规范化
- 增加了对更多 HTML 属性的支持（coords、crossOrigin、download、hrefLang、mediaGroup、静音、滚动、形状、srcSet、开始、useMap）
-  改进后的 SVG 支持
    - 现在正确更改已挂载 SVG 组件的 className 功能已实现
    - 添加了对元素遮罩和`tspan`的支持
    - 添加了对 dx、dy、填充透明度、字体家族、字体大小、标记结束、标记中间、标记开始、不透明度、图案内容单位、图案单位、保持纵横比、描边虚线数组、描边透明度等属性的支持
- 带有供应商前缀（如 Webkit、ms、Moz、O）的 CSS 属性名称现在得到了正确处理
- 重复键不再引发严重错误；现在系统会记录警告信息（并且只显示具有相同键的第一个子项）
- 现已正确解绑图片事件监听器，有效避免了“两个具有相同 data-reactid 但数据不相同的有效节点”的错误
- 当缺少 polyfills 时，添加了更明确的警告提示

### [使用 React 扩展](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons-1)

- PureRenderMixin：一个有助于优化“纯”组件的混入
- 性能分析：一套助力性能提升的新工具
- 更新：新增 $apply 命令，用于转换值
- 与空元素相关的 TransitionGroup 错误修复，针对 Android 系统

### [React NPM 模块](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-npm-module)

- 现已包含在 dist/ 目录下的预构建软件包
- envify 被正确地列为依赖项，而不是作为依赖项的依赖项

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-4)

- 添加了对命名空间的支持，例如
-  JSX 转换器
    - 启用与命令行中 `<script type="text/jsx;harmony=true">` 相同的和声功能，操作更便捷
    - 脚本并行下载以加快速度。尽管如此，它们仍然按照顺序执行（就像您预期的那样，与常规脚本标签一致）
    - 修复了导致 Firefox 中 sourcemap 无法工作的 bug

### [React 工具模块](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-module)

- 改进的 README，包含使用说明和 API 信息
- 使用 --harmony 选项提供的改进版 ES6 转换功能
- 添加了 jsx 可执行文件的--source-map-inline 选项
- 新的 transformWithDetails API，可访问原始 source map 数据

## [0.10.0 版本（发布于 2014 年 3 月 21 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#0100-march-21-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-9)

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-13)

- 添加了辅助警告，以帮助向描述符迁移
- 实现了无需包含 React 相关标记（如 data-reactid、data-react-checksum）的服务器端渲染功能。该 DOM 无法被 React 挂载。请参阅 `React.renderComponentToStaticMarkup` 文档，以获取更多信息。
- 增加了对更多属性的支持：
    - 为`<img>`元素指定不同像素比率的图片的 srcSet
    -  SVG 中的文本锚点

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-12)

- 确保所有空元素不要在 HTML 标记中插入多余的闭合标签。
- 确保 className={false}的行为保持一致
- 确保即使未指定任何 refs，也要确保 this.refs 已被定义。

### [插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#addons)

- 更新函数以处理不可变数据，请查阅相关文档

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-6)

- 为函数添加了一个选项参数。唯一支持的选项是“”，它在命令行上与“jsx --harmony”具有相同的行为。这使用了来自“”的 ES6 转换

## [0.9.0 版本（发布于 2014 年 2 月 20 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#090-february-20-2014)

### [React 核心库](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-core-10)

#### [突破性变更](https://github.com/facebook/react/blob/main/CHANGELOG.md#breaking-changes-13)

- 组件的生命周期方法 componentDidMount 和 componentDidUpdate 现在不再接收根节点作为参数，请使用 this.getDOMNode() 来获取。
- 当属性值为 undefined 时，现在将使用 getDefaultProps 返回的默认值
- `React.unmountAndReleaseReactRootNode` 之前已被弃用，现在已被移除
- 现在同步执行并返回生成的 HTML 字符串
- 全页渲染（即使用 React 渲染标签）功能现在仅在启动时使用服务器端渲染的标记才可用
- 在鼠标滚轮事件中，deltaY 值不再被取反
- 当属性类型验证失败时，会记录警告而不是抛出错误（在生产构建的 React 中，出于性能考虑，现在会跳过类型检查）
- 在输入、选择和文本区域元素中，.getValue() 方法已不再支持，请改用 .getDOMNode().value 来获取值
- 组件内的 this.context 现已被 React 保留用于内部使用

#### [新功能](https://github.com/facebook/react/blob/main/CHANGELOG.md#new-features-14)

- React 现在不会抛出错误，这使得堆栈跟踪更加精确，Chrome 浏览器的紫色错误中断标志现在也能正确显示
- 添加了对 SVG 标签 defs、线性渐变、多边形、径向渐变、停止点的支持
- 增加了对更多属性的支持：
    - 用于 CORS 请求的“跨域”
    - 下载链接和`<a>`标签的 hrefLang 属性`</a>`
    - 媒体组被设置为静音，适用于`<audio>和<video>`标签`</video></audio>`
    - noValidate 和 formNoValidate 用于表单
    - 开放图标签的属性
    - 支持 sandbox、无缝和 srcDoc 属性的`<iframe>`标签`</iframe>`
    -  屏幕阅读器适用范围
    -  对 标签的 span 标签进行描述
- 支持在混入中定义 propTypes 的功能已添加
- 将 any, arrayOf, component, oneOfType, renderable, shape 等属性添加到 React.PropTypes 中，使其更加完整
- 为组件规范中的静态组件方法添加了对静态的支持
- 在所有事件中，.currentTarget 现已正确设置
- 在键盘事件中，现在所有浏览器都为特殊（不可打印）键自动填充 .key
- 在剪贴板事件中，现在已对 IE 中的.clipboardData 进行了 polyfill 处理
- 在拖动事件中，现在有 .dragTransfer 属性
- 增加了 onMouseOver 和 onMouseOut 事件支持，除了已有的 onMouseEnter 和 onMouseLeave 事件之外
- 增强了对`<img>`元素 onLoad 和 onError 事件的支持
- 增强了对`<form>`元素重置事件的支持功能`</form>`
- 自动聚焦属性现在在输入、选择和文本区域上一致地进行填充

#### [缺陷修复](https://github.com/facebook/react/blob/main/CHANGELOG.md#bug-fixes-13)

- React 不再为每个组件的 props 对象添加__owner__属性；传入的 props 现在不会被修改，这使得代码更加稳定和安全
- 当在组件 DidMount 中嵌套调用顶层组件（如 React.renderComponent）时，事件现在能够正确地冒泡到父组件
- 修复了一个问题：更新顶层组件嵌套时出现的错误
- 现在传递无效或拼写错误的 propTypes 类型时，系统将抛出错误
- 当鼠标进入或离开时，.target、.relatedTarget 和 .type 现已正确设置
- 在组成事件中，.data 现已在 IE9 和 IE10 中得到正确规范化
- CSS 属性值不再为无单位属性 columnCount、flex、flexGrow、flexShrink、lineClamp、order、widows 等添加“px”单位后缀
- 修复了在具有 componentWillUnmount 处理器的子组件卸载时出现的内存泄漏问题
- 修复了 renderComponentToString 存储事件处理器时导致的内存泄漏问题
- 修复了在点击处理程序中删除表单元素时可能引发错误的 bug
- 布尔属性如 disabled 在渲染时无需指定值（之前是 disabled="true"，现在只需直接使用 disabled 即可）
- 支持包含点号的键值对，现在被支持
- 简化后的 data-reactid 值，以提升性能
- 组件现在只要键属性发生变化就会自动重新挂载
- 事件处理器仅在必要时绑定到文档，这在某些情况下有助于提升性能
- 现代浏览器不再使用 `.returnValue`，这消除了 Chrome 中的警告提示
- scrollLeft 和 scrollTop 不再通过 document.body 访问，从而消除了 Chrome 中的警告信息
- 通用性能改进、内存优化，优化警告和错误信息提示

### [使用 React 和插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons-2)

- React.addons.TestUtils 被添加
- `React.addons.TransitionGroup` 已更名为 `React.addons.CSSTransitionGroup`
- 作为更通用的动画包装器被添加
- 为克隆组件并修改其属性添加了 `React.addons.cloneWithProps`
- 修复了在 CSSTransitionGroup 退出转换过程中重新添加节点的问题
- 修复 CSSTransitionGroup 中 transitionLeave 变更的 bug
- CSSTransitionGroup 性能优化方案
- 在复选框`<input></input>`元素上，现在支持 checkedLink 的双向绑定

### [JSX 编译器及 react-tools 软件包](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-compiler-and-react-tools-package)

- 空白规范化已更新；现在同一行上的两个标签之间的空格将得到保留，而两个标签之间的换行符将被移除
- react-tools npm 包已不再包含 React 核心库，请改用 react 包。
- 显示名称现在在更多情况下被添加，这有助于提升 React Dev Tools 中的错误信息和名称的准确性和易读性
- 修复了在 JSX 闭合标签后抛出无效令牌错误的问题
- JSXTransformer 现在在现代浏览器中自动使用源映射
- JSXTransformer 错误信息现在会在文件解析失败时显示文件名及问题代码行内容，以便于调试

## [0.8.0 版本（发布于 2013 年 12 月 19 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#080-december-19-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-42)

- 增加了对更多属性的支持：
    - 为 `<textarea> `设置行数和列数`</textarea>`
    - defer & 异步 for
    - 循环播放音频和视频
    - 表单字段自动修正（仅移动 WebKit 浏览器支持的非常规属性）
-  改进后的错误信息
- 在 IE11 中修复固定选择事件
- 添加了右键菜单事件

### [使用 React 和插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons-3)

- 修复了当子元素未定义时 TransitionGroup 的 bug
- 添加了对“onTransition”事件的支持

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-7)

- 升级了 jstransform 和 esprima-fb

### [JSX 转换器](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsxtransformer-1)

- 支持在 IE8 中使用
- 升级 browserify 后，文件大小减少了约 65KB（压缩后 16KB）

## [0.5.2 版本, 0.4.2 版本（发布于 2013 年 12 月 18 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#052-042-december-18-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-43)

- 修复了使用用户内容作为键可能存在的 XSS 漏洞：CVE-2013-7035

## [0.5.1 版本（发布于 2013 年 10 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#051-october-29-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-44)

- 修复了与`<input></input>`和选择事件相关的 bug，使问题得到解决。
- 修复了选择和焦点的问题，使操作更流畅。
- 实现了从文档根目录卸载组件的功能（使操作更便捷）。
- 修复了非`<input></input>`元素禁用属性处理的 bug

### [使用 React 和插件](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons-4)

- 修复了过渡动画事件检测的 bug。

## [0.5.0 版本（发布于 2013 年 10 月 16 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#050-october-16-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-45)

- 核心内存使用优化 - 显著减少核心分配，有助于缩短垃圾回收暂停时间
- 性能优化 - 不仅提升了速度，还对 V8 和 Nitro 中的慢速路径代码进行了优化调整，使其运行更加流畅。
- 标准化属性到 DOM 属性转换过程。这之前不仅增加了额外的类型检查和性能开销，还让用户感到困惑。  
    现在每次插入 DOM 之前，我们都会将您的值转换成字符串
- 支持选择事件的功能
- 支持组合事件功能
- 支持额外的 DOM 属性（charSet、content、form、httpEquiv、rowSpan、autoCapitalize）
- 支持额外的 SVG 属性（rx、ry），功能增强
- 支持在混入中使用 getInitialState 和 getDefaultProps 功能
- 支持将内容嵌入 iframe 中。
- 控制表单组件的修复问题
- SVG 元素创建漏洞修复。
-  添加了 React 版本信息。
- 添加了 React.isValidClass 函数 - 用于判断一个值是否为有效的组件构造器
- 移除了 React.autoBind 功能 - 该功能在 v0.4 版本中被弃用，现已彻底移除，使其更加简洁。
- 将 `React.unmountAndReleaseReactRootNode` 重命名为 `React.unmountComponentAtNode` 
- 开始进行性能分析的细化工作
- 服务器端渲染支持更佳 - react-page 有助于提升服务器端渲染的稳定性。
- 使 React 能够在强制执行严格内容安全策略的环境中运行。这也使得能够用 React 构建 Chrome 扩展

### [React 与插件（全新！）](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-with-addons-new)

- 推出包含多个“插件”的独立构建版本，旨在提升 React 的使用体验。我们计划长期弃用此功能，改为将每个插件独立发布。更多详情请参阅文档。

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-5)

- 不再将类名转换为 className 作为转换的一部分！这是一个破坏性变更——如果你使用的是 class，你必须将其改为 className，否则你的组件将出现视觉问题。
- 将警告添加至浏览器内转换器，明确指出其不适用于生产环境。
- Windows 兼容性得到提升
- 改进了在转换过程中保持行号支持的实现

## [0.4.1 版本（发布于 2013 年 7 月 26 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#041-july-26-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-46)

- 组件作用域内现在执行 setState 回调
- 移动 Safari 上的点击事件现在可以正常工作了。
- 防止在扩展 Object.prototype 对象原型时，事件处理可能出现的潜在错误。
- 更新时，请勿将 DOM 属性设置为已定义过的字符串 "undefined"。
- 改进了对`<iframe>`属性的支持，使其更加完善。`</iframe>`
- 添加校验和以检测并纠正服务器端渲染的标记与 React 期望的客户端标记不匹配的情况

### [JSX 转换器](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsxtransformer-2)

- 改进了环境检测功能，使其能够在非浏览器环境中运行

## [0.4.0 版本（发布于 2013 年 7 月 17 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#040-july-17-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-47)

- 将使用 id 属性切换到使用 data-reactid 来跟踪 DOM 节点。这样做可以更方便地与其他 JS 和 CSS 库集成。
- 支持更多 DOM 元素和属性（例如：`<canvas>`），功能增强`</canvas>`
- 改进的服务器端渲染 API。 `React.renderComponentToString(<component>, callback)` 允许您在服务器上使用 React，并生成可以发送到浏览器的 HTML 标记，使服务器端渲染更加高效。
- 属性改进：验证与默认值。详情请参阅我们的博客文章。
- 支持对关键属性的支持，可进行更精细的合并控制。请参阅文档了解详细信息...
- 移除了 React.autoBind 功能。详情请参阅我们的博客文章。
- 表单优化。我们针对`<input></input>`、`<textarea>、<option>和<select>`元素编写了封装器，以统一浏览器实现中的众多差异。这包括 defaultValue 的支持、onChange 事件的优化以及电路完成。详情请参阅文档。`</textarea>`
- 我们已实现符合 W3C 规范的改进型合成事件系统
- 组件更新现在采用批量处理，这可能会大幅提升组件的重新渲染速度。`this.setState` 方法现在可以接受一个可选的回调函数作为第二个参数。如果你之前使用的是 `onClick={this.setState.bind(this, state)}` ，请注意添加第三个参数，以防止事件被错误地当作回调函数处理。

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-6)

- 支持注释节点（ `<div>{/* this is a comment and won't be rendered */}</div>` ）
- 现在孩子们直接被转换成参数，而不是被包裹在数组中，例如 `<div><Component1/><Component2/></div>` 被转换成 `React.DOM.div(null, Component1(null), Component2(null))` 。之前这会被转换成 `React.DOM.div(null, [Component1(null), Component2(null)])` 。如果你之前没有使用 JSX 的 React，你的代码应该还能正常工作。

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-8)

- 修复了在目录转换过程中出现的一些问题
- 不再将 require()s 自动转换为相对路径，除非有明确指定

## [0.3.3 版本（发布于 2013 年 6 月 20 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#033-june-20-2013)

### [React](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-48)

- 允许重复使用同一个 DOM 节点渲染不同的组件，例如，现在使用 `React.renderComponent(<div/>, domNode); React.renderComponent(<span/>, domNode);` 即可。

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-7)

- 优化了浏览器内转换器，确保转换后的脚本能在预期的作用域内执行，从而使得可以从不同的文件中定义和使用组件，使代码更加模块化。

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-9)

- 升级平民功能，使要求语句在通过转换器传递时不再被相对化。这一功能在构建 React 时很有必要，但对于 bin/jsx 的其他使用者来说可能不太适用。
- 我们升级了 Commoner 和 Recast 的依赖，使它们各自使用不同的目录来存储缓存，这样做更加合理。
- 冻结我们的 Esprima 依赖项

## [0.3.2 版本（发布于 2013 年 5 月 31 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#032-may-31-2013)

### [JSX](https://github.com/facebook/react/blob/main/CHANGELOG.md#jsx-8)

- 与其他编码风格（尤其是单变量多赋值）的兼容性得到了提升

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-10)

- 将使用浏览器构建版本切换为分发独立模块。这样做可以让 react-tools 与 browserify 兼容。

## [0.3.1 版本（发布于 2013 年 5 月 30 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#031-may-30-2013)

### [react 工具](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-tools-11)

- 修复导致模块损坏的打包错误

## [0.3.0 版本（发布于 2013 年 5 月 29 日）](https://github.com/facebook/react/blob/main/CHANGELOG.md#030-may-29-2013)

-  首次公开发布
```