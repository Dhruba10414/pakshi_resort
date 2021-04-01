import React, { useEffect } from "react";
import { rsvg } from "../../assets/images/SVG";
import OrderedFoodItem from "./OrderedFoodItem";

function Ordered({orderedFood, increaseItem, decreaseItem}) {

  useEffect(() => {
      console.log(orderedFood);
  }, [JSON.stringify(orderedFood)]);

  return (
    <>
      <h3 className="secondary-head">Orderd Foods</h3>
      <div className="orderedFood">
        <div className="table-heading">
          <div className="no">Id {rsvg}</div>
          <div className="name">Name {rsvg}</div>
          <div className="quantity">Quantity{rsvg}</div>
        </div>
        {orderedFood.map((food) => (
          <OrderedFoodItem
            key={food.id}
            id={food.id}
            name={food.name}
            quantity={food.quantity}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}
          />
        ))}
      </div>
      <button>Order</button>
    </>
  );
}

export default Ordered;
