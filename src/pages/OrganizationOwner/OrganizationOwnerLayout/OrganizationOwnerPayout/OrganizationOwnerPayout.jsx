import { Button, Loader, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import Popup from "../../../../components/PopUp";
import { toast } from "react-toastify";
import { usePostMutation, useQueryHook } from "../../../../services/reactQuery";
import TransctionsTable from "../../../../components/TransctionsTable";

// Complete list of countries
const countries = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "PK", label: "Pakistan" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "BE", label: "Belgium" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "IE", label: "Ireland" },
  { value: "CH", label: "Switzerland" },
  { value: "AT", label: "Austria" },
  { value: "JP", label: "Japan" },
  { value: "SG", label: "Singapore" },
  { value: "HK", label: "Hong Kong" },
  { value: "MY", label: "Malaysia" },
  { value: "BR", label: "Brazil" },
  { value: "MX", label: "Mexico" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "ZA", label: "South Africa" },
  { value: "NZ", label: "New Zealand" },
];

export default function OrganizationOwnerPayout() {
  const [opened, setOpened] = useState(false);
  const userData = JSON.parse(localStorage.getItem("data"));
  const email = userData?.email || ""; // Safely get email with fallback

  const { mutate: connectStripe, isPending } = usePostMutation("connectStripe");

  const { refetch: initiatePayout, isLoading: isPayoutLoading } = useQueryHook({
    queryKey: "payout",
    endpoint: `/api/connect/payout`,
    params: { amount: 1000, currency: "usd" }, // Adjust based on your API
    enabled: false,
    staleTime: 0 * 60 * 1000,
  });

  async function PayOutFuncation() {
    console.log("Initiating payout...");
    try {
      const { data } = await initiatePayout();

      window.location.href = data?.payoutUrl;
    } catch (error) {
      console.error("Payout error:", error);
      toast.error(error?.message || "Error while initiating payout", {
        position: "top-center",
      });
    }
  }
  const { data, isLoading: isLoadingStatus } = useQueryHook({
    queryKey: "connect_status",
    endpoint: `/api/connect/status`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  const form = useForm({
    initialValues: {
      email: email,
      country: "NL",
      business_type: "individual",
    },
    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
      country: (value) => (!value ? "Please select a country" : null),
      business_type: (value) =>
        !value ? "Please select a business type" : null,
    },
  });

  const handleSubmit = (values) => {
    connectStripe(
      {
        endpoint: `/api/connect/create`,
        payload: values,
      },
      {
        onSuccess: (data) => {
          setOpened(false);

          window.location.href = data.url;
        },
        onError: () => {
          toast.error("Error While Connecting", {
            position: "top-center",
          });
        },
      }
    );
  };

  // .......... Update Stripe Setting ......... //
  const { isLoading: isUpdateStripSetting, refetch } = useQueryHook({
    queryKey: "update-Stripe",
    endpoint: `/api/connect/account-settings`,
    staleTime: 0,
    enabled: false,
  });

  async function updateStripeSetting() {
    try {
      const data = await refetch();
      window.location.href = data?.data?.settingsUrl;
    } catch {
      toast.error("Error Updating Stripe", {
        position: "top-center",
      });
    }
  }

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
        <section className="  px-2 flex flex-col  lg:flex-row gap-2 justify-between items-center">
          <Text className="lg:!text-[32px] !text-[24px] !font-[500]">
            Initiate Payout From Stripe
          </Text>

          <div className="flex gap-2 ">
            {!isLoadingStatus && data?.status !== "complete" && (
              <Button
                onClick={() => setOpened(true)}
                loaderProps={{ type: "bars" }}
                loading={isPayoutLoading}
                bg="black"
                radius="md"
                className="!text-[18px] !px-[40px] !font-[400] "
              >
                Connect Stripe
              </Button>
            )}
            {!isLoadingStatus && data && data?.status === "complete" && (
              <Button
                loaderProps={{ type: "bars" }}
                bg="black"
                loading={isPayoutLoading}
                onClick={PayOutFuncation}
                radius="md"
                className="!text-[18px] !px-[40px] !font-[400] "
              >
                Payout
              </Button>
            )}

            {!isLoadingStatus && data && data?.status === "complete" && (
              <Button
                loaderProps={{ type: "bars" }}
                bg="black"
                loading={isUpdateStripSetting}
                onClick={updateStripeSetting}
                radius="md"
                className="!text-[18px] !px-[40px] !font-[400] "
              >
                Edit Stripe
              </Button>
            )}
            {isLoadingStatus && (
              <Loader size={"sm"} type="bars" color="black" />
            )}
          </div>
        </section>

        <Popup
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
              { value: "non_profit", label: "Non Profit" },
              { value: "government_entity", label: "Government Entity" },
            ]}
          />

          <Popup.SubmitButton loading={isPending}>
            Connect Stripe
          </Popup.SubmitButton>
        </Popup>
        <TransctionsTable endpoint={`/api/organization-transactions`} />
      </section>
    </main>
  );
}
