// store.js
import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./features/hotelSlice";
import bookingReducer from "./features/bookingSlice";
import roomsReducer from "./features/roomsSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    booking: bookingReducer,
    rooms: roomsReducer,
  },
});

export default store;
