import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function DatePickerCalendar({ value, onChange }) {
  const today = new Date();

  // Calculate the last day of next month
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(today.getMonth() + 2, 0);

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      minDate={today}
      maxDate={endOfNextMonth}
      defaultDate={today}
      numberOfMonths={2}
      hideOutsideDates
      getDayProps={(date) => ({
        disabled: date < new Date(new Date().setHours(0, 0, 0, 0)),
      })}
      styles={{
        day: {
          "&[data-disabled]": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        },
        month: {
          borderRight: "1px solid lightgray",
          "&:last-of-type": {
            borderRight: "none",
          },
        },
      }}
    />
  );
}

export default DatePickerCalendar;
