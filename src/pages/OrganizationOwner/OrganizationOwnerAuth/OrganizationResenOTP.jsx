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
import { Link, useNavigate } from "react-router-dom";
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";

export default function OrganizationOwnerResendOTP() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Store success/error message

  const handleSubmit = async (values) => {
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await apiPost("/api/resend-otp", values);
      console.log(values, response);
      setMessage("A new OTP has been sent to your email."); // Success message
      navigate("/OrganizationOwnerVerifyEmail", {
        state: { userEmail: values.email },
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage("Failed to resend OTP. Please try again."); // Error message
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <main className="grid h-[100dvh] max-w-[1440px] mx-auto grid-cols-1 lg:grid-cols-2 bg-[#F5F7FA] lg:py-1 px-2 lg:px-0">
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

      {/* Right Side - Resend OTP Form */}
      <section className="flex items-center justify-center">
        <form
          className="w-full max-w-[595px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Paper
            bg={"white"}
            shadow="md"
            className="h-[350px] !flex flex-col gap-10 p-4 md:p-8 "
            radius={"md"}
          >
            <Box>
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Resend OTP
              </Text>
              <Text c="dimmed" size="sm" ta="center" mt={15}>
                Enter your email address to receive a new OTP.
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

            {message && (
              <Text
                size="sm"
                c={message.includes("failed") ? "red" : "green"}
                ta="center"
              >
                {message}
              </Text>
            )}

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
                Resend OTP
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
