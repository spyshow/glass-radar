import React, { useState } from "react";
import { PageHeader, Skeleton, Button, DatePicker, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useGet } from "figbird";
import * as dayjs from "dayjs";

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
        { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
        { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
      ]);
    }
    setTimeRange(range);
  };

  const onLiveClick = () => {
    setChartMode((prev) => !prev);
  };

  /*************************** */
  /* TODO: [ ]fix when user click clear on time range */
  /*************************** */

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
              "This Hour": [dayjs().subtract(1, "hours"), dayjs()],
              Day: [dayjs().startOf("day"), dayjs().endOf("day")],
              Week: [dayjs().startOf("week"), dayjs().endOf("week")],
              month: [dayjs().startOf("month"), dayjs().endOf("month")],
              "month ago": [],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onRangeChange}
          />,
        ]}
      ></PageHeader>
      {timeRange !== null ? (
        <MachineData
          machine={machine.data}
          machine_name={
            machine.data.machine_name + "_" + machine.data["line.line_number"]
          }
          timeRange={
            timeRange === null || timeRange[0]
              ? timeRange
              : [
                  { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
                  { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
                ]
          }
        />
      ) : (
        <Empty description={<span>Please select a time range</span>} />
      )}
    </div>
  );
};

export default MachinePage;
