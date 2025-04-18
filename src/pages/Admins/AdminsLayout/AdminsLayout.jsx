import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/Sidebar/Sidebar";
import MobileNav from "../../../components/Sidebar/MobileNav";
import { MdCalendarMonth, MdDashboard, MdOutlinePayment } from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { ImUsers } from "react-icons/im";

export default function AdminsLayout() {
  const data = [
    {
      link: "",
      label: "Dashboard",
      activePath: "/AdminsDashboard",
      icon: MdDashboard,
    },
    {
      link: "Services",
      label: "Services",
      activePath: "/AdminsDashboard/Services",
      icon: HiWrenchScrewdriver,
    },

    {
      link: "Users",
      label: "Users",
      activePath: "/AdminsDashboard/Users",
      icon: ImUsers,
    },
    {
      link: "Calendar",
      label: "Calendar",
      activePath: "/AdminsDashboard/Calendar",
      icon: MdCalendarMonth,
    },
    {
      link: "Payout",
      label: "Payout",
      activePath: "/AdminsDashboard/Payout",
      icon: MdOutlinePayment,
    },
  ];

  const settingData = {
    link: "settings",
    label: "Settings",
    activePath: "/AdminsDashboard/settings",
  };

  return (
    <section className="flex mx-auto min-h-screen   lg:p-5">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-5 left-0  w-[300px]  self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <Sidebar data={data} settingData={settingData} />
      </aside>

      <nav className="lg:hidden">
        <MobileNav data={data} settingData={settingData} />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full flex-1 overflow-y-auto  ">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
