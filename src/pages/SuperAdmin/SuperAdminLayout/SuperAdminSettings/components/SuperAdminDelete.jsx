import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";
import CustomDialog from "../../../../../components/CustomDialogBox";

function SuperAdminDelete() {
  const navigate = useNavigate();
  const { ownerId } = useParams();
  const { mutate: deleteSuperAdmin, isPending } = useDeleteMutation("profile");

  const handleDelete = () => {
    deleteSuperAdmin(
      { endpoint: `/api/delete-organizationbyowner/${ownerId}` },
      {
        onSuccess: () => {
          toast.success("Deleted successfully!", { position: "top-right" });
          navigate("/SuperAdminOrganization");
        },
        onError: () => {
          toast.error("Failed to delete SuperAdmin.", {
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
        message="Are you sure you want to delete Organization Owner"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default SuperAdminDelete;
