import { Loader, Progress, Text, Title } from "@mantine/core";
import { useQueryHook } from "../../../../services/reactQuery";
import SalesChart from "../../../../components/SalesChart";
import NotificationDropdown from "../../../../components/notifications/NotificationDropdown";

export default function OrganizationOwnerDashboard() {
  const { location, organizationOwnerId } =
    JSON.parse(localStorage.getItem("data")) || {};

  // Safely get stored data with null checks
  // const storedData = JSON.parse(localStorage.getItem("data") || {});
  // const { id } = storedData;

  // Changed default data to empty object instead of array
  const {
    data: response = {},
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQueryHook({
    queryKey: "OrganizationDashboard",
    // endpoint: id ? `/api/dashboard/67e45bf2ddeafab8b200eb2b` : null, // Prevent invalid endpoint when no ID
    endpoint: `/api/dashboard/admin/${organizationOwnerId._id}/${location._id}`, // Prevent invalid endpoint when no ID
    staleTime: 0 * 60 * 1000,
    // enabled: !!id, // Only fetch if ID exists
  });

  // Destructure after ensuring response exists
  const {
    TotalSales,
    AverageSalesPrice,
    TopPerformer = [],
    PopularServices = [1, 2, 3, 4],
    LocationsByUser = [],
    OrderThisWeek,
    OrdersToday,
    TopCustomers,
    TotalOrders,
    WeeklyLocationSales = [],
  } = response || {};

  // Loading and error states
  if (isServicesLoading) {
    return (
      <main className="pt-20  lg:pt-0 lg:gap-6  p-6 lg:p-0">
        <Title
          c={"black"}
          className="lg:!text-[32px] !text-[24px] !font-[500] !m-0"
        >
          Dashboard
        </Title>

        <section className=" flex flex-col items-center justify-center h-[50vh]">
          <Loader color="dark" type="bars" size="lg" />
        </section>
      </main>
    );
  }

  if (servicesError) {
    return <h1>Error loading data: {servicesError.message}</h1>;
  }

  // Check if response has data (using object keys)
  const hasData = Object.keys(response).length > 0;

  return (
    <main className="pt-20 lg:pt-0 lg:gap-6  p-6 lg:p-0">
      {!hasData && !isServicesLoading && !servicesError && (
        <h1>No data available</h1>
      )}

      {hasData && (
        <section className="   grid grid-cols-1 gap-y-5  ">
          <div className="flex items-center justify-between mb-4 lg:px-6 px-2 lg:bg-[#FFFFFF] py-[18px] rounded-[16px]">
            <Title
              c={"black"}
              className="lg:!text-[32px] !text-[24px] !font-[500] !m-0"
            >
              Dashboard
            </Title>
            {/* Notification Dropdown Button */}
            <NotificationDropdown />
          </div>
          {/* First Section  */}
          <section className=" -mt-10 lg:mt-0   max-w-[1440px] mx-auto w-full px-2 lg:px-0 flex flex-col justify-between  lg:flex-row gap-8 ">
            {/* Sales and Top performer section  */}
            <section className="   lg:w-full flex flex-col gap-[10px] lg:max-w-[470px]">
              {/* Sales Section  */}
              <section className=" ">
                <Text className="!text-[22px] !font-[700]">Sales</Text>
                <div className="bg-[#FFFFFF] min-h-[200px] max-h-[200px]  px-2 rounded-[25px] specialBorder ">
                  {/* Total Sales Section  */}
                  <div className="h-[99px] flex px-[13px]  items-center  justify-between  specialBorderBottom">
                    <div className="flex items-center gap-2">
                      <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#718EBF] rounded-full">
                        {" "}
                        <img src="/dashboardSalesIcon.png" alt="" />
                      </div>
                      <Text className="!text-[18px] !font-[400]">
                        Total Sales
                      </Text>
                    </div>
                    <Text className="!text-[30px] !font-[600]">
                      ${TotalSales}
                    </Text>
                  </div>

                  {/* Average Sales Section  */}
                  <div className="h-[99px] flex px-[13px]  items-center  justify-between ">
                    <div className="flex items-center gap-2">
                      <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#71BF7D] rounded-full">
                        {" "}
                        <img src="/dashboardSalesIcon.png" alt="" />
                      </div>
                      <Text className="!text-[18px] !font-[400]">
                        Average Sales
                      </Text>
                    </div>
                    <Text className="!text-[30px] !font-[600]">
                      ${Number(AverageSalesPrice).toFixed()}
                    </Text>
                  </div>
                </div>
              </section>
            </section>

            {/* Tope Performers Section  */}
            {/* Sales and Top performer section  */}
            <section className="  lg:w-full  flex flex-col gap-[10px] lg:max-w-[868px]">
              {/* Sales Section  */}
              <section className="  ">
                <Text className="!text-[22px] !font-[700]">Top Performers</Text>
                <div className="bg-[#FFFFFF] h-[200px] max-h-[200px] px-2 rounded-[25px] specialBorder ">
                  {TopPerformer.length <= 0 ? (
                    <div className=" flex items-center justify-center h-full">
                      <p>No data Available</p>
                    </div>
                  ) : null}
                  {TopPerformer.map((performer, index) => (
                    <div
                      key={index}
                      className={`h-[99px] flex px-[13px]  items-center  justify-between  ${TopPerformer.length > 1 && index % 2 === 0 ? "specialBorderBottom" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#B1B1B1] rounded-full">
                          {" "}
                          <img src="/topPerformerIcon.png" alt="" />
                        </div>
                        <Text className="!text-[18px] capitalize !font-[400]">
                          {performer.name}
                        </Text>
                      </div>
                      <Text className="!text-[30px] !font-[600]">
                        ${Number(performer.count).toFixed()}
                      </Text>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </section>

          {/* Second Section  */}

          <section className=" max-w-[1440px] mx-auto w-full lg:mt-3 px-2 lg:px-0 flex flex-col  justify-between lg:flex-row gap-8  ">
            {/* Weekly Sales Section   */}
            <section className="    flex flex-col gap-[10px] lg:w-[749px] lg:h-[378px] overflow-x-hidden">
              {/* Sales Section  */}
              <section className=" ">
                <Text className="!text-[22px] !font-[700]">Weekly Sales</Text>
                <SalesChart WeeklyLocationSales={WeeklyLocationSales} />
              </section>
            </section>

            {/* Popular Service Section   */}
            <section className=" flex flex-col gap-[10px] lg:w-[589px] lg:h-[378px] ">
              <section className=" ">
                <Text className="!text-[22px] !font-[700]">
                  Popular Services
                </Text>
                <div
                  className={`bg-[#FFFFFF] p-[20px]  flex flex-col  rounded-[25px] specialBorder ${PopularServices.length < 4 ? "h-[322px] gap-4 " : "h-[322px] overflow-hidden justify-evenly "}`}
                >
                  {/* Services Section  */}
                  {PopularServices.length <= 0 ? (
                    <div className=" flex items-center justify-center h-full">
                      <p>No data Available</p>
                    </div>
                  ) : null}
                  {PopularServices.map((service, index) => {
                    let progressValue = null;
                    if (index === 0) progressValue = 95;
                    if (index === 1) progressValue = 80;
                    if (index === 2) progressValue = 60;
                    if (index === 3) progressValue = 45;
                    return (
                      <div
                        key={index}
                        className="h-[60px]  px-[13px] gap-4   grid grid-cols-5  specialBorderBottom"
                      >
                        <div className="col-span-4 flex items-center gap-2  w-full ">
                          <div
                            className={`h-[50px] flex items-center justify-center w-[50px] ${index === 0 || index === 1 ? "bg-[#DCFAF8]" : "bg-[#FFE0EB]"} rounded-full`}
                          >
                            {" "}
                            <img
                              src={
                                index === 0 || index === 1
                                  ? "/serviceIconBlue.png"
                                  : "/serviceIconPink.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className=" flex-1/2">
                            <Text className="!text-[18px] !font-[400]">
                              {service.service}
                            </Text>
                            <Progress
                              color="#718EBF"
                              size="lg"
                              value={progressValue}
                            />
                          </div>
                        </div>
                        <Text
                          ta={"end"}
                          className=" !flex !items-center !justify-end !text-[30px] !font-[600]"
                        >
                          {service.totalOrders}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </section>
            </section>
          </section>

          {/* Third Section  */}
          <section className=" max-w-[1440px] mx-auto pb-6 px-2 lg:px-0 flex justify-between flex-col w-full  lg:flex-row gap-8">
            {/* Sales and Top performer section  */}
            <section className="   lg:w-full flex flex-col gap-[10px] lg:max-w-[470px]">
              {/* Sales Section  */}
              <section className=" ">
                <Text className="!text-[22px] !font-[700]">Orders</Text>
                <div className="bg-[#FFFFFF] p-2 rounded-[25px] specialBorder  h-[220px]">
                  {/* Total Orders Section */}
                  <div className="h-[65px] flex px-[13px]  items-center   justify-between  specialBorderBottom">
                    <div className="flex items-center gap-2">
                      <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#FFF5D9] rounded-full">
                        {" "}
                        <img src="/totalOrdersIcon.png" alt="" />
                      </div>
                      <Text className="!text-[18px] !font-[400]">
                        Total Orders
                      </Text>
                    </div>
                    <Text className="!text-[30px] !font-[600]">
                      {TotalOrders}
                    </Text>
                  </div>

                  {/* Order This Week */}
                  <div className="h-[65px] mt-2 flex px-[13px]  items-center  justify-between specialBorderBottom ">
                    <div className="flex items-center gap-2">
                      <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#E7EDFF] rounded-full">
                        {" "}
                        <img src="/orderThisWeekIcon.png" alt="" />
                      </div>
                      <Text className="!text-[18px] !font-[400]">
                        Order This Week
                      </Text>
                    </div>
                    <Text className="!text-[30px] !font-[600]">
                      {OrderThisWeek}
                    </Text>
                  </div>

                  {/* Order Today */}
                  <div className="h-[65px] mt-2 flex px-[13px]  items-center  justify-between ">
                    <div className="flex items-center gap-2">
                      <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#DCFAF8] rounded-full">
                        {" "}
                        <img src="/ordersTodayIcon.png" alt="" />
                      </div>
                      <Text className="!text-[18px] !font-[400]">
                        Order Today
                      </Text>
                    </div>
                    <Text className="!text-[30px] !font-[600]">
                      {OrdersToday}
                    </Text>
                  </div>
                </div>
              </section>
            </section>

            {/* Sales and Top performer section  */}
            <section className="  lg:w-full  flex flex-col gap-[10px]  lg:max-w-[868px]">
              {/* Sales Section  */}
              <section className=" ">
                <Text className="!text-[22px] !font-[700]">Top Customers</Text>
                <div
                  className={` bg-[#FFFFFF] px-2   ${LocationsByUser.length < 3 ? "h-[220px]" : "max-h-[220px] overflow-hidden "}   rounded-[25px] specialBorder`}
                >
                  {/* United State America Section  */}
                  {TopCustomers.length <= 0 ? (
                    <div className=" flex items-center justify-center h-full">
                      <p>No data Available</p>
                    </div>
                  ) : null}
                  {TopCustomers.map((customer, index) => (
                    <div
                      key={index}
                      className={`h-[65px] mt-2 flex px-[13px]  items-center  justify-between  ${index === LocationsByUser.length - 1 ? "" : "specialBorderBottom"}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#B1B1B1] rounded-full">
                          {" "}
                          <img src="/topPerformerIcon.png" alt="" />
                        </div>
                        <Text className="!text-[18px] capitalize !font-[400]">
                          {customer.name}
                        </Text>
                      </div>
                      <Text className="!text-[30px] !font-[600]">
                        {Number(customer.orderCount).toFixed()}
                      </Text>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </section>
        </section>
      )}
    </main>
  );
}
