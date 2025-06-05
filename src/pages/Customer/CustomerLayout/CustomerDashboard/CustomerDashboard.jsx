import { Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import { usePostMutation, useQueryHook } from "../../../../services/reactQuery";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotificationDropdown from "../../../../components/notifications/NotificationDropdown";

export default function CustomerDashboard() {
  const [currentOwnerID, setIsCurrentOwnerId] = useState("");

  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months/${currentOwnerID}`,
    staleTime: 5 * 60 * 1000, // Cache for 15 minutes
    enabled: () => {
      return currentOwnerID ? true : false;
    },
  });
  // console.log(currentOwnerID, "sad", bookingTime);

  //consoe.log("Booking Time is ", bookingTime);

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {}; // Fallback to an empty object if "data" is not in localStorage or is invalid

  const { role } = data || {}; // Safely destructure role if data is valid, otherwise it will default to an empty object

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
        toast.error("Error fetching bookings", { position: "top-right" });
      }
    };
    fetchBookings();
  }, [getMutateBookings, role]);

  return (
    <main className="pt-20 grid grid-cols-1 gap-y-5  lg:pt-0 lg:gap-6  p-6 lg:p-0  ">
      <div className="flex items-center justify-between mb-4 lg:px-6 px-2 lg:bg-[#FFFFFF] py-[18px] rounded-[16px]">
        <Title
          c={"black"}
          className="lg:!text-[32px] !text-[24px] !font-[500] !m-0"
        >
          Appoinments
        </Title>
        {/* Notification Dropdown Button */}
        <NotificationDropdown />
      </div>
      <CustomerTable
        bookings={bookings}
        isLoading={isLoading}
        error={error}
        role={role}
        resecduleTimeLimit={bookingTime?.timeRestrictionHours}
        setIsCurrentOwnerId={setIsCurrentOwnerId}
      />
    </main>
  );
}
