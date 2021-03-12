import React from "react";
import { Link } from "react-router-dom";
import ContentBox from "../components/StaffSection/ContentBox";

// Images
import park from "../assets/images/StaffSection/park.svg";

function Dashboard() {
  return (
    <ContentBox>
      <div className="dashboard">
        <div className="heading">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-container">
          <div className="content">
            <div className="important-links">
              <Link to="/" className="link booking">
                <div className="logo book">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                </div>
                <h3>Book</h3>
              </Link>
              <Link to="/" className="link foodOrder">
                <div className="logo food">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWdth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-coffee"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
                </div>
                <h3>Food Order</h3>
              </Link>
              <Link to="/" className="link parkTicket">
                <div className="logo park">
                  <img src={park} alt=""/>
                </div>
                <h3>Park Ticket</h3>
              </Link>
            </div>
          </div>
          <div className="right-nav"></div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Dashboard;
