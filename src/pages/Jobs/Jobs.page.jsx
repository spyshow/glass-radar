import React, { useState } from "react";
import {
  DatePicker,
  PageHeader,
  Button,
  Modal,
  Row,
  Col,
  Upload,
  message,
  Checkbox,
} from "antd";
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
  InboxOutlined,
  CopyOutlined,
  FieldNumberOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import openNotification from "../../components/Notification/Notification.component";

import "./Jobs.styles.css";

import PdfView from "../../components/PdfView/PdfView.component";
import EditableTable from "../../components/EditableTable/EditableTable.component";

//upload props
const { Dragger } = Upload;

//options for the user's roles
const options = {
  lines: [
    { value: "M11", name: "M1.1" },
    { value: "M12", name: "M1.2" },
    { value: "M21", name: "M2.1" },
    { value: "M22", name: "M2.2" },
  ],
  active: [
    { value: "true", name: "true" },
    { value: "false", name: "false" },
  ],
};

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
  lehr_time: Yup.number().required("Required"),
  total_ordered: Yup.number().required("Required"),
  // job_on: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(100, "Too Long!")
  //   .required("Required"),
});

function Jobs() {
  const { create } = useMutation("jobs");
  const [modalVisible, setModalVisible] = useState(false);
  const [jobOnLink, setJobOnLink] = useState("");
  const [jobOnVisible, setJobOnVisible] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState("");
  const originData = useFind("jobs");

  let columns = [
    {
      title: "Name",
      dataIndex: "name",
      dataType: "text",
      width: "25%",
      editable: true,
      sorter: {
        compare: (a, b) => {
          return a.name.localeCompare(b.name);
        },
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      dataType: "date",
      width: "15%",
      editable: false,
      date: moment(),
      sorter: {
        compare: (a, b) => {
          return a.date.localeCompare(b.date);
        },
      },
    },
    {
      title: "Line",
      dataIndex: "line",
      dataType: "select",
      width: "10%",
      editable: true,
      options: options["lines"],
      sorter: {
        compare: (a, b) => {
          return a.line.localeCompare(b.line);
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
        compare: (a, b) => a.speed - b.speed,
      },
    },
    {
      title: "Lehr Time",
      dataIndex: "lehr_time",
      dataType: "number",
      width: "10%",
      editable: true,
      sorter: {
        compare: (a, b) => a.lehr_time - b.lehr_time,
      },
    },
    {
      title: "Total ordered",
      dataIndex: "total_ordered",
      dataType: "number",
      width: "15%",
      editable: true,
      sorter: {
        compare: (a, b) => a.total_ordered - b.total_ordered,
      },
    },
    {
      title: "Job On",
      dataIndex: "job_on",
      dataType: "upload",
      width: "15%",
      editable: false,
      render: (link) => (
        <Button
          type="link"
          onClick={() => {
            setJobOnLink("http://localhost:3030/uploads/" + link);
            setJobOnVisible(true);
          }}
        >
          {link}
        </Button>
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      dataType: "select",
      options: options["active"],
      width: "10%",
      editable: true,
      sorter: (a, b) => a.active - b.active,
      render: (active) => <Checkbox checked={active} />,
    },
  ];

  //upload props
  const uploadProps = {
    name: "files",
    //multiple: true,
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
    action: process.env.REACT_APP_HOSTNAME + "/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFilesUploaded(info.file.name);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async (values) => {
    console.log(values);
    values.job_on = filesUploaded;
    values.active = false;
    values.total = 0;
    create(values).then(() => {
      openNotification("success", `Job: ${values.name} added succesfully!`);
      setModalVisible(false);
    });
  };
  console.log(columns);
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
        title="Job "
        centered
        visible={jobOnVisible}
        onOk={() => {
          setJobOnVisible(false);
        }}
        onCancel={() => {
          setJobOnVisible(false);
          setJobOnLink("");
        }}
        closable
        afterClose={() => setJobOnLink("")}
        width={1000}
        footer={[]}
      >
        <PdfView file={jobOnLink} />
      </Modal>
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
          initialValues={{
            name: "",
            speed: "",
            date: moment(),
            total: 0,
            total_ordered: 0,
          }}
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
                <DatePicker
                  title="date"
                  onChange={(date, dateString) => (values.date = date)}
                  format="DD/MM/YYYY"
                />
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
              <Form.Item name="lehr_time" label="Lehr Time">
                <InputNumber
                  name="lehr_time"
                  placeholder="Lehr Time"
                  prefix={<NumberOutlined />}
                  value={values.lehr_time}
                />
              </Form.Item>
              <Form.Item name="total_ordered" label="Total Ordered">
                <InputNumber
                  name="total_ordered"
                  placeholder="Total Ordered"
                  prefix={<NumberOutlined />}
                  value={values.total_ordered}
                ></InputNumber>
              </Form.Item>
              <Form.Item name="job_on" value={filesUploaded} noStyle>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
              </Form.Item>
              <Form.Item name="active" label="Active">
                <Checkbox checked={values.active}>active</Checkbox>
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
