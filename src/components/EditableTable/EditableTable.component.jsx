/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Table,
  Input,
  DatePicker,
  InputNumber,
  Popconfirm,
  Form,
  Select,
  Spin,
  Tag,
  Checkbox,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "figbird";

import openNotification from "../Notification/Notification.component";
import "./EditableTable.styles.css";
const { Option } = Select;

function tagRender(props) {
  console.log(props);
  const { label, color, closable, onClose } = props;

  return (
    <Tag
      color={color}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

let filterOption = (input, option) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const EditableCell = ({
  editing,
  active,
  dataIndex,
  title,
  inputType,
  record,
  index,
  date,
  children,
  options,
  mode,
  filter,
  forigin,
  ...restProps
}) => {
  const d = date
    ? date["_d"]
    : "Sun Mar 07 2021 09:16:31 GMT+0200 (Eastern European Standard Time)";
  let inputNode;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "text":
      inputNode = <Input />;
      break;
    /*************************** */
    /* TODO: [ ]edit date not good :  https://github.com/Hacker0x01/react-datepicker/issues/1120/
    /*************************** */
    case "boolean":
      inputNode = <Checkbox defaultChecked={active} checked={!active} />;
      break;
    case "date":
      inputNode = (
        <DatePicker
          title="date"
          defaultPickerValue={date}
          format="DD/MM/YYYY"
        />
      );
      break;
    case "select":
      inputNode = (
        <Select
          tagRender={tagRender}
          options={options}
          mode={mode}
          forigin={forigin}
          style={{ width: "100%" }}
          showArrow
          showSearch={filter ? true : false}
          optionFilterProp={filter ? "child" : null}
          filterOption={
            filter ? (input, option) => filterOption(input, option) : null
          }
        ></Select>
      );
      break;
    default:
      break;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ originData, originColumns, service }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const { status, patch, remove } = useMutation(service);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    let returnedRecored = {};
    for (let i = 0; i < columns.length; i++) {
      returnedRecored[columns[i].dataIndex] = record[columns[i].dataIndex];
    }
    console.log(returnedRecored);
    form.setFieldsValue(returnedRecored);
    setEditingKey(record.id);
  };

  const handleDelete = async (record) => {
    await remove(record.id).then((record) => {
      openNotification("success", ` deleted succsefully!`);
    });
  };

  const handleSave = async (record) => {
    console.log(record);
    try {
      let row = await form.validateFields();
      for (let i = 0; i < columns.length; i++) {
        //to include non editable data to the data sent to the backend ( because mybay it's not-null in the database)
        if (!columns[i].editable) {
          row[columns[i].dataIndex] = record[columns[i].dataIndex];
        }
        if (columns[i].forigin) {
          //to check if the line column updated
          if (Number(row["line.line_number"])) {
            //if the line column updated then make a new key "lineId" and assign the "line.line_number to it"
            row["lineId"] = row["line.line_number"];
          }
        }
      }
      // row = {
      //   machine_name: record.machine_name,
      //   machine_line: record.machine_line,
      //   ...row,
      // };
      patch(record.id, row);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  let columns = [
    ...originColumns,
    {
      title: "operation",
      dataIndex: "operation",
      dataType: "text",
      render: (_, record) => {
        console.log(record);
        const editable = isEditing(record);
        return editable ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <a
              // eslint-disable-next-line no-script-url
              href="javascript:void;"
              onClick={() => {
                console.log(record.active);
                handleSave(record);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <a disabled={editingKey !== ""} onClick={() => edit(record)}>
              <EditOutlined />
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <a style={{ marginLeft: "15px" }}>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        active: record.active,
        inputType: col.dataType,
        dataIndex: col.dataIndex,
        mode: col.mode,
        date: col.date,
        forigin: col.forigin,
        title: col.title,
        editing: isEditing(record),
        filter: col.filter,
        options: col.dataType === "select" ? col.options : null,
      }),
    };
  });
  console.log(originData.data);
  return (
    <Spin spinning={status === "loading" ? true : false}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowKey={(record) => {
            return record.id;
          }}
          dataSource={originData.data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Spin>
  );
};

export default EditableTable;
