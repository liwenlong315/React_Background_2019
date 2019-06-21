/* Admin页面 */
import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import AdminHeader from "../../components/header";

import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";

import Home from "../home/home";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Product from "../product/product";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          {/* 左侧导航兰 */}
          <LeftNav />
        </Sider>
        <Layout>
          {/* 头部组件 */}
          <AdminHeader />
          <Content style={{ backgroundColor: "white", margin: 30 }}>
            {/* 内容页面 */}
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#eeeee" }}>
            本管理系统请使用谷歌浏览器
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
