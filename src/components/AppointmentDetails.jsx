import { Button, Text } from "@mantine/core";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import {
  useUpdateMutation,
  useUpdateMutationPut,
} from "../services/reactQuery";
import { toast } from "react-toastify";

export default function AppointmentDetails({ booking }) {
  // Extract fields from the booking object:
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
    // If you have additional fields like:
    // userId?.email, userId?.phone, services, etc.
  } = booking;
  console.log(name);
  const { mutate: updateBooking } = useUpdateMutationPut(["reschedule", _id]);

  // Format the date/time the way you like:
  const formattedDate = format(new Date(bookingDate), "yyyy-MM-dd");
  // Example: "4/15/2025" or "21-02-2025"
  const timeRange = bookingTime;
  // Or if you have start/end times, you can do: "09:00 - 10:00"

  function handleUpdate(booking) {
    console.log(booking);
    updateBooking(
      {
        endpoint: `/api/reschedule-booking/${booking._id}`,
        payload: {
          bookingTime: "14:00",
          bookingDate: "2025-04-20",
          bookingWeek: 17,
          professionalId: "608d1a2b3c4d5e6f7a8b9c0d",
        },
      },
      {
        onSuccess: () =>
          toast.success("Location Updated Successfully", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error Updated Location", { position: "top-center" }),
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

      {/* If you have user email */}
      {email && (
        <div className="flex items-center justify-between">
          <Text weight={600}>Email:</Text>
          <Text>{email}</Text>
        </div>
      )}

      {/* If you have user phone */}
      {phone && (
        <div className="flex items-center justify-between">
          <Text weight={600}>Phone:</Text>
          <Text>{phone}</Text>
        </div>
      )}

      {/* Location */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Location:</Text>
        <Text>{location?.name || location || "N/A"}</Text>
      </div>

      {/* If you have services array */}
      {/* Example: Haircut ($20), Beard Trim ($20) */}
      {/* 
          booking.services might be an array of objects like:
          [{ title: "Haircut", price: 20 }, { title: "Beard Trim", price: 20 }]
        */}
      {/* {booking.services && booking.services.length > 0 && (
          <div className="flex items-start justify-between">
            <Text weight={600}>Services:</Text>
            <div className="flex flex-col items-end">
              {booking.services.map((srv) => (
                <Text key={srv.title}>
                  {srv.title} (${srv.price})
                </Text>
              ))}
            </div>
          </div>
        )} */}

      {/* Payment */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Payment:</Text>
        <Text>
          {paymentMethod === "cash" ? "Paid In Cash" : paymentMethod || "N/A"}
        </Text>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Price:</Text>
        <Text>${totalPrice || "0"}</Text>
      </div>

      {/* Date */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Date:</Text>
        <Text>{formattedDate}</Text>
      </div>

      {/* Time */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Time:</Text>
        <Text>{timeRange}</Text>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Status:</Text>
        <StatusBadge status={status} />
      </div>

      {/* Action buttons (optional) */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          variant="outline"
          color="gray"
          onClick={() => handleUpdate(booking)}
        >
          Update
        </Button>
        <Button color="red">Delete</Button>
      </div>
    </div>
  );
}
