>  Flutter是一个dart写的UI 工具包(有一层薄薄的 C/C++ 代码),  得益于dart, Flutter 在六个平台（Android、iOS、Web、Windows、macOS 和 Linux）上的支持
### 架构图
[Flutter System Architecture - Google 幻灯片](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.p)
Flutter 使用与 Unity 相同的基本架构模型
![1-1.82c25693.png | 800](https://book.flutterchina.club/assets/img/1-1.82c25693.png)

### 在线环境
[dartpad](https://dartpad.dev/?)


### 安装Flutter SDK时验证环境 flutter doctor 报错 `A network error occurred while checking "https://maven.google.com/": 信号灯超时时间已到`
```js
1.改源, D:\flutter_windows_3.10.5-stable\packages\flutter_tools\lib\src\http_host_validator.dart
	改为
	/// Common Flutter HTTP hosts.
	const String kCloudHost = 'https://storage.flutter-io.cn/';
	const String kCocoaPods = 'https://cocoapods.org/';
	const String kGitHub = 'https://kgithub.com/';
	const String kMaven = 'https://dl.google.com/dl/android/maven2/';
	const String kPubDev = 'https://pub.flutter-io.cn/';

2.删除D:\flutter_windows_3.10.5-stable\bin\cache
3.重新运行flutter doctor
```
> 以上是我自己想的, 后面发现可以参考 [在中国使用 Flutter | 扑](https://docs.flutter.dev/community/china)
#### Flutter SDK 包含
> Flutter 是用 C、C++、Dart、Skia（一种 2D 渲染引擎）和[Impeller](https://docs.flutter.dev/perf/impeller)（iOS 上的默认渲染引擎）构建的
1. 高度优化的移动优先 2D 渲染引擎，对文本具有出色的支持
2. 现代反应式框架
3. 丰富的小部件集，实现了 Material Design 和 iOS 风格
4. 用于单元和集成测试的 API
5. 用于连接到系统和第 3 方 SDK 的互操作和插件 API
6. 用于在 Windows、Linux 和 Mac 上运行测试的无头测试运行器
7. 用于测试、调试和分析您的应用程序的[Flutter DevTools （也称为 Dart DevTools）](https://docs.flutter.dev/tools/devtools/overview)
8. 用于创建、构建、测试和编译应用程序的命令行工具

###

### 快速入门
[你的第一个 Flutter 应用](https://codelabs.developers.google.com/codelabs/flutter-codelab-first#6)
> vscode直接`F5`运行
1. Flutter 工作原理的基础知识
2. 在 Flutter 中创建布局
3. 将用户交互（如按钮按下）与应用程序行为联系起来
4. 让你的 Flutter 代码井井有条
5. 使您的应用响应
6. 使您的应用程序具有一致的外观和感觉
7. 高级版本(带丝滑动画/渐变/淡入淡出)[DartPad](https://dartpad.dev/?id=e7076b40fb17a0fa899f9f7a154a02e8)
8.  `flutter build apk #--split-per-abi`

### 组件们
[小部件库 - Dart API](https://api.flutter.dev/flutter/widgets/widgets-library.html)


### 图标们
1. [Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons)
2. [Icons class - material library - Dart API](https://api.flutter.dev/flutter/material/Icons-class.html)

### 编译原理
[google/skia：Skia 是一个完整的 2D 图形库，用于绘制文本、几何图形和图像。](https://github.com/google/skia)
1. 开发者使用flutter build apk命令来构建安卓APK。
2. flutter工具通过daemon模块启动Flutter守护进程。
3. 守护进程使用build_runner工具编译Flutter工程。
4. build_runner工具会解析Flutter工程的pubspec.yaml文件,找到需要编译的Dart文件。
5. 对Dart代码进行编译,生成相应的Java代码,Java代码与原生安卓程序一起构建成APK。
	1. Dart代码解析为IR(抽象语法树);
	2. IR优化;
	3. IR转化为LIR(低级平台无关IR);
	4. LIR转化为Android特定IR;
	5. Android IR映射为Java代码;
	6. Java代码编译为APK。
6. APK构建完成后,守护进程会通知Flutter工具,并将最终的APK文件返回给开发者。

### 编译成Web
- flutter run -d chrome
- flutter build web --web-renderer canvaskit
1. 用skia的canvaskit 将Skia C++库编译到Wasm,并在HTML中引入。
	- [skia/modules/canvaskit at main · google/skia · GitHub](https://github.com/google/skia/tree/main/modules/canvaskit)
1. Wasm初始化Skia上下文API, 通过Emscripten与JavaScript进行交互。
2. Flutter通过Dart调用Skia API,最终映射到Wasm和Canvas API。
3. CSS样式通过Emscripten映射到Skia,实现高保真视觉效果。

### Dart
[飞镖编译 | 镖](https://dart.dev/tools/dart-compile#exe)
对于 Dart 语言，有以下两种常用的编译工具：
1. Dart Native 编译器（dart）：Dart Native 编译器是用于将 Dart 代码编译为本机代码的工具。它通过 Ahead-of-Time（AOT）编译技术将 Dart 代码转换为目标平台的机器码。Dart Native 编译器通常用于构建移动应用程序（如 Flutter 应用）或桌面应用程序（如 Dart 桌面应用）。
2. Dart-to-JavaScript 编译器（dart2js）：Dart-to-JavaScript 编译器是用于将 Dart 代码转译为 JavaScript 的工具。它将 Dart 代码转换为等效的 JavaScript 代码，使其能够在现代的 Web 浏览器中执行。Dart-to-JavaScript 编译器主要用于构建 Dart Web 应用程序，以在浏览器中运行。
**dart编译命令替换了 dart2native、dart2aot和dart2js命令**
	**使用[webdev工具](https://dart.dev/tools/webdev)而不是运行 dart2js 将 Dart 代码编译为可部署的 JavaScript**
#### final和const
```js
final int x = 10; // final变量
final int y = getX(); // final变量，可以在运行时计算赋值

const int a = 5; // const常量
const int b = a * 2; // const常量，在编译时计算赋值
```

https://github.com/miguelpruivo/flutter_file_picker
https://github.com/juliansteenbakker/mobile_scanner
plugins.flutter.io/url_launcher
plugins.flutter.io/path_provider
plugins.flutter.io/image_picker
plugins.hunghd.vn/image_cropper


```js
lib.main.main
	lib.src.app._MyAppState._guard 决定第一页面
		lib.src.screens.navigator._MyAppNavigatorState.build
			Navigator的pages中:
			[
			lib.src.screens.scaffold.MyAppScaffold的AdaptiveNavigationScaffold决定底部栏,
			要跳转的其他二级页面
			]
```
### 路由
MaterialApp.routes:{}
### 生命周期

| 生命周期方法                | 调用时机                                                     | 主要用途                                                     |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 构造函数                   | 创建组件对象时调用                                           | 初始化组件的状态和属性                                       |
| initState()               | 在构造函数执行之后调用                                       | 初始化组件的状态                                             |
| didChangeDependencies()    | 当组件依赖的数据发生变化时调用                               | 更新组件的状态                                               |
| build()                   | 在初始化阶段和每次组件需要被重建时调用                         | 构建组件的UI，返回一个Widget对象                             |
| didUpdateWidget()          | 当父组件发生重建时调用                                       | 更新组件的状态                                               |
| deactivate()              | 在组件被移除渲染树之前调用                                   | 释放资源、取消订阅等清理操作                                 |
| dispose()                 | 在组件被永久从渲染树中移除时调用                             | 释放资源、取消订阅等最终清理操作                             |
| didChangeAppLifecycleState() | 当应用的生命周期状态发生变化时调用（仅适用于StatefulWidget的State对象） | 响应应用程序生命周期的变化，如进入后台、返回前台等             |
| reassemble()               | 在调试模式下，热重载时调用                                   | 在热重载时重新构建组件的UI，用于调试和快速开发                 |

