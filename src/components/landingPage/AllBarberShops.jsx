import { MapPin, Scissors, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../services/reactQuery";
import { Button, Loader, Select } from "@mantine/core";

export default function AllBarberShops({
  recomendedShops,
  setRecomendedShops,
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch organization owners data
  const {
    data: owners = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "organization",
    endpoint: "/api/get-organizationowners",
    staleTime: 15 * 60 * 1000,
  });

  console.log("Recomended Shops are ", recomendedShops);

  // Function to find the minimum price service for an owner
  const getMinimumPrice = (services) => {
    if (!services || services?.length === 0) return 0;

    return services.reduce((min, service) => {
      const currentPrice = parseFloat(service.price);
      return currentPrice < min ? currentPrice : min;
    }, parseFloat(services[0].price));
  };

  // Transform owners into barbershops (one card per owner)
  const allBarbershops = owners
    .filter((owner) => owner.subscriptionStatus === "paid")
    .map((owner) => ({
      id: owner._id,
      name: owner.name,
      image: owner.image || "/profile.webp",
      services: owner.services || [],
      minPrice: getMinimumPrice(owner.services),
      locations: owner.locations || [],
      // rating: 4.5, // Default rating
      // reviews: 0, // Default reviews count
      badge: "Verified", // Default badge
    }));

  useEffect(() => {
    if (allBarbershops?.length > 0) {
      setRecomendedShops(allBarbershops);
    }
  }, [owners]);

  // Extract unique locations from data (across all owners)
  const locations = [
    "All Locations",
    ...new Set(
      allBarbershops.flatMap((shop) => shop.locations.map((loc) => loc.name))
    ),
  ];

  // Extract unique services from data
  const uniqueServices = [
    "All Services",
    ...new Set(
      allBarbershops.flatMap((shop) =>
        shop.services.map((service) => service.name)
      )
    ),
  ];

  // Price ranges based on actual min prices
  const priceRanges = [
    "All Prices",
    "$0-$15",
    "$15-$25",
    "$25-$35",
    "$35-$50",
    "$50+",
  ];

  const filteredBarbershops = allBarbershops.filter((shop) => {
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "" ||
      selectedLocation === "All Locations" ||
      shop.locations.some((loc) => loc.name === selectedLocation);

    const matchesPriceRange =
      selectedPriceRange === "" ||
      selectedPriceRange === "All Prices" ||
      (selectedPriceRange === "$0-$15" &&
        shop.minPrice >= 0 &&
        shop.minPrice <= 15) ||
      (selectedPriceRange === "$15-$25" &&
        shop.minPrice >= 15 &&
        shop.minPrice <= 25) ||
      (selectedPriceRange === "$25-$35" &&
        shop.minPrice >= 25 &&
        shop.minPrice <= 35) ||
      (selectedPriceRange === "$35-$50" &&
        shop.minPrice >= 35 &&
        shop.minPrice <= 50) ||
      (selectedPriceRange === "$50+" && shop.minPrice >= 50);

    const matchesServices =
      selectedServices.length === 0 ||
      selectedServices.includes("All Services") ||
      selectedServices.some((service) =>
        shop.services.some((s) => s.name === service)
      );

    return (
      matchesSearch && matchesLocation && matchesPriceRange && matchesServices
    );
  });

  const sortedBarbershops = [...filteredBarbershops].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.minPrice - b.minPrice;
      case "price-high":
        return b.minPrice - a.minPrice;
      default:
        return 0;
    }
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
        Failed to load barbershops. Please try again later.
      </p>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto flex flex-col  gap-8 ">
        {/* Filters Sidebar */}
        <div data-aos="fade-up" className="  lg:bg-white z-20 rounded-full ">
          <div className="  w-full  lg:overflow-y-auto  shadow-sm  border border-gray-200 px-2 lg:px-6 rounded-3xl   ">
            <div className="flex py-3 lg:py-0 h-full items-center justify-between  ">
              <h2 className="text-lg lg:hidden font-semibold text-black">
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center text-gray-600"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div
              className={` py-3 flex flex-col gap-2   ${isFilterOpen ? "block" : "hidden lg:grid lg:grid-cols-5 lg:gap-x-4 lg:py-3  "}`}
            >
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search barbershops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-black focus:outline-none transition-all duration-300 ease-in-out shadow-md hover:shadow-lg placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Select
                  size="lg"
                  radius={"md"}
                  placeholder="Select Location"
                  data={locations.map((location) => ({
                    value: location,
                    label: location,
                  }))}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  className="w-full"
                  classNames={{
                    input:
                      "!px-4 !py-4 border border-gray-300 rounded-lg focus:ring-3 focus:ring-black focus:outline-none transition-all duration-300 ease-in-out shadow-md cursor-pointer hover:shadow-lg text-gray-700",
                  }}
                />
              </div>

              {/* Price Range */}
              <div>
                <Select
                  size="lg"
                  radius={"md"}
                  placeholder="Select Price Range"
                  data={priceRanges.map((range) => ({
                    value: range,
                    label: range,
                  }))}
                  value={selectedPriceRange}
                  onChange={setSelectedPriceRange}
                  className="w-full"
                  classNames={{
                    input:
                      "!px-4 !py-4 border border-gray-300 rounded-lg focus:ring-3 focus:ring-black focus:outline-none transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-lg text-gray-700",
                  }}
                />
              </div>

              {/* Services */}
              <div>
                <Select
                  size="lg"
                  radius={"md"}
                  placeholder="Select Service"
                  data={uniqueServices.slice(0, 5).map((service) => ({
                    value: service,
                    label: service,
                  }))}
                  value={
                    selectedServices.length > 0 ? selectedServices[0] : null
                  }
                  onChange={(value) =>
                    setSelectedServices(value ? [value] : [])
                  }
                  className="w-full"
                  classNames={{
                    input:
                      "!px-4 !py-4 border border-gray-300 rounded-lg focus:ring-3 focus:ring-black focus:outline-none transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-lg text-gray-700",
                  }}
                />
              </div>

              {/* Clear Filters */}
              <div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedLocation("");
                    setSelectedPriceRange("");
                    setSelectedServices([]);
                  }}
                  className="w-full px-6 py-3 text-sm text-white hover:text-black cursor-pointer bg-black border border-gray-300 rounded-lg hover:bg-white hover:outline-3  focus:ring-2 focus:ring-black focus:outline-none shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="">
          {/* Barbershops Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedBarbershops.slice(0, 4).map((shop, index) => {
              const startingPrice =
                shop.minPrice > 0 ? `$${shop.minPrice.toFixed(2)}` : "Varies";

              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={shop.id}
                  className="bg-white   rounded-lg overflow-hidden shadow-md hover:shadow-lg !transition-all !duration-500  cursor-pointer hover:scale-105"
                >
                  <div className="relative ">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover  "
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
                  <div className="p-6 space-y-4 ">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-black">
                        {shop.name}
                        <span className="text-xs font-normal"> (Owner)</span>
                      </h3>

                      {/* Location count */}
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {shop.locations.length}{" "}
                          {shop.locations.length === 1
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
                        {shop.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {service.name}
                          </span>
                        ))}
                        {shop.services.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                            +{shop.services.length - 3} more
                          </span>
                        )}
                        {shop.services.length <= 0 && (
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

          {/* No Results */}
          {sortedBarbershops.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No barbershops found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
