> `ModelExperimental` 这个新架构（2022年5月，此架构正在启动对原 `Model` 类相关架构的替换）的更新而随时可能会更新。2023年4月24日已然更新!


```js
glTF 数据在几何数据部分有三层：Node ← Mesh ← Primitive。
其中，Primitive 即 glTF 数据规范中最小的图形单位
```

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

## 什么是的组件?
在 glTF 中，组件是一种基本的概念，表示模型的不同部分，例如网格数据、材质、纹理、动画等。在 Cesium 中，每个组件都会被处理成可用的对象，并根据需要添加到场景中。因此，每个组件都需要经过一系列的处理（如纹理数据需要被加载和解码），在处理完成后才能被添加到场景中。在 Cesium 中，这些处理是通过 Promise 链实现的，以保证处理的顺序和正确性。只有在所有组件都处理完成后，Cesium 才能创建出完整的模型并将其添加到场景中。

## components
```js
{
    "asset": {        "credits": []    },
    "scene": {
        "nodes": [
            {
                "index": 0,
                "children": [],
                "primitives": [
                    {
                        "attributes": [
                            {
                                "name": "POSITION",
                                "semantic": "POSITION",
                                "componentDatatype": 5126,
                                "type": "VEC3",
                                "normalized": false,
                                "count": 240,
                                "min": {"x": 1214922.0063094844,"y": -4736399.2068924345,"z": 4081525.4477709476},//地理位置
                                "max": {"x": 1215121.59033861,"y": -4736238.163863403,"z": 4081670.8300574976},//地理位置
                                "constant": {"x": 0,"y": 0,"z": 0},
                                "byteOffset": 0,
                                "byteStride": 12
                            },
                            {
                                "name": "NORMAL",
                                "semantic": "NORMAL",
                                "componentDatatype": 5126,
                                "type": "VEC3",
                                "normalized": false,
                                "count": 240,
                                "min": {"x": -0.9686356343768793,"y": -0.7415555652213445,"z": -0.7655670913845589},
                                "max": {"x": 0.9686356343768793,"y": 0.7415555652213445,"z": 0.7655670913845589},
                                "constant": {"x": 0,"y": 0,"z": 0},
                                "byteOffset": 0,
                                "byteStride": 12
                            },
                            {
                                "name": "_BATCHID",
                                "semantic": "_FEATURE_ID",
                                "setIndex": 0,
                                "componentDatatype": 5126,
                                "type": "SCALAR",
                                "normalized": false,
                                "count": 240,
                                "min": 0,
                                "max": 9,
                                "constant": 0,
                                "byteOffset": 0,
                                "byteStride": 4
                            }
                        ],
                        "morphTargets": [],
                        "indices": {
                            "count": 360
                        },
                        "material": {
                            "metallicRoughness": {
                                "baseColorFactor": {"x": 1,"y": 1,"z": 1,"w": 1},
                                "metallicFactor": 0,
                                "roughnessFactor": 1
                            },
                            "emissiveFactor": {
                                "x": 0,"y": 0,"z": 0},
                            "alphaMode": "OPAQUE",
                            "doubleSided": false,
                            "unlit": false
                        },
                        "primitiveType": 4,
                        "featureIds": [],
                        "propertyTextureIds": [],
                        "propertyAttributeIds": []
                    }
                ],
                "matrix": {"0": 1,"1": 0,"2": 0,"3": 0,"4": 0,"5": 0,"6": -1,"7": 0,"8": 0,"9": 1,"10": 0,"11": 0,"12": 0,"13": 0,"14": 0,"15": 1},
                "morphWeights": []
            }
        ]
    },
    "nodes": [],
    "skins": [],
    "animations": [],
    "articulations": [],
    "upAxis": 1,
    "forwardAxis": 0,
    "transform": {"0": 1,"1": 0,"2": 0,"3": 0,"4": 0,"5": 1,"6": 0,"7": 0,"8": 0,"9": 0,"10": 1,"11": 0,"12": 0,"13": 0,"14": 0,"15": 1}
}
```
