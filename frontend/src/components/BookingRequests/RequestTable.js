import React, {useState} from 'react';
import Loading from "../Loading";
import Entry from "../BookingRequests/Entry";
import { searchSvg, rsvg } from "../../assets/images/SVG";

function RequestTable({loading, requests, viewRequest}) {
    const [number, setNumber] = useState("");
    
    // SEARCHING FUNCTIONALITY
    const searching = () => {};

    return (
        <div className="bookingrequests">
        {/* search field */}
        <div className="search-field">
          <form onSubmit={searching}>
            <div className="icon">{searchSvg}</div>
            <input
              type="text"
              placeholder="Search by #name"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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

        {/* entries */}
        {!loading
          ? requests.map((request) => (
              <Entry
                key={request.id}
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
          : <Loading height="60vh" width="100%" textSize="15px" space="6px" />
          }
      </div>
    )
}

export default RequestTable
