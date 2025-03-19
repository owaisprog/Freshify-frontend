import { useState } from "react";
import { Button, Image, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import freshifyImage from "../../../../../assets/freshifyImage.png";
import { apiPost } from "../../../../../services/useApi";

export default function OrganizationOwnerSentPassword() {
  const [loading, setLoading] = useState(false);
  const { userKey } = useParams(); // Get userKey from URL
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await apiPost("/api/set-password", {
        token: userKey, // Send the token from URL
        newPassword: values.newPassword,
      });

      console.log("Password set successfully:", response);
      setLoading(false);
      navigate("/OrganizationOwnerUserLogin"); // Redirect to login
    } catch (error) {
      console.error("Error setting password:", error);
      setLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { newPassword: "", confirmPassword: "" },
    validate: {
      newPassword: (value) =>
        value.length >= 6 ? null : "Password must have at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  return (
    <main className="grid lg:h-[100dvh]  mx-auto grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0    px-2 lg:px-0">
      {/* Left Side - Image */}
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
            Set Your Password
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Enter your new password and confirm it.
          </Text>

          {/* Password Input Fields */}

          <PasswordInput
            radius={"md"}
            label="New Password"
            placeholder="Enter your new password"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            radius={"md"}
            label="Confirm Password"
            placeholder="Confirm your password"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />

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
            Set Password
          </Button>
        </form>
      </section>
    </main>
  );
}
