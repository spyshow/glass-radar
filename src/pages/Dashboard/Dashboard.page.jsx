import React from "react";
import { useFeathers } from "figbird";
import { Layout } from "antd";

// import { useRecoilState } from "recoil";
// import { useHover } from "@react-aria/interactions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import "./Dashboard.styles.css";

//import { sidebarCollapsedState } from "../../store/index";
import Lines from "../Lines/Lines.page";
import Line from "../Line/Line.page";
import Login from "../Login/Login.page";
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
      path: "/dashboard/",
      component: () => <div>home</div>,
      exact: true,
    },
    {
      path: "/dashboard/operator/:machineId&:lineId",
      component: () => <Operator />,
    },
    {
      path: "/dashboard/login",
      component: () => <div />,
    },
    {
      path: "/dashboard/moldsets",
      component: () => <MoldSets />,
    },
    {
      path: "/dashboard/moldset/:id",
      component: () => <MoldSet />,
    },
    {
      path: "/dashboard/lines",
      component: () => <Lines />,
    },
    {
      path: "/dashboard/line/:id",
      component: () => <Line />,
    },
    {
      path: "/dashboard/machine/:id",
      component: () => <Machine />,
    },
    {
      path: "/dashboard/machines",
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
      <Switch>
        <Route path="/login/" component={() => <Login />} exact={true} />
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
              Glass Radar ©2020 Created by Jihad Khorfan
            </Footer>
          </Layout>
        </Layout>
      </Switch>
    </Router>
  );
};

export default Dashboard;
