import { Button } from "@mantine/core";

function OrganizationDelete() {
  return (
    <div className="flex justify-between ">
      <span>Delete Account</span>
      <Button className="lg:!w-[131px]" color="black" radius="md">
        Delete
      </Button>
    </div>
  );
}

export default OrganizationDelete;
