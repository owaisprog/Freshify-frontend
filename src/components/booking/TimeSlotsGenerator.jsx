import {
  format,
  addMinutes,
  setHours,
  setMinutes,
  isAfter,
  isBefore,
  isEqual,
  differenceInMinutes,
} from "date-fns";

export default function generateTimeSlots({
  openingTime = "09:00",
  closingTime,
  slotInterval = 30,
  serviceDuration,
  blockedSlots = [],
  date = new Date(),
}) {
  if (!closingTime || !serviceDuration) {
    throw new Error("Missing required parameters");
  }

  const openingDate = parseTimeToDate(date, openingTime);
  const closingDate = parseTimeToDate(date, closingTime);

  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  let effectiveStart = openingDate;
  if (isToday) {
    const now = new Date();
    if (isAfter(now, openingDate)) {
      effectiveStart = now;
    }
  }

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
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);

  // Merge overlapping blocked intervals
  const mergedBlocks = [];
  for (const interval of blockedIntervals) {
    if (
      mergedBlocks.length === 0 ||
      mergedBlocks[mergedBlocks.length - 1].end < interval.start
    ) {
      mergedBlocks.push(interval);
    } else {
      mergedBlocks[mergedBlocks.length - 1].end = new Date(
        Math.max(mergedBlocks[mergedBlocks.length - 1].end, interval.end)
      );
    }
  }

  // Calculate free intervals
  const freeIntervals = [];
  let currentStart = effectiveStart;

  for (const block of mergedBlocks) {
    if (isBefore(currentStart, block.start)) {
      freeIntervals.push({ start: currentStart, end: block.start });
    }
    currentStart = new Date(Math.max(currentStart, block.end));
  }

  if (isBefore(currentStart, closingDate)) {
    freeIntervals.push({ start: currentStart, end: closingDate });
  }

  // Generate slots in each free interval
  const availableSlots = [];

  for (const free of freeIntervals) {
    const freeDuration = differenceInMinutes(free.end, free.start);
    if (freeDuration < serviceDuration) continue;

    let currentSlot = free.start;
    const lastPossibleStart = addMinutes(free.end, -serviceDuration);

    while (
      isBefore(currentSlot, lastPossibleStart) ||
      isEqual(currentSlot, lastPossibleStart)
    ) {
      availableSlots.push(format(currentSlot, "HH:mm"));
      currentSlot = addMinutes(currentSlot, slotInterval);
    }
  }

  return availableSlots;
}

function parseTimeToDate(baseDate, timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`Invalid time format: ${timeString}`);
  }

  let dateObj = new Date(baseDate);
  dateObj = setHours(dateObj, hours);
  dateObj = setMinutes(dateObj, minutes);
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  return dateObj;
}
