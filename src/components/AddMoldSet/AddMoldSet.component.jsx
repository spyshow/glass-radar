import React from "react";
import { Row, Col } from "antd";
import { useMutation } from "figbird";
import openNotification from "../../components/Notification/Notification.component";
import {
  Form,
  Select,
  DatePicker,
  Input,
  SubmitButton,
  ResetButton,
} from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import * as dayjs from "dayjs";

import "./AddMoldSet.styles.css";

const AddMoldSet = ({ ok }) => {
  const { Option } = Select;

  const { create } = useMutation("moldsets");
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
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    vendor: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    status: Yup.string().required("Required"),
    number_of_blanks: Yup.number().required("Required"),
    number_of_blows: Yup.number().required("Required"),
    blank_start_number: Yup.number().required("Required"),
    blows_start_number: Yup.number().required("Required"),
    date_of_reception: Yup.date().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (Number(values.number_of_blanks) > 0) {
      let startNumber = Number(values.blank_start_number);
      if (!values.molds) {
        values.molds = [];
      }
      for (let i = 0; i < Number(values.number_of_blanks); i++) {
        //context.app.service("moldstatus").create({});
        await values.molds.push({
          number: startNumber,
          kind: "blank",
          numberOfTotalGobs: 0,
          status: {
            status: values.status,
            startdate: dayjs(),
          },
          note: "",
        });
        startNumber++; // increment start Number
      }
      startNumber = 0;
    }
    if (Number(values.number_of_blows) > 0) {
      let startNumber = Number(values.blows_start_number);
      if (!values.molds) {
        values.molds = [];
      }
      for (let i = 0; i < Number(values.number_of_blows); i++) {
        //context.app.service("moldstatus").create({});
        await values.molds.push({
          number: startNumber,
          kind: "blow",
          numberOfTotalGobs: 0,
          status: {
            status: values.status,
            startdate: dayjs(),
          },
          note: "",
        });
        startNumber++; // increment start Number
      }
      startNumber = 0;
    }
    create(values).then(() => {
      values.molds = [];
      resetForm();
      ok();
      openNotification("success", `Mold Set ${values.name} added succesfully!`);
    });
  };

  return (
    <div>
      <Formik
        initialValues={{}}
        validationSchema={LineSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit }) => (
          <Form {...layout} onSubmit={handleSubmit}>
            <Form.Item name="name" label="Mold Set Name">
              <Input
                name="name"
                placeholder="Mold Set Name"
                //prefix={}
                value={values.name}
              />
            </Form.Item>
            <Form.Item name="vendor" label="Vendor">
              <Input
                name="vendor"
                placeholder="Vendor"
                //prefix={}
                value={values.vendor}
              />
            </Form.Item>
            <Form.Item name="status" label="Mold Set Status">
              <Select
                defaultActiveFirstOption={true}
                style={{ width: "100%" }}
                name="status"
              >
                <Option value="available">Available</Option>
                <Option value="mounted">Mounted</Option>
                <Option value="unmounted">Unmounted</Option>
                <Option value="in repair local">In Repair Local</Option>
                <Option value="in repair external">In Repair External</Option>
                <Option value="await expertise">Await expertise</Option>
                <Option value="scrapped">Scrapped</Option>
              </Select>
            </Form.Item>
            <Form.Item name="number_of_blanks" label="Number Of Blanks">
              <Input
                name="number_of_blanks"
                placeholder="Number Of Blanks"
                //prefix={}
                value={values.number_of_blanks}
              />
            </Form.Item>
            <Form.Item name="number_of_blows" label="Number Of Blows">
              <Input
                name="number_of_blows"
                placeholder="Number Of Blows"
                //prefix={}
                value={values.number_of_blows}
              />
            </Form.Item>
            <Form.Item name="blank_start_number" label="Blank Start Number">
              <Input
                name="blank_start_number"
                placeholder="Blows Start Number"
                //prefix={}
                value={values.blank_start_number}
              />
            </Form.Item>
            <Form.Item name="blows_start_number" label="Blows Start Number">
              <Input
                name="blows_start_number"
                placeholder="Blows Start Number"
                //prefix={}
                value={values.blows_start_number}
              />
            </Form.Item>
            <Form.Item name="date_of_reception" label="Date of Reciption">
              <DatePicker
                name="date_of_reception"
                //prefix={}
                onChange={(date, dateString) =>
                  (values.date_of_reception = date)
                }
                format="DD/MM/YYYY"
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
    </div>
  );
};
export default AddMoldSet;
