import React, { useState } from "react";
import ticketImage from "../../assets/images/View/ticket.png";
import { mail, phone, location, x, plus, minus } from "../../assets/images/SVG";

function Ticket({ ticketFor, setOpenTicket }) {
  const [numberOfTicket, setNumberOfTicket] = useState(1);

//   INCRESE ITEM
const decrease = () => {
    if(numberOfTicket > 1){
        setNumberOfTicket(numberOfTicket - 1);
    }
}
  
  const buyTicket = () => {
      console.log(ticketFor);
      console.log(numberOfTicket);
  }

  return (
    <div className="ticket">
      <div className="ticket__calculation">
        {/* ///////////////////////////////////////////////////////////////////// */}
        <div className="top-part">
          <h3>Ticket for</h3>
          <h1>{ticketFor.name}</h1>
          <div className="data address">
            <div className="data__logo">{location}</div>
            <div className="data__value">
              <h4>Address</h4>
              <p>{ticketFor.address}</p>
            </div>
          </div>
          <div className="data phone">
            <div className="data__logo">{phone}</div>
            <div className="data__value">
              <h4>Contact</h4>
              <p>{ticketFor.phone}</p>
            </div>
          </div>
          <div className="data email">
            <div className="data__logo">{mail}</div>
            <div className="data__value">
              <h4>Email</h4>
              <p>{ticketFor.email}</p>
            </div>
          </div>
        </div>
        <div className="btn-box">
            <button onClick={() => setOpenTicket(false)}>Cancel</button>
            <button className="buy" onClick={buyTicket}>Buy ( {numberOfTicket} ) Ticket</button>
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////////////////// */}
      <div className="ticket__options">
        <div className="heading-part">
          <div className="image-block">
            <img src={ticketImage} alt="" />
          </div>
          <div className="price">
            <h2>TOTAL FEE</h2>
            <h1>
              {50 * numberOfTicket}<span>৳</span>
            </h1>
          </div>
        </div>

        <div className="services">
          <h3>FACILITIES</h3>

          <div className="service-table">
            <div className="service selected">
              <div className="name">Entry Fee</div>
              <div className="price">50 ৳</div>
              <div className="option">
                  <div className="inc" onClick={() => setNumberOfTicket(numberOfTicket + 1)}> {plus} </div>
                  <div className="val"> {numberOfTicket} </div>
                  <div className="dec" onClick={decrease}> {minus} </div>
              </div>
            </div>
            <div className="service">
              <div className="name"> ---------- </div>
              <div className="price"> ---------- </div>
              <div className="option"></div>
            </div>
            <div className="service">
              <div className="name"> ---------- </div>
              <div className="price"> ---------- </div>
              <div className="option"></div>
            </div>
            <div className="service">
              <div className="name"> ---------- </div>
              <div className="price"> ---------- </div>
              <div className="option"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
