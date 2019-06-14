import React from 'react'
import logo from './images/logo.png'
import './login.less'
import { Form, Icon, Input, Button} from 'antd';


export default class Login extends React.Component{
   
        handleSubmit = (event) => {
          event.preventDefault();
            }
    
    render(){
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
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="U用户名"
            />
        </Form.Item>
                {/* 密码 */}
        <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
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

