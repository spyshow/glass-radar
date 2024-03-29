import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useInterval from "@use-it/interval";
import { useFind } from "figbird";
import axios from "axios";
import { Skeleton } from "antd";
import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import { Typography } from "antd";

import MachineChart from "../../components/MachineChart/MachineChart.component";
import MoldBox from "../../components/MoldBox/MoldBox.component";
import "./Opertator.styles.css";

//import axios from "axios";

const app = feathers();
const { Title } = Typography;
const restClient = rest();
app.configure(restClient.axios(axios));

export default function Operator() {
  let { machineId, lineId } = useParams();
  const machines = useFind("machines", {
    query: {
      lineId: lineId,
      $sort: {
        sequence: 1,
      },
    },
  });

  const [moldData, setMoldData] = useState({
    data: { mountedMolds: [], rejectedMolds: [] },
  });

  // const molds = useGet("molds", id);
  // setMoldData((previousState) => ({
  //   ...previousState,
  //   data: molds.data,
  // }));
  function getMolds() {
    axios({
      method: "get",
      url: process.env.REACT_APP_HOSTNAME + "/scanmolds/" + machineId,
    }).then((result) => {
      setMoldData((previousState) => ({
        ...previousState.data,
        data: result.data,
      }));
    });
  }

  useInterval(() => {
    getMolds();
  }, 10000);
  let finishedData = [];
  if (moldData.data?.mountedMolds.length !== 0) {
    for (let i = 0; i < moldData.data.mountedMolds.length; i++) {
      if (moldData.data.mountedMolds[i] === 0) {
        continue;
      } else if (
        moldData.data.rejectedMolds.indexOf(moldData.data.mountedMolds[i]) > -1
      ) {
        finishedData[i] = {
          number: moldData.data.mountedMolds[i],
          status: "rejected",
        };
      } else {
        finishedData[i] = {
          number: moldData.data.mountedMolds[i],
          status: "mounted",
        };
      }
    }
  }
  if (machines.status !== "success") {
    return <Skeleton active />;
  }

  return (
    <div>
      <Title level={2}>Operator Panel</Title>
      <div className="cards">
        {machines.data.map((machine, i) => (
          <MachineChart
            key={lineId + "_" + machine.machine_name}
            machineName={machine.machine_name}
            machineId={machine.id}
            lineId={lineId}
            index={i}
          />
        ))}
      </div>

      {finishedData.length > 0 ? (
        <div className="periodic-table">
          {finishedData.map((mold, i) => (
            <MoldBox number={mold.number} status={mold.status} key={i} />
          ))}
        </div>
      ) : (
        <Skeleton active avatar={false} paragraph={{ rows: 4 }} />
      )}
    </div>
  );
}
