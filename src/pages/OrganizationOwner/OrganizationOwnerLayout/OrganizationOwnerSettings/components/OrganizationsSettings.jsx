import { Select, Button } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";

export default function OrganizationsSettings() {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Clients Advance Booking Time</span>
        <Select
          data={["2 Hours", "6 Hours", "12 Hours"]}
          defaultValue="2 Hours"
          checkIconPosition="right"
          rightSection={<FaChevronDown size={14} color="black" />} // Replace up/down icons with single downward icon
          styles={{
            input: {
              border: "none",
              borderBottom: "2px solid black", // Black bottom border only
              borderRadius: 0, // No border radius
              paddingRight: "2rem", // Prevent overlap with custom arrow
            },
          }}
        />
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Subscription Management</span>
        <Button color="dark" radius="md">
          Cancel Subscription
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Copy Booking Widget Code</span>
        <Button color="dark" radius="md">
          Copy
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Stripe Invoices List</span>
        <Button color="dark" radius="md">
          View List
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Time Restriction For Rescheduling/Cancelation</span>
        <Select
          data={["2 Hours", "6 Hours", "12 Hours"]}
          defaultValue="2 Hours"
          checkIconPosition="right"
          rightSection={<FaChevronDown size={14} color="black" />} // Replace up/down icons with single downward icon
          styles={{
            input: {
              border: "none",
              borderBottom: "2px solid black", // Black bottom border only
              borderRadius: 0, // No border radius
              paddingRight: "2rem", // Prevent overlap with custom arrow
            },
          }}
        />
      </div>

      <div className="flex justify-between items-center border-b-[0.5px] py-3 border-[#718EBF]">
        <span>Delete Account</span>
        <Button color="dark" radius="md">
          Delete
        </Button>
      </div>
    </section>
  );
}
