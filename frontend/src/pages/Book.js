import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
//urls
import {api} from "../assets/URLS";

// Components
import BookingForm from "../components/Book/BookingForm";
import SceduleSetup from "../components/Book/SceduleSetup";
import RoomInfo from "../components/Book/RoomInfo";
import ContentBox from "../components/StaffSection/ContentBox";

function Book({clearUser}) {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsByGroup, setAvailableRoomsByGroup] = useState([]);
  const [roomToBooked, setRoomToBooked] = useState([]);
  const [stayingTime, setStayingTime] = useState(null);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookCardOn, setBookCardOn] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  // SEARCH AVAILABLE ROOMS
  const searchRoomUsingDate = (startDate, endDate) => {
    setLoading(true);
    setSearched(true);
    setBookCardOn(false);

    // setup check-in check-out dates
    const sd = startDate.getDate();
    const sm = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const sy = startDate.getFullYear();
    const ed = endDate.getDate();
    const em = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const ey = endDate.getFullYear();
    setStayingTime({checkIn: `${sd}-${sm}-${sy}`, checkOut: `${ed}-${em}-${ey}`});

    // specify api urls
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const ROOM_SEARCH_URL = `${api.available_rooms}?check_in=${sd}-${sm}-${sy}&check_out=${ed}-${em}-${ey}`;

    // api -call
    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
    .then((token) => {
      const Config = {headers: { Authorization: "Bearer " + token.data.access }};
      // search by list
      axios.get(ROOM_SEARCH_URL, Config)
      .then((res) => {
        const filteredList = res.data.map(data => {return {...data, selected: false}});
        setAvailableRooms(filteredList);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
      // search by group
      axios.get(`${ROOM_SEARCH_URL}&as_group=true`, Config)
      .then((res) => {
        setAvailableRoomsByGroup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
    })
    .catch((err) => {
      console.log(err.message);
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      clearUser();
      history.push("/staff/login");
      setLoading(false);
    });
  };

  // SELECT A ROOM TO BOOK
  const selectRoomToBook = (roomData) => {
    const newList = availableRooms.map(room => {
      if(room.id === roomData.id){
        return {...room, selected: true};
      } else{
        return room;
      }
    })
    setAvailableRooms(newList);
    setRoomToBooked([...roomToBooked, roomData]);
  };

  //REMOVE ROOM FROM ROOM LISTS
  const removeRoomToBook = (roomData) => {
    const newList = availableRooms.map(room => {
      if(room.id === roomData.id){
        return {...room, selected: false};
      } else{
        return room;
      }
    })
    const ul = roomToBooked.filter((room) => room.id !== roomData.id);
    setAvailableRooms(newList);
    setRoomToBooked(ul);
  }

  // CHECK WHETHER ROOM LIST IS EMPTY OR NOT?
  const checkEmptyRoomList = () => {
    if(roomToBooked.length > 0){
      return true;
    } else{
      return false;
    }
  }

  // NOTIFY IF BOOKING SUCCESSFULLY CREATED
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
      setBookCardOn(false);
    }, 4000)
    setSuccess(true);
  }

  // BOOK A ROOM FOR A GUEST
  const bookRoomForGuest = (name, email, contact, address) => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const CREATE_GUEST = api.create_guest;
    const CREATE_BOOKING = api.make_booking;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const BodyForGuest = {"name": name, "email": email, "address": address, "contact": contact};

        // create a guest
        axios.post(CREATE_GUEST, BodyForGuest, Config)
        .then(res => {
          const rooms = roomToBooked.map(room => room.id);
          const BodyForBooking = {
            "room": rooms,
            "guest": res.data.id,
            "from_": stayingTime.checkIn,
            "to_": stayingTime.checkOut
          }
          // Create booking for this guest
          axios.post(CREATE_BOOKING, BodyForBooking, Config)
          .then(() => {notify(); setLoading(false);})
          .catch(err => {console.log(err.message); setLoading(false);});
          console.log(BodyForBooking);
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
            bookedRoom={roomToBooked}
            selectRoomToBook={selectRoomToBook}
            removeRoomToBook={removeRoomToBook}
            checkEmptyRoomList={checkEmptyRoomList}
            loading={loading}
          />
          </div>
      ) : (
        <BookingForm
          roomData={roomToBooked}
          stayingTime={stayingTime}
          setBookCardOn={setBookCardOn}
          bookRoomForGuest={bookRoomForGuest}
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
