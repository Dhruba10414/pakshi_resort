import React, { useState } from "react";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import ContentBox from "../components/StaffSection/ContentBox";
import lady from "../assets/images/View/svg/lady.svg";
import men from "../assets/images/View/svg/men.svg";
import { check, eye, eyeClose, hash, mail, phone } from "../assets/images/SVG";
import axios from "axios";
import { api } from "../assets/URLS";

function Settings({ currentUser }) {
  const [user, setUser] = useState(JSON.parse(currentUser));
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldType, setOldType] = useState(false);
  const [newtype, setNewType] = useState(false)

  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    setSuccess(true);
  };

  // CHANGE PASSWORD
  const changePassword = (event) => {
    event.preventDefault();
    if (oldpassword && newpassword && confirmpassword) {
      if (newpassword === confirmpassword) {
        // func
        setLoading(true);
        const REFRESH_TOKEN = localStorage.getItem("refresh_token");
        const GET_ACCESS_TOKEN_URL = api.refresh;
        const RESET_PASSWORD = `${api.change_password}/${user.id}/`;

        axios
          .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
          .then((token) => {
            const Config = {headers: { Authorization: "Bearer " + token.data.access }};
            const Body = { "old_password": oldpassword, "password": newpassword, "password2": confirmpassword, };

            axios
              .put(RESET_PASSWORD, Body, Config)
              .then(() => {
                notify();
                setError("");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setLoading(false);
              })
              .catch(() => {
                console.clear();
                setError("Something went wrong! Try again.");
                setLoading(false);
              });
          })
          .catch(() => {
            console.clear();
            setLoading(false);
          });
      } else {
        setError("Password Should be matched.");
      }
    } else {
      setError("Required all fields.");
    }
  };

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
              <input
                type={!oldType ? "password" : "text"}
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div className="eye" onClick={() => setOldType(!oldType)}>{!oldType ? eyeClose : eye}</div>
            </div>
            <div className="input">
              <label>New Password</label>
              <input
                type={!newtype ? "password" : "text"}
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="eye" onClick={() => setNewType(!newtype)}>{!newtype ? eyeClose : eye}</div>
            </div>
            <div className="input">
              <label>Confirm Password</label>
              <input
                type={!newtype ? "password" : "text"}
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="eye" onClick={() => setNewType(!newtype)}>{!newtype ? eyeClose : eye}</div>
            </div>
            <small className="error">{error}</small>
            {
              !loading
              ? <button onClick={changePassword}>Change Password</button>
              : <button className="loading">Processing..</button>
            }
          </form>
        </div>
        <div className={success ? "success-message" : "success-message disabled"}>
          <div>{check}</div> Successfully Submitted!
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
