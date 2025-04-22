import { Title } from "@mantine/core";

export default function OrganizationOwnerPayout() {
  return (
    <main className="pt-20  lg:pt-0 lg:gap-6  p-6 lg:p-0 ">
      <section className="   grid grid-cols-1 gap-y-5  ">
        <Title
          mb={"lg"}
          c={"black"}
          className="lg:!px-6    lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
        >
          Payout
        </Title>
      </section>
    </main>
  );
}
