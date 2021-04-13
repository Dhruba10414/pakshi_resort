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
  const [guest, setGuest] = useState(null);
  const [info, setInfo] = useState(null);
  const [roomTypeWithPrice, setRoomTypeWithPrice] = useState([]);
  const [loading, setLoading] = useState(false);

  // MAKE A BOOKING
  const makeBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    console.log(guest);
    console.log(info);
  };

  // FETCH ROOMS TYPE WITH PRICE
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
          <h1>Make a reservation for your unforgettable joyful memories.</h1>
        </div>

        {state === 0 ? (
          <GuestInformation
            setState={setState}
            setGuest={setGuest}
          />
        ) : state === 1 ? (
          <ChooseDate
            roomTypeWithPrice={roomTypeWithPrice}
            setInfo={setInfo}
            setState={setState}
          />
        ) : state === 3 ? (
          <Confirmation
            guestInfo={guest}
            roomInfo={info}
            makeBooking={makeBooking}
            setState={setState}
            loading={loading}
          />
        ) : null}
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookInGuestSide;
