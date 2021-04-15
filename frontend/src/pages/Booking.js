import React, { useEffect, useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";
import axios from "axios";
//urls
import {api} from "../assets/URLS";
// Component & Svg
import Entry from "../components/Booking/Entry";
import {check, rsvg, searchSvg} from '../assets/images/SVG';
import Loading from "../components/Loading";

function Booking() {
  const [name, setName] = useState("");
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // SEARCH FUNCTIONALITY
  const searching = () => {
    console.log(name);
  };

  // NOTIFY IF CHECK-IN SUCCESSFULLY DONE
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000)
    setSuccess(true);
  }

  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const BOOKING_TABLE_URL = api.booking_table;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
    .then((token) => {
      const Config = { headers: { Authorization: "Bearer " + token.data.access }};
      axios.get(BOOKING_TABLE_URL, Config)
      .then((res) => {setBooking(res.data); setLoading(false); console.log(res.data)})
      .catch(err => {setError("Something went wrong! Reload the page."); console.log(err.message); setLoading(false);})
    })
    .catch(err => {
      console.log(err.message);
    })
  }, []);

  return (
    <ContentBox heading="Bookings">
      <div className="bookingPage">
        <div className="search-field">
          <form onSubmit={searching}>
            <div className="icon">{searchSvg}</div>
            <input
              type="text"
              placeholder="Search by #name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </div>

        <div className="table-heading">
          <div className="no">Room {rsvg}</div>
          <div className="guest-name">Guest Name{rsvg}</div>
          <div className="status">Status {rsvg}</div>
          <div className="bookon">Book on{rsvg}</div>
          <div className="checkin">Check-in{rsvg}</div>
          <div className="checkout">Check-out{rsvg}</div>
          <div className="func">Confirm{rsvg}</div>
        </div>

        {
          !loading ?
          booking && booking.map(entry => (
            <Entry 
              key={entry.id}
              bookingId={entry.id}
              room={entry.room}
              guest={entry.guest}
              check_in={entry.check_in}
              check_out={entry.check_out}
              book_on={entry.booked_on}
              is_active={entry.is_active}
              is_cancel={entry.is_canceled}
              notify={notify}
            />
          ))
          : <Loading height="60vh" width="100%" textSize="15px" space="6px" />
        }
        <div className={success ? "success-message" : "success-message disabled"}>
          <div>{ check }</div> Successfully Submitted!
        </div>
      </div>
    </ContentBox>
  );
}


export default Booking;
