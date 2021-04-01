import React, { useEffect, useState } from "react";
import { x, rsvg } from "../../assets/images/SVG";
import meal from "../../assets/images/StaffSection/meal.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
import FoodItem from "./FoodItem";
import Ordered from "./Ordered";

function FoodOrder({ id, name, room, closeModal, clearUser }) {
  const [availabelFood, setAvailableFood] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [orderedFood, setOrderedFood] = useState([]);
  const [foodType, setFoodType] = useState("B");
  const history = useHistory();

  // FILTER FOOD BY TYPE
  const filterFood = (event) => {
    setFoodType(event.target.value);
    const filteredFoodsByType = availabelFood.filter(food => food.food_type === event.target.value);
    setFilteredFoods(filteredFoodsByType);
  }

  // ADD FOODS IN CART FOR ORDER
  const addFoodAsOrder = (id, name, quantity) => {
    setOrderedFood([...orderedFood, {id, name, quantity}]);
  }

  // DELETE FOOD ITEM
  const deleteItem = (id) => {
    const result = orderedFood.filter((food) => { return food.id !== id; })
    setOrderedFood(result);
  }

  // INCREASE FOOD ITEM
  const increaseItem = (id) => {
    console.log("i")
    orderedFood.map(food => {
      if(food.id === id){
        food.quantity++;
      }
    })
  }

  // DECREASE FOOD ITEM
  const decreaseItem = (id) => {
    orderedFood.map(food => {
      if(food.id === id && food.quantity > 0){
        food.quantity--;
      }
      if(food.quantity === 0){
        deleteItem(id);
      }
    })
  }

  // GET FOOD LIST AND FILTER IT BY CURRENT TYPE
  useEffect(() => {
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const AVAILABLE_FOOD = `http://127.0.0.1:8000/food/allfood/`;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        
        axios.get(AVAILABLE_FOOD, Config)
        .then(res => {
          setAvailableFood(res.data);
          const filteredFoodsByType = res.data.filter(food => food.food_type === "B");
          setFilteredFoods(filteredFoodsByType);
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
    <div className="food-order-container">
      <div className="foodOrdering">
        <div className="heading-content">
          <div className="heading"> <h3>Food Order</h3> <p>for guest</p> </div>
          <div className="heading-button" onClick={() => closeModal()}>{x}</div>
        </div>
        
        <Ordered
          orderedFood={orderedFood}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
        />
      </div>

      {/* AVAILABLE FOODS */}
      <div className="available-foods">
        <div className="heading-container">
          <div className="text-part"> <h3>Availabe</h3> <p>foods</p> </div>
          <div className="style-part">
            <div className="style"> <img src={meal} alt="" /></div>
          </div>

          <form>
            <div className="input-container">
              <div className="input w-30">
                <div className="select">
                  <select name="role" id="role" value={foodType} onChange={filterFood}>
                    <option value="B">Breakfast </option>
                    <option value="L">Lunch</option>
                    <option value="D">Dinner</option>
                    <option value="S">Snacks</option>
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
          {
            filteredFoods && filteredFoods.map(food => (
              <FoodItem
                key={food.id}
                id={food.id}
                name={food.name}
                desc={food.description}
                price={food.price}
                available={food.available}
                type={food.food_type}
                addFoodAsOrder={addFoodAsOrder}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

// Redux actions
const mapDispatchToProps = (dispatch) => {
  return { clearUser: () => { dispatch(clearUser())} };
};

export default connect(null, mapDispatchToProps)(FoodOrder);
