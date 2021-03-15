import React, { useEffect, useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";
import { roomList } from "../assets/DummyRoomData";
import Room from "../components/Dashboard/Room";
import StaffHeading from "../components/StaffSection/StaffHeading";

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
  const [room, setRoom] = useState("");
  const [desiredRoom, setDesiredRoom] = useState(null);
  const [error, setError] = useState("");

  const searchRoom = (event) => {
    event.preventDefault();
    
    // find the room
    const sroom = roomList.find((el) => el.room_num === parseInt(room));
    if (sroom) {
      setDesiredRoom(sroom);
    } else {
      setError("Room not found");
    }
    
  };

  return (
    <ContentBox>
      <div className="dashboard">
        <div className="heading">
          <h1>Dashboard</h1>
          {/* <StaffHeading /> */}
          <form onSubmit={searchRoom}>
            <button onClick={searchRoom}>
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
            </button>
            <input
              type="text"
              placeholder="Search.."
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </form>
        </div>

        <div className="dashboard-container">
          {/* TABLE */}
          <div className="room-table">
            {/* table heading */}
            <div className="table-heading">
              <div className="no">Room {rsvg}</div>
              <div className="status">Status {rsvg}</div>
              <div className="guest">Guest Id {rsvg}</div>
              <div className="guest-name">Guest Name{rsvg}</div>
              <div className="paymentStatus">Payment{rsvg}</div>
              <div className="food-order">Order Food{rsvg}</div>
              <div className="checkout">Checkout{rsvg}</div>
            </div>
            {/* table content */}
            <div className="roomEntries">
              {roomList.map((room) => (
                <Room
                  key={room.room_num}
                  no={room.room_num}
                  status={room.is_occupied}
                  active_booking={room.active_booking}
                />
              ))}
            </div>
          </div>
          {/* RIGHT NAV */}
          {/* <div className="right-nav"></div> */}
        </div>
      </div>
    </ContentBox>
  );
}

export default Dashboard;
