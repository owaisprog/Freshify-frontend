import { Button, CopyButton, Loader } from "@mantine/core";
import CustomSelect from "../../../../../components/CustomSelector";
import { useEffect, useState } from "react";
import {
  usePostMutation,
  useQueryHook,
  useUpdateMutationPut,
} from "../../../../../services/reactQuery";
import { toast } from "react-toastify";
import { logoutUser } from "../../../../../services/AuthServices";

export default function OrganizationsSettings() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------- QUERY + MUTATION -------------------- */
  const queryKey = ["bookingTime"];
  const { data: bookingTime = {}, isLoading } = useQueryHook({
    queryKey,
    endpoint: "/api/get-months",
    staleTime: 0,
  });
  const { mutate: updateBookingTime } = useUpdateMutationPut(queryKey);
  const { mutate: cancelSubscription } = usePostMutation([
    "cancelSubscription",
  ]);

  /* -------------------- UPDATE HELPER -------------------- */
  // Accepts an object with either {bookingWindowMonths} or {timeRestrictionHours}
  const updateSettings = (partial) => {
    updateBookingTime(
      { endpoint: "/api/update-months", payload: partial },
      {
        onSuccess: () =>
          toast.success("Settings updated", { position: "top-center" }),
        onError: () => toast.error("Update failed", { position: "top-center" }),
      }
    );
  };

  /* -------------------- LOCAL STORAGE -------------------- */
  useEffect(() => {
    const raw = localStorage.getItem("data");
    if (raw) {
      const { id } = JSON.parse(raw);
      setUserId(id);
    }
  }, []);

  /* -------------------- SELECT OPTIONS -------------------- */
  const bookingTimeOptions = [
    { label: "1 Month", value: "1" },
    { label: "2 Months", value: "2" },
    { label: "3 Months", value: "3" },
  ];
  const rescheduleOptions = [
    { label: "2 Hours", value: "2" },
    { label: "6 Hours", value: "6" },
    { label: "12 Hours", value: "12" },
  ];

  /* -------------------- LOADING STATE -------------------- */
  if (isLoading) {
    return (
      <section className="flex flex-col gap-2">
        <Loader />
      </section>
    );
  }

  /* -------------------- Cancel Subscription -------------------- */
  function handleCancelSubscription() {
    setLoading(true);
    cancelSubscription(
      {
        endpoint: `/api/cancel-subscription`,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("Subscription cancelled Successfully", {
            position: "top-center",
          });
          logoutUser();
        },
        onError: () => {
          setLoading(false);
          toast.error("Error While cancelling Subscription", {
            position: "top-center",
          });
        },
      }
    );
  }
  /* -------------------- RENDER -------------------- */

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Clients Advance Booking Time
        </span>
        <div className="w-[97px] lg:w-[154px] h-[40px]">
          <CustomSelect
            data={bookingTimeOptions}
            value={bookingTime.bookingWindowMonths?.toString() || ""}
            onChange={(v) => updateSettings({ bookingWindowMonths: Number(v) })}
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Subscription Management
        </span>
        <Button
          className="!w-[123px] lg:!w-[240px]"
          bg="black"
          loading={loading}
          loaderProps={{ type: "bars" }}
          radius="md"
          onClick={handleCancelSubscription}
        >
          <span className="lg:hidden">Cancel</span>
          <span className="hidden lg:block">Cancel Subscription</span>
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Copy Booking Widget Code
        </span>
        <CopyButton value={userId ?? ""}>
          {({ copied, copy }) => (
            <Button
              className="!w-[112px] lg:!w-[121px]"
              radius="md"
              bg="black"
              onClick={copy}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Stripe Invoices List
        </span>
        <Button className="!w-[123px] lg:!w-[153px]" bg="black" radius="md">
          View List
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="lg:hidden ml-3 lg:ml-0 text-[14px] font-[400]">
          Restriction For Rescheduling
        </span>
        <span className="hidden lg:block lg:text-[18px] font-[400]">
          Time Restriction For Rescheduling/Cancelation
        </span>
        <div className="w-[113px] lg:w-[154px]">
          <CustomSelect
            data={rescheduleOptions}
            value={bookingTime.timeRestrictionHours?.toString() || ""}
            onChange={(v) =>
              updateSettings({
                timeRestrictionHours: Number(v),
                // bookingWindowMonths: Number(bookingTime.bookingWindowMonths),
              })
            }
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
