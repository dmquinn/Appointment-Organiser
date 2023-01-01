import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Icon } from "antd";
import React, { useEffect, useState } from "react";
import { selectData } from "store/reducers/fetchDataSlice";
// import moment from "moment";
import Comment from "../components/Comment";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const appt = selectData();
    const newAppt = appt.filter(
      (item) => item.orderNo === window.location.pathname.split("/")[1]
    );
    setAppointment(newAppt[0]);
  }, []);
  appointment && console.log(appointment);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          padding: "10px",
        }}
      >
        <div className="logo" />
        <ul
          style={{
            color: "white",
            listStyle: "none",
            padding: "30px",
            border: "1px solid white",
            borderRadius: "50px",
          }}
        >
          <li>{appointment?.customer?.name}</li>
          <li>{appointment?.customer?.phone}</li>
          <li>{appointment?.customer?.email}</li>
        </ul>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <p>{appointment?.item.title}</p>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
