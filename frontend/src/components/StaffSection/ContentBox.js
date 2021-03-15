import React from "react";
import SideNav from "./SideNav";

function ContentBox(props) {
  return (
    <div className="staffArea">
      <SideNav />
      <div className="staffIdentity">
        <div className="staffIdentity__name">
          Ashiqur Rahman
        </div>
        <div className="staffIdentity__image">
          <div className="img"></div>
        </div>
      </div>
      <div className="contentBox">
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}

export default ContentBox;
