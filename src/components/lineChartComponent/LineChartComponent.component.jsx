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

echarts.use([
  LineChart,
  SVGRenderer,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
]);

const LineChartComponent = ({ id, timeRange }) => {
  const oldStartDate = moment(timeRange[0]).subtract(
    moment(timeRange[1]).diff(moment(timeRange[0])),
    "milliseconds"
  );
  const chartEl = useRef(null);
  const lineData = useGet("line-data", id, {
    query: {
      machine: "PALLETIZER",
      newStartDate: timeRange[0]._d,
      oldStartDate: oldStartDate,
      oldEndDate: timeRange[0]._d,
      newEndDate: timeRange[1]._d,
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
    return option.id === "MCAL4";
  });
  console.log(palletizerOption);
  return (
    <div>
      {palletizerOption[0].series[0].data.length !== 0 ? (
        <ReactEChartsCore
          echarts={echarts}
          id={lineData.data["line.line_number"]}
          ref={chartEl}
          replaceMerge={["xAxis", "yAxis", "series"]}
          option={palletizerOption[0]}
          style={{ height: "600px", width: "100%" }}
          opts={{ renderer: "svg" }}
          notMerge={false}
        />
      ) : (
        <Empty description={<span>Please select a time range</span>} />
      )}

      {/*  < machines={machines} />  */}
    </div>
  );
};

export default LineChartComponent;
