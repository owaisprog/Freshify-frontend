import { useParams } from "react-router-dom";
import { Button, Loader } from "@mantine/core";
import { useQueryHook } from "../../services/reactQuery";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Widget() {
  const { ownerId } = useParams();
  const {
    data: owners = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "organization",
    endpoint: `/api/get-organizationowner/${ownerId}`,
    staleTime: 15 * 60 * 1000,
  });
  const { _id, image, name, subscriptionStatus, locations } = owners || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader type="bars" color="black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-red-500 text-base sm:text-lg font-medium">
          Failed to load Organization Owners. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex  items-center justify-center h-screen !overflow-hidden">
      <div
        key={_id}
        className="flex flex-col   rounded-lg   overflow-hidden shadow-lg min-w-sm  "
        role="region"
        aria-label="Profile card"
      >
        <div className="relative  h-[200px] w-full  aspect-square ">
          <img
            src={image || "/profile.webp"}
            alt={name || "Profile image"}
            className="w-full h-full  object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-black">{name}</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-sm">Organization owner</span>
            </div>
          </div>

          <Button
            fullWidth
            size="xs"
            radius={"md"}
            color="dark"
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
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
