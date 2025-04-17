import { useState, useEffect, useCallback } from "react";
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
  // const [isGeneratingSlots, setIsGeneratingSlots] = useState(false);
  const { bookingData, updateBookingData } = useBookingContext();

  const formattedUTC = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : null;

  const {
    data: unavailableSlots = { bookedSlots: [], unavailablePeriods: [] },
    // isLoading: isLoadingSlots,
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

  const generateAvailableSlots = useCallback(async () => {
    if (!selectedDate) return;

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
    }
  }, [
    selectedDate,
    bookingData?.location?.workingHours,
    bookingData?.services,
    unavailableSlots.bookedSlots,
    unavailableSlots.unavailablePeriods,
  ]);

  useEffect(() => {
    if (selectedDate && !isFetching) {
      generateAvailableSlots();
    }
  }, [unavailableSlots, generateAvailableSlots, selectedDate, isFetching]);

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
    <div className="px-3 lg:px-0 h-full flex flex-col justify-center">
      <h1 className="text-[28px] lg:text-[32px] font-[500]  text-center sm:text-left">
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
        <Button
          bg={"black"}
          radius={"md"}
          className="flex"
          onClick={handleConnectGoogle}
        >
          Connect with Google
        </Button>
      </div>
      <h2 className="text-[28px] lg:text-[32px] font-[500] text-center sm:text-left mb-4">
        Available Time Slots
      </h2>
      {timeSlots.length > 0 ? (
        <div className="max-w-[458px] grid grid-cols-3 pb-[100px] lg:pb-0  md:grid-cols-4 lg:grid-cols-4 gap-[10px]">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => updateBookingData({ time })}
              className={`!py-[5px] !px-[25px]  border rounded-full text-center !text-[22px] !font-bold transition-colors ${
                bookingData.time === time
                  ? "bg-black text-white "
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
