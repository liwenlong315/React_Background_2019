import React, { Component } from 'react'
import { Card, Table, Button, Icon, Modal, message} from 'antd'

import { Pagination, LocaleProvider, } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';


export default class Category extends Component {

  

  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];
    
    const data = [
      {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    return (
      <LocaleProvider locale={zhCN}>
      <Card title="一级分类列表" extra={<a href="#">More</a>}>
      <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={{defaultPageSize:1,showQuickJumper:true}}  
  />
    
    
  
    </Card>
    </LocaleProvider>
    )
  }
}

