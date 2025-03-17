import { Grid, Title } from "@mantine/core";

import SalesChart from "../../../../components/SalesChart";
import ProgressBar from "../../../../components/ProgressBar";
import DashboardCard from "../../../../components/DashBoardCard";

export default function OrganizationOwnerDashboard() {
  const salesData = [
    {
      title: "Total Sales",
      icon: "📊",
      amount: "$12,996",
      bgColor: "bg-blue-500",
    },
    {
      title: "Average Sales",
      icon: "💰",
      amount: "$75",
      bgColor: "bg-green-500",
    },
  ];
  const performerData = [
    {
      title: "Ahmed",
      icon: "📊",
      amount: "$12,996",
      bgColor: "bg-blue-500",
    },
    {
      title: "Ali",
      icon: "💰",
      amount: "$75",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <main className="flex flex-col bg-[#F5F7FA]  h-screen  ">
      <Title
        fz={"h2"}
        px={"lg"}
        py={"sm"}
        c={"black"}
        bg={"#FFFFFF"}
        fw={"bold"}
        className="!roboto "
      >
        Dashboard
      </Title>

      <section className="h-full flex w-[90%] mx-auto  max-w-[1723px] justify-center">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <h1 className="font-roboto font-bold text-[22px]  leading-[100%] pb-4">
              Sales
            </h1>
            <DashboardCard stats={salesData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <h1 className="font-roboto font-bold text-[22px] leading-[100%] pb-4">
              Top Performer
            </h1>

            <DashboardCard stats={performerData} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <h1 className="font-roboto font-bold text-[22px] leading-[100%] pb-4">
              Weekly Sales{" "}
            </h1>

            <SalesChart />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <h1 className="font-roboto font-bold text-[22px] leading-[100%] pb-4">
              Popular Service{" "}
            </h1>

            <ProgressBar />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <h1 className="font-roboto font-bold text-[22px] leading-[100%] pb-4">
              Orders{" "}
            </h1>

            <DashboardCard stats={performerData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <h1 className="font-roboto font-bold text-[22px] leading-[100%] pb-4">
              All Locations By Users{" "}
            </h1>

            <DashboardCard stats={performerData} />
          </Grid.Col>
        </Grid>
      </section>
    </main>
  );
}
