import { Group, Tabs, Title } from "@mantine/core";
import TabCard from "../../../../components/TabCard";
import { FaTools } from "react-icons/fa";
import { TfiUpload } from "react-icons/tfi";
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

  // ✅ Fetch all users with React Query
  const {
    data: allUsers = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["users", id], // ✅ Cache users by owner ID
    endpoint: `/api/get-users-by-owner/${id}`,
    staleTime: 15 * 60 * 1000, // Cache for 15 minutes
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
    <main className="flex flex-col bg-[#F5F7FA]  min-h-screen">
      <Title
        fz={"h2"}
        px={"lg"}
        py={"sm"}
        c={"dark"}
        bg={"#FFFFFF"}
        fw={"bold"}
      >
        Users
      </Title>
      <section className=" p-6 flex flex-col h-full  gap-8">
        <section className="flex flex-col lg:flex-row gap-4 ">
          <TabCard>
            <Group>
              <TabCard.Profile backGround="bg-pink-100">
                <FaTools size={40} color="#FF82AC" />
              </TabCard.Profile>
              <TabCard.TextContent
                title="Most Sales Professional"
                name="Mirza Tayyab Khalid"
              />
            </Group>
            <TabCard.Amount amount="$ 4790" />
          </TabCard>
          <TabCard>
            <Group>
              <TabCard.Profile backGround="bg-[#E7EDFF]">
                <TfiUpload size={40} color="#396AFF" />
              </TabCard.Profile>
              <TabCard.TextContent title="Most Sales Professional" />
            </Group>
            <TabCard.Amount amount="4790" />
          </TabCard>
        </section>

        <section className="max-w-fit">
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
