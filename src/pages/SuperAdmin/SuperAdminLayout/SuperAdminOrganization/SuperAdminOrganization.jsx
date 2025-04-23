import { useState } from "react";
import { Title, Text, Modal, Avatar, Group } from "@mantine/core";
import TableCom from "../../../../components/Table"; // Import your Table component
import { useQueryHook } from "../../../../services/reactQuery";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa"; // Import icons

export default function SuperAdminOrganization() {
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState(null); // Track selected organization
  const [modalOpened, setModalOpened] = useState(false); // Control modal visibility

  const {
    data: organization = [],
    isLoading: isOrganizationLoading,
    error: organizationError,
  } = useQueryHook({
    queryKey: "organization",
    endpoint: `/api/get-organizationowners`,
    staleTime: 0 * 60 * 1000, // 15 minutes cache
  });

  // Define columns for the table
  const columns = [
    "Business Name",
    "Owner Details",
    "Locations",
    "Users",
    "Calendar",
    "Services",
    "Settings",
  ];

  // Map organization data to table rows
  const data = organization.map((val) => ({
    "Business Name": val.name, // Display the organization name
    "Owner Details": (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => {
          setSelectedOrganization(val); // Set the selected organization
          setModalOpened(true); // Open the modal
        }}
      >
        View Details
      </Text>
    ),
    Locations: (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => navigate(`locations/${val._id}`)}
      >
        View Locations
      </Text>
    ),
    Users: (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => navigate(`Users/${val._id}`)}
      >
        View Users
      </Text>
    ),
    Calendar: (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => navigate(`calendar/${val._id}`)}
      >
        View Calendar
      </Text>
    ),
    Services: (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => navigate(`Services/${val._id}`)}
      >
        View Services
      </Text>
    ),
    Settings: (
      <Text
        fz={"md"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => navigate(`settings/${val._id}`)}
      >
        View Settings
      </Text>
    ),
  }));

  return (
    <main className="pt-20 grid grid-cols-1   lg:pt-0 lg:gap-6  p-6 lg:p-0">
      <Title
        mb={"lg"}
        c={"black"}
        className="lg:!px-6 !hidden lg:!block   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Organizations
      </Title>
      <section className="grid max-w-[1440px] mx-auto w-full grid-cols-1 gap-y-5 mt-6 lg:mt-0">
        {/* Most Organization Section */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {/* Most Sales Professional Section */}
          <div className="bg-[#FFFFFF] rounded-[25px] h-[86px] flex px-[11px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#DCFAF8] rounded-3xl">
                <img src="/mostSalesProfessionalIcon.png" alt="" />
              </div>
              <div>
                <Text className="!text-[#000000] !text-[14px] !font-[400]">
                  Most Locations
                </Text>
                <Text className="!text-[14px] !font-[400]">Freshify</Text>
              </div>
            </div>
            <Text className="!text-[22px] lg:!text-[30px] !font-[600]">9</Text>
          </div>

          {/* Haircut Total Orders Section */}
          <div className="bg-[#FFFFFF] rounded-[25px] h-[86px] flex px-[11px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFF5D9] rounded-3xl">
                <img src="/yelloArrowIcon.png" alt="" />
              </div>
              <Text className="!text-[14px] !font-[400]">
                Freshify Total Orders
              </Text>
            </div>
            <Text className="!text-[22px] lg:!text-[30px] !font-[600]">
              3,360
            </Text>
          </div>
        </section>

        <Text className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700]">
          All Organizations
        </Text>

        {/* Render the table */}
        <TableCom
          data={data}
          columns={columns}
          isLoading={isOrganizationLoading}
          error={organizationError}
        />

        {/* Modal for Organization Details */}
        <Modal
          padding={"xl"}
          radius={"lg"}
          closeOnClickOutside={false}
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Organization Owner Details"
          centered
          size="md"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          styles={{
            title: {
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#2F3542",

              width: "100%",
            },
          }}
        >
          {selectedOrganization && (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar with decorative border */}
              <div className="relative">
                <Avatar
                  src={selectedOrganization.image}
                  alt="Organization Owner"
                  size={120}
                  radius="50%"
                  className="border-4 border-white shadow-lg"
                />
                <div className="absolute inset-0 rounded-full border-2 border-[#747d8c33] pointer-events-none" />
              </div>

              {/* Details container */}
              <div className="w-full space-y-4">
                {/* Name Section */}
                <div className="bg-[#f8f9fa] p-4 rounded-lg transition-all hover:bg-[#e9ecef]">
                  <Group spacing="sm">
                    <FaUser size={20} className="text-[#2F3542] min-w-[24px]" />
                    <Text fz="xl" fw={600} className="text-[#2F3542]">
                      {selectedOrganization.name}
                    </Text>
                  </Group>
                </div>

                {/* Email Section */}
                <div className="bg-[#f8f9fa] p-4 rounded-lg transition-all hover:bg-[#e9ecef]">
                  <Group spacing="sm">
                    <FaEnvelope
                      size={20}
                      className="text-[#2F3542] min-w-[24px]"
                    />
                    <Text fz="md" className="text-[#57606f]">
                      {selectedOrganization.email}
                    </Text>
                  </Group>
                </div>

                {/* Phone Section */}
                <div className="bg-[#f8f9fa] p-4 rounded-lg transition-all hover:bg-[#e9ecef]">
                  <Group spacing="sm">
                    <FaPhone
                      size={20}
                      className="text-[#2F3542] min-w-[24px]"
                    />
                    <Text fz="md" className="text-[#57606f]">
                      {selectedOrganization.phone}
                    </Text>
                  </Group>
                </div>
              </div>

              {/* Decorative Border Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#74b9ff] to-[#a4b0fa]" />
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
}
