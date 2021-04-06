import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function SceduleSetup({searchRoomUsingDate, setSearched}) {
  const [dateRange, setdateRange] = useState({ startDate: null, endDate: null});
  const [focus, setFocus] = useState("");

  const { startDate, endDate } = dateRange;
  const handleOnDateChange = (startDate, endDate) => setdateRange(startDate, endDate);

  const updateScheduleInfo = () => {
    if(dateRange.startDate && dateRange.endDate){
      searchRoomUsingDate(dateRange.startDate._d, dateRange.endDate._d);
    }
  }

  useEffect(() => {
    // If search field is cleared that means it is not searched yet
    if(!dateRange){
      setSearched(false);
    }
  }, [dateRange])

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
