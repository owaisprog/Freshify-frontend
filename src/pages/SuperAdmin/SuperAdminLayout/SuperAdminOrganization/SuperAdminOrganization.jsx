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
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px]"
      >
        Organizations
      </Title>

      <section className="max-w-[1720px] p-6 flex flex-col h-full gap-8">
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
            <Text className="!text-[30px] !font-[600]">9</Text>
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
            <Text className="!text-[30px] !font-[600]">3,360</Text>
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
          opened={modalOpened}
          onClose={() => setModalOpened(false)} // Close the modal
          title="Organization Owner Details"
          centered
        >
          {selectedOrganization && (
            <div className="flex flex-col  items-center gap-4">
              {/* Organization Owner Image */}
              <Avatar
                src={selectedOrganization.image}
                alt="Organization Owner"
                size={120}
                radius="50%"
              />

              {/* Organization Owner Name */}
              <Group>
                <FaUser size={18} color="#333B69" />
                <Text fz="lg" fw={500}>
                  {selectedOrganization.name}
                </Text>
              </Group>

              {/* Organization Owner Email */}
              <Group>
                <FaEnvelope size={18} color="#333B69" />
                <Text fz="md" c="dimmed">
                  {selectedOrganization.email}
                </Text>
              </Group>

              {/* Organization Owner Phone */}
              <Group>
                <FaPhone size={18} color="#333B69" />
                <Text fz="md" c="dimmed">
                  {selectedOrganization.phone}
                </Text>
              </Group>
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
}
