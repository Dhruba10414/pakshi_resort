import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {rsvg} from '../assets/images/SVG';
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";

// compoents
import ContentBox from "../components/StaffSection/ContentBox";
import Room from "../components/Dashboard/Room";
import FoodOrder from "../components/Dashboard/FoodOrder";
import RoomDetails from "../components/Dashboard/RoomDetails";
import axios from "axios";


function Dashboard({clearUser}) {
  /* ----------------- V A R I A B L E S ----------------------- */
  // for room list shoen in dashboard
  const [roomList, setRoomList] = useState([]);
  // for search a room
  const [room, setRoom] = useState("");
  const [desiredRoom, setDesiredRoom] = useState(null);
  const [error, setError] = useState("");
  // foor food Order
  const [openOrder, setOpenOrder] = useState(false);
  const [orderFor, setOrderFor] = useState({});
  // for view room details
  const [openRoomDetails, setOpenRoomDetails] = useState(false);
  const [details, setDetails] = useState({});

  const history = useHistory();

  /* ----------------- F U N C T I O N S ----------------------- */
  // OPEN FOOD ORDER MODAL
  const openFoodOrderModal = (id, name, room_no) => {
    setOpenOrder(true);
    setOrderFor({ id: id, name: name, room_no: room_no });
  };
  // OPEN FOOD ORDER MODAL
  const openDetailsModal = (id, name, check_in, check_out, room_no, room_type) => {
    setOpenRoomDetails(true);
    setDetails({ id, name, check_in, check_out, room_no, room_type });
  };
  // CLOSE MODAL
  const closeModal = () => {
    setOpenOrder(false);
    setOpenRoomDetails(false);
  };
  // SEARCH A SPECIFIC ROOM
  const searchRoom = (event) => {
    event.preventDefault();
    const sroom = roomList.find((el) => el.room_num === parseInt(room));
    if (sroom) {
      setDesiredRoom(sroom);
    } else {
      setError("Room not found");
    }
  };

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    // get users access token
    axios.post("http://127.0.0.1:8000/api/token/refresh/", {refresh: refresh_token,})
    .then((token) => {
      const Config = {headers: { Authorization: "Bearer " + token.data.access }};
      // get rooms
      axios.get("http://127.0.0.1:8000/bookings/rooms/", Config)
      .then((res) => { setRoomList(res.data);})
      .catch((err) => { setError(err.message);});
    })
    .catch((err) => { 
      //auth error
      setError(err.message);
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      clearUser();
      history.push("/staff/login");
    })
  }, []);

  return (
    <ContentBox heading="Dashboard">
      <div className="dashboard">
        <div className="dashboard-container">
          {/* ============== ROOMS TABLE ============== */}
          {!openOrder && !openRoomDetails ? (
            <div className="room-table-container">
              <div className="room-table">
                {/* search field */}
              <div className="search-field">
                <form onSubmit={searchRoom}>
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by #room number"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </form>
              </div>
                {/* table heading */}
                <div className="table-heading">
                  <div className="no">Room {rsvg}</div>
                  <div className="status">Status {rsvg}</div>
                  <div className="guest-name">Guest Name{rsvg}</div>
                  <div className="checkin">Check In{rsvg}</div>
                  <div className="checkout">Check Out{rsvg}</div>
                  <div className="food-order">Order Food{rsvg}</div>
                </div>
                {/* table content */}
                <div className="roomEntries">
                  {roomList.map((room) => (
                    <Room
                      key={room.room_num}
                      room_no={room.room_num}
                      room_type={room.room_type}
                      status={room.is_occupied}
                      active_booking={room.active_booking}
                      openFoodOrderModal={openFoodOrderModal}
                      openDetailsModal={openDetailsModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : openOrder ? (
            <FoodOrder
              id={orderFor.id}
              name={orderFor.name}
              room={orderFor.room_no}
              closeModal={closeModal}
            />
          ) : (
            <RoomDetails
              id={details.id}
              name={details.name}
              room_no={details.room_no}
              room_type={details.room_type}
              checkIn={details.check_in}
              checkOut={details.check_out}
              closeModal={closeModal}
            />
          )}

          {/* RIGHT NAV */}
          {/* <div className="right-nav"></div> */}
        </div>
      </div>
    </ContentBox>
  );
}

// Redux actions
const mapDispatchToProps = (dispatch) => {
  return { clearUser: () => { dispatch(clearUser())} };
};

export default connect(null, mapDispatchToProps)(Dashboard);
