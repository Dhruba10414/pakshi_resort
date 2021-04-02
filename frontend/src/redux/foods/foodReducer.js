import { ADD_TO_BASKET, REMOVE_FROM_BASKET, INCREASE_ITEM } from "./foodType";

export const initialState = {
  basket: [],
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      let found = false;
      //Check book is in basket?
      state.basket.map((food) => {
        if (food.id === action.data.id) {
          food.quantity++;
          found = true;
        }
      });
      //If it is not found the add to basket
      if (!found) {
        return {
          ...state,
          basket: [...state.basket, { ...action.data }],
        };
      }

    case REMOVE_FROM_BASKET:
        return {
            ...state,
            basket: state.basket.filter((food) => { return food.id !== action.id; })
        }

    case INCREASE_ITEM:
        state.basket.map((item )=> {
          if(item.id === action.id)
            item.quantity++; 
        })
        
    default:
      return state;
  }
};

export default foodReducer;
