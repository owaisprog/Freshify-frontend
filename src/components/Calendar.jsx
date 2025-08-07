import { useState, useMemo, useEffect, useCallback } from "react";
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
  setCalendarState,
  initialDate = new Date(),
  monthsToShow = 1,
  monthToShow = null,
  yearToShow = null,
  calendarState,
}) => {
  const [internalState, setInternalState] = useState(() => {
    const currentDate = new Date();

    // Fix: Ensure dates are created with proper timezone handling
    const safeInitialDate = new Date(initialDate.getTime());

    const initialMonth =
      monthToShow !== null
        ? new Date(currentDate.getFullYear(), monthToShow - 1, 1)
        : startOfMonth(safeInitialDate);

    const initialYear =
      yearToShow !== null
        ? new Date(yearToShow, (monthToShow || 1) - 1, 1)
        : initialMonth;

    return {
      selectedDate: safeInitialDate,
      currentMonth: startOfMonth(initialYear),
      nextMonth: addMonths(startOfMonth(initialYear), 1),
      today: currentDate,
      monthsToShow,
    };
  });

  // Fix: Debounced effect to prevent rapid re-renders
  useEffect(() => {
    if (monthToShow !== null || yearToShow !== null) {
      const timeoutId = setTimeout(() => {
        try {
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
        } catch (error) {
          console.warn("Date calculation error:", error);
        }
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [monthToShow, yearToShow, internalState.currentMonth]);

  // Fix: More robust calendarState sync
  useEffect(() => {
    if (calendarState?.selectedDate) {
      try {
        const newSelectedDate = new Date(calendarState.selectedDate);
        // Validate the date
        if (!isNaN(newSelectedDate.getTime())) {
          setInternalState((prev) => ({
            ...prev,
            selectedDate: newSelectedDate,
          }));
        }
      } catch (error) {
        console.warn("Invalid date in calendarState:", error);
        setInternalState((prev) => ({
          ...prev,
          selectedDate: null,
        }));
      }
    } else {
      setInternalState((prev) => ({
        ...prev,
        selectedDate: null,
      }));
    }
  }, [calendarState?.selectedDate]);

  // Fix: Optimized date generation with better loop control
  const datesToDisplay = useMemo(() => {
    try {
      const start = startOfMonth(internalState.currentMonth);
      const end = endOfMonth(internalState.currentMonth);

      const dates = [];
      const currentDate = new Date(start);
      let iterationCount = 0; // Safety counter

      // Fix: Use proper date comparison and add safety limit
      while (currentDate <= end && iterationCount < 32) {
        // Max 32 days safety limit
        dates.push(new Date(currentDate));
        currentDate.setUTCDate(currentDate.getUTCDate() + 1); // Use UTC to avoid timezone issues
        iterationCount++;
      }

      return dates;
    } catch (error) {
      console.error("Error generating dates:", error);
      return [];
    }
  }, [internalState.currentMonth]);

  // Fix: Memoized click handler to prevent recreation
  const handleDateClick = useCallback(
    (date) => {
      try {
        const updatedState = {
          ...internalState,
          selectedDate: new Date(date), // Create new instance
          selectedMonth: getMonth(date) + 1,
          selectedYear: getYear(date),
          selectedDay: date.getDate(),
          selectedDateString: format(date, "MMMM dd, yyyy"),
        };
        setInternalState(updatedState);
        setCalendarState?.(updatedState);
      } catch (error) {
        console.error("Error handling date click:", error);
      }
    },
    [internalState, setCalendarState]
  );

  return (
    <div className="flex !bg-[#FFFFFF] px-2 !rounded-[16px] justify-center items-center w-full">
      <div className="rounded-full w-full">
        <ScrollArea
          style={{
            width: "99%",
            // Fix: Add iOS-specific scroll optimizations
            WebkitOverflowScrolling: "touch",
            overflowScrolling: "touch",
          }}
          offsetScrollbars
          type="always"
          styles={{
            thumb: {
              backgroundColor: "#000000",
              cursor: "pointer",
            },
            // Fix: Add viewport and scrollbar styles for iOS
            viewport: {
              WebkitOverflowScrolling: "touch",
            },
          }}
        >
          <div className="flex gap-2 py-2 px-4">
            {datesToDisplay.map((date, index) => {
              try {
                const isSelected =
                  internalState.selectedDate &&
                  isSameDay(internalState.selectedDate, date);
                const isTodayDate = isToday(date);

                return (
                  <button
                    key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${index}`} // More specific key
                    onClick={() => handleDateClick(date)}
                    className={`min-w-12 h-12 flex items-center hover:cursor-pointer hover:bg-black duration-300 hover:text-white justify-center rounded-full transition-all !font-bold ${
                      isSelected
                        ? "border border-black text-black"
                        : isTodayDate
                          ? "bg-[#F5F7FA] text-black"
                          : "bg-[#F5F7FA] text-black"
                    }`}
                    // Fix: Add iOS-specific touch handling
                    style={{
                      WebkitTapHighlightColor: "transparent",
                      WebkitTouchCallout: "none",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                    }}
                    type="button" // Explicit button type
                  >
                    {format(date, "d")}
                  </button>
                );
              } catch (error) {
                console.error("Error rendering date button:", error);
                return null;
              }
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Calendar;
