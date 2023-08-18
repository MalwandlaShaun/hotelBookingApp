// store.js
import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./features/hotelSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    // Other reducers...
  },
});

export default store;
