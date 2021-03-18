import React from "react";
import { x, rsvg } from "../../assets/images/SVG";
import meal from "../../assets/images/StaffSection/meal.svg";

function FoodOrder({ id, name, room, closeModal }) {
  return (
    <div className="food-order-container">
      <div className="foodOrdering">
        <div className="heading-content">
          <div className="heading">
            <h3>Food Order</h3>
            <p>for guest</p>
          </div>
          <div className="heading-button" onClick={() => closeModal()}>
            {" "}
            {x}{" "}
          </div>
        </div>

        <form>
          <div className="input-container">
            <div className="input w-20">
              <label>Room</label>
              <input type="text" disabled value={room} />
            </div>
            <div className="input w-50">
              <label>Name</label>
              <input type="text" disabled value={name} />
            </div>
            <div className="input w-30">
              <label>Phone</label>
              <input type="text" disabled value={id} />
            </div>
          </div>
        </form>
        <h3 className="secondary-head">Orderd Foods</h3>
        <div className="orderedFood">
          <div className="table-heading">
            <div className="no">Id {rsvg}</div>
            <div className="name">Name {rsvg}</div>
            <div className="quantity">Quantity{rsvg}</div>
          </div>
          {/* dummy foods */}
          <div className="food">
            <div className="no">0201</div>
            <div className="name">Parata</div>
            <div className="quantity">6</div>
          </div>
          <div className="food">
            <div className="no">0201</div>
            <div className="name">Parata</div>
            <div className="quantity">6</div>
          </div>
          <div className="food">
            <div className="no">0201</div>
            <div className="name">Parata</div>
            <div className="quantity">6</div>
          </div>
        </div>
        <button>Order</button>
      </div>

      {/* AVAILABLE FOODS */}
      <div className="available-foods">
        {/* heading */}
        <div className="heading-container">
          <div className="text-part">
            <h3>Availabe</h3>
            <p>foods</p>
          </div>
          <div className="style-part">
            <div className="style">
              <img src={meal} alt="" />
            </div>
          </div>
          <form>
            <div className="input-container">
              <div className="input w-30">
                <div className="select">
                  <select name="role" id="role">
                    <option value="b ">Breakfast </option>
                    <option value="l">Lunch</option>
                    <option value="d">Dinner</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* availabel */}
        <div className="availabel-table">

        </div>
      </div>
    </div>
  );
}

export default FoodOrder;
