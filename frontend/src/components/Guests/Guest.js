import React, { useRef, useState } from "react";
import gsap from "gsap";

function Guest({
  id,
  name,
  phone,
  address,
  email,
  booked_rooms,
  openTicketModal,
  openInvoiceModal,
  openFoodOrderModal,
}) {
  const [openRoom, setOpenRoom] = useState(false);
  const rref = useRef(null);

  const controlRoomBlock = () => {
    let tl = gsap.timeline();

    if (!openRoom) {
      tl.to(rref.current, 0.3, {
        css: {zIndex: 10, height: "26vh"},
        height: "12vh",
        ease: "expo.in",
      });
      setOpenRoom(!openRoom);
    } else{
      tl.to(rref.current, 0.3, {
        css: {zIndex: 1, height: "8vh"},
        ease: "expo.in",
      });
      setOpenRoom(!openRoom);
    }
  };
  
  return (
    <div className="aguest">
      <div className="guest-name">{name}</div>
      <div className="phone">{email}</div>
      <div className="phone">{phone}</div>
      <div className={!openRoom ? "rooms" : "rooms rooms-colored"} onClick={controlRoomBlock}>
        <div ref={rref} className="roomNumb">
          {booked_rooms.map((room) => <div key={room}>{room}</div>)}
        </div>
      </div>
      <div className="options">
        <button
          className="order-food"
          onClick={() => openFoodOrderModal(id, name)}
        >
          Order Foods
        </button>
        <button
          className="buy-tickets"
          onClick={() => openTicketModal(id, name, phone, address, email)}
        >
          Buy tickets
        </button>
        <button
          className="bill"
          onClick={() => openInvoiceModal(id, name, phone, address)}
        >
          View Bill
        </button>
      </div>
    </div>
  );
}

export default Guest;
