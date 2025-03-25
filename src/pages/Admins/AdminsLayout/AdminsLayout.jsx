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
    // {
    //   link: "locations",
    //   label: "Locations",
    //   activePath: "/AdminsDashboard/Locations",
    //   icon: MdMyLocation,
    // },
    {
      link: "Users",
      label: "Users",
      activePath: "/AdminsDashboard/Users",
      icon: ImUsers,
    },
    {
      link: "",
      label: "Calendar",
      activePath: "/AdminsDashboard/Calendar",
      icon: MdCalendarMonth,
    },
    {
      link: "",
      label: "Payout",
      activePath: "/AdminsDashboard/Payout",
      icon: MdOutlinePayment,
    },
  ];

  return (
    <section className="flex mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-[300px] h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <Sidebar data={data} />
      </aside>

      <nav className="lg:hidden">
        <MobileNav data={data} />
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
