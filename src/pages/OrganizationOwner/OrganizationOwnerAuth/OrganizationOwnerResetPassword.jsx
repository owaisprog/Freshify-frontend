import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Box,
  Button,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";

export default function OrganizationOwnerResetPassword() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const resetRequest = await apiPost("/api/forgot-password", values);
    console.log(values, resetRequest);
    setLoading(false);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <main className="grid h-[100dvh] mx-auto max-w-[1440px] grid-cols-2 bg-[#F5F7FA] py-1">
      <section className="rounded-tr-xl rounded-br-xl bg-black flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      <section className="flex items-center justify-center">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper
            bg={"white"}
            shadow="md"
            className="h-[350px] !flex flex-col gap-10 p-8 w-[595px]"
            radius={"md"}
          >
            <Box>
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Reset Password
              </Text>
              <Text c="dimmed" size="sm" ta="center" mt={15}>
                Enter your email address to reset your password.
              </Text>
            </Box>

            <Stack
              bg="var(--mantine-color-body)"
              align="stretch"
              justify="center"
              gap="xs"
            >
              <TextInput
                radius={"md"}
                label="Email"
                placeholder="Enter your email"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </Stack>

            <Box>
              <Button
                fullWidth
                type="submit"
                bg={"black"}
                c={"white"}
                loading={loading}
                loaderProps={{ type: "dots" }}
              >
                Reset Password
              </Button>

              <Text c="dimmed" size="xs" ta="right" mt={15}>
                <Link
                  to={"/OrganizationOwnerLogin"}
                  className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
                >
                  Back to Login
                </Link>
              </Text>
            </Box>
          </Paper>
        </form>
      </section>
    </main>
  );
}
