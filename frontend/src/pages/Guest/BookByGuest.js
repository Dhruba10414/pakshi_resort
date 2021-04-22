import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import SelectTime from "../../components/BookByGuest.js/SelecTime";
import SelectRoom from "../../components/BookByGuest.js/SelectRoom";

function BookByGuest() {
  const [state, setState] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.pakshiresort.com/bookings/room-type/")
      .then((res) => {
        const avarooms = res.data.map(room => {
          const aroom = {...room, selected: false};
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

        {
          state === 0
          ? <SelectRoom rooms={rooms} setSelectedRoom={setSelectedRoom} />
          : state === 1
            ? <SelectTime />
            : "Confirm"
        }
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default BookByGuest;
