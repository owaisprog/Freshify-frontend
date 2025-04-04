import { useState, useMemo, useEffect } from "react";
import {
  format,
  isBefore,
  isToday,
  startOfMonth,
  endOfMonth,
  addMonths,
  getMonth,
  getYear,
  setMonth,
  // getYear,
} from "date-fns";
import { ScrollArea } from "@mantine/core";

const Calendar = ({
  calendarState,
  setCalendarState,
  initialDate = new Date(),
  monthsToShow = 1, // Changed to show one month at a time
  monthToShow = null, // New prop: month number (1-12)
  yearToShow = null, // New prop: year number
}) => {
  // Initialize internal state
  const [internalState, setInternalState] = useState(() => {
    // Calculate initial month based on props
    const currentDate = new Date();
    const initialMonth =
      monthToShow !== null
        ? setMonth(new Date(), monthToShow - 1)
        : startOfMonth(initialDate);

    const initialYear =
      yearToShow !== null
        ? new Date(yearToShow, monthToShow - 1, 1)
        : initialMonth;

    return {
      selectedDate: null,
      currentMonth: startOfMonth(initialYear),
      nextMonth: addMonths(startOfMonth(initialYear), 1),
      today: currentDate,
      monthsToShow,
    };
  });

  // Update month when prop changes
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

  // Use either external state or internal state
  const state = calendarState || internalState;
  const setState = setCalendarState || setInternalState;

  // Memoize the dates to display
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(state.currentMonth);
    const end = endOfMonth(state.currentMonth); // Only show one month

    const dates = [];
    let currentDate = new Date(start);

    while (
      isBefore(currentDate, end) ||
      currentDate.toDateString() === end.toDateString()
    ) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, [state.currentMonth]);

  // Handle date click
  const handleDateClick = (date) => {
    const updatedState = {
      ...state,
      selectedDate: date,
      selectedMonth: getMonth(date) + 1,
      selectedYear: getYear(date),
      selectedDay: date.getDate(),
      selectedDateString: format(date, "MMMM dd, yyyy"),
    };
    setState(updatedState);
  };

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <div className="bg-[#F5F7FA] rounded-full w-full">
        <ScrollArea style={{ width: "99%" }} offsetScrollbars>
          <div className="flex gap-2 py-2 px-4">
            {datesToDisplay.map((date) => {
              const isPastDate = isBefore(date, state.today);
              const isSelected =
                state.selectedDate &&
                state.selectedDate.toDateString() === date.toDateString();
              const isTodayDate = isToday(date);

              return (
                <button
                  key={date.toString()}
                  onClick={() => handleDateClick(date)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                    isSelected
                      ? "bg-black text-white"
                      : isTodayDate
                        ? "bg-white border-1 border-black text-black"
                        : isPastDate
                          ? "bg-[#E9E9E9] text-gray-400 cursor-not-allowed"
                          : "bg-white text-black"
                  }`}
                  disabled={isPastDate && !isTodayDate}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Calendar;
