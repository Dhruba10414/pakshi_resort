import React from "react";
import { checked, rsvg } from "../../assets/images/SVG";

function Invoice() {
  return (
    <div className="invoices">
      {/* ========== PAYMENT DETAILS ========== */}
      <div className="invoice">
        <div className="bill-amounts">
          {/* bill */}
          <div className="bill">
            <div className="recieved">
              <h3>TOTAL RECIEVED</h3>
              <h2>
                <span>৳</span>15,000
              </h2>
              <p>{checked} Completed</p>
            </div>
            <div className="details">
              {/* room */}
              <div className="detail room">
                <div className="label">
                  <div className="circle"></div>
                  <h3>Room bill</h3>
                </div>
                <h3 className="tk">
                  <span>৳</span>2,000
                </h3>
              </div>
              {/* food */}
              <div className="detail food">
                <div className="label">
                  <div className="circle"></div>
                  <h3>Food bill</h3>
                </div>
                <h3 className="tk">
                  <span>৳</span>2,000
                </h3>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="description">kokoko</div>
        </div>

        <div className="table-block">
          <h2>Ordered Foods</h2>
          {/* table heading */}
          <div className="table">
            <div className="table-heading">
              <div className="name">Name {rsvg}</div>
              <div className="type">Type {rsvg}</div>
              <div className="quantity">Quantity {rsvg}</div>
              <div className="price">Price{rsvg}</div>
              <div className="total">Price{rsvg}</div>
            </div>
            {/* -- */}
            <div className="orderItem">
              <div className="name">Porata</div>
              <div className="type">Breakfast</div>
              <div className="quantity">03</div>
              <div className="price">15</div>
              <div className="total">45</div>
            </div>
            <div className="orderItem">
              <div className="name">Vuna Khichuri</div>
              <div className="type">Lunch</div>
              <div className="quantity">01</div>
              <div className="price">150</div>
              <div className="total">150</div>
            </div>
            
          </div>
        </div>
      </div>

      {/* ========== PAYMENT FUNC ========== */}
      <div className="payment"></div>
    </div>
  );
}

export default Invoice;
