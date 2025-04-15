import { Title } from "@mantine/core";
import CustomerTable from "../../../../components/CustomerTable";
import { usePostMutation } from "../../../../services/reactQuery";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CustomerDashboard() {
  const { role } = JSON.parse(localStorage.getItem("data")) || {};
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
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Dashboard
      </Title>
      <CustomerTable bookings={bookings} isLoading={isLoading} error={error} />
    </main>
  );
}
