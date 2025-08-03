import { Outlet } from "react-router-dom";

import { MdCalendarMonth } from "react-icons/md";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MobileNav from "../../../components/Sidebar/MobileNav";

export default function CustomerLayout() {
  const data = [
    {
      link: "",
      label: "Appointments",
      activePath: "/CustomerDashboard",
      icon: MdCalendarMonth,
    },
  ];

  const settingData = {
    link: "settings",
    label: "Settings",
    activePath: "/CustomerDashboard/settings",
  };
  return (
    <section className="flex  lg:gap-6  mx-auto h-screen overflow-y-auto   lg:p-5">
      {/* Sidebar (Left side) */}
      <aside className="hidden  h-full lg:block sticky top-0 left-0  w-[300px]  self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <Sidebar data={data} settingData={settingData} />
      </aside>

      <nav className="lg:hidden">
        <MobileNav data={data} settingData={settingData} />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full  flex-1  ">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
