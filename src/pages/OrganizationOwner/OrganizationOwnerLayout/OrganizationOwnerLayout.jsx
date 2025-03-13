import { Outlet } from "react-router-dom";
import OrganizationOwnerSidebar from "./OrganizationOwnerSidebar/OrganizationOwnerSidebar";
import OrganizationOwnerMobileNav from "./OrganizationOwnerSidebar/OrganizationOwnerMobileNav";

export default function OrganizationOwnerLayout() {
  return (
    <section className="flex max-w-[1440px] mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-1/4 h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <OrganizationOwnerSidebar />
      </aside>

      <nav className="lg:hidden">
        <OrganizationOwnerMobileNav />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full flex-1 overflow-hidden">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
