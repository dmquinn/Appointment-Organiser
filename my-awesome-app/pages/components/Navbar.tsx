import React, {
  Component,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { Menu } from "antd";
import Modal from "./CalendarModal";
import {
  CalendarOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Menu mode="horizontal">
        <h3>MUSIC REPAIR SHOP</h3>

        <Menu.Item key="calendar">
          <CalendarOutlined
            onClick={() => setOpen(true)}
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
            onClick={() => setOpen(true)}
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
            onClick={() => setOpen(true)}
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
      <Modal open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
