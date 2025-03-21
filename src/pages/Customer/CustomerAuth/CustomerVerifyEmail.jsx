import { useState } from "react";
import { Button, Image, Text, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import freshifyImage from "../../../assets/freshifyImage.png";

import { apiPost } from "../../../services/useApi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function CustomerVerifyEmail() {
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

      setLoading(false);
      toast(data.message, { position: "top-center" });
      navigate("/CustomerDashboard");
    } catch (error) {
      setLoading(false);
      toast(error, { position: "top-center" });
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
