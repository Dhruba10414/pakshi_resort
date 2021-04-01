import React, { useEffect, useState } from "react";

function OrderedFoodItem({ id, name, quantity, decreaseItem, increaseItem }) {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  return (
    <div className="ofood">
      <div className="no">{id}</div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="btn" onClick={() => increaseItem(id)}>
          {" "}
          +{" "}
        </div>
        <div>{quantity}</div>
        <div className="btn" onClick={() => decreaseItem(id)}>
          {" "}
          -{" "}
        </div>
      </div>
    </div>
  );
}

export default OrderedFoodItem;
