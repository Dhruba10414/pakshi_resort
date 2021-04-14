import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// redux
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import {
  saveOrderes,
  filterByComplete,
  filterByCancel,
  filterByPending,
} from "../redux/foods/foodAction";
// Components
import OrderItem from "../components/FoodOrders/OrderItem";
import ContentBox from "../components/StaffSection/ContentBox";
import { rsvg, searchSvg, check, warning } from "../assets/images/SVG";
import search from "../assets/images/View/svg/search-3.svg";

function FoodOrders({
  clearUser,
  saveOrderes,
  orders,
  filteredOrders,
  filterByCancel,
  filterByComplete,
  filterByPending,
}) {
  const [searchedEntry, setSearchedEntry] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [filterby, setFilterby] = useState("all");
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [warnings, setWarnings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChange] = useState(false);
  const history = useHistory();

  const searchOperation = () => {
    // search functionality
  };

  // SELECT FOOD ITEMS
  const selectFoodItem = (s_id) => {
    setSelectedFoods([...selectedFoods, s_id]);
  };

  // REMOVE FOOD ITEMS
  const removeFoodItem = (r_id) => {
    const ul = selectedFoods.filter((id) => id !== r_id);
    setSelectedFoods(ul);
  };

  // FOOD-ORDER COMPLETION
  const orderCompletion = () => {
    if (selectedFoods.length > 0) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://api.pakshiresort.com/api/token/refresh/`;
      const CANCEL_ORDER_LINK = `http://api.pakshiresort.com/food/order/complete/`;
      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };

          axios
            .post(CANCEL_ORDER_LINK, { order_id: selectedFoods })
            .then(() => {
              setTimeout(() => {
                setConfirm(false);
              }, 1500);
              setSelectedFoods([]);
              setChange(true);
              setConfirm(true);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err.messafe);
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
          localStorage.removeItem("user");
          localStorage.removeItem("refresh_token");
          clearUser();
          history.push("/staff/login");
        });
    }
  };

  // FOOD-ORDER CANCELATION
  const orderCancelation = () => {
    if (selectedFoods.length > 0) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://api.pakshiresort.com/api/token/refresh/`;
      const CANCEL_ORDER_LINK = `http://api.pakshiresort.com/food/order/cancel/`;
      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };

          axios
            .post(CANCEL_ORDER_LINK, { order_id: selectedFoods })
            .then(() => {
              setTimeout(() => {
                setCancel(false);
              }, 1500);
              setSelectedFoods([]);
              setLoading(false);
              setChange(true);
              setCancel(true);
            })
            .catch((err) => {
              console.log(err.messafe);
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
          localStorage.removeItem("user");
          localStorage.removeItem("refresh_token");
          clearUser();
          history.push("/staff/login");
        });
    }
  };

  // FILTER BY COMPLETE
  const filterOrderListByComplete = () => {
    setFilterby("co");
    filterByComplete();
  };
  // FILTER CANCEL ORDERS
  const filterOrderListByCancel = () => {
    setFilterby("ca");
    filterByCancel();
  };
  // FILTER PENDING ORDERS
  const filterOrderListByPending = () => {
    setFilterby("pe");
    filterByPending();
  };

  // FETCH FOOD ORDERS
  useEffect(() => {
    setChange(false);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://api.pakshiresort.com/api/token/refresh/`;
    const FOOD_ORDERS = `http://api.pakshiresort.com/food/orders/`;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(FOOD_ORDERS, Config)
          .then((res) => {
            saveOrderes(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  }, [changed]);

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
            <div
              className={filterby === "all" ? "active" : ""}
              onClick={() => {
                setFilterby("all");
              }}
            >
              {" "}
              All{" "}
            </div>
            <div
              className={filterby === "pe" ? "active" : ""}
              onClick={filterOrderListByPending}
            >
              {" "}
              Pending{" "}
            </div>
            <div
              className={filterby === "co" ? "active" : ""}
              onClick={filterOrderListByComplete}
            >
              {" "}
              Complete{" "}
            </div>
            <div
              className={filterby === "ca" ? "active" : ""}
              onClick={filterOrderListByCancel}
            >
              {" "}
              Cancel{" "}
            </div>

            <div className={confirm ? "message success" : "message disabled"}>
              {" "}
              <div>{check}</div> Order Completed!
            </div>
            <div className={warnings ? "message warning" : "message disabled"}>
              {" "}
              <div>{warning}</div> Can't be selected!
            </div>
            <div className={cancel ? "message cancel" : "message disabled"}>
              <div>{warning}</div> Order Canceled!
            </div>
          </div>

          {/* table heading */}
          <div className="table-heading">
            <div className="no">Id {rsvg}</div>
            <div className="guest">Guest {rsvg}</div>
            <div className="food">Food {rsvg}</div>
            <div className="status">Status{rsvg}</div>
            <div className="quantity">Quantity{rsvg}</div>
          </div>
          {(orders && orders.length === 0) ||
          (filterby !== "all" &&
            filteredOrders &&
            filteredOrders.length === 0) ? (
            <div className="empty-list">
              <img src={search} alt="" />
              <div>Food Orders are not available!</div>
            </div>
          ) : null}
          {filterby !== "all"
            ? filteredOrders &&
              filteredOrders.map((order) => (
                <OrderItem
                  key={order.id}
                  id={order.id}
                  guest={order.guest.name}
                  food={order.food.name}
                  isComplete={order.isComplete}
                  isCancel={order.isCancel}
                  quantity={order.quantity}
                  selectFoodItem={selectFoodItem}
                  removeFoodItem={removeFoodItem}
                  setWarnings={setWarnings}
                />
              ))
            : orders &&
              orders.map((order) => (
                <OrderItem
                  key={order.id}
                  id={order.id}
                  guest={order.guest.name}
                  food={order.food.name}
                  isComplete={order.isComplete}
                  isCancel={order.isCancel}
                  quantity={order.quantity}
                  selectFoodItem={selectFoodItem}
                  removeFoodItem={removeFoodItem}
                  setWarnings={setWarnings}
                />
              ))}
        </div>
        <div className="btn-box">
          {!loading ? (
            <>
              <button className="complete" onClick={orderCompletion}>
                Complete
              </button>
              <button className="cancel" onClick={orderCancelation}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="complete">Complete</button>
              <button className="cancel">Cancel</button>
            </>
          )}
        </div>
      </div>
    </ContentBox>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.food.orders,
    filteredOrders: state.food.filteredOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
    saveOrderes: (orders) => {
      dispatch(saveOrderes(orders));
    },
    filterByComplete: () => {
      dispatch(filterByComplete());
    },
    filterByCancel: () => {
      dispatch(filterByCancel());
    },
    filterByPending: () => {
      dispatch(filterByPending());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodOrders);
