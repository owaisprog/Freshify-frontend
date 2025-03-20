import { Outlet } from "react-router-dom";
import ProfessionalSidebar from "./ProfessionalSidebar/ProfessionalSidebar";
import ProfessionalMobileNav from "./ProfessionalSidebar/ProfessionalMobileNav";

export default function ProfessionalLayout() {
  return (
    <section className="flex mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-[300px] h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <ProfessionalSidebar />
      </aside>

      <nav className="lg:hidden">
        <ProfessionalMobileNav />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full flex-1 overflow-y-auto  ">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
