import { Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import { addMonths, format, getMonth } from "date-fns";
import { usePostMutation } from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerCalendar() {
  const { role } = JSON.parse(localStorage.getItem("data")) || {};
  const [calendarState, setCalendarState] = useState({
    selectedDate: null,
    currentMonth: new Date(),
    nextMonth: addMonths(new Date(), 1),
    today: new Date(),
    monthsToShow: 1,
  });
  const [selectedOption, setSelectedOption] = useState(
    String(getMonth(calendarState.currentMonth) + 1)
  ); // Initial value

  const currentMonth = format(calendarState.currentMonth, "MMMM");
  const nextMonth = format(calendarState.nextMonth, "MMMM");

  // console.log(calendarState);
  const selectData = [
    {
      value: String(getMonth(calendarState.currentMonth) + 1),
      label: currentMonth,
    },
    { value: String(getMonth(calendarState.nextMonth) + 1), label: nextMonth },
  ];
  // console.log(getMonth(calendarState.currentMonth) + 1, nextMonth);

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    setSelectedOption(value);
  };
  //.....................

  const {
    data: bookings = [],
    mutate: getMutateBookings,
    isPending: isLoading,
    error,
  } = usePostMutation("bookings");
  console.log(bookings);
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
      <Calendar monthToShow={selectedOption} />
      <CustomerTable bookings={bookings} isLoading={isLoading} error={error} />
      <h1>{selectedOption}</h1>
    </main>
  );
}
