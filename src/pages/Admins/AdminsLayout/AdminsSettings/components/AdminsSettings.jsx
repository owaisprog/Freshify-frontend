import { Button, CopyButton, Modal, TextInput } from "@mantine/core";
import { useState } from "react";

import { toast } from "react-toastify";

import { useQueryHook } from "../../../../../services/reactQuery";

export default function AdminsSettings() {
  const { organizationOwnerId } = JSON.parse(localStorage.getItem("data"));
  // const [userId, setUserId] = useState(null);

  // Add widget customization states
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const { isLoading: isgenenatingInvioces, refetch } = useQueryHook({
    queryKey: "generate-invoices",
    endpoint: `/api/invoices`,
    staleTime: 0,
    enabled: false,
  });

  /* -------------------- LOCAL STORAGE -------------------- */
  // useEffect(() => {
  //   const raw = localStorage.getItem("data");
  //   if (raw) {
  //     const { id } = JSON.parse(raw);
  //     setUserId(id);
  //   }
  // }, []);

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
  /* -------------------- Widget Code Generation -------------------- */
  const generateWidgetCode = () => {
    return `<iframe
  src="https://freshify-one.vercel.app/freshifyWidget/${organizationOwnerId?._id}?bgColor=${encodeURIComponent(
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

      {/* Updated Widget Code Section */}
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
    </section>
  );
}

// import { Button, CopyButton, Loader } from "@mantine/core";
// import { useEffect, useState } from "react";

// import { toast } from "react-toastify";
// import CustomSelect from "../../../../../components/CustomSelector";
// import { logoutUser } from "../../../../../services/AuthServices";
// import {
//   usePostMutation,
//   useQueryHook,
//   useUpdateMutationPut,
// } from "../../../../../services/reactQuery";

// export default function AdminsSettings() {
//   // const { id, organizationOwnerId } = JSON.parse(localStorage.getItem("data"));
//   // const [userId, setUserId] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   // const [bookingLoading, setBookingLoading] = useState(false);
//   // const [restrictionLoading, setRestrictionLoading] = useState(false);

//   /* -------------------- QUERY + MUTATION -------------------- */
//   const queryKey = ["bookingTime"];
//   // const { data: bookingTime = {}, isLoading } = useQueryHook({
//   //   queryKey,
//   //   endpoint: `/api/get-months/${organizationOwnerId?._id}`,
//   //   staleTime: 0,
//   // });
//   const { mutate: updateBookingTime } = useUpdateMutationPut(queryKey);
//   const { mutate: cancelSubscription } = usePostMutation([
//     "cancelSubscription",
//   ]);

//   const { isLoading: isgenenatingInvioces, refetch } = useQueryHook({
//     queryKey: "generate-invoices",
//     endpoint: `/api/invoices`,
//     staleTime: 0,
//     enabled: false,
//   });

//   /* -------------------- UPDATE HELPER -------------------- */
//   // Accepts an object with either {bookingWindowMonths} or {timeRestrictionHours}
//   // const updateSettings = (partial) => {
//   //   if (partial.bookingWindowMonths) {
//   //     setBookingLoading(true);
//   //   } else {
//   //     setRestrictionLoading(true);
//   //   }
//   //   updateBookingTime(
//   //     {
//   //       endpoint: `/api/update-months/${organizationOwnerId?._id}`,
//   //       payload: partial,
//   //     },
//   //     {
//   //       onSuccess: () => {
//   //         setBookingLoading(false);
//   //         setRestrictionLoading(false);
//   //         toast.success("Settings updated", { position: "top-right" });
//   //       },

//   //       onError: () => {
//   //         setBookingLoading(false);
//   //         setRestrictionLoading(false);
//   //         toast.error("Update failed", { position: "top-right" });
//   //       },
//   //     }
//   //   );
//   // };

//   /* -------------------- LOCAL STORAGE -------------------- */
//   useEffect(() => {
//     const raw = localStorage.getItem("data");
//     if (raw) {
//       const { id } = JSON.parse(raw);
//       setUserId(id);
//     }
//   }, []);

//   /* -------------------- SELECT OPTIONS -------------------- */
//

//   /* -------------------- LOADING STATE -------------------- */
//   if (isLoading) {
//     return (
//       <section className="flex flex-col w-full justify-center">
//         <Loader color="dark" type="bars" />
//       </section>
//     );
//   }

//   /* -------------------- Cancel Subscription -------------------- */
//   // function handleCancelSubscription() {
//   //   let cancelSubcription = confirm("Do you want to cancel subscription?");
//   //   if (!cancelSubcription) return null;
//   //   setLoading(true);
//   //   cancelSubscription(
//   //     {
//   //       endpoint: `/api/cancel-subscription`,
//   //     },
//   //     {
//   //       onSuccess: () => {
//   //         setLoading(false);
//   //         toast.success("Subscription cancelled Successfully", {
//   //           position: "top-right",
//   //         });
//   //         logoutUser();
//   //       },
//   //       onError: () => {
//   //         setLoading(false);
//   //         toast.error("Error While cancelling Subscription", {
//   //           position: "top-right",
//   //         });
//   //       },
//   //     }
//   //   );
//   // }

//   /* -------------------- Generate Invoice Funcation -------------------- */
//   async function handleGenerateInvoices() {
//     try {
//       const data = await refetch();
//       const latestObject = data?.data?.invoices.reduce((latest, current) => {
//         return new Date(current.createdAt) > new Date(latest.createdAt)
//           ? current
//           : latest;
//       }, data?.data?.invoices[0]);
//       window.location.href = latestObject.invoicePdfUrl;
//       toast.success("Generated Successfully", {
//         position: "top-right",
//       });
//     } catch {
//       toast.error("Error While Generating Invioce", {
//         position: "top-right",
//       });
//     }
//   }

//   /* -------------------- RENDER -------------------- */

//   return (
//     <section className="flex flex-col gap-2">

//       { /* <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
//         <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
//           Clients Advance Booking Time
//         </span>
//         <div className="w-[97px] lg:w-[154px] h-[40px]">
//           {bookingLoading ? (
//             <div className=" w-full flex items-center justify-center">
//               <Loader type="bars" size={"sm"} />
//             </div>
//           ) : (
//             <CustomSelect
//               defaultValue={2}
//               data={bookingTimeOptions}
//               value={bookingTime.bookingWindowMonths?.toString() || ""}
//               onChange={(v) =>
//                 updateSettings({ bookingWindowMonths: Number(v) })
//               }
//               styles={{
//                 input: {
//                   border: "none",
//                   borderBottom: "1px solid black",
//                   borderRadius: 0,
//                   fontSize: "14px",
//                   backgroundColor: "transparent",
//                 },
//               }}
//             />
//           )}
//         </div>
//       </div> */}
//       {/* Subscription Maanagement  */}
//       {/* <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
//         <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
//           Subscription Management
//         </span>
//         <Button
//           className="!w-[123px] lg:!w-[240px]"
//           bg="black"
//           loading={loading}
//           loaderProps={{ type: "bars" }}
//           radius="md"
//           onClick={handleCancelSubscription}
//         >
//           <span className="lg:hidden">Cancel</span>
//           <span className="hidden lg:block">Cancel Subscription</span>
//         </Button>
//       </div> */}
//       <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
//         <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
//           Copy Booking Widget Code
//         </span>
//         <CopyButton
//           value={`<div
//     style=" overflow: hidden; min-height: 450px; width: 100%; position: relative;  display: flex; justify-content:
//   center; align-items: center;">
//   <iframe  title="iframe-owner" width="100%"
//     height="100%" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
//   </div>
// `}
//         >
//           {({ copied, copy }) => (
//             <Button
//               className="!w-[112px] lg:!w-[121px]"
//               radius="md"
//               bg="black"
//               onClick={copy}
//             >
//               {copied ? "Copied" : "Copy"}
//             </Button>
//           )}
//         </CopyButton>
//       </div>
//       {/* invoce generate button  */}
//       <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
//         <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
//           Generate Invoices
//         </span>
//         <Button
//           className="!w-[112px] lg:!w-[121px]"
//           bg="black"
//           loading={isgenenatingInvioces}
//           loaderProps={{ type: "bars" }}
//           radius="md"
//           onClick={handleGenerateInvoices}
//         >
//           <span className="lg:block">Generate</span>
//         </Button>
//       </div>
//       {/* View Invoice Lists  */}
//       {/* <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
//         <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
//           Stripe Invoices List
//         </span>
//         <Button className="!w-[123px] lg:!w-[153px]" bg="black" radius="md">
//           View List
//         </Button>
//       </div> */}

//       {/* Time Restriction For Rescheduling/Cancelation */}
//       {/* <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
//         <span className="lg:hidden ml-3 lg:ml-0 text-[14px] font-[400]">
//           Restriction For Rescheduling
//         </span>
//         <span className="hidden lg:block lg:text-[18px] font-[400]">
//           Time Restriction For Rescheduling/Cancelation
//         </span>
//         <div className="w-[113px] lg:w-[154px]">
//           {restrictionLoading ? (
//             <div className=" w-full flex items-center justify-center">
//               <Loader type="bars" size={"sm"} />
//             </div>
//           ) : (
//             <CustomSelect
//               defaultValue={2}
//               data={rescheduleOptions}
//               value={bookingTime.timeRestrictionHours?.toString() || ""}
//               onChange={(v) =>
//                 updateSettings({
//                   timeRestrictionHours: Number(v),
//                   // bookingWindowMonths: Number(bookingTime.bookingWindowMonths),
//                 })
//               }
//               styles={{
//                 input: {
//                   border: "none",
//                   borderBottom: "1px solid black",
//                   borderRadius: 0,
//                   fontSize: "14px",
//                   backgroundColor: "transparent",
//                 },
//               }}
//             />
//           )}
//         </div>
//       </div> */}
//     </section>
//   );
// }
