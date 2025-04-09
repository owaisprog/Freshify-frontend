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
  isSameDay,
} from "date-fns";
import { ScrollArea } from "@mantine/core";

const Calendar = ({
  setCalendarState, // <== We'll call this whenever a user clicks a date
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
        ? new Date(yearToShow, monthToShow - 1, 1)
        : initialMonth;

    return {
      selectedDate: initialDate,
      currentMonth: startOfMonth(initialYear),
      nextMonth: addMonths(startOfMonth(initialYear), 1),
      today: currentDate,
      monthsToShow,
    };
  });

  // If monthToShow or yearToShow changes from the parent, adjust our `currentMonth`
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

  // If the parent's calendarState changes, sync with internal state
  useEffect(() => {
    if (calendarState?.selectedDate) {
      setInternalState((prev) => ({
        ...prev,
        selectedDate: new Date(calendarState.selectedDate),
      }));
    } else {
      // If parent passes null, clear local selectedDate
      setInternalState((prev) => ({
        ...prev,
        selectedDate: null,
      }));
    }
  }, [calendarState?.selectedDate]);

  // Generate the dates for the currently visible month
  const datesToDisplay = useMemo(() => {
    const start = startOfMonth(internalState.currentMonth);
    const end = endOfMonth(internalState.currentMonth);

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
  }, [internalState.currentMonth]);

  // Handle date click => update both local and parent's state
  const handleDateClick = (date) => {
    const updatedState = {
      ...internalState,
      selectedDate: date,
      selectedMonth: getMonth(date) + 1,
      selectedYear: getYear(date),
      selectedDay: date.getDate(),
      selectedDateString: format(date, "MMMM dd, yyyy"),
    };
    // Update this component's local state
    setInternalState(updatedState);
    // Notify parent
    setCalendarState(updatedState);
  };

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <div className="bg-[#F5F7FA] rounded-full w-full">
        <ScrollArea style={{ width: "99%" }} offsetScrollbars>
          <div className="flex gap-2 py-2 px-4">
            {datesToDisplay.map((date) => {
              const isPastDate =
                isBefore(date, internalState.today) && !isToday(date);
              const isSelected =
                internalState.selectedDate &&
                isSameDay(internalState.selectedDate, date);
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
                  disabled={isPastDate}
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
