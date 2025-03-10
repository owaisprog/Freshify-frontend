import { Group, Tabs } from "@mantine/core";
import TabCard from "../../../../components/TabCard";
import { FaTools } from "react-icons/fa";
import { TfiUpload } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrganizationOwnerUserAdmin from "./Components/OrganizationOwnerUserAdmin";
import OrganizationOwnerUserProfessional from "./Components/OrganizationOwnerUserProfessional";
import { apiGet } from "../../../../services/useApi";

function OrganizationOwnerUsers() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get active tab from query params or default to "admin"
  const currentTab = searchParams.get("tab") || "admin";
  const [activeTab, setActiveTab] = useState(currentTab);

  // Update query params when the tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab }); // Update URL
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (allUsers.length === 0) {
          const response = await apiGet("/api/get-users");
          setUsers(response.filter((val) => val.role === activeTab));
          setAllUsers(response);
        } else {
          // If data is already fetched, just filter it
          setUsers(allUsers.filter((val) => val.role === activeTab));
        }
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, [activeTab, allUsers]); // Runs only when the tab changes

  console.log(users);

  return (
    <main>
      <section className="flex gap-4">
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

      <section className="max-w-fit mt-10">
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
        {activeTab === "admin" ? (
          <OrganizationOwnerUserAdmin userdata={users} activeTab={activeTab} />
        ) : (
          <OrganizationOwnerUserProfessional
            userdata={users}
            activeTab={activeTab}
          />
        )}
        {/* <h1>user current </h1>{" "} */}
      </section>
    </main>
  );
}

export default OrganizationOwnerUsers;
