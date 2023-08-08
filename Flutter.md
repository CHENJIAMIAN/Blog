>  Flutter是一个dart写的**UI 工具包**(有一层薄薄的 C/C++ 代码),  得益于dart, Flutter 在六个平台（Android、iOS、Web、Windows、macOS 和 Linux）上的支持
### 架构图
[Flutter System Architecture - Google 幻灯片](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.p)
Flutter 使用与 Unity 相同的基本架构模型
![1-1.82c25693.png | 700](https://book.flutterchina.club/assets/img/1-1.82c25693.png)

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

final List<int> numbers = [1, 2, 3];//可以numbers.add(4)
const List<int> numbers = [1, 2, 3];//不可以numbers.add(4)

```
#### dynamic 和 Object
```dart
dynamic value = 5;      value = "Hello";
```

### 常用库
https://github.com/miguelpruivo/flutter_file_picker 文件选择器
https://github.com/juliansteenbakker/mobile_scanner 二维码扫描
plugins.hunghd.vn/image_cropper# 图像裁剪器#
https://pub.dev/packages/uni_links  打开网页或应用#
https://pub.dev/packages/path_provider 获取文件系统目录
https://pub.dev/packages/device_info_plus 获取设备信息
https://pub.dev/packages/audioplayers 音频播放


### 路由
MaterialApp.routes:{}
#### 路由架构
```js
MaterialApp.router:
	->routerDelegate = SimpleRouterDelegate(是个RouterDelegate包装了MyAppNavigator) 
		//监听路由信息的改变,改变时，提供一个新的Navigator的pages列表
		->routeState: _routeState,
		->builder:MyAppNavigator(Navigator)
						MyAppNavigator:
								pages[
										final pathTemplate = routeState.route.pathTemplate;
										MyAppScaffold (Navigator)					
										//根 据pathTemplate 决定要渲染的page
								]]
								
```
#### 跳转原理
```js
RouteStateScope.of(context).go('/shezhizhifumima');//改变了 routeState 的 route.pathTemplate
//RouteStateScope 是个InheritedNotifier<RouteState>, go方法由 RouteState提供 (RouteState是个 ChangeNotifier)
	this.route = xxx 
		notifyListeners	
		通知与_routeState绑定的[RouterDelegate包装了MyAppNavigator]根据pathTemplate重新渲染
```
#### 原生用法
```js
Navigator.push( context, MaterialPageRoute(builder: (context) => DetailPage(itemId: '123')), );
Navigator.push( context, MaterialPageRoute( builder: (context) => DetailPage(), settings: RouteSettings(arguments: '123'), ), );
```


### 实践经验
1. 某个部件注释就不会白屏, 解决: 部件的大小没有限制, 如Row要尽量占少的空间 mainAxisSize: MainAxisSize.min,
	- 一行3个占行的控件,用Expanded使它们平均分配行宽,(检查所有必要的都加上Expanded了)
2. Row可以挤开宽度到满
3. Navigation and Routing案例中添加子级一个页面:
	1. app.dart 的 `allowedPaths` 添加页面路径,
	2. navigator.dart 添加的 `pages` 添加页面,
	3. 通过`RouteStateScope.of(context)!.go('/shoukuanfangshi');`跳转
	4. 右上角返回:AppBar加:leading: IconButton(icon: const Icon(Icons.arrow_back),onPressed: () {RouteStateScope.of(context).go('/wode');},),
4. 从下往上弹出是# BottomSheet, # CupertinoPicker是类似的滚轮选择
5. 图标Image.asset('assets/images/p1_chongzhi_icon_usdt.png',width: 20,height: 20,)
6. 文本换行,用Flexible包裹文本
7. showToast('请输入正确的邮箱账号',duration: Duration(seconds: 2),radius: 3.0,);
8. final authState = MyAppAuthScope.of(context);
9.  final myCountry = _countries.firstWhere((country) => country['countryId'] == authState.userInfo?.countryId,   orElse: () => null, );
	- 不加orElse: () => null,会抛出异常
10. formKey.currentState!.save();//调用每个表单项的onSaved
11. 列表引起白屏 ListView.separated(    shrinkWrap: true,
12. ListView会尽量占据更多的高度, 从来使得页面白屏, 解决:加入 shrinkWrap: true, physics: NeverScrollableScrollPhysics(),
14. SingleChildScrollView不滚动, 包个Expanded即可
15. showModalBottomSheet 背景透明,不然给了圆角看不出来: 其backgroundColor: const Color.fromRGBO(0, 0, 0, 0),即可
16. Row里的Collum里加spacer白屏,  给Row包Expaned即可解决
17. 自动换行Wrap组件设置  spacing: 8, // 水平间距  runSpacing: 8, // 垂直间距, 相对于css的flex-wrap
18. 页面的build嵌套dialog的build的context时去用setState 容易混乱,setState只能引起页面自身的rebuild而无法影响dialog组件

### 路由
MaterialApp.routes:{}

### 原理
1. import 'dart:ui'; 实际是引入 `D:\flutter_windows_3.10.5-stable\bin\cache\pkg\sky_engine\lib\ui\ui.dart
1. showToast('请输入正确的邮箱账号',duration: Duration(seconds: 2),radius: 3.0,);
2. final authState = MyAppAuthScope.of(context);
4. Aa.11111111
8. 会员： 设置法币国家-  绑定手机号（手机发送）- 绑定姓名 - 实名认证（会员上传）    更新头像

### 表单
1. Form   key: _formKey, 劫持整个表单, 在提交时 _formKey.currentState!.validate();验证
2. TextFormField 输入框, validator被回调校验, onChanged去取值
3.  `FormField<bool>` 的builder提供formFieldState, 通过在如checkbox的onChanged通知 formFieldState.didChange(value); 去触发formFieldState.isValid值的变化
4. 通过构造  FormData formData = FormData();在TextFormField的onChanged做 formData.email = value; 去收集表单


### 数据模型Model
```dart
dddd.dart
	import 'package:json_annotation/json_annotation.dart';
	@JsonSerializable()
	class XXX(){}


//自动生成一个文件两个方法
dddd.g.dart
	part of 'dddd.dart';
	_$FormDataFromJson()
	_$FormDataToJson()
```


### 实战项目
```js
lib.main.main
	lib.src.app._MyAppState._guard 决定第一页面
		lib.src.screens.navigator._MyAppNavigatorState.build
			Navigator的pages中:
			[
			lib.src.screens.scaffold.MyAppScaffold的 AdaptiveNavigationScaffold 决定底部栏,
			要跳转的其他二级页面
			]

```
### 通用Prompt
```js
帮我写一个flutter页面,页面名称为"收款方投诉",类的名称为"ShoukuanfangtousuPage",页面是statefull的

页面导入了'../routing.dart','../auth.dart', 'package:flutter_widget_from_html/flutter_widget_from_html.dart','../data/apidata.dart','../http.dart','package:oktoast/oktoast.dart';

页面的appbar的leading为"""IconButton(icon: const Icon(Icons.arrow_back),onPressed: () {RouteStateScope.of(context).go('/banzhuanzhuanqian');},),""";

页面的主要字体大小为16.

页面的第一部分是个卡片.
页面的第一部分第一行是灰色文本'投诉类型' + spacer + 灰色文本'请选择投诉类型' + 灰色右角括号图标
页面的第一部分第二行是divider
页面的第一部分第三行是灰色文本'描述'
页面的第一部分第四行是一个带外边框的输入框,输入框的高度为五行,输入框文本字数限制不能多于四百,在输入框内部右下角有当前字数/总字数
页面的第一部分第五行是图标'assets/images/p1_tousuweiquan_tianjiafujian.png'  + spacer + 图标'assets/images/p1_tousuweiquan_tianjiafujian.png'
页面的第一部分第六行是灰色文本'可先投诉, 后补资料, 截图或视频均可' + spacer + 灰色文本'截图或录屏参考'

页面的第二部分是个HtmlWidget('')
页面有bottomNavigationBar, 其中有按钮"发起投诉".按钮高度为40
```
flutter build apk

什么j