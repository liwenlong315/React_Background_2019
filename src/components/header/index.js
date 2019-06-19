//Admin 头部组件

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import LinkButton from '../../components/link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {removeUser} from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import './index.less'
import menuList from '../../config/menuConfig';
import { Modal } from 'antd';

 class Header extends Component {

    state={
        currentTime:formateDate(Date.now()),// 当前时间字符串
        dayPictureUrl:'',// 天气图片的url
        weather:'',// 天气的文本
    }
    //时间更新 间隔1秒  启用定时器需清除
    showCurrentTime =()=> {
        this.itervalId = setInterval(()=>{
            const currentTime = formateDate(Date.now())
            //更新状态
            this.setState({currentTime})
        },1000);
    }
    //头部导航名显示，得到当前请求的对应路径title
    getTile =()=> {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
              } else if (item.children) {
                const cItem = item.children.find(item => item.key===path)
                if (cItem) {
                  title = cItem.title
                }
              }
        })
        return title
    }

    //获取天气信息
    getWeather = async () => {
        const {dayPictureUrl,weather} = await reqWeather('北京')
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        })
    }

  //退出登录
    logout =()=> {
        //显示确认框
        Modal.confirm({
            title:'确定退出？',
            okText:'确定',
            cancelText:'取消',
            onOk:() => {
             console.log('ok')
             //清除user数据 local和内存中的
             removeUser()
             memoryUtils.user={}
             //跳转到登录
             this.props.history.replace('/login')
            },
            onCancel(){
                console.log('取消')
            }
        })
    }

    //清除定时器
    componentWillUnmount(){
        clearInterval(this.itervalId)
    }

    componentDidMount(){
        //更新时间显示
        this.showCurrentTime()
        //获取天气信息
        this.getWeather()
        
    }

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        // 得到当前登陆的用户
        const {user} = memoryUtils
        // 得到当前请求路径对应的title
        const title = this.getTile()
        
        return (
            
            <div className="header">
              <div className="header-top">
                <span>欢迎, {user.username}</span> 
                <LinkButton onClick={this.logout}>退出</LinkButton>
              </div>
              <div className="header-bottom">
                <div className="header-bottom-left">{title}</div> 
                <div className="header-bottom-right">
                  <span>{currentTime}</span>
                  {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather" />}
                  <span>{weather}</span>
                </div>
              </div>
            </div>
          )
        }
      }
export default withRouter(Header)