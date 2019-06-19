import axios from 'axios'



export default function ajax(url,data={},mothod="GET"){
  return new Promise((resolve,reject)=>{
    let promise
    if (mothod === 'GET') {
      promise = axios.get(url,{
        params:data  
      })
    }else{
      promise = axios.post(url,data)
    }
    promise.then(
      response => {
        resolve(response.data)
      },
      error =>{
        alert('请求出错：'+error.message)
      }
    )
  })
}
