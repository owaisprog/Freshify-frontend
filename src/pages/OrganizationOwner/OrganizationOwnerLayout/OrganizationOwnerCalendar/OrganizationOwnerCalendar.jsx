import { Button, Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
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
import { usePostMutation, useQueryHook } from "../../../../services/reactQuery";
import { toast } from "react-toastify";
import EditAvailabilityPopup from "../../../../components/EditAvailabilityPopup";

export default function OrganizationOwnerCalendar() {
  const { mutate: editAvalibility } = usePostMutation("avalibility");
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const { role, id } = JSON.parse(localStorage.getItem("data")) || {};
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  const currentDate = new Date();
  const [calendarState, setCalendarState] = useState({
    selectedDate: currentDate,
    today: currentDate,
    monthsToShow: 1,
  });

  // Always show current and next month in the Month dropdown
  const currentMonth = format(currentDate, "yyyy-MMMM");
  const nextMonth = format(addMonths(currentDate, 1), "yyyy-MMMM");

  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(
    getMonth(currentDate) + 1
  );

  const selectData = [
    {
      value: currentMonth,
      label: format(new Date(currentMonth), "MMMM"),
    },
    {
      value: nextMonth,
      label: format(new Date(nextMonth), "MMMM"),
    },
  ];

  const {
    data: bookings = [],
    mutate: getMutateBookings,
    isPending: isLoading,
    error,
  } = usePostMutation("bookings");

  // Fetch all bookings
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

  // 1) Recompute weeks whenever the selectedOptionMonth changes
  //    Each week has a "value", "label" and also "range" with {start, end}.
  useEffect(() => {
    if (selectedOptionMonth) {
      // Start of the chosen month
      const startDate = startOfMonth(
        new Date(new Date().getFullYear(), selectedOptionMonth - 1, 1)
      );
      // End of the chosen month
      const endDate = endOfMonth(startDate);

      let weeks = [];
      let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 1 });
      // ^ If you want the week to start on Monday, pass { weekStartsOn: 1 }
      //   If you want Sunday, remove the second argument or use { weekStartsOn: 0 }

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

        // Move currentWeekStart to the next day after currentWeekEnd
        currentWeekStart = new Date(currentWeekEnd.getTime());
        currentWeekStart.setDate(currentWeekStart.getDate() + 1);
      }

      setWeekOptions(weeks);
    }
  }, [selectedOptionMonth]);

  // 2) On month dropdown change
  const handleSelectChange = (value) => {
    const date = new Date(value);
    setSelectedOptionMonth(getMonth(date) + 1);
    setSelectedOption(value);
    // Clear date and selected week
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
    setSelectedWeek(null);

    // If user re-selects the current month, default the date to "today"
    if (value === format(new Date(), "yyyy-MMMM")) {
      setCalendarState((prev) => ({
        ...prev,
        selectedDate: new Date(),
      }));
    }
  };

  // 3) When user selects a week => clear the date selection
  const handleWeekSelect = (selectedWeekValue) => {
    setSelectedWeek(selectedWeekValue);
    // Remove any selected date in the calendar
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
  };

  // 4) Filter logic for bookings
  useEffect(() => {
    if (!bookings.length) {
      setFilteredBookings([]);
      return;
    }

    // Step A: Filter by the selected month
    const monthFiltered = bookings.filter((val) => {
      return format(new Date(val?.bookingDate), "yyyy-MMMM") === selectedOption;
    });

    // Step B: If a week is selected, filter by that week's range
    if (selectedWeek) {
      // Find the range for that week
      const weekObj = weekOptions.find((week) => week.value === selectedWeek);
      if (weekObj) {
        const { start, end } = weekObj.range;
        // Filter bookings that lie between start and end (inclusive)
        const weekFiltered = monthFiltered.filter((val) => {
          const bookingDate = new Date(val.bookingDate);
          return (
            (isAfter(bookingDate, start) || isSameDay(bookingDate, start)) &&
            (isBefore(bookingDate, end) || isSameDay(bookingDate, end))
          );
        });
        setFilteredBookings(weekFiltered);
        return;
      }
    }

    // Step C: Otherwise, if a date is selected in the calendar
    if (calendarState.selectedDate) {
      const dateFiltered = monthFiltered.filter((val) => {
        return isSameDay(new Date(val.bookingDate), calendarState.selectedDate);
      });
      setFilteredBookings(dateFiltered);
      return;
    }

    // Step D: If no date or week is selected, show everything in the month
    setFilteredBookings(monthFiltered);
  }, [
    bookings,
    selectedOption,
    calendarState.selectedDate,
    selectedWeek,
    weekOptions,
  ]);

  // 5) If user selects a date on the calendar, we reset the week select
  const handleCalendarDateChange = (updatedState) => {
    // Whenever a date is chosen, clear the selected week
    setSelectedWeek(null);
    setCalendarState(updatedState);
  };

  // Query for professionals data
  const { data: allUsers = [] } = useQueryHook({
    queryKey: ["users", id],
    endpoint: `/api/get-users-by-owner/${id}`,
    staleTime: 0,
  });

  // 6) Edit availability
  const handleAvailabilitySubmit = (values) => {
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
  };

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px]"
      >
        Calendar
      </Title>

      <div className="py-10 flex justify-between">
        <div className="flex gap-2">
          {/* Select Month */}
          <CustomSelect
            data={selectData}
            backgroundColor="#F5F7FA"
            defaultValue={selectedOption}
            onChange={handleSelectChange}
          />

          {/* Select Week */}
          <CustomSelect
            data={weekOptions}
            backgroundColor="#F5F7FA"
            placeholder="Select Week"
            value={selectedWeek}
            onChange={handleWeekSelect}
          />
        </div>

        {/* Edit Availability Button */}
        <Button
          bg="black"
          radius="md"
          fw={"normal"}
          loaderProps={{ type: "bars" }}
          className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
          onClick={() => setAvailabilityModalOpen(true)}
        >
          Edit Availability
        </Button>
      </div>

      {/* Calendar */}
      <Calendar
        monthToShow={selectedOptionMonth}
        yearToShow={getYear(new Date(selectedOption))}
        setCalendarState={handleCalendarDateChange} // pass our custom handler
        calendarState={calendarState}
        initialDate={currentDate}
      />

      {/* Bookings Table */}
      <CustomerTable
        bookings={filteredBookings}
        isLoading={isLoading}
        error={error}
      />

      {/* Availability Modal */}
      <EditAvailabilityPopup
        opened={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        onSubmit={handleAvailabilitySubmit}
        professionals={allUsers}
        initialDate={calendarState.selectedDate}
      />
    </main>
  );
}
