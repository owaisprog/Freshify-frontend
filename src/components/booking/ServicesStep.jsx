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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Select Services</h1>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => toggleService(service)}
            className={`p-4 border rounded-lg text-left transition-colors
              ${
                bookingData.services.some((s) => s.name === service.name)
                  ? "bg-blue-50 border-blue-200 ring-2 ring-blue-500"
                  : "hover:bg-gray-50"
              }`}
          >
            <p className="font-semibold mb-2">{service.name}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{service.time} MINS</span>
              <span className="font-semibold">${service.price}</span>
            </div>
          </button>
        ))}
      </div>

      {bookingData.services.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/booking/datetime")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-colors font-medium"
          >
            Next → Choose Time
          </button>
        </div>
      )}
    </div>
  );
}
