import { useState } from "react";
import freshifyLogo from "../.././../../assets/freshifyLogo.png";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// react icons import

import { GoOrganization } from "react-icons/go";
import { logoutUser } from "../../SuperAdminAuth/services/AuthServices";

const data = [
  {
    link: "",
    label: "Organizations",
    activePath: "/SuperAdminOrganization",
    icon: GoOrganization,
  },
];

export default function SuperAdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(currentPath);

  const links = data.map((item) => (
    <Link
      className={`flex items-center gap-[10px] no-underline text-[18px] font-[400] px-4 py-2  text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-[#f5f7fa] dark:hover:text-black ${
        item.activePath === active
          ? "bg-[#f5f7fa] border-l-4 border-black text-black"
          : ""
      }`}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.activePath)}
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
    <nav className="  flex flex-col  h-screen bg-[#FFFFFF]">
      <div className="flex-1">
        <Image className="w-full h-[78px] " radius="md" src={freshifyLogo} />

        {links}
      </div>

      <button
        className="!text-[18px] !px-[40px] bg-black !font-[400] !py-[10px] text-white rounded-tr-md cursor-pointer "
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </button>
    </nav>
  );
}
