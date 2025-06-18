### ZRender
> 使用 Canvas 或 SVG 渲染引擎创建高性能的 2D 图形和动画
```js
//简化去掉了SSR部分

函数 ZRender 主要流程(id, dom, opts) {  
    // 1. 初始化属性  
    初始化默认属性（_sleepAfterStill, _stillFrameAccum, _needsRefresh, _needsRefreshHover, _darkMode）  

    // 2. 处理传入参数  
    如果 opts 为空 {  
        设置 opts 为 空对象  
    }  
    绑定 DOM 为 dom  
    绑定 实例 ID 为 id  

    // 3. 创建图形存储  
    创建 storage 为 新的 Storage()  

    // 4. 选择渲染器  
    设置 rendererType 为 opts.renderer 或 'canvas'  
    如果 渲染器未导入(rendererType) {  
        抛出错误 "渲染器未导入"  
    }  

    // 5. 设置渲染选项  
    设置 useDirtyRect 为 opts.useDirtyRect（默认 false）  

    // 6. 创建渲染器实例  
    创建 painter 为 新的 rendererType(dom, storage, opts)  

    // 7. 创建事件处理  
    创建 handlerProxy 为 新的 HandlerDomProxy(painter的根元素)  

    // 8. 配置指针事件  
    设置 useCoarsePointer 为 opts.useCoarsePointer  
    设置 pointerSize 为 根据环境配置大小  

    // 9. 创建事件处理器  
    创建 this.handler 为 新的 Handler(storage, painter, handlerProxy)  

    // 10. 创建动画管理器  
    创建 this.animation 为 新的 Animation({  
        stage: {  
            update: 返回 _flush(true) // 调用刷新  
        }  
    })  

    // 11. 启动动画  
    调用 this.animation.start()  
}
```
