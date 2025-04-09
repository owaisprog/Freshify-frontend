// components/steps/DateTimeStep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import CalendarComp from "../CustomerCalendar";
import { format } from "date-fns";
import { useQueryHook } from "../../services/reactQuery";
import generateTimeSlots from "./TimeSlotsGenerator";
import { Button } from "@mantine/core";
import { apiGet } from "../../services/useApi";

export default function DateTimeStep() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();

  // Move the query to the top level and make it dependent on selectedDate
  const { data: unavailableSlots = [] } = useQueryHook({
    queryKey: ["unavailable", selectedDate],
    endpoint: selectedDate
      ? `/api/unavailable-slots/67f6086e1fd3d0813d264706/${selectedDate.toISOString()}`
      : null,
    enabled: !!selectedDate, // Only run query when selectedDate exists
    staleTime: 0 * 60 * 1000,
  });

  const OnClickDay = (date) => {
    const DateOBJ = new Date(date);
    const dayName = format(DateOBJ, "EEEE").toLowerCase();
    const filterData = bookingData?.location?.workingHours?.find(
      (val) => val.day.toLowerCase() === dayName
    );

    setSelectedDate(DateOBJ);
    setSelectedDay(date.toDateString());

    if (filterData) {
      const slots = generateTimeSlots({
        openingTime: filterData.start,
        closingTime: filterData.end,
        serviceDuration: bookingData.services[0].duration,
        blockedSlots: unavailableSlots,
      });
      updateBookingData({ date });
      setTimeSlots(slots);
    }
  };

  const handleMonthChange = () => {
    setTimeSlots([]); // Reset time slots
    setSelectedDay(""); // Reset selected day
    setSelectedDate(null); // Reset selected date
  };
  //google calendar

  const handleConnectGoogle = async () => {
    try {
      const { url } = await apiGet(`/api/auth/google`);
      // 2. Redirect the user to Google's OAuth screen
      window.location.href = url;
    } catch (err) {
      console.error("Error connecting to Google:", err);
    }
  };
  console.log(bookingData);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Select Date And Time</h1>

      <div className="mb-8">
        <CalendarComp
          onClickDay={OnClickDay}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          handleMonthChange={handleMonthChange}
        />
        <Button bg={"black"} className="flex " onClick={handleConnectGoogle}>
          Connect with google
        </Button>
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
    </div>
  );
}
