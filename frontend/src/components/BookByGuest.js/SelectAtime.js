import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { arrowLeftCherovon } from "../../assets/images/SVG";

function SelectAtime({ setSelectTime, setRoomAmount, setState }) {
  const [error, setError] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [focus, setFocus] = useState("startDate");
  const [isMobileDevice, setMobileDevice] = useState(false);
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;

  // SETUP DATE DANGE
  const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate, endDate);
  };

  //  REQUIRED FIELD VALIDATION CHECK
  const basicValidation = () => {
    if (!dateRange.startDate || !dateRange.endDate || !numberOfRooms) {
      setError("Required All Fields.");
      return false;
    } else if (numberOfRooms < 1) {
      setError("Number of rooms should be greater than zero.");
      return false;
    }
    return true;
  };

  //   DATE VALIDATION
  const dateValidation = (startDay) => {
    const date = new Date();
    const today = date.getDate();
    console.log(startDay, today);
    if (startDay === today) {
      setError("Select check-in date tomorrow or later date.");
      return false;
    } else {
      return true;
    }
  };

  //   SAVE DATA TO PARENT
  const saveDataToParent = (event) => {
    event.preventDefault();

    if (basicValidation()) {
      setError("");
      const sd = dateRange.startDate._d.getDate();
      const sm = (dateRange.startDate._d.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const sy = dateRange.startDate._d.getFullYear();
      const ed = dateRange.endDate._d.getDate();
      const em = (dateRange.endDate._d.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const ey = dateRange.endDate._d.getFullYear();
      const checkinDate = `${sd}-${sm}-${sy}`;
      const checkoutDate = `${ed}-${em}-${ey}`;

      if (dateValidation(sd)) {
        console.log("OK");
        setSelectTime({ checkin: checkinDate, checkout: checkoutDate });
        setRoomAmount(numberOfRooms);
        setState(2);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth < 420) {
      setMobileDevice(true);
    }
  }, [window.innerWidth]);

  return (
    <div className="timeSelection">
      <div className="timeSelection__text">
        <div>
          <h2>Select</h2>
          <h1>Timetable</h1>
          <p>
            Please give us your required room number and check-in, check-out
            date.
          </p>
          <p style={{ marginTop: "8px" }}>
            <span>Note that:</span> To make an online booking request, you must
            select a check-in date tomorrow or a later date.
          </p>
        </div>
      </div>
      <div className="timeSelection__content">
        <form onSubmit={saveDataToParent}>
          <h3>Check-in & Check-out</h3>
          {isMobileDevice ? (
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
              verticalHeight={350}
              orientation="vertical"
            />
          ) : (
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
            />
          )}

          <h3>Number of Rooms</h3>
          <input
            className="num"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            type="text"
          />

          <small className="error">{error}</small>
          <div className="btn-box">
            <button className="back-btn" onClick={() => setState(0)}>{arrowLeftCherovon} Back</button>
            <button className="next" onClick={saveDataToParent}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SelectAtime;
