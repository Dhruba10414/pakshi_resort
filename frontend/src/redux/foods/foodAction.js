import { ADD_TO_BASKET, REMOVE_FROM_BASKET, INCREASE_ITEM } from "./foodType";

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
