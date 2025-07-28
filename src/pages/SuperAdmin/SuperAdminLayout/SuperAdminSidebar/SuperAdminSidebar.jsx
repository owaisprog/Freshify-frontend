import { useState } from "react";
import freshifyLogo from "../.././../../assets/bg_White.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { RiPriceTag2Line } from "react-icons/ri";
// react icons import

import { GoOrganization } from "react-icons/go";
import { logoutUser } from "../../../../services/AuthServices";

const data = [
  {
    link: "",
    label: "Organizations",
    activePath: "/SuperAdminOrganization",
    icon: GoOrganization,
  },
  {
    link: "plan",
    label: "Plans",
    activePath: "/SuperAdminOrganization/plan",
    icon: RiPriceTag2Line,
  },
];

export default function SuperAdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState(currentPath);

  const links = data.map((item) => (
    <Link
      className={`group rounded-[8px] flex items-center gap-[10px] no-underline text-[18px] font-[400] px-4 py-2 transition-all duration-300 text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-[#f5f7fa] dark:hover:text-black ${
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
          item.activePath === active
            ? "text-black"
            : "text-[#b1b1b1] group-hover:text-black"
        } mr-2 w-[30px] h-[30px]`}
      />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className=" flex flex-col rounded-2xl h-full bg-[#040707]">
      <div className="flex-1 rounded-2xl">
        <div className=" h-[100px]  rounded-2xl">
          <img
            className="object-center h-full w-full p-4 !rounded-2xl"
            src={freshifyLogo}
          />
        </div>

        <div className="flex flex-col gap-2 mx-4">{links}</div>
      </div>

      <button
        className={`group rounded-[8px]  cursor-pointer  m-4 flex items-center gap-[10px] no-underline text-[18px] font-[400] px-4 py-2 transition-all duration-300 text-[#b1b1b1] hover:bg-gray-50 hover:text-black dark:hover:bg-[#f5f7fa] dark:hover:text-black `}
        onClick={() => logoutUser()}
      >
        <CiLogout
          className={`text-[#b1b1b1] group-hover:text-black
           mr-2 w-[30px] h-[30px]`}
        />
        Logout
      </button>
    </nav>
  );
}
