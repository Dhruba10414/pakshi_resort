import React, { useState } from "react";
import axios from "axios";
import ticketImage from "../../assets/images/View/ticket.png";
import { mail, phone, location, plus, minus } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";
import checksvg from "../../assets/images/View/svg/check.svg";

function Ticket({ ticketFor, setOpenTicket }) {
  const [numberOfTicket, setNumberOfTicket] = useState(1);
  const [success, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("")

  //   DECREASE ITEM
  const decrease = () => {
    if (numberOfTicket > 1) {
      setNumberOfTicket(numberOfTicket - 1);
    }
  };

  const buyTicket = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const BUY_TICKET = api.buy_ticket;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};

        const date = new Date();
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        const today = `${day}-${month}-${year}`;
        const Body = {  "bought_by": ticketFor.id, "issued_date": today, "num_tickets": numberOfTicket, "ticket_for": 1};

        axios.post(BUY_TICKET, Body, Config)
        .then(() => {
          setSucces(true);
          setLoading(false);
          setNumberOfTicket(1);
        })
        .catch(() => {console.clear(); setLoading(false);})
      });
  };

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

        {success ? (
          <div className="success-message">
            <img src={checksvg} /> <h1>Successfull</h1>{" "}
          </div>
        ) : null}

        <div className="btn-box">
          {!loading ? (
            <>
              <button onClick={() => setOpenTicket(false)}>Cancel</button>
              <button className="buy" onClick={buyTicket}>
                Buy ( {numberOfTicket} ) Ticket
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setOpenTicket(false)}>Cancel</button>
              <button className="loading" onClick={buyTicket}>
                Processing...
              </button>
            </>
          )}
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
              {50 * numberOfTicket}
              <span>৳</span>
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
                <div
                  className="inc"
                  onClick={() => setNumberOfTicket(numberOfTicket + 1)}
                >
                  {" "}
                  {plus}{" "}
                </div>
                <div className="val"> {numberOfTicket} </div>
                <div className="dec" onClick={decrease}>
                  {" "}
                  {minus}{" "}
                </div>
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
