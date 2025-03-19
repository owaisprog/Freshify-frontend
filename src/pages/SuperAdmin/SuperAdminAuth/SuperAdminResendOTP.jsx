import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Image, Text, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";

export default function SuperAdminResendOTP() {
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
      navigate("/SuperAdminVerifyEmail", {
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
    <main className="grid lg:h-[100dvh]  mx-auto grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0    px-2 lg:px-0 ">
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

      {/* Right Side - Resend OTP Form */}
      <section className="flex items-center justify-center">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text size="30px" fw={600} c={"black"} ta={"center"}>
            Resend OTP
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Enter your email address to receive a new OTP.
          </Text>

          <TextInput
            radius={"md"}
            label="Email ADDRESS"
            placeholder="Enter your email"
            key={form.key("email")}
            {...form.getInputProps("email")}
            labelProps={{
              className: "!font-[400] !text-[18px] !text-[#000000]",
            }}
          />

          {message && (
            <Text
              size="sm"
              c={message.includes("failed") ? "red" : "green"}
              ta="center"
            >
              {message}
            </Text>
          )}

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

          <Text c="dimmed" size="xs" ta="right">
            <Link
              to={"/SuperAdminLogin"}
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
