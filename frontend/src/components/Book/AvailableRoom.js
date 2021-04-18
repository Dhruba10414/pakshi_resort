import React, { useState } from "react";
import { check } from "../../assets/images/SVG";

function AvailableRoom({ selectRoom, removeRoom, room }) {
  const [select, setSelect] = useState(room.selected);

  // SELECTOIN FUNCTIONALITY
  const selectFoodItemFunc = () => {
    if (select) {
      setSelect(false);
      removeRoom(room);
    } else {
      setSelect(true);
      selectRoom(room);
    }
  };

  return (
    <div className="available-room" onClick={() => { selectFoodItemFunc();}}>
      {!select ? (<div className="icon"></div>) : (<div className="icon">{check}</div>)}
      <div className="id">{room.id}</div>
      <div className="no"># {room.room_num}</div>
      <div className="type">
        {
          room.room_type === 1
          ? "Deluxe Room (Single Bed)"
          : room.room_type === 2
            ? "Deluxe Room (Couple Bed)"
            : room.room_type === 3
              ? "Deluxe Room (Twin Bed)"
              : room.room_type === 4
                ? "Deluxe Room (Family Bed)"
                : room.room_type === 5
                  ? "Luxury Room"
                  : "Karni Kunjo Honeymoon Suit"
        }
      </div>
    </div>
  );
}

export default AvailableRoom;
