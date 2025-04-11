// components/BookingLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import OrderSummary from "./OrderSummary.jsx";
import { Image, Modal } from "@mantine/core";
import freshifyImage from "../../assets/freshifyImage.png";

export default function BookingLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10   md:px-10  min-h-screen">
      {/* Main Content */}
      <div className="flex-1 text-black max-w-[1207px]  w-full  ">
        <section className=" lg:hidden mb-8 h-[85px] md:h-[100px] md:py-2  overflow-hidden bg-black flex items-center justify-center rounded-bl-xl rounded-br-xl">
          <Image
            radius="md"
            className="object-contain  w-full lg:w-[60%]  "
            src={freshifyImage}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </section>
        <Outlet />
      </div>

      {/* Desktop Order Summary */}
      <div className="hidden lg:block ">
        <OrderSummary />
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed lg:hidden bottom-4 right-4 bg-white text-black py-3 px-6 rounded-full shadow-lg z-50 hover:bg-gray-100 transition-colors"
      >
        Show Order Summary
      </button>

      {/* Mantine Modal for Mobile */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Summary"
        size="95%"
        radius="xl"
        classNames={{
          title: "!text-[22px] !text-white",
          close: "!text-white",
          header: "!bg-black",
          body: "!p-0", // Remove default modal padding
          content: "!bg-black !overflow-visible",
        }}
        centered
        withCloseButton={true}
      >
        <div className="relative">
          <OrderSummary />
        </div>
      </Modal>
    </div>
  );
}
