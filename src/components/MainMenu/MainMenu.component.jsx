import React from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
  CopyOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import openNotification from "../Notification/Notification.component";

const MainMenu = ({app, theme}) => {
  const { SubMenu } = Menu;
  let history = useHistory();
  return (
    <Menu theme={theme} defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item
        key="1"
        icon={<PieChartOutlined />}
        onClick={() => {
          app.logout();
          localStorage.setItem("currentUser", null);
          openNotification("success", "Logout Successed!", "");
          history.push("/");
          console.log("logout");
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        Option 2
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      {JSON.parse(localStorage.getItem("currentUser")).roles.indexOf(
        "admin"
      ) !== -1 ? (
        <SubMenu key="9" icon={<SettingOutlined />} title="Admin">
          <Menu.Item key="10" icon={<OrderedListOutlined />}>
            <Link to="/dashboard/lines">Lines</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<ApartmentOutlined />}>
            <Link to="/dashboard/machine">Machines</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<TeamOutlined />}>
            <Link to="/dashboard/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="13" icon={<CopyOutlined />}>
            <Link to="/dashboard/jobs">Jobs</Link>
          </Menu.Item>
        </SubMenu>
      ) : null}
    </Menu>
  );
};

export default MainMenu;
