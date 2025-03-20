import { Button } from "@mantine/core";

import CustomSelect from "../../../../../components/CustomSelector";

export default function SuperAdminsSettings() {
  return (
    <section className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Clients Advance Booking Time
        </span>
        <div className="w-[97px] lg:w-[154px] h-[40px]">
          <CustomSelect
            data={["1 Month", "2 Months", "3 Monts"]}
            defaultValue="1 Month"
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:!text-[18px] font-[400]">
          Subscription Management
        </span>
        <Button className="!w-[123px] lg:!w-[240px]" bg="black" radius="md">
          <span className="lg:hidden">Cancel</span>
          <span className="hidden lg:block">Cancel Subscription</span>
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Copy Booking Widget Code
        </span>
        <Button className="!w-[112px] lg:!w-[121px] " bg="black" radius="md">
          Copy
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 px-2 border-[#718EBF]">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Stripe Invoices List
        </span>
        <Button className="!w-[123px] lg:!w-[153px] " bg="black" radius="md">
          View List
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3  px-2 border-[#718EBF]">
        <span className="lg:hidden ml-3 lg:ml-0 text-[14px] font-[400]">
          Restriction For Rescheduling
        </span>
        <span className="hidden lg:block  lg:text-[18px] font-[400]">
          Time Restriction For Rescheduling/Cancelation
        </span>
        <div className="w-[113px] lg:[154px]">
          <CustomSelect
            data={["2 Hours", "6 Hours", "12 Hours"]}
            defaultValue="2 Hours"
            styles={{
              input: {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: 0,
                fontSize: "14px",
                backgroundColor: "transparent",
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF] px-2">
        <span className="text-[14px] ml-3 lg:ml-0 lg:text-[18px] font-[400]">
          Delete Account
        </span>
        <Button className="!w-[120px] lg:w-[131px] " bg="black" radius="md">
          Delete
        </Button>
      </div>
    </section>
  );
}
