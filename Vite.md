### 插件机制
- **插件的基础**：Vite 的插件机制借鉴了 Rollup 的插件设计，每个插件实质上是一个对象，拥有各种生命周期钩子。
- **核心钩子**：
  - **`config`**：在解析 Vite 配置之前调用，可以修改配置本身。
  - **`buildStart`**：构建开始时调用，适合执行初始化任务。
  - **`resolveId`**：用于自定义模块的解析。
  - **`load`**：加载模块时调用，可以自定义如何加载特定类型的模块。
  - **`transform`**：在模块被加载之后调用，用来对模块内容进行修改。
  ```javascript
  export default function myPlugin() {
    return {
      name: 'my-plugin', // 插件名称
      transform(code, id) {
        // 自定义转化任意导入的代码模块
        if (/\.js$/.test(id)) {
          // 示例：简单地在代码后附加注释
          return code + '\n// Transformed by myPlugin';
        }
      },
    };
  }
  ```

### vite热更新
```js
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
```