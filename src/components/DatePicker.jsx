import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function DatePickerCalendar({ value, onChange, popoverMode = false }) {
  const today = new Date();
  const endOfNextMonth = new Date();
  endOfNextMonth.setMonth(today.getMonth() + 2, 0);

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      minDate={today}
      maxDate={endOfNextMonth}
      defaultDate={value}
      numberOfMonths={popoverMode ? 1 : 2}
      hideOutsideDates={!popoverMode}
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
        ...(!popoverMode && {
          month: {
            borderRight: "1px solid lightgray",
            "&:last-of-type": {
              borderRight: "none",
            },
          },
        }),
      }}
    />
  );
}

export default DatePickerCalendar;
