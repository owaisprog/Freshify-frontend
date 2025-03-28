// components/steps/ProfessionalStep.jsx
import { useEffect } from "react";
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
    <div className="h-full flex flex-col gap-[20px]  justify-center p-6 rounded-lg">
      <h1 className="text-[32px] font-[500]">Choose Professional</h1>
      <div className="space-y-4 w-full">
        {professionals.map((pro) => (
          <button
            key={pro.id}
            onClick={() => handleSelect(pro)}
            className="min-w-full  justify-between gap-x-2 cursor-pointer  items-center  p-2 rounded-xl specialBorder min-h-[120px]   bg-[#FFFFFF] "
          >
            <div className="flex items-center   gap-3">
              <div className="min-h-[100px] flex items-center  justify-center min-w-[100px] bg-[#E7EDFF] rounded-[20px]">
                <img
                  className="w-[40.83px] h-[58.33px]"
                  src="/usaLocationIcon.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[22px] font-[700] uppercase ">{pro.name}</p>
                <p className="text-[18px] font-[700]">
                  Availability:{" "}
                  <span className="font-normal">{pro.availability}</span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
