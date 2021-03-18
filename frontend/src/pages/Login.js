import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginAnim } from "../animations/LoginAnim";
import axios from "axios";

// Assets
import staff1 from "../assets/images/Login/staff1.jpg";
import staff2 from "../assets/images/Login/staff2.jpg";
import staff3 from "../assets/images/Login/staff3.jpg";
import staff4 from "../assets/images/Login/staff4.jpg";
import staff5 from "../assets/images/Login/staff5.jpg";

function Login() {
  const [state, setState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    LoginAnim();
  }, []);

  // Validation logic
  const validationCheck = () => {
    if (email && password) { return true; } 
    else { setError("All fields required."); return false;
    }
  };

  // Function Logic
  const LoginFunctionality = (event) => {
    event.preventDefault();

    if (validationCheck()) {
      axios
        .post("http://127.0.0.1:8000/api/token/", { email, password,})
        .then((token) => {
          // config
          const yourConfig = { headers: { Authorization: "Bearer " + token.data.access } }
          // get user
          axios.get("http://127.0.0.1:8000/api/user/", yourConfig)
          .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data));
            localStorage.setItem('refresh_token', token.data.refresh);
            console.log("OK: ", localStorage['user']);
          })
          .catch(() => {
            setError("Login failed. Try again!");
          })
        })
        .catch(() => {
          setError("Email and password doesn't match.");
        });
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
        <div className="content">
          <h1>Log in</h1>
          <form onSubmit={LoginFunctionality}>
            <div className="input_field">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input_field">
              <label>Password</label>
              <input
                type={state ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
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
            <button type="button" onClick={LoginFunctionality}>
              Login
            </button>
            <Link to="/">Forgot password?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
