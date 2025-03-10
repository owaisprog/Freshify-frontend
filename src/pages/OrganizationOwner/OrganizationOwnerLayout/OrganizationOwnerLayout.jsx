import { Outlet } from "react-router-dom";
import OrganizationOwnerSidebar from "./OrganizationOwnerSidebar/OrganizationOwnerSidebar";

export default function OrganizationOwnerLayout() {
  return (
    <section className="flex bg-[#E6EFF5]  p-4 gap-x-4 max-w-[1440px] mx-auto  min-h-screen md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] ">
      <aside className="flex flex-col h-full ">
        <OrganizationOwnerSidebar />
      </aside>
      <main className=" w-full">
        <Outlet />
      </main>
    </section>
  );
}
