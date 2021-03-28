import React, { useState } from "react";
import search from "../../assets/images/View/svg/search.svg";
import RoomInfoCard from "./RoomInfoCard";

function RoomInfo({ availableRooms, searched, bookCardOn, setBookCardOn }) {
    const [roomData, setRoomData] = useState("");

    const openBookingForm = (type) => {
        setBookCardOn(true);
        setRoomData(type);
        console.log(type);
    }

  return (
    <div className="roomInfo">
      {!searched ? (
        <div className="beforeSearch">
          <div>
            <img src={search} alt="" />
            <h2>Fill Checkin & Checkout date to view available rooms</h2>
          </div>
        </div>
      ) : !bookCardOn ? (
        <div className="afterSerch">
          {availableRooms.map((room, index) => (
            <RoomInfoCard
              key={index}
              type={room.type}
              available={room.available}
              openBookingForm={openBookingForm}
            />
          ))}
        </div>
      ) : (
        <div className="beforeSearch">
            {roomData}
        </div>
      )}
    </div>
  );
}

export default RoomInfo;
