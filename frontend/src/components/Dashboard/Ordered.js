import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeFoodFromBasket} from "../../redux/foods/foodAction";
import { arrowLeftCherovon, rsvg } from "../../assets/images/SVG";
import emptysvg from "../../assets/images/View/svg/empty.svg"

function Ordered({ basket, removeFood, closeModal, name, guestId, room }) {
  const [changed, setChanged] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // CALCULATE TOTAL PRICE
  const calcTotal = () => {
    let tp = 0
    basket.map((food) => { tp += parseInt(food.quantity) * parseInt(food.price)});
    setTotal(tp);
  };

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
    calcTotal();
    console.log("Run")
  }, [changed, basket]);

  return (
    <>
      <div className="orderedFood">
        {/* table heading */}
        <div className="table-heading">
          <div className="name">Name {rsvg}</div>
          <div className="quantity">Quantity{rsvg}</div>
          <div className="price">Price {rsvg}</div>
        </div>
        {/* if basket has some item */}
        {basket &&
          basket.map((food) => (
            <div className="ofood" key={food.id}>
              <div className="name">{food.name}</div>
              <div className="quantity">
                <div className="btn" onClick={() => increaseItem(food.id)}> + </div>
                <div>{food.quantity}</div>
                <div className="btn" onClick={() => decreaseItem(food.id)}> - </div>
              </div>
              <div className="price">৳ {food.price}</div>
            </div>
          ))}
        {/* if basket is empty */}
        { 
          basket.length === 0 
          ? <>
            <img src={emptysvg} alt="" />
            <h2 className="empty-head">Foods are not ordered yet!</h2>
            </>
          : null
        }
      </div>

      <div className="price-block">
        <div className="customer">
          <h3>Customer</h3>
          <div className="data"><div className="label">Room :</div><div className="value"><p>{room}</p></div></div>
          <div className="data"><div className="label">Name :</div><div className="value">{name}</div></div>
        </div>
        <div className="price">
          <h1><span>৳</span>{total}</h1>
          { basket && <h3>Total Item <span>{basket.length}</span></h3>}
        </div>
      </div>

      <div className="btn-box">
        <button className="back-btn" onClick={closeModal}>{arrowLeftCherovon} Back</button>
        {
          !loading
            ? <button className="submit-btn">Order</button>
            : <button className="disabled-btn">Processing...</button>
        }
      </div>
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
