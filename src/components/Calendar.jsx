import { useState, useMemo, useEffect } from "react";

// Utility functions to replace date-fns
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

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const getMonth = (date) => date.getMonth();

const getYear = (date) => date.getFullYear();

const setMonth = (date, month) => {
  const result = new Date(date);
  result.setMonth(month);
  return result;
};

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const Calendar = ({
  setCalendarState = () => {},
  initialDate = new Date(),
  monthsToShow = 1,
  monthToShow = null,
  yearToShow = null,
  calendarState,
}) => {
  const [internalState, setInternalState] = useState(() => {
    const currentDate = new Date();
    const initialMonth =
      monthToShow !== null
        ? setMonth(new Date(), monthToShow - 1)
        : startOfMonth(initialDate);

    const initialYear =
      yearToShow !== null
        ? new Date(yearToShow, (monthToShow || 1) - 1, 1)
        : initialMonth;

    return {
      selectedDate: initialDate,
      currentMonth: startOfMonth(initialYear),
      nextMonth: addMonths(startOfMonth(initialYear), 1),
      today: currentDate,
      monthsToShow,
    };
  });

  // Sync with parent's monthToShow or yearToShow changes
  useEffect(() => {
    if (monthToShow !== null || yearToShow !== null) {
      const newDate = new Date(
        yearToShow || getYear(internalState.currentMonth),
        monthToShow !== null
          ? monthToShow - 1
          : getMonth(internalState.currentMonth),
        1
      );

      setInternalState((prev) => ({
        ...prev,
        currentMonth: startOfMonth(newDate),
        nextMonth: addMonths(startOfMonth(newDate), 1),
      }));
    }
  }, [monthToShow, yearToShow]);

  // Sync with parent's calendarState
  useEffect(() => {
    if (calendarState?.selectedDate) {
      setInternalState((prev) => ({
        ...prev,
        selectedDate: new Date(calendarState.selectedDate),
      }));
    } else {
      setInternalState((prev) => ({
        ...prev,
        selectedDate: null,
      }));
    }
  }, [calendarState?.selectedDate]);

  // Generate dates for the current month - SAFARI OPTIMIZED
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(internalState.currentMonth);
    const end = endOfMonth(internalState.currentMonth);

    const dates = [];

    // More reliable date generation for Safari
    const year = start.getFullYear();
    const month = start.getMonth();
    const daysInMonth = end.getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }

    return dates;
  }, [internalState.currentMonth]);

  // Handle date click
  const handleDateClick = (date) => {
    const updatedState = {
      ...internalState,
      selectedDate: date,
      selectedMonth: getMonth(date) + 1,
      selectedYear: getYear(date),
      selectedDay: date.getDate(),
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
        >
          <style>{`
            .calendar-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div
            className="calendar-scroll flex gap-2 py-2 px-4"
            style={{
              minWidth: "max-content",
              width: "fit-content",
            }}
          >
            {datesToDisplay.map((date, index) => {
              const isSelected =
                internalState.selectedDate &&
                isSameDay(internalState.selectedDate, date);
              const isTodayDate = isToday(date);

              return (
                <button
                  key={`date-${date.getTime()}-${index}`}
                  onClick={() => handleDateClick(date)}
                  className={`min-w-12  h-12 flex items-center hover:cursor-pointer  hover:bg-black duration-300 hover:text-white justify-center rounded-full transition-all !font-bold ${
                    isSelected
                      ? " border border-black text-black"
                      : isTodayDate
                        ? " bg-[#F5F7FA] text-black"
                        : "bg-[#F5F7FA]  text-black"
                  }`}
                >
                  {formatDate(date, "d")}
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
