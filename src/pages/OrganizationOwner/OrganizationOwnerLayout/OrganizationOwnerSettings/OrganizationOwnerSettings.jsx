import { Paper, Tabs, Title } from "@mantine/core";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Tab from "../../../../components/Tab";

export default function OrganizationOwnerSettings() {
  const location = useLocation();

  return (
    <main className="  bg-[#F5F7FA] h-screen ">
      <Title
        fz={"h2"}
        px={"lg"}
        py={"sm"}
        c={"dark"}
        bg={"#FFFFFF"}
        fw={"bold"}
      >
        Services
      </Title>
      <section className="p-6 flex flex-col h-full   gap-8">
        <Paper shadow="md" p="xl" radius="25px">
          <section className="max-w-fit mt-3 mb-8 ">
            <Tabs value={location.pathname} onChange={() => {}}>
              <Tabs.List>
                <Tab
                  path="/OrganizationOwnerDashboard/settings"
                  text="Organizations Settings"
                />
                <Tab
                  path="/OrganizationOwnerDashboard/settings/email"
                  text="Email Notifications"
                />
                <Tab
                  path="/OrganizationOwnerDashboard/settings/personal"
                  text="Personal Info"
                />
                <Tab
                  path="/OrganizationOwnerDashboard/settings/delete"
                  text="Delete Account"
                />
              </Tabs.List>
            </Tabs>
          </section>

          {/* Render the active tab component */}
          <Outlet />
        </Paper>
      </section>
    </main>
  );
}
