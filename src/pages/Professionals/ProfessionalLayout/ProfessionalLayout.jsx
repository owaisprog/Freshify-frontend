import { Outlet } from "react-router-dom";

import { MdCalendarMonth } from "react-icons/md";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MobileNav from "../../../components/Sidebar/MobileNav";

export default function ProfessionalLayout() {
  const data = [
    {
      link: "",
      label: "Calendar",
      activePath: "/ProfessionalDashboard",
      icon: MdCalendarMonth,
    },
  ];

  const settingData = {
    link: "settings",
    label: "Settings",
    activePath: "/ProfessionalDashboard/settings",
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
