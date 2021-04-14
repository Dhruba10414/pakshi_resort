import React, { useState } from "react";
import room from "../../assets/images/Room/room-1.jpg";
import { x } from "../../assets/images/SVG";

function Honeymoon() {
  const [state, setState] = useState(false);

  return (
    <div className="honeymoon">
      {!state ? (
        <div className="honeymoon__heading room-desc-heading">
          <h2>Karni Kunjo Honeymoon Suit</h2>
          <p>
            Luxury Comfortable room with Drawing, Dining trace Kitchen, King
            Size bed,with Sofa, luxury bed linens & towels, special bathroom
            amenities and slippers.
          </p>
          <h3 className="price">৳ 25,000 + vat</h3>
          <div className="btn-box">
            <button className="view-more-button" onClick={() => setState(true)}>
              View more
            </button>
          </div>
        </div>
      ) : (
        <div className="room-features room-desc-heading">
          <h2>Karni Kunjo Honeymoon Suit</h2>
          <ul>
            <li>Room Size <span>800 sqf</span></li>
            <li>King Size bed with sofa</li>
            <li>Special bathroom with hot shower</li>
            <li>Complimentary Breakfast at restaurant side</li>
            <li>LED TV & Wi-Fi</li>
            <li>Air Conditioned</li>
            <li>Complimentary Swimming Pool & gym</li>
            <li>Room service</li>
          </ul>
          <div className="btn-box">
            <button className="view-more-button">Book now</button>
            <button className="back-button" onClick={() => setState(false)}>
              {x}
            </button>
          </div>
        </div>
      )}
      <div className="honeymoon__image room-desc-image">
        <img src={room} alt="" />
      </div>
    </div>
  );
}

export default Honeymoon;
