import React from "react";

function Confirmation({ guestInfo, roomInfo, makeBooking, setState, loading }) {
    
  return (
    <div className="confirmation">
      <div className="guest">
        <h3>Guest info</h3>
        <div className="info">
          <div className="label">Name</div>
          <div className="value">{guestInfo.name}</div>
        </div>
        <div className="info">
          <div className="label">Email</div>
          <div className="value">{guestInfo.email}</div>
        </div>
        <div className="info">
          <div className="label">Contact</div>
          <div className="value">{guestInfo.contact}</div>
        </div>
        <div className="info">
          <div className="label">Address</div>
          <div className="value">{guestInfo.address}</div>
        </div>
      </div>

      <div className="room">
        <h3>Reservation info</h3>
        <div className="info">
          <div className="label">Room type</div>
          <div className="value">{roomInfo.type}</div>
        </div>
        <div className="info">
          <div className="label">Number of room(s)</div>
          <div className="value">{roomInfo.roomNumbers}</div>
        </div>
        <div className="info">
          <div className="label">Check-in</div>
          <div className="value">{roomInfo.checkin}</div>
        </div>
        <div className="info">
          <div className="label">Check-out</div>
          <div className="value">{roomInfo.checkout}</div>
        </div>
      </div>

      <div className="room">
        <h3>Bill information</h3>
        <div className="info">
          <div className="label">Room Cost</div>
          <div className="value">{roomInfo.roomBill} ৳</div>
        </div>
        <div className="info">
          <div className="label">Total Cost</div>
          <div className="value">{roomInfo.totalBills} ৳</div>
        </div>
      </div>

      <div className="button-box" style={{marginTop: "30px"}}>
          {
              !loading ? (<><button className="back" onClick={() => setState(1)}>Go Back</button>
              <button onClick={makeBooking}>Confirm</button></>)
              : <button className="loading">Loading...</button>
          }
      </div>
    </div>
  );
}

export default Confirmation;
