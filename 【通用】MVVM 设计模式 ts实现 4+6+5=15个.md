

---

> MVC

```javascript
对于前后端分离的系统来说：Model即后端

MVC模式的意思是，软件可以分成三个部分。所有通信都是单向的。
    模型（Model）：数据保存（增删改查）
    视图（View）：用户界面。（模板文件）
    控制器（Controller）：业务逻辑（routes）

MVC:三角循环各部分之间的通信方式如下:
    M->V->C-M


vue中:
    M  是data
    V  是<template>
    VM 是 vm = new Vue();
    
MVVM 模式将 Presenter 改名为 ViewModel，以ViewModel为中心,基本上与 MVP 模式完全一致。
//与MVP唯一的区别是:  它采用【双向绑定（data-binding）】：View的变动，自动反映在 ViewModel，
                    //反之亦然。Angular 和 Ember 都采用这种模式。
    V-> VM <=> M

MVVM 3要素
    1 响应式：    vue 如何监听到 data 的每个属性变化？
    2 模板引擎：  vue 的模板如何被解析，指令如何处理？
    3 渲染：      vue 的模板如何被渲染成 html ？以及渲染过程
```



---



```javascript
设计模式分为三种类型: 
    1 创建型模式：1工厂，2建造者，3原型，4单例
    2 结构型模式：1适配器，2桥接，3装饰，4外观，5享元，6代理
    3 行为型模式：1命令，2中介者，3观察者,/重点/, 4状态，5策略

创建型模式:
    1工厂,/略重点/
    2建造者
    3原型
    4单例,/重点/
    
    
    工厂模式,/略重点/
        // 还真别说，形式上好看的代码，质量一般都比较高
        class People {
             name: string = ''
             des: string = ''
             constructor(name: string, des: string) {
                 this.name = name
                 this.des = des
             }
        }
        async function peopleFactory(des){  
             des = des+'经过加工的des'                              
             return new People(name,des)
        }
        
    建造者模式
        建造者模式用于直接构建复杂对象，比如上例中的构造函数参数，如果采用一个结构表示：
        constructor(peopleConfig:any) {
         this.name = peopleConfig.name
         this.age = peopleConfig.age
         this.des = peopleConfig.des
        }
        那么有必要将这个人对象的构建单独封装起来：
        class PeopleConfigBuilder{
         name: string = ''
         age: number = 0
         des: string = ''
         async buildName(){
         this.name = await get('someUrl')
         }
         async buildAge(){
         await get('someUrl?name='+this.name)
         }
         async buildDes(description: any){
         this.des = handleDes(description)
         }
        }
        class People {
         name: string = ''
         age: number = 0
         des: string = ''
         constructor(peopleConfig: PeopleCofigBuilder) {
         this.name = peopleConfig.name
         this.age = peopleConfig.age
         this.des = peopleConfig.des
         }
        }
        async function peopleFactory(description:any){
         const builder = new PeopleConfigBuilder()
         builder.buildName()
         builder.buildAge()
         builder.buildDes()
         return new People(builder)
        }
        当然，仅仅三个属性的对象，远远没有达到复杂对象的程度，因此，只有在对象十分复杂的时候，才需要应用到建造者模式。
        
    原型模式
        创建新对象时是基于一个对象的拷贝，而不是重新实例化一个类。
        举例说明，比如上例中的peopleConfig，其实peopleConfig应该是有固定模板的：
        function peopleConfigPrototype (){
         return {
         name: '',
         age: 0,
         des: ''
         }
        }
        这样每次返回的都是新的对象，也可以相当于是对象的拷贝，但是如果直接拷贝对象，应该怎么写呢？
        const peopleConfigPrototype = {
         name: '',
         age: 0,
         des: ''
        }
        const peopleConfig = Object.create(peopleConfigPrototype)
        // 采用Object.create方法，当前对象将被复制到peopleConfig的__proto__上
        还有另一种方式进行对象拷贝，但是会丢掉对象中的函数：
        const peopleConfig = JSON.parse(JSON.stringfy(peopleConfigProtytype))
        注意JSON操作会阻塞线程，导致性能急剧下降，一般不考虑这种方式。
        
    单例模式,/重点/   
        单例模式的目的是限制一个类只能被实例化一次，防止多次实例化。
        /* 懒汉单例  第一次调用实例的时候实例化*/
        class PeopleSingle{
             // 静态成员instance
             static instance = null
             // 私有构造函数
             private constructor(){ }
             public static getInstance(){
                 if(PeopleSingle.instance === null){
                     PeopleSingle.instance = new PeopleSingle()
                 }
                 return PeopleSingle.instance
             }
        }
        PeopleSingle.getInstance()
        
        /* 饿汉单例  类加载的时候就实例化*/
        class PeopleSingle{
         static instance = new PeopleSingle()
         private constructor(){ }
        }
        PeopleSingle.instance
```

        

        

```javascript
结构型模式：1适配器，2桥接，3装饰，4外观，5享元，6代理
    适配器模式      
        想想你的转接头，实际上就是被适配对象（adaptee）上套上一层封装，将其接口与目标对象（target）相匹配，所以适配器又叫wraper（包皮）。
        比如，有一个目标类UsbC：
        class UsbC{
         slowCharge(){
         console.log('slow charging')
         }
         superCharge(){
         console.log('super charging')
         }
        }
        有一个被适配目标MicroUsb：
        class MicroUsb{
         slowCharge(){
         console.log('slow charging')
         }
        }
        所以adapter是如此：
        // 精髓在implements target上
        class MicroToCAdapter implements UsbC{
         microUsb: MicroUsb
         constructor(microUsb: MicroUsb){
         this.microUsb = microUsb
         }
         slowCharge(){
         this.microUsb.slowCharge()
         }
         superCharge(){
         console.log('cannot super charge, slow charging')
         }
        }
        // 这样就可以直接
        new MicroTOCAdapter(new MicroUsb()).superCharge()
        适配器模式对多个不同接口的匹配非常有效，实际情况中没有必要完全使用类来封装，一个函数也可以搞定。
        
    桥接模式
        命名建议：xxxBridge，xxx(具体实现)
        比如汽车这个概念和颜色这个概念，可以将颜色作为汽车的成员变量，但是当颜色变得更加复杂时，比如渐变，模糊，图案等属性加入，不得不将其解耦，桥接模式就很重要了。
        abstract class Color {
         color: string
         abstract draw(): void
        }
        abstract class Car {
         color: Color
         abstract setColor(color: Color): void
        }
        再定义其实例：
        class Red extends Color {
         constructor() {
         super()
         }
         draw() {
         this.color = 'red'
         }
        }
        class Van extends Car {
         constructor() {
         super()
         }
         setColor(color: Color) {
         this.color = color
         }
        }
        抽象类和实现是解耦的，这时候我们如果要利用所有的类，就需要一个桥接类：
        class PaintingVanBridge {
         van: Car
         red: Color
         constructor() {
         this.red = new Red()
         this.red.draw()
         this.van = new Van()
         this.van.setColor(this.red)
         }
        }
        桥接模式会增加大量代码，所以一定要在使用之前对功能模块有一个恰当的评估！
        
    装饰模式
        装饰模式是在现有类或对象的基础上，添加一些功能，使得类和对象具有新的表现。
        function colorDecorator<T extends { new(...args: any[]): {} }>(color: string) {
         return function (constructor: T) {
             return class extends constructor {
                 name = 'shit'
                 color = color
                 }
             }
        }
        @colorDecorator<Car>('red')
        class Car {
         name: string
         constructor(name: string) {
         this.name = name
         }
        }
        装饰器会拦截Car的构造函数，生成一个继承自Car的新的类，这样更加灵活（但是注意这个过程只发生在构造函数阶段）
        
    外观模式
        简单一句话总结：“封装复杂，接口简单”，为所有的子系统提供一致的接口，比如轮胎，方向盘和车。
        class Tyre{
         name: string
         constructor(name: string){
         this.name = name
         }
        }
        class Steering{
         turnRight(){}
         turnLeft(){}
        }
        interface CarConfig{
         tyreName: string
         ifTurnRight: boolean
        }
        class Car{
         tyre:Tyre
         steering:Steering
         constructor(carConfig: CarConfig){
         this.tyre = new Tyre(carConfig.name)
         this.steering = new Steering()
         if(carConfig.ifTurnRight){
         this.steering.turnRight
         }
         }
        }
        可以活用Typescript的接口功能实现这一模式。
        
    享元模式
        享元模式避免重新创建对象，其实只要有缓存对象的意思，并且共用一个对象实例，就是享元模式。
        class Car{
         name: string
         color: string
         changeColor(color: string){
         this.color = color
         }
         changeName(name: string){
         this.name = name
         }
        }
        class CarFactory{
         static car: Car
         static getCar():Car{
         if(CarFactory.car === null){
         CarFactory.car = new Car()
         }
         return CarFactory.car
         }
        }
        CarFactory.getCar().changeColor('red')
        注意，由于是使用的同一个引用，因此会存在修改的问题。
        
    代理模式
        对接口进行一定程度的隐藏，用于封装复杂类。
        比如Car有很多属性，我们只需要一个简单的版本：
        class Car{
         a: number = 1
         b: number = 2
         c: number = 3
         d: number = 4
         name: string = 'name'
         test(){
         console.log('this is test')
         }
        }
        class CarProxy{
         private car: Car
         name: number
         constructor(){
         if(this.car === null){
         this.car = new Car
         }
         this.name = this.car.name
         }
         test(){
         this.car.test()
         }
        }     
```





```javascript
行为型模式：
    1命令，
    2中介者，
    3观察者,/重点/
    4状态，
    5策略


    命令模式
        命令模式的主要目的是让请求者和响应者解耦，并集中管理。
        //比如大家常用的请求，其实可以这样封装：
        function requestCommand(command: string){
         let method = 'get'
         let queryString = ''
         let data = null
         let url = ''
         const commandArr = command.split(' ')
         url = commandArr.find(el=>el.indexOf('http'))
         const methods = commandArr.filter(el=>el[0]==='-')
         methods[0].replace('-','')
         method = methods[0]
         const query = commandArr.filter(el=>el.indexOf('='))
         if(query.length > 0){
         queryString = '?'
         query.forEach(el=>{
         queryString += el + '&'
         })
         }
         const dataQuery = commandArr.filter(el=>el[0]==='{')
         // 对json的判断还不够细致
         data = JSON.parse(dataQuery)
         if(method === 'get' || method === 'delete'){
         return axios[method](url+query)
         }
         return axios[method](url+query,data)
        }
        requestCommand('--get https://www.baidu.com name=1 test=2')
        requestCommand('--post https://www.baidu.com {"name"=1,"test":2}')
        注意命令模式需要提供详尽的文档，并且尽可能集中管理。
        
    中介模式
        命名建议：xxxCotroller，xxxMiddleWare，xxx(具体实现)
        class Car{
         name: string = 'Benz'
        }
        class Buyer{
         name: string = 'Sam' 
         buy(car: Car){
         console.log(`${this.name}购买了${car.name}`)
         } 
        }
        class FourSShop{
         constructor(){
         const benz = new Car()
         const sam = new Buyer()
         sam.buy(benz)
         }
        }
        可以想象中介模式是一个立体的概念，可以理解成是两个概念发生关系的地点。
        
    观察者模式,/重点/
        观察者模式的目的是为了“检测变更”，既然要检测变更，自然需要记录之前的信息：
        //多个观察1个
        class Subject { //绑定 set时通知,调用观察者的update方法 get方法  
            constructor() {
                this.state = 0
                this.observers = []
            }
            getState() {
                return this.state
            }
            setState(state) {
                this.state = state
                this._notifyAllObservers()
            }
            attach(observer) {
                this.observers.push(observer)
            }
            _notifyAllObservers() {
                this.observers.forEach(observer => {
                    observer.update()
                })
            }
        }
        class Observer { //接收通知更新的方法
            constructor(name, subject) {
                this.name = name
                this.subject = subject
                this.subject.attach(this)
            }
            update() {
                console.log(`${this.name} update, state: ${this.subject.getState()}`)
            }
        }
        
        let s = new Subject()
        let o1 = new Observer('o1', s)
        let o2 = new Observer('02', s)
        
        s.setState(12)
        
        
    状态模式
        与观察者模式相对，表示的是“记录状态”，只要状态变更，表现即不同，这是设计数据驱动的基础。
        class State{
         tmp: string
         set store(state: string){
         if(this.tmp !== state){
         // do something
         this.tmp = state
         }
         }
         get store(): string{
         return this.tmp
         }
        }
        class People{
         state: State
         constructor(state: State){
         this.state = state
         }
        }
        const state = new State()
        const people = new People(state)
        state.store = 1
        console.log(people.state.store)
        //当然，如果一个数据接口既能记录事件，又能记录状态，可以么？
        //这就是传说中的响应式数据流，也就是大家平时使用的ReactiveX。
        
    策略模式
        策略模式表示动态地修改行为，而行为有时候是一系列方法和对象的组合，与命令模式的区别也在这里。
       // 策略之间(eg表达验证方法)相互独立，但又可以相互替换；
        //封装上下文(eg表达项)可以根据需要的不同选用不同的策略；
```

