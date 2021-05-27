import React from 'react';
import {
    mail,
    phone,
    checked,
    calender,
    logout,
    location,
    hash,
    type,
  } from "../../../assets/images/SVG";

function ViewInfo({viewFor, tariff}) {
    return (
        <div className="guest-information">
        <div className="guest">
          <h3>Requested by</h3>
          <h2 className="name">{viewFor.guest.guestName}</h2>
          {/* guest data */}
          <div className="data address">
            <div className="data__logo">{location}</div>
            <div className="data__value">
              <h4>Address</h4>
              <p>{viewFor.guest.guestAddress}</p>
            </div>
          </div>
          <div className="data phone">
            <div className="data__logo">{phone}</div>
            <div className="data__value">
              <h4>Contact</h4>
              <p>{viewFor.guest.guestPhone}</p>
            </div>
          </div>
          <div className="data email">
            <div className="data__logo">{mail}</div>
            <div className="data__value">
              <h4>Email</h4>
              <p>{viewFor.guest.guestEmail}</p>
            </div>
          </div>
        </div>

        <div className="infos">
          <div className="data-box">
            <h3 className="other">TIME INFO</h3>

            <div className="data bookon">
              <div className="data__logo">{calender}</div>
              <div className="data__value">
                <h4>Booked on</h4>
                <p>{viewFor.info.requestedOn}</p>
              </div>
            </div>

            <div className="data checkin">
              <div className="data__logo">{checked}</div>
              <div className="data__value">
                <h4>Check-in</h4>
                <p>{viewFor.info.checkin}</p>
              </div>
            </div>

            <div className="data checkout">
              <div className="data__logo">{logout}</div>
              <div className="data__value">
                <h4>Check-out</h4>
                <p>{viewFor.info.checkout}</p>
              </div>
            </div>
          </div>


          <div className="data-box-2">
            <h3 className="other">ROOM INFO</h3>
            <div className="data roomtype">
              <div className="data__logo">{type}</div>
              <div className="data__value">
                <h4>Type</h4>
                <p>{viewFor.info.roomType}</p>
              </div>
            </div>
            <div className="data roomnum">
              <div className="data__logo">{hash}</div>
              <div className="data__value">
                <h4>Number of rooms</h4>
                <p>{viewFor.info.numberOfRooms}</p>
              </div>
            </div>
            <div className="data roomcost">
              <div className="data__logo">৳</div>
              <div className="data__value">
                <h4>Cost Per room</h4>
                <p>{tariff}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
}

export default ViewInfo
