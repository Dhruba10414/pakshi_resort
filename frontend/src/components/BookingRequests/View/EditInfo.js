import React from "react";

function EditInfo({
  roomData,
  roomTypeWithPrice,
  setAvailableRoom,
  setState,
  setSelectedRoom,
  setRoomtype,
  setTariff,
}) {
  const filterRoomsWithNewType = (data) => {
    const filteredRooms = roomData.filter((room) => room.room_type === data.id);
    setAvailableRoom(filteredRooms);
    setState(false);
    setSelectedRoom([]);
    setRoomtype(data.room_type);
    setTariff(data.tariff);
  };

  return (
    <div className="edit">
      <h3>Available rooms</h3>

      <div className="room-ttypes">
        {roomTypeWithPrice.map((data) => (
          <div
            className="ttype"
            key={data.id}
            onClick={() => filterRoomsWithNewType(data)}
          >
            <div className="number">{data.id}.</div>
            <div className="name">
              <div>{data.room_type}</div>
              <div><h4>{data.tariff}<span> / room</span></h4></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditInfo;
