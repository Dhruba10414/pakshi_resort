import React from "react";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
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
