import React, { useState } from "react";
import { check } from "../../assets/images/SVG";

function Payment({
  closePaymentModal,
  makePaymentForGuest,
  success,
  loading,
  fbill,
  rbill,
}) {
  const [type, setType] = useState("RB");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const makeABill = () => {
    if (amount) {
      if(amount === '0'){
        setError("Amount shouldn't be '0' !");
      } else if(type === "RT" && amount > fbill.due){
        setError("Amount shouldn't be greater than the due!");
      } else if(type === "RB" && amount > rbill.due){
        setError("Amount shouldn't be greater than the due!");
      } else{
        makePaymentForGuest(amount, type);
        setAmount("");
        setType("RB");
      }
    } else {
      setError("Required amount fields!");
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
                <option value="RT">Foods</option>
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
              placeholder="0"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="button-box">
        <button className="cancel" onClick={closePaymentModal}>
          Cancel
        </button>
        {!loading ? (
          <button className="submit" onClick={makeABill}>
            {" "}
            Sumbmit{" "}
          </button>
        ) : (
          <button className="submit"> Processing... </button>
        )}
      </div>

      <small>{error}</small>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{check}</div> Successfully Updated!
      </div>
    </div>
  );
}

export default Payment;