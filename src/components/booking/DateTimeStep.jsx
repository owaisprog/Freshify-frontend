import { useState, useEffect } from "react";
import { useBookingContext } from "./BookingContext";
import CalendarComp from "../CustomerCalendar";
import { format } from "date-fns";
import { useQueryHook } from "../../services/reactQuery";
import generateTimeSlots from "./TimeSlotsGenerator";
import { Button, Loader } from "@mantine/core";
import { apiGet } from "../../services/useApi";

export default function DateTimeStep() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isGeneratingSlots, setIsGeneratingSlots] = useState(false);
  const { bookingData, updateBookingData } = useBookingContext();

  const formattedUTC = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : null;

  const {
    data: unavailableSlots = { bookedSlots: [], unavailablePeriods: [] },
    isLoading: isLoadingSlots,
    isFetching,
    refetch,
  } = useQueryHook({
    queryKey: ["unavailable", formattedUTC],
    endpoint: formattedUTC
      ? `/api/unavailable-slots/${bookingData?.professional?._id}/${formattedUTC}`
      : null,
    enabled: !!formattedUTC,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  useEffect(() => {
    if (selectedDate && !isFetching) {
      generateAvailableSlots();
    }
  }, [unavailableSlots, selectedDate, isFetching]);

  const generateAvailableSlots = async () => {
    if (!selectedDate) return;

    setIsGeneratingSlots(true);
    try {
      const DateOBJ = new Date(selectedDate);
      const dayName = format(DateOBJ, "EEEE").toLowerCase();

      const filterData = bookingData?.location?.workingHours?.find(
        (val) => val.day.toLowerCase() === dayName
      );

      if (!filterData) return;

      const safeBlockedSlots = [
        ...(unavailableSlots.bookedSlots ?? []),
        ...(unavailableSlots.unavailablePeriods ?? []),
      ]
        .map((val) => {
          if (!val?.startTime || !val?.endTime) return null;
          return `${val.startTime}-${val.endTime}`;
        })
        .filter(Boolean);

      const slots = generateTimeSlots({
        openingTime: filterData.start,
        closingTime: filterData.end,
        serviceDuration: bookingData.services.reduce(
          (total, service) => total + service.duration,
          0
        ),
        blockedSlots: safeBlockedSlots,
        date: DateOBJ,
      });

      setTimeSlots(slots);
    } catch (error) {
      console.error("Error generating slots:", error);
    } finally {
      setIsGeneratingSlots(false);
    }
  };

  const OnClickDay = (date) => {
    const DateOBJ = new Date(date);
    setSelectedDate(DateOBJ);
    setSelectedDay(DateOBJ.toDateString());
    updateBookingData({ date: DateOBJ, time: null });
    refetch(); // Trigger a fresh data fetch
  };

  const handleMonthChange = () => {
    setTimeSlots([]);
    setSelectedDay("");
    setSelectedDate(null);
  };

  const handleConnectGoogle = async () => {
    try {
      const { url } = await apiGet(`/api/auth/google`);
      window.location.href = url;
    } catch (err) {
      console.error("Error connecting to Google:", err);
    }
  };

  return (
    <div className=" px-3 lg:px-0">
      <h1 className="text-[28px] lg-text-[32px] font-[500] text-center lg:text-left">
        Select Date And Time
      </h1>

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
      {isLoadingSlots || isGeneratingSlots ? (
        <div className="flex justify-center items-center h-20">
          <Loader size="sm" />
          <span className="ml-2">Loading available slots...</span>
        </div>
      ) : timeSlots.length > 0 ? (
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
      ) : (
        <div className="text-center py-4 text-gray-500">
          {selectedDate
            ? "No available slots for this date"
            : "Select a date to see available slots"}
        </div>
      )}
    </div>
  );
}
