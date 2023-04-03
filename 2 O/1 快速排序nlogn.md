```javascript
//时间复杂度是Θ(nlogn)，最坏情况是Θ(n2)
//选轴心 
//让轴心左边都是比他小的，右边都是比它大的
//递归左边，递归右边
function qSort(arr) {    //各类排序算法以及复杂度计算
    if(arr.length===0) return [];
    let mid=arr[0];
    let smaller=[];
    let bigger=[];
    for(let i=1;i<arr.length;i++){
        if(arr[i]<mid) smaller.push(arr[i])
        else bigger.push(arr[i])
    }
    return qSort(smaller).concat(mid,qSort(bigger))
}

qSort([4, 7, 6, 5, 3, 2, 8, 1]);
```

