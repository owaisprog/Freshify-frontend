import { Group, Title } from "@mantine/core";
import { useState } from "react";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";
import YearlyChart from "./YearlyChart";

function OrganizationOwnerChart() {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <>
            <WeeklyChart />
          </>
        );
      case "tab2":
        return <MonthlyChart />;
      case "tab3":
        return <YearlyChart />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className=" mx-auto  bg-[#39393A] w-full rounded-lg opacity-[0.98] ">
        <Title order={4} c={"white"} ta={"center"} my={"xs"} fw={"normal"}>
          POPULAR SERVICES BY SALES
        </Title>
        <div className="flex border w-fit mx-auto border-white font-Montserrat  justify-center bg-black rounded-lg p-1 ">
          <button
            className={`font-Montserrat cursor-pointer hover:underline hover:underline-offset-4 px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === "tab1" ? "bg-white text-black" : "text-white"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            Week
          </button>
          <button
            className={`px-6 py-2 rounded-lg cursor-pointer hover:underline hover:underline-offset-4 font-semibold transition-colors mx-2 ${
              activeTab === "tab2" ? "bg-white text-black" : "text-white"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            Month
          </button>
          <button
            className={`px-6 py-2 rounded-lg cursor-pointer hover:underline hover:underline-offset-4 font-semibold transition-colors ${
              activeTab === "tab3" ? "bg-white text-[#1A3D16]" : "text-white"
            }`}
            onClick={() => setActiveTab("tab3")}
          >
            Year
          </button>
        </div>
        <Group my={"xs"} flex justify="center">
          <Title order={5} c={"white"} ta={"center"} fw={"normal"}>
            MOST SOLD SERVICE : <span></span>
          </Title>
          <Title order={4} c={"white"} ta={"center"} fw={"bold"}>
            HAIRCUT <span></span>
          </Title>
        </Group>
        {renderContent()}
      </section>
    </>
  );
}

export default OrganizationOwnerChart;
