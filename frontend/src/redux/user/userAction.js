import {
  SET_USER,
  CLEAR_USER,
  SET_USER_PROFILE,
  SET_LOADING,
  CLEAR_LOADING,
} from "./userType";

// SETUP USER PRIMARY INFO
export const setUser = (currentUser) => {
  return {
    type: SET_USER,
    currentUser: {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
    },
  };
};

// SETUP USER DETAIL INFO
export const setUserProfile = (currentUserProfile) => {
  console.log(currentUserProfile);
  return {
    type: SET_USER_PROFILE,
    currentUserProfile: currentUserProfile,
  };
};

// CLEAR USER INFO FROM REDUX
export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

// SET A LOADING STATE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// CLEAR A LOADING STATE
export const clearLoading = () => {
  return {
    type: CLEAR_LOADING,
  };
};
