import React from "react";
import { connect } from "react-redux";

import SideNav from "./SideNav";
import StaffHeading from "./StaffHeading";

function ContentBox({currentUser, children, heading}) {
  return (
    <div className="staffArea">
      <SideNav role={currentUser.role}/>
      <div className="contentBox">
        <StaffHeading heading={heading} user_name={currentUser.user_name}/>
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(ContentBox);

