import { useRef, useState, useEffect } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { CiClock2 } from "react-icons/ci";
import { TimeInput } from "@mantine/dates";

export default function TimePicker({
  label,
  value = "",
  onChange,
  disabled = false,
  required = false,
  error = null,
}) {
  const ref = useRef(null);
  const [timeValue, setTimeValue] = useState(value);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  useEffect(() => {
    setTimeValue(value);
  }, [value]);

  const handleTimeChange = (newValue) => {
    setTimeValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Convert 24-hour time to 12-hour format for display
  const formatTimeForDisplay = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Generate time options with 30-minute intervals in 12-hour format
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        const displayString = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        options.push(
          <Menu.Item
            key={timeString}
            onClick={() => handleTimeChange(timeString)}
          >
            {displayString}
          </Menu.Item>
        );
      }
    }
    return options;
  };

  const pickerControl = (
    <Menu
      position="bottom-end"
      width={120}
      opened={dropdownOpened}
      onChange={setDropdownOpened}
    >
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => setDropdownOpened((o) => !o)}
          disabled={disabled}
        >
          <CiClock2 size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown style={{ maxHeight: 200, overflowY: "auto" }}>
        {generateTimeOptions()}
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      <TimeInput
        label={label}
        ref={ref}
        value={timeValue}
        readOnly
        onChange={(e) => handleTimeChange(e.target.value)}
        rightSection={pickerControl}
        disabled={disabled}
        required={required}
        // minutesStep={30}
        step={30}
        format="12h" // This affects the input display format
        error={error}
        styles={{
          input: {
            textAlign: "center",
            paddingRight: "36px",
          },
        }}
      />
    </>
  );
}
