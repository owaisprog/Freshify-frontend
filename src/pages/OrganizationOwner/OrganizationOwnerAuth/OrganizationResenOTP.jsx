import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Image, Text, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import freshifyImage from "../../../assets/freshifyImage.png";
import { apiPost } from "../../../services/useApi";
import { toast } from "react-toastify";

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
      toast(response.message, { position: "top-center" });
      navigate("/OrganizationOwnerVerifyEmail", {
        state: { userEmail: values.email },
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast(error, { position: "top-center" }); // Error message
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
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0 px-3 lg:px-0 ">
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
      <section className=" h-full  flex items-center  justify-center">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Resend OTP
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Enter your email address to receive a new OTP.
          </Text>

          <div className="flex flex-col gap-[10px]">
            <span className=" !font-[400] !text-[18px] !text-[#000000]">
              Email Address
            </span>

            <TextInput
              radius={"md"}
              placeholder="Enter your email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>

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
            className="!text-[18px] !font-[400]"
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Resend OTP
          </Button>

          <Text c="dimmed" size="xs" ta="right">
            <Link
              to={"/OrganizationOwnerLogin"}
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
