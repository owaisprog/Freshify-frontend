import { Title } from "@mantine/core";
import TransactionsTable from "../../../../components/TransctionsTable";

export default function AdminsPayout() {
  return (
    <main className="pt-20  lg:pt-0 lg:gap-6 p-6 lg:p-0">
      <Title
        mb="lg"
        c="black"
        className="lg:!px-6 !hidden lg:!block lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Payout
      </Title>
      <section className="grid  pt-4 lg:pt-0 max-w-[1440px] mx-auto w-full grid-cols-1 gap-y-5">
        <TransactionsTable endpoint={`/api/admin-organization-transactions`} />
      </section>
    </main>
  );
}
