import { Title } from "@mantine/core";

export default function CustomerDashboard() {
  const data = JSON.parse(localStorage.getItem("data")) || {};

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Dashboard
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
