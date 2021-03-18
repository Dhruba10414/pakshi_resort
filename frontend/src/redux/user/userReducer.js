import { CLEAR_USER, SET_USER } from "./userType";

const initialState = {
  isLogedIn: false,
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        isLogedIn: true,
      };
    case CLEAR_USER:
      return {
        currentUser: null,
        isLogedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
