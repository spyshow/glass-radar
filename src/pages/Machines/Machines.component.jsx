import React, { useState } from "react";
import { PageHeader, Button, Modal, Row, Col, Table, Space } from "antd";
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
  LinkOutlined,
  ClusterOutlined,
  FieldTimeOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import openNotification from "../../components/Notification/Notification.component";
import MachineStatus from "../../components/MachineStatus/MachineStatus.component";
import MachineRunner from "../../components/MachineRunner/MachineRunner.component";

import "./Machines.styles.css";

import EditableTable from "../../components/EditableTable/EditableTable.component";

const { Option } = Select;

function Machines() {
  const { create } = useMutation("machines");
  const lines = useFind("lines");
  const [modalAddMachineVisible, setAddMachineModalVisible] = useState(false);
  const [modalMachineStatusVisible, setMachineStatusModalVisible] = useState(
    false
  );
  const originData = useFind("machines");
  console.log(originData.data);
  const onSubmit = async (values) => {
    console.log(values);
    create(values).then(() => {
      openNotification("success", "Machine added succesfully!");
      setAddMachineModalVisible(false);
    });
  };

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
    lines: [],
  };
  if (lines.error) return "Failed to load resource Machine Status";
  if (lines.status === "success") {
    for (let i = 0; i < lines.data.length; i++) {
      options.lines[i] = {
        value: lines.data[i].id,
        label: lines.data[i].line_number,
      };
    }
  }

  let columns = [
    {
      title: "Name",
      dataIndex: "machine_name",
      dataType: "text",
      width: "10%",
      editable: false,
      sorter: {
        compare: (a, b) => {
          return a.machine_name.localeCompare(b.machine_name);
        },
      },
    },
    {
      title: "Line",
      dataIndex: "line.line_number",
      dataType: "select",
      width: "10%",
      forigin: "true",
      editable: true,
      options: options["lines"],
      sorter: {
        compare: (a, b) => {
          return a.type.localeCompare(b.type);
        },
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
    lineId: Yup.string().required("Required"),
    url: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
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

  let machineStatusColumn = [
    {
      title: "Name",
      dataType: "text",
      dataIndex: "machine_name",
      key: "name",
    },
    {
      title: "Line",
      dataType: "text",
      dataIndex: "line.line_number",
      key: "line",
    },
    {
      title: "Initilaization",
      key: "initilaization",
      dataIndex: "initilaization",
      render: (text, row, index) => {
        console.log(text, row);
        return (
          <>
            <MachineStatus
              name={row.machine_name + "_" + row["line.line_number"]}
              service="machine-exist"
              index={row.id}
            />
          </>
        );
      },
    },
    {
      title: "Operation",
      key: "Operation",
      dataIndex: "Operation",
      render: (text, row, index) => {
        console.log(row.id);
        return (
          <Space align="center" direction="horizontal" key={row.id}>
            <MachineRunner mode="init" row={row} key={1} />
            <MachineRunner mode="start" row={row} key={2} />
            <MachineRunner mode="stop" row={row} key={3} />
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Machines"
        subTitle="All the machines in the plant"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => setAddMachineModalVisible(true)}
          >
            Add Machine
          </Button>,
          <Button
            key="2"
            type="primary"
            onClick={() => setMachineStatusModalVisible(true)}
          >
            Machine Status
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        title="Add Machine"
        centered
        visible={modalAddMachineVisible}
        onOk={() => {
          setAddMachineModalVisible(false);
        }}
        onCancel={() => {
          setAddMachineModalVisible(false);
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
            <Form {...layout} onSubmit={handleSubmit}>
              <Form.Item name="machine_name" label="Name">
                <Input
                  name="machine_name"
                  placeholder="Machine Name"
                  prefix={<TagOutlined />}
                  value={values.machine_name}
                />
              </Form.Item>
              <Form.Item name="lineId" label="Line">
                <Select
                  loading={lines.data.status}
                  prefix={<ClusterOutlined />}
                  options={options["lines"]}
                  name="lineId"
                  style={{ width: "100%" }}
                  value={values.lineId}
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
      <Modal
        title="Machines Status"
        centered
        visible={modalMachineStatusVisible}
        onOk={() => {
          setMachineStatusModalVisible(false);
        }}
        onCancel={() => {
          setMachineStatusModalVisible(false);
        }}
        width={1000}
        footer={[]}
      >
        <Table
          rowKey={(record) => {
            return record.id;
          }}
          columns={machineStatusColumn}
          dataSource={originData.data}
        ></Table>
      </Modal>
      {originData.status === "loading" && lines.status === "loading" ? (
        <div />
      ) : (
        <EditableTable
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
