// components/OrderSummary.jsx
import { toast } from "react-toastify";
import { usePostMutation } from "../../services/reactQuery";
import { useBookingContext } from "./BookingContext";
import { addMinutes, format } from "date-fns";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const calculateEndTime = (startTime, totalDuration, selectedDate) => {
    if (!startTime || !totalDuration || !selectedDate) return;
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = addMinutes(startDate, totalDuration);
    return format(endDate, "HH:mm");
  };

  function getWeekOfMonth(dateInput) {
    const date = new Date(dateInput);

    const dayOfMonth = date.getDate();

    return Math.ceil(dayOfMonth / 7);
  }

  const navigate = useNavigate();

  const { bookingData, updateBookingData } = useBookingContext();
  console.log("Booking Data is :", bookingData);
  const { mutate: createBookings, data: checkdata } =
    usePostMutation("bookings");
  const { id } = JSON.parse(localStorage.getItem("data")) || {};
  const [loading, setLoading] = useState(false);

  let totalServices = bookingData.services.reduce(
    (sum, s) => sum + s.duration,
    0
  );
  // const formattedTime = format(new Date(bookingData?.time), "HH:mm");
  function handleBookings() {
    setLoading(true);
    createBookings(
      {
        endpoint: "/api/create-booking",
        payload: {
          userId: id,
          endTime: calculateEndTime(
            bookingData?.time,
            totalServices,
            bookingData?.date
          ),
          organizationOwnerId: "680b2e451031eaa183eafec2",
          location: bookingData.location?._id,
          professionalId: bookingData.professional._id,
          services: bookingData?.services.map((val) => val?._id),
          // services: "67f75b2871c7c802a785f32d",
          bookingDate: format(new Date(bookingData.date), "yyyy-MM-dd"),
          bookingWeek: getWeekOfMonth(bookingData?.date),
          bookingTime: bookingData.time,
          totalPrice: bookingData.services.reduce(
            (sum, s) => +sum + +s.price,
            0
          ),
          paymentMethod: bookingData.location?.enableCashPayments
            ? "online"
            : "cash",
        },
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          toast.success("Booking Created Successfully", {
            position: "top-center",
          });

          console.log(data, checkdata);

          updateBookingData({
            location: null,
            professional: null,
            services: [],
            date: null,
            time: null,
            finalStep: false,
          });
          // if (bookingData.location?.enableCashPayments) {
          //   return navigate("/Login?role=customer");
          // }
          navigate("/checkout", { state: data });
        },
        onError: () => {
          setLoading(false);
          toast.error("Error Booking ", {
            position: "top-center",
          });
        },
      }
    );
  }

  return (
    <div className="lg:w-[400px] bg-black p-3  flex flex-col lg:p-6 h-full justify-between sticky top-5 rounded-3xl ">
      <div className="space-y-5 text-sm">
        <h2 className="text-[#FFFFFF] hidden lg:block  text-[32px] font-[500] text-center mb-8">
          Order Summary
        </h2>
        {/* Location Section  */}
        {bookingData.location && (
          <div className="flex flex-col gap-[10px]">
            <p className="text-white uppercase  text-[22px] font-[700]">
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
            <Button
              loading={loading}
              loaderProps={{ type: "dots" }}
              fullWidth
              radius={"md"}
              variant="white"
              c={"dark"}
              mt={"md"}
              size="md"
              onClick={handleBookings}
              className="  !text-[18px]  !font-[400]  "
            >
              {bookingData.location?.enableCashPayments
                ? "Book Now"
                : "Proceed To Checkout"}
            </Button>
          )}
      </div>
    </div>
  );
}
