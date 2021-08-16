import React, { useRef } from "react";
import { Card, Divider, Skeleton } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { useGet } from "figbird";

import "./MachineChart.styles.css";

const { Meta } = Card;

const MachineChart = ({ key, machineName, machineId, lineId, index }) => {
  const chartEl = useRef(null);
  const machineCard = useGet("machine-card", machineId, {
    query: {
      machineId: machineId,
      machine_name: machineName,
      lineId: lineId,
      index: index,
      echarts: echarts,
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  console.log(machineCard.status);
  if (machineCard.status !== "success") {
    return <Skeleton active />;
  } else if (
    machineCard.data.data ||
    machineCard.data.length === 0 ||
    machineCard.data === undefined
  ) {
    return <div>No data</div>;
  }
  console.log(machineCard.data);

  return (
    <Card
      hoverable
      bordered
      bodyStyle={{
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        flex: "0 1 calc(25% - 1em)",
      }}
    >
      <Meta className="card" />
      <div>
        <h2>{machineName}</h2>{" "}
        <h1>
          {machineCard.data.accepted}{" "}
          {machineCard.data.percentage === "down" ? (
            <ArrowDownOutlined style={{ fontSize: "1rem", color: "#cf1322" }} />
          ) : (
            <ArrowUpOutlined style={{ fontSize: "1rem", color: "#3f8600" }} />
          )}{" "}
          {machineCard.data.rejected}
        </h1>
      </div>
      <Divider style={{ height: "70px" }} type="vertical" />
      <ReactEChartsCore
        echarts={echarts}
        id={machineCard.data.id}
        ref={chartEl}
        replaceMerge={["xAxis", "yAxis", "series"]}
        option={machineCard.data.option}
        style={{ height: "70px", width: "150px", display: "inline-block" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
      />
    </Card>
  );
};

export default MachineChart;
