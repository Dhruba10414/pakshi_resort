import React, { useState } from "react";
import { rsvg } from "../../assets/images/SVG";
import InvoiceButton from "./pdf/InvoiceButton";

function OrderedFoodList({
  orderedFoods,
  roomBills,
  invoiceFor,
  stayingInfo,
  setOpenInvoice,
  fbill,
  rbill,
}) {
  const [warning, setWarning] = useState(false);
  const showWarning = () => {
    setTimeout(() => {
      setWarning(false);
    }, 2000);
    setWarning(true);
  };
  
  return (
    <>
      <h2>Ordered Foods</h2>
      <div className="table">
        <div className="table-heading">
          <div className="name">Name {rsvg}</div>
          <div className="type">Type {rsvg}</div>
          <div className="quantity">Quantity {rsvg}</div>
          <div className="price">Price{rsvg}</div>
          <div className="total">Total{rsvg}</div>
        </div>

        {orderedFoods &&
          orderedFoods.map((food) => (
            <div className="orderItem" key={food.id}>
              <div className="name">{food.food.name}</div>
              <div className="type">{food.food.food_type}</div>
              <div className="quantity">{food.quantity}</div>
              <div className="price">{food.order_price}</div>
              <div className="total">{food.total}</div>
            </div>
          ))}
      </div>
      <div className="button-box">
        <button onClick={() => setOpenInvoice(false)}>Back</button>
        {
          parseInt(fbill.due) + parseInt(rbill.due) === 0
            ? <InvoiceButton
              orderedFoods={orderedFoods}
              roomBills={roomBills}
              invoiceFor={invoiceFor}
              stayingInfo={stayingInfo}
              fbill={fbill}
              rbill={rbill}
            />
            : <button className="saveInvoice" onClick={showWarning}>Save Invoice</button>
        }
      </div>

      <div className={warning ? "success-message" : "success-message disabled"}>
        <div>{warning}</div> Payment is not completed yet!
      </div>
    </>
  );
}

export default OrderedFoodList;
