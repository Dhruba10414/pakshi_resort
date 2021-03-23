import React, { useState } from "react";
import room from "../../assets/images/resort/room1.jpg";
import { x } from "../../assets/images/SVG";

function Delux() {
  const [c, setC] = useState(false);
  const [tw, setTw] = useState(false);
  const [th, setTh] = useState(false);

  return (
    <>
      <div className="delux">
        {!c ? (
          <div className="delux__heading room-desc-heading">
            <h2>Deluxe Room</h2>
            <h3>Couple Bed</h3>
            <p>
              Comfortable room with Queen Size bed, luxury bed linens & towels,
              bathroom amenities and slippers.
            </p>
            <h3 className="price">৳ 5,000 + vat</h3>
            <div className="btn-box">
              <button className="view-more-button" onClick={() => setC(true)}>
                View more
              </button>
            </div>
          </div>
        ) : (
          <div className="room-features room-desc-heading">
            <h2>Deluxe Room</h2>
            <h3>Couple Bed</h3>
            <ul>
              <li>
                Room Size <span>230 sqf</span>
              </li>
              <li>Queen Size bed</li>
              <li>Special bathroom with hot shower</li>
              <li>Complimentary Breakfast at restaurant side</li>
              <li>LED TV & Wi-Fi</li>
              <li>Air Conditioned</li>
              <li>Complimentary Swimming Pool & gym</li>
              <li>Room service</li>
            </ul>
            <div className="btn-box">
              <button className="view-more-button">Book now</button>
              <button className="back-button" onClick={() => setC(false)}>
                {x}
              </button>
            </div>
          </div>
        )}
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
      </div>

      {/* //////////////////////////////////////////////////// */}
      <div className="delux">
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
        {!tw ? (
          <div className="delux__heading room-desc-heading">
            <h2>Deluxe Room</h2>
            <h3>Twin Bed</h3>
            <p>
              Comfortable room with two Single Size bed, luxury bed linens &
              towels, bathroom amenities and slippers.
            </p>
            <h3 className="price">৳ 6,000 + vat</h3>
            <div className="btn-box">
              <button className="view-more-button" onClick={() => setTw(true)}>
                View more
              </button>
            </div>
          </div>
        ) : (
          <div className="room-features room-desc-heading">
            <h2>Deluxe Room</h2>
            <h3>Twin Bed</h3>
            <ul>
              <li>
                Room Size <span>275 sqf</span>
              </li>
              <li>
                Single Size <span>2</span> bed
              </li>
              <li>Hot shower</li>
              <li>LED TV & Wi-Fi</li>
              <li>Air Conditioned</li>
              <li>Complimentary Swimming Pool & gym</li>
              <li>Complimentary Breakfast at restaurant side</li>
              <li>Room service</li>
            </ul>
            <div className="btn-box">
              <button className="view-more-button">Book now</button>
              <button className="back-button" onClick={() => setTw(false)}>
                {x}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* //////////////////////////////////////////////////// */}
      <div className="delux">
        {!th ? (
          <div className="delux__heading room-desc-heading">
            <h2>Deluxe Room</h2>
            <h3>Triple Bed</h3>
            <p>
              Comfortable room with Three Single Size bed, luxury bed linens &
              towels, bathroom amenities and slippers.
            </p>
            <h3 className="price">৳ 7,000 + vat</h3>
            <div className="btn-box">
              <button className="view-more-button" onClick={() => setTh(true)}>
                View more
              </button>
            </div>
          </div>
        ) : (
          <div className="room-features room-desc-heading">
            <h2>Features</h2>
            <ul>
              <li>Room Size <span>360 sqf</span></li>
              <li>Single Size <span>3</span> bed</li>
              <li>Hot shower</li>
              <li>LED TV & Wi-Fi</li>
              <li>Air Conditioned</li>
              <li>Complimentary Swimming Pool & gym</li>
              <li>Complimentary Breakfast at restaurant side</li>
              <li>Room service</li>
            </ul>
            <div className="btn-box">
              <button className="view-more-button">Book now</button>
              <button className="back-button" onClick={() => setTh(false)}>
                {x}
              </button>
            </div>
          </div>
        )}
        <div className="delux__image room-desc-image">
          <img src={room} alt="" />
        </div>
      </div>
    </>
  );
}

export default Delux;
