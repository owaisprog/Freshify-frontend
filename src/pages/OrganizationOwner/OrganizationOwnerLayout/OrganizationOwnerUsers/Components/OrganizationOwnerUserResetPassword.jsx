import { useState } from "react";
import { Button, Image, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../../../assets/freshifyImage.png";
import { apiPost } from "../../../../../services/useApi";

export default function OrganizationOwnerUserResetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Store success/error message

  // Form validation
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  // Handle Forgot Password Request
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(""); // Reset message

      // API call to request password reset
      const resetRequest = await apiPost("/api/forgot-password-user", values);
      console.log("Reset Request Sent:", resetRequest);

      // Show success message
      setMessage("Password reset link sent! Check your email.");
    } catch (error) {
      console.error("Error in forgot password request:", error);

      // Handle error cases
      if (error.response && error.response.status === 404) {
        setMessage("User not found. Please enter a valid email.");
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid lg:h-[100dvh]  mx-auto grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0  lg:py-1 px-2 lg:px-0">
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
      <section className=" lg:hidden h-[85px] md:h-[100px] md:py-2  overflow-hidden bg-black flex items-center justify-center rounded-bl-xl rounded-br-xl">
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
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {/* Heading */}

          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Forgot Password
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Enter your email address to receive a password reset link.
          </Text>

          {/* Email Input Field */}

          <TextInput
            radius={"md"}
            label="Email"
            placeholder="Enter your email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          {/* Success/Error Message */}
          {message && (
            <Text size="sm" c={message.includes("sent") ? "green" : "red"}>
              {message}
            </Text>
          )}

          {/* Submit Button */}

          <Button
            fullWidth
            type="submit"
            bg={"black"}
            c={"white"}
            radius={"md"}
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Send Reset Link
          </Button>
        </form>
      </section>
    </main>
  );
}
