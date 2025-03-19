import { useState } from "react";
import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../../../assets/freshifyImage.png";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../../../../services/useApi";

export default function SuperAdminUserLogin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success/Error message
  const navigate = useNavigate();

  // Form validation
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length >= 6 ? null : "Password must have at least 6 characters",
    },
  });

  // Handle Login Request
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(""); // Reset message

      // API call to login user
      const response = await apiPost("/api/login-user", values);

      console.log("Login Response:", response);

      // Store token & user details in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("data", JSON.stringify(response.user));

      // Redirect to dashboard/home page
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/SuperAdminDashboard"); // Adjust this route as needed
      }, 2000);
    } catch (error) {
      console.error("Error in login request:", error);

      // Handle error cases
      if (error.response && error.response.status === 400) {
        setMessage("Invalid email or password.");
      } else if (error.response && error.response.status === 404) {
        setMessage("User not found.");
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid lg:h-[100dvh]  mx-auto grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0    px-2 lg:px-0">
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
            Login
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Enter your credentials to access your account.
          </Text>

          {/* Input Fields */}

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
            placeholder="Enter your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          {/* Success/Error Message */}
          {message && (
            <Text
              size="sm"
              c={message.includes("successful") ? "green" : "red"}
            >
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
            Login
          </Button>

          {/* Forgot Password */}
          <Text c="dimmed" size="xs" ta="right">
            <div
              onClick={() => navigate("/SuperAdminUserResetPassword")}
              className="text-black underline cursor-pointer underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Forgot Password?
            </div>
          </Text>
        </form>
      </section>
    </main>
  );
}
