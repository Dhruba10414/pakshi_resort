import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function SelectRoom({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(rooms);
  const [isMobileDevice, setMobileDevice] = useState(false);
  const [focus, setFocus] = useState("");
  const [error, setError] = useState("");
  const [numbOfRooms, setNumbOfRooms] = useState(1);
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;

  //   SELECT A ROOM TYPE
  const selectRoom = (id, name, tarrif) => {
    const avaroom = rooms.map((room) => {
      if (room.id === id) {
        return { ...room, selected: true };
      } else {
        return { ...room, selected: false };
      }
    });
    setSelectedRoom({ id, name, tarrif });
    setAvailableRooms(avaroom);
  };

  // SETUP DATE DANGE
  const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate, endDate);
  };

  // VALIDATION CHECK
  const requiredvalidationCheck = () => {
    // date field empty check
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Pleas fill check-in and check-out date");
      return false;
    }
    // num of rooms field empty check
    if(numbOfRooms === ''){
        setError("Required number of rooms!");
        return false;
    }
    // selected room check
    if (!selectedRoom) {
      setError("Please select a room type.");
      return false;
    }
    return true;
  };

  const advanceValidationCheck = (day) => {
    const date = new Date();
    const today = date.getDate();
    console.log(day, today);
    if(day === today){
        setError("Check-in date should be start from tomorrow.");
        return false;
    }
    if(numbOfRooms < 1){
        setError("Number of rooms should be greater than '0'.");
        return false;
    }
    return true;
  }

  const youCanGonextStep = (event) => {
    event.preventDefault();
    if (requiredvalidationCheck()) {
      const sd = dateRange.startDate._d.getDate();
      const sm = (dateRange.startDate._d.getMonth() + 1).toString().padStart(2, "0");
      const sy = dateRange.startDate._d.getFullYear();
      const ed = dateRange.endDate._d.getDate();
      const em = (dateRange.endDate._d.getMonth() + 1).toString().padStart(2, "0");
      const ey = dateRange.endDate._d.getFullYear();
      // info selecting
      const checkinDate = `${sd}-${sm}-${sy}`;
      const checkoutDate = `${ed}-${em}-${ey}`;
      if(advanceValidationCheck(sd)){
          console.log("OK");
      }
    }
  };

  useEffect(() => {
    setAvailableRooms(rooms);
    if (window.innerWidth < 420) {
      setMobileDevice(true);
    }
  }, [rooms, window.innerWidth]);

  return (
    <div className="roomanddate">
      <h2>
        01/ <span>04</span>
      </h2>
      <h1>Rooms & Timetable</h1>

      <div className="container">
        <div className="rooms">
          {availableRooms.map((room) => (
            <div
              key={room.id}
              className={room.selected ? "room selected" : "room"}
              onClick={() => selectRoom(room.id, room.room_type, room.tariff)}
            >
              <h3>{room.room_type}</h3>
              <p>
                {room.tariff}৳ <span>PER/NIGHT</span>
              </p>
            </div>
          ))}
        </div>

        <div className="timetable">
          <p>
            You can make online booking requests for upcoming dates. So, please
            fill your time table (<span>check-in</span> and{" "}
            <span>check-out</span>) date from tommorrow.
          </p>
          <form>
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
            <input className="num" type="text" />
          </form>
        </div>
      </div>
      <button onClick={youCanGonextStep}>Go to next step</button>
      <small>{error}</small>
    </div>
  );
}

export default SelectRoom;
