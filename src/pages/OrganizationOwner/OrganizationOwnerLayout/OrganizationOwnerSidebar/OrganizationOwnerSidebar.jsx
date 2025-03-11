import { useState } from "react";
import freshifyLogo from "../.././../../assets/freshifyLogo.png";
import { Group, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// react icons import
import {
  MdDashboard,
  MdMyLocation,
  MdCalendarMonth,
  MdOutlinePayment,
  MdOutlineSettings,
} from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { ImUsers } from "react-icons/im";

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
    activePath: "/OrganizationOwnerDashboard/Locations",
    icon: MdMyLocation,
  },
  {
    link: "",
    label: "Calendar",
    activePath: "/OrganizationOwnerDashboard/Calendar",
    icon: MdCalendarMonth,
  },
  {
    link: "",
    label: "Payout",
    activePath: "/OrganizationOwnerDashboard/Payout",
    icon: MdOutlinePayment,
  },
  {
    link: "Users",
    label: "Users",
    activePath: "/OrganizationOwnerDashboard/Users",
    icon: ImUsers,
  },
];

export default function OrganizationOwnerSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(currentPath);

  const links = data.map((item) => (
    <Link
      className={`flex items-center no-underline text-sm px-4 py-2 font-medium text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white ${
        item.activePath === active
          ? "bg-[#f5f7fa] border-l-4 border-black text-black"
          : ""
      }`}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.activePath)}
    >
      <item.icon className="text-[#b1b1b1] mr-4 w-[30px] h-[30px]" />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className="  flex flex-col h-screen">
      <div className="flex-1">
        <Group
          className="pb-4 mb-6 border-b border-gray-300 dark:border-gray-700"
          justify="space-between"
        >
          <Image radius="md" src={freshifyLogo} />
        </Group>
        {links}
      </div>

      <div className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700">
        <Link
          to={"#"}
          className={`flex items-center no-underline text-sm px-4 py-2 font-medium text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white ${
            "settings" === active
              ? "bg-[#f5f7fa] border-l-4 border-black text-black"
              : ""
          }`}
          onClick={() => setActive("settings")}
        >
          <MdOutlineSettings className="text-[#b1b1b1] mr-4 w-[25px] h-[25px]" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
