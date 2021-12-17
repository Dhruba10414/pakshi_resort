import axios from "axios";
import React, { useState } from "react";
import { check, eye, eyeClose } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";

function PasswordResetForm({ user, setStateShow }) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldType, setOldType] = useState(false);
  const [newtype, setNewType] = useState(false);

  //   NOTIFY
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
            const Config = {
              headers: { Authorization: "Bearer " + token.data.access },
            };
            const Body = {
              old_password: oldpassword,
              password: newpassword,
              password2: confirmpassword,
            };

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
    <>
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
            <div className="eye" onClick={() => setOldType(!oldType)}>
              {!oldType ? eyeClose : eye}
            </div>
          </div>
          <div className="input">
            <label>New Password</label>
            <input
              type={!newtype ? "password" : "text"}
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="eye" onClick={() => setNewType(!newtype)}>
              {!newtype ? eyeClose : eye}
            </div>
          </div>
          <div className="input">
            <label>Confirm Password</label>
            <input
              type={!newtype ? "password" : "text"}
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="eye" onClick={() => setNewType(!newtype)}>
              {!newtype ? eyeClose : eye}
            </div>
          </div>
          <small className="error">{error}</small>
          {!loading ? (
            <button onClick={changePassword}>Change Password</button>
          ) : (
            <button className="loading">Processing..</button>
          )}

          <div className="statOptions" onClick={() => setStateShow(true)}>
            <div></div>
            <div>Daily Report</div>
          </div>
        </form>
      </div>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{check}</div> Successfully Submitted!
      </div>
    </>
  );
}

export default PasswordResetForm;
