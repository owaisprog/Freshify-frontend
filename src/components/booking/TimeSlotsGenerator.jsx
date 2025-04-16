import {
  format,
  addMinutes,
  setHours,
  setMinutes,
  isAfter,
  isBefore,
} from "date-fns";

export default function generateTimeSlots({
  openingTime = "09:00",
  closingTime,
  slotInterval = 30,
  serviceDuration,
  blockedSlots = [],
  date = new Date(),
}) {
  // Validate inputs
  if (!closingTime || !serviceDuration) {
    throw new Error("Missing required parameters");
  }

  const openingDate = parseTimeToDate(date, openingTime);
  const closingDate = parseTimeToDate(date, closingTime);

  // Check if the date is today
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Process blocked slots
  const blockedIntervals = (Array.isArray(blockedSlots) ? blockedSlots : [])
    .map((slot) => {
      try {
        const [start, end] = slot.split("-");
        if (!start || !end) return null;
        return {
          start: parseTimeToDate(date, start),
          end: parseTimeToDate(date, end),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const availableSlots = [];
  let currentSlot = openingDate;

  // If it's today, adjust the starting time to current time
  if (isToday) {
    const now = new Date();
    // Find the next slot after current time with buffer
    while (isBefore(currentSlot, now)) {
      currentSlot = addMinutes(currentSlot, slotInterval);
    }
  }

  const lastPossibleStart = addMinutes(closingDate, -serviceDuration);

  // Generate all possible slots
  while (
    isBefore(currentSlot, lastPossibleStart) ||
    currentSlot.getTime() === lastPossibleStart.getTime()
  ) {
    const slotEnd = addMinutes(currentSlot, serviceDuration);

    // Check if this slot overlaps with any blocked time
    const isBlocked = blockedIntervals.some((blocked) => {
      return (
        (isBefore(currentSlot, blocked.end) &&
          isAfter(slotEnd, blocked.start)) ||
        currentSlot.getTime() === blocked.start.getTime()
      );
    });

    if (!isBlocked) {
      availableSlots.push(format(currentSlot, "HH:mm"));
    }

    currentSlot = addMinutes(currentSlot, slotInterval);
  }

  return availableSlots;
}

function parseTimeToDate(baseDate, timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`Invalid time format: ${timeString}`);
  }

  let date = new Date(baseDate);
  date = setHours(date, hours);
  date = setMinutes(date, minutes);
  return date;
}
