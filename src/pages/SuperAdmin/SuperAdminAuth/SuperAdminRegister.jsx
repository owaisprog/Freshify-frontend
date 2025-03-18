import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import freshifyImage from "../../../assets/freshifyImage.png";
import { useForm } from "@mantine/form";
import { registerUser } from "./services/AuthServices";

export default function SuperAdminRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      role: "superadmin",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.trim().length > 2
          ? null
          : "Full Name must be at least 3 characters",
      phone: (value) =>
        /^\+?\d{10,15}$/.test(value) ? null : "Invalid phone number",
      password: (value) =>
        value.length >= 6 ? null : "Password must have at least 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Form submitted:", values);
      setLoading(true);
      //register
      const userData = await registerUser(values, "organization_owner");

      console.log(userData.newUser);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate("/SuperAdminVerifyEmail", {
          state: { userEmail: values.email },
        });
      }, 1500);
    } catch (error) {
      console.log("Signup Error", error);
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

      {/* Right Section - Form */}
      <section className="flex items-center justify-center">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {/* Title & Login Link */}

          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Signup
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Already have an account?{" "}
            <Link
              to={"/SuperAdminLogin"}
              className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Login
            </Link>
          </Text>

          {/* Input Fields */}

          <TextInput
            radius={"md"}
            label="Email Address"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
            labelProps={{
              className: "!font-[400] !text-[18px] !text-[#000000]",
            }}
          />
          <TextInput
            radius={"md"}
            label="Full Name"
            placeholder="Enter your full name"
            {...form.getInputProps("name")}
            labelProps={{
              className: "!font-[400] !text-[18px] !text-[#000000]",
            }}
          />
          <TextInput
            radius={"md"}
            label="Phone Number"
            placeholder="Enter your phone number"
            {...form.getInputProps("phone")}
            labelProps={{
              className: "!font-[400] !text-[18px] !text-[#000000]",
            }}
          />
          <PasswordInput
            radius={"md"}
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
            labelProps={{
              className: "!font-[400] !text-[18px] !text-[#000000]",
            }}
          />

          {/* Signup Button */}
          <Button
            type="submit"
            fullWidth
            bg={"black"}
            c={"white"}
            radius={"md"}
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Signup
          </Button>
        </form>
      </section>
    </main>
  );
}
