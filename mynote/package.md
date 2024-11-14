> <font color = "red"> </font> <font color = "red">**hong** </font>

# 获取随机数



```javascript
//获取区间[M,N]中的随机数
function getRandom(N, M) {
	return Math.floor(Math.random() * (M - N + 1)) + N
}

用parseInt也可以
function getRandom(N, M) {
	return parseInt(Math.random() * (M - N + 1)) + N
}
```

# 快速创建div

div{$}*5快速创建五个div

```HTML
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
```



```
ul>li{$第$个孩子}*5
```



# 轮播图



# tab



# 渲染

V:\Web\mycode\4-8学成在线重构



# 三元表达式替代if-else



# 时间

```javascript
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
```





# 表单

表单提交一定要有name值,

点击提交 submit之后 会自动跳转

- search

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

