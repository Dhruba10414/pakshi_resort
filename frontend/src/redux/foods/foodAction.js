import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  REMOVE_ALL_FOODS,
  SAVE_ORDERS,
  RETURN_COMPETED_ORDERS,
  RETURN_CANCELED_ORDERS,
} from "./foodType";

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
    type: REMOVE_ALL_FOODS,
  };
};

// SAVE FOOD ORDERS
export const saveOrderes = (orders) => {
  return {
    type: SAVE_ORDERS,
    orders,
  };
};

// FILTER FOOD ORDERS BY COMPLETION
export const filterByComplete = () => {
  return {
    type: RETURN_COMPETED_ORDERS,
  };
};

// FILTER FOOD ORDERS BY CANCELATION
export const filterByCancel = () => {
  return {
    type: RETURN_CANCELED_ORDERS,
  };
}