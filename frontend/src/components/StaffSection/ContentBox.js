import React from "react";
import SideNav from "./SideNav";

function ContentBox(props) {
  return (
    <div className="staffArea">
      <SideNav />
      <div className="contentBox">
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}

export default ContentBox;
