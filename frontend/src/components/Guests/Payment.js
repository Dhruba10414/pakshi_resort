import React, { useEffect, useState } from "react";
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
  const [discountRoom, setDiscountRoom] = useState(0);
  const [discountFood, setDiscountFood] = useState(0);
  const [billGenerated, setBillGenerated] = useState(false);
  const [error, setError] = useState("");

  const makeABill = () => {
    if (amount) {
      if (amount === "0") {
        setError("Amount shouldn't be '0' !");
      } else if (type === "RT" && amount > fbill.due) {
        setError("Amount shouldn't be greater than the due!");
      } else if (type === "RB" && amount > rbill.due) {
        setError("Amount shouldn't be greater than the due!");
      } else {
        makePaymentForGuest(amount, type);
        setAmount("");
        setType("RB");
      }
    } else {
      setError("Required amount fields!");
    }
  };

  const generateNewBill = () => {
    // setBillGenerated(true);
    if (discountRoom > rbill.net_payable || discountFood > fbill.net_payable) {
      setError("Discount couldn't be greater than total payable amount.");
    } else {
      if (
        (discountRoom === 0 || discountFood === 0) &&
        (discountFood !== fbill.discount || discountRoom !== rbill.discount)
      ) {
        // operation
        console.log("OPERATION")
      } else {
        setBillGenerated(true);
      }
    }
  };

  return (
    <div className="paymentModal">
      <div className="heading">
        <h3>Payment</h3>
        <p>for guest</p>
      </div>

      <div className="desc">
        <h3>TOTAL PAYABLE BILL</h3>
        <h2>
          {fbill.due + rbill.due}
          <span>৳</span>
        </h2>
      </div>

      {billGenerated ? (
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
      ) : (
        <div>
          <form>
            <div className="input-container">
              <div className="input w-100">
                <label>Discount For Room</label>
                <input
                  type="text"
                  value={discountRoom}
                  placeholder={rbill.discount}
                  onChange={(e) => setDiscountRoom(e.target.value)}
                />
              </div>
            </div>
            <div className="input-container">
              <div className="input w-100">
                <label>Discount For Food</label>
                <input
                  type="text"
                  value={discountFood}
                  placeholder={fbill.discount}
                  onChange={(e) => setDiscountFood(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="button-box">
        <button className="cancel" onClick={closePaymentModal}>
          Cancel
        </button>
        {!loading ? (
          billGenerated ? (
            <button className="submit" onClick={makeABill}>
              Sumbmit
            </button>
          ) : (
            <button className="submit" onClick={generateNewBill}>
              Next Step
            </button>
          )
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
