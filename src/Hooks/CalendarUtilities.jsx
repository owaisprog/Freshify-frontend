import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useQueryHook } from "../services/reactQuery";

// Owner cards styled with white background & Uiverse-inspired button
export default function OwnerCard() {
  const {
    data: owners = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "organization",
    endpoint: "/api/get-organizationowners",
    staleTime: 15 * 60 * 1000,
  });

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
        Failed to load organization owners. Please try again later.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {owners.map(({ _id, name, image }) => (
        <div
          key={_id}
          className="flex bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl"
        >
          {/* Image on the left */}
          <img
            src={image || "/profile.webp"}
            alt={name}
            className="w-1/3  object-cover"
          />

          {/* Content on the right */}
          <div className="flex flex-col justify-between p-6 sm:p-8 w-2/3 text-left">
            <div>
              <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                {name}
              </h2>
              <p className="mt-2 text-sm text-gray-500">Organization owner</p>
            </div>

            {/* CTA button styled like the Uiverse example */}
            <Link
              to={`/booking/${_id}`}
              className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            >
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
