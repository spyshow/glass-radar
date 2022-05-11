import React from "react";
import {
  AiFillTool,
  AiOutlineCheck,
  AiOutlineSolution,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { GiFactory, GiTrashCan } from "react-icons/gi";
import { Tooltip } from "antd";

import "./MoldStatus.styles.css";

const MoldStatus = ({ moldStatus }) => {
  return (
    <div className="main-status-container">
      <div className="mold-status-container">
        <Tooltip
          title="Available"
          color={"green"}
          key={"green"}
          style={{ overflow: "scroll" }}
        >
          <AiOutlineCheck color="green" size="1.5em" />
          {moldStatus.available}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip
          title="Mounted"
          color={"purple"}
          key={"purple"}
          style={{ overflow: "scroll" }}
        >
          <GiFactory color="purple" size="1.5em" />
          {moldStatus.mounted}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip
          title="Unmounted"
          color={"red"}
          key={"red"}
          style={{ overflow: "scroll" }}
        >
          <AiOutlineExclamationCircle size="1.5em" color="red" />
          {moldStatus.unmounted}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip
          title="In Repair"
          color={"blue"}
          key={"blue"}
          style={{ overflow: "scroll" }}
        >
          <AiFillTool size="1.5em" color="blue" />
          {moldStatus.inrepairlocal + moldStatus.inrepairexternal}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip
          title="Await Expertise"
          color={"orange"}
          key={"orange"}
          style={{ overflow: "scroll" }}
        >
          <AiOutlineSolution size="1.5em" color="orange" />
          {moldStatus.awaitexpertise}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip
          title="scrapped"
          color={"gray"}
          key={"gray"}
          style={{ overflow: "scroll" }}
        >
          <GiTrashCan color="gray" size="1.5em" />
          {moldStatus.scrapped}
        </Tooltip>
      </div>
    </div>
  );
};

export default MoldStatus;
