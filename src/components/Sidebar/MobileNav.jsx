import { useState } from "react";
import freshifyLogoMobile from "../../assets/freshifyLogoMobile.png";
import { Image, Drawer, Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

// Reuse your existing icons and data
import { MdOutlineSettings } from "react-icons/md";
import { logoutUser } from "../../services/AuthServices";

export default function MobileNav({ data }) {
  const { role } = JSON.parse(localStorage.getItem("data"));
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
    <div className="lg:hidden bg-black fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <nav className=" z-20  pr-4 flex justify-between items-center ">
        <div className=" h-[80px]  w-[85%]">
          <Image className="h-full" radius="md" src={freshifyLogoMobile} />
        </div>
        <Burger
          color="white"
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
        <div className="flex flex-col h-full    ">
          <div className="flex-1 overflow-y-auto">
            <div className="mt-2">{links}</div>
            {/* Settings Link */}
            {role === "superadmin" ? (
              <button
                className="!text-[18px] !px-[40px] bg-black !font-[400] !py-[10px] text-white rounded-tr-md cursor-pointer "
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </button>
            ) : (
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
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
