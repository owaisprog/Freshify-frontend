import { BarChart } from "@mantine/charts";

const data = [
  { year: "2020", Haircut: 1200, Beard_Trim: 900, Hairstyling: 200 },
  { year: "2021", Haircut: 1900, Beard_Trim: 1200, Hairstyling: 400 },
  { year: "2022", Haircut: 400, Beard_Trim: 1000, Hairstyling: 200 },
  { year: "2023", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { year: "2024", Haircut: 1000, Beard_Trim: 200, Hairstyling: 800 },
  { year: "2025", Haircut: 800, Beard_Trim: 1400, Hairstyling: 1200 },
];

export default function YearlyChart() {
  return (
    <section className="  text-white">
      <BarChart
        textColor="white"
        data={data}
        h={250}
        dataKey="year"
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
