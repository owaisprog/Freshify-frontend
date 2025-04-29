import { Button, Text } from "@mantine/core";
import StatusBadge from "./StatusBadge";
import { format, addMinutes, isAfter, addHours } from "date-fns";
import { useUpdateMutationPut, useQueryHook } from "../services/reactQuery";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import CalendarComp from "./CustomerCalendar";
import generateTimeSlots from "./booking/TimeSlotsGenerator";

export default function AppointmentDetails({
  booking,
  setIsPopupOpen,
  resecduleTimeLimit,
}) {
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
    createdAt,
    _id,
  } = booking;
  console.log(booking, "appotiment details");
  const [selectedDate, setSelectedDate] = useState(new Date(bookingDate));
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isGeneratingSlots, setIsGeneratingSlots] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { mutate: updateBooking, isPending: isLoadingUpdate } =
    useUpdateMutationPut(["reschedule", _id]);
  const { mutate: cancelBooking, isPending: isLoadingCancel } =
    useUpdateMutationPut(["bookings", _id]);

  // Check if 2 hours have passed from the booking time
  const isPastRescheduleWindow = useMemo(() => {
    if (!bookingDate || !bookingTime) return false;

    try {
      const bookingDateTime = new Date(createdAt);
      const currentDateTime = new Date();
      const rescheduleCutoff = addHours(bookingDateTime, resecduleTimeLimit);
      console.log(rescheduleCutoff);
      return isAfter(currentDateTime, rescheduleCutoff);
    } catch (error) {
      console.error("Error calculating reschedule window:", error);
      return false;
    }
  }, [bookingDate, createdAt, resecduleTimeLimit, bookingTime]);

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
    staleTime: 5 * 60 * 1000,
  });

  const unavailableSlots = useMemo(
    () =>
      unstableUnavailableSlots || { bookedSlots: [], unavailablePeriods: [] },
    [unstableUnavailableSlots]
  );

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = addMinutes(startDate, totalDuration);
    return format(endDate, "HH:mm");
  };

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
        const correctedSlots = slots?.map((val) => {
          if (val === "00:00") return "12:00";
          else if (val === "00:30") return "12:30";
          else return val;
        });

        setTimeSlots(correctedSlots);
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
    locationDetails?.workingHours,
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
          window.location.reload();
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

      <div className="flex items-center justify-between">
        <Text weight={600}>Professional:</Text>
        <Text>{professionalId?.name || "N/A"}</Text>
      </div>

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
        <Text>{locationDetails?.name || "N/A"}</Text>
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

      {/* Only show rescheduling section if within the 2-hour window */}
      {!isPastRescheduleWindow && (
        <div className="pt-4 border-t mt-4">
          <Text weight={600} className="mb-2">
            Reschedule Appointment:
          </Text>

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
      )}

      <div className="flex items-center justify-between">
        <Text weight={600}>Status:</Text>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-2 mt-6">
        <Button
          color="#427B42"
          fullWidth
          radius={"md"}
          onClick={handleUpdate}
          loading={isLoadingUpdate}
          loaderProps={{ type: "bars" }}
          disabled={!selectedDate || !selectedTime || isPastRescheduleWindow}
        >
          {isPastRescheduleWindow
            ? "Reschedule Window Expired"
            : "Update Booking"}
        </Button>
        <Button
          fullWidth
          radius={"md"}
          color="#622929"
          onClick={handleCancelBooking}
          loading={isLoadingCancel}
          loaderProps={{ type: "bars" }}
          disabled={isPastRescheduleWindow && status === "completed"}
        >
          Cancel Booking
        </Button>
      </div>
    </div>
  );
}

function getWeekInMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const offset = firstDayOfWeek < 1 ? 6 : firstDayOfWeek - 1;
  return Math.ceil((date.getDate() + offset) / 7);
}
