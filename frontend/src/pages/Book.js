import React, { useEffect, useState } from "react";
import SceduleSetup from "../components/Booking/SceduleSetup";
import RoomInfo from "../components/Booking/RoomInfo";
import ContentBox from "../components/StaffSection/ContentBox";

function Book() {
  const [schedule, setSchedule] = useState(null);

  const updateSchedule = (startDate, endDate) => {
    setSchedule({ startDate, endDate });
  };

  // Testing purpose (should be deleted) <--
  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <ContentBox>
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
    </ContentBox>
  );
}

export default Book;
