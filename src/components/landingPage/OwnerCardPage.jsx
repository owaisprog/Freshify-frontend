import { Link, useNavigate } from "react-router-dom";
import { Button, Loader } from "@mantine/core";
import { useQueryHook } from "../../services/reactQuery";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react";
import { ArrowRight } from "lucide-react";

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

  // Function to find the minimum price service for an owner
  const getMinimumPrice = (services) => {
    if (!services || services.length === 0) return null;

    return services.reduce((min, service) => {
      const currentPrice = parseFloat(service.price);
      const minPrice = parseFloat(min.price);
      return currentPrice < minPrice ? service : min;
    }, services[0]);
  };

  return (
    <section id="barbershops" className="py-16  bg-[rgba(80,78,78,0.5)] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-white leading-tight">
            Featured Organizations
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Discover professional barbershops in your area and book your
            appointment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-8 mb-8">
          {owners
            .slice(0, 4)
            .map(
              ({
                _id,
                name,
                image,
                subscriptionStatus,
                services,
                locations,
                isVerified,
              }) => {
                const minPriceService = getMinimumPrice(services);
                const startingPrice = minPriceService
                  ? `€${minPriceService.price}`
                  : "€0";
                return subscriptionStatus === "paid" ? (
                  <div
                    key={_id}
                    className="border border-gray-200 bg-white rounded-lg  shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={image || "/profile.webp"}
                        alt={name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black text-white">
                          {isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
                        Starting from {startingPrice}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-4 h-60  justify-between  ">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-black">
                          {name}{" "}
                          <span className="text-xs font-normal">(Owner)</span>
                        </h3>

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
                      {/* Services section - you can add if available in your data */}

                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {locations.length}{" "}
                          {locations.length === 1 ? "Location" : "Locations"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          Popular Services
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {services.length > 0 ? (
                            services.slice(0, 3).map((service) => (
                              <span
                                key={service?._id}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {service.name}
                              </span>
                            ))
                          ) : (
                            <span className=" text-gray-700 text-xs ">
                              no service available
                            </span>
                          )}
                        </div>
                      </div>
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
              }
            )}
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            color="white"
            radius={"md"}
            rightSection={<ArrowRight size={14} />}
          >
            <Link to={"/allOwners"} onClick={() => scrollTo(0, 0)}>
              View All Organizations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
