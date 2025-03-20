import { Title, Text, Button } from "@mantine/core";
import TableCom from "../../../../components/Table"; // Import your Table component
import { useQueryHook } from "../../../../services/reactQuery";
import { useNavigate } from "react-router-dom";

export default function SuperAdminOrganization() {
  const navigate = useNavigate();
  // const { val._id } = JSON.parse(localStorage.getItem("data"));
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
        // onClick={() => navigate(`View Owner: ${val._id}`)}
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

  console.log(organization);

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px]"
      >
        Organizations
      </Title>

      <section className="max-w-[1720px]  p-6 flex flex-col h-full gap-8">
        {/* Most Organization Section  */}
        <section className=" w-full   grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6  ">
          {/*Most Sales Professional Section */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#DCFAF8] rounded-3xl">
                {" "}
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

          {/* Haircut Total Orders Section  */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFF5D9] rounded-3xl">
                {" "}
                <img src="/yelloArrowIcon.png" alt="" />
              </div>

              <Text className=" !text-[14px] !font-[400]">
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
      </section>
    </main>
  );
}
