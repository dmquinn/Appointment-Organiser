import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export const SinglePage = () => {
  const [singleItem, setSingleItem] = useState(null);
  const router = useRouter();
  const { _id, customer, item } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (_id) getOrder();
  }, [_id]);
  const getOrder = async () => {
    const response = await fetch(
      `http://localhost:3000/api/getSingleOrder/${_id}`
    );
    const data = await response.json();
    setSingleItem(data);
  };
  singleItem && console.log("SINGLE", singleItem);
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
