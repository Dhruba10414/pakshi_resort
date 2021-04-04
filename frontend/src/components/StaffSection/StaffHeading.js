import React from "react";

function StaffHeading({ heading, role, user_name }) {
  return (
    <div className="staffHeading">
      <div className="staffHeading__heading">
        <h2>{heading}</h2>
      </div>
      <div className="staffHeading__staff">
        <div className={role === 'A' ? "bulb admin" : "bulb staff"}></div>
        <div className="staff-name">{user_name}</div>
      </div>
    </div>
  );
}

export default StaffHeading;
