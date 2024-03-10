# 一、日期对象

学习路径：实例化、日期对象方法、时间戳



## 实例化

创建一个时间对象并获取时间

获得当前时间 

```javascript
const date = new Date()
console.log(date) // Mon Feb 19 2024 16:45:04 GMT+0800 (中国标准时间)
```



获得指定时间

```javascript
const date = new Date('2008-8-8')
console.log(date) // Fri Aug 08 2008 00:00:00 GMT+0800 (中国标准时间)
```

## 日期对象方法

![image-20240219164836752](img/image-20240219164836752.png)

```javascript
const date3 = new Date()
console.log(date.getFullYear()); // 2024
console.log(date.getMonth() + 1); // 2
console.log(date.getDate()); // 19
console.log(date.getDay());//返回的是 周几，但是周天是0
```



### 案例：页面显示时间

需求：将当前时间以：YYYY-MM-DD HH:mm 形式显示在页面 2008-08-08 08:08

```html
<style>
  div {
    width: 300px;
    height: 40px;
    border: 1px solid pink;
    text-align: center;
    line-height: 40px;
  }
</style>
<body>
  <div></div>
</body>
<script>
  function getMyDate() {
    const date = new Date()

    let month = date.getMonth() + 1
    let day = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    return `${date.getFullYear()}年${month}月${day}日
            ${h}:${m}:${s}`
    // return `2024年2月19日 16:56:00`
  }

  const div = document.querySelector('div')
  

  div.innerHTML = getMyDate()
  //如果不写44行这一句 刷新的时候会有空白，回调函数的意思是隔了一秒再调用
  setInterval(function(){
    div.innerHTML = getMyDate()
  },1000)
</script>
```

**或者还有几种方法**

```html
<script>
  const div = document.querySelector('div')
  const date = new Date()
  // div.innerHTML = date.toLocaleString() //2024/2/19 17:10:43
  // div.innerHTML = date.toLocaleDateString() //2024/2/19
  // div.innerHTML = date.toLocaleTimeString() //17:11:35
</script>
```



## 时间戳

**使用场景：** 如果计算倒计时效果，前面方法无法直接计算，需要借助于时间戳完成

**什么是时间戳：**是指1970年01月01日00时00分00秒起至现在的毫秒数，它是一种特殊的计量时间的方式

**算法：**

① 将来的时间戳 - 现在的时间戳 = 剩余时间毫秒数

② 剩余时间毫秒数 转换为 剩余时间的 年月日时分秒 就是 倒计时时间

③ 比如 将来时间戳 2000ms - 现在时间戳 1000ms = 1000ms

④ 1000ms 转换为就是 0小时0分1秒



![image-20240220133254068](img/image-20240220133254068.png)

```javascript
// 指定时间的时间戳
console.log(+new Date('2022-4-1 18:30:00'))
```



### 案例：倒计时

V:\Web\mycode\4-3毕业倒计时.html



# 二、节点操作

DOM节点：DOM树里每一个内容都称之为节点

**节点类型**

①元素节点

​	所有的标签 比如 body、 div

​	html 是根节点

②属性节点

​	所有的属性 比如 href

③文本节点

​	所有的文本

④其他

![image-20240220140311117](img/image-20240220140311117.png)

我们重点记住哪个节点？

元素节点

可以更好的让我们理清标签元素之间的关系

## 查找结点

关闭二维码案例：点击关闭按钮， 关闭的是二维码的盒子（也就是按钮的父节点）， 还要获取二维码盒子

解法：关闭按钮 和 二维码是父子关系。所以，我们完全可以这样做：点击关闭按钮， 直接关闭它的爸爸，就无需获取二维码元素了

**节点关系：针对的找亲戚返回的都是对象**

​	父节点

​	子节点

​	兄弟节点



**查找结点默认元素节点。**

### ①父节点查找

parentNode 属性

返回最近一级的父节点 找不到返回为null 

> 语法 ：**子节点.parentNode**

```html
<body>
  <div class="grandfather">
    <div class="dad">
      <div class="baby"></div>
    </div>
  </div>
</body>
<script>
  const baby = document.querySelector('.baby')
  console.log(baby);
  console.log(baby.parentNode);
  console.log(baby.parentNode.parentNode);
</script>
```

![image-20240220141308561](img/image-20240220141308561.png)



```html
广告关闭案例

  <div class="box">
    我是广告
    <div class="box1">X</div>
  </div>
  <script>
    const box1 = document.querySelector('.box1')
    box1.addEventListener('click', function() {
      this.parentNode.style.display = 'none'
        //这里用了this
    })
  </script>


这里如果有多个广告
<body>
  <div class="box">
    我是广告
    <div class="box1">X</div>
  </div>
  <div class="box">
    我是广告
    <div class="box1">X</div>
  </div>
  <div class="box">
    我是广告
    <div class="box1">X</div>
  </div>
  <script>
    const closeBtn = document.querySelectorAll('.box1')
    for(let i = 0; i < closeBtn.length; i++) {
      closeBtn[i].addEventListener('click', function() {
        this.parentNode.style.display = 'none'
      })
    }
  </script>
```



### ②子节点查找

- childNodes

​	获得所有子节点、包括文本节点（空格、换行）、注释节点等

- children 属性 （重点）

​	仅获得所有元素节点

​	返回的还是一个伪数组，选的是最近的子节点

```html
<body>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</body>
<script>
  const ul = document.querySelector('ul')
  console.log(ul.children);
</script>
```



### ③兄弟节点查找

- 下一个兄弟节点 nextElementSibling 属性
- 上一个兄弟节点 previousElementSibling 属性

```html
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</body>
<script>
  const li2 = document.querySelector('ul li:nth-child(2)')
  console.log(li2.previousElementSibling);
  console.log(li2.nextElementSibling);
</script>
```



## 增加节点



很多情况下，我们需要在页面中增加元素。比如，点击发布按钮，可以新增一条信息

**一般情况下，我们新增节点，按照如下操作：**

- 创建一个新的节点

- 把创建的新的节点放入到指定的元素内部





**步骤1.创建节点**

创建元素节点方法  <font color = "red">**document.createElement('标签名')** </font>

**步骤2.追加节点**

要想在界面看到，还得插入到某个父元素中

- 插入到父元素的**最后一个**子元素： <font color = "red">**父元素.appendChild(要插入的元素)** </font>

- 插入到父元素中某个子元素的前面： <font color = "red">**父元素.insertBefore(要插入的元素，在那个元素前面)** </font>

```html
<body>
  <ul>
    <li>哈哈哈</li>
  </ul>
</body>
<script>
  const ul = document.querySelector('ul')

  const li = document.createElement('li')
  li.innerHTML="我是追加的li"
  ul.appendChild(li)
</script>
```



```html
<body>
  <ul>
    <li>哈哈哈</li>
  </ul>
</body>
<script>
  const ul = document.querySelector('ul')

  const li = document.createElement('li')
  li.innerHTML="我是追加的li"

  ul.insertBefore(li, ul.children[0])
</script>
```

### 案例：按照数据渲染页面

分析：

①：准备好空的ul 结构

②：根据数据的个数，创建一个新的空li

③：li里面添加内容 img 标题等

④：追加给ul

重点练习：创建节点和追加节点

> V:\Web\mycode\4-8学成在线重构

## 克隆节点

特殊情况下，我们新增节点，按照如下操作：

复制一个原有的节点

把复制的节点放入到指定的元素内部 **先克隆再追加**

<font color = "red">**语法：元素.cloneNode(布尔值)** </font>

- 克隆一个已有节点
- 括号内传入布尔值：若为true，则代表克隆时会包含后代节点一起克隆；若为false，则代表克隆时不包含后代节点(只克隆标签)； **默认为false，大部分情况都是true**

```html
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</body>
<script>
  const ul = document.querySelector('ul')
  // 克隆第一个li
  const li1_copy = ul.children[0].cloneNode(true)

  ul.appendChild(li1_copy)
</script>
```



## 删除节点

若一个节点在页面中已不需要时，可以删除它

在 JavaScript 原生DOM操作中，**要删除元素必须通过父元素删除，这里必须是亲爸爸亲儿子**

 <font color = "red">**语法：父元素.removeChild(要删除的元素)** </font>

【注意】：

- 如不存在父子关系则删除不成功

- 删除节点和隐藏节点（display:none） 有区别的： 隐藏节点还是存在的，但是删除，则从html中删除节点，从DOM树中删除了

```html
<body>
  <ul>
    <li>没用的</li>
    <li>有用的</li>
  </ul>
</body>
<script>
  const ul = document.querySelector('ul')
  ul.removeChild(ul.children[0])
</script>
```

#  三、M端事件

M端，就是mobile，移动端。

移动端也有自己独特的地方。比如**触屏事件 touch（也称触摸事件）**，Android 和 IOS 都有。

- 触屏事件 touch（也称触摸事件），Android 和 IOS 都有。

- touch 对象代表一个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。触屏事件可响应用户手指（或触控笔）对屏幕或者触控板操作。

- 常见的触屏事件如下：

![image-20240220151354485](img/image-20240220151354485.png)

```html
<style>
  div {
    width: 300px;
    height: 400px;
    background-color: pink;
  }
</style>
<body>
  <div></div>
</body>
<script>
  const div = document.querySelector('div')
  div.addEventListener('touchstart', function() {
    console.log('开始触摸');
  })
  div.addEventListener('touchend', function() {
    console.log('触摸结束');
  })
  div.addEventListener('touchmove', function() {
    console.log('一直触摸');
  })
</script>
```

# 四、JS插件

- 插件：就是别人写好的一些代码,我们只需要复制对应的代码，就可以直接实现对应的效果

- 学习插件的基本过程

熟悉官网,了解这个插件可以完成什么需求 https://www.swiper.com.cn/

看在线演示,找到符合自己需求的demo https://www.swiper.com.cn/demo/index.html

查看基本使用流程 https://www.swiper.com.cn/usage/index.html

查看APi文档,去配置自己的插件 https://www.swiper.com.cn/api/index.html

注意: 多个swiper同时使用的时候, 类名需要注意区分

# 五、综合案例

学生信息 

> V:\Web\mycode\4-11学生信息表



业务模块：

①： 点击录入按钮可以录入数据

②： 点击删除可以删除当前的数据
