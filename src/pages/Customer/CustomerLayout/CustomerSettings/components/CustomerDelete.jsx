import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";
import CustomDialog from "../../../../../components/CustomDialogBox";
function CustomerDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteCustomer, isPending } = useDeleteMutation("Customer");

  const handleDelete = () => {
    deleteCustomer(
      { endpoint: "/api/delete-account" },
      {
        onSuccess: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("data");
          queryClient.invalidateQueries(["Customer"]);
          toast.success("Customer deleted successfully!", {
            position: "top-center",
          });
          navigate("/");
        },
        onError: () => {
          toast.error("Failed to delete Customer.", {
            position: "top-center",
          });
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
            color="black"
            loaderProps={{ type: "dots" }}
            className="!w-[131px] !text-[18px] !font-[400]"
            radius="md"
            loading={isPending}
          >
            Delete
          </Button>
        }
        title="Confirm Delete"
        message="Are you sure you want to delete your Customer?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default CustomerDelete;
