import { Text, Title } from "@mantine/core";

import AdminsUserProfessional from "./Components/AdminsUserProfessional";
import { useQueryHook } from "../../../../services/reactQuery";

function AdminsUsers() {
  const { id, location, organizationOwnerId } = JSON.parse(
    localStorage.getItem("data")
  );

  // ✅ Fetch Top Pserformers Of the organization Owner
  // Fetch Most Sold  services (always enabled)
  const { data: topPerformers = [] } = useQueryHook({
    queryKey: "topPerformers",
    endpoint: `/api/top-performers/admin/${organizationOwnerId?._id}/${location._id}`,
    staleTime: 0 * 60 * 1000, // No cache
  });

  // ✅ Fetch all users with React Query
  const {
    data: allUsers = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["users", id], // ✅ Cache users by owner ID
    endpoint: `/api/get-barbers`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  // ✅ Filter users based on active tab

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Users
      </Title>
      <section className="max-w-[1440px] w-full mx-auto p-6 flex flex-col h-full  gap-8">
        {/* First Section  */}
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
                  Most Sales Professional
                </Text>

                <Text className="!text-[14px] !font-[400]">
                  {topPerformers?.topPerformers?.[0]?.name}
                </Text>
              </div>
            </div>
            <Text className="!text-[22px] lg:!text-[30px] !font-[600]">
              {topPerformers?.topPerformers?.[0]?.totalRevenue
                ? `€${topPerformers.topPerformers[0].totalRevenue}`
                : null}
            </Text>
          </div>

          {/* Haircut Total Orders Section  */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFF5D9] rounded-3xl">
                {" "}
                <img src="/yelloArrowIcon.png" alt="" />
              </div>

              <Text className=" !text-[#000000] !text-[14px] !font-[400]">
                Orders By {topPerformers?.topPerformers?.[0]?.name}
              </Text>
            </div>
            <Text className="!text-[22px] lg:!text-[30px] !font-[600]">
              {topPerformers?.topPerformers?.[0]?.totalOrders}
            </Text>
          </div>
        </section>

        <section>
          <AdminsUserProfessional
            userdata={allUsers?.filter(
              (user) => user?.location?._id === location._id
            )}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </section>
    </main>
  );
}

export default AdminsUsers;
