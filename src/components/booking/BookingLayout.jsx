// components/BookingLayout.jsx
import { Outlet } from "react-router-dom";
import OrderSummary from "./OrderSummary.jsx";

export default function BookingLayout() {
  return (
    <div className="flex justify-between gap-10 px-10 py-5  min-h-screen">
      <div className="flex-1 text-black">
        <Outlet />
      </div>

      <OrderSummary />
    </div>
  );
}
