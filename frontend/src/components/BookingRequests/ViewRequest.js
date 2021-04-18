import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../assets/URLS";
// Components
import ViewInfo from "./ViewInfo";
import ViewOption from "./ViewOption";

const room_types = [
    "Deluxe Room (Single Bed)",
    "Deluxe Room (Couple Bed)",
    "Deluxe Room(Twin Bed)",
    "Deluxe Room (Family Bed)",
    "Luxury Room",
    "Karni Kunjo Honeymoon Suit ",
]

function ViewRequest({ viewFor }) {
  const [loading, setLoading] = useState(false);
  const [availableroom, setAvailableRoom] = useState(false);

  // FIND AVAILABLE ROOMS
  const findAvailableRooms = (rooms) => {
    // determine requested room type
    let roomtype;
    room_types.map((type, index) => {
        if(type ===  viewFor.info.roomType){
            roomtype = index + 1;
        }
    });
    // find rooms using determined type
    const filteredRooms = rooms.filter(room => room.room_type === roomtype );
    // Save rooms
    setAvailableRoom(filteredRooms);
  }

  // FETCH DATA
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const AVAILABLITY_CHECK = `${api.available_rooms}?check_in=${viewFor.info.checkin}&check_out=${viewFor.info.checkout}`;

    // api -call
    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        // search by list
        axios
          .get(AVAILABLITY_CHECK, Config)
          .then((res) => {
              findAvailableRooms(res.data);
              setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          });
      });
  }, []);

  return (
    <div className="viewrequest">
      <ViewOption availableroom={availableroom} loading={loading} viewFor={viewFor} />
      <ViewInfo viewFor={viewFor} />
    </div>
  );
}

export default ViewRequest;
