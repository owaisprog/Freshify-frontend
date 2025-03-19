import { Button } from "@mantine/core";

import CustomSelect from "../../../../../components/CustomSelector";

export default function ProfessionalsSettings() {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Clients Advance Booking Time</span>
        <CustomSelect
          data={["2 Hours", "6 Hours", "12 Hours"]}
          defaultValue="2 Hours"
        />
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Subscription Management</span>
        <Button bg="black" radius="md">
          Cancel Subscription
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Copy Booking Widget Code</span>
        <Button bg="black" radius="md">
          Copy
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Stripe Invoices List</span>
        <Button bg="black" radius="md">
          View List
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Time Restriction For Rescheduling/Cancelation</span>
        <CustomSelect
          data={["2 Hours", "6 Hours", "12 Hours"]}
          defaultValue="2 Hours"
        />
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Delete Account</span>
        <Button bg="black" radius="md">
          Delete
        </Button>
      </div>
    </section>
  );
}
