import React from "react";
import "./MoldBox.styles.css";

export default function MoldBox({ number, status }) {
  let css = "";
  switch (status) {
    case "mounted":
      css = "periodic-element mounted";
      break;

    case "rejected":
      css = "periodic-element rejected";
      break;

    default:
      css = "periodic-element not-mounted";
  }
  return (
    <div
      className={css}
      // data-description="I'm only on here to reject invitations 😂"
    >
      <div className="periodic-element-inner">
        <div className="title">{number}</div>
        {/* <div class="description">LinkedIn</div> */}
      </div>
    </div>
  );
}
