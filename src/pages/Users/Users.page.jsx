import React, { useState } from "react";
import { PageHeader, Button, Modal, Row, Col, Tag } from "antd";
import { useFind, useMutation } from "figbird";
import { getTimeZones } from "@vvo/tzdb";
import { Form, Input, Select, SubmitButton, ResetButton } from "formik-antd";
import {
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import openNotification from "../../components/Notification/Notification.component";

import "./Users.styles.css";

import EditableTable from "../../components/EditableTable/EditableTable.component";

//generate timezone array of objects
const timezoneArray = () => {
  let timezones = getTimeZones();
  let tz = timezones.map((item) => {
    return {
      value: `${item.name} (${item.rawOffsetInMinutes / 60}:00)`,
      name: `${item.name} (${item.rawOffsetInMinutes / 60}:00)`,
    };
  });
  return tz;
};
const timezones = timezoneArray();
//options for the user's roles
const options = {
  roles: [
    { value: "user", name: "user" },
    { value: "moderator", name: "moderator", color: "blue" },
    { value: "admin", name: "admin" },
  ],
  timezone: timezones,
};

let columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    dataType: "text",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.first_name.localeCompare(b.url);
      },
    },
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    dataType: "text",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.last_name.localeCompare(b.url);
      },
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    dataType: "text",
    width: "20%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.email.localeCompare(b.url);
      },
    },
  },
  {
    title: "roles",
    dataIndex: "roles",
    dataType: "select",
    width: "25%",
    editable: true,
    options: options["roles"],
    mode: "multiple",
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = "";
          switch (tag) {
            case "moderator":
              color = "blue";
              break;
            case "admin":
              color = "volcano";
              break;
            default:
              color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Time Zone",
    dataIndex: "timezone",
    dataType: "select",
    options: options["timezone"],
    width: "15%",
    editable: true,
    filter: true,
  },
];

//form layout
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

//form validation
const LoginSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  roles: Yup.string().required("Required"),
});

function Users() {
  const { create } = useMutation("users");
  const [modalVisible, setModalVisible] = useState(false);
  const originData = useFind("users");
  const onSubmit = async (values) => {
    create(values).then(() => {
      openNotification(
        "success",
        `${values.first_name} ${values.last_name} added succesfully!`
      );
      setModalVisible(false);
    });
  };
  return (
    <div>
      <PageHeader
        ghost={false}
        title="Users"
        subTitle=""
        extra={[
          <Button key="1" type="primary" onClick={() => setModalVisible(true)}>
            Add User
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        title="Add User"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        width={1000}
        footer={[]}
      >
        <Formik
          initialValues={{ first_name: "", last_name: "", email: "" }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleSubmit }) => (
            <Form {...layout} onSubmit={handleSubmit}>
              <Form.Item name="first_name" label="First Name">
                <Input
                  name="first_name"
                  placeholder="First Name"
                  prefix={<UserOutlined />}
                  value={values.first_name}
                />
              </Form.Item>
              <Form.Item name="last_name" label="Last Name">
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  prefix={<TeamOutlined />}
                  value={values.last_name}
                />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input
                  name="email"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  value={values.email}
                />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password
                  name="password"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  value={values.Password}
                />
              </Form.Item>
              <Form.Item name="roles" label="roles">
                <Select
                  mode="multiple"
                  name="roles"
                  style={{ width: "100%" }}
                  value={values.roles}
                  options={options.roles}
                ></Select>
              </Form.Item>
              <Form.Item name="timezone" label="Time Zone">
                <Select
                  showSearch
                  optionFilterProp="child"
                  placeholder="Select a timezone"
                  name="timezone"
                  style={{ width: "100%" }}
                  value={values.timezone}
                  options={options.timezone}
                  filterOption={(input, option) =>
                    option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
              <Row>
                <Col offset={6} span={4}>
                  <SubmitButton>Submit</SubmitButton>
                </Col>
                <Col offset={5} span={4}>
                  <ResetButton>Reset</ResetButton>
                </Col>
              </Row>
              ,
            </Form>
          )}
        </Formik>
      </Modal>
      {originData.status === "loading" ? (
        <div />
      ) : (
        <EditableTable
          originData={originData}
          originColumns={columns}
          service="users"
          options={options}
        />
      )}
    </div>
  );
}

export default Users;
