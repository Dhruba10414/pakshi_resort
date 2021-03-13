import React, { useEffect, useState } from "react";
import SceduleSetup from "./SceduleSetup";
import RoomInfo from "./RoomInfo";

function Book() {
  const [ schedule, setSchedule ] = useState(null);

  const updateSchedule = (startDate, endDate) => {
    setSchedule({startDate, endDate});
  }
  
  // Testing purpose (should be deleted) <--
  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <div className="bookBox">
      <div className="schedule-info">
        <div className="input-head">
          <h2>BOOKING</h2>
          <p>information</p>
        </div>
        <SceduleSetup updateSchedule={updateSchedule} />
      </div>
      <RoomInfo />
    </div>
  );
}

export default Book;
