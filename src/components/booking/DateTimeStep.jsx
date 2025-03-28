// components/steps/DateTimeStep.jsx
import { useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
];

export default function DateTimeStep() {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingData.services.length) navigate("/booking/services");
  }, []);

  const renderCalendarHeader = () => (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
        <div
          key={day}
          className="text-center text-sm text-gray-500 font-medium uppercase"
        >
          {day}
        </div>
      ))}
    </div>
  );

  // Fixed dayRenderer with default modifiers
  const dayRenderer = (date, modifiers = {}) => (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full
      ${modifiers.selected ? "bg-blue-600 text-white" : ""}
      ${modifiers.outside ? "text-gray-400" : "hover:bg-blue-50"}`}
    >
      {date.getDate()}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Select Date And Time</h1>

      <div className="mb-8">
        <DatePicker
          value={bookingData.date}
          onChange={(date) => updateBookingData({ date })}
          minDate={new Date()}
          renderDay={dayRenderer}
          hideOutsideDates
          getDayProps={(date) => ({
            selected: date.toDateString() === bookingData.date?.toDateString(),
          })}
          styles={{
            day: {
              padding: "20px",
              fontSize: "24px",
              border: "2px solid transparent",
              "&[data-selected]": {
                backgroundColor: "#2563eb",
                color: "white",
              },
            },
            calendarHeaderLevel: {
              fontSize: "15px",
              fontWeight: "bold",
            },
            month: {
              width: "360px",
            },
            weekday: {
              color: "black",
              fontWeight: "500",
              textTransform: "uppercase",
            },
          }}
          headerComponent={renderCalendarHeader}
        />
      </div>

      <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
      <div className="grid grid-cols-4 gap-3">
        {timeSlots.map((time) => (
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
