import React from "react";
import { Table, Button, Popconfirm } from "antd";
import { useMutation } from "figbird";
import * as dayjs from "dayjs";

import {
  AiFillTool,
  AiOutlineCheck,
  AiOutlineSolution,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { GiFactory, GiTrashCan } from "react-icons/gi";
import openNotification from "../Notification/Notification.component";

import "./MoldSetTableView.styles.css";

export default function MoldSetTableView({ moldsets }) {
  const { patch, remove } = useMutation("moldsets");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => {
          return a.name.localeCompare(b.name);
        },
        multiple: 1,
      },
    },
    {
      title: "No. of Blanks",
      dataIndex: "number_of_blanks",
      key: "number_of_blanks",
      sorter: {
        compare: (a, b) => a.number_of_blanks - b.number_of_blanks,
      },
      multiple: 4,
    },
    {
      title: "No. of Blows",
      dataIndex: "number_of_blows",
      key: "number_of_blows",
      sorter: {
        compare: (a, b) => a.number_of_blows - b.number_of_blows,
      },
      multiple: 5,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a, b) => {
          return a.status.localeCompare(b.status);
        },
        multiple: 2,
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      sorter: {
        compare: (a, b) => {
          return a.vendor.localeCompare(b.vendor);
        },
        multiple: 3,
      },
    },
    {
      title: "Date of Reception",
      dataIndex: "date_of_reception",
      key: "date_of_reception",
      sorter: (a, b) => dayjs(a.date_of_reception) - dayjs(b.date_of_reception),
      render: (date_of_reception) =>
        dayjs(date_of_reception).format("DD/MM/YYYY"),
    },
    {
      title: "Date of Scrap",
      dataIndex: "date_of_scrap",
      key: "date_of_scrap",
      sorter: (a, b) => dayjs(a.date_of_scrap) - dayjs(b.date_of_scrap),
      render: (date_of_scrap) =>
        date_of_scrap
          ? dayjs(date_of_scrap).format("DD/MM/YYYY")
          : "not scrapped yet",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleScrap([record])}
          >
            <a>Scrap</a>
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete([record.id])}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const handleDelete = async (record) => {
    await remove(null, {
      query: { id: { $in: record } },
    }).then((record) => {
      openNotification("success", ` deleted succsefully!`);
    });
  };

  const handleScrap = async (record) => {
    /* we will update all the molds to scrapped using hooks*/
    let molds = [];
    let data = record[0].molds.map((mold, index) => {
      molds.push({ moldId: mold.status[0].moldId });
    });
    if (record[0].status !== "unmounted") {
      openNotification(
        "error",
        record[0].name + ` have to be unmounted to scrap!`
      );
    } else {
      await patch(
        record[0].id,
        {
          status: "scrapped",
          date_of_scrap: new Date(),
          moldsData: molds,
        },
        {}
      ).then(() => {
        openNotification("success", record[0].name + ` Scrapped succsefully!`);
      });
    }
  };

  moldsets.data.forEach((moldset) => {
    moldset.key = moldset.id;
  });

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Table
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      columns={columns}
      pagination={{
        showTotal: (record) => (
          <Button
            type="danger"
            onClick={() => {
              handleDelete(selectedRowKeys);
            }}
            disabled={!hasSelected}
            className="delete"
          >
            Delete
          </Button>
        ),
      }}
      expandable={{
        expandedRowRender: (record) => (
          <div className="main-status-container">
            <div className="avaliable">
              <AiOutlineCheck color="green" size="1.5em" />

              {`Available: ${record.moldStatus.available}`}
            </div>
            <div className="mounted">
              <GiFactory color="purple" size="1.5em" />

              {`Mounted: ${record.moldStatus.mounted}`}
            </div>
            <div className="unmounted">
              <AiOutlineExclamationCircle size="1.5em" color="red" />

              {`Unmounted: ${record.moldStatus.unmounted}`}
            </div>
            <div className="inrepair">
              <AiFillTool size="1.5em" color="blue" />

              {`In Repair: ${
                record.moldStatus.inrepairlocal +
                record.moldStatus.inrepairexternal
              }`}
            </div>
            <div className="awaitExpertise">
              <AiOutlineSolution size="1.5em" color="orange" />

              {`Await Expertise: ${record.moldStatus.awaitexpertise}`}
            </div>
            <div className="scrapped">
              <GiTrashCan color="gray" size="1.5em" />

              {`scrapped:  ${record.moldStatus.scrapped}`}
            </div>
          </div>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={moldsets.data}
    />
  );
}
