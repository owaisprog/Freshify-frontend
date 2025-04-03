import { Card, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";

export default function SalesChart({ WeeklyLocationSales }) {
  // Extract location names from the first data entry (excluding 'day' and '123')
  const locationKeys =
    WeeklyLocationSales?.length > 0
      ? Object.keys(WeeklyLocationSales[0]).filter(
          (key) => !["day", "123"].includes(key)
        )
      : [];

  // Color palette for different locations
  const colorsPalette = [
    "#71BF7D", // First location color
    "#000000", // Second location color
    "#FF5733", // Additional colors
    "#33FF57",
    "#3357FF",
    "#F333FF",
  ];

  if (!WeeklyLocationSales?.length || locationKeys.length === 0) {
    return (
      <Card
        shadow="sm"
        radius="25px"
        className="flex items-center justify-center h-[322px] rounded-[25px] specialBorder"
      >
        <Text size="lg" color="dimmed">
          No sales data available
        </Text>
      </Card>
    );
  }
  return (
    <Card
      shadow="sm"
      radius={"25px"}
      className={`${WeeklyLocationSales?.length > 0 ? "flex" : "opacity-0"} lg:h-[325px]  rounded-[25px] specialBorder`}
    >
      <div className="flex w-full justify-end p-4 space-x-6">
        {/* Dynamic Legend */}
        {locationKeys.map((location, index) => (
          <div key={location} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: colorsPalette[index % colorsPalette.length],
              }}
            ></span>
            <span className="text-gray-800 font-medium">
              {location.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>

      <BarChart
        data={WeeklyLocationSales}
        barProps={{ radius: 30 }}
        dataKey="day"
        className="h-[215px]"
        strokeDasharray="0 0"
        barChartProps={{ barCategoryGap: "0%" }}
        maxBarWidth={12}
        series={locationKeys.map((location, index) => ({
          name: location,
          color: colorsPalette[index % colorsPalette.length],
        }))}
      />
    </Card>
  );
}
