import React from "react";
import { calender, checked, column, logout, user } from "../../assets/images/SVG";

function StayingInfo({ checkIn, checkOut, NumberOfRooms, stayed }) {
  return (
    <div className="stayingInfo">
      <div className="data">
        <div className="data__label">{column} Rooms</div>
        <div className="data__value">
          {NumberOfRooms}
          {NumberOfRooms > 1 ? " rooms" : " room"}
        </div>
      </div>
      {/* <div className="data">
        <div className="data__label">{calender} Booking date</div>
        <div className="data__value">{bookedOn}</div>
      </div> */}
      <div className="data">
        <div className="data__label">{checked} Check-in</div>
        <div className="data__value">{checkIn}</div>
      </div>
      <div className="data">
        <div className="data__label">{logout} Check-out</div>
        <div className="data__value">{checkOut}</div>
      </div>
      <div className="data">
        <div className="data__label">{logout} Staying time</div>
        <div className="data__value by"><p>{stayed} {stayed > 1 ? "days" : "day"}</p></div>
      </div>
      {/* <div className="data">
        <div className="data__label">{user} Book By</div>
        <div className="data__value by"><p>{bookBy}</p></div>
      </div> */}
    </div>
  );
}

export default StayingInfo;
