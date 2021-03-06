import React, { useState, useRef } from "react";
import { PageHeader, Skeleton, Button, DatePicker, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useFind } from "figbird";
import moment from "moment-timezone/builds/moment-timezone-with-data";

import JobCard from "../../components/JobCard/JobCard.component";
import LineChartComponent from "../../components/LineChartComponent/LineChartComponent.component";

const Line = () => {
  let { id } = useParams();
  const { RangePicker } = DatePicker;
  const machines = useFind("machines", {
    query: {
      lineId: id,
    },
  });
  const [timeRange, setTimeRange] = useState([
    moment().format("YYYY/MM/DD HH:mm:ss"),
    moment().format("YYYY/MM/DD HH:mm:ss"),
  ]);
  console.log(machines.status);
  if (machines.status !== "success") {
    return <Skeleton active />;
  }
  console.log(machines);
  const onRangeChange = (range) => {
    if (range === null) {
      setTimeRange([
        { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
        { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
      ]);
    }
    setTimeRange(range);
  };
  console.log(moment().subtract(1, "hours").format("YYYY/MM/DD HH:mm:ss"));
  return (
    <div>
      {" "}
      <PageHeader
        ghost={false}
        title={machines.data[0]["line.line_number"]}
        subTitle="Line Precentage"
        extra={[
          <RangePicker
            key="5"
            ranges={{
              "This Hour": [
                moment(
                  moment().subtract(1, "hours").format("YYYY/MM/DD HH:mm:ss")
                ),
                moment(moment().format("YYYY/MM/DD HH:mm:ss")),
              ],
              Day: [
                moment(moment().startOf("day").format("YYYY/MM/DD HH:mm:ss")),
                moment(moment().endOf("day").format("YYYY/MM/DD HH:mm:ss")),
              ],
              Week: [
                moment(moment().startOf("week").format("YYYY/MM/DD HH:mm:ss")),
                moment(moment().endOf("week").format("YYYY/MM/DD HH:mm:ss")),
              ],
              month: [
                moment(moment().startOf("month").format("YYYY/MM/DD HH:mm:ss")),
                moment(moment().endOf("month").format("YYYY/MM/DD HH:mm:ss")),
              ],
              "month ago": [],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onRangeChange}
          />,
        ]}
      />
      {timeRange !== null ? (
        <LineChartComponent
          id={id}
          timeRange={
            timeRange === null || timeRange[0]
              ? timeRange
              : [
                  { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
                  { _d: moment().format("YYYY/MM/DD HH:mm:ss") },
                ]
          }
        />
      ) : (
        <Empty description={<span>Please select a time range</span>} />
      )}
    </div>
  );
};

export default Line;
