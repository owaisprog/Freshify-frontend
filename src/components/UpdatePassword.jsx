import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useUpdateMutation } from "../services/reactQuery";

function UpdatePassword() {
  const data = JSON.parse(localStorage.getItem("data")) || {};
  const { name } = data;
  const { mutate: updateProfile, isPending } = useUpdateMutation("profile");

  const form = useForm({
    initialValues: {
      currentPassword: name || "",
      newPassword: "",
    },
  });
  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      updateProfile(
        {
          endpoint: `/api/update-info`, // Adjust the endpoint
          payload: values,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully!");
            // Update localStorage with new data
            localStorage.setItem(
              "data",
              JSON.stringify({ ...data, ...values })
            );
          },
          onError: (error) => {
            toast.error("Failed to update profile.");
            console.error("Error updating profile:", error);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="w-full flex flex-col gap-6 pb-6 px-6 pt-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label className="text-[18px] text-[#333B69]">Current Password</label>
          <TextInput
            {...form.getInputProps("currentPassword")}
            mt="xs"
            radius="md"
            styles={{
              input: {
                borderColor: "#718EBF",
                color: "#718EBF",
              },
            }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="text-[18px] text-[#333B69]">New Password</label>
          <TextInput
            {...form.getInputProps("newPassword")}
            mt="xs"
            readOnly
            radius="md"
            styles={{
              input: {
                borderColor: "#718EBF",
                color: "#718EBF",
              },
            }}
          />
        </div>
      </div>

      {/* Save Button */}
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
