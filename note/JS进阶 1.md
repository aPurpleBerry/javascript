# 一、作用域

- 作用域（scope）规定了变量能够被访问的“范围”，离开了这个“范围”变量便不能被访问

- 作用域分为：

局部作用域

全局作用域

## 局部作用域

局部作用域分为函数作用域和块作用域。

**1. 函数作用域：**

在函数内部声明的变量只能在函数内部被访问，外部无法直接访问。

```javascript
function getSum() {
  const num = 10
}
console.log(num) // 此处报错
```

总结：

1. 函数内部声明的变量，在函数外部无法被访问
2. 函数的参数也是函数内部的局部变量
3. 不同函数内部声明的变量无法互相访问
4. 函数执行完毕后，函数内部的变量实际被清空了



**2. 块作用域：**

在 JavaScript 中使用 { } 包裹的代码称为代码块，代码块内部声明的变量外部将**【有可能】**无法被访问。

```javascript
// let 声明的变量不能被访问
for(let i = 1; i <= 3; i++) {
  console.log(i);
}
console.log(i);// 不能被访问

// var 声明的变量 可以 被访问
for(let j = 1; j <= 3; j++) {
  console.log(j);
}
console.log(j);// 可以被访问
```

总结：

1. let 声明的变量会产生块作用域，**var 不会产生块作用域**
2. const 声明的常量也会产生块作用域
3. 不同代码块之间的变量无法互相访问
4. 推荐使用 let 或 const



## 全局作用域

```<script>```  标签 和``` .js 文件``` 的【最外层】就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问。

全局作用域中声明的变量，任何其它作用域都可以被访问。

```html
<script>
  const num = 10
  function fn() {
    console.log(num);
  }
</script>
```

注意：

1. 为 window 对象动态添加的属性默认也是全局的，不推荐！
2. 函数中未使用任何关键字声明的变量为全局变量，不推荐！！！
3. 尽可能少的声明全局变量，防止全局变量被污染

## 作用域链

```html
<script>
  // 全局作用域
  let a = 1
  let b = 2
  function f() {
    let a = 1 // 互补作用于
    function g() {
      a = 2
      console.log(a); // 在当前作用域中查找
    }
    g()
  }
  f()
</script>
```



- 作用域链本质上是底层的**变量查找机制**

在函数被执行时，会**优先查找当前**函数作用域中查找变量

如果当前作用域查找不到则会依次**逐级查找父级作用域**直到全局作用域

![image-20240222212309611](img/image-20240222212309611.png)

## JS垃圾回收机制

<font color="red">**1. 什么是垃圾回收机制？**</font>

**垃圾回收机制(Garbage Collection) 简称 GC**



JS中内存的分配和回收都是**自动完成**的，内存在不使用的时候会被垃圾回收器自动回收。

正因为垃圾回收器的存在，许多人认为JS不用太关心内存管理的问题

但如果不了解JS的内存管理机制，我们同样非常容易成内存泄漏（内存无法被回收）的情况

不再用到的内存，没有及时释放，就叫做内存泄漏



<font color="red">**2.内存的生命周期**</font>

JS环境中分配的内存, 一般有如下生命周期：

1. 内存分配：当我们声明变量、函数、对象的时候，系统会自动为他们分配内存
2. 内存使用：即读写内存，也就是使用变量、函数等
3. 内存回收：使用完毕，由垃圾回收自动回收不再使用的内存

4. 说明：

- 全局变量一般不会回收(关闭页面回收)；

- 一般情况下局部变量的值, 不用了, 会被自动回收掉



内存泄漏：程序中分配的内存由于某种原因程序**未释放**或**无法释放**叫做内存泄漏



<font color="red">**堆栈空间分配区别：**</font>

1. 栈（操作系统）: 由**操作系统自动分配**释放函数的参数值、局部变量等，基本数据类型放到栈里面。
2. 堆（操作系统）: 一般由程序员分配释放，若程序员不释放，由**垃圾回收机制**回收。**复杂数据类型放到堆里面。**

下面介绍两种常见的浏览器垃圾回收算法：引用计数法 和 标记清除法



- **引用计数**

IE采用的引用计数算法, 定义“内存不再使用”，就是看一个对象是否有指向它的引用，没有引用了就回收对象

算法：

1. 跟踪记录**被引用的次数**
2. 如果被引用了一次，那么就记录次数1,多次引用会累加 ++
3. 如果减少一个引用就减1 --
4. 如果引用次数是0 ，则释放内存

举例：

```javascript
const arr = [1,2,3,4]
arr = null
数据是复杂数据类型，在堆里面开辟一个空间存放数组[1,2,3,4]，然后在栈里面开辟一个空间arr，指向堆中数组的地址。
arr = null 指向为零。就释放
```

但它却存在一个致命的问题：**嵌套引用**（循环引用）

如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄露。

![image-20240222214544420](img/image-20240222214544420.png)

因为他们的引用次数永远不会是0。这样的相互引用如果说很大量的存在就会导致大量的内存泄露



- **标记清除法**

现代的浏览器已经不再使用引用计数算法了。

现代浏览器通用的大多是基于标记清除算法的某些改进算法，总体思想都是一致的。

核心：

1. 标记清除算法将“不再使用的对象”定义为“无法达到的对象”。
2. 就是从根部（在 JS 中就是全局对象）出发定时扫描内存中的对象。 凡是能从**根部到达**的对象，都是还需要使用的。
3. 那些**无法**由根部出发触及到的对象被标记为不再使用，稍后进行回收

![image-20240222214755944](img/image-20240222214755944.png)



## 闭包closure

概念：一个函数对周围状态的引用捆绑在一起，内层函数中访问到其外层函数的作用域

简单理解：**闭包 =  内层函数 + 外层函数的变量** 



最典型的闭包：

![image-20240222222656592](img/image-20240222222656592.png)



闭包作用：封闭数据，提供操作，外部也可以访问函数内部的变量

**闭包的基本格式：**

```javascript
// 想要在外面也能使用到 a这个值
// 常见的闭包形式：外部可以访问使用 函数内部的变量（正常情况无法访问）
  function outer() {
    let a = 10
    function fn() {
      console.log(a);
    }
    return fn 
    // 返回一个函数 
    // 不要写小括号，小括号是调用
  }

  // outer()
  // outer一调用 会返回一个函数
  //  等价于fn
  //  outer() === fn === function fn() {}

  const fun = outer()
  fun() // 调用函数
```



<font color="red">**闭包应用：实现数据的私有**</font>

比如，我们要做个统计函数调用次数，函数调用一次，就++

![image-20240222223822660](img/image-20240222223822660.png)

```javascript
  // 闭包作用：数据私有
  function count() {
    let i = 0
    function fn() {
      i++
      console.log(i);
    }
    return fn
  }

  const c = count()
  
  i会被回收吗？？会不会回收简单看能不能找到他，
  const c 是全局 不会被回收
  c使用了 count()，count中使用了 fn() ，fn中利用了i
  所以就算i 是局部变量，也不会被回收
  
  如果这个函数我只用了一次，但是内存无法释放，所以闭包会有内存泄漏的问题
```

## 变量提升

变量提升是 JavaScript 中比较“奇怪”的现象，不是好的，它允许在变量声明之前即被访问（仅存在于var声明变量）



代码执行之前，会把所有var**声明**的变量，提升到当前作用域的前面。<font color="red">**请注意，只提升 声明，不提升赋值**</font>

```html
<script>
  console.log(str + 'world!'); //undefinedworld!
  var str = 'hello'
</script>

所以相当于：
<script>
  var str
  console.log(str + 'world!'); // 此时还没有赋值，所以是undefined
  str  = 'hello'
</script>
```



注意：

1. 变量在未声明即被访问时会报语法错误
2. 变量在var声明之前即被访问，变量的值为 undefined
3. let/const 声明的变量不存在变量提升
4. 变量提升出现在相同作用域当中
5. 实际开发中推荐先声明再访问变量



# 二、函数进阶

知道函数参数默认值、动态参数、剩余参数的使用细节，提升函数应用的灵活度，知道箭头函数的语法及与普通函数的差异。

## 函数提升

```html
<script>
  // 1、会把所有函数声明提升到当前作用于的最前面
  // 2、只提升函数声明，不提升函数调用
  fn()
  function fn() {
    console.log('函数提升');
  }
</script>
-------------------------相当于------------------

<script>
  function fn() {
    console.log('函数提升');
  }
    
  fn()
</script>
```



<font color="red">函数表达式：(必须先声明和赋值，后调用，否则报错)</font>

```javascript
  fun()
  var fun = function () {
    console.log('函数表达式');
  }
  
  这里的函数表达式是【赋值】，不是声明，提升的时候只提升声明
  相当于：
  
  var fun // 只提升变量声明
  fun = function () {
    console.log('函数表达式');
  }
```

总结：

1. 函数提升能够使函数的声明调用更灵活
2. 函数表达式不存在提升的现象
3. 函数提升出现在相同作用域当中



## 函数参数

函数参数的使用细节，能够提升函数应用的灵活度。

除了形参、实参、函数默认参数，还有：

学习路径：

1. 动态参数
2. 剩余参数

### 1.动态参数

产品需求： 写一个求和函数。不管用户传入几个实参，都要把和求出来 getSum(2,3) , getSum(1,2,3) , getSum(1,2,3,4)

<font color="red">**arguments** 是函数内部内置的伪数组变量，它包含了调用函数时传入的所有实参</font>

**总结：**

1. arguments 是一个伪数组（有索引号有下标 但有些数组方法没有），只存在于函数中
2. arguments 的作用是动态获取函数的实参
3. 可以通过for循环依次得到传递过来的实参



```javascript
  function getSum() {
    // console.log(arguments);
    // arguments动态参数 只存在于函数里面

    let sum = 0
    for(let i = 0; i < arguments.length; i++) {
      sum += arguments[i]
    }
    console.log(sum);
  }
  getSum(2,3,4)
```



### 2.剩余参数

产品需求： 写一个求和函数。不管用户传入几个实参，都要把和求出来。

**除了动态参数，剩余参数也可以做。**

【语法说明】

① ... 是语法符号，置于最末函数形参之前，用于获取多余的实参

② 借助 ... 获取的剩余实参，是个**真数组**<font color ="red">推荐使用</font>

```javascript
  function getSum(...arr) {
    console.log(arr);
    // [2,3]
    // [1,2,3]
  }
  getSum(2, 3)
  getSum(1, 2, 3)
```

#### 展开运算符

展开运算符(…),将一个数组进行展开

```javascript
const arr = [1,2,3,4]
console.log(...arr); // 1 2 3 4
```

**说明：不会修改原数组**

**典型运用场景： 求数组最大值(最小值)、合并数组等**

![image-20240223111816526](img/image-20240223111816526.png)



## 箭头函数

是函数表达式的一种。

**目的：**引入箭头函数的目的是更简短的函数写法并且不绑定this，箭头函数的语法比函数表达式更简洁

**使用场景：**箭头函数更适用于那些本来需要匿名函数的地方

#### 1.语法

**语法1：基本写法**

```javascript
  const fn = function () {
    console.log('我是普通函数');
  }
  fn()

  const fn2 = () => {
    console.log('我是箭头函数');
  }
  fn2()
```

**语法2：只有一个参数可以省略小括号**

注意：没有参数的话，不可以省略小括号

```javascript
简化前:
  const fn2 = (x) => {
    console.log('我是箭头函数');
  }
  
简化后：
  const fn2 = x => {
    console.log('我是箭头函数');
  }
```

实战中：

```javascript
  const form = document.querySelector('form')
  form.addEventListener('click', ev => ev.preventDefault())
```



**语法3：如果函数体只有一行代码，可以写到一行上，并且无需写 return 直接返回值**

```javascript
简化前:
  const fn2 = x => {
    return x + x
  }

简化后：
  const fn2 = x => x + x // 这里不但是加了，还返回了，省略了return
  
-----------------------------------------------
简化前:
  const fn2 = (x,y) => {
    return x + y
  }
简化后：
  const fn2 = (x,y) => x + y
```



**语法4：加括号的函数体返回对象字面量表达式**

```javascript
  // 作用：直接返回一个对象
  
  // 按理来说，箭头函数后面跟着大括号，但是因为容易和对象的大括号混淆
  // 比如：const fn4 = (uname) => {{uname: uname}}
  // 所以用小括号代替
  const fn4 = (uname) => ({uname: uname} )//属性名: 属性值
  console.log(fn4('哈哈')); // OUTPUT: {name: '哈哈'}
```



**总结：**

1. 箭头函数属于表达式函数，因此不存在函数提升
2. 箭头函数只有一个参数时可以省略圆括号 ()
3. 箭头函数函数体只有一行代码时可以省略花括号 {}，并自动做为返回值被返回

4. 加括号的函数体返回对象字面量表达式

#### 2.函数参数

① 普通函数有arguments 动态参数

② 箭头函数没有 arguments 动态参数，但是<font color="red">有 剩余参数 ..args</font>

```javascript
  // 利用箭头函数求和
  const getSum = (...arr) => {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
      sum += arr[i]
    }
    return sum
  } 
  getSum(2, 3) // 5
```

#### 3.this

在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的this值

```javascript
  //【1】
  console.log(this); // window

  //【2】普通函数
  function fn() {
    console.log(this);
  }
  fn() 
  //会打印window.因为函数调用的时候,完整的写法是 window.fn()

  //【3】对象
  const obj = {
    name: 'andy',
    sayHi: function() {
      console.log(this);
    }
  }
  obj.sayHi() // obj 因为是obj调用的这个sayHi函数
```



<font color = "red">**箭头函数不会创建自己的this**,它只会从自己的作用域链的**上一层**沿用this。</font>

```javascript
  const fn = () => {
    console.log(this); // window
    // 在这个局部作用域中没有this
    // 所以会往父级作用于查看，就是window
  }

  const myObj = {
    name: 'hh',
    sayHi: () => {
      console.log(this);
      // 这个里面没有this,所以会往上一层作用域找
      // 对象的大括号并不是作用域
      // window.myObj 是window下的 
      // 所以是window
    }
  }
  myObj.sayHi()


  const myObj2 = {
    name: 'hh',
    sayHi: function()  {
      let i = 10
      const count = () => {
        console.log(this); // this指向的是 myObj2
      }
      count()
    }
  }
  myObj2.sayHi() 
```



![image-20240223115047173](img/image-20240223115047173.png)



# 三、解构赋值

引入：

![image-20240223115402426](img/image-20240223115402426.png)

## 1.数组解构

**作用：**数组解构是将数组的单元值（数组元素）快速批量赋值给一系列变量的简洁语法。

**基本语法：**

1. 赋值运算符 = 左侧的 [] 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2. 变量的顺序对应数组单元值的位置依次进行赋值操作

```javascript
  const arr = [100, 60, 80]
  const [max,min,avg] = arr
  console.log(max); // 100
  console.log(min); // 60
  console.log(avg); // 80

也可以：
 const [max,min,avg] = [100, 60, 80]
```

**典型应用：**

```javascript
  // 交换
  let a = 1
  let b = 1; // 这里必须加一个分号
  [b, a] = [a, b]

或者 
  let a = 1
  let b = 1 
  ;[b, a] = [a, b] // 分号写在这里
```

<font color="red">**补充说明 js 前面必须加分号情况：**</font>

① 立即执行函数

```
多个立即函数之间
(function () { })();
(function () { })()

或者
(function t1() { })()
;(function t2() { })()
```

② 数组解构

```javascript
  const arrayy = [1, 2, 3]
  const str = 'pink' //arrayy前面有一行代码 
  arrayy.map(function(item) {
    console.log(item);
  })

  
  const str = 'pink' //arr前面有一行代码 
  ;[1, 2, 3].map(function(item) {
    console.log(item);
  })
  [1,2,3]前面有一行代码，他就不认为换行了，会以为是 const str = 'pink'[1, 2, 3]
  所以使用分号隔开
  
```

- 练习

需求①： 有个数组： const pc = ['海尔', '联想', '小米', '方正']

解构为变量: hr lx mi fz

```javascript
const pc = ['海尔', '联想', '小米', '方正']
const [hr,lx,mi,fz] = pc
```

需求②：请将最大值和最小值函数返回值解构 max 和min 两个变量

function getValue() {return [100, 60]} 

```javascript
function getValue() {return [100, 60]} 
const [max, min] = getValue()
```



### **特殊情况**

 **① 变量少 单元值多的情况**

```javascript
const [a,b,c] = [1,2,3,4]
console.log(a) // 1
console.log(b) // 2 
console.log(c) // 3

console.log(a)
```

 **② 变量多 单元值少的情况**

```javascript
const [a,b,c,d] = [1,2,3]
console.log(a) // 1
console.log(b) // 2 
console.log(c) // 3
console.log(d) // undefined
```

**①的解决： 利用剩余参数解决变量少 单元值多的情况**

```javascript
const [a,b, ...c] = [1,2,3,4]
console.log(a) // 1
console.log(b) // 2 
console.log(c) // [3, 4]

C是一个真数组
```

**②的解决：防止有undefined传递单元值的情况，可以设置默认值**

```javascript
const [a=0,b=0,c=0,d=0] = [1,2,3]
console.log(a) // 1
console.log(b) // 2 
console.log(c) // 3
console.log(d) // 0
```

**③ 按需导入，忽略某些返回值**

```javascript
const [a, b, , d] = [1,2,3,4]
console.log(a) // 1
console.log(b) // 2
console.log(d) // 4
```

**④ 支持多维数组**

```javascript
const arr = ['苹果',['小米','华为']]
console.log(arr[0]) // 苹果
console.log(arr[1]) // ['小米','华为']

如果想单独拿到小米/华为怎么办？
console.log(arr[1][0]) // 小米
console.log(arr[1][1]) // 华为

利用数组解构
const [a, [b,c]] = ['苹果',['小米','华为']]
console.log(a) // 苹果
console.log(b) // 小米
console.log(c) // 华为
```



## 2.对象解构

对象解构是将对象**属性和方法**快速批量赋值给一系列变量的简洁语法。

<font color="red">**1.基本语法：**</font>

1. 赋值运算符 = 左侧的 {} 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
2. 对象属性的值将被赋值给与属性名<font color="red">**相同**的</font>变量
3. 注意解构的变量名不要和外面的变量名冲突否则报错
4. 对象中找不到与变量名一致的属性时变量值为 undefined

```javascript
  const obj = {
    uname: 'pink',
    age: 18
  }
  // obj.uname
  // obj.age

  // 解构
  const {uname, age} = obj
  /*
    const {uname, age} = {
      uname: 'pink',
      age: 18
    }
    等价于 const uname = obj.uname
          const  age = obj.age
  */
```



<font color="red">**2.给新的变量名赋值：**</font>

可以从一个对象中提取变量并同时修改新的变量名

**语法 旧值：新值** 。冒号表示“什么值：赋值给谁”

```javascript
  // 如果是这种情况怎么办？ 全局变量不能动 获取到的obj也不能动
  const obj = {
    uname: 'pink',
    age: 18
  }
  
  //变量冲突
  const uname = 'red' 
  const {uname, age} = obj
```

修改方式如下：

```
 const obj = {
    uname: 'pink',
    age: 18
  }
  
  //变量冲突
  const uname = 'red' 
  const {uname : username, age} = obj
```



<font color="red">**3.数组对象解构**</font>

```javascript
//数组对象解构
 const pig = [
  {
    uname: '佩奇',
    age: 18
  }
 ]
 const [{uname: pigname,age:pigage}] = pig
```

### 练习

需求①： 有个对象： const pig = { name: '佩奇',age: 6 }

结构为变量: 完成对象解构，并以此打印出值

```javascript
const [{name,age}] = pig
```

需求②：请将pig对象中的name，通过对象解构的形式改为 uname，并打印输出

```javascript
const [{name:uname,age}] = pig
```

需求③：请将 数组对象, 完成 商品名和价格的解构

const goods = [{goodsName: '小米' ,price: 1999}]

```javascript
const [{goodsName,price}] = goods
```

<font color="red">**4.多级对象解构**</font>

- ① 多级对象 【对象中有对象】怎么解构？

```javascript
//多级对象 【对象中有对象】怎么解构？
const pig = {
	name: '佩奇',
	family: {
		mother: '猪妈妈',
		father: '猪爸爸',
		sister: '乔治'
	},
	age: 6
}
```

```javascript
  const pig2 = {
    name: '佩奇',
    family: {
      mother: '猪妈妈',
      father: '猪爸爸',
      sister: '乔治'
    },
    age: 6
  }

  const {name, family:{mother, father, sister}} = pig2
  //一定要加一个family，因为pig2里面可能不仅仅只有一个子对象
```



- ② 多级对象 【数组对象，对象中有对象】怎么解构？

```javascript
// 怎么解构？
const pig3 = [
    {
      name: '佩奇',
      family: {
        mother: '猪妈妈',
        father: '猪爸爸',
        sister: '乔治'
      },
      age: 6
    }
  ]
 
  const [{name,family:{mother, father, sister}}] = pig3
```

**应用场景示范：**

```javascript
   // 这是后台传递过来的数据 ，现在我只需要其中的 data数组 用来渲染页面
   const msg = {
      "code": 200,
      "msg": "获取新闻列表成功",
      "data": [
        {
          "id": 1,
          "title": "5G商用自己，三大运用商收入下降",
          "count": 58
        },
        {
          "id": 2,
          "title": "国际媒体头条速览",
          "count": 56
        },
        {
          "id": 3,
          "title": "乌克兰和俄罗斯持续冲突",
          "count": 1669
        },

      ]
    }
 
   // 解构
   const {data}  = msg
   // 我只要data
   
   //如果这是渲染函数，刚开始的写法是：
   const {data}  = msg
   function render(arr) {
       console.log(arr)
   }
   render(data)

   // 【!!!非常重要】但现在可以这么写：
   function render({data}) { // 在形参中只接受data
       console.log(data)
   }
   render(msg) //送过来的原始数据


    // 需求3， 为了防止msg里面的data名字混淆，要求渲染函数里面的数据名改为 myData
    function render({ data: myData }) {
      // 要求将 获取过来的 data数据 更名为 myData
      // 内部处理
      console.log(myData)

    }
    render(msg)
```



# 方法补充：for each

forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数

主要使用场景： **遍历数组的每个元素**

**语法：**

```javascript
被遍历的数组.forEach(function(当前数组元素，当前数组元素索引) {
  //函数体
})
```



```javascript
  const arr= ['red', 'green', 'pink']
  arr.forEach(function(item, index) {
    console.log(item);
    console.log(index);
  })

  const result = arr.forEach(function(item, index) {
    console.log(item);
    console.log(index);
  })
  // result 是 undefined
```

注意：

1. forEach 主要是遍历数组
2. 参数当前数组元素是必须要写的， 索引号可选。
3. 和 map 方法很像 ，但是没有返回值

# 方法补充：filter

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

主要使用场景： **筛选数组符合条件的元素**，并返回筛选之后元素的新数组

```javascript
  const arr =[10, 20, 30]
  //想筛选出大于等于20的部分
  const newArr = arr.filter(function(item, index) {
    return item >= 20
  })
  console.log(arr); // (3) [10, 20, 30]
  console.log(newArr); // (2) [20, 30]


  // 利用箭头函数修改后
  const newArr2 = arr.filter(item => item >= 20)
```

filter里面加减，加减是map的工作

# 综合案例

**准备工作**

<font color="red">利用了 forEach、对象解构</font>

将 script 里面数组的数据，按照 html 的格式写入

```html
<body>
  <div class="list">
    <!-- <div class="item">
      <img src="" alt="">
      <p class="name"></p>
      <p class="price"></p>
    </div> -->
  </div>
  <script>
    const goodsList = [
      {
        id: '4001172',
        name: '称心如意手摇咖啡磨豆机咖啡豆研磨机',
        price: '289.00',
        picture: 'https://yanxuan-item.nosdn.127.net/84a59ff9c58a77032564e61f716846d6.jpg',
      },
      {
        id: '4001594',
        name: '日式黑陶功夫茶组双侧把茶具礼盒装',
        price: '288.00',
        picture: 'https://yanxuan-item.nosdn.127.net/3346b7b92f9563c7a7e24c7ead883f18.jpg',
      },
      {
        id: '4001009',
        name: '竹制干泡茶盘正方形沥水茶台品茶盘',
        price: '109.00',
        picture: 'https://yanxuan-item.nosdn.127.net/2d942d6bc94f1e230763e1a5a3b379e1.png',
      },
      {
        id: '4001874',
        name: '古法温酒汝瓷酒具套装白酒杯莲花温酒器',
        price: '488.00',
        picture: 'https://yanxuan-item.nosdn.127.net/44e51622800e4fceb6bee8e616da85fd.png',
      },
      {
        id: '4001649',
        name: '大师监制龙泉青瓷茶叶罐',
        price: '139.00',
        picture: 'https://yanxuan-item.nosdn.127.net/4356c9fc150753775fe56b465314f1eb.png',
      },
      {
        id: '3997185',
        name: '与众不同的口感汝瓷白酒杯套组1壶4杯',
        price: '108.00',
        picture: 'https://yanxuan-item.nosdn.127.net/8e21c794dfd3a4e8573273ddae50bce2.jpg',
      },
      {
        id: '3997403',
        name: '手工吹制更厚实白酒杯壶套装6壶6杯',
        price: '99.00',
        picture: 'https://yanxuan-item.nosdn.127.net/af2371a65f60bce152a61fc22745ff3f.jpg',
      },
      {
        id: '3998274',
        name: '德国百年工艺高端水晶玻璃红酒杯2支装',
        price: '139.00',
        picture: 'https://yanxuan-item.nosdn.127.net/8896b897b3ec6639bbd1134d66b9715c.jpg',
      },
    ]



  </script>
```

**答案为：**

如果不适用对象解构，那么就需要 item.name  item.picture

```html
<script>   
    // 声明一个字符串变量 最后所有的html都 按照字符串形式写入
    let str = ''
    // goodsList.forEach(function(item) {


    //优化
    goodsList.forEach(item => {
      //goodlists是一个数组，item得到每一个数组元素，每一个元素都是一个对象
      const {name,price,picture} = item //对象解构
      str += `
      <div class="item">
        <img src="${picture}" alt="">
        <p class="name">${name}</p>
        <p class="price">${price}</p>
      </div>
      `
    })

    const list = document.querySelector('.list')
    list.innerHTML = str
    
</script>  
```



**综合案例：**

![image-20240223174402846](img/image-20240223174402846.png)

```javascript
  // 渲染
  function render(arr) {
    let str = ''
    arr.forEach( item => {
      const {name, price, picture} = item
      str += `
      <div class="item">
        <img src="${picture}" alt="">
        <p class="name">${name}</p>
        <p class="price">${price}</p>
      </div>
      `
    });

    document.querySelector('.list').innerHTML = str
  }

  // 页面一打开就要加载
  render(goodsList)

  const filter = document.querySelector('.filter')
  filter.addEventListener('click', e => {
    const {tagName, dataset} = e.target
    if(tagName === 'A') {
      // e.target.dataset.index

      let arr = goodsList // 返回的是新数组

      // if(dataset.index === '1') {
      //   arr = goodsList.filter(function(item) {
      //     return item.price >0 && item.price <= 100
      //   })
      // } 
      console.log(11111);
      if(dataset.index === '1') {
        arr = goodsList.filter(item => item.price > 0 && item.price <= 100 )
      } else if(dataset.index === '2') {
        arr = goodsList.filter(item => item.price > 100 && item.price <= 300 )
      } else if(dataset.index === '3') {
        arr = goodsList.filter(item => item.price > 300 )
      }

      //重新渲染函数
      render(arr)
    }
  })
```

