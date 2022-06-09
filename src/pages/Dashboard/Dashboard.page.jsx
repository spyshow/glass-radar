import React from "react";
import { useFeathers } from "figbird";
import { Layout } from "antd";

// import { useRecoilState } from "recoil";
// import { useHover } from "@react-aria/interactions";
import { Outlet } from "react-router-dom";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import "./Dashboard.styles.css";



const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const app = useFeathers();
  
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
