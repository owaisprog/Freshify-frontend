import { Progress, Text, Title } from "@mantine/core";

import SalesChart from "../../../../components/SalesChart";

export default function SuperAdminDashboard() {
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] max-w-[1720px]  min-h-screen  ">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Dashboard
      </Title>

      <Title
        px={"xl"}
        py={"sm"}
        className="!grid !min-h-[80vh] items-center place-self-center"
        c={"black"}
      >
        Welcom Customer
      </Title>
      {/* First Section  */}
    </main>
  );
}
