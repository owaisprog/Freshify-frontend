import { Text } from "@mantine/core";

export default function StatusBadge({ status }) {
  let bgColor = "gray";
  let textColor = "white";

  if (status === "completed") {
    bgColor = "#A3E8AE";
    textColor = "#427B42";
  } else if (status === "cancelled") {
    bgColor = "red";
    textColor = "white";
  } else if (status === "pending") {
    bgColor = "orange";
    textColor = "white";
  }

  return (
    <Text
      className="rounded-[3px] !p-[4px]"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      weight={500}
    >
      {status}
    </Text>
  );
}
