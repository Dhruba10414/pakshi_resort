import React from "react";

// assets
import guest from "../../assets/images/StaffSection/guest.svg";
import leaf from "../../assets/images/StaffSection/leafs.png";
import card from "../../assets/images/StaffSection/card.svg";
import { warning, x } from "../../assets/images/SVG";

function RoomDetails({ id, name, room_no, closeModal }) {
  return (
    <div className="roomDetails">
      <div className="roomDetails__guest">
        <div className="image-container">
          <img src={leaf} className="leaf-image" alt="" />
          <div className="back-btn" onClick={closeModal}>{x}</div>
          <div className="image">
            <img src={guest} alt="" />
          </div>
        </div>
        <div className="guest">
          <div className="heading">
            <h3>Guest</h3>
            <p>iformation</p>
          </div>
          <div className="infos">
            <div className="info-container">
              <div className="info r-60">
                <div className="label">Name</div>
                <div className="value name">{name}</div>
              </div>
            </div>
            <div className="info-container">
              <div className="info r-48">
                <div className="label">Email</div>
                <div className="value">mizanur.rahman03032@gmail.com</div>
              </div>
              <div className="info r-30">
                <div className="label">Phone</div>
                <div className="value">+880 1531709712</div>
              </div>
              <div className="info r-20">
                <div className="label">Gender</div>
                <div className="value">Male</div>
              </div>
            </div>
            <div className="info-container">
              <div className="info r-100">
                <div className="label">Address</div>
                <div className="value">Thonthonia, Bogra Sadar, Bogra</div>
              </div>
            </div>
            <div className="info-container">
              <div className="info r-48">
                <div className="label">Check in</div>
                <div className="value">22 JAN 2021</div>
              </div>
              <div className="info r-48">
                <div className="label">Check out</div>
                <div className="value">23 JAN 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="roomDetails__others">
        {/* Food Info */}
        <div className="payment-info">
          <img src={card} alt="" className="card-image"/>
          <div className="heading">
            <h3>Payment</h3>
            <p>iformation</p>
          </div>
          <div className="calculation">
            <div className="calc">
              <div className="label">Stayed</div>
              <div className="value">2 days</div>
            </div>
            <div className="calc">
              <div className="label">Total Bills</div>
              <div className="value">2400 &#x9f3;</div>
            </div>
            <div className="calc">
              <div className="label">Payment Status</div>
              <div className="value warning">{warning} Due</div>
            </div>
            <button>Confirm Paymnent</button>
          </div>
        </div>
        {/* Room Info */}
        <div className="room-info">
          <div className="heading">
            <h3>Room</h3>
            <p>iformation</p>
          </div>
          <div className="room">
            <h1>{room_no}</h1>
            <p>Delux Single Room</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
