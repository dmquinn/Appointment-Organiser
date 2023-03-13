import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Spin } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { UserOutlined, PhoneOutlined, SendOutlined } from "@ant-design/icons";
import { selectOrders } from "../redux/ordersSlice";
import Navbar from "./components/Navbar";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export const SinglePage = () => {
  const [order, setOrder] = useState(null);

  const router = useRouter();
  const { _id } = router.query;
  const orders = useSelector(selectOrders);

  useEffect(() => {
    const c = orders?.orders[0]?.filter((item) => item._id === _id);
    setOrder(c);
  }, [orders]);
  order && console.log(order[0]);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Navbar />
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible style={{ backgroundColor: "gray" }}>
          <Menu mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>Customer Details</span>
                </span>
              }
            >
              {order ? (
                <>
                  <Menu.Item key="cname">
                    <UserOutlined /> {order[0]?.customer.name}
                  </Menu.Item>
                  <Menu.Item key="cemail">
                    <SendOutlined /> {order[0]?.customer.email}
                  </Menu.Item>
                  <Menu.Item key="cphone">
                    <PhoneOutlined /> {order[0]?.customer.phone}
                  </Menu.Item>
                </>
              ) : (
                <div style={{ padding: "50px" }}>
                  <Spin />
                </div>
              )}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>Order Details</span>
                </span>
              }
            >
              {order && (
                <>
                  <Menu.Item key="6">{order[0]?.item?.title}</Menu.Item>
                  <Menu.Item key="8">{order[0]?.item?.category}</Menu.Item>
                  <Menu.Item key="8">{order[0]?.item?.targetDate}</Menu.Item>
                </>
              )}
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
    </>
  );
};

export default SinglePage;
