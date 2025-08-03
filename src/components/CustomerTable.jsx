import { Text, Modal, Button } from "@mantine/core";
import TableCom from "./Table";
import { GoDotFill } from "react-icons/go";
import { useState, useMemo } from "react";
import AppointmentDetails from "./AppointmentDetails";
import { handleConnectGoogle } from "../Hooks/GoogleCalendar";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({
  bookings,
  resecduleTimeLimit = 0,
  error,
  isLoading,
  setIsCurrentOwnerId,
  role,
}) {
  // Define the formatDate function
  function formatDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const navigate = useNavigate();

  //consoe.log("Bookings are", bookings);

  const sortedBookings = useMemo(() => {
    if (!bookings) return [];
    // newest createdAt first
    return [...bookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [bookings]);

  // Memoized table columns
  const columns = useMemo(
    () => [
      "",
      "Customer",
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
  //consoe.log(bookings);

  // Memoized data transformation
  const data = useMemo(() => {
    return sortedBookings?.map((booking) => ({
      "": (
        <GoDotFill
          size={30}
          color={booking.isSeen ? "green" : "red"}
          className="ml-[-10px]"
        />
      ),
      Customer: booking.name || "Guest",
      Professional: booking.professionalId?.name || "N/A",
      Location: booking.locationDetails?.name || "N/A",
      Price: `$${booking.totalPrice}`,
      Payment: <span className="capitalize">{booking.paymentMethod}</span>,
      Date: formatDate(booking.bookingDate),
      Time: `${booking.bookingTime} - ${booking.endTime}`,
      Status: (
        <Text
          px={"md"}
          className="!rounded-[3px] !font-[400] !capitalize !text-[14px] !w-fit   !text-center"
          bg={
            booking.status === "completed"
              ? "#A3E8AE"
              : booking.status === "cancelled"
                ? "#E8A3A3"
                : booking.status === "pending"
                  ? "#DDE8A3"
                  : booking.status === "scheduled"
                    ? "#DDE8A3"
                    : "gray"
          }
          c={
            booking.status === "completed"
              ? "#427B42"
              : booking.status === "cancelled"
                ? "#622929"
                : booking.status === "pending"
                  ? "#626229"
                  : booking.status === "scheduled"
                    ? "#626229"
                    : "gray"
          }
          weight={500}
        >
          {booking.status === "pending" ? "scheduled" : booking.status}
        </Text>
      ),
      __originalBooking: booking,
    }));
  }, [sortedBookings]);

  const handleSubmit = (rowData) => {
    if (role === "customer")
      setIsCurrentOwnerId(rowData?.__originalBooking?.organizationOwnerId);
    setSelectedData(rowData.__originalBooking);
    setIsPopupOpen(true);
  };

  //consoe.log("User Role is ", role);
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto w-full   ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col mb-4 sm:mb-0 sm:flex-row items-center justify-between  w-full">
          <Text className="!text-[18px] !py-4 !font-[400] lg:!text-[22px] lg:!font-[700] ">
            My Appointments
          </Text>

          {role === "customer" && (
            <Button
              bg="black"
              radius="md"
              px={"xl"}
              fw={"normal"}
              className="!text-[18px]  !font-[400] "
              onClick={() => {
                navigate("/");
              }}
            >
              Book Appointment
            </Button>
          )}
          {role === "barber" && (
            <Button
              bg={"black"}
              radius={"md"}
              px={"xl"}
              className="!text-[18px]  !font-[400]  "
              onClick={handleConnectGoogle}
            >
              Connect with Google
            </Button>
          )}
        </div>
      </div>

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
        radius={"lg"}
        classNames={{ title: "!text-xl !font-bold !capitalize" }}
        title="Booking Details"
        size="lg"
        centered
      >
        {selectedData ? (
          <AppointmentDetails
            booking={selectedData}
            setIsPopupOpen={setIsPopupOpen}
            resecduleTimeLimit={resecduleTimeLimit}
          />
        ) : (
          <Text>No data available.</Text>
        )}
      </Modal>
    </div>
  );
}
