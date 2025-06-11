import { useNavigate } from "react-router-dom";
import { Button, Loader } from "@mantine/core";
import { useQueryHook } from "../../services/reactQuery";
import { toast } from "react-toastify";
// import { ArrowRight } from "lucide-react";

export default function OwnerCards() {
  const navigate = useNavigate();

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
    <section id="barbershops" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-black leading-tight">
            Featured Barbershops
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover professional barbershops in your area and book your
            appointment.
          </p>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {owners.map(({ _id, name, image, subscriptionStatus }) => {
            return subscriptionStatus === "paid" ? (
              <div
                key={_id}
                className="border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={image || "/profile.webp"}
                    alt={name}
                    className="w-full h-48 object-cover"
                  />
                  {/* <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
                      THis is the Badge
                    </div> */}
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-black">{name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span className="text-sm">Organization owner</span>
                    </div>

                    {/* Rating section - you can add if available in your data */}
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 5 ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-black">
                            5.0
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          (0 reviews)
                        </span>
                      </div> */}
                  </div>

                  {/* Services section - you can add if available in your data
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        Haircut
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        Shaving
                      </span>
                    </div>
                  </div> */}
                  <Button
                    fullWidth
                    color="dark"
                    radius={"md"}
                    onClick={() => {
                      if (subscriptionStatus === "paid") {
                        navigate(`/booking?ownerId=${_id}`, { state: _id });
                      } else {
                        toast.warn("Please Subscribe", {
                          position: "top-right",
                        });
                      }
                    }}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            ) : null;
          })}
        </div>

        {/* <div className="flex justify-end">
          <Button
            variant="outline"
            color="dark"
            radius={"md"}
            rightSection={<ArrowRight size={14} />}
            onClick={() => navigate("/all-owners")} 
          >
            View All Barbershops
          </Button>
        </div> */}
      </div>
    </section>
  );
}
