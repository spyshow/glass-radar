import React from "react";
import { Form, Input, Checkbox, SubmitButton, ResetButton } from "formik-antd";
import { Formik } from "formik";
import { Row, Col } from "antd";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useFeathers } from "figbird";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import openNotification from "../Notification/Notification.component";

import "./FormContainer.styles.css";

//form validation
const LoginSchema = Yup.object().shape({
  email: Yup.string()
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

const FormContainer = () => {
  const app = useFeathers();
  const history = useHistory();
  // form submiting
  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    try {
      if (!email || !password) {
        // Try to authenticate using an existing token
        await app.reAuthenticate();
      } else {
        // Otherwise log in with the `local` strategy using the credentials we got
        await app
          .authenticate({
            strategy: "local",
            email: email,
            password: password,
          })
          .then((user) => {
            openNotification("success", "Login Successed!", "");
            localStorage.setItem("currentUser", JSON.stringify(user.postgres));
            history.push({
              pathname: "/dashboard",
              state: { error: "Login Success!" },
            });
          });
        console.log("authing");
      }
    } catch (error) {
      // If we got an error, show the login page
      openNotification(
        "error",
        "Login Error!",
        "Authentication Failed, Please Login again"
      );
      history.push({
        pathname: "/login",
      });
    }
  };

  return (
    <div className="form-container log-in-container">
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <Form {...layout} className="form" onSubmit={handleSubmit}>
            <Form.Item name="email" label="email">
              <Input
                name="email"
                placeholder="Email"
                prefix={<UserOutlined />}
                value={values.email}
              />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password
                prefix={<LockOutlined />}
                name="password"
                placeholder="Password"
                value={values.password}
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
      </Formik>
    </div>
  );
};

export default FormContainer;
