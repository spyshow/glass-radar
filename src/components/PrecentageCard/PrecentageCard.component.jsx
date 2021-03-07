import React, { useState } from "react";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import { Button } from "antd";
import { useCountUp } from "react-countup";

import "./PrecentageCard.styles.css";

const PrecentageCard = ({
  machine_name,
  newPrecentage,
  oldPrecentage,
  oldDate,
}) => {
  const [infoShow, setInfoShow] = useState(false);
  const newRejectedPrecentage = useCountUp({
    end: newPrecentage,
    decimals: 2,
    decimal: ".",
  });
  const newTotalPrecentage = useCountUp({
    end: 100 - newPrecentage,
    decimals: 2,
    decimal: ".",
    redraw: true,
  });
  const oldTotalPrecentage = useCountUp({
    end: 100 - oldPrecentage,
    decimals: 2,
    decimal: ".",
    redraw: true,
  });
  const oldRejectedPrecentage = useCountUp({
    end: oldPrecentage,
    decimals: 2,
    decimal: ".",
    redraw: true,
  });
  return (
    <p className="machine-precentage">
      <span className="machine-precentage-text">
        {machine_name.replace(/_/g, " ") + " "}
      </span>
      :
      <span className="machine-precentage-total">
        {" " + newTotalPrecentage.countUp + " "}
      </span>
      {newPrecentage > oldPrecentage ? (
        <ArrowDownOutlined style={{ fontSize: "1rem", color: "#cf1322" }} />
      ) : (
        <ArrowUpOutlined style={{ fontSize: "1rem", color: "#3f8600" }} />
      )}
      <span className="machine-precentage-total">
        {" " + newRejectedPrecentage.countUp + " "}
      </span>
      <Button
        type="link"
        onClick={() => {
          setInfoShow(!infoShow);
        }}
      >
        {infoShow ? <MinusCircleTwoTone /> : <PlusCircleTwoTone />}
      </Button>
      <span className={infoShow ? "machine-info show" : "machine-info hide"}>
        <span>{"precentage of " + oldDate + " before the selected date "}</span>
        <span className="machine-precentage-total">
          {oldTotalPrecentage.countUp}
        </span>
        {" / "}
        <span className="machine-precentage-total">
          {oldRejectedPrecentage.countUp}
        </span>{" "}
      </span>
    </p>
  );
};

PrecentageCard.defaultProps = {
  oldDate: "old date",
};

export default PrecentageCard;
