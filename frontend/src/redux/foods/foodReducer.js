import {
  ADD_TO_BASKET,
  REMOVE_ALL_FOODS,
  REMOVE_FROM_BASKET,
  RETURN_COMPETED_ORDERS,
  RETURN_CANCELED_ORDERS,
  SAVE_ORDERS,
  RETURN_PENDING_ORDERS,
} from "./foodType";

export const initialState = {
  basket: [],
  orders: [],
  filteredOrders: [],
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
        basket: state.basket.filter((food) => {
          return food.id !== action.id;
        }),
      };
    case REMOVE_ALL_FOODS:
      return {
        ...state,
        basket: [],
      };
    case SAVE_ORDERS:
      return {
        ...state,
        orders: action.orders,
        filteredOrders: action.orders,
      };
    case RETURN_COMPETED_ORDERS:
      return {
        ...state,
        filteredOrders: state.orders.filter((order) => {
          return order.isComplete === true;
        }),
      };
    case RETURN_CANCELED_ORDERS:
      return {
        ...state,
        filteredOrders: state.orders.filter((order) => {
          return order.isCancel === true;
        }),
      };
    case RETURN_PENDING_ORDERS:
      return {
        ...state,
        filteredOrders: state.orders.filter((order) => {
          return !order.isCancel && !order.isComplete;
        }),
      };
    default:
      return state;
  }
};

export default foodReducer;
