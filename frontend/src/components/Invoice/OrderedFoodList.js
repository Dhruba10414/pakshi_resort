import React from "react";
import { rsvg } from "../../assets/images/SVG";
import InvoiceButton from "./pdf/InvoiceButton";

function OrderedFoodList({ orderedFoods, roomBills, invoiceFor }) {
  return (
    <>
      <h2>Ordered Foods</h2>
      <div className="table">
        <div className="table-heading">
          <div className="name">Name {rsvg}</div>
          <div className="type">Type {rsvg}</div>
          <div className="quantity">Quantity {rsvg}</div>
          <div className="price">Price{rsvg}</div>
          <div className="total">Price{rsvg}</div>
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
        <InvoiceButton
          orderedFoods={orderedFoods}
          roomBills={roomBills}
          invoiceFor={invoiceFor}
        />
      </div>
    </>
  );
}

export default OrderedFoodList;
