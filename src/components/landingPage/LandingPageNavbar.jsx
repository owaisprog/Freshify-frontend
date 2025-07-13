// import { ButtonMenu } from "./LandingPageLoginButton";
import { useLocation, useNavigate } from "react-router-dom";
import navbarLogo from "../../assets/navbarLogo.jpg";
import { FiMenu } from "react-icons/fi";
// import { useLocation } from "react-router-dom";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
export default function LandingPageNavbar() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();

  // const scrollToSection = (sectionId) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };
  return (
    <>
      <header className="border-b h-[80px]  border-gray-200 bg-white sticky top-0 z-50">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <img
              src={navbarLogo}
              className="h-[80px] w-52 text-white object-contain"
            />
            {/* {location.pathname === "/" ? (
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-600 hover:text-black transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("recomended")}
                className="text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                Recomended
              </button>

              <button
                onClick={() => scrollToSection("reviews")}
                className="text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                Reviews
              </button>
            </nav>
          ) : (
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("organizaton-home")}
                className="text-gray-600 hover:text-black transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("organization-analytics")}
                className="text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                Analytics
              </button>

              <button
                onClick={() => scrollToSection("organization-locations")}
                className="text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                Locations
              </button>
            </nav>
          )} */}
            <div className="sm:flex items-center gap-2 hidden">
              {/* <ButtonMenu /> */}
              {location.pathname === "/" && (
                <Button
                  radius={"md"}
                  classNames={{ root: "!bg-black hover:!bg-gray-900" }}
                  onClick={() =>
                    navigate("/organizationLanding", scrollTo(0, 0))
                  }
                >
                  Become A Partner
                </Button>
              )}
              <Button
                radius={"md"}
                classNames={{ root: "!bg-black hover:!bg-gray-900" }}
                onClick={() => navigate("/Login?role=customer", scrollTo(0, 0))}
              >
                Customer Login
              </Button>
            </div>
            {/* Hamburger section  */}
            <div className="sm:hidden">
              <FiMenu
                className="cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={open}
                size={30}
              />
            </div>
          </div>
        </div>
      </header>

      {/* drawer for mobile screen  */}
      <Drawer.Root opened={opened} position="right" onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.CloseButton
              size={"lg"}
              classNames={{
                close: "!border-none hover:!bg-white",
              }}
            />
          </Drawer.Header>
          <Drawer.Body
            classNames={{
              body: " !flex !flex-col !gap-8 !h-[60vh] !items-center justify-center",
            }}
          >
            {location.pathname === "/" && (
              <Button
                radius={"md"}
                classNames={{
                  root: "!bg-black hover:!bg-gray-900 !min-w-[170px]",
                }}
                onClick={() => navigate("/organizationLanding", scrollTo(0, 0))}
              >
                Become A Partner
              </Button>
            )}
            <Button
              radius={"md"}
              classNames={{
                root: "!bg-black hover:!bg-gray-900 !min-w-[170px]",
              }}
              onClick={() => navigate("/Login?role=customer", scrollTo(0, 0))}
            >
              Customer Login
            </Button>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
