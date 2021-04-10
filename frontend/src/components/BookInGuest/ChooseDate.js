import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import moon from "../../assets/images/View/svg/moon.svg";
import room from "../../assets/images/View/svg/room.svg";

function ChooseDate({ roomTypeWithPrice, makeBooking }) {
  const [numberOfRooms, seNumberOfRooms] = useState("1");
  const [roomType, setRoomType] = useState("0");
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [focus, setFocus] = useState("");
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;
  const [error, setError] = useState("");

  const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate, endDate);
  };

  const validationError = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      setError("Required reservation (check-in & check-out) time.");
      return false;
    } else if (numberOfRooms === "") {
      setError("Required number of room.");
      return false;
    } else if (numberOfRooms === "0") {
      setError("Number of room should be greater than 0.");
      return false;
    } else {
      return true;
    }
  };

  const updateDateAndRoom = (event) => {
    event.preventDefault();
    if (validationError()) {
        makeBooking(dateRange.startDate._d, dateRange.endDate._d, roomTypeWithPrice[roomType].room_type );
    }
  };

  return (
    <div className="room-info-taking">
      <form onSubmit={updateDateAndRoom}>
        <div className="input-container">
          <div className="input w-70">
            <label>Room types</label>
            <div className="select">
              <select
                name="roomType"
                id="roomType"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                {roomTypeWithPrice.map((room) => (
                  <option key={room.id} value={room.id - 1}>
                    {room.room_type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input w-30">
            <label>Number of rooms</label>
            <input
              type="text"
              value={numberOfRooms}
              onChange={(e) => seNumberOfRooms(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container just-label">
          <div className="input w-50">
            <label>Check-in</label>
          </div>
          <div className="input w-50">
            <label>Check-out</label>
          </div>
        </div>
        <div className="input-container">
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
        </div>
        <small className="error">{error}</small>
        <div className="button-box">
          <button className="w-50" onClick={updateDateAndRoom}>
            Next
          </button>
        </div>
      </form>

      <div className="room-desc">
        <div className="room-desc-info">
          <div className="name">{roomTypeWithPrice[roomType].room_type}</div>
          <div className="price">{roomTypeWithPrice[roomType].tariff}৳</div>
        </div>
        <p>
          -----------------------------------------------------------------------
        </p>
        <div className="room-desc-info others">
          <div className="logo">
            <img src={moon} alt="" />
          </div>
          <div className="value">
            {dateRange.startDate && dateRange.endDate
              ? (dateRange.endDate._d - dateRange.startDate._d) /
                (1000 * 3600 * 24)
              : "1"}
            {dateRange.startDate && dateRange.endDate
              ? (dateRange.endDate._d - dateRange.startDate._d) /
                  (1000 * 3600 * 24) > 1
                ? " nights"
                : " night"
              : " night"}
          </div>
        </div>
        <div className="room-desc-info others">
          <div className="logo">
            <img src={room} alt="" />
          </div>
          <div className="value">
            {numberOfRooms === "" || numberOfRooms === "0"
              ? `1`
              : numberOfRooms}
            {numberOfRooms > 1 ? " rooms" : " room"}
          </div>
        </div>
        <p>
          -----------------------------------------------------------------------
        </p>
        <div className="room-detail-price">
          <div>total cost</div>
          {numberOfRooms === "" || numberOfRooms === "0"
            ? dateRange.startDate && dateRange.endDate
              ? (roomTypeWithPrice[roomType].tariff *
                  (dateRange.endDate._d - dateRange.startDate._d)) /
                (1000 * 3600 * 24)
              : roomTypeWithPrice[roomType].tariff
            : dateRange.startDate && dateRange.endDate
            ? (numberOfRooms *
                roomTypeWithPrice[roomType].tariff *
                (dateRange.endDate._d - dateRange.startDate._d)) /
              (1000 * 3600 * 24)
            : numberOfRooms * roomTypeWithPrice[roomType].tariff}
          <div className="symbol">৳</div>
        </div>
      </div>
    </div>
  );
}

export default ChooseDate;
