import React from "react";
import { Form, Input, Checkbox, SubmitButton, ResetButton } from "formik-antd";
import { Formik } from "formik";
import { Row, Col } from "antd";
import * as Yup from "yup";

import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import "./FormContainer.styles.css";

//form validation
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

//form layout
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

// form submiting

const onSubmit = async (values) => {};

const FormContainer = () => {
  return (
    <div className="form-container log-in-container">
      <Formik
        initialValues={{ username: "", password: "", remember: false }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
        render={({ errors, touched }) => (
          <Form {...layout} className="form">
            <Form.Item name="username" label="Username">
              <Input
                name="username"
                placeholder="User Name"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password
                prefix={<LockOutlined />}
                name="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Row style={{ margin: "20px 0" }}>
              <Col offset={6} span={16}>
                <Checkbox name="remember">Remember Me</Checkbox>
              </Col>
            </Row>
            <Row>
              <Col offset={6} span={4}>
                <SubmitButton>Submit</SubmitButton>
              </Col>
              <Col offset={5} span={4}>
                <ResetButton>Reset</ResetButton>
              </Col>
            </Row>
          </Form>
        )}
      />
    </div>
  );
};

export default FormContainer;
