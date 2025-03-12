import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

export default function Tab({ path, text }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Tabs.Tab
      value={path}
      onClick={() => navigate(path)} // ✅ Navigate on click
      style={{
        color: location.pathname === path ? "black" : "#718EBF",
        borderBottom: location.pathname === path ? "2px solid black" : "none",
      }}
    >
      {text}
    </Tabs.Tab>
  );
}
