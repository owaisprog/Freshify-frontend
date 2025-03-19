import { Outlet } from "react-router-dom";
import AdminsSidebar from "./AdminsSidebar/AdminsSidebar";
import AdminsMobileNav from "./AdminsSidebar/AdminsMobileNav";

export default function AdminsLayout() {
  return (
    <section className="flex mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-[300px] h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <AdminsSidebar />
      </aside>

      <nav className="lg:hidden">
        <AdminsMobileNav />
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
