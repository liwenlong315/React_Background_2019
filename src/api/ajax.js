import axios from 'axios'

export default function ajax(url, data = {}, method="GET") {

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求(使用axios)
    // 发get请求
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data // 指定quey参数
      })
    } else { // 发post请求
      promise = axios.post(url, data)
    }
    promise.then(
      // 2. 如果成功了, 调用resolve(), 并指定成功的数据
      response => { 
        resolve(response.data)
      },
       // 3. 如果出错了, 不调用reject(), 显示错误的提示
      error => {
        alert('请求出错: ' + error.message)
      }
    )
  })

  
}


async function login() {
  /*
  try {
    const response = await ajax('/login', {
      username: 'admin',
      password: 'admin'
    }, 'POST')
  } catch (error) { // 处理请求异常
    alert('请求出错: ' + error.message)
  }
  */
  /*
  const response = await ajax('/login', {
    username: 'admin',
    password: 'admin'
  }, 'POST')
  const result = response.data // 必须从response取出data属性值才是响应数据
  if (result.status === 0) {

  } else {

  }
  */
  const result = await ajax('/login', { // result就是response.data
      username: 'admin',
      password: 'admin'
    }, 'POST')
  if (result.status===0) {

  } else {

  }
  
}
