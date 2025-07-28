import { useState } from "react";
import { Button, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import freshifyImage from "../../../../../assets/bg_white.png";
import { apiPost } from "../../../../../services/useApi";
import { toast } from "react-toastify";

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
      //consoe.log(response);

      toast.success(response.message, { position: "top-right" });
      setLoading(false);
      navigate("/OrganizationOwnerUserLogin"); // Redirect to login
    } catch (error) {
      //console.error("Error setting password:", error);
      toast.error(error, { position: "top-right" });
      setLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { newPassword: "", confirmPassword: "" },
    validate: {
      newPassword: (value) => {
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)
        ) {
          return "Password must contain:\n- 8+ characters\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character (!@#$%^&*)";
        }
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(
            values.newPassword
          )
        ) {
          return "Fix new password first";
        }
        return value === values.newPassword ? null : "Passwords do not match";
      },
    },
  });

  return (
    <main className="flex flex-col lg:grid h-screen mx-auto lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 px-3 lg:px-0">
      {/* Left Side - Image */}
      {/* This image will be visible on large devices */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-[#000] lg:flex items-center justify-center">
        <img radius="md" className="max-w-[90%]" src={freshifyImage} />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px]  py-1  overflow-hidden bg-[#000] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-full   ">
          <img
            className="h-full w-full object-cover"
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
            Set Your Password
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Enter your new password and confirm it.
          </Text>

          {/* Password Input Fields */}
          <div className="flex flex-col gap-[10px]">
            <span className="!font-[400] !text-[18px] !text-[#000000]">
              New Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Enter your new password"
              key={form.key("newPassword")}
              {...form.getInputProps("newPassword")}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <span className="!font-[400] !text-[18px] !text-[#000000]">
              Confirm Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Confirm your password"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
          </div>

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
            Set Password
          </Button>
        </form>
      </section>
    </main>
  );
}
