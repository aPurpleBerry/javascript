# 事件流

<font color = "red">事件流 </font> 指的是事件完整执行过程中的流动路径

![image-20240204235532180](img/image-20240204235532180.png)

- 任意事件被触发时总会经历两个阶段：【捕获阶段】和【冒泡阶段】。

- 捕获阶段是【从父到子】的传导过程，冒泡阶段是【从子向父】的传导过程。

- 实际工作都是使用事件冒泡为主

## 事件捕获

**事件捕获概念：**从DOM的根元素开始去执行对应的事件 (从外到里)

- 事件捕获需要写对应代码才能看到效果

**代码：**

![image-20240204235844152](img/image-20240204235844152.png)

**说明：**

- addEventListener第三个参数传入 true 代表是捕获阶段触发（很少使用）

- 若传入false代表冒泡阶段触发，默认就是false

- 若是用 L0 事件(onclick)监听，则只有冒泡阶段，没有捕获

```html
<body>
  <div class="father">
    <div class="son"></div>
  </div>
</body>
<style>
  .father {
    width: 500px;
    height: 500px;
    background-color: pink;
  }
  .son {
    width: 200px;
    height: 200px;
    background-color: purple;
  }
</style>
<script>
  const father = document.querySelector('.father')
  const son = document.querySelector('.son')
  document.addEventListener('click', function() {
    alert('我是爷爷')
  },true)

  father.addEventListener('click', function() {
    alert('我是爸爸')
  },true)

  son.addEventListener('click', function() {
    alert('我是儿子')
  },true)
</script>
```

当**单击**son事件触发时，其祖先元素的**单击**事件也【相继触发】（我是爷爷->我是爸爸->我是儿子）

结合事件流的特征，我们知道当某个元素的事件被触发时，事件总是会先经过其祖先才能到达当前元素，然后再由当前元素向祖先传递，事件在流动的过程中遇到相同的事件便会被触发。

## 事件冒泡

**事件冒泡概念:**  当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡

- 简单理解：当一个元素触发事件后，会依次向上调用**所有**父级元素的<font color = "red">**同名事件（同一类型的事务）** </font> 

- 事件冒泡是默认存在的
- L2事件监听第三个参数是 false，或者默认都是冒泡。L0有冒泡没有捕获

```html
<script>
  const father = document.querySelector('.father')
  const son = document.querySelector('.son')
  document.addEventListener('click', function() {
    alert('我是爷爷')
  },false)

  father.addEventListener('click', function() {
    alert('我是爸爸')
  },false)

  son.addEventListener('click', function() {
    alert('我是儿子')
  },false)
</script>
```

函数第三个参数默认是false，不写也可以。

## 阻止冒泡

目标：能够写出阻止冒泡的代码

- **问题：**因为默认就有冒泡模式的存在，所以容易导致事件影响到父级元素

- **需求：**若想把事件就限制在当前元素内，就需要阻止事件冒泡

- **前提：**阻止事件冒泡需要拿到事件对象（回调函数的第一个参数）
- **语法：**``` 事件对象.stopPropagation()```

- **注意：**此方法可以阻断事件流动传播，不光在冒泡阶段有效，捕获阶段也有效

![image-20240205001941692](img/image-20240205001941692.png)

## 解绑事件

之前的on事件方式，直接使用null覆盖偶就可以实现事件的解绑

**语法：**

```javascript
// 绑定事件
btn.onclick = function() {
  alert('点击了')
}

// 解绑事件
btn.onclick = null // 函数是一个对象
```



<font color = "red">**addEventListener**方式，必须使用：removeEventListener</font>

```
removeEventListener(事件类型, 事件处理函数, [获取捕获或者冒泡阶段])
// 中括号表示这个参数是可以省略的
```

<font color = "red">**注意：匿名函数无法被解绑** </font>

```html
<body>
  <button>btn</button>
</body>
<script>
  const btn = document.querySelector('button')
  
  function fn() {
    alert('点击了')
  }

  btn.addEventListener('click',fn) // 绑定事件
  btn.removeEventListener('click',fn) // 解绑事件
</script>
```

## 鼠标经过事件的区别

- mouseover 和 mouseout 会有冒泡效果

- mouseenter 和 mouseleave 没有冒泡效果 (推荐)



实际案例演示：mouseover 不好的地方（有冒泡）

```html
<body>
  <div class="dad">
    <div class="son"></div>
  </div>
</body>
<style>
  .dad {
    width: 300px;
    height: 300px;
    background-color: pink;
  }
  .son {
    width: 200px;
    height: 200px;
    background-color: purple;
  }
</style>
<script>
  const dad = document.querySelector('.dad')
  const son = document.querySelector('.son')

  dad.addEventListener('mouseover' , function() {
    console.log('dad-鼠标经过');
  })
  dad.addEventListener('mouseout' , function() {
    console.log('dad-鼠标走了');
  })

  son.addEventListener('mouseover' , function() {
    console.log('son-鼠标经过');
  })
  son.addEventListener('mouseout' , function() {
    console.log('son-鼠标走了');
  })
</script>
```



![image-20240205003530402](img/image-20240205003530402.png)

我的目标是把鼠标放在son身上，但是在移动鼠标光标的过程中，会经过dad区域，因此①触发“dad-鼠标经过”。 接着移到son上面，此时是先离开了dad，所以触发②“dad-鼠标走了”；再放在son上③触发“son-鼠标经过” 。最后因为mouseover有冒泡效果，所以依次向上调用son的**所有**父级元素的**同名**事件（mouseover事件） 触发④ “dad-鼠标经过” <font color="red">这里第④步的“dad-鼠标经过” 就是冒泡</font>

修改代码之后：（把mouseover改为mouseenter，mouseout改为mouseleave）

```html
  dad.addEventListener('mouseenter' , function() {
    console.log('dad-鼠标经过');
  })
  dad.addEventListener('mouseleave' , function() {
    console.log('dad-鼠标走了');
  })

  son.addEventListener('mouseenter' , function() {
    console.log('son-鼠标经过');
  })
  son.addEventListener('mouseleave' , function() {
    console.log('son-鼠标走了');
  })
```



![image-20240205004245278](img/image-20240205004245278.png)

**此时就没有冒泡**

<font color="red">这里有一个问题 更改之后没有dad-鼠标离开了。</font>

## 两种注册事件的区别

**传统on注册（L0）**

- 同一个对象,后面注册的事件会覆盖前面注册(同一个事件)

- 直接使用null覆盖偶就可以实现事件的解绑

- 都是冒泡阶段执行的

**事件监听注册（L2）**

- 语法: addEventListener(事件类型, 事件处理函数, 是否使用捕获)

- 后面注册的事件不会覆盖前面注册的事件(同一个事件)

- 可以通过第三个参数去确定是在冒泡或者捕获阶段执行

- 必须使用removeEventListener(事件类型, 事件处理函数, 获取捕获或者冒泡阶段)

- 匿名函数无法被解绑



# 事件委托

目标：能够说出事件委托的好处

**事件委托是利用事件流的特征解决一些开发需求的知识<font color = "red">技巧 </font>**

- 优点：减少注册次数，可以提高程序性能

- 原理：事件委托其实是利用事件冒泡的特点。

  给父元素注册事件，当我们触发子元素的时候，会冒泡到父元素身上，从而触发父元素的事件

-  实现：事件对象.target. tagName 可以获得真正触发事件的元素



举例：需求是点击 li 然后 li 变红，**以前的写法是把所有的 li 都绑定事件**

![image-20240205005113127](img/image-20240205005113127.png)



![image-20240205004930205](img/image-20240205004930205.png)



```html
<body>
  <ul>
    <li>第1个孩子</li>
    <li>第2个孩子</li>
    <li>第3个孩子</li>
    <li>第4个孩子</li>
    <li>第5个孩子</li>
    <p>我不需要颜色</p>
  </ul>
  <div class="box"></div>
</body>
<script>
  // 按照事件委托的方式
  const ul = document.querySelector('ul')
  ul.addEventListener('click' ,function(e) {
    console.log(e)
    //事件对象中的target就是我们的点击对象
    // console.log(e.target)
    console.dir(e.target)
    console.dir(typeof e.target) // object
    // e.target.style.color = 'red'
    if(e.target.tagName === 'LI') {
      e.target.style.color = 'red'
    }
  })
</script>
```

<font color="red">e是 事件对象</font>

<font color="red">e.target是点击对象</font>

<font color="red">e.target.tagName</font>

**课堂问题：**

1. 事件委托的好处是什么？

​	减少注册次数，提高了程序性能

2. 事件委托是委托给了谁？父元素还是子元素？

​	父元素

3. 如何找到真正触发的元素？

​	事件对象.target.tagName



## 案例：tab栏切换

## 阻止默认行为

一般来说，点击a链接会跳转，点击按钮能提交表单，但是有些时候不能这么快行动（注册的时候，表单里填写的内容没有按照格式要求，那么就算点击了提交按钮，也不可以上交），此时就需要阻止默认行为

```html
<body>
  <form action="http://www.itcast.cn">
    <input type="submit" value="免费注册"> 
    <!-- 这是一个提交按钮，点击之后会有一个提交动作，跳转到网址 
    但有时候信息有误不可以提交-->
  </form>

  <a href="http://www.baidu.com">百度一下</a>
</body>
<script>
  const form = document.querySelector('form')
  form.addEventListener('submit',function(e) {
    e.preventDefault()
    //阻止默认行为（提交）
  })

  const a = document.querySelector('a')
  a.addEventListener('click',function(e) {
    e.preventDefault()
  })
</script>
```



**注意区分：**

1、阻止冒泡：事件对象.stopPropagation()

2、组织元素默认行为：e.preventDefault()

# 其他事件

- 页面加载事件

- 元素滚动事件

- 页面尺寸事件

## ① 页面加载事件

之前一直强调，JS要写到body标签下面，这是因为加载了标签之后才能对这些标签进行修改。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<script>
  const btn = document.querySelector('button')
  btn.addEventListener('click',function() {
    alert('haha')
  })
</script>
<body>
  <button>按钮</button>
</body>
</html>
```



![image-20240215153053606](img/image-20240215153053606.png)

<font color="red">所以需要引入页面加载事件</font>

- **页面加载事件**：加载外部资源（如图片、外联CSS和 JavaScript等）加载完毕时触发的事件

- **为什么要学？**

​	有些时候需要等页面资源全部处理完了做一些事情

​	老代码喜欢把 script 写在 head 中，这时候直接找 dom 元素找不到

- **事件名：load（等待的意思）**

- 监听页面所有资源加载完毕：

​	给 window 添加 load 事件

![image-20240215153320990](img/image-20240215153320990.png)

- 注意：不光可以监听整个页面资源加载完毕，也可以针对某个资源绑定load事件 

修改上述代码为：

```javascript
  window.addEventListener('load',function() {
    const btn = document.querySelector('button')
    btn.addEventListener('click',function() {
      alert('haha')
    })
  })
```



<font color="red">还有一种情况，在页面没有全部加载完成的时候还能有一些交互。DOMContentLoaded</font>

- 当初始的 **HTML** 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像等完全加载

- 事件名：DOMContentLoaded

- 监听页面DOM加载完毕：

​    给 <font color="red">document</font> 添加 DOMContentLoaded 事件

![image-20240215154011027](img/image-20240215154011027.png)

## ② 元素滚动事件

- **滚动条在滚动的时候持续触发的事件**

- 为什么要学？

​	很多网页需要检测用户把页面滚动到某个区域后做一些处理， 比如固定导航栏，比如返回顶部

- <font color="red">事件名：scroll</font>

​	监听**整个页面**滚动。给window或者document加都可以

![image-20240215154250929](img/image-20240215154250929.png)

- 监听某个元素的内部滚动直接给某个元素加即可

- **使用场景：**

​	我们想要页面滚动一段距离，比如100px，就让某些元素显示或者隐藏

- 那我们怎么知道，页面滚动了100像素呢？  可以使用scroll 来检测滚动的距离

```html
这个例子是div的滚动
<style>
  body {
    height: 3000px;
  }
  div {
    overflow: scroll;
    width: 200px;
    height: 200px;
    border: 1px solid #000;
  }
</style>
<body>
  <div>
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
  </div>
  <script>
    // window.addEventListener('scroll', function () {
    //   console.log('我滚了');
    // })

    const div = document.querySelector('div')
    div.addEventListener('scroll', function() {
      console.log(div.scrollTop);
    })
  </script>
</body>
```



<font color="red">上述例子是div内的滚动事件，现在我想知道页面到底滚动了多少像素，被卷去了多少</font>

```html
一滚动div就出现

<style>
  body {
    height: 3000px;
  }
  div {
    overflow: scroll;
    width: 200px;
    height: 200px;
    border: 1px solid #000;
    display : none;
  }
</style>
<body>
  <div>
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
    我有很多文字
  </div>
</body>
<script>
  const div = document.querySelector('div')
  window.addEventListener('scroll', function() {
    console.log(document.documentElement.scrollTop);
    //有小数是因为 电脑的默认缩放布局是125%

    // 页面一滚动就有一个新值
    const n =  document.documentElement.scrollTop 
    if(n >= 100) {
      div.style.display = 'block'
    }
  })
</script>
```



<font color="red">scrollTop是数字型</font>

<font color="red">scrollTop是可读写的。能获取也能赋值，但是记住赋值的时候是数字型，没有单位</font> ```document.documentElement.scrollTop = 800 //scrollTop是可读写的```

 

### 滚动到指定的坐标

```javascript
点击backTop这个按钮，就跳转到页面首部
const backTop = document.querySelector('#backTop')
backTop.addEventListener('click', function() {
  document.documentElement.scrollTop = 0 //scrollTop是可读写的
})
```



<font color="red">还有一种方法</font>

scrollTo() 方法可把内容滚动到指定的坐标

>  语法：**元素.scrollTo(x, y)**

```
window.scrollTo(0, 1000)
//让页面滚动到Y轴 1000像素的位置
```

<font color="red">案例看 3-10 电梯导航素材</font>

## ③ 页面尺寸事件

**会在窗口尺寸改变的时候触发事件： <font color="red">resize</font>**

![image-20240216173053806](img/image-20240216173053806.png)

- **获取宽高：**

获取元素的可见部分宽高（不包含边框border，margin，滚动条等）

clientWidth和clientHeight

![image-20240216173253577](img/image-20240216173253577.png)

包含padding，不包含border



<font color="red">能通过 JS 获取div的 宽、高</font>

![image-20240216173653533](img/image-20240216173653533.png)

document.documentElement是HTML

# 元素尺寸与位置

## ① 元素在页面中的位置

**使用场景：**

前面案例滚动多少距离，都是我们自己定的，最好是页面滚动到某个元素，就可以做某些事。

简单说，就是通过js的方式，得到**元素在页面中的位置**

这样我们可以做，页面滚动到这个位置，就可以做某些操作，省去计算了

![image-20240216174653719](img/image-20240216174653719.png)

受父亲元素的影响







![image-20240216175657154](img/image-20240216175657154.png)

但是如果给父亲元素加了定位

![image-20240216175823133](img/image-20240216175823133.png)

**offset受父亲定位的影响，如果父亲有定位position：relative，那么就以父亲为准；如果父亲没有定位，那么就以最近的祖先定位为准**看最近一级带有定位的祖先元素



## 案例

> 见3-13仿新浪固定头部

需求：当页面滚动到秒杀模块，导航栏自动滑入，否则滑出

分析：

①：用到页面滚动事件

②：检测页面滚动大于等于 秒杀模块的位置 则滑入，否则滑出

③：主要移动的是秒杀模块的顶部位置



> 见3-13bilibili滑块

需求：当点击链接，下面红色滑块跟着移动

分析：

①：用到事件委托

②：点击链接得到当前元素的 offsetLeft值

③：修改line 颜色块的 left 值 = 点击链接的offsetLeft

④： 添加过渡效果

## ② 元素尺寸

获取位置：

element.getBoundingClientRect()

方法返回元素的大小及其相对于视口的位置

![image-20240216212201472](img/image-20240216212201472.png)



![image-20240216212555413](img/image-20240216212555413.png)

**这个是相对于窗口，**





![image-20240216212226196](img/image-20240216212226196.png)

# 综合案例

V:\Web\mycode\3-10 电梯导航素材\电梯导航 - 完整版.html



需求：点击不同的模块，页面可以自动跳转不同的位置

模块分析：

①：显示隐藏电梯盒子和返回顶部已经完成，可以放到**自执行函数**里面，防止变量污染

②：电梯模块单独放到自执行函数里面

③：点击每个模块，页面自动滚动到对应模块，使用事件委托方法更加简单

④：页面滚动到对应位置，电梯导航对应模块自动发生变化



整个页面的卷度：document.documentElement.scrollTop

每一个元素距离页面顶部的距离 offsetTop
