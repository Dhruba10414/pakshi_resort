import {
  SAVE_BOOKINGS,
  RETURN_PENDING_BOOKINGS,
  RETURN_COMPLETED_BOOKINGS,
} from "./bookingType";

export const initialState = {
  bookings: [],
  filteredBookings: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BOOKINGS:
      return {
        ...state,
        bookings: action.bookings,
        filteredBookings: action.bookings,
      };
    case RETURN_PENDING_BOOKINGS:
      return {
        ...state,
        filteredBookings: state.bookings.filter((booking) => {
          return (booking.is_active === false && booking.is_canceled === false);
        }),
      };
    case RETURN_COMPLETED_BOOKINGS:
      return {
        ...state,
        filteredBookings: state.bookings.filter((booking) => {
          return booking.is_active === true;
        }),
      };
    default:
      return state;
  }
};

export default bookingReducer;
