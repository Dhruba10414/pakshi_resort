import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { openMenu, closeMenu } from "../../animations/NavAnim";
import TopNav from "./TopNav";

function Navigation() {
  const [menuState, setMenuState] = useState(false);

  const navigationManager = () => {
    setMenuState(!menuState);
  };

  useEffect(() => {
    if (menuState === true) {
      // Run open menu animation
      openMenu();
    } else if (menuState === false) {
      // Close Open menu animation
      closeMenu();
    }
  }, [menuState]);

  return (
    <>
      <div className="navigation">
        <div className="navigation__primary"></div>
        <div className="navigation__secondary">
        <div className="phone-link">
          {/* ------------- RESERVATION AND PHONES ---------- */}
            <Link to="/booking" className="link">
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
                className="feather feather-briefcase"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>RESERVATION</span>
            </Link>
            <div className="link">
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
                className="feather feather-phone"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>01730 706252</span>
            </div>
          </div>

          {/* ------------------- LINKS ---------------- */}
          <div className="content">
          <Link to="/rooms" onClick={navigationManager}>
              <div className="index">01</div>
              <div className="name">Stay</div>
            </Link>
            <Link to="/facilities" onClick={navigationManager}>
              <div className="index">03</div>
              <div className="name">Garden & Park</div>
            </Link>
            <Link to="/eat-drink" onClick={navigationManager}>
              <div className="index">02</div>
              <div className="name">Eat & Drink</div>
            </Link>
            <Link to="/contact" onClick={navigationManager}>
              <div className="index">04</div>
              <div className="name">Contact</div>
            </Link>
          </div>

          {/* ---------------------- LOCATION ------------------ */}
          <div className="find-us">
            <h3>Find us</h3>
            <p>Khankashorif Road, Paksey, Ishwardi Z6006 Pabna, Rajshahi Division, Bangladesh</p>
            <a href="https://www.google.com/maps/dir/24.8435584,89.3701066/24.086299,89.0428347/@24.458018,88.9491725,10z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0" target="_blank">
              Get Direction
            </a>
          </div>
        </div>
        
      </div>

      <div className="nav-button">
        <div
          id="pencet"
          className={menuState ? "Diam" : ""}
          onClick={navigationManager}
        >
          {menuState === false ? (
            <>
              <span style={{ background: "var(--primary-color-dark)" }}></span>{" "}
              <span style={{ background: "var(--primary-color-dark)" }}></span>
            </>
          ) : (
            <>
              <span style={{ background: "#fff" }}></span>{" "}
              <span style={{ background: "#fff" }}></span>
            </>
          )}
        </div>
      </div>

      <TopNav />
    </>
  );
}

export default Navigation;
