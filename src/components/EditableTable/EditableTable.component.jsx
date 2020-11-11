/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
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
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  options,
  mode,
  filter,
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "text":
      inputNode = <Input />;
      break;
    case "date":
      inputNode = <DatePicker format="DD/MM/YYYY" />;
      break;
    case "select":
      inputNode = (
        <Select
          tagRender={tagRender}
          options={options}
          mode={mode}
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
    form.setFieldsValue(returnedRecored);
    setEditingKey(record.id);
  };

  const handleDelete = async (record) => {
    await remove(record.id).then((record) => {
      openNotification("success", ` deleted succsefully!`);
    });
  };

  const handleSave = async (record) => {
    try {
      let row = await form.validateFields();
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].editable) {
          row[columns[i].dataIndex] = record[columns[i].dataIndex];
        }
      }
      // row = {
      //   machine_name: record.machine_name,
      //   machine_line: record.machine_line,
      //   ...row,
      // };
      console.log(row);
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
              onClick={() => handleSave(record)}
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
        inputType: col.dataType,
        dataIndex: col.dataIndex,
        mode: col.mode,
        title: col.title,
        editing: isEditing(record),
        filter: col.filter,
        options: col.dataType === "select" ? col.options : null,
      }),
    };
  });
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
