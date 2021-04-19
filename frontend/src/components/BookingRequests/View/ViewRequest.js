import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../assets/URLS";
// Components
import ViewInfo from "./ViewInfo";
import ViewOption from "./ViewOption";
import { check } from "../../../assets/images/SVG";

const room_types = [
  "Deluxe Room (Single Bed)",
  "Deluxe Room (Couple Bed)",
  "Deluxe Room(Twin Bed)",
  "Deluxe Room (Family Bed)",
  "Luxury Room",
  "Karni Kunjo Honeymoon Suit ",
];

function ViewRequest({ viewFor, setOpenModal }) {
  const [loading, setLoading] = useState(false);
  const [availableroom, setAvailableRoom] = useState(false);
  const [roomData, setRoomData] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  // NOTIFY FOR SUCCESS
  const successNotify = () => {
    setTimeout(() => {
      setSuccess(false);
      setOpenModal(false);
    }, 2500);
    setSuccess(true);
  }

  // NOTIFY FOR WARNING
  const warningNotify = () => {
    setTimeout(() => {
      setWarning(false);
    }, 2500);
    setWarning(true);
  }

  // NOTIFY FOR CANCEL
  const cancelNotify = () => {
    setTimeout(() => {
      setCancel(false);
      setOpenModal(false);
    }, 3000);
    setCancel(true);
  }

  // FIND AVAILABLE ROOMS
  const findAvailableRooms = (rooms) => {
    // determine requested room type
    let roomtype;
    room_types.map((type, index) => {
      if (type === viewFor.info.roomType) {
        roomtype = index + 1;
      }
    });
    // find rooms using determined type
    const filteredRooms = rooms.filter((room) => room.room_type === roomtype);
    // Save rooms
    setAvailableRoom(filteredRooms);
  };

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
            setRoomData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          });
      });
  }, []);

  return (
    <>
      <div className="viewrequest">
        <ViewOption
          availableroom={availableroom}
          loading={loading}
          viewFor={viewFor}
          roomData={roomData}
          successNotify={successNotify}
          warningNotify={warningNotify}
          cancelNotify={cancelNotify}
          setAvailableRoom={setAvailableRoom}
        />
        <ViewInfo viewFor={viewFor} />
      </div>

      <div className={success ? "message success" : "success message disabled"}>
        <div>{check}</div> Successfully Booked!
      </div>
      <div className={warning ? "warning message" : "warning message disabled"}>
        <div>!</div> Number of selected rooms mismatched!
      </div>
      <div className={cancel ? "cancel message" : "cancel message disabled"}>
        <div>!</div> Successfully Canceled!
      </div>
    </>
  );
}

export default ViewRequest;
