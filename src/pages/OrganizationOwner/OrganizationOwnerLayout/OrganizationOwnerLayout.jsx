import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MobileNav from "../../../components/Sidebar/MobileNav";

import {
  MdDashboard,
  MdMyLocation,
  MdCalendarMonth,
  MdOutlinePayment,
} from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { ImUsers } from "react-icons/im";

export default function OrganizationOwnerLayout() {
  const data = [
    {
      link: "",
      label: "Dashboard",
      activePath: "/OrganizationOwnerDashboard",
      icon: MdDashboard,
    },
    {
      link: "Services",
      label: "Services",
      activePath: "/OrganizationOwnerDashboard/Services",
      icon: HiWrenchScrewdriver,
    },
    {
      link: "locations",
      label: "Locations",
      activePath: "/OrganizationOwnerDashboard/locations",
      icon: MdMyLocation,
    },
    {
      link: "Users",
      label: "Users",
      activePath: "/OrganizationOwnerDashboard/Users",
      icon: ImUsers,
    },
    {
      link: "Calendar",
      label: "Calendar",
      activePath: "/OrganizationOwnerDashboard/Calendar",
      icon: MdCalendarMonth,
    },
    {
      link: "Payout",
      label: "Payout",
      activePath: "/OrganizationOwnerDashboard/Payout",
      icon: MdOutlinePayment,
    },
  ];
  const settingData = {
    link: "settings",
    label: "Settings",
    activePath: "/OrganizationOwnerDashboard/settings",
  };
  return (
    <section className="flex mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-[300px] h-screen self-start">
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
