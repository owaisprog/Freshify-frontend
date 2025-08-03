import { useState } from "react";
import { Drawer, Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import freshifyLogo from "../.././../../assets/bg_white.png";

// Reuse your existing icons and data
import { MdDashboard } from "react-icons/md";
import { logoutUser } from "../../../../services/AuthServices";
import { CiLogout } from "react-icons/ci";
// Reuse your existing data array
const data = [
  {
    link: "",
    label: "Organization",
    activePath: "/SuperAdminOrganization",
    icon: MdDashboard,
  },
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
          ? "bg-[#f5f7fa] rounded-[8px] lg:border-l-4 border-black text-black"
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
    <div className="lg:hidden bg-[#040707] fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <nav className=" z-20  pr-4 px-2 flex justify-between items-center ">
        <div className="h-[80px] w-[75%] sm:w-[60%] overflow-hidden ">
          <img
            src={freshifyLogo}
            className="h-[80px] w-52 text-white object-contain"
          />
        </div>

        <Burger
          opened={isMenuOpen}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          color="#FFFFFF"
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
          body: "!px-0 !pt-24 h-full bg-[#040707]", // Force full height on drawer body
          content: " h-full ", // Full height for drawer content
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col h-full  px-4     ">
          <div className="flex-1 overflow-y-auto">
            <div className="mt-2">{links}</div>
            {/* Settings Link */}
          </div>
          <button
            className={`group rounded-[8px] border cursor-pointer border-white m-4 flex items-center gap-[10px] no-underline text-[18px] font-[400] px-4 py-2 transition-all duration-300 text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-[#f5f7fa] dark:hover:text-black `}
            onClick={() => logoutUser()}
          >
            <CiLogout
              className={`text-[#b1b1b1] group-hover:text-black
                     mr-2 w-[30px] h-[30px]`}
            />
            Logout
          </button>
        </div>
      </Drawer>
    </div>
  );
}
