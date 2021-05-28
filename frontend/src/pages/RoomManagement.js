import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../assets/URLS";
import ContentBox from "../components/StaffSection/ContentBox";
import { more_horizontal } from "../assets/images/SVG";
import Room from "../components/RoomManagement/Room";
import EditRoomType from "../components/RoomManagement/EditRoomType";
import Loading from "../components/Loading";

function RoomManagement() {
  const [roomTypeWithPrice, setRoomTypeWithPrice] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [typeModal, setTypeModal] = useState(false);
  const [editFor, setEditFor] = useState({});
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const ROOM_TYPES = api.room_type_with_price;

    axios
      .get(ROOM_TYPES)
      .then((res) => {
        setRoomTypeWithPrice(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.clear();
      });

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(api.rooms, Config)
          .then((res) => {
            setRooms(res.data);
            setLoading(false);
          })
          .catch(() => {
            console.clear();
            setLoading(false);
          });
      })
      .catch(() => {
        console.clear();
      });
  }, [changed]);

  return (
    <ContentBox heading="Room Management">
      <div className="roomManagement">
        {
          !typeModal
          ? 
            loading 
            ? <Loading
              height="80vh"
              width="100%"
              textSize="16px"
              space="4px"
            />
            : <div className="roomCardContainer">
                {roomTypeWithPrice.map((room) => (
                  <Room
                    key={room.id}
                    room={room}
                    setTypeModal={setTypeModal}
                    setEditFor={setEditFor}
                  />
                ))}
              </div>
          :
          <EditRoomType
            room={editFor}
            rooms={rooms}
            setTypeModal={setTypeModal}
            setChanged={setChanged}
            changed={changed}
          />
        }
      </div>
    </ContentBox>
  );
}

export default RoomManagement;
