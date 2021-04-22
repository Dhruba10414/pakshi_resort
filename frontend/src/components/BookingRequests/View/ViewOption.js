import React, { useState } from "react";
import { checked, pencil, x } from "../../../assets/images/SVG";
import check from "../../../assets/images/View/svg/cheklist-complete.svg";
import alarm from "../../../assets/images/View/svg/alarm.svg";
import signal from "../../../assets/images/View/svg/signal.svg";
import Loading from "../../Loading";
import AvailableRoom from "./AvailableRoom";
import EditInfo from "./EditInfo";
import axios from "axios";
import { api } from "../../../assets/URLS";

function ViewOption({
  loading,
  availableroom,
  viewFor,
  roomData,
  successNotify,
  warningNotify,
  cancelNotify,
  setAvailableRoom,
}) {
  const [selectedroom, setSelectedRoom] = useState([]);
  const [ok, setOk] = useState(0);
  const [state, setState] = useState(false);
  const [processloading, setprocessLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [canceling, setCanceling] = useState(false);

  // SELECT ROOM
  const selectRoom = (id) => {
    setSelectedRoom([...selectedroom, id]);
  };

  // REMOVE ROOM
  const removeRoom = (id) => {
    const filtered = selectedroom.filter((roomId) => roomId !== id);
    setSelectedRoom(filtered);
  };

  // MAKE BOOKING
  const makeAbooking = () => {
    if (selectedroom.length !== viewFor.info.numberOfRooms) {
      warningNotify();
    } else {
      setprocessLoading(true);
      setConfirming(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const REQUEST_ACCEPT = api.accept_booking_request;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const BodyForBooking = {
            "id": viewFor.id,
            "rooms": selectedroom,
          };

          axios
            .post(REQUEST_ACCEPT, BodyForBooking, Config)
            .then(() => {
              setprocessLoading(false);
              setConfirming(false);
              successNotify();
              setOk(1);
            })
            .catch((err) => {
              console.log(err.message);
              setprocessLoading(false);
              setConfirming(false);
            });
        });
    }
  };

  // CANCEL BOOKING
  const cancelbooking = () => {
    setprocessLoading(true);
    setCanceling(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const DELETE_GUEST = api.delete_fraud_guest;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        axios
          .delete(DELETE_GUEST, {
            headers: { Authorization: "Bearer " + token.data.access },
            data: { guest: viewFor.guest.guestId },
          })
          .then(() => {
            setprocessLoading(false);
            setCanceling(false);
            setOk(2);
            cancelNotify();
          })
          .catch((err) => {
            console.log(err.message);
            setprocessLoading(false);
            setCanceling(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
        setprocessLoading(false);
        setCanceling(false);
      });
  };

  return (
    <div className="activities">
      {/* ---------------- options ------------- */}
      <h3>Options</h3>
      <div className="options">
        {!processloading ? (
          <div className="option confirm" onClick={makeAbooking}>
            <div className="logo">{checked}</div>
            <div>Confirm</div>
          </div>
        ) : (
          <div className="option confirm">
            <div className="logo">{checked}</div>
            <div>{confirming ? "Processing.." : "Confirm"}</div>
          </div>
        )}
        {!processloading ? (
          <div className="option cancel" onClick={cancelbooking}>
            <div className="logo">{x}</div>
            <div>Cancel</div>
          </div>
        ) : (
          <div className="option cancel">
            <div className="logo">{x}</div>
            <div>{canceling ? "Processing.." : "Cancel"}</div>
          </div>
        )}
        {!processloading ? (
          <div className="option edit" onClick={() => setState(true)}>
            <div className="logo">{pencil}</div>
            <div>Edit</div>
          </div>
        ) : (
          <div className="option edit">
            <div className="logo">{pencil}</div>
            <div>Edit</div>
          </div>
        )}
      </div>

      {/* ---------------- activities ------------- */}
      <h3>Activities</h3>
      <div className="work">
        {!loading ? (
          // if it is not edit mode
          !state ? (
            // if booking is not completed yet
            ok === 0 ? (
              // if room is available
              availableroom.length > 0 ? (
                <div className="ava">
                  {availableroom.map((room) => (
                    <AvailableRoom
                      key={room.id}
                      room={room}
                      selectRoom={selectRoom}
                      removeRoom={removeRoom}
                    />
                  ))}
                </div>
              ) : (
                <div className="notava">
                  <img src={signal} alt="" />
                  <h4 style={{color: "var(--yellow-dark)"}}>Not available!</h4>
                </div>
              )
            ) : ok === 1 ? (
              <div className="notava">
                <img src={check} alt="" />
                <h4> Booking Complete </h4>
              </div>
            ) : (
              <div className="notava alarm">
                <img src={alarm} alt="" />
                <h4> Booking Canceled! </h4>
              </div>
            )
          ) : (
            // edit mode
            <EditInfo
              viewFor={viewFor}
              roomData={roomData}
              setAvailableRoom={setAvailableRoom}
              setState={setState}
              setSelectedRoom={setSelectedRoom}
            />
          )
        ) : (
          <Loading
            width="100%"
            height="45vh"
            text="Find available rooms"
            textSize="14px"
          />
        )}
      </div>
    </div>
  );
}

export default ViewOption;
