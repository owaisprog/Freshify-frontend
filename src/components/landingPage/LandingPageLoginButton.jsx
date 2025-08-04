import { MdArrowOutward } from "react-icons/md";
import { Button, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

export function ButtonMenu() {
  const navigate = useNavigate();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
      radius="md"
    >
      <Menu.Target>
        <Button
          rightSection={
            <MdKeyboardArrowDown size={20} color="white" stroke={1.5} />
          }
          px={"lg"}
          color="dark"
          radius="md"
          size="md"
        >
          Partners
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Link to="/Login?role=superadmin">
          <Menu.Item
            rightSection={
              <MdArrowOutward size={16} color="black" stroke={1.5} />
            }
          >
            SuperAdmin
          </Menu.Item>
        </Link> */}

        <Menu.Item
          onClick={() => navigate("/organizationLanding", scrollTo(0, 0))}
          rightSection={<MdArrowOutward size={16} color="black" stroke={1.5} />}
        >
          Organization Owner
        </Menu.Item>

        {/* <Link to="/organizationOwnerUserLogin">
          <Menu.Item
            rightSection={
              <MdArrowOutward size={16} color="black" stroke={1.5} />
            }
          >
            Organization Admin
          </Menu.Item>
        </Link> */}
        {/* <Link to="/organizationOwnerUserLogin">
          <Menu.Item
            rightSection={
              <MdArrowOutward size={16} color="black" stroke={1.5} />
            }
          >
            Professional
          </Menu.Item>
        </Link> */}

        <Link to="/Login?role=customer">
          <Menu.Item
            rightSection={
              <MdArrowOutward size={16} color="black" stroke={1.5} />
            }
          >
            Customer
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
