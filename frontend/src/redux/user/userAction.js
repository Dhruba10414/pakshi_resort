import { SET_USER, CLEAR_USER } from "./userType";

// SETUP USER PRIMARY INFO
export const setUser = (currentUser) => {
  return {
    type: SET_USER,
    currentUser
  };
};

// CLEAR USER INFO FROM REDUX
export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};