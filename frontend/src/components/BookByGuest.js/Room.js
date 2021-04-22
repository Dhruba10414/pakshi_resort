import React from "react";

function Room({id, type, tariff, selectRoom}) {
    const [selected, ]
  return (
    <div className="room" onClick={() => selectRoom(id, type, tariff)}>
      <h3>{type}</h3>
      <p>
        {tariff}৳ <span>PER/NIGHT</span>
      </p>
    </div>
  );
}

export default Room;
