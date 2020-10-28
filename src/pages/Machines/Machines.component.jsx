import React, { useState } from "react";
import { PageHeader, Button, Modal, Row, Col } from "antd";
import { useFind, useMutation } from "figbird";
import {
  Form,
  Input,
  InputNumber,
  Select,
  SubmitButton,
  ResetButton,
} from "formik-antd";
import {
  TagOutlined,
  FieldBinaryOutlined,
  LinkOutlined,
  ClusterOutlined,
  FieldTimeOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import openNotification from "../../components/Notification/Notification.component";

import "./Machines.styles.css";

import Table from "../../components/Table/Table.component";

const { Option } = Select;

//options for the machine's types
const options = {
  type: [
    { value: "IS", name: "IS" },
    { value: "MCAL4", name: "MCAL4" },
    { value: "MULTI4", name: "MULTI4" },
    { value: "MX4", name: "MX4" },
    { value: "VI", name: "VI" },
    { value: "PALLETIZER", name: "PALLETIZER" },
    { value: "Display", name: "Display" },
  ],
};

let columns = [
  {
    title: "Name",
    dataIndex: "machine_name",
    dataType: "text",
    width: "10%",
    editable: false,
    sorter: {
      compare: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
  },
  {
    title: "Line",
    dataIndex: "machine_line",
    dataType: "text",
    width: "10%",
    editable: false,
    sorter: {
      compare: (a, b) => a.line - b.line,
    },
  },
  {
    title: "URL",
    dataIndex: "url",
    dataType: "text",
    width: "20%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.url.localeCompare(b.url);
      },
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    dataType: "select",
    width: "15%",
    editable: true,
    options: options["type"],
    sorter: {
      compare: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
  },
  {
    title: "Scan Time",
    dataIndex: "scantime",
    dataType: "number",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => a.scanTime - b.scanTime,
    },
  },
  {
    title: "Sequence",
    dataIndex: "sequence",
    dataType: "number",
    width: "15%",
    editable: true,
    sorter: {
      compare: (a, b) => a.sequence - b.sequence,
    },
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
  machine_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  machine_line: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  url: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  scantime: Yup.number()
    .moreThan(0, "Minimum allowed!")
    .lessThan(50, "Maximum allowed!")
    .positive("Value must be a positive number!")
    .integer("number must be an integer.")
    .required("Required"),
  sequence: Yup.number()
    .moreThan(0, "Minimum allowed!")
    .lessThan(50, "Maximum allowed!")
    .integer("number must be an integer.")
    .positive("Value must be a positive number!")
    .required("Required"),
});

function Machines() {
  const { create } = useMutation("machines");
  const formRef = React.useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const originData = useFind("machines");
  const onSubmit = async (values) => {
    create(values).then(() => {
      openNotification("success", "Machine added succesfully!");
      setModalVisible(false);
    });
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Machines"
        subTitle="All the machines in the plant"
        extra={[
          <Button key="1" type="primary" onClick={() => setModalVisible(true)}>
            Add Machine
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        title="Add Machine"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
          console.log(formRef);
        }}
        width={1000}
        footer={[]}
      >
        <Formik
          initialValues={{ machine_name: "", password: "", remember: false }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleSubmit }) => (
            <Form {...layout} onSubmit={handleSubmit} ref={formRef}>
              <Form.Item name="machine_name" label="Name">
                <Input
                  name="machine_name"
                  placeholder="Machine Name"
                  prefix={<TagOutlined />}
                  value={values.machine_name}
                />
              </Form.Item>
              <Form.Item name="machine_line" label="Line">
                <Input
                  prefix={<FieldBinaryOutlined />}
                  name="machine_line"
                  placeholder="Machine Line"
                  value={values.machine_line}
                />
              </Form.Item>
              <Form.Item name="url" label="URL">
                <Input
                  name="url"
                  placeholder="URL"
                  prefix={<LinkOutlined />}
                  value={values.url}
                />
              </Form.Item>
              <Form.Item name="type" label="Type">
                <Select
                  prefix={<ClusterOutlined />}
                  name="type"
                  defaultValue="IS"
                  style={{ width: "100%" }}
                  value={values.type}
                >
                  <Option value="IS">IS</Option>
                  <Option value="LI">LI</Option>
                  <Option value="MCAL4">MCAL4</Option>
                  <Option value="MULTI4">MULTI4</Option>
                  <Option value="MX4">MX4</Option>
                  <Option value="VI">VI</Option>
                  <Option value="PALLETIZER">Palletizer</Option>
                  <Option value="Display">Display</Option>
                </Select>
              </Form.Item>
              <Form.Item name="scantime" label="Scan Time">
                <InputNumber
                  name="scantime"
                  placeholder="Scan Time"
                  prefix={<FieldTimeOutlined />}
                  value={values.scantime}
                />
              </Form.Item>
              <Form.Item name="sequence" label="Sequence">
                <InputNumber
                  name="sequence"
                  placeholder="Sequence"
                  prefix={<NodeExpandOutlined />}
                  value={values.sequence}
                />
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
        <Table
          originData={originData}
          originColumns={columns}
          service="machines"
          options={options}
        />
      )}
    </div>
  );
}

export default Machines;
