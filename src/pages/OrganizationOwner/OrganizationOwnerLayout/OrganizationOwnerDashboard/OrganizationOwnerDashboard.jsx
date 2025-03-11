import { Title } from "@mantine/core";

export default function OrganizationOwnerDashboard() {
  return (
    <main className="flex flex-col bg-[#F5F7FA]  h-screen  ">
      <Title
        fz={"h2"}
        px={"lg"}
        py={"sm"}
        c={"black"}
        bg={"#FFFFFF"}
        fw={"bold"}
      >
        Dashboard
      </Title>

      {/* Total Assets section  */}
      <section className="h-full  flex  items-center justify-center  ">
        <Title px={"lg"} py={"sm"} fz={"h1"} c={"black"} fw={"bold"}>
          Welcome to Dashboard
        </Title>
      </section>
    </main>
  );
}
