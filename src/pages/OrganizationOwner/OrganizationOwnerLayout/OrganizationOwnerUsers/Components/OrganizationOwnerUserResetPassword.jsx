import { useState } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../../../assets/bg_white.png";
import { apiPost } from "../../../../../services/useApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

      // Show success message
      toast.success(resetRequest.message, { position: "top-right" });
    } catch (error) {
      toast.error(error, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col lg:grid h-screen mx-auto lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 px-3 lg:px-0">
      {/* This image will be visible on large devices */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-[#000] lg:flex items-center justify-center">
        <img radius="md" className="max-w-[90%]" src={freshifyImage} />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px]   py-1 overflow-hidden bg-[#000] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-full   ">
          <img
            className="h-full w-full object-cover"
            src={freshifyImage}
            alt="Freshify Logo"
          />
        </div>
      </section>

      {/* Right Side - Form */}
      <section className="h-full flex items-center justify-center">
        <form
          className="w-full flex flex-col max-w-[547px] bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {/* Heading */}
          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Forgot Password
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Enter your email address to receive a password reset link.
          </Text>

          {/* Email Input Field */}
          <div className="flex flex-col gap-[10px]">
            <span className="!font-[400] !text-[18px] !text-[#000000]">
              Email Address
            </span>
            <TextInput
              radius={"md"}
              placeholder="Enter your email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>

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
            className="!text-[18px] !font-[400]"
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Send Reset Link
          </Button>
          <Text c="dimmed" size="xs" ta="right">
            <Link
              to={"/OrganizationOwnerUserLogin"}
              className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Back to Login
            </Link>
          </Text>
        </form>
      </section>
    </main>
  );
}
