import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from './foodType';

// SETUP USER PRIMARY INFO
export const addFoodToBasket = (data) => {
    return {
      type: ADD_TO_BASKET,
      data
    };
};

// SETUP USER PRIMARY INFO
export const removeFoodToBasket = (data) => {
    return {
      type: REMOVE_FROM_BASKET,
      data
    };
};