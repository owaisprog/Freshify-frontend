import { Text, Title } from "@mantine/core";

import AdminsUserProfessional from "./Components/AdminsUserProfessional";
import { useQueryHook } from "../../../../services/reactQuery";

function AdminsUsers() {
  const { id, createdBy } = JSON.parse(localStorage.getItem("data"));

  // Get active tab from query params or default to "admin"

  // ✅ Fetch all users with React Query
  const {
    data: allUsers = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["users", id], // ✅ Cache users by owner ID
    endpoint: `/api/get-users-by-owner/${createdBy}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  console.log(allUsers);
  // ✅ Filter users based on active tab

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Users
      </Title>
      <section className="max-w-[1720px] p-6 flex flex-col h-full  gap-8">
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

        <section>
          <AdminsUserProfessional
            userdata={allUsers.filter((val) => val.role === "barber")}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </section>
    </main>
  );
}

export default AdminsUsers;
