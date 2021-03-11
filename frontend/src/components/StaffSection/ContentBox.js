import React from "react";
import SideNav from "./SideNav";
import avatar from "../../assets/images/StaffSection/avatar2.png";

function ContentBox(props) {
  return (
    <div className="staffArea">
      <SideNav />
      <div className="contentBox">
        <div className="nav">
          <div className="banner">Home</div>
          <div className="staff">
            <div className="name">Ashiqur Rahman</div>
            <div className="avatar">
              <img src={avatar} alt="" />
            </div>
          </div>
        </div>
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}

export default ContentBox;
