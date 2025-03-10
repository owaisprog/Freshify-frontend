import { BarChart } from "@mantine/charts";

const data = [
  { day: "MON", Haircut: "1200", Beard_Trim: 900, Hairstyling: 200 },
  { day: "TUE", Haircut: 1900, Beard_Trim: 1200, Hairstyling: 400 },
  { day: "WED", Haircut: 400, Beard_Trim: 1000, Hairstyling: 200 },
  { day: "THU", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { day: "FRI", Haircut: 1000, Beard_Trim: 200, Hairstyling: 800 },
  { day: "SAT", Haircut: 800, Beard_Trim: 1400, Hairstyling: 1200 },
  { day: "SUN", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
];

export default function WeeklyChart() {
  return (
    <section className="  text-white ">
      <BarChart
        textColor="white"
        data={data}
        h={250}
        dataKey="day"
        withLegend
        legendProps={{
          verticalAlign: "bottom",
          height: 50,
        }}
        series={[
          { name: "Haircut", color: "blue" },
          { name: "Beard_Trim", color: "green" },
          { name: "Hairstyling", color: "red" },
        ]}
      />
    </section>
  );
}
