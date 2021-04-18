import React, { useState } from "react";
import { Card, Button, Skeleton, Modal } from "antd";
import { useFind } from "figbird";

import PdfView from "../../components/PdfView/PdfView.component";
import "./JobCard.styles.css";

function JobCard({ lineId }) {
  const [jobOnLink, setJobOnLink] = useState("");
  const [jobOnVisible, setJobOnVisible] = useState(false);

  const job = useFind("jobs", {
    query: {
      active: false,
      line: lineId,
      $sort: {
        createdAt: -1,
      },
      $limit: 1,
    },
    realtime: "refetch",
    fetchPolicy: "network-only",
  });
  console.log(job);
  if (job.status !== "success") {
    return <Skeleton active />;
  } else if (job.data.data || job.data.length === 0 || job.data === undefined) {
    return <div>No data</div>;
  }
  return (
    <div className="cards">
      <Modal
        title="Job "
        centered
        visible={jobOnVisible}
        onOk={() => {
          setJobOnVisible(false);
        }}
        onCancel={() => {
          setJobOnVisible(false);
          setJobOnLink("");
        }}
        closable
        afterClose={() => setJobOnLink("")}
        width={1000}
        footer={[]}
      >
        <PdfView file={jobOnLink} />
      </Modal>
      <div className="card">
        Job Name : <b>{job.data[0].name}</b>
      </div>
      <div className="card">
        Starting Date : <b>{job.data[0].date}</b>
      </div>
      <div className="card">
        Total : <b>85%</b>
      </div>
      <div className="card">
        total order : <b>{job.data[0].total_ordered}</b>
      </div>
      <div className="card">
        total backed : <b>50060</b>
      </div>
      <div className="card">
        <Button
          className="job-on"
          type="link"
          onClick={() => {
            setJobOnLink(
              process.env.REACT_APP_HOSTNAME + "/uploads/" + job.data[0].job_on
            );
            setJobOnVisible(true);
          }}
        >
          Job on Document
        </Button>
      </div>
    </div>
  );
}

export default JobCard;
