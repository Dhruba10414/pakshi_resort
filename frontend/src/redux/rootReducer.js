import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import foodReducer from './foods/foodReducer';
import bookingReducer from "./bookings/bookingReducer";

const rootReducer = combineReducers({
    user: userReducer,
    food: foodReducer,
    bookings: bookingReducer,
})

export default rootReducer;