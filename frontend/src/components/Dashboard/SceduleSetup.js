import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function SceduleSetup({updateSchedule}) {
  const [dateRange, setdateRange] = useState({ startDate: null, endDate: null});
  const [focus, setFocus] = useState("startDate");

  const { startDate, endDate } = dateRange;
  const handleOnDateChange = (startDate, endDate) => setdateRange(startDate, endDate);

  const updateScheduleInfo = () => {
    if(dateRange.startDate && dateRange.endDate){
      updateSchedule(dateRange.startDate._d, dateRange.endDate._d);
    }
  }

  return (
    <div className="bookingGeneral">
      <div className="labels">
        <div className="label">Check in</div>
        <div className="label">Check out</div>
      </div>
      <DateRangePicker
        startDatePlaceholderText=""
        startDate={startDate}
        startDateId="startDate"
        onDatesChange={handleOnDateChange}
        endDatePlaceholderText=""
        endDate={endDate}
        endDateId="endDate"
        displayFormat="DD MMM YYYY"
        focusedInput={focus}
        onFocusChange={(focus) => setFocus(focus)}
        showClearDates
        block
      />
      <div className="apply" onClick={updateScheduleInfo}>Available rooms</div>    
    </div>
  );
}

export default SceduleSetup;
