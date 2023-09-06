import { createSlice } from "@reduxjs/toolkit";

const roomsData = [
  {
    _id: "63126e3a8e84d4338e2bbae2",
    hotelId: "631263598e84d4338e2bb9c5",
    title: "Deluxe Room",
    maxPeople: 3,
    price: 400,
    photo:
      "https://res.cloudinary.com/dzghsspe7/image/upload/v1662152190/booking/nmmn08sj5xnvcnvhanpp.png",
    photos: [
      "https://res.cloudinary.com/dzghsspe7/image/upload/v1662152212/booking/cmqnj5o3oaxglcdunld3.jpg",
      "https://res.cloudinary.com/dzghsspe7/image/upload/v1662152216/booking/tdc3qdkwghaqpy4z50qs.jpg",
      // ... other photos
    ],
    __v: 0,
  },
  // ... other rooms
];

const initialRoom = {
  _id: "",
  hotelId: "",
  title: "",
  maxPeople: 0,
  price: 0,
  photo: "",
  photos: [],
  __v: 0,
};

const initialState = {
  rooms: roomsData.map((room) => ({ ...initialRoom, ...room })),
  // Add other initial variables if needed
  selectedRoomId: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
});

// Add your custom selectors if needed

export default roomsSlice.reducer;
