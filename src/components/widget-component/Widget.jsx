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
    <div className="flex items-center justify-center h-screen !overflow-hidden">
      <div
        key={_id}
        className="flex flex-col sm:flex-row bg-white rounded-xl  sm:h-[300px] overflow-hidden shadow-lg max-w-3xl w-full  "
        role="region"
        aria-label="Profile card"
      >
        <div className="relative h-[170px] sm:h-full w-full sm:w-1/3 aspect-square ">
          <img
            src={image || "/profile.webp"}
            alt={name || "Profile image"}
            className="w-full h-full  object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col  justify-between p-4  w-full sm:w-2/3">
          <div>
            <h2 className="text-xl  font-semibold text-gray-800 tracking-tight">
              {name || "Unknown User"}
            </h2>
            <p className=" text-sm  text-gray-500">Organization Owner</p>
          </div>
          <div>
            <h3 className="text-base  font-semibold text-gray-800">
              Locations:
            </h3>
            {locations && locations.length > 0 ? (
              <ul className="mt-2 grid grid-cols-2 lg:grid-cols-2 gap-3">
                {locations.map((location) => (
                  <li key={location._id} className="flex items-start">
                    <FaMapMarkerAlt
                      className="text-gray-800 mr-2 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm  font-medium text-gray-500">
                        {location.name || "Unnamed Location"}
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
                  position: "top-right",
                  duration: 3000,
                });
              }
            }}
            className="  py-2 !text-sm  font-medium text-white border border-black bg-black  rounded-xl hover:bg-[#F5F7FA] hover:text-black cursor-pointer transition-all duration-300 "
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
