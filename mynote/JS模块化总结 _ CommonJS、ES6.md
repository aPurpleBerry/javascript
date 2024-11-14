> BV13W42197jR 个人笔记
> 
@[TOC](目录)
# JS模块化基础知识
# 1. 概述
## 1.1 什么是模块化
- 将程序文件依据一定规则拆分成多个文件，这种编码方式就是模块化的编码方式。简单来说就是一个 .js文件太大了，把它拆成几个js文件
- 拆分出来每个文件就是一个模块，模块中的数据都是**私有**的，模块之间**互相隔离**。
- 同时也能通过一些手段，可以把模块内的指定数据“交出去”，供其他模块使用。

## 1.2 为什么需要模块化?
随着应用的复杂度越来越高，其代码量和文件数量都会急剧增加，会逐渐引发以下问题:
1．全局污染问题
2．依赖混乱问题 比如script标签引入有顺序问题
3．数据安全问题

# 2 模块化规范
历史背景(了解即可): 2009年，随着Node.js的出现，JavaScript 在服务器端的应用逐渐增多，为了让Node.js 的代码更好维护，就必须要制定一种Node.,js环境下的模块化规范，来自Mozilla的工程师Kevin Dangoor提出了CommonJS规范(CommonJS初期的名字叫ServerJS，随后Node.js 社区采纳了这一规范。

随着时间的推移，针对JS的不同运行环境（浏览器、服务端），相继出现了多种模块化规范，按时间排序，分别为：
```
1. CommonJS —— 服务端应用广泛
2. AMD
3. CMD
4. ES6模块化 —— 浏览器端应用广泛
```

# 3 导入&导出
模块化的核心思想就是：模块之间是隔离的，通过导入和导出进行数据和功能的共享。
- 导出（暴露）：模块公开其内部的一部分(如变量、函数等)，使这些内容可以被其他模块使用。
- 导入（引入）：模块引用和使用其他模块导出的内容，以重用代码和功能。
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/3a2aa6b5cbb94c88bdfec03f5623b963.png)
# 4 CommonJS规范
一般用在node环境下
## 4.1 初步体验
导入 require
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/f140e11266f8446cbd1d1dd5724e1185.png)
- school.js

```javascript
const name = '大学'
const slogan = '厚德载物'

function getTel() {
  return '0101010'
}

function getCities() {
  return ['beijing', 'shanghai', 'guangzhou', 'shenzhen']
}

exports.name = name
exports.slogan = slogan
exports.getTel = getTel

```

- student.js

```javascript
const name = '李三'
const motto = '加油'

function getTel() {
  return '13555555'
}

function getHobby() {
  return ['swimming', 'badminton', 'football', 'basketball']
}

exports.name = name
exports.motto = motto
exports.getTel = getTel
```

- index.js

```javascript
const school = require('./school.js')
const student = require('./student.js')
console.log(school);
console.log(student);
```
- 入口文件运行
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/97be42a8490042278c7fdd55f2f71daf.png)

## 4.2 导出数据
在CommonJS标准中，导出数据有两种方式
第一种方式：`module.exports = value` //赋值为新对象
第二种方式：`exports.name = value`

- 示例

```javascript
***第二种方式*******************
exports.name = name
exports.slogan = slogan
exports.getTel = getTel

***第一种方式*******************
module.exports = {
  name: name,
  slogan: slogan,
  getTel: getTel
}

***简写*******************
module.exports = {
  name,
  slogan,
  getTel
}
```

**<font color="red">注意点：</font>**
① 每个模块内部的: this，exports， modules.exports 在初始时，都指向同一个空对象，该
空对象就是当前模块导出的数据，如下图:
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/816b6abbb7034ab8b4056c7745a03403.png)
② 无论如何修改导出对象，最终导出的都是 module.exports 的值。

③ exports是对 module.exports 的初始引用，仅为了方便给导出象添加属性，所以不能使用exports = value 的形式导出数据，但是可以使用module.exports = xxxx导出数据。

## 4.3 导入数据
导入语法 `const school = require('./school.js')`

常搭配对象解构使用 `const {name, slogan, getTel} = require('./school.js')`

- 出现的问题：多个require可能导致变量名冲突
- 解决方法：重命名  `const {name: stuName, motto , getTel: stuTel} = require('./student.js')`
## 4.4 扩展理解
怎么做到模块之间是隔离的？
怎么能直接使用module？exports？

一个JS模块在执行时，是被包裹在一个内置函数中执行的，所以每个模块都有自己的作用域
可以通过下面的语句打印验证 `console.log(arguments.callee.toString())`

内置函数的大致形式如下：`function(exports, require, module, __filename, __dirname) {} `

## 4.5 浏览器端运行
CJS设计之初就是为了在浏览器中运行的，以前的名字叫serverJS，但是通过引入JS却无法在浏览器上运行。

**Node.js 默认是支持CommonJS规范的，但浏览器端不支持，所以需要经过编译，步骤如下:**
第一步：全局安装browserify `npm i browserify -g`
第二步：编译 `browserify index.js -o build.js`  注：index.js是源文件，build.js是输出的目标文件
第三步：在页面中引入使用`<script type="text/javascript" src="./build.js"> </script>`

# 5 ES6模块化规范

ES6模块化规范是一界官方标准的规范，它是在语言标准的层面上实现了模块化功能，是目前最流行的模块化规范，且浏览器与服务端均支持该规范。

## 5.1 初步体验
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/050b450b371847d7ae70ccf82b4b459a.png)

- school.js 导出
```javascript
export const name = '大学'
export const slogan = '厚德载物'

export function getTel() {
  return '0101010'
}

//没导出
function getCities() {
  return ['beijing', 'shanghai', 'guangzhou', 'shenzhen']
}

```
- index.js导入

```javascript
import * as school from './school.js'
console.log(school);
```

- index.html 注意ES6要在页面中运行
**这里一定要写为`type="module"`**  
```html
<body>
  <script type="module" src="./index.js"></script>
</body>
```

## 5.2 Node中运行ES6
- 方法一
如果node版本是12及以上，可以直接把js文件后缀名改成 .mjs，这样`node+index.js`就可以运行了

- 方法二

在工程文件中新增一个 `package.json`
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/07469585e13840cd8bd9423d02505e85.png)

package.json里面加这一句话
```javascript
{
  "type": "module"
}
```
运行成功：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/75154d4865a04e8b98c0c32d900ffc54.png)
## 5.3 导出数据
ES6模块化提供3种导出方式 
①分别导出
②统一导出
③默认导出
**备注:「上述多种导出方式，可以同时使用」**
### ①分别导出

```javascript
export const name = '大学'
export const slogan = '厚德载物'

export function getTel() {
  return '0101010'
}

export function getCities() {
  return ['beijing', 'shanghai', 'guangzhou', 'shenzhen']
}
```
### ②统一导出
`export {name,slogan,getTel} ` 这个不是对象
```javascript
const name = '大学'
const slogan = '厚德载物'

function getTel() {
  return '0101010'
}

function getCities() {
  return ['beijing', 'shanghai', 'guangzhou', 'shenzhen']
}

//统一导出
export {name,slogan,getTel} //这个不是对象
```
### ③默认导出
默认的英文名是default `export default name`
这里是对象

```javascript
export default {
  name:name,
  slogan:slogan,
  getTel:getTel
}
```
- 用了三种导入方式后：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/08f95e62f35f49a4973df78062433932.png)

## 5.4 导入数据
**对于ES6模块化来说，使用何种导入方式，要根据导出方式决定。**


**<font color="blue">（1）导入全部 （通用）</font>**
```javascript
import * as school from './school.js'
```
**<font color="blue">（2）命名导入：对应导出方式——分别导出、统一导出</font>**
```javascript
import {name, slogan, getTel} from './school.js'
console.log(name);
console.log(slogan);
console.log(getTel);
```
可以改名 `import {name as schoolName} from './school.js'`
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/01b37a256b184440b6c8c8fa5a97f63b.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0aeed326d8c64282bf24ffaf4fbea5d1.png)

**<font color="blue">（3）默认导入：对应导出方式——默认导出</font>**
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/4087157d4e4742b4a1240e1700d354cf.png)

**<font color="blue">（4）命名导入 & 与默认导入可以混合使用</font>**
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c24483935f4d4f5da0a3c3d234342c97.png)

**<font color="blue">（5）动态导入 (通用)</font>**
现在不想用，以后用到的时候再导入
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/589f314d8def4b31a9616085ec62d1cd.png)

**<font color="blue">（6）import可以不接收任何数据</font>**
`import './log.js'` 这个JS模块可能是打印随机数的

- 解决了全局污染问题，神奇的 type="module" ` <script type="module" src="./index.js"></script>`

## 练习题
- 打印什么（答案：1 1）
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/96e39c9f69e44fafaa4edbc0750b1765.png)
- 思考2：使用CommonJS规范，编写如下代码，输出结果是什么?

```javascript
let sum = 1
function increment() {
  sum += 1
}
module.exports = {sum, increment}
```

```javascript
const {sum, increment} = require('./data.js')
console.log(sum)
increment()
increment()
console.log(sum)
```
答案：1， 1


- 思考3：使用ES6模块化规范，编写上述代码，输出结果是什么?
- ![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c6c9ff7212b94816bf2046b2e6ce5a8d.png)

答案：1 ，3

是编写代码中很重要的部分，export交出去就要只读了，所以sum要用const修饰

ES6 import和export共用一块内存，但CJS是复制
## 6 AMD
## 7 CMD

