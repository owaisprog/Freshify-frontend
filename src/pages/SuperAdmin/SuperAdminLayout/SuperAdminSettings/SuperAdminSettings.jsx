import { Paper, Tabs, Title, Select } from "@mantine/core";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Tab from "../../../../components/Tab";
import { FaChevronDown } from "react-icons/fa";

export default function SuperAdminSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ownerId } = useParams();

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!hidden lg:!block lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Settings
      </Title>
      <section className="lg:p-6 flex  mx-auto max-w-[1440px] w-full   flex-col h-full gap-8">
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
                  path={`/SuperAdminOrganization/settings/${ownerId}`} // Include `ownerId`
                  text="SuperAdmins Settings"
                />
                <Tab
                  path={`/SuperAdminOrganization/settings/${ownerId}/email`} // Include `ownerId`
                  text="Email Notifications"
                />
                <Tab
                  path={`/SuperAdminOrganization/settings/${ownerId}/personal`} // Include `ownerId`
                  text="Personal Info"
                />
                <Tab
                  path={`/SuperAdminOrganization/settings/${ownerId}/delete`} // Include `ownerId`
                  text="Delete Account"
                />
              </Tabs.List>
            </Tabs>
          </section>

          {/* Mobile Dropdown */}
          <section className="flex items-center  shadow-sm rounded-[10px] py-4 min-w-[#333B69] px-2 justify-between lg:hidden ">
            <Title className="!text-[24px] !min-w-[89px] !font-[500] !text-[#333B69]">
              Settings
            </Title>
            <Select
              data={[
                {
                  label: "SuperAdmins Settings",
                  value: `/SuperAdminOrganization/settings/${ownerId}`, // Include `ownerId`
                },
                {
                  label: "Email Notifications",
                  value: `/SuperAdminOrganization/settings/${ownerId}/email`, // Include `ownerId`
                },
                {
                  label: "Personal Info",
                  value: `/SuperAdminOrganization/settings/${ownerId}/personal`, // Include `ownerId`
                },
                {
                  label: "Delete Account",
                  value: `/SuperAdminOrganization/settings/${ownerId}/delete`, // Include `ownerId`
                },
              ]}
              value={location.pathname}
              onChange={(value) => value && navigate(value)}
              rightSection={<FaChevronDown size={15} color="#333B69" />}
              checkIconPosition="right"
              clearable={false}
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
          <div className="mt-6  lg:mt-0 !text-[18px] !font-normal ">
            <Outlet />
          </div>
        </Paper>
      </section>
    </main>
  );
}
