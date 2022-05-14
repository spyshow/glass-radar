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
import { CanvasRenderer } from "echarts/renderers";
//import { SVGRenderer } from "echarts/renderers";
import * as dayjs from "dayjs";

import MachineCard from "../MachineCard/MachineCard.component";

import "./LineChartComponent.styles.css";

echarts.use([
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
]);

const LineChartComponent = ({ id, timeRange }) => {
  console.log("28", timeRange);
  const oldStartDate = dayjs(timeRange[0]).subtract(
    dayjs(timeRange[1]).diff(dayjs(timeRange[0])),
    "milliseconds"
  );
  console.log(oldStartDate.format("YYYY/MM/DD HH:mm:ss"));

  const chartEl = useRef(null);
  const lineData = useGet("line-data", id, {
    query: {
      newStartDate: dayjs(timeRange[0]),
      newEndDate: dayjs(timeRange[1]),
      oldStartDate: oldStartDate,
      oldEndDate: dayjs(timeRange[0]),
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
  console.log("linedata", lineData);

  let palletizerOption = lineData.data.options.filter((option) => {
    return option.type === "MCAL4";
  });
  console.log(lineData);
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
            opts={{ renderer: "canvas" }}
            notMerge={true}
          />
          {lineData.data.options.map((option) => {
            if (option.id !== "Palletizer") {
              return <MachineCard option={option} machineName={option.id} />;
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
