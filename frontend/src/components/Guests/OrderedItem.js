import React, { useState } from "react";

function OrderedItem({ food, increaseItem, decreaseItem, updateFoodNote }) {
  const [note, setNote] = useState(food.note);
  const [popup, setPopUp] = useState(false);

  const updateNote = (event) => {
      event.preventDefault();
      updateFoodNote(food.id, note);
      setPopUp(false);
  }

  return (
    <>
      <div className="ofood" key={food.id}>
        <div className="name">{food.name}</div>
        <div className="quantity">
          <div className="btn" onClick={() => increaseItem(food.id)}>
            {" "}
            +{" "}
          </div>
          <div>{food.quantity}</div>
          <div className="btn" onClick={() => decreaseItem(food.id)}>
            {" "}
            -{" "}
          </div>
        </div>
        <div className="price">৳ {food.price}</div>
        <div
          className="note"
          onClick={() => {
            setPopUp(true);
          }}
        >
          {note}
        </div>
      </div>

      {popup ? (
        <div className="noteblock">
          <form onSubmit={updateNote}>
            <h3>ADD NOTE</h3>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="btn-boxx">
            <button className="cancel" onClick={() => setPopUp(false)}>CANCEL</button>
            <button onClick={updateNote}>ADD</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default OrderedItem;
