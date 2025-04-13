import { Paper, Tabs, Title, Select } from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tab from "../../../../components/Tab";
import { FaChevronDown } from "react-icons/fa";

export default function OrganizationOwnerSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6 !hidden lg:!block !px-2 lg:!bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Settings
      </Title>
      <section className="lg:p-6 flex max-w-[1720px]  flex-col h-full gap-8">
        <Paper
          p={"xs"}
          radius="25px"
          // bg={"#F5F7FA"}
          className="lg:shadow-md !bg-[#f5f7fa] lg:!bg-white "
        >
          {/* Desktop Tabs */}
          <section className="max-w-fit mt-3 mb-8 hidden lg:flex">
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
                <Tab
                  path="/OrganizationOwnerDashboard/settings/logout"
                  text="Logout"
                />
              </Tabs.List>
            </Tabs>
          </section>

          {/* Mobile Dropdown */}
          <section className="flex items-center  shadow-sm rounded-[10px] mt-2 py-4 min-w-[#333B69] bg-[#FFFFFF] px-2 justify-between lg:hidden ">
            <Title className="!text-[24px] !min-w-[89px] !font-[500] !text-[#333B69]">
              Settings
            </Title>
            <Select
              data={[
                {
                  label: "Organizations Settings",
                  value: "/OrganizationOwnerDashboard/settings",
                },
                {
                  label: "Email Notifications",
                  value: "/OrganizationOwnerDashboard/settings/email",
                },
                {
                  label: "Personal Info",
                  value: "/OrganizationOwnerDashboard/settings/personal",
                },
                {
                  label: "Delete Account",
                  value: "/OrganizationOwnerDashboard/settings/delete",
                },
              ]}
              value={location.pathname} // ✅ Keep the selected value persistent
              onChange={(value) => value && navigate(value)} // ✅ Prevent clearing when clicking again
              rightSection={<FaChevronDown size={15} color="#333B69" />}
              checkIconPosition="right"
              clearable={false} // ✅ Prevent unchecking selected value
              styles={{
                input: {
                  width: "232px",
                  border: "none",
                  borderBottom: "1px solid #000000",
                  borderRadius: 0,
                  color: "#333B69",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                },
              }}
            />
          </section>

          {/* Render the active tab component */}
          <div className="mt-6 lg:p-4  lg:mt-0 !text-[18px] !font-normal ">
            <Outlet />
          </div>
        </Paper>
      </section>
    </main>
  );
}
