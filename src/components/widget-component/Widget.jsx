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
      <div className="flex justify-center py-8">
        <Loader type="bars" color="black" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load Organization Owners. Please try again later.
      </p>
    );
  }

  return (
    <div className="  items-center h-screen flex justify-center  ">
      <div
        key={_id}
        className="flex flex-col min-[350px]:flex-row h-[18rem]  bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl"
      >
        <img
          src={image || "/profile.webp"}
          alt={name}
          className="w-full min-[350px]:w-1/3 object-cover"
        />
        <div className="flex flex-col justify-between p-4 sm:p-6 w-full min-[350px]:w-3/5">
          <div>
            <h2 className="text-lg font-medium text-gray-600 lg:text-xl">
              {name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Organization owner</p>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-medium text-gray-700">Locations:</h3>
            {locations && locations.length > 0 ? (
              <ul className="mt-2 space-y-1.5">
                {locations.slice(0, 4).map((location) => (
                  <li key={location._id} className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {location.name || "Unnamed Location"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {location.address || "Address not available"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No locations available</p>
            )}
          </div>
          <button
            onClick={() => {
              if (subscriptionStatus === "paid") {
                window.open(
                  `https://freshify-one.vercel.app/booking?ownerId=${_id}`,
                  "_blank"
                );
              } else {
                toast.warn("Please Subscribe", { position: "top-center" });
              }
            }}
            className="mt-4 sm:mt-6 inline-flex items-center justify-center px-5 py-2 text-white bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
