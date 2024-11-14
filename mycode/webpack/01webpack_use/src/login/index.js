// 准备项目和源代码
import { checkPhone, checkCode } from "../utils/check.js"
// console.log('2222222222');
// console.log(checkCode('111111'));

// document.querySelector('.btn').addEventListener('click', () =>{
//   const phone = document.querySelector('.login-form [name=mobile]').value
//   const code = document.querySelector('.login-form [name=code]').value

//   if(!checkPhone(phone)) {
//     console.log('手机号长度必须是11位');
//     return
//   }

//   if(!checkCode(code)) {
//     console.log('密码长度必须是6位');
//     return
//   }

//   console.log('提交到服务器登陆...');
// })


// 引入CSS代码
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// 引入less文件
import './index.less'

// 图片处理
import imgObj from './assets/logo.png'
const theImg = document.createElement('img')
theImg.src = imgObj 
document.querySelector('.login-wrap').appendChild(theImg)

// 登陆页面-axios
import myAxios from "../utils/request.js";
import { myAlert } from "../utils/alert.js";


document.querySelector('.btn').addEventListener('click', () =>{
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if(!checkPhone(phone)) {
    myAlert(false,'手机号长度必须是11位')
    // console.log('手机号长度必须是11位');
    return
  }

  if(!checkCode(code)) {
    myAlert(false,'密码长度必须是6位')
    // console.log('密码长度必须是6位');
    return
  }

  // console.log('提交到服务器登陆...');
  myAxios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: phone,
      code: code
    }
  }).then(res => {
    myAlert(true,'登录成功')
    localStorage.setItem('token' , res.data.token)
    location.href = '../content/index.html'
  }).catch(err => {
    myAlert(false,err.response.data.message)
  })
})

// 前端注入环境变量
// 需求：前端项目中，开发模式下打印语句生效，生产模式下打印语句失效
if(process.env.NODE_ENV === 'production') {
  console.log = function() {}
} 
console.log('开发模式下正常使用，生产模式下失效');

// 错误定位
// consolee.log('123')

// alias
import youAxios from '@/utils/request.js'