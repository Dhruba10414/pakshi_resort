import React, { useEffect, useState } from "react";
import { checked, pencil, trash } from "../../../assets/images/SVG";
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
  roomTypeWithPrice,
  viewFor,
  roomData,
  roomTariff,
  successNotify,
  warningNotify,
  cancelNotify,
  setAvailableRoom,
  stayingdays,
}) {
  const [selectedroom, setSelectedRoom] = useState([]);
  const [roomType, setRoomtype] = useState(viewFor.info.roomType);
  const [tariff, setTariff] = useState(0);
  const [ok, setOk] = useState(0);
  const [state, setState] = useState(false);
  const [processloading, setprocessLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTariff(roomTariff);
  }, [roomTariff]);

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
    if (
      roomType === viewFor.info.roomType &&
      selectedroom.length !== viewFor.info.numberOfRooms
    ) {
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
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };
          const BodyForBooking = {
            id: viewFor.id,
            rooms: selectedroom,
          };

          axios
            .post(REQUEST_ACCEPT, BodyForBooking, Config)
            .then(() => {
              setprocessLoading(false);
              setConfirming(false);
              successNotify();
              setOk(1);
            })
            .catch(() => {
              console.clear();
              setprocessLoading(false);
              setConfirming(false);
            });
        });
    }
  };

  // DELETE FRAUD GUEST ENTRIES
  const deleteFraudGuestEntries = () => {
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
          .catch(() => {
            console.clear();
            setprocessLoading(false);
            setCanceling(false);
          });
      })
      .catch(() => {
        console.clear();
        setprocessLoading(false);
        setCanceling(false);
      });
  };

  // DELETE REQUEST
  const deleteBooking = () => {
    setprocessLoading(true);
    setDeleting(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const DELETE_BOOKING = api.delete_booking_request;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        axios
          .delete(DELETE_BOOKING, {
            headers: { Authorization: "Bearer " + token.data.access },
            data: { id: viewFor.id },
          })
          .then(() => {
            setprocessLoading(false);
            setDeleting(false);
            setOk(2);
            cancelNotify();
          })
          .catch(() => {
            console.clear();
            setprocessLoading(false);
            setDeleting(false);
          });
      })
      .catch(() => {
        console.clear();
        setprocessLoading(false);
        setDeleting(false);
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
        {/* {!processloading ? (
          <div className="option cancel" onClick={deleteFraudGuestEntries}>
            <div className="logo">{x}</div>
            <div>Cancel</div>
          </div>
        ) : (
          <div className="option cancel">
            <div className="logo">{x}</div>
            <div>{canceling ? "Processing.." : "Cancel"}</div>
          </div>
        )} */}
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
        {!processloading ? (
          <div className="option delete" onClick={deleteBooking}>
            <div className="logo">{trash}</div>
            <div>Delete</div>
          </div>
        ) : (
          <div className="option delete">
            <div className="logo">{trash}</div>
            <div>{deleting ? "Processing.." : "Delete"}</div>
          </div>
        )}
      </div>

      {/* ---------------- activities ------------- */}
      <div className="work_head">
        <h3>
          Available rooms <span>({roomType})</span>
        </h3>
        <div className="work_head__sub">
          <h3>
            Staying time:{" "}
            <span>
              {stayingdays}
              {stayingdays > 1 ? "days" : "day"}
            </span>
          </h3>
          <h3>
            Cost:{" "}
            <span>
              {tariff * selectedroom.length * stayingdays +
                tariff * selectedroom.length * stayingdays * (15 / 100)}
            </span>
          </h3>
        </div>
      </div>
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
                  <h4 style={{ color: "var(--yellow-dark)" }}>
                    Not available!
                  </h4>
                </div>
              )
            ) : ok === 1 ? (
              <div className="notava">
                <img src={check} alt="" />
                <h4> Booking Completed </h4>
              </div>
            ) : (
              <div className="notava alarm">
                <img src={alarm} alt="" />
                <h4> Booking request deleted! </h4>
              </div>
            )
          ) : (
            // edit mode
            <EditInfo
              roomData={roomData}
              roomTypeWithPrice={roomTypeWithPrice}
              setAvailableRoom={setAvailableRoom}
              setState={setState}
              setSelectedRoom={setSelectedRoom}
              setRoomtype={setRoomtype}
              setTariff={setTariff}
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
