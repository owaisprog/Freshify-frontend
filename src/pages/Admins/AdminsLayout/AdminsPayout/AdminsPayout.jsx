import { Title } from "@mantine/core";

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
        {/* <Popup
          opened={opened}
          setOpened={setOpened}
          handleSubmit={handleSubmit}
          form={form}
          title="Connect Stripe Account"
        >
          <Popup.TextInputField
            label="Email"
            placeholder="Enter your email"
            id="email"
          />

          <Popup.SingleSelector
            label="Country"
            placeholder="Select country"
            id="country"
            data={countries}
          />

          <Popup.SingleSelector
            label="Business Type"
            placeholder="Select business type"
            id="business_type"
            data={[
              { value: "individual", label: "Individual" },
              { value: "company", label: "Company" },
            ]}
          />

          <Popup.SubmitButton loading={isPending}>
            Connect Stripe
          </Popup.SubmitButton>
        </Popup>
        <TransctionsTable /> */}
      </section>
    </main>
  );
}
