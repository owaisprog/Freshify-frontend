// src/context/BookingContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    location: null,
    professional: null,
    services: [],
    date: null,
    time: null,
    proceedToPay: true,
  });

  // Get data from localStorage when component mounts
  useEffect(() => {
    const savedBookingData = localStorage.getItem("bookingData");
    if (savedBookingData) {
      setBookingData(JSON.parse(savedBookingData));
    }
  }, []);

  // Save bookingData to localStorage whenever it changes
  useEffect(() => {
    if (bookingData) {
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }
  }, [bookingData]);

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
