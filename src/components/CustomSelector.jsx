import { useState } from "react";
import { Select } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomSelect = ({ data, routes, defaultValue, onChange, ...props }) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value) => {
    setSelectedValue(value);

    if (onChange) {
      onChange(value); // ✅ Call external function if provided
    } else if (routes && routes[value]) {
      navigate(routes[value]); // ✅ Navigate if `routes` is given
    }
  };

  return (
    <Select
      data={data}
      value={selectedValue}
      onChange={handleChange}
      checkIconPosition="right"
      rightSection={<FaChevronDown size={14} color="black" />}
      styles={{
        input: {
          border: "none",
          borderBottom: "2px solid black", // ✅ Black bottom border only
          borderRadius: 0, // ✅ No border radius
          paddingRight: "2rem",
        },
      }}
      {...props}
    />
  );
};

export default CustomSelect;
