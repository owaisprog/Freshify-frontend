// import { useParams, useSearchParams } from "react-router-dom";
// // import { Loader } from "@mantine/core";
// import { useQueryHook } from "../../services/reactQuery";
// // import { toast } from "react-toastify";

// export default function Widget() {
//   const { ownerId } = useParams();
//   const [searchParams] = useSearchParams();
//   const bgColor = searchParams.get("bgColor") || "black"; // Default to black if no bgColor
//   const textColor = searchParams.get("textColor") || "white"; // Default to white if no textColor

//   const {
//     data: owners = [],
//     isLoading,
//     error,
//   } = useQueryHook({
//     queryKey: "organization",
//     endpoint: `/api/get-organizationowner/${ownerId}`,
//     staleTime: 15 * 60 * 1000,
//   });
//   const { _id, image, name, subscriptionStatus } = owners || {};

//   // if (isLoading) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen bg-transparent">
//   //       <Loader type="bars" color="black" />
//   //     </div>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen bg-transparent">
//   //       <p className="text-center text-red-500 text-base sm:text-lg font-medium">
//   //         Failed to load Organization Owners. Please try again later.
//   //       </p>
//   //     </div>
//   //   );
//   // }

//   return (
//     <button
//       onClick={() => {
//         if (subscriptionStatus === "paid") {
//           window.open(
//             `https://freshify-one.vercel.app/booking?ownerId=${_id}`
//             // "_blank",
//             // "noopener,noreferrer"
//           );
//         } else {
//           // toast.warn("Please subscribe to book", {
//           //   position: "top-right",
//           //   duration: 3000,
//           // });
//         }
//       }}
//       style={{ backgroundColor: bgColor, color: textColor }}
//       className="fixed bottom-4 right-4 flex items-center !cursor-pointer py-2 px-4 text-sm font-medium rounded-xl border   border-black hover:bg-[#F5F7FA] hover:text-black hover:shadow-lg transition-all duration-300 group"
//       aria-label={
//         subscriptionStatus === "paid" ? "Book now" : "Subscribe to book"
//       }
//     >
//       <div className="flex-shrink-0">
//         <img
//           src={image || "/profile.webp"}
//           alt={name || "Organization logo"}
//           className="w-8 h-8 rounded-full object-cover"
//           loading="lazy"
//         />
//       </div>
//       <span
//         style={{ borderColor: textColor }}
//         className="border-l h-4 mx-2 group-hover:border-gray-500"
//       ></span>
//       <span>{name || "Unknown Organization"}</span>
//     </button>
//   );
// }

// // function Widget() {
// //   return (
// //     <div>
// //       <Button>hdaskjdhakjsdh</Button>
// //     </div>
// //   );
// // }

// // export default Widget;
import { useParams, useSearchParams } from "react-router-dom";
import { useQueryHook } from "../../services/reactQuery";
import transparentWhite from "../../assets/transparentWhite.png";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";

export default function Widget() {
  const { ownerId } = useParams();
  const [searchParams] = useSearchParams();
  const bgColor = searchParams.get("bgColor") || "black"; // Default to black if no bgColor
  const textColor = searchParams.get("textColor") || "white"; // Default to white if no textColor
  const text = searchParams.get("text") || "Book Appointment"; // Default to white if no textColor

  const { data: owners = [], isLoading } = useQueryHook({
    queryKey: "organization",
    endpoint: `/api/get-organizationowner/${ownerId}`,
    staleTime: 15 * 60 * 1000,
  });
  const { _id, subscriptionStatus } = owners || {};
  return (
    <div className="  flex justify-end h-[3.5rem]">
      <Button
        loading={isLoading}
        loaderProps={{ type: "bars", size: "xs" }}
        size="md"
        color="dark"
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={() => {
          if (subscriptionStatus === "paid") {
            window.open(
              `https://freshify-one.vercel.app/booking?ownerId=${_id}`,
              "_blank",
              "noopener,noreferrer"
            );
          } else {
            toast.warn("Please subscribe to book", {
              position: "top-right",
              duration: 3000,
            });
          }
        }}
        aria-label={
          subscriptionStatus === "paid" ? "Book now" : "Subscribe to book"
        }
        className="!flex !items-center  !cursor-pointer  !text-sm !font-medium !rounded-xl !transition-all !duration-700 !group"
      >
        <div>
          <img
            src={transparentWhite}
            alt={text || "Organization logo"}
            className={`w-10 h-10 rounded-full  }`}
          />
        </div>
        <span
          style={{ borderColor: textColor }}
          className="border-l h-4 mx-2 group-hover:border-gray-500"
        ></span>
        <span>{text || "Book Appointment"}</span>
      </Button>
    </div>
  );
}
