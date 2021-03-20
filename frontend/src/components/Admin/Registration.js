import React, { useState } from "react";
import axios from 'axios';
import { check } from "../../assets/images/SVG";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("M");
  const [role, setRole] = useState("S");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);

  // ALL FIELDS REQUIRED
  const requiredFildCheck = () => {
    if (
      name &&
      email &&
      phone &&
      gender &&
      role &&
      password &&
      confirmPassword
    ) {
      return true;
    } else {
      setError("All fields required.");
      return false;
    }
  };

  // PHONE NUMBER VALIDATION
  const phoneNumberCheck = () => {
    if (phone.length === 11 && phone[0] === "0" && phone[1] === "1") {
      return true;
    } else {
      setError("Phone number is unvalid.");
      return false;
    }
  };

  // PASSWORD CHECK VALIDATION
  const passwordValidation = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      setError("Password should be matched.");
    }
  };

  // CLEAR ALL FIELDS
  const clearFields = () => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setGender("M");
    setRole("S");
  };

  // NOTIFY IF STAFF SUCCESSFULLY
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 4000)
    setSuccess(true);
  }

  // REGISTRATION FUNCTION
  const registerStaff = (event) => {
    event.preventDefault();

    if (requiredFildCheck() && phoneNumberCheck() && passwordValidation()) {
      setLoading(true);
      const refresh_token = localStorage.getItem("refresh_token");
    // get users access token
    axios.post("http://127.0.0.1:8000/api/token/refresh/", {refresh: refresh_token,})
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const Body = { "email": email, "password": password, "user_name": name, "contact": phone, "gender": gender, "role": role}
        
        // Create users
        axios.post("http://127.0.0.1:8000/api/signup/", Body, Config)
        .then(() => {
          clearFields();
          setLoading(false);
          notify();
        })
        .catch(err => {
          console.log(err.message);
          setLoading(false);
        })
      });
    }
  };

  return (
    <div className="register">
      <div className="heading">
        <h3>Register</h3>
        <p>staff</p>
      </div>
      {/* register form */}
      <form>
        <h3>General Information</h3>
        <div className="input-container">
          <div className="input w-55">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input w-45">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input w-65">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input w-35">
            <label>Gender</label>
            <div className="select">
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>
        <h3>Role Information</h3>
        <div className="input-container">
          <div className="input w-100">
            <div className="select">
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="S">Staff</option>
                <option value="A">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <h3>Password Set</h3>
        <div className="input-container">
          <div className="input w-50 password">
            <label>Password</label>
            <input
              className="password"
              type={passwordType ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordType ? (
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
                onClick={() => setPasswordType(true)}
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
                onClick={() => setPasswordType(false)}
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </div>
          <div className="input w-50 password">
            <label>Confirm Password</label>
            <input
              type={confirmPasswordType ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!confirmPasswordType ? (
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
                onClick={() => setConfirmPasswordType(true)}
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
                onClick={() => setConfirmPasswordType(false)}
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </div>
        </div>
        {error ? <small>{error}</small> : null} <br />
        {!loading ? (
          <button onClick={registerStaff}>Register</button>
        ) : (
          <button style={{ background: "gray", color: "#000" }}>
            Processing...
          </button>
        )}
      </form>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{ check }</div> Successfully Registered!
      </div>
    </div>
  );
}

export default Registration;
