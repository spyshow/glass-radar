import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "figbird";
import { Skeleton } from "antd";
import MoldBox from "../../components/MoldBox/MoldBox.component";
import "./Opertator.styles.css";
//import axios from "axios";

export default function Operator() {
  let { id } = useParams();
  const molds = useGet("molds", id);
  console.log(molds.status);
  if (molds.status !== "success") {
    return <Skeleton active />;
  } else {
    console.log(id, molds.data);
  }

  // let molds = {
  //   data: {
  //     mountedMolds: [
  //       34,
  //       45,
  //       32,
  //       17,
  //       28,
  //       1,
  //       10,
  //       11,
  //       18,
  //       4,
  //       0,
  //       40,
  //       6,
  //       21,
  //       31,
  //       5,
  //       44,
  //       22,
  //       7,
  //     ],
  //     rejectedMolds: [7],
  //   },
  // };
  // const interval = setInterval(() => {
  //   //getPosts();
  //   console.log(data);
  //   if (status !== "success") {
  //     return <Skeleton active />;
  //   } else {
  //     setMoldData(data);
  //   }
  // }, 1000);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(interval);
  //     console.log("cleaned up");
  //   };
  // }, []);

  // const getMoldData = async () => {
  //   try {
  //     const Data = await axios.get(
  //       process.env.REACT_APP_HOSTNAME + "/molds/" + id
  //     );
  //     console.log(Data);
  //     setMoldData(Data.data); // set State
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   //getPosts();
  //   const interval = setInterval(() => {
  //     //getPosts();
  //     getMoldData();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  //{mountedMolds: ["34", "45", "32", "17", "28", "1", "10", "11", "18", "4", "0", "40", "6", "21", "31", "5", "44", "22", "7"],rejectedMolds: []}
  let data = [];
  for (let i = 0; i < 128; i++) {
    if (molds.data.rejectedMolds.indexOf(i) > -1) {
      data[i] = { number: i, status: "rejected" };
    } else if (molds.data.mountedMolds.indexOf(i) > -1) {
      data[i] = { number: i, status: "mounted" };
    } else {
      data[i] = { number: i, status: "not-mounted" };
    }
  }

  return (
    <div className="periodic-table">
      {}
      {data.map((mold, i) => {
        return (
          <MoldBox number={mold.number} status={mold.status} key={i}></MoldBox>
        );
      })}
    </div>
  );
}
