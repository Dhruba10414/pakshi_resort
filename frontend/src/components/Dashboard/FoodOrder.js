import React from "react";
import { arrowRight } from "../../assets/images/SVG";

function FoodOrder({ id, name, room, closeModal }) {
  return (
    <div className="food-order-container">
      <div className="foodOrdering">
        <div className="heading">
          <div className="heading-content">
            <h2>Food Order</h2>
            <p>for guest</p>
          </div>
          <div className="heading-button" onClick={() => closeModal()}>
            Go Back
            {arrowRight}
          </div>
        </div>

        <form>
          <div className="input-container">
            <div className="row-30 label">Name</div>
            <div className="row-30 label">Phone</div>
            <div className="row-30 label">Room no</div>
          </div>
          <div className="input-container">
            <div className="input disabled row-30">{name}</div>
            <div className="input disabled row-30">01531 709712</div>
            <div className="input disabled row-30">{room}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodOrder;
