import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
// Components
import FoodItem from "./FoodItem";
// Svg
import { rsvg } from "../../assets/images/SVG";
//urls
import {api} from "../../assets/URLS";

function Menu({ clearUser, selectAfood, changed }) {
  const [availabelFood, setAvailableFood] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodType, setFoodType] = useState("Breakfast");
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
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const AVAILABLE_FOOD = api.food_list;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };

        axios
          .get(AVAILABLE_FOOD, Config)
          .then((res) => {
            setAvailableFood(res.data);
            const filteredFoodsByType = res.data.filter(
              (food) => food.food_type === "Breakfast"
            );
            setFilteredFoods(filteredFoodsByType);
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
    <div className="foodMenu">
      {/* HEADING */}
      <div className="heading">
        <h3>Food</h3>
        <p>menu</p>
      </div>
      {/* AVAILABLE FOODS */}
      <div className="available-foods">
        <form>
          <div className="input-container">
            <div className="input w-30">
              <div className="select">
                <select
                  name="role"
                  id="role"
                  value={foodType}
                  onChange={filterFood}
                >
                  <option value="Breakfast">Breakfast </option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Chinese Platter">Chinese Platter</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="availabel-table">
          <div className="table-heading">
            <div className="id">id</div>
            <div className="name">Name {rsvg}</div>
            <div className="desc">Descrition {rsvg}</div>
            <div className="price">Price{rsvg}</div>
          </div>
          {filteredFoods &&
            filteredFoods.map((food) => (
              <FoodItem
                key={food.id}
                id={food.id}
                name={food.name}
                desc={food.description}
                price={food.price}
                available={food.available}
                type={food.food_type}
                selectAfood={selectAfood}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(Menu);
