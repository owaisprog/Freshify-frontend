import { Button, Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import {
  addMonths,
  format,
  getDate,
  getMonth,
  getYear,
  isSameDay,
} from "date-fns";
import { usePostMutation } from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerCalendar() {
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

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px]"
      >
        Calendar
      </Title>
      <div className="py-10 flex justify-between">
        <CustomSelect
          data={selectData}
          backgroundColor="#F5F7FA"
          defaultValue={selectedOption}
          onChange={handleSelectChange}
        />
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
        // yearToShow={getYear(new Date(selectedOption))}
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
