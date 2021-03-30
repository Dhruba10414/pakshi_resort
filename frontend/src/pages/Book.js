import React, { useEffect, useState } from "react";
import SceduleSetup from "../components/Booking/SceduleSetup";
import RoomInfo from "../components/Booking/RoomInfo";
import ContentBox from "../components/StaffSection/ContentBox";
import axios from "axios";

function Book() {
  const [ availableRooms, setAvailableRooms ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateSchedule = (startDate, endDate) => {
    setLoading(true);
    
    const sd = startDate.getDate()
    const sm = (startDate.getMonth() + 1).toString().padStart(2, '0');;
    const sy = startDate.getFullYear();

    const ed = endDate.getDate();
    const em = (endDate.getMonth() + 1).toString().padStart(2, '0');
    const ey = endDate.getFullYear();


    // URLS
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const ROOM_SEARCH_URL = `http://127.0.0.1:8000/bookings/rooms/available/?check_in=${sd}-${sm}-${sy}&check_out=${ed}-${em}-${ey}&as_group=true`;

    // GET DATA USING API URL
    axios.post(GET_ACCESS_TOKEN_URL, {refresh: REFRESH_TOKEN})
    .then((token) => {
      const Config = {headers: { Authorization: "Bearer " + token.data.access }};

      axios.get(ROOM_SEARCH_URL, Config)
      .then((res) => { setAvailableRooms(res.data); setLoading(false); })
      .catch((err) => { setError("Something went wrong! Try again."); setLoading(false); });

    })
    .catch((err) => { setError("Atherization Error! Please login and try again"); setLoading(false);;})
  };


  return (
    <ContentBox heading="Booking">
      <div className="bookBox">
        <div className="schedule-info">
          <div className="input-head">
            <h2>BOOKING</h2>
            <p>information</p>
          </div>
          <SceduleSetup updateSchedule={updateSchedule} />
        </div>
        <RoomInfo />
      </div>
    </ContentBox>
  );
}

export default Book;
