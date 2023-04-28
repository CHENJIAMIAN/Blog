## cesium的primitive的性能比entiy高很多吗？如果是，那是为什么

Cesium中的primitive和entity是用于构建三维场景的基本元素。在Cesium中，primitives通常指的是简单几何形状，而entities通常指的是更复杂的对象，如模型、点云数据等。

就性能方面而言，primitives通常比entities更加轻量级和高效。这是因为primitives通常只包含定义一个基本几何形状所需的最小信息，如位置、大小和颜色等。相比之下，entities则可能包含更多的信息，如层次结构、动画、属性等。在处理大量数据时，使用primitives可以提高渲染性能和响应速度。

此外，Cesium在渲染场景时采用了一些优化技术，如视锥剔除（frustum culling）和LOD（Level of Detail），这些技术可以进一步提高primitives的性能。视锥剔除可以排除不在当前视图范围内的物体，从而减少不必要的计算。而LOD技术可以根据物体与观察者的距离和大小自适应地选择合适的细节层次，以达到更好的性能和视觉效果。

总的来说，尽管primitives和entities在Cesium中都有其各自的作用和特点，但由于primitives通常更加轻量级和高效，所以在处理大量数据时，使用primitives可以提高渲染性能和响应速度。

## 能被cesium加载terrain数据长什么样子,  文件结构是什么样的

Quantized Mesh的文件格式是二进制格式，通常使用扩展名为".terrain"或".mesh"。这种格式使用了量化技术，将地形数据压缩并存储为二进制格式，从而减小了数据文件的大小。
Quantized Mesh文件包含了地形数据的三角形网格、高度信息、纹理信息、法线信息等。
同时，Quantized Mesh还支持多级细节，可以根据观察者的位置和距离动态加载不同级别的细节，以提高渲染效率。
由于Quantized Mesh的文件格式是二进制格式，因此需要特定的软件或库来读取和处理这种格式的文件。

Quantized Mesh文件结构包括以下几部分：
1. Header：包含文件版本、最小和最大高度、节点数等信息。
2. Indices：索引数组，用于描述三角形网格的拓扑结构。
3. Positions：顶点位置数组。
4. Normals：顶点法线数组。
5. Texture Coordinates：顶点纹理坐标数组。
6. Octants和Water Mask：用于描述地形切片和水域覆盖。

加载完成后，Cesium会自动根据Quantized Mesh数据生成地形模型，并进行光照和阴影的计算，实现高度感和细节效果。

## 源码Tools/jsdoc/cesium_template/publish.js被谁调用？

```js
-> npm run build-docs 
-> gulp buildDocs
-> gulpfile.js的buildDocs方法
-> npx jsdoc --configure Tools/jsdoc/conf. json --pedantic ${generatePrivateDocumentation}
-> node_modules/jsdoc/cli.js 
	-> cli.generateDocs 
		-> template = require(`${env.opts.template}/publish`);
```
