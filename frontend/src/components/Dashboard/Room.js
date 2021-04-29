import React, { useEffect, useState } from "react";

const checkedSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-check-circle"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const xSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x-circle"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

function Room({ room_no, room_type, cottage_num, status, active_booking, openDetailsModal}) {
  const [classes, setClasses] = useState("cottage");
  // OPEN ROOM DETAILS MODAL
  const open = () => {
    openDetailsModal(
      active_booking.guest.id,
      active_booking.guest.name,
      active_booking.check_in,
      active_booking.check_out,
      room_no,
      room_type
    )
  }

  useEffect(() => {
    if(cottage_num === 1){
      setClasses("cottage one");
    } else if(cottage_num === 2){
      setClasses("cottage two");
    }
    else if(cottage_num === 3){
      setClasses("cottage three");
    }
    else if(cottage_num === 4){
      setClasses("cottage four");
    } else{
      setClasses("cottage five");
    }
  }, []);

  return (
    <div className={status ? "aroom dim" : "aroom"} onClick={ status ? () => open() : null }>
      <div className="no">#{room_no}</div>
      
      <div className={classes}>
        <p>{cottage_num}</p>
      </div>

      <div className={status ? "status lock" : "status free"}>
        {status ? <p>{xSvg} Booked</p> : <p>{checkedSvg}Free</p>}
      </div>
      
      <div className="guest-name">
        {active_booking ? active_booking.guest.name : "---"}
      </div>
      
      <div className="checkin">
        {active_booking ? active_booking.check_in : "---"}
      </div>
      
      <div className="checkout">
        {active_booking ? active_booking.check_out : "---"}
      </div>
    </div>
  );
}

export default Room;
