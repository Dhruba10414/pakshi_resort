import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";

// Components
import BookingForm from "../components/Book/BookingForm";
import SceduleSetup from "../components/Book/SceduleSetup";
import RoomInfo from "../components/Book/RoomInfo";
import ContentBox from "../components/StaffSection/ContentBox";

function Book({clearUser}) {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsByGroup, setAvailableRoomsByGroup] = useState([]);
  const [roomToBooked, setRoomToBooked] = useState(null);
  const [stayingTime, setStayingTime] = useState(null);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookCardOn, setBookCardOn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

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

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
    .then((token) => {
      const Config = {headers: { Authorization: "Bearer " + token.data.access }};
      
      // search by list
      axios.get(ROOM_SEARCH_URL, Config)
      .then((res) => {
        setAvailableRooms(res.data);
      })
      .catch((err) => {
        setError("Something went wrong! Try again.");
      });
      
      // search by group
      axios.get(`${ROOM_SEARCH_URL}&as_group=true`, Config)
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
      setError(err.message);
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      clearUser();
      history.push("/staff/login");
      setLoading(false);
      setLoading(false);
    });
  };

  // SELECT A ROOM TO BOOK
  const selectRoomToBook = (roomData) => {
    setRoomToBooked(roomData);
  };

  // NOTIFY IF BOOKING SUCCESSFULLY CREATED
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
      setBookCardOn(false);
    }, 4000)
    setSuccess(true);
  }

  // BOOK A ROOM FOR A GUEST
  const bookARoomForGuest = (name, email, contact, address) => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const CREATE_GUEST = `http://127.0.0.1:8000/bookings/guests/`;
    const CREATE_BOOKING = `http://127.0.0.1:8000/bookings/add/`

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const BodyForGuest = {"name": name, "email": email, "address": address, "contact": contact};

        // create a guest
        axios.post(CREATE_GUEST, BodyForGuest, Config)
        .then(res => {
          const BodyForBooking = {
            "room": roomToBooked.id,
            "guest": res.data.id,
            "from_": stayingTime.checkIn,
            "to_": stayingTime.checkOut
          }
          // Create booking for this guest
          axios.post(CREATE_BOOKING, BodyForBooking, Config)
          .then(() => {notify(); setLoading(false);})
          .catch(err => {console.log(err.message); setLoading(false);});
        })
        .catch(err => {console.log(err.message); setLoading(false);})
      })
      .catch((err) => {
        //auth error
        setLoading(false);
        localStorage.removeItem('user');
        localStorage.removeItem('refresh_token');
        clearUser();
        history.push("/staff/login");
      });
  }

  return (
    <ContentBox heading="Book">
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
          bookARoomForGuest={bookARoomForGuest}
          success={success}
          loading={loading}
         />
      )}
    </ContentBox>
  );
}

// Redux actions
const mapDispatchToProps = (dispatch) => {
  return { clearUser: () => { dispatch(clearUser())} };
};

export default connect(null, mapDispatchToProps)(Book);
