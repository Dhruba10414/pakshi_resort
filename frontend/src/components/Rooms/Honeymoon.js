import React from "react";
import room from "../../assets/images/resort/room1.jpg";

function Honeymoon() {
  return (
    <div className="honeymoon">
      <div className="honeymoon__heading room-desc-heading">
        <h2>Karni Kunjo Honeymoon Suit</h2>
        <p>
          Luxury Comfortable room with Drawing, Dining trace Kitchen, King Size
          bed,with Sofa, luxury bed linens & towels, special bathroom amenities
          and slippers.
        </p>
      </div>
      <div className="honeymoon__image room-desc-image">
        <img src={room} alt="" />
      </div>
    </div>
  );
}

export default Honeymoon;
