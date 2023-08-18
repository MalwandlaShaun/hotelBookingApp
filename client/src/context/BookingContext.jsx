import { useContext, useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const BookingContexts = createContext();

export const BookingContext = ({ children }) => {
  const [booking, setBooking] = useState({
    adult: "2adult",
    arrival: "",
    child: "0child",
    city: "Joburg",
    departure: "",
    room: "1room",
  });

  return (
    <BookingContexts.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContexts.Provider>
  );
};

BookingContext.propTypes = {
  children: PropTypes.node, // or PropTypes.element
  otherProps: PropTypes.any,
  // Define other propTypes as needed
};

export const useBookingContext = () => useContext(BookingContexts);
