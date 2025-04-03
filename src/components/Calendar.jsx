import { useState, useMemo } from "react";
import {
  format,
  isBefore,
  isToday,
  startOfMonth,
  endOfMonth,
  addMonths,
  getMonth,
  getYear,
} from "date-fns";
import { ScrollArea } from "@mantine/core";

const Calendar = ({
  calendarState,
  setCalendarState,
  initialDate = new Date(),
  monthsToShow = 2,
}) => {
  // Initialize internal state if not using controlled state
  const [internalState, setInternalState] = useState(() => ({
    selectedDate: null,
    currentMonth: startOfMonth(initialDate),
    nextMonth: addMonths(startOfMonth(initialDate), 1),
    today: new Date(),
    monthsToShow,
  }));

  // Use either external state or internal state
  const state = calendarState || internalState;
  const setState = setCalendarState || setInternalState;

  // Memoize the dates to display to prevent unnecessary recalculations
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(state.currentMonth);
    const end = endOfMonth(addMonths(state.currentMonth, monthsToShow - 1));

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
  }, [state.currentMonth, monthsToShow]);

  // Handle date click - updates all relevant state at once
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
