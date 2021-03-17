import React from "react";
import ContentBox from "../components/StaffSection/ContentBox";

function Dashboard() {
  return (
    <ContentBox>
      <div className="dashboard">
        <div className="heading">
          <h1>Dashboard</h1>
        </div>
        
        <div className="dashboard-container">
          <div className="content">
            Dashboard
          </div>
          <div className="right-nav">
          </div>
        </div>

      </div>
    </ContentBox>
  );
}

export default Dashboard;
