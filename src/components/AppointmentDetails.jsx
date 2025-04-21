import { Button, Text } from "@mantine/core";
import StatusBadge from "./StatusBadge";
import { format, addMinutes } from "date-fns";
import { useUpdateMutationPut, useQueryHook } from "../services/reactQuery";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import CalendarComp from "./CustomerCalendar";
import generateTimeSlots from "./booking/TimeSlotsGenerator";

export default function AppointmentDetails({ booking, setIsPopupOpen }) {
  const {
    name,
    professionalId,
    paymentMethod,
    location,
    totalPrice,
    bookingDate,
    bookingTime,
    endTime,
    status,
    email,
    phone,
    locationDetails,
    totalDuration,
    _id,
  } = booking;

  const [selectedDate, setSelectedDate] = useState(new Date(bookingDate));
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isGeneratingSlots, setIsGeneratingSlots] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { mutate: updateBooking } = useUpdateMutationPut(["reschedule", _id]);
  const { mutate: cancelBooking } = useUpdateMutationPut(["bookings", _id]);

  // Fetch unavailable slots
  // Inside AppointmentDetails component

  // Fetch unavailable slots
  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const {
    data: unstableUnavailableSlots,
    isLoading: isLoadingSlots,
    refetch: refetchSlots,
  } = useQueryHook({
    queryKey: ["unavailable", formattedDate, professionalId?._id],
    endpoint: formattedDate
      ? `/api/unavailable-slots/${professionalId?._id}/${formattedDate}`
      : null,
    enabled: !!formattedDate,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes to reduce refetches
  });

  // Memoize unavailableSlots to stabilize the object
  const unavailableSlots = useMemo(
    () =>
      unstableUnavailableSlots || { bookedSlots: [], unavailablePeriods: [] },
    [unstableUnavailableSlots]
  );

  // Calculate total duration from services
  // const calculateTotalDuration = () => {
  //   return (
  //     services?.reduce(
  //       (total, service) => total + (service.duration || 0),
  //       0
  //     ) ||
  //     (new Date(`1970-01-01T${endTime}`) -
  //       new Date(`1970-01-01T${bookingTime}`)) /
  //       (1000 * 60)
  //   );
  // };

  // Calculate end time based on selected time and duration
  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = addMinutes(startDate, totalDuration);
    return format(endDate, "HH:mm");
  };

  // Generate available slots when date or unavailable slots change
  useEffect(() => {
    const generateAvailableSlots = async () => {
      if (!selectedDate || !locationDetails?.workingHours) return;

      setIsGeneratingSlots(true);
      try {
        const dayName = format(selectedDate, "EEEE").toLowerCase();
        const workingDay = locationDetails.workingHours.find(
          (val) => val.day.toLowerCase() === dayName
        );

        if (!workingDay) {
          setTimeSlots([]);
          return;
        }

        // Combine booked slots and unavailable periods
        const blockedSlots = [
          ...(unavailableSlots.bookedSlots || []),
          ...(unavailableSlots.unavailablePeriods || []),
        ]
          .map((slot) => {
            if (!slot?.startTime || !slot?.endTime) return null;
            return `${slot.startTime}-${slot.endTime}`;
          })
          .filter(Boolean);

        const slots = generateTimeSlots({
          openingTime: workingDay.start,
          closingTime: workingDay.end,
          serviceDuration: totalDuration,
          blockedSlots,
          date: selectedDate,
        });

        setTimeSlots(slots);
      } catch (error) {
        console.error("Error generating slots:", error);
        setTimeSlots([]);
      } finally {
        setIsGeneratingSlots(false);
      }
    };

    generateAvailableSlots();
  }, [
    selectedDate,
    unavailableSlots,
    locationDetails.workingHours,
    totalDuration,
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsCalendarOpen(false);
    refetchSlots();
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleUpdate = () => {
    if (!selectedDate || !selectedTime) return;

    updateBooking(
      {
        endpoint: `/api/reschedule-booking/${_id}`,
        payload: {
          bookingTime: selectedTime,
          bookingDate: format(selectedDate, "yyyy-MM-dd"),
          bookingWeek: getWeekInMonth(selectedDate),
          endTime: calculateEndTime(selectedTime),
          professionalId: professionalId._id || professionalId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Booking rescheduled successfully");
          // window.location.reload();
          setIsPopupOpen(false);
        },
        onError: () => {
          toast.error("Failed to reschedule booking");
        },
      }
    );
  };

  const handleCancelBooking = () => {
    cancelBooking(
      {
        endpoint: `/api/cancel-booking/${_id}`,
      },
      {
        onSuccess: () => {
          toast.success("Booking cancelled successfully");
          window.location.reload();
        },
        onError: () => {
          toast.error("Failed to cancel booking");
        },
      }
    );
  };

  return (
    <div className="flex flex-col space-y-4">
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

      {/* Current Booking Info */}
      <div className="flex items-center justify-between">
        <Text weight={600}>Current Date:</Text>
        <Text>{format(new Date(bookingDate), "MMM dd, yyyy")}</Text>
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Current Time:</Text>
        <Text>
          {bookingTime} - {endTime}
        </Text>
      </div>

      {/* Rescheduling Section */}
      <div className="pt-4 border-t mt-4">
        <Text weight={600} className="mb-2">
          Reschedule Appointment:
        </Text>

        {/* Calendar */}
        <div className="mb-4">
          <Button
            color="dark"
            variant="outline"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="mb-2"
          >
            {selectedDate
              ? format(selectedDate, "MMM dd, yyyy")
              : "Select Date"}
          </Button>

          {isCalendarOpen && (
            <div className="border rounded-lg p-4">
              <CalendarComp
                onClickDay={handleDateSelect}
                selectedDay={selectedDate?.toDateString()}
                workingHours={location?.workingHours}
              />
            </div>
          )}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="mb-4">
            <Text weight={600} className="mb-2">
              Available Time Slots:
            </Text>

            {isGeneratingSlots || isLoadingSlots ? (
              <Text>Loading available slots...</Text>
            ) : timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    color="dark"
                    variant={selectedTime === time ? "filled" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className="!p-1 !text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <Text>No available slots for this date</Text>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Text weight={600}>Status:</Text>
        <StatusBadge status={status} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center  gap-2 mt-6">
        <Button
          color="#427B42"
          fullWidth
          radius={"md"}
          onClick={handleUpdate}
          disabled={!selectedDate || !selectedTime}
        >
          Update Booking
        </Button>
        <Button
          fullWidth
          radius={"md"}
          color="#622929"
          onClick={handleCancelBooking}
        >
          Cancel Booking
        </Button>
      </div>
    </div>
  );
}

// Returns week number within the month (1-6)
function getWeekInMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  // This version considers Monday as the first day of the week
  const offset = firstDayOfWeek < 1 ? 6 : firstDayOfWeek - 1;

  return Math.ceil((date.getDate() + offset) / 7);
}
