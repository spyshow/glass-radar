import React, { useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import "./PrecentageCard.styles.css";

const PrecentageCard = ({ machine_name, newPrecentage, oldPrecentage }) => {
  const [infoShow, setInfoShow] = useState(false);

  console.log("new" + newPrecentage, oldPrecentage);
  return (
    <p className="machine-precentage">
      <span className="machine-precentage-text">
        {machine_name.replace(/_/g, " ")}
      </span>{" "}
      : <span className="machine-precentage-total">{100 - newPrecentage}</span>{" "}
      {newPrecentage > oldPrecentage ? (
        <ArrowDownOutlined style={{ fontSize: "1rem", color: "#cf1322" }} />
      ) : (
        <ArrowUpOutlined style={{ fontSize: "1rem", color: "#3f8600" }} />
      )}{" "}
      <span className="machine-precentage-total">{newPrecentage}</span>{" "}
      <span className="machine-info">
        <span className="machine-precentage-total">{100 - oldPrecentage}</span>{" "}
        <span className="machine-precentage-total">{oldPrecentage}</span>{" "}
      </span>
    </p>
  );
};

export default PrecentageCard;
