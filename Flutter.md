### flutter doctor 报错 `A network error occurred while checking "https://maven.google.com/": 信号灯超时时间已到`
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

[你的第一个 Flutter 应用](https://codelabs.developers.google.com/codelabs/flutter-codelab-first#6)