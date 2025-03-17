import { useState } from "react";
import {
  Box,
  Button,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../../../assets/freshifyImage.png";
import { useNavigate, useParams } from "react-router-dom";
import { apiPost } from "../../../../../services/useApi";

export default function OrganizationOwnerUserNewPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success/Error message
  const { resetToken } = useParams(); // Get resetToken from URL params
  const navigate = useNavigate();

  // Form validation
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { newPassword: "", confirmPassword: "" },
    validate: {
      newPassword: (value) =>
        value.length >= 6 ? null : "Password must have at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  // Handle Reset Password Request
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(""); // Reset message

      // API call to reset password
      const resetRequest = await apiPost(
        `/api/reset-password-user/${resetToken}`,
        {
          newPassword: values.newPassword,
        }
      );

      console.log("Reset Password Request:", resetRequest);

      // Show success message & redirect to login
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/OrganizationOwnerUserLogin");
      }, 2000);
    } catch (error) {
      console.error("Error in reset password request:", error);

      // Handle error cases
      if (error.response && error.response.status === 400) {
        setMessage("Invalid or expired reset link.");
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid h-[100dvh] max-w-[1720px] mx-auto grid-cols-1 lg:grid-cols-2 bg-[#F5F7FA] lg:py-1 px-2 lg:px-0">
      {/* This image will be visible on large devices  */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-black lg:flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px] md:py-2 md:h-[100px] overflow-hidden bg-black flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <Image
          radius="md"
          className="object-contain  w-full lg:w-[60%]  "
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>
      {/* Right Side - Form */}
      <section className="flex items-center justify-center">
        <form
          className="w-full max-w-[595px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Paper
            bg={"white"}
            shadow="md"
            className="h-[400px] !flex flex-col gap-10 p-4 md:p-8 "
            radius={"md"}
          >
            {/* Heading */}
            <Box>
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Reset Password
              </Text>
              <Text c="dimmed" size="sm" ta="center" mt={15}>
                Enter your new password below.
              </Text>
            </Box>

            {/* Password Input Fields */}
            <Stack
              bg="var(--mantine-color-body)"
              align="stretch"
              justify="center"
              gap="xs"
            >
              <PasswordInput
                radius={"md"}
                label="New Password"
                placeholder="Enter your new password"
                key={form.key("newPassword")}
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                radius={"md"}
                label="Confirm Password"
                placeholder="Confirm your password"
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>

            {/* Success/Error Message */}
            {message && (
              <Text
                size="sm"
                c={message.includes("successful") ? "green" : "red"}
              >
                {message}
              </Text>
            )}

            {/* Submit Button */}
            <Box>
              <Button
                fullWidth
                type="submit"
                bg={"black"}
                c={"white"}
                radius={"md"}
                loading={loading}
                loaderProps={{ type: "dots" }}
              >
                Reset Password
              </Button>
            </Box>
          </Paper>
        </form>
      </section>
    </main>
  );
}
