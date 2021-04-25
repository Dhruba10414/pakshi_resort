import React, { useEffect, useState } from "react";
import { arrowLeftCherovon } from "../../assets/images/SVG";

function GiveGuestData({ roomAmount, selectedRoom, selectTime, setState }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // VALIDATION CHECK
  const validationCheck = () =>{
    if(name && email && contact && address){
      return true;
    } else{
      setError("Required all fields");
      return false;
    }
  }
  
  // MAKE BOOKING REQUEST
  const makeBookingRequest = (event) => {
    event.preventDefault();

    if(!validationCheck()){
      setError("");
      setState(3);
      const Guest = {
        "name": name,
        "contact": contact,
        "email": email,
        "address": address
      };
    }
  }

  return (
    <div className="giveGuestData">
      <div className="giveGuestData__text">
        <div>
          <h2>Confirm</h2>
          <h1>Booking Request</h1>
          <p>Give us your personal information to place a booking request</p>
          <h3>TEARMS & CONDITIONS</h3>
          <p>
            This is a reservation request and your reservation is not valid
            until the resort has confirmed your booking.
          </p>
          <p>
            Within 48 hours, the resort will reply with either a define
            confirmation or rejection of your request. When the resort confirmed
            your booking request, you will have a confirmation mail.
          </p>
        </div>
      </div>
      <div className="giveGuestData__content">
        <div className="details">
          <div className="details-image"></div>
          <div className="details-content">
            <h2>{selectedRoom.name}</h2>
            <p className="bed">{selectedRoom.bed}</p>
            <p>2 days</p>
            <p>
              {roomAmount} {roomAmount > 1 ? "rooms" : "room"}
            </p>
            <p>{selectedRoom.price}</p>
          </div>
        </div>

        <form onSubmit={makeBookingRequest}>
          <h3>Guest information</h3>
          <div className="input-container">
            <div className="input w-45">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input w-55">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input w-45">
              <label>Phone</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input w-100">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <small>{error}</small>
          <div className="btn-box">
            <button className="back-btn" onClick={() => setState(1)}>
              {arrowLeftCherovon} Back
            </button>
            {!loading ? (
              <button className="submit-btn" onClick={makeBookingRequest}>Confirm</button>
            ) : (
              <button className="disabled-btn">Processing...</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default GiveGuestData;
