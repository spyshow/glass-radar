import React from "react";
import { Button } from "antd";
import { CaretRightOutlined, StopOutlined } from "@ant-design/icons";
import { useMutation } from "figbird";
import openNotification from "../Notification/Notification.component";

const MachineRunner = ({ mode, row }) => {
  const { data, loading, error, create, remove } = useMutation("scanner");
  const obj = {};
  console.log(row);
  const onStart = () => {
    create({ id: row.id }).then(() => {
      if (data === "scanning") {
        openNotification("success", "Machine scanning is running succesfully!");
      }
    });
  };

  const onStop = () => {
    remove({ id: row.id }).then(() => {
      if (data === "done remove") {
        openNotification(
          "success",
          "Machine scanning has been stopped succesfully!"
        );
      }
    });
  };
  switch (mode) {
    case "start":
      obj.icon = <CaretRightOutlined />;
      obj.text = "Start";
      obj.style = {
        backgroundColor: "green",
        color: "white",
        borderColor: "white",
      };

      break;
    case "stop":
      obj.icon = <StopOutlined />;
      obj.text = "Stop";
      obj.style = {
        backgroundColor: "red",
        color: "white",
        borderColor: "white",
      };

      break;
    default:
      break;
  }
  return (
    <Button
      shape="round"
      icon={obj.icon}
      size="large"
      style={obj.style}
      onClick={mode === "start" ? onStart : onStop}
    >
      {obj.text}
    </Button>
  );
};

export default MachineRunner;
