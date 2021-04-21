import React, { useState } from "react";

function AvailableRoom({ room, selectRoom, removeRoom }) {
  const [seleceted, setSelected] = useState(false);

  const selectionController = () => {
    if(!seleceted)  {
        setSelected(true);
        selectRoom(room.id)
    } else{
        setSelected(false);
        removeRoom(room.id)
    }
  }

  return (
    <div
      className={!seleceted ? "ava-room" : "ava-room selected"}
      key={room.id}
      onClick={selectionController}
    >
      <div className="heading">Room</div>
      <div className="value">{room.room_num}</div>
    </div>
  );
}

export default AvailableRoom;
