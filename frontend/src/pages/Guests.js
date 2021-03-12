import React from "react";
import Guest from "../components/Guests/Guest";
import ContentBox from "../components/StaffSection/ContentBox";

// data
import { guestsList } from "../assets/DummyGuestData";

// COMMON SVG FOR TABLE HEADING
const rsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokewidth="2"
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

// MAIN FUNCTION
function Guests() {
  return (
    <ContentBox>
      <div className="guests">
        {/* HEADING */}
        <div className="heading">
          <h1>Booking</h1>
          <div className="search-area">
            <div className="field">
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
              <input type="text" placeholder="Search" />
            </div>
            <select name="Filter" id="filter">
              <option value="all">Name</option>
              <option value="checkin">Check in</option>
              <option value="checkout">Checkout</option>
            </select>
          </div>
        </div>

        {/* GUEST TABLE */}
        <div className="content">
        <div className="guest-table">
          <div className="table-heading">
            <div className="name">Name {rsvg}</div>
            <div className="phone">Phone {rsvg}</div>
            <div className="checkin">Check in {rsvg}</div>
            <div className="checkout">Check out {rsvg}</div>
            <div className="status">Status {rsvg}</div>
            <div className="room">Room {rsvg}</div>
          </div>

          {/* GUESTS */}
          {guestsList.map((guest) => (
            <Guest
              name={guest.name}
              phone={guest.phone}
              checkin={guest.checkin}
              checkout={guest.checkout}
              status={guest.status}
              room={guest.room}
            />
          ))}
        </div>
        <div className="right-nav"></div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Guests;
