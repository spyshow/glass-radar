import React, { useRef } from "react";
import { useFind } from "figbird";
import { Skeleton } from "antd";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import PrecentageCard from "./../PrecentageCard/PrecentageCard.component";
import "./MachineData.styles.css";

echarts.use([
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer,
]);

dayjs.extend(relativeTime);

const MachineData = ({ machine, timeRange }) => {
  const oldStartDate = dayjs(timeRange[0]).subtract(
    dayjs(timeRange[1]).diff(dayjs(timeRange[0])),
    "milliseconds"
  );
  const chartEl = useRef(null);
  const machineData = useFind("machine-data", {
    query: {
      machine_name: machine.machine_name + "_" + machine["line.line_number"],
      machine_type: machine.type,
      newStartDate: timeRange[0].$d,
      oldStartDate: oldStartDate,
      oldEndDate: timeRange[0].$d,
      newEndDate: timeRange[1].$d,
      machine_sensors: machine.sensors,
      primary: machine.primaryColor,
      secondary: machine.secondaryColor,
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  // machineData : [chart data] , newPrecentage , oldPrecentage

  if (machineData.status !== "success") {
    console.log(machineData);
    return <Skeleton active />;
  } else if (
    machineData.data.data ||
    machineData.data.length === 0 ||
    machineData.data === undefined
  ) {
    console.log(machineData.data);
    return <div>No data</div>;
  }

  return (
    <div>
      {console.log(machineData.data[0])}
      <PrecentageCard
        machine_name={machine.machine_name}
        newPrecentage={machineData.newPrecentage}
        oldPrecentage={machineData.oldPrecentage}
        oldDate={dayjs(timeRange[0].$d).from(oldStartDate, true)}
      />
      <ReactEChartsCore
        echarts={echarts}
        id={machine.machine_name}
        ref={chartEl}
        replaceMerge={["xAxis", "yAxis", "series"]}
        option={machineData.data[0]}
        style={{ height: "600px", width: "100%" }}
        opts={{ renderer: "svg" }}
        notMerge={true}
      />
    </div>
  );
};

export default MachineData;
