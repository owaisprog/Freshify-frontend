import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { logoutUser } from "../../../../../services/AuthServices";

function OrganizationLogout() {
  // Handle delete button click
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      logoutUser();
      toast.success("Logout Successfully", { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-between ">
      <span>Logout Account</span>
      <Button
        color="black"
        loaderProps={{ type: "dots" }}
        className="!w-[131px] !text-[18px] !font-[400]"
        radius="md"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default OrganizationLogout;
