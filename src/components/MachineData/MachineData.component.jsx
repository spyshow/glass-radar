import React, { useRef } from "react";
import { useFind } from "figbird";
import { Skeleton } from "antd";
import ReactEcharts from "echarts-for-react";
import moment from "moment";

import PrecentageCard from "./../PrecentageCard/PrecentageCard.component";
import "./MachineData.styles.css";

const MachineData = ({
  machine_name,
  machine_type,
  machine_sensors,
  timeRange,
}) => {
  console.log(machine_name, machine_sensors, timeRange);
  const chartEl = useRef(null);
  const machineData = useFind("machine-data", {
    query: {
      machine_name: machine_name,
      machine_type: machine_type,
      startDate: timeRange[0]._d,
      oldStartDate: moment(timeRange[0]).subtract(
        moment(timeRange[1]).diff(moment(timeRange[0])),
        "milliseconds"
      ),
      oldEndDate: timeRange[0]._d,
      endDate: timeRange[1]._d,
      machine_sensors: machine_sensors,
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  // machineData : [chart data] , newPrecentage , oldPrecentage
  console.log(machineData.status);
  if (machineData.status !== "success") {
    return <Skeleton active />;
  } else if (machineData.data.data || machineData.data.length === 0) {
    return <div>No data</div>;
  }
  console.log(machineData.oldPrecentage, machineData.newPrecentage);
  return (
    <div>
      <PrecentageCard
        machine_name={machine_name}
        newPrecentage={machineData.newPrecentage}
        oldPrecentage={machineData.oldPrecentage}
      />
      <ReactEcharts
        id={machine_name}
        ref={chartEl}
        option={machineData.data[0]}
        style={{ height: "600px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default MachineData;
