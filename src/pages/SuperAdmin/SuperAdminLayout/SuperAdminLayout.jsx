import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminMobileNav from "./SuperAdminSidebar/SuperAdminMobileNav";

export default function SuperAdminLayout() {
  return (
    <section className="flex max-w-[1720px] mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-1/4 h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <SuperAdminSidebar />
      </aside>

      <nav className="lg:hidden">
        <SuperAdminMobileNav />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full flex-1 overflow-y-auto">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
