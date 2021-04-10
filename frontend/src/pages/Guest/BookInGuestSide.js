import React, { useState } from "react";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
// Dummy Data
import { roomTypeWithPrice } from "../../assets/DummyRoomType";
import ChooseDate from "../../components/BookInGuest/ChooseDate";

function BookInGuestSide() {
  const [numberOfRooms, seNumberOfRooms] = useState("1");
  const [roomType, setRoomType] = useState("0");
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");

  const makeBooking = (startDate, endDate, room_type) => {
    const sd = startDate.getDate();
    const sm = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const sy = startDate.getFullYear();
    const ed = endDate.getDate();
    const em = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const ey = endDate.getFullYear();

    console.log(`${sd}-${sm}-${sy} || ${ed}-${sm}-${sy} || ${room_type}`);
  }

  return (
    <>
      <div className="guestbook">
        <div className="heading">
          <h1>Make a reservation</h1>
        </div>
        
        <ChooseDate roomTypeWithPrice={roomTypeWithPrice} makeBooking={makeBooking} />
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookInGuestSide;
