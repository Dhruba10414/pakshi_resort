import React from "react";
import Room from "./Room";

import room1 from '../../assets/images/resort/room1.jpg'
import room2 from '../../assets/images/resort/room2.jpg'
import room3 from '../../assets/images/resort/room3.jpg'

function Rooms() {
  return (
    <>
      <div className="heading-block">
        <div className="heading-content">
          <p>Rooms</p>
          <h2>Stay with us</h2>
        </div>
      </div>

      <div className="rooms-block">
          <Room image={room1} name="Luxury" />
          <Room image={room2} name="Delux" />
          <Room image={room3} name="Honeymoon Suit" />
      </div>
    </>
  );
}

export default Rooms;
