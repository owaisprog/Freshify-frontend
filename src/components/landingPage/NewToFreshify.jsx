import { Button, Loader } from "@mantine/core";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewToFreshify({ newToFreshify }) {
  const navigate = useNavigate();
  if (newToFreshify?.length <= 1) {
    return (
      <section className="bg-gray-100 px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden floating-shapes">
        <div className="container mx-auto relative z-10 ">
          <h2
            className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8"
            data-aos="fade-up"
          >
            New To Freshify
          </h2>
          <div className="flex items-center justify-center">
            <Loader type="bars" color="dark" />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-gray-100 px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden floating-shapes">
      <div className="container mx-auto relative z-10">
        <h2
          className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8"
          data-aos="fade-up"
        >
          New To Freshify
        </h2>

        {newToFreshify.length > 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4">
            {newToFreshify?.slice(0, 4)?.map((shop) => {
              const startingPrice =
                shop.minPrice > 0 ? `$${shop.minPrice.toFixed(2)}` : "Varies";

              return (
                <div
                  key={shop.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg  hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "/profile.webp";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black text-white">
                        {shop.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
                      Starting from {startingPrice}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-black">
                        {shop.name}
                        <span className="text-xs font-normal"> (Owner)</span>
                      </h3>

                      {/* Location count */}
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {shop.locations?.length}{" "}
                          {shop.locations?.length === 1
                            ? "Location"
                            : "Locations"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-bold">
                        Popular Services
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {shop?.services?.slice(0, 3)?.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {service.name}
                          </span>
                        ))}
                        {shop?.services?.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                            +{shop?.services?.length - 3} more
                          </span>
                        )}
                        {shop?.services?.length <= 0 && (
                          <span className=" text-xs font-medium text-gray-700">
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
                        navigate(`/booking?ownerId=${shop.id}`, {
                          state: shop.id,
                        });
                      }}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
