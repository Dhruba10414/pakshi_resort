import React, { useState } from "react";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import ContentBox from "../components/StaffSection/ContentBox";
import lady from "../assets/images/View/svg/lady.svg";
import men from "../assets/images/View/svg/men.svg";
import { hash, mail, phone } from "../assets/images/SVG";

function Settings({ currentUser }) {
  const [user, setUser] = useState(JSON.parse(currentUser));
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // CHANGE PASSWORD
  const changePassword = (event) => {
    event.preventDefault();
    if(newpassword === confirmpassword){
      // func
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else{
      setError("Password Should be matched.");
    }
  }

  return (
    <ContentBox heading="Settings">
      <div className="settings">
        {/* ///////////////////////////////////////////////////////////////////////////// */}
        <div className="settings__left">
          <div className="heading">
            <h2>Staff</h2>
            <p>information</p>
          </div>
          {/* -----basic----- */}
          <div className="basic">
            <div className="pp">
              {user.gender === "M" ? (
                <img src={men} alt="" />
              ) : (
                <img src={lady} alt="" />
              )}
            </div>
            {/* info */}
            <div className="info">
              <p className={user.is_staff ? "admin" : "staff"}>
                {user.is_staff ? "Admin" : "Staff"}
              </p>
              <h1>{user.user_name}</h1>
              <p className="date">
                <span>From: </span> {user.start_date}
              </p>
            </div>
          </div>
          <h3>Tearms & Condition</h3>
          {user.is_staff ? (
            <p className="tearms">
              An admin will be able to control all aspects of the management
              section. The admin will also be able to intervene in booking,
              restaurant and park ticket matters. At the same time an admin will
              be able to create new staff and discard old staff as well as view
              resort statistics.
            </p>
          ) : (
            <p className="tearms">
              A staff will be able to control booking, restaurent and park
              ticket related management sections. A Staff can make a booking,
              cancel a booking, manage booking requests and billing system also
              take food order, manage food orders and lot more.
            </p>
          )}

          {/* -----details---- */}
          <div className="details">
            <h3>General Information</h3>
            <div className="data gender">
              <div className="data__logo">{hash}</div>
              <div className="data__value">
                <h4>Gender</h4>
                <p>{user.gender === "M" ? "Male" : "Female"}</p>
              </div>
            </div>
            <div className="data phone">
              <div className="data__logo">{phone}</div>
              <div className="data__value">
                <h4>Contact</h4>
                <p>{user.contact}</p>
              </div>
            </div>
            <div className="data email">
              <div className="data__logo">{mail}</div>
              <div className="data__value">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ///////////////////////////////////////////////////////////////////////////// */}
        <div className="settings__right">
          <div className="heading">
            <h2>Reset</h2>
            <p>password</p>
          </div>

          <form onSubmit={changePassword}>
            <div className="input">
              <label>Old Password</label>
              <input type="password" value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className="input">
              <label>New Password</label>
              <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="input">
              <label>Confirm Password</label>
              <input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <small className="error">{error}</small>
            <button onClick={changePassword}>Change Password</button>
          </form>
        </div>
      </div>
    </ContentBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
