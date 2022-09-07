import React, { useState } from "react";
import { PageHeader, Skeleton, DatePicker, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useFind } from "figbird";
import * as dayjs from "dayjs";

//import JobCard from "../../components/JobCard/JobCard.component";
import LineChartComponent from "../../components/LineChartComponent/LineChartComponent.component";
import Top5Defects from "../../components/Top5Defects/Top5Defects.component";
const Line = () => {
  let { id, name } = useParams();
  const { RangePicker } = DatePicker;
  const machines = useFind("machines", {
    query: {
      lineId: id,
      $sort: {
        sequence: 1,
      },
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  const [timeRange, setTimeRange] = useState([
    dayjs().subtract(1, "hours"),
    dayjs(),
  ]);
  if (machines.status !== "success") {
    return <Skeleton active />;
  }
  const onRangeChange = (range) => {
    if (range === null) {
      setTimeRange([{ $d: dayjs().subtract(1, "hours") }, { $d: dayjs() }]);
    }
    setTimeRange(range);
  };
  console.log(machines);
  return (
    <div>
      {machines.data.length === 0 ? (
        <>
          <PageHeader ghost={false} title={name} subTitle="Line Precentage" />
          <Empty description={<span>Please add a machine and start it</span>} />
        </>
      ) : (
        <>
          <PageHeader
            ghost={false}
            title={machines.data[0]["line.line_number"]}
            subTitle="Line Precentage"
            extra={[
              <RangePicker
                key="5"
                ranges={{
                  "This Hour": [
                    dayjs(
                      dayjs().subtract(1, "hours").format("YYYY/MM/DD HH:mm:ss")
                    ),
                    dayjs(dayjs().format("YYYY/MM/DD HH:mm:ss")),
                  ],
                  Day: [
                    dayjs(dayjs().startOf("day").format("YYYY/MM/DD HH:mm:ss")),
                    dayjs(dayjs().endOf("day").format("YYYY/MM/DD HH:mm:ss")),
                  ],
                  Week: [
                    dayjs(
                      dayjs().startOf("week").format("YYYY/MM/DD HH:mm:ss")
                    ),
                    dayjs(dayjs().endOf("week").format("YYYY/MM/DD HH:mm:ss")),
                  ],
                  month: [
                    dayjs(
                      dayjs().startOf("month").format("YYYY/MM/DD HH:mm:ss")
                    ),
                    dayjs(dayjs().endOf("month").format("YYYY/MM/DD HH:mm:ss")),
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
            <div>
              <LineChartComponent
                id={id}
                timeRange={
                  timeRange === null || timeRange[0]
                    ? timeRange
                    : [
                        { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
                        {
                          $d: dayjs().format("YYYY/MM/DD HH:mm:ss"),
                        },
                      ]
                }
              />
              <Top5Defects
                id={id}
                timeRange={
                  timeRange === null || timeRange[0]
                    ? timeRange
                    : [
                        { $d: dayjs().format("YYYY/MM/DD HH:mm:ss") },
                        {
                          $d: dayjs().format("YYYY/MM/DD HH:mm:ss"),
                        },
                      ]
                }
              />
            </div>
          ) : (
            <Empty description={<span>Please select a time range</span>} />
          )}
        </>
      )}
    </div>
  );
};

export default Line;
