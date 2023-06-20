### 在线环境
[dartpad](https://dartpad.dev/?)

### 安装时验证环境 flutter doctor 报错 `A network error occurred while checking "https://maven.google.com/": 信号灯超时时间已到`
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

### 快速入门
[你的第一个 Flutter 应用](https://codelabs.developers.google.com/codelabs/flutter-codelab-first#6)
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
[Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons)

### 编译原理
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

### 