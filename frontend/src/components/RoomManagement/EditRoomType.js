import React, { useEffect, useState } from "react";
import axios from "axios";
import { check, rsvg } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";

function EditRoomType({ room, rooms, setTypeModal, changed, setChanged }) {
  const [type, setType] = useState("");
  const [tariff, setTariff] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sameTypeRooms, setSameTypeRooms] = useState([]);

  //   setup data
  useEffect(() => {
    setType(room.room_type);
    setTariff(room.tariff);

    const filteredRooms = rooms.filter((r) => r.room_type === room.room_type);
    setSameTypeRooms(filteredRooms);
  }, []);

  //   form validation
  const validationCheck = () => {
    if (type && tariff) {
      if (/^\d+$/.test(tariff)) {
        return true;
      } else {
        setError("Invalid tariff format.");
        return false;
      }
    } else {
      setError("Required all fields.");
      return false;
    }
  };

  //   notify if success
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    setSuccess(true);
  };

  //   update room type
  const updateRoom = (event) => {
    event.preventDefault();

    if (validationCheck()) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const UPDATE_ROOM_TYPE = api.update_room_type_with_price;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = { headers: { Authorization: "Bearer " + token.data.access } };
          const Body = { "id": room.id, "tariff": tariff };

          axios
            .patch(UPDATE_ROOM_TYPE, Body, Config)
            .then(() => {
              notify();
              setLoading(false);
              setChanged(!changed);
            })
            .catch((err) => {
              setError("Something went wrong. Please try again later.");
              setLoading(false);
              console.clear();
            });
        })
        .catch(() => {
          setError("Network error. Please try again later.");
          setLoading(false);
          console.clear();
        });
    }
  };

  return (
    <div className="roomtype">
      <div className="roomtype__editRoomType">
        <h3>Update Room Type</h3>
        <form>
          <div className="input-block">
            <label>Room type</label>
            <input
              type="text"
              value={type}
              disabled
            />
          </div>
          <div className="input-block">
            <label>Room tariff</label>
            <input
              type="text"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
            />
          </div>
          <small>{error}</small>
          <div className="btn-box">
            <button onClick={() => setTypeModal(false)} className="back">
              Back
            </button>
            {
                loading 
                ? (<button className="update">Processing...</button>) 
                : (<button onClick={updateRoom} className="update">Update</button>)
            }
          </div>
        </form>
      </div>
      <div className="roomtype__allRooms">
        <h3>Rooms</h3>
        <div className="table">
          <div className="table-heading">
            <div className="cottage">Cottage {rsvg}</div>
            <div className="numb">Room no. {rsvg}</div>
            <div className="type">Type {rsvg}</div>
          </div>
          {sameTypeRooms.map((room) => (
            <div className="entry" key={room.id}>
              <div 
                className={
                room.cottage_num === 1
                ? "cottage one"
                : room.cottage_num === 2
                  ? "cottage two"
                  : room.cottage_num === 3
                    ? "cottage three"
                    : room.cottage_num === 4
                      ? "cottage four"
                      : "cottage five"
                }
              >
                 <p>{room.cottage_num}</p>
             </div>
              <div className="numb">{room.room_num}</div>
              <div className="type">{room.room_type}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{check}</div> Successfully Submitted!
      </div>
    </div>
  );
}

export default EditRoomType;
