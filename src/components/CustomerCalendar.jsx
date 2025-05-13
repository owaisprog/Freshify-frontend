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

const CalendarComp = ({
  selectedDay,
  onClickDay,
  monthsToShow = 2, // Default to 1 month if not specified
  workingHours,
}) => {
  const today = new Date();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0); // Tracks which month is currently selected

  // Generate array of months to display
  const monthsToDisplay = Array.from({ length: monthsToShow }, (_, i) =>
    addMonths(today, i)
  );

  // Get currently selected month
  const displayMonth = monthsToDisplay[selectedMonthIndex];
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);

  // Calculate the last available date (monthsToShow months from today)
  const lastAvailableDate = addMonths(today, monthsToShow);

  // Build calendar grid for the selected month
  const calendarDays = [
    ...Array(getDay(monthStart)).fill(null),
    ...eachDayOfInterval({ start: monthStart, end: monthEnd }),
  ];

  // Date cell styling - same as before but updated to consider working hours
  const getDateStyle = (date) => {
    const isToday = isSameDay(date, today);
    const isOutOfRange =
      (isBefore(date, today) && !isToday) || isAfter(date, lastAvailableDate);

    // Check if date has working hours
    const dayName = format(date, "EEEE").toLowerCase();
    const hasWorkingHours = workingHours?.some(
      (day) => day.day.toLowerCase() === dayName && day.start && day.end
    );

    const isSelected = selectedDay === date.toDateString();

    return [
      "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full",
      "text-sm sm:text-lg font-semibold transition duration-200 mx-auto",
      isOutOfRange || !hasWorkingHours
        ? "bg-[#EAEAEA] text-black cursor-not-allowed opacity-50"
        : isSelected
          ? "bg-black text-white cursor-pointer"
          : isToday
            ? "bg-white border-[0.5px] border-black underline font-black hover:bg-black hover:text-white cursor-pointer"
            : "bg-white border-[0.5px] border-black hover:bg-black hover:text-white cursor-pointer",
    ].join(" ");
  };

  return (
    <div className="mx-auto rounded-lg p-6">
      {/* Month selector buttons - now dynamic */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {monthsToDisplay.map((month, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonthIndex(index)}
            className={`rounded-[10px] border border-black px-[40px] w-[131px] hover:bg-black hover:text-white duration-300 cursor-pointer py-[10px] text-[18px] ${
              selectedMonthIndex === index
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {format(month, "MMMM")}
          </button>
        ))}
      </div>

      {/* Calendar grid */}
      <ScrollArea type="auto" scrollbarSize={6}>
        <div className="w-[500px] pb-5 md:pb-0">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-4">
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
          <div className="grid grid-cols-7 gap-y-3">
            {calendarDays.map((date, i) =>
              date ? (
                <div key={i} className="px-1">
                  <div
                    className={getDateStyle(date)}
                    onClick={() => {
                      // Only allow click if date is within range and has working hours
                      const dayName = format(date, "EEEE").toLowerCase();
                      const hasWorkingHours = workingHours?.some(
                        (day) =>
                          day.day.toLowerCase() === dayName &&
                          day.start &&
                          day.end
                      );

                      if (
                        // !isBefore(date, today) &&
                        // !isAfter(date, lastAvailableDate) &&
                        hasWorkingHours
                      ) {
                        onClickDay(date);
                      }
                    }}
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
