import React, { FC, useState } from "react";
import { Button, Menu } from "antd";
import Modal from "./CalendarModal";
import {
  CalendarOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import LoginModal from "./LoginModal";

const Navbar: FC = () => {
  const [CalendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setLoginOpen(true)}>LOGIN</Button>
      <Menu mode="horizontal">
        <h3>MUSIC REPAIR SHOP</h3>

        <Menu.Item key="calendar">
          <CalendarOutlined
            onClick={() => setCalendarOpen(true)}
            style={{
              fontSize: "30px",
              marginBottom: "30px",
              backgroundColor: "#f59258",
              padding: "10px",
              color: "white",
              borderRadius: "50%",
            }}
          />
        </Menu.Item>
        <Menu.Item key="charts">
          <BarChartOutlined
            onClick={() => setCalendarOpen(true)}
            style={{
              fontSize: "30px",
              marginBottom: "30px",
              backgroundColor: "#f38aff",
              padding: "10px",
              color: "white",
              borderRadius: "50%",
            }}
          />
        </Menu.Item>
        <Menu.Item key="mail">
          <UserOutlined
            onClick={() => setCalendarOpen(true)}
            style={{
              fontSize: "30px",
              marginBottom: "30px",
              backgroundColor: "#88d2fc",
              padding: "10px",
              color: "white",
              borderRadius: "50%",
            }}
          />
        </Menu.Item>
      </Menu>
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <Modal open={CalendarOpen} setOpen={setCalendarOpen} />
    </>
  );
};

export default Navbar;
