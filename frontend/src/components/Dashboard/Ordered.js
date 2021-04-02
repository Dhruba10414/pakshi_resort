import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeFoodFromBasket, increaseItem} from "../../redux/foods/foodAction";
import { rsvg } from "../../assets/images/SVG";

function Ordered({ basket, removeFood }) {
  const [changed, setChanged] = useState(false);

  // INCREASE FOOD ITEM
  const increaseItem = (id) => {
    basket.map(food => {
      if(food.id === id){
        food.quantity++;
      }
    });
    setChanged(true);
  }

  // DECREASE FOOD ITEM
  const decreaseItem = (id) => {
    basket.map(food => {
      if(food.id === id && food.quantity > 0){
        food.quantity--;
      }
      if(food.quantity === 0){
        removeFood(id);
      }
    });
    setChanged(true);
  }

  useEffect(() => {
    setChanged(false);
  }, [changed]);

  return (
    <>
      <h3 className="secondary-head">Orderd Foods</h3>
      <div className="orderedFood">
        <div className="table-heading">
          <div className="no">Id {rsvg}</div>
          <div className="name">Name {rsvg}</div>
          <div className="quantity">Quantity{rsvg}</div>
        </div>
        {basket &&
          basket.map((food) => (
            <div className="ofood" key={food.id}>
              <div className="no">{food.id}</div>
              <div className="name">{food.name}</div>
              <div className="quantity">
                <div className="btn" onClick={() => increaseItem(food.id)}> + </div>
                <div>{food.quantity}</div>
                <div className="btn" onClick={() => decreaseItem(food.id)}> - </div>
              </div>
            </div>
          ))}
      </div>
      <button>Order</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return { 
    basket: state.food.basket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { removeFood: (id) => {dispatch(removeFoodFromBasket(id))}};
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordered);
