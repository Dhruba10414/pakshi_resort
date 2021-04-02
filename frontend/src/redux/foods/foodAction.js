import { ADD_TO_BASKET, REMOVE_FROM_BASKET, REMOVE_ALL_FOODS } from "./foodType";

// ADD NEW FOOD TO BASKET
export const addFoodToBasket = (data) => {
  return {
    type: ADD_TO_BASKET,
    data,
  };
};

// REMOVE A FOOD FROM BASKET
export const removeFoodFromBasket = (id) => {
  return {
    type: REMOVE_FROM_BASKET,
    id,
  };
};


// REMOVE ALL FOODS FROM BASKET
export const removeAllFoods = () => {
  return {
    type: REMOVE_ALL_FOODS
  }
}