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

const Calendar = ({
  setCalendarState,
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

  const handleDateClick = (date) => {
    const updatedState = {
      ...internalState,
      selectedDate: date,
      selectedMonth: getMonth(date) + 1,
      selectedYear: getYear(date),
      selectedDay: date.getDate(),
      selectedDateString: format(date, "MMMM dd, yyyy"),
    };
    setInternalState(updatedState);
    setCalendarState(updatedState);
  };

  return (
    <div className="flex !bg-[#FFFFFF] px-2 !rounded-[16px] justify-center items-center w-full">
      <div className="w-full">
        {/* Replaced ScrollArea with Safari-friendly container */}
        <div
          className="overflow-x-auto hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2px",
          }}
        >
          <div
            className="flex gap-2 py-2 px-4"
            style={{ minWidth: "max-content" }}
          >
            {datesToDisplay.map((date) => {
              const isSelected =
                internalState.selectedDate &&
                isSameDay(internalState.selectedDate, date);
              const isTodayDate = isToday(date);

              return (
                <button
                  key={date.toString()}
                  onClick={() => handleDateClick(date)}
                  className={`min-w-12 cursor-pointer h-12 flex items-center justify-center rounded-full transition-all !font-bold ${
                    isSelected
                      ? "border border-black text-black"
                      : isTodayDate
                        ? "bg-[#F5F7FA] text-black"
                        : "bg-[#F5F7FA] text-black"
                  } hover:bg-black hover:text-white duration-300`}
                >
                  {format(date, "d")}
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
