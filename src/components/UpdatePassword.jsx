import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useUpdateMutation } from "../services/reactQuery";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

function UpdatePassword() {
  const queryClient = useQueryClient(); // Initialize queryClient
  const { mutate: updateProfile, isPending } = useUpdateMutation("profile");

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.trim().length < 6
          ? "Password must be at least 6 characters"
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      updateProfile(
        {
          endpoint: `/api/update-info`, // Adjust the endpoint
          payload: { password: values.password },
        },
        {
          onSuccess: () => {
            toast.success("Password updated successfully!");

            // Clear the "profile" cache
            // queryClient.invalidateQueries("profile"); // Invalidate and refetch
            queryClient.removeQueries("profile"); // Remove without refetching
          },
          onError: (error) => {
            toast.error("Failed to update password.");
            console.error("Error updating password:", error);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update password.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="w-full flex flex-col gap-6 pb-6 px-6 pt-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-[18px] text-[#333B69]">New Password</label>
          <TextInput
            {...form.getInputProps("password")}
            mt="xs"
            radius="md"
            type="password"
            styles={{
              input: {
                borderColor: "#718EBF",
                color: "#718EBF",
              },
            }}
          />
        </div>

        <div>
          <label className="text-[18px] text-[#333B69]">Confirm Password</label>
          <TextInput
            {...form.getInputProps("confirmPassword")}
            mt="xs"
            radius="md"
            type="password"
            styles={{
              input: {
                borderColor: "#718EBF",
                color: "#718EBF",
              },
            }}
          />
        </div>
      </div>

      <div className="text-right">
        <Button
          type="submit"
          color="black"
          radius="md"
          className="!w-[119px] !text-[18px] !font-[400]"
          loaderProps={{ type: "dots" }}
          loading={isPending}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default UpdatePassword;
