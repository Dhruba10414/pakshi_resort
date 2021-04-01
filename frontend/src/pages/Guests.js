import React from "react";
import Guest from "../components/Guests/Guest";
import ContentBox from "../components/StaffSection/ContentBox";
import {rsvg, searchSvg} from '../assets/images/SVG'

// data
import { guestsList } from "../assets/DummyGuestData";


// MAIN FUNCTION
function Guests() {
  return (
    <ContentBox heading="Guests">
      <div className="guests">
        {/* HEADING */}
        <div className="heading">
          <form className="search-area">
            <div className="field">
              {searchSvg}
              <input type="text" placeholder="Search by" />
            </div>
            <select name="Filter" id="filter">
              <option value="all">Name</option>
              <option value="phone">Phone</option>
              <option value="room">Room no</option>
            </select>
          </form>
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
            <div className="guestentries">
              {guestsList.map((guest, index) => (
                <Guest
                  key={index}
                  name={guest.name}
                  phone={guest.phone}
                  checkin={guest.checkin}
                  checkout={guest.checkout}
                  status={guest.status}
                  room={guest.room}
                />
              ))}
            </div>
          </div>
          <div className="right-nav">
            <form className="content">
              <h2>Sort by</h2>
              <div>
                <input
                  className="styled-checkbox"
                  id="checkin"
                  type="checkbox"
                  value="checkin"
                />
                <label htmlFor="checkin">Check in</label>
              </div>
              <div>
                <input
                  className="styled-checkbox"
                  id="checkout"
                  type="checkbox"
                  value="checkout"
                />
                <label htmlFor="checkout">Check out</label>
              </div>
            </form>
            {/* style */}
            <div className="right-nav-style">
              <div className="img"></div>
              <div className="circle big"></div>
              <div className="circle mid"></div>
              <div className="circle small"></div>
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Guests;
