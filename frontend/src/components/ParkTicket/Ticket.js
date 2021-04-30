import React, { useState } from "react";
import axios from "axios";
import ticketImage from "../../assets/images/View/ticket.png";
import { plus, minus } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";
import checksvg from "../../assets/images/View/svg/check.svg";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import TicketInvoice from "./TicketInvoice";

function Ticket() {
  const [price, setPrice] = useState(0);
  const [parkTicket, setParkTicket] = useState(0);
  const [poolTicket, setPoolTicket] = useState(0);
  const [success, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  //  INCREASE ITEMS
  const increaseTicket = (type) => {
    if (type === "pool") {
      setPoolTicket(poolTicket + 1);
      setPrice(price + 300);
    } else {
      setParkTicket(parkTicket + 1);
      setPrice(price + 50);
    }
  };

  // DECREASE ITEMS
  const decreaseTicket = (type) => {
    if (type === "pool") {
      if (poolTicket > 0) {
        setPoolTicket(poolTicket - 1);
        setPrice(price - 300);
      }
    } else {
      if (parkTicket > 0) {
        setParkTicket(parkTicket - 1);
        setPrice(price - 50);
      }
    }
  };

  // DOWNLOAD INVOICE
  const downloadPDF = async () => {
    const doc = <TicketInvoice amount={parkTicket} />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "ticketInvoice.pdf");
  };

  const buyTicket = () => {
    if (price > 0) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const BUY_TICKET = api.buy_ticket;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };

          const date = new Date();
          const day = date.getDate();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const today = `${day}-${month}-${year}`;
          const Body = {
            bought_by: null,
            issued_date: today,
            num_tickets: parkTicket + poolTicket,
            ticket_for: 1,
          };

          axios
            .post(BUY_TICKET, Body, Config)
            .then(() => {
              downloadPDF();
              setSucces(true);
              setLoading(false);
              setPoolTicket(0);
              setParkTicket(0);
              setPrice(0);
            })
            .catch(() => {
              console.clear();
              setLoading(false);
            });
        });
    }
  };

  return (
    <div className="ticket">
      <div className="ticket__calculation parkTicket">
        {/* ///////////////////////////////////////////////////////////////////// */}
        <div className="top-part">
          <div className="services parkService">
            <h3>FACILITIES</h3>

            <div className="service-table">
              <div className="service selected">
                <div className="name">Entry Fee</div>
                <div className="price">50 ৳</div>
                <div className="option">
                  <div className="inc" onClick={() => increaseTicket("park")}>
                    {plus}
                  </div>
                  <div className="val"> {parkTicket} </div>
                  <div className="dec" onClick={() => decreaseTicket("park")}>
                    {minus}
                  </div>
                </div>
              </div>
              <div className="service selected2">
                <div className="name">Pool Entry Fee</div>
                <div className="price">300 ৳</div>
                <div className="option">
                  <div className="inc" onClick={() => increaseTicket("pool")}>
                    {plus}
                  </div>
                  <div className="val"> {poolTicket} </div>
                  <div className="dec" onClick={() => decreaseTicket("pool")}>
                    {minus}
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

        {success ? (
          <div className="success-message">
            <img src={checksvg} /> <h1>Successfull</h1>{" "}
          </div>
        ) : null}

        <div className="btn-box">
          {!loading ? (
            <button
              className="buy"
              style={{ width: "90%", margin: "auto" }}
              onClick={buyTicket}
            >
              Buy ( {parkTicket + poolTicket} ) Ticket
            </button>
          ) : (
            <button
              className="loading"
              style={{ width: "90%", margin: "auto" }}
              onClick={buyTicket}
            >
              Processing...
            </button>
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
              {price}
              <span>৳</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
