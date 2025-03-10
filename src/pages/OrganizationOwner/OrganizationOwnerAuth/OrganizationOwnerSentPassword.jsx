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
import { useNavigate, useParams } from "react-router-dom";
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";

export default function OrganizationOwnerSentPassword() {
  const [loading, setLoading] = useState(false);
  const { userKey } = useParams(); // Get userKey from URL
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await apiPost("/api/set-password", {
        token: userKey, // Send the token from URL
        newPassword: values.newPassword,
      });

      console.log("Password set successfully:", response);
      setLoading(false);
      navigate("/OrganizationOwnerLogin"); // Redirect to login
    } catch (error) {
      console.error("Error setting password:", error);
      setLoading(false);
    }
  };

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

  return (
    <main className="grid h-[100dvh] max-w-[1440px] grid-cols-2 bg-[#F5F7FA] py-1">
      {/* Left Side - Image */}
      <section className="rounded-tr-xl rounded-br-xl bg-black flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* Right Side - Form */}
      <section className="flex items-center justify-center">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper
            bg={"white"}
            shadow="md"
            className="h-[400px] !flex flex-col gap-10 p-8 w-[595px]"
            radius={"md"}
          >
            {/* Heading */}
            <Box>
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Set Your Password
              </Text>
              <Text c="dimmed" size="sm" ta="center" mt={15}>
                Enter your new password and confirm it.
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

            {/* Submit Button */}
            <Box>
              <Button
                fullWidth
                type="submit"
                bg={"black"}
                c={"white"}
                loading={loading}
                loaderProps={{ type: "dots" }}
              >
                Set Password
              </Button>
            </Box>
          </Paper>
        </form>
      </section>
    </main>
  );
}
