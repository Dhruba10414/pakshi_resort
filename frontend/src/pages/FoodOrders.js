import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// redux
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import { saveOrderes, filterByComplete, filterByCancel } from "../redux/foods/foodAction"
// Components
import OrderItem from "../components/FoodOrders/OrderItem";
import ContentBox from "../components/StaffSection/ContentBox";
import { rsvg, searchSvg } from "../assets/images/SVG";
import search from '../assets/images/View/svg/search-3.svg';

function FoodOrders({clearUser, saveOrderes, orders, filteredOrders, filterByCancel, filterByComplete}) {
  const [searchedEntry, setSearchedEntry] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  //filter
  const [filterby, setFilterby] = useState("pe");
  const [IsComplete, setIsComplete] = useState(true);
  const [IsCancel, setIsCancel] = useState(false);
  const history = useHistory();

  const searchOperation = () => {
    // search functionality
  };

  // SELECT FOOD ITEMS
  const selectFoodItem = (s_id) => {
    setSelectedFoods([...selectedFoods, s_id]);
  }

  // REMOVE FOOD ITEMS
  const removeFoodItem = (r_id) => {
    const ul = selectedFoods.filter( id => id !== r_id);
    setSelectedFoods(ul);
  }

  // FOOD-ORDER COMPLETION
  const orderCompletion = () => {
    console.log(selectedFoods);
  }

   // FOOD-ORDER CANCELATION
   const orderCancelation = () => {
    console.log(selectedFoods);
  }

  // FILTER BY COMPLETE
  const filterOrderListByComplete = () => {
    setFilterby("co");
    filterByComplete();
  }
  // FILTER ALL ORDERS
  const filterOrderListByCancel = () => {
    setFilterby("ca");
    filterByCancel();
  }

  // FETCH FOOD ORDERS
  useEffect(() => {
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const FOOD_ORDERS = `http://127.0.0.1:8000/food/orders/`;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        axios.get(FOOD_ORDERS, Config)
        .then(res => {
          saveOrderes(res.data);
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
          <div className="filter-by-type">
            <div className={filterby === "pe" ? "active" : ""} onClick={() => {setFilterby("pe")} }>All</div>
            <div className={filterby === "co" ? "active" : ""} onClick={filterOrderListByComplete}>Complete</div>
            <div className={filterby === "ca" ? "active" : ""} onClick={filterOrderListByCancel}>Cancel</div>
          </div>
          {/* table heading */}
          <div className="table-heading">
            <div className="no">Id {rsvg}</div>
            <div className="guest">Guest {rsvg}</div>
            <div className="food">Food {rsvg}</div>
            <div className="status">Status{rsvg}</div>
            <div className="quantity">Quantity{rsvg}</div>
          </div>
          {
            (orders && orders.length === 0) || (filterby !== 'pe' && filteredOrders && filteredOrders.length === 0)
            ? (
              <div className="empty-list">
                <img src={search} alt="" />
                <div>Food Orders are not available!</div>
              </div>
              )
            : null
          }
          {
            filterby !== 'pe'
            ? filteredOrders && filteredOrders.map((order) => (
            <OrderItem 
              key ={order.id}
              id={order.id}
              guest={order.guest.name}
              food={order.food.name}
              isComplete={order.isComplete}
              isCancel={order.isCancel}
              quantity={order.quantity}
              selectFoodItem={selectFoodItem}
              removeFoodItem={removeFoodItem}
            />
            ))
            : orders && orders.map((order) => (
              <OrderItem 
                key ={order.id}
                id={order.id}
                guest={order.guest.name}
                food={order.food.name}
                isComplete={order.isComplete}
                isCancel={order.isCancel}
                quantity={order.quantity}
                selectFoodItem={selectFoodItem}
                removeFoodItem={removeFoodItem}
              />))
          }
        </div>
        <div className="btn-box">
          <button className="complete" onClick={orderCompletion}>Complete</button>
          <button className="cancel" onClick={orderCancelation}>Cancel</button>
        </div>
      </div>
    </ContentBox>
  );
}

const mapStateToProps = (state) => {
  return { 
    orders: state.food.orders,
    filteredOrders: state.food.filteredOrders
  };
};

const mapDispatchToProps = (dispatch) => {
  return { 
    clearUser: () => { dispatch(clearUser()); },
    saveOrderes: (orders) => { dispatch(saveOrderes(orders))},
    filterByComplete: () => {dispatch(filterByComplete())},
    filterByCancel: () => {dispatch(filterByCancel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodOrders);
