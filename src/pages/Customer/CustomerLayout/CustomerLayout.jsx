import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar/CustomerSidebar";
import CustomerMobileNav from "./CustomerSidebar/CustomerMobileNav";

export default function CustomerLayout() {
  return (
    <section className="flex max-w-[1720px] mx-auto min-h-screen">
      {/* Sidebar (Left side) */}
      <aside className="hidden lg:block sticky top-0 left-0  w-1/4 h-screen self-start">
        {" "}
        {/* Added h-screen and self-start */}
        <CustomerSidebar />
      </aside>

      <nav className="lg:hidden">
        <CustomerMobileNav />
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
