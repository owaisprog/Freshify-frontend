// components/steps/LocationStep.jsx
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import { useEffect } from "react";
import { useQueryHook } from "../../services/reactQuery";

// const locations = [
//   { name: "New York USA", id: 1 },
//   { name: "California USA", id: 2 },
// ];

export default function LocationStep() {
  const id = "67e16777bde93a83b86c623f";
  const { updateBookingData } = useBookingContext(); // Removed unused bookingData
  const navigate = useNavigate();
  useEffect(() => {
    const savedBookingData = localStorage.getItem("bookingData");
    if (savedBookingData) localStorage.removeItem("bookingData");
  }, []);

  const {
    data: locations = [],
    // isLoading,
    // error,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  console.log(locations);
  const handleSelect = (location) => {
    updateBookingData({ location });
    navigate("/booking/professional");
  };

  return (
    <div className="h-full flex flex-col gap-[20px] items-center justify-center p-6 rounded-lg">
      <h1 className="text-[32px] font-[500]">Select a Location</h1>
      <div className="flex flex-col gap-4">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => handleSelect(location)}
            className="w-[758px] h-[200px] cursor-pointer flex items-center 
            justify-center bg-[#FFFFFF] rounded-3xl border border-[#718EBF]
            hover:border-blue-500 transition-all"
          >
            <p className="text-[32px] font-[700]">{location.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
