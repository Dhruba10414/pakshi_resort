import axios from "axios";
import React, { useEffect, useState } from "react";
import { activity, arrowLeftCherovon, homeSvg } from "../../assets/images/SVG";
import bkashLogo from "../../assets/images/View/svg/bkash.png";
import { api } from "../../assets/URLS";

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
  const validationCheck = () => {
    if (name && email && contact && address) {
      return true;
    } else {
      setError("Required all fields");
      return false;
    }
  };

  // MAKE BOOKING REQUEST
  const makeBookingRequest = (event) => {
    event.preventDefault();

    if (validationCheck()) {
      setError("");
      setLoading(true);
      const Guest = {
        name: name,
        contact: contact,
        email: email,
        address: address,
      };
      axios
        .post(api.create_guest, Guest)
        .then((res) => {
          const Body = {
            guest: res.data.id,
            room_type: parseInt(selectedRoom.id),
            num_of_rooms: parseInt(roomAmount),
            check_in: selectTime.checkin,
            check_out: selectTime.checkout,
          };
          axios
            .post(api.request_for_booking, Body)
            .then(() => {
              setLoading(false);
              setState(3);
            })
            .catch(() => {
              setError("Something Went wrong try again.");
              setLoading(false);
            });
        })
        .catch(() => {
          setError("Something Went wrong try again.");
          setLoading(false);
        });
    }
  };

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
          <p style={{ marginTop: "20px" }}>
            To make your booking request acceptable and credible, you need to
            make an advance payment of <span>1,000tk.</span>
          </p>
          <p>
            To make a payment, go to the payment option in your bKash account
            and make a payment to our bKash number below. In this case, give
            your mobile number as reference number.
          </p>

          <div className="bkashBlock">
            <img src={bkashLogo} />
            <h2>+8801 727926560</h2>
          </div>
        </div>
      </div>
      <div className="giveGuestData__content">
        <div className="details">
          <div className="details-image"></div>
          <div className="details-content">
            <h2>{selectedRoom.name}</h2>
            <p className="bed">{selectedRoom.bed}</p>
            <p>
              {activity} {selectTime.staying}{" "}
              {selectTime.staying > 1 ? "days" : "day"}
            </p>
            <p>
              {homeSvg}
              {roomAmount} {roomAmount > 1 ? "rooms" : "room"}
            </p>
            <p className="price">
              <span>৳</span>{" "}
              {parseInt(selectedRoom.price) *
                parseInt(selectTime.staying) *
                parseInt(roomAmount)}{" "}
              <span className="vat">++</span>
            </p>
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
              <button className="submit-btn" onClick={makeBookingRequest}>
                Confirm
              </button>
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
