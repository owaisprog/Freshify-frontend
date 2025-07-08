import { ButtonMenu } from "./LandingPageLoginButton";
import { Scissors } from "lucide-react";
export default function LandingPageNavbar() {
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
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xl">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-black">Freshify</span>
          </div>
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
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 hover:text-black cursor-pointer transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-600 hover:text-black cursor-pointer transition-colors"
            >
              Testimonials
            </button>
          </nav>
          <div className="flex items-center">
            <ButtonMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
