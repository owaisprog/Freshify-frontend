import { Tabs, Text, Title } from "@mantine/core";
import { useState, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SuperAdminUserAdmin from "./Components/SuperAdminUserAdmin";
import SuperAdminUserProfessional from "./Components/SuperAdminUserProfessional";
import { useQueryHook } from "../../../../services/reactQuery";
import { IoArrowBackCircle } from "react-icons/io5";
import CustomerPage from "../../../../components/CutomerPage";

function SuperAdminUsers() {
  const location = useLocation();
  const name = location.state;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { id } = JSON.parse(localStorage.getItem("data"));
  const { ownerId } = useParams();
  // Get active tab from query params or default to "admin"
  const currentTab = searchParams.get("tab") || "admin";
  const [activeTab, setActiveTab] = useState(currentTab);

  // ✅ Fetch all users with React Query
  const {
    data: allUsers = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["users", ownerId], // ✅ Cache users by owner ID
    endpoint: `/api/get-users-by-owner/${ownerId}`,
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
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen">
      <Title
        c={"black"}
        className="lg:!px-6  !hidden lg:!flex !items-center gap-4   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        <IoArrowBackCircle
          className="cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            navigate("/SuperAdminOrganization");
          }}
        />
        {name} Users
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
                  Mirza Tayyab Khalid
                </Text>
              </div>
            </div>
            <Text className="!text-[30px] !font-[600]">$4,790</Text>
          </div>

          {/* Haircut Total Orders Section  */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFF5D9] rounded-3xl">
                {" "}
                <img src="/yelloArrowIcon.png" alt="" />
              </div>

              <Text className=" !text-[14px] !font-[400]">Orders By Mirza</Text>
            </div>
            <Text className="!text-[30px] !font-[600]">1,360</Text>
          </div>
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
              <Tabs.Tab
                value="customer"
                style={{
                  color: activeTab === "customer" ? "black" : "#718EBF",
                  borderBottom:
                    activeTab === "customer" ? "2px solid black" : "none",
                }}
              >
                Customers
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </section>

        <section>
          {/* ✅ Show loading state */}
          {activeTab === "admin" && (
            <SuperAdminUserAdmin
              userdata={filteredUsers}
              isLoading={isLoading}
              error={error}
            />
          )}
          {activeTab === "barber" && (
            <SuperAdminUserProfessional
              userdata={filteredUsers}
              isLoading={isLoading}
              error={error}
            />
          )}
          {activeTab === "customer" && <CustomerPage />}
        </section>
      </section>
    </main>
  );
}

export default SuperAdminUsers;
