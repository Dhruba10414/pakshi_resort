import React from "react";
import { Link } from "react-router-dom";

import room1 from "../../assets/images/resort/room1.jpg";
import room2 from "../../assets/images/resort/room2.jpg";
import room3 from "../../assets/images/resort/room3.jpg";

function Rooms() {
  return (
    <>
      <div className="heading-block">
        <p className="secondary-head">Stay with us</p>
        <h2 className="primary-head">Rooms & Suites</h2>
        <p className="desc-head">
          From our cosiest to our grandest, we’ve got 26 beautiful bedrooms in 3
          main categories for the perfect night’s sleep.
        </p>
        <Link to="/">Explore more</Link>
      </div>

      <div className="room-images">
        <div className="img1">
          <img src={room1} alt="" />
        </div>
        <div className="img2">
          <img className="i-1" src={room3} alt="" />
          <img className="i-2" src={room2} alt="" />
        </div>
      </div>
    </>
  );
}

export default Rooms;
