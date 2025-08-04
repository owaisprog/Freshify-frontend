// components/steps/ProfessionalStep.jsx
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import { useQueryHook } from "../../services/reactQuery";
import { Loader } from "@mantine/core";

// const professionals = [
//   { name: "Mirza Tayyab Khalid", availability: "TODAY", id: 1 },
//   { name: "Ali Ahmed", availability: "TOMORROW", id: 2 },
//   { name: "Sara Khan", availability: "FRIDAY, 7 MARCH", id: 3 },
// ];

export default function ProfessionalStep() {
  const { updateBookingData, bookingData } = useBookingContext();
  const { _id } = bookingData.location || {};
  //consoe.log(_id, "id");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!bookingData.professional) navigate("/booking/professional");
  // }, []);
  const {
    data: allUsers = [],
    isLoading,
    // error,
  } = useQueryHook({
    queryKey: ["users", _id], // ✅ Cache users by owner ID
    endpoint: `/api/public/barbers/location/${_id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  const professionals = allUsers.filter((val) => val.role == "barber");

  const handleSelect = (professional) => {
    updateBookingData({ professional });
    navigate("/booking/services");
  };
  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-[20px] items-center justify-center p-6 rounded-lg">
        <Loader className="mx-auto " color="dark" type="bars" />
      </div>
    );
  return (
    <div className="h-full  flex flex-col gap-[20px]  justify-center  px-3 lg:px-0 rounded-lg">
      <h1 className=" text-[28px] lg:text-[32px] text-center lg:text-left font-[500]">
        Choose Professional
      </h1>

      <div className="space-y-4 w-full  pb-[100px] lg:pb-0 ">
        {professionals.length > 0 ? (
          professionals.map((pro) => (
            <button
              key={pro._id}
              onClick={() => handleSelect(pro)}
              className="   min-w-full  justify-between gap-x-2 cursor-pointer  items-center  p-2 rounded-xl specialBorder min-h-[120px]   bg-[#FFFFFF] border specialBorder hover:bg-black hover:text-white hover:border-none
             transition-all duration-500 "
            >
              <div className="flex    gap-3">
                <div className="h-[100px] flex items-center  justify-center w-[100px]  bg-[#B1B1B1] rounded-[20px]">
                  <img
                    className="w-[40px] h-[40px]"
                    src="/personIcon.png"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col justify-center  ">
                  <p className="text-[16px]  text-left lg:text-[22px] font-[700] uppercase ">
                    {pro.name}
                  </p>
                  <p className="text-[18px] text-left font-[700]">
                    Availability:{" "}
                    <span className="font-normal capitalize">
                      {pro.availability}
                    </span>
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <h1>No Professional Available</h1>
        )}
      </div>
    </div>
  );
}
