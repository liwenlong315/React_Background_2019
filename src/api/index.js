import ajax from "./ajax";
import Password from "antd/lib/input/Password";
const BASE = ''
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')
export const reqAddUser = (user) => ajax(BASE +'/manage/user/add',user,'POST')
reqLogin('admin','admin').then(result =>{
  console.log('result',result)
})
