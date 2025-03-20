import { Title } from "@mantine/core";

export default function AdminsCalendar() {
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Calendar
      </Title>

      <section className="h-full flex items-center justify-center">
        <Title fz={"h1"}>Calendar</Title>
      </section>
    </main>
  );
}
