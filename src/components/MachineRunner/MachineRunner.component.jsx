import React from "react";
import { Button } from "antd";
import {
  CaretRightOutlined,
  StopOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation } from "figbird";
import openNotification from "../Notification/Notification.component";

const MachineRunner = ({ mode, row }) => {
  const { data, create, remove } = useMutation("scanner");
  const machineInit = useMutation("machine-init");
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
  const onInit = () => {
    console.log(row);
    machineInit.create(row).then(() => {
      if (data === "done") {
        openNotification("success", "DataBase created succesfully!");
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
      obj.click = onStart;
      break;
    case "stop":
      obj.icon = <StopOutlined />;
      obj.text = "Stop";
      obj.style = {
        backgroundColor: "red",
        color: "white",
        borderColor: "white",
      };
      obj.click = onStop;

      break;
    case "init":
      obj.icon = <PlusCircleOutlined />;
      obj.text = "Create DataBase";
      obj.style = {
        backgroundColor: "blue",
        color: "white",
        borderColor: "white",
      };
      obj.click = onInit;
      break;
    default:
      break;
  }
  if (mode === "start") {
  }

  return (
    <Button
      shape="round"
      icon={obj.icon}
      size="large"
      style={obj.style}
      onClick={obj.click}
    >
      {obj.text}
    </Button>
  );
};

export default MachineRunner;
