import React, { useEffect, useState } from "react";
// Daterange picker
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// SVGS
import moon from "../../assets/images/View/svg/moon.svg";
import room from "../../assets/images/View/svg/room.svg";
import feather from "../../assets/images/View/svg/feather-2.svg";

function ChooseDate({ roomTypeWithPrice, setInfo, setState }) {
  const [numberOfRooms, seNumberOfRooms] = useState("1");
  const [roomType, setRoomType] = useState("0");
  const [focus, setFocus] = useState("");
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;
  const [error, setError] = useState("");
  const [isMobileDevice, setMobileDevice] = useState(false);

  // SETUP DATE DANGE
  const handleOnDateChange = (startDate, endDate) => {
    setdateRange(startDate, endDate);
  };

  // VALIDATION CHECK
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

  // UPDATE DATE AND ROOM
  const updateDateAndRoom = (event) => {
    event.preventDefault();
    if (validationError()) {
      // info processing
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

      // info selecting
      const checkinDate = `${sd}-${sm}-${sy}`;
      const checkoutDate = `${ed}-${em}-${ey}`;
      const type = parseInt(roomType) + 1;
      const roomBill = roomTypeWithPrice[roomType].tariff;
      const stayingDays = dateRange.endDate._d - dateRange.startDate._d;
      const totalBill =
        (numberOfRooms * roomBill * stayingDays) / (1000 * 3600 * 24);

      // info assigning
      setInfo({
        checkin: checkinDate,
        checkout: checkoutDate,
        type: type,
        roomNumbers: numberOfRooms,
        stayingDays: stayingDays,
        roomBill: roomBill,
        totalBills: totalBill,
      });

      // state changing
      setState(3);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 420) {
      setMobileDevice(true);
    }
  }, [window.innerWidth]);

  return (
    <div className="room-info-taking">
      <form onSubmit={updateDateAndRoom}>
        <div className="input-container">
          <div className="input w-100">
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
        </div>
        <div className="input-container">
          <div className="input w-100">
            <label>Number of rooms</label>
            <input
              type="text"
              value={numberOfRooms}
              onChange={(e) => seNumberOfRooms(e.target.value)}
            />
          </div>
        </div>
        <small className="error">{error}</small>
        <div className="button-box">
          <button className="back" onClick={() => setState(0)}>
            Back
          </button>
          <button onClick={updateDateAndRoom}>Next</button>
        </div>
      </form>

      <div className="room-desc">
        <h3>{roomTypeWithPrice[roomType].room_type}</h3>
        <div className="room-desc-info others">
          <div className="logo">৳</div>
          <div className="value">{roomTypeWithPrice[roomType].tariff}</div>
        </div>
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
                  (1000 * 3600 * 24) >
                1
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

        <img src={feather} alt="" className="feather" />
      </div>
    </div>
  );
}

export default ChooseDate;
