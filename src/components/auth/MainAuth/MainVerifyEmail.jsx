import { useState } from "react";
import { Button, Text, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../assets/bg_white.png";

import { apiPost } from "../../../services/useApi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function MainVerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = await apiPost("/api/verify-otp", {
        email: userEmail,
        otp: values.pin,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("data", JSON.stringify(data.user));
      toast.success(data.message, { position: "top-right" });
      setLoading(false);

      if (data.user.role === "organization_owner") {
        navigate("/owner-plans");
      } else if (data.user.role === "superadmin") {
        navigate("/ProfessionalDashboard");
      } else if (data.user.role === "customer") {
        navigate("/CustomerDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error, { position: "top-right" });
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { pin: "" },
    validate: {
      pin: (value) =>
        value.length === 4 ? null : "Please enter a 4-digit PIN",
    },
  });

  return (
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0    px-3 lg:px-0">
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

      {/* Right Side - Form */}
      <section className="h-full  flex items-center  justify-center">
        <form
          className="w-full flex items-center flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {/* Heading */}

          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Verify Email
          </Text>
          <Text c="dark" size="sm" ta="center">
            Enter 4 digit OTP sent to your email address
          </Text>

          {/* PIN Input Field */}

          <PinInput
            autoFocus
            size="lg"
            placeholder="-"
            type="number"
            length={4}
            {...form.getInputProps("pin")}
          />

          {/* Verify OTP Button */}

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
            Verify OTP
          </Button>
        </form>
      </section>
    </main>
  );
}
