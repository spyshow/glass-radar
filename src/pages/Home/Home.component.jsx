import React from "react";
import DynamicAntdTheme from "dynamic-antd-theme";

function Home() {
  return (
    <div className="theme-container">
      <span>Change antd theme: </span>
      <DynamicAntdTheme />
    </div>
  );
}

export default Home;
