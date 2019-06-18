import React from 'react'
import logo from '../../assets/images/logo.png'
import './login.less'
import { Form, Icon, Input, Button,message} from 'antd';
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import {saveUser} from '../../utils/storageUtils'


/* 登录一级路由组件 */
 class Login extends React.Component{
   
        handleSubmit = (event) => {
          //阻止默认行为
          event.preventDefault();
          //统一表单验证
          this.props.form.validateFields(async(err,values)=>{
            //判断是否成功
            if(!err){ //成功

              // console.log('登录Ajax请求',values)
              const {username,password} = values
              const result = await reqLogin(username,password)
              // {status: 0, data: user对象} | {status: 1, msg: 'xxx'}
              //登陆成功
              if(result.status === 0){
                 //保存用户信息
                 const user = result.data
                 localStorage.setItem('USER-KEY',JSON.stringify(user))
                 saveUser(user)   //保存local文件中
                 memoryUtils.user = user //保存在内存中
                 //跳转到admin界面
                 this.props.history.replace('/')
              }else{
                message.error(result.msg,2)
              }
            }
          })
            }
            validatePwd = (rule,value,callback) =>{
              value = value.trim()
              if(!value){
                callback('密码不能为空')
              }else if(value.lenght<4){
               callback('密码长度小于4位')
              }else if(value.lenght>12) {
                callback('密码长度大于12位')
              }else if(!/^[a-zA-Z0-9]+$/.test(value)){
                 callback('密码必须是英文、数字组成')
              }else{
                callback() //通过验证
              }
            }
    
    render(){
    
      const{getFieldDecorator} = this.props.form;
      //访问login界面，如果已经登录，自动转跳到admin
      if(memoryUtils.user._id){
        return <Redirect to = "/"/>
      }
        
        return(
          
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台登录系统</h1>
                </header>
                <section className="login-content">
             <h2>用户登录</h2>
             <Form onSubmit={this.handleSubmit} className="login-form">
                 {/* 用户名 */}
        <Form.Item>
          {
            getFieldDecorator('username',{
              initialValue:'',
              rules:[{required:true,message:'用户名不能为空'},
              {min:4,message:'用户名小于4位'},
              {max:12,message:'用户名大于12位'},
              {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字、下划线组成'},
            ]
            })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
            )
          }
            
        </Form.Item>
                {/* 密码 */}
        <Form.Item>
           {
             getFieldDecorator('password',{
               rules:[
                 {validator:this.validatePwd}
               ]
             })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
             )
           }
        </Form.Item>
   {/* 登录按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        </Form.Item>
      </Form>
            
         </section>

            </div>
        )
    }
}

const WrapperLogin = Form.create()(Login)
export default WrapperLogin

