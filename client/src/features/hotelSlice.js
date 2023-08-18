// hotelsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotel: (state, action) => {
      state.hotels = action.payload;
    },
  },
});

export const { setHotel } = hotelsSlice.actions;

export default hotelsSlice.reducer;
