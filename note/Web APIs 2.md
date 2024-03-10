# 事件监听

- 什么是事件？

事件是在编程时系统内发生的**动作**或者发生的事情

比如用户在网页上**单击**一个按钮

- **什么是事件监听？**

就是让程序检测是否有事件产生，一旦有事件触发，就立即调用一个函数做出响应，也称为<font color="red"> **绑定事件或者注册事件**</font>

比如鼠标经过显示下拉菜单，比如点击可以播放轮播图等等

- <font color = "red">**语法**</font>

```
元素对象.addEventListener('事件类型', 要执行的函数)
```

- 事件监听三要素

**事件源：** 那个dom元素被事件触发了，要获取dom元素

**事件类型：** 用什么方式触发，比如鼠标单击 click、鼠标经过 mouseover 等

**事件调用的函数：** 要做什么事

![image-20240204154451287](img/image-20240204154451287.png)

```javascript
// 事件源 按钮
const btn = document.querySelector('button')

// 事件类型
// 事件处理程序
btn.addEventListener('click', function() {
alert('hi')
})
```



### 案例：广告关闭

点击关闭广告，刷新之后广告又出现

```html
<body>
  <div class="box">
    我是广告
    <div class="box1">X</div>
  </div>
  <script>
    // 1. 获取事件源
    const box1 = document.querySelector('.box1')
    //  关闭的是大盒子
    const box = document.querySelector('.box')
    // 2. 事件侦听
    box1.addEventListener('click', function () {
      box.style.display = 'none'
    })
  </script>
</body>
```



### 案例：随机问答

业务:点击开始后,随机闪现所有人的名字,点击结束,停止在一个人名,并删除这个元素.

![image-20240204155845816](img/image-20240204155845816.png)

业务分析：

① 点击开始按钮随机抽取数组的一个数据，放到页面中

② 点击结束按钮删除数组当前抽取的一个数据

③ 当抽取到最后一个数据的时候，两个按钮同时禁用（写点开始里面，只剩最后一个数据不用抽了）

核心：利用定时器快速展示，停止定时器结束展示



```html
<body>
    <h2>随机点名</h2>
    <div class="box">
        <span>名字是：</span>
        <div class="qs">这里显示姓名</div>
    </div>
    <div class="btns">
        <button class="start">开始</button>
        <button class="end">结束</button>
    </div>

    <script>
        // 数据数组
        const arr = ['马超', '黄忠', '赵云', '关羽', '张飞']

        // 业务1 开始按钮模块
        // 点击开始按钮之后,通过随机数随机选取数组中的名字,并显示在网页中
        let timer = 0
        const start = document.querySelector('.start')
        const qs = document.querySelector('.qs')
        let random = 0
        start.addEventListener('click',function() {
          // 每次点击按钮都会有一个新的定时器,点击结束按钮只会关闭最后一个定时器
          timer = setInterval(function() {
            random = Math.floor(Math.random()*arr.length)
            // arr[random]
            qs.innerHTML = arr[random]
          }, 50) 

          if(arr.length === 1) {
            start.disabled = end.disabled = true
          }
        })

        // 业务2 结束按钮模块
        const end = document.querySelector('.end')
        end.addEventListener('click',function() {
          clearInterval(timer)
          arr.splice(random,1)
        })
    </script>
</body>

```



垃圾回收机制：函数执行结束之后不再使用这个变量，会自动删除

```javascript
//这段代码不会报错，因为垃圾回收机制
//html: <button>btn</button>

//script
const btn = document.querySelector('button')
btn.addEventListener('click',function() {
  const num = Math.random()
  console.log(num)
})
```



```javascript
//这段代码不会报错，因为作用域不一样
const num = 10

const btn = document.querySelector('button')
btn.addEventListener('click',function() {
  const num = Math.random()
  console.log(num)
})
```

# 事件监听版本

DOM Level 0

事件源.on事件 = function() { }

DOM Level 2

事件源.addEventListener(事件， 事件处理函数)



**区别：**

on方式会被覆盖，addEventListener方式可绑定多次，拥有事件更多特性，推荐使用



发展史：

DOM L0 ：是 DOM 的发展的第一个版本； L：level

DOM L1：DOM级别1 于1998年10月1日成为W3C推荐标准

DOM L2：使用addEventListener注册事件

DOM L3： DOM3级事件模块在DOM2级事件的基础上重新定义了这些事件，也添加了一些新事件类型

# 事件类型

- 事件监听三要素：事件源、事件类型、事件调用的函数

![image-20240204170255543](img/image-20240204170255543.png)

```javascript
//html 
//<div></div>

//css
div {
	width:200px;
	height:200px;
	background-color:pink;
}

//javascript
const div = document.querySelector('div')
//鼠标经过
div.addEventListener('mouseenter',function() {
	console.log('轻轻的我来了')
})
//鼠标离开
div.addEventListener('mouseleave',function() {
	console.log('轻轻的我走了')
})
```

### 案例：轮播图完整

需求：当点击左右的按钮，可以切换轮播图

分析：

①：右侧按钮点击，变量++，如果大于等于8，则复原0

②：左侧按钮点击，变量--，如果小于0，则复原最后一张

③：鼠标经过暂停定时器

④：鼠标离开开启定时器

**业务分析：左侧按钮、右侧按钮、鼠标经过、自动播放**



### 焦点事件

```html
<body>
  <input type="text">
</body>
<script>
  const input = document.querySelector('text')
  input.addEventListener('focus',function() {
    console.log('haha');
  })
</script>
```

- **小米搜索框案例**

需求：当表单得到焦点，显示下拉菜单，失去焦点隐藏下来菜单

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        ul {
            list-style: none;
            display: none;
        }

        .mi {
            position: relative;
            width: 223px;
            margin: 100px auto;
        }

        .mi input {
            width: 223px;
            height: 48px;
            padding: 0 10px;
            font-size: 14px;
            line-height: 48px;
            border: 1px solid #e0e0e0;
            outline: none;
        }

        .mi .search {
            border: 1px solid #ff6700;
        }

        .result-list {
            position: absolute;
            left: 0;
            top: 48px;
            width: 223px;
            border: 1px solid #ff6700;
            border-top: 0;
            background: #fff;
        }

        .result-list a {
            display: block;
            padding: 6px 15px;
            font-size: 12px;
            color: #424242;
            text-decoration: none;
        }

        .result-list a:hover {
            background-color: #eee;
        }
    </style>

</head>

<body>
    <div class="mi">
        <input type="search" placeholder="小米笔记本">
        <ul class="result-list">
            <li><a href="#">全部商品</a></li>
            <li><a href="#">小米11</a></li>
            <li><a href="#">小米10S</a></li>
            <li><a href="#">小米笔记本</a></li>
            <li><a href="#">小米手机</a></li>
            <li><a href="#">黑鲨4</a></li>
            <li><a href="#">空调</a></li>
        </ul>
    </div>
    <script>
      //属性选择器
      const input = document.querySelector('[type=search]')
      const ul = document.querySelector('.result-list')

      input.addEventListener('focus', function() {
        ul.style.display = 'block'
        input.classList.add('search')
      })

      input.addEventListener('blur', function() {
        ul.style.display = 'none'
        input.classList.remove('search')
      })
    </script>
</body>

</html>
```

### 键盘事件

```html
<input type="text">
<script>
const input = document.querySelector('input')

input.addEventListener('keydown', function() {
    console.log('键盘按下了')
})

input.addEventListener('keyup', function() {
    console.log('键盘抬起了')
})
</script>
```

### 输入事件

得到用户输入的内容通过input.value

```html
<input type="text">
<script>
const input = document.querySelector('input')

input.addEventListener('input', function() {
    console.log('1111111111') //输入内容
    console.log(input.value)
})
</script>
```

### 案例：评论字数统计

需求：用户输入文字，可以计算用户输入的字数

分析：

①：判断用输入事件 input

②：不断取得文本框里面的字符长度, 文本域.value.length

③：把获得数字给下面文本框

> 代码 看下文的评论回车发布

focus伪类选择器：获得焦点

注：不使用 JS，使用 CSS 也可以实现

```html
<body>
  <input type="text">
</body>
<style>
  input {
    width: 200px;
  }
  input:focus {
    /* 获得光标 */
    width: 300px;
  }
</style>
```

# 事件对象

- 获取事件对象
- 事件对象常用属性

**事件对象是什么**

也是个对象（属性 方法），这个对象里有事件触发时的相关信息

例如：鼠标点击事件中，事件对象就存了鼠标点在哪个位置等信息

**使用场景**

可以判断用户按下哪个键，比如按下回车键可以发布新闻（按下空格键就不能发）

可以判断鼠标点击了哪个元素，从而做相应的操作

**事件对象在哪里？**

在事件绑定的回调函数的第一个参数就是事件对象

### 获取事件对象

<font color = "red">**语法**</font>

- 在事件绑定的回调函数的**第一个**参数就是事件对象

- 一般命名为event、ev、e

```
元素.addEventListener('click', function(e) {
// 这里的e就是事件对象
})
```



例如：

```javascript
// <button></button>
const btn = document.querySelector('btn')
btn.addEventListener('click', function() {
	console.log(e);
})
```

![image-20240204193023515](img/image-20240204193023515.png)



### 事件对象常用属性

部分常用属性

- type： 获取当前的事件类型

- clientX/clientY： 获取光标相对于浏览器可见窗口左上角的位置

- offsetX/offsetY： 获取光标相对于当前DOM元素左上角的位置

- key：  用户按下的键盘键的值。现在不提倡使用keyCode 已经废除

```html
<body>
  <!-- 回车键触发案例 -->
  <input type="text">
</body>
<script>
  const btn = document.querySelector('button')
  btn.addEventListener('click', function(e) {
    console.log(e);
  })

  const input = document.querySelector('input')
  input.addEventListener('keyup',function(e) {
    // console.log(e.key);
    if(e.key === 'Enter') {
      console.log('我按下了回车键');
    }
  })
</script>
```



### 案例：评论回车发布

需求：按下回车键盘，可以发布信息



分析：

①：用到按下键盘事件 keydown 或者 keyup 都可以

②：如果用户按下的是回车键盘，则发布信息

③：让留言信息模块显示，把拿到的数据渲染到对应标签内部



**补一个trim方法**

只清除左右的空格

```javascript
  const str = '   pink  '
  console.log(str)  // '   pink  '
  console(str.trim()) // 'pink'
```

**代码：**

![image-20240204200100495](img/image-20240204200100495.png)

```html
<body>
  <div class="wrapper">
    <i class="avatar"></i>
    <textarea id="tx" placeholder="发一条友善的评论" rows="2" maxlength="200"></textarea>
    <button>发布</button>
  </div>
  <div class="wrapper">
    <span class="total">0/200字</span>
  </div>

  <div class="list">
    <div class="item" style="display: none;">
      <i class="avatar"></i>
      <div class="info">
        <p class="name">清风徐来</p>
        <p class="text">大家都辛苦啦，感谢各位大大的努力，能圆满完成真是太好了[笑哭][支持]</p>
        <p class="time">2022-10-10 20:29:21</p>
      </div>
    </div>
  </div>
</body>

<script>
  //文本域获得焦点：让total显示出来
  const tx = document.querySelector('#tx')
  const total = document.querySelector('.total')
  tx.addEventListener('focus', function() {
    total.style.opacity = 1
  })

  tx.addEventListener('blur', function() {
    total.style.opacity = 0
  })

  //检测用户输入
  tx.addEventListener('input', function() {
    total.innerHTML = `${tx.value.length}/200字`
  })

  //按下回车发布评论
  const item = document.querySelector('.item')
  const text = document.querySelector('.text')
  tx.addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
      if(tx.value.trim() !== '') {
        text.innerHTML = tx.value
        item.style.display = 'block'
      }
      tx.value='' //清空文本域
       //按下回车之后 字符统计复原
      total.innerHTML = '0/200字'
    }
  })

</script>
```

# 环境对象this

**环境对象：**指的是函数内部特殊的<font color = "red">**变量 this**</font> ，它代表着当前函数运行时所处的环境

**作用：**弄清楚this的指向，可以让我们代码更简洁

- 函数的调用方式不同，this 指代的对象也不同

【谁调用， this 就是谁】 是判断 this 指向的粗略规则

- 直接调用函数，其实相当于是 window.函数，所以 this 指代 window

```javascript
 //每一个函数里面都有this
  function fn() {
    console.log(this); 
  }
  fn() // 相当于是 window.fn()，所以 this 指代 window
```

```javascript
  const btn = document.querySelector('button')
  btn.addEventListener('click', function() {
    console.log(this); //指向button
  })
```

# 回调函数

如果将函数 A 做为参数传递给函数 B 时，我们称函数 A 为回调函数

简单理解： 当一个函数当做参数来传递给另外一个函数的时候，这个函数就是回调函数

![image-20240204203820157](img/image-20240204203820157.png)

过了一秒钟，回头调用函数 fn

每click一次，调用一次函数

# 综合案例

### tab栏切换

选项卡切换

### 全选反选案例

用户点击大全选，所有的复选框全部选择

用户取消大全选，则所有复选框取消

用户选了所有的复选框之后，大全选自动选择

