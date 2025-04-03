import { Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import Calendar from "../../../../components/Calendar";
import CustomSelect from "../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import { addMonths, format } from "date-fns";
import { usePostMutation } from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerCalendar() {
  const [selectedOption, setSelectedOption] = useState("option1"); // Initial value
  const [calendarState, setCalendarState] = useState({
    selectedDate: null,
    currentMonth: new Date(),
    nextMonth: addMonths(new Date(), 1),
    today: new Date(),
    monthsToShow: 2,
  });
  console.log(
    calendarState.selectedDate && format(calendarState.selectedDate, "M/d/yyyy")
  );
  const selectData = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    setSelectedOption(value);
  };
  //.....................

  const { role } = JSON.parse(localStorage.getItem("data")) || {};

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
        calendarState={calendarState}
        setCalendarState={setCalendarState}
      />
      <CustomerTable bookings={bookings} isLoading={isLoading} error={error} />
    </main>
  );
}
