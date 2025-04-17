import { Text, Modal, Indicator } from "@mantine/core";
import TableCom from "./Table";
import { useState, useMemo, useCallback } from "react";
import AppointmentDetails from "./AppointmentDetails";

export default function CustomerTable({ bookings, error, isLoading, role }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // // Debugging: Only log when bookings actually changes
  // useEffect(() => {
  //   if (bookings && bookings.length > 0) {
  //     console.log("Bookings data updated:", {
  //       count: bookings.length,
  //       firstItem: bookings[0],
  //     });
  //   }
  // }, [bookings]);

  // Memoized table columns
  const columns = useMemo(
    () => [
      "",
      "Customer Name",
      "Professional",
      "Location",
      "Price",
      "Payment",
      "Date",
      "Time",
      "Status",
    ],
    []
  );

  // Memoized data transformation
  const data = useMemo(() => {
    return bookings?.map((booking) => ({
      "": (
        <Indicator
          radius={"xl"}
          size={10}
          color={booking.isSeen ? "green" : "red"}
          className="ml-[-10px]"
        />
      ),
      "Customer Name": booking.name || "Guest",
      Professional: booking.professionalId?.name || "N/A",
      Location: booking.locationDetails?.name || "N/A",
      Price: `$${booking.totalPrice}`,
      Payment: booking.paymentMethod,
      Date: new Date(booking.bookingDate).toLocaleDateString(),
      Time: booking.bookingTime,
      Status: (
        <Text
          className="rounded-[3px] !p-[4px]"
          bg={
            booking.status === "completed"
              ? "#A3E8AE"
              : booking.status === "cancelled"
                ? "red"
                : booking.status === "pending"
                  ? "orange"
                  : "gray"
          }
          c={
            booking.status === "completed"
              ? "#427B42"
              : booking.status === "cancelled"
                ? "red"
                : booking.status === "pending"
                  ? "white"
                  : "white"
          }
          weight={500}
        >
          {booking.status}
        </Text>
      ),
      __originalBooking: booking,
    }));
  }, [bookings]);

  const handleSubmit = useCallback(
    (rowData) => {
      if (!role || role === "customer") return;
      console.log("Row clicked:", rowData.__originalBooking);
      setSelectedData(rowData.__originalBooking);
      setIsPopupOpen(true);
    },
    [role]
  );

  return (
    <div className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]  ">
      <Text className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700] mb-6">
        All Bookings
      </Text>

      <TableCom
        data={data}
        error={error}
        columns={columns}
        isLoading={isLoading}
        handleFunction={handleSubmit}
      />

      <Modal
        opened={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Booking Details"
        size="lg"
        centered
      >
        {selectedData ? (
          <AppointmentDetails booking={selectedData} />
        ) : (
          <Text>No data available.</Text>
        )}
      </Modal>
    </div>
  );
}
