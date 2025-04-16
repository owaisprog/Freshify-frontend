import { Button, Text, Popover } from "@mantine/core";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { useUpdateMutationPut } from "../services/reactQuery";
import { toast } from "react-toastify";
import DatePickerCalendar from "./DatePicker";
import { useState } from "react";

export default function AppointmentDetails({ booking }) {
  const {
    name,
    professionalId,
    paymentMethod,
    location,
    totalPrice,
    bookingDate,
    bookingTime,
    status,
    email,
    phone,
    _id,
  } = booking;

  const [selectedDate, setSelectedDate] = useState(new Date(bookingDate));
  const [opened, setOpened] = useState(false);

  const { mutate: updateBooking } = useUpdateMutationPut(["reschedule", _id]);
  const { mutate: cancelBooking } = useUpdateMutationPut(["bookings", _id]);

  // const formattedDate = format(new Date(bookingDate), "yyyy-MM-dd");
  const timeRange = bookingTime;

  function handleDateChange(date) {
    setSelectedDate(date);
    setOpened(false);
  }

  function handleUpdate() {
    updateBooking(
      {
        endpoint: `/api/reschedule-booking/${_id}`,
        payload: {
          bookingTime: bookingTime,
          bookingDate: format(selectedDate, "yyyy-MM-dd"),
          bookingWeek: getWeekInMonth(selectedDate), // Using month-based week number
          // professionalId: professionalId._id || professionalId,
        },
      },
      {
        onSuccess: () =>
          toast.success("Booking Updated Successfully", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error Updating Booking", { position: "top-center" }),
      }
    );
  }

  function handleCancelBooking(data) {
    console.log(data);
    cancelBooking(
      {
        endpoint: `/api/cancel-booking/${_id}`,
      },
      {
        onSuccess: () => {
          toast.success("Cancel Updated Successfully", {
            position: "top-center",
          });
          setOpened(false);
          window.location.reload();
        },
        onError: () =>
          toast.error("Error Cancel Booking", { position: "top-center" }),
      }
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Heading */}
      <Text className="text-lg font-bold mb-2">Appointment Details</Text>

      {/* Professional */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Professional:</Text>
        <Text>{professionalId?.name || "N/A"}</Text>
      </div>

      {/* Customer */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Customer:</Text>
        <Text>{name}</Text>
      </div>

      {email && (
        <div className="flex items-center justify-between">
          <Text weight={600}>Email:</Text>
          <Text>{email}</Text>
        </div>
      )}

      {phone && (
        <div className="flex items-center justify-between">
          <Text weight={600}>Phone:</Text>
          <Text>{phone}</Text>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Text weight={600}>Location:</Text>
        <Text>{location?.name || location || "N/A"}</Text>
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Payment:</Text>
        <Text>
          {paymentMethod === "cash" ? "Paid In Cash" : paymentMethod || "N/A"}
        </Text>
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Price:</Text>
        <Text>${totalPrice || "0"}</Text>
      </div>

      {/* Date with Popover */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Date:</Text>
        <Popover
          opened={opened}
          onChange={setOpened}
          position="bottom"
          withArrow
          shadow="md"
          width={300}
        >
          <Popover.Target>
            <Button
              variant="outline"
              onClick={() => setOpened((o) => !o)}
              styles={{
                root: {
                  padding: "0 10px",
                  height: 36,
                },
              }}
            >
              {format(selectedDate, "MMM dd, yyyy")}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePickerCalendar
              value={selectedDate}
              onChange={handleDateChange}
              popoverMode={true}
            />
          </Popover.Dropdown>
        </Popover>
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Time:</Text>
        <Text>{timeRange}</Text>
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Status:</Text>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button variant="outline" color="gray" onClick={handleUpdate}>
          Update
        </Button>
        <Button color="red" onClick={() => handleCancelBooking(booking)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

// Returns week number within the month (1-5 or 6)
function getWeekInMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  // This version considers Monday as the first day of the week
  const offset = firstDayOfWeek < 1 ? 6 : firstDayOfWeek - 1;

  const weekNumber = Math.ceil((date.getDate() + offset) / 7);

  // For debugging:
  console.log(
    `Date: ${date.getDate()}, Month Start Day: ${firstDayOfWeek}, Offset: ${offset}, Week: ${weekNumber}`
  );

  return weekNumber;
}
