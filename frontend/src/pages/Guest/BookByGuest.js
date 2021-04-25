import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import SelectAroom from "../../components/BookByGuest.js/SelectAroom";
import SelectAtime from "../../components/BookByGuest.js/SelectAtime";
import GiveGuestData from "../../components/BookByGuest.js/GiveGuestData";
import Confirmed from "../../components/BookByGuest.js/Confirmed";

function BookByGuest() {
  const [state, setState] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomAmount, setRoomAmount] = useState(1);
  const [selectTime, setSelectTime] = useState({});
  const [loading, setLoading] = useState(false);

  const makeBookingRequest = () => {
    console.log(selectedRoom);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://api.pakshiresort.com/bookings/room-type/")
      .then((res) => {
        const avarooms = res.data.map((room) => {
          const aroom = { ...room, selected: false };
          return aroom;
        });
        setRooms(avarooms);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="book-in-by-guest">
        <div className="heading">
          <h1>
            Make a reservation and come to our charming sniptious place for
            creating your unforgettable joyfull moments.
          </h1>
        </div>

        {state === 0 ? (
          <SelectAroom
            rooms={rooms}
            setSelectedRoom={setSelectedRoom}
            setState={setState}
          />
        ) : state === 1 ? (
          <SelectAtime
            setSelectTime={setSelectTime}
            setState={setState}
            setRoomAmount={setRoomAmount}
          />
        ) : state === 2 ? (
          <GiveGuestData
            roomAmount={roomAmount}
            selectedRoom={selectedRoom}
            selectTime={selectTime}
            setState={setState}
          />
        ) : (
          <Confirmed setState={setState} />
        )}
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookByGuest;
