import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from "./ajax"
// const BASE = 'http://localhost:3001'本地地址
const BASE = ''

// 1. 登陆
/*
export function reqLogin(username, password) {
  return ajax(BASE + '/login', {username, password}, 'POST')
}
*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')


// 获取分类列表(一级/二级)
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 更新分类的名称
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 获取商品分页列表
export const reqProducts = ({pageNum, pageSize}) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 根据商品名称/描述搜索获取商品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 搜索类型 值为'productDesc' / 'productName'
  searchName // 搜索的关键字
}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

// 对商品进行上架/下架处理
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {
  productId,
  status
}, 'POST')

// 简单测试一下
/* reqLogin('admin', 'admin').then(result => {
  console.log('result', result)
}) */

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
