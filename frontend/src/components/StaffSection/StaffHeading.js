import React from "react";

function StaffHeading({ heading, user_name, is_staff }) {
  return (
    <div className="staffHeading">
      <div className="staffHeading__heading">
        <h2>{heading}</h2>
      </div>
      <div className="staffHeading__staff">
        <div className={is_staff ? "bulb admin" : "bulb staff"}></div>
        <div className="staff-name">{user_name}</div>
      </div>
    </div>
  );
}

export default StaffHeading;
