import React from "react";

function Entry({
  guestId,
  guestName,
  guestPhone,
  guestEmail,
  guestAddress,
  roomType,
  checkin,
  checkout,
  requestedOn,
  numberOfRooms,
  viewRequest,
}) {
    
  //  OPEN BOOKING MODAL TO BOOK FOR REQUEST
  const openBookModal = () => {
    const guestData = {guestId, guestName, guestPhone, guestEmail, guestAddress,}
    const bookingData = {roomType, checkin, checkout, requestedOn, numberOfRooms}
    const data = {guest: guestData, info: bookingData}
    viewRequest(data);
  };

  return (
    <div className="entry" onClick={openBookModal}>
      <div className="guest-name">{guestName}</div>
      <div className="cell">{guestPhone}</div>
      <div className="type">{roomType}</div>
      <div className="checkin">{checkin}</div>
      <div className="checkout">{checkout}</div>
      <div className="amount"><p>{numberOfRooms}</p></div>
    </div>
  );
}

export default Entry;
