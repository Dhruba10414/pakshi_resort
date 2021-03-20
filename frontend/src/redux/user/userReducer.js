import { CLEAR_USER, SET_STAFFS, SET_USER } from "./userType";

const initialState = {
  isLogedIn: false,
  currentUser: null,
  staffs: []
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
    case SET_STAFFS:
      return{
        ...state,
        staffs: action.staffs
      }
    default:
      return state;
  }
};

export default userReducer;
