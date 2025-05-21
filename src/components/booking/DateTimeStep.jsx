import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useBookingContext } from "./BookingContext";
import CalendarComp from "../CustomerCalendar";
import {
  format,
  differenceInDays,
  startOfDay,
  isSameMonth,
  addMonths,
} from "date-fns";
import { useQueryHook } from "../../services/reactQuery";
import generateTimeSlots from "./TimeSlotsGenerator";
import { Button, Loader } from "@mantine/core";
import { handleConnectGoogle } from "../../Hooks/GoogleCalendar";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formatMidnightHours = (time24) => {
  if (!time24) return "";
  if (time24 === "00:00") return "12:00";
  if (time24 === "00:30") return "12:30";
  return time24;
};

export default function DateTimeStep({ numberOfMonths = 1 }) {
  const data = JSON.parse(localStorage.getItem("data"));
  const token = localStorage.getItem("token");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const { bookingData, updateBookingData } = useBookingContext();
  const initialized = useRef(false);

  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months/${bookingData.organizationId}`,
    staleTime: 10 * 60 * 1000,
    enabled: () => {
      return bookingData.organizationId ? true : false;
    },
  });

  const totalWeeks = Math.ceil(numberOfMonths * 4.345);

  const calculateWeekNumber = useCallback(
    (date) => {
      const startDate = startOfDay(new Date(2025, 4, 1)); // May 1, 2025
      const selected = startOfDay(date);
      const firstMonth = new Date(2025, 4, 1); // May 2025
      const secondMonth = addMonths(firstMonth, 1); // June 2025
      const daysSinceStart = differenceInDays(selected, startDate);

      if (isSameMonth(selected, firstMonth)) {
        // First month (May 2025): Weeks 1–5
        const weekNumber = Math.floor(daysSinceStart / 7) + 1;
        return Math.min(Math.max(weekNumber, 1), totalWeeks);
      } else if (isSameMonth(selected, secondMonth)) {
        // Second month (June 2025): Start with Week 6
        const daysInSecondMonth = differenceInDays(
          selected,
          startOfDay(secondMonth)
        );
        return totalWeeks + Math.floor(daysInSecondMonth / 7) + 1;
      } else {
        // Third month (July 2025) or beyond
        const monthsSinceFirst = Math.floor(
          differenceInDays(selected, firstMonth) / 30
        );
        const daysInCurrentMonth = differenceInDays(
          selected,
          startOfDay(addMonths(firstMonth, monthsSinceFirst))
        );
        return (
          totalWeeks +
          (monthsSinceFirst - 1) * 4 +
          Math.floor(daysInCurrentMonth / 7) +
          1
        );
      }
    },
    [totalWeeks]
  );

  const formattedUTC = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : null;

  const {
    data: unavailableSlots,
    isLoading: isLoadingSlots,
    refetch,
  } = useQueryHook({
    queryKey: ["unavailable", formattedUTC],
    endpoint: `/api/unavailable-slots/${bookingData?.professional?._id}/${formattedUTC}`,
    enabled: !!formattedUTC,
    staleTime: 5 * 60 * 1000,
  });

  const { bookedSlots, unavailablePeriods } = useMemo(() => {
    return {
      bookedSlots: unavailableSlots?.bookedSlots || [],
      unavailablePeriods: unavailableSlots?.unavailablePeriods || [],
    };
  }, [unavailableSlots]);

  const generateAvailableSlots = useCallback(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    try {
      const DateOBJ = new Date(selectedDate);
      const dayName = format(DateOBJ, "EEEE").toLowerCase();
      const weekNumber = calculateWeekNumber(DateOBJ);

      // Only generate slots for weeks 1–5 (first month)
      if (weekNumber > totalWeeks) {
        setTimeSlots([]);
        return;
      }

      const filterData = bookingData?.location?.workingHours?.find(
        (val) => val.day.toLowerCase() === dayName && val.week === weekNumber
      );

      if (!filterData || filterData.closed) {
        setTimeSlots([]);
        return;
      }

      const safeBlockedSlots = [
        ...(bookedSlots ?? []),
        ...(unavailablePeriods ?? []),
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
      setTimeSlots([]);
    }
  }, [
    selectedDate,
    bookingData?.location?.workingHours,
    bookingData?.services,
    bookedSlots,
    unavailablePeriods,
    calculateWeekNumber,
    totalWeeks,
  ]);

  useEffect(() => {
    generateAvailableSlots();
  }, [generateAvailableSlots]);

  useEffect(() => {
    if (!initialized.current) {
      const currentDate = new Date();
      setSelectedDay(currentDate.toDateString());
      setSelectedDate(currentDate);
      updateBookingData({ date: currentDate });
      initialized.current = true;
    }
  }, [updateBookingData]);

  const OnClickDay = async (date) => {
    const DateOBJ = new Date(date);
    setSelectedDate(DateOBJ);
    setSelectedDay(DateOBJ.toDateString());
    updateBookingData({ date: DateOBJ, time: null });
    setIsFetching(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error fetching unavailable slots:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleMonthChange = () => {
    setTimeSlots([]);
    setSelectedDay("");
    setSelectedDate(null);
  };

  const isLoading = isLoadingSlots || isFetching;

  function handleAuth() {
    if (data?.role === "customer" && token) {
      updateBookingData({ proceedToPay: true });
    } else {
      navigate("/booking/BookingAuth");
    }
  }

  return (
    <div className="px-3 lg:px-0 h-full flex flex-col justify-center">
      <h1 className="text-[28px] lg:text-[32px] font-[500] text-center sm:text-left">
        Select Date And Time
      </h1>
      <div className="mb-8">
        <CalendarComp
          onClickDay={OnClickDay}
          selectedDay={selectedDay}
          monthsToShow={bookingTime?.bookingWindowMonths || numberOfMonths}
          setSelectedDay={setSelectedDay}
          handleMonthChange={handleMonthChange}
          workingHours={bookingData?.location?.workingHours}
          calculateWeekNumber={calculateWeekNumber}
          totalWeeks={totalWeeks}
          firstMonthStart={new Date(2025, 4, 1)} // May 1, 2025
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
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader type="bars" />
        </div>
      ) : timeSlots.length > 0 ? (
        <div className="max-w-[458px] grid grid-cols-3 pb-[100px] lg:pb-0 md:grid-cols-4 lg:grid-cols-4 gap-[10px]">
          {timeSlots.map((time) => {
            const displayTime = formatMidnightHours(time);
            return (
              <button
                key={time}
                onClick={() => updateBookingData({ time })}
                className={`!py-[5px] !px-[25px] border rounded-full text-center !text-[22px] !font-bold transition-colors ${
                  bookingData.time === time
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white duration-300 cursor-pointer"
                }`}
              >
                {displayTime}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="max-w-[458px] text-center py-4 text-gray-500">
          {selectedDate
            ? "No available slots for this date"
            : "Select a date to see available slots"}
        </div>
      )}
      {bookingData?.time && selectedDate && !bookingData.proceedToPay && (
        <div className="flex pb-[100px] lg:pb-0 justify-end mt-6">
          <Button
            onClick={() => handleAuth()}
            loaderProps={{ type: "bars" }}
            bg="black"
            radius="md"
            rightSection={<FaArrowRight />}
            className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
          >
            Book Appointment
          </Button>
        </div>
      )}
    </div>
  );
}
