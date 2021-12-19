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
        <Tooltip title="Available" color={"green"} key={"green"}>
          <AiOutlineCheck color="green" size="1.5em" />
          {moldStatus.available}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip title="Mounted" color={"purple"} key={"purple"}>
          <GiFactory color="purple" size="1.5em" />
          {moldStatus.mounted}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip title="Unmounted" color={"red"} key={"red"}>
          <AiOutlineExclamationCircle size="1.5em" color="red" />
          {moldStatus.unmounted}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip title="In Repair" color={"blue"} key={"blue"}>
          <AiFillTool size="1.5em" color="blue" />
          {moldStatus.inRepairLocal + moldStatus.inRepairExternal}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip title="Await Expertise" color={"orange"} key={"orange"}>
          <AiOutlineSolution size="1.5em" color="orange" />
          {moldStatus.awaitExpertise}
        </Tooltip>
      </div>
      <div className="mold-status-container">
        <Tooltip title="Scraped" color={"gray"} key={"gray"}>
          <GiTrashCan color="gray" size="1.5em" />
          {moldStatus.scraped}
        </Tooltip>
      </div>
    </div>
  );
};

export default MoldStatus;
