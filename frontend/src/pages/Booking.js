import React, { useEffect, useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";
import axios from "axios";
// redux
import { connect } from "react-redux";
import { saveBookings, filterByCompleted, filterByPending} from "../redux/bookings/bookingAction";
//urls
import { api } from "../assets/URLS";
// Component & Svg
import Entry from "../components/Booking/Entry";
import Loading from "../components/Loading";
import { check, rsvg, searchSvg } from "../assets/images/SVG";

function Booking({ bookings, filteredBookings, saveBookings, filterByCompleted, filterByPending}) {
  const [name, setName] = useState("");
  const [filterby, setFilterby] = useState("all");
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
    }, 2000);
    setSuccess(true);
  };
  // FILTER BY COMPLETE
  const filterOrderListByComplete = () => {
    setFilterby("co");
    filterByCompleted();
  };
  // FILTER PENDING ORDERS
  const filterOrderListByPending = () => {
    setFilterby("pe");
    filterByPending();
  };
  // FETCH BOOKING TABLE
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const BOOKING_TABLE_URL = api.booking_table;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(BOOKING_TABLE_URL, Config)
          .then((res) => {
            saveBookings(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError("Something went wrong! Reload the page.");
            console.log(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <ContentBox heading="Bookings">
      <div className="bookingPage">
        {/* search field */}
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
        {/* filter options */}
        <div className="filter-by-type">
          <div className={filterby === "all" ? "active" : ""} onClick={() => { setFilterby("all"); }}>All</div>
          <div className={filterby === "pe" ? "active" : ""} onClick={filterOrderListByPending}> Pending </div>
          <div className={filterby === "co" ? "active" : ""} onClick={filterOrderListByComplete}> Staying </div>
        </div>
        {/* table heading */}
        <div className="table-heading">
          <div className="no">Room {rsvg}</div>
          <div className="guest-name">Guest Name{rsvg}</div>
          <div className="status">Status {rsvg}</div>
          <div className="bookon">Book on{rsvg}</div>
          <div className="checkin">Check-in{rsvg}</div>
          <div className="checkout">Check-out{rsvg}</div>
          <div className="func">Confirm{rsvg}</div>
        </div>
        {/* table entries */}
        {!loading ? (
          filterby !== "all" ? (
            filteredBookings &&
            filteredBookings.map((entry) => (
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
          ) : (
            bookings &&
            bookings.map((entry) => (
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
          )
        ) : (
          <Loading height="60vh" width="100%" textSize="15px" space="6px" />
        )}
        {/* success message */}
        <div className={success ? "success-message" : "success-message disabled"}>
          <div>{check}</div> Successfully Submitted!
        </div>
      </div>
    </ContentBox>
  );
}

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings.bookings,
    filteredBookings: state.bookings.filteredBookings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveBookings: (bookings) => {
      dispatch(saveBookings(bookings));
    },
    filterByCompleted: () => {
      dispatch(filterByCompleted());
    },
    filterByPending: () => {
      dispatch(filterByPending());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
