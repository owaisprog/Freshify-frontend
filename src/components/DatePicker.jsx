// DatePickerCalendar.jsx
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function DatePickerCalendar({ value, onChange, popoverMode = false }) {
  const today = new Date();
  const endOfNextMonth = new Date();
  // last day of next month
  endOfNextMonth.setMonth(today.getMonth() + 2, 0);

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      minDate={today}
      maxDate={endOfNextMonth}
      defaultDate={value}
      hideOutsideDates={!popoverMode}
      /** Disable days before today */
      getDayProps={(date) => ({
        disabled: date < new Date(new Date().setHours(0, 0, 0, 0)),
      })}
      /** ✔ No more nested selectors */
      styles={{
        /* Day cell – react to disabled state that Mantine passes in 3rd arg */
        day: (_theme, _params, { disabled }) => ({
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }),

        /* Month container – add a divider only when showing two months */
        month: (_theme, _params, ctx) =>
          !popoverMode && !ctx.lastInRow
            ? { borderRight: "1px solid lightgray" }
            : undefined,
      }}
    />
  );
}

export default DatePickerCalendar;
