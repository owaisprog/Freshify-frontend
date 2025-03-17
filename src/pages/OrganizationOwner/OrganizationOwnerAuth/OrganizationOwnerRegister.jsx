import {
  Button,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import freshifyImage from "../../../assets/freshifyImage.png";
import { useForm } from "@mantine/form";
import { registerUser } from "./services/AuthServices";

export default function OrganizationOwnerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      role: "organization_owner",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.trim().length > 2
          ? null
          : "Full Name must be at least 3 characters",
      phone: (value) =>
        /^\d{10,15}$/.test(value) ? null : "Invalid phone number",
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
      console.log(userData);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate("/OrganizationOwnerVerifyEmail", {
          state: { userEmail: values.email },
        });
      }, 1500);
    } catch (error) {
      console.log("Signup Error", error);
      setLoading(false);
    }
  };

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

      {/* Right Section - Form */}
      <section className="flex items-center justify-center">
        <form
          className="w-full max-w-[595px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Paper
            bg={"white"}
            shadow="md"
            className="!flex flex-col gap-10 p-4 "
            radius={"md"}
          >
            {/* Title & Login Link */}
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Signup
              </Text>
              <Text c="dimmed" size="sm" ta="center">
                Already have an account?{" "}
                <Link
                  to={"/OrganizationOwnerLogin"}
                  className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
                >
                  Login
                </Link>
              </Text>
            </Stack>

            {/* Input Fields */}
            <Stack align="stretch" justify="center" gap="xs" mb="lg">
              <TextInput
                radius={"md"}
                label="Email Address"
                placeholder="Enter your email"
                {...form.getInputProps("email")}
              />
              <TextInput
                radius={"md"}
                label="Full Name"
                placeholder="Enter your full name"
                {...form.getInputProps("name")}
              />
              <TextInput
                radius={"md"}
                label="Phone Number"
                placeholder="Enter your phone number"
                {...form.getInputProps("phone")}
              />
              <PasswordInput
                radius={"md"}
                label="Password"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
              />
            </Stack>

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
          </Paper>
        </form>
      </section>
    </main>
  );
}
