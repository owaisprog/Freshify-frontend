import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";
import CustomDialog from "../../../../../components/CustomDialogBox";

function AdminDelete() {
  const navigate = useNavigate();
  const { mutate: deleteAdmin, isPending } = useDeleteMutation("Admin");

  const handleDelete = () => {
    deleteAdmin(
      { endpoint: "/api/delete-account" },
      {
        onSuccess: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("data");
          toast.success("Admin deleted successfully!", {
            position: "top-center",
          });
          navigate("/");
        },
        onError: () => {
          toast.error("Failed to delete Admin.", { position: "top-center" });
        },
      }
    );
  };

  return (
    <div className="flex justify-between px-3 lg:px-0">
      <span>Delete Account</span>
      <CustomDialog
        triggerButton={
          <Button
            color="dark"
            loaderProps={{ type: "dots" }}
            className="!w-[131px] !text-[18px] !font-[400]"
            radius="md"
            loading={isPending}
          >
            Delete
          </Button>
        }
        title="Confirm Delete"
        message="Are you sure you want to delete your Admin?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default AdminDelete;
