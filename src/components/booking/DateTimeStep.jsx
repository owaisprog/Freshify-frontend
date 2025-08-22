import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useBookingContext } from "./BookingContext";
import CalendarComp from "../CustomerCalendar";
import {
  format,
  differenceInDays,
  startOfDay,
  addMonths,
  startOfMonth,
  getDaysInMonth,
} from "date-fns";
import { useQueryHook } from "../../services/reactQuery";
import generateTimeSlots from "./TimeSlotsGenerator";
import { Button, Loader, MantineProvider } from "@mantine/core";
import { handleConnectGoogle } from "../../Hooks/GoogleCalendar";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";

const formatMidnightHours = (time24) => {
  if (!time24) return "";
  if (time24 === "00:00") return "12:00";
  if (time24 === "00:30") return "12:30";
  return time24;
};

export default function DateTimeStep() {
  const data = JSON.parse(localStorage.getItem("data"));
  const token = localStorage.getItem("token");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const { bookingData, updateBookingData } = useBookingContext();
  const initialized = useRef(false);

  const toastId = "signup-needed"; // ❶ single fixed id

  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months/${bookingData.organizationId}`,
    staleTime: 10 * 60 * 1000,
    enabled: () => {
      return bookingData.organizationId ? true : false;
    },
  });

  // FIXED: Smart total weeks calculation (same as Locations component)
  const calculateTotalWeeks = useCallback(() => {
    if (!bookingTime?.bookingWindowMonths) return 0;

    let totalWeeks = 0;
    for (
      let monthIndex = 0;
      monthIndex < bookingTime.bookingWindowMonths;
      monthIndex++
    ) {
      const currentMonth = addMonths(new Date(), monthIndex);
      const daysInMonth = getDaysInMonth(currentMonth);
      const weeksInMonth = daysInMonth <= 28 ? 4 : 5;
      totalWeeks += weeksInMonth;
    }
    return totalWeeks;
  }, [bookingTime?.bookingWindowMonths]);

  const totalWeeks = calculateTotalWeeks();

  // FIXED: Smart week number calculation
  const calculateWeekNumber = useCallback((date) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const selected = startOfDay(date);

    // Find which month the selected date belongs to
    let monthOffset = 0;
    let monthStart = startOfMonth(new Date(currentYear, currentMonth, 1));

    while (selected < monthStart) {
      monthOffset--;
      monthStart = startOfMonth(addMonths(monthStart, -1));
    }
    while (selected >= startOfMonth(addMonths(monthStart, 1))) {
      monthOffset++;
      monthStart = startOfMonth(addMonths(monthStart, 1));
    }

    const yearOffset = Math.floor((currentMonth + monthOffset) / 12);
    const monthIndex = (currentMonth + monthOffset) % 12;
    monthStart = startOfMonth(
      new Date(currentYear + yearOffset, monthIndex, 1)
    );

    // Calculate days since the start of the month
    const daysSinceMonthStart = differenceInDays(selected, monthStart);
    let weekNumber = Math.floor(daysSinceMonthStart / 7) + 1;

    // Adjust for 5th week (days 29–end)
    if (weekNumber > 4) {
      weekNumber = 5;
    }

    // FIXED: Calculate the first week of this month using smart logic
    let firstWeekOfMonth = 1;
    for (let m = 0; m < Math.abs(monthOffset); m++) {
      const targetMonth =
        monthOffset > 0
          ? addMonths(new Date(currentYear, currentMonth, 1), m)
          : addMonths(new Date(currentYear, currentMonth, 1), -(m + 1));

      const daysInTargetMonth = getDaysInMonth(targetMonth);
      const weeksInTargetMonth = daysInTargetMonth <= 28 ? 4 : 5;

      if (monthOffset > 0) {
        firstWeekOfMonth += weeksInTargetMonth;
      } else {
        firstWeekOfMonth -= weeksInTargetMonth;
      }
    }

    return firstWeekOfMonth + weekNumber - 1;
  }, []);

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
          monthsToShow={bookingTime?.bookingWindowMonths}
          setSelectedDay={setSelectedDay}
          handleMonthChange={handleMonthChange}
          workingHours={bookingData?.location?.workingHours}
          calculateWeekNumber={calculateWeekNumber}
          totalWeeks={totalWeeks} // FIXED: Now uses smart calculation
          firstMonthStart={new Date()}
        />
        <div className="flex gap-2 sm:flex-row flex-col items-start">
          <Button
            bg={"black"}
            radius={"md"}
            className="!w-[10.5rem]"
            onClick={() => {
              console.log(token, data?.role, data?.role === "customer");
              if (token && data?.role === "customer") {
                handleConnectGoogle();
              } else {
                toast.info(
                  <MantineProvider>
                    {" "}
                    {/* local provider */}
                    <div className="flex flex-col gap-2">
                      <span>Please sign up for this feature</span>
                      <Button
                        radius="md"
                        color="dark"
                        onClick={() => {
                          navigate("/Login?role=customer");
                          toast.dismiss(); // close after redirect
                        }}
                      >
                        Signup
                      </Button>
                    </div>
                  </MantineProvider>,
                  {
                    toastId,
                    autoClose: false,
                    hideProgressBar: true,
                    position: "top-right",
                    icon: (
                      <span>
                        <FaCircleInfo color="black" size={24} />
                      </span>
                    ),
                  }
                );
              }
            }}
          >
            Connect with Google
          </Button>
        </div>
      </div>
      <h2 className="text-[28px] lg:text-[32px] font-[500] text-center sm:text-left mb-4">
        Available Time Slots
      </h2>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader color="dark" type="bars" />
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
        <div className="flex pb-[100px] lg:pb-0 justify-start mt-8">
          <Button
            onClick={() => handleAuth()}
            loaderProps={{ type: "bars" }}
            bg="black"
            radius="md"
            rightSection={<FaArrowRight />}
            className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
