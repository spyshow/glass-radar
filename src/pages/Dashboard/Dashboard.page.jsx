import React from "react";
import { useFeathers } from "figbird";
import { Layout } from "antd";

// import { useRecoilState } from "recoil";
// import { useHover } from "@react-aria/interactions";
import { Outlet, Routes } from "react-router-dom";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import "./Dashboard.styles.css";

//import { sidebarCollapsedState } from "../../store/index";
import Lines from "../Lines/Lines.page";
import Line from "../Line/Line.page";

import Machines from "../Machines/Machines.page";
import Machine from "../machine/machine.page";
import Users from "../Users/Users.page";
import Jobs from "../Jobs/Jobs.page";
import Operator from "../Operator/Operator.page";
import MoldSets from "../MoldSets/MoldSets.page";
import MoldSet from "../../components/MoldSet/MoldSet.component";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const app = useFeathers();
  // const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(
  //   sidebarCollapsedState
  // );
  // let { hoverProps } = useHover({
  //   onHoverStart: (e) => setSidebarCollapsed(false),
  //   onHoverEnd: (e) => setSidebarCollapsed(true),
  // });

  // const ToggleCollapse = () => {
  //   setSidebarCollapsed(!sidebarCollapsed);
  // };

  const routes = [
    {
      path: "/",
      component: () => <div>home</div>,
      exact: true,
    },
    {
      path: "/operator/:machineId&:lineId",
      component: () => <Operator />,
    },
    {
      path: "/login",
      component: () => <div />,
    },
    {
      path: "/moldsets",
      component: () => <MoldSets />,
    },
    {
      path: "/moldset/:id",
      component: () => <MoldSet />,
    },
    {
      path: "/lines",
      component: () => <Lines />,
    },
    {
      path: "/line/:id",
      component: () => <Line />,
    },
    {
      path: "/machine/:id",
      component: () => <Machine />,
    },
    {
      path: "/machines",
      component: () => <Machines />,
    },
    {
      path: "/users",
      component: () => <Users />,
    },
    {
      path: "/jobs",
      component: () => <Jobs />,
    },
  ];

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="xxl"
          collapsedWidth="80"
          collapsible
          // collapsed={sidebarCollapsed}

          // onCollapse={ToggleCollapse}
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
          <MainMenu app={app} theme="dark" />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 10px 10px 10px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Glass Radar ©2020 Created by Jihad Khorfan
          </Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;
