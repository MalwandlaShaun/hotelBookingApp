import { createSlice } from "@reduxjs/toolkit";

const initialBookingState = {
  adult: "2adult",
  arrival: "",
  child: "0child",
  city: "Joburg",
  departure: "",
  room: "1room",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setAdult: (state, action) => {
      state.adult = action.payload;
    },
    setArrival: (state, action) => {
      state.arrival = action.payload;
    },
    setChild: (state, action) => {
      state.child = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const {
  setAdult,
  setArrival,
  setChild,
  setCity,
  setDeparture,
  setRoom,
} = bookingSlice.actions;

export default bookingSlice.reducer;
