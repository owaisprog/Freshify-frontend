import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import freshifyImage from "../../../assets/freshifyImage.png";
import { loginUser } from "./services/AuthServices";
import { toast } from "react-toastify";

export default function OrganizationOwnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userData = await loginUser(
        values.email,
        values.password,
        "organization_owner"
      );
      console.log(userData, values);
      toast(userData.message, { position: "top-right" });
      navigate("/OrganizationOwnerDashboard");
    } catch (error) {
      toast(error, { position: "top-right" });
      setLoading(false);

      console.log("ORGANIZATION LOGIN ERROR", error);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0    px-3 lg:px-0 ">
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
      <section className="  h-full  flex items-center  justify-center  ">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Login
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Do not have an account yet?{" "}
            <Link
              to={"/OrganizationOwnerRegister"}
              className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Register
            </Link>
          </Text>

          {/* Email Address Input Field  */}
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
          {/* Email Address Input Field  */}
          <div className="flex flex-col gap-[10px]">
            <span className=" !font-[400] !text-[18px] !text-[#000000]">
              Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Enter you password"
              key={form.key("password")}
              {...form.getInputProps("password")}
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
            Login
          </Button>

          <Text ta="right">
            <Link
              to={"/OrganizationOwnerResetPassword"}
              className="text-black text-[14px] font-[400] underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Forget Password
            </Link>
          </Text>
        </form>
      </section>
    </main>
  );
}
