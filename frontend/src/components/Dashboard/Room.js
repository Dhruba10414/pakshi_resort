import React from "react";

function Room({ no, status, active_booking, openFoodOrderModal }) {
  return (
    <div className={status ? "aroom dim" : "aroom"}>
      <div className="no">#{no}</div>
      <div className={status ? "status lock" : "status free"}>{status ? <p>Booked</p> : <p>Free</p>}</div>
      <div className="guest-name">{active_booking ? active_booking.guest.name : "---"}</div>
      <div className="checkin">{active_booking ? active_booking.check_in : "---"}</div>
      <div className="checkout">{active_booking ? active_booking.check_out : "---"}</div>

      <div className="food-order">
        {active_booking ? (
          <button
            onClick={() => openFoodOrderModal(
              active_booking.guest.id,
              active_booking.guest.name,
              no
            )}
          >
            Order Food
          </button>
        ) : (
          "---"
        )}
      </div>
    </div>
  );
}

export default Room;
