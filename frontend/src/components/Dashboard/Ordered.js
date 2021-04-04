import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
import {removeFoodFromBasket, removeAllFoods} from "../../redux/foods/foodAction";
// imaeg & svg
import { arrowLeftCherovon, rsvg } from "../../assets/images/SVG";
import emptysvg from "../../assets/images/View/svg/empty.svg"
import checksvg from "../../assets/images/View/svg/check.svg"

function Ordered({ basket, removeFood, removeAllFoods, closeModal, name, guestId, room }) {
  const [total, setTotal] = useState(0);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

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

  // NOTIFY
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 4000)
    setSuccess(true);
  }

  // ORDER FOOD
  const OrderFoods = () => {
    if(basket && basket.length > 0)
    {
      setLoading(true);
      const orderedfoodList = basket.map((food) => { return {id: food.id, quantity: food.quantity, price: food.price} });
      const Order = {"foods": orderedfoodList, "guest_id": guestId};
      
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
      const FOOD_ORDER_URL = `http://127.0.0.1:8000/food/orders/`;

      axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = { headers: { Authorization: "Bearer " + token.data.access }};
          
          axios.post(FOOD_ORDER_URL, Order, Config)
          .then(() => {
            removeAllFoods();
            notify();
            setLoading(false);
          })
          .catch(err => {console.log(err.message); setLoading(false);})
        })
        .catch(() => {
          setLoading(false);
          localStorage.removeItem('user');
          localStorage.removeItem('refresh_token');
          clearUser();
          history.push("/staff/login");
        })
    }
  }
  
  // RE RENDER
  useEffect(() => {
    setChanged(false);
    calcTotal();
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
          success
          ? <>
            <img src={checksvg} className="check" alt="" />
              <h2 className="empty-head">Order Confirmed!</h2>
          </>
          : basket.length === 0 
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
            ? <button className="submit-btn" onClick={OrderFoods}>Order</button>
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
  return { 
    removeFood: (id) => {dispatch(removeFoodFromBasket(id))},
    removeAllFoods: () => {dispatch(removeAllFoods())},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordered);
