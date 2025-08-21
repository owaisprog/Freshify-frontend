import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import freshifyImage from "../../../assets/big_black.png";
import { toast } from "react-toastify";
import { loginUser } from "../../../services/AuthServices";

export default function CustomerLogin() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userData = await loginUser(values.email, values.password, role);

      toast.success(userData?.message, { position: "top-right" });

      if (userData.user.role === "customer" && role === "customer") {
        navigate("/booking/datetime");
      }
    } catch (error) {
      toast.error(error, { position: "top-right" });
      setLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length <= 0 ? "Enter valid passwrod" : null),
    },
  });
  return (
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0    px-3 lg:px-0 ">
      {/* This image will be visible on large devices  */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-[#000] lg:flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px]    overflow-hidden bg-[#000] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-[80px]   w-[60%] sm:w-[40%] md:w-[35%]  ">
          <Image
            className="h-full w-full object-cover"
            src={freshifyImage}
            alt="Freshify Logo"
          />
        </div>
      </section>
      <section className="  h-full  flex items-center  justify-center  ">
        <form
          className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text
            ta={"center"}
            className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
          >
            Login
          </Text>

          {/* Email Address Input Field  */}
          <div className="flex flex-col gap-[10px]">
            <span className=" !font-[400] !text-[18px] !text-[#000000]">
              Email Address
            </span>
            <TextInput
              radius={"md"}
              placeholder="Enter your email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>
          {/* Email Address Input Field  */}
          <div className="flex flex-col gap-[10px]">
            <span className=" !font-[400] !text-[18px] !text-[#000000]">
              Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Enter you password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </div>

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
        </form>
      </section>
    </main>
  );
}
