// src/context/BookingContext.jsx (correct extension)
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    location: null,
    professional: null,
    services: [],
    date: null,
    time: null,
  });

  const updateBookingData = (newData) => {
    setBookingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}
