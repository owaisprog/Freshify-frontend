import { useState } from "react";

import { Group, Title } from "@mantine/core";
import classes from "./NavbarSimple.module.css";
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

  console.log(currentPath);

  const [active, setActive] = useState(currentPath);
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.activePath === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.activePath)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav
      className={`${classes.navbar}  min-h-screen md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] `}
    >
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Title
            className="w-full"
            ta={"center"}
            order={1}
            c={"white"}
            fw={"normal"}
          >
            Freshify
          </Title>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link
          to={"#"}
          data-active={"settings" === active || undefined}
          className={classes.link}
          onClick={() => setActive("settings")}
        >
          <MdOutlineSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
