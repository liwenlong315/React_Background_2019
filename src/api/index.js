import ajax from "./ajax";
import {message} from "antd";
import jsonp from 'jsonp'
const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')


// 获取分类列表(一级/二级)
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 更新分类的名称
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// reqLogin('admin','admin').then(result =>{
//   console.log('result',result)
// })

/* 
发jsonp请求获取当前天气信息
*/
export const reqWeather = (location) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

  return new Promise((resolve, reject) => {
    
    // 执行请求
    setTimeout(() => {
      jsonp(url, {}, (error, data) => {
        if (!error && data.status === 'success') {
          const {
            dayPictureUrl,
            weather
          } = data.results[0].weather_data[0]
          // 成功了, 调用reolve()指定成功的值
          resolve({
            dayPictureUrl,
            weather
          })
        } else {
          message.error('获取天气信息失败!')
        }
      })
    }, 2000)
  })
  
}