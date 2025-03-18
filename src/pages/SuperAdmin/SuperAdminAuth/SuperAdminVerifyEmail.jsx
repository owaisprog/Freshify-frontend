import { useState } from "react";
import { Button, Image, Text, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../assets/freshifyImage.png";

import { apiPost } from "../../../services/useApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomerVerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [loading, setLoading] = useState(false);

  console.log(location.state);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = await apiPost("/api/verify-otp", {
        email: userEmail,
        otp: values.pin,
      });

      localStorage.setItem("token", data.token);

      console.log("Entered PIN:", values.pin);
      setLoading(false);
      navigate("/SuperAdminDashboard");
    } catch (error) {
      console.log("Error Verifying email", error);
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

      {/* Right Side - Form */}
      <section className="flex items-center justify-center">
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
