import React, { useState, useRef } from "react";
import { PageHeader, Skeleton, Button, DatePicker, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useFind } from "figbird";
import moment from "moment-timezone/builds/moment-timezone-with-data";

import JobCard from "../../components/JobCard/JobCard.component";
import LineChartComponent from "../../components/lineChartComponent/LineChartComponent.component";

const Line = () => {
  let { id } = useParams();
  const { RangePicker } = DatePicker;
  const machines = useFind("machines", {
    query: {
      lineId: id,
    },
  });
  const [timeRange, setTimeRange] = useState([
    moment(),
    moment(),
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
