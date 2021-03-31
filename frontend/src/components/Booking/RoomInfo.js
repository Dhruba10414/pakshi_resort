import React from "react";
import search from "../../assets/images/View/svg/search.svg";
import { rsvg } from "../../assets/images/SVG";


function RoomInfo({
  availableRooms,
  availableRoomsByGroup,
  searched,
  setBookCardOn,
  selectRoomToBook,
}) {
  
  // OPEN BOOKING FORM
  const openBookingForm = (data) => {
    setBookCardOn(true);
    selectRoomToBook(data);
  };

  return (
    <div className="roomInfo">
      {!searched 
      ? (
        <div className="beforeSearch">
          <div>
            <img src={search} alt="" />
            <h2>Fill Checkin & Checkout date to view available rooms</h2>
          </div>
        </div>
      ) : (
        <div className="afterSerch">
          {/* available rooms by name */}
          <div className="availavleRoomTable">
            <div className="table-heading">
              <div className="id">Id {rsvg}</div>
              <div className="no">Room Numb {rsvg}</div>
              <div className="type">Room Type{rsvg}</div>
            </div>
            {availableRooms.map((room) => (
              <div
                className="available-room"
                onClick={() => { openBookingForm(room);}}
                key={room.id}
              >
                <div className="id">{room.id}</div>
                <div className="no"># {room.room_num}</div>
                <div className="type">{room.room_type}</div>
              </div>
            ))}
          </div>
          {/* available rooms by group */}
          <div className="availableRoomGroup">
            <div className="head">Total available rooms</div>
            {availableRoomsByGroup.map((room, index) => (
              <div className="data" key={index}>
                <div className="type">{room.type}</div>
                <div className="value">
                  <h3>{room.available}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomInfo;
