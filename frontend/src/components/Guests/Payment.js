import React, { useEffect, useState } from "react";
import gsap from "gsap";

function Payment({ closePaymentModal, PaymentFor }) {
  const [type, setType] = useState("RB");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const makeABill = () => {
      if(amount){
        console.log(amount, type);
      } else{
          setError("Required amount fields!")
      }
  };

  return (
    <div className="paymentModal">
      <div className="heading">
        <h3>Payment</h3>
        <p>for guest</p>
      </div>

      <div className="desc">
        <h3>Nota bene</h3>
        <p>
          Staffs are requested to complete the transaction before the click the
          submit button.
        </p>
      </div>

      <form onSubmit={makeABill}>
        <div className="input-container">
          <div className="input w-100">
            <label>Bill for</label>
            <div className="select">
              <select
                name="role"
                id="role"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="RB">Room </option>
                <option value="RP">Foods</option>
                <option value="PT">Park Ticket</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-container">
          <div className="input w-100">
            <label>Recieved</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="button-box">
        <button className="cancel" onClick={closePaymentModal}>Cancel</button>
        <button className="submit" onClick={makeABill}>Sumbmit</button>
      </div>

      <small>{error}</small>
    </div>
  );
}

export default Payment;
