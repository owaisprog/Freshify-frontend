// components/steps/LocationStep.jsx
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";

const locations = [
  { name: "New York USA", id: 1 },
  { name: "California USA", id: 2 },
];

export default function LocationStep() {
  const { updateBookingData } = useBookingContext(); // Removed unused bookingData
  const navigate = useNavigate();

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
