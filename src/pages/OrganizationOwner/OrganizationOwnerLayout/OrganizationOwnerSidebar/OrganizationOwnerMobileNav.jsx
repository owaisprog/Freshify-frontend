import { useState } from "react";
import freshifyLogo from "../.././../../assets/freshifyLogo.png";
import { Image, Drawer, Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

// Reuse your existing icons and data
import {
  MdDashboard,
  MdMyLocation,
  MdCalendarMonth,
  MdOutlinePayment,
  MdOutlineSettings,
} from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { ImUsers } from "react-icons/im";

// Reuse your existing data array
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
    link: "Users",
    label: "Users",
    activePath: "/OrganizationOwnerDashboard/Users",
    icon: ImUsers,
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
];

export default function OrganizationOwnerMobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(currentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const links = data.map((item) => (
    <Link
      className={`flex items-center no-underline text-sm px-4 py-3 font-medium text-[#b1b1b1] hover:bg-gray-50 hover:text-black ${
        item.activePath === active
          ? "bg-[#f5f7fa] border-l-4 border-black text-black"
          : ""
      }`}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.activePath);
        setIsMenuOpen(false);
      }}
    >
      <item.icon
        className={`${item.activePath === active ? "text-black" : "text-[#b1b1b1]"} mr-4 w-[30px] h-[30px]`}
      />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div className="lg:hidden bg-[#FFFFFF] fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <nav className=" z-20 px-4 py-3 flex justify-between items-center">
        <Image radius="md" src={freshifyLogo} w={250} />

        <Burger
          opened={isMenuOpen}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        />
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        opened={isMenuOpen}
        onClose={toggleMenu}
        position="left"
        size="80%"
        zIndex={40}
        withCloseButton={false}
        classNames={{
          body: "!px-0 !pt-24 h-full", // Force full height on drawer body
          content: " h-full", // Full height for drawer content
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col h-full    ">
          <div className="flex-1 overflow-y-auto">
            <div className="mt-2">{links}</div>
            {/* Settings Link */}
            <div className="pt-4  ">
              <Link
                to="settings"
                className={`flex items-center no-underline text-sm px-4  font-medium text-[#b1b1b1] hover:bg-gray-50 ${
                  "settings" === active
                    ? "bg-[#f5f7fa] border-l-4 py-4 border-black text-black"
                    : ""
                }`}
                onClick={() => {
                  setActive("settings");
                  setIsMenuOpen(false);
                }}
              >
                <MdOutlineSettings className="text-[#b1b1b1] mr-4 w-[25px] h-[25px]" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
