import React, { useEffect, useState } from "react";
import { check, warning } from "../../assets/images/SVG";
import { api } from "../../assets/URLS";
import axios from 'axios';

function Payment({
  closePaymentModal,
  makePaymentForGuest,
  success,
  loading,
  fbill,
  rbill,
  setDiscountChange,
  discountChange,
  invoiceFor
}) {
  const [type, setType] = useState("RB");
  const [amount, setAmount] = useState("");
  const [discountRoom, setDiscountRoom] = useState();
  const [discountFood, setDiscountFood] = useState();
  const [billGenerated, setBillGenerated] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDiscountFood(parseInt(fbill.discount));
    setDiscountRoom(parseInt(rbill.discount));
  }, [fbill.discount, rbill.discount]);

  const makeABill = () => {
    let newRoomDue, newFoodDue;
    if (discountChange === null) {
      newRoomDue = parseInt(rbill.due);
      newFoodDue = parseInt(fbill.due);
    } else {
      newRoomDue = parseInt(rbill.due) - (parseInt(discountChange.discountRoom) - parseInt(rbill.discount));
      newFoodDue = parseInt(discountChange.discountFood) - (parseInt(discountChange.discountFood) - parseInt(fbill.discount));
    }

    if (amount) {
      if (amount === "0") {
        setError("Amount shouldn't be '0' !");
      } else if (type === "RT" && parseInt(amount) > newFoodDue) {
        setError("Amount shouldn't be greater than the due!");
      } else if (type === "RB" && parseInt(amount) > newRoomDue) {
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
    // 1) determine due amount and discounts
    let newRoomDue, newFoodDue, newRoomDiscount, newFoodDiscount;
    if (discountChange === null) {
      newRoomDue = parseInt(rbill.due);
      newFoodDue = parseInt(fbill.due);
      newRoomDiscount = parseInt(rbill.discount);
      newFoodDiscount = parseInt(fbill.discount);
    } else {
      newRoomDue = parseInt(rbill.due) - (parseInt(discountChange.discountRoom) - parseInt(rbill.discount));
      newFoodDue = parseInt(discountChange.discountFood) - (parseInt(discountChange.discountFood) - parseInt(fbill.discount));
      newRoomDiscount = parseInt(discountChange.discountRoom);
      newFoodDiscount = parseInt(discountChange.discountFood);
    }

    // 2) If discount greater than due throw error

    if (
      (parseInt(discountRoom) !== newRoomDiscount &&
        parseInt(discountRoom) > newRoomDue) ||
      (parseInt(discountFood) !== newFoodDiscount &&
        parseInt(discountFood) > newFoodDue)
    ) {
      setError("Discount couldn't be greater than total due amount.");
    } else {
      // 3) Check discount changes in UI or not?
      if (
        parseInt(discountFood) !== newFoodDiscount ||
        parseInt(discountRoom) !== newRoomDiscount
      ) {
        // If it is new discount then chanfge all
        setProcessLoading(true);
        const refresh_token = localStorage.getItem("refresh_token");
        const REFRESHAPI = api.refresh;
        const DISCOUNTGIVINGAPI = api.give_discount;

        axios.post(REFRESHAPI, { refresh: refresh_token }).then((token) => {
          const Config = { headers: { Authorization: "Bearer " + token.data.access }};
          const BODY = {"id": invoiceFor.id, "discount_bookings": discountRoom, "discount_food": discountFood}
          
          axios
            .patch(DISCOUNTGIVINGAPI, BODY, Config)
            .then(() => {
              setDiscountChange({ discountRoom: parseInt(discountRoom), discountFood: parseInt(discountFood) });
              setBillGenerated(true);
              setProcessLoading(false);
            })
            .catch(errr => {setProcessLoading(false);});
        })
        .catch(() => {setProcessLoading(false);})

      } else {
        // If it is not new discount then go to next
        setBillGenerated(true);
        console.log("NO OPERATIO JUST GO TO NEXT PAGE");
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
          {discountChange === null ? (
            <>{parseInt(fbill.due) + parseInt(rbill.due)}</>
          ) : (
            <>
              {parseInt(fbill.due) -
                (discountChange.discountFood - parseInt(fbill.discount)) +
                parseInt(rbill.due) -
                (discountChange.discountRoom - parseInt(rbill.discount))}
            </>
          )}
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
        {!loading 
          ?
            billGenerated 
            ? <button className="submit" onClick={makeABill}>Sumbmit</button>
            : !processLoading 
              ? <button className="submit" onClick={generateNewBill}> Next Step </button>
              : <button className="submit"> Processing... </button>
          : <button className="submit"> Processing... </button>
        }
      </div>

      {
        billGenerated
        ? <div className="editDiscount" onClick={() => setBillGenerated(false)}>{warning} Edit Discount</div>
        : null
      }

      <small>{error}</small>

      <div className={success ? "success-message" : "success-message disabled"}>
        <div>{check}</div> Successfully Updated!
      </div>
    </div>
  );
}

export default Payment;
