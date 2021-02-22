import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import "./PrecentageCard.styles.css";

const PrecentageCard = ({ machine_name, newPrecentage, oldPrecentage }) => {
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
    </p>
  );
};

export default PrecentageCard;
