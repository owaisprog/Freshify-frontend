// src/components/CheckoutPage.js

import { useLocation, useNavigate } from "react-router-dom";
import { usePostMutation } from "../services/reactQuery";
import { toast } from "react-toastify";
import { Button, Title } from "@mantine/core";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { mutate: createPayment, isPending } = usePostMutation("payment");
  const data = JSON.parse(localStorage.getItem("data"));
  const token = localStorage.getItem("token") || {};
  const location = useLocation();
  const bookingData = location.state;
  const { booking, merchantId } = bookingData || {};
  //consoe.log("Booking Data", bookingData);
  const {
    name,
    email,
    phone,
    bookingDate,
    bookingTime,
    endTime,
    totalDuration,
    paymentMethod,
    totalPrice,
  } = booking || {};
  function handlePayment() {
    createPayment(
      {
        endpoint: `/api/customer-payment`,
        payload: {
          price: totalPrice,
          merchantAccountId: merchantId,
        },
      },
      {
        onSuccess: (navigate) => {
          window.location.href = navigate.url;
        },
        onError: () =>
          toast.error("Error While Creating Payment", {
            position: "top-center",
          }),
      }
    );
  }

  function handleCashPay() {
    if (data?.role === "customer" && token) {
      navigate("/CustomerDashboard");
    } else {
      navigate("/Login?role=customer");
    }
  }
  return (
    <section className=" min-h-[100dvh] flex  flex-col items-center  p-4 ">
      <Title
        mb="lg"
        c="black"
        className="lg:!px-6 !w-full !text-center  bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Checkout
      </Title>
      <div className="max-w-4xl w-full rounded-xl mx-auto p-6 bg-[#FFFFFF]">
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
      <div className="flex w-full gap-4 max-w-4xl">
        <Button
          loading={isPending}
          loaderProps={{ type: "bars" }}
          disabled={isPending}
          onClick={handlePayment}
          className="!bg-black !text-white mt-4 !w-full !max-w-4xl   !h-[41px] !px-[40px] !py-[10px] !rounded-lg  hover:!bg-black/80 !transition-all !duration-300 !cursor-pointer"
        >
          Pay Online
        </Button>
        {paymentMethod === "cash" && (
          <Button
            onClick={handleCashPay}
            className="!bg-black !text-white mt-4 !w-full !max-w-4xl   !h-[41px] !px-[40px] !py-[10px] !rounded-lg  hover:!bg-black/80 !transition-all !duration-300 !cursor-pointer"
          >
            Cash Pay
          </Button>
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;
