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

  // Check if the date is today
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Ensure blockedSlots is always an array before mapping
  const safeBlockedSlots = Array.isArray(blockedSlots) ? blockedSlots : [];
  const blockedIntervals = safeBlockedSlots.map((slot) => {
    const [start, end] = slot.split("-");
    return {
      start: parseTimeToDate(date, start),
      end: parseTimeToDate(date, end),
    };
  });

  const availableSlots = [];
  let currentSlot = openingDate;

  // If it's today, adjust the starting time to current time
  if (isToday) {
    const now = new Date();
    // Find the next slot after current time
    while (currentSlot < now) {
      currentSlot = addMinutes(currentSlot, slotInterval);
    }
  }

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
