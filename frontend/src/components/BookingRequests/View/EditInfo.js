import React, { useEffect, useState } from "react";

const room_types = [
  "Deluxe Room (Single Bed)",
  "Deluxe Room (Couple Bed)",
  "Deluxe Room(Twin Bed)",
  "Deluxe Room (Family Bed)",
  "Luxury Room",
  "Karni Kunjo Honeymoon Suit ",
];
function EditInfo({ viewFor, roomData, setAvailableRoom, setState, setSelectedRoom }) {
  const [types, setTypes] = useState([]);

  const filterRoomsWithNewType = (data) => {
    const filteredRooms = roomData.filter((room) => room.room_type === data.id);
    setAvailableRoom(filteredRooms);
    setState(false);
    setSelectedRoom([]);
  };

  useEffect(() => {
    let list = [];
    room_types.map((type, index) => {
      if (type !== viewFor.info.roomType) {
        list = [...list, { id: index + 1, type: type }];
      }
    });
    setTypes(list);
  }, []);

  return (
    <div className="edit">
      <h3>Available rooms</h3>

      <div className="room-ttypes">
        {types.map((data, index) => (
          <div
            className="ttype"
            key={data.id}
            onClick={() => filterRoomsWithNewType(data)}
          >
            <div className="number">{index + 1}.</div>
            <div className="name">{data.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditInfo;
