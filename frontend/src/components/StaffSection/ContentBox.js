import React from "react";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";

// Components
import SideNav from "./SideNav";
import StaffHeading from "./StaffHeading";

// Main Function
function ContentBox({ currentUser, clearUser, children, heading }) {
  return (
    <div className="staffArea">
      <SideNav role={currentUser.role} clearUser={clearUser} />
      <div className="contentBox">
        <StaffHeading
          heading={heading}
          role={currentUser.role}
          user_name={currentUser.user_name}
        />
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

// Redux states
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
// Redux actions
const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBox);
