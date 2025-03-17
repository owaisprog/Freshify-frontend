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
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";
import { useNavigate, useParams } from "react-router-dom";

export default function OrganizationOwnerNewPassword() {
  const [loading, setLoading] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();
  console.log(resetToken);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const resetRequest = await apiPost(`/api/reset-password/${resetToken}`, {
        newPassword: values.newPassword,
      });
      console.log(values.newPassword, values, resetRequest);
      setLoading(false);
      navigate("/OrganizationOwnerLogin");
    } catch (error) {
      console.log(`message:${error.message}`);
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
                Set New Password
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
                radius={"md"}
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
