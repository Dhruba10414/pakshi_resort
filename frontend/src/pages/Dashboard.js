import React, { useState, useEffect } from "react";
import ContentBox from "../components/StaffSection/ContentBox";

// Components
import DashboardButtons from "../components/Dashboard/DashboardButtons";
import Book from "../components/Dashboard/Book";
import FoodOrder from "../components/Dashboard/FoodOrder";
import ParkTicket from "../components/Dashboard/ParkTicket";

function Dashboard() {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(0);
  }, [])

  return (
    <ContentBox>
      <div className="dashboard">
        <div className="heading">
          <h1>Dashboard</h1>
        </div>
        
        <div className="dashboard-container">
          <div className="content">
            {
              state === 0 
              ? <Book />
              : state === 1 
                ? <FoodOrder />
                : <ParkTicket />
            }
          </div>
          <div className="right-nav">
          <DashboardButtons state={state} updateState={setState} />
          </div>
        </div>

      </div>
    </ContentBox>
  );
}

export default Dashboard;
