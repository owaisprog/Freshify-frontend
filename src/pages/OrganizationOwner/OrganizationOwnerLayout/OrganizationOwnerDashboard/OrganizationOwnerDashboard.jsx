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
    <main className="flex flex-col bg-[#F5F7FA] max-w-[1720px]  h-screen  ">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        bg={"#FFFFFF"}
        className="!roboto lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Dashboard
      </Title>

      <section className="h-full flex  mx-auto   justify-center p-6">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <DashboardCard stats={salesData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <DashboardCard stats={performerData} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 7 }}>
            <SalesChart />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <ProgressBar />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <DashboardCard stats={performerData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <DashboardCard stats={performerData} />
          </Grid.Col>
        </Grid>
      </section>
    </main>
  );
}
