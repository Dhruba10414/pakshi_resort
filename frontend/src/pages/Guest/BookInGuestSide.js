import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import ChooseDate from "../../components/BookInGuest/ChooseDate";
import GuestInformation from "../../components/BookInGuest/GuestInformation";
import Confirmation from "../../components/BookInGuest/Confirmation";

function BookInGuestSide() {
  const [state, setState] = useState(0);
  const [guest, setGuest] = useState("");
  const [roomTypeWithPrice, setRoomTypeWithPrice] = useState([]);

  // STORE GUEST INFORMATION
  const setupGuestBody = (name, email, contact, address) => {
    setGuest({ name: name, email: email, contact: contact, address: address });
  };

  const makeBooking = (startDate, endDate, room_type) => {
    const sd = startDate.getDate();
    const sm = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const sy = startDate.getFullYear();
    const ed = endDate.getDate();
    const em = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const ey = endDate.getFullYear();

    console.log(`${sd}-${sm}-${sy} || ${ed}-${sm}-${sy} || ${room_type}`);
    console.log(guest);
    setState(3);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bookings/room-type/")
      .then((res) => {
        setRoomTypeWithPrice(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div className="guestbook">
        <div className="heading">
          <h1>Make a reservation</h1>
          <p>
            We mainly deal with booking issues onsite. However, keeping in mind
            your busy schedule, we also provide online booking services for you.
            For online booking you need to send us your information and your
            preferred room type with number of room(s).
          </p>
        </div>

        {state === 0 ? (
          <GuestInformation
            setState={setState}
            setupGuestBody={setupGuestBody}
          />
        ) : state === 1 ? (
          <ChooseDate
            roomTypeWithPrice={roomTypeWithPrice}
            makeBooking={makeBooking}
            setState={setState}
          />
        ) : state === 3 ? (
          <Confirmation />
        ) : null}
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookInGuestSide;
