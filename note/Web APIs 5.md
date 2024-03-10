# 一、Window对象

## 1、BOM

BOM(Browser Object Model ) 是浏览器对象模型

![image-20240220170854018](img/image-20240220170854018.png)

页面属于DOM，整个浏览器属于BOM，DOM属于BOM

- window对象是一个全局对象，也可以说是JavaScript中的顶级对象

- 像document、alert()、console.log()这些都是window的属性，基本BOM的属性和方法都是window的。比如 window.document.querySelector()，一般简写为document.querySelector()

- 所有通过var定义在全局作用域中的变量、函数都会变成window对象的属性和方法

- window对象下的属性和方法调用的时候可以省略window

```
比如生命的全局的函数、变量 都挂在了window上
function fn() {
	console.log(111)
}
fn()
window.fn()

var num = 10
console.log(num)
console.log(window.num)
```

## 2、定时器-延时函数

JavaScript 内置的一个用来让代码延迟执行的函数，叫 setTimeout

一次性的

网页上一般有两种定时器，①轮播图（setInterval 间歇函数）②广告（延时函数setTimeout）



 <font color = "red">**语法：** </font>**setTimeout(回调函数，等待的毫秒数)**

- setTimeout 仅仅只执行一次，所以可以理解为就是把一段代码延迟执行, 平时省略window

```html
<script>
  setTimeout(function() {
    console.log('时间到了');
  }, 2000)
</script>
```

 <font color = "red">**清除延时函数** </font>

**let timer = setTimeout(回调函数，等待的毫秒数)**

**clearTimeout(timer)**

**【注意点】**

- 延时器需要等待，所以后面的代码先执行

- 每一次调用延时器都会产生一个新的延时器

## 3、JS执行机制

浏览器有两个引擎，一个引擎渲染HTML CSS，另一个解析JS，JS解析器



**经典面试题**

![image-20240220172523202](img/image-20240220172523202.png)

132                                                                                       123

注意这两个的结果都是132



**JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。**

这是因为 Javascript 这门脚本语言诞生的使命所致——JavaScript 是为处理页面中用户的交互，以及操作DOM 而诞生的。比如我们对某个 DOM 元素进行添加和删除操作，不能同时进行。 应该先进行添加，之后再删除。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。这样所导致的问题是：如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。





为了解决这个问题，利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程。于是，JS 中出现了同步和异步。 

**同步**

前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法：我们要烧水煮饭，等水开了（10分钟之后），再去切菜，炒菜。 

**异步**

你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事

情。比如做饭的异步做法，我们在烧水的同时，利用这10分钟，去切菜，炒菜。

**他们的本质区别： 这条流水线上各个流程的执行顺序不同。** 



![image-20240220175247795](img/image-20240220175247795.png)



 <font color = "red">【JS执行机制】 </font>

 <font color = "red">① 先执行执行栈中的同步任务。 </font>

<font color = "red">② 异步任务放入任务队列中。 </font>

<font color = "red">③ 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行 </font>

![image-20240220175523591](img/image-20240220175523591.png)



![image-20240220175606475](img/image-20240220175606475.png)

首先 JS 代码从上到下依次执行，代码分为同步任务和异步任务，把所有的同步任务放在执行栈里，异步任务放在任务队列。

执行栈中所有同步任务执行完之后，去看任务队列中是否有要执行的，有的话放进执行栈

```html
 输出结果是 1243
  <script>
    console.log(1);
    console.log(2);
    setTimeout(function(){
      console.log(3);
    })
    console.log(4);
  </script>
```

## 4、location对象

location 的数据类型是对象，它拆分并保存了 URL 地址的各个组成部分

window.location, 可以省略window

**常用属性和方法：**

- **href** 属性获取完整的 URL 地址，对其赋值时用于地址的跳转

- **search** 属性获取地址中携带的参数，符号 ？后面部分

- **hash** 属性获取地址中的啥希值，符号 # 后面部分

- reload** 方法用来刷新当前页面，传入参数 true 时表示强制刷新

### 案例：5秒钟之后跳转的页面

需求：用户点击可以跳转，如果不点击，则5秒之后自动跳转，要求里面有秒数倒计时

分析：

①：目标元素是链接

②：利用定时器设置数字倒计时

③：时间到了，自动跳转到新的页面



- href属性

```html
<body>
  <a href="http://www.baidu.com">支付成功<span>5</span>秒钟之后跳转首页</a>
  <script>
    const a = document.querySelector('a')

    let num = 5
    let timeId = setInterval(function() {
      num--
      a.innerHTML = `支付成功<span>${num}</span>秒钟之后跳转首页`

      if(num === 0) {
        clearInterval(timeId)
        location.href = 'http://www.baidu.com'
      }
    }, 1000)
  </script>
</body>
```

- search 属性

search 属性获取地址中携带的参数，符号 ？后面部分

表单提交之后，在地址栏的？后面会有对应的数据

```html
<body>
  <form action="">
    <input type="text" name=""username>
    <input type="password" name="password">
    <button>提交</button>
  </form>
</body>
<script>
  // location.search提交表单之后在 控制台写这句话
  //search 属性获取地址中携带的参数，符号 ？后面部分
</script>
```

- hash 属性

hash 属性获取地址中的哈希值，符号 # 后面部分

后期vue路由的铺垫，经常用于不刷新页面，显示不同页面，比如 网易云音乐

```html
<body>
  <a href="#/my">我的</a>
  <a href="#/friend">关注</a>
  <a href="#/download">下载</a>
</body>
```

![image-20240220193302228](img/image-20240220193302228.png)



- reload 方法

**reload 方法用来刷新当前页面，传入参数 true 时表示强制刷新**

```html
<body>
  <button class="btn">刷新</button>
</body>
<script>
  const btn = document.querySelector('.btn')
  btn.addEventListener('click', function() {
    location.reload()
  })
</script>
```

## 5、navigator对象

navigator的数据类型是对象，该对象下记录了浏览器自身的相关信息

**常用属性和方法：**

通过 userAgent 检测浏览器的版本及平台

![image-20240220205232766](img/image-20240220205232766.png)

```html
<body>
  这是PC端页面
</body>
<script>
  // 检测 userAgent（浏览器信息）
  !(function () {
    const userAgent = navigator.userAgent
    // 验证是否为Android或iPhone
    const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
    const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
    // 如果是Android或iPhone，则跳转至移动站点
    if (android || iphone) {
     location.href = 'http://m.itcast.cn' 
    }
  })()
</script>

这里是立即执行函数的另一种写法
```

## 6、histroy对象

history 的数据类型是对象，主要管理历史记录， 该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

![image-20240220205734349](img/image-20240220205734349.png)

```html
<body>
  <button>后退</button>
  <button>前进</button>
</body>
<script>
  const back = document.querySelector('button:first-child')
  const forward = back.nextElementSibling
  back.addEventListener('click', function() {
    history.back()
  })
  forward.addEventListener('click', function() {
    history.forward()
  })
</script>
```

# 二、本地存储

以前我们页面写的数据一刷新页面就没有了。随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，HTML5规范提出了相关解决方案。



1、数据存储在**用户浏览器**中

2、设置、读取方便、甚至页面刷新不丢失数据

3、容量较大，sessionStorage 和 localStorage约 **5M** 左右

常见的使用场景：https://todomvc.com/examples/vanilla-es6/  页面刷新数据不丢失

<font color="red">本地存储只能存储字符串。</font>



## 本地存储 localStorage

**作用:** 可以将数据永久存储在本地(用户的电脑), 除非手动删除，否则关闭页面也会存在



**特性：**

可以多窗口（页面）共享（同一浏览器可以共享）

以键值对的形式存储使用



<font color="red">**【语法】:** </font>

**存储数据：**localStorage.setItem(key, value)

**获取数据：**localStorage.getItem(key)

**删除数据：**localStorage.removeItem(key)



```html
<script>
  //要存储一个名字
  localStorage.setItem('uname', 'pink老师') // 增
  localStorage.setItem('uname', 'red老师') // 改
  console.log(localStorage.getItem('uname')); // 查
  localStorage.removeItem('uname') // 删
</script>
```

![image-20240221121747603](img/image-20240221121747603.png)



## 本地存储 sessionStorage 

**【特性】：**

- 生命周期为关闭浏览器窗口

- 在同一个窗口(页面)下数据可以共享

- 以键值对的形式存储使用

- 用法跟localStorage 基本相同



## 存储复杂数据类型

- 存储

**本地只能存储字符串,无法存储复杂数据类型**

解决方式：将复杂数据转换成 JSON 字符串存储本地存储中

<font color="red">**语法：JSON.stringify(复杂数据类型)**</font>

```html
<script>
  const obj = {
    uname: 'pink',
    age: 18,
    gender: '女'
  }
  localStorage.setItem('obj', JSON.stringify(obj)) // 键值对
</script>
```

存了之后可以看到 JSON字符串是 {"uname":"pink","age":18,"gender":"女"}。 属性和值有引号，而且引号是统一的双引号。



- 取

因为存储的时候，把对象变成了 JSON字符串存储，所以取得时候要还原成对象

<font color="red">**语法：JSON.parse(JSON字符串)**</font>

```javascript
console.log(localStorage.getItem('obj'));//这样得到的是字符串
console.log(JSON.parse(localStorage.getItem('obj'))); //转换为对象
```



### 案例：学生就业统计表

添加，且刷新后数据不会消失

删除

> V:\Web\mycode\5-12学生就业统计表案例.html



模块分析：

①：新增模块， 输入学生信息，数据会存储到本地存储中

②：渲染模块，数据会渲染到页面中

③：删除模块，点击删除按钮，会删除对应的数据



渲染模块一定是从本地数据中读取，因为这样才能保证数据不丢失



**<font color = "red">补充一个新知识: </font>**

### 字符串拼接新思路（以后都用这个方法） map、join

map方法，join方法

- map()

map 可以处理数据，并且**返回新的数组**

**map 也称为映射。**映射是个术语，指两个元素的集之间元素相互“对应”的关系

```javascript
const arr = ['red', 'blue', 'green']

arr.map(function(ele, index) { //回调函数 第一个参数 是值，第二个参数是数组下标
  console.log(ele); //red blue green
  console.log(index); // 0 1 2 
})

const newArr = arr.map(function(item, i) {
    return item+'颜色'
})
console.log(newArr) //red颜色  blue颜色  green颜色  
```

- join()

join()方法用于把数组中的所有元素转换**一个字符串**

join参数：数组元素是通过参数里面指定的分隔符进行分隔的，空字符串(")，则所有元素之间都没有任何字符。

```javascript
const arr =  ['red颜色', 'blue颜色', 'green颜色']
console.log(arr.join('')) //red颜色blue颜色green颜色
console.log(arr.join(',')) //red颜色,blue颜色,green颜色 =>以逗号分隔
console.log(arr.join('?')) //red颜色?blue颜色?green颜色 =>以问号分割
```



#### ①渲染模块

渲染模块一定是从本地数据中读取，因为这样才能保证数据不丢失

方法：从本地数据中读取数据，然后写进页面。

因为写进页面的代码为：

```
        <tr>
          <td>1001</td>
          <td>欧阳霸天</td>
          <td>19</td>
          <td>男</td>
          <td>15000</td>
          <td>上海</td>
          <td>
            <a href="javascript:">删除</a>
          </td>
        </tr> 
```

我们是要把读取到的数据，按照这种格式写进页面，所以用到map方法。但是map方法得到的是数组形式，所以用到 join 方法。

【总结】

核心步骤：根据数据渲染页面。遍历数组，根据数据生成 tr，里面填充数据，最后追加给tbody

1.渲染业务要封装成一个函数render

2.我们使用map方法遍历数组，里面更换数据，然后会返回有数据的 tr 数组

3.通过join方法把map返回的数组转换为字符串

4.把字符串通过innerHTML赋值给tbody

#### ②新增模块

1.给form注册提交事件，要阻止默认提交事件（阻止默认行为)

2.非空判断：如果年龄、性别、薪资有一个值为空,则return返回'输入不能为空'中断程序



注意 ：页面刷新的时候，代码会重新执行一次



stuID的处理：思路为 新增加的序号应该是最后一条数据的stuID+1

```stuId: arr.length ? arr[arr.length - 1].stuId + 1 : 1,```

#### ③ 删除模块

1.采用事件委托形式，给tbody注册点击事件

2.得到当前点击的索引号。渲染数据的时候，动态给a链接添加自定义属性data-id=“o”

