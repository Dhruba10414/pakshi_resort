import React, { useState } from "react";
import room from "../../assets/images/resort/room1.jpg";
import { x } from "../../assets/images/SVG";

function Luxury() {
  const [state, setState] = useState(false);

  return (
    <div className="lux">
      {!state ? (
        <div className="lux__heading room-desc-heading">
          <h2>Luxury room</h2>
          <p>
            Luxury Comfortable room with King Size bed,with Sofa, luxury bed
            linens & towels, special bathroom amenities and slippers.
          </p>
          <h3 className="price">৳ 10,000 + vat</h3>
          <div className="btn-box">
            <button className="view-more-button" onClick={() => setState(true)}>
              View more
            </button>
          </div>
        </div>
      ) : (
        <div className="room-features room-desc-heading">
          <h2>Luxury room</h2>
          <ul>
            <li>Room Size  <span>300 sqf</span></li>
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
      <div className="lux__image room-desc-image">
        <img src={room} alt="" />
      </div>
    </div>
  );
}

export default Luxury;
