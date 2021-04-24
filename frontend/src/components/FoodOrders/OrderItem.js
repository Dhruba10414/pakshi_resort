import React, { useState } from "react";
import { checkSquare } from "../../assets/images/SVG";

function OrderItem({
  id,
  guest,
  food,
  isComplete,
  isCancel,
  quantity,
  selectFoodItem,
  removeFoodItem,
  setWarnings,
}) {
  const [select, setSelect] = useState(false);

  const selectFoodItemFunc = () => {
    if (select) {
      setSelect(false);
      removeFoodItem(id);
    } else {
      if (!isComplete && !isCancel && guest) {
        setSelect(true);
        selectFoodItem(id);
      } else {
          setTimeout(() => {
            setWarnings(false);
          }, [1500])
        setWarnings(true);
      }
    }
  };

  return (
    <div
      className={!select ? "orderItem" : "orderItem selected"}
      onClick={selectFoodItemFunc}
    >
      <div className="no">
        {select ? checkSquare : null}
        <div>{id}</div>
      </div>
      <div className="guest">{guest ? guest: "/"}</div>
      <div className="food">{food}</div>
      <div
        className={
          isComplete || !guest
            ? "status complete"
            : isCancel
            ? "status cancel"
            : "status pending"
        }
      >
        <p>{isComplete || !guest ? "completed" : isCancel ? "canceled" : "pending"}</p>
      </div>
      <div className="quantity">{quantity}</div>
    </div>
  );
}

export default OrderItem;
