import React, { useState } from "react";

function GuestInformation({ setState, loading, setupGuestBody }) {
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
      setupGuestBody(name, email, contact, address);
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
        <small className="error">{error}</small>
        <div className="button-box">
          {!loading ? (
            <button className="submit-btn" onClick={makeABooking}>
              Submit
            </button>
          ) : (
            <button className="disabled-btn">Processing...</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GuestInformation;
