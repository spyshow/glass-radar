import React from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  ApartmentOutlined,
  CopyOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useFind } from "figbird";
import openNotification from "../Notification/Notification.component";

import "./MainMenu.styles.css";

const MainMenu = ({ app, theme }) => {
  const { SubMenu } = Menu;
  let navigate = useNavigate();
  let menus = () => {};
  let operatorMenu = () => {};
  const lines = useFind("lines", {
    query: {
      $sort: {
        line_number: 1,
      },
    },
  });
  if (lines.error) return "Failed to load resource Machine Status";
  if (lines.status === "success") {
    operatorMenu = (lines) => {
      return lines.data.map((line) => {
        console.log(line);
        return line.machines?.map((machine) => {
          if (
            machine.machine_name === "MX4" ||
            machine.machine_name === "COMBI"
          ) {
            return (
              <Menu.Item
                key={"operator_" + machine.id}
                icon={<ApartmentOutlined />}
              >
                <Link
                  to={`/dashboard/operator/${machine.id}&${line.id}`}
                  timestamp={new Date().toString()}
                >
                  {line.line_number}
                </Link>
              </Menu.Item>
            );
          }
        });
      });
    };
    menus = (lines) => {
      return lines.data.map((line) => {
        if (line.machines.length === 0) {
          return (
            <Menu.Item
              key={line.id}
              title={line.line_number}
              icon={<OrderedListOutlined />}
            >
              <Link to={`/dashboard/line/${line.id}&${line.line_number}`}>
                {line.line_number}
              </Link>
            </Menu.Item>
          );
        } else {
          return (
            <SubMenu
              key={line.id}
              className="sub-menu"
              title={
                <Link to={`/dashboard/line/${line.id}`} className="sub-menu">
                  {line.line_number}
                </Link>
              }
              icon={<OrderedListOutlined />}
            >
              {line.machines.map((machine) => {
                return (
                  <Menu.Item key={machine.id} icon={<ApartmentOutlined />}>
                    <Link to={`/dashboard/machine/${machine.id}`}>
                      {machine.machine_name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        }
      });
    };
  }
  function handleLogout() {
    app.logout();
    localStorage.setItem("currentUser", null);
    navigate("/login");
    openNotification("success", "Logout Successed!", "");
  }

  return (
    <Menu theme={theme} defaultSelectedKeys={["main1"]} mode="inline">
      <Menu.Item key="main1" icon={<PieChartOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
      <SubMenu key="main2" icon={<DesktopOutlined />} title="operator">
        {operatorMenu(lines)}
      </SubMenu>
      <SubMenu key="sub1" icon={<OrderedListOutlined />} title="Lines">
        {menus(lines)}
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Molds">
        <Menu.Item key="6">
          <Link to="/dashboard/moldsets">Mold Sets</Link>
        </Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      {JSON.parse(localStorage.getItem("currentUser")).roles.indexOf(
        "Admin"
      ) !== -1 ? (
        <SubMenu key="9" icon={<SettingOutlined />} title="Admin">
          <Menu.Item key="10" icon={<OrderedListOutlined />}>
            <Link to="/dashboard/lines">Lines</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<ApartmentOutlined />}>
            <Link to="/dashboard/machines">Machines</Link>
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
