import { Text, Modal } from "@mantine/core";
import { BsDot } from "react-icons/bs";
import TableCom from "./Table";
import { useState } from "react";
import AppointmentDetails from "./AppointmentDetails";

export default function CustomerTable({ bookings, error, isLoading }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // Re-enable this

  // Table columns
  const columns = [
    "",
    "Customer Name",
    "Professional",
    "Location",
    "Price",
    "Payment",
    "Date",
    "Time",
    "Status",
  ];
  console.log(bookings);

  // Transform bookings data for the table
  const data = bookings?.map((booking) => ({
    // Status dot
    "": (
      <BsDot
        size={24}
        color={booking.isSeen ? "green" : "red"}
        className="ml-[-10px]"
      />
    ),
    "Customer Name": booking.name || "Guest",
    Professional: booking.professionalId?.name || "N/A",
    Location: booking.location?.name || booking.location || "N/A",
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
    // Keep the raw booking data if you like, for easy access inside handleSubmit
    __originalBooking: booking,
  }));

  // When a row is clicked (or when user triggers "View details" action):
  function handleSubmit(rowData) {
    // rowData is the formatted row for your table,
    // which includes the raw booking in rowData.__originalBooking
    console.log(rowData);
    setSelectedData(rowData.__originalBooking);
    setIsPopupOpen(true);
  }

  return (
    <div className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] min-h-screen p-6">
      <Text className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700] mb-6">
        All Bookings
      </Text>

      {/* Table */}
      <TableCom
        data={data}
        error={error}
        columns={columns}
        isLoading={isLoading}
        handleFunction={handleSubmit}
      />

      {/* Custom Popup */}
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
