import React, { useState } from "react";
import { PageHeader, Button, Modal, Row, Col } from "antd";
import { useFind, useMutation } from "figbird";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { TagOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import openNotification from "../../components/Notification/Notification.component";

import "./Lines.styles.css";

import EditableTable from "../../components/EditableTable/EditableTable.component";

let columns = [
  {
    title: "ID",
    dataIndex: "id",
    dataType: "text",
    width: "20%",
    editable: false,
    sorter: {
      compare: (a, b) => a.line - b.line,
    },
  },
  {
    title: "Line Number",
    dataIndex: "line_number",
    dataType: "text",
    width: "60%",
    editable: true,
    sorter: {
      compare: (a, b) => {
        return a.type.localeCompare(b.type);
      },
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
const LineSchema = Yup.object().shape({
  line_number: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function Lines() {
  const { create } = useMutation("lines");
  const [modalAddLinesVisible, setAddLinesModalVisible] = useState(false);

  const originData = useFind("lines");
  const onSubmit = async (values) => {
    create(values).then(() => {
      openNotification(
        "success",
        `Line ${values.line_number} added succesfully!`
      );
      setAddLinesModalVisible(false);
    });
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Lines"
        subTitle="All the lines in the plant"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => setAddLinesModalVisible(true)}
          >
            Add Line
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        title="Add Line"
        centered
        visible={modalAddLinesVisible}
        onOk={() => {
          setAddLinesModalVisible(false);
        }}
        onCancel={() => {
          setAddLinesModalVisible(false);
        }}
        width={1000}
        footer={[]}
      >
        <Formik
          initialValues={{ Line_number: "" }}
          validationSchema={LineSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleSubmit }) => (
            <Form {...layout} onSubmit={handleSubmit}>
              <Form.Item name="line_number" label="Line Number">
                <Input
                  name="line_number"
                  placeholder="Line Number"
                  prefix={<TagOutlined />}
                  value={values.line_number}
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
          service="lines"
        />
      )}
    </div>
  );
}

export default Lines;
