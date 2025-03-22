import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";

function SuperAdminDelete() {
  const navigate = useNavigate();
  const { ownerId } = useParams();

  // Use the delete mutation from react-query
  const { mutate: deleteSuperAdmin, isPending } = useDeleteMutation("profile");

  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your SuperAdmin?")) {
      deleteSuperAdmin(
        { endpoint: `/api/delete-organizationbyowner/${ownerId}` },
        {
          onSuccess: () => {
            // Clear localStorage

            // Show success message
            toast.success("SuperAdmin deleted successfully!");

            // Redirect to home page
            navigate("/SuperAdminOrganization");
          },
          onError: (error) => {
            toast.error("Failed to delete SuperAdmin.");
            //console.error("Error deleting SuperAdmin:", error);
          },
        }
      );
    }
  };

  return (
    <div className="flex justify-between">
      <span>Delete Account</span>
      <Button
        color="black"
        loaderProps={{ type: "dots" }}
        className="!w-[131px] !text-[18px] !font-[400]"
        radius="md"
        onClick={handleDelete}
        loading={isPending}
      >
        Delete
      </Button>
    </div>
  );
}

export default SuperAdminDelete;
