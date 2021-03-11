import React from "react";
import { Link } from "react-router-dom";
import ContentBox from "../components/StaffSection/ContentBox";

function Dashboard() {
  return (
    <ContentBox>
      <div className="dashboard">
          <div className="dashboard__links">
              <Link to="/" className="link booking"></Link>
              <Link to="/" className="link foodOrder"></Link>
              <Link to="/" className="link parkTicket"></Link>
          </div>

          <div className="dashboard__table">
              <h2>Todays Check in</h2>
              <div className="table">
                  <div className="entry"></div>
              </div>
          </div>
      </div>
    </ContentBox>
  );
}

export default Dashboard;
