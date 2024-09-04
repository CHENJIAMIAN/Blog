
### 鼠标按住时mousemove事件不触发廓——setPointerCapture对子元素mousemove事件的影响
阅读代码, 说明为什么鼠标按住时经过子元素子元素的mousemove事件没有触发
```html
<!DOCTYPE html>  
<html lang="zh">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Pointer Capture 示例</title>  
    <style>  
        #parent {  
            width: 400px;  
            height: 400px;  
            background-color: lightblue;  
            position: relative;  
        }  
        #child {  
            width: 100px;  
            height: 100px;  
            background-color: coral;  
            position: absolute;  
            top: 150px;  
            left: 150px;  
        }  
    </style>  
</head>  
<body>  
    <div id="parent">  
        <div id="child"></div>  
    </div>  

    <script>  
        const parent = document.getElementById('parent');  
        const child = document.getElementById('child');  

        // 为父元素添加 pointerdown 事件  
        parent.addEventListener('pointerdown', (event) => {  
            parent.setPointerCapture(event.pointerId);  
            console.log('Pointer captured by parent');  

            // 在 pointerdown 时添加 pointermove 事件监听器  
            const onPointerMove = (event) => {  
                console.log('Pointer is moving over the parent');  
            };  

            // 将 pointermove 事件监听器与已创建的回调函数相关联  
            parent.addEventListener('pointermove', onPointerMove);  

            // 在 pointerup 时移除 pointermove 事件监听器  
            const onPointerUp = () => {  
                parent.releasePointerCapture(event.pointerId);  
                console.log('Pointer released by parent');  
                parent.removeEventListener('pointermove', onPointerMove);  
                parent.removeEventListener('pointerup', onPointerUp);  
            };  

            // 添加 pointerup 事件监听器  
            parent.addEventListener('pointerup', onPointerUp);  
        });  

        // 为子元素添加 mousemove 事件  
        child.addEventListener('mousemove', (event) => {  
            console.log('Pointer is mouse moving over the child');  
        });  
    </script>  
</body>  
</html>
```
