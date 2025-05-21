import { Tabs, Text, Title } from "@mantine/core";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import OrganizationOwnerUserAdmin from "./Components/OrganizationOwnerUserAdmin";
import OrganizationOwnerUserProfessional from "./Components/OrganizationOwnerUserProfessional";
import { useQueryHook } from "../../../../services/reactQuery";

function OrganizationOwnerUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = JSON.parse(localStorage.getItem("data"));

  // Get active tab from query params or default to "admin"
  const currentTab = searchParams.get("tab") || "admin";
  const [activeTab, setActiveTab] = useState(currentTab);

  // ✅ Fetch Top Pserformers Of the organization Owner
  // Fetch Most Sold  services (always enabled)
  const { data: topPerformers = [] } = useQueryHook({
    queryKey: "topPerformers",
    endpoint: `/api/top-performers/${id}`,
    staleTime: 0 * 60 * 1000, // No cache
  });

  console.log("Top Performers", topPerformers);

  // ✅ Fetch all users with React Query
  const {
    data: allUsers = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["users", id], // ✅ Cache users by owner ID
    endpoint: `/api/get-users-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  // ✅ Filter users based on active tab
  const filteredUsers = useMemo(() => {
    return allUsers?.filter((val) => val.role === activeTab);
  }, [allUsers, activeTab]);

  // ✅ Handle tab change & update URL params
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab }); // Update URL
  };

  return (
    <main className="grid grid-cols-1 gap-y-5  mx-auto w-full pt-20 lg:pt-0  p-6 lg:p-0">
      <Title
        mb={"lg"}
        c={"black"}
        className="lg:!px-6 !px-2   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Users
      </Title>
      <section className="-mt-10 lg:mt-0 max-w-[1440px] mx-auto w-full  flex flex-col h-full  gap-8">
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
              ${topPerformers?.topPerformers?.[0]?.totalRevenue}
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
        <section className="max-w-fit ">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Tab
                value="admin"
                style={{
                  color: activeTab === "admin" ? "black" : "#718EBF",
                  borderBottom:
                    activeTab === "admin" ? "2px solid black" : "none",
                }}
              >
                Admins
              </Tabs.Tab>
              <Tabs.Tab
                value="barber"
                style={{
                  color: activeTab === "barber" ? "black" : "#718EBF",
                  borderBottom:
                    activeTab === "barber" ? "2px solid black" : "none",
                }}
              >
                Professionals
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </section>

        <section>
          {/* ✅ Show loading state */}
          {activeTab === "admin" ? (
            <OrganizationOwnerUserAdmin
              userdata={filteredUsers}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <OrganizationOwnerUserProfessional
              userdata={filteredUsers}
              isLoading={isLoading}
              error={error}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default OrganizationOwnerUsers;
