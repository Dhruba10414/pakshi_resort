import React from "react";
import { rsvg } from "../../assets/images/SVG";

function StayingRooms({ roomBills }) {
  return (
    <div className="stayingRooms">
      <div className="table-heading">
        <div className="no">No {rsvg}</div>
        <div className="type">Type {rsvg}</div>
        <div className="price">Price{rsvg}</div>
      </div>

      {roomBills.map((bill) => (
        <div className="room-data" key={bill.id}>
          <div className="no">{bill.room_num}</div>
          <div className="type">{bill.room_type}</div>
          <div className="price">{bill.bill}</div>
        </div>
      ))}
    </div>
  );
}

export default StayingRooms;
