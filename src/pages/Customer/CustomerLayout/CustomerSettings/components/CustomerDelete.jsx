import { Button } from "@mantine/core";

function CustomerDelete() {
  return (
    <div className="flex justify-between ">
      <span>Delete Account</span>
      <Button color="dark" radius="md">
        Delete
      </Button>
    </div>
  );
}

export default CustomerDelete;
