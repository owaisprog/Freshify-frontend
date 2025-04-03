import {
  format,
  // parse,
  addMinutes,
  isWithinInterval,
  setHours,
  setMinutes,
} from "date-fns";

export default function generateTimeSlots({
  openingTime = "09:00",
  closingTime,
  slotInterval = 30,
  serviceDuration,
  blockedSlots = [],
  date = new Date(),
}) {
  // Parse opening and closing times
  const openingDate = parseTimeToDate(date, openingTime);
  const closingDate = parseTimeToDate(date, closingTime);

  // Parse blocked slots into Date intervals
  const blockedIntervals = blockedSlots.map((slot) => {
    const [start, end] = slot.split("-");
    return {
      start: parseTimeToDate(date, start),
      end: parseTimeToDate(date, end),
    };
  });

  const availableSlots = [];
  let currentSlot = openingDate;
  const lastPossibleStart = addMinutes(closingDate, -serviceDuration);

  // Generate all possible slots
  while (currentSlot <= lastPossibleStart) {
    const slotEnd = addMinutes(currentSlot, serviceDuration);

    // Check if this slot overlaps with any blocked time
    const isBlocked = blockedIntervals.some(
      (blocked) =>
        isWithinInterval(currentSlot, {
          start: blocked.start,
          end: blocked.end,
        }) ||
        isWithinInterval(slotEnd, { start: blocked.start, end: blocked.end }) ||
        (currentSlot <= blocked.start && slotEnd >= blocked.end)
    );

    if (!isBlocked) {
      availableSlots.push(format(currentSlot, "h:mm a"));
    }

    currentSlot = addMinutes(currentSlot, slotInterval);
  }

  return availableSlots;
}

// Helper function to parse time string into Date object
function parseTimeToDate(baseDate, timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  let date = new Date(baseDate);
  date = setHours(date, hours);
  date = setMinutes(date, minutes);
  return date;
}
