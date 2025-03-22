import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";

function CustomerDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use the delete mutation from react-query
  const { mutate: deleteCustomer, isPending } = useDeleteMutation("Customer");

  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your Customer?")) {
      deleteCustomer(
        { endpoint: "/api/delete-account" },
        {
          onSuccess: () => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("data");

            // Invalidate any related queries (optional)
            queryClient.invalidateQueries(["Customer"]);

            // Show success message
            toast.success("Customer deleted successfully!");

            // Redirect to home page
            navigate("/");
          },
          onError: (error) => {
            toast.error("Failed to delete Customer.");
            //console.error("Error deleting Customer:", error);
          },
        }
      );
    }
  };

  return (
    <div className="flex justify-between">
      <span>Delete Account</span>
      <Button
        color="dark"
        loaderProps={{ type: "dots" }}
        radius="md"
        onClick={handleDelete}
        loading={isPending}
      >
        Delete
      </Button>
    </div>
  );
}

export default CustomerDelete;
