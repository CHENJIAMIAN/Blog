
```javascript
技巧
    模板重:[name]="xxx" 或 @[name]="" 动态属性|事件名
    fragment获取传进来的属性 <frament1 属性1="1" 属性2="2"/>
        <div :class="$attrs.属性1">1</div>
        <div :class="$attrs.属性2">2</div>
        <div v-bind="$attrs">3搞到所有属性</div>
    handleClick(arg1,$event)//传原生事件 @clik.self点自己才触发  @click.stop不冒泡
    props/emits都能先校验的
    BREAKING：
        单个v-model//在自定义组件上使用时，v-model prop 和 event 默认名称会更改：
            道具：value-> modelValue;
            事件：input-> update:modelValue
        多个v-model
            <div v-model:value1="sdfg"  v-model:value2="asdf"></div>
        自定义修饰符
            父:  v-model.asdf="myText"
            子:  props: {modelValue: String,  modelModifiers: {  default: () => ({}) }     },
                   if (this.modelModifiers.asdf) {做一些事情}
    生命周期多了onRenderTracked/onRenderTriggered
```

# 基本数据响应式

## 用法1: setup函数用法

```javascript
.vue文件    
    export default defineComponent({   name,components,setup(){return {/*里面的变量可以给template用*/}}}  })
  
  <div id="app">
    <h1 @click="onclick">{{message}}</h1>
    <p>{{computedMsg}}</p>
    <p>counter: {{counter}}</p>
  </div>
     
    const { nextTick,effect,createApp, reactive(69次),ref(36次), onMounted, computed,  toRefs,watch, onActivated, onBeforeMount,  
            onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onBeforeUnmount,onUnmounted, onUpdated,watchEffect } = Vue
    //生命周期钩子用了setup函数,就基本用不到了
    
    const app = createApp/defineComponent({        
      setup(props, { attrs, slots, emit }) {//一个函数替代分散的生命周期和数据初始化函数   options API -> composition API
            //可以返回 return ()=>h('div',{},slots.default()});
           
            const state = reactive({ // 数据响应式: 使对象响应化
              message: 'hello, vue3!',
              computedMsg: computed(() => state.message + '!!!!!!!')
            })
            state = Object.assign(state, 新的state);
            
            现在列举一下我知道的响应式失去的几个情况：
                1、解构 props 对象，因为它会失去响应式
                    /不要用 let {message,computedMsg}= state;  去解构state出来用, 不然响应式会变得很奇怪/
                    /eg造成:在回调里给解构出来的值赋值会无效,message='1'无效, state.message='1'也无效了/
                    /解决: let { message, computedMsg } = toRefs(state);  但message='1'还是无效的, 引物ref是message.value='1'才有效/
                2、 直接赋值reactive响应式对象
                3、 vuex中组合API赋值//const store = useStore()
                    a={count: store.state.count}; //a.count可能不是响应式
                    a={count: computed(() => store.state.count)};//正确做法

            //toRefs原理: proxy({name:'asfd'}) => { name: proxy({value:'asfd'}) }
            const message = toRef(state,'message')
    
            // 回调函数
            function onclick(){TypeScript.note
              console.log('click me!');
              state.message = 'vue3, hello!'
            }
    
            // 生命周期钩子函数
            onMounted(() => {
              // do something
              console.log('mounted');
              
            })            
    
    
            / 单值响应式, ref可以使单值作  !!!一层!!! 包装，得到一个Ref对象，它是响应式的/
            const counter = ref(0) 
            
            setInterval(() => {
              / 修改Ref，需要访问value属性/
              counter.value++
            }, 1000);            
      
            // 侦听一个 ref 或 reactive的getter
            watch(counter 或 () => state.message, (newVal, oldVal) => {}, {deep: true })
            //监听对象多个值变化
            watch( [()=>obj.value1,()=>obj.value2)] ,  ([newVal1,newVal2], [oldVal1,oldVal2]) => {})
            //非惰性,立即执行,无法获取之前的值
            watchEffect(智能回调)//适合放请求
            
            // 返回渲染函数上下文对象
            return {...toRefs(state), onclick, counter}
      }
    })

    app.mount('#app')
```

## 用法2 `<script setup>`

```js
<template>
  <MyComponent />
  {{a}}
</template>

<script>
export let map = null;
</script>

<script setup>
import MyComponent from './MyComponent.vue'

defineProps 和 defineEmits 都是只能在 <script setup> 中使用的编译器宏。他们不需要导入，且会随着 <script setup> 的处理过程一同被编译掉
import { ref,useSlots, useAttrs } from 'vue'
const a = ref(1)

const slots = useSlots()
const attrs = useAttrs()

defineOptions({name: 'ElForm',});
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: 'Petter'
  },
  userInfo: Object,
  tags: Array
})
const emit = defineEmits(['change', 'delete'])
provide( Key , reactive({}) )

defineExpose({  a })

map = new Map();


//await 代码会被编译成 async setup(),async setup() 必须与 Suspense 组合使用//https://juejin.cn/post/7028026616441733156
plotGETbyId(id).then(r => form = r.data);  /不会更新!!!/
await plotGETbyId(id).then(r => form = r.data); /可以更新✔, 但必须与 Suspense 组合使用/
</script>
```


## useHook思想用法

```javascript
    const { defineComponent, createApp, reactive, onMounted, onUnmounted, toRefs,ref } = Vue;

    // 鼠标位置侦听
    function useMouse() {
      // 数据响应化
      const state = reactive({ x: 0, y: 0 })
      const update = e => {
        state.x = e.pageX
        state.y = e.pageY
      }
      onMounted(() => {
        window.addEventListener('mousemove', update)
      })
      onUnmounted(() => {
        window.removeEventListener('mousemove', update)
      })     
      return toRefs(state) // 转换所有key为响应式数据
    }
    
    
    // 事件监测
    function useTime() {
      const state = reactive({ time: new Date() })//原data里的变量
      onMounted(() => {
        setInterval(() => {
          state.time = new Date()
        }, 1000)
      })
      return toRefs(state)// 转换所有key为响应式数据
    }
    
    
    // 逻辑组合, 组件使用useMouse,useTime两个hook
    const MyComp = {
      template: `
        <div>x: {{ x }} y: {{ y }}</div>
        <p>time: {{time}}</p>
      `,
      setup(props, { attrs, slots, emit }) {
        // 使用鼠标逻辑
        const { x, y } = useMouse(); /比vue2的mixins来源更清晰,没有变量名冲突/
        // 使用时间逻辑
        const { time } = useTime()
        // 返回使用
        return { x, y, time }
      }
    }
    createApp(MyComp).mount('#app')
```

# 源码

```javascript
 响应式实现
     effect(()=>state.xxx)//声明一个用了响应式对象的函数, 作用是放effectStack里(给track用完就拿掉)并且执行一次getter,做track收集依赖
         track//依赖收集
         targetMap = {target: {/*depsMap*/key:[/*depsSet*/cb1...]}}
     setter调用trigger//触发更新         
     
ref存在是因为Proxy不支持代理原始类型,要把它包在{value:值}里
    ref对象.value=值//执行的是 this._object[this._key] = newVal; 进而触发Proxy的setter
    ref对象.value.arr.push//数组的push等方法在create getter的时候就被做了特殊处理了
```


![0ACB95E1FCA746BC9928D885604F3AAD](https://github.com/CHENJIAMIAN/Blog/assets/20126997/7327229d-13f6-4bc9-b736-d6d98ec4c390)

### 高频率使用的API
```js
- element-plus中
	- computed 744个
	- ref 499个
	- watch 181个
	- getCurrentInstance 124个
	- nextTick 101个
	- reactive 39个
	- toRef 36个
	- unref 27个
	- toRef 18个
	- watchEffect 16个
	- isRef 15个
	- toRaw 3个
	- -
	- onMounted 67个
	- onUpdated 9个
	- onUnMounted 7个
	- onBeforeMount 3个
	- onBeforeUnMount 3个
	- onBeforeUpate|onDeactivated 1个
```
### Vue3+TS
```JS
withDefaults
	const props = withDefaults(defineProps<{ foo: string bar?: number }>(), { bar: 42 })
	- `defineProps<{ foo: string; bar?: number }>()`：定义了一个类型为 `{ foo: string; bar?: number }` 的 props。
	- `withDefaults()`：该函数接受 `defineProps` 的返回值和一个包含默认值的对象。在这个例子中，`bar` 的默认值被设定为 `42`。


使用 `unplugin-auto-import` 这个插件。这个插件能够自动地检测和导入你在文件中使用的 API，无需每次手动导入。
```
