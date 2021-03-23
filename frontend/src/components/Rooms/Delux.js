import React from "react";
import room from "../../assets/images/resort/room1.jpg";

function Delux() {
  return (
    <>
      <div className="delux">
        <div className="delux__heading room-desc-heading">
          <h2>Deluxe Room</h2>
          <h3>Couple Bed</h3>
          <p>
            Comfortable room with Queen Size bed, luxury bed linens & towels,
            bathroom amenities and slippers.
          </p>
        </div>
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
      </div>
      <div className="delux">
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
        <div className="delux__heading room-desc-heading">
          <h2>Deluxe Room</h2>
          <h3>Twin Bed</h3>
          <p>
            Comfortable room with Queen Size bed, luxury bed linens & towels,
            bathroom amenities and slippers.
          </p>
        </div>
      </div>
      <div className="delux">
        <div className="delux__heading room-desc-heading">
          <h2>Deluxe Room</h2>
          <h3>Triple Bed</h3>
          <p>
            Comfortable room with Queen Size bed, luxury bed linens & towels,
            bathroom amenities and slippers.
          </p>
        </div>
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
      </div>
    </>
  );
}

export default Delux;
