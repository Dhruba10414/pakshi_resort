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
//urls
import { api } from "../assets/URLS";
import Loading from "../components/Loading";

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
  const [changed, setChange] = useState(false);
  const history = useHistory();

  const [dataLoading, setDataLoading] = useState(false);
  const [completeProcessLoading, setCompleteProcessLoading] = useState(false);
  const [cancelProcessLoading, setCancelProcessLoading] = useState(false);

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
      setCompleteProcessLoading(true);

      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const COMPLETE_ORDER_LINK = api.food_order_complete;
      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };

          axios
            .post(COMPLETE_ORDER_LINK, { order_id: selectedFoods }, Config)
            .then(() => {
              setTimeout(() => {
                setConfirm(false);
              }, 1500);
              setSelectedFoods([]);
              setChange(true);
              setConfirm(true);
              setCompleteProcessLoading(false);
            })
            .catch((err) => {
              console.log(err.messafe);
              setCompleteProcessLoading(false);
            });
        })
        .catch(() => {
          setCompleteProcessLoading(false);
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
      setCancelProcessLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const CANCEL_ORDER_LINK = api.food_order_cancel;
      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };

          axios
            .post(CANCEL_ORDER_LINK, { order_id: selectedFoods }, Config)
            .then(() => {
              setTimeout(() => {
                setCancel(false);
              }, 1500);
              setSelectedFoods([]);
              setChange(true);
              setCancel(true);
              setCancelProcessLoading(false);
            })
            .catch((err) => {
              console.log(err.messafe);
              setCancelProcessLoading(false);
            });
        })
        .catch(() => {
          setCancelProcessLoading(false);
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
    setDataLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const FOOD_ORDERS = api.food_orders;

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
            setDataLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            setDataLoading(false);
          });
      })
      .catch(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
        setDataLoading(false);
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
              All
            </div>
            <div
              className={filterby === "pe" ? "active" : ""}
              onClick={filterOrderListByPending}
            >
              Pending
            </div>
            <div
              className={filterby === "co" ? "active" : ""}
              onClick={filterOrderListByComplete}
            >
              Complete
            </div>
            <div
              className={filterby === "ca" ? "active" : ""}
              onClick={filterOrderListByCancel}
            >
              Cancel
            </div>

            <div className={confirm ? "messages success" : "messages disabled"}>
              <div>{check}</div> Order Completed!
            </div>
            <div className={warnings ? "messages warning" : "messages disabled"}>
              <div>{warning}</div> Can't be selected!
            </div>
            <div className={cancel ? "messages cancel" : "messages disabled"}>
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
          {!dataLoading ? (
            (orders && orders.length === 0) ||
            (filterby !== "all" &&
              filteredOrders &&
              filteredOrders.length === 0) ? (
              <div className="empty-list">
                <img src={search} alt="" />
                <div>Not Available!</div>
              </div>
            ) : filterby !== "all" ? (
              filteredOrders &&
              filteredOrders.map((order) => (
                <OrderItem
                  key={order.id}
                  id={order.id}
                  guest={order.guest && order.guest.name}
                  food={order.food.name}
                  isComplete={order.isComplete}
                  isCancel={order.isCancel}
                  quantity={order.quantity}
                  selectFoodItem={selectFoodItem}
                  removeFoodItem={removeFoodItem}
                  setWarnings={setWarnings}
                />
              ))
            ) : (
              orders &&
              orders.map((order) => (
                <OrderItem
                  key={order.id}
                  id={order.id}
                  guest={order.guest && order.guest.name}
                  food={order.food.name}
                  isComplete={order.isComplete}
                  isCancel={order.isCancel}
                  quantity={order.quantity}
                  selectFoodItem={selectFoodItem}
                  removeFoodItem={removeFoodItem}
                  setWarnings={setWarnings}
                />
              ))
            )
          ) : (
            <Loading height="50vh" width="100%" textSize="16px" space="4px" />
          )}
        </div>

        <div className="btn-box">
          {completeProcessLoading ? (
            <>
              <button className="complete">Processing..</button>
              <button className="cancel">Cancel</button>
            </>
          ) : cancelProcessLoading ? (
            <>
              <button className="complete">Complete</button>
              <button className="cancel">Processing..</button>
            </>
          ) : (
            <>
              <button className="complete" onClick={orderCompletion}>
                Complete
              </button>
              <button className="cancel" onClick={orderCancelation}>
                Cancel
              </button>
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
