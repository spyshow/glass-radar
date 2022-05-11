import React from "react";
import "./MoldBox.styles.css";

export default function MoldBox({ number, status }) {
  let css = "";
  switch (status) {
    case "mounted":
      css = "moldbox-periodic-element moldbox-mounted";
      break;

    case "rejected":
      css = "moldbox-periodic-element moldbox-rejected";
      break;

    default:
      css = "moldbox-periodic-element moldbox-not-mounted";
  }
  return (
    <div
      className={css}
      // data-description="I'm only on here to reject invitations 😂"
    >
      <div className="moldbox-periodic-element-inner">
        <div className="moldbox-title">{number}</div>
        {/* <div class="description">LinkedIn</div> */}
      </div>
    </div>
  );
}
