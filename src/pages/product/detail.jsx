/* 
商品的详情子路由组件
*/
import React, { Component } from "react";
import { List, Icon, Card } from "antd";

import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api";
import "./product.less";

export default class ProductDetail extends Component {
  state = {
    cName1: "", // 一级分类名称
    cName2: "" // 二级分类名称
  };

  async componentDidMount() {
    // 得到分类id
    const { pCategoryId, categoryId } = this.props.location.state;
    // 一级分类下的商品
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      // 更新状态
      this.setState({
        cName1
      });
    } else {
      // 二级商品
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId)
      ]);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;

      this.setState({
        cName1,
        cName2
      });
    }
  }

  render() {
    const { name, desc, price, imgs, detail } = this.props.location.state;
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{ fontSize: 20 }} />
        </LinkButton>
        &nbsp;&nbsp;商品详情
      </span>
    );

    return (
      <Card title={title} className="detail">
        <List>
          <List.Item>
            <span className="detail-left">商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品价格:</span>
            <span>{price}元</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">所属分类:</span>
            <span>
              {cName1} --> {cName2}
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品图片:</span>
            <span>
              {imgs.map(img => (
                <img
                  src={BASE_IMG_URL + img}
                  alt="img"
                  key={img}
                  style={{ width: 150, height: 150 }}
                />
              ))}
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: detail }} />
          </List.Item>
        </List>
      </Card>
    );
  }
}
