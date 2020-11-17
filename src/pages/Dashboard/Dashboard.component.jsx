import React from "react";
import { useFeathers } from "figbird";

import { Layout, Menu } from "antd";
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
import { useRecoilState } from "recoil";
import { useHover } from "@react-aria/interactions";
import {
  BrowserRouter as Router,
  useHistory,
  Link,
  Route,
} from "react-router-dom";

import "./Dashboard.styles.css";

import openNotification from "../../components/Notification/Notification.component";
import { sidebarCollapsedState } from "../../store/index";
import Lines from "../Lines/Lines.component";
import Machines from "../Machines/Machines.component";
import Users from "../Users/Users.component";
import Jobs from "../Jobs/Jobs.components";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const app = useFeathers();
  let history = useHistory();
  let { hoverProps } = useHover({
    onHoverStart: (e) => setSidebarCollapsed(false),
    onHoverEnd: (e) => setSidebarCollapsed(true),
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(
    sidebarCollapsedState
  );

  const ToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const routes = [
    {
      path: "/dashboard/",
      component: () => <div>home</div>,
      exact: true,
    },
    {
      path: "/dashboard/login",
      component: () => <div />,
    },
    {
      path: "/dashboard/lines",
      component: () => <Lines />,
    },
    {
      path: "/dashboard/machine",
      component: () => <Machines />,
    },
    {
      path: "/dashboard/users",
      component: () => <Users />,
    },
    {
      path: "/dashboard/jobs",
      component: () => <Jobs />,
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          {...hoverProps}
          breakpoint="xxl"
          collapsedWidth="80"
          collapsible
          collapsed={sidebarCollapsed}
          onCollapse={ToggleCollapse}
          style={{
            zIndex: "3",
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
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
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 10px 10px 90px" }}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Dashboard;
