import { Box, Text } from "@mantine/core";

// Create Context for TabCard

// **Parent Component**
export default function TabCard({ children }) {
  return (
    <Box className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl w-full">
      {children}
    </Box>
  );
}

// **Profile Component**
TabCard.Profile = function Profile({ children, backGround }) {
  return (
    <div
      className={`${backGround} flex justify-center items-center rounded-[45%] w-16 h-16`}
    >
      {children}
    </div>
  );
};

// **Text Content Component (Title & Name)**
TabCard.TextContent = function TextContent({ title, name }) {
  return (
    <Box className="ml-3">
      <Text size="md" c="dark">
        {title}
      </Text>
      <Text size="xs" c="#333B69">
        {name}
      </Text>
    </Box>
  );
};

// **Amount Display Component**
TabCard.Amount = function Amount({ amount }) {
  return (
    <Text fw={700} size="lg" c="dark">{`${amount.toLocaleString()}`}</Text>
  );
};
