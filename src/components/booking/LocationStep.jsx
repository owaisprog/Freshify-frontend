// components/steps/LocationStep.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import { useEffect } from "react";
import { useQueryHook } from "../../services/reactQuery";
import { Loader } from "@mantine/core";

// const locations = [
//   { name: "New York USA", id: 1 },
//   { name: "California USA", id: 2 },
// ];

export default function LocationStep() {
  // const id = "6819b7433395928ea1c08d0e";

  const [searchParams] = useSearchParams();
  const id = searchParams.get("ownerId");

  const { updateBookingData } = useBookingContext(); // Removed unused bookingData
  const navigate = useNavigate();
  useEffect(() => {
    const savedBookingData = localStorage.getItem("bookingData");
    if (savedBookingData) localStorage.removeItem("bookingData");
  }, []);

  const {
    data: locations = [],
    isLoading,
    // error,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/public/locations/${id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  //consoe.log(locations);
  const handleSelect = (location) => {
    updateBookingData({ location, organizationId: id });
    navigate("/booking/professional");
  };
  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-[20px] items-center  justify-center p-6 rounded-lg">
        <Loader className="mx-auto " color="blue" type="bars" />
      </div>
    );
  return (
    <div className="h-full flex flex-col  px-3 lg:px-0 gap-[20px] pb-[100px] lg:pb-0  items-center justify-center lg:p-6 rounded-lg">
      <h1 className="text-[28px]  lg:text-[32px] font-[500]">
        Select a Location
      </h1>
      <div className="flex w-full  flex-col gap-4">
        {locations.length > 0 ? (
          locations.map((location) => (
            <button
              key={location._id}
              onClick={() => handleSelect(location)}
              className=" w-full max-w-[758px] h-[150px] lg:h-[200px] mx-auto hover:bg-black hover:text-white cursor-pointer flex items-center 
            justify-center bg-[#FFFFFF] rounded-3xl border specialBorder hover:border-none
             transition-all duration-500"
            >
              <p className="text-[24px] lg:text-[32px] capitalize font-[700]">
                {location.name}
              </p>
            </button>
          ))
        ) : (
          <h1 className="text-center">No Location Available</h1>
        )}
      </div>
    </div>
  );
}
