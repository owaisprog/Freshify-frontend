import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";
import CustomDialog from "../../../../../components/CustomDialogBox";

function OrganizationDelete() {
  const navigate = useNavigate();
  const { mutate: deleteOrganization, isPending } =
    useDeleteMutation("organization");

  const handleDelete = () => {
    deleteOrganization(
      { endpoint: "/api/delete-organization" },
      {
        onSuccess: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("data");
          toast.success("Organization deleted successfully!", {
            position: "top-right",
          });
          navigate("/");
        },
        onError: (error) => {
          toast.error("Failed to delete organization.", {
            position: "top-right",
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
        message="Are you sure you want to delete your organization?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default OrganizationDelete;
