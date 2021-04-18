import React, { useState } from "react";
import { checked, pencil, x } from "../../../assets/images/SVG";
import check from "../../../assets/images/View/svg/cheklist-complete.svg";
import alarm from "../../../assets/images/View/svg/alarm.svg";
import Loading from "../../Loading";
import AvailableRoom from "./AvailableRoom";
import EditInfo from "./EditInfo";

function ViewOption({
  loading,
  availableroom,
  viewFor,
  successNotify,
  warningNotify,
}) {
  const [selectedroom, setSelectedRoom] = useState([]);
  const [ok, setOk] = useState(0);
  const [state, setState] = useState(false);

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
      successNotify();
      setOk(1);
      console.log(viewFor.guest.guestId);
      console.log(selectedroom);
      console.log(viewFor.info.checkin);
      console.log(viewFor.info.checkout);
    }
  };

  // CANCEL BOOKING
  const cancelbooking = () => {
    setOk(2);
  }

  return (
    <div className="activities">
      <h3>Options</h3>
      <div className="options">
        <div className="option confirm" onClick={makeAbooking}>
          <div className="logo">{checked}</div>
          <div>Confirm</div>
        </div>
        <div className="option cancel" onClick={cancelbooking}>
          <div className="logo">{x}</div>
          <div>Cancel</div>
        </div>
        <div className="option edit" onClick={() => setState(true)}>
          <div className="logo">{pencil}</div>
          <div>Edit</div>
        </div>
      </div>

      {/* ---------------- activities ------------- */}
      <h3>Activities</h3>
      <div className="work">
        {!loading ? (
          // if it is not edit mode
          !state ?
            // if booking is not completed yet
            ok === 0 ?
            // if room is available
              availableroom.length > 0 ?
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
              : <div className="notava">No room is available</div>
            : ok === 1
              ? <div className="notava">
                <img src={check} alt="" />
                <h4> Booking Complete </h4>
              </div>
              : <div className="notava alarm">
                <img src={alarm} alt="" />
                <h4> Booking Canceled! </h4>
                <button onClick={() => setOk(0)}>Go Back</button>
              </div>

          // edit mode
          : <EditInfo />
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
