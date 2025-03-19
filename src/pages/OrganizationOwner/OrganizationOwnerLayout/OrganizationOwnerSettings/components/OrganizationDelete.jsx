import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";

function OrganizationDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use the delete mutation from react-query
  const { mutate: deleteOrganization, isPending } =
    useDeleteMutation("organization");

  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your organization?")) {
      deleteOrganization(
        { endpoint: "/api/delete-organization" },
        {
          onSuccess: () => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("data");

            // Invalidate any related queries (optional)
            queryClient.invalidateQueries(["organization"]);

            // Show success message
            toast.success("Organization deleted successfully!");

            // Redirect to home page
            navigate("/");
          },
          onError: (error) => {
            toast.error("Failed to delete organization.");
            console.error("Error deleting organization:", error);
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

export default OrganizationDelete;
