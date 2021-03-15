import React from "react";
import { Row, Col } from "antd";

import FormContainer from "../../components/FormContainer/FormContainer.component";
import OverlayContainer from "../../components/OverlayContainer/OverlayContainer.component";

import "./Login.styles.css";

const Login = () => {
  return (
    <div className="login">
      <Row>
        <Col span={24}></Col>
      </Row>
      <Row>
        <Col order={1} xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 0 }}>
          <FormContainer />
        </Col>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 4 }}>
          <OverlayContainer />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
