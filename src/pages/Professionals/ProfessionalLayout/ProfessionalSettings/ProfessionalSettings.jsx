import { Paper, Tabs, Title, Select } from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tab from "../../../../components/Tab";
import { FaChevronDown } from "react-icons/fa";

export default function ProfessionalSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="pt-20  grid grid-cols-1 gap-y-5 mx-auto lg:pt-0 lg:gap-6  px-4 lg:p-0  ">
      <Title
        c={"black"}
        className="lg:!px-6    lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Settings
      </Title>
      <section className="lg:p-6 flex max-w-[1440px] w-full mx-auto  flex-col h-full gap-8 ">
        <Paper
          p={"lg"}
          radius="25px"
          // bg={"#F5F7FA"}
          className="lg:shadow-md !bg-[#f5f7fa] lg:!bg-white "
        >
          {/* Desktop Tabs */}
          <section className="max-w-fit mt-3 mb-8 hidden lg:flex">
            <Tabs value={location.pathname} onChange={() => {}}>
              <Tabs.List>
                <Tab
                  path="/ProfessionalDashboard/settings"
                  text="Personal Info"
                />
                <Tab
                  path="/ProfessionalDashboard/settings/password"
                  text="Update Password"
                />
                <Tab
                  path="/ProfessionalDashboard/settings/email"
                  text="Email Notifications"
                />
                <Tab
                  path="/ProfessionalDashboard/settings/delete"
                  text="Delete Account"
                />
                <Tab
                  path="/ProfessionalDashboard/settings/logout"
                  text="Logout"
                />
              </Tabs.List>
            </Tabs>
          </section>

          {/* Mobile Dropdown */}
          <section className="flex items-center bg-white  shadow-sm rounded-[10px] py-4 min-w-[#333B69] px-2 justify-between lg:hidden ">
            <Title className="!text-[24px] !min-w-[89px] !font-[500] !text-[#333B69]">
              Settings
            </Title>
            <Select
              data={[
                {
                  label: "Personal Info",
                  value: "/ProfessionalDashboard/settings",
                },
                {
                  label: "Update Password",
                  value: "/ProfessionalDashboard/settings/password",
                },
                {
                  label: "Email Notifications",
                  value: "/ProfessionalDashboard/settings/email",
                },
                {
                  label: "Delete Account",
                  value: "/ProfessionalDashboard/settings/delete",
                },
                {
                  label: "Logout",
                  value: "/ProfessionalDashboard/settings/logout",
                },
              ]}
              value={location.pathname} // ✅ Keep the selected value persistent
              onChange={(value) => value && navigate(value)} // ✅ Prevent clearing when clicking again
              rightSection={<FaChevronDown size={14} color="#333B69" />}
              checkIconPosition="right"
              clearable={false} // ✅ Prevent unchecking selected value
              styles={{
                input: {
                  width: "200px",
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
          <div className="mt-6  lg:mt-0 !text-[18px] !font-normal ">
            <Outlet />
          </div>
        </Paper>
      </section>
    </main>
  );
}
