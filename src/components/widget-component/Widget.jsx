import { useParams, useSearchParams } from "react-router-dom";
import { useQueryHook } from "../../services/reactQuery";
import transparentWhite from "../../assets/small.png";
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
              `https://www.freshify.nl/booking?ownerId=${_id}`,
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
            className={`w-10 h-9 rounded-full  }`}
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
