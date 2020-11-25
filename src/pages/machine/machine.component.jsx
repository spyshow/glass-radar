import React, { useState } from "react";
import { PageHeader, Skeleton, Button, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import { useGet } from "figbird";
import moment from "moment-timezone/builds/moment-timezone-with-data";

import MachineData from "../../components/MachineData/MachineData.component";

import "./machine.styles.css";

const MachinePage = () => {
  let { id } = useParams();
  const { RangePicker } = DatePicker;
  const machine = useGet("machines", id);
  const [chartMode, setChartMode] = useState("");
  const [timeRange, setTimeRange] = useState([]);
  if (machine.status !== "success") {
    return <Skeleton active />;
  }

  const onRangeChange = (range) => {
    if (range === null) {
      setTimeRange([
        { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
        { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
      ]);
    }
    setTimeRange(range);
  };

  const onLiveClick = () => {
    setChartMode((prev) => !prev);
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        title={
          machine.data.machine_name + "_" + machine.data["line.line_number"]
        }
        subTitle="Rejection Precentage"
        extra={[
          <Button
            className={chartMode ? "button-live" : null}
            type="dashed"
            key="1"
            danger
            onClick={onLiveClick}
          >
            Live
          </Button>,
          <RangePicker
            key="5"
            ranges={{
              "This Hour": [moment().subtract(1, "hours"), moment()],
              Day: [moment().startOf("day"), moment().endOf("day")],
              Week: [moment().startOf("week"), moment().endOf("week")],
              month: [moment().startOf("month"), moment().endOf("month")],
              "month ago": [],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onRangeChange}
          />,
        ]}
      ></PageHeader>
      <MachineData
        machine_name={
          machine.data.machine_name + "_" + machine.data["line.line_number"]
        }
        machine_sensors={machine.data.sensors}
        timeRange={
          timeRange[0]
            ? timeRange
            : [
                { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
                { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
              ]
        }
      />
    </div>
  );
};

export default MachinePage;
