import React, { useState } from "react";
import { DatePicker, PageHeader, Button, Modal, Row, Col } from "antd";
import { useFind, useMutation } from "figbird";
import {
  Form,
  InputNumber,
  Input,
  Select,
  SubmitButton,
  ResetButton,
} from "formik-antd";
import {
  CopyOutlined,
  FieldNumberOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import openNotification from "../../components/Notification/Notification.component";

import "./Jobs.styles.css";

import EditableTable from "../../components/EditableTable/EditableTable.component";

//options for the user's roles
const options = {
  lines: [
    { value: "M11", name: "M1.1" },
    { value: "M12", name: "M1.2" },
    { value: "M21", name: "M2.1" },
    { value: "M22", name: "M2.2" },
  ],
};

let columns = [
  {
    title: "Name",
    dataIndex: "name",
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
    title: "Date",
    dataIndex: "date",
    dataType: "date",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.last_name.localeCompare(b.url);
      },
    },
  },
  {
    title: "Line",
    dataIndex: "line",
    dataType: "select",
    width: "20%",
    editable: true,
    options: options["lines"],
    sorter: {
      compare: (a, b) => {
        return a.email.localeCompare(b.url);
      },
    },
  },
  {
    title: "Speed",
    dataIndex: "speed",
    dataType: "number",
    width: "10%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.email.localeCompare(b.url);
      },
    },
  },
  {
    title: "Total",
    dataIndex: "total",
    dataType: "number",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.email.localeCompare(b.url);
      },
    },
  },
  {
    title: "Total ordered",
    dataIndex: "total_ordered",
    dataType: "number",
    width: "15%",
    editable: false,
    sorter: {
      compare: (a, b) => {
        return a.email.localeCompare(b.url);
      },
    },
  },

  {
    title: "Job On",
    dataIndex: "job_on",
    dataType: "upload",
    width: "15%",
    editable: true,
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
const JobsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  date: Yup.date().required("Required"),
  line: Yup.string()
    .min(2, "Too Short!")
    .max(3, "Too Long!")
    .required("Required"),
  speed: Yup.number().required("Required"),
  total: Yup.number().min(100000, "Too Short!").required("Required"),
  total_ordered: Yup.number().required("Required"),
  job_on: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

function Jobs() {
  const { create } = useMutation("jobs");
  const [modalVisible, setModalVisible] = useState(false);
  const originData = useFind("jobs");
  const onSubmit = async (values) => {
    create(values).then(() => {
      openNotification("success", `Job: ${values.name} added succesfully!`);
      setModalVisible(false);
    });
  };
  return (
    <div>
      <PageHeader
        ghost={false}
        title="Jobs"
        subTitle=""
        extra={[
          <Button key="1" type="primary" onClick={() => setModalVisible(true)}>
            Add Job
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        title="Add Job"
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
          initialValues={{ name: "", speed: "", total: "", total_ordered: "" }}
          validationSchema={JobsSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleSubmit }) => (
            <Form {...layout} onSubmit={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input
                  name="name"
                  placeholder="Name"
                  prefix={<CopyOutlined />}
                  value={values.name}
                />
              </Form.Item>
              <Form.Item name="date" label="Date">
                <DatePicker value={values.last_name} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item name="line" label="Line">
                <Select
                  name="line"
                  placeholder="Line"
                  prefix={<FieldNumberOutlined />}
                  value={values.line}
                  style={{ width: "100%" }}
                  options={options.lines}
                />
              </Form.Item>
              <Form.Item name="speed" label="Speed">
                <InputNumber
                  name="speed"
                  placeholder="Speed"
                  prefix={<NumberOutlined />}
                  value={values.speed}
                />
              </Form.Item>
              <Form.Item name="total" label="Total">
                <InputNumber
                  name="total"
                  placeholder="Total"
                  prefix={<NumberOutlined />}
                  value={values.total}
                ></InputNumber>
              </Form.Item>
              <Form.Item name="total_order" label="total_order">
                <InputNumber
                  name="total_order"
                  placeholder="Total Order"
                  prefix={<NumberOutlined />}
                  value={values.total_ordered}
                ></InputNumber>
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
          service="jobs"
          options={options}
        />
      )}
    </div>
  );
}

export default Jobs;
