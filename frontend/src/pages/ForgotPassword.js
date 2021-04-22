import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// Assets
import staff1 from "../assets/images/Login/staff1.jpg";
import staff2 from "../assets/images/Login/staff2.jpg";
import staff3 from "../assets/images/Login/staff3.jpg";
import staff4 from "../assets/images/Login/staff4.jpg";
import staff5 from "../assets/images/Login/staff5.jpg";
import snedemail from "../assets/images/View/svg/send-email.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // LoginAnim();
    let tl = gsap.timeline();
    tl.from(".login .container", 1, {
      x: "100vw",
      ease: "expo.inOut",
    });
  }, []);

  const sendMail = () => {
    if (email) {
      console.log(email);
      setSuccess(true);
    } else {
      setError("All fields required!");
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
            <h1>Forget Password</h1>
            <p>To reset your password please give your email.</p>
            <form onSubmit={sendMail}>
              <div className="input_field">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <small>{error}</small>
              {!loading ? (
                <button type="button" onClick={sendMail}>
                  Send Mail
                </button>
              ) : (
                <button type="button" className="loading">
                  Loading...
                </button>
              )}
              <Link to="/staff/login">Back to login page?</Link>
            </form>
          </div>
        ) : (
          <div className="content confirmation">
            <img className="confirmationImage" src={snedemail} alt />
            <p>
              Thank you! You will get a email to reset your password. Please
              check your email and follow the instruction.
            </p>
            <Link className="thankbtn" to="/staff/login">
              Back to login page?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
