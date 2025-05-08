import { Text } from "@mantine/core";

export default function StatusBadge({ status }) {
  let bgColor = "#DDE8A3";
  let textColor = "#626229";

  if (status === "completed") {
    bgColor = "#A3E8AE";
    textColor = "#427B42";
  } else if (status === "cancelled") {
    bgColor = "#E8A3A3";
    textColor = "#622929";
  } else if (status === "pending") {
    bgColor = "#0000FF";
    textColor = "#626229";
  }

  return (
    <Text
      px={"md"}
      className="!rounded-[3px] !font-[400] !capitalize !text-[14px] !w-fit   !text-center"
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
