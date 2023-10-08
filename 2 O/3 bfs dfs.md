> 广度优先:找到一个节点后,把他同级的兄弟节点都找出来放在前边,把孩子放到后边,最常用 while

```javascript
bfs利用队列实现:
    const quene = [...target]
    while(quene.length){
        const shiftOne = quene.shift()//拿头(头即最外一层,广度)
        if (shiftOne.children) {
                const childs = shiftOne.children;
                quene.push(...childs)//把孩子放到后边
        }
    } 
    
function bfs(s){//图
    let marked = {}
    marked[s]=true;
    
    let queue=[];    
    queue.push(s)
    
    while(queue.length>0){
        const val=queue.shift();//先拿头出来用
        for(let i in 邻接表[val]){
            const cur=邻接表[val][i]
            if(!marked[cur]){
                marked[cur]=true;
                //要求最短路径的话,这里可以存路径, edgeTo[cur]=v;
                queue.push(cur);
            }
        }
    }    
}

//最短路径其实是BFS
function pathTo(v){
    let source=0;
    if(!marked[cur]) return undefined;
    let path=[];
    for(let i=v;i!=source;i=edgeTo[i]) path.push(i)
    path.push(source);
    return path;
}
```

> 深度优先:找到一个节点后,把它的后辈都找出来,最常用递归法.  

```javascript
dfs利用队列实现: //DFS 通常都是有递归关系的
    const stask = [...target]
    while (stask.length) {
        const current = stask.pop()//拿尾(尾即里面层,深度)
        if (current.children) {
            const childs = shiftOne.children;
            stask.push(...childs)
        }
    }
```



