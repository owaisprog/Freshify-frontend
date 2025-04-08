import { Button, Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import {
  addMonths,
  format,
  getMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { usePostMutation } from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerCalendar() {
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null); // Track selected week
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { role } = JSON.parse(localStorage.getItem("data")) || {};

  const currentDate = new Date();
  const [calendarState, setCalendarState] = useState({
    selectedDate: currentDate, // Set to current date by default
    currentMonth: format(currentDate, "yyyy-MMMM"),
    nextMonth: format(addMonths(currentDate, 1), "yyyy-MMMM"),
    today: currentDate,
    monthsToShow: 1,
  });

  const [selectedOption, setSelectedOption] = useState(
    format(currentDate, "yyyy-MMMM")
  );
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(
    getMonth(currentDate) + 1
  );

  const currentMonth = format(new Date(calendarState.currentMonth), "MMMM");
  const nextMonth = format(new Date(calendarState.nextMonth), "MMMM");

  const selectData = [
    {
      value: format(new Date(calendarState.currentMonth), "yyyy-MMMM"),
      label: currentMonth,
    },
    {
      value: format(new Date(calendarState.nextMonth), "yyyy-MMMM"),
      label: nextMonth,
    },
  ];

  const handleSelectChange = (value) => {
    const date = new Date(value);
    setSelectedOptionMonth(getMonth(date) + 1);
    setSelectedOption(value);
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: null, // Reset selected date when month changes
    }));
    setSelectedWeek(null); // Reset the selected week when month changes

    // Ensure current date is selected if we are back to the current month
    if (value === format(new Date(), "yyyy-MMMM")) {
      setCalendarState((prev) => ({
        ...prev,
        selectedDate: new Date(), // Set today's date
      }));
    }
  };

  const {
    data: bookings = [],
    mutate: getMutateBookings,
    isPending: isLoading,
    error,
  } = usePostMutation("bookings");

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

  useEffect(() => {
    if (!bookings.length) return;
    setAllBookings(bookings);

    // Filter by month first
    const monthFiltered = bookings.filter((val) => {
      return format(new Date(val?.bookingDate), "yyyy-MMMM") === selectedOption;
    });

    // Then filter by selected date if exists
    if (calendarState.selectedDate) {
      const dateFiltered = monthFiltered.filter((val) => {
        return isSameDay(new Date(val.bookingDate), calendarState.selectedDate);
      });
      setFilteredBookings(dateFiltered);
    } else {
      // If no date selected, show all for the month
      setFilteredBookings(monthFiltered);
    }
  }, [bookings, selectedOption, calendarState.selectedDate]);

  // Generate week options whenever the selected month changes
  useEffect(() => {
    if (selectedOptionMonth) {
      // Start of the month
      const startDate = startOfMonth(
        new Date(new Date().getFullYear(), selectedOptionMonth - 1, 1)
      ); // 0-based for months
      // End of the month
      const endDate = endOfMonth(startDate);

      // Get weeks in the selected month
      let weeks = [];
      let currentWeekStart = startOfWeek(startDate); // Start of the first week

      while (currentWeekStart <= endDate) {
        const currentWeekEnd = endOfWeek(currentWeekStart); // End of the current week
        weeks.push({
          value: `${weeks.length + 1}`, // For example: "Week 1"
          label: `Week ${weeks.length + 1}`,
        });
        // Move to the next week
        currentWeekStart = new Date(
          currentWeekEnd.setDate(currentWeekEnd.getDate() + 1)
        );
      }

      setWeekOptions(weeks);
    }
  }, [selectedOptionMonth]);

  const handleWeekSelect = (value) => {
    console.log("Selected week:", value);
    setSelectedWeek(value); // Update selected week when a new week is selected
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
            value={selectedWeek} // Bind selected week to the value
            onChange={handleWeekSelect}
          />
        </div>
        <Button
          bg="black"
          radius="md"
          fw={"normal"}
          loaderProps={{ type: "bars" }}
          className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
        >
          Add Service
        </Button>
      </div>
      <Calendar
        monthToShow={selectedOptionMonth}
        setCalendarState={setCalendarState}
        calendarState={calendarState}
        initialDate={currentDate} // Pass current date as initial
      />
      <CustomerTable
        bookings={filteredBookings}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
