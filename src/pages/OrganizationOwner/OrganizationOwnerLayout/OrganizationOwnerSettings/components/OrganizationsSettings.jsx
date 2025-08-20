import { Button, CopyButton, Loader, Modal, TextInput } from "@mantine/core";
import CustomSelect from "../../../../../components/CustomSelector";
import { useEffect, useState } from "react";

import {
  usePostMutation,
  useQueryHook,
  useUpdateMutationPut,
} from "../../../../../services/reactQuery";
import { toast } from "react-toastify";
import { logoutUser } from "../../../../../services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function OrganizationsSettings() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [restrictionLoading, setRestrictionLoading] = useState(false);
  const navigate = useNavigate();

  // State for color customization modal
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  /* -------------------- QUERY + MUTATION -------------------- */
  const queryKey = ["bookingTime"];
  const { data: bookingTime = {}, isLoading } = useQueryHook({
    queryKey,
    endpoint: `/api/get-months/${id}`,
    staleTime: 0,
  });
  const { mutate: updateBookingTime } = useUpdateMutationPut(queryKey);
  const { mutate: cancelSubscription } = usePostMutation([
    "cancelSubscription",
  ]);

  const { isLoading: isgenenatingInvioces, refetch } = useQueryHook({
    queryKey: "generate-invoices",
    endpoint: `/api/invoices`,
    staleTime: 0,
    enabled: false,
  });

  /* -------------------- UPDATE HELPER -------------------- */
  // Accepts an object with either {bookingWindowMonths} or {timeRestrictionHours}
  const updateSettings = (partial) => {
    if (partial.bookingWindowMonths) {
      setBookingLoading(true);
    } else {
      setRestrictionLoading(true);
    }
    updateBookingTime(
      { endpoint: `/api/update-months/${id}`, payload: partial },
      {
        onSuccess: () => {
          setBookingLoading(false);
          setRestrictionLoading(false);
          toast.success("Settings updated", { position: "top-right" });
        },

        onError: () => {
          setBookingLoading(false);
          setRestrictionLoading(false);
          toast.error("Update failed", { position: "top-right" });
        },
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
  const rescheduleOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    return {
      label: `${hour} Hour${hour > 1 ? "s" : ""}`,
      value: hour.toString(),
    };
  });

  /* -------------------- LOADING STATE -------------------- */
  if (isLoading) {
    return (
      <section className="flex items-center justify-center w-full">
        <Loader color="dark" type="bars" />
      </section>
    );
  }

  /* -------------------- Cancel Subscription -------------------- */
  function handleCancelSubscription() {
    let cancelSubcription = confirm("Do you want to cancel subscription?");
    if (!cancelSubcription) return null;
    setLoading(true);
    cancelSubscription(
      {
        endpoint: `/api/cancel-subscription`,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("Subscription cancelled Successfully", {
            position: "top-right",
          });
          logoutUser();
        },
        onError: () => {
          setLoading(false);
          toast.error("Error While cancelling Subscription", {
            position: "top-right",
          });
        },
      }
    );
  }

  /* -------------------- Generate Invoice Funcation -------------------- */
  async function handleGenerateInvoices() {
    try {
      const data = await refetch();
      const latestObject = data?.data?.invoices.reduce((latest, current) => {
        return new Date(current.createdAt) > new Date(latest.createdAt)
          ? current
          : latest;
      }, data?.data?.invoices[0]);
      window.location.href = latestObject.invoicePdfUrl;
      toast.success("Generated Successfully", {
        position: "top-right",
      });
    } catch {
      toast.error("Error While Generating Invioce", {
        position: "top-right",
      });
    }
  }

  /* -------------------- Generate Widget Code -------------------- */
  const generateWidgetCode = () => {
    return `<iframe
  src="https://www.freshify.nl/freshifyWidget/${userId}?bgColor=${encodeURIComponent(
    bgColor
  )}&textColor=${encodeURIComponent(textColor)}&text=${encodeURIComponent(text)}"
  title="iframe-owner"
  scrolling="no"
  style="
    position: absolute;
    bottom: 16px;
    right: 16px;
    border: none;
    overflow: hidden;
    height: 3.5rem;
    z-index: 9999;
  "
  frameborder="0"
></iframe>`;
  };

  /* -------------------- Handle Copy Widget Code -------------------- */
  const handleCopyWidgetCode = (copy) => {
    copy();
    setIsColorModalOpen(false);
    toast.success("Widget code copied to clipboard", {
      position: "top-right",
    });
  };

  /* -------------------- RENDER -------------------- */
  return (
    <section className="flex flex-col gap-2">
      {/* Color Customization Modal */}
      <Modal
        classNames={{ title: "!font-bold" }}
        closeOnClickOutside={false}
        radius={"lg"}
        opened={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
        title="Customize Widget Colors"
        centered
      >
        <div className="flex flex-col gap-4 mb-6">
          <TextInput
            classNames={{ label: "!font-normal" }}
            radius={"md"}
            label="Enter Name"
            placeholder="Enter Name (e.g. Freshify)"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <TextInput
            classNames={{ label: "!font-normal" }}
            radius={"md"}
            label="Background Color"
            placeholder="Enter color (e.g., #FFFFFF, white)"
            value={bgColor}
            onChange={(e) => setBgColor(e.currentTarget.value)}
          />
          <TextInput
            classNames={{ label: "!font-normal" }}
            label="Text Color"
            radius={"md"}
            placeholder="Enter color (e.g., #000000, black)"
            value={textColor}
            onChange={(e) => setTextColor(e.currentTarget.value)}
          />
        </div>
        <CopyButton value={generateWidgetCode()}>
          {({ copied, copy }) => (
            <Button
              fullWidth
              radius={"md"}
              color="dark"
              onClick={() => handleCopyWidgetCode(copy)}
            >
              {copied ? "Copied!" : "Copy Widget Code"}
            </Button>
          )}
        </CopyButton>
      </Modal>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Clients Advance Booking Time
        </span>
        <div className="w-[97px] lg:w-[154px] h-[40px]">
          {bookingLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loader type="bars" size={"sm"} />
            </div>
          ) : (
            <CustomSelect
              defaultValue={2}
              data={bookingTimeOptions}
              value={bookingTime.bookingWindowMonths?.toString() || ""}
              onChange={(v) =>
                updateSettings({ bookingWindowMonths: Number(v) })
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
          )}
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
        <Button
          radius="md"
          bg="black"
          onClick={() => setIsColorModalOpen(true)}
        >
          <span className="lg:hidden">Update</span>
          <span className="hidden lg:block">Update and Copy</span>
        </Button>
      </div>

      {/* invoce generate button  */}
      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Generate Invoices
        </span>
        <Button
          className="!w-[112px] lg:!w-[121px]"
          bg="black"
          loading={isgenenatingInvioces}
          loaderProps={{ type: "bars" }}
          radius="md"
          onClick={handleGenerateInvoices}
        >
          <span className="lg:block">Generate</span>
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Stripe Invoices List
        </span>
        <Button
          onClick={() => navigate("/OrganizationOwnerDashboard/invoices")}
          className="!w-[123px] lg:!w-[153px]"
          bg="black"
          radius="md"
        >
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
          {restrictionLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loader type="bars" size={"sm"} />
            </div>
          ) : (
            <CustomSelect
              defaultValue={2}
              data={rescheduleOptions}
              value={bookingTime.timeRestrictionHours?.toString() || ""}
              onChange={(v) =>
                updateSettings({
                  timeRestrictionHours: Number(v),
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
          )}
        </div>
      </div>
    </section>
  );
}
