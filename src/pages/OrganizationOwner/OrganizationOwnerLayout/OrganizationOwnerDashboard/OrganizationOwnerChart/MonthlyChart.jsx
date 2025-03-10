import { BarChart } from "@mantine/charts";

const data = [
  { month: "JAN", Haircut: 1200, Beard_Trim: 900, Hairstyling: 200 },
  { month: "FEB", Haircut: 1900, Beard_Trim: 1200, Hairstyling: 400 },
  { month: "MAR", Haircut: 400, Beard_Trim: 1000, Hairstyling: 200 },
  { month: "APR", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "MAY", Haircut: 1000, Beard_Trim: 200, Hairstyling: 800 },
  { month: "JUN", Haircut: 800, Beard_Trim: 1400, Hairstyling: 1200 },
  { month: "JUL", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "AUG", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "SEP", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "OCT", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "NOV", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
  { month: "DEC", Haircut: 750, Beard_Trim: 600, Hairstyling: 1000 },
];

export default function MonthlyChart() {
  return (
    <section className="  text-white ">
      <BarChart
        textColor="white"
        data={data}
        dataKey="month"
        h={250}
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
