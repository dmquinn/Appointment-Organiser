import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { selectData } from "store/reducers/fetchDataSlice";
import Comment from "../components/Comment";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [appointment, setAppointment] = useState(null);
  useEffect(() => {
    const appt = selectData();
    const newAppt = appt.filter(
      (item) => item.orderNo === window.location.pathname.split("/")[1]
    );
    setAppointment(newAppt[0]);
  }, []);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Comment />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
