// components/OrderSummary.jsx
import { toast } from "react-toastify";
import { usePostMutation } from "../../services/reactQuery";
import { useBookingContext } from "./BookingContext";

export default function OrderSummary() {
  function getWeekOfMonth(dateInput) {
    const date = new Date(dateInput);

    const dayOfMonth = date.getDate();

    return Math.ceil(dayOfMonth / 7);
  }

  const { bookingData } = useBookingContext();
  const { mutate: createBookings } = usePostMutation("bookings");
  const { id } = JSON.parse(localStorage.getItem("data")) || {};

  console.log({
    userId: "67f39793571ab1adb536898f",
    organizationOwnerId: "67e45bf2ddeafab8b200eb2b",
    location: bookingData?.location?.name,
    professionalId: bookingData?.professional?._id,
    services: bookingData?.services,
    bookingDate: bookingData?.date,
    bookingWeek: getWeekOfMonth(bookingData?.date),
    bookingTime: bookingData?.time,
    totalPrice: bookingData?.services.reduce((sum, s) => +sum + +s?.price, 0),
    paymentMethod: "online",
  });

  function handleBookings() {
    createBookings(
      {
        endpoint: "/api/create-booking",
        payload: {
          userId: "67f39793571ab1adb536898f",
          organizationOwnerId: "67e45bf2ddeafab8b200eb2b",
          location: bookingData.location.name,
          professionalId: bookingData.professional._id,
          services: bookingData.services,
          bookingDate: bookingData.date,
          bookingWeek: getWeekOfMonth(bookingData?.date),
          bookingTime: bookingData.time,
          totalPrice: bookingData.services.reduce(
            (sum, s) => +sum + +s.price,
            0
          ),
          paymentMethod: "online",
        },
      },
      {
        onSuccess: () =>
          toast.success("Booking Created Successfully", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error Booking ", {
            position: "top-center",
          }),
      }
    );
  }

  return (
    <div className="w-[400px] bg-black flex flex-col justify-between sticky top-5 rounded-3xl p-6">
      <div className="space-y-5 text-sm">
        <h2 className="text-[#FFFFFF] text-[32px] font-[500] text-center mb-8">
          Order Summary
        </h2>
        {/* Location Section  */}
        {bookingData.location && (
          <div className="flex flex-col gap-[10px]">
            <p className="text-white uppercase text-[22px] font-[700]">
              LOCATION
            </p>
            <div className="flex gap-[10px] items-center">
              <div
                className="bg-[#B1B1B1] h-[50px] w-[50px] rounded-full flex 
                items-center justify-center"
              >
                <img src="/locationIcon.png" alt="Location" />
              </div>
              <p className="text-white text-[18px] font-[400]">
                {bookingData.location.name}
              </p>
            </div>
          </div>
        )}

        {/* Professional Section  */}
        {bookingData.professional && (
          <div className="flex flex-col gap-[10px]">
            <p className="text-white uppercase text-[22px] font-[700]">
              PROFESSIONAL
            </p>
            <div className="flex gap-[10px] items-center">
              <div
                className="bg-[#B1B1B1] h-[50px] w-[50px] rounded-full flex 
                items-center justify-center"
              >
                <img src="/locationIcon.png" alt="Professional" />
              </div>
              <p className="text-white text-[18px] font-[400]">
                {bookingData.professional.name}
              </p>
            </div>
          </div>
        )}

        {/* Services Section  */}
        {bookingData.services.length > 0 && (
          <div className="flex flex-col gap-[10px]">
            <p className="text-white uppercase text-[22px] font-[700]">
              SERVICES
            </p>
            <div className="space-y-2">
              {bookingData.services.map((service) => (
                <div
                  key={service.name}
                  className="flex justify-between text-white 
                  text-[18px] font-[400]"
                >
                  <span>{service.name}</span>
                  <span>${service.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Service Time Section  */}
        {bookingData.services.length > 0 && (
          <div className="">
            <p className="text-white uppercase text-[22px] font-[700]">
              TOTAL SERVICE TIME
            </p>
            <p className="text-white text-[18px] font-[400]">
              {bookingData.services.reduce((sum, s) => sum + s.duration, 0)}{" "}
              MINS
            </p>
          </div>
        )}
        {/* Booking Date section  */}
        {bookingData.date && (
          <div className="">
            <p className="text-white uppercase text-[22px] font-[700]">DATE</p>
            <p className="text-white text-[18px] font-[400]">
              {new Date(bookingData.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}

        {bookingData.time && (
          <div className="">
            <p className="text-white uppercase text-[22px] font-[700]">TIME</p>
            <p className="text-white text-[18px] font-[400]">
              {bookingData.time}
            </p>
          </div>
        )}
      </div>
      {/* Subtotal and proceed button section  */}
      <div className="justify-self-end">
        {bookingData.services.length > 0 && (
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <span className="text-white uppercase text-[22px] font-[700]">
                SUB TOTAL
              </span>
              <span className="text-white uppercase text-[22px] font-[700]">
                ${bookingData.services.reduce((sum, s) => +sum + +s.price, 0)}
              </span>
            </div>
          </div>
        )}

        {bookingData.location &&
          bookingData.professional &&
          bookingData.services.length > 0 &&
          bookingData.date &&
          bookingData.time && (
            <button
              onClick={handleBookings}
              className="w-full py-3 bg-white text-black text-[18px] 
            font-[400] rounded-lg mt-6 hover:bg-gray-100 transition-colors"
            >
              Proceed To Checkout
            </button>
          )}
      </div>
    </div>
  );
}
