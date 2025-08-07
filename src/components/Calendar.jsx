import { useState, useMemo, useEffect } from "react";

// Safari-compatible date utilities
const formatDate = (date, pattern) => {
  if (!date || isNaN(date.getTime())) return "";

  const day = date.getDate();
  if (pattern === "d") return day.toString();
  if (pattern === "MMMM dd, yyyy") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${day}, ${date.getFullYear()}`;
  }
  return day.toString();
};

// Safari-safe date comparison
const isSameDay = (date1, date2) => {
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime()))
    return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Safari-safe date calculations
const startOfMonth = (date) => {
  if (!date || isNaN(date.getTime())) return new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
};

const endOfMonth = (date) => {
  if (!date || isNaN(date.getTime())) return new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
};

const addMonths = (date, months) => {
  if (!date || isNaN(date.getTime())) return new Date();
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
};

// Main Calendar component
const Calendar = ({
  setCalendarState = () => {},
  initialDate = new Date(),
  monthsToShow = 1,
  monthToShow = null,
  yearToShow = null,
  calendarState,
}) => {
  // Validate initial date
  const safeInitialDate =
    initialDate && !isNaN(initialDate.getTime()) ? initialDate : new Date();

  // Initialize with UTC dates for Safari compatibility
  const [internalState, setInternalState] = useState(() => {
    const currentDateUTC = new Date(
      Date.UTC(
        safeInitialDate.getFullYear(),
        safeInitialDate.getMonth(),
        safeInitialDate.getDate()
      )
    );

    // Safely handle monthToShow and yearToShow
    const initialMonth =
      monthToShow !== null
        ? new Date(
            Date.UTC(
              yearToShow || currentDateUTC.getFullYear(),
              Math.max(0, Math.min(11, monthToShow - 1)),
              1
            )
          )
        : startOfMonth(currentDateUTC);

    return {
      selectedDate: currentDateUTC,
      currentMonth: startOfMonth(initialMonth),
      nextMonth: addMonths(startOfMonth(initialMonth), 1),
      today: currentDateUTC,
      monthsToShow,
    };
  });

  // Sync with parent's monthToShow/yearToShow changes
  useEffect(() => {
    if (monthToShow !== null || yearToShow !== null) {
      const newDate = new Date(
        Date.UTC(
          yearToShow || internalState.currentMonth.getFullYear(),
          monthToShow !== null
            ? Math.max(0, Math.min(11, monthToShow - 1))
            : internalState.currentMonth.getMonth(),
          1
        )
      );

      if (!isNaN(newDate.getTime())) {
        setInternalState((prev) => ({
          ...prev,
          currentMonth: startOfMonth(newDate),
          nextMonth: addMonths(startOfMonth(newDate), 1),
        }));
      }
    }
  }, [monthToShow, yearToShow]);

  // Generate dates with Safari-safe UTC methods
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(internalState.currentMonth);
    const end = endOfMonth(internalState.currentMonth);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date range in datesToDisplay");
      return [];
    }

    const dates = [];
    const year = start.getUTCFullYear();
    const month = start.getUTCMonth();
    const daysInMonth = end.getUTCDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(year, month, day));
      if (!isNaN(date.getTime())) {
        dates.push(date);
      }
    }

    return dates;
  }, [internalState.currentMonth]);

  // Handle date click with Safari-safe dates
  const handleDateClick = (date) => {
    if (!date || isNaN(date.getTime())) return;

    const updatedState = {
      ...internalState,
      selectedDate: new Date(date), // Create new date object
      selectedMonth: date.getUTCMonth() + 1,
      selectedYear: date.getUTCFullYear(),
      selectedDay: date.getUTCDate(),
      selectedDateString: formatDate(date, "MMMM dd, yyyy"),
    };

    setInternalState(updatedState);
    setCalendarState(updatedState);
  };

  return (
    <div
      className="flex px-2 justify-center items-center w-full"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
      }}
    >
      <div className="w-full">
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="safari-scroll-fix"
        >
          <style>{`
            .safari-scroll-fix::-webkit-scrollbar {
              display: none;
            }
            .calendar-day {
              min-width: 48px !important;
              width: 48px !important;
              height: 48px !important;
              flex-shrink: 0 !important;
            }
          `}</style>

          <div
            className="flex items-center gap-2 py-2 px-4"
            style={{
              width: "max-content",
              minWidth: "100%",
            }}
          >
            {datesToDisplay.map((date, index) => {
              const isSelected = isSameDay(internalState.selectedDate, date);
              const isTodayDate = isSameDay(date, internalState.today);

              return (
                <button
                  key={`date-${date.getTime()}-${index}`}
                  onClick={() => handleDateClick(date)}
                  className={`calendar-day flex items-center hover:cursor-pointer hover:bg-black duration-300 hover:text-white justify-center rounded-full transition-all !font-bold ${
                    isSelected
                      ? "border border-black text-black"
                      : isTodayDate
                        ? "bg-[#F5F7FA] text-black"
                        : "bg-[#F5F7FA] text-black"
                  }`}
                >
                  {date.getUTCDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
