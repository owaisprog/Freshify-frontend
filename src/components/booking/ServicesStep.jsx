import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";
import { useQueryHook } from "../../services/reactQuery";
import { Loader } from "@mantine/core";

// const services = [
//   { name: "Haircut", time: 30, price: 40 },
//   { name: "Beard Trim", time: 15, price: 30 },
//   { name: "Shaving", time: 20, price: 20 },
// ];

export default function ServicesStep() {
  const { bookingData, updateBookingData } = useBookingContext();
  // const id = bookingData.professional?._id;
  const { _id } = bookingData.professional || {};
  const navigate = useNavigate();
  const {
    data: services = [],
    isLoading,
    // error,
  } = useQueryHook({
    queryKey: ["services", _id], // ✅ Cache users by owner ID
    endpoint: `/api/get-services-by-barber/${_id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  console.log(services);
  // useEffect(() => {
  //   if (!bookingData.professional) navigate("/booking/services");
  // }, []);

  const toggleService = (service) => {
    const newServices = bookingData.services.some(
      (s) => s.name === service.name
    )
      ? bookingData.services.filter((s) => s.name !== service.name)
      : [...bookingData.services, service];

    updateBookingData({ services: newServices });
  };
  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-[20px] items-center justify-center p-6 rounded-lg">
        <Loader className="mx-auto " color="blue" type="bars" />
      </div>
    );
  return (
    <div className=" h-full gap-[10px] flex flex-col  justify-center px-3 lg:px-0 rounded-lg ">
      <h1 className="text-[32px] font-[500] text-center lg:text-left">
        Select Services
      </h1>
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center gap-6   w-full ">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => toggleService(service)}
            className={`relative group hover:bg-slate-950  hover:text-white flex cursor-pointer flex-col items-start w-full h-[112px] lg:h-[187px] p-[30px] rounded-[25px] bg-[#FFFFFF] specialBorder transition-all duration-500
              ${
                bookingData.services.some((s) => s.name === service.name)
                  ? "bg-black text-white"
                  : ""
              }`}
          >
            <p className="text-[18px] lg:text-[22px] font-[700] uppercase">
              {service.name}
            </p>

            <p className="text-[18px] lg:text-[22px]  uppercase">
              TIME: {service.duration} MINS
            </p>

            <span
              className={` group-hover:bg-white group-hover:text-black transition-all duration-500 text-[22px] font-[400] uppercase bg-black absolute text-white rounded-l-[10px] w-[50px] bottom-1/3 lg:bottom-6 right-0  ${
                bookingData.services.some((s) => s.name === service.name)
                  ? "bg-white !text-black"
                  : ""
              }`}
            >
              ${service.price}
            </span>
          </button>
        ))}
      </div>

      {bookingData.services.length > 0 && (
        <button
          onClick={() => navigate("/booking/datetime")}
          className="self-end my-3 w-[311px] h-[41px] cursor-pointer text-white bg-black rounded-[10px] text-center"
        >
          Choose Time
        </button>
      )}
    </div>
  );
}
