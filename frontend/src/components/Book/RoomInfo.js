import React, { useState } from "react";
import AvailableRoom from "./AvailableRoom";
// SVgs
import search from "../../assets/images/View/svg/search.svg";
import { rsvg } from "../../assets/images/SVG";
import Loading from "../Loading";

function RoomInfo({
  availableRooms,
  availableRoomsByGroup,
  searched,
  setBookCardOn,
  selectRoomToBook,
  removeRoomToBook,
  checkEmptyRoomList,
  loading
}) {
  const [error, setError] = useState("");

  // SELECT ROOM
  const selectRoom = (data) => {
    selectRoomToBook(data);
  };

  // REMOVE ROOM
  const removeRoom = (data) => {
    removeRoomToBook(data);
  };

  // GET PERMISSION TO GO TO NEXT PAGE
  const goToNextPage = () => {
    if(checkEmptyRoomList()){
      setBookCardOn(true);
    } else{
      setError("You have to select al least one room.");
    }
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
      ) : !loading ? (
        <>
          <div className="afterSerch">
            {/* available rooms by name */}
            <div className="availavleRoomTable">
              <div className="table-heading">
              <div className="icon"></div>
                <div className="id">Id {rsvg}</div>
                <div className="no">Room Numb {rsvg}</div>
                <div className="type">Room Type{rsvg}</div>
              </div>
              {availableRooms.map((room) => (
                <AvailableRoom
                  key={room.id}
                  room={room}
                  selectRoom={selectRoom}
                  removeRoom={removeRoom}
                />
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
          <button className="find" onClick={goToNextPage}>
            Select
          </button>
          <small className="error">{error}</small>
        </>
      ) : <Loading height="50vh" width="100%" textSize="16px" space="6px" text="Finding available rooms" />}
    </div>
  );
}

export default RoomInfo;
