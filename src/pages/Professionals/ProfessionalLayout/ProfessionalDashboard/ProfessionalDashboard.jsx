import { Title } from "@mantine/core";

export default function ProfessionalDashboard() {
  const data = JSON.parse(localStorage.getItem("data")) || {};

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Calender
      </Title>

      {/* First Section  */}
      <Title
        px={"xl"}
        py={"sm"}
        c={"black"}
        className="!grid !min-h-[80vh] items-center place-self-center"
      >
        Welcome {data.name}
      </Title>
    </main>
  );
}
