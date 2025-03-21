import { useState } from "react";
import freshifyLogoMobile from "../.././../../assets/freshifyLogoMobile.png";
import { Image, Drawer, Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

// Reuse your existing icons and data
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { logoutUser } from "../../SuperAdminAuth/services/AuthServices";
// Reuse your existing data array
const data = [
  {
    link: "",
    label: "Organization",
    activePath: "/SuperAdminOrganization",
    icon: MdDashboard,
  },
  // {
  //   link: "Services",
  //   label: "Services",
  //   activePath: "/SuperAdminDashboard/Services",
  //   icon: HiWrenchScrewdriver,
  // },
  // {
  //   link: "locations",
  //   label: "Locations",
  //   activePath: "/SuperAdminDashboard/Locations",
  //   icon: MdMyLocation,
  // },
  // {
  //   link: "Users",
  //   label: "Users",
  //   activePath: "/SuperAdminDashboard/Users",
  //   icon: ImUsers,
  // },
  // {
  //   link: "Calendar",
  //   label: "Calendar",
  //   activePath: "/SuperAdminDashboard/Calendar",
  //   icon: MdCalendarMonth,
  // },
  // {
  //   link: "Payout",
  //   label: "Payout",
  //   activePath: "/SuperAdminDashboard/Payout",
  //   icon: MdOutlinePayment,
  // },
];

export default function SuperAdminMobileNav() {
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
        className={`${
          item.activePath === active ? "text-black" : "text-[#b1b1b1]"
        } mr-4 w-[30px] h-[30px]`}
      />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div className="lg:hidden bg-[#FFFFFF] fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <nav className=" z-20  pr-4 flex justify-between items-center ">
        <div className=" h-[80px]  w-[85%]">
          <Image className="h-full" radius="md" src={freshifyLogoMobile} />
        </div>
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
        size="100%"
        zIndex={40}
        withCloseButton={false}
        classNames={{
          body: "!px-0 !pt-24 h-full", // Force full height on drawer body
          content: " h-full", // Full height for drawer content
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col h-full justify-between    ">
          <div className="flex-1 overflow-y-auto">
            <div className="mt-2">{links}</div>
            {/* Settings Link */}
          </div>
          <button
            className="!text-[18px] !px-[40px] bg-black !font-[400] !py-[10px] text-white rounded-tr-md cursor-pointer "
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </button>
        </div>
      </Drawer>
    </div>
  );
}
