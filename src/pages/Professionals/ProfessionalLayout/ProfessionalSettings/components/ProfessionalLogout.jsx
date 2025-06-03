import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { logoutUser } from "../../../../../services/AuthServices";
import CustomDialog from "../../../../../components/CustomDialogBox";

function ProfessionalLogout() {
  const handleConfirmLogout = () => {
    logoutUser();
    toast.success("Logout Successfully", { position: "top-center" });
  };

  return (
    <div className="flex justify-between px-3 lg:px-0 mx-auto">
      <span>Logout Account</span>
      <CustomDialog
        triggerButton={
          <Button
            color="black"
            loaderProps={{ type: "dots" }}
            className="!w-[131px] !text-[18px] !font-[400]"
            radius="md"
          >
            Logout
          </Button>
        }
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default ProfessionalLogout;
