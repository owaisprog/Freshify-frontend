import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeleteMutation } from "../../../../../services/reactQuery";

function AdminDelete() {
  const navigate = useNavigate();

  // Use the delete mutation from react-query
  const { mutate: deleteAdmin, isPending } = useDeleteMutation("Admin");

  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your Admin?")) {
      deleteAdmin(
        { endpoint: "/api/delete-account" },
        {
          onSuccess: () => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("data");

            // Show success message
            toast.success("Admin deleted successfully!");

            // Redirect to home page
            navigate("/");
          },
          onError: (error) => {
            toast.error("Failed to delete Admin.");
            //console.error("Error deleting Admin:", error);
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
        className="!w-[131px] !text-[18px] !font-[400]"
        onClick={handleDelete}
        loading={isPending}
      >
        Delete
      </Button>
    </div>
  );
}

export default AdminDelete;
