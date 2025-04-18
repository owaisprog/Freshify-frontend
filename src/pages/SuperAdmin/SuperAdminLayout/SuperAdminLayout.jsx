import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminMobileNav from "./SuperAdminSidebar/SuperAdminMobileNav";

export default function SuperAdminLayout() {
  return (
    <section className="flex mx-auto min-h-screen   lg:p-5">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-5 left-0  w-[300px]  self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <SuperAdminSidebar />
      </aside>

      <nav className="lg:hidden">
        <SuperAdminMobileNav />
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
