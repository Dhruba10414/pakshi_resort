import React, { useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";

function Admin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState(false);
  const [error, setError] = useState("");

  // ALL FIELDS REQUIRED
  const requiredFildCheck = () => {
    if (name && email && phone && phone && gender && role && password && confirmPassword) {
      return true;
    } else {
      setError("All fields required.");
      return false;
    }
  }

  // Phone number validation check
  const phoneNumberCheck = () => {
    if (phone.length === 11 && phone[0] === "0" && phone[1] === "1") {
      return true;
    } else {
      setError("Phone number is unvalid.");
      return false;
    }
  };
  
  const registerStaff = (event) => {
    event.preventDefault();

    if (requiredFildCheck() && phoneNumberCheck()) {
      console.log(name, email, phone, gender, role, password, confirmPassword);
    }
  };

  return (
    <ContentBox heading="Admin">
      <div className="admin">
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
                    <option value="male ">Male</option>
                    <option value="female">Female</option>
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
                    <option value="receptionist ">Receptionist </option>
                    <option value="resturentStaff">Resturent Staff</option>
                    <option value="admin">Admin</option>
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
            {error ? <small>{error}</small> : null} <br/>
            <button onClick={registerStaff}>Register</button>
          </form>
        </div>
      </div>
    </ContentBox>
  );
}

export default Admin;
