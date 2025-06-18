### 实践
```javascript
https://www.typescriptlang.org/zh/play在试验场不断试错就完事了
有时候一个报错是无厘头的, 不一定真有那个错, 而是报错行上面的代码报错连带造成的!!!!!

找不到模块“../views/layout/index.vue”或其相应的类型声明。ts(2307)
    全局d.ts中加入:declare module '*.vue';
    
如何在项目实践?: 
     import { EChartOption } from 'echarts'//导入库规定的数据格式
     {...} as EChartOption<EChartOption.SeriesBar>//使用库的数据格式
         
 通用解决报错:(XXX as any) 或 (this as any)/*this指向全局*/
 
 /*解决window报错*/
     declare var window;
     interface Window {  loadMap: any,  map: any} //给window添加对象
     
let a= {a:1,b:2,c:3,d:4} as {a:number,b:number} //{xx} as XX表示包容地用xx包容地转成XX类型

解决Variable 'globalString' is used before being assigned错误
    let globalString: string; 
    //console.log(`globalString : ${globalString!}`); 
    //用!号来表示变量还未赋值

'类型{ ... }的参数不能赋给类型“Options”的参数 对象文字可以只指定已知属性，并且“title”不在类型“Options”中。ts(2345)'
     //给对象添加它本来没有的属性:
    let q1: Options = { x: 'foo', y: 32, z: 100 };// Error, no property 'z' in 'Options'    
    let q2 = { x: 'foo', y: 32, z: 100 } as Options;// OK   类型断言     

'类型“any”的参数不能赋给类型“never”的参数。ts(2345)':
    var arr: [] = []; arr.push("1")//报此错
    var arr: string[] = []; arr.push("1")//通过
'document.getElementById 对象可能为 "null"'
    //如果您从外部知道表达式不是null或undefined，则可以使用非空断言运算符!来强制删除这些类型：
    let x = some.expr.thing;// Error, some.expr may be null or undefined
    let y = some.expr!.thing;// OK
    //或者预先初始化它们:
    wrapperElement: document.createElement("div"),
'An outer value of 'this' is shadowed by this container.'
    function addInteraction(){} 改为 let addInteraction = () => {} 即可
        
忽略错误  // @ts-ignore

类型扩展(声明合并)的基本原则 https://segmentfault.com/a/1190000022842783  //如果这些声明文件包含相同的模块名称，则TypeScript编译器将合并这两个声明文件，并使用模块声明的组合版本
    //类不能与其他类或变量合并
   1 同模块：声明合并只能在同一个模块中进行
   2 同路径：声明的模块路径必须与目标类型（你将要扩展的类型）的原始声明文件路径保持一致
   3 同书写方式：声明书写方式必须与目标类型一致     
   eg:
        fnWithProperty(1); fnWithProperty.name = "name";
            对应d.ts声明:declare function fnWithProperty(id: number);declare module fnWithProperty {var name: string;}
        new OuterName.InnerName.NestedClass();
            对应d.ts声明:declare module OuterName {module InnerName {class NestedClass {}}}
   
   模块扩充 https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties
       export {}/有顶级import或export的话,该d.ts会被作为模块编译, 以此实现模块扩充, 否则,该d.ts会被作为全局声明编译,会重写覆盖原来的类型/,//扩展模块只能在模块中声明。也就是说，如果再全局声明中使用declare module，会被识别为对这个模块的整体声明，直接覆盖原本的声明
       declare module 'vue' {
            interface ComponentCustomProperties {//扩充vue的实例上挂的对象}
        }
```
### tsconfig.json
```typescript
同名.ts             //是 TypeScript 文件的后缀  
同名.d.ts           //DefinitelyTyped 用于给非ts的库添加语法提示,骗编译器 , 仅仅会用于编译时的检查 

//ts3.7中可以利用 JSDoc 语法从 js 生成 .d.ts 文件
import type { SomeThing } from "./some-module.js";//TypeScript 3.8 为仅类型导入和导出添加了新语法

tsconfig.json//告诉ts它应该ts文件们在哪
    路径包含 //编译器将尝试使用适当的路径查找a.ts, a.tsx然后是a.d.ts如果找不到特定文件，则编译器将查找环境模块声明
        //假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置
         方式1: "files": ["./some/file.ts"  ]
         方式2: "include": ["./folder"],   "exclude": ["./folder/**/*.spec.ts","./folder/someSubFolder"]
    //单纯执行tsc命令,编译器会逐级向上搜索父目录查找tsconfig.json文件
    "include": ["src/**/*"], //默认值为["**/*"]
    "exclude": ["node_modules", "**/*.spec.ts"]  //默认值["node_modules", "bower_components", "jspm_packages", "dist"]
    "compilerOptions": {
        strictNullChecks:true; //这样let y: number | null;  y = undefined;报错;
        noImplicitAny:true; //declare function testImplicitAny();报错;declare function testImplicitAny() : void;不报错;
        allowJs: true///扩展名可以是 .js/.jsx
        具体看: https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9
        "baseUrl": ".",//baseUrl: 用来设置下面 path 路径的根路径。
        "paths": {//path: 用来设置相对应的路径映射，数组中的路径相对应 baseUrl 的路径。
               "@/*": ["./src/*"],
              "@srcTypes/*": ["src/types/*"],/别名/
              "@utils/*": ["src/utils/*"]
        } 
     }
```
### declare/扩展
```js
declare ,TypeScript 将不会把它编译成任何代码, 只是用来表述一个其他地方已经存在的代码, 可以放在 .ts 或者 .d.ts 里
    三斜线指令: 早期版本现在不推荐了<reference path="node.d.ts"/> 仅在其包含文件的顶部有效,声明文件的模块的声明在哪里
    /在全局变量的声明文件d.ts中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了/
   所以, d.ts中，出现在顶层的import, export,就必须用三斜线指令了
        
    declare global 扩展全局变量
    declare module 扩展模块,/是可以被import等导入的/
    declare var/function/class/enum
    declare namespace 声明（含有子属性的）全局对象//随着 ES6 的广泛应用，现已经不建议使用 ts 中的 namespace，而推荐使用 ES6 模块化方案，但在声明文件中，declare namespace 还是比较常用的
    interface 和 type 声明全局类型
    /declare interface和interface之间没有区别/,因为:接口没有代码生成，它们只存在于Typescript中的接口本质上是声明
    偷懒用速记模块 declare module "hot-new-module"; 仅解决报错,没有代码提示作用, 来自速记模块的所有导入都将具有该any类型  
  
 export , 使用 declare 先声明多个变量，最后再用 export 一次性导出   
        export namespace 导出（含有子属性的）对象
        export default ES6 默认导出
        export = commonjs 导出模块
        export as namespace 既可以通过<script>标签引入，又可以通过import导入的库，称为UMD库, 需要局部变量声明为全局变量 

声明合并/扩展
    TypeScript 有两种模块类型声明：
        本地（普通模块）
        环境（全局）///允许编写与现有模块 声明合并 的全局模块声明。        
            d.ts仅当文件没有任何导入时，文件才被视为环境模块声明,/如果您提供一个import行，它现在被视为一个普通的模块文件，而不是全局的 ,所以增加模块定义不起作用。/
                Q:那全局模块声明要怎么导入才不会被视为普通模块?  
                A:从 TS 2.9 开始，我们可以使用import()语法将类型导入    
    
    src/shims-vue.d.ts ,/被@vue_cli-plugin-typescript使用/
        declare module '*.vue' {} //这样import *.vue的时候获得的是这里导出的Vue
        declare module 'vue/types/vue' {//'vue/types/vue'是路径, 会声明合并
          interface Vue {$myProperty: string //让ts知道我再vue的属性上有定义vue.$myProperty这个,会顺利编译通过      }
          interface VueConstructor {$myGlobal: string  }//Vue.$myGlobal
        }    
    
        
/type适合业务代码,interface适合类库, 差不多/
    //规定对象的数据结构
    interface Model {  name: string;  [key: string]: any;} //通用匹配
                   {name: 'hello', length: 100, casdf:1}//这样也是通过的
       
    type Name = string;//使用 type 创建string的别名
    type EventNames = 'click' | 'scroll' | 'mousemove';//联合类型(Union Types) ,能取三种字符串中的一种
```
### 语法
```js

泛型 //泛型方法,泛型常用 T、U、V 表示。泛型还可以自己起名称,通常以 T 作为泛型名称的前缀
    function GenericsFunc<T>(a: number): Array<T> {//调用: GenericsFunc<string>(3, 'x');
        let result: T[] = []; //<string> 表示用string替换所有的T,变成:  let result: string[] = []; //这样result肯定是字符串数组了
        return result;
    }

extends 
    type numberOrString<T> = T extends number ? number : string; //传入<number>的话,它就是number,否则它就是string  //T extends number表示它T是否有一个number属性
        let pickAbObject: numberOrString<number> = '1'; //错误, 因为 numberOrString<number>等同于 number
    
infer X 某某变量 // 提取某某变量里的所有[值]作为类似用于枚举的[类型], 赋值给X            
    type InferredAb<T> = T extends { a: infer U, b: infer U } ? U : T; //U的值是传入的a，U的值是传入的b
        let asdf: InferredAb<{ a:123, b:234 }> = 12;//报错Type '12' is not assignable to type '123 | 234'
        等同于 123|234
        let asdf:            123|234           = 12;
        
    type extractArrayType<T> = T extends (infer U)[] ? U : never; //T是个数组, 推断出数组的类型们赋值给U
        let stringType : extractArrayType< ["test1",1]> = "test3";//报错Type '"test3"' is not assignable to type '"test1" | 1'.   
        它等同:
        let stringType :            "test1" | 1         = "test3";// U是 "test1" | 1
    

b?: number;//等同于 b: number|undefined;
&的作用: function func<T, U>(first: T, second: U): T & U //assdf同时拥有类型T和类型U的成员

`尽可能避免使用 as，因为这会导致类型错误的风险增加。`
	如果你需要将一个值强制转换为另一个类型，即使它们之间没有直接的类型兼容性，那么使用 `as`。
	如果你需要明确告诉编译器一个值符合某个接口，即使该值没有明确地实现该接口，那么使用 `satisfies`。
     
0x00_FF_00===65280//true

never/unknown
    never //关键字来指示该函数将永远不会返回值, 更实际的用法是捕获bug:
        //在switch 语句之后，我们定义一个名为 returnValue ，类型 为的值 never ，并将传入的 value参数分配给它:
            let returnValue: never = value;//这样传入switch的case如果不存在的话就会在这里报错'*** is not assignable to type 'never''
                
    unknown //等同 any , 更安全 let unknownType: unknown = 1;
        let numberType: number;
        numberType = unknownType;//会报错,需要<number>unknownType把unknown转成number才行,这是与any的区别, 如果unknownType是any而不是unknown,这句就不会报错
    

元组:
    let tupleType: [string, boolean];//元组,赋值时都要赋到,否则会报错
        tupleType = ["test", false];//通过
        tupleType = ["test"];//报错
    let optionalTuple: [string, boolean?];//第二个参数可选的元组
    type RestTupleType = [number, ...string[]];//...string[] 表示很多个string
        let restTuple: RestTupleType = [1, "string1", "string2", "string3"];
        let [arg1, ...arg2] = restTuple;//arg1是1,arg2是数组["string1", "string2", "string3"]
        
overrides函数:
    function add(a: string, b: string): string;
    function add(a: number, b: number): number;
    function add(a: any, b: any): any {
        return a + b;
    }

类:
    class classWithAutomaticProperties {
        protected id: number | undefined;//不会被子类继承的
        constructor(public id: number, private name: string) {//自动属性:自动转为this.id=id; this.name=name;
            super(_id);//super是父类的constructor
        }
    }//let myAutoClass = new classWithAutomaticProperties(1, "className"); myAutoClass.id就可以访问到1了
    
    constructor(public firstName)//等同于 this.firstName = firstName;的简写

抽象类:
    //必须让子类各自去实现
    abstract class AbstractEmployee {
        public id: number | undefined;
        public name: string | undefined;
        abstract getDetails(): string;//抽象类中的抽象方法
        public printDetails() {
            console.log(this.getDetails());
        }
    }

Promise写法:
    function delayedPromise(): Promise<void|string> {
        return new Promise<void>(
            (resolve: () => void, reject: () => void )              => {resolve();} 
        ); 
        //或者带参数:
        return new Promise<string>(
            (resolve: (str: string) => void,reject: (str: string) => void) => {resolve("resolved_within_promise");}
        );
    }1038
  

//我们将基础类型叫做T，复合类型叫做Comp<T>
协变 (Covariant)：协变表示Comp<T>类型兼容和T的一致。是类型兼容性
逆变 (Contravariant)：逆变表示Comp<T>类型兼容和T相反。只会在一个函数赋值给另一个函数时, 在函数类型中的函数参数上出现
    例如:
        type NoOrStr = number | string
        type No = number
        let noOrStr = (a: NoOrStr) => {}
        let no = (a: No) => {}
        noOrStr = no //会报错! Type '(a: No) => void' is not assignable to type '(a: NoOrStr) => void'.
//双向协变 (Bivariant)：双向协变表示Comp<T>类型与T类型双向兼容。
//不变 (Invariant)：不变表示Comp<T>类型与T类型双向都不兼容。  
```
### 实用程序类型
```js
实用程序类型//vite项目中的使用频率如下
    //定义位于D:/Users/86159/AppData/Local/Programs/Microsoft VS Code/resources/app/extensions/node_modules/typescript/lib/lib.es5.d.ts
    104  Record<Keys, Type> //概括对象键值对
            Record<string, string> 表示{a:'1',b:'2'}  
            let recordAcNumbers : Record< "a" | "c", string> = { a: 1, c: "test"}; //表示a和c都要用到,且都得是string   //a:1会报错
    9    Omit<Type, Keys>  //从类型 `T` 中排除了类型 `K`
    5    NonNullable<Type> 
    4    Partial<Type> //用来创建类型的所有属性 T 都是可选的
    2    ReturnType<Type> 
    2    Parameters<Type> 
    2    Exclude<UnionType, ExcludedMembers> 
    1    ThisType<Type> 
    1    Required<Type> 
    1    Readonly<Type> //创建类型的所有属性 T 都是只读的
    0    ThisParameterType<Type> 
    0    Pick<Type, Keys> 
            Pick <{a: number;b: string;c: boolean;},  "a" | "b">; //表示a和b都要用到，但不能用c
            let pickAbObject : Pick<{ a: number;b: string;c: boolean;},  "a" | "b"> = { a: 1, b: "test",c:true}; //c:true会造成错误
    0    OmitThisParameter<Type> 
    0    InstanceType<Type> 
    0    Extract<Type, Union> 
    0    ConstructorParameters<Type> 

TypeScript 提供了一些常用的内置条件类型，例如：
	Exclude<T, U>：从类型 T 中排除类型 U。
	Extract<T, U>：从类型 T 中提取与类型 U 交集的类型。
	NonNullable<T>：从类型 T 中移除 null 和 undefined。
	ReturnType<T>：获取函数类型 T 的返回值类型。
	InstanceType<T>：获取构造函数类型 T 的实例类型。

keyof 频率 16
    type PartialProps<T> = {[K in keyof T]?: T[K];}//T传入的是键值对象
        let a:PartialProps<{a: number;b: string;c: boolean;}> = { a: 1, b: "test", c: undefined ,d:1};//d:1会造成错误
        
    let key: keyof IPerson='123'//keyof 顾名思义
```

### 装饰器
```javascript
装饰器(工厂函数)//在运行时(与编译时区分)修改类以注入所需的依赖项,(在声明被装饰的对象前被调用) 
    装饰Class的:
        @simpleDecorator 声明: 
        function simpleDecorator(constructor: Function) {    
            console.log('simpleDecorator called.');
            constructor 为//class ImportedClassName {}
            constructor.name为 //ImportedClassName
            constructor.prototype.testProperty = "testProperty_value";
            //实例importedClassName1.testProperty为testProperty_value
        }
        
        @simpleDecorator//后被调用
        @secondDecorator//先被调用
        class ClassWithMultipleDecorators {}
        
        @decoratorFactory('testName')//带括号的声明:function decoratorFactory(name: string) { return function (constructor: Function) { console.log(`decorator function called with : ${name}`); }}
    装饰Class属性的:
        function propertyDec(target: any, propertyKey: string) {
            target|target.constructor|target.name|target.constructor.name|propertyKey
        }
        class ClassWithPropertyDec {   @propertyDec name: string | undefined;  }    
            target  //Object{constructor: class ClassWithPropertyDec}
            target.constructor  //class ClassWithPropertyDec {}
            class name  //ClassWithPropertyDec
            propertyKey  //name    
        class StaticClassWithPropertyDec {   @propertyDec static aname: string;}   
            target //class StaticClassWithPropertyDec {}
            target.constructor //function Function() { [native code] }
            class name //StaticClassWithPropertyDec
            propertyKey //aname
    装饰Method的:
        function methodDec(target: any, methodName: string, descriptor?: PropertyDescriptor) { }
        //descriptor是Object.defineProperty的描述符
        
    装饰Params的:
        function parameterDec(target: any, methodName: string, parameterIndex: number) {}
    元数据装饰器:
        import 'reflect-metadata';//反射出被装饰的方法的参数,返回值等
        function metadataParameterDec(target: any, methodName: string, parameterIndex: number) {
            let designType = Reflect.getMetadata("design:type", target, methodName);
            let designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
            let designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
        }
        class ClassWithMetaData {    print(@metadataParameterDec id: number, name: string): number {return 1000;}}
```


### ESLint
```javascript
module.exports = {
    root: true,//ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
    parser: 'babel-eslint',//一个对Babel解析器的包装，使其能够与 ESLint 兼容
    parserOptions: { ecmaVersion: 9, //使用ES9
                     parser: "babel-eslint",/没有加的话会出莫名其妙的错误eslint的错误提示极不友好/
                     sourceType: 'module'//如果你的代码是 ECMAScript 模块 }
    env: { },//指定环境
    extends: [ 'standard' ], //继承规则,优先使用后面的, 需要npm install对应的`eslint-config-${plugin}`
    plugins: [ 'html',  'import'],//插件可以提供处理器从非.js类型文件中提取JS代码(或者预处理js代码)，
                                    //然后让 ESLint 检测JS代码,需要npm install对应的`eslint-plugin-${plugin}`
    rules: {//Rules - 启用的规则及其各自的错误级别
            'brace-style': 0,// 关闭else必须在大括号后面
            //"off" 或 0 或["off"] - 关闭规则
            //"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
            //"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)            
    }
}    
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        sourceType: 'module'
    },
    "extends": ["prettier", 'plugin:vue/recommended'],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": ["warn"],
        "comma-style": ["off", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }],
        "comma-dangle": ["off", "never"],
    },
}
```

### ts-loader报错过程
```javascript
ts-loader报错过程:
    createFileDiagnostic (typescript\lib\typescript.js)
    createDiagnosticForNodeInSourceFile (typescript\lib\typescript.js)
    createDiagnosticForNode (typescript\lib\typescript.js)
    createError (typescript\lib\typescript.js)
    error (typescript\lib\typescript.js)
    resolveExternalModule (typescript\lib\typescript.js)
    resolveExternalModuleNameWorker (typescript\lib\typescript.js)
    resolveExternalModuleName (typescript\lib\typescript.js)
    getTargetOfImportClause (typescript\lib\typescript.js)
    getTargetOfAliasDeclaration (typescript\lib\typescript.js)
    resolveAlias (typescript\lib\typescript.js)
    checkAliasSymbol (typescript\lib\typescript.js)
    checkImportBinding (typescript\lib\typescript.js)
    checkImportDeclaration (typescript\lib\typescript.js)
    checkSourceElementWorker (typescript\lib\typescript.js)
    checkSourceElement (typescript\lib\typescript.js)
    forEach (typescript\lib\typescript.js)
    checkSourceFileWorker (typescript\lib\typescript.js)
    checkSourceFile (typescript\lib\typescript.js)
    checkSourceFileWithEagerDiagnostics (typescript\lib\typescript.js)
    getDiagnosticsWorker (typescript\lib\typescript.js)
    getDiagnostics (typescript\lib\typescript.js)
    getEmitResolver (typescript\lib\typescript.js)
    emitWorker (typescript\lib\typescript.js)
    <anonymous> (typescript\lib\typescript.js)
    runWithCancellationToken (typescript\lib\typescript.js)
    emit (typescript\lib\typescript.js)
    
    getEmitOutput (ts-loader\dist\instances.js)
    getEmit (ts-loader\dist\index.js)
    successLoader (ts-loader\dist\index.js)
    loader (ts-loader\dist\index.js)
```

### this用于显式声明指定函数内部的上下文类型
- this 参数不是真正传递给函数的参数，它仅用于进行类型检查。
- this 参数必须是函数的第一个参数，并且在声明时需要用小括号括起来。

```ts
interface Person {  
    name: string;  
    age: number;  
    greet(this: Person): void;  
}  

const person: Person = {  
    name: "Alice",  
    age: 25,  
    greet(this: Person) {  
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);  
    }  
};  
person.greet();  // 输出: Hello, my name is Alice and I am 25 years old.  
```

### 底层机制
#### 1. 类型推导
类型推导是 TypeScript 的一种自动推断类型的能力。它可以让开发者在代码中省略类型注解，而编译器会根据上下文自动推断出变量的类型。例如：
```typescript
let message = "Hello, TypeScript"; // TypeScript 推断出 message 的类型为 string
```
在这种情况下，`message` 的类型会自动推导为 `string`。TypeScript 使用了一种称为“从右向左”的推导规则，也就是首先推导表达式的类型，然后再推导赋值变量的类型。
##### 类型推导的细节
TypeScript 主要通过以下几种方式进行类型推导：
- **初始化推导**：如上例所示，TypeScript 通过变量初始化的值来推断类型。
- **上下文推导**：例如在事件处理函数中，TypeScript 可以根据事件类型来推导回调函数参数的类型。
- **默认推导**：在缺少明确类型注解时，TypeScript 会使用默认类型（例如 `any` 或 `unknown`）进行推导。
#### 2. 类型兼容性检查
TypeScript 使用结构化类型系统（Structural Type System），也称为“鸭子类型”或“子类型多态”。这种类型系统下，两个类型之间的兼容性由它们的结构决定，而不是由显式的继承关系决定。
通俗点: 如果一个对象“长得像”某个类型（即具备符合条件的结构和方法），那它就可以被视为该类型
##### 类型兼容的规则
TypeScript 通过以下几种方式进行类型兼容性检查：
- **子类型兼容性**：如果类型 `B` 是类型 `A` 的子类型，则 `B` 可以赋值给 `A`。
- **宽泛性检查**：例如，在赋值过程中，如果目标类型比源类型具有更宽泛的属性（允许多余属性），那么类型是兼容的。
- **可选属性的兼容性**：对于对象类型，如果一个类型的可选属性对应另一个类型中的非可选属性，那么它们也是兼容的。
这种类型检查方式不仅提升了代码的灵活性，还确保了类型安全性。
#### 3. 条件类型
条件类型（Conditional Types）允许根据条件生成不同的类型。其语法形式为：
```typescript
T extends U ? X : Y
```
在这种表达式中，如果 `T` 能赋值给 `U`，则返回类型 `X`，否则返回类型 `Y`。条件类型在泛型编程中非常有用，能让类型定义更加灵活和动态。例如：
```typescript
type MessageOf<T> = T extends { message: infer M } ? M : never;
```
在这个例子中，`MessageOf<T>` 是一个条件类型，它检查 `T` 是否具有 `message` 属性，如果有，则返回该属性的类型，否则返回 `never`。
##### 条件类型的处理机制
在 TypeScript 编译器中，条件类型的处理流程大致如下：
1. **判断类型约束**：首先检查 `T` 是否满足 `U` 的约束条件。
2. **类型分配**：根据判断结果，选择合适的类型 `X` 或 `Y`。
3. **类型推断**：在条件类型中可以使用 `infer` 关键字从类型中推导出具体的类型。例如 `infer M` 会推断出 `message` 属性的类型。
#### 4. 映射类型（Mapped Types）
映射类型允许对类型的每个属性应用相同的转换。使用方式如下：
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
这个例子中，`Readonly<T>` 类型会将类型 `T` 的所有属性变为只读属性。映射类型的关键在于遍历 `T` 的所有属性，并应用一定的规则。
##### 实现
在编译器中，映射类型通过遍历对象类型的每个属性，并依次应用指定的转换规则来生成新的类型。这种转换可以包括：
- **增加修饰符**：如 `readonly`、`?`。
- **修改属性类型**：如 `T[P]` 指定属性的新类型。
映射类型结合了条件类型和类型推导能力，使得 TypeScript 类型系统具有极大的表达能力。

---
### 类型守卫
在 TypeScript 中，**类型守卫（Type Guards）** 是一种机制，用来在代码运行时通过特定的检查，将值的类型缩小到某个更具体的子集，从而避免类型错误。类型守卫主要用来处理 **联合类型**，确保类型安全，并为开发者提供更强的类型推断。
类型守卫通常用于函数中，当某个参数可以是多种类型之一时，通过运行时检查来确认它的具体类型，从而让 TypeScript 推断出该值的具体类型。在代码中，常见的类型守卫方式包括 `typeof`、`instanceof`、`in` 关键字以及自定义类型谓词。
#### 1. `typeof` 类型守卫
#### 2. `instanceof` 类型守卫
#### 3. `in` 类型守卫
#### 4. 自定义类型谓词（Type Predicates）
自定义类型谓词是一个函数，它返回布尔值，并在函数签名中使用 `x is Type` 语法来明确指出某个值是否属于某种类型。类型谓词非常灵活，适用于复杂类型的判断。
```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}
function printInfo(info: string | number): void {
  if (isString(info)) {
    console.log(info.toUpperCase());  // 确定为 string 类型
  } else {
    console.log(info.toFixed(2));  // 确定为 number 类型
  }
}

在这个例子中，`isString` 函数是一个自定义类型谓词，它检查某个值是否是 `string` 类型。当在 `printInfo` 函数中调用 `isString` 时，TypeScript 可以根据判断结果进一步推断出 `info` 的类型。
```
#### 5. `never` 类型与类型守卫 (else的情况)
**`never` 类型**代表不会发生的情况，通常在类型守卫中，当 TypeScript 已经根据所有条件缩小了类型，但仍然需要处理某种不可能的情况时，可以使用 `never` 作为类型。这对于确保类型安全非常有用。
```typescript
function handleValue(value: string | number | boolean): void {
  if (typeof value === 'string') {
    console.log('String value:', value);
  } else if (typeof value === 'number') {
    console.log('Number value:', value);
  } else {
    // 处理 boolean 类型的逻辑
    console.log('Boolean value:', value);
  }
}

假设我们有一个联合类型 `string | number | boolean`，我们通过一系列的 `if` 分支处理了 `string` 和 `number`，那么理论上 `else` 处理的就是剩下的 `boolean` 类型，确保了类型安全。
```
