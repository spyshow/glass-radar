import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "figbird";
import { Skeleton } from "antd";

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

  return (
    <div>
      {molds.status === "success"
        ? molds.data.mountedMolds.map((mold, i) => {
            return <h1 key={i}>{mold}</h1>;
          })
        : null}
      <h1>useEffect</h1>
      <ul></ul>
    </div>
  );
}
