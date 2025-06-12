import { useParams } from "react-router-dom";
import { Button, Loader } from "@mantine/core";
import { useQueryHook } from "../../services/reactQuery";
import { toast } from "react-toastify";

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
  const { _id, image, name, subscriptionStatus, services } = owners || {};

  // Function to find the minimum price service
  const getMinimumPrice = (services) => {
    if (!services || services.length === 0) return null;

    return services?.reduce((min, service) => {
      const currentPrice = parseFloat(service.price);
      const minPrice = parseFloat(min.price);
      return currentPrice < minPrice ? service : min;
    }, services[0]);
  };

  const minPriceService = getMinimumPrice(services);
  const startingPrice = minPriceService ? `$${minPriceService.price}` : "$0";

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
        className="border border-gray-200 bg-white rounded-lg  shadow-sm hover:shadow-md transition-shadow   overflow-hidden  min-w-sm  "
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
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
            Starting from {startingPrice}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-black">
              {name} <span className="text-xs font-normal">(Owner)</span>
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">Popular Services</span>
            <div className="flex flex-wrap gap-2">
              {services?.slice(0, 3).map((service) => (
                <span
                  key={service?._id}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {service.name}
                </span>
              ))}
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
