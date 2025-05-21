import { useState } from "react";
import { ScrollArea } from "@mantine/core";
import {
  format,
  addMonths,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  isAfter,
  getDate,
  startOfDay,
} from "date-fns";

const CalendarComp = ({
  selectedDay,
  onClickDay,
  monthsToShow = 2,
  workingHours,
  handleMonthChange,
  calculateWeekNumber,
  totalWeeks,
  firstMonthStart,
}) => {
  const today = startOfDay(new Date());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  // Last available date for first month (May 30, 2025)
  const lastAvailableDate = addDays(firstMonthStart, 29); // May 1 + 29 days = May 30

  const monthsToDisplay = Array.from(
    { length: Math.ceil(monthsToShow) },
    (_, i) => addMonths(firstMonthStart, i)
  );

  const displayMonth = monthsToDisplay[selectedMonthIndex];
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);

  const calendarDays = [
    ...Array(getDay(monthStart)).fill(null),
    ...eachDayOfInterval({ start: monthStart, end: monthEnd }),
  ];

  const getDateStyle = (date) => {
    const isToday = isSameDay(date, today);
    const isOutOfRange =
      isBefore(date, today) ||
      isBefore(date, firstMonthStart) ||
      isAfter(date, lastAvailableDate);

    const dayName = format(date, "EEEE").toLowerCase();
    const weekNumber = calculateWeekNumber(date);

    // Only allow weeks 1–5 to have working hours
    const hasWorkingHours =
      weekNumber <= totalWeeks &&
      workingHours?.some(
        (day) =>
          day.day.toLowerCase() === dayName &&
          day.week === weekNumber &&
          day.start &&
          day.end &&
          !day.closed
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
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {monthsToDisplay.map((month, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedMonthIndex(index);
              handleMonthChange();
            }}
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
      <ScrollArea type="auto" scrollbarSize={6}>
        <div className="w-[500px] pb-5 md:pb-0">
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
          <div className="grid grid-cols-7 gap-y-3">
            {calendarDays.map((date, i) =>
              date ? (
                <div key={i} className="px-1">
                  <div
                    className={getDateStyle(date)}
                    onClick={() => {
                      const dayName = format(date, "EEEE").toLowerCase();
                      const weekNumber = calculateWeekNumber(date);
                      const hasWorkingHours =
                        weekNumber <= totalWeeks &&
                        workingHours?.some(
                          (day) =>
                            day.day.toLowerCase() === dayName &&
                            day.week === weekNumber &&
                            day.start &&
                            day.end &&
                            !day.closed
                        );

                      if (
                        !isBefore(startOfDay(date), today) &&
                        !isBefore(
                          startOfDay(date),
                          startOfDay(firstMonthStart)
                        ) &&
                        !isAfter(
                          startOfDay(date),
                          startOfDay(lastAvailableDate)
                        ) &&
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
