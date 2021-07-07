import React, { useRef } from "react";
import { Card, Divider, Skeleton } from "antd";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useGet } from "figbird";
import moment from "moment";

import "./MachineCard.styles.css";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
]);

const MachineCard = ({ lineId, machineId, machineName, index, option }) => {
  const { Meta } = Card;
  const chartEl = useRef(null);
  const oldDate = moment().subtract(5, "hours").hour();
  index = index ? index : null;
  // const machineCard = useGet("machine-card", machineId, {
  //   query: {
  //     machineId: machineId,
  //     machine_name: machineName,
  //     lineId: lineId,
  //     oldDate: oldDate,
  //     index: index,
  //     echarts: echarts,
  //   },
  //   realtime: "refetch",
  //   fetchPolicy: "network-only",
  // });
  // console.log(machineCard.status);
  // if (machineCard.status !== "success") {
  //   return <Skeleton active />;
  // } else if (
  //   machineCard.data.data ||
  //   machineCard.data.length === 0 ||
  //   machineCard.data === undefined
  // ) {
  //   return <div>No data</div>;
  // }
  // console.log(machineCard.data);

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
        {/* <h1>
          {machineCard.data.accepted}{" "}
          {machineCard.data.percentage === "down" ? (
            <ArrowDownOutlined style={{ fontSize: "1rem", color: "#cf1322" }} />
          ) : (
            <ArrowUpOutlined style={{ fontSize: "1rem", color: "#3f8600" }} />
          )}{" "}
          {machineCard.data.rejected}
        </h1> */}
      </div>
      <Divider style={{ height: "70px" }} type="vertical" />
      <ReactEChartsCore
        echarts={echarts}
        id={machineId}
        ref={chartEl}
        replaceMerge={["xAxis", "yAxis", "series"]}
        option={option}
        style={{ height: "150px", width: "150px", display: "inline-block" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
      />
    </Card>
  );
};

export default MachineCard;
