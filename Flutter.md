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
1. 开发者使用`flutter build apk`命令来构建安卓APK。
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
- flutter build web
- -
1. 用skia的canvaskit 将Skia C++库编译到Wasm,并在HTML中引入。
	1. [skia/modules/canvaskit at main · google/skia · GitHub](https://github.com/google/skia/tree/main/modules/canvaskit)
2. Wasm初始化Skia上下文API, 通过Emscripten与JavaScript进行交互。
3. Flutter通过Dart调用Skia API,最终映射到Wasm和Canvas API。
4. CSS样式通过Emscripten映射到Skia,实现高保真视觉效果。
### 编译成apk
- flutter build apk

### 编译成ipa
1. **发布到App Store**：将应用发布到Apple的App Store，供所有用户下载使用，需要先打包成`.ipa`文件。
2. **通过TestFlight进行测试**：在正式发布应用之前，你可能需要通过TestFlight向外部测试者提供应用的测试版本，这也需要生成`.ipa`文件。
3. **企业内部分发**：如果你开发的应用是供特定组织或企业内部使用，不通过App Store公开发布，你可以使用苹果的企业程序（Apple Enterprise Program）来分发应用，这同样需要生成`.ipa`文件。
4. **个人设备上测试**：在多个设备上进行更广泛的测试，而不是仅限于开发者自己的设备，通常也会生成`.ipa`文件，通过iTunes或其他工具安装到测试设备上。
5. **备份或归档旧版本**：对于已发布的应用版本，开发者可能需要生成`.ipa`文件进行备份或归档，以便将来需要时可以重新部署或参考。

生成`.ipa`文件的具体操作通常涉及以下步骤：
- **配置App签名**：在Xcode中配置应用的签名和provisioning profile，确保应用可以被正确签名。
- **在Xcode中归档应用**：使用Xcode的归档功能（Archive）来生成应用的归档文件。
- **导出`.ipa`文件**：从归档中导出`.ipa`文件，这一步可以选择不同的配置和导出选项，例如是否重新签名，是否包含调试信息等。
在Xcode中从归档（Archive）导出`.ipa`文件是iOS应用开发中的一个重要步骤，尤其是在准备将应用发布到App Store或通过其他方式分发时。以下是详细的步骤：
#### 从归档中导出`.ipa`文件
##### 步骤1: 归档应用
首先，你需要在Xcode中归档你的Flutter应用：
1. 打开你的Flutter项目的`Runner.xcworkspace`文件。
2. 连接一个设备或选择一个模拟器作为目标设备。
3. 在Xcode顶部的菜单栏中选择`Product` > `Archive`。这将开始构建用于发布的应用，并将其保存在一个归档文件中。
##### 步骤2: 导出.ipa文件
归档完成后，Xcode会自动打开“Organizer”窗口，你可以在这里看到你的新归档。接下来，按照以下步骤导出`.ipa`文件：
1. 在“Organizer”中选择你刚创建的归档。
2. 点击窗口右侧的`Distribute App`按钮。
3. 选择分发选项，通常为`App Store Connect`、`Ad Hoc`、`Enterprise`或`Development`中的一个。选择对应的选项，这取决于你希望如何分发你的应用。
    - **App Store Connect**：如果你打算将应用提交到App Store。
    - **Ad Hoc**：如果你打算将应用分发给特定的设备，需要设备的UDID。
    - **Enterprise**：如果你打算在企业内部广泛分发应用。
    - **Development**：如果仅用于开发测试。
4. 根据提示，可能需要选择一个Provisioning Profile。
5. 点击`Next`并确认应用的签名信息。
6. 如果一切设置正确，点击`Export`，选择保存`.ipa`文件的位置。
导出过程完成后，你将在选择的位置找到`.ipa`文件，现在可以使用这个文件进行测试或通过iTunes等方式安装到设备上，或者上传到App Store Connect等平台。
##### 注意事项
- 确保你的应用满足所有发布前的要求，包括所有的隐私政策、权限说明等。
- 如果使用`Ad Hoc`或`Enterprise`方式，确保所有目标设备的UDID都已经添加到你的Apple Developer账户中。
- 在上传到App Store之前，通常建议先使用TestFlight进行测试。

这些步骤涉及到Xcode和Apple的开发者账户配置，如果遇到权限或配置问题，可能需要检查你的开发者账户设置或更新你的Xcode版本。
#### 注册苹果Apple Developer Program(苹果开发者计划)
需要使用 Apple Developer App 注册, 需要macos版本>v13,需要MacBook Pro（2017年及更新机型）才行
#### flutter build ipa
1. `flutter build ipa --export-method enterprise`
	1. 相当于 在Xcode顶部的菜单栏中选择`Product` > `Archive`
	2. 产出/build/ios/archive/**Runner.xcarchive**
2. `flutter build ios --release --no-codesign`
	1. 产出/build/ios/iphoneos/**Runner.app**

`flutter build ipa --export-options-plist=ios/exportOptions.plist`

1. `xcodebuild -exportArchive -archivePath build/ios/archive/Runner.xcarchive -exportPath build/ios/ipa -exportOptionsPlist ios/exportOptions.plist`
	1. 提示没有teamID, 之后提示没有签名的ios分发证书

#### Runner.app和Runner.xcarchive的区别
1. **Runner.app**：
   - **作用**：Runner.app是一个应用程序（App），其主要作用是作为Flutter应用程序的宿主（host）。在Android上，Flutter显示在一个View中，在iOS上，Flutter显示在一个名为Runner.app的应用程序中。
   - **构建方式**：可以使用命令`flutter build ios --release/debug`来生成Runner.app。
   - **路径**：在构建过程中，可以在确切路径下找到生成的Runner.app。

2. **Runner.xcarchive**：
   - **作用**：Runner.xcarchive是一个Xcode构建归档文件（build archive），用于构建和发布iOS应用程序。它是Xcode工具生成的一种文件类型。
   - **生成方式**：通过在Xcode中选择Product > Archive来生成构建归档文件。
   - **路径**：构建归档文件通常位于项目的`build/ios/archive/`目录中，同时也会生成一个App Store应用程序包（.ipa文件）在`build/ios/ipa`目录中。

综合上述信息可知，Runner.app是Flutter应用程序的宿主，而Runner.xcarchive是用于构建和发布iOS应用程序的Xcode构建归档文件。两者在用途和生成方式上有显著的区别。
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
- MaterialApp.routes:{}
#### 路由架构
- **MaterialApp本身就包含了一个默认的Navigator**
- MaterialApp.router是一个更高级的导航器
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

InheritedNotifier是用来告知某个组件是否该重新构建了吗?
	是的，你理解得很对！`InheritedNotifier`的一个主要作用就是通知与之相关联的子widget是否需要重新构建。
	当`InheritedNotifier`中的通知对象发生变化时，它会调用`notifyListeners()`方法通知所有依赖它的子widget重新构建。这意味着子widget可以根据通知对象的变化来更新自身的状态、重新渲染UI等。
```
#### 原生用法
```js
Navigator.push( context, MaterialPageRoute(builder: (context) => DetailPage(itemId: '123')), );
Navigator.push( context, MaterialPageRoute( builder: (context) => DetailPage(), settings: RouteSettings(arguments: '123'), ), );
```


### 实践经验
1. 某个部件注释就不会白屏, 解决: 部件的大小没有限制, 如Row要尽量占少的空间 mainAxisSize: MainAxisSize.min,
	- 一行3个占行的控件,用Expanded使它们平均分配行宽,(检查所有必要的都加上Expanded了)**`Expanded`小部件将子组件的大小调整为可用空间的剩余部分**
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
14. 包个SingleChildScrollView还显示溢出不滚动, 再包个Expanded即可(用来确定高度)
15. showModalBottomSheet 背景透明,不然给了圆角看不出来: 其backgroundColor: const Color.fromRGBO(0, 0, 0, 0),即可
16. Row里的Collum里加spacer白屏,  给Row包Expaned即可解决
17. 自动换行Wrap组件设置  spacing: 8, // 水平间距  runSpacing: 8, // 垂直间距, 相对于css的flex-wrap
18. 页面的build嵌套dialog的build的context时去用setState 容易混乱,setState只能引起页面自身的rebuild而无法影响dialog组件
19. [【Flutter】支持多平台 多端保存图片到本地相册 (兼容 Web端 移动端 android 保存到本地)_CHENJIAMIAN PRO的博客-CSDN博客](https://blog.csdn.net/a571574085/article/details/132725436) 
	- 关键是用'`package:universal_html/html.dart`' 替代`dart:html`,不然在安卓调试直接编译不通过
20. 对于 `ListView.builder`，Flutter 在 Android 平台上默认会为内容顶部添加系统状态栏的高度偏移。这意味着不需要手动设置顶部内边距来留出系统状态栏的高度。
	- `padding: EdgeInsets.only(top: 0),`//恢复

### 原理
1. import 'dart:ui'; 实际是引入 `D:\flutter_windows_3.10.5-stable\bin\cache\pkg\sky_engine\lib\ui\ui.dart
### 代码片段
```js
showToast('请输入正确的邮箱账号',duration: Duration(seconds: 2),radius: 3.0,);

final authState = MyAppAuthScope.of(context);

style: ElevatedButton.styleFrom(minimumSize: Size.fromHeight(55),),
```

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
帮我写一个flutter页面,页面名称为"修改登录密码",类的名称为"XiugaidenglumimaPage",页面是statefull的

页面导入了'../routing.dart','../auth.dart', 'package:flutter_widget_from_html/flutter_widget_from_html.dart','../data/apidata.dart','../http.dart','package:oktoast/oktoast.dart';

页面的appbar的leading为"""IconButton(icon: const Icon(Icons.arrow_back),onPressed: () {RouteStateScope.of(context).back(null);},),""";

如无特殊说明, 字体的颜色为Colors.black54

页面的第一部分是个卡片.
页面的第一部分第一行是文本'修改登录密码'
页面的第一部分第二行是输入框, 其prefixIcon为图标'assets\images\p1_zhuce_icon_mima.png'+文本'新密码', hintText为'8-20位的数字和字符密码',suffixIcon为显示和隐藏密码的图标
页面的第一部分第三行是输入框, 其prefixIcon为图标'assets\images\p1_zhuce_icon_mima.png'+文本'确认密码', hintText为'8-20位的数字和字符密码',suffixIcon为显示和隐藏密码的图标

注意要验证两次输入输入的两次密码是否一致

页面的第二部分是个占满全行的按钮"确定".按钮高度为55
```

### 什么决定了一个text的默认字体?
1. 父级的DefaultTextStyle, 如果在子组件的 `build` 方法中找到了与文本样式相关的代码，比如调用了 `DefaultTextStyle.of(context)` 或者使用了 `TextStyle` 参数，那么可以推断该组件使用了 `DefaultTextStyle`
2. `.flutter_windows_3.10.flutter.packages.flutter.lib.src.painting.text_style.TextStyle`的`final double? fontSize;`定义了默认为 14 逻辑像素，如果字体大小未指定
3. `text_button.dart`    `text_field.dart`   `text_theme.dart` text类组件只有这3个有用到`textTheme`


### `MappedListIterable`与`List`之间的主要区别在于它们的类型和行为：
1. 类型：`MappedListIterable`的类型是泛型`MappedListIterable<S, E>`，其中`S`是原始列表的元素类型，`E`是映射函数转换后的元素类型。而`List`的类型是泛型`List<E>`，其中`E`是列表的元素类型。
2. 存储方式：`MappedListIterable`并不直接存储列表元素，它是通过映射函数按需转换原始列表的元素来提供结果。相比之下，`List`直接存储元素。
3. 惰性计算：`MappedListIterable`具有惰性计算的特性。它只在需要访问元素时才会调用映射函数进行转换，而不会提前计算和存储所有元素。这使得它在处理大型数据集时更加高效。
总结来说，`MappedListIterable`是一个惰性计算的可迭代对象，通过映射函数将原始列表的元素转换为新的元素类型。与之相反，`List`是一个包含实际元素的有序集合。

### `ButtonStyle` 和 `ElevatedButton.styleFrom`的区别
- 使用 `ButtonStyle` 来设置按钮的背景颜色和文本样式。可以根据不同的 `MaterialState`（例如按下、禁用等）设置不同的样式属性
- `ButtonStyle` 提供了更高级和更灵活的样式定制选项，而 `ElevatedButton.styleFrom` 则是一种更简洁和方便的方式来设置按钮的样式
### 为什么在Flutter中，build方法不会等待didChangeDependencies方法中的异步操作执行完毕再执行。
1. 在Flutter中，`build`方法不会等待`didChangeDependencies`方法中的异步操作执行完毕再执行的主要原因是为了保持应用的响应性和流畅性。
2. Flutter的UI渲染是基于异步的事件循环机制，它通过渲染帧来更新UI。当Flutter接收到一个触发UI重建的信号时，它会将`build`方法标记为“脏”，然后在下一个渲染帧中调用`build`方法来重新构建UI。
3. 如果`build`方法需要等待`didChangeDependencies`方法中的异步操作执行完毕再执行，那么UI的更新可能会被阻塞，导致界面卡顿或无响应的现象。这是因为`didChangeDependencies`方法中的异步操作可能会耗费一定的时间，如果在此期间阻塞`build`方法的执行，会导致应用在用户交互和动画效果方面的体验变差。
4. 为了保持应用的响应性和流畅性，Flutter采用了异步的机制，即使在`didChangeDependencies`方法中存在异步操作，也不会阻塞`build`方法的执行。相反，你可以在异步操作完成后使用`setState`来触发UI的重新构建，以确保使用最新的数据进行渲染。
5. 这种设计使得Flutter应用能够在后台执行耗时的操作，同时保持UI的实时更新和用户交互的响应性。
6. 总结来说，Flutter中的`build`方法不会等待`didChangeDependencies`方法中的异步操作执行完毕再执行，以保持应用的响应性和流畅性。你可以使用`setState`来在异步操作完成后触发UI的重新构建，以更新UI并提供良好的用户体验。

### 国际化
1. [国际化 Flutter 应用程序 | 扑](https://docs.flutter.dev/ui/accessibility-and-localization/internationalization)
2. flutter gen-l10n
#### 备忘
- 11111111   123789  Aa.11111111
- 333 Aa.33333333 123654
- aaa Aa123!@#
- -

### CORS
1. 进入flutter\bin\cache目录，删除名为flutter_tools.stamp的文件
2. 进入flutter\package. \flutter_tools\lib\src\web目录，打开chrome.dart文件
3. 找到'--disable-extensions'
4. 添加'--disable-web-security'

### `flutter build ipa --export-method enterprise`,解决 "`No valid code signing certificates were found`" 错误的分步指南如下:

#### 第一步:在 Xcode 中打开 Flutter 项目
首先,需要在 Xcode 中打开 Flutter 项目的工作区。可以在终端中进入项目目录,运行:

```bash
open ios/Runner.xcworkspace
```
#### 第二步:配置项目设置
1. 在 Xcode 的导航区域选择 'Runner' 项目。
2. 选中 'Runner' 目标后,切换到 'Signing & Capabilities' 选项卡。
#### 第三步:设置开发团队
1. 确保你已经用 Apple ID 登录 Xcode:
   - 打开 Xcode 偏好设置 (`Xcode` -> `Preferences`)。
   - 进入 'Accounts' 选项卡。
   - 点击 '+'按钮添加你的 Apple ID(如果没有添加的话)。
2. 选择你的 Apple ID,确保它关联了有效的 Apple 开发者计划。
3. 回到项目目标的 'Signing & Capabilities' 选项卡:
   - 确保在 Team 下拉框中选择了一个'开发团队'。选择你的 Apple 开发者账号团队。
4. Xcode 可能会提示你修复与供应配置文件或签名相关的问题。勾选相应选项,允许 Xcode 自动管理签名。
#### 第四步:确保 Bundle ID 唯一
- 确保项目的 Bundle ID 是唯一的,并且在你的 Apple 开发者账号下注册过。Xcode 通常会在自动管理签名时自动注册。
#### 第五步:注册你的设备
- 将 iOS 设备连接到你的 Mac 上。
- 在 Xcode 的 'Window' 菜单下,打开 'Devices and Simulators'。
- 确保你的设备被识别并注册到了你的 Apple 开发者账号。
#### 第六步:构建并运行项目
- 尝试通过按下 `Cmd + R` 或点击 Xcode 中的 'Play' 按钮重新构建项目。这应该会在你选择的设备或模拟器上构建并运行。
#### 第七步:在设备上信任开发证书
- 在 iOS 设备上,进入 `Settings` -> `General` -> `Device Management`。
- 找到你的开发者证书并点击'Trust'。

#### 替代方案:在模拟器上运行
如果你只是想测试应用而不想处理签名问题,可以在 iOS 模拟器上运行应用:
- 从 Xcode 工具栏的目标设备下拉框中选择任意 iOS 模拟器。
- 构建并运行项目。
