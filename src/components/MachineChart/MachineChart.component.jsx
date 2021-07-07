import React, { useRef } from "react";
import { Card, Divider, Skeleton } from "antd";

import "./MachineChart.styles.css";

const { Meta } = Card;
const chartEl = useRef(null);

const MachineChart = ({ option }) => {
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
        <h2>{option.id}</h2>{" "}
        <h1>
          {option.data.accepted}{" "}
          {option.data.percentage === "down" ? (
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
        id={option.id}
        ref={chartEl}
        replaceMerge={["xAxis", "yAxis", "series"]}
        option={option}
        style={{ height: "70px", width: "150px", display: "inline-block" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
      />
    </Card>
  );
};

export default MachineChart;
