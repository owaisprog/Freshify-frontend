import {
  Box,
  Button,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
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
      setLoading(false);
      console.log("ORGANIZATION LOGIN ERROR", error);
      toast.error(error, { position: "top-right" });
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
    <main className="grid h-[100dvh] max-w-[1440px] mx-auto grid-cols-1 lg:grid-cols-2 bg-[#F5F7FA] lg:py-1 px-2 lg:px-0  ">
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
      <section className="flex items-center  justify-center  ">
        <form
          className="w-full max-w-[595px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Paper
            bg={"white"}
            shadow="md"
            className="h-[400px] !flex flex-col gap-10 p-4  lg:p-8  "
            radius={"md"}
          >
            <Box>
              <Text size="30px" fw={600} c={"black"} ta={"center"}>
                Login
              </Text>
              <Text c="dimmed" size="sm" ta="center" mt={15}>
                Do not have an account yet?{" "}
                <Link
                  to={"/OrganizationOwnerRegister"}
                  className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
                >
                  Register
                </Link>
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
              <PasswordInput
                radius={"md"}
                label="Password"
                placeholder="Enter you password"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
            </Stack>
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
                Login
              </Button>

              <Text c="dimmed" size="xs" ta="right" mt={15}>
                <Link
                  to={"/OrganizationOwnerResetPassword"}
                  className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
                >
                  Forgot Password
                </Link>
              </Text>
            </Box>
          </Paper>
        </form>
      </section>
    </main>
  );
}
