import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Assets
import staff1 from "../assets/images/Login/staff1.jpg";
import staff2 from "../assets/images/Login/staff2.jpg";
import staff3 from "../assets/images/Login/staff3.jpg";
import staff4 from "../assets/images/Login/staff4.jpg";
import staff5 from "../assets/images/Login/staff5.jpg";
import password from "../assets/images/View/svg/Password_Flatline.svg";
import { api } from "../assets/URLS";

function SetPasswordPage() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const { uid, token } = useParams();
  const [success, setSuccess] = useState(false);

  const resetPassword = (event) => {
    event.preventDefault();
    if (password1 && password2) {
      
      if (password1 === password2) {
        setLoading(true);
        const Body = { "new_password": password1, "token": token, "uid": uid }

        axios.post(api.reset_password, Body)
        .then(() => { setSuccess(true); setLoading(false); })
        .catch((err) => { console.log(err.message); setSuccess(false); setLoading(false); });

      } else {
        setError("Passwords should be matched");
      }

    } else {
      setError("Required All Fields");
    }
  };

  return (
    <div className="login">
      <div className="staffs">
        <div className="images">
          <img className="img1" src={staff1} alt="" />
          <img className="img2" src={staff2} alt="" />
          <img className="img3" src={staff3} alt="" />
          <img className="img4" src={staff4} alt="" />
          <img className="img5" src={staff5} alt="" />
          <div className="desc">
            <h3>Welcome to Staff section</h3>
            <p>
              To view and operate please login here with your email and password
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        {!success ? (
          <div className="content">
            <h1>Set New Password</h1>
            <form onSubmit={resetPassword}>
              <div className="input_field">
                <label>Password</label>
                <input
                  type={state ? "text" : "password"}
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                {!state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye-off"
                    onClick={() => setState(true)}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye"
                    onClick={() => setState(false)}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </div>
              <div className="input_field">
                <label>Confirm Password</label>
                <input
                  type={state ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {!state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye-off"
                    onClick={() => setState(true)}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye"
                    onClick={() => setState(false)}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </div>
              <small>{error}</small>
              {!loading ? (
                <button type="button" onClick={resetPassword}>
                  Reset
                </button>
              ) : (
                <button type="button" className="loading">
                  Loading...
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="successfull">
            <img src={password} alt=""/>
            <h2>Password reset successfull!</h2>
            <p>Now you can login with your new password.</p>
            <Link to="/staff/login" className="thankbtn">Back to login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SetPasswordPage;
