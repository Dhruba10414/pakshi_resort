import React from "react";
import SideNav from "./SideNav";
import StaffHeading from "./StaffHeading";

function ContentBox(props) {
  return (
    <div className="staffArea">
      <SideNav />
      <div className="contentBox">
        <StaffHeading heading={props.heading}/>
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}

export default ContentBox;
