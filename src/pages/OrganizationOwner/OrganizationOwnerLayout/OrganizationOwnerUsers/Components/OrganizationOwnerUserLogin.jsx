import { useState } from "react";
import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../../../assets/freshifyImage.png";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../../../../services/useApi";
import { toast } from "react-toastify";

export default function OrganizationOwnerUserLogin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success/Error message
  const navigate = useNavigate();

  // Form validation
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // Handle Login Request
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(""); // Reset message

      // API call to login user
      const response = await apiPost("/api/login-user", values);

      // Store token & user details in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("data", JSON.stringify(response.user));

      // Redirect to dashboard/home page
      toast(response.message, { position: "top-center" });
      setTimeout(() => {
        if (response.user.role === "admin") {
          navigate("/AdminsDashboard");
        } else if (response.user.role === "barber") {
          navigate("/ProfessionalDashboard");
        }
      }, 2000);
    } catch (error) {
      //console.error("Error in login request:", error);
      toast(error, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col lg:grid h-screen mx-auto lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 px-3 lg:px-0">
      {/* This image will be visible on large devices */}
      <section className="hidden rounded-tr-xl rounded-br-xl bg-[#040707] lg:flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* This image will be visible on Mobile devices */}
      <section className=" lg:hidden h-[80px]    overflow-hidden bg-[#040707] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-[80px] w-full sm:w-[60%]  ">
          <Image
            className="h-full w-full object-contain"
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
            Login
          </Text>

          {/* Input Fields */}
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

          <div className="flex flex-col gap-[10px]">
            <span className="!font-[400] !text-[18px] !text-[#000000]">
              Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Enter your password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </div>

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
            className="!text-[18px] !font-[400]"
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Login
          </Button>

          {/* Forgot Password */}
          <Text c="dimmed" size="xs" ta="right">
            <div
              onClick={() => navigate("/OrganizationOwnerUserResetPassword")}
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
