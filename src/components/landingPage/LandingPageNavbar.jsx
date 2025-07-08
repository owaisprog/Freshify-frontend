import { ButtonMenu } from "./LandingPageLoginButton";
import navbarLogo from "../../assets/navbarLogo.jpg";
import { useLocation } from "react-router-dom";
export default function LandingPageNavbar() {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <header className="border-b h-[80px]  border-gray-200 bg-white sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <img
            src={navbarLogo}
            className="h-[80px] w-52 text-white object-contain"
          />
          {location.pathname === "/" ? (
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
          )}
          <div className="flex items-center">
            <ButtonMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
