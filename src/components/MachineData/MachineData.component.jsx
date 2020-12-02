import React, { useRef } from "react";
import { useFind } from "figbird";
import { Skeleton } from "antd";
import ReactEcharts from "echarts-for-react";

const MachineData = ({ machine_name, machine_sensors, timeRange }) => {
  const chartEl = useRef(null);
  const machineData = useFind("machine-data", {
    query: {
      machine_name: machine_name,
      startDate: timeRange[0]._d,
      endDate: timeRange[1]._d,
      machine_sensors: machine_sensors,
    },
    realtime: "refetch",
  });
  console.log(machineData);
  if (machineData.status !== "success") {
    return <Skeleton active />;
  } else if (machineData.data.data || machineData.data.length === 0) {
    return <div>No data</div>;
  }
  return (
    <ReactEcharts
      id={machine_name}
      ref={chartEl}
      option={machineData.data[0]}
      style={{ height: "600px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default MachineData;
