import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// SVG
import { x, rsvg } from "../../assets/images/SVG";
import meal from "../../assets/images/StaffSection/meal.svg";
// Component
import FoodItem from "./FoodItem";
import Ordered from "./Ordered";
import Loading from "../Loading";
// Redux
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
//urls
import { api } from "../../assets/URLS";

function FoodOrder({ guestId, name, room, closeModal, clearUser }) {
  const [availabelFood, setAvailableFood] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodType, setFoodType] = useState("Burger");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // FILTER FOOD BY TYPE
  const filterFood = (event) => {
    setFoodType(event.target.value);
    const filteredFoodsByType = availabelFood.filter(
      (food) => food.food_type === event.target.value
    );
    setFilteredFoods(filteredFoodsByType);
  };

  // GET FOOD LIST AND FILTER IT BY CURRENT TYPE
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const AVAILABLE_FOOD = api.food_list;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access } };
        axios
          .get(AVAILABLE_FOOD, Config)
          .then((res) => {
            setAvailableFood(res.data);
            const filteredFoodsByType = res.data.filter( (food) => food.food_type === "Burger" );
            setFilteredFoods(filteredFoodsByType);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          });
      })
      .catch(() => {
        setLoading(false);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  }, []);

  return (
    <div className="food-order-container">
      {/* AVAILABLE FOODS */}
      <div className="available-foods">
        <div className="heading-container">
          <div className="text-part">
            <h3>Availabe</h3> <p>foods</p>
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
                  <select name="role" id="role" value={foodType} onChange={filterFood} >
                    <option value="Burger">Burger</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Chinese Platter">Chinese Platter</option>
                    <option value="Breakfast">Breakfast </option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="availabel-table">
          <div className="table-heading">
            <div className="name">Name {rsvg}</div>
            <div className="desc">Descrition {rsvg}</div>
            <div className="price">Price{rsvg}</div>
            <div className="status"></div>
          </div>
          {!loading ? filteredFoods && filteredFoods.map((food) => (
              <FoodItem
                key={food.id}
                id={food.id}
                name={food.name}
                desc={food.description}
                price={food.price}
                available={food.available}
                type={food.food_type}
              />
            )) : <Loading height="50vh" width="100%" textSize="15px" space="4px" text="Fetching Foods" />}
        </div>
      </div>

      {/* ORDERED FOODS */}
      <div className="foodOrdering">
        <div className="heading-content">
          <div className="heading">
            {" "}
            <h3>Food Order</h3> <p>for guest</p>{" "}
          </div>
        </div>
        <Ordered
          guestId={guestId}
          name={name}
          room={room}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { basket: state.food.basket };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodOrder);
