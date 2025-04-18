import { useState } from "react";
import { Image, Drawer, Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import freshifyLogo from "../.././../../assets/freshifyLogoMobile.png";

// Reuse your existing icons and data
import { MdDashboard } from "react-icons/md";
import { logoutUser } from "../../../../services/AuthServices";
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
    <div className="lg:hidden bg-black fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <nav className=" z-20  pr-4 flex justify-between items-center ">
        <div className=" h-[80px]  w-[85%]">
          <Image className="h-full" radius="md" src={freshifyLogo} />
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
          body: "!px-0 !pt-24 h-full bg-black", // Force full height on drawer body
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
            className="!text-[18px] !px-[40px] text-white border border-white hover:bg-[#FFFFFF] hover:text-black !font-[600] !py-[10px]    rounded-md cursor-pointer "
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
