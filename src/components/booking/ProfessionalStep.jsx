// components/steps/ProfessionalStep.jsx
import { Image, Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import { useQueryHook } from "../../services/reactQuery";

// const professionals = [
//   { name: "Mirza Tayyab Khalid", availability: "TODAY", id: 1 },
//   { name: "Ali Ahmed", availability: "TOMORROW", id: 2 },
//   { name: "Sara Khan", availability: "FRIDAY, 7 MARCH", id: 3 },
// ];

export default function ProfessionalStep() {
  const id = "67e6ccdb05463ea8912d9f98";
  const { updateBookingData } = useBookingContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!bookingData.professional) navigate("/booking/professional");
  // }, []);
  const {
    data: allUsers = [],
    isLoading,
    // error,
  } = useQueryHook({
    queryKey: ["users", id], // ✅ Cache users by owner ID
    endpoint: `/api/get-users-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  const professionals = allUsers.filter((val) => val.role == "barber");

  const handleSelect = (professional) => {
    updateBookingData({ professional });
    navigate("/booking/services");
  };
  if (isLoading)
    return <Loader className="mx-auto " color="blue" type="bars" />;
  return (
    <div className="h-full flex flex-col gap-[20px] items-center justify-center p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Choose Professional</h1>
      <div className="space-y-4">
        {professionals.map((pro) => (
          <button
            key={pro.id}
            onClick={() => handleSelect(pro)}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 
            transition-colors focus:ring-2 ring-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{pro.name}</p>
                <p className="text-sm text-gray-500">
                  Availability: {pro.availability}
                </p>
              </div>
              <Image
                src={`/images/pro-${pro.id}.jpg`}
                alt={pro.name}
                width={40}
                height={40}
                className="rounded-full"
                withPlaceholder
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
