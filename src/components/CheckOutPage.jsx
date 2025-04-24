// src/components/CheckoutPage.js

import { useLocation } from "react-router-dom";
import { usePostMutation } from "../services/reactQuery";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { mutate: createPayment } = usePostMutation("payment");

  const location = useLocation();
  const bookingData = location.state;
  const { booking } = bookingData || {};
  const {
    name,
    email,
    phone,
    bookingDate,
    bookingTime,
    endTime,
    totalDuration,
    totalPrice,
  } = booking || {};
  function handlePayment() {
    createPayment(
      {
        endpoint: `/api/customer-payment`,
        payload: {
          price: totalPrice,
          merchantAccountId: "acct_1RGFXGGamXrYD38W",
          description: "Test payment for Product XYZ",
        },
      },
      {
        onSuccess: () =>
          toast.success("Payment  Successfull", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error While Creating Payment", {
            position: "top-center",
          }),
      }
    );
  }
  // console.log(bookingData?.bookingData.booking);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className=" p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-medium">Booking Name:</label>
          <p className="text-sm">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Email:</label>
          <p className="text-sm">{email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Phone:</label>
          <p className="text-sm">{phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Booking Date:</label>
          <p className="text-sm">
            {new Date(bookingDate).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Booking Time:</label>
          <p className="text-sm">{bookingTime}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">End Time:</label>
          <p className="text-sm">{endTime}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Total Duration:</label>
          <p className="text-sm">{totalDuration} minutes</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Total Price:</label>
          <p className="text-sm">${totalPrice}</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handlePayment}
          className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
