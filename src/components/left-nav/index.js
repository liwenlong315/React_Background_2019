/* admin左侧导航组件 */
import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from "../../config/menuConfig"   // ===> [<Item/>, <SubMenu/>>]
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

class LeftNav extends Component {


       //二选一  吾选择的是第二种
  /* 
  根据menu中数据中数组生成包含<Item> / <SubMenu>的数组
  关键技术: array.map() + 递归调用
  */

//  getMenusNodes = (menuList) => {
    
//     /* 
         //此为定义的menuConfig的名
//     {
//       title: '首页', // 菜单标题名称
//       key: '/home', // 对应的path
//       icon: 'home', // 图标名称
//       children: []
//     }
//     */
//     return menuList.map(item => {

//       // 返回<Item></Item>
//       if (!item.children) {
//         return (
//           <Item key={item.key}>
//             <Link to={item.key}>
//               <Icon type={item.icon} />
//               <span>{item.title}</span>
//             </Link>
//           </Item>
//         )
//       } else {  // 返回<SubMenu></SubMenu>
//         return (
//           <SubMenu
//             key={item.key}
//             title={
//               <span>
//                 <Icon type={item.icon} />
//                 <span>{item.title}</span>
//               </span>
//             }
//           >
//             {
//               this.getMenusNodes(item.children)
//             }
//           </SubMenu>
//         )
//       }
//     })
//   }

    
  /*
  第二种方法
  根据menu中数据中数组生成包含<Item> / <SubMenu>的数组
  关键技术: array.reduce() + 递归调用
  */
  getMenuNodes2 = (menuList) => {

       //主体结构写法
    /* const array1 = [1, 2, 3, 4, 5];
        const list = menuList.reduce((pre, item)=> {
          if (!item.children) {
            pre.push(item)
          }
          return pre
        }, [])
    */

    // 得到当前请求的路径
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      // 添加 <Item>
      if (!item.children) {
        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else { // 添加 <SubMenu>
        // 如果请求的是当前item的children中某个item对应的path, 当前item的key就是openKey
        const cItem = item.children.find((cItem, index) => cItem.key===path)
        if (cItem) { // 当前请求的是某个二级菜单路由
          this.openKey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes2(item.children)}
          </SubMenu>
        )
      } 
      return pre
    }, [])
  }

  componentWillMount () {
    this.menuNodes = this.getMenuNodes2(menuList) //注意值不要取错
  }

  render() {
    
    // 将请求的路由路径作为选中的key
    const selectedKey = this.props.location.pathname
    // 得到要展开Submenu的key值
    const openKey = this.openKey

    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理</h1>
        </Link>
         {/* 列表导航 */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            this.menuNodes
          }
          
        </Menu>
      </div>
    )
  }
}

/* 
向外暴露是通过withRouter包装LeftNav产生新组件
新组件会向非路由组件传递3个属性: history/location/match => 非路由组件也可以使用路由相关语法
withRouter是一个高阶组件
*/
export default withRouter(LeftNav)