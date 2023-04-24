
## glTF 1.0 的嵌入式着色器演进成 glTF 2.0 的 PBR 材质
glTF 1.0的嵌入式着色器是一种旧的技术，现已被glTF 2.0的PBR材质所取代。PBR材质是一种在计算机图形学中常用的材质，能够更精确地模拟物体表面的光照变化，使其看起来更加真实。glTF 2.0的PBR材质是在旧的嵌入式着色器基础上不断演化而来的。

## 文件区别
使用glTF 1.0的嵌入式着色器：
```
"techniques" : {
  "technique1" : {
    "parameters" : {
      "modelViewProjectionMatrix" : {
        "semantic" : "MODELVIEWPROJECTIONMATRIX",
        "type" : 35676
      }
    },
    "program" : "program1",
    "states" : {
      "enable" : [ 2884, 2929 ],
      "functions" : {
        "blendFuncSeparate" : [ 770, 771, 774, 773 ]
      }
    },
    "attributes" : {
      "position" : "position",
      "normal" : "normal",
      "texcoord" : "texcoord"
    }
  }
}
```

使用glTF 2.0的PBR材质：
```
"materials" : {
  "material1" : {
    "pbrMetallicRoughness" : {
      "baseColorFactor" : [1.0, 1.0, 1.0, 1.0],
      "metallicFactor" : 1.0,
      "roughnessFactor" : 0.0
    },
    "name" : "Material 1"
  }
}
```

### 为什么叫"techniques"
在3D图形中，渲染一个3D场景时需要进行一系列的渲染操作，称之为技术（techniques）。
技术（techniques）包括一组渲染操作，例如定义如何从顶点和纹理坐标生成片元，以及如何应用着色器程序来计算这些片元的颜色。这些操作之间的顺序和具体实现方法等都是技术的一部分。
