import { useState } from "react";
import { Select } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomSelect = ({
  data,
  routes,
  defaultValue,
  onChange,
  backgroundColor = "white",
  allowDeselect = false, // New prop
  ...props
}) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value) => {
    setSelectedValue(value);

    if (onChange) {
      onChange(value);
    } else if (routes && routes[value]) {
      navigate(routes[value]);
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
