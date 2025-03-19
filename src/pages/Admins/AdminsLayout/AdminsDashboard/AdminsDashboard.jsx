import { Progress, Text, Title } from "@mantine/core";

import SalesChart from "../../../../components/SalesChart";

export default function AdminsDashboard() {
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Dashboard
      </Title>

      {/* First Section  */}
      <section className=" max-w-[1720px]  flex flex-col lg:flex-row gap-8 lg:gap-6  p-6">
        {/* Sales and Top performer section  */}
        <section className="   lg:w-full flex flex-col gap-[10px] lg:max-w-[470px]">
          {/* Sales Section  */}
          <section className=" ">
            <Text className="!text-[22px] !font-[700]">Sales</Text>
            <div className="bg-[#FFFFFF]  px-2 rounded-[25px] specialBorder ">
              {/* Total Sales Section 12,996 */}
              <div className="h-[99px] flex px-[13px]  items-center  justify-between  specialBorderBottom">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#718EBF] rounded-full">
                    {" "}
                    <img src="/dashboardSalesIcon.png" alt="" />
                  </div>
                  <Text className="!text-[18px] !font-[400]">Total Sales</Text>
                </div>
                <Text className="!text-[30px] !font-[600]">$12,996</Text>
              </div>

              {/* Total Sales Section 12,996 */}
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
                <Text className="!text-[30px] !font-[600]">$75</Text>
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
            <div className="bg-[#FFFFFF] px-2 rounded-[25px] specialBorder ">
              {/* Total Sales Section 12,996 */}
              <div className="h-[99px] flex px-[13px]  items-center  justify-between  specialBorderBottom">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#B1B1B1] rounded-full">
                    {" "}
                    <img src="/topPerformerIcon.png" alt="" />
                  </div>
                  <Text className="!text-[18px] !font-[400]">
                    Mirza Tayyab Khalid
                  </Text>
                </div>
                <Text className="!text-[30px] !font-[600]">$2,456</Text>
              </div>

              {/* Total Sales Section 12,996 */}
              <div className="h-[99px] flex px-[13px]  items-center  justify-between ">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#B1B1B1] rounded-full">
                    {" "}
                    <img src="/topPerformerIcon.png" alt="" />
                  </div>
                  <Text className="!text-[18px] !font-[400]">
                    Mirza Talha Haider
                  </Text>
                </div>
                <Text className="!text-[30px] !font-[600]">$2,278</Text>
              </div>
            </div>
          </section>
        </section>
      </section>

      {/* Second Section  */}

      <section className="  w-full  flex flex-col lg:flex-row gap-8 lg:gap-6  p-6">
        {/* Weekly Sales Section   */}
        <section className="  lg:w-full  flex flex-col gap-[10px] lg:max-w-[749px]">
          {/* Sales Section  */}
          <section className="  ">
            <Text className="!text-[22px] !font-[700]">Weekly Sales</Text>
            <SalesChart />
          </section>
        </section>

        {/* Popular Service Section   */}
        <section className="   lg:w-full flex flex-col gap-[10px] lg:max-w-[589px]">
          <section className=" ">
            <Text className="!text-[22px] !font-[700]">Popular Services</Text>
            <div className="bg-[#FFFFFF] p-[20px] h-[322px] flex flex-col justify-between rounded-[25px] specialBorder ">
              {/* Servicce 1 Section  */}
              <div className="h-[60px]   px-[13px] gap-4   grid grid-cols-4  specialBorderBottom">
                <div className="col-span-3 flex items-center gap-2  w-full ">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#DCFAF8] rounded-full">
                    {" "}
                    <img src="/serviceIconBlue.png" alt="" />
                  </div>
                  <div className=" flex-1/2">
                    <Text className="!text-[18px] !font-[400]">Service 1</Text>
                    <Progress color="#718EBF" size="lg" value={95} />
                  </div>
                </div>
                <Text ta={"end"} className="!text-[30px] !font-[600]">
                  1,360
                </Text>
              </div>

              {/* Servicce 2 Section  */}
              <div className="h-[60px]  px-[13px] gap-4   grid grid-cols-4  specialBorderBottom">
                <div className="col-span-3 flex items-center gap-2  w-full ">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#DCFAF8] rounded-full">
                    {" "}
                    <img src="/serviceIconBlue.png" alt="" />
                  </div>
                  <div className=" flex-1/2">
                    <Text className="!text-[18px] !font-[400]">Service 2</Text>
                    <Progress color="#718EBF" size="lg" value={75} />
                  </div>
                </div>
                <Text ta={"end"} className="!text-[30px] !font-[600]">
                  1,160
                </Text>
              </div>

              {/* Servicce 3 Section  */}
              <div className="h-[60px]  px-[13px] gap-4   grid grid-cols-4  specialBorderBottom">
                <div className="col-span-3 flex items-center gap-2  w-full ">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#FFE0EB] rounded-full">
                    {" "}
                    <img src="/serviceIconPink.png" alt="" />
                  </div>
                  <div className=" flex-1/2">
                    <Text className="!text-[18px] !font-[400]">Service 1</Text>
                    <Progress color="#718EBF" size="lg" value={60} />
                  </div>
                </div>
                <Text ta={"end"} className="!text-[30px] !font-[600]">
                  960
                </Text>
              </div>

              {/* Servicce 4 Section  */}
              <div className="h-[60px]   px-[13px] gap-4   grid grid-cols-4  specialBorderBottom">
                <div className="col-span-3 flex items-center gap-2  w-full ">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#FFE0EB] rounded-full">
                    {" "}
                    <img src="/serviceIconPink.png" alt="" />
                  </div>
                  <div className=" flex-1/2">
                    <Text className="!text-[18px] !font-[400]">Service 1</Text>
                    <Progress color="#718EBF" size="lg" value={45} />
                  </div>
                </div>
                <Text ta={"end"} className="!text-[30px] !font-[600]">
                  530
                </Text>
              </div>
            </div>
          </section>
        </section>
      </section>

      {/* Third Section  */}
      <section className="  w-full  flex flex-col lg:flex-row gap-8 lg:gap-6  p-6">
        {/* Sales and Top performer section  */}
        <section className="   lg:w-full flex flex-col gap-[10px] lg:max-w-[470px]">
          {/* Sales Section  */}
          <section className=" ">
            <Text className="!text-[22px] !font-[700]">Orders</Text>
            <div className="bg-[#FFFFFF] p-2 rounded-[25px] specialBorder ">
              {/* Total Orders Section */}
              <div className="h-[65px] flex px-[13px]  items-center  justify-between  specialBorderBottom">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#FFF5D9] rounded-full">
                    {" "}
                    <img src="/totalOrdersIcon.png" alt="" />
                  </div>
                  <Text className="!text-[18px] !font-[400]">Total Orders</Text>
                </div>
                <Text className="!text-[30px] !font-[600]">2,996</Text>
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
                <Text className="!text-[30px] !font-[600]">89</Text>
              </div>

              {/* Order Today */}
              <div className="h-[65px] mt-2 flex px-[13px]  items-center  justify-between ">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#DCFAF8] rounded-full">
                    {" "}
                    <img src="/ordersTodayIcon.png" alt="" />
                  </div>
                  <Text className="!text-[18px] !font-[400]">Order Today</Text>
                </div>
                <Text className="!text-[30px] !font-[600]">15</Text>
              </div>
            </div>
          </section>
        </section>

        {/* Sales and Top performer section  */}
        <section className="  lg:w-full  flex flex-col gap-[10px] lg:max-w-[868px]">
          {/* Sales Section  */}
          <section className=" ">
            <Text className="!text-[22px] !font-[700]">
              All Locations By Users
            </Text>
            <div className="bg-[#FFFFFF] p-2 rounded-[25px] specialBorder ">
              {/* United State America Section  */}
              <div className="h-[65px] flex px-[13px]  items-center  justify-between  specialBorderBottom">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#E7EDFF] rounded-full">
                    {" "}
                    <img
                      className="h-[25px] w-[17.5px]"
                      src="/usaLocationIcon.png"
                      alt=""
                    />
                  </div>
                  <Text className="!text-[18px] !font-[400]">
                    United States of America
                  </Text>
                </div>
                <Text className="!text-[30px] !font-[600]">45</Text>
              </div>

              {/* Canada Section  */}
              <div className="h-[65px] mt-2 flex px-[13px]  items-center  justify-between  specialBorderBottom">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#FFE7E7] rounded-full">
                    {" "}
                    <img
                      className="h-[25px] w-[17.5px]"
                      src="/canadaLocationIcon.png"
                      alt=""
                    />
                  </div>
                  <Text className="!text-[18px] !font-[400]">Canada</Text>
                </div>
                <Text className="!text-[30px] !font-[600]">37</Text>
              </div>

              {/* Australia Location Icon */}
              <div className="h-[65px] mt-2 flex px-[13px]  items-center  justify-between ">
                <div className="flex items-center gap-2">
                  <div className="h-[50px] flex items-center justify-center w-[50px] bg-[#E7FFEB] rounded-full">
                    {" "}
                    <img
                      className="h-[25px] w-[17.5px]"
                      src="/australiaLocationIcon.png"
                      alt=""
                    />
                  </div>
                  <Text className="!text-[18px] !font-[400]">Australia</Text>
                </div>
                <Text className="!text-[30px] !font-[600]">34</Text>
              </div>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
