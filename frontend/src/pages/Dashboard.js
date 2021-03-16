import React, { useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";
import { roomList } from "../assets/DummyRoomData";
// compoents
import Room from "../components/Dashboard/Room";
import FoodOrder from "../components/Dashboard/FoodOrder";
import RoomDetails from "../components/Dashboard/RoomDetails";

// COMMON SVG FOR TABLE HEADING
const rsvg = (
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
    className="feather feather-maximize-2"
  >
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

function Dashboard() {
  /* ----------------- V A R I A B L E S ----------------------- */
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

  /* ----------------- F U N C T I O N S ----------------------- */
  // OPEN FOOD ORDER MODAL
  const openFoodOrderModal = (id, name, room_no) => {
    setOpenOrder(true);
    setOrderFor({ id: id, name: name, room_no: room_no });
  };
  // OPEN FOOD ORDER MODAL
  const openDetailsModal = (id, name, room_no) => {
    setOpenRoomDetails(true);
    setDetails({ id, name, room_no });
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

  return (
    <ContentBox heading="Dashboard">
      <div className="dashboard">
        <div className="dashboard-container">
          {/* ============== ROOMS TABLE ============== */}
          {!openOrder && !openRoomDetails ? (
            <div className="room-table-container">
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
              <div className="room-table">
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
                      no={room.room_num}
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
              details={details.room_no}
            />
          )}

          {/* RIGHT NAV */}
          {/* <div className="right-nav"></div> */}
        </div>
      </div>
    </ContentBox>
  );
}

export default Dashboard;
