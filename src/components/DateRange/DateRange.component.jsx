import React from "react";
import { DatePicker } from "./components";
import { Skeleton } from "antd";
import * as dayjs from "dayjs";
import { useFind } from "figbird";
const { RangePicker } = DatePicker;

export default function DateRange({ machine, onChange }) {
  const job = useFind("jobs", {
    query: {
      $limit: 1,
      line: machine.data["line.line_number"],
      active: true,
      createdAt: {
        $lt: dayjs(),
      },
      $sort: {
        createdAt: -1,
      },
    },
  });

  if (job.status !== "success") {
    return <Skeleton active />;
  }
  return (
    <RangePicker
      key="5"
      ranges={{
        "This Hour": [dayjs().subtract(1, "hours"), dayjs()],
        Day: [dayjs().startOf("day"), dayjs().endOf("day")],
        Week: [dayjs().startOf("week"), dayjs().endOf("week")],
        month: [dayjs().startOf("month"), dayjs().endOf("month")],
        "begining of Job": [job.data.date, dayjs()],
      }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  );
}
