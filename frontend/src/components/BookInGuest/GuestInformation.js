import React, { useState } from "react";

function GuestInformation({ setState, loading, setGuest }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // VALIDATION CHECK
  const requiredFieldCheck = () => {
    if (name && contact && email && address) {
      return true;
    } else {
      setError("All fields required.");
      return false;
    }
  };
  // CLEAR FIELDS
  const clearFields = () => {
    setName("");
    setEmail("");
    setAddress("");
    setContact("");
    setError("");
  };

  // CALL BOOKING FUNTION WHICH IS DELARED IN PARENT COMPONENT
  const makeABooking = (event) => {
    event.preventDefault();
    if (requiredFieldCheck()) {
      setGuest({ "name": name, "email": email, "contact": contact, "address": address });
      setState(1);
    }
  };

  return (
    <div className="guestInfo">
      {/* ----- booking form ------ */}
      <form onSubmit={makeABooking}>
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
          <div className="input w-50">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input w-50">
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
        <small className="error">{error}</small>
        <div className="button-box">
          {!loading ? (
            <button className="submit-btn" onClick={makeABooking}>
              Next
            </button>
          ) : (
            <button className="disabled-btn">Processing...</button>
          )}
        </div>
      </form>

      <div className="instruction">
        <h3>Booking Instructions</h3>
        <p>
          Unfortunately we are not able to offer you the booking system directly
          from online but you can request for your required room book with just
          the necessary information.
        </p>
        <p>
          When we receive your request, we will verify the information by phone
          call and confirm your booking.
        </p>
        <p>Follow the instructions below for the booking request</p>
        <ul>
          <li>
            In the first form you have to give your name, email, active phone
            number and current address
          </li>
          <li>
            In the second form you have to give your desired room with number of
            rooms and checkin, checkout date.
          </li>
          <li>Finally confirm your request.</li>
        </ul>
      </div>
    </div>
  );
}

export default GuestInformation;
