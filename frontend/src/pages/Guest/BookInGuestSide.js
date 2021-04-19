import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import ChooseDate from "../../components/BookInGuest/ChooseDate";
import GuestInformation from "../../components/BookInGuest/GuestInformation";
import Confirmation from "../../components/BookInGuest/Confirmation";
import { api } from "../../assets/URLS";
// Dummy Data
// import { roomTypeWithPrice } from "../../assets/DummyRoomType";

function BookInGuestSide() {
  const [state, setState] = useState(0);
  const [guest, setGuest] = useState(null);
  const [info, setInfo] = useState(null);
  const [roomTypeWithPrice, setRoomTypeWithPrice] = useState([]);
  const [loading, setLoading] = useState(false);

  // MAKE A BOOKING
  const makeBooking = () => {
    // create a guest first
    setLoading(true);
    axios.post(api.create_guest, guest)
    .then((res) => { 
      // send booking request using gues.id
      const Body = {
        "guest": res.data.id,
        "room_type": parseInt(info.type),
        "num_of_rooms": parseInt(info.roomNumbers),
        "check_in": info.checkin,
        "check_out": info.checkout
      }
      console.log(Body);
      axios.post(api.request_for_booking, Body)
      .then(() => {console.log("Success"); setLoading(true); })
      .catch((err) => {console.log(err.message); setLoading(false); });
     })
    .catch(err => {console.log(err.message); setLoading(true);});
  };

  // FETCH ROOMS TYPE WITH PRICE
  useEffect(() => {
    axios
      .get("http://api.pakshiresort.com/bookings/room-type/")
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
