## gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);是怎么来的，为什么要三个相乘， uPMatrix，uMVMatrix 是怎么来的
在计算机图形学中，gl_Position是OpenGL用于存储顶点位置的系统变量，它是顶点着色器的输出之一。顶点着色器计算出每个顶点的最终位置后，将其写入gl_Position中。在这段代码中，gl_Position的计算公式如下：

gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

其中，uPMatrix和uMVMatrix分别是投影矩阵和模型视图矩阵，它们是顶点着色器中的uniform变量，通过将这些变换矩阵与顶点位置向量相乘，可以将顶点从模型坐标系（或世界坐标系）转换到裁剪坐标系（或屏幕坐标系）。

具体来说，uPMatrix是一个4x4的矩阵，用于将裁剪坐标系的坐标转换为标准化设备坐标系的坐标，其中，标准化设备坐标系是一个以屏幕中心为原点，范围在[-1, 1]之间的二维坐标系。uMVMatrix是一个4x4的矩阵，用于将顶点从模型坐标系（或世界坐标系）转换到观察坐标系（或相机坐标系），也就是将顶点的位置和朝向从模型空间转换到相机空间。

因此，通过将这两个矩阵相乘，可以将顶点从模型坐标系（或世界坐标系）转换到观察坐标系，然后再将其乘以顶点的位置向量，得到在观察坐标系中的位置。最后，再将其乘以投影矩阵，得到在裁剪坐标系中的位置，最终将这个位置向量写入gl_Position中。

综上所述，gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)的含义是将顶点从模型坐标系（或世界坐标系）转换到裁剪坐标系（或屏幕坐标系）。
