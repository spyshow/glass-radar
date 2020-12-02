import React from "react";
import { DatePicker, Skeleton } from "antd";
import moment from "moment";
import { useFind } from "figbird";
const { RangePicker } = DatePicker;

export default function DateRange({ machine, onChange }) {
  const job = useFind("jobs", {
    query: {
      $limit: 1,
      line: machine.data["line.line_number"],
      active: true,
      createdAt: {
        $lt: moment(),
      },
      $sort: {
        createdAt: -1,
      },
    },
  });

  if (job.status !== "success") {
    return <Skeleton active />;
  }
  console.log(job);
  return (
    <RangePicker
      key="5"
      ranges={{
        "This Hour": [moment().subtract(1, "hours"), moment()],
        Day: [moment().startOf("day"), moment().endOf("day")],
        Week: [moment().startOf("week"), moment().endOf("week")],
        month: [moment().startOf("month"), moment().endOf("month")],
        "begining of Job": [job.data.date, moment()],
      }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  );
}
