import { Button, Title } from "@mantine/core";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  addMonths,
  format,
  getMonth,
  getYear,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import { toast } from "react-toastify";
import { usePostMutation } from "../services/reactQuery";
import CustomSelect from "./CustomSelector";
import Calendar from "./Calendar";
import CustomerTable from "./CustomerTable";
import EditAvailabilityPopup from "./EditAvailabilityPopup";

export default function CalendarPage({ numberOfMonths = 5 }) {
  const { mutate: editAvalibility } = usePostMutation("avalibility");
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const { role, id } = JSON.parse(localStorage.getItem("data")) || {};
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  const currentDate = useMemo(() => new Date(), []);
  // const currentDate = useMemo(() => currentDateUstable, [currentDateUstable]);
  const [calendarState, setCalendarState] = useState({
    selectedDate: currentDate,
    today: currentDate,
    monthsToShow: 1,
  });
  // Memoized month options
  const selectData = useMemo(() => {
    return Array.from({ length: numberOfMonths }, (_, i) => {
      const monthDate = addMonths(currentDate, i);
      return {
        value: format(monthDate, "yyyy-MMMM"),
        label: format(monthDate, "MMMM"),
      };
    });
  }, [numberOfMonths, currentDate]);

  const [selectedOption, setSelectedOption] = useState(
    format(currentDate, "yyyy-MMMM")
  );
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(
    getMonth(currentDate) + 1
  );

  const {
    data: bookings = [],
    mutate: getMutateBookings,
    isPending: isLoading,
    error,
  } = usePostMutation("bookings");

  // Fetch bookings only once on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        getMutateBookings({
          endpoint: `/api/get-all-bookings`,
          payload: { role },
        });
      } catch {
        toast.error("Error fetching bookings");
      }
    };
    fetchBookings();
  }, [getMutateBookings, role]);

  // Memoized week options calculation
  const calculateWeekOptions = useCallback((month) => {
    if (!month) return [];

    const startDate = startOfMonth(
      new Date(new Date().getFullYear(), month - 1, 1)
    );
    const endDate = endOfMonth(startDate);

    let weeks = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 1 });
    let weekIndex = 1;

    while (currentWeekStart <= endDate) {
      const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
      weeks.push({
        value: String(weekIndex),
        label: `Week ${weekIndex}`,
        range: {
          start: new Date(currentWeekStart),
          end: new Date(currentWeekEnd),
        },
      });
      weekIndex++;
      currentWeekStart = new Date(currentWeekEnd.getTime());
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
    }

    return weeks;
  }, []);

  // Update week options when month changes
  useEffect(() => {
    if (selectedOptionMonth) {
      setWeekOptions(calculateWeekOptions(selectedOptionMonth));
    }
  }, [selectedOptionMonth, calculateWeekOptions]);

  // Memoized filtered bookings
  const filteredBookings = useMemo(() => {
    if (!bookings.length) return [];

    const monthFiltered = bookings.filter((val) => {
      return format(new Date(val?.bookingDate), "yyyy-MMMM") === selectedOption;
    });

    if (selectedWeek) {
      const weekObj = weekOptions.find((week) => week.value === selectedWeek);
      if (weekObj) {
        const { start, end } = weekObj.range;
        return monthFiltered.filter((val) => {
          const bookingDate = new Date(val.bookingDate);
          return (
            (isAfter(bookingDate, start) || isSameDay(bookingDate, start)) &&
            (isBefore(bookingDate, end) || isSameDay(bookingDate, end))
          );
        });
      }
    }

    if (calendarState.selectedDate) {
      return monthFiltered.filter((val) => {
        return isSameDay(new Date(val.bookingDate), calendarState.selectedDate);
      });
    }

    return monthFiltered;
  }, [
    bookings,
    selectedOption,
    calendarState.selectedDate,
    selectedWeek,
    weekOptions,
  ]);

  const handleSelectChange = useCallback((value) => {
    const date = new Date(value);
    setSelectedOptionMonth(getMonth(date) + 1);
    setSelectedOption(value);
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
    setSelectedWeek(null);

    if (value === format(new Date(), "yyyy-MMMM")) {
      setCalendarState((prev) => ({
        ...prev,
        selectedDate: new Date(),
      }));
    }
  }, []);

  const handleWeekSelect = useCallback((selectedWeekValue) => {
    setSelectedWeek(selectedWeekValue);
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
  }, []);

  const handleCalendarDateChange = useCallback((updatedState) => {
    setSelectedWeek(null);
    setCalendarState(updatedState);
  }, []);

  const handleAvailabilitySubmit = useCallback(
    (values) => {
      editAvalibility(
        {
          endpoint: "/api/create-unavailability",
          payload: {
            professionalId: values.professionalId,
            date: values.date,
            startTime: values.startTime,
            endTime: values.endTime,
            organizationId: id,
          },
        },
        {
          onSuccess: () =>
            toast.success("Submitted Successfully", {
              position: "top-center",
            }),
          onError: () =>
            toast.error("Error Submitting", {
              position: "top-center",
            }),
        }
      );
      setAvailabilityModalOpen(false);
    },
    [editAvalibility, id]
  );

  return (
    <main className="grid  grid-cols-1  gap-y-5 max-w-[1440px]  mx-auto w-full pt-20 lg:pt-0  p-6 ">
      <Title
        c={"black"}
        className="lg:!px-6   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Calendar
      </Title>

      <div className="  px-2   lg:px-0 -mt-4 lg:mt-0 flex flex-col-reverse  sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 ">
          {/* Select Month */}
          <CustomSelect
            data={selectData}
            backgroundColor="#F5F7FA"
            defaultValue={selectedOption}
            onChange={handleSelectChange}
          />

          <CustomSelect
            data={weekOptions}
            backgroundColor="#F5F7FA"
            placeholder="Select Week"
            value={selectedWeek}
            onChange={handleWeekSelect}
          />
        </div>

        <Button
          bg="black"
          radius="md"
          fw={"normal"}
          loaderProps={{ type: "bars" }}
          className="!text-[18px] !px-[40px]  !font-[400] !py-[10px]"
          onClick={() => setAvailabilityModalOpen(true)}
        >
          Edit Availability
        </Button>
      </div>

      <Calendar
        monthToShow={selectedOptionMonth}
        yearToShow={getYear(new Date(selectedOption))}
        setCalendarState={handleCalendarDateChange}
        calendarState={calendarState}
        initialDate={currentDate}
      />

      <CustomerTable
        bookings={filteredBookings}
        isLoading={isLoading}
        error={error}
      />

      <EditAvailabilityPopup
        opened={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        onSubmit={handleAvailabilitySubmit}
        initialDate={calendarState.selectedDate}
      />
    </main>
  );
}
