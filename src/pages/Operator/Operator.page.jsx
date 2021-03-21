import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInterval from "@use-it/interval";
//import { useGet } from "figbird";
import axios from "axios";
import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import { Result, Skeleton } from "antd";
import MoldBox from "../../components/MoldBox/MoldBox.component";
import "./Opertator.styles.css";
//import axios from "axios";
const app = feathers();
const restClient = rest();
app.configure(restClient.axios(axios));
export default function Operator() {
  let { id } = useParams();
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
      url: process.env.REACT_APP_HOSTNAME + "/molds/" + id,
    }).then((result) => {
      console.log(result);
      setMoldData((previousState) => ({
        data: result.data,
      }));
    });
  }
  useInterval(() => {
    getMolds();
  }, 10000);
  let finishedData = [];
  if (moldData.data !== null) {
    for (let i = 0; i < 128; i++) {
      if (moldData.data.rejectedMolds.indexOf(i) > -1) {
        finishedData[i] = { number: i, status: "rejected" };
      } else if (moldData.data.mountedMolds.indexOf(i) > -1) {
        finishedData[i] = { number: i, status: "mounted" };
      } else {
        finishedData[i] = { number: i, status: "not-mounted" };
      }
    }
  }
  console.log(finishedData);
  return (
    <div className="periodic-table">
      {finishedData.map((mold, i) => (
        <MoldBox number={mold.number} status={mold.status} key={i} />
      ))}
    </div>
  );
}
