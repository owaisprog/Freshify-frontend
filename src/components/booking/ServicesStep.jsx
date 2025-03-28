// components/steps/ServicesStep.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "./BookingContext";

const services = [
  { name: "Haircut", time: 30, price: 40 },
  { name: "Beard Trim", time: 15, price: 30 },
  { name: "Shaving", time: 20, price: 20 },
];

export default function ServicesStep() {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();

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

  return (
    <div className=" h-full gap-[10px] flex flex-col justify-center p-6 rounded-lg shadow-sm">
      <h1 className="text-[32px] font-[500]">Select Services</h1>
      <div className="grid lg:grid-cols-3 gap-3 ">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => toggleService(service)}
            className={`relative flex cursor-pointer flex-col items-start max-w-[329px] h-[187px] p-[30px] rounded-[25px] bg-[#FFFFFF] specialBorder
              ${
                bookingData.services.some((s) => s.name === service.name)
                  ? "bg-blue-50 border-blue-200 ring-2 ring-blue-500"
                  : "hover:bg-gray-50"
              }`}
          >
            <p className="text-[22px] font-[700] uppercase">{service.name}</p>

            <p className="text-[22px] uppercase">TIME: {service.time} MINS</p>

            <span className=" text-[22px] font-[400] uppercase bg-black absolute text-white rounded-l-[10px] w-[50px] bottom-6 right-0">
              ${service.price}
            </span>
          </button>
        ))}
      </div>

      {bookingData.services.length > 0 && (
        <button
          onClick={() => navigate("/booking/datetime")}
          className="w-[311px] h-[41px] cursor-pointer text-white bg-black rounded-[10px] text-center"
        >
          Choose Time
        </button>
      )}
    </div>
  );
}
