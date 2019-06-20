import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal, message } from "antd";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

import { Pagination, LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

export default class Category extends Component {
  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: "0", // 当前需要显示的分类列表的父分类ID
    parentName: "", // 当前需要显示的分类列表的父分类名称
    showStatus: 0 // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  };

  //显示表格数据
  //1.初始化Table所有列表项
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name"
      },
      {
        title: "操作",
        width: 300,
        render: category => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>
                修改分类
              </LinkButton>
              {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
              {this.state.parentId === "0" && (
                <LinkButton onClick={() => this.showSubCategorys(category)}>
                  查看子分类
                </LinkButton>
              )}
            </span>
          );
        }
      }
    ];
  };

  //2.获取一级/二级分类列表显示
  getCategorys = async parentId => {
    // 在发请求前, 显示loading
    this.setState({ loading: true });
    parentId = parentId || this.state.parentId;
    // 发异步ajax请求, 获取数据
    const result = await reqCategorys(parentId);
    // 在请求完成后, 隐藏loading
    this.setState({ loading: false });

    if (result.status === 0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data;
      if (parentId === "0") {
        // 更新一级分类状态
        this.setState({
          categorys
        });
        console.log("----", this.state.categorys.length);
      } else {
        // 更新二级分类状态
        this.setState({
          subCategorys: categorys
        });
      }
    }
  };

  //3.显示指定一级分类对象的子分类列表
  showSubCategorys = category => {
    // 更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        // 在状态更新且重新render()后执行
        console.log("parentId", this.state.parentId); // '0'
        // 获取二级分类列表显示
        this.getCategorys();
      }
    );
  };

  //4.进入二级列表返回显示指定一级分类列表
  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: []
    });
  };

  //修改分类
  //1.显示修改确认框
  showUpdate = category => {
    // 保存分类对象
    this.category = category;
    // 更新状态
    this.setState({
      showStatus: 2
    });
  };
  //2.完成修改数据更新
  updateCategory = () => {
    // 进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 只有验证通过才继续
        // 隐藏修改界面
        this.setState({
          showStatus: 0
        });

        // 得到输入的分类名称
        const categoryName = this.form.getFieldValue("categoryName");
        // 重置输入数据
        this.form.resetFields();
        // 得到分类的_id
        const categoryId = this.category._id;

        // console.log('发更新请求', categoryName, categoryId)
        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          message.success("更新分类成功");
          //更新状态
          this.getCategorys();
        }
      }
    });
  };

  //添加功能
  //1.显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    });
  };
  // 2. 添加分类
  addCategory = async () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 只有验证通过才继续
        this.setState({
          showStatus: 0
        });
        // 获取输入的数据
        const { categoryName, parentId } = this.form.getFieldsValue();
        // 重置输入数据
        this.form.resetFields();

        // 请求添加
        const result = await reqAddCategory(categoryName, parentId);

        // 提示成功, 并显示最新的列表
        if (result.status === 0) {
          message.success("添加分类成功");
          // 1. 添加的是一级分类
          if (parentId === "0") {
            this.getCategorys("0");
            // 2. 添加当前二级分类
          } else if (parentId === this.state.parentId) {
            this.getCategorys();
          }
        }
      }
    });
  };

  /*
  响应点击取消: 隐藏确定框
   */
  handleCancel = () => {
    // 清除输入数据
    this.form.resetFields();
    // 隐藏确认框
    this.setState({
      showStatus: 0
    });
  };

  /*
  为第一次render()准备数据
   */
  componentWillMount() {
    this.initColumns();
  }
  /*
  执行异步任务: 发异步ajax请求
   */
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    // 读取状态数据
    const {
      categorys,
      subCategorys,
      parentId,
      loading,
      parentName,
      showStatus
    } = this.state;
    // 读取指定的分类
    const category = this.category || {}; // 如果还没有指定一个空对象
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }} />
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <LocaleProvider locale={zhCN}>
        {/* 表格数据显示 */}
        <Card title={title} extra={extra}>
          <Table
            rowKey="_id"
            loading={loading}
            columns={this.columns}
            dataSource={parentId === "0" ? categorys : subCategorys}
            bordered
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />

          {/* 修改分类显示 */}

          <Modal
            title="修改类名"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={() => {
              this.form.resetFields();
              this.setState({ showStatus: 0 });
            }}
          >
            <UpdateForm
              categoryName={category.name}
              setForm={form => (this.form = form)}
            />
          </Modal>
          {/* 添加分类 */}
          <Modal
            title="添加分类"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={() => {
              this.form.resetFields();
              this.setState({ showStatus: 0 });
            }}
          >
            <AddForm
              categorys={categorys}
              parentId={parentId}
              setForm={form => (this.form = form)}
            />
          </Modal>
        </Card>
      </LocaleProvider>
    );
  }
}
