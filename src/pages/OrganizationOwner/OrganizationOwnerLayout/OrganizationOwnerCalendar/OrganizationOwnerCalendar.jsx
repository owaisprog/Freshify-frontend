import { Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import { addMonths, format, getDate, getMonth } from "date-fns";
import { usePostMutation } from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerCalendar() {
  const [actualData, setActualData] = useState([]);
  const { role } = JSON.parse(localStorage.getItem("data")) || {};
  const [calendarState, setCalendarState] = useState({
    selectedDate: null,
    currentMonth: format(new Date(), "yyyy-MMMM"),
    nextMonth: format(addMonths(new Date(), 1), "yyyy-MMMM"),
    today: new Date(),
    monthsToShow: 1,
  });
  const [selectedOption, setSelectedOption] = useState(
    format(new Date(), "yyyy-MMMM")
  ); // Initial value
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(
    getMonth(new Date()) + 1
  ); // Initial value
  const currentMonth = format(calendarState.currentMonth, "MMMM");
  const nextMonth = format(calendarState.nextMonth, "MMMM");

  const selectData = [
    {
      value: format(calendarState.currentMonth, "yyyy-MMMM"),
      label: currentMonth,
    },
    { value: format(calendarState.nextMonth, "yyyy-MMMM"), label: nextMonth },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    setSelectedOptionMonth(getMonth(value) + 1);
    setSelectedOption(value);
  };
  //.....................
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
    const monthFiltered = bookings.filter(
      (val) => format(val?.bookingDate, "yyyy-MMMM") === selectedOption
    );
    setActualData(monthFiltered);
  }, [bookings, selectedOption]);

  useEffect(() => {
    if (!actualData || !calendarState.selectedDate) return;
    const selectedDateData = actualData?.filter(
      (val) => getDate(val.bookingDate) === getDate(calendarState.selectedDate)
    );
    setActualData(selectedDateData);
  }, [actualData, calendarState]);

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Calendar
      </Title>
      <div className="py-10 max-w-fit">
        <CustomSelect
          data={selectData}
          backgroundColor="#F5F7FA"
          defaultValue={selectedOption} // Pass initial value
          onChange={handleSelectChange} // Get selected value
        />
      </div>
      <Calendar
        monthToShow={selectedOptionMonth}
        // yearToShow={2026}
        setCalendarState={setCalendarState}
        calendarState={calendarState}
      />
      <CustomerTable
        bookings={actualData}
        isLoading={isLoading}
        error={error}
      />
      <h1>{selectedOption}</h1>
    </main>
  );
}
