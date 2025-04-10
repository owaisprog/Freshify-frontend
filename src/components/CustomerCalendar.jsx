import { useState } from "react";
import { ScrollArea } from "@mantine/core";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  isAfter,
  getDate,
} from "date-fns";

export default function CalendarComp({
  selectedDay,
  onClickDay,
  handleMonthChange,
  workingHours = [],
}) {
  const today = new Date();
  const [currentDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState("current");

  const oneMonthFromNow = addMonths(today, 1);

  // Get month to display
  const displayMonth =
    selectedMonth === "current" ? currentDate : addMonths(currentDate, 1);
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);

  // Build calendar grid
  const calendarDays = [
    ...Array(getDay(monthStart)).fill(null), // leading blanks
    ...eachDayOfInterval({ start: monthStart, end: monthEnd }), // actual days
  ];

  // Helper to see if a date’s weekday is closed
  function isClosedDay(date) {
    const weekdayName = format(date, "EEEE").toLowerCase(); // e.g. "monday"
    const dayConfig = workingHours.find(
      (val) => val.day.toLowerCase() === weekdayName
    );
    return dayConfig?.closed === true;
  }

  // Date cell styling
  const getDateStyle = (date) => {
    if (!date) return "";

    const isToday = isSameDay(date, today);
    // If date is in the past (excluding today) or beyond next month
    const isOutOfRange =
      (isBefore(date, today) && !isToday) || isAfter(date, oneMonthFromNow);

    // If day is closed
    const closed = isClosedDay(date);

    // If this day is the currently selected day
    const isSelected = selectedDay === date.toDateString();

    // Combine them:
    // 1) If out-of-range or closed => disable style
    // 2) else if selected => highlight
    // 3) else if today => style differently
    // 4) else normal day
    if (isOutOfRange || closed) {
      return [
        "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
        "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
        "bg-[#EAEAEA] text-black cursor-not-allowed opacity-50",
      ].join(" ");
    } else if (isSelected) {
      return [
        "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
        "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
        "bg-black text-white cursor-pointer",
      ].join(" ");
    } else if (isToday) {
      return [
        "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
        "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
        "bg-white border-[0.5px] border-black underline font-black hover:bg-black hover:text-white cursor-pointer",
      ].join(" ");
    } else {
      return [
        "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
        "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
        "bg-white border-[0.5px] border-black hover:bg-black hover:text-white cursor-pointer",
      ].join(" ");
    }
  };

  // Decide what happens when we switch from "current" to "next" month
  function onMonthSelect(month) {
    setSelectedMonth(month);
    handleMonthChange?.();
  }

  return (
    <div className="mx-auto bg-white rounded-lg p-6" style={{ width: "95%" }}>
      {/* Month selector buttons */}
      <div className="flex flex-wrap justify-center gap-4 items-center mb-6">
        {["current", "next"].map((month) => (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            className={`p-2 sm:p-3 border-[0.5px] border-black min-w-32 sm:min-w-64 rounded-[20px] 
              transition duration-200 font-medium text-base sm:text-xl leading-normal
              ${
                selectedMonth === month
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
          >
            {format(
              month === "current" ? currentDate : addMonths(currentDate, 1),
              "MMMM"
            )}
          </button>
        ))}
      </div>

      {/* Calendar grid */}
      <ScrollArea type="auto" scrollbarSize={6}>
        <div className="min-w-[500px]">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="font-medium text-sm sm:text-base text-gray-700 text-center px-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-y-3">
            {calendarDays.map((date, i) => {
              if (!date) {
                // Empty cell (leading blank)
                return <div key={i} className="h-10 sm:h-12" />;
              }

              // We'll disable clicks if it's out-of-range or closed
              const closed = isClosedDay(date);
              const isOutOfRange =
                (isBefore(date, today) && !isSameDay(date, today)) ||
                isAfter(date, oneMonthFromNow);

              const disableClick = closed || isOutOfRange;

              return (
                <div key={i} className="px-1">
                  <div
                    className={getDateStyle(date)}
                    onClick={() => {
                      if (!disableClick) {
                        onClickDay(date);
                      }
                    }}
                  >
                    {getDate(date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
