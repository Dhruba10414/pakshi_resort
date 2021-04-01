import React, { useState } from "react";
import cheklist from "../../assets/images/View/svg/checklist.svg";
import question from "../../assets/images/View/svg/question.svg";
import leaf from "../../assets/images/StaffSection/leafs.png";
import { arrowLeftCherovon, clock, homeSvg } from "../../assets/images/SVG";

function BookingForm({ roomData, stayingTime, setBookCardOn, bookARoomForGuest }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // VALIDATION CHECK
  const requiredFieldCheck = () => {
    if(name && contact && email && address){
      return true;
    } else{
      setError("All fields required.");
      return false;
    }
  }
  // CLEAR FIELDS
  const clearFields = () => {
    setName("");
    setEmail("");
    setAddress("");
    setContact("");
    setError("");
  }

  // CALL BOOKING FUNTION WHICH IS DELARED IN PARENT COMPONENT
  const makeABooking = (event) => {
    event.preventDefault();

    if(requiredFieldCheck()){
      clearFields();
      bookARoomForGuest(name, email, contact, address);
    }
  }

  return (
    <div className="bookingForm">
      <div className="guest">
        <div className="image-container">
          <img src={leaf} className="leaf-image" alt="" />
          <div className="image"><img src={question} alt="" /></div>
        </div>

        <div className="heading">
          <h3>Booking</h3>
          <p>form</p>
        </div>

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
          <small>{error}</small>
          <div className="btn-box">
            <button className="back-btn" onClick={() => setBookCardOn(false)}>{arrowLeftCherovon} Back</button>
            <button className="submit-btn" onClick={makeABooking}>Submit</button>
          </div>
        </form>
      </div>
      
      <div className="room">
        <div className="design">
          <div className="design__colored">
            <img src={cheklist} alt="" />
          </div>
        </div>
        <div className="heading">
          <h3>Additional</h3>
          <p>information</p>
        </div>
        <div className="additional-data">
          <h3 className="r">{homeSvg} Room Information</h3>
          <div className="data">
            <div className="label">Room number :</div>
            <div className="value room_num">{roomData.room_num}</div>
          </div>
          <div className="data">
            <div className="label">Room type :</div>
            <div className="value">{roomData.room_type}</div>
          </div>
        </div>
        <div className="additional-data">
          <h3 className="s">{clock} Staying Information</h3>
          <div className="data">
            <div className="label">Check-in :</div>
            <div className="value">{stayingTime.checkIn}</div>
          </div>
          <div className="data">
            <div className="label">Check-out :</div>
            <div className="value">{stayingTime.checkOut}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
