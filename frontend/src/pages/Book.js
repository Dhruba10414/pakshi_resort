import React, { useEffect, useState } from "react";
import SceduleSetup from "../components/Booking/SceduleSetup";
import RoomInfo from "../components/Booking/RoomInfo";
import ContentBox from "../components/StaffSection/ContentBox";
import axios from "axios";
import BookingForm from "../components/Booking/BookingForm";

function Book() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsByGroup, setAvailableRoomsByGroup] = useState([]);
  const [roomToBooked, setRoomToBooked] = useState(null);
  const [stayingTime, setStayingTime] = useState(null);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookCardOn, setBookCardOn] = useState(false);
  const [error, setError] = useState("");

  // SEARCH AVAILABLE ROOMS
  const searchRoomUsingDate = (startDate, endDate) => {
    setLoading(true);
    setSearched(true);
    setBookCardOn(false);

    const sd = startDate.getDate();
    const sm = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const sy = startDate.getFullYear();
    const ed = endDate.getDate();
    const em = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const ey = endDate.getFullYear();

    setStayingTime({checkIn: `${sd}-${sm}-${sy}`, checkOut: `${ed}-${em}-${ey}`});

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const ROOM_SEARCH_URL = `http://127.0.0.1:8000/bookings/rooms/available/?check_in=${sd}-${sm}-${sy}&check_out=${ed}-${em}-${ey}`;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };

        // search by list
        axios
          .get(ROOM_SEARCH_URL, Config)
          .then((res) => {
            setAvailableRooms(res.data);
          })
          .catch((err) => {
            setError("Something went wrong! Try again.");
          });
        // search by group
        axios
          .get(`${ROOM_SEARCH_URL}&as_group=true`, Config)
          .then((res) => {
            setAvailableRoomsByGroup(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError("Something went wrong! Try again.");
            setLoading(false);
          });
      })
      .catch((err) => {
        setError("Atherization Error! Please login and try again");
        setLoading(false);
      });
  };

  // SELECT A ROOM TO BOOK
  const selectRoomToBook = (roomData) => {
    setRoomToBooked(roomData);
  };

  return (
    <ContentBox heading="Booking">
      {!bookCardOn ? (
        <div className="bookBox">
          <div className="schedule-info">
            <div className="input-head">
              <h2>BOOKING</h2>
              <p>information</p>
            </div>
            <SceduleSetup
              searchRoomUsingDate={searchRoomUsingDate}
              setSearched={setSearched}
            />
          </div>
          <RoomInfo
            availableRooms={availableRooms}
            availableRoomsByGroup={availableRoomsByGroup}
            searched={searched}
            bookCardOn={bookCardOn}
            setBookCardOn={setBookCardOn}
            selectRoomToBook={selectRoomToBook}
          />
        </div>
      ) : (
        <BookingForm
          roomData={roomToBooked}
          stayingTime={stayingTime}
          setBookCardOn={setBookCardOn}
         />
      )}
    </ContentBox>
  );
}

export default Book;
