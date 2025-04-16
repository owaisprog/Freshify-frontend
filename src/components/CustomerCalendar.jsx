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

const CalendarComp = ({ selectedDay, onClickDay }) => {
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
    ...Array(getDay(monthStart)).fill(null),
    ...eachDayOfInterval({ start: monthStart, end: monthEnd }),
  ];

  // Handle date selection

  // Date cell styling
  const getDateStyle = (date) => {
    const isToday = isSameDay(date, today);
    const isOutOfRange =
      (isBefore(date, today) && !isToday) || isAfter(date, oneMonthFromNow);
    const isSelected = selectedDay === date.toDateString();

    return [
      "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
      "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
      isOutOfRange
        ? "bg-[#EAEAEA] text-black cursor-not-allowed opacity-50"
        : isSelected
          ? "bg-black text-white cursor-pointer"
          : isToday
            ? "bg-white border-[0.5px] border-black underline font-black hover:bg-black hover:text-white cursor-pointer"
            : "bg-white border-[0.5px] border-black hover:bg-black hover:text-white cursor-pointer",
    ].join(" ");
  };

  return (
    <div className="mx-auto    rounded-lg p-6">
      {/* Month selector buttons */}
      <div className="flex flex-wrap   gap-4 items-center mb-6">
        {["current", "next"].map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`rounded-[10px] border border-black px-[40px] w-[131px] py-[10px] text-[18px]
              ${selectedMonth === month ? "bg-black text-white" : "bg-white text-black"}`}
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
        <div className="w-[500px]    pb-5 md:pb-0">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-4 ">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="font-medium text-sm uppercase sm:text-base text-gray-700 text-center px-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7  gap-y-3">
            {calendarDays.map((date, i) =>
              date ? (
                <div key={i} className="px-1">
                  <div
                    className={getDateStyle(date)}
                    onClick={() => onClickDay(date)}
                  >
                    {getDate(date)}
                  </div>
                </div>
              ) : (
                <div key={i} className="h-10 sm:h-12" />
              )
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CalendarComp;
