import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminMobileNav from "./SuperAdminSidebar/SuperAdminMobileNav";

export default function SuperAdminLayout() {
  return (
    <section className="flex  lg:gap-6  mx-auto h-screen overflow-y-auto   lg:p-5">
      {/* Sidebar (Left side) */}
      <aside className="hidden  h-full lg:block sticky top-0 left-0  w-[300px]  self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <SuperAdminSidebar />
      </aside>

      <nav className="lg:hidden">
        <SuperAdminMobileNav />
      </nav>

      {/* Main Content (Right side) */}
      <main className="w-full  flex-1  ">
        {" "}
        {/* Added flex-1 and overflow-hidden */}
        <Outlet />
      </main>
    </section>
  );
}
