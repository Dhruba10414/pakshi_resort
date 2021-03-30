import React from "react";
import search from "../../assets/images/StaffSection/search.svg";
import RoomInfoCard from "./RoomInfoCard";
// import notfound from "../../assets/images/StaffSection/notFound.svg";

function RoomInfo({ availableRooms, searched }) {
    console.log("ROOms: ", availableRooms);
  return (
    <div className="roomInfo">
      {!searched ? (
        <div className="beforeSearch">
          <div>
            <img src={search} alt="" />
            <h2>Fill Checkin & Checkout date to view available rooms</h2>
          </div>
        </div>
      ) : (
        <div className="afterSerch">
            {
                availableRooms.map(room => (
                    <RoomInfoCard type={room.type} available={room.available} />
                ))
            }
        </div>
      )}
      <div className="serchFailed"></div>
    </div>
  );
}

export default RoomInfo;
