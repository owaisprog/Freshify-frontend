import { useState } from "react";
import { Select } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({
  data,
  defaultValue,
  onChange,
  backgroundColor = "white",
  allowDeselect = false,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value) => {
    setSelectedValue(value);

    // Make sure to pass the `value` (string) instead of `label`
    if (onChange) {
      onChange(value); // This should pass the value (1, 2, 3) not the label
    }
  };

  return (
    <Select
      data={data}
      value={selectedValue}
      onChange={handleChange}
      allowDeselect={allowDeselect}
      checkIconPosition="right"
      rightSection={<FaChevronDown size={14} color="black" />}
      styles={{
        input: {
          border: "none",
          borderBottom: "2px solid black",
          borderRadius: 0,
          paddingRight: "2rem",
          backgroundColor: backgroundColor,
        },
      }}
      {...props}
    />
  );
};

export default CustomSelect;
