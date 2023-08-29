// store.js
import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./features/hotelSlice";
import bookingReducer from "./features/bookingSlice";


const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    booking: bookingReducer,
  },
});

export default store;
