import React, { useEffect, useState } from "react";
import { check, warning } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";
import axios from "axios";

function Payment({
  success,
  closePaymentModal,
  makePaymentForGuest,
  loading,
  discountProcessLoading,
  gotoPayment,
  setGoToPayment,
  fbill,
  rbill,
  applyDiscount,
}) {
  const [type, setType] = useState("RB");
  const [amount, setAmount] = useState("");
  const [discountRoom, setDiscountRoom] = useState();
  const [discountFood, setDiscountFood] = useState();
  const [billGenerated, setBillGenerated] = useState(false);
  const [error, setError] = useState("");

  // SETUP PRE FILLED DISCOUNT
  useEffect(() => {
    setDiscountFood(parseInt(fbill.discount));
    setDiscountRoom(parseInt(rbill.discount));
  }, [fbill.discount, rbill.discount]);

  // /////////////////////////////////////////////////////
  // MAKE A BILL
  const makeABill = () => {
    if (amount) {
      if (amount === "0") {
        setError("Amount shouldn't be '0' !");
      } else if (type === "RT" && parseInt(amount) > parseInt(fbill.due)) {
        setError("Amount shouldn't be greater than the due!");
      } else if (type === "RB" && parseInt(amount) > parseInt(rbill.due)) {
        setError("Amount shouldn't be greater than the due!");
      } else {
        makePaymentForGuest(parseInt(amount), type);
        setAmount("");
        setType("RB");
      }
    } else {
      setError("Required amount fields!");
    }
  };

  // ///////////////////////////////////////////////////////////
  // APPLY  DISCOUNT
  const ApplyNewDiscount = () => {
    if (
      (parseInt(discountRoom) !== parseInt(rbill.discount) && parseInt(discountRoom) > parseInt(rbill.due)) ||
      (parseInt(discountFood) !== parseInt(fbill.discount) && parseInt(discountFood) > parseInt(fbill.due))
    ) {
      setError("Discount couldn't be greater than total due amount.");
    } else {
      if (
        parseInt(discountRoom) !== parseInt(rbill.discount) ||
        parseInt(discountFood) !== parseInt(fbill.discount)
      ) {
        applyDiscount(parseInt(discountRoom), parseInt(discountFood));
        setError("");
      } else {
        // If it is not new discount then go to next
        setGoToPayment(true);
        setError("");
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
          {parseInt(fbill.due) + parseInt(rbill.due)}
          <span>৳</span>
        </h2>
      </div>

      {gotoPayment ? (
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
                  placeholder={parseInt(rbill.discount)}
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
                  placeholder={parseInt(fbill.discount)}
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
          gotoPayment ? (
            <button className="submit" onClick={makeABill}>
              Sumbmit
            </button>
          ) : !discountProcessLoading ? (
            <button className="submit" onClick={ApplyNewDiscount}>Next Step</button>
          ) : (
            <button className="submit"> Processing... </button>
          )
        ) : (
          <button className="submit"> Processing... </button>
        )}
      </div>

      {gotoPayment ? (
        <div className="editDiscount" onClick={() => setGoToPayment(false)}>
          {warning} Edit Discount
        </div>
      ) : null}

      <small>{error}</small>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{check}</div> Successfully Updated!
      </div>
    </div>
  );
}

export default Payment;
