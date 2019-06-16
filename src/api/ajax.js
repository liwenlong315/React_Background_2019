import axios from 'axios'
import { logicalExpression } from '@babel/types';


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

async function login(){
const result = await ajax('/login',{
  username:'admin',
  password:'admin'
},'POST')
if(result.stauts === 0){

}else{

}
}