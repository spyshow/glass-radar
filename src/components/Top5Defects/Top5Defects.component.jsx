import React from "react";
import { Table, Skeleton, Space } from "antd";
import { useGet } from "figbird";

import "./Top5Defects.styles.css";

export default function Top5Defects({ id, timeRange }) {
  console.log(
    "top5",
    timeRange[0].format("YYYY/MM/DD HH:mm:ss"),
    timeRange[1].format("YYYY/MM/DD HH:mm:ss")
  );
  const top5Defects = useGet("top-5-defects", id, {
    query: {
      newStartDate: timeRange[0].format("YYYY/MM/DD HH:mm:ss"),
      newEndDate: timeRange[1].format("YYYY/MM/DD HH:mm:ss"),
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  console.log("31", top5Defects);
  if (top5Defects.status !== "success") {
    return <Skeleton active />;
  } else if (top5Defects.data.length === 0 || top5Defects.data === undefined) {
    return <div>No data</div>;
  }

  const columns = [
    {
      title: "Defect",
      dataIndex: "defect",
      key: "defect",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
    },
    {
      title: "% of rejection",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <Space direction="vertical">
      <Table
        pagination={{ hideOnSinglePage: true }}
        columns={columns}
        dataSource={top5Defects.data.data}
      />
    </Space>
  );
}
