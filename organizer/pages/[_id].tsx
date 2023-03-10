import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Space } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectOrders } from "../redux/ordersSlice";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export const SinglePage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const orders = useSelector(selectOrders);
  const singleOrder = orders.orders[0].filter((item) => item._id === _id);
  const { customer, item } = singleOrder;

  customer && console.log(customer);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible style={{ backgroundColor: "orange" }}>
        <Menu defaultSelectedKeys={["0"]} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}></Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SinglePage;
