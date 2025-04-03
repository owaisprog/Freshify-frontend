import { useRef, useState, useEffect } from "react";
import { ActionIcon } from "@mantine/core";
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

  useEffect(() => {
    setTimeValue(value);
  }, [value]);

  const handleTimeChange = (e) => {
    const newValue = e.target.value;
    setTimeValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
      disabled={disabled}
    >
      <CiClock2 size={18} />
    </ActionIcon>
  );

  return (
    <TimeInput
      label={label}
      ref={ref}
      value={timeValue}
      onChange={handleTimeChange}
      rightSection={pickerControl}
      disabled={disabled}
      required={required}
      error={error}
      styles={{
        input: {
          textAlign: "center",
          paddingRight: "36px",
        },
      }}
    />
  );
}
