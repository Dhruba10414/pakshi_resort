import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";

// Components
import SideNav from "./SideNav";
import StaffHeading from "./StaffHeading";

// Main Function
function ContentBox({ currentUser, children, heading }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(currentUser))
  }, []);

  return (
    <div className="staffArea">
      <SideNav
        is_staff={user && user.is_staff}
      />
      <div className="contentBox">
        <StaffHeading
          heading={heading}
          user_name={user && user.user_name}
          is_staff={user && user.is_admin}
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
