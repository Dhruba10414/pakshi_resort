import React, { useState } from "react";
import Loading from "../Loading";
import Entry from "../BookingRequests/Entry";
import { searchSvg, rsvg } from "../../assets/images/SVG";
import search from "../../assets/images/View/svg/search-3.svg";

function RequestTable({ loading, requests, viewRequest }) {
  const [number, setNumber] = useState("");
  const [matchedData, setMatchedData] = useState([]);

  // SEARCHING FUNCTIONALITY
  const searching = (event) => {
    event.preventDefault();
    let text = event.target.value.toLowerCase();

    let matches = requests.filter((data) => {
      const regex = new RegExp(`^${text}.*$`);
      return (
        data.guest.name.toLowerCase().match(regex) ||
        data.guest.contact.match(regex)
      );
    });

    if (text === "") {
      setMatchedData([]);
    } else {
      setMatchedData(matches);
    }
  };

  return (
    <div className="bookingrequests">
      {/* search field */}
      <div className="search-field">
        <form onSubmit={searching}>
          <div className="icon">{searchSvg}</div>
          <input
            type="text"
            placeholder="Search by #name or #contact number"
            onChange={(e) => searching(e)}
          />
        </form>
      </div>

      {/* table heading */}
      <div className="table-heading">
        <div className="guest-name">Guest Name{rsvg}</div>
        <div className="cell">Contact {rsvg}</div>
        <div className="type">Type{rsvg}</div>
        <div className="checkin">Check-in{rsvg}</div>
        <div className="checkout">Check-out{rsvg}</div>
        <div className="amount">Num{rsvg}</div>
      </div>
      {/* search resluts */}
      {matchedData.length > 0 ? (
        <div className="results">
          {matchedData.map((request) => (
            <Entry
              key={request.id}
              requestId={request.id}
              guestId={request.guest.id}
              guestName={request.guest.name}
              guestPhone={request.guest.contact}
              guestEmail={request.guest.email}
              guestAddress={request.guest.address}
              roomType={request.room_type}
              checkout={request.check_out}
              checkin={request.check_in}
              requestedOn={request.requested_on}
              numberOfRooms={request.num_of_rooms}
              viewRequest={viewRequest}
            />
          ))}
        </div>
      ) : null}

      {/* entries */}
      {!loading ? (
        requests.length > 0 ? (
          requests.map((request) => (
            <Entry
              key={request.id}
              requestId={request.id}
              guestId={request.guest.id}
              guestName={request.guest.name}
              guestPhone={request.guest.contact}
              guestEmail={request.guest.email}
              guestAddress={request.guest.address}
              roomType={request.room_type}
              checkout={request.check_out}
              checkin={request.check_in}
              requestedOn={request.requested_on}
              numberOfRooms={request.num_of_rooms}
              viewRequest={viewRequest}
            />
          ))
        ) : (
          <div className="empty">
            <img src={search} alt="" />
            <h2>Not available</h2>
          </div>
        )
      ) : (
        <Loading height="60vh" width="100%" textSize="15px" space="6px" />
      )}
    </div>
  );
}

export default RequestTable;
