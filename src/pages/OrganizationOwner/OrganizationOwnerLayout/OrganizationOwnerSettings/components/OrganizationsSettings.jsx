import { Button, CopyButton, Loader } from "@mantine/core";
import CustomSelect from "../../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import {
  useQueryHook,
  useUpdateMutationPut,
} from "../../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationsSettings() {
  const [userId, setUserId] = useState(null);
  const { mutate: updateBookingTime } = useUpdateMutationPut(["bookingTime"]);
  const { data: bookingTime = {}, isLoading } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  // Log to inspect the fetched data

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const { id } = JSON.parse(data);
      setUserId(id);
    }
  }, []);

  // Handle booking time change (1, 2, or 3 months)
  const handleBookingTimeChange = (selectedMonth) => {
    console.log("Selected Month:", selectedMonth); // Logs the numeric value (1, 2, or 3)
    updateBookingTime(
      {
        endpoint: `/api/update-months`,
        payload: { bookingWindowMonths: selectedMonth },
      },
      {
        onSuccess: () =>
          toast.success("Month Updated Successfully", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error Updating Booking", { position: "top-center" }),
      }
    );
  };

  // Define the options for booking time (value should be a string)
  const bookingTimeOptions = [
    { label: "1 Month", value: "1" },
    { label: "2 Months", value: "2" },
    { label: "3 Months", value: "3" },
  ];

  // Wait until the bookingTime data is loaded before rendering the CustomSelect
  if (isLoading) {
    return (
      <section className="flex flex-col gap-2">
        <Loader />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2">
      {/* Clients Advance Booking Time Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Clients Advance Booking Time
        </span>
        <div className="w-[97px] lg:w-[154px] h-[40px]">
          <CustomSelect
            data={bookingTimeOptions} // Pass the updated options with string values
            value={bookingTime?.bookingWindowMonths?.toString() || ""} // Ensure value is a string
            onChange={handleBookingTimeChange} // Handle the change with numeric values (1, 2, or 3)
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>

      {/* Subscription Management Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Subscription Management
        </span>
        <Button className="!w-[123px] lg:!w-[240px]" bg="black" radius="md">
          <span className="lg:hidden">Cancel</span>
          <span className="hidden lg:block">Cancel Subscription</span>
        </Button>
      </div>

      {/* Copy Booking Widget Code Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Copy Booking Widget Code
        </span>
        <CopyButton value={userId}>
          {({ copied, copy }) => (
            <Button
              className="!w-[112px] lg:!w-[121px] "
              radius={"md"}
              bg="black"
              onClick={copy}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
      </div>

      {/* Stripe Invoices List Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Stripe Invoices List
        </span>
        <Button className="!w-[123px] lg:!w-[153px] " bg="black" radius="md">
          View List
        </Button>
      </div>

      {/* Restriction For Rescheduling Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="lg:hidden ml-3 lg:ml-0 text-[14px] font-[400]">
          Restriction For Rescheduling
        </span>
        <span className="hidden lg:block  lg:text-[18px] font-[400]">
          Time Restriction For Rescheduling/Cancelation
        </span>
        <div className="w-[113px] lg:w-[154px]">
          <CustomSelect
            data={[
              { label: "2 Hours", value: "2" },
              { label: "6 Hours", value: "6" },
              { label: "12 Hours", value: "12" },
            ]}
            defaultValue="2" // Default value as string (matches the value type in data)
            onChange={(value) => console.log("Selected Restriction:", value)} // Handle the time restriction change
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Delete Account
        </span>
        <Button className="!w-[120px] lg:w-[131px] " bg="black" radius="md">
          Delete
        </Button>
      </div>
    </section>
  );
}
