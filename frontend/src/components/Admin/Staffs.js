import React, { useState } from "react";
import staffsAvatar from "../../assets/images/StaffSection/stafflist.svg";
import Staff from "./Staff";

function Staffs({ stafflist }) {
  const [active, setActive] = useState("");

  return (
    <div className="stafflist">
      <div className="heading-container">
        <div className="text-part">
          <h3>Availabe</h3>
          <p>foods</p>
        </div>
        <div className="style-part">
          <img src={staffsAvatar} alt="" />
        </div>
      </div>

      <h3>Staff List</h3>

      <div className="list-container">
        <div className="table-heading">
          <div className="name">Name</div>
          <div className="role">Role</div>
          <div className="status">Status</div>
        </div>

        {stafflist.map((staff, index) => (
          <Staff
            key={index}
            id={index}
            name={staff.user_name}
            status={staff.is_active}
            role={staff.role}
            email={staff.email}
            contact={staff.contact}
            gender={staff.gender}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}

export default Staffs;
