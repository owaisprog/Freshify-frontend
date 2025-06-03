import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
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
    <div className="flex items-center justify-center h-screen    ">
      <div
        key={_id}
        className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-lg max-w-4xl w-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
        role="region"
        aria-label="Profile card"
      >
        <div className="relative w-full sm:w-1/3 aspect-square sm:aspect-auto">
          <img
            src={image || "/profile.webp"}
            alt={name || "Profile image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col p-4 sm:p-6 gap-4 w-full sm:w-2/3">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
              {name || "Unknown User"}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500">
              Organization Owner
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">
              Locations:
            </h3>
            {locations && locations.length > 0 ? (
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {locations.map((location) => (
                  <li key={location._id} className="flex items-start">
                    <FaMapMarkerAlt
                      className="text-gray-500 mr-2 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-800">
                        {location.name || "Unnamed Location"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {location.address || "Address not available"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm sm:text-base text-gray-500 italic">
                No locations available
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (subscriptionStatus === "paid") {
                window.open(
                  `https://freshify-one.vercel.app/booking?ownerId=${_id}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              } else {
                toast.warn("Please subscribe to book", {
                  position: "top-center",
                  duration: 3000,
                });
              }
            }}
            className="mt-4 sm:mt-6 inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-base font-medium text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-300"
            aria-label={
              subscriptionStatus === "paid" ? "Book now" : "Subscribe to book"
            }
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
