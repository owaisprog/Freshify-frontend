import { useState, useMemo, useEffect } from "react";

// Enhanced Safari-compatible date utilities
const formatDate = (date, pattern) => {
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
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Safari-safe date calculations
const startOfMonth = (date) => {
  // Safari requires valid date objects
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
};

const endOfMonth = (date) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
};

const addMonths = (date, months) => {
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
  // Initialize with UTC dates for Safari compatibility
  const [internalState, setInternalState] = useState(() => {
    const currentDate = new Date();
    const initialMonth =
      monthToShow !== null
        ? new Date(Date.UTC(currentDate.getFullYear(), monthToShow - 1, 1))
        : startOfMonth(initialDate);

    const initialYear =
      yearToShow !== null
        ? new Date(Date.UTC(yearToShow, (monthToShow || 1) - 1, 1))
        : initialMonth;

    return {
      selectedDate: initialDate,
      currentMonth: startOfMonth(initialYear),
      nextMonth: addMonths(startOfMonth(initialYear), 1),
      today: currentDate,
      monthsToShow,
    };
  });

  // Sync with parent's monthToShow/yearToShow changes
  useEffect(() => {
    if (monthToShow !== null || yearToShow !== null) {
      const newDate = new Date(
        Date.UTC(
          yearToShow || internalState.currentMonth.getUTCFullYear(),
          monthToShow !== null
            ? monthToShow - 1
            : internalState.currentMonth.getUTCMonth(),
          1
        )
      );

      setInternalState((prev) => ({
        ...prev,
        currentMonth: startOfMonth(newDate),
        nextMonth: addMonths(startOfMonth(newDate), 1),
      }));
    }
  }, [monthToShow, yearToShow]);

  // Generate dates with Safari-safe UTC methods
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(internalState.currentMonth);
    const end = endOfMonth(internalState.currentMonth);

    const dates = [];
    const year = start.getUTCFullYear();
    const month = start.getUTCMonth();
    const daysInMonth = end.getUTCDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(Date.UTC(year, month, day)));
    }

    return dates;
  }, [internalState.currentMonth]);

  // Handle date click with Safari-safe dates
  const handleDateClick = (date) => {
    // Create new date in local timezone from UTC values
    const localDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );

    const updatedState = {
      ...internalState,
      selectedDate: localDate,
      selectedMonth: localDate.getMonth() + 1,
      selectedYear: localDate.getFullYear(),
      selectedDay: localDate.getDate(),
      selectedDateString: formatDate(localDate, "MMMM dd, yyyy"),
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
            className="flex py-2 px-4"
            style={{
              width: "max-content",
              minWidth: "100%",
            }}
          >
            {datesToDisplay.map((date, index) => {
              const isSelected =
                internalState.selectedDate &&
                isSameDay(internalState.selectedDate, date);
              const isTodayDate = isSameDay(date, new Date());

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
