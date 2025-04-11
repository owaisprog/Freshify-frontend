// components/steps/DateTimeStep.jsx

import { useState } from "react";
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
  // const navigate = useNavigate();

  // Only compute the formattedUTC if selectedDate is valid
  const formattedUTC = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : null;

  // Use the formatted date in our query
  const { data: unavailableSlots = [] } = useQueryHook({
    queryKey: ["unavailable", formattedUTC],
    endpoint: formattedUTC
      ? `/api/unavailable-slots/${bookingData?.professional?._id}/${formattedUTC}`
      : null,
    enabled: !!formattedUTC, // query runs only if formattedUTC has a valid value
    staleTime: 0,
  });
  console.log(unavailableSlots);

  // When a day is clicked in CalendarComp
  const OnClickDay = (date) => {
    const DateOBJ = new Date(date);
    const dayName = format(DateOBJ, "EEEE").toLowerCase();

    const filterData = bookingData?.location?.workingHours?.find(
      (val) => val.day.toLowerCase() === dayName
    );

    setSelectedDate(DateOBJ);
    setSelectedDay(DateOBJ.toDateString());

    // Clear the previously selected time
    updateBookingData({ date: DateOBJ, time: null });

    if (filterData) {
      // Ensure blockedSlots is always an array
      const safeBlockedSlots = Array.isArray(unavailableSlots)
        ? unavailableSlots
        : [];
      const slots = generateTimeSlots({
        openingTime: filterData.start,
        closingTime: filterData.end,
        serviceDuration: bookingData.services[0].duration,
        blockedSlots: safeBlockedSlots,
        date: DateOBJ,
      });
      setTimeSlots(slots);
    }
  };

  // Reset date/time slots when the month changes
  const handleMonthChange = () => {
    setTimeSlots([]);
    setSelectedDay("");
    setSelectedDate(null);
  };

  // Connect to Google (example)
  const handleConnectGoogle = async () => {
    try {
      const { url } = await apiGet(`/api/auth/google`);
      window.location.href = url;
    } catch (err) {
      console.error("Error connecting to Google:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Select Date And Time</h1>

      <div className="mb-8">
        <CalendarComp
          onClickDay={OnClickDay}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          handleMonthChange={handleMonthChange}
          workingHours={bookingData?.location?.workingHours}
        />
        <Button bg={"black"} className="flex" onClick={handleConnectGoogle}>
          Connect with Google
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
      <div className="grid grid-cols-4 gap-3">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => updateBookingData({ time })}
            className={`p-2 border rounded-lg text-center text-sm transition-colors ${
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
