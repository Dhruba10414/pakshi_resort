import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ContentBox from "../components/StaffSection/ContentBox";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import { rsvg, searchSvg } from "../assets/images/SVG";
import OrderItem from "../components/FoodOrders/OrderItem";

function FoodOrders({clearUser}) {
  const [searchedEntry, setSearchedEntry] = useState([]);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const searchOperation = () => {
    // search functionality
  };

  useEffect(() => {
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const FOOD_ORDERS = `http://127.0.0.1:8000/food/orders/`;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        
        axios.get(FOOD_ORDERS, Config)
        .then(res => {
          setOrders(res.data);
          console.log(res.data);
        })
        .catch(err => {console.log(err.message)});
      })
      .catch(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('refresh_token');
        clearUser();
        history.push("/staff/login");
      });
  }, []);

  return (
    <ContentBox heading="Food Orders">
      <div className="foodOrders">
        <div className="order-table">
          <div className="search-field">
            <form onSubmit={searchOperation}>
              <div className="icon"> {searchSvg}</div>
              <input
                type="text"
                placeholder="Search"
                value={searchedEntry}
                onChange={(e) => setSearchedEntry(e.target.value)}
              />
            </form>
          </div>
          {/* table heading */}
          <div className="table-heading">
            <div className="no">Id {rsvg}</div>
            <div className="guest">Guest {rsvg}</div>
            <div className="food">Food {rsvg}</div>
            <div className="status">Status{rsvg}</div>
            <div className="quantity">Quantity{rsvg}</div>
          </div>
          {orders.map((order) => (
            <OrderItem 
              id={order.id}
              guest={order.guest}
              food={order.food}
              isComplete={order.isComplete}
              isCancel={order.isCancel}
              quantity={order.quantity}
            />
            ))}
        </div>
        <div className="btn-box">
          <button className="complete">Complete</button>
          <button className="cancel">Cancel</button>
        </div>
      </div>
    </ContentBox>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {  clearUser: () => { dispatch(clearUser()); }};
};

export default connect(null, mapDispatchToProps)(FoodOrders);
