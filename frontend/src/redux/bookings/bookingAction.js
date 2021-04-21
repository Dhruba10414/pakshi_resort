import { SAVE_BOOKINGS, RETURN_PENDING_BOOKINGS, RETURN_COMPLETED_BOOKINGS } from "./bookingType";

// SAVE BOOKINGS
export const saveBookings = (bookings) => {
  return {
    type: SAVE_BOOKINGS,
    bookings,
  };
};

// FILTER BOOKINGS BY PENDING
export const filterByPending = () => {
  return {
    type: RETURN_PENDING_BOOKINGS,
  };
};

// FILTER BOOKINGS BY CANCELATION
export const filterByCompleted = () => {
  return {
    type: RETURN_COMPLETED_BOOKINGS,
  };
}