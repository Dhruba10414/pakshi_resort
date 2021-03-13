import React, { useEffect, useState } from "react";
import SceduleSetup from "./SceduleSetup";

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
      <form>
        <div className="input-head">
          <h2>BOOKING</h2>
          <p>information</p>
        </div>
        <SceduleSetup updateSchedule={updateSchedule} />
      </form>
    </div>
  );
}

export default Book;
