import { SET_USER, CLEAR_USER, SET_STAFFS } from "./userType";

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

// SET STAFF LIST
export const setStaffListToRedux = (staffs) => {
  return {
    type: SET_STAFFS,
    staffs
  }
}