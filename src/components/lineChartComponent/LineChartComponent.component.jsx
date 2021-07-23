import React, { useRef } from "react";
import { Skeleton, Empty } from "antd";
import { useGet } from "figbird";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import {
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
//import { CanvasRenderer } from "echarts/renderers";
import { SVGRenderer } from "echarts/renderers";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import MachineCard from "../MachineCard/MachineCard.component";

import "./LineChartComponent.styles.css";

echarts.use([
  LineChart,
  SVGRenderer,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
]);

const LineChartComponent = ({ id, timeRange }) => {
  console.log(timeRange);
  const oldStartDate = moment(timeRange[0]).subtract(
    moment(timeRange[1]).diff(moment(timeRange[0])),
    "milliseconds"
  );
  console.log(oldStartDate.format("YYYY/MM/DD HH:mm:ss"));

  const chartEl = useRef(null);
  const lineData = useGet("line-data", id, {
    query: {
      machine: "MUTI4",
      newStartDate: moment(timeRange[0]).format("YYYY/MM/DD HH:mm:ss"),
      newEndDate: moment(timeRange[1]).format("YYYY/MM/DD HH:mm:ss"),
      oldStartDate: oldStartDate.format("YYYY/MM/DD HH:mm:ss"),
      oldEndDate: moment(timeRange[0]).format("YYYY/MM/DD HH:mm:ss"),
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  console.log(lineData.status);
  if (lineData.status !== "success") {
    return <Skeleton active />;
  } else if (
    lineData.data.data ||
    lineData.data.length === 0 ||
    lineData.data === undefined
  ) {
    return <div>No data</div>;
  }
  let palletizerOption = lineData.data.options.filter((option) => {
    return option.id === "MULTI4";
  });
  console.log(lineData.data);
  return (
    <div className="container">
      {palletizerOption[0] &&
      palletizerOption[0].series[0].data.length !== 0 ? (
        <>
          <ReactEChartsCore
            echarts={echarts}
            id={lineData.data["line.line_number"]}
            ref={chartEl}
            replaceMerge={["xAxis", "yAxis", "series"]}
            option={palletizerOption[0]}
            style={{ height: "600px", width: "100%" }}
            opts={{ renderer: "svg" }}
            notMerge={true}
          />
          {lineData.data.options.map((option) => {
            if (option.id !== "Palletizer") {
              return <MachineCard option={option} />;
            }
          })}
        </>
      ) : (
        <Empty description={<span>Please select a proper time range</span>} />
      )}
    </div>
  );
};

export default LineChartComponent;
