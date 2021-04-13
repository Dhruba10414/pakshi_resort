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
      <div className="type">{room.room_type}</div>
    </div>
  );
}

export default AvailableRoom;
