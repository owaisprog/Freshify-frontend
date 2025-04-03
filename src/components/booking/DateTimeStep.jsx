// components/steps/DateTimeStep.jsx
// import { useEffect } from "react";
// import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import CalendarComp from "../CustomerCalendar";
import { useState } from "react";
import generateTimeSlots from "./TimeSlotsGenerator";

// const timeSlots = [
//   "09:00",
//   "09:30",
//   "10:00",
//   "10:30",
//   "11:00",
//   "11:30",
//   "12:00",
//   "12:30",
// ];
// generateTimeSlots({
//   openingTime: "09:00",
//   closingTime: "18:00",
//   slotInterval: 30, // optional (default: 30)
//   serviceDuration: 60, // 60 minutes service
//   blockedSlots: ["11:00-12:00", "14:30-15:30"], // Lunch break and another appointment
// });

export default function DateTimeStep() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();

  const onClickDay = (date) => {
    setSelectedDay(date.toDateString());
    //api date non-aviable
    const slots = generateTimeSlots({
      openingTime: "08:00",
      closingTime: "20:00",
      serviceDuration: 60,
      blockedSlots: ["12:00-13:00", "15:00-16:30"], // Lunch break and meeting
    });

    // Automatically excludes blocked times
    setTimeSlots(slots);
    console.log("Selected Date:", selectedDay);
  };
  console.log(bookingData);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Select Date And Time</h1>

      <div className="mb-8">
        <CalendarComp
          onClickDay={onClickDay}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>

      <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
      <div className="grid grid-cols-4 gap-3">
        {timeSlots &&
          timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => updateBookingData({ time })}
              className={`p-2 border rounded-lg text-center text-sm transition-colors
              ${
                bookingData.time === time
                  ? "bg-blue-600 text-white border-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              {time}
            </button>
          ))}
      </div>

      {bookingData.date && bookingData.time && (
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/booking/services")}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
