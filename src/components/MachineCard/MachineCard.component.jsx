import React, { useRef } from "react";
import { Card, Divider } from "antd";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { TooltipComponent, GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useGet } from "figbird";
import moment from "moment";

import "./MachineCard.styles.css";

echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const MachineCard = ({ machine_id, option }) => {
  const { Meta } = Card;
  const chartEl = useRef(null);
  const newDate = moment().add(1, "hours").hour();
  const oldDate = moment().subtract(5, "hours").hour();
  console.log(newDate, oldDate);
  const machineCard = useGet("machine-card", machine_id, {
    query: {
      machine_id: machine_id,
      newDate: newDate,
      oldDate: oldDate,
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });

  option = option = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },

    grid: {
      top: "3%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "总量",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgba(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
    ],
  };

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
        <h2>MX4 M22</h2> <h1>92.1 ⬆ 7.9</h1>
      </div>
      <Divider style={{ height: "70px" }} type="vertical" />
      <ReactEChartsCore
        echarts={echarts}
        id={machine_id}
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

export default MachineCard;
