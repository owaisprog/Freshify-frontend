import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Text, TextInput } from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import freshifyImage from "../../../assets/bg_white.png";
import { apiPost } from "../../../services/useApi";
import { toast } from "react-toastify";

export default function MainResetPassword() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const resetRequest = await apiPost("/api/forgot-password", values);
      toast.success(resetRequest.message, { position: "top-right" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error, { position: "top-right" });
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
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0    px-3 lg:px-0 ">
      {/* This image will be visible on large devices  */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-[#000] lg:flex items-center justify-center">
        <img radius="md" className="max-w-[90%]" src={freshifyImage} />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px]    overflow-hidden bg-[#000] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-full   ">
          <img
            className="h-full w-full object-cover"
            src={freshifyImage}
            alt="Freshify Logo"
          />
        </div>
      </section>

      {/* Right Section - Form */}
      <section className=" h-full  flex items-center  justify-center">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Reset Password
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Reset Password Link will be sent to your email address
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
            Reset Password
          </Button>
          <Text c="dimmed" size="xs" ta="right">
            <Link
              to={`/Login?role=${role}`}
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
