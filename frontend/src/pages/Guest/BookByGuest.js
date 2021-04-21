import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import RoomAndDate from "../../components/BookByGuest.js/RoomAndDate";

function BookByGuest() {
  const [state, setState] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.pakshiresort.com/bookings/room-type/")
      .then((res) => {
        setRooms(res.data);
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

        <RoomAndDate rooms={rooms} />
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookByGuest;
