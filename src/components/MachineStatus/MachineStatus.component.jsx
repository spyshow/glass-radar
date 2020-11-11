import React from "react";
import { useGet } from "figbird";
import { Badge } from "antd";

//badge input : sevice , name(${machine_name}_${machine_line})
const MachineStatus = ({ service, name, index }) => {
  const { data, status, error } = useGet(service, index, {
    query: { name: name },
  });
  console.log(data);
  if (error) return "Failed to load resource Machine Status";
  return status === "loading" ? (
    "Loading..."
  ) : data.status ? (
    <Badge key={index} color="green" status="processing" text="Initilized" />
  ) : (
    <Badge key={index} status="error" text="Not Initilized" />
  );
};
export default MachineStatus;
